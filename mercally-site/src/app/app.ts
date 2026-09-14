import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { LanguageService } from './services/language.service';
import { ThemeService } from './services/theme.service';

const NAV_T = {
  es: {
    home: 'inicio', casestudies: 'casos', services: 'servicios', about: 'sobre mí', contact: 'contacto',
    talk: 'Hablemos', footerRole: 'Arquitectura de software · San Salvador, El Salvador',
  },
  en: {
    home: 'home', casestudies: 'case studies', services: 'services', about: 'about', contact: 'contact',
    talk: "Let's talk", footerRole: 'Software architecture · San Salvador, El Salvador',
  },
} as const;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected langSvc = inject(LanguageService);
  protected themeSvc = inject(ThemeService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  protected lang = this.langSvc.lang;
  protected nav = computed(() => NAV_T[this.lang()]);

  menuOpen = signal(false);

  ngOnInit() {
    this.updateSeoMetadata();

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.updateSeoMetadata());
  }

  toggleMenu() { this.menuOpen.update(v => !v); }
  closeMenu() { this.menuOpen.set(false); }

  private updateSeoMetadata() {
    const activeRoute = this.getActiveRoute(this.route);
    const title = activeRoute.snapshot.data['title'] as string | undefined;
    const description = activeRoute.snapshot.data['description'] as string | undefined;
    const path = this.router.url.split('?')[0].split('#')[0];
    const url = `https://mercally.com${path === '/' ? '/' : path}`;

    if (title) {
      this.title.setTitle(title);
      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ name: 'twitter:title', content: title });
    }

    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ name: 'twitter:description', content: description });
    }

    this.meta.updateTag({ property: 'og:url', content: url });
    this.updateCanonical(url);
  }

  private getActiveRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }

    return route;
  }

  private updateCanonical(url: string) {
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }
}
