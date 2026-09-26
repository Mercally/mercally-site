# Draft: nuevos proyectos

Borrador para revisar. Campos `[COMPLETAR]` necesitan dato real tuyo antes de pasar a `projects.service.ts` (interfaz `Project` en `src/app/models/project.ts`).

---

## 1. Landing page WordPress en VPS (Docker)

- **slug**: `wordpress-landing-vps`
- **tags (ES)**: WordPress, Docker, VPS, Freelance
- **tags (EN)**: WordPress, Docker, VPS, Freelance

**One-liner**
- ES: Landing page para cliente en WordPress, desplegada en VPS propio vía Docker.
- EN: Client landing page on WordPress, deployed to a self-managed VPS via Docker.

**Contexto**
- ES: Cliente freelance necesitaba una landing page sin depender de hosting compartido o WordPress gestionado, buscando control total de la infraestructura y costo fijo predecible.
- EN: Freelance client needed a landing page without relying on shared hosting or managed WordPress, wanting full infrastructure control and a predictable fixed cost.

**Problema**
- ES: Hosting compartido/managed limita configuración, performance y escala a cambio de una cuota recurrente creciente; el cliente quería control sobre el stack sin ese costo variable.
- EN: Shared/managed hosting limits configuration, performance and scale in exchange for a growing recurring fee; the client wanted stack control without that variable cost.

**Decisiones de arquitectura**
- ES:
  - Stack containerizado: WordPress + MySQL + Nginx en Docker Compose.
  - `[COMPLETAR]` Reverse proxy / TLS: ¿Nginx directo con Certbot, o Traefik con Let's Encrypt automático?
  - `[COMPLETAR]` Estrategia de backups (volúmenes Docker, cron a S3/otro storage).
  - `[COMPLETAR]` Hardening aplicado (fail2ban, límites de login WP, headers de seguridad).
  - `[COMPLETAR]` Proveedor del VPS y por qué (DigitalOcean, Hetzner, Contabo, etc.).
- EN: mirror of the above once completed.

**Trade-offs**
- ES:
  - Docker propio vs. WordPress gestionado: más trabajo de mantenimiento a cambio de costo fijo bajo y control total del stack.
  - `[COMPLETAR]` ¿Algún otro trade-off relevante? (ej. sin CDN, sin staging automatizado, etc.)
- EN: mirror.

**Resultados**
- ES: `[COMPLETAR]` (tiempo de carga, uptime, costo mensual vs. alternativa gestionada, etc.)
- EN: `[COMPLETAR]`

**dateAdded**: `[COMPLETAR]` (YYYY-MM-DD)
**relatedPatterns**: `[COMPLETAR]` (ej. `containerized-deployment`)

---

## 2. Dominio corporativo Microsoft 365 + SharePoint Lists (gestión de proyectos) + Power Automate

- **slug**: `o365-sharepoint-project-tracker`
- **tags (ES)**: Microsoft 365, SharePoint, Power Automate, Low-code
- **tags (EN)**: Microsoft 365, SharePoint, Power Automate, Low-code

**One-liner**
- ES: Dominio corporativo en Microsoft 365 con SharePoint Lists como backend de gestión de proyectos, automatizado con Power Automate.
- EN: Corporate Microsoft 365 domain with SharePoint Lists as project-management backend, automated with Power Automate.

**Contexto**
- ES: `[COMPLETAR]` Empresa/cliente sin dominio corporativo formal en M365; gestión de proyectos dispersa en hojas de cálculo, correo o chats sueltos.
- EN: `[COMPLETAR]` Company/client without a formal M365 corporate domain; project management scattered across spreadsheets, email or chat.

**Problema**
- ES: `[COMPLETAR]` Falta de fuente única de verdad para el estado de proyectos/tareas, sin trazabilidad ni notificaciones automáticas ante cambios.
- EN: `[COMPLETAR]` No single source of truth for project/task status, no traceability or automatic notifications on changes.

**Decisiones de arquitectura**
- ES:
  - Configuración de dominio custom en tenant M365 (verificación DNS, correo).
  - Sitio de SharePoint dedicado con Lists como backend de datos (proyectos, tareas, estados).
  - Flujos en Power Automate para automatizar notificaciones y cambios de estado.
  - `[COMPLETAR]` Estructura de permisos/grupos de seguridad.
  - `[COMPLETAR]` Columnas clave de las listas (estado, responsable, fecha límite, prioridad...).
- EN: mirror of the above once completed.

**Trade-offs**
- ES:
  - SharePoint Lists vs. Dataverse/Power Apps: solución low-code más rápida de implementar, a cambio de menos flexibilidad de modelo de datos y UI que una Power App custom.
  - `[COMPLETAR]` ¿Se evaluó una herramienta dedicada (Asana, Monday, Jira) y se descartó por qué?
- EN: mirror.

**Resultados**
- ES: `[COMPLETAR]` (tiempo ahorrado, adopción del equipo, número de flujos activos, etc.)
- EN: `[COMPLETAR]`

**dateAdded**: `[COMPLETAR]` (YYYY-MM-DD)
**relatedPatterns**: `[COMPLETAR]` (ej. `low-code-automation`)

---

## Pendiente general
- Confirmar si algún proyecto necesita `diagram` (HTML como en `email-reader`, ver `/assets/architecture-diagrams/`).
- Nombres de cliente: ¿se pueden mencionar o quedan anónimos ("cliente freelance", "empresa cliente")?
