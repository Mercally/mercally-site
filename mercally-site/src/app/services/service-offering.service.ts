import { Injectable } from '@angular/core';
import { ServiceOffering } from '../models/service-offering';

const SERVICE_OFFERINGS: ServiceOffering[] = [
  {
    slug: 'security-analysis',
    titleEs: 'Análisis de Seguridad',
    titleEn: 'Security Analysis',
    summaryEs:
      'Evaluación de seguridad de aplicaciones con herramientas y metodologías estándar de la industria.',
    summaryEn:
      'Application security assessment using industry-standard tools and methodologies.',
    itemsEs: [
      'AppSec (seguridad de aplicaciones)',
      'SAST con SonarQube',
      'DAST con OWASP ZAP',
      'Threat modeling y revisión de riesgos',
      'Recomendaciones priorizadas de remediación',
    ],
    itemsEn: [
      'AppSec (application security)',
      'SAST with SonarQube',
      'DAST with OWASP ZAP',
      'Threat modeling and risk review',
      'Prioritized remediation recommendations',
    ],
  },
  {
    slug: 'ai-adoption-development-lifecycle',
    titleEs: 'Adopción de IA en el ciclo de desarrollo',
    titleEn: 'AI Adoption in the Development Lifecycle',
    summaryEs:
      'Adopción práctica y responsable de IA para mejorar el análisis, diseño, implementación y validación de software.',
    summaryEn:
      'Practical and responsible AI adoption to improve software analysis, design, implementation, and validation.',
    itemsEs: [
      'Workflows de Spec-Driven Development',
      'RAG, structured output y tool calling',
      'Agent-Assisted Development con revisión humana',
      'Evaluación, guardrails y protección contra prompt injection',
      'Políticas de uso, privacidad y control de costos',
    ],
    itemsEn: [
      'Spec-Driven Development workflows',
      'RAG, structured output, and tool calling',
      'Agent-Assisted Development with human review',
      'Evaluation, guardrails, and prompt injection protection',
      'Usage policies, privacy, and cost controls',
    ],
  },
  {
    slug: 'architecture-analysis',
    titleEs: 'Análisis de Arquitectura',
    titleEn: 'Architecture Analysis',
    summaryEs:
      'Revisión y diseño de arquitecturas de software, evaluando trade-offs reales antes de comprometer código.',
    summaryEn:
      'Reviewing and designing software architectures, weighing real trade-offs before committing to code.',
    itemsEs: [
      'Arquitecturas de diseño (monolito modular, microservicios, hexagonal/clean architecture)',
      'Arquitectura cloud (AWS, Azure) y estrategias de despliegue',
      'Arquitectura SaaS multi-tenant',
      'Diseño de pipelines de datos e ingesta',
      'Estrategia de branching y flujo de Git para equipos',
    ],
    itemsEn: [
      'Design architectures (modular monolith, microservices, hexagonal/clean architecture)',
      'Cloud architecture (AWS, Azure) and deployment strategy',
      'Multi-tenant SaaS architecture',
      'Data pipeline and ingestion design',
      'Branching strategy and Git workflow for teams',
    ],
  },
  {
    slug: 'technical-leadership',
    titleEs: 'Liderazgo Técnico',
    titleEn: 'Technical Leadership',
    summaryEs:
      'Guía técnica end-to-end en stacks de producción reales, desde el diseño hasta el deploy.',
    summaryEn:
      'End-to-end technical guidance on real production stacks, from design through deployment.',
    itemsEs: [
      'Proyectos en .NET',
      'SQL Server y PostgreSQL',
      'Angular y React',
      '.NET MAUI',
      'Mentoría, decisiones técnicas y coordinación con equipos',
    ],
    itemsEn: [
      '.NET projects',
      'SQL Server and PostgreSQL',
      'Angular and React',
      '.NET MAUI',
      'Mentoring, technical decisions, and team coordination',
    ],
  },
  {
    slug: 'consulting',
    titleEs: 'Consultoría',
    titleEn: 'Consulting',
    summaryEs:
      'Acompañamiento técnico para convertir problemas de negocio en decisiones, planes y entregables ejecutables.',
    summaryEn:
      'Technical guidance to turn business problems into executable decisions, plans, and deliverables.',
    itemsEs: [
      'Discovery técnico y evaluación de situación actual',
      'Roadmaps de modernización y priorización',
      'ADRs, documentación y definición de estándares',
      'Evaluación de proveedores y decisiones build vs buy',
      'Acompañamiento a equipos durante la ejecución',
    ],
    itemsEn: [
      'Technical discovery and current-state assessment',
      'Modernization roadmaps and prioritization',
      'ADRs, documentation, and standards definition',
      'Vendor evaluation and build-vs-buy decisions',
      'Team guidance throughout delivery',
    ],
  },
  {
    slug: 'websites',
    titleEs: 'Páginas web',
    titleEn: 'Websites',
    summaryEs:
      'Diseño y desarrollo de sitios web profesionales, rápidos, accesibles y preparados para crecer.',
    summaryEn:
      'Design and development of professional, fast, accessible websites built to grow.',
    itemsEs: [
      'Sitios corporativos y portafolios profesionales',
      'Landing pages orientadas a conversión',
      'Diseño responsive y accesibilidad',
      'SEO técnico, analítica y performance',
      'Despliegue y mantenimiento',
    ],
    itemsEn: [
      'Corporate websites and professional portfolios',
      'Conversion-focused landing pages',
      'Responsive design and accessibility',
      'Technical SEO, analytics, and performance',
      'Deployment and maintenance',
    ],
  },
  {
    slug: 'office-365-cloud-smes',
    titleEs: 'Adopción de Office 365 y nube para PYMES',
    titleEn: 'Office 365 and Cloud Adoption for SMEs',
    summaryEs:
      'Acompañamiento para que pequeñas y medianas empresas adopten herramientas cloud con orden, seguridad y costos controlados.',
    summaryEn:
      'Guidance for small and medium-sized businesses adopting cloud tools with structure, security, and controlled costs.',
    itemsEs: [
      'Microsoft 365, colaboración y gestión documental',
      'Identidad, accesos y MFA',
      'Migración de correo, archivos y cargas existentes',
      'Backups, continuidad y seguridad básica',
      'Gobierno cloud y optimización de costos',
    ],
    itemsEn: [
      'Microsoft 365, collaboration, and document management',
      'Identity, access, and MFA',
      'Migration of email, files, and existing workloads',
      'Backups, continuity, and baseline security',
      'Cloud governance and cost optimization',
    ],
  },
];

@Injectable({ providedIn: 'root' })
export class ServiceOfferingService {
  readonly all: ServiceOffering[] = SERVICE_OFFERINGS;

  getBySlug(slug: string): ServiceOffering | undefined {
    return SERVICE_OFFERINGS.find((s) => s.slug === slug);
  }
}
