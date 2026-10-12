# 🌸 Amarte Maternidad — Plataforma Web & Kardex Doula

Bienvenido/a al repositorio oficial de **Amarte Maternidad** (*amarte.maternidad.cr*), liderado por Juliana Rojas Argüello (Doula de Parto & Asesora de Lactancia Materna en Costa Rica).

Este proyecto integra:
1. **Sitio Web & Catálogo Oficial (`index.html`)**: Presentación de servicios de acompañamiento de doula, asesorías de lactancia, cursos de preparación al parto y catálogo de productos artesanales de apego y dentición en crochet con enlace directo a WhatsApp.
2. **Kardex Virtual de Familias (`kardex.html`)**: Herramienta interactiva para gestión, seguimiento prenatal/posparto, bitácora de lactancia y control clínico de familias atendidas.

---

## 📁 Estructura del Proyecto

```text
Amarte Maternidad/
├── index.html            # Página de inicio y catálogo comercial
├── app.js                # Lógica del catálogo de productos y WhatsApp
├── styles.css            # Estilos personalizados y tipografías
├── kardex.html           # Módulo Kardex Virtual para doulas
├── kardex.js             # Lógica interactiva del Kardex
├── logo.png              # Logotipo oficial
├── imagenes/             # Fotografías reales de productos, sesiones y recursos
├── server.js             # Servidor HTTP para producción (Railway) y pruebas
├── analytics.js          # Analítica agregada de secciones, navegación y contactos
├── analytics-consent.js  # Preferencia de consentimiento analítico
├── analytics-dashboard.html # Interfaz privada de analítica
├── privacidad.html       # Aviso público de privacidad y analítica
├── package.json          # Metadatos del proyecto y scripts de arranque
├── railway.json          # Configuración de despliegue continuo en Railway
├── Dockerfile            # Configuración opcional para despliegue en contenedor
├── DEPLOYMENT.md         # Guía completa de despliegue, CI/CD y Railway
├── .env.example          # Plantilla de variables de entorno
├── .gitignore            # Archivos excluidos del control de versiones
└── README.md             # Esta documentación
```

---

## 💻 Ejecución en Entorno Local

Puedes correr el proyecto en tu computadora de dos formas:

### Opción 1: Con Node.js (Recomendado)
```bash
# Iniciar el servidor local
npm start
# O directamente:
node server.js
```
Abre en tu navegador:
- **Sitio Web:** [http://localhost:3000](http://localhost:3000)
- **Kardex Doula:** [http://localhost:3000/kardex](http://localhost:3000/kardex)
- **Estado del Servidor:** [http://localhost:3000/health](http://localhost:3000/health)

### Opción 2: Con Python (Sin necesidad de instalar Node)
```bash
python3 -m http.server 3000
```
Y visita [http://localhost:3000](http://localhost:3000).

---

## 🐙 Paso a Paso: Subir a GitHub por Primera Vez

1. **Crea un nuevo repositorio en GitHub**:
   - Ingresa a [github.com/new](https://github.com/new).
   - Nómbralo: `amarte-maternidad` (puedes elegirlo Público o Privado).
   - **No** marques las opciones de agregar README, .gitignore ni licencia (ya los tenemos listos aquí).
   - Haz clic en **Create repository**.

2. **Vincula tu repositorio local y sube los archivos**:
   Abre tu terminal en esta carpeta y ejecuta los siguientes comandos (reemplazando `TU-USUARIO` por tu usuario de GitHub):

   ```bash
   # 1. Vincular el repositorio remoto de GitHub
   git remote add origin https://github.com/TU-USUARIO/amarte-maternidad.git

   # 2. Asegurarse de estar en la rama principal 'main'
   git branch -M main

   # 3. Subir el proyecto a GitHub
   git push -u origin main
   ```

---

## 🚂 Despliegue en Producción (Railway & CI/CD)

El proyecto cuenta con **Despliegue Continuo (CI/CD)** automático integrado entre **GitHub** y **Railway**:

* **URL de Producción:** [https://amarte-lactancia-production.up.railway.app](https://amarte-lactancia-production.up.railway.app)
* **Kardex Doula:** [https://amarte-lactancia-production.up.railway.app/kardex](https://amarte-lactancia-production.up.railway.app/kardex)
* **Monitor de Salud:** [https://amarte-lactancia-production.up.railway.app/health](https://amarte-lactancia-production.up.railway.app/health)
* **Repositorio Vinculado:** `julirojasarg/amarte-maternidad` (rama `main`)

### ⚡ ¿Cómo se publican los cambios? (Despliegue Automático)
1. Cada vez que hagas `git push origin main` o se apruebe y fusione un **Pull Request** a la rama `main`, GitHub notificará automáticamente a Railway mediante webhooks.
2. Railway compilará el código y desplegará la nueva versión en aproximadamente 30 a 60 segundos con cero tiempo de inactividad (*zero-downtime*).
3. No requieres ingresar a Railway ni correr comandos adicionales para actualizar la web.

> 📖 Para una guía paso a paso completa sobre configuración, despliegue manual por CLI, rollback y monitoreo de logs, consulta [DEPLOYMENT.md](DEPLOYMENT.md).

## 📊 Analítica propia

El servidor guarda contadores agregados en PostgreSQL. La analítica propia está desactivada hasta que la persona visitante la acepta; rechazarla no afecta el sitio ni sus funciones. La elección se recuerda en una cookie de preferencia durante un año. El panel privado está en [`/admin/analytics`](https://amartecr.com/admin/analytics) y permite filtrar por fechas, página, sección, elemento y fuente. Incluye actividad diaria, exposiciones aproximadas a secciones, navegación elegida, aperturas de FAQ y contactos por CTA, además de visitas generales por provincia y zona aproximada. El [aviso de privacidad](https://amartecr.com/privacidad) explica el tratamiento y los proveedores técnicos.

Las cargas se cuentan para `/` y `/kardex` únicamente con aceptación de analítica; las interacciones de secciones, navegación, FAQ y contactos también requieren aceptación y solo se miden en `/`. `analytics_daily` agrega páginas/eventos por día y fuente; `analytics_province_daily` y `analytics_canton_daily` guardan conteos geográficos separados, sin fuente ni datos de interacción. Una migración consolida los conteos históricos por fuente y provincia de forma independiente. `analytics_detail_daily` guarda eventos diarios por sección y elemento categorizado, sin ubicación. No se calculan visitantes únicos ni recorridos individuales. La base analítica no guarda IP ni coordenadas; una cookie de preferencia recuerda aceptación/rechazo por un año. El servidor usa coordenadas aproximadas que recibe de Cloudflare en memoria para estimar cantón y las descarta. No guarda texto de WhatsApp, nombre de producto/servicio, mensaje ni URL de referencia completa. Actualmente no se enlazan clics con pedidos o ventas. El detalle nuevo empieza con este despliegue; el histórico anterior no atribuye los clics a un botón o sección. El Kardex se excluye del resumen comercial por defecto y la tienda oculta no se instrumenta. Las tablas activas se purgan diariamente al superar 25 meses; las copias de seguridad y los registros técnicos de Cloudflare/Railway siguen sus políticas y configuraciones. El panel muestra el mapa y la tabla por cantón y provincia; al seleccionar un cantón aparece su nombre y conteo. El mapa usa límites oficiales del IGN 2022 y siete rangos de color. Fuente: [capa cantonal del IGN en SNIT/ArcGIS](https://services8.arcgis.com/gEjMfQjIBmRHMGao/arcgis/rest/services/Cantones_de_Costa_Rica/FeatureServer).

El servicio PostgreSQL `Postgres` y las variables protegidas `DATABASE_URL`, `ANALYTICS_ADMIN_USER`, `ANALYTICS_ADMIN_PASSWORD` y `ANALYTICS_CF_TOKEN` están configurados en Railway producción. El panel solicita el usuario y contraseña guardados en esas variables. Las visitas solo se asignan a provincia cuando Cloudflare envía encabezados geográficos válidos y el token de origen requerido. Los pasos están en [DEPLOYMENT.md](DEPLOYMENT.md).

---

## 👥 Guía de Colaboración en Equipo para Próximas Sesiones

Para trabajar ordenadamente con otros colaboradores y evitar sobreescrituras accidentales de código, seguiremos el siguiente flujo de trabajo profesional:

### 1. Clonar el proyecto (Para el nuevo colaborador)
El nuevo desarrollador solo debe clonar el repositorio:
```bash
git clone https://github.com/julirojasarg/amarte-maternidad.git
cd amarte-maternidad
```

### 2. Flujo de Ramas (Branching Workflow)
**Regla de oro:** Nunca trabajar ni hacer `commit` directo en la rama `main`.

Antes de realizar cualquier cambio, crea una rama descriptiva:
```bash
# 1. Asegúrate de tener los últimos cambios de main
git checkout main
git pull origin main

# 2. Crear una nueva rama para tu tarea específica
git checkout -b feature/nuevo-producto-crochet
# O para correcciones:
# git checkout -b fix/alineacion-formulario
```

### 3. Guardar Cambios con Commits Semánticos
Realiza tus modificaciones y confírmalas con mensajes claros:
```bash
# Ver archivos modificados
git status

# Agregar archivos modificados
git add .

# Crear commit descriptivo
git commit -m "feat: agregar nuevo sonajero de apego al catálogo"
```

*Ejemplos de prefijos recomendados:*
- `feat:` Nuevas funcionalidades, páginas o productos.
- `fix:` Corrección de errores o enlaces caídos.
- `style:` Ajustes visuales, colores, márgenes, tipografías.
- `docs:` Cambios en documentación o comentarios.

### 4. Subir la Rama y Crear un Pull Request (PR)
```bash
# Subir la rama a GitHub
git push -u origin feature/nuevo-producto-crochet
```

1. Ve al repositorio en **GitHub**. Verás un botón amarillo: **"Compare & pull request"**.
2. Haz clic en él, escribe una breve descripción de lo que cambiaste y haz clic en **"Create pull request"**.
3. El otro colaborador revisa los cambios en GitHub y deja sus comentarios o aprobación.
4. Una vez aprobado, se presiona **"Merge pull request"**.
5. **Railway desplegará automáticamente la nueva versión en producción.**

---

## 📞 Soporte y Contacto
- **Titular:** Juliana Rojas Argüello
- **WhatsApp:** [+506 8552-2806](https://wa.me/50685522806)
- **Instagram:** [@amarte.maternidad.cr](https://instagram.com/amarte.maternidad.cr)
