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
];

@Injectable({ providedIn: 'root' })
export class CaseStudyService {
  readonly all: Project[] = CASE_STUDIES;

  getBySlug(slug: string): Project | undefined {
    return CASE_STUDIES.find((c) => c.slug === slug);
  }
}
