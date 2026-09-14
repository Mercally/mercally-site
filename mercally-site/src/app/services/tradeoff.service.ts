import { Injectable } from '@angular/core';
import { Tradeoff } from '../models/tradeoff';

const TRADEOFFS: Tradeoff[] = [
  {
    slug: 'data-isolation',
    labelEs: 'Aislamiento de datos',
    labelEn: 'Data isolation',
    headlineEs: 'Base compartida con RLS, o una base por cliente',
    headlineEn: 'Shared database with RLS, or a database per client',
    aEs: 'Base compartida con Row Level Security',
    aEn: 'Shared database with Row Level Security',
    aBodyEs:
      'Una sola base baja el costo operativo y hace que cada migración se ejecute una vez, no N veces. El aislamiento se aplica en el motor de base de datos, no en la capa de aplicación.',
    aBodyEn:
      'A single database lowers operational cost and means every migration runs once, not N times. Isolation is enforced by the database engine, not the application layer.',
    bEs: 'Una base de datos por cliente',
    bEn: 'A database per client',
    bBodyEs:
      'Aislamiento fácil de auditar y de justificar ante compliance. Se paga en operación: cada release toca N bases, y backups, monitoreo y facturación se multiplican por cliente.',
    bBodyEn:
      'Isolation that is easy to audit and justify to compliance. The cost lands on operations: every release touches N databases, and backups, monitoring, and billing multiply per client.',
    verdictEs:
      'Compartida con RLS por defecto, porque un error en el filtro deja de ser un bug y pasa a ser un incidente de seguridad, y eso se resuelve en el motor. Base por cliente solo cuando el contrato o el regulador lo exigen.',
    verdictEn:
      'Shared with RLS by default, because a bug in the filter stops being a bug and becomes a security incident, and that gets solved at the engine. A database per client only when the contract or the regulator demands it.',
  },
  {
    slug: 'deployment-shape',
    labelEs: 'Forma del despliegue',
    labelEn: 'Deployment shape',
    headlineEs: 'Monolito modular, o microservicios',
    headlineEn: 'Modular monolith, or microservices',
    aEs: 'Monolito modular',
    aEn: 'Modular monolith',
    aBodyEs:
      'Límites claros dentro de un solo despliegue: la disciplina de módulos sin pagar latencia, fallos parciales ni versionado de contratos entre servicios.',
    aBodyEn:
      'Clear boundaries inside a single deployment: module discipline without paying for latency, partial failures, or contract versioning between services.',
    bEs: 'Microservicios',
    bEn: 'Microservices',
    bBodyEs:
      'Equipos que despliegan sin coordinarse y partes que escalan por separado. Exige observabilidad distribuida, CI/CD por servicio y estrategia de datos desde el día uno.',
    bBodyEn:
      'Teams that deploy without coordinating and parts that scale independently. Requires distributed observability, per-service CI/CD, and a data strategy from day one.',
    verdictEs:
      'Monolito modular primero, casi siempre. El eje real no es técnico: es cuánto acoplamiento de despliegue tolera el equipo. Dividir antes de conocer los límites del dominio produce un monolito distribuido: todo el dolor de red, ninguna independencia.',
    verdictEn:
      'Modular monolith first, almost always. The real axis isn\'t technical: it\'s how much deployment coupling the team can tolerate. Splitting before you know the domain\'s boundaries produces a distributed monolith: all the network pain, none of the independence.',
  },
  {
    slug: 'appsec',
    labelEs: 'Seguridad de aplicaciones',
    labelEn: 'Application security',
    headlineEs: 'SAST en el pipeline, o DAST sobre el sistema corriendo',
    headlineEn: 'SAST in the pipeline, or DAST against the running system',
    aEs: 'SAST con SonarQube',
    aEn: 'SAST with SonarQube',
    aBodyEs:
      'Revisa el código en cada push y corta la clase de fallo conocida antes del merge. Barato y temprano. No ve lo que solo existe en ejecución.',
    aBodyEn:
      'Reviews code on every push and cuts off known failure classes before merge. Cheap and early. It can\'t see what only exists at runtime.',
    bEs: 'DAST con OWASP ZAP',
    bEn: 'DAST with OWASP ZAP',
    bBodyEs:
      'Ataca el sistema desplegado y encuentra lo que depende del entorno: configuración, autenticación real, comportamiento de la sesión. Más lento y necesita un ambiente parecido a producción.',
    bBodyEn:
      'Attacks the deployed system and finds what depends on the environment: configuration, real authentication, session behavior. Slower, and needs a production-like environment.',
    verdictEs:
      'Los dos, en ese orden. SAST es el filtro diario, DAST es la prueba de realidad. Esa combinación, más gestión de secretos, es lo que un CASA Assessment espera encontrar.',
    verdictEn:
      'Both, in that order. SAST is the daily filter, DAST is the reality check. That combination, plus secrets management, is what a CASA Assessment expects to find.',
  },
  {
    slug: 'release-process',
    labelEs: 'Puesta en producción',
    labelEn: 'Shipping to production',
    headlineEs: 'CI/CD automatizado, o deploy manual',
    headlineEn: 'Automated CI/CD, or manual deploy',
    aEs: 'CI/CD automatizado',
    aEn: 'Automated CI/CD',
    aBodyEs:
      'El pipeline es la única vía a producción: build, pruebas, análisis y despliegue reproducible. Cuesta días montarlo y los devuelve el primer mes.',
    aBodyEn:
      'The pipeline is the only path to production: build, tests, analysis, and reproducible deployment. It costs days to set up and pays that back in the first month.',
    bEs: 'Deploy manual',
    bEn: 'Manual deploy',
    bBodyEs:
      'Sin costo inicial, control total en cada paso. También sin trazabilidad de qué se subió, dependencia de quien sabe hacerlo y una ventana de error humano en cada release.',
    bBodyEn:
      'No upfront cost, full control at every step. Also no traceability of what shipped, dependency on whoever knows how, and a window for human error on every release.',
    verdictEs:
      'CI/CD desde el primer día, incluso en proyectos de una persona. Un deploy manual no es más simple, solo mueve el trabajo al peor momento posible: cuando hay que reaccionar rápido.',
    verdictEn:
      'CI/CD from day one, even on one-person projects. A manual deploy isn\'t simpler, it just moves the work to the worst possible moment: when you need to react fast.',
  },
  {
    slug: 'repos-pipelines',
    labelEs: 'Repositorios y pipelines',
    labelEn: 'Repos and pipelines',
    headlineEs: 'GitHub, o Azure DevOps',
    headlineEn: 'GitHub, or Azure DevOps',
    aEs: 'GitHub y GitHub Actions',
    aEn: 'GitHub and GitHub Actions',
    aBodyEs:
      'Mejor experiencia de desarrollo, ecosistema de acciones enorme y el lugar natural para lo abierto o lo que atrae talento.',
    aBodyEn:
      'Better developer experience, a huge actions ecosystem, and the natural home for open work or anything meant to attract talent.',
    bEs: 'Azure DevOps',
    bEn: 'Azure DevOps',
    bBodyEs:
      'Boards, Repos, Pipelines y Artifacts en una sola herramienta gobernada, con permisos y trazabilidad que las empresas grandes ya saben auditar.',
    bBodyEn:
      'Boards, Repos, Pipelines, and Artifacts in one governed tool, with permissions and traceability that large enterprises already know how to audit.',
    verdictEs:
      'GitHub cuando el equipo es de producto y la velocidad manda. Azure DevOps cuando la empresa ya vive en Microsoft y el requisito real es gobierno y trazabilidad, no elegancia del pipeline.',
    verdictEn:
      'GitHub when the team is product-led and speed rules. Azure DevOps when the company already lives in Microsoft and the real requirement is governance and traceability, not pipeline elegance.',
  },
  {
    slug: 'workspace-identity',
    labelEs: 'Suite de trabajo e identidad',
    labelEn: 'Workspace and identity',
    headlineEs: 'Microsoft 365, o Google Workspace',
    headlineEn: 'Microsoft 365, or Google Workspace',
    aEs: 'Microsoft 365',
    aEn: 'Microsoft 365',
    aBodyEs:
      'Identidad con Entra ID, integración nativa con el stack .NET y Azure, y Microsoft Graph como puerta a correo, calendario y archivos.',
    aBodyEn:
      'Identity with Entra ID, native integration with the .NET and Azure stack, and Microsoft Graph as the gateway to mail, calendar, and files.',
    bEs: 'Google Workspace',
    bEn: 'Google Workspace',
    bBodyEs:
      'Más simple de administrar, mejor colaboración en documentos y una API de Gmail directa. Menos herramientas de gobierno para una empresa regulada.',
    bBodyEn:
      'Simpler to administer, better document collaboration, and a direct Gmail API. Fewer governance tools for a regulated company.',
    verdictEs:
      'Microsoft 365 cuando el resto del stack ya es Microsoft: la identidad deja de ser un proyecto aparte. Google Workspace cuando el equipo es chico y lo que pesa es colaborar, no gobernar. En mi plataforma integro los dos, porque los clientes viven en ambos mundos.',
    verdictEn:
      'Microsoft 365 when the rest of the stack is already Microsoft: identity stops being a separate project. Google Workspace when the team is small and what matters is collaborating, not governing. In my own platform I integrate both, because clients live in both worlds.',
  },
];

@Injectable({ providedIn: 'root' })
export class TradeoffService {
  readonly all: Tradeoff[] = TRADEOFFS;
}
