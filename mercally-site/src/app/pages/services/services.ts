import { Component, inject, computed } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { ServiceOfferingService } from '../../services/service-offering.service';
import { PageNavLayoutComponent } from '../../components/page-nav-layout/page-nav-layout';
import { NavSection } from '../../components/section-nav/section-nav';

const T = {
  es: {
    kicker: 'Servicios',
    title: 'En qué puedo ayudar',
    subtitle: 'Arquitectura, liderazgo técnico y seguridad.',
    empty: 'Aún no hay servicios publicados. Vuelve pronto.',
    processKicker: 'Cómo trabajo',
    processIntro: 'El mismo proceso en cada proyecto, sin importar el tamaño.',
    stepLabel: 'Paso',
    investmentKicker: 'Inversión',
    investmentAmount: 'Desde USD 20 por hora',
    investmentNote:
      'El precio final depende del alcance del proyecto, y siempre queda por escrito antes de empezar.',
    investmentCta: 'Pedir una cotización',
    contactKicker: '¿Tienes una decisión sobre la mesa?',
    contactTitle: 'Hablemos del problema, no solo de la tecnología.',
    contactQuestions: ['¿La arquitectura está frenando al equipo?', '¿Quieres adoptar IA sin perder control?', '¿Necesitas seguridad antes del próximo release?'],
    contactMode: 'Trabajo por proyecto, por alcance o por hora.',
    contactCta: 'Solicitar diagnóstico',
    profileAlt: 'Josué Mercadillo, arquitecto de software',
    profileRole: 'Arquitecto de software · Technical Lead',
    profileProof: '10+ años convirtiendo decisiones técnicas en software que llega a producción.',
    commandKicker: 'Perfil técnico',
    commandTitle: 'De la decisión a producción',
    commandYears: '10+ años',
    commandYearsLabel: 'en tecnología',
    commandStack: '.NET · Cloud · Security · AI',
    commandStackLabel: 'áreas de trabajo',
    commandFocus: 'Arquitectura · Delivery · Riesgo',
    commandFocusLabel: 'lo que desbloqueo',
    commandReach: 'Remoto · US & LATAM',
    commandReachLabel: 'alcance de trabajo',
    onThisPage: 'En esta página',
  },
  en: {
    kicker: 'Services',
    title: 'Where I can help',
    subtitle: 'Architecture, technical leadership, and security.',
    empty: 'No services published yet. Check back soon.',
    processKicker: 'How I work',
    processIntro: 'The same process on every project, regardless of size.',
    stepLabel: 'Step',
    investmentKicker: 'Investment',
    investmentAmount: 'Starting at USD 20 per hour',
    investmentNote:
      'Final price depends on project scope, and always goes in writing before starting.',
    investmentCta: 'Request a quote',
    contactKicker: 'Have a decision on the table?',
    contactTitle: 'Let’s talk about the problem, not just the technology.',
    contactQuestions: ['Is architecture slowing your team down?', 'Do you want to adopt AI without losing control?', 'Do you need security before the next release?'],
    contactMode: 'Available by project, scope, or hourly engagement.',
    contactCta: 'Request a diagnosis',
    profileAlt: 'Josué Mercadillo, software architect',
    profileRole: 'Software architect · Technical Lead',
    profileProof: '10+ years turning technical decisions into software that reaches production.',
    commandKicker: 'Technical profile',
    commandTitle: 'From decision to production',
    commandYears: '10+ years',
    commandYearsLabel: 'in technology',
    commandStack: '.NET · Cloud · Security · AI',
    commandStackLabel: 'focus areas',
    commandFocus: 'Architecture · Delivery · Risk',
    commandFocusLabel: 'what I unblock',
    commandReach: 'Remote · US & LATAM',
    commandReachLabel: 'working reach',
    onThisPage: 'On this page',
  },
} as const;

interface ProcessStep {
  num: string;
  titleEs: string;
  titleEn: string;
  bodyEs: string;
  bodyEn: string;
  icon: 'search' | 'document' | 'checklist' | 'shield';
}

const STEPS: ProcessStep[] = [
  {
    num: '01',
    titleEs: 'Diagnóstico',
    titleEn: 'Diagnosis',
    bodyEs:
      'Una llamada de 45 minutos, sin costo, para entender el contexto, el equipo y la restricción real.',
    bodyEn: 'A free 45-minute call to understand the context, the team, and the real constraint.',
    icon: 'search',
  },
  {
    num: '02',
    titleEs: 'Propuesta',
    titleEn: 'Proposal',
    bodyEs:
      'Alcance escrito, entregables y plazo. Precio fijo por proyecto o por hora, según lo que convenga.',
    bodyEn:
      'Written scope, deliverables, and timeline. Fixed project price or hourly, whichever fits best.',
    icon: 'document',
  },
  {
    num: '03',
    titleEs: 'Ejecución',
    titleEn: 'Execution',
    bodyEs:
      'Trabajo con tu equipo, no encima de él. Decisiones documentadas y avance visible cada semana.',
    bodyEn: 'I work with your team, not above it. Documented decisions and visible progress every week.',
    icon: 'checklist',
  },
  {
    num: '04',
    titleEs: 'Entrega y traspaso',
    titleEn: 'Delivery and handoff',
    bodyEs:
      'Documentación de arquitectura, decisiones y riesgos, para que el equipo siga sin depender de mí.',
    bodyEn:
      'Architecture, decisions, and risk documentation, so the team can carry on without depending on me.',
    icon: 'shield',
  },
];

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [PageNavLayoutComponent],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class ServicesComponent {
  private readonly langSvc = inject(LanguageService);
  private readonly serviceSvc = inject(ServiceOfferingService);
  readonly lang = this.langSvc.lang;
  readonly t = computed(() => T[this.lang()]);
  readonly offerings = this.serviceSvc.all;
  readonly steps = STEPS;

  readonly navSections = computed<NavSection[]>(() => {
    const tt = this.t();
    return [
      ...this.offerings.map((offering) => ({
        id: `offering-${offering.slug}`,
        label: this.lang() === 'es' ? offering.titleEs : offering.titleEn,
      })),
      { id: 'process', label: tt.processKicker },
      { id: 'investment', label: tt.investmentKicker },
    ];
  });
}
