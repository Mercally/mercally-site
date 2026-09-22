import { Component, computed, input } from '@angular/core';
import { Testimonial } from '../../models/testimonial';

const QUOTE_ICON_PATH =
  'M9.5 6C6.5 7.5 5 10 5 13.5A3.5 3.5 0 0 0 8.5 17c1.9 0 3.3-1.4 3.3-3.2 0-1.8-1.3-3.1-3-3.1-.2 0-.4 0-.6.1.3-1.4 1.3-2.6 2.8-3.4z';
const QUOTE_ICON_PATH_2 =
  'M19 6c-3 1.5-4.5 4-4.5 7.5A3.5 3.5 0 0 0 18 17c1.9 0 3.3-1.4 3.3-3.2 0-1.8-1.3-3.1-3-3.1-.2 0-.4 0-.6.1.3-1.4 1.3-2.6 2.8-3.4z';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  template: `
    @if (variant() === 'featured') {
      <figure
        class="m-0 flex flex-col md:flex-row md:items-center gap-6 md:gap-10 rounded-xl border border-violet-200 dark:border-violet-900/60 bg-violet-50/60 dark:bg-violet-950/20 p-7 md:p-10">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          class="shrink-0 text-violet-500 dark:text-violet-500" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path [attr.d]="quoteIconPath"></path>
          <path [attr.d]="quoteIconPath2"></path>
        </svg>
        <div>
          <blockquote class="text-lg md:text-xl leading-relaxed text-gray-800 dark:text-gray-200 mb-4">
            "{{ quote() }}"
          </blockquote>
          <figcaption class="text-sm text-gray-600 dark:text-gray-400">
            <span class="font-semibold text-gray-900 dark:text-gray-100">{{ testimonial().authorName }}</span>
            <span> · {{ testimonial().authorRole }}</span>
          </figcaption>
        </div>
      </figure>
    } @else {
      <figure
        class="m-0 h-full rounded-lg p-6 border-t-2"
        [class]="testimonial().pending
          ? 'border-t-gray-300 dark:border-t-gray-700 border-x border-b border-dashed border-gray-200 dark:border-gray-800 opacity-60'
          : 'border-t-violet-500 dark:border-t-violet-400 border-x border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950'">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          class="text-violet-500 dark:text-violet-500 mb-3.5" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path [attr.d]="quoteIconPath"></path>
          <path [attr.d]="quoteIconPath2"></path>
        </svg>
        <blockquote class="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300 mb-4">"{{ quote() }}"</blockquote>
        <figcaption class="text-xs text-gray-500 dark:text-gray-500">
          @if (testimonial().pending) {
            {{ placeholderAuthor() }}
          } @else {
            <span class="font-medium text-gray-700 dark:text-gray-300">{{ testimonial().authorName }}</span>
            <span> · {{ testimonial().authorRole }}</span>
          }
        </figcaption>
      </figure>
    }
  `,
})
export class TestimonialCardComponent {
  readonly testimonial = input.required<Testimonial>();
  readonly lang = input<'es' | 'en'>('es');
  readonly variant = input<'featured' | 'grid'>('grid');
  readonly placeholderAuthor = input<string>('');

  readonly quoteIconPath = QUOTE_ICON_PATH;
  readonly quoteIconPath2 = QUOTE_ICON_PATH_2;

  readonly quote = computed(() =>
    this.lang() === 'es' ? this.testimonial().quoteEs : this.testimonial().quoteEn,
  );
}
