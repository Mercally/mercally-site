import { computed, Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    private readonly STORAGE_KEY = 'theme';
    private readonly _theme = signal<Theme>(this._getInitialTheme());
    readonly theme = this._theme.asReadonly();
    readonly nextTheme = computed(() => this._theme() === 'light' ? 'dark' : 'light');

    constructor() {
        effect(() => {
            const newTheme = this._theme();
            localStorage.setItem(this.STORAGE_KEY, newTheme);

            document.documentElement.classList.toggle('dark', newTheme === 'dark');
        });
    }

    toggle(): void {
        this._theme.set(this.nextTheme());
    }

    private _getInitialTheme(): Theme {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored === 'dark' || stored === 'light') return stored;

        return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

}

