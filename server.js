/**
 * Servidor HTTP para Amarte Maternidad
 * Compatible con Railway, Node.js y despliegues en contenedores.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const crypto = require('crypto');
const { Pool } = require('pg');

const PORT = parseInt(process.env.PORT || '3000', 10);
const PUBLIC_DIR = __dirname;
const DATABASE_URL = process.env.DATABASE_URL;
const analyticsPool = DATABASE_URL ? new Pool({
  connectionString: DATABASE_URL,
  ssl: process.env.PGSSLMODE === 'disable' ? false : { rejectUnauthorized: false },
  max: 3,
  connectionTimeoutMillis: 5000
}) : null;
let analyticsReady = Promise.resolve();
let eventRateWindowStart = Date.now();
let eventRateCount = 0;
const EVENT_RATE_LIMIT = Math.max(1, Number.parseInt(process.env.ANALYTICS_EVENT_LIMIT_PER_MINUTE || '300', 10) || 300);
const ANALYTICS_SECTIONS = new Set(['inicio', 'parto', 'paquetes', 'lactancia', 'cobertura', 'sobre-mi', 'testimonios', 'faq', 'contacto', 'footer', 'sitewide']);
const CTA_SECTIONS = {
  header_whatsapp: 'sitewide', mobile_menu_whatsapp: 'sitewide', floating_whatsapp: 'sitewide',
  service_parto_preparacion_virtual: 'parto', service_parto_biomecanica_presencial: 'parto',
  service_masaje_prenatal: 'parto', service_masaje_posparto: 'parto',
  service_paquete_parto_inicial: 'paquetes', service_paquete_parto_continuo: 'paquetes',
  service_lactancia_virtual: 'lactancia', service_lactancia_presencial: 'lactancia',
  service_taller_lactancia_presencial: 'lactancia', service_taller_lactancia_virtual: 'lactancia',
  service_taller_recien_nacido_presencial: 'lactancia', service_taller_recien_nacido_virtual: 'lactancia',
  coverage_whatsapp: 'cobertura', about_whatsapp: 'sobre-mi', banner_whatsapp: 'contacto',
  footer_whatsapp_icon: 'footer', footer_whatsapp_text: 'footer'
};
const FAQ_ELEMENTS = new Set(['doula_role', 'care_centers', 'payment_options']);
const NAV_ELEMENTS = new Set(['nav_desktop', 'nav_mobile', 'footer_links', 'content_link', 'banner_link']);
const OUTBOUND_SECTIONS = { about_instagram: 'sobre-mi', footer_instagram: 'footer', footer_phone: 'footer' };
const ANALYTICS_EVENTS = new Set(['section_view', 'navigation_click', 'faq_open', 'whatsapp_click', 'outbound_click']);

const PROVINCES = {
  'san jose': ['San José', 'Valle Central'],
  'alajuela': ['Alajuela', 'Valle Central'],
  'heredia': ['Heredia', 'Valle Central'],
  'cartago': ['Cartago', 'Valle Central'],
  'guanacaste': ['Guanacaste', 'Chorotega'],
  'puntarenas': ['Puntarenas', 'Pacífico / Brunca'],
  'limon': ['Limón', 'Caribe']
};
const PROVINCE_CODES = { SJ: 'san jose', A: 'alajuela', H: 'heredia', C: 'cartago', G: 'guanacaste', P: 'puntarenas', L: 'limon' };

function loadCantonBoundaries() {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'analytics-cantons.json'), 'utf8'));
    if (!Array.isArray(data.features) || data.features.length < 80) throw new Error('Capa cantonal incompleta');
    return data.features.map(feature => {
      const polygons = feature.geometry.type === 'Polygon' ? [feature.geometry.coordinates] : feature.geometry.coordinates;
      const bounds = { minLon: Infinity, minLat: Infinity, maxLon: -Infinity, maxLat: -Infinity };
      for (const polygon of polygons) for (const [lon, lat] of polygon[0]) {
        bounds.minLon = Math.min(bounds.minLon, lon); bounds.maxLon = Math.max(bounds.maxLon, lon);
        bounds.minLat = Math.min(bounds.minLat, lat); bounds.maxLat = Math.max(bounds.maxLat, lat);
      }
      return { code: String(feature.properties.cod_canton), name: feature.properties.canton, province: feature.properties.provincia, polygons, bounds };
    });
  } catch (error) {
    console.error('[analytics] No se pudieron cargar los límites cantonales:', error.message);
    return [];
  }
}

const CANTON_BOUNDARIES = loadCantonBoundaries();

function normalizeText(value) {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();
}

function getLocation(headers) {
  if (normalizeText(headers['cf-ipcountry']) !== 'cr') return { province: 'Sin determinar', zone: 'Sin determinar', canton: '', cantonCode: '' };
  const latitude = Number(headers['cf-iplatitude']), longitude = Number(headers['cf-iplongitude']);
  const hasCostaRicaCoordinates = Number.isFinite(latitude) && Number.isFinite(longitude) && latitude >= 5 && latitude <= 12 && longitude >= -88 && longitude <= -81;
  const canton = hasCostaRicaCoordinates ? findCanton(longitude, latitude) : null;
  const regionCode = String(headers['cf-region-code'] || '').split('-').pop().toUpperCase();
  const region = normalizeText(headers['cf-region'])
    .replace(/^provincia(?: de)?\s+/, '')
    .replace(/\s+(?:provincia|province)$/, '')
    .trim();
  const provinceKey = PROVINCE_CODES[regionCode] || region;
  const match = PROVINCES[provinceKey];
  if (!match) {
    const polygonProvince = canton && Object.values(PROVINCES).find(([province]) => normalizeText(province) === normalizeText(canton.province));
    if (!polygonProvince) return { province: 'Sin determinar', zone: 'Sin determinar', canton: '', cantonCode: '' };
    return { province: polygonProvince[0], zone: polygonProvince[1], canton: canton.name, cantonCode: canton.code };
  }
  const location = { province: match[0], zone: match[1], canton: '', cantonCode: '' };
  if (canton && normalizeText(canton.province) === normalizeText(location.province)) {
    location.canton = canton.name;
    location.cantonCode = canton.code;
  }
  return location;
}

function pointInRing(longitude, latitude, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j];
    if ((yi > latitude) !== (yj > latitude) && longitude < ((xj - xi) * (latitude - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function findCanton(longitude, latitude) {
  for (const canton of CANTON_BOUNDARIES) {
    const b = canton.bounds;
    if (longitude < b.minLon || longitude > b.maxLon || latitude < b.minLat || latitude > b.maxLat) continue;
    for (const polygon of canton.polygons) {
      if (pointInRing(longitude, latitude, polygon[0]) && !polygon.slice(1).some(hole => pointInRing(longitude, latitude, hole))) return canton;
    }
  }
  return null;
}

function hasTrustedCloudflareHeaders(req) {
  const expectedToken = process.env.ANALYTICS_CF_TOKEN;
  const host = String(req.headers.host || '').split(':')[0].toLowerCase();
  const receivedToken = Buffer.from(String(req.headers['x-amarte-origin-token'] || ''));
  const expected = Buffer.from(expectedToken || '');
  return Boolean(expectedToken && req.headers['cf-ray'] && ['amartecr.com', 'www.amartecr.com'].includes(host) &&
    receivedToken.length === expected.length && crypto.timingSafeEqual(receivedToken, expected));
}

function isWithinEventRateLimit() {
  const now = Date.now();
  if (now - eventRateWindowStart >= 60_000) {
    eventRateWindowStart = now;
    eventRateCount = 0;
  }
  if (eventRateCount >= EVENT_RATE_LIMIT) return false;
  eventRateCount += 1;
  return true;
}

function getTrafficSource(referer) {
  if (!referer) return 'Directo';
  try {
    const host = new URL(referer).hostname.toLowerCase().replace(/^www\./, '');
    if (host === 'amartecr.com') return 'Interno';
    if (host === 'instagram.com' || host === 'l.instagram.com') return 'Instagram';
    if (host === 'facebook.com' || host === 'm.facebook.com' || host === 'l.facebook.com') return 'Facebook';
    if (host === 'google.com' || host.endsWith('.google.com') || /^google\.[a-z.]+$/.test(host)) return 'Google';
    if (host === 'tiktok.com' || host === 'vm.tiktok.com') return 'TikTok';
    if (host === 'youtube.com' || host === 'youtu.be') return 'YouTube';
    return 'Otro sitio';
  } catch (_) {
    return 'Otro';
  }
}

function isAnalyticsAuthorized(req, res) {
  const expectedUser = process.env.ANALYTICS_ADMIN_USER || 'admin';
  const expectedPassword = process.env.ANALYTICS_ADMIN_PASSWORD;
  const authorization = String(req.headers.authorization || '');
  if (expectedPassword && authorization.startsWith('Basic ')) {
    try {
      const decoded = Buffer.from(authorization.slice(6), 'base64').toString('utf8');
      const separator = decoded.indexOf(':');
      const password = separator >= 0 ? decoded.slice(separator + 1) : '';
      const actual = Buffer.from(password);
      const expected = Buffer.from(expectedPassword);
      if (separator >= 0 && decoded.slice(0, separator) === expectedUser && actual.length === expected.length && crypto.timingSafeEqual(actual, expected)) return true;
    } catch (_) {}
  }
  res.writeHead(expectedPassword ? 401 : 503, expectedPassword ? { 'WWW-Authenticate': 'Basic realm="Amarte Analytics", charset="UTF-8"' } : {});
  res.end(expectedPassword ? 'Autenticación requerida.' : 'Panel no configurado. Define ANALYTICS_ADMIN_PASSWORD.');
  return false;
}

function costaRicaDate() {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Costa_Rica', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  const date = Object.fromEntries(parts.filter(part => part.type !== 'literal').map(part => [part.type, part.value]));
  return `${date.year}-${date.month}-${date.day}`;
}

function isValidIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function subtractUtcMonths(isoDate, months) {
  const date = new Date(`${isoDate}T00:00:00.000Z`);
  const originalDay = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() - months);
  const lastDayOfTargetMonth = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  date.setUTCDate(Math.min(originalDay, lastDayOfTargetMonth));
  return date.toISOString().slice(0, 10);
}

async function recordAnalytics(event, source, page = '/') {
  if (!analyticsPool) return;
  await analyticsReady;
  await analyticsPool.query(
    `INSERT INTO analytics_daily (visit_date, event, page, source, count)
     VALUES ($1::date, $2, $3, $4, 1)
     ON CONFLICT (visit_date, event, page, source)
     DO UPDATE SET count = analytics_daily.count + 1`,
    [costaRicaDate(), event, page, source]
  );
}

async function recordProvinceAnalytics(location, page = '/') {
  if (!analyticsPool || page !== '/') return;
  await analyticsReady;
  await analyticsPool.query(
    `INSERT INTO analytics_province_daily (visit_date, page, province, zone, count)
     VALUES ($1::date, $2, $3, $4, 1)
     ON CONFLICT (visit_date, page, province, zone)
     DO UPDATE SET count = analytics_province_daily.count + 1`,
    [costaRicaDate(), page, location.province, location.zone]
  );
}

async function recordCantonAnalytics(location, page = '/') {
  if (!analyticsPool || page !== '/' || !location.cantonCode) return;
  await analyticsReady;
  await analyticsPool.query(
    `INSERT INTO analytics_canton_daily (visit_date, page, canton_code, canton, province, count)
     VALUES ($1::date, $2, $3, $4, $5, 1)
     ON CONFLICT (visit_date, page, canton_code)
     DO UPDATE SET count = analytics_canton_daily.count + 1`,
    [costaRicaDate(), page, location.cantonCode, location.canton, location.province]
  );
}

function getAnalyticsCountry(req) {
  if (!hasTrustedCloudflareHeaders(req)) return 'Encabezado no confiable';
  const country = String(req.headers['cf-ipcountry'] || '').trim().toUpperCase();
  if (!country) return 'País no informado';
  return /^[A-Z]{2}$/.test(country) ? country : 'Código no reconocido';
}

async function recordCountryAnalytics(country, page = '/') {
  if (!analyticsPool || page !== '/') return;
  await analyticsReady;
  await analyticsPool.query(
    `INSERT INTO analytics_country_daily (visit_date, page, country, count)
     VALUES ($1::date, $2, $3, 1)
     ON CONFLICT (visit_date, page, country)
     DO UPDATE SET count = analytics_country_daily.count + 1`,
    [costaRicaDate(), page, country]
  );
}

function validateDetailedEvent(payload) {
  const event = String(payload.event || '');
  const element = String(payload.element || '');
  if (!ANALYTICS_EVENTS.has(event)) return null;
  let section = '';
  if (event === 'section_view' || event === 'navigation_click') {
    section = String(payload.section || '');
    if (!ANALYTICS_SECTIONS.has(section) || section === 'sitewide') return null;
    if (event === 'section_view' && element !== 'visible_section') return null;
    if (event === 'navigation_click' && !NAV_ELEMENTS.has(element)) return null;
  } else if (event === 'faq_open') {
    if (!FAQ_ELEMENTS.has(element)) return null;
    section = 'faq';
  } else if (event === 'whatsapp_click') {
    section = CTA_SECTIONS[element] || '';
    if (!section) return null;
  } else if (event === 'outbound_click') {
    section = OUTBOUND_SECTIONS[element] || '';
    if (!section) return null;
  }
  return { event, section, element };
}

async function recordDetailedAnalytics(event, section, element, source) {
  if (!analyticsPool) return;
  await analyticsReady;
  await analyticsPool.query(
    `INSERT INTO analytics_detail_daily (visit_date, event, page, section, element, source, count)
     VALUES ($1::date, $2, '/', $3, $4, $5, 1)
     ON CONFLICT (visit_date, event, page, section, element, source)
     DO UPDATE SET count = analytics_detail_daily.count + 1`,
    [costaRicaDate(), event, section, element, source]
  );
}

async function initializeAnalytics() {
  if (!analyticsPool) {
    console.warn('[analytics] DATABASE_URL no configurada; registro y panel desactivados.');
    return;
  }
  await analyticsPool.query(`CREATE TABLE IF NOT EXISTS analytics_daily (
    visit_date date NOT NULL,
    event text NOT NULL CHECK (event IN ('pageview', 'whatsapp_click')),
    page text NOT NULL,
    source text NOT NULL,
    count bigint NOT NULL DEFAULT 0 CHECK (count >= 0),
    PRIMARY KEY (visit_date, event, page, source)
  )`);
  await analyticsPool.query(`CREATE TABLE IF NOT EXISTS analytics_province_daily (
    visit_date date NOT NULL,
    page text NOT NULL CHECK (page = '/'),
    province text NOT NULL,
    zone text NOT NULL,
    count bigint NOT NULL DEFAULT 0 CHECK (count >= 0),
    PRIMARY KEY (visit_date, page, province, zone)
  )`);
  await analyticsPool.query(`CREATE TABLE IF NOT EXISTS analytics_canton_daily (
    visit_date date NOT NULL,
    page text NOT NULL CHECK (page = '/'),
    canton_code text NOT NULL,
    canton text NOT NULL,
    province text NOT NULL,
    count bigint NOT NULL DEFAULT 0 CHECK (count >= 0),
    PRIMARY KEY (visit_date, page, canton_code)
  )`);
  await analyticsPool.query(`CREATE TABLE IF NOT EXISTS analytics_country_daily (
    visit_date date NOT NULL,
    page text NOT NULL CHECK (page = '/'),
    country text NOT NULL CHECK (country IN ('Encabezado no confiable', 'País no informado', 'Código no reconocido') OR country ~ '^[A-Z]{2}$'),
    count bigint NOT NULL DEFAULT 0 CHECK (count >= 0),
    PRIMARY KEY (visit_date, page, country)
  )`);
  const migrationClient = await analyticsPool.connect();
  try {
    await migrationClient.query('BEGIN');
    const oldAnalyticsSchema = await migrationClient.query(`SELECT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_name = 'analytics_daily' AND column_name = 'province'
    ) AS has_geo`);
    if (oldAnalyticsSchema.rows[0].has_geo) {
      await migrationClient.query(`CREATE TABLE analytics_daily_migrated (
        visit_date date NOT NULL, event text NOT NULL CHECK (event IN ('pageview', 'whatsapp_click')),
        page text NOT NULL, source text NOT NULL, count bigint NOT NULL DEFAULT 0 CHECK (count >= 0),
        PRIMARY KEY (visit_date, event, page, source)
      )`);
      await migrationClient.query(`INSERT INTO analytics_daily_migrated (visit_date,event,page,source,count)
        SELECT visit_date,event,page,source,SUM(count) FROM analytics_daily GROUP BY visit_date,event,page,source`);
      await migrationClient.query(`INSERT INTO analytics_province_daily (visit_date,page,province,zone,count)
        SELECT visit_date,page,province,zone,SUM(count) FROM analytics_daily WHERE event='pageview' AND page='/'
        GROUP BY visit_date,page,province,zone
        ON CONFLICT (visit_date,page,province,zone) DO UPDATE SET count=EXCLUDED.count`);
      await migrationClient.query('DROP TABLE analytics_daily');
      await migrationClient.query('ALTER TABLE analytics_daily_migrated RENAME TO analytics_daily');
    }
    await migrationClient.query(`CREATE TABLE IF NOT EXISTS analytics_detail_daily (
      visit_date date NOT NULL,
      event text NOT NULL CHECK (event IN ('section_view', 'navigation_click', 'faq_open', 'whatsapp_click', 'outbound_click')),
      page text NOT NULL CHECK (page = '/'),
      section text NOT NULL,
      element text NOT NULL,
      source text NOT NULL,
      count bigint NOT NULL DEFAULT 0 CHECK (count >= 0),
      PRIMARY KEY (visit_date, event, page, section, element, source)
    )`);
    // Collapse legacy detail rows across province/zone while preserving their counts.
    await migrationClient.query(`DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'analytics_detail_daily' AND column_name = 'province'
      ) THEN
        CREATE TABLE analytics_detail_daily_migrated (
          visit_date date NOT NULL, event text NOT NULL, page text NOT NULL,
          section text NOT NULL, element text NOT NULL, source text NOT NULL,
          count bigint NOT NULL DEFAULT 0 CHECK (count >= 0),
          PRIMARY KEY (visit_date, event, page, section, element, source)
        );
        INSERT INTO analytics_detail_daily_migrated (visit_date,event,page,section,element,source,count)
        SELECT visit_date,event,page,section,element,source,SUM(count)
        FROM analytics_detail_daily GROUP BY visit_date,event,page,section,element,source;
        DROP TABLE analytics_detail_daily;
        ALTER TABLE analytics_detail_daily_migrated RENAME TO analytics_detail_daily;
      END IF;
    END $$`);
    await migrationClient.query('COMMIT');
  } catch (error) {
    await migrationClient.query('ROLLBACK');
    throw error;
  } finally {
    migrationClient.release();
  }
  await purgeExpiredAnalytics();
  const cleanupTimer = setInterval(() => purgeExpiredAnalytics().catch(error => console.error('[analytics] Falló la purga periódica:', error.message)), 24 * 60 * 60 * 1000);
  cleanupTimer.unref();
  console.log('[analytics] Base de datos lista.');
}

async function purgeExpiredAnalytics() {
  if (!analyticsPool) return;
  const tables = ['analytics_daily', 'analytics_province_daily', 'analytics_canton_daily', 'analytics_country_daily', 'analytics_detail_daily'];
  for (const table of tables) {
    await analyticsPool.query(`DELETE FROM ${table} WHERE visit_date < ((NOW() AT TIME ZONE 'America/Costa_Rica')::date - INTERVAL '25 months')`);
  }
}

function hasAnalyticsConsent(req) {
  return String(req.headers.cookie || '').split(';').some(part => part.trim() === 'amarte_analytics=accepted');
}

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf',
  '.txt': 'text/plain; charset=UTF-8'
};

const server = http.createServer((req, res) => {
  const start = Date.now();
  const parsedUrl = url.parse(req.url);
  let pathname = decodeURIComponent(parsedUrl.pathname);
  const analyticsOptOut = new URLSearchParams(parsedUrl.query || '').get('analytics') === 'off';
  const analyticsPage = pathname === '/' || pathname === '/index.html' ? '/' :
    pathname === '/kardex' || pathname === '/kardex.html' ? '/kardex' : null;

  // La aplicación acepta eventos propios solo tras consentimiento; no guarda IP ni el referente completo en la base analítica.
  if (pathname === '/api/analytics/event' && req.method === 'POST') {
    if (!hasAnalyticsConsent(req)) { res.writeHead(204); res.end(); return; }
    const bodyChunks = [];
    let bodySize = 0;
    let tooLarge = false;
    req.on('data', chunk => {
      if (tooLarge) return;
      bodySize += chunk.length;
      if (bodySize > 2048) {
        tooLarge = true;
        bodyChunks.length = 0;
        res.once('finish', () => req.destroy());
        res.writeHead(413); res.end();
        return;
      }
      bodyChunks.push(chunk);
    });
    req.on('end', async () => {
      if (tooLarge) return;
      try {
        const host = String(req.headers.host || '').split(':')[0].toLowerCase();
        const allowedOrigin = ['amartecr.com', 'www.amartecr.com'].includes(host);
        const origin = String(req.headers.origin || '');
        if (!allowedOrigin || !origin.startsWith('https://') || !['amartecr.com', 'www.amartecr.com'].includes(new URL(origin).hostname) || !String(req.headers['content-type'] || '').startsWith('application/json')) {
          res.writeHead(204); res.end(); return;
        }
        const payload = JSON.parse(Buffer.concat(bodyChunks).toString('utf8') || '{}');
        const event = validateDetailedEvent(payload);
        if (!event || !analyticsPool) {
          res.writeHead(204); res.end(); return;
        }
        if (!isWithinEventRateLimit()) { res.writeHead(429); res.end(); return; }
        await recordDetailedAnalytics(event.event, event.section, event.element, getTrafficSource(payload.referrer));
        res.writeHead(204); res.end();
      } catch (error) {
        console.error('[analytics] No se pudo guardar evento:', error.message);
        res.writeHead(204); res.end();
      }
    });
    return;
  }

  if (pathname === '/admin/analytics' || pathname === '/api/analytics/summary') {
    if (!isAnalyticsAuthorized(req, res)) return;
    if (pathname === '/admin/analytics') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' });
      fs.createReadStream(path.join(PUBLIC_DIR, 'analytics-dashboard.html')).pipe(res);
      return;
    }
    if (!analyticsPool) { res.writeHead(503); res.end('Base de datos no configurada.'); return; }
    const queryParams = new URLSearchParams(parsedUrl.query || '');
    const dateTo = queryParams.get('to') || costaRicaDate();
    if (!isValidIsoDate(dateTo)) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=UTF-8', 'Cache-Control': 'no-store' });
      res.end('La fecha final no es válida. Usa YYYY-MM-DD.');
      return;
    }
    const defaultFrom = new Date(`${dateTo}T00:00:00.000Z`);
    defaultFrom.setUTCDate(defaultFrom.getUTCDate() - 29);
    const dateFrom = queryParams.get('from') || defaultFrom.toISOString().slice(0, 10);
    if (!isValidIsoDate(dateFrom) || !isValidIsoDate(dateTo) || dateFrom > dateTo) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=UTF-8', 'Cache-Control': 'no-store' });
      res.end('Rango de fechas inválido. Usa YYYY-MM-DD y una fecha inicial anterior a la final.');
      return;
    }
    if (dateTo > costaRicaDate()) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=UTF-8', 'Cache-Control': 'no-store' });
      res.end('La fecha final no puede estar en el futuro.');
      return;
    }
    if (dateFrom < subtractUtcMonths(dateTo, 25)) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=UTF-8', 'Cache-Control': 'no-store' });
      res.end('El rango máximo disponible es de 25 meses.');
      return;
    }
    analyticsPool.query(`SELECT visit_date, event, page, ''::text AS province, ''::text AS zone, source, count,
        ''::text AS section, ''::text AS element, ''::text AS canton, 'historical'::text AS measurement
      FROM analytics_daily WHERE visit_date BETWEEN $1::date AND $2::date
      UNION ALL
      SELECT visit_date, event, page, ''::text AS province, ''::text AS zone, source, count, section, element, ''::text AS canton,
        'detailed'::text AS measurement
      FROM analytics_detail_daily WHERE visit_date BETWEEN $1::date AND $2::date
      UNION ALL
      SELECT visit_date, 'canton_visit'::text AS event, page, province, ''::text AS zone, 'Geografía'::text AS source, count,
        ''::text AS section, ''::text AS element, canton, 'geographic'::text AS measurement
      FROM analytics_canton_daily WHERE visit_date BETWEEN $1::date AND $2::date
      UNION ALL
      SELECT visit_date, 'province_visit'::text AS event, page, province, zone, 'Geografía'::text AS source, count,
        ''::text AS section, ''::text AS element, ''::text AS canton, 'geographic'::text AS measurement
      FROM analytics_province_daily WHERE visit_date BETWEEN $1::date AND $2::date
      UNION ALL
      SELECT visit_date, 'country_visit'::text AS event, page, country AS province, ''::text AS zone, 'Geografía'::text AS source, count,
        ''::text AS section, ''::text AS element, ''::text AS canton, 'geographic'::text AS measurement
      FROM analytics_country_daily WHERE visit_date BETWEEN $1::date AND $2::date
      ORDER BY visit_date DESC, count DESC`, [dateFrom, dateTo])
      .then(result => { res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(result.rows)); })
      .catch(error => { console.error('[analytics] No se pudo leer el resumen:', error.message); res.writeHead(503); res.end('No se pudo consultar la base de datos.'); });
    return;
  }

  // El dashboard se sirve solo desde su ruta autenticada.
  if (pathname === '/analytics-dashboard.html') {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end('404 Página no encontrada.');
    return;
  }

  // Endpoint de salud para Railway y monitorización
  if (pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      service: 'amarte-maternidad',
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // Alias y rutas directas amigables
  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  } else if (pathname === '/kardex') {
    pathname = '/kardex.html';
  } else if (pathname === '/privacidad') {
    pathname = '/privacidad.html';
  }

  // Prevención de Directory Traversal
  const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(PUBLIC_DIR, safePath);

  // Asegurar que no se escape del directorio del proyecto
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end('403 Prohibido: Acceso no autorizado.');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      // Si no existe, responder 404
      res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <title>404 - Página No Encontrada | Amarte Maternidad</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: center; padding: 4rem 1rem; background: #FAF7F2; color: #4D1B23; }
            h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
            p { font-size: 1.1rem; color: #752A36; }
            a { display: inline-block; margin-top: 1.5rem; padding: 0.75rem 1.5rem; background: #D96579; color: white; text-decoration: none; border-radius: 9999px; font-weight: bold; }
            a:hover { background: #C24D61; }
          </style>
        </head>
        <body>
          <h1>404</h1>
          <p>Lo sentimos, la página que buscas no existe o ha sido movida.</p>
          <a href="/">Volver al inicio</a>
        </body>
        </html>
      `);
      console.log(`[404] ${req.method} ${pathname} (${Date.now() - start}ms)`);
      return;
    }

    // Si es un directorio, buscar index.html interno
    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Headers de caché (estáticos multimedia con caché de 1 día, HTML sin caché para reflejar cambios inmediatos)
    const headers = {
      'Content-Type': contentType,
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN'
    };

    if (ext === '.html') {
      headers['Cache-Control'] = 'no-cache, must-revalidate';
    } else {
      headers['Cache-Control'] = 'public, max-age=86400';
    }

    res.writeHead(200, headers);
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);

    readStream.on('error', (streamErr) => {
      console.error(`Error en streaming para ${filePath}:`, streamErr);
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('500 Error Interno del Servidor');
      }
    });

    res.on('finish', () => {
      console.log(`[${res.statusCode}] ${req.method} ${pathname} (${Date.now() - start}ms)`);
      if (req.method === 'GET' && analyticsPage && !analyticsOptOut && hasAnalyticsConsent(req) && res.statusCode === 200 && analyticsPool && ext === '.html') {
        const host = String(req.headers.host || '').split(':')[0].toLowerCase();
        if (!['amartecr.com', 'www.amartecr.com'].includes(host)) return;
        const userAgent = String(req.headers['user-agent'] || '');
        if (!/bot|crawler|spider|headless|preview/i.test(userAgent)) {
          const trustedCloudflareHeaders = hasTrustedCloudflareHeaders(req);
          const location = trustedCloudflareHeaders ? getLocation(req.headers) : { province: 'Sin determinar', zone: 'Sin determinar', canton: '', cantonCode: '' };
          const country = getAnalyticsCountry(req);
          const source = getTrafficSource(req.headers.referer);
          Promise.all([
            recordAnalytics('pageview', source, analyticsPage),
            analyticsPage === '/' ? recordProvinceAnalytics(location, analyticsPage) : Promise.resolve(),
            analyticsPage === '/' ? recordCantonAnalytics(location, analyticsPage) : Promise.resolve(),
            analyticsPage === '/' ? recordCountryAnalytics(country, analyticsPage) : Promise.resolve()
          ]).catch(error => console.error('[analytics] No se pudo registrar visita:', error.message));
        }
      }
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`===============================================`);
  console.log(`🌸 Servidor Amarte Maternidad en ejecución`);
  console.log(`🚀 Puerto: ${PORT}`);
  console.log(`🌐 Local:  http://localhost:${PORT}`);
  console.log(`📋 Kardex: http://localhost:${PORT}/kardex`);
  console.log(`🩺 Health: http://localhost:${PORT}/health`);
  console.log(`===============================================`);
});

analyticsReady = initializeAnalytics().catch(error => {
  console.error('[analytics] No se pudo inicializar la base de datos:', error.message);
});

// Manejo de señales de terminación para Railway
process.on('SIGTERM', () => {
  console.log('Recibida señal SIGTERM, cerrando servidor ordenadamente...');
  server.close(() => {
    console.log('Servidor finalizado.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('Recibida señal SIGINT, cerrando servidor...');
  server.close(() => {
    process.exit(0);
  });
});
