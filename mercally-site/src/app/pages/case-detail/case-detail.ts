import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { LanguageService } from '../../services/language.service';
import { CaseStudyService } from '../../services/case-study.service';
import { ThemeService } from '../../services/theme.service';
import { PatternService } from '../../services/pattern.service';
import { GiscusCommentsComponent } from '../../components/giscus-comments/giscus-comments';
import { SectionNavComponent, NavSection } from '../../components/section-nav/section-nav';

const TRANS_T = {
  es: {
    notFound: 'Proyecto no encontrado.',
    back: 'Volver a proyectos',
    context: 'Contexto',
    problem: 'Problema',
    decision: 'Decisión de arquitectura',
    tradeOffs: 'Compensaciones',
    results: 'Resultados',
    diagram: 'Diagrama de arquitectura',
    diagramCredit: '¿Cómo se generan estos diagramas? Con',
    relatedPatterns: 'Patrones relacionados',
    comments: 'Comentarios',
    onThisPage: 'En esta página',
    authorLine: 'Escrito por Josué Mercadillo, arquitecto de software.',
    authorLink: 'Más sobre mí',
    moreInfo: 'Más información',
  },
  en: {
    notFound: 'Project not found.',
    back: 'Back to projects',
    context: 'Context',
    problem: 'Problem',
    decision: 'Architecture decision',
    tradeOffs: 'Trade-offs',
    results: 'Results',
    diagram: 'Architecture diagram',
    diagramCredit: 'How are these diagrams generated? With',
    relatedPatterns: 'Related patterns',
    comments: 'Comments',
    onThisPage: 'On this page',
    authorLine: 'Written by Josué Mercadillo, software architect.',
    authorLink: 'More about me',
    moreInfo: 'More info',
  },
} as const;

@Component({
  selector: 'app-case-detail',
  standalone: true,
  imports: [RouterLink, DatePipe, GiscusCommentsComponent, SectionNavComponent],
  templateUrl: './case-detail.html',
  styleUrl: './case-detail.css',
})
export class CaseDetailComponent {
  private readonly langSvc = inject(LanguageService);
  private readonly caseSvc = inject(CaseStudyService);
  private readonly route = inject(ActivatedRoute);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly themeSvc = inject(ThemeService);
  private readonly patternSvc = inject(PatternService);

  readonly lang = this.langSvc.lang;
  readonly t = computed(() => TRANS_T[this.lang()]);

  private readonly slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')), {
    initialValue: '',
  });

  readonly caseStudy = computed(() => this.caseSvc.getBySlug(this.slug()));

  readonly relatedPatterns = computed(() => {
    const slugs = this.caseStudy()?.relatedPatterns ?? [];
    return slugs
      .map((slug) => this.patternSvc.getBySlug(slug))
      .filter((pattern) => pattern !== undefined);
  });

  readonly diagramUrl = computed(() => {
    const diagram = this.caseStudy()?.diagram;
    if (!diagram) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${diagram}?theme=${this.themeSvc.theme()}`);
  });

  readonly navSections = computed<NavSection[]>(() => {
    const tt = this.t();
    const sections: NavSection[] = [
      { id: 'context', label: tt.context },
      { id: 'problem', label: tt.problem },
      { id: 'decision', label: tt.decision },
      { id: 'tradeoffs', label: tt.tradeOffs },
    ];
    if (this.diagramUrl()) sections.push({ id: 'diagram', label: tt.diagram });
    sections.push({ id: 'results', label: tt.results }, { id: 'comments', label: tt.comments });
    return sections;
  });

  private presentObserver?: MutationObserver;

  onDiagramFrameLoad(frame: HTMLIFrameElement): void {
    this.presentObserver?.disconnect();

    const frameDoc = frame.contentDocument;
    if (!frameDoc) return;

    this.presentObserver = new MutationObserver(() => {
      const presenting = frameDoc.documentElement.getAttribute('data-present') === 'true';
      if (presenting && document.fullscreenElement !== frame) {
        frame.requestFullscreen?.().catch(() => {});
      } else if (!presenting && document.fullscreenElement === frame) {
        document.exitFullscreen?.().catch(() => {});
      }
    });
    this.presentObserver.observe(frameDoc.documentElement, {
      attributes: true,
      attributeFilter: ['data-present'],
    });
  }
}
