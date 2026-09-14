export interface ArchitecturePattern {
  slug: string;
  category: PatternCategory;
  level: PatternLevel;
  name: string;
  nameEs?: string;
  summaryEs: string;
  summaryEn: string;
  sections: PatternSection[];
}

export type PatternCategory = 'architecture' | 'code-design' | 'ai' | 'engineering-excellence';

export type PatternLevel = 'basic' | 'intermediate' | 'advanced';

export interface PatternSection {
  id: string;
  titleEs: string;
  titleEn: string;
  contentEs: string[];
  contentEn: string[];
}
