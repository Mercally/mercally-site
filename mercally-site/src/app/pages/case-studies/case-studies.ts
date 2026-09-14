import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { CaseStudyService } from '../../services/case-study.service';
import { PatternService } from '../../services/pattern.service';
import { PatternCategory } from '../../models/architecture-pattern';
import { PageNavLayoutComponent } from '../../components/page-nav-layout/page-nav-layout';
import { NavSection } from '../../components/section-nav/section-nav';

const TRANS_T = {
  es: {
    title: 'Casos de Estudio',
    subtitle: 'Decisiones de arquitectura anonimizada de proyectos reales.',
    empty: 'Aún no hay casos de estudio publicados. Vuelve pronto.',
    casesKicker: 'Casos de estudio',
    patternsKicker: 'Patrones de arquitectura',
    codeDesignKicker: 'Patrones de diseño de código',
    aiKicker: 'Patrones de IA',
    engineeringKicker: 'Calidad, seguridad y DevOps',
    readCase: 'Leer el caso',
    onThisPage: 'En esta página',
  },
  en: {
    title: 'Case Studies',
    subtitle: 'Anonymized architecture decisions from real projects.',
    empty: 'No case studies published yet. Check back soon.',
    casesKicker: 'Case studies',
    patternsKicker: 'Architecture patterns',
    codeDesignKicker: 'Code design patterns',
    aiKicker: 'AI patterns',
    engineeringKicker: 'Quality, security, and DevOps',
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

  readonly patternGroups = computed(() => {
    const tt = this.t();
    const groups: { id: string; category: PatternCategory; label: string }[] = [
      { id: 'ai-section', category: 'ai', label: tt.aiKicker },
      { id: 'engineering-section', category: 'engineering-excellence', label: tt.engineeringKicker },
      { id: 'patterns-section', category: 'architecture', label: tt.patternsKicker },
      { id: 'code-design-section', category: 'code-design', label: tt.codeDesignKicker },
    ];

    return groups.map((group) => ({
      ...group,
      patterns: this.patterns.filter((pattern) => pattern.category === group.category),
    }));
  });

  readonly navSections = computed<NavSection[]>(() => {
    const tt = this.t();
    return [
      { id: 'case-studies-section', label: tt.casesKicker },
      ...this.patternGroups().map((group) => ({ id: group.id, label: group.label })),
    ];
  });
}
