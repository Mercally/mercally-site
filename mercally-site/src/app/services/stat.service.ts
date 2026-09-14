import { Injectable } from '@angular/core';
import { Stat } from '../models/stat';

const STATS: Stat[] = [
  { value: '9+', labelEs: 'Años en tecnología', labelEn: 'Years in technology' },
  { value: '5+', labelEs: 'Nubes en producción', labelEn: 'Clouds in production' },
  { value: '500+', labelEs: 'Personas alcanzadas en proyectos SaaS', labelEn: 'People reached across SaaS projects' },
  { value: '50+', labelEs: 'Clientes indirectos', labelEn: 'Indirect clients' },
];

@Injectable({ providedIn: 'root' })
export class StatService {
  readonly all: Stat[] = STATS;
}
