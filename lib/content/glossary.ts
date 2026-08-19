export interface GlossaryEntry {
  term: string;
  match: string[];
  body: string;
}

export const glossary: GlossaryEntry[] = [
  { term: "Instrument / contract", match: ["instrument", "contract"], body: "An instrument is the market product. A futures contract is a standardized exchange agreement tied to a delivery month." },
  { term: "Long", match: ["long"], body: "A long position benefits when price rises and loses when it falls." },
  { term: "Short", match: ["short"], body: "A short position benefits when price falls and loses when it rises." },
  { term: "Point / tick", match: ["point", "tick"], body: "A point is one full index-price unit. A tick is the smallest permitted price increment." },
  { term: "Entry / stop / target", match: ["entry", "stop", "target"], body: "Entry is where a position begins. A stop is the preplanned exit if the idea fails. A target is a planned favorable exit." },
  { term: "Live bar", match: ["live bar", "live candle"], body: "The current candle's high, low and close can change until its interval ends." },
  { term: "Session / timezone", match: ["session", "timezone"], body: "Market sessions are time windows. A timestamp is meaningless without its timezone." },
  { term: "Candle", match: ["candle"], body: "One period of price: open, high, low and close for that interval." },
  { term: "Timeframe", match: ["timeframe"], body: "How much time one candle compresses. A 5-minute candle summarizes five minutes; a 1-hour candle the same market at a coarser resolution." },
  { term: "Swing", match: ["swing"], body: "A visible turning point. A swing high has lower highs around it; a swing low has higher lows around it." },
  { term: "HH / HL", match: ["hh", "higher high", "higher low"], body: "Higher highs and higher lows — the sequence that describes bullish structure." },
  { term: "LH / LL", match: ["lh", "lower high", "lower low"], body: "Lower highs and lower lows — the sequence that describes bearish structure." },
  { term: "Range", match: ["range"], body: "Repeated overlap between a visible high and low — neither side is progressing." },
  { term: "BOS", match: ["bos", "break of structure"], body: "Break of Structure: price closes beyond a prior swing in the current direction." },
  { term: "CHoCH", match: ["choch", "change of character"], body: "Change of Character: price closes beyond a protected swing against the current direction. A warning, not an entry." },
  { term: "Liquidity", match: ["liquidity"], body: "Obvious levels — prior highs/lows, equal highs/lows, range edges — where stop and breakout orders may cluster." },
  { term: "POI", match: ["poi", "point of interest"], body: "Point of Interest: a zone worth monitoring for a qualifying reaction. Not automatically an entry." },
  { term: "DOL", match: ["dol", "draw on liquidity"], body: "Draw on Liquidity: the named price objective the current hypothesis is aiming at." },
  { term: "Sweep", match: ["sweep"], body: "A brief trade beyond a level followed by a prompt reclaim — a candidate, not a confirmed reversal." },
  { term: "Displacement", match: ["displacement"], body: "An unusually forceful move away from a level: expanded body, limited overlap, a structural close." },
  { term: "FVG", match: ["fvg", "fair value gap"], body: "Fair Value Gap: a three-candle price imbalance. It marks an inefficiency, not a promise price returns." },
  { term: "OB", match: ["order block"], body: "Order Block: the last opposing candle before a displacement move, used to define a potential reaction zone." },
  { term: "Acceptance", match: ["acceptance"], body: "Sustained trade beyond a boundary — repeated closes and continued structure that weaken a rejection thesis." },
  { term: "Invalidation", match: ["invalidation"], body: "The exact structural price that proves a decision's thesis wrong." },
  { term: "1R", match: ["1r", "risk unit"], body: "R is a normalized unit of planned risk. +2R means twice the planned risk was gained; -1R means it was lost." },
  { term: "Position size", match: ["position size"], body: "How much exposure fits the risk limit — calculated after invalidation is drawn, always rounded down." },
];

export function findGlossaryEntry(term: string): GlossaryEntry | undefined {
  const needle = term.toLowerCase();
  return glossary.find((g) => g.term.toLowerCase() === needle);
}
