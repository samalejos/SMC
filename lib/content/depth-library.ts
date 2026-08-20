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
  { stageSlug: "before-stage-1", stageLabel: "Before Stage 1 · Understand the screen", moduleNumbers: [9] },
  { stageSlug: "stage-1", stageLabel: "Stage 1 · See the chart", moduleNumbers: [1] },
  { stageSlug: "stage-2", stageLabel: "Stage 2 · Read direction", moduleNumbers: [1, 6] },
  { stageSlug: "stage-3", stageLabel: "Stage 3 · Find location", moduleNumbers: [2, 7] },
  { stageSlug: "stage-4", stageLabel: "Stage 4 · Judge reaction", moduleNumbers: [3, 4, 5] },
  { stageSlug: "stage-5", stageLabel: "Stage 5 · Make a decision", moduleNumbers: [9, 10] },
  { stageSlug: "apply", stageLabel: "Apply it · Guided walkthrough", moduleNumbers: [8, 10] },
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
      callout: {
        tone: "liq",
        heading: "Size alone isn't a measurement — efficiency is",
        body: "A candle's range tells you how far price traveled. It doesn't tell you whether that travel was directional. Two numbers fix that: efficiency = |close − open| ÷ (high − low) — how much of the range became a real body versus wick — and wick ratio = (upper wick + lower wick) ÷ (high − low) — how much of the range was rejected on both sides. A candle can have a huge range and still fail as displacement if the wicks ate most of it.",
      },
    },
    {
      type: "meterBar",
      spec: {
        heading: "Example: a real displacement candle",
        intro: "Range 30, body 26. Efficiency = 26 ÷ 30.",
        valuePct: 87,
        thresholdPct: 60,
        valueLabel: "87% efficient",
        passLabel: "directional",
        failLabel: "not directional",
        verdict: "pass",
      },
    },
    {
      type: "meterBar",
      spec: {
        heading: "Example: same range, two-way churn",
        intro: "Range 30, body only 4 — the rest is wick on both sides. Efficiency = 4 ÷ 30.",
        valuePct: 13,
        thresholdPct: 60,
        valueLabel: "13% efficient",
        passLabel: "directional",
        failLabel: "not directional — this is churn, not displacement",
        verdict: "fail",
      },
    },
    {
      type: "regimeGrid",
      spec: {
        heading: "Volatility and efficiency are two separate questions",
        intro: "\"How big was the candle\" and \"was it directional\" are different axes. Only one quadrant is displacement.",
        highlightRow: "high",
        highlightCol: "low",
        highlightNote: "The 13%-efficiency example above lands here: high volatility, low efficiency — two-way churn, not displacement, no matter how large the range looks.",
      },
    },
    {
      type: "callout",
      callout: {
        tone: "warn",
        heading: "Measure against the session, not one blended ATR",
        body: "A single rolling ATR computed across Asia, London and NY blends three different volatility regimes into one number — so a real Asia-session move can fail a NY-calibrated threshold, and NY noise can pass an Asia-calibrated one. Same displacement formula, same efficiency cutoff: just measure the ATR baseline within the current session, not across all three. A 9-point body against a quiet Asia baseline and a 20-point body against an active NY baseline can both be genuinely large — check each against its own session, not one shared number.",
      },
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
      type: "callout",
      callout: {
        tone: "liq",
        heading: "What the chart actually gives you, versus the theory on top of it",
        body: "A candle chart cannot prove a resting order exists or who placed it — that's already established. An Order Block is, mechanically, a price zone defined from the last opposing candle before qualifying displacement, monitored for a later reaction. SMC theory interprets that zone as potentially associated with unfinished institutional activity. That interpretation is not verifiable from candles alone; the zone definition and the reaction you trade are.",
      },
    },
    {
      type: "dataTable",
      table: {
        headers: ["Block type", "Formation sequence", "What the chart gives you"],
        rows: [
          ["Order Block", "Last opposing candle → displacement leaves imbalance", "A defined price zone, monitored for a later reaction"],
          ["Breaker Block", "OB forms → closes through → retraces → acts with opposite polarity", "The same zone, now monitored for the opposite reaction"],
          ["Mitigation Block", "Price returns and fills orders without a decisive close through", "Partial or full reaction inside the zone without invalidation"],
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
          ["2 — Partial fill to CE", "Price reached the 50% level, reacted there, reversed", "CE is the reference point this curriculum monitors first — whether price preferentially reacts there is an empirical question, testable per instrument, timeframe and regime, not an assumed rule"],
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
  6: [
    {
      type: "callout",
      callout: {
        tone: "liq",
        heading: "System convention, not a market law",
        body: "For this curriculum's execution model, higher-timeframe structure and points of interest govern candidate direction — counter-HTF trades are outside the model. That's a stated operating rule for how this engine trades, not a claim about how markets universally work. Most live trading errors inside this system come from ignoring that rule, which is a different thing from the rule being objectively true of all markets.",
      },
    },
    {
      type: "flowChart",
      heading: "Nesting rules (HTF → ITF → LTF)",
      steps: [
        { label: "Establish HTF bias first", body: "Daily / 4H structure + nearest external liquidity + key OB/FVG." },
        { label: "LTF entries must align", body: "Only look for LTF entries (15m / 5m / 2m) that align with that HTF bias." },
        { label: "HTF creates the narrative", body: "HTF displacement + liquidity sweep creates the narrative; LTF provides the refined entry." },
        { label: "A counter-trend LTF CHoCH is usually a trap", body: "Until the HTF itself shows a liquidity event and displacement, treat it as corrective, not a reversal signal." },
      ],
    },
    { type: "chart" },
    {
      type: "dataTable",
      table: {
        headers: ["Timeframe", "Question it answers", "Reading"],
        rows: [
          ["Daily", "Direction and DOL?", "HH/HL intact, sell-side already swept. Bias bullish. DOL = buy-side external at 21,600."],
          ["4H", "Where is the POI?", "Sweep of a minor low, displacement higher. OB 21,380–21,400, FVG 21,410–21,440."],
          ["15m", "Is price returning to it?", "Retracement underway into 21,390–21,410 — inside the 4H OB."],
          ["5m", "Is the reaction real?", "CHoCH higher off the zone; 2m confirms inside it."],
        ],
      },
    },
    {
      type: "callout",
      callout: { tone: "liq", heading: "Resulting trade", body: "Entry 21,395, stop 21,340 below the swept low — 55 points. floor(400 ÷ (55 × 2)) = 3 contracts, $330 actual risk. TP1 21,505 (2R), TP2 21,600 (the DOL)." },
    },
    {
      type: "callout",
      callout: { tone: "warn", heading: "What would have invalidated this", body: "If the 15m had printed a CHoCH lower while the Daily was still bullish, that's corrective noise, not a reversal — skip it, don't flip bias. Bias only flips when the higher timeframe itself changes after its own liquidity event." },
    },
    {
      type: "callout",
      callout: { tone: "bull", heading: "Practice drill", body: "For 10 of your own past screenshots, write one sentence per timeframe (Daily, 4H, 15m, LTF) describing structure and state whether the lower timeframe agreed with or contradicted the higher timeframe." },
    },
  ],
  7: [
    {
      type: "callout",
      callout: { tone: "warn", heading: "Hard rule", body: "Draw Fibonacci only on a displacement leg that broke structure. Random swings produce random OTE zones." },
    },
    {
      type: "conceptCards",
      concepts: [
        { plain: "Below the 50% equilibrium", term: "Discount", body: "Favorable for longs.", glyph: "down" },
        { plain: "Above the 50% equilibrium", term: "Premium", body: "Favorable for shorts.", glyph: "up" },
      ],
    },
    { type: "chart" },
    {
      type: "dataTable",
      table: {
        headers: ["Level", "Price", "Role"],
        rows: [
          ["0% (leg high)", "21,450", "Displacement high"],
          ["50% (equilibrium)", "21,315", "Premium above / discount below"],
          ["62%", "21,282.6", "OTE upper bound"],
          ["79%", "21,236.7", "OTE lower bound"],
          ["100% (leg low)", "21,180", "The swept low"],
        ],
      },
    },
    {
      type: "callout",
      callout: { tone: "bull", heading: "Confluence model", body: "OTE zone + HTF order block or FVG + liquidity already swept on the opposite side = primary entry model." },
    },
    { type: "paragraph", text: "After displacement, price often produces a shallow first pullback, then a deeper second retracement. The deeper second entry is often treated as higher quality — cleaner structure, better-defined invalidation — but this is a heuristic, not a requirement. A first valid retracement with clear rejection and immediate continuation can still be taken." },
    {
      type: "callout",
      callout: {
        tone: "warn",
        heading: "This is not the same axis as Module 4's first-touch rule",
        body: "Module 4 says the first touch of a given zone is often the highest-quality visit to that zone, and each later touch of the same zone degrades it. This module says a deeper second pullback within one displacement leg can be the higher-quality retracement. Those describe different things: touch count is about how many times price has already revisited one specific zone; pullback depth is about which retracement, within a single leg, reaches which zone. A first-touch entry at a deep OTE zone and a \"second pullback\" entry can be the exact same trade — they're only in tension if you conflate \"first\" and \"shallow.\" A second touch of an already-spent zone is not automatically better just because it's the second pullback of the leg.",
      },
    },
    {
      type: "callout",
      callout: { tone: "warn", heading: "The error this demonstration prevents", body: "Drawing Fib on a swing that didn't break structure produces an OTE band that means nothing. And OTE alone is not a setup — price can travel straight through 62–79% when no HTF POI sits inside it." },
    },
    {
      type: "callout",
      callout: { tone: "bull", heading: "Practice drill", body: "Draw Fibonacci retracements on 10 completed displacement legs (not random swings). Note whether the actual reaction happened nearer 62%, 70%, or 79%, and whether OTE alone would have been enough without other confluence." },
    },
  ],
  8: [
    {
      type: "callout",
      callout: { tone: "liq", heading: "Two questions before any LTF setup", body: "What is my directional bias for the session, and why? Where is my primary Draw on Liquidity hypothesis — and what would invalidate it? Bias and DOL are filters and working hypotheses, not predictions. If bias is unclear, the correct decision is often no trade." },
    },
    {
      type: "conceptCards",
      concepts: [
        { plain: "Observed: range-bound, compressing", term: "Accumulation (traditional label)", body: "Often Asia / early London. What's actually observable is compression — the label names a presumed cause, not a proven one." },
        { plain: "Observed: a sharp excursion beyond the range", term: "Manipulation (traditional label)", body: "Often into a killzone. What's observable is a liquidity excursion — whether it was \"manipulation\" in intent can't be verified from candles." },
        { plain: "Observed: sustained directional move", term: "Distribution (traditional label)", body: "After the excursion. What's observable is directional expansion — the traditional SMC name for this phase, not a claim about who caused it." },
      ],
    },
    {
      type: "callout",
      callout: { tone: "warn", heading: "AMD is a lens, not a law", body: "The reliable part is the observed sequence: compression → liquidity excursion → directional expansion. \"Accumulation/Manipulation/Distribution\" are this curriculum's traditional names for that sequence, not evidence of a single actor executing a plan. Many days skip accumulation entirely and open with immediate displacement. Others reverse after the \"distribution\" leg. Use AMD only to contextualize what has already happened — never to forecast the next phase." },
    },
    {
      type: "dataTable",
      table: {
        headers: ["Session", "Typical role (traditional convention)", "What that means for you"],
        rows: [
          ["Asia", "Builds the range — constructs the liquidity London and NY later use", "Treat Asia highs/lows as pools being built, not yet a directional signal"],
          ["London", "Expands / sweeps — attacks the range Asia built, ahead of NY", "Watch specifically for Asia's extremes getting taken here"],
          ["New York", "Distributes — inherits Asia's range and London's expansion, carries it further", "Highest volume and displacement reliability of the three"],
        ],
      },
    },
    {
      type: "callout",
      callout: {
        tone: "warn",
        heading: "Stated plainly, not softened into mush",
        body: "This is real, observable behavior, not a hedge-everything disclaimer: Asia genuinely trades quieter and range-bound more often than not, London genuinely produces the first real expansion more often than not, NY genuinely carries the most reliable displacement of the three. What's not proven is the causal story of why — institutional intent behind it isn't verifiable from candles. Trade the pattern; don't need the myth behind it.",
      },
    },
    {
      type: "dataTable",
      table: {
        headers: ["Killzone", "Logic window", "System convention (not a backtested claim)"],
        rows: [
          ["Asia", "Roughly the Asian session range-building period", "Treated as accumulation / range"],
          ["London Open KZ", "~2-hour window bracketing the London open", "Often the first excursion or expansion"],
          ["NY AM KZ", "~First 2–3 hours after New York open", "This curriculum's convention treats it as the most active continuation window — verify against your own logged sessions rather than assuming"],
          ["London Close", "Window around London cash close", "Profit-taking / possible reversal"],
          ["NY PM", "Later New York session", "Lower volume; continuation or mean-reversion"],
        ],
      },
    },
    {
      type: "dataTable",
      table: {
        headers: ["IB interaction", "What it looks like", "Read"],
        rows: [
          ["Stays inside IB", "Price oscillates within the first-hour range, no decisive break", "Range day — favor mean-reversion and breaker logic"],
          ["Breaks and holds", "Displacement through the IB high/low that doesn't reclaim", "Trend day — favor continuation tools in the breakout direction"],
          ["Sweeps and rejects", "Pokes beyond the IB extreme, closes back inside within 1–2 candles", "The IB extreme was swept — treat as a liquidity event"],
        ],
      },
    },
    {
      type: "dataTable",
      table: {
        caption: "\"Sweeps and rejects\" isn't one outcome — once price actually excurses beyond the IB, three different things happen, and they need three different reads.",
        headers: ["Excursion outcome", "What it looks like", "Read"],
        rows: [
          ["Rejection", "Price pokes beyond the IB extreme and reverses back through it within 1–2 candles — a clean wick, no acceptance outside", "The excursion was the move. Look to fade it, back toward the opposite side of the IB or beyond"],
          ["Acceptance", "Price breaks the IB extreme and closes beyond it, then holds — no reclaim on the following candles", "This is what \"breaks and holds\" above actually means in practice. Favor continuation in the breakout direction"],
          ["Failed break", "Price pushes beyond the IB extreme, drifts out there for several candles without real displacement, then slowly reclaims — not a sharp rejection, not acceptance either", "The excursion didn't commit either way. This is the hardest of the three to trade — wait for the next decisive move instead of forcing a read on it"],
        ],
      },
    },
    {
      type: "callout",
      callout: {
        tone: "liq",
        heading: "Two Initial Balances, two jobs",
        body: "Run the IB on two timeframes, not one, and don't let them compete: the 1-hour IB sets context — the same higher-timeframe-governs role structure plays in Module 6 — while the 15-minute IB is where a specific, mechanical entry actually fires. The 1H IB answers \"what kind of day is this.\" The 15m IB answers \"where exactly do I get in.\" Neither substitutes for the other.",
      },
    },
    {
      type: "callout",
      callout: {
        tone: "liq",
        heading: "When the two IBs disagree, the 1H wins",
        body: "If the 1H IB reads range day (price staying inside it) but the 15m prints a break-and-hold, that's not a coin flip — it's the same HTF-governs-LTF rule from Module 6 applied here. Treat a 15m break inside a 1H range-day context as a trap until the 1H itself breaks, not as an independent signal to act on. This is also an adapted use of the term: the Initial Balance originates from Steidlmayer's Market Profile / Auction Market Theory, defined specifically on the RTH open. Applying it to killzone opens generally (Asia, London, NY) is this curriculum's convention, not the original definition.",
      },
    },
    {
      type: "flowChart",
      heading: "The 15m IB break-and-retest entry",
      steps: [
        { label: "1H IB sets the context", body: "The 1-hour Initial Balance frames the session before any 15m decision is made." },
        { label: "15m closes beyond the IB", body: "A completed 15-minute candle close beyond the IB boundary — not a wick. This is the break, and on its own it is not the entry." },
        { label: "Price reclaims and retests the IB", body: "Price returns and touches the IB boundary again from the other side. The entry is built on this retest, not the original break." },
        { label: "Entry triggers on the retest holding", body: "The retest holds — price doesn't re-break through the excursion extreme. That holding is the trigger, at the IB boundary itself." },
        { label: "Stop beyond the excursion extreme", body: "The stop goes beyond the lowest low (or highest high) of the entire excursion — not just a few ticks beyond entry. This protects against that exact extreme being swept again." },
      ],
    },
    { type: "chart" },
    {
      type: "callout",
      callout: {
        tone: "warn",
        heading: "Why the stop sits at the excursion extreme, not near entry",
        body: "A tight stop just beyond entry gets run by the same kind of noise that produced the retest in the first place — the whole point of waiting for the retest instead of entering on the break is to get a cleaner risk-reward, and that only holds if the stop actually protects the level that was already proven capable of being swept once.",
      },
    },
    {
      type: "callout",
      callout: {
        tone: "warn",
        heading: "What the wide stop costs you — do the math, don't feel it",
        body: "A wider stop doesn't just compress R:R, it shrinks position size at a fixed dollar risk. MNQ, $2/point, $400 cap: an 80-point excursion stop → floor(400 ÷ 160) = 2 contracts. A 40-point stop → floor(400 ÷ 80) = 5 contracts. To make the same dollar profit on the wide-stop trade as the tight-stop one, the target has to be proportionally further away, not just the same point count — and if it isn't, you need a materially higher win rate to break even, since breakeven win rate = 1 ÷ (1 + Average R) from Module 9. Check that math before taking the setup, not after.",
      },
    },
    {
      type: "callout",
      callout: { tone: "warn", heading: "SMT divergence — supporting context, never a standalone signal", body: "When correlated instruments disagree at a key level (e.g. NQ makes a new high, ES fails to), the instrument that confirms is the relative-strength leader — favor it for continuation, treat the lagging one with extra caution. Still needs a real liquidity event and displacement on the instrument being traded. NQ and ES aren't the same asset with minor variance: NQ is concentrated in mega-cap tech and more rate-sensitive, ES is a broader basket including financials and energy. A lot of what looks like divergence is sector rotation or Treasury-yield sensitivity, not a liquidity event — check whether the divergence survives on a day without a mega-cap earnings print or a yield move before trusting it." },
    },
    {
      type: "callout",
      callout: { tone: "warn", heading: "News filter and session-clock drift", body: "High-impact releases (FOMC, NFP, CPI) can override technical structure. Stay flat through the release or wait for post-news displacement and newly formed liquidity pools. Separately: London and New York shift into daylight saving on different dates each spring and fall, so a fixed killzone clock silently drifts by an hour for two to three weeks each transition — verify current session times against your platform rather than assuming last month's clock still applies." },
    },
    {
      type: "callout",
      callout: {
        tone: "liq",
        heading: "The thesis this module is built on",
        body: "Everything above is one idea wearing different clothes: the same pattern reads differently depending on the session it happens in, because it isn't a different pattern — it's the same mechanic meeting a different liquidity and volatility backdrop. A break-and-hold in Asia's thin range and a break-and-hold in NY's volume are the same IB interaction with different confidence behind them, not two different setups. Session context doesn't change what a pattern is. It changes how much you should trust it.",
      },
    },
    {
      type: "callout",
      callout: { tone: "bull", heading: "Practice drill", body: "Track Asia/London/NY killzone highs and lows for one full week. Classify each day trend-day or range-day using the IB break/hold/reject test rather than a general impression." },
    },
  ],
  9: [
    {
      type: "callout",
      callout: { tone: "liq", heading: "floor(), always", body: "Position sizing always rounds down, never standard rounding — floor(3.9) = 3, never 4. Rounding up on a risk calculation means risking more than the stated cap." },
    },
    {
      type: "dataTable",
      table: {
        headers: ["Formula", "Definition"],
        rows: [
          ["Stop distance", "|Entry − Stop|, always positive"],
          ["Position size (contracts)", "floor( Max $ risk ÷ (Stop distance in points × $ per point) )"],
          ["R-multiple", "|Exit − Entry| ÷ |Entry − Stop|"],
          ["Expectancy (per trade)", "(Win% × Avg Win R) − (Loss% × Avg Loss R)"],
          ["Breakeven win rate", "1 ÷ (1 + Average R) — e.g. at 2R you need ~33.3%"],
        ],
      },
    },
    {
      type: "stackFit",
      spec: {
        heading: "Worked example: 55-point stop, $400 risk, MNQ ($2/pt)",
        intro: "$110 planned loss per contract. floor(400 ÷ 110) = 3 contracts fit; a 4th would exceed the cap.",
        budget: 400,
        unit: 110,
        fits: 3,
        budgetLabel: "$400",
        unitLabel: "$110",
      },
    },
    {
      type: "dataTable",
      table: {
        headers: ["Win rate", "Avg Win", "Avg Loss", "Expectancy"],
        rows: [
          ["55%", "1.5R", "1.0R", "+0.375R"],
          ["45%", "2.2R", "1.0R", "+0.44R"],
          ["40%", "2.0R", "1.0R", "+0.20R"],
          ["35%", "2.0R", "1.0R", "+0.05R"],
          ["30%", "2.5R", "1.0R", "+0.05R"],
          ["30%", "2.0R", "1.0R", "−0.10R (losing)"],
        ],
      },
    },
    { type: "paragraph", text: "The math is conditional — it does not imply you will achieve any particular win rate. Transaction costs and slippage reduce realized expectancy further, especially on small R targets. Most discretionary traders do not start at 45–50% win rate on a new model; size risk so a string of losses is survivable while you gather a meaningful sample." },
    {
      type: "callout",
      callout: { tone: "warn", heading: "Worked profile numbers — not learner defaults", body: "Dollar figures in this module belong to a worked Account Profile and exist to make the arithmetic inspectable. Each learner must define a separate maximum-risk variable from personal circumstances and independently verified account rules." },
    },
    {
      type: "conceptCards",
      concepts: [
        { plain: "Never increase for conviction or urgency", term: "Fixed maximum", body: "Use the maximum declared in the Account Profile — a validation block locks that variable for the sample." },
        { plain: "Against revenge trading", term: "Two-loss circuit breaker", body: "After two full losses in a session, stop trading for the remainder of that session." },
        { plain: "Per account you run", term: "Track drawdown from peak", body: "Multiple accounts = multiple scoreboards." },
        { plain: "Only tighten, never widen", term: "Stop discipline", body: "Never move a stop further away after entry. Only tighten or move to breakeven per plan." },
      ],
    },
    {
      type: "callout",
      callout: { tone: "bull", heading: "Practice drill", body: "For 10 hypothetical MNQ setups (vary stop distance), manually calculate stop distance, dollar risk, and max contract size. Write down the exact decimal before rounding down, so the temptation to round up becomes visible and resistible." },
    },
  ],
  10: [
    { type: "paragraph", text: "All previous modules converge here. A pattern is not a trade. Only a pattern that survives the full checklist becomes a candidate." },
    {
      type: "flowChart",
      heading: "6-step execution checklist",
      steps: [
        { label: "Daily bias & DOL", body: "Clear directional bias from HTF structure + nearest external liquidity. If bias is unclear → no trade." },
        { label: "Liquidity event", body: "Sweep (or inducement + external run) has occurred. Genuine-sweep diagnostic passed against quantified thresholds, not just a visual impression." },
        { label: "Displacement confirmation", body: "Strong impulsive move away from the swept liquidity, leaving OB + FVG." },
        { label: "LTF entry model", body: "Price returns into a valid first-touch OB/FVG/OTE zone on the 5m aligned with HTF bias, and a 2m CHoCH or displacement candle confirms inside that zone." },
        { label: "Risk & invalidation", body: "Stop placed beyond the structural invalidation point. Size calculated from that distance. Targets predefined." },
        { label: "Session & context filters", body: "Killzone context acceptable, no imminent high-impact news, day-type doesn't contradict the tool set being used." },
      ],
    },
    {
      type: "callout",
      callout: { tone: "liq", heading: "Decision filter", body: "If any step is missing or ambiguous → no trade. \"Almost\" setups are the ones that drain accounts." },
    },
    {
      type: "callout",
      callout: { tone: "warn", heading: "Quantified sweep diagnostic — a heuristic, not a law", body: "Price spends no more than 1–3 candles beyond the level before reversing, and the reversal closes back inside within 2 candles of the extreme. These specific numbers are structured execution conventions for consistency and checkability, not empirically validated constants." },
    },
    { type: "paragraph", text: "LTF confirmation filter: on the 5m OB/FVG zone identified by the checklist, wait for a 2-minute CHoCH or displacement candle to confirm inside that zone before entry — rather than resting a limit order at the outer edge and hoping the first touch holds. The entry timeframe stays 5m; 2m is confirmation only, not a separate search for new setups." },
    { type: "chart" },
    {
      type: "dataTable",
      table: {
        caption: "Worked Trade 1 — synthetic mechanics demonstration, not market evidence.",
        headers: ["Field", "Value"],
        rows: [
          ["Entry", "21,040 — the CE (50%) of the FVG, inside the OTE band"],
          ["Stop", "20,965 — 5 pts beyond the sweep wick, 75-point distance"],
          ["Size (MNQ, $2/pt, $400 cap)", "floor(400 ÷ (75 × 2)) = 2 contracts, $300 actual risk"],
          ["TP1", "21,190 (2.0R) — scale 40%"],
          ["TP2", "21,400 (external buy-side DOL) — ≈4.8R"],
          ["Illustrative result", "Scaled 40% at 2.0R, runner closed at 2.5R → blended +2.3R"],
        ],
      },
    },
    {
      type: "callout",
      callout: { tone: "warn", heading: "Worked Trade 3 — a process-correct loss", body: "Same checklist, same discipline, still a loss: an unmarked 4H bearish OB sat above the entry that the 15m alone never showed. Price reached +0.6R, then reversed into stop. The process was followed correctly — missing higher-timeframe context is still a real risk the checklist can't fully close, which is exactly why Module 6's HTF-first sequencing matters." },
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
    hasChart: status === "ready" && [1, 2, 3, 4, 5, 6, 7, 8, 10].includes(number),
    blocks: status === "ready" ? readyBlocks[number] : comingSoonBlocks(number),
  };
});

export function getDepthModule(slug: string): DepthModule | undefined {
  return depthModules.find((m) => m.slug === slug);
}
