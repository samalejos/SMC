"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  createChart,
  CandlestickSeries,
  createSeriesMarkers,
  type IChartApi,
  type ISeriesApi,
  type IPriceLine,
  type ISeriesMarkersPluginApi,
  type Time,
  type UTCTimestamp,
} from "lightweight-charts";
import type { Candle, ChartSceneData, Overlay } from "@/lib/chart/types";

const COLORS = {
  bull: "#22c55e",
  bear: "#ef4444",
  liq: "#3b82f6",
  accent: "#a78bfa",
  warn: "#f59e0b",
  text: "#e7ecf3",
  textMuted: "#8b9bb4",
  border: "#2d3a4f",
};

interface Positioned {
  overlay: Overlay;
  x1?: number;
  x2?: number;
  y1?: number;
  y2?: number;
}

function toTime(t: number): Time {
  return t as UTCTimestamp;
}

export default function LessonChart({ scene, onCandleTap }: { scene: ChartSceneData; onCandleTap?: (c: Candle) => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const markersRef = useRef<ISeriesMarkersPluginApi<Time> | null>(null);
  const priceLinesRef = useRef<IPriceLine[]>([]);

  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [positioned, setPositioned] = useState<Positioned[]>([]);
  const [tap, setTap] = useState<{ x: number; y: number; candle: Candle } | null>(null);
  const [pulsePhase, setPulsePhase] = useState(0);

  const step = scene.steps[stepIndex];

  const recalc = useCallback(() => {
    const chart = chartRef.current;
    const series = seriesRef.current;
    if (!chart || !series || !step) return;
    const next: Positioned[] = step.overlays.map((overlay) => {
      if (overlay.kind === "box") {
        return {
          overlay,
          x1: chart.timeScale().timeToCoordinate(toTime(overlay.time1)) ?? undefined,
          x2: chart.timeScale().timeToCoordinate(toTime(overlay.time2)) ?? undefined,
          y1: series.priceToCoordinate(overlay.price1) ?? undefined,
          y2: series.priceToCoordinate(overlay.price2) ?? undefined,
        };
      }
      if (overlay.kind === "pulseCandle") {
        const x = chart.timeScale().timeToCoordinate(toTime(overlay.time)) ?? undefined;
        const bar = scene.candles.find((c) => c.time === overlay.time);
        const y = bar ? series.priceToCoordinate((bar.high + bar.low) / 2) ?? undefined : undefined;
        return { overlay, x1: x, y1: y };
      }
      if (overlay.kind === "tradePath") {
        return {
          overlay,
          x1: chart.timeScale().timeToCoordinate(toTime(overlay.entryTime)) ?? undefined,
          y1: series.priceToCoordinate(overlay.entryPrice) ?? undefined,
          x2: chart.timeScale().timeToCoordinate(toTime(overlay.exitTime)) ?? undefined,
          y2: series.priceToCoordinate(overlay.exitPrice) ?? undefined,
        };
      }
      return { overlay };
    });
    setPositioned(next);
  }, [step, scene]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chart = createChart(container, {
      layout: {
        background: { color: "transparent" },
        textColor: COLORS.textMuted,
        fontFamily: "var(--font-sans)",
        attributionLogo: false,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: COLORS.border },
      },
      rightPriceScale: { borderColor: COLORS.border },
      timeScale: { visible: false, borderColor: COLORS.border },
      crosshair: {
        vertLine: { visible: false, labelVisible: false },
        horzLine: { visible: false, labelVisible: false },
      },
      handleScroll: false,
      handleScale: false,
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: COLORS.bull,
      downColor: COLORS.bear,
      borderUpColor: COLORS.bull,
      borderDownColor: COLORS.bear,
      wickUpColor: COLORS.bull,
      wickDownColor: COLORS.bear,
    });
    series.setData(scene.candles.map((c) => ({ ...c, time: toTime(c.time) })));
    chart.timeScale().fitContent();

    chartRef.current = chart;
    seriesRef.current = series;
    markersRef.current = createSeriesMarkers(series, []);

    chart.subscribeClick((param) => {
      if (!param.time || !param.point) return;
      const bar = param.seriesData.get(series) as (Candle & { time: Time }) | undefined;
      if (!bar) return;
      setTap({ x: param.point.x, y: param.point.y, candle: bar as unknown as Candle });
      onCandleTap?.(bar as unknown as Candle);
    });

    const ro = new ResizeObserver(() => {
      if (!wrapRef.current) return;
      chart.resize(wrapRef.current.clientWidth, wrapRef.current.clientHeight);
      recalc();
    });
    if (wrapRef.current) {
      chart.resize(wrapRef.current.clientWidth, wrapRef.current.clientHeight);
      ro.observe(wrapRef.current);
    }

    return () => {
      ro.disconnect();
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  useEffect(() => {
    const series = seriesRef.current;
    if (!series) return;
    priceLinesRef.current.forEach((pl) => series.removePriceLine(pl));
    priceLinesRef.current = [];
    const markerList: { time: Time; position: "aboveBar" | "belowBar"; color: string; shape: "circle"; text: string }[] = [];

    step.overlays.forEach((overlay) => {
      if (overlay.kind === "priceLine") {
        const pl = series.createPriceLine({
          price: overlay.price,
          color: overlay.color,
          lineWidth: 2,
          lineStyle: overlay.dashed ? 2 : 0,
          axisLabelVisible: true,
          title: overlay.label,
        });
        priceLinesRef.current.push(pl);
      }
      if (overlay.kind === "marker") {
        markerList.push({
          time: toTime(overlay.time),
          position: "aboveBar",
          color: overlay.color,
          shape: "circle",
          text: overlay.text,
        });
      }
    });
    markersRef.current?.setMarkers(markerList);
    setTap(null);
    recalc();
  }, [step, recalc]);

  useEffect(() => {
    if (!step.overlays.some((o) => o.kind === "pulseCandle")) return;
    const id = window.setInterval(() => setPulsePhase((p) => (p + 1) % 100), 30);
    return () => window.clearInterval(id);
  }, [step]);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setStepIndex((i) => {
        if (i >= scene.steps.length - 1) {
          setPlaying(false);
          return i;
        }
        return i + 1;
      });
    }, 2800);
    return () => window.clearInterval(id);
  }, [playing, scene.steps.length]);

  return (
    <div className="not-prose">
      <div
        ref={wrapRef}
        className="relative h-[280px] w-full overflow-hidden rounded-xl border border-border bg-bg-card sm:h-[340px]"
      >
        <div ref={containerRef} className="absolute inset-0" />
        <svg className="pointer-events-none absolute inset-0 h-full w-full">
          {positioned.map((p, i) => {
            const o = p.overlay;
            if (o.kind === "box" && p.x1 != null && p.x2 != null && p.y1 != null && p.y2 != null) {
              const x = Math.min(p.x1, p.x2);
              const w = Math.abs(p.x2 - p.x1);
              const y = Math.min(p.y1, p.y2);
              const h = Math.abs(p.y2 - p.y1);
              return (
                <g key={i}>
                  <rect x={x} y={y} width={Math.max(w, 2)} height={Math.max(h, 2)} fill={o.color} stroke={o.borderColor} strokeWidth={1.5} rx={3} />
                  {o.label && (
                    <text x={x + w / 2} y={y - 6} fill={o.borderColor} fontSize={12} fontWeight={700} textAnchor="middle">
                      {o.label}
                    </text>
                  )}
                </g>
              );
            }
            if (o.kind === "pulseCandle" && p.x1 != null && p.y1 != null) {
              const r = 22 + 6 * Math.sin((pulsePhase / 100) * Math.PI * 2);
              const opacity = 0.55 - 0.25 * Math.sin((pulsePhase / 100) * Math.PI * 2);
              return (
                <g key={i}>
                  <circle cx={p.x1} cy={p.y1} r={r} fill="none" stroke={COLORS.accent} strokeWidth={2} opacity={opacity} />
                  {o.label && (
                    <text x={p.x1} y={Math.max(p.y1 - r - 10, 14)} fill={COLORS.accent} fontSize={11} fontWeight={700} textAnchor="middle">
                      {o.label}
                    </text>
                  )}
                </g>
              );
            }
            if (o.kind === "tradePath" && p.x1 != null && p.y1 != null && p.x2 != null && p.y2 != null) {
              return (
                <g key={`${step.id}-${i}`}>
                  <line
                    x1={p.x1}
                    y1={p.y1}
                    x2={p.x2}
                    y2={p.y2}
                    stroke={o.color}
                    strokeWidth={3}
                    strokeDasharray={400}
                    strokeDashoffset={400}
                    style={{
                      animation: "smc-draw-path 1.4s ease forwards",
                    }}
                  />
                  <circle cx={p.x1} cy={p.y1} r={5} fill={o.color} />
                  <circle
                    cx={p.x2}
                    cy={p.y2}
                    r={6}
                    fill={o.color}
                    style={{ animation: "smc-fade-in 1.5s ease forwards" }}
                  />
                </g>
              );
            }
            return null;
          })}
          {tap && (
            <g>
              <line x1={tap.x} y1={0} x2={tap.x} y2={9999} stroke={COLORS.accent} strokeWidth={1} strokeDasharray="3 3" opacity={0.5} />
            </g>
          )}
        </svg>
        {tap && (
          <div
            className="absolute z-10 max-w-[190px] rounded-lg border border-accent/50 bg-bg-elevated p-2 text-[11px] leading-snug text-text shadow-lg"
            style={{ left: Math.min(tap.x + 10, 9999), top: Math.max(tap.y - 90, 4) }}
          >
            <div className="mb-1 font-semibold text-accent">Tapped candle</div>
            <div>O {tap.candle.open.toFixed(2)} · H {tap.candle.high.toFixed(2)}</div>
            <div>L {tap.candle.low.toFixed(2)} · C {tap.candle.close.toFixed(2)}</div>
            <div className={tap.candle.close >= tap.candle.open ? "text-bull" : "text-bear"}>
              {tap.candle.close >= tap.candle.open ? "Closed above open" : "Closed below open"}
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {scene.steps.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              setPlaying(false);
              setStepIndex(i);
            }}
            className={`flex h-7 min-w-7 items-center justify-center rounded-full border px-2 text-xs font-bold transition-colors ${
              i === stepIndex
                ? "border-accent bg-accent/20 text-accent"
                : "border-border bg-bg-elevated text-text-muted hover:text-text"
            }`}
            aria-current={i === stepIndex}
          >
            {s.chip}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            if (stepIndex === scene.steps.length - 1) setStepIndex(0);
            setPlaying((p) => !p);
          }}
          className="ml-auto rounded-full border border-accent/60 bg-accent/10 px-3 py-1 text-xs font-bold text-accent hover:bg-accent/20"
        >
          {playing ? "⏸ Pause walkthrough" : "▶ Play walkthrough"}
        </button>
      </div>

      <div className="mt-3 rounded-lg border border-border bg-bg-card p-3">
        <div className="text-xs font-bold uppercase tracking-wide text-accent">{step.title}</div>
        <p className="mt-1 text-sm text-text-muted">{step.body}</p>
      </div>
      <p className="mt-2 text-xs text-text-muted">{scene.caption}</p>

      <style>{`
        @keyframes smc-draw-path { to { stroke-dashoffset: 0; } }
        @keyframes smc-fade-in { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}
