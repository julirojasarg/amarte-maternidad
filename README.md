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
