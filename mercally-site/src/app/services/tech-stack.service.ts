import { Injectable } from '@angular/core';
import { TechStackCategory } from '../models/tech-stack-category';

const TECH_STACK: TechStackCategory[] = [
  {
    slug: 'architecture',
    titleEs: 'Arquitectura y diseño',
    titleEn: 'Architecture and design',
    itemsEs: [
      'Clean Architecture', 'DDD', 'CQRS', 'Vertical Slices', 'Monolito modular',
      'Microservicios', 'Sistemas distribuidos', 'Procesamiento asíncrono y orientado a eventos',
    ],
    itemsEn: [
      'Clean Architecture', 'DDD', 'CQRS', 'Vertical Slices', 'Modular monolith',
      'Microservices', 'Distributed systems', 'Async, event-driven processing',
    ],
  },
  {
    slug: 'dotnet-platform',
    titleEs: 'Plataforma .NET',
    titleEn: '.NET platform',
    itemsEs: [
      'C#', 'VB.NET', 'ASP.NET MVC', 'Web API', 'EF Core', 'Dapper', 'Hangfire',
      'MassTransit', '.NET Aspire', 'MAUI', 'TypeScript', 'Angular', 'React',
    ],
    itemsEn: [
      'C#', 'VB.NET', 'ASP.NET MVC', 'Web API', 'EF Core', 'Dapper', 'Hangfire',
      'MassTransit', '.NET Aspire', 'MAUI', 'TypeScript', 'Angular', 'React',
    ],
  },
  {
    slug: 'cloud-ops',
    titleEs: 'Cloud y operación',
    titleEn: 'Cloud and operations',
    itemsEs: [
      'Azure', 'AWS', 'GCP', 'VPS autogestionado', 'Docker', 'Swarm', 'Kubernetes',
      'Azure DevOps', 'Jenkins', 'NGINX', 'Traefik', 'Grafana', 'OpenTelemetry', 'Seq',
    ],
    itemsEn: [
      'Azure', 'AWS', 'GCP', 'Self-managed VPS', 'Docker', 'Swarm', 'Kubernetes',
      'Azure DevOps', 'Jenkins', 'NGINX', 'Traefik', 'Grafana', 'OpenTelemetry', 'Seq',
    ],
  },
  {
    slug: 'data-security',
    titleEs: 'Datos y seguridad',
    titleEn: 'Data and security',
    itemsEs: [
      'SQL Server', 'PostgreSQL', 'Oracle', 'MongoDB', 'Row Level Security', 'OWASP Top 10',
      'SonarQube (SAST)', 'OWASP ZAP (DAST)', 'OAuth 2.0 y OIDC', 'Key Vault', 'Google CASA Tier 2',
    ],
    itemsEn: [
      'SQL Server', 'PostgreSQL', 'Oracle', 'MongoDB', 'Row Level Security', 'OWASP Top 10',
      'SonarQube (SAST)', 'OWASP ZAP (DAST)', 'OAuth 2.0 and OIDC', 'Key Vault', 'Google CASA Tier 2',
    ],
  },
];

@Injectable({ providedIn: 'root' })
export class TechStackService {
  readonly all: TechStackCategory[] = TECH_STACK;
}
