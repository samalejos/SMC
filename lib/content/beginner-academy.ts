import type { Lesson } from "@/lib/content/types";

export const beginnerAcademyLessons: Lesson[] = [
  {
    slug: "before-stage-1",
    index: 0,
    stageKicker: "Before Stage 1 · Understand the screen",
    title: "Six basics the rest of the course will no longer assume",
    goal: "Understand the nouns on a futures chart before analyzing any pattern.",
    hasChart: true,
    blocks: [
      { type: "chart" },
      {
        type: "microDiagrams",
        items: [
          { kind: "instrument", title: "Instrument / contract", caption: "The symbol and contract month matter when you compare charts or data." },
          { kind: "session-clock", title: "Session / timezone", caption: "A timestamp without a timezone is incomplete, and a session label can cross the wall-clock date." },
        ],
      },
      {
        type: "callout",
        callout: {
          tone: "warn",
          heading: "Every fill has friction — even when the chart looks perfect",
          body: "Bid-ask spread, fees/commissions and slippage all reduce the result after costs. None of them show up on a clean chart.",
        },
      },
      {
        type: "flowChart",
        heading: "What to record, and when",
        steps: [
          { label: "Before a replay test", body: "Write the fee schedule and estimated entry/exit slippage used in the test. Do not silently assume zero." },
          { label: "After a simulated fill", body: "Record the actual fill price where the simulator provides it; distinguish a missed limit order from a favorable fictional fill." },
          { label: "After a real fill", body: "Replace estimates with the broker statement. Costs vary by broker and can change." },
        ],
      },
      {
        type: "callout",
        callout: {
          tone: "warn",
          heading: "Margin is not maximum loss",
          body: "Futures use leverage: a relatively small amount of capital can control much larger market exposure. Do not treat margin, evaluation balance or buying power as the amount you can safely lose. This curriculum begins in replay and simulation.",
        },
      },
      {
        type: "recallCheck",
        check: {
          id: "screen",
          prompt: "An MNQ quote moves from 20,000.00 to 20,001.00. How many index points and ticks did price move? Do not calculate profit or loss until the number of contracts is known.",
          placeholder: "State the points, ticks and missing information…",
          modelAnswer: "Price moved 1.00 index point, which equals four 0.25-point ticks. Dollar P&L still depends on position direction and the number of contracts, plus costs.",
        },
      },
    ],
    nextSlug: "stage-1",
    nextLabel: "Stage 1 · See the chart",
  },
  {
    slug: "stage-1",
    index: 1,
    stageKicker: "Stage 1 · See the chart",
    title: "A candle is a compressed record of traded prices — not an explanation of cause",
    goal: "Describe the visible chart accurately before attaching meaning to it.",
    hasChart: true,
    blocks: [
      { type: "chart" },
      {
        type: "microDiagrams",
        items: [
          { kind: "candle-anatomy", title: "Candle anatomy", caption: "Open, high, low, close. The thick part is the body; the thin lines are wicks." },
          { kind: "timeframe-compression", title: "Timeframe", caption: "A 5-minute candle summarizes five 1-minute candles. Neither timeframe is automatically \"truer.\"" },
        ],
      },
      {
        type: "truthTable",
        pair: {
          observedLabel: "Observed directly",
          observed: "Price traded below the open, recovered, and closed near the interval high.",
          interpretedLabel: "Possible interpretation",
          interpreted: "Buyers may have absorbed selling. That interpretation requires context; the candle alone cannot prove who acted.",
        },
      },
      {
        type: "recallCheck",
        check: {
          id: "stage1",
          prompt: "A candle has a long lower wick and closes near its high. Write one sentence stating only what is observable — without using “buyers,” “institutions,” “manipulation” or “smart money.”",
          placeholder: "Write the observable price sequence…",
          modelAnswer: "During this interval, price traded materially below its open, then recovered and closed near the interval high. That is observation. Any claim about who caused it is interpretation.",
        },
      },
    ],
    nextSlug: "stage-2",
    nextLabel: "Stage 2 · Read direction",
  },
  {
    slug: "stage-2",
    index: 2,
    stageKicker: "Stage 2 · Read direction",
    title: "Direction comes from a sequence of swings — not the color of the latest candle",
    goal: "Separate an upward sequence, a downward sequence and a range before learning reversal labels.",
    hasChart: true,
    blocks: [
      { type: "chart" },
      {
        type: "conceptCards",
        concepts: [
          { plain: "Progressing upward", term: "HH + HL", body: "Higher highs and higher lows describe bullish structure. A red candle inside that sequence does not automatically end it.", glyph: "up" },
          { plain: "Progressing downward", term: "LH + LL", body: "Lower highs and lower lows describe bearish structure. A green candle inside that sequence may be only a pullback.", glyph: "down" },
          { plain: "Neither side progressing", term: "Range", body: "Repeated overlap between a visible high and low means rotation. Calling every internal wiggle a trend creates false signals.", glyph: "flat" },
        ],
      },
      {
        type: "microDiagrams",
        items: [{ kind: "swing-rule", title: "Confirming a swing", caption: "At bar t, a swing isn't known until bar t+1 completes. Equal highs or lows don't pass the strict rule." }],
      },
      {
        type: "comparePanels",
        spec: {
          heading: "Same higher low, two different next moves",
          left: { label: "BOS — sequence continues", verdict: "bull", points: [10, 14, 12, 18, 16, 22], note: "Close beyond the prior swing, same direction. Confirms continuation — not that the next trade wins." },
          right: { label: "CHoCH — sequence warned", verdict: "warn", points: [22, 18, 20, 14, 16, 10], note: "Close beyond the protected swing, against direction. A warning that the sequence may be failing — not a confirmed reversal." },
        },
      },
      {
        type: "callout",
        callout: { tone: "warn", heading: "Common beginner error", body: "A CHoCH is an alert, not an entry. First ask where it happened, what level was involved, and whether the move away showed genuine strength." },
      },
      {
        type: "recallCheck",
        check: {
          id: "stage2",
          prompt: "Price prints a higher high, a higher low, another higher high, then one bearish candle that remains above the prior higher low. Has bullish structure changed?",
          placeholder: "State the structure and why…",
          modelAnswer: "No. The HH/HL sequence remains intact because price has not closed below the protected higher low. One bearish candle is a pullback, not a structural change.",
        },
      },
    ],
    nextSlug: "stage-3",
    nextLabel: "Stage 3 · Find location",
  },
  {
    slug: "stage-3",
    index: 3,
    stageKicker: "Stage 3 · Find location",
    title: "Before asking “up or down,” ask “where is price?”",
    goal: "Mark visible locations that can organize a hypothesis without pretending the chart exposes every resting order.",
    hasChart: true,
    blocks: [
      { type: "chart" },
      {
        type: "callout",
        callout: { tone: "liq", heading: "Location is a filter, not a forecast", body: "A marked high can be swept and rejected, broken and accepted, or ignored. The level tells you where to observe. The reaction tells you whether a candidate is forming." },
      },
      {
        type: "recallCheck",
        check: {
          id: "stage3",
          prompt: "Price sits in the middle of yesterday's range, far from the marked high and low, with no clear Point of Interest. What is the correct location assessment?",
          placeholder: "Name what is missing…",
          modelAnswer: "Location is poor or undefined. The learner should wait for price to approach a meaningful boundary or qualified zone rather than manufacture a setup in the middle of the range.",
        },
      },
    ],
    nextSlug: "stage-4",
    nextLabel: "Stage 4 · Judge reaction",
  },
  {
    slug: "stage-4",
    index: 4,
    stageKicker: "Stage 4 · Judge reaction",
    title: "A wick through a level is not enough; classify what happened after the interaction",
    goal: "Distinguish rejection, acceptance and unresolved noise.",
    hasChart: true,
    blocks: [
      { type: "chart" },
      {
        type: "comparePanels",
        spec: {
          heading: "Same first breach, two possible branches",
          left: { label: "Rejection stands", verdict: "bull", points: [14, 10, 8, 13, 18, 22], note: "Prompt reclaim, then displacement away. The sweep hypothesis gets stronger." },
          right: { label: "Acceptance forms", verdict: "bear", points: [14, 10, 8, 9, 6, 3], note: "No reclaim — price keeps trading below and continues. The reversal candidate is rejected." },
        },
      },
      {
        type: "meterBar",
        spec: {
          heading: "Is this candle strict displacement?",
          intro: "TR ≥ 1.5× ATR(14) and body ÷ TR ≥ 60%, measured on the actual candle from the chart above.",
          valuePct: 70,
          thresholdPct: 60,
          valueLabel: "body 70% of range",
          passLabel: "passes",
          failLabel: "fails",
          verdict: "pass",
        },
      },
      {
        type: "truthTable",
        pair: {
          observedLabel: "Candidate reaction",
          observed: "Level breached briefly → price reclaimed → displacement closed away → structure changed → retracement held.",
          interpretedLabel: "Still not a guarantee",
          interpreted: "The sequence qualifies a scenario under this curriculum. It does not prove manipulation, institutional intent or positive expectancy.",
        },
      },
      {
        type: "recallCheck",
        check: {
          id: "stage4",
          prompt: "Price pokes above equal highs, then prints six small overlapping candles around the same level. There is no reclaim with displacement. Is this a qualified bearish sweep?",
          placeholder: "Classify the reaction…",
          modelAnswer: "No. The interaction is unresolved or may be acceptance. A wick alone does not qualify the bearish sweep; the required reclaim and displacement are missing.",
        },
      },
    ],
    nextSlug: "stage-5",
    nextLabel: "Stage 5 · Make a decision",
  },
  {
    slug: "stage-5",
    index: 5,
    stageKicker: "Stage 5 · Make and test a decision",
    title: "A setup is a conditional plan with a failure point — not a prediction",
    goal: "Convert the prior four stages into a candidate, reject incomplete candidates, and practice before using capital.",
    hasChart: true,
    blocks: [
      { type: "chart" },
      {
        type: "conceptCards",
        concepts: [{ plain: "The loss planned if invalidation is reached", term: "1R", body: "R is a normalized unit of planned risk. A +2R outcome means twice the planned risk was gained; −1R means the planned risk was lost, before cost adjustments." }],
      },
      {
        type: "stackFit",
        spec: {
          heading: "How many contracts fit the risk limit",
          intro: "M = 60 max planned loss, D = 8 points, V = $2/point, all-in friction F = 3 → $19 planned loss per contract. Always round down.",
          budget: 60,
          unit: 19,
          fits: 3,
          budgetLabel: "$60",
          unitLabel: "$19",
        },
      },
      {
        type: "flowChart",
        heading: "The six-step decision gate",
        steps: [
          { label: "State the environment", body: "Trend, range, high volatility, event risk or unknown. “Unknown” is valid; pretending is not." },
          { label: "Name direction and DOL", body: "What sequence is visible, and which exact level is the hypothesis targeting?" },
          { label: "Name the required location", body: "Which liquidity pool or Point of Interest must price interact with?" },
          { label: "Name the required reaction", body: "What reclaim, displacement and lower-timeframe confirmation must appear?" },
          { label: "Draw invalidation first", body: "Which exact structural price proves the idea wrong? Not chosen to make position size convenient." },
          { label: "Check risk and choose", body: "If any required evidence is absent — or minimum size exceeds permitted risk — reject / no-trade." },
        ],
      },
      {
        type: "callout",
        callout: { tone: "warn", heading: "The sequence protects the learner from storytelling", body: "Do not begin with “I want to go long” and search backward for reasons. Begin with the environment and proceed in order. A failed gate ends the candidate." },
      },
      {
        type: "recallCheck",
        check: {
          id: "sizing",
          prompt: "Unitless arithmetic drill — not a suggested risk setting. Let M = 60, D = 8 points, V = 2 per point, C_rt = 2, total adverse slippage = 2 ticks, and T = 0.50 per tick. Calculate F, planned loss per contract, and floor-rounded N.",
          placeholder: "Show F, per-contract loss and whole contracts…",
          modelAnswer: "F = 2 + (2 × 0.50) = 3. Planned loss per contract = (8 × 2) + 3 = 19. N = floor(60 ÷ 19) = 3 whole contracts. The unused risk capacity stays unused; rounding up to four would exceed M.",
        },
      },
      {
        type: "recallCheck",
        check: {
          id: "stage5",
          prompt: "Direction, location and reaction all appear valid, but you cannot identify a structural invalidation price. Is the candidate complete?",
          placeholder: "Give the decision and failing stage…",
          modelAnswer: "No. Reject the candidate. Without an exact structural invalidation, risk cannot be defined and the idea cannot be tested consistently.",
        },
      },
    ],
    nextSlug: "apply",
    nextLabel: "Guided walkthrough",
  },
  {
    slug: "apply",
    index: 6,
    stageKicker: "Apply it · Guided walkthrough",
    title: "Same first breach, two possible branches — only the close after it tells you which",
    goal: "Run the five stages together on one synthetic chart, then practice before using capital.",
    hasChart: true,
    blocks: [
      { type: "chart" },
      {
        type: "flowChart",
        heading: "How the reasoning builds",
        steps: [
          { label: "See", body: "Price has been producing higher highs and higher lows. Direction is upward until the protected swing fails." },
          { label: "Locate", body: "The prior high above is a possible objective; the obvious prior low below is external sell-side location." },
          { label: "Observe interaction", body: "Price trades below that low and reclaims it. This is only a sweep candidate so far." },
          { label: "Judge reaction", body: "Price displaces upward with limited overlap and closes beyond an internal swing. The reaction now has evidence." },
          { label: "Wait, then decide", body: "Price retraces toward the reaction zone. Still need lower-timeframe confirmation, exact invalidation and acceptable size. If any is missing: reject." },
        ],
      },
      {
        type: "callout",
        callout: { tone: "bull", heading: "First 20 repetitions — no trading required", body: "Reps 1–5: describe candle anatomy and swings only. Reps 6–10: add location. Reps 11–15: classify reactions. Reps 16–20: run the full chain with future candles hidden. Score process, not outcome — a correct “no candidate” scores 5/5." },
      },
      {
        type: "recallCheck",
        check: {
          id: "branch",
          prompt: "Price trades below a prior low and the next completed candle remains below it. A later bounce retests the underside and fails. Which branch is this, and what happens to the long reversal candidate?",
          placeholder: "Classify the reaction and state the decision…",
          modelAnswer: "This is acceptance / continuation, not a qualified sweep-and-reclaim. The long reversal candidate is rejected because the reclaim condition failed; a later lower low strengthens that classification.",
        },
      },
      {
        type: "recallCheck",
        check: {
          id: "walkthrough",
          prompt: "At point 3 — immediately after price trades below the prior low but before point 4 exists — do you already have a complete long candidate? Explain the missing evidence.",
          placeholder: "Write your decision at point 3…",
          modelAnswer: "No. Only the location interaction is visible. The learner still needs a prompt reclaim, valid displacement or structure change, a qualified return zone, lower-timeframe confirmation, structural invalidation and a risk check.",
        },
      },
    ],
    nextSlug: null,
    nextLabel: null,
  },
];

export function getLesson(slug: string): Lesson | undefined {
  return beginnerAcademyLessons.find((l) => l.slug === slug);
}
