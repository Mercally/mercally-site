import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, inject, effect } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';

// TODO: fill in once the GitHub repo backing comments exists and the giscus
// app (https://github.com/apps/giscus) is installed on it with Discussions
// enabled. Get these exact values from https://giscus.app after pointing it
// at that repo -- do not guess repo-id/category-id, they are opaque IDs.
const GISCUS_REPO = 'TODO-owner/TODO-repo';
const GISCUS_REPO_ID = 'TODO';
const GISCUS_CATEGORY = 'Comments';
const GISCUS_CATEGORY_ID = 'TODO';

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
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', this.themeSvc.theme());
    script.setAttribute('data-lang', this.langSvc.lang());

    this.scriptEl = script;
    this.host.nativeElement.appendChild(script);
  }

  ngOnDestroy(): void {
    this.scriptEl?.remove();
  }
}
