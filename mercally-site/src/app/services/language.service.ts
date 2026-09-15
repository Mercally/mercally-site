import { DOCUMENT } from '@angular/common';
import { effect, Injectable, inject, signal } from '@angular/core';

export type Lang = 'es' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly STORAGE_KEY = 'lang';
  private readonly document = inject(DOCUMENT);

  readonly lang = signal<Lang>(this._getInitialLang());

  constructor() {
    effect(() => {
      this.document.documentElement.lang = this.lang();
    });
  }

  toggle(): void {
    const next: Lang = this.lang() === 'es' ? 'en' : 'es';
    this.lang.set(next);
    localStorage.setItem(this.STORAGE_KEY, next);
  }

  private _getInitialLang(): Lang {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored === 'es' || stored === 'en') return stored;

    return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en';
  }
}
