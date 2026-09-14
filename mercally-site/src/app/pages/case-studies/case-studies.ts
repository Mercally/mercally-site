import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { CaseStudyService } from '../../services/case-study.service';
import { PatternService } from '../../services/pattern.service';
import { PageNavLayoutComponent } from '../../components/page-nav-layout/page-nav-layout';
import { NavSection } from '../../components/section-nav/section-nav';

const TRANS_T = {
  es: {
    title: 'Casos de Estudio',
    subtitle: 'Decisiones de arquitectura anonimizada de proyectos reales.',
    empty: 'Aún no hay casos de estudio publicados. Vuelve pronto.',
    casesKicker: 'Casos de estudio',
    patternsKicker: 'Patrones de arquitectura',
    readCase: 'Leer el caso',
    onThisPage: 'En esta página',
  },
  en: {
    title: 'Case Studies',
    subtitle: 'Anonymized architecture decisions from real projects.',
    empty: 'No case studies published yet. Check back soon.',
    casesKicker: 'Case studies',
    patternsKicker: 'Architecture patterns',
    readCase: 'Read the case study',
    onThisPage: 'On this page',
  },
} as const;

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [RouterLink, DatePipe, PageNavLayoutComponent],
  templateUrl: './case-studies.html',
  styleUrl: './case-studies.css',
})
export class CaseStudiesComponent {
  private readonly langSvc = inject(LanguageService);
  private readonly caseSvc = inject(CaseStudyService);
  private readonly patternSvc = inject(PatternService);
  readonly lang = this.langSvc.lang;
  readonly t = computed(() => TRANS_T[this.lang()]);
  readonly caseStudies = this.caseSvc.all;
  readonly patterns = this.patternSvc.all;

  readonly navSections = computed<NavSection[]>(() => {
    const tt = this.t();
    return [
      { id: 'case-studies-section', label: tt.casesKicker },
      { id: 'patterns-section', label: tt.patternsKicker },
    ];
  });
}
