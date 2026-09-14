import { Component, inject, computed, signal } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { PageNavLayoutComponent } from '../../components/page-nav-layout/page-nav-layout';
import { NavSection } from '../../components/section-nav/section-nav';

interface ContactTopic {
  id: string;
  labelEs: string;
  labelEn: string;
}

const TOPICS: ContactTopic[] = [
  { id: 'architecture', labelEs: 'Análisis de arquitectura', labelEn: 'Architecture analysis' },
  { id: 'leadership', labelEs: 'Liderazgo técnico', labelEn: 'Technical leadership' },
  { id: 'security', labelEs: 'Ciberseguridad (SAST, DAST)', labelEn: 'Cybersecurity (SAST, DAST)' },
  { id: 'other', labelEs: 'Otro', labelEn: 'Other' },
];

const T = {
  es: {
    kicker: 'Contacto',
    title: 'Hablemos de tu próximo proyecto',
    intro:
      'Cuéntame el contexto: qué estás construyendo, qué te está bloqueando y en qué plazo. Te respondo directo, sin intermediarios.',
    formName: 'Tu nombre',
    formNamePlaceholder: 'Nombre y apellido',
    formCompany: 'Empresa',
    formCompanyPlaceholder: 'Opcional',
    formEmail: 'Tu correo',
    formEmailPlaceholder: 'nombre@empresa.com',
    formTopic: 'Tema',
    formMessage: 'Contexto',
    formMessagePlaceholder: 'Qué estás construyendo, qué te está bloqueando y en qué plazo',
    formSubmit: 'Enviar por correo',
    formNote: 'El botón abre tu cliente de correo con el mensaje ya redactado.',
    formSection: 'Formulario',
    onThisPage: 'En esta página',
    infoSection: 'Información',
    location: 'Ubicación',
    locationVal: 'San Salvador, El Salvador',
    email: 'Correo',
    copy: 'Copiar',
    copied: 'Copiado',
    reposSection: 'Repositorios',
    ghDesc: 'Repositorios y proyectos públicos',
    azDesc: 'Pipelines, repos y proyectos',
    socialSection: 'Redes',
  },
  en: {
    kicker: 'Contact',
    title: "Let's talk about your next project",
    intro:
      "Tell me the context: what you're building, what's blocking you, and your timeline. I respond directly, no intermediaries.",
    formName: 'Your name',
    formNamePlaceholder: 'Full name',
    formCompany: 'Company',
    formCompanyPlaceholder: 'Optional',
    formEmail: 'Your email',
    formEmailPlaceholder: 'name@company.com',
    formTopic: 'Topic',
    formMessage: 'Context',
    formMessagePlaceholder: "What you're building, what's blocking you, and your timeline",
    formSubmit: 'Send by email',
    formNote: 'The button opens your email client with the message already drafted.',
    formSection: 'Form',
    onThisPage: 'On this page',
    infoSection: 'Information',
    location: 'Location',
    locationVal: 'San Salvador, El Salvador',
    email: 'Email',
    copy: 'Copy',
    copied: 'Copied',
    reposSection: 'Repositories',
    ghDesc: 'Public repos and projects',
    azDesc: 'Pipelines, repos and projects',
    socialSection: 'Social',
  },
} as const;

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [PageNavLayoutComponent],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent {
  private readonly langSvc = inject(LanguageService);
  readonly lang = this.langSvc.lang;
  readonly t = computed(() => T[this.lang()]);

  readonly topics = TOPICS;

  readonly navSections = computed<NavSection[]>(() => {
    const tt = this.t();
    return [
      { id: 'form', label: tt.formSection },
      { id: 'info', label: tt.infoSection },
    ];
  });

  readonly email = 'josuemercally@outlook.com';
  readonly copied = signal(false);

  readonly formName = signal('');
  readonly formCompany = signal('');
  readonly formEmail = signal('');
  readonly formTopic = signal(TOPICS[0].id);
  readonly formMessage = signal('');

  copyEmail() {
    navigator.clipboard
      .writeText(this.email)
      .then(() => {
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2000);
      })
      .catch((err) => console.error('clipboard error:', err));
  }

  onSubmit(e: Event): void {
    e.preventDefault();

    const topic = this.topics.find((candidate) => candidate.id === this.formTopic());
    let topicLabel = '';
    if (topic) {
      topicLabel = this.lang() === 'es' ? topic.labelEs : topic.labelEn;
    }

    const subject = encodeURIComponent(`Consulta: ${topicLabel}`);
    const body = encodeURIComponent(
      [
        `${this.t().formName}: ${this.formName()}`,
        `${this.t().formCompany}: ${this.formCompany()}`,
        `${this.t().formEmail}: ${this.formEmail()}`,
        `${this.t().formTopic}: ${topicLabel}`,
        '',
        this.formMessage(),
      ].join('\n'),
    );

    window.location.href = `mailto:${this.email}?subject=${subject}&body=${body}`;
  }
}
