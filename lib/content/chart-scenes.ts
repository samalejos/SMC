import type { Candle, ChartSceneData, Overlay, SceneStep } from "@/lib/chart/types";

const BASE = 1_700_000_000;
const DAY = 86_400;
const day = (i: number) => BASE + i * DAY;

const COLOR = {
  bull: "#22c55e",
  bullSoft: "rgba(34,197,94,0.22)",
  bear: "#ef4444",
  bearSoft: "rgba(239,68,68,0.22)",
  liq: "#3b82f6",
  accent: "#a78bfa",
  accentSoft: "rgba(167,139,250,0.22)",
  warn: "#f59e0b",
};

function candles(rows: [number, number, number, number][]): Candle[] {
  return rows.map(([open, high, low, close], i) => ({ time: day(i), open, high, low, close }));
}

function step(id: string, chip: string, title: string, body: string, overlays: Overlay[]): SceneStep {
  return { id, chip, title, body, overlays };
}

// ---------- Before Stage 1 · Understand the screen ----------
const screenBasicsCandles = candles([
  [20000, 20008, 19995, 20005],
  [20005, 20014, 20000, 20010],
  [20010, 20012, 19998, 20002],
  [20002, 20018, 19999, 20015],
  [20015, 20022, 20008, 20012],
  [20012, 20030, 20010, 20028],
  [20028, 20034, 20018, 20022],
  [20022, 20040, 20020, 20038],
  [20038, 20044, 20030, 20034],
  [20034, 20050, 20032, 20048],
  [20048, 20056, 20040, 20052],
  [20052, 20060, 20044, 20058],
  [20058, 20066, 20050, 20062],
  [20062, 20070, 20058, 20066],
]);

export const screenBasicsScene: ChartSceneData = {
  candles: screenBasicsCandles,
  caption: "Synthetic MNQ study chart. Prices are illustrative, not a live feed.",
  steps: [
    step("long", "1", "Long — profits when price rises", "Watch the path: entering long near 20,028 and exiting near 20,058 profits from the rise. The dot traces the trade, it does not predict it.", [
      { kind: "tradePath", direction: "long", entryTime: day(5), entryPrice: 20028, exitTime: day(11), exitPrice: 20058, color: COLOR.bull },
      { kind: "marker", time: day(5), price: 20028, color: COLOR.bull, text: "long entry" },
    ]),
    step("short", "2", "Short — profits when price falls", "A short does the opposite: it profits only if price falls after entry. This illustrative path shows the mirror trade — same entry idea, opposite direction.", [
      { kind: "tradePath", direction: "short", entryTime: day(5), entryPrice: 20028, exitTime: day(2), exitPrice: 20002, color: COLOR.bear },
      { kind: "marker", time: day(5), price: 20028, color: COLOR.bear, text: "short entry" },
    ]),
    step("ticks", "3", "Point / tick", "A point is one full index unit. For MNQ, one point = four 0.25-point ticks, worth $2 per point per contract. This shaded sliver is exactly 1.00 point.", [
      { kind: "box", time1: day(5) + 20000, time2: day(6) + 20000, price1: 20028, price2: 20029, color: COLOR.accentSoft, borderColor: COLOR.accent, label: "1.00 pt = 4 ticks" },
    ]),
    step("plan", "4", "Entry / stop / target — the risk:reward zones", "Shaded red is the risk between entry and stop. Shaded green is the reward between entry and target. This plan risks 15 points to make 30 — a 1:2 ratio, sized before anything is drawn on a broker.", [
      { kind: "priceLine", price: 20030, color: COLOR.accent, label: "entry" },
      { kind: "priceLine", price: 20015, color: COLOR.warn, label: "stop", dashed: true },
      { kind: "priceLine", price: 20060, color: COLOR.bull, label: "target", dashed: true },
      { kind: "box", time1: day(5), time2: day(9), price1: 20030, price2: 20015, color: COLOR.bearSoft, borderColor: COLOR.bear, label: "Risk" },
      { kind: "box", time1: day(5), time2: day(9), price1: 20030, price2: 20060, color: COLOR.bullSoft, borderColor: COLOR.bull, label: "Reward · R:R = 1:2" },
    ]),
    step("live", "5", "Live bar — can still change", "The final candle is pulsing because its high, low and close are not fixed yet. A rule that requires a completed close must wait for this bar to finish.", [
      { kind: "pulseCandle", time: day(13), label: "still forming" },
    ]),
  ],
};

// ---------- Stage 1 · See the chart ----------
const stage1Candles = candles([
  [100, 104, 98, 102],
  [102, 103, 96, 97],
  [97, 101, 95, 100],
  [100, 108, 99, 107],
  [107, 109, 103, 104],
  [104, 105, 98, 99],
  [99, 100, 93, 95],
  [95, 101, 94, 100],
  [100, 106, 99, 105],
  [105, 107, 102, 103],
]);

function barBox(i: number, margin = 30000): { time1: number; time2: number } {
  const t = day(i);
  return { time1: t - margin, time2: t + margin };
}

export const stage1Scene: ChartSceneData = {
  candles: stage1Candles,
  caption: "Tap any candle to read its own open, high, low and close.",
  steps: [
    step("bull", "1", "Bullish candle", "Close above open. The body is the thick part; the thin lines above and below are wicks — the extremes that traded but did not hold.", [
      { kind: "box", ...barBox(0), price1: 100, price2: 102, color: COLOR.bullSoft, borderColor: COLOR.bull, label: "close > open" },
    ]),
    step("bear", "2", "Bearish candle", "Close below open. Same anatomy, opposite outcome — this alone does not explain why price moved.", [
      { kind: "box", ...barBox(1), price1: 102, price2: 97, color: COLOR.bearSoft, borderColor: COLOR.bear, label: "close < open" },
    ]),
    step("wick", "3", "Long wick = a level that didn't hold", "Bar 6 traded down to 93 but closed at 95 — the wick shows the rejected extreme. The candle alone can't say who did the rejecting.", [
      { kind: "marker", time: day(6), price: 93, color: COLOR.accent, text: "rejected low" },
    ]),
    step("swinghigh", "4", "Swing high", "Bar 3 has lower highs on both sides of it — a swing high, dependent on timeframe and lookback.", [
      { kind: "marker", time: day(3), price: 109, color: COLOR.bull, text: "swing high" },
    ]),
    step("swinglow", "5", "Swing low", "Bar 6 has higher lows on both sides — a swing low.", [
      { kind: "marker", time: day(6), price: 93, color: COLOR.bear, text: "swing low" },
    ]),
  ],
};

// ---------- Stage 2 · Read direction ----------
const stage2Candles = candles([
  [100, 102, 96, 98],
  [98, 99, 90, 92],
  [92, 96, 88, 95],
  [95, 96, 85, 87],
  [87, 100, 86, 98],
  [98, 99, 90, 92],
  [92, 110, 91, 108],
  [108, 109, 98, 100],
  [100, 101, 88, 89],
  [89, 92, 80, 83],
]);

export const stage2Scene: ChartSceneData = {
  candles: stage2Candles,
  caption: "A protected higher low, a new higher high, then a completed close below it — labeled only after the close.",
  steps: [
    step("low1", "1", "First swing low", "A confirmed swing low at 85. Not yet meaningful on its own.", [
      { kind: "priceLine", price: 85, color: COLOR.liq, label: "swing low", dashed: true },
      { kind: "marker", time: day(3), price: 85, color: COLOR.liq, text: "swing low" },
    ]),
    step("hl", "2", "Protected higher low", "Price rallies, pulls back, and holds above 85 — a higher low at 90. This becomes the protected reference: its closing break would end the upward sequence.", [
      { kind: "priceLine", price: 85, color: COLOR.liq, label: "swing low", dashed: true },
      { kind: "priceLine", price: 90, color: COLOR.warn, label: "protected HL", dashed: true },
      { kind: "marker", time: day(5), price: 90, color: COLOR.warn, text: "protected HL" },
    ]),
    step("hh", "3", "Higher high confirms it", "A new high at 108 confirms the sequence — and confirms that 90, not 85, is now the level that matters.", [
      { kind: "priceLine", price: 90, color: COLOR.warn, label: "protected HL", dashed: true },
      { kind: "marker", time: day(6), price: 108, color: COLOR.bull, text: "HH confirms protected HL" },
    ]),
    step("choch", "4", "Bearish CHoCH", "Bar 8 completes a close at 89 — below the protected HL at 90. Only the completed close triggers the label; a wick through it would not.", [
      { kind: "priceLine", price: 90, color: COLOR.warn, label: "protected HL", dashed: true },
      { kind: "box", time1: day(7), time2: day(9), price1: 90, price2: 83, color: COLOR.bearSoft, borderColor: COLOR.bear, label: "close below HL = CHoCH" },
      { kind: "marker", time: day(8), price: 89, color: COLOR.bear, text: "CHoCH" },
    ]),
  ],
};

// ---------- Stage 3 · Find location ----------
const stage3Candles = candles([
  [100, 102, 98, 101],
  [101, 103, 99, 100],
  [100, 105, 99, 104],
  [104, 104, 95, 97],
  [97, 98, 90, 92],
  [92, 96, 91, 95],
  [95, 99, 93, 98],
  [98, 100, 94, 96],
  [96, 104, 95, 103],
  [103, 106, 101, 105],
]);

export const stage3Scene: ChartSceneData = {
  candles: stage3Candles,
  caption: "Location marks where to watch. It does not forecast what happens there.",
  steps: [
    step("high", "1", "External liquidity — range high", "The obvious untested high above. Stops and breakout orders may cluster here — inferred, not confirmed, on a candle chart.", [
      { kind: "priceLine", price: 105, color: COLOR.liq, label: "prior high", dashed: true },
    ]),
    step("low", "2", "External liquidity — range low", "The obvious untested low below.", [
      { kind: "priceLine", price: 90, color: COLOR.liq, label: "prior low", dashed: true },
    ]),
    step("internal", "3", "Internal liquidity", "Bar 5's minor swing sits inside the range — a smaller level price can interact with before ever reaching the range boundary.", [
      { kind: "marker", time: day(5), price: 91, color: COLOR.liq, text: "internal liquidity" },
    ]),
    step("premium", "4", "Premium / discount", "Split the same range in half. The upper half is premium, the lower half discount — which exact range you're measuring has to be named, not just 'upper' or 'lower'.", [
      { kind: "box", time1: day(0), time2: day(9), price1: 97.5, price2: 105, color: COLOR.bearSoft, borderColor: COLOR.bear, label: "premium" },
      { kind: "box", time1: day(0), time2: day(9), price1: 90, price2: 97.5, color: COLOR.bullSoft, borderColor: COLOR.bull, label: "discount" },
    ]),
    step("poi", "5", "Point of Interest", "Bar 7's down move before the rally away is marked as a POI — a zone to monitor, not an automatic entry.", [
      { kind: "box", time1: day(6), time2: day(8), price1: 94, price2: 100, color: COLOR.accentSoft, borderColor: COLOR.accent, label: "POI — watch, don't assume" },
    ]),
    step("dol", "6", "Draw on Liquidity", "The named objective this hypothesis is drawn toward — here, the prior high. A DOL must be a specific level, never just 'higher'.", [
      { kind: "priceLine", price: 105, color: COLOR.liq, label: "DOL", dashed: true },
      { kind: "marker", time: day(9), price: 105, color: COLOR.liq, text: "DOL" },
    ]),
  ],
};

// ---------- Stage 4 · Judge reaction ----------
const stage4Candles = candles([
  [100, 101, 97, 99],
  [99, 100, 96, 98],
  [98, 99, 94, 96],
  [96, 97, 88, 94],
  [94, 103, 93, 101],
  [101, 102, 96, 97],
  [97, 106, 96, 105],
]);

export const stage4Scene: ChartSceneData = {
  candles: stage4Candles,
  caption: "The same first breach can resolve two ways — only the completed close after it tells you which.",
  steps: [
    step("level", "1", "The level", "A marked prior low at 92. Nothing has happened yet.", [
      { kind: "priceLine", price: 92, color: COLOR.liq, label: "prior low", dashed: true },
    ]),
    step("sweep", "2", "Sweep candidate", "Bar 3 wicks to 88 — below the level — then closes back at 94, above it. A prompt reclaim like this is a sweep candidate, not yet a confirmed reversal.", [
      { kind: "priceLine", price: 92, color: COLOR.liq, label: "prior low", dashed: true },
      { kind: "marker", time: day(3), price: 88, color: COLOR.warn, text: "breach + reclaim" },
    ]),
    step("displacement", "3", "Displacement", "Bar 4 expands with limited overlap and a structural close well beyond the level — displacement, the required evidence a reaction is real.", [
      { kind: "box", time1: day(4), time2: day(5), price1: 94, price2: 101, color: COLOR.bullSoft, borderColor: COLOR.bull, label: "displacement" },
    ]),
    step("zone", "4", "Reaction zone", "Price retraces toward the zone the displacement left behind. A learner still needs lower-timeframe confirmation and invalidation before this becomes a candidate.", [
      { kind: "box", time1: day(5), time2: day(6), price1: 94, price2: 97, color: COLOR.accentSoft, borderColor: COLOR.accent, label: "reaction zone" },
    ]),
    step("ob", "5", "Order Block", "Bar 3 is the last opposing (bearish) candle before displacement. It's marked as an Order Block — a convention for a reaction zone, not proof of who traded there.", [
      { kind: "box", ...barBox(3), price1: 96, price2: 94, color: COLOR.bearSoft, borderColor: COLOR.bear, label: "OB" },
    ]),
    step("fvg", "6", "Fair Value Gap", "Displacement moved fast enough to leave a gap between candles — an imbalance. It marks inefficiency; it doesn't promise price returns to fill it.", [
      { kind: "box", time1: day(4), time2: day(5), price1: 97, price2: 101, color: COLOR.accentSoft, borderColor: COLOR.accent, label: "FVG" },
    ]),
  ],
};

// ---------- Stage 5 · Make and test a decision ----------
const stage5Candles = candles([
  [100, 101, 96, 98],
  [98, 100, 95, 99],
  [99, 105, 98, 104],
  [104, 105, 99, 101],
  [101, 102, 97, 98],
  [98, 107, 97, 106],
  [106, 107, 102, 104],
  [104, 112, 103, 111],
  [111, 112, 107, 109],
  [109, 115, 108, 114],
]);

export const stage5Scene: ChartSceneData = {
  candles: stage5Candles,
  caption: "Invalidation is drawn first. Size and reward are downstream of that price, never the other way around.",
  steps: [
    step("invalidation", "1", "Invalidation first", "The exact structural price that proves the idea wrong — drawn before entry, not adjusted afterward to fit a preferred position size.", [
      { kind: "priceLine", price: 96, color: COLOR.warn, label: "invalidation", dashed: true },
    ]),
    step("entry", "2", "Entry inside the zone", "Entry sits inside the zone this decision is built around.", [
      { kind: "priceLine", price: 96, color: COLOR.warn, label: "invalidation", dashed: true },
      { kind: "priceLine", price: 99, color: COLOR.accent, label: "entry" },
    ]),
    step("rr", "3", "Risk vs. reward", "Risk (red) is entry to invalidation. Reward (green) is entry to the next named objective. Only after both are drawn does the ratio mean anything.", [
      { kind: "box", time1: day(2), time2: day(9), price1: 99, price2: 96, color: COLOR.bearSoft, borderColor: COLOR.bear, label: "Risk" },
      { kind: "box", time1: day(2), time2: day(9), price1: 99, price2: 111, color: COLOR.bullSoft, borderColor: COLOR.bull, label: "Reward · R:R ≈ 1:4" },
    ]),
    step("gate", "4", "Risk check", "If fewer than one contract fits the permitted risk after fees and slippage, the answer is reject — regardless of how good the chart looks.", [
      { kind: "marker", time: day(9), price: 114, color: COLOR.accent, text: "continue only if size fits" },
    ]),
  ],
};

// ---------- Capstone · Guided walkthrough ----------
const applyCandles = candles([
  [100, 104, 98, 102],
  [102, 106, 100, 105],
  [105, 109, 103, 107],
  [107, 108, 98, 100],
  [100, 101, 92, 94],
  [94, 103, 93, 101],
  [101, 102, 95, 97],
  [97, 111, 96, 110],
  [110, 111, 104, 106],
  [106, 113, 105, 112],
]);

const applyRefLines: Overlay[] = [
  { kind: "priceLine", price: 96, color: COLOR.liq, label: "prior low", dashed: true },
  { kind: "priceLine", price: 109, color: COLOR.liq, label: "prior high · DOL", dashed: true },
];

export const applyScene: ChartSceneData = {
  candles: applyCandles,
  caption: "The numbered points are teaching markers, not entry signals. Point 5 remains only a candidate.",
  steps: [
    step("p1", "1", "① Sweep candidate", "Price breaches the prior low, briefly.", [...applyRefLines, { kind: "marker", time: day(4), price: 92, color: COLOR.warn, text: "① breach" }]),
    step("p2", "2", "② Reaction begins", "A prompt reclaim and displacement start building evidence.", [...applyRefLines, { kind: "box", time1: day(5), time2: day(6), price1: 93, price2: 101, color: COLOR.accentSoft, borderColor: COLOR.accent, label: "reaction zone" }, { kind: "marker", time: day(5), price: 101, color: COLOR.accent, text: "② reaction" }]),
    step("p3", "3", "③ Retrace to the zone", "Price returns toward the zone the displacement left behind.", [...applyRefLines, { kind: "marker", time: day(6), price: 95, color: COLOR.warn, text: "③ retrace" }]),
    step("p4", "4", "④ Displacement confirms", "A structural close beyond the internal swing — the reaction now has evidence.", [...applyRefLines, { kind: "marker", time: day(7), price: 111, color: COLOR.bull, text: "④ displacement" }]),
    step("p5", "5", "⑤ Still only a candidate", "Even here, a learner still needs lower-timeframe confirmation, exact invalidation and an acceptable size. Reject if any is missing.", [...applyRefLines, { kind: "marker", time: day(8), price: 104, color: COLOR.bear, text: "⑤ candidate — not an entry" }]),
  ],
};

export const scenesBySlug: Record<string, ChartSceneData> = {
  "before-stage-1": screenBasicsScene,
  "stage-1": stage1Scene,
  "stage-2": stage2Scene,
  "stage-3": stage3Scene,
  "stage-4": stage4Scene,
  "stage-5": stage5Scene,
  apply: applyScene,
};
