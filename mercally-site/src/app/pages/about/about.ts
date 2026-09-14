import { Component, inject, computed } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { BookService } from '../../services/book.service';
import { CertificationService } from '../../services/certification.service';
import { PageNavLayoutComponent } from '../../components/page-nav-layout/page-nav-layout';
import { NavSection } from '../../components/section-nav/section-nav';

const T = {
  es: {
    kicker: 'Sobre mí',
    name: 'Josué Mercadillo',
    location: 'San Salvador, El Salvador',
    bioP1:
      'Senior Software Engineer y Technical Lead, enfocado en arquitectura de software empresarial. Más de nueve años diseñando, construyendo y operando sistemas críticos de negocio en entornos internacionales y multicloud.',
    bioP2:
      'Base práctica fuerte en .NET, C# y JavaScript, combinada con arquitectura de aplicaciones, infraestructura cloud, sistemas distribuidos, seguridad, DevOps y operación en producción. Traduzco requisitos de negocio en arquitecturas de aplicación, integración e infraestructura: documento soluciones, componentes e interfaces, evalúo alternativas tecnológicas y mitigo riesgos de seguridad, tecnología y continuidad.',
    bioP3:
      'Actualmente curso una Maestría en Arquitectura de Software, con foco a largo plazo en arquitectura empresarial, liderazgo técnico y estrategia de ingeniería.',
    educationKicker: 'Formación',
    certsKicker: 'Certificaciones y formación continua',
    inProgress: 'En curso',
    booksKicker: 'Libros recomendados',
    viewBook: 'ver libro',
    onThisPage: 'En esta página',
  },
  en: {
    kicker: 'About me',
    name: 'Josué Mercadillo',
    location: 'San Salvador, El Salvador',
    bioP1:
      'Senior Software Engineer and Technical Lead, focused on enterprise software architecture. Over nine years designing, building, and operating critical business systems across international, multicloud environments.',
    bioP2:
      'A strong practical foundation in .NET, C#, and JavaScript, combined with application architecture, cloud infrastructure, distributed systems, security, DevOps, and production operation. I translate business requirements into application, integration, and infrastructure architectures: documenting solutions, components, and interfaces, evaluating technology alternatives, and mitigating security, technology, and continuity risks.',
    bioP3:
      "Currently pursuing a Master's in Software Architecture, with a long-term focus on enterprise architecture, technical leadership, and engineering strategy.",
    educationKicker: 'Education',
    certsKicker: 'Certifications and continuing education',
    inProgress: 'In progress',
    booksKicker: 'Recommended books',
    viewBook: 'view book',
    onThisPage: 'On this page',
  },
} as const;

interface EducationEntry {
  periodEs: string;
  periodEn: string;
  titleEs: string;
  titleEn: string;
  institutionEs: string;
  institutionEn: string;
}

const EDUCATION: EducationEntry[] = [
  {
    periodEs: '2026 a hoy',
    periodEn: '2026 to today',
    titleEs: 'Maestría en Arquitectura de Software',
    titleEn: "Master's in Software Architecture",
    institutionEs: 'Universidad Don Bosco, El Salvador',
    institutionEn: 'Universidad Don Bosco, El Salvador',
  },
  {
    periodEs: '2022',
    periodEn: '2022',
    titleEs: 'Ingeniería en Sistemas',
    titleEn: 'Systems Engineering',
    institutionEs:
      'Universidad Tecnológica de El Salvador, con preespecialización en Gestión de Proyectos de TI (PMBOK)',
    institutionEn:
      'Universidad Tecnológica de El Salvador, with a pre-specialization in IT Project Management (PMBOK)',
  },
  {
    periodEs: '2017',
    periodEn: '2017',
    titleEs: 'Técnico en Contaduría Comercial',
    titleEn: 'Technical Degree in Commercial Accounting',
    institutionEs: 'Instituto Técnico Obrero Empresarial Don Bosco',
    institutionEn: 'Instituto Técnico Obrero Empresarial Don Bosco',
  },
];

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [PageNavLayoutComponent],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {
  private readonly langSvc = inject(LanguageService);
  private readonly bookSvc = inject(BookService);
  private readonly certificationSvc = inject(CertificationService);

  readonly lang = this.langSvc.lang;
  readonly t = computed(() => T[this.lang()]);

  readonly books = this.bookSvc.all;
  readonly certifications = this.certificationSvc.all;
  readonly education = EDUCATION;

  readonly navSections = computed<NavSection[]>(() => {
    const tt = this.t();
    return [
      { id: 'education', label: tt.educationKicker },
      { id: 'certifications', label: tt.certsKicker },
      { id: 'books', label: tt.booksKicker },
    ];
  });
}
