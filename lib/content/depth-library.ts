import type { DepthModule, VisualBlock } from "@/lib/content/types";

export interface Phase {
  name: string;
  description: string;
  numbers: number[];
}

export const phases: Phase[] = [
  {
    name: "Depth 1 · Visual Foundations",
    description: "The vocabulary from Beginner Academy, deepened: reading structure, liquidity, displacement, order blocks and FVGs on real charts instead of one guided example.",
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 11],
  },
  {
    name: "Depth 2 · Evidence & Context",
    description: "Why the visual patterns happen and how to tell if they hold up — microstructure, statistics, macro context, order flow and the research discipline behind an edge.",
    numbers: [12, 13, 14, 15, 16, 17, 18, 19, 31, 32, 33, 34, 35, 37, 38, 39],
  },
  {
    name: "Depth 3 · Decision & Risk",
    description: "Turning a qualified pattern into a sized, executable decision — risk math, worked execution examples, futures mechanics and trade management.",
    numbers: [9, 10, 20, 21, 22, 36],
  },
  {
    name: "Depth 4 · Simulation",
    description: "Practice without capital — replaying historical decisions and building a statistical record before anything goes live.",
    numbers: [40, 41],
  },
  {
    name: "Depth 5 · Controlled Transition",
    description: "The bridge to live execution, under supervision — a live-desk lab, the full system capstone, and an independent competence review.",
    numbers: [42, 43, 44],
  },
  {
    name: "Extension Library",
    description: "Professional/quant-finance depth beyond the core path — econometrics, portfolio theory, derivatives, algorithmic trading and the business of trading.",
    numbers: [23, 24, 25, 26, 27, 28, 29, 30],
  },
];

const titles: Record<number, string> = {
  1: "Chart Literacy: Candles, Swings & Structure",
  2: "Liquidity Concepts",
  3: "Displacement & Imbalance",
  4: "Order Blocks, Breakers & Mitigation Blocks",
  5: "Fair Value Gaps (FVGs)",
  6: "Multi-Timeframe Structure",
  7: "Fibonacci, OTE & Premium / Discount",
  8: "Session Structure, Killzones & Daily Bias",
  9: "Risk Math",
  10: "Execution — Checklist, Setups & Worked Examples",
  11: "Classical Technical Indicators (Optional Context)",
  12: "Market Microstructure — The Science Behind the Footprints",
  13: "Statistical Validation & Backtesting — Is Your Edge Real?",
  14: "Programming Literacy for Traders — Python for Edge Validation",
  15: "Behavioral Finance & Decision Science — Know Your Brain",
  16: "Regulation, Ethics & Professional Conduct",
  17: "Macro Context for Index Traders — Why NQ/ES Move the Way They Do",
  18: "Algorithmic Trading Specifics — From Manual to Systematic",
  19: "Volatility Regimes & Options Market Mechanics",
  20: "Order Flow & Tape Dynamics — Reading the Live Market",
  21: "Futures Contract Mechanics & Market Architecture",
  22: "Advanced Performance Analytics — Optimizing Your Execution",
  23: "Advanced Quantitative Methods — Econometrics & Machine Learning for Trading",
  24: "Advanced Market Microstructure — Order Book Dynamics & High-Frequency Strategies",
  25: "Portfolio & Risk Management — From Single-Strategy to Multi-Asset",
  26: "Advanced Derivatives — Options, Volatility Trading & Structured Products",
  27: "Algorithmic and Systematic Trading — From Strategy Design to Reinforcement Learning",
  28: "Macro Trading & Global Markets — From Central Banks to Carry Trades",
  29: "Advanced Trader Psychology — Neurofinance & Performance Coaching",
  30: "The Business of Trading — Scaling, Capital & Compliance",
  31: "Auction Market Theory & Market Profile",
  32: "Volume Profile & Institutional VWAP",
  33: "Advanced Order Flow & Tape Dynamics",
  34: "Market Internals & Breadth",
  35: "Institutional Regime Engine",
  36: "Advanced Trade & Position Management",
  37: "Edge Engineering & Research Methodology",
  38: "Research Data Engineering",
  39: "Evidence Arbitration — Bridge to the Live System",
  40: "Replay Laboratory",
  41: "Statistical Edge Laboratory",
  42: "Live Execution Laboratory",
  43: "SMC System Capstone — Integration & Defense",
  44: "Independent Competence Review",
};

function phaseOf(n: number): string {
  return phases.find((p) => p.numbers.includes(n))?.name ?? "Extension Library";
}

export interface BridgeRow {
  stageSlug: string;
  stageLabel: string;
  moduleNumbers: number[];
}

export const beginnerBridge: BridgeRow[] = [
  { stageSlug: "before-stage-1", stageLabel: "Before Stage 1 · Understand the screen", moduleNumbers: [21, 9] },
  { stageSlug: "stage-1", stageLabel: "Stage 1 · See the chart", moduleNumbers: [1] },
  { stageSlug: "stage-2", stageLabel: "Stage 2 · Read direction", moduleNumbers: [1, 6] },
  { stageSlug: "stage-3", stageLabel: "Stage 3 · Find location", moduleNumbers: [2, 7] },
  { stageSlug: "stage-4", stageLabel: "Stage 4 · Judge reaction", moduleNumbers: [3, 4, 5] },
  { stageSlug: "stage-5", stageLabel: "Stage 5 · Make a decision", moduleNumbers: [9, 10] },
  { stageSlug: "apply", stageLabel: "Apply it · Guided walkthrough", moduleNumbers: [8, 40] },
];

const readyBlocks: Record<number, VisualBlock[]> = {
  1: [
    {
      type: "callout",
      callout: {
        tone: "liq",
        heading: "Working hypothesis — not market law",
        body: "A chart shows prices that traded; it does not display every resting order or identify who placed it. Obvious highs and lows can attract stop and breakout orders — this curriculum watches those locations, then requires a reclaim, displacement and contextual agreement before treating the interaction as a candidate.",
      },
    },
    { type: "chart" },
    {
      type: "comparePanels",
      spec: {
        heading: "BOS vs. CHoCH",
        left: { label: "BOS — continuation", verdict: "bull", points: [10, 14, 12, 18, 16, 22], note: "Price closes beyond a prior swing in the direction of the prevailing trend." },
        right: { label: "CHoCH — possible reversal", verdict: "warn", points: [22, 18, 20, 14, 16, 10], note: "Price closes beyond a prior swing against the prevailing trend — the first evidence, not a confirmed reversal." },
      },
    },
    {
      type: "callout",
      callout: { tone: "warn", heading: "Invalidation / what this is not", body: "A single BOS or CHoCH on a low timeframe is not a trade signal. Without higher-timeframe context and a liquidity event, it is just noise. Confirmation requires a candle close beyond the level, not a wick." },
    },
    {
      type: "flowChart",
      heading: "What happened, step by step",
      steps: [
        { label: "Bullish structure intact", body: "Five swings of HH, HL, HH, HL, HH — bullish structure held throughout." },
        { label: "CHoCH", body: "After the final HH, price pulled back and closed below the prior HL — the first evidence the uptrend may be ending." },
        { label: "New bearish structure confirms", body: "Price then printed a lower high and broke the recent swing low (BOS) — confirming the new bearish structure." },
        { label: "Still not a trigger", body: "A single CHoCH is a flag to start watching location and reaction — not a trade signal by itself." },
      ],
    },
    {
      type: "callout",
      callout: { tone: "bull", heading: "Practice drill", body: "Pull up 10 different charts, one consistent timeframe. Manually mark swing highs/lows with no indicators, label each leg HH/HL/LH/LL, and circle every BOS and CHoCH. Start with a 60-second limit per chart — speed comes only after the rules produce consistent labels." },
    },
  ],
  2: [
    { type: "paragraph", text: "Liquidity is shorthand for locations where stop orders, breakout orders or resting interest may cluster — such as obvious prior highs and lows. A candle chart doesn't show those orders directly, so mark the location as a hypothesis and judge only the reaction that becomes visible afterward." },
    {
      type: "dataTable",
      table: {
        headers: ["Type", "What it is", "Typical location"],
        rows: [
          ["Equal Highs (EQH)", "Two or more nearly identical swing highs", "Above recent range"],
          ["Equal Lows (EQL)", "Two or more nearly identical swing lows", "Below recent range"],
          ["Old High / Old Low", "Previous significant swing not yet revisited", "Major swing points"],
          ["External Liquidity", "Stops outside the current dealing range", "Beyond range high/low"],
          ["Internal Liquidity", "Stops inside the dealing range", "Within the range"],
          ["Inducement", "A minor pool that draws traders before the real pool is taken", "Just before true external liquidity"],
        ],
      },
    },
    { type: "chart" },
    {
      type: "flowChart",
      heading: "Genuine-sweep diagnostic",
      steps: [
        { label: "Sharp poke?", body: "Through the level in a single candle, not a slow grind." },
        { label: "Immediate rejection?", body: "The next candle closes back inside the prior range." },
        { label: "Killzone timing?", body: "Occurred inside a known session window (Module 8)." },
        { label: "Leaves imbalance?", body: "A visible FVG formed on the rejection leg." },
      ],
    },
    {
      type: "callout",
      callout: { tone: "warn", heading: "If it fails the diagnostic", body: "A slow grind above a high and a slow grind back is exploration, not a confirmed sweep. Entering short on this kind of \"sweep\" is exactly what the diagnostic filters out." },
    },
    {
      type: "callout",
      callout: { tone: "liq", heading: "Practical rule", body: "Prefer external liquidity as the higher-timeframe target. Internal liquidity is frequently taken on the journey. After a confirmed external sweep + displacement, look for entries in the new direction." },
    },
    {
      type: "callout",
      callout: { tone: "bull", heading: "Practice drill", body: "Mark every obvious external liquidity pool on 5 of your own charts, then find 5 real examples of a genuine sweep versus 5 examples of a slow drift that only looked like a sweep in hindsight." },
    },
  ],
  3: [
    { type: "paragraph", text: "Displacement is the aggressive, impulsive delivery of price that reveals a shift in control. It's the mechanism that creates order blocks and fair value gaps — an order block is the last opposing candle before such a displacement; a fair value gap is the 3-candle imbalance the displacement often leaves behind." },
    {
      type: "conceptCards",
      concepts: [
        { plain: "What it looks like", term: "Large bodies, little overlap", body: "Large-bodied candles (or a tight sequence) with minimal overlap between them." },
        { plain: "When it happens", term: "After a sweep", body: "Displacement frequently occurs immediately after a liquidity sweep." },
        { plain: "What it leaves", term: "Inefficiency", body: "Leaves behind an FVG / imbalance and a clear last opposing candle." },
      ],
    },
    { type: "chart" },
    {
      type: "dataTable",
      table: {
        headers: ["Concept", "Definition", "Implication"],
        rows: [
          ["Fair Value Gap (FVG)", "3-candle imbalance between candle 1 and candle 3", "Common rebalance target; often only partially filled"],
          ["Liquidity Void", "Larger multi-candle or extreme one-sided delivery", "Price may travel far before any rebalance"],
          ["Balanced Price Range (BPR)", "Overlapping opposing imbalances", "Neither side has a clear edge; lower edge for new entries"],
        ],
      },
    },
    {
      type: "callout",
      callout: { tone: "warn", heading: "Invalidation / what this is not", body: "Not every large candle is institutional displacement. Context — a preceding liquidity event plus a clean imbalance left behind — matters more than candle size alone." },
    },
    {
      type: "flowChart",
      heading: "Why a displacement move qualifies",
      steps: [
        { label: "Size", body: "Roughly 3× the bodies of the pre-sweep candles — anomalous relative to recent context." },
        { label: "Overlap", body: "Minimal. Each candle closes near its high and the next opens higher — efficient, one-directional delivery." },
        { label: "Context", body: "It followed a confirmed sweep. Stops were taken first, then the move began." },
      ],
    },
    {
      type: "callout",
      callout: { tone: "bull", heading: "Practice drill", body: "On 5 historical impulsive moves, mark the displacement leg, the FVG it left behind, and any liquidity void or BPR. Note the size of each displacement candle relative to the 10 candles before it." },
    },
  ],
  4: [
    {
      type: "flowChart",
      heading: "Valid order block — three criteria",
      steps: [
        { label: "Opposing close", body: "The candle closes in the opposite direction of the impending displacement." },
        { label: "Immediately before", body: "It is the immediate candle preceding the displacement leg." },
        { label: "Leaves imbalance", body: "The displacement leaves a visible unfilled imbalance / FVG." },
      ],
    },
    {
      type: "callout",
      callout: { tone: "warn", heading: "Common error", body: "Marking every prior swing candle as an \"order block.\" Without the displacement + imbalance footprint, it's simply a previous swing area — lower quality." },
    },
    { type: "chart" },
    {
      type: "dataTable",
      table: {
        headers: ["Block type", "Formation sequence", "What it means"],
        rows: [
          ["Order Block", "Last opposing candle → displacement leaves imbalance", "Zone of potential unfilled orders"],
          ["Breaker Block", "OB forms → closes through → retraces → acts with opposite polarity", "Failed prior order, now support/resistance the other way"],
          ["Mitigation Block", "Price returns and fills orders without a decisive close through", "Partial or full fill; may still hold or later become a breaker"],
        ],
      },
    },
    {
      type: "dataTable",
      table: {
        headers: ["Stage", "What price does", "Zone status"],
        rows: [
          ["1. Formation", "Last down-close candle before strong upward displacement leaving an imbalance", "Valid bullish OB"],
          ["2a. Respected", "Price returns, wicks into the zone, never closes below its low", "Still relevant — mitigation"],
          ["2b. Violated", "Price returns and closes decisively below the zone's low", "Invalidated"],
          ["3a. Never revisited", "Price moves away and never trades back to the zone", "Broken OB — not a breaker"],
          ["3b. Revisited & flips", "Price returns to the zone and it now rejects as resistance", "Breaker"],
        ],
      },
    },
    {
      type: "callout",
      callout: { tone: "warn", heading: "The distinction that prevents the most common mislabel", body: "Stage 3a and 3b start from the identical situation — a violated OB. Only the return and the polarity flip make it a breaker. If price never comes back, it stays a broken OB permanently, no matter how clean the original zone looked." },
    },
    {
      type: "callout",
      callout: { tone: "liq", heading: "First-touch rule", body: "As a working convention (not an empirically derived law): the first return to a fresh OB or FVG after the displacement that created it is often treated as the highest-quality opportunity. Each later touch is assumed to degrade the remaining unfilled orders — by the third or fourth touch the level is often considered spent." },
    },
    {
      type: "callout",
      callout: { tone: "bull", heading: "Practice drill", body: "On 5 charts, find one Order Block, one Breaker, and one Mitigation Block. For each, write one sentence on what happened to price before the zone existed and one on its invalidation condition." },
    },
  ],
  5: [
    { type: "paragraph", text: "A Fair Value Gap is a three-candle imbalance in which the wick extremes of Candle 1 and Candle 3 don't overlap, leaving an untraded price interval — interpreted as an area of inefficient price delivery." },
    {
      type: "conceptCards",
      concepts: [
        { plain: "Gap up", term: "Bullish FVG", body: "C1 high < C3 low." },
        { plain: "Gap down", term: "Bearish FVG", body: "C1 low > C3 high." },
        { plain: "The move that creates it", term: "C2", body: "The displacement candle that creates the imbalance." },
      ],
    },
    { type: "chart" },
    {
      type: "dataTable",
      table: {
        headers: ["FVG", "What happened", "What it means for entries"],
        rows: [
          ["1 — Full fill", "Price traded back through the entire gap, closing it completely", "The imbalance is spent — stop treating it as fresh"],
          ["2 — Partial fill to CE", "Price reached the 50% level, reacted there, reversed", "The most common outcome, especially on higher timeframes"],
          ["3 — Inversion", "Price closed fully through in the opposite direction; the zone later acted as support from the other side", "Supporting evidence delivery has shifted — not a standalone trigger"],
        ],
      },
    },
    {
      type: "callout",
      callout: { tone: "liq", heading: "Practical hierarchy", body: "Prefer FVGs that sit inside a higher-timeframe order block or OTE zone and that form after a clear liquidity sweep. Isolated low-timeframe FVGs have lower edge." },
    },
    {
      type: "callout",
      callout: { tone: "warn", heading: "Invalidation / what this is not", body: "An FVG that has been fully filled multiple times is usually spent. Do not keep treating it as fresh imbalance. Same first-touch convention as order blocks applies." },
    },
    {
      type: "callout",
      callout: { tone: "bull", heading: "Practice drill", body: "On 5 historical FVGs, track forward: full fill, partial fill/CE, or no fill. Note which timeframe each was on — build a real sense of the base rate from your own sample, instead of assuming every FVG must fill." },
    },
  ],
};

function comingSoonBlocks(number: number): VisualBlock[] {
  return [
    {
      type: "callout",
      callout: {
        tone: "liq",
        heading: "Not yet ported",
        body: `Module ${number} exists in the legacy course but hasn't been rebuilt with the interactive chart/diagram treatment yet. It's next in the queue — check back soon, or ask for it to be prioritized.`,
      },
    },
  ];
}

export const depthModules: DepthModule[] = Array.from({ length: 44 }, (_, i) => i + 1).map((number) => {
  const status: DepthModule["status"] = readyBlocks[number] ? "ready" : "coming-soon";
  return {
    slug: `m${number}`,
    number,
    phase: phaseOf(number),
    title: titles[number],
    status,
    hasChart: status === "ready" && number <= 5,
    blocks: status === "ready" ? readyBlocks[number] : comingSoonBlocks(number),
  };
});

export function getDepthModule(slug: string): DepthModule | undefined {
  return depthModules.find((m) => m.slug === slug);
}
