# 🚀 Guía de Despliegue y CI/CD — Amarte Maternidad

Este documento detalla la arquitectura de despliegue continuo (CI/CD), la vinculación entre **GitHub** y **Railway**, y los procedimientos para publicar cambios en producción de forma automática o manual.

---

## 🌐 Entorno de Producción Actual

* **Dominio Principal:** [https://amartecr.com](https://amartecr.com)
* **Dominio WWW:** [https://www.amartecr.com](https://www.amartecr.com)
* **URL Railway (Respaldo):** [https://amarte-lactancia-production.up.railway.app](https://amarte-lactancia-production.up.railway.app)
* **Endpoint de Salud (Healthcheck):** [https://amartecr.com/health](https://amartecr.com/health)
* **Kardex Doula:** [https://amartecr.com/kardex](https://amartecr.com/kardex)
* **Repositorio GitHub:** [`julirojasarg/amarte-maternidad`](https://github.com/julirojasarg/amarte-maternidad) (Rama de producción: `main`)
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

El repositorio está vinculado directamente al servicio en Railway. Esto significa que **cualquier cambio integrado a la rama `main` se publica automáticamente en producción sin intervención manual**.

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
   *Al ejecutarse el `push`, Railway inicia el despliegue automático inmediatamente.*

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
