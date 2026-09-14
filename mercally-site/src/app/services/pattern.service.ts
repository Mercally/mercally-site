import { Injectable } from '@angular/core';
import { ArchitecturePattern } from '../models/architecture-pattern';

const PATTERNS: ArchitecturePattern[] = [
  {
    slug: 'cqrs',
    name: 'CQRS',
    summaryEs:
      'Separar el modelo de lectura del modelo de escritura en vez de usar un único modelo para ambos.',
    summaryEn: 'Splitting the read model from the write model instead of using one model for both.',
    sections: [
      {
        id: 'what',
        titleEs: 'Qué resuelve',
        titleEn: 'What it solves',
        contentEs: [
          'Los comandos (escritura) validan reglas de negocio e invariantes; las consultas (lectura) solo proyectan datos para la UI.',
          'Permite optimizar lectura y escritura por separado: el modelo de escritura prioriza consistencia, el de lectura prioriza velocidad de consulta.',
          'Es independiente de Event Sourcing — se puede aplicar CQRS con una base de datos relacional normal, sin event store.',
        ],
        contentEn: [
          'Commands (writes) enforce business rules and invariants; queries (reads) just project data for the UI.',
          'Lets you optimize reads and writes independently: the write model favors consistency, the read model favors query speed.',
          'Independent of Event Sourcing — CQRS can run on a plain relational database with no event store involved.',
        ],
      },
      {
        id: 'when',
        titleEs: 'Cuándo tiene sentido',
        titleEn: 'When it makes sense',
        contentEs: [
          'El dominio tiene lógica de escritura compleja (validaciones, invariantes) mientras que las lecturas son mayormente de reporte/listado.',
          'Las cargas de lectura y escritura son muy distintas en volumen o forma, y escalarlas juntas es ineficiente.',
        ],
        contentEn: [
          'The domain has complex write logic (validation, invariants) while reads are mostly reporting/listing.',
          'Read and write load differ a lot in volume or shape, and scaling them together is wasteful.',
        ],
      },
      {
        id: 'tradeoffs',
        titleEs: 'Compensaciones',
        titleEn: 'Trade-offs',
        contentEs: [
          'Más piezas móviles: dos modelos (o más) que mantener sincronizados en vez de uno.',
          'Si se combina con proyecciones asíncronas, introduce consistencia eventual — la UI puede mostrar datos desactualizados por un instante.',
          'Para un CRUD simple es sobre-ingeniería: el costo de la separación no se paga solo si no hay complejidad de dominio real.',
        ],
        contentEn: [
          'More moving parts: two (or more) models to keep in sync instead of one.',
          'If paired with async projections, it introduces eventual consistency — the UI can show stale data for a moment.',
          'Overkill for a simple CRUD: the cost of the split does not pay for itself without real domain complexity.',
        ],
      },
    ],
  },
  {
    slug: 'clean-architecture',
    name: 'Clean Architecture / Hexagonal',
    summaryEs:
      'Aislar las reglas de negocio de los detalles técnicos (framework, base de datos, UI) mediante capas y puertos.',
    summaryEn:
      'Isolating business rules from technical details (framework, database, UI) via layers and ports.',
    sections: [
      {
        id: 'what',
        titleEs: 'Qué resuelve',
        titleEn: 'What it solves',
        contentEs: [
          'El dominio y los casos de uso no dependen de frameworks, ORMs ni proveedores externos — dependen solo de interfaces (puertos).',
          'La infraestructura (base de datos, HTTP, colas) implementa esas interfaces (adaptadores) y se puede reemplazar sin tocar el dominio.',
          'Facilita probar la lógica de negocio con tests unitarios rápidos, sin levantar base de datos ni servidor.',
        ],
        contentEn: [
          'The domain and use cases do not depend on frameworks, ORMs, or external providers — only on interfaces (ports).',
          'Infrastructure (database, HTTP, queues) implements those interfaces (adapters) and can be swapped without touching the domain.',
          'Makes it easy to unit-test business logic quickly, without spinning up a database or server.',
        ],
      },
      {
        id: 'when',
        titleEs: 'Cuándo tiene sentido',
        titleEn: 'When it makes sense',
        contentEs: [
          'El sistema va a vivir mucho tiempo y es probable que cambien piezas de infraestructura (base de datos, proveedor de pagos, framework web).',
          'Hay reglas de negocio no triviales que merecen quedar aisladas y testeadas independientemente de la capa web.',
        ],
        contentEn: [
          'The system will live a long time and infrastructure pieces (database, payment provider, web framework) are likely to change.',
          'There are non-trivial business rules worth isolating and testing independently of the web layer.',
        ],
      },
      {
        id: 'tradeoffs',
        titleEs: 'Compensaciones',
        titleEn: 'Trade-offs',
        contentEs: [
          'Más indirección: interfaces, mapeos entre capas, más archivos para el mismo caso de uso.',
          'En un CRUD pequeño o un prototipo, la ceremonia de capas suele costar más de lo que ahorra.',
          'Requiere disciplina del equipo para no filtrar detalles de infraestructura hacia el dominio "por conveniencia".',
        ],
        contentEn: [
          'More indirection: interfaces, mappings between layers, more files for the same use case.',
          'On a small CRUD or a prototype, the layering ceremony usually costs more than it saves.',
          'Requires team discipline to avoid leaking infrastructure details into the domain "for convenience".',
        ],
      },
    ],
  },
  {
    slug: 'event-driven',
    name: 'Event-Driven / Event Sourcing',
    summaryEs:
      'Comunicar servicios mediante eventos de dominio en vez de llamadas directas; opcionalmente, guardar el estado como secuencia de eventos.',
    summaryEn:
      'Communicating services via domain events instead of direct calls; optionally, storing state as a sequence of events.',
    sections: [
      {
        id: 'what',
        titleEs: 'Qué resuelve',
        titleEn: 'What it solves',
        contentEs: [
          'Event-driven desacopla productores y consumidores: el servicio que genera el evento no necesita saber quién lo consume.',
          'Event Sourcing (distinto de event-driven, aunque suelen combinarse) guarda cada cambio de estado como un evento inmutable en vez de solo el estado final — da auditoría completa y permite reconstruir el estado en cualquier punto del tiempo.',
        ],
        contentEn: [
          'Event-driven decouples producers and consumers: the service emitting the event does not need to know who consumes it.',
          'Event Sourcing (distinct from event-driven, though often combined) stores every state change as an immutable event instead of just the final state — full audit trail, and the state can be rebuilt at any point in time.',
        ],
      },
      {
        id: 'when',
        titleEs: 'Cuándo tiene sentido',
        titleEn: 'When it makes sense',
        contentEs: [
          'Varios servicios/módulos necesitan reaccionar al mismo hecho de negocio sin acoplarse entre sí.',
          'Se necesita auditoría real (quién cambió qué y cuándo) o la capacidad de reproducir el histórico — casos típicos de Event Sourcing.',
        ],
        contentEn: [
          'Several services/modules need to react to the same business fact without coupling to each other.',
          'Real audit trail is required (who changed what and when) or the ability to replay history — typical Event Sourcing cases.',
        ],
      },
      {
        id: 'tradeoffs',
        titleEs: 'Compensaciones',
        titleEn: 'Trade-offs',
        contentEs: [
          'Consistencia eventual: los consumidores procesan el evento después del hecho, no en la misma transacción.',
          'Depurar un flujo distribuido de eventos es más difícil que seguir una llamada síncrona — se necesita buena trazabilidad/observabilidad.',
          'Event Sourcing añade complejidad real: versión de eventos, snapshots para no reconstruir todo el historial cada vez, y una curva de aprendizaje para el equipo.',
        ],
        contentEn: [
          'Eventual consistency: consumers process the event after the fact, not in the same transaction.',
          'Debugging a distributed event flow is harder than following a synchronous call — needs good tracing/observability.',
          'Event Sourcing adds real complexity: event versioning, snapshots to avoid replaying full history every time, and a learning curve for the team.',
        ],
      },
    ],
  },
  {
    slug: 'multi-tenant-saas',
    name: 'Multi-tenant SaaS',
    summaryEs:
      'Servir a múltiples clientes (tenants) desde la misma aplicación, decidiendo cuánto comparten a nivel de infraestructura y datos.',
    summaryEn:
      'Serving multiple customers (tenants) from the same application, deciding how much they share at the infrastructure and data level.',
    sections: [
      {
        id: 'what',
        titleEs: 'Modelos comunes',
        titleEn: 'Common models',
        contentEs: [
          'Base de datos compartida con columna `tenant_id`: más barato de operar, pero requiere disciplina estricta para no filtrar datos entre tenants.',
          'Schema por tenant o base de datos por tenant: mejor aislamiento y más fácil de justificar ante requisitos de compliance, a costa de más overhead operativo (migraciones, backups, monitoreo por tenant).',
        ],
        contentEn: [
          'Shared database with a `tenant_id` column: cheaper to operate, but demands strict discipline to avoid leaking data across tenants.',
          'Schema-per-tenant or database-per-tenant: better isolation and easier to justify for compliance requirements, at the cost of more operational overhead (migrations, backups, per-tenant monitoring).',
        ],
      },
      {
        id: 'when',
        titleEs: 'Cuándo tiene sentido',
        titleEn: 'When it makes sense',
        contentEs: [
          'El producto se vende como SaaS a múltiples clientes que no deben ver los datos de otros.',
          'Aislamiento por tenant separado (schema/DB) tiene más sentido cuando hay requisitos regulatorios o clientes grandes que lo exigen contractualmente.',
        ],
        contentEn: [
          'The product is sold as SaaS to multiple customers who must never see each other\'s data.',
          'Separate-tenant isolation (schema/DB) makes more sense when there are regulatory requirements or large customers demanding it contractually.',
        ],
      },
      {
        id: 'tradeoffs',
        titleEs: 'Compensaciones',
        titleEn: 'Trade-offs',
        contentEs: [
          'Base compartida: un bug en el filtro por tenant es un incidente de seguridad, no solo un bug — cada query debe filtrar correctamente.',
          'Base/schema por tenant: cada release toca N bases de datos; escalar a miles de tenants vuelve costosa la gestión operativa.',
          'El modelo elegido afecta directamente cómo se factura, cómo se hacen backups y cómo se cumple con requisitos de residencia de datos.',
        ],
        contentEn: [
          'Shared database: a bug in the tenant filter is a security incident, not just a bug — every query must filter correctly.',
          'Database/schema per tenant: every release touches N databases; scaling to thousands of tenants makes operations expensive.',
          'The chosen model directly affects billing, backups, and how data-residency requirements are met.',
        ],
      },
    ],
  },
  {
    slug: 'microservices-vs-monolith',
    name: 'Microservices vs Monolith',
    summaryEs:
      'Decidir entre desplegar como un único servicio o dividir por capacidades de negocio, según el tamaño real del problema y del equipo.',
    summaryEn:
      'Choosing between shipping as a single service or splitting by business capability, based on the real size of the problem and the team.',
    sections: [
      {
        id: 'what',
        titleEs: 'El eje real de la decisión',
        titleEn: 'The real axis of the decision',
        contentEs: [
          'No es "monolito = malo, microservicios = bueno": es cuánto acoplamiento organizacional y de despliegue puede tolerar el equipo.',
          'Un monolito modular (módulos con límites claros dentro de un solo despliegue) suele ser el punto intermedio correcto antes de pagar el costo de una red distribuida.',
        ],
        contentEn: [
          'It is not "monolith = bad, microservices = good": it is how much organizational and deployment coupling the team can tolerate.',
          'A modular monolith (clear module boundaries within a single deployment) is often the right middle ground before paying the cost of a distributed network.',
        ],
      },
      {
        id: 'when',
        titleEs: 'Cuándo separar en servicios',
        titleEn: 'When to split into services',
        contentEs: [
          'Equipos distintos necesitan desplegar y escalar sus partes de forma independiente sin coordinar releases.',
          'Una parte del sistema tiene requisitos de escalado, tecnología o disponibilidad muy distintos al resto.',
        ],
        contentEn: [
          'Different teams need to deploy and scale their parts independently without coordinating releases.',
          'One part of the system has very different scaling, technology, or availability requirements than the rest.',
        ],
      },
      {
        id: 'tradeoffs',
        titleEs: 'Compensaciones',
        titleEn: 'Trade-offs',
        contentEs: [
          'Microservicios cambian problemas de código (acoplamiento en un módulo) por problemas de red (latencia, fallos parciales, versionado de contratos entre servicios).',
          'Requieren inversión en observabilidad distribuida, CI/CD por servicio y estrategia de datos (cada servicio con su propia base, o compartida) desde el día uno.',
          'Dividir demasiado pronto, antes de conocer los límites reales del dominio, suele terminar en un "monolito distribuido": todo el dolor de red sin los beneficios de independencia.',
        ],
        contentEn: [
          'Microservices trade code problems (coupling in a module) for network problems (latency, partial failures, contract versioning between services).',
          'They require investment in distributed observability, per-service CI/CD, and a data strategy (each service with its own database, or shared) from day one.',
          'Splitting too early, before the real domain boundaries are known, usually ends in a "distributed monolith": all the network pain with none of the independence benefits.',
        ],
      },
    ],
  },
];

@Injectable({ providedIn: 'root' })
export class PatternService {
  readonly all: ArchitecturePattern[] = PATTERNS;

  getBySlug(slug: string): ArchitecturePattern | undefined {
    return PATTERNS.find((p) => p.slug === slug);
  }
}
