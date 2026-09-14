import { Component, input } from '@angular/core';
import { SectionNavComponent, NavSection } from '../section-nav/section-nav';

@Component({
  selector: 'app-page-nav-layout',
  standalone: true,
  imports: [SectionNavComponent],
  template: `
    <div class="grid grid-cols-1 lg:grid-cols-[160px_minmax(0,1fr)] gap-x-10 gap-y-10 items-start">
      <aside class="hidden lg:block lg:sticky lg:top-20 self-start" [attr.aria-label]="ariaLabel()">
        <app-section-nav [sections]="sections()" [ariaLabel]="ariaLabel()" />
      </aside>
      <div class="min-w-0"><ng-content></ng-content></div>
    </div>
  `,
})
export class PageNavLayoutComponent {
  readonly sections = input.required<NavSection[]>();
  readonly ariaLabel = input<string>('');
}
