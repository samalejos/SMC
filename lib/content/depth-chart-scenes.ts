import type { Candle, ChartSceneData, Overlay, SceneStep } from "@/lib/chart/types";

const BASE = 1_750_000_000;
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

function barBox(i: number, margin = 30000): { time1: number; time2: number } {
  const t = day(i);
  return { time1: t - margin, time2: t + margin };
}

// ---------- Module 1 · Chart Literacy ----------
const m1Candles = candles([
  [100, 104, 96, 102],
  [102, 110, 100, 108],
  [108, 109, 102, 104],
  [104, 116, 103, 114],
  [114, 115, 106, 108],
  [108, 122, 107, 120],
  [120, 121, 109, 111],
  [111, 112, 98, 100],
  [100, 101, 88, 90],
  [90, 96, 85, 93],
  [93, 94, 80, 83],
]);

export const m1Scene: ChartSceneData = {
  candles: m1Candles,
  caption: "Five swings of HH/HL held, then one completed close below the protected HL flips the read.",
  steps: [
    step("hh1", "1", "Bullish structure building", "Higher high at bar 1, higher low at bar 2, another higher high at bar 3 — HH + HL, intact.", [
      { kind: "marker", time: day(1), price: 110, color: COLOR.bull, text: "HH" },
      { kind: "marker", time: day(2), price: 102, color: COLOR.bull, text: "HL" },
    ]),
    step("hh2", "2", "Sequence continues", "Two more legs, same pattern — HH then HL. Five swings in, structure is still bullish.", [
      { kind: "marker", time: day(3), price: 116, color: COLOR.bull, text: "HH" },
      { kind: "marker", time: day(4), price: 106, color: COLOR.bull, text: "HL" },
      { kind: "marker", time: day(5), price: 122, color: COLOR.bull, text: "HH" },
    ]),
    step("choch", "3", "CHoCH — the first evidence", "Bar 8 completes a close at 90, below the protected higher low at 98. That completed close is the CHoCH — a flag to start watching, not a trade signal.", [
      { kind: "priceLine", price: 98, color: COLOR.warn, label: "protected HL", dashed: true },
      { kind: "box", time1: day(7), time2: day(9), price1: 98, price2: 90, color: COLOR.accentSoft, borderColor: COLOR.accent, label: "CHoCH" },
    ]),
    step("bos", "4", "BOS confirms the new direction", "A lower high, then a close below the recent swing low — BOS confirming the bearish structure that the CHoCH warned about.", [
      { kind: "marker", time: day(9), price: 96, color: COLOR.bear, text: "LH" },
      { kind: "marker", time: day(10), price: 80, color: COLOR.bear, text: "BOS" },
    ]),
  ],
};

// ---------- Module 2 · Liquidity ----------
const m2Candles = candles([
  [100, 102, 96, 99],
  [99, 103, 97, 101],
  [101, 104, 98, 100],
  [100, 106, 99, 104],
  [104, 105, 96, 98],
  [98, 118, 97, 116],
  [116, 117, 108, 110],
  [110, 111, 104, 106],
  [106, 107, 100, 102],
  [102, 103, 95, 100],
  [100, 101, 93, 97],
  [97, 98, 90, 94],
  [94, 95, 89, 92],
]);

export const m2Scene: ChartSceneData = {
  candles: m2Candles,
  caption: "Same chart, two very different events — the difference is speed and rejection, not just 'price went past the level.'",
  steps: [
    step("eqh", "1", "External liquidity marked", "Equal highs above, equal lows below — the obvious boundary of the current dealing range.", [
      { kind: "priceLine", price: 106, color: COLOR.liq, label: "EQH", dashed: true },
      { kind: "priceLine", price: 89, color: COLOR.liq, label: "EQL", dashed: true },
    ]),
    step("sweep", "2", "Genuine sweep", "Bar 5 pokes to 118 — sharp, through the level in one candle — then the next candle closes back below 106. Fast rejection, not a grind.", [
      { kind: "priceLine", price: 106, color: COLOR.liq, label: "EQH", dashed: true },
      { kind: "marker", time: day(5), price: 118, color: COLOR.warn, text: "sharp poke + fast reversal" },
      { kind: "box", ...barBox(5), price1: 116, price2: 110, color: COLOR.bearSoft, borderColor: COLOR.bear, label: "genuine sweep" },
    ]),
    step("drift", "3", "Slow drift — not a sweep", "Bars 9–12 grind below 93 for four candles with no sharp poke and no fast rejection. This is exploration, not a swept level.", [
      { kind: "priceLine", price: 93, color: COLOR.liq, label: "EQL area", dashed: true },
      { kind: "box", time1: day(9), time2: day(12), price1: 95, price2: 89, color: COLOR.warn + "33", borderColor: COLOR.warn, label: "slow drift" },
    ]),
  ],
};

// ---------- Module 3 · Displacement & Imbalance ----------
const m3Candles = candles([
  [100, 101, 97, 98],
  [98, 99, 95, 96],
  [96, 97, 90, 92],
  [92, 93, 85, 89],
  [89, 100, 88, 98],
  [98, 109, 97, 107],
  [107, 116, 106, 114],
  [114, 115, 108, 110],
  [110, 111, 104, 106],
]);

export const m3Scene: ChartSceneData = {
  candles: m3Candles,
  caption: "Sweep → last opposing candle (the OB) → displacement leaving an FVG → retracement to rebalance.",
  steps: [
    step("sweep", "1", "Sweep", "Bar 3 pokes below the prior low and reclaims — the stops are taken first.", [
      { kind: "marker", time: day(3), price: 85, color: COLOR.warn, text: "sweep" },
    ]),
    step("ob", "2", "Order block", "Bar 4 is the last down-close candle before the impulsive move — marked as the bullish OB.", [
      { kind: "box", ...barBox(4), price1: 98, price2: 89, color: COLOR.bearSoft, borderColor: COLOR.bear, label: "OB" },
    ]),
    step("displacement", "3", "Displacement", "Bars 5–7 expand fast with minimal overlap — roughly 3× the size of the pre-sweep candles. This is the anomalous move, not just 'a big candle.'", [
      { kind: "box", time1: day(5), time2: day(7), price1: 98, price2: 116, color: COLOR.bullSoft, borderColor: COLOR.bull, label: "displacement" },
    ]),
    step("fvg", "4", "Imbalance left behind", "The fast move leaves a gap between bar 4's high and bar 6's low — untraded price, marked as an FVG.", [
      { kind: "box", time1: day(4), time2: day(6), price1: 98, price2: 106, color: COLOR.accentSoft, borderColor: COLOR.accent, label: "FVG" },
    ]),
    step("retrace", "5", "Retracement to rebalance", "Bars 8–9 pull back toward the OB/FVG zone — the return this curriculum treats as the highest-quality opportunity, not a guarantee.", [
      { kind: "box", time1: day(7), time2: day(9), price1: 98, price2: 110, color: COLOR.accentSoft, borderColor: COLOR.accent, label: "retracement" },
    ]),
  ],
};

// ---------- Module 4 · Order Blocks, Breakers & Mitigation ----------
const m4Candles = candles([
  [100, 101, 96, 98],
  [98, 108, 97, 106],
  [106, 114, 105, 112],
  [112, 113, 104, 106],
  [106, 107, 98, 100],
  [100, 101, 93, 95],
  [95, 100, 94, 99],
  [99, 108, 98, 106],
]);

export const m4Scene: ChartSceneData = {
  candles: m4Candles,
  caption: "The zone is identical through the violation — only the later return and polarity flip make it a breaker.",
  steps: [
    step("forms", "1", "OB forms", "Bar 0 is the last opposing candle before the displacement leg — a valid bullish OB, criteria met.", [
      { kind: "box", ...barBox(0), price1: 100, price2: 96, color: COLOR.bullSoft, borderColor: COLOR.bull, label: "OB forms" },
    ]),
    step("violation", "2", "Violation", "Bars 4–5 close decisively below the OB's low — invalidated. On its own this is now just a broken OB.", [
      { kind: "box", ...barBox(0), price1: 100, price2: 96, color: COLOR.bearSoft, borderColor: COLOR.bear, label: "invalidated" },
      { kind: "marker", time: day(5), price: 93, color: COLOR.bear, text: "close below OB" },
    ]),
    step("retrace", "3", "Price returns", "Bar 6 retraces back up into the same zone that failed — this return is what a broken OB needs to ever become a breaker.", [
      { kind: "box", ...barBox(0), price1: 100, price2: 96, color: COLOR.accentSoft, borderColor: COLOR.accent, label: "retest" },
    ]),
    step("breaker", "4", "Opposite polarity", "Bar 7 rejects from the zone and closes lower — the former support now acts as resistance. Only now does it earn the label 'breaker.'", [
      { kind: "box", ...barBox(0), price1: 100, price2: 96, color: COLOR.liq + "33", borderColor: COLOR.liq, label: "breaker" },
      { kind: "marker", time: day(7), price: 108, color: COLOR.liq, text: "rejects as resistance" },
    ]),
  ],
};

// ---------- Module 5 · Fair Value Gaps ----------
const m5Candles = candles([
  [100, 101, 96, 97],
  [97, 112, 96, 110],
  [110, 111, 104, 106],
  [106, 108, 100, 104],
  [104, 105, 98, 100],
]);

export const m5Scene: ChartSceneData = {
  candles: m5Candles,
  caption: "C1's high sits below C3's low — that untraded interval is the gap. CE is its midpoint.",
  steps: [
    step("c1", "1", "C1", "The candle before the displacement. Its high becomes one edge of the gap.", [
      { kind: "marker", time: day(0), price: 101, color: COLOR.bear, text: "C1 high" },
    ]),
    step("c2", "2", "C2 — the displacement candle", "The impulsive move that creates the imbalance between C1 and C3.", [
      { kind: "box", ...barBox(1), price1: 96, price2: 112, color: COLOR.bullSoft, borderColor: COLOR.bull, label: "C2" },
    ]),
    step("fvg", "3", "The gap and its midpoint (CE)", "C1 high (101) to C3 low (104) never traded — that's the FVG. Consequent Encroachment is its 50% level, 102.5.", [
      { kind: "box", time1: day(0), time2: day(2), price1: 101, price2: 104, color: COLOR.accentSoft, borderColor: COLOR.accent, label: "FVG" },
      { kind: "priceLine", price: 102.5, color: COLOR.warn, label: "CE 50%", dashed: true },
    ]),
    step("fill", "4", "Partial fill — the common case", "Bars 3–4 trade back down to the CE and react there without filling the whole gap — the base case to expect, not the exception.", [
      { kind: "box", time1: day(0), time2: day(2), price1: 101, price2: 104, color: COLOR.accentSoft, borderColor: COLOR.accent, label: "FVG" },
      { kind: "marker", time: day(4), price: 100, color: COLOR.warn, text: "reacts at CE" },
    ]),
  ],
};

export const depthScenesBySlug: Record<string, ChartSceneData> = {
  m1: m1Scene,
  m2: m2Scene,
  m3: m3Scene,
  m4: m4Scene,
  m5: m5Scene,
};
