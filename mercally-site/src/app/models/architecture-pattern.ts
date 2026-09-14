export interface ArchitecturePattern {
  slug: string;
  name: string;
  summaryEs: string;
  summaryEn: string;
  sections: PatternSection[];
}

export interface PatternSection {
  id: string;
  titleEs: string;
  titleEn: string;
  contentEs: string[];
  contentEn: string[];
}
