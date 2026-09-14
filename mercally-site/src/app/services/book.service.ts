import { Injectable } from '@angular/core';
import { Book } from '../models/book';

const BOOKS: Book[] = [
  {
    slug: 'designing-data-intensive-applications',
    titleEs: 'Designing Data-Intensive Applications',
    titleEn: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    oneLinerEs: 'El mapa de referencia para pensar en datos: replicación, particionado, consistencia y procesamiento a gran escala.',
    oneLinerEn: 'The reference map for reasoning about data: replication, partitioning, consistency, and large-scale processing.',
    whyRecommendedEs: 'Es el libro que más cambia cómo evalúas trade-offs de bases de datos y sistemas distribuidos en decisiones de arquitectura reales.',
    whyRecommendedEn: 'The book that most changes how you evaluate database and distributed-systems trade-offs in real architecture decisions.',
    link: 'https://dataintensive.net/',
    dateAdded: '2026-09-10',
  },
  {
    slug: 'clean-architecture',
    titleEs: 'Clean Architecture',
    titleEn: 'Clean Architecture',
    author: 'Robert C. Martin',
    oneLinerEs: 'Principios para separar reglas de negocio de detalles de framework, base de datos y UI.',
    oneLinerEn: 'Principles for separating business rules from framework, database, and UI details.',
    whyRecommendedEs: 'Base conceptual útil para justificar límites de capas y por qué el dominio no debería depender de infraestructura.',
    whyRecommendedEn: 'Useful conceptual foundation for justifying layer boundaries and why the domain shouldn\'t depend on infrastructure.',
    link: 'https://www.oreilly.com/library/view/clean-architecture-a/9780134494272/',
    dateAdded: '2026-09-10',
  },
  {
    slug: 'domain-driven-design',
    titleEs: 'Domain-Driven Design',
    titleEn: 'Domain-Driven Design',
    author: 'Eric Evans',
    oneLinerEs: 'Cómo modelar software alrededor del dominio del negocio usando un lenguaje ubicuo y límites de contexto explícitos.',
    oneLinerEn: 'How to model software around the business domain using a ubiquitous language and explicit context boundaries.',
    whyRecommendedEs: 'Referencia obligada para diseñar bounded contexts y evitar que un modelo único intente servir a todo el sistema.',
    whyRecommendedEn: 'Required reading for designing bounded contexts and avoiding a single model trying to serve the whole system.',
    link: 'https://www.domainlanguage.com/ddd/blue-book/',
    dateAdded: '2026-09-10',
  },
];

@Injectable({ providedIn: 'root' })
export class BookService {
  readonly all: Book[] = BOOKS;

  getBySlug(slug: string): Book | undefined {
    return BOOKS.find((b) => b.slug === slug);
  }
}
