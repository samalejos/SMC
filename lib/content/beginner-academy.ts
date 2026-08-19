import type { Lesson } from "@/lib/content/types";

export const beginnerAcademyLessons: Lesson[] = [
  {
    slug: "before-stage-1",
    index: 0,
    stageKicker: "Before Stage 1 · Understand the screen",
    title: "Six basics the rest of the course will no longer assume",
    goal: "Understand the nouns on a futures chart before analyzing any pattern.",
    hasChart: true,
    concepts: [
      { plain: "What is being charted", term: "Instrument / contract", body: "An instrument is the market product. A futures contract is a standardized exchange agreement tied to a delivery month. The exact symbol and contract month matter when comparing charts or data." },
      { plain: "Two directional positions", term: "Long / short", body: "A long position benefits when price rises and loses when it falls. A short position benefits when price falls and loses when it rises, before commissions and slippage." },
      { plain: "How price movement is counted", term: "Point / tick", body: "A point is one full index-price unit. A tick is the smallest permitted price increment. For MNQ, CME currently specifies 0.25 index points per tick and $2 per full point per contract; verify current specifications." },
      { plain: "The planned prices", term: "Entry / stop / target", body: "Entry is where a position begins. A protective stop is the preplanned exit if the idea fails. A target is a planned favorable exit. A chart drawing does not place an order at the broker." },
      { plain: "A candle that can still change", term: "Live bar", body: "The current candle's high, low and close can change until its interval ends. A completed candle is fixed for that data feed. Rules requiring a close must wait for completion." },
      { plain: "The clock attached to the chart", term: "Session / timezone", body: "Market sessions are time windows. A timestamp is meaningless without its timezone, and a session label can cross the wall-clock date. Record both when studying a chart." },
    ],
    formulaCard: {
      heading: "Every fill has friction — even when the chart looks perfect",
      intro: "Bid-ask spread is the distance between the best displayed buying and selling prices. Fees and commissions are charged by the exchange, clearing path and broker. Slippage is the difference between the price used in the plan and the actual fill. All three reduce the result after costs.",
      rules: [
        { label: "Before a replay test", body: "Write the fee schedule and estimated entry/exit slippage used in the test. Do not silently assume zero." },
        { label: "After a simulated fill", body: "Record the actual fill price where the simulator provides it; distinguish a missed limit order from a favorable fictional fill." },
        { label: "After a real fill", body: "Replace estimates with the broker statement. Costs vary by broker and can change, so this course does not hard-code a universal dollar figure." },
      ],
      footnote: "Margin is not maximum loss. Futures use leverage: a relatively small amount of capital can control much larger market exposure. This curriculum begins in replay and simulation.",
    },
    recallChecks: [
      {
        id: "screen",
        prompt: "An MNQ quote moves from 20,000.00 to 20,001.00. How many index points and ticks did price move? Do not calculate profit or loss until the number of contracts is known.",
        placeholder: "State the points, ticks and missing information…",
        modelAnswer: "Price moved 1.00 index point, which equals four 0.25-point ticks. Dollar P&L still depends on position direction and the number of contracts, plus costs.",
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
    concepts: [
      { plain: "One period of price", term: "Candle", body: "The open is the first traded price in the interval; the high and low are its extremes; the close is the last traded price when that interval ends." },
      { plain: "How much time is compressed", term: "Timeframe", body: "A 5-minute candle summarizes five minutes. A 1-hour candle summarizes the same market at a coarser resolution. Neither timeframe is automatically “truer.”" },
      { plain: "A visible turning point", term: "Swing", body: "A swing high has lower highs around it; a swing low has higher lows around it. Swing labels depend on the chosen timeframe and lookback." },
    ],
    truthTable: {
      observedLabel: "Observed directly",
      observed: "Price traded below the open, recovered, and closed near the interval high.",
      interpretedLabel: "Possible interpretation",
      interpreted: "Buyers may have absorbed selling. That interpretation requires context; the candle alone cannot prove who acted.",
    },
    recallChecks: [
      {
        id: "stage1",
        prompt: "A candle has a long lower wick and closes near its high. Write one sentence stating only what is observable — without using “buyers,” “institutions,” “manipulation” or “smart money.”",
        placeholder: "Write the observable price sequence…",
        modelAnswer: "During this interval, price traded materially below its open, then recovered and closed near the interval high. That is observation. Any claim about who caused it is interpretation.",
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
    concepts: [
      { plain: "Progressing upward", term: "HH + HL", body: "Higher highs and higher lows describe bullish structure. A red candle inside that sequence does not automatically end it." },
      { plain: "Progressing downward", term: "LH + LL", body: "Lower highs and lower lows describe bearish structure. A green candle inside that sequence may be only a pullback." },
      { plain: "Neither side progressing", term: "Range", body: "Repeated overlap between a visible high and low means rotation. Calling every internal wiggle a trend creates false signals." },
    ],
    formulaCard: {
      heading: "Mechanical convention: confirm the swing first, then decide whether it is protected",
      intro: "This course uses a strict three-bar fractal so two learners can mark the same chart. At bar t, a swing is not known until bar t+1 has completed. Equal highs or equal lows do not pass the strict rule.",
      formulaLines: ["SwingHigh(t): H(t) > H(t-1) and H(t) > H(t+1)", "SwingLow(t): L(t) < L(t-1) and L(t) < L(t+1)"],
      rules: [
        { label: "Upward sequence", body: "The protected low is the latest confirmed swing low that precedes the completed close creating the current higher high." },
        { label: "Downward sequence", body: "The protected high is the latest confirmed swing high that precedes the completed close creating the current lower low." },
        { label: "CHoCH trigger", body: "Only a completed candle close beyond that protected level triggers the label. A wick through it does not." },
      ],
    },
    dataTable: {
      headers: ["Plain-language event", "SMC label", "What it changes", "What it does not prove"],
      rows: [
        ["Price closes beyond a prior swing in the current direction", "BOS · Break of Structure", "Confirms continuation of the visible sequence", "That the next trade will win"],
        ["Price closes beyond a protected swing against the current direction", "CHoCH · Change of Character", "Warns that the prior sequence may be failing", "That a full reversal is already confirmed"],
      ],
    },
    callout: { tone: "warn", heading: "Common beginner error", body: "A CHoCH is an alert, not an entry. First ask where it happened, what level was involved, and whether the move away showed genuine strength." },
    recallChecks: [
      {
        id: "stage2",
        prompt: "Price prints a higher high, a higher low, another higher high, then one bearish candle that remains above the prior higher low. Has bullish structure changed?",
        placeholder: "State the structure and why…",
        modelAnswer: "No. The HH/HL sequence remains intact because price has not closed below the protected higher low. One bearish candle is a pullback, not a structural change.",
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
    concepts: [
      { plain: "Obvious levels where orders may cluster", term: "Liquidity", body: "Prior highs/lows, equal highs/lows and range edges often attract stops and breakout orders. On a candle chart, the orders themselves are inferred unless order-book data is available." },
      { plain: "A zone worth monitoring", term: "POI", body: "A Point of Interest is not automatically an entry. It is a location where the learner watches for a qualifying reaction." },
      { plain: "The next level in the hypothesis", term: "DOL", body: "Draw on Liquidity is the price objective the thesis expects next. It must be a named level, not “higher” or “lower.”" },
    ],
    dataTable: {
      headers: ["Location type", "Plain explanation", "Beginner question"],
      rows: [
        ["External liquidity", "Beyond the obvious boundary of the current swing or range", "Which major high or low has not been tested?"],
        ["Internal liquidity", "Minor swings and imbalances inside the larger range", "What can price interact with before reaching the boundary?"],
        ["Premium / discount", "Upper or lower half of a defined range", "Which exact range am I measuring, and why that one?"],
      ],
    },
    callout: { tone: "liq", heading: "Location is a filter, not a forecast", body: "A marked high can be swept and rejected, broken and accepted, or ignored. The level tells you where to observe. The reaction tells you whether a candidate is forming." },
    recallChecks: [
      {
        id: "stage3",
        prompt: "Price sits in the middle of yesterday's range, far from the marked high and low, with no clear Point of Interest. What is the correct location assessment?",
        placeholder: "Name what is missing…",
        modelAnswer: "Location is poor or undefined. The learner should wait for price to approach a meaningful boundary or qualified zone rather than manufacture a setup in the middle of the range.",
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
    concepts: [
      { plain: "Brief trade beyond a level, then return", term: "Sweep", body: "A useful sweep hypothesis needs a prompt reclaim and meaningful move away. A slow drift through a level is not the same event." },
      { plain: "Unusually forceful move away", term: "Displacement", body: "Look for expanded bodies, limited overlap and a structural close. “Big candle” alone is an incomplete definition." },
      { plain: "Price moves too quickly to overlap fully", term: "FVG", body: "A Fair Value Gap is a three-candle price imbalance. It marks an inefficiency; it does not promise that price must return or react." },
      { plain: "Last opposing candle before displacement", term: "OB", body: "An Order Block is a charting convention used to define a potential reaction zone. Its institutional cause is not proven by the candle label." },
      { plain: "Evidence at the zone before acting", term: "Confirmation", body: "A lower-timeframe structure shift or displacement inside the zone shows a reaction has begun; it cannot eliminate loss risk." },
      { plain: "Sustained trade beyond the level", term: "Acceptance", body: "Repeated closes and continued structure beyond the boundary weaken the rejection thesis. Do not keep calling it a sweep after acceptance is visible." },
    ],
    formulaCard: {
      heading: "Beginner labeling proxy: one completed displacement candle",
      intro: "“Looks strong” is not reproducible. For beginner drills, a single candle at bar t receives the strict displacement label only when all three conditions below pass.",
      formulaLines: ["TR(t) = max(H(t)-L(t), |H(t)-C(t-1)|, |L(t)-C(t-1)|)", "Body(t) = |C(t)-O(t)|"],
      rules: [
        { label: "1 · Range expansion", body: "TR(t) ≥ 1.5 × ATR(14) measured at t-1." },
        { label: "2 · Directional body", body: "Body(t) ÷ TR(t) ≥ 0.60, so a very long-wick candle does not qualify." },
        { label: "3 · Structural effect", body: "The completed close is beyond the named reference swing in the direction of the move." },
      ],
      footnote: "1.5 and 60% are transparent literacy thresholds, not a live universal edge. The Operational Bridge replaces them with a versioned instrument/timeframe/session/regime profile.",
    },
    truthTable: {
      observedLabel: "Candidate reaction",
      observed: "Level breached briefly → price reclaimed → displacement closed away → structure changed → retracement held.",
      interpretedLabel: "Still not a guarantee",
      interpreted: "The sequence qualifies a scenario under this curriculum. It does not prove manipulation, institutional intent or positive expectancy.",
    },
    recallChecks: [
      {
        id: "stage4",
        prompt: "Price pokes above equal highs, then prints six small overlapping candles around the same level. There is no reclaim with displacement. Is this a qualified bearish sweep?",
        placeholder: "Classify the reaction…",
        modelAnswer: "No. The interaction is unresolved or may be acceptance. A wick alone does not qualify the bearish sweep; the required reclaim and displacement are missing.",
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
    concepts: [
      { plain: "The price that disproves the thesis", term: "Invalidation", body: "This comes from chart structure. It is not moved closer merely to allow more contracts or improve the apparent reward-to-risk ratio." },
      { plain: "The loss planned if invalidation is reached", term: "1R", body: "R is a normalized unit of planned risk. A +2R outcome means twice the planned risk was gained; −1R means the planned risk was lost, before cost adjustments." },
      { plain: "How much exposure fits the risk limit", term: "Position size", body: "Size depends on stop distance, contract value and the learner's permitted risk. Calculate it after invalidation; always round down." },
    ],
    formulaCard: {
      heading: "Beginner arithmetic baseline: friction-adjusted contract count",
      intro: "First draw the structural invalidation. Then convert its distance into dollars per contract and include estimated all-in friction.",
      formulaLines: ["F = C_rt + (S_in + S_out) × T", "N = floor( M ÷ (D × V + F) )"],
      rules: [
        { label: "Market and stop", body: "D = absolute entry-to-invalidation distance in points. V = dollars per point, per contract." },
        { label: "Friction", body: "C_rt = round-turn fees/commission per contract. S_in + S_out = estimated adverse fill ticks. T = dollars per tick." },
        { label: "Decision", body: "M = learner-defined maximum planned loss. N = whole contracts. Always round down; if N < 1, reject." },
      ],
    },
    decisionChain: [
      { heading: "State the environment", body: "Trend, range, high volatility, event risk or unknown. “Unknown” is valid; pretending is not." },
      { heading: "Name direction and DOL", body: "What sequence is visible, and which exact level is the hypothesis targeting?" },
      { heading: "Name the required location", body: "Which liquidity pool or Point of Interest must price interact with?" },
      { heading: "Name the required reaction", body: "What reclaim, displacement and lower-timeframe confirmation must appear?" },
      { heading: "Draw invalidation first", body: "Which exact structural price proves the idea wrong? This is not chosen to make position size convenient." },
      { heading: "Check risk and choose", body: "If any required evidence is absent — or minimum size exceeds permitted risk — the decision is reject / no-trade." },
    ],
    callout: { tone: "warn", heading: "The sequence protects the learner from storytelling", body: "Do not begin with “I want to go long” and search backward for reasons. Begin with the environment and proceed in order. A failed gate ends the candidate." },
    recallChecks: [
      {
        id: "sizing",
        prompt: "Unitless arithmetic drill — not a suggested risk setting. Let M = 60, D = 8 points, V = 2 per point, C_rt = 2, total adverse slippage = 2 ticks, and T = 0.50 per tick. Calculate F, planned loss per contract, and floor-rounded N.",
        placeholder: "Show F, per-contract loss and whole contracts…",
        modelAnswer: "F = 2 + (2 × 0.50) = 3. Planned loss per contract = (8 × 2) + 3 = 19. N = floor(60 ÷ 19) = 3 whole contracts. The unused risk capacity stays unused; rounding up to four would exceed M.",
      },
      {
        id: "stage5",
        prompt: "Direction, location and reaction all appear valid, but you cannot identify a structural invalidation price. Is the candidate complete?",
        placeholder: "Give the decision and failing stage…",
        modelAnswer: "No. Reject the candidate. Without an exact structural invalidation, risk cannot be defined and the idea cannot be tested consistently.",
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
    decisionChain: [
      { heading: "See", body: "Price has been producing higher highs and higher lows. Direction is upward until the protected swing fails." },
      { heading: "Locate", body: "The prior high above is a possible objective; the obvious prior low below is external sell-side location." },
      { heading: "Observe interaction", body: "Price trades below that low and reclaims it. This is only a sweep candidate so far." },
      { heading: "Judge reaction", body: "Price displaces upward with limited overlap and closes beyond an internal swing. The reaction now has evidence." },
      { heading: "Wait, then decide", body: "Price retraces toward the reaction zone. A learner still needs lower-timeframe confirmation, exact invalidation and acceptable size. If any is missing: reject." },
    ],
    callout: { tone: "bull", heading: "First 20 repetitions — no trading required", body: "Reps 1–5: describe candle anatomy and swings only. Reps 6–10: add location. Reps 11–15: classify reactions. Reps 16–20: run the full chain with future candles hidden. Score process, not outcome — a correct “no candidate” scores 5/5." },
    recallChecks: [
      {
        id: "branch",
        prompt: "Price trades below a prior low and the next completed candle remains below it. A later bounce retests the underside and fails. Which branch is this, and what happens to the long reversal candidate?",
        placeholder: "Classify the reaction and state the decision…",
        modelAnswer: "This is acceptance / continuation, not a qualified sweep-and-reclaim. The long reversal candidate is rejected because the reclaim condition failed; a later lower low strengthens that classification.",
      },
      {
        id: "walkthrough",
        prompt: "At point 3 — immediately after price trades below the prior low but before point 4 exists — do you already have a complete long candidate? Explain the missing evidence.",
        placeholder: "Write your decision at point 3…",
        modelAnswer: "No. Only the location interaction is visible. The learner still needs a prompt reclaim, valid displacement or structure change, a qualified return zone, lower-timeframe confirmation, structural invalidation and a risk check.",
      },
    ],
    nextSlug: null,
    nextLabel: null,
  },
];

export function getLesson(slug: string): Lesson | undefined {
  return beginnerAcademyLessons.find((l) => l.slug === slug);
}
