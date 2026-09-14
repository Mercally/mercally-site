import { Injectable } from '@angular/core';
import { CareerStint } from '../models/career-stint';

const CAREER_STINTS: CareerStint[] = [
  {
    slug: 'fintech-platform',
    periodEs: '2023 a 2026',
    periodEn: '2023 to 2026',
    titleEs: 'Plataforma fintech de EE.UU., 500+ firmas',
    titleEn: 'US fintech platform, 500+ firms',
    descriptionEs:
      'Modernización y mejora continua de una plataforma que corre miles de flujos automatizados de datos financieros por día. Migración de frameworks, hardening de seguridad, gestión de secretos y observabilidad.',
    descriptionEn:
      'Modernization and continuous improvement of a platform running thousands of automated financial data flows per day. Framework migration, security hardening, secrets management, and observability.',
  },
  {
    slug: 'government-platform',
    periodEs: '2023 a 2025',
    periodEn: '2023 to 2025',
    titleEs: 'Plataforma gubernamental multi-tenant, EE.UU.',
    titleEn: 'US multi-tenant government platform',
    descriptionEs:
      'Diseño y evolución de las capacidades de pago de una plataforma .NET y VB.NET con una base de datos SQL Server aislada por condado, más integraciones de facturación y cobro entre múltiples sistemas.',
    descriptionEn:
      'Design and evolution of the payment capabilities of a .NET and VB.NET platform with a SQL Server database isolated per county, plus billing and collection integrations across multiple systems.',
  },
  {
    slug: 'tax-saas',
    periodEs: '2023 a 2026',
    periodEn: '2023 to 2026',
    titleEs: 'SaaS propio de documentos tributarios electrónicos',
    titleEn: 'Own SaaS for electronic tax documents',
    descriptionEs:
      'Cofundador y arquitecto. Multi-tenant con aislamiento por workspace, integración con Microsoft Graph y Gmail, arquitectura multicloud y operación en producción. Servicio vivo por suscripción.',
    descriptionEn:
      'Co-founder and architect. Multi-tenant with per-workspace isolation, integration with Microsoft Graph and Gmail, multicloud architecture, and production operation. A live, subscription-based service.',
  },
  {
    slug: 'telecom-platform',
    periodEs: '2020 a 2023',
    periodEn: '2020 to 2023',
    titleEs: 'Plataforma de telecomunicaciones a gran escala',
    titleEn: 'Large-scale telecommunications platform',
    descriptionEs:
      'Desarrollador líder del producto. Audit trail de extremo a extremo sobre entidades críticas donde antes no existía registro, más servicios REST y WCF integrando sistemas empresariales internos y externos.',
    descriptionEn:
      'Lead developer for the product. End-to-end audit trail over critical entities that previously had none, plus REST and WCF services integrating internal and external enterprise systems.',
  },
];

@Injectable({ providedIn: 'root' })
export class CareerStintService {
  readonly all: CareerStint[] = CAREER_STINTS;
}
