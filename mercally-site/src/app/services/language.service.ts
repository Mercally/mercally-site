import { Injectable, signal } from '@angular/core';

export type Lang = 'es' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly STORAGE_KEY = 'lang';

  readonly lang = signal<Lang>(this._getInitialLang());

  toggle(): void {
    const next: Lang = this.lang() === 'es' ? 'en' : 'es';
    this.lang.set(next);
    localStorage.setItem(this.STORAGE_KEY, next);
  }

  private _getInitialLang(): Lang {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored === 'es' ? 'es' : 'en';
  }
}
