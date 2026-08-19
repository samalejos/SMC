const ITEMS = [
  { color: "var(--bull)", label: "Bullish / passed" },
  { color: "var(--bear)", label: "Bearish / failed" },
  { color: "var(--liq)", label: "Liquidity / location" },
  { color: "var(--accent)", label: "Structure / key concept" },
  { color: "var(--warn)", label: "Warning / invalidation" },
];

export function LegendStrip() {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-lg border border-border bg-bg-card px-3 py-2 text-xs text-text-muted">
      {ITEMS.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
          {item.label}
        </span>
      ))}
    </div>
  );
}
