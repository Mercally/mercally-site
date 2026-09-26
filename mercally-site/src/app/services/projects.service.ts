import { Injectable } from '@angular/core';
import { Project } from '../models/project';

const CASE_STUDIES: Project[] = [
  {
    slug: 'email-reader',
    titleEs: 'Lector de Correo Multi-Proveedor',
    titleEn: 'Multi-Provider Email Reader',
    tagsEs: ['SaaS Multi-tenant', 'Clean Architecture', 'Integraciones'],
    tagsEn: ['Multi-tenant SaaS', 'Clean Architecture', 'Integrations'],
    oneLinerEs: 'Captura e ingesta automatizada de comprobantes fiscales enviados por correo.',
    oneLinerEn: 'Automated ingestion of tax documents received by email.',
    contextEs:
      'Proveedores envían documentos tributarios electrónicos como adjuntos a través de Gmail, Microsoft 365 y Yahoo Mail. El sistema necesita monitorear múltiples cuentas y proveedores de correo de forma continua.',
    contextEn:
      'Suppliers send electronic tax documents as email attachments across Gmail, Microsoft 365 and Yahoo Mail. The system needs to continuously monitor multiple mailboxes and providers.',
    problemEs:
      'Cada proveedor de correo expone una API distinta (OAuth, protocolos de sincronización, límites de tasa), y no todos los correos entrantes contienen comprobantes válidos: hay que filtrar ruido antes de procesar y almacenar archivos.',
    problemEn:
      'Each mail provider exposes a different API (OAuth, sync protocols, rate limits), and not every incoming email carries a valid document — noise must be filtered before processing and storing files.',
    architectureDecisionEs: [
      'Plataforma SaaS multi-tenant: una sola implementación sirve a todas las empresas clientes.',
      'Adaptador por proveedor (Gmail, Microsoft Graph, Yahoo) detrás de una interfaz común de ingesta de correo.',
      'Pipeline de filtrado que descarta correos sin adjuntos relevantes antes de tocar almacenamiento.',
      'Guardado de archivos desacoplado del origen de correo, para poder añadir proveedores sin tocar el almacenamiento.',
      'Una sola base de datos PostgreSQL compartida, con Row-Level Security (RLS) para aislar los datos de cada tenant a nivel de fila.',
      'Idempotencia por message-id: cada correo se identifica por el ID que entrega la sincronización o la notificación webhook, evitando procesarlo dos veces.',
      'Reintentos con Polly en las llamadas HTTP a los proveedores; si el fallo persiste, el mensaje se registra en una tabla dead-letter en PostgreSQL en vez de perderse.',
      'Rate limiting propio (global y por usuario) implementado en C#, con el estado de peticiones por ventana de tiempo persistido en base de datos, para que un tenant no agote la cuota de otro.',
      'Rotación de secretos vía Key Vault, con una instancia separada por ambiente.',
      'Observabilidad con .NET Aspire y OpenTelemetry: correlation-id de extremo a extremo, ingestado a Seq (alternativa evaluada: Azure Application Insights, de pago).',
      'Retención de archivos configurable por usuario, en vez de una política fija global.',
    ],
    architectureDecisionEn: [
      'Multi-tenant SaaS platform: a single deployment serves every customer company.',
      'Per-provider adapter (Gmail, Microsoft Graph, Yahoo) behind a common mail-ingestion interface.',
      'Filtering pipeline that discards emails without relevant attachments before touching storage.',
      'File storage decoupled from the mail source, so new providers can be added without touching storage.',
      'One shared PostgreSQL database, with Row-Level Security (RLS) isolating each tenant\'s data at the row level.',
      'Idempotency by message-id: each email is identified by the ID handed back by sync or the webhook notification, preventing it from being processed twice.',
      'Retries with Polly on HTTP calls to providers; if the failure persists, the message is logged to a dead-letter table in PostgreSQL instead of being lost.',
      'Custom rate limiting (global and per-user) built in C#, with request-per-window state persisted in the database, so one tenant can\'t starve another\'s quota.',
      'Secret rotation via Key Vault, with a separate instance per environment.',
      'Observability with .NET Aspire and OpenTelemetry: end-to-end correlation-id, ingested into Seq (evaluated alternative: paid Azure Application Insights).',
      'File retention configurable per user, instead of one fixed global policy.',
    ],
    tradeOffs: [
      {
        aspectEs: 'Adaptadores por proveedor vs. cliente IMAP genérico',
        aspectEn: 'Per-provider adapters vs. generic IMAP client',
        descriptionEs:
          'Más código de mantenimiento a cambio de aprovechar OAuth y webhooks nativos de cada proveedor, más confiables que polling IMAP.',
        descriptionEn:
          'More maintenance surface in exchange for native OAuth and webhooks per provider, more reliable than IMAP polling.',
      },
      {
        aspectEs: 'Base de datos compartida con RLS vs. base de datos por tenant',
        aspectEn: 'Shared database with RLS vs. database-per-tenant',
        descriptionEs:
          'Una sola base reduce costo operativo y simplifica migraciones; RLS aplica el aislamiento a nivel de motor de base de datos en vez de confiar solo en la capa de aplicación.',
        descriptionEn:
          'A single database lowers operational cost and simplifies migrations; RLS enforces isolation at the database engine level instead of relying on the application layer alone.',
      },
      {
        aspectEs: 'PostgreSQL vs. MongoDB para el contenido de los documentos',
        aspectEn: 'PostgreSQL vs. MongoDB for document content',
        descriptionEs:
          'El sistema captura y almacena los adjuntos como archivos, sin leer ni estructurar el contenido del comprobante fiscal. Si esa lectura estructurada fuera un requisito, MongoDB encajaría mejor: el comprobante ya es JSON y se guardaría tal cual, sin mapearlo a un esquema relacional.',
        descriptionEn:
          'The system captures and stores attachments as files, without parsing or structuring the tax document content. If structured reading became a requirement, MongoDB would be a better fit: the document is already JSON and could be stored as-is, without mapping it to a relational schema.',
      },
      {
        aspectEs: 'Un solo nodo VPS en producción vs. clúster de alta disponibilidad',
        aspectEn: 'Single production VPS node vs. high-availability cluster',
        descriptionEs:
          'Producción corre en un único nodo VPS, con un nodo de staging separado. Es una restricción conocida de escalamiento, aceptada por simplicidad operativa mientras la carga no lo justifique.',
        descriptionEn:
          'Production runs on a single VPS node, with a separate staging node. This is a known scaling constraint, accepted for operational simplicity while load doesn\'t justify more.',
      },
    ],
    resultsEs: ['Ingesta continua desde tres proveedores de correo sin intervención manual.'],
    resultsEn: ['Continuous ingestion from three mail providers with no manual intervention.'],
    diagram: '/assets/architecture-diagrams/email-reader.html',
    dateAdded: '2026-09-09',
    relatedPatterns: ['multi-tenant-saas', 'clean-architecture'],
  },
  {
    slug: 'wordpress-landing-vps',
    titleEs: 'Landing WordPress en VPS propio',
    titleEn: 'Self-Hosted WordPress Landing on a VPS',
    tagsEs: ['WordPress', 'Docker', 'VPS', 'Freelance'],
    tagsEn: ['WordPress', 'Docker', 'VPS', 'Freelance'],
    oneLinerEs: 'Landing page para cliente en WordPress, desplegada en un VPS propio con Docker.',
    oneLinerEn: 'Client landing page on WordPress, deployed to a self-managed VPS with Docker.',
    contextEs:
      'Un cliente freelance necesitaba una landing page que pudiera editar por su cuenta, sin depender de hosting compartido ni de planes de WordPress gestionado, con control total de la infraestructura y un costo fijo predecible.',
    contextEn:
      'A freelance client needed a landing page they could edit on their own, without relying on shared hosting or managed WordPress plans, with full infrastructure control and a predictable fixed cost.',
    problemEs:
      'El hosting compartido o gestionado limita configuración y rendimiento a cambio de una cuota recurrente que crece con el plan; el cliente quería control sobre el stack sin ese costo variable.',
    problemEn:
      'Shared or managed hosting limits configuration and performance in exchange for a recurring fee that grows with the plan; the client wanted control over the stack without that variable cost.',
    architectureDecisionEs: [
      'Droplet de DigitalOcean como VPS: costo mensual fijo y acceso completo al sistema operativo.',
      'WordPress y MySQL en contenedores con Docker Compose, cada uno con su volumen persistente.',
      'Traefik como reverse proxy, con certificados TLS de Let\'s Encrypt emitidos y renovados automáticamente y redirección de HTTP a HTTPS.',
      'Backups programados por cron: volcado de MySQL y copia de wp-content.',
      'Acceso SSH solo por llave, sin login de root, y firewall que expone únicamente SSH, HTTP y HTTPS.',
      'fail2ban y límite de intentos de login en WordPress contra ataques de fuerza bruta.',
      'Entrega al cliente con acceso al panel de WordPress para administrar el contenido sin intervención técnica.',
    ],
    architectureDecisionEn: [
      'DigitalOcean Droplet as the VPS: fixed monthly cost and full access to the operating system.',
      'WordPress and MySQL containerized with Docker Compose, each with its own persistent volume.',
      'Traefik as reverse proxy, with Let\'s Encrypt TLS certificates issued and renewed automatically and HTTP-to-HTTPS redirection.',
      'Scheduled backups via cron: MySQL dump plus a copy of wp-content.',
      'Key-only SSH access, root login disabled, and a firewall exposing only SSH, HTTP and HTTPS.',
      'fail2ban and a WordPress login-attempt limit against brute-force attacks.',
      'Handover to the client with WordPress admin access to manage content without technical help.',
    ],
    tradeOffs: [
      {
        aspectEs: 'Docker en VPS propio vs. WordPress gestionado',
        aspectEn: 'Docker on own VPS vs. managed WordPress',
        descriptionEs:
          'Más responsabilidad de mantenimiento (actualizaciones, backups, seguridad del servidor) a cambio de un costo fijo bajo y control total del stack.',
        descriptionEn:
          'More maintenance responsibility (updates, backups, server security) in exchange for a low fixed cost and full control of the stack.',
      },
      {
        aspectEs: 'Traefik vs. Nginx con Certbot',
        aspectEn: 'Traefik vs. Nginx with Certbot',
        descriptionEs:
          'Traefik descubre los contenedores y gestiona los certificados por su cuenta, sin cron de renovación aparte; a cambio, su configuración por labels es menos conocida que un archivo de Nginx.',
        descriptionEn:
          'Traefik discovers containers and manages certificates on its own, with no separate renewal cron; in exchange, its label-based configuration is less familiar than an Nginx config file.',
      },
      {
        aspectEs: 'Un solo servidor vs. alta disponibilidad',
        aspectEn: 'Single server vs. high availability',
        descriptionEs:
          'Un único droplet es suficiente para el tráfico de una landing page; la recuperación ante fallos se apoya en los backups en vez de en redundancia.',
        descriptionEn:
          'A single droplet is enough for landing-page traffic; failure recovery relies on backups rather than redundancy.',
      },
    ],
    resultsEs: [
      'El cliente edita y publica contenido de forma autónoma desde el panel de WordPress.',
      'Costo de infraestructura fijo, sin cuota de hosting gestionado.',
      'Certificados TLS renovados automáticamente, sin intervención manual.',
    ],
    resultsEn: [
      'The client edits and publishes content independently from the WordPress admin.',
      'Fixed infrastructure cost, with no managed-hosting fee.',
      'TLS certificates renewed automatically, with no manual intervention.',
    ],
    diagram: '/assets/architecture-diagrams/wordpress-landing-vps.html',
    dateAdded: '2026-09-26',
  },
  {
    slug: 'o365-sharepoint-project-tracker',
    titleEs: 'Microsoft 365 y gestión de proyectos en SharePoint',
    titleEn: 'Microsoft 365 and SharePoint Project Tracking',
    tagsEs: ['Microsoft 365', 'SharePoint', 'Power Automate', 'Low-code'],
    tagsEn: ['Microsoft 365', 'SharePoint', 'Power Automate', 'Low-code'],
    oneLinerEs:
      'Dominio corporativo en Microsoft 365 con SharePoint Lists como base de gestión de proyectos, automatizada con Power Automate.',
    oneLinerEn:
      'Corporate Microsoft 365 domain with SharePoint Lists as the project-management base, automated with Power Automate.',
    contextEs:
      'Una PyME de entre 5 y 15 personas sin dominio corporativo formal. La gestión de proyectos estaba dispersa en hojas de cálculo, correos y chats.',
    contextEn:
      'An SME of 5 to 15 people without a formal corporate domain. Project management was scattered across spreadsheets, emails and chats.',
    problemEs:
      'No existía una fuente única de verdad sobre el estado de proyectos y tareas: sin trazabilidad de cambios ni avisos automáticos, el seguimiento dependía de preguntar el estado a cada persona.',
    problemEn:
      'There was no single source of truth for project and task status: with no change traceability or automatic alerts, follow-up depended on asking each person for status.',
    architectureDecisionEs: [
      'Selección del nombre de dominio y configuración en el tenant de Microsoft 365 (verificación DNS y registros de correo).',
      'Correo corporativo con el dominio propio para todo el equipo.',
      'Sitio de SharePoint dedicado con Lists de proyectos y tareas, con columnas de estado, responsable y fecha límite.',
      'Permisos mediante grupos de Microsoft 365 por rol, en lugar de asignaciones individuales.',
      'Flujo de Power Automate que notifica al equipo cuando un proyecto o tarea cambia de estado.',
      'Flujo programado que envía recordatorios antes de la fecha límite.',
      'Flujo de aprobación para los pasos que requieren visto bueno de dirección.',
    ],
    architectureDecisionEn: [
      'Domain name selection and setup in the Microsoft 365 tenant (DNS verification and mail records).',
      'Corporate email on the company\'s own domain for the whole team.',
      'Dedicated SharePoint site with project and task Lists, with status, owner and due-date columns.',
      'Permissions through role-based Microsoft 365 groups instead of individual assignments.',
      'Power Automate flow that notifies the team when a project or task changes status.',
      'Scheduled flow that sends reminders ahead of the due date.',
      'Approval flow for steps that require management sign-off.',
    ],
    tradeOffs: [
      {
        aspectEs: 'SharePoint Lists vs. Dataverse / Power Apps',
        aspectEn: 'SharePoint Lists vs. Dataverse / Power Apps',
        descriptionEs:
          'Solución low-code más rápida de implementar y sin licencias adicionales, a cambio de un modelo de datos y una interfaz menos flexibles que una Power App a medida.',
        descriptionEn:
          'A faster low-code solution with no extra licensing, in exchange for a less flexible data model and UI than a custom Power App.',
      },
      {
        aspectEs: 'Microsoft 365 vs. herramienta dedicada (Asana, Monday, Jira)',
        aspectEn: 'Microsoft 365 vs. a dedicated tool (Asana, Monday, Jira)',
        descriptionEs:
          'Se evaluaron y descartaron por costo: la empresa ya pagaba Microsoft 365, y una herramienta aparte sumaba licencias por usuario y otro lugar donde buscar la información.',
        descriptionEn:
          'Evaluated and discarded on cost: the company already paid for Microsoft 365, and a separate tool meant extra per-user licenses and another place to look for information.',
      },
    ],
    resultsEs: [
      'Una fuente única de verdad para proyectos y tareas, en reemplazo de hojas de cálculo y correos sueltos.',
      'Menos seguimiento manual: las notificaciones y recordatorios sustituyen preguntar el estado.',
      'Adopción del equipo en el trabajo diario.',
      'Correo corporativo activo con dominio propio.',
    ],
    resultsEn: [
      'A single source of truth for projects and tasks, replacing spreadsheets and scattered emails.',
      'Less manual follow-up: notifications and reminders replace asking for status.',
      'Adopted by the team in daily work.',
      'Corporate email live on the company\'s own domain.',
    ],
    diagram: '/assets/architecture-diagrams/o365-sharepoint-project-tracker.html',
    dateAdded: '2026-09-26',
  },
];

@Injectable({ providedIn: 'root' })
export class CaseStudyService {
  readonly all: Project[] = CASE_STUDIES;

  getBySlug(slug: string): Project | undefined {
    return CASE_STUDIES.find((c) => c.slug === slug);
  }
}
