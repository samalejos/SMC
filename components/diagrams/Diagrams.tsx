import type { ComparePanelsSpec, FlowStep, MeterBarSpec, PanelSpec, StackFitSpec } from "@/lib/content/types";

const C = {
  bull: "#22c55e",
  bear: "#ef4444",
  warn: "#f59e0b",
  accent: "#a78bfa",
  muted: "#8b9bb4",
  border: "#2d3a4f",
};

const TONE = { bull: C.bull, bear: C.bear, warn: C.warn } as const;

export function TrendGlyph({ kind }: { kind: "up" | "down" | "flat" }) {
  const paths = {
    up: "M2,20 L10,12 L16,16 L26,4",
    down: "M2,4 L10,12 L16,8 L26,20",
    flat: "M2,12 L10,8 L16,16 L26,12",
  };
  const color = kind === "up" ? C.bull : kind === "down" ? C.bear : C.muted;
  return (
    <svg viewBox="0 0 28 24" className="h-4 w-5 shrink-0" aria-hidden="true">
      <path d={paths[kind]} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MiniPanel({ panel }: { panel: PanelSpec }) {
  const min = Math.min(...panel.points);
  const max = Math.max(...panel.points);
  const span = max - min || 1;
  const w = 200;
  const h = 70;
  const step = w / (panel.points.length - 1);
  const coords = panel.points.map((p, i) => `${i * step},${h - ((p - min) / span) * h}`).join(" ");
  const color = TONE[panel.verdict];
  return (
    <div className="rounded-lg border p-3" style={{ borderColor: `${color}66`, background: `${color}14` }}>
      <div className="text-xs font-bold uppercase tracking-wide" style={{ color }}>
        {panel.label}
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-2 h-16 w-full">
        <polyline points={coords} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="mt-1 text-xs text-text-muted">{panel.note}</p>
    </div>
  );
}

export function ComparePanelsBlock({ spec }: { spec: ComparePanelsSpec }) {
  return (
    <div>
      <h4 className="mb-2 text-sm font-bold text-text">{spec.heading}</h4>
      <div className="grid gap-3 sm:grid-cols-2">
        <MiniPanel panel={spec.left} />
        <MiniPanel panel={spec.right} />
      </div>
    </div>
  );
}

export function MeterBarBlock({ spec }: { spec: MeterBarSpec }) {
  const color = spec.verdict === "pass" ? C.bull : C.bear;
  return (
    <div className="rounded-lg border border-border bg-bg-card p-4">
      <h4 className="text-sm font-bold text-text">{spec.heading}</h4>
      <p className="mt-1 text-sm text-text-muted">{spec.intro}</p>
      <div className="relative mt-4 h-6 w-full overflow-hidden rounded-full bg-bg-elevated">
        <div className="h-full rounded-full" style={{ width: `${Math.min(spec.valuePct, 100)}%`, background: color }} />
        <div
          className="absolute top-0 h-full w-0.5 bg-text"
          style={{ left: `${spec.thresholdPct}%` }}
          title={`Threshold ${spec.thresholdPct}%`}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-xs text-text-muted">
        <span style={{ color }} className="font-bold">
          {spec.valueLabel} ({spec.verdict === "pass" ? spec.passLabel : spec.failLabel})
        </span>
        <span>threshold {spec.thresholdPct}%</span>
      </div>
    </div>
  );
}

export function StackFitBlock({ spec }: { spec: StackFitSpec }) {
  const segments = Math.ceil(spec.budget / spec.unit) + 1;
  return (
    <div className="rounded-lg border border-border bg-bg-card p-4">
      <h4 className="text-sm font-bold text-text">{spec.heading}</h4>
      <p className="mt-1 text-sm text-text-muted">{spec.intro}</p>
      <div className="relative mt-4 h-8 w-full overflow-hidden rounded-md border border-border bg-bg-elevated">
        <div
          className="absolute inset-y-0 left-0 border-r-2 border-dashed border-warn"
          style={{ width: `${(spec.budget / (segments * spec.unit)) * 100}%` }}
        />
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className="absolute inset-y-0 flex items-center justify-center border-r border-bg text-[10px] font-bold text-bg"
            style={{
              left: `${(i / segments) * 100}%`,
              width: `${(1 / segments) * 100}%`,
              background: i < spec.fits ? C.bull : `${C.bear}99`,
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex justify-between text-xs text-text-muted">
        <span className="font-bold text-bull">{spec.fits} contracts fit</span>
        <span>
          {spec.budgetLabel} budget ÷ {spec.unitLabel} each
        </span>
      </div>
    </div>
  );
}

export function FlowChartBlock({ heading, steps }: { heading: string; steps: FlowStep[] }) {
  return (
    <div>
      <h4 className="mb-2 text-sm font-bold text-text">{heading}</h4>
      <div className="space-y-0">
        {steps.map((s, i) => {
          const color = s.branch === "reject" ? C.bear : s.branch === "pass" ? C.bull : C.accent;
          return (
            <div key={s.label}>
              <div className="flex items-start gap-3 rounded-lg border p-3" style={{ borderColor: `${color}55`, background: `${color}12` }}>
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-bg" style={{ background: color }}>
                  {i + 1}
                </span>
                <div>
                  <div className="text-sm font-bold text-text">{s.label}</div>
                  <div className="mt-0.5 text-sm text-text-muted">{s.body}</div>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="flex justify-start pl-6">
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <path d="M8,0 L8,14 M3,9 L8,14 L13,9" fill="none" stroke={C.border} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
