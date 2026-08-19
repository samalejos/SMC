export interface ConceptCard {
  plain: string;
  term: string;
  body: string;
}

export interface RecallCheck {
  id: string;
  prompt: string;
  placeholder: string;
  modelAnswer: string;
}

export interface RuleStep {
  label: string;
  body: string;
}

export interface FormulaCard {
  heading: string;
  intro: string;
  formulaLines?: string[];
  rules: RuleStep[];
  footnote?: string;
}

export interface DataTable {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface TruthTablePair {
  observedLabel: string;
  observed: string;
  interpretedLabel: string;
  interpreted: string;
}

export interface Callout {
  tone: "warn" | "liq" | "bull";
  heading: string;
  body: string;
}

export interface DecisionChainStep {
  heading: string;
  body: string;
}

export interface Lesson {
  slug: string;
  index: number;
  stageKicker: string;
  title: string;
  goal: string;
  concepts?: ConceptCard[];
  hasChart?: boolean;
  formulaCard?: FormulaCard;
  dataTable?: DataTable;
  truthTable?: TruthTablePair;
  callout?: Callout;
  decisionChain?: DecisionChainStep[];
  recallChecks: RecallCheck[];
  nextSlug: string | null;
  nextLabel: string | null;
}
