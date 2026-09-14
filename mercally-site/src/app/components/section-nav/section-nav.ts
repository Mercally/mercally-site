import { Component, input, signal, AfterViewInit, OnDestroy, DestroyRef, inject } from '@angular/core';

export interface NavSection {
  id: string;
  label: string;
}

@Component({
  selector: 'app-section-nav',
  standalone: true,
  template: `
    <nav [attr.aria-label]="ariaLabel()">
      <ul class="space-y-2 text-sm text-gray-500 dark:text-gray-400 border-l border-gray-200 dark:border-gray-800">
        @for (s of sections(); track s.id) {
          <li>
            <button type="button" (click)="goTo(s.id, $event)"
              class="block w-full text-left pl-3 -ml-px border-l bg-transparent border-0 cursor-pointer transition-colors"
              [class]="active() === s.id
                ? 'border-violet-600 dark:border-violet-400 text-violet-700 dark:text-violet-400'
                : 'border-transparent hover:border-violet-600 dark:hover:border-violet-400 hover:text-violet-700 dark:hover:text-violet-400'">
              {{ s.label }}
            </button>
          </li>
        }
      </ul>
    </nav>
  `,
})
export class SectionNavComponent implements AfterViewInit, OnDestroy {
  readonly sections = input.required<NavSection[]>();
  readonly ariaLabel = input<string>('');

  readonly active = signal<string | null>(null);

  private observer?: IntersectionObserver;
  private readonly destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    // Target sections render in the parent's projected content, so wait a tick
    // for them to exist in the DOM before wiring the observer.
    queueMicrotask(() => this.setupObserver());
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  goTo(id: string, event: Event): void {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth', block: 'start' });

    const hadTabIndex = el.hasAttribute('tabindex');
    if (!hadTabIndex) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
    if (!hadTabIndex) {
      el.addEventListener('blur', () => el.removeAttribute('tabindex'), { once: true });
    }

    this.active.set(id);
  }

  private setupObserver(): void {
    const elements = this.sections()
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!elements.length) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        const topMost = visible.reduce((a, b) => (a.boundingClientRect.top <= b.boundingClientRect.top ? a : b));
        this.active.set(topMost.target.id);
      },
      { rootMargin: '-100px 0px -70% 0px', threshold: 0 },
    );

    elements.forEach((el) => this.observer!.observe(el));
    this.destroyRef.onDestroy(() => this.observer?.disconnect());
  }
}
