export interface Project {
  slug: string;
  titleEs: string;
  titleEn: string;
  tagsEs: string[];
  tagsEn: string[];
  oneLinerEs: string;
  oneLinerEn: string;
  contextEs: string;
  contextEn: string;
  problemEs: string;
  problemEn: string;
  architectureDecisionEs: string[];
  architectureDecisionEn: string[];
  tradeOffs: TradeOff[];
  resultsEs: string[];
  resultsEn: string[];
  diagram?: string;
  dateAdded: string;
  relatedPatterns?: string[];
}

export interface TradeOff {
  aspectEs: string;
  aspectEn: string;
  descriptionEs: string;
  descriptionEn: string;
}
