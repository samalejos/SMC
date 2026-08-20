export interface ConceptCard {
  plain: string;
  term: string;
  body: string;
  glyph?: "up" | "down" | "flat";
}

export interface RecallCheck {
  id: string;
  prompt: string;
  placeholder: string;
  modelAnswer: string;
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

export interface FlowStep {
  label: string;
  body: string;
  branch?: "pass" | "reject";
}

export type MicroDiagramKind =
  | "instrument"
  | "tick-ruler"
  | "session-clock"
  | "candle-anatomy"
  | "timeframe-compression"
  | "swing-rule";

export interface MicroDiagramSpec {
  kind: MicroDiagramKind;
  title: string;
  caption: string;
}

export interface PanelSpec {
  label: string;
  verdict: "bull" | "bear" | "warn";
  points: number[];
  note: string;
}

export interface ComparePanelsSpec {
  heading: string;
  left: PanelSpec;
  right: PanelSpec;
}

export interface MeterBarSpec {
  heading: string;
  intro: string;
  valuePct: number;
  thresholdPct: number;
  valueLabel: string;
  passLabel: string;
  failLabel: string;
  verdict: "pass" | "fail";
}

export interface StackFitSpec {
  heading: string;
  intro: string;
  budget: number;
  unit: number;
  fits: number;
  budgetLabel: string;
  unitLabel: string;
}

export interface DataTable {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface RegimeGridSpec {
  heading: string;
  intro: string;
  highlightRow: "low" | "high";
  highlightCol: "low" | "high";
  highlightNote: string;
}

export type VisualBlock =
  | { type: "chart" }
  | { type: "paragraph"; text: string }
  | { type: "microDiagrams"; items: MicroDiagramSpec[] }
  | { type: "conceptCards"; concepts: ConceptCard[] }
  | { type: "comparePanels"; spec: ComparePanelsSpec }
  | { type: "meterBar"; spec: MeterBarSpec }
  | { type: "stackFit"; spec: StackFitSpec }
  | { type: "regimeGrid"; spec: RegimeGridSpec }
  | { type: "flowChart"; heading: string; steps: FlowStep[] }
  | { type: "truthTable"; pair: TruthTablePair }
  | { type: "callout"; callout: Callout }
  | { type: "recallCheck"; check: RecallCheck }
  | { type: "dataTable"; table: DataTable };

export interface DepthModule {
  slug: string;
  number: number;
  phase: string;
  title: string;
  status: "ready" | "coming-soon";
  goal?: string;
  hasChart?: boolean;
  blocks: VisualBlock[];
}

export interface Lesson {
  slug: string;
  index: number;
  stageKicker: string;
  title: string;
  goal: string;
  hasChart?: boolean;
  blocks: VisualBlock[];
  nextSlug: string | null;
  nextLabel: string | null;
}
