import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, inject, effect } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';

const GISCUS_REPO = 'Mercally/mercally-site';
const GISCUS_REPO_ID = 'R_kgDOUasXtg';
const GISCUS_CATEGORY = 'Comments';
const GISCUS_CATEGORY_ID = 'DIC_kwDOUasXts4DFl8I';

@Component({
  selector: 'app-giscus-comments',
  standalone: true,
  template: `<div #host></div>`,
})
export class GiscusCommentsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('host', { static: true }) private readonly host!: ElementRef<HTMLDivElement>;

  private readonly langSvc = inject(LanguageService);
  private readonly themeSvc = inject(ThemeService);
  private scriptEl?: HTMLScriptElement;

  constructor() {
    effect(() => {
      const message = {
        giscus: { setConfig: { theme: this.themeSvc.theme(), lang: this.langSvc.lang() } },
      };
      document
        .querySelector<HTMLIFrameElement>('iframe.giscus-frame')
        ?.contentWindow?.postMessage(message, 'https://giscus.app');
    });
  }

  ngAfterViewInit(): void {
    if (typeof document === 'undefined') return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', GISCUS_REPO);
    script.setAttribute('data-repo-id', GISCUS_REPO_ID);
    script.setAttribute('data-category', GISCUS_CATEGORY);
    script.setAttribute('data-category-id', GISCUS_CATEGORY_ID);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', this.themeSvc.theme());
    script.setAttribute('data-lang', this.langSvc.lang());
    script.setAttribute('data-loading', 'lazy');

    this.scriptEl = script;
    this.host.nativeElement.appendChild(script);
  }

  ngOnDestroy(): void {
    this.scriptEl?.remove();
  }
}
