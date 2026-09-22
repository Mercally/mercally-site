import { Injectable } from '@angular/core';
import { Testimonial } from '../models/testimonial';

const TESTIMONIALS: Testimonial[] = [
  {
    slug: 'giovanni-montano',
    quoteEs:
      'Trabajar con Josué ha sido una decisión muy acertada, es un profesional brillante que capta las necesidades del cliente y las transforma en realidades. Es fácil poder trabajar con alguien que parece entender lo que necesitas para convertir en realidad proyectos.',
    quoteEn:
      'Working with Josué has been a great decision — he is a brilliant professional who grasps the client\'s needs and turns them into reality. It\'s easy to work with someone who seems to understand what you need to make projects real.',
    pending: false,
    authorName: 'Giovanni Montano',
    authorRole: 'Director, SV Consultores SA de CV',
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
