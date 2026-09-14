import { Component, inject, computed, signal, DestroyRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { ServiceOfferingService } from '../../services/service-offering.service';
import { StatService } from '../../services/stat.service';
import { CareerStintService } from '../../services/career-stint.service';
import { TechStackService } from '../../services/tech-stack.service';
import { TradeoffService } from '../../services/tradeoff.service';
import { TestimonialService } from '../../services/testimonial.service';
import { PageNavLayoutComponent } from '../../components/page-nav-layout/page-nav-layout';
import { NavSection } from '../../components/section-nav/section-nav';

const T = {
  es: {
    kicker: 'Senior Software Engineer & Technical Lead',
    title: 'Los sistemas no fallan por el código. Fallan por la decisión.',
    intro:
      'Más de nueve años diseñando, construyendo y operando software crítico de negocio en entornos internacionales y multicloud. Especializado en .NET, plataformas SaaS multi-tenant y seguridad de aplicaciones.',
    ctaTalk: 'Agendar una conversación',
    ctaCases: 'Ver casos de estudio',
    metaLocation: 'San Salvador, El Salvador',
    metaRemote: 'Remoto con equipos de EE.UU. y LATAM',
    metaLang: 'Español nativo, inglés B2',
    helpKicker: 'En qué puedo ayudar',
    helpIntro: 'Tres frentes, un mismo criterio: evaluar los trade-offs reales antes de comprometer código.',
    decideKicker: 'Cómo decido',
    decideIntro:
      'Toda arquitectura es una decisión con consecuencias. Estas son las que aparecen en casi todo proyecto, y de qué lado me paro.',
    decideHint: 'Abre la que te interese.',
    optionA: 'Opción A',
    optionB: 'Opción B',
    myRead: 'Mi lectura',
    workKicker: 'Dónde he trabajado',
    workIntro: 'Sin nombres de clientes: el contexto técnico dice más que el logo.',
    stackKicker: 'Stack',
    testimonialsKicker: 'Lo que dicen',
    testimonialsNote: 'Espacio reservado. Reemplaza estos tres bloques cuando tengas los testimonios.',
    testimonialAuthor: 'Nombre · Cargo, Empresa',
    closingTitle: '¿Tienes una decisión de arquitectura sobre la mesa?',
    closingBody: 'Cuéntame el contexto y te digo qué haría yo, y qué no.',
    closingEmail: 'Escríbeme',
    closingContact: 'Otras formas de contacto',
    onThisPage: 'En esta página',
  },
  en: {
    kicker: 'Senior Software Engineer & Technical Lead',
    title: 'Systems don\'t fail because of the code. They fail because of the decision.',
    intro:
      'Over nine years designing, building, and operating critical business software across international, multicloud environments. Focused on .NET, multi-tenant SaaS platforms, and application security.',
    ctaTalk: 'Book a conversation',
    ctaCases: 'View case studies',
    metaLocation: 'San Salvador, El Salvador',
    metaRemote: 'Remote with US and LATAM teams',
    metaLang: 'Native Spanish, B2 English',
    helpKicker: 'Where I can help',
    helpIntro: 'Three fronts, one same criterion: weigh the real trade-offs before committing to code.',
    decideKicker: 'How I decide',
    decideIntro:
      'Every architecture is a decision with consequences. These show up in almost every project, and here is which side I land on.',
    decideHint: 'Open the one you care about.',
    optionA: 'Option A',
    optionB: 'Option B',
    myRead: 'My take',
    workKicker: 'Where I\'ve worked',
    workIntro: 'No client names: the technical context says more than the logo.',
    stackKicker: 'Stack',
    testimonialsKicker: 'What people say',
    testimonialsNote: 'Placeholder space. Swap in these three blocks once you have real testimonials.',
    testimonialAuthor: 'Name · Title, Company',
    closingTitle: 'Have an architecture decision on the table?',
    closingBody: 'Tell me the context and I\'ll tell you what I\'d do, and what I wouldn\'t.',
    closingEmail: 'Email me',
    closingContact: 'Other ways to reach me',
    onThisPage: 'On this page',
  },
} as const;

interface ArchNode {
  labelEs: string;
  labelEn: string;
  detailEs: string;
  detailEn: string;
}

interface Arch {
  nameEs: string;
  nameEn: string;
  captionEs: string;
  captionEn: string;
  left: ArchNode[];
  center: ArchNode;
  right: ArchNode[];
}

const ARCHS: Arch[] = [
  {
    nameEs: 'Pagos multi-tenant',
    nameEn: 'Multi-tenant payments',
    captionEs: 'Plataforma gubernamental con una base de datos aislada por cliente. Pasa el mouse sobre una pieza para ver la decisión detrás.',
    captionEn: 'Government platform with a database isolated per client. Hover a piece to see the decision behind it.',
    left: [
      { labelEs: 'Portal ciudadano', labelEn: 'Citizen portal', detailEs: 'El mismo despliegue sirve a todos los condados: el tenant se resuelve al entrar, no duplicando instalaciones.', detailEn: 'The same deployment serves every county: the tenant resolves on entry, no duplicate installs.' },
      { labelEs: 'Caja municipal', labelEn: 'Municipal counter', detailEs: 'El cobro presencial y el de línea comparten el mismo motor de facturación: una sola regla de negocio, dos canales.', detailEn: 'In-person and online payment share the same billing engine: one business rule, two channels.' },
      { labelEs: 'API de terceros', labelEn: 'Third-party API', detailEs: 'Las integraciones externas entran por un contrato versionado, nunca directo contra la base de datos.', detailEn: 'External integrations come in through a versioned contract, never straight against the database.' },
    ],
    center: { labelEs: 'Motor de pagos', labelEn: 'Payment engine', detailEs: 'Concentra las reglas de facturación y cobro. Cada sistema que llega es un adaptador, no una rama de lógica nueva.', detailEn: 'Concentrates billing and collection rules. Every incoming system is an adapter, not a new logic branch.' },
    right: [
      { labelEs: 'SQL cliente A', labelEn: 'SQL client A', detailEs: 'Una base de datos aislada por cliente: el aislamiento es trivial de auditar y fácil de justificar ante compliance.', detailEn: 'A database isolated per client: isolation is trivial to audit and easy to justify to compliance.' },
      { labelEs: 'SQL cliente B', labelEn: 'SQL client B', detailEs: 'El precio de ese aislamiento: cada release toca N bases, y backups y monitoreo se multiplican por cliente.', detailEn: 'The cost of that isolation: every release touches N databases, and backups and monitoring multiply per client.' },
      { labelEs: 'Conciliación', labelEn: 'Reconciliation', detailEs: 'Proceso asíncrono que cuadra pagos contra facturas y deja rastro de cada diferencia.', detailEn: 'An async process that matches payments against invoices and leaves a trail of every discrepancy.' },
    ],
  },
  {
    nameEs: 'Integración empresarial',
    nameEn: 'Enterprise integration',
    captionEs: 'Sistemas que no se hablaban, comunicándose por eventos. Pasa el mouse sobre una pieza para ver la decisión detrás.',
    captionEn: 'Systems that didn\'t talk, now communicating through events. Hover a piece to see the decision behind it.',
    left: [
      { labelEs: 'Sistema legado', labelEn: 'Legacy system', detailEs: 'Lo viejo no se reescribe para integrarlo: se envuelve detrás de un contrato y se deja de tocar.', detailEn: 'The old system isn\'t rewritten to integrate it: it\'s wrapped behind a contract and left untouched.' },
      { labelEs: 'Servicio WCF', labelEn: 'WCF service', detailEs: 'SOAP y WCF siguen vivos en la empresa. Conviven con REST detrás del mismo bus, sin forzar una migración.', detailEn: 'SOAP and WCF are still alive in the company. They coexist with REST behind the same bus, with no forced migration.' },
      { labelEs: 'App móvil', labelEn: 'Mobile app', detailEs: 'El cliente móvil consume el mismo contrato que el resto: un solo lugar donde cambia la regla de negocio.', detailEn: 'The mobile client consumes the same contract as everything else: one place where the business rule changes.' },
    ],
    center: { labelEs: 'Bus de mensajes', labelEn: 'Message bus', detailEs: 'Los servicios se comunican por eventos, no por llamadas directas: quien publica no necesita saber quién consume.', detailEn: 'Services talk through events, not direct calls: the publisher doesn\'t need to know who consumes.' },
    right: [
      { labelEs: 'API REST', labelEn: 'REST API', detailEs: 'La API expone casos de uso, no tablas. El modelo de escritura valida invariantes; el de lectura solo proyecta.', detailEn: 'The API exposes use cases, not tables. The write model enforces invariants; the read model just projects.' },
      { labelEs: 'Worker', labelEn: 'Worker', detailEs: 'El trabajo lento sale del request: procesamiento en background con reintentos y backoff.', detailEn: 'Slow work leaves the request: background processing with retries and backoff.' },
      { labelEs: 'Dead letter', labelEn: 'Dead letter', detailEs: 'Si el reintento se agota, el mensaje queda registrado en dead letter. Nada se pierde en silencio.', detailEn: 'If retries run out, the message lands in dead letter. Nothing gets lost silently.' },
    ],
  },
  {
    nameEs: 'Observabilidad',
    nameEn: 'Observability',
    captionEs: 'Una traza que sobrevive al salto asíncrono. Pasa el mouse sobre una pieza para ver la decisión detrás.',
    captionEn: 'A trace that survives the async jump. Hover a piece to see the decision behind it.',
    left: [
      { labelEs: 'API', labelEn: 'API', detailEs: 'Cada request entra con un correlation id que viaja hasta el último salto del sistema.', detailEn: 'Every request enters with a correlation id that travels to the system\'s last hop.' },
      { labelEs: 'Workers', labelEn: 'Workers', detailEs: 'El trabajo asíncrono hereda el mismo correlation id: la traza no se corta al salir del request.', detailEn: 'Async work inherits the same correlation id: the trace doesn\'t break when it leaves the request.' },
      { labelEs: 'Jobs', labelEn: 'Jobs', detailEs: 'Los procesos programados se instrumentan igual que el resto, o se vuelven el punto ciego donde fallan las cosas.', detailEn: 'Scheduled jobs are instrumented like everything else, or they become the blind spot where things fail.' },
    ],
    center: { labelEs: 'OpenTelemetry', labelEn: 'OpenTelemetry', detailEs: 'Una sola capa de instrumentación, estándar y sin amarre a proveedor: el destino se cambia sin tocar el código.', detailEn: 'One instrumentation layer, standard and vendor-neutral: the destination changes without touching code.' },
    right: [
      { labelEs: 'Seq', labelEn: 'Seq', detailEs: 'Consulta estructurada de logs por correlation id. Alternativa evaluada: Application Insights, de pago.', detailEn: 'Structured log queries by correlation id. Evaluated alternative: paid Application Insights.' },
      { labelEs: 'Grafana', labelEn: 'Grafana', detailEs: 'Métricas y paneles para ver la tendencia, no solo el incidente de hoy.', detailEn: 'Metrics and dashboards to see the trend, not just today\'s incident.' },
      { labelEs: 'Alertas', labelEn: 'Alerts', detailEs: 'Alerta sobre síntoma de negocio, no sobre CPU: lo que importa es si dejó de entrar trabajo al sistema.', detailEn: 'Alerts on business symptoms, not CPU: what matters is whether work stopped flowing into the system.' },
    ],
  },
];

const ROWS = [30, 120, 210];
const NW = 96, NH = 40, LX = 8, CX = 162, RX = 316;

const EDGES = [
  'M104 50C133 50 133 120 162 130', 'M104 140H162',
  'M104 230C133 230 133 160 162 150',
  'M258 130C287 120 287 50 316 50', 'M258 140H316',
  'M258 150C287 160 287 230 316 230',
];

function nodeStrokeClass(isHovered: boolean, isBig: boolean): string {
  if (isHovered) return 'stroke-violet-600 dark:stroke-violet-400';
  return isBig ? 'stroke-violet-500 dark:stroke-violet-500' : 'stroke-gray-300 dark:stroke-gray-700';
}

const FLOWS = [
  { d: 'M104 50C133 50 133 120 162 130H258C287 120 287 50 316 50', dur: '4.4s', delay: '0s' },
  { d: 'M104 140H316', dur: '5.8s', delay: '.5s' },
  { d: 'M104 230C133 230 133 160 162 150H258C287 160 287 230 316 230', dur: '6.6s', delay: '1.2s' },
];

@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [RouterLink, PageNavLayoutComponent],
  templateUrl: './hub.html',
  styleUrl: './hub.css',
})
export class HubComponent {
  private readonly langSvc = inject(LanguageService);
  private readonly offeringSvc = inject(ServiceOfferingService);
  private readonly statSvc = inject(StatService);
  private readonly careerSvc = inject(CareerStintService);
  private readonly stackSvc = inject(TechStackService);
  private readonly tradeoffSvc = inject(TradeoffService);
  private readonly testimonialSvc = inject(TestimonialService);
  private readonly destroyRef = inject(DestroyRef);

  readonly lang = this.langSvc.lang;
  readonly t = computed(() => T[this.lang()]);

  readonly offerings = this.offeringSvc.all;
  readonly stats = this.statSvc.all;
  readonly career = this.careerSvc.all;
  readonly stack = this.stackSvc.all;
  readonly tradeoffs = this.tradeoffSvc.all;
  readonly testimonials = this.testimonialSvc.all;

  readonly navSections = computed<NavSection[]>(() => {
    const tt = this.t();
    return [
      { id: 'help', label: tt.helpKicker },
      { id: 'decide', label: tt.decideKicker },
      { id: 'career', label: tt.workKicker },
      { id: 'stack', label: tt.stackKicker },
      { id: 'testimonials', label: tt.testimonialsKicker },
    ];
  });

  readonly edges = EDGES;
  readonly flows = FLOWS;

  readonly archNames = ARCHS.map((a) => ({ nameEs: a.nameEs, nameEn: a.nameEn }));
  readonly archIndex = signal(0);
  readonly hover = signal<number | null>(null);
  readonly openTradeoff = signal<string | null>(null);

  readonly arch = computed(() => ARCHS[this.archIndex()]);

  readonly nodes = computed(() => {
    const arch = this.arch();
    const raw = [
      ...arch.left.map((n, i) => ({ n, x: LX, y: ROWS[i], big: false })),
      { n: arch.center, x: CX, y: ROWS[1], big: true },
      ...arch.right.map((n, i) => ({ n, x: RX, y: ROWS[i], big: false })),
    ];
    const hovered = this.hover();
    return raw.map((it, i) => ({
      ...it,
      i,
      w: NW,
      h: NH,
      on: hovered === i,
      strokeClass: nodeStrokeClass(hovered === i, it.big),
      strokeWidth: hovered === i || it.big ? 1.8 : 1.3,
      textClass: hovered === i
        ? 'text-gray-900 dark:text-gray-100'
        : 'text-violet-700 dark:text-violet-300',
      leftPct: (it.x / 420) * 100,
      topPct: (it.y / 300) * 100,
      wPct: (NW / 420) * 100,
      hPct: (NH / 300) * 100,
    }));
  });

  readonly hoveredDetail = computed(() => {
    const hovered = this.hover();
    if (hovered === null) return null;
    return this.nodes()[hovered]?.n ?? null;
  });

  constructor() {
    const timer = setInterval(() => {
      if (this.hover() === null) {
        this.archIndex.update((i) => (i + 1) % ARCHS.length);
      }
    }, 6000);
    this.destroyRef.onDestroy(() => clearInterval(timer));
  }

  pickArch(i: number): void {
    this.archIndex.set(i);
    this.hover.set(null);
  }

  toggleTradeoff(slug: string): void {
    this.openTradeoff.update((current) => (current === slug ? null : slug));
  }
}
