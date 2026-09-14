import { Injectable } from '@angular/core';
import { ArchitecturePattern } from '../models/architecture-pattern';

const PATTERNS: ArchitecturePattern[] = [
  {
    slug: 'cqrs',
    category: 'architecture',
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
    category: 'architecture',
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
    category: 'architecture',
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
    category: 'architecture',
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
    category: 'architecture',
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
  {
    slug: 'result-pattern',
    category: 'code-design',
    name: 'Result Pattern',
    summaryEs: 'Representar éxito y errores esperados como un valor explícito, en vez de usar excepciones para el flujo normal.',
    summaryEn: 'Representing success and expected errors as an explicit value instead of using exceptions for normal control flow.',
    sections: [
      {
        id: 'what', titleEs: 'Qué resuelve', titleEn: 'What it solves',
        contentEs: ['Hace visibles en la firma del método los errores de negocio que el consumidor debe manejar.', 'Evita usar excepciones como saltos de control para validaciones o resultados esperables.'],
        contentEn: ['Makes business errors visible in the method signature so consumers must handle them.', 'Avoids using exceptions as control flow for validation or expected results.'],
      },
      {
        id: 'when', titleEs: 'Cuándo tiene sentido', titleEn: 'When it makes sense',
        contentEs: ['En casos de uso con validaciones frecuentes, APIs públicas o flujos donde el error forma parte del contrato.', 'Las excepciones siguen siendo adecuadas para fallos inesperados o invariantes imposibles de recuperar.'],
        contentEn: ['For use cases with frequent validation, public APIs, or flows where failure is part of the contract.', 'Exceptions remain appropriate for unexpected failures or unrecoverable invariants.'],
      },
      {
        id: 'tradeoffs', titleEs: 'Compensaciones', titleEn: 'Trade-offs',
        contentEs: ['Añade tipos y composición (`Map`, `Bind`, `Match`) que el equipo debe conocer.', 'Un `Result` mal diseñado puede ocultar errores técnicos; debe separar errores de negocio de fallos de infraestructura.'],
        contentEn: ['Adds types and composition (`Map`, `Bind`, `Match`) the team must understand.', 'A poorly designed `Result` can hide technical failures; business errors must stay distinct from infrastructure faults.'],
      },
    ],
  },
  {
    slug: 'dependency-injection',
    category: 'code-design',
    name: 'Dependency Injection',
    summaryEs: 'Invertir la creación de dependencias para que el código dependa de contratos y sea más fácil de probar y cambiar.',
    summaryEn: 'Inverting dependency creation so code depends on contracts and is easier to test and change.',
    sections: [
      {
        id: 'what', titleEs: 'Qué resuelve', titleEn: 'What it solves',
        contentEs: ['Separa la lógica de negocio de detalles concretos como bases de datos, relojes, HTTP o proveedores externos.', 'Permite sustituir dependencias reales por dobles de prueba sin modificar el caso de uso.'],
        contentEn: ['Separates business logic from concrete details such as databases, clocks, HTTP, or external providers.', 'Lets tests replace real dependencies with test doubles without changing the use case.'],
      },
      {
        id: 'when', titleEs: 'Cuándo tiene sentido', titleEn: 'When it makes sense',
        contentEs: ['Cuando una dependencia cambia por entorno, proveedor o decisión de infraestructura.', 'La inyección por constructor suele ser el punto de partida más explícito y fácil de razonar.'],
        contentEn: ['When a dependency varies by environment, provider, or infrastructure decision.', 'Constructor injection is usually the most explicit and easiest starting point.'],
      },
      {
        id: 'tradeoffs', titleEs: 'Compensaciones', titleEn: 'Trade-offs',
        contentEs: ['Un contenedor DI no corrige un diseño acoplado: registrar demasiadas abstracciones también añade ruido.', 'La composición debe ocurrir en el borde de la aplicación, no repartirse por toda la lógica de negocio.'],
        contentEn: ['A DI container does not fix coupled design: too many abstractions also add noise.', 'Composition should happen at the application edge, not throughout business logic.'],
      },
    ],
  },
  {
    slug: 'mediator',
    category: 'code-design',
    name: 'Mediator',
    summaryEs: 'Encapsular la comunicación entre componentes mediante comandos, consultas y handlers con responsabilidades pequeñas.',
    summaryEn: 'Encapsulating communication between components through commands, queries, and focused handlers.',
    sections: [
      {
        id: 'what', titleEs: 'Qué resuelve', titleEn: 'What it solves',
        contentEs: ['Reduce dependencias directas entre controladores, servicios y componentes de dominio.', 'Hace explícito el caso de uso y concentra validación, autorización y ejecución en un handler.'],
        contentEn: ['Reduces direct dependencies between controllers, services, and domain components.', 'Makes the use case explicit and concentrates validation, authorization, and execution in a handler.'],
      },
      {
        id: 'when', titleEs: 'Cuándo tiene sentido', titleEn: 'When it makes sense',
        contentEs: ['Cuando hay muchos casos de uso independientes y se quiere una frontera clara para comportamientos transversales.', 'Encaja bien con CQRS, pero no exige separar bases de datos ni desplegar servicios distintos.'],
        contentEn: ['When there are many independent use cases and a clear boundary is needed for cross-cutting behavior.', 'It pairs well with CQRS but does not require separate databases or services.'],
      },
      {
        id: 'tradeoffs', titleEs: 'Compensaciones', titleEn: 'Trade-offs',
        contentEs: ['Puede convertirse en una capa de indirección innecesaria si cada llamada trivial recibe su propio handler.', 'Conviene observar el tamaño del dominio antes de introducir un bus de mensajes completo.'],
        contentEn: ['It can become unnecessary indirection if every trivial call gets its own handler.', 'Consider the domain size before introducing a full message bus.'],
      },
    ],
  },
  {
    slug: 'singleton',
    category: 'code-design',
    name: 'Singleton',
    summaryEs: 'Garantizar una única instancia compartida de un recurso cuando su ciclo de vida global está realmente justificado.',
    summaryEn: 'Guaranteeing one shared instance when a globally scoped lifecycle is genuinely justified.',
    sections: [
      {
        id: 'what', titleEs: 'Qué resuelve', titleEn: 'What it solves',
        contentEs: ['Controla recursos que deben coordinarse como una sola instancia, por ejemplo una configuración inmutable o un cliente reutilizable.', 'En aplicaciones .NET, el contenedor de DI suele expresar el alcance singleton sin ocultar la composición.'],
        contentEn: ['Controls resources that must coordinate as one instance, such as immutable configuration or a reusable client.', 'In .NET applications, the DI container usually expresses singleton lifetime without hiding composition.'],
      },
      {
        id: 'when', titleEs: 'Cuándo tiene sentido', titleEn: 'When it makes sense',
        contentEs: ['Cuando el estado es inmutable o el recurso es seguro para concurrencia y debe reutilizarse.', 'No debe usarse solo para compartir estado mutable global.'],
        contentEn: ['When state is immutable or the resource is concurrency-safe and should be reused.', 'It should not be used merely to share mutable global state.'],
      },
      {
        id: 'tradeoffs', titleEs: 'Compensaciones', titleEn: 'Trade-offs',
        contentEs: ['El estado mutable global dificulta los tests, crea acoplamiento temporal y puede provocar condiciones de carrera.', 'El singleton no es sinónimo de thread-safe: la seguridad de concurrencia debe diseñarse explícitamente.'],
        contentEn: ['Mutable global state makes tests harder, creates temporal coupling, and can cause race conditions.', 'Singleton does not mean thread-safe: concurrency safety must be designed explicitly.'],
      },
    ],
  },
  {
    slug: 'concurrency-parallelism-csharp',
    category: 'code-design',
    name: 'Concurrency vs Parallelism in C#',
    summaryEs: 'Distinguir concurrencia, paralelismo y concurrencia paralela para elegir correctamente entre async/await, tareas y procesamiento paralelo.',
    summaryEn: 'Distinguishing concurrency, parallelism, and concurrent parallelism to choose correctly between async/await, tasks, and parallel processing.',
    sections: [
      {
        id: 'what', titleEs: 'Tres conceptos', titleEn: 'Three concepts',
        contentEs: ['Concurrencia es coordinar varias operaciones que progresan en el mismo periodo; paralelismo es ejecutar trabajo simultáneamente en varios núcleos.', 'En C#, `async/await` suele liberar el hilo durante I/O, mientras `Parallel` y `Parallel.ForEachAsync` sirven para trabajo paralelizable con límites explícitos.'],
        contentEn: ['Concurrency coordinates multiple operations making progress over the same period; parallelism executes work simultaneously across cores.', 'In C#, `async/await` usually frees the thread during I/O, while `Parallel` and `Parallel.ForEachAsync` suit bounded parallel work.'],
      },
      {
        id: 'when', titleEs: 'Cuándo tiene sentido', titleEn: 'When it makes sense',
        contentEs: ['Usa concurrencia para I/O y paralelismo para CPU; combina ambos solo cuando el flujo lo justifica y el límite de recursos está controlado.', 'Define cancelación, backpressure, tamaño máximo y manejo de excepciones antes de aumentar el grado de paralelismo.'],
        contentEn: ['Use concurrency for I/O and parallelism for CPU; combine both only when justified and resource limits are controlled.', 'Define cancellation, backpressure, maximum degree, and exception handling before increasing parallelism.'],
      },
      {
        id: 'tradeoffs', titleEs: 'Compensaciones', titleEn: 'Trade-offs',
        contentEs: ['Más concurrencia no implica más rendimiento: puede saturar conexiones, memoria o límites de terceros.', 'Las operaciones paralelas complican el orden, la idempotencia y la observabilidad; mide antes de optimizar.'],
        contentEn: ['More concurrency does not mean more throughput: it can exhaust connections, memory, or third-party limits.', 'Parallel operations complicate ordering, idempotency, and observability; measure before optimizing.'],
      },
    ],
  },
  {
    slug: 'spec-driven-development',
    category: 'ai',
    name: 'Spec-Driven Development',
    summaryEs: 'Convertir una especificación validada en el contrato que guía diseño, implementación y pruebas, con IA como acelerador controlado.',
    summaryEn: 'Turning a validated specification into the contract guiding design, implementation, and tests, with AI as a controlled accelerator.',
    sections: [
      {
        id: 'what', titleEs: 'La idea', titleEn: 'The idea',
        contentEs: ['Antes del código se acuerdan contexto, requisitos, escenarios, restricciones y criterios de aceptación verificables.', 'Herramientas como GitHub Spec Kit popularizan este flujo: la IA implementa desde la especificación, no desde una petición ambigua.'],
        contentEn: ['Context, requirements, scenarios, constraints, and verifiable acceptance criteria are agreed before code.', 'Tools such as GitHub Spec Kit popularize this workflow: AI implements from the specification, not an ambiguous request.'],
      },
      {
        id: 'when', titleEs: 'Cuándo tiene sentido', titleEn: 'When it makes sense',
        contentEs: ['En funcionalidades con varias decisiones de producto, integraciones o riesgo de que la IA complete supuestos incorrectos.', 'La especificación debe ser suficientemente concreta para probarse, pero no dictar cada detalle de implementación.'],
        contentEn: ['For features with multiple product decisions, integrations, or a high risk of AI filling in wrong assumptions.', 'The specification should be testable without dictating every implementation detail.'],
      },
      {
        id: 'tradeoffs', titleEs: 'Compensaciones', titleEn: 'Trade-offs',
        contentEs: ['Escribir y revisar la especificación requiere tiempo, pero desplaza el costo desde corregir código hacia aclarar decisiones.', 'Una especificación obsoleta se vuelve deuda técnica; debe versionarse junto al código y validarse en CI.'],
        contentEn: ['Writing and reviewing the specification takes time, but shifts cost from fixing code to clarifying decisions.', 'A stale specification becomes technical debt; version it with the code and validate it in CI.'],
      },
    ],
  },
  {
    slug: 'retrieval-augmented-generation',
    category: 'ai',
    name: 'Retrieval-Augmented Generation (RAG)',
    summaryEs: 'Dar a un modelo contexto recuperado desde fuentes propias para responder con información relevante y trazable.',
    summaryEn: 'Giving a model context retrieved from owned sources so it can answer with relevant, traceable information.',
    sections: [
      {
        id: 'what', titleEs: 'Qué resuelve', titleEn: 'What it solves',
        contentEs: ['Separa el conocimiento cambiante del modelo: documentos se ingieren, fragmentan, indexan y recuperan en cada consulta.', 'La respuesta puede incluir citas, metadatos y permisos de la fuente original.'],
        contentEn: ['Separates changing knowledge from the model: documents are ingested, chunked, indexed, and retrieved per query.', 'Responses can include citations, metadata, and permissions from the original source.'],
      },
      {
        id: 'when', titleEs: 'Cuándo tiene sentido', titleEn: 'When it makes sense',
        contentEs: ['Cuando la respuesta depende de documentación interna, datos recientes o contenido que no debe entrar en el entrenamiento del modelo.', 'Evalúa recuperación y generación por separado: una respuesta mala puede comenzar con contexto irrelevante.'],
        contentEn: ['When answers depend on internal documentation, recent data, or content that should not enter model training.', 'Evaluate retrieval and generation separately: a bad answer may start with irrelevant context.'],
      },
      {
        id: 'tradeoffs', titleEs: 'Compensaciones', titleEn: 'Trade-offs',
        contentEs: ['Hay costo de embeddings, almacenamiento, latencia, actualización de índices y control de acceso.', 'RAG no elimina alucinaciones: necesita evaluación, límites de confianza, citas y una respuesta segura cuando no hay evidencia.'],
        contentEn: ['There are costs for embeddings, storage, latency, index refreshes, and access control.', 'RAG does not remove hallucinations: it needs evaluation, confidence boundaries, citations, and a safe fallback when evidence is missing.'],
      },
    ],
  },
  {
    slug: 'agent-assisted-development',
    category: 'ai',
    name: 'Agent-Assisted Development',
    summaryEs: 'Coordinar agentes especializados con responsabilidades acotadas, artefactos verificables y revisión humana en los puntos de riesgo.',
    summaryEn: 'Coordinating specialized agents with bounded responsibilities, verifiable artifacts, and human review at risk points.',
    sections: [
      {
        id: 'what', titleEs: 'Qué resuelve', titleEn: 'What it solves',
        contentEs: ['Un agente explora el repositorio, otro propone el diseño, otro implementa y otro valida; cada uno recibe contexto y permisos mínimos.', 'El resultado intermedio se conserva como artefacto: plan, especificación, diff, pruebas y evidencia de validación.'],
        contentEn: ['One agent explores the repository, another proposes design, another implements, and another validates; each gets minimal context and permissions.', 'Intermediate output is kept as an artifact: plan, specification, diff, tests, and validation evidence.'],
      },
      {
        id: 'when', titleEs: 'Cuándo tiene sentido', titleEn: 'When it makes sense',
        contentEs: ['En tareas grandes, repetibles o con dominios separados donde un único contexto se vuelve difícil de mantener.', 'La división debe seguir responsabilidades reales, no crear agentes por moda.'],
        contentEn: ['For large, repeatable tasks or separate domains where one context becomes hard to maintain.', 'The split should follow real responsibilities, not create agents for fashion.'],
      },
      {
        id: 'tradeoffs', titleEs: 'Compensaciones', titleEn: 'Trade-offs',
        contentEs: ['La coordinación agrega latencia, costo y riesgo de que un error se propague entre artefactos.', 'Se necesitan límites de herramientas, trazabilidad, revisión humana y pruebas que no dependan del criterio del agente.'],
        contentEn: ['Coordination adds latency, cost, and the risk of propagating an error between artifacts.', 'Tool boundaries, traceability, human review, and tests independent of agent judgment are required.'],
      },
    ],
  },
  {
    slug: 'sast-sonarqube',
    category: 'engineering-excellence',
    name: 'SAST con SonarQube',
    summaryEs: 'Analizar código y dependencias para detectar vulnerabilidades, bugs y deuda técnica antes de integrar cambios.',
    summaryEn: 'Analyze code and dependencies to detect vulnerabilities, bugs, and technical debt before integrating changes.',
    sections: [
      {
        id: 'what', titleEs: 'Qué cubre', titleEn: 'What it covers',
        contentEs: ['SAST inspecciona el código sin ejecutarlo: calidad, vulnerabilidades conocidas, duplicación, complejidad y hotspots de seguridad.', 'SonarQube puede publicar un Quality Gate que convierta la política en una señal objetiva para el PR.'],
        contentEn: ['SAST inspects code without executing it: quality, vulnerabilities, duplication, complexity, and security hotspots.', 'SonarQube can publish a Quality Gate that turns policy into an objective PR signal.'],
      },
      {
        id: 'when', titleEs: 'Dónde entra', titleEn: 'Where it fits',
        contentEs: ['Ejecutarlo en cada PR con análisis incremental y de forma completa en la rama principal.', 'Los umbrales deben priorizar problemas nuevos para no bloquear el equipo por deuda histórica de golpe.'],
        contentEn: ['Run it on every PR with incremental analysis and fully on the main branch.', 'Thresholds should prioritize new issues so legacy debt does not block the team overnight.'],
      },
      {
        id: 'tradeoffs', titleEs: 'Compensaciones', titleEn: 'Trade-offs',
        contentEs: ['SAST produce falsos positivos y no observa comportamiento en ejecución; requiere triage y complementariedad con DAST.', 'Un Quality Gate es útil solo si el equipo acuerda excepciones, responsables y fechas de remediación.'],
        contentEn: ['SAST produces false positives and cannot observe runtime behavior; it needs triage and DAST complementarity.', 'A Quality Gate helps only when the team agrees on exceptions, owners, and remediation dates.'],
      },
    ],
  },
  {
    slug: 'dast-owasp-zap',
    category: 'engineering-excellence',
    name: 'DAST con OWASP ZAP',
    summaryEs: 'Probar la aplicación desplegada desde fuera para encontrar riesgos que solo aparecen durante la ejecución.',
    summaryEn: 'Test the deployed application from the outside to find risks that only appear at runtime.',
    sections: [
      {
        id: 'what', titleEs: 'Qué cubre', titleEn: 'What it covers',
        contentEs: ['DAST observa endpoints, headers, autenticación, sesiones y respuestas reales de la aplicación en ejecución.', 'OWASP ZAP puede ejecutar un baseline scan en entornos controlados y dejar evidencia como artefacto del pipeline.'],
        contentEn: ['DAST observes endpoints, headers, authentication, sessions, and real responses from the running application.', 'OWASP ZAP can run a baseline scan in controlled environments and leave evidence as a pipeline artifact.'],
      },
      {
        id: 'when', titleEs: 'Dónde entra', titleEn: 'Where it fits',
        contentEs: ['Ejecutarlo después del deploy a Staging, con datos sintéticos, cuentas de prueba y una allowlist de endpoints.', 'Los escaneos activos deben aislarse y autorizarse: nunca apuntar contra producción sin un plan explícito.'],
        contentEn: ['Run it after deploying to Staging, with synthetic data, test accounts, and an endpoint allowlist.', 'Active scans must be isolated and authorized: never target production without an explicit plan.'],
      },
      {
        id: 'tradeoffs', titleEs: 'Compensaciones', titleEn: 'Trade-offs',
        contentEs: ['Puede ser más lento e inestable que SAST y necesita autenticación, datos representativos y manejo de falsos positivos.', 'DAST encuentra síntomas; la corrección requiere rastrear el endpoint hasta el código, configuración o dependencia responsable.'],
        contentEn: ['It can be slower and less stable than SAST and needs authentication, representative data, and false-positive handling.', 'DAST finds symptoms; remediation requires tracing the endpoint to the responsible code, configuration, or dependency.'],
      },
    ],
  },
  {
    slug: 'secure-azure-devops-pipeline',
    category: 'engineering-excellence',
    name: 'CI/CD seguro en Azure DevOps',
    summaryEs: 'Promover cambios desde Feature hacia Dev, Staging y Producción con gates de calidad, seguridad y artefactos inmutables.',
    summaryEn: 'Promote changes from Feature through Dev, Staging, and Production with quality gates, security checks, and immutable artifacts.',
    sections: [
      {
        id: 'flow', titleEs: 'Flujo de promoción', titleEn: 'Promotion flow',
        contentEs: ['Feature branch -> Pull Request -> Dev: ejecutar compilación, SAST con SonarQube y pruebas unitarias; el PR solo entra con Quality Gate aprobado.', 'Dev -> Staging: construir una única imagen Docker versionada, desplegarla en Staging y ejecutar smoke tests, integración y DAST con OWASP ZAP.', 'Staging -> Producción: promover la misma imagen validada; mover el tag `latest` solo como alias posterior al release, nunca reconstruir el artefacto.'],
        contentEn: ['Feature branch -> Pull Request -> Dev: run build, SonarQube SAST, and unit tests; merge only after the Quality Gate passes.', 'Dev -> Staging: build one versioned Docker image, deploy it to Staging, then run smoke, integration, and OWASP ZAP DAST tests.', 'Staging -> Production: promote the same validated image; move the `latest` tag only as a post-release alias, never rebuild the artifact.'],
      },
      {
        id: 'controls', titleEs: 'Controles profesionales', titleEn: 'Professional controls',
        contentEs: ['Branch policies exigen PR, revisión, build obligatorio y resolución de comentarios; secretos viven en Key Vault o variables protegidas.', 'Cada ambiente usa aprobaciones, service connections con mínimo privilegio, trazabilidad del commit y rollback al tag anterior.', 'Separar el build del deploy hace que el artefacto sea reproducible y evita que Staging y Producción ejecuten código distinto.'],
        contentEn: ['Branch policies require PRs, review, mandatory builds, and resolved comments; secrets live in Key Vault or protected variables.', 'Each environment uses approvals, least-privilege service connections, commit traceability, and rollback to the previous tag.', 'Separating build from deploy keeps the artifact reproducible and prevents Staging and Production from running different code.'],
      },
      {
        id: 'tradeoffs', titleEs: 'Compensaciones', titleEn: 'Trade-offs',
        contentEs: ['Más gates aumentan el tiempo de feedback, por lo que conviene separar validaciones rápidas de suites profundas y paralelizarlas.', 'El pipeline no sustituye threat modeling, revisión humana ni observabilidad posterior al despliegue.', 'El criterio de promoción debe quedar versionado y medirse con métricas como lead time, change failure rate y tiempo de recuperación.'],
        contentEn: ['More gates increase feedback time, so fast checks should be separated from deeper suites and parallelized.', 'The pipeline does not replace threat modeling, human review, or post-deployment observability.', 'Promotion criteria should be versioned and measured with metrics such as lead time, change failure rate, and recovery time.'],
      },
    ],
  },
  {
    slug: 'domain-driven-design',
    category: 'architecture',
    name: 'Domain-Driven Design (DDD)',
    summaryEs: 'Modelar el software alrededor del dominio, sus límites, lenguaje y reglas, en lugar de organizarlo solo por tecnología.',
    summaryEn: 'Modeling software around the domain, its boundaries, language, and rules instead of organizing it only by technology.',
    sections: [
      {
        id: 'what', titleEs: 'Qué resuelve', titleEn: 'What it solves',
        contentEs: ['El lenguaje ubicuo alinea a expertos de negocio y equipo técnico; bounded contexts separan modelos que no deben compartir el mismo significado.', 'Entidades, value objects, aggregates, domain services y domain events expresan reglas e invariantes en el modelo.'],
        contentEn: ['Ubiquitous language aligns domain experts and engineers; bounded contexts separate models that should not share the same meaning.', 'Entities, value objects, aggregates, domain services, and domain events express rules and invariants in the model.'],
      },
      {
        id: 'when', titleEs: 'Cuándo tiene sentido', titleEn: 'When it makes sense',
        contentEs: ['Cuando el dominio tiene reglas complejas, vocabulario ambiguo o múltiples equipos que necesitan evolucionar de forma independiente.', 'DDD no exige microservicios: sus bounded contexts pueden vivir dentro de un monolito modular.'],
        contentEn: ['When the domain has complex rules, ambiguous vocabulary, or multiple teams that need to evolve independently.', 'DDD does not require microservices: bounded contexts can live inside a modular monolith.'],
      },
      {
        id: 'tradeoffs', titleEs: 'Compensaciones', titleEn: 'Trade-offs',
        contentEs: ['Requiere colaboración continua con expertos del dominio y disciplina para no convertir cada tabla en una entidad rica artificial.', 'Un aggregate demasiado grande aumenta contención; uno demasiado pequeño rompe invariantes y empuja consistencia al proceso distribuido.'],
        contentEn: ['It requires continuous collaboration with domain experts and discipline to avoid making every table an artificial rich entity.', 'An aggregate that is too large increases contention; one that is too small breaks invariants and pushes consistency into distributed processes.'],
      },
    ],
  },
  {
    slug: 'n-layer-architecture',
    category: 'architecture',
    name: 'N-Layer Architecture',
    summaryEs: 'Separar presentación, aplicación, dominio e infraestructura mediante dependencias controladas y responsabilidades claras.',
    summaryEn: 'Separating presentation, application, domain, and infrastructure through controlled dependencies and clear responsibilities.',
    sections: [
      {
        id: 'what', titleEs: 'Qué resuelve', titleEn: 'What it solves',
        contentEs: ['Cada capa tiene un propósito: la presentación coordina HTTP/UI, aplicación orquesta casos de uso, dominio contiene reglas e infraestructura integra recursos externos.', 'Los límites reducen el acoplamiento accidental y hacen visibles las dependencias entre decisiones de negocio y detalles técnicos.'],
        contentEn: ['Each layer has a purpose: presentation coordinates HTTP/UI, application orchestrates use cases, domain holds rules, and infrastructure integrates external resources.', 'Boundaries reduce accidental coupling and make dependencies between business decisions and technical details visible.'],
      },
      {
        id: 'when', titleEs: 'Cuándo tiene sentido', titleEn: 'When it makes sense',
        contentEs: ['En aplicaciones empresariales con ciclo de vida largo, varios puntos de entrada y lógica que debe probarse sin levantar infraestructura.', 'La cantidad de capas debe responder a límites reales; no todo proyecto necesita cuatro proyectos separados.'],
        contentEn: ['For long-lived business applications with multiple entry points and logic that should be tested without infrastructure.', 'The number of layers should follow real boundaries; not every project needs four separate projects.'],
      },
      {
        id: 'tradeoffs', titleEs: 'Compensaciones', titleEn: 'Trade-offs',
        contentEs: ['Una arquitectura por capas puede degenerar en un anemic domain model y servicios que solo trasladan datos entre capas.', 'La dirección de dependencias importa más que el número de carpetas: una capa de dominio que conoce Entity Framework ya rompió el límite.'],
        contentEn: ['Layered architecture can degrade into an anemic domain model and services that merely move data between layers.', 'Dependency direction matters more than folder count: a domain layer that knows Entity Framework has already crossed the boundary.'],
      },
    ],
  },
  {
    slug: 'modular-monolith',
    category: 'architecture',
    name: 'Modular Monolith',
    summaryEs: 'Mantener un único despliegue con módulos de negocio aislados, contratos explícitos y autonomía interna.',
    summaryEn: 'Keep one deployment while isolating business modules behind explicit contracts and internal autonomy.',
    sections: [
      {
        id: 'what', titleEs: 'Qué resuelve', titleEn: 'What it solves',
        contentEs: ['Permite límites de dominio, ownership y evolución independiente sin pagar todavía el costo operativo de una red distribuida.', 'Cada módulo controla sus datos y expone casos de uso o eventos, evitando que otros módulos accedan directamente a sus tablas.'],
        contentEn: ['Provides domain boundaries, ownership, and independent evolution without immediately paying the operational cost of a distributed network.', 'Each module owns its data and exposes use cases or events, preventing other modules from reaching directly into its tables.'],
      },
      {
        id: 'when', titleEs: 'Cuándo tiene sentido', titleEn: 'When it makes sense',
        contentEs: ['Cuando el dominio ya necesita separación, pero el equipo, la carga o la madurez operativa aún no justifican microservicios.', 'Es una buena etapa para validar bounded contexts antes de extraer servicios, si algún módulo realmente lo necesita.'],
        contentEn: ['When the domain needs separation but team size, load, or operational maturity do not justify microservices yet.', 'It is a good stage for validating bounded contexts before extracting services that truly need it.'],
      },
      {
        id: 'tradeoffs', titleEs: 'Compensaciones', titleEn: 'Trade-offs',
        contentEs: ['Un monolito modular solo funciona si los límites se hacen cumplir; compartir tablas o clases internas crea un monolito accidental.', 'El despliegue sigue siendo conjunto: un módulo defectuoso puede bloquear el release o consumir recursos de todos.'],
        contentEn: ['A modular monolith works only when boundaries are enforced; shared tables or internal classes create an accidental monolith.', 'Deployment is still shared: one faulty module can block releases or consume resources for everyone.'],
      },
    ],
  },
  {
    slug: 'messaging-queue-bus-pubsub-log',
    category: 'architecture',
    name: 'Messaging: Queue, Bus, Pub/Sub y Event Log',
    summaryEs: 'Elegir el mecanismo de mensajería según la entrega, el número de consumidores, el orden y la necesidad de replay.',
    summaryEn: 'Choose a messaging mechanism based on delivery, consumer count, ordering, and the need for replay.',
    sections: [
      {
        id: 'what', titleEs: 'Qué diferencia cada opción', titleEn: 'How the options differ',
        contentEs: ['Una queue distribuye trabajo: normalmente un consumidor procesa cada mensaje y se confirma con ack; es ideal para tareas y backpressure.', 'Un bus enruta comandos o eventos entre componentes; Pub/Sub entrega una publicación a múltiples suscripciones independientes.', 'Un event log conserva una secuencia durable que varios consumidores pueden leer a su ritmo y reproducir desde un offset.'],
        contentEn: ['A queue distributes work: usually one consumer processes each message and acknowledges it; it suits tasks and backpressure.', 'A bus routes commands or events between components; Pub/Sub delivers one publication to independent subscriptions.', 'An event log keeps a durable sequence that consumers can read at their own pace and replay from an offset.'],
      },
      {
        id: 'when', titleEs: 'Cómo decidir', titleEn: 'How to decide',
        contentEs: ['Elige queue para trabajo exclusivo, Pub/Sub para notificar a varios consumidores y event log cuando replay, auditoría o re-procesamiento sean requisitos.', 'Define desde el inicio ordering, at-least-once/exactly-once, idempotencia, dead-letter queues, retención, particiones y evolución de esquemas.'],
        contentEn: ['Choose a queue for exclusive work, Pub/Sub to notify multiple consumers, and an event log when replay, audit, or reprocessing are requirements.', 'Define ordering, at-least-once/exactly-once, idempotency, dead-letter queues, retention, partitions, and schema evolution up front.'],
      },
      {
        id: 'tradeoffs', titleEs: 'Compensaciones', titleEn: 'Trade-offs',
        contentEs: ['La mensajería introduce consistencia eventual, duplicados, mensajes fuera de orden y fallos parciales; el consumidor debe ser idempotente.', 'No todo evento necesita Kafka: la durabilidad, escala, replay y aislamiento requeridos deben justificar la complejidad operativa del broker.'],
        contentEn: ['Messaging introduces eventual consistency, duplicates, out-of-order messages, and partial failures; consumers must be idempotent.', 'Not every event needs Kafka: required durability, scale, replay, and isolation must justify broker operational complexity.'],
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
