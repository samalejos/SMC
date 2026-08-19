"use client";

import { useState } from "react";
import { useProgress } from "@/lib/progress";
import type {
  Callout as CalloutT,
  ConceptCard,
  DataTable as DataTableT,
  DecisionChainStep,
  FormulaCard as FormulaCardT,
  RecallCheck as RecallCheckT,
  TruthTablePair,
} from "@/lib/content/types";

export function ConceptGrid({ concepts }: { concepts: ConceptCard[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {concepts.map((c) => (
        <div key={c.term} className="rounded-lg border border-border bg-bg-card p-3">
          <div className="text-xs text-text-muted">{c.plain}</div>
          <div className="mt-0.5 text-sm font-bold uppercase tracking-wide text-accent">{c.term}</div>
          <p className="mt-1.5 text-sm text-text-muted">{c.body}</p>
        </div>
      ))}
    </div>
  );
}

export function FormulaCardBlock({ card }: { card: FormulaCardT }) {
  return (
    <div className="rounded-lg border border-border bg-bg-card p-4">
      <h4 className="text-sm font-bold text-text">{card.heading}</h4>
      <p className="mt-1.5 text-sm text-text-muted">{card.intro}</p>
      {card.formulaLines && (
        <div className="mt-2 space-y-1">
          {card.formulaLines.map((line) => (
            <code key={line} className="block rounded bg-bg-elevated px-2 py-1 font-mono text-xs text-accent">
              {line}
            </code>
          ))}
        </div>
      )}
      <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
        {card.rules.map((r) => (
          <div key={r.label} className="rounded-md bg-bg-elevated p-2.5">
            <div className="text-xs font-bold text-text">{r.label}</div>
            <div className="mt-0.5 text-xs text-text-muted">{r.body}</div>
          </div>
        ))}
      </div>
      {card.footnote && <p className="mt-3 text-xs text-text-muted">{card.footnote}</p>}
    </div>
  );
}

export function DataTableBlock({ table }: { table: DataTableT }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[480px] border-collapse text-sm">
        <thead>
          <tr className="bg-bg-elevated">
            {table.headers.map((h) => (
              <th key={h} className="border-b border-border px-3 py-2 text-left text-xs font-bold uppercase tracking-wide text-text-muted">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i} className="odd:bg-bg-card even:bg-bg-elevated/40">
              {row.map((cell, j) => (
                <td key={j} className="border-b border-border/60 px-3 py-2 align-top text-text-muted">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TruthTableBlock({ pair }: { pair: TruthTablePair }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-lg border border-liq/40 bg-liq/10 p-3">
        <div className="text-xs font-bold uppercase tracking-wide text-liq">{pair.observedLabel}</div>
        <p className="mt-1 text-sm text-text-muted">{pair.observed}</p>
      </div>
      <div className="rounded-lg border border-warn/40 bg-warn/10 p-3">
        <div className="text-xs font-bold uppercase tracking-wide text-warn">{pair.interpretedLabel}</div>
        <p className="mt-1 text-sm text-text-muted">{pair.interpreted}</p>
      </div>
    </div>
  );
}

export function CalloutBlock({ callout }: { callout: CalloutT }) {
  const toneClasses = {
    warn: "border-warn/40 bg-warn/10 text-warn",
    liq: "border-liq/40 bg-liq/10 text-liq",
    bull: "border-bull/40 bg-bull/10 text-bull",
  } as const;
  return (
    <div className={`rounded-lg border p-3 ${toneClasses[callout.tone]}`}>
      <div className="text-xs font-bold uppercase tracking-wide">{callout.heading}</div>
      <p className="mt-1 text-sm text-text-muted">{callout.body}</p>
    </div>
  );
}

export function DecisionChainBlock({ steps }: { steps: DecisionChainStep[] }) {
  return (
    <ol className="space-y-2.5">
      {steps.map((s, i) => (
        <li key={s.heading} className="flex gap-3 rounded-lg border border-border bg-bg-card p-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-bg">
            {i + 1}
          </span>
          <div>
            <div className="text-sm font-bold text-text">{s.heading}</div>
            <div className="mt-0.5 text-sm text-text-muted">{s.body}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function RecallCheckBlock({ check }: { check: RecallCheckT }) {
  const { recalls, commitRecall } = useProgress();
  const existing = recalls[check.id];
  const [value, setValue] = useState(existing?.answer ?? "");
  const [revealed, setRevealed] = useState(Boolean(existing));

  return (
    <div className="rounded-lg border border-accent/30 bg-bg-card p-4">
      <div className="text-xs font-bold uppercase tracking-wide text-accent">Recall check</div>
      <p className="mt-1.5 text-sm text-text">{check.prompt}</p>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={check.placeholder}
        rows={3}
        className="mt-2.5 w-full rounded-md border border-border bg-bg-elevated p-2.5 text-sm text-text placeholder:text-text-muted/60 focus:border-accent focus:outline-none"
      />
      <div className="mt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            commitRecall(check.id, value);
            setRevealed(true);
          }}
          className="rounded-full border border-accent bg-accent/10 px-3 py-1 text-xs font-bold text-accent hover:bg-accent/20"
        >
          Commit and compare
        </button>
        <span className="text-xs text-text-muted">Your answer stays in this browser.</span>
      </div>
      {revealed && (
        <div className="mt-3 border-t border-dashed border-border pt-3 text-sm text-text-muted">
          <strong className="text-text">Model response:</strong> {check.modelAnswer}
        </div>
      )}
    </div>
  );
}
