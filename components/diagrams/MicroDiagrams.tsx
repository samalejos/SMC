import type { MicroDiagramKind, MicroDiagramSpec } from "@/lib/content/types";

const C = {
  bull: "#22c55e",
  bear: "#ef4444",
  liq: "#3b82f6",
  accent: "#a78bfa",
  warn: "#f59e0b",
  text: "#e7ecf3",
  muted: "#8b9bb4",
  border: "#2d3a4f",
};

function InstrumentSvg() {
  return (
    <svg viewBox="0 0 260 130" className="h-full w-full">
      <rect x="10" y="15" width="240" height="100" rx="12" fill="#1a2332" stroke={C.accent} strokeWidth="2" />
      <text x="30" y="60" fill={C.text} fontSize="30" fontWeight="800">MNQ</text>
      <text x="30" y="82" fill={C.muted} fontSize="12">Micro E-mini Nasdaq-100</text>
      <text x="30" y="100" fill={C.accent} fontSize="12" fontWeight="700">Dec contract · symbol + month</text>
      <circle cx="215" cy="45" r="16" fill="none" stroke={C.liq} strokeWidth="2" />
      <text x="215" y="50" fill={C.liq} fontSize="14" fontWeight="800" textAnchor="middle">$</text>
    </svg>
  );
}

function TickRulerSvg() {
  const ticks = [0, 1, 2, 3, 4];
  return (
    <svg viewBox="0 0 260 110" className="h-full w-full">
      <line x1="20" y1="55" x2="240" y2="55" stroke={C.muted} strokeWidth="2" />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={20 + t * 55} y1="45" x2={20 + t * 55} y2="65" stroke={C.accent} strokeWidth="2" />
          <text x={20 + t * 55} y="82" fill={C.muted} fontSize="10" textAnchor="middle">
            {(20000 + t * 0.25).toFixed(2)}
          </text>
        </g>
      ))}
      <text x="130" y="20" fill={C.accent} fontSize="13" fontWeight="700" textAnchor="middle">1.00 point = 4 ticks</text>
      <text x="130" y="102" fill={C.bull} fontSize="12" fontWeight="700" textAnchor="middle">$2.00 per point · MNQ</text>
    </svg>
  );
}

function SessionClockSvg() {
  return (
    <svg viewBox="0 0 260 110" className="h-full w-full">
      <circle cx="55" cy="55" r="38" fill="none" stroke={C.liq} strokeWidth="2.5" />
      <line x1="55" y1="55" x2="55" y2="28" stroke={C.text} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="55" y1="55" x2="74" y2="65" stroke={C.text} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="55" cy="55" r="2.5" fill={C.accent} />
      <rect x="115" y="30" width="125" height="50" rx="8" fill="#1a2332" stroke={C.border} strokeWidth="1.5" />
      <text x="177" y="52" fill={C.text} fontSize="14" fontWeight="700" textAnchor="middle">5m chart</text>
      <text x="177" y="70" fill={C.accent} fontSize="11" fontWeight="700" textAnchor="middle">America/New_York</text>
    </svg>
  );
}

function CandleAnatomySvg() {
  return (
    <svg viewBox="0 0 260 150" className="h-full w-full">
      <line x1="130" y1="15" x2="130" y2="135" stroke={C.bull} strokeWidth="3" />
      <rect x="105" y="55" width="50" height="55" rx="3" fill="rgba(34,197,94,.25)" stroke={C.bull} strokeWidth="2.5" />
      <text x="165" y="20" fill={C.text} fontSize="12">High</text>
      <line x1="140" y1="17" x2="158" y2="17" stroke={C.muted} />
      <text x="165" y="60" fill={C.text} fontSize="12">Close</text>
      <line x1="155" y1="57" x2="158" y2="57" stroke={C.muted} />
      <text x="165" y="112" fill={C.text} fontSize="12">Open</text>
      <line x1="155" y1="108" x2="158" y2="108" stroke={C.muted} />
      <text x="165" y="138" fill={C.text} fontSize="12">Low</text>
      <line x1="140" y1="133" x2="158" y2="133" stroke={C.muted} />
      <text x="15" y="35" fill={C.muted} fontSize="11">wick</text>
      <text x="15" y="85" fill={C.muted} fontSize="11">body</text>
    </svg>
  );
}

function TimeframeCompressionSvg() {
  const bars = [0, 1, 2, 3, 4].map((i) => ({
    x: 15 + i * 20,
    h: 20 + (i % 3) * 12,
    up: i % 2 === 0,
  }));
  return (
    <svg viewBox="0 0 260 110" className="h-full w-full">
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={60 - b.h / 2} width="10" height={b.h} fill={b.up ? C.bull : C.bear} opacity={0.85} />
      ))}
      <text x="65" y="95" fill={C.muted} fontSize="9" textAnchor="middle">five 1-min candles</text>
      <path d="M115 55 L140 55" stroke={C.accent} strokeWidth="2" markerEnd="url(#arrow)" />
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={C.accent} />
        </marker>
      </defs>
      <rect x="180" y="30" width="26" height="50" fill={C.bull} opacity={0.9} />
      <text x="193" y="95" fill={C.accent} fontSize="10" fontWeight="700" textAnchor="middle">one 5-minute candle</text>
    </svg>
  );
}

function SwingRuleSvg() {
  const pts = [
    { x: 40, h: 40, t: "H(t-1)" },
    { x: 130, h: 75, t: "H(t)" },
    { x: 220, h: 45, t: "H(t+1)" },
  ];
  return (
    <svg viewBox="0 0 260 130" className="h-full w-full">
      <line x1="20" y1="100" x2="240" y2="100" stroke={C.border} strokeWidth="1.5" />
      {pts.map((p, i) => (
        <g key={i}>
          <rect x={p.x - 8} y={100 - p.h} width="16" height={p.h} rx="2" fill={i === 1 ? C.accent : C.muted} opacity={i === 1 ? 0.9 : 0.6} />
          <text x={p.x} y="118" fill={C.muted} fontSize="10" textAnchor="middle">{p.t}</text>
        </g>
      ))}
      <path d="M55 35 L115 30" stroke={C.bull} strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M145 30 L205 40" stroke={C.bull} strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="130" y="15" fill={C.bull} fontSize="11" fontWeight="700" textAnchor="middle">swing high confirmed</text>
    </svg>
  );
}

function renderSvg(kind: MicroDiagramKind) {
  switch (kind) {
    case "instrument":
      return <InstrumentSvg />;
    case "tick-ruler":
      return <TickRulerSvg />;
    case "session-clock":
      return <SessionClockSvg />;
    case "candle-anatomy":
      return <CandleAnatomySvg />;
    case "timeframe-compression":
      return <TimeframeCompressionSvg />;
    case "swing-rule":
      return <SwingRuleSvg />;
  }
}

export function MicroDiagram({ spec }: { spec: MicroDiagramSpec }) {
  return (
    <div className="rounded-lg border border-border bg-bg-card p-3">
      <div className="h-[110px] w-full">{renderSvg(spec.kind)}</div>
      <div className="mt-2 text-xs font-bold uppercase tracking-wide text-accent">{spec.title}</div>
      <p className="mt-1 text-xs text-text-muted">{spec.caption}</p>
    </div>
  );
}

export function MicroDiagramGrid({ items }: { items: MicroDiagramSpec[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((spec) => (
        <MicroDiagram key={spec.title} spec={spec} />
      ))}
    </div>
  );
}
