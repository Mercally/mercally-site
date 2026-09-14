import { Injectable } from '@angular/core';
import { Testimonial } from '../models/testimonial';

const TESTIMONIALS: Testimonial[] = [
  {
    slug: 'pending-1',
    quoteEs: 'Cita pendiente: el testimonio de un cliente o líder técnico con quien trabajaste.',
    quoteEn: 'Quote pending: a testimonial from a client or technical lead you worked with.',
    pending: true,
  },
  {
    slug: 'pending-2',
    quoteEs: 'Cita pendiente. Idealmente sobre un resultado concreto, no sobre lo agradable que fue trabajar contigo.',
    quoteEn: 'Quote pending. Ideally about a concrete result, not about how pleasant you were to work with.',
    pending: true,
  },
  {
    slug: 'pending-3',
    quoteEs: 'Cita pendiente. Un tercero basta para empezar, tres se ven mejor.',
    quoteEn: 'Quote pending. One is enough to start, three look better.',
    pending: true,
  },
];

@Injectable({ providedIn: 'root' })
export class TestimonialService {
  readonly all: Testimonial[] = TESTIMONIALS;
}
