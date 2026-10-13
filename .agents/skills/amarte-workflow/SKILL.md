---
name: amarte-workflow
description: Flujo de trabajo para modificar y desplegar el repositorio amarte-maternidad con GitHub y Railway.
---

# Flujo de trabajo de Amarte Maternidad

## Sincronizar con `main` antes de cada cambio

Antes de empezar cada nueva tarea que modifique código, documentación, configuración o assets:

1. Ejecutar `git status --short --branch` y revisar la rama y cualquier cambio local. No sobrescribir, descartar ni ocultar cambios existentes sin entenderlos.
2. Ejecutar `git fetch origin` para obtener el estado actual del remoto.
3. Si se trabaja directamente en `main`, actualizarla con `git pull --ff-only origin main`. No continuar si no se puede hacer fast-forward; investigar primero la divergencia.
4. Si se trabaja en una rama de trabajo, integrar antes los cambios más recientes de `main` con `git merge origin/main`. Resolver conflictos preservando tanto el trabajo local como lo que llegó a `main`; si no se pueden resolver con seguridad, detenerse y explicar el conflicto.
5. Confirmar con `git status --short --branch` que la base quedó sincronizada antes de editar.

Repetir esta comprobación al comenzar cada tarea nueva, aunque la tarea anterior haya sido reciente. No hacer `git pull origin main` estando en otra rama: primero se actualiza la referencia remota con `fetch` y luego se fusiona `origin/main` en la rama de trabajo.

## Después de los cambios

- Revisar el diff y el estado de Git para confirmar que solo están los cambios previstos.
- No desplegar directamente desde un árbol de trabajo local. El flujo de producción esperado es integrar los cambios en `main` y dejar que Railway despliegue desde GitHub.
- Antes de afirmar que el despliegue automático funciona, comprobar que Railway tiene acceso al repositorio y que existe un disparador de despliegue para `main`; la conexión de la fuente por sí sola no garantiza que se creen despliegues.
- Si `main` avanza mientras se trabaja, sincronizar e integrar de nuevo `origin/main` antes de publicar o integrar el cambio.
