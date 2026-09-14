import { Injectable } from '@angular/core';
import { ServiceOffering } from '../models/service-offering';

const SERVICE_OFFERINGS: ServiceOffering[] = [
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
    ],
    itemsEn: [
      '.NET projects',
      'SQL Server and PostgreSQL',
      'Angular and React',
      '.NET MAUI',
    ],
  },
  {
    slug: 'security-analysis',
    titleEs: 'Análisis de Ciberseguridad',
    titleEn: 'Security Analysis',
    summaryEs:
      'Evaluación de seguridad de aplicaciones con herramientas y metodologías estándar de la industria.',
    summaryEn:
      'Application security assessment using industry-standard tools and methodologies.',
    itemsEs: [
      'AppSec (seguridad de aplicaciones)',
      'SAST con SonarQube',
      'DAST con OWASP ZAP',
      'CASA Assessment de Google',
      'Entre otros',
    ],
    itemsEn: [
      'AppSec (application security)',
      'SAST with SonarQube',
      'DAST with OWASP ZAP',
      'Google CASA Assessment',
      'Among others',
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
