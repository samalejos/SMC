export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export type Overlay =
  | { kind: "priceLine"; price: number; color: string; label: string; dashed?: boolean }
  | {
      kind: "box";
      time1: number;
      time2: number;
      price1: number;
      price2: number;
      color: string;
      borderColor: string;
      label?: string;
    }
  | { kind: "marker"; time: number; price: number; color: string; text: string }
  | { kind: "pulseCandle"; time: number; label?: string }
  | {
      kind: "tradePath";
      direction: "long" | "short";
      entryTime: number;
      entryPrice: number;
      exitTime: number;
      exitPrice: number;
      color: string;
    };

export interface SceneStep {
  id: string;
  chip: string;
  title: string;
  body: string;
  overlays: Overlay[];
}

export interface ChartSceneData {
  candles: Candle[];
  steps: SceneStep[];
  caption: string;
}
