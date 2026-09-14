import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { LanguageService } from '../../services/language.service';
import { PatternService } from '../../services/pattern.service';
import { PageNavLayoutComponent } from '../../components/page-nav-layout/page-nav-layout';
import { NavSection } from '../../components/section-nav/section-nav';
import { GiscusCommentsComponent } from '../../components/giscus-comments/giscus-comments';

const TRANS_T = {
  es: {
    notFound: 'Patrón no encontrado.',
    back: 'Casos y patrones',
    comments: 'Comentarios',
    onThisPage: 'En esta página',
  },
  en: {
    notFound: 'Pattern not found.',
    back: 'Case studies & patterns',
    comments: 'Comments',
    onThisPage: 'On this page',
  },
} as const;

@Component({
  selector: 'app-pattern-detail',
  standalone: true,
  imports: [RouterLink, PageNavLayoutComponent, GiscusCommentsComponent],
  templateUrl: './pattern-detail.html',
  styleUrl: './pattern-detail.css',
})
export class PatternDetailComponent {
  private readonly langSvc = inject(LanguageService);
  private readonly patternSvc = inject(PatternService);
  private readonly route = inject(ActivatedRoute);

  readonly lang = this.langSvc.lang;
  readonly t = computed(() => TRANS_T[this.lang()]);

  private readonly slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')), {
    initialValue: '',
  });

  readonly pattern = computed(() => this.patternSvc.getBySlug(this.slug()));

  readonly navSections = computed<NavSection[]>(() => {
    const p = this.pattern();
    if (!p) return [];
    const lang = this.lang();
    const sections: NavSection[] = p.sections.map((s) => ({
      id: s.id,
      label: lang === 'es' ? s.titleEs : s.titleEn,
    }));
    sections.push({ id: 'comments', label: this.t().comments });
    return sections;
  });
}
