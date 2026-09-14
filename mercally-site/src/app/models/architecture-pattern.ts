export interface ArchitecturePattern {
  slug: string;
  category: PatternCategory;
  name: string;
  summaryEs: string;
  summaryEn: string;
  sections: PatternSection[];
}

export type PatternCategory = 'architecture' | 'code-design' | 'ai' | 'engineering-excellence';

export interface PatternSection {
  id: string;
  titleEs: string;
  titleEn: string;
  contentEs: string[];
  contentEn: string[];
}
