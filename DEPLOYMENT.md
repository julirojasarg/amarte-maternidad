# 🚀 Guía de Despliegue y CI/CD — Amarte Maternidad

Este documento detalla la arquitectura de despliegue continuo (CI/CD), la vinculación entre **GitHub** y **Railway**, y los procedimientos para publicar cambios en producción de forma automática o manual.

---

## 🌐 Entorno de Producción Actual

* **Dominio Principal:** [https://amartecr.com](https://amartecr.com)
* **Dominio WWW:** [https://www.amartecr.com](https://www.amartecr.com)
* **URL Railway (Respaldo):** [https://amarte-lactancia-production.up.railway.app](https://amarte-lactancia-production.up.railway.app)
* **Endpoint de Salud (Healthcheck):** [https://amartecr.com/health](https://amartecr.com/health)
* **Kardex Doula:** [https://amartecr.com/kardex](https://amartecr.com/kardex)
* **Repositorio GitHub:** [`julirojasarg/amarte-maternidad`](https://github.com/julirojasarg/amarte-maternidad) (Rama de producción: `main`, conectada al servicio Railway)
* **Proyecto en Railway:** `amarte-lactancia` (`ID: 4a68075b-152e-46fd-885c-f1dad50e38b1`)
* **Servicio en Railway:** `amarte-lactancia` (`ID: 7bdc9ab4-ad5b-4c17-872d-a0f238500b35`)

---

## ☁️ Configuración de DNS en Cloudflare

Para que tu dominio apunte correctamente a Railway a través de Cloudflare:

| Tipo | Nombre (Host) | Contenido / Destino | Proxy Status (Cloudflare) |
|---|---|---|---|
| **CNAME** | `@` (o `amartecr.com`) | `fohv6a9v.up.railway.app` | DNS Only (o Proxied) |
| **CNAME** | `www` | `a0djjc2b.up.railway.app` | DNS Only (o Proxied) |
| **TXT** *(si solicita verificación)* | `_railway-verify` | `railway-verify=242b67bd79a6deb4e647c4995b0d05523b45b09d4c2da700bdb9c89363f0f192` | DNS Only |
| **TXT** *(si solicita verificación)* | `_railway-verify.www` | `railway-verify=93a9e5378f314856e90127232ba3b421294ade9c5f7b0ac4380c1c199f0ca253` | DNS Only |

*Nota sobre SSL en Cloudflare:* Asegúrate de tener el modo SSL/TLS en **Full** o **Full (Strict)** en Cloudflare para evitar bucles de redirección (*redirect loops*).

---

## ⚡ Flujo Automatizado (CI/CD con GitHub)

El servicio `amarte-lactancia` en Railway tiene como origen GitHub el repositorio `julirojasarg/amarte-maternidad`, rama `main`. Railway recibe los pushes a esa rama; por eso, cuando se hace merge de un Pull Request a `main`, el commit de merge inicia automáticamente un build y, si pasa el healthcheck, reemplaza la versión de producción. No hace falta ejecutar `railway up` para los cambios que ya están en GitHub.

```
[ Desarrollador / Colaborador ]
              │
              ▼
   git push origin <rama>
              │
              ▼
     Pull Request en GitHub
              │
              ▼ (Revisión y Aprobación)
      Merge a 'main'
              │
              ▼ (Webhook automático de GitHub a Railway)
      Railway Build & Deploy (Nixpacks / Dockerfile)
              │
              ▼ (Healthcheck OK en /health)
  🌸 Producción Actualizada (Live en ~30s)
```

### ¿Cómo publicar cambios día a día?

1. **Trabaja en tu rama de trabajo:**
   ```bash
   git checkout -b feature/nueva-seccion
   # ... Realizas tus cambios ...
   git add .
   git commit -m "feat: descripción del cambio"
   git push -u origin feature/nueva-seccion
   ```

2. **Crea un Pull Request en GitHub:**
   - Abre [github.com/julirojasarg/amarte-maternidad/pulls](https://github.com/julirojasarg/amarte-maternidad/pulls).
   - Haz clic en **New pull request** y selecciona tu rama hacia `main`.

3. **Haz el Merge:**
   - Al hacer clic en **"Merge pull request"**, Railway detecta el cambio de inmediato.
   - En aproximadamente 30 a 60 segundos, el nuevo código estará visible en la página web.

4. **Si haces push directo a `main`:**
   ```bash
   git checkout main
   git pull origin main
   # ... realizas cambios ...
   git add .
   git commit -m "docs: actualizar información"
   git push origin main
   ```
   *Al ejecutarse el `push`, Railway inicia el despliegue automático. El merge de un Pull Request produce el mismo evento sobre `main`.*

---

## 🛠️ Gestión y Despliegue Manual con Railway CLI

Si en algún momento necesitas desplegar de emergencia directamente desde tu computadora, revisar logs o consultar el estado del servidor, puedes usar el CLI de Railway:

### 1. Verificar estado del servicio
```bash
railway status
```

### 2. Ver logs en tiempo real
```bash
# Ver los últimos 50 registros
railway logs -n 50

# Seguir el stream de logs en vivo
railway logs
```

### 3. Despliegue manual directo (Bypass de GitHub)
Si necesitas subir cambios locales sin pasar por un commit/push a GitHub:
```bash
railway up
```

### 4. Volver a conectar o vincular el repositorio
Si configuras un nuevo entorno o máquina:
```bash
# Vincular el proyecto local al servicio en Railway
railway link --project 4a68075b-152e-46fd-885c-f1dad50e38b1 --service 7bdc9ab4-ad5b-4c17-872d-a0f238500b35

# Conectar el origen GitHub para autodespliegues
railway service source connect --repo julirojasarg/amarte-maternidad --branch main --service amarte-lactancia
```

La conexión de origen debe quedar visible en Railway con repositorio `julirojasarg/amarte-maternidad` y rama `main`. Después de cada merge, confirma que el nuevo despliegue termina en `SUCCESS` y que `/health` responde `ok`. Si el push actualiza GitHub pero Railway no crea un despliegue, verifica esta conexión, los Deployment Triggers del entorno `production` y los registros de build antes de usar `railway up`; este último publica una copia local y no comprueba por sí solo el flujo GitHub → Railway.

---

## ⚙️ Configuración del Servidor y Despliegue

### `server.js`
* Servidor HTTP nativo en Node.js (cero dependencias externas requeridas para arrancar).
* Escucha en `0.0.0.0` y lee dinámicamente el puerto asignado por Railway vía `process.env.PORT`.
* Endpoint `/health`: responde `{ status: "ok", service: "amarte-maternidad", uptimeSeconds: ... }` utilizado por Railway para confirmar que el contenedor está sano antes de dirigirle tráfico.
* Soporte MIME completo para HTML, CSS, JS, imágenes (PNG, JPG, WebP, SVG), fuentes y PDFs.
* Manejo de señales `SIGTERM` y `SIGINT` para apagado ordenado (*graceful shutdown*).

### `railway.json`
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "node server.js",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 3
  }
}
```

---

## 📊 Analítica propia y panel privado

La analítica propia se encuentra desactivada por defecto. Solo se activa después de pulsar «Aceptar analítica»; la elección se recuerda durante un año en una cookie de preferencia (`amarte_analytics`) compartida entre `amartecr.com` y `www.amartecr.com`, sin ID de visitante. Rechazarla deja disponible el sitio y sus funciones. El servidor verifica esa preferencia tanto para las vistas como para los eventos enviados por el navegador. El aviso público está en `/privacidad`.

### Datos y límites

`analytics_daily` combina fecha (zona horaria `America/Costa_Rica`), evento, página y fuente categorizada. `analytics_province_daily` combina fecha, página pública, provincia/zona y contador; `analytics_canton_daily` combina fecha, página `/`, código/nombre de cantón, provincia y contador. Ninguna de las dos tablas geográficas incluye fuente, sección, botón, FAQ o clic de contacto. Al inicializar, una migración divide las dimensiones históricas de geografía y fuente en sus conteos marginales independientes. `analytics_detail_daily` combina fecha, evento (`section_view`, `navigation_click`, `faq_open`, `whatsapp_click` u `outbound_click`), página pública, sección, elemento de catálogo, fuente categorizada y contador, sin geografía. Para asignar cantón, las coordenadas aproximadas que Cloudflare deriva de la IP se usan solo en memoria y no se guardan en la base analítica. Los clics actuales expresan interés general; no se enlazan a pedidos, clientes ni ventas. El servidor valida IDs de sección, CTA y FAQ contra catálogos permitidos; no acepta texto de botones, servicios o mensajes desde el navegador. Las fuentes se agrupan como Directo, Google, Instagram, Facebook, TikTok, YouTube, Interno u Otro sitio.

`analytics_country_daily` agrega por día el código de país de las visitas públicas con encabezados Cloudflare confiables. Si no se puede confiar en dichos encabezados, guarda únicamente la categoría agregada `Encabezado no confiable`; también distingue país no informado y código no reconocido. No conserva IP, coordenadas ni valores completos de encabezados. El dashboard muestra esta dimensión desde el despliegue que la incorpora; los conteos geográficos anteriores no incluyen país.

Los referentes usan el dominio inmediato que envía el navegador. `Interno` indica que pertenece a `amartecr.com`; el servidor no puede distinguir si fue navegación desde otra página o una recarga, por eso el dashboard lo separa de las fuentes externas. La falta de referente se muestra como `Sin referente`, porque también puede deberse a marcadores, apps o políticas del navegador y no prueba que la visita fuera tecleada directamente.

Una `section_view` es exposición aproximada: el elemento entra a una franja central visible durante al menos 1,2 segundos; no confirma lectura. La navegación, FAQ y CTA miden acciones distintas. No se vinculan eventos entre sí ni equivalen a personas únicas. Los clics a WhatsApp significan intención de abrir el contacto, no una conversación o venta. El detalle comienza al desplegar esta versión; los clics previos conservan su total histórico sin sección ni botón conocido. Las interacciones comerciales solo se miden en `/`; `/kardex` se excluye por defecto y la tienda oculta no se instrumenta.

Los IDs de eventos son categorías mantenidas en `server.js`, `analytics.js` e `index.html`: las secciones visibles se deduplican una vez por carga; el menú registra el destino y la posición (escritorio, móvil, pie, contenido o banner); las FAQ se cuentan al abrirse; y los CTA de servicio envían solo su ID permitido. Al añadir o renombrar una sección, CTA o FAQ se deben actualizar los catálogos de servidor/panel y sus atributos o llamadas explícitas. No reutilizar texto del botón, nombre libre del servicio, precio ni mensaje de WhatsApp como dimensión. El panel vuelve a consultar los agregados al recuperar el foco y cada minuto mientras permanece visible; el valor de visitas cambia con una nueva carga pública aceptada, no con cada clic de sección.

Para pruebas internas sin contaminar los conteos, abre una ruta con `?analytics=off` (por ejemplo, `https://amartecr.com/?analytics=off`). Esa carga omite tanto la vista HTML como los eventos del navegador y no solicita la elección.

La agrupación geográfica aproximada se limita a conteos generales de visitas aceptadas al sitio público; se mantiene separada de fuente, secciones, FAQ, CTA y contactos. El dashboard incluye el mapa de visitas por cantón, armado con límites oficiales del IGN 2022. La ubicación se deriva de IP mediante Cloudflare y es aproximada; no es una dirección ni punto preciso. San José, Alajuela, Heredia y Cartago → Valle Central; Guanacaste → Chorotega; Puntarenas → Pacífico / Brunca; Limón → Caribe. Si no llegan encabezados confiables, se registra “Sin determinar” y no se estima cantón. Fuente de límites: [capa cantonal oficial del IGN 2022 en SNIT/ArcGIS](https://services8.arcgis.com/gEjMfQjIBmRHMGao/arcgis/rest/services/Cantones_de_Costa_Rica/FeatureServer). Los eventos no guardan mensaje, parámetros de consulta, producto específico ni enlace completo.

La base de datos de la aplicación purga diariamente filas activas con más de 25 meses (y también hace una purga al iniciar). Esto no define el plazo de retención de los respaldos administrados por Railway ni de los registros técnicos de Cloudflare/Railway; revisa esos plazos en sus consolas y condiciones vigentes antes de describirlos como parte de la retención propia. La aplicación registra en su salida método, ruta y estado, pero no imprime deliberadamente IP ni encabezados completos. Railway documenta HTTP logs con `srcIp`, agente de usuario y hora; al estar Cloudflare delante, no se ha comprobado qué dirección ve Railway para cada solicitud. Cloudflare necesariamente recibe la IP para entregar la conexión y derivar ubicación. El ajuste **Remove visitor IP headers** en Managed Transforms puede evitar enviar al origen los encabezados `CF-Connecting-IP` y `X-Forwarded-For`; no oculta la IP a Cloudflare ni controla registros de borde de Railway.

El panel y su API requieren HTTP Basic Auth. El usuario se configura en `ANALYTICS_ADMIN_USER` y la contraseña en `ANALYTICS_ADMIN_PASSWORD` dentro de Railway; no se guardan en el repositorio. El endpoint de eventos limita el conjunto de interacciones a 300 solicitudes por minuto por instancia; el contador se reinicia al reiniciar el servidor y es compartido por visitantes de esa instancia. Ese límite no cubre las vistas HTML. Para reducir automatizaciones, se recomienda una regla de tasa de Cloudflare para `/`, `/kardex` y `/api/analytics/event`.

### Configuración aplicada en Railway

- Se creó el servicio PostgreSQL `Postgres` en el proyecto `amarte-lactancia`, entorno `production`.
- `DATABASE_URL` del servicio web apunta a `Postgres.DATABASE_URL`.
- `ANALYTICS_ADMIN_USER`, `ANALYTICS_ADMIN_PASSWORD` y `ANALYTICS_CF_TOKEN` están guardadas como variables del servicio web. Nunca pongas la contraseña o el token en el repositorio ni en código del navegador.
- El código está desplegado y la tabla quedó inicializada. El resumen del panel consulta PostgreSQL; la base empieza a llenarse con visitas y clics nuevos.
- Railway cobra según el consumo de CPU, memoria, almacenamiento y tráfico, sujeto al plan y créditos del espacio. [Precios de Railway](https://docs.railway.com/pricing).

Para desarrollo local, define `DATABASE_URL` y `ANALYTICS_ADMIN_PASSWORD`. `PGSSLMODE=disable` se puede usar solo con PostgreSQL local sin TLS.

### Habilitar el desglose geográfico en Cloudflare

El servidor solo asigna provincia y cantón cuando la solicitud llega por Cloudflare, trae encabezados de ubicación y coincide el token secreto de origen. El panel presenta geografía únicamente para visitas generales de `/`; nunca cruza ubicación con sección, botón, FAQ o fuente. Los conteos geográficos agregados se muestran aun si son menores de cinco. Configura lo siguiente en Cloudflare:

1. En **DNS**, cambia los registros de `amartecr.com` y `www.amartecr.com` a **Proxied** (nube naranja). Conserva SSL/TLS en **Full** o **Full (Strict)**.
2. En **Rules → Settings → Managed Transforms**, confirma que **Add visitor location headers** esté activo. Cloudflare envía `CF-IPCountry`, `CF-Region` y `CF-Region-Code` al origen. No hace falta crear una regla para esos tres encabezados. [Referencia oficial de encabezados](https://developers.cloudflare.com/rules/transform/managed-transforms/reference/).
3. Para reducir los encabezados de IP que llegan a la aplicación, activa también **Remove visitor IP headers** si está disponible en tu cuenta. Esto no impide que Cloudflare procese la IP para servir y geolocalizar la solicitud.
4. En **Rules → Transform Rules → Modify Request Header**, crea una regla para hosts `amartecr.com` y `www.amartecr.com`. En la expresión de filtro usa `http.host in {"amartecr.com" "www.amartecr.com"}`; agrega el encabezado de solicitud `X-Amarte-Origin-Token` con el mismo valor que la variable protegida `ANALYTICS_CF_TOKEN` en Railway. Esta regla separada autoriza los encabezados Cloudflare en el servidor; el transform administrado de ubicación no la crea. El valor es secreto entre Cloudflare y el servidor: no lo pongas en archivos públicos, en código del navegador ni en el chat.
5. Las solicitudes a `*.up.railway.app` no se cuentan como visitas del sitio público y no tienen ubicación asignable.

El servidor valida el token antes de aceptar provincia y zona; las solicitudes que llegan sin él se agregan como “Sin determinar”. Una vez creada la regla, no hace falta publicar de nuevo: los nuevos conteos se clasifican cuando Cloudflare envía los encabezados válidos. Cloudflare explica la configuración de [Managed Transforms](https://developers.cloudflare.com/rules/transform/managed-transforms/configure/). También se puede configurar una regla de límite de solicitudes para proteger las vistas y los eventos del sitio.

### Abrir el panel

Visita [`https://amartecr.com/admin/analytics`](https://amartecr.com/admin/analytics). Inicia sesión con el usuario y la contraseña configurados en `ANALYTICS_ADMIN_USER` y `ANALYTICS_ADMIN_PASSWORD`. La base comienza vacía y acumula datos desde este despliegue.

El panel permite elegir fechas desde/hasta, página, sección, elemento y fuente; comparar actividad diaria; ver exposición/navegación/contacto por sección; distinguir los CTA de WhatsApp por servicio y posición; revisar aperturas de FAQ y contactos externos; y ver el mapa, la tabla completa de visitas por cantón, las visitas por zona y la tabla de visitas por provincia al final del dashboard. Al hacer clic o enfocar un cantón se presenta su nombre y conteo. Los cuadros geográficos usan solo visitas generales y el rango de fechas, no los otros filtros de interés, y muestran los conteos aunque sean pequeños. El mapa ofrece siete rangos de color. Kardex aparece como opción explícita pero está fuera del resumen comercial inicial. El API acepta fechas ISO y limita las consultas a los 25 meses de retención. Las métricas no reconstruyen recorridos ni afirman conversiones individuales.

---

## 🔍 Monitoreo y Solución de Problemas

1. **¿Qué hacer si un despliegue falla?**
   - Ejecuta `railway logs` para revisar el error en la consola.
   - En el dashboard de Railway, ve a la pestaña **Deployments** y revisa la pestaña **Build Logs** y **Deploy Logs**.
   - Puedes hacer rollback inmediato a un despliegue anterior haciendo clic en **Redeploy** en un despliegue que haya tenido éxito (`SUCCESS`).

2. **Verificar que la web esté activa:**
   ```bash
   curl -I https://amarte-lactancia-production.up.railway.app/health
   ```
   Debe responder con `HTTP/1.1 200 OK`.
