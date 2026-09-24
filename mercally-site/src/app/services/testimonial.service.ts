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
    slug: 'wordpress-landing',
    quoteEs:
      'Nos ayudó a implementar nuestra landing page en WordPress, cuidando cada detalle del despliegue y ahorrándonos costos que no esperábamos reducir. Cumplió justo lo que necesitábamos, sin gastos de más.',
    quoteEn:
      'He helped us implement our landing page on WordPress, taking care of every detail of the deployment and saving us costs we didn\'t expect to cut. He delivered exactly what we needed, without extra expenses.',
    pending: false,
  },
  {
    slug: 'office-365-sharepoint',
    quoteEs:
      'Nos guio en la implementación de Office 365, en la selección del nombre de dominio y en el uso adecuado de SharePoint. El resultado se nota: la comunicación dentro de la organización mejoró y la información fluye donde debe estar.',
    quoteEn:
      'He guided us through the Office 365 rollout, choosing our domain name, and using SharePoint properly. The result shows: communication within the organization improved and information now flows where it should.',
    pending: false,
  },
];

@Injectable({ providedIn: 'root' })
export class TestimonialService {
  readonly all: Testimonial[] = TESTIMONIALS;
}
