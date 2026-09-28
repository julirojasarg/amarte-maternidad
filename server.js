/**
 * Servidor HTTP para Amarte Maternidad
 * Compatible con Railway, Node.js y despliegues en contenedores.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = parseInt(process.env.PORT || '3000', 10);
const PUBLIC_DIR = __dirname;

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
