"use client";

import { useState } from "react";
import { useProgress } from "@/lib/progress";
import { GlossaryText } from "@/components/diagrams/InlineTerm";
import { TrendGlyph, ComparePanelsBlock, MeterBarBlock, StackFitBlock, FlowChartBlock } from "@/components/diagrams/Diagrams";
import { MicroDiagramGrid } from "@/components/diagrams/MicroDiagrams";
import LessonChart from "@/components/chart/LessonChart";
import type { ChartSceneData } from "@/lib/chart/types";
import type {
  Callout as CalloutT,
  ConceptCard,
  DataTable as DataTableT,
  RecallCheck as RecallCheckT,
  TruthTablePair,
  VisualBlock,
} from "@/lib/content/types";

export function ConceptGrid({ concepts }: { concepts: ConceptCard[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {concepts.map((c) => (
        <div key={c.term} className="rounded-lg border border-border bg-bg-card p-3">
          <div className="text-xs text-text-muted">{c.plain}</div>
          <div className="mt-0.5 flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-accent">
            {c.glyph && <TrendGlyph kind={c.glyph} />}
            {c.term}
          </div>
          <p className="mt-1.5 text-sm text-text-muted">
            <GlossaryText text={c.body} />
          </p>
        </div>
      ))}
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
      {table.caption && <div className="border-t border-border bg-bg-card px-3 py-1.5 text-xs text-text-muted">{table.caption}</div>}
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
      <p className="mt-1 text-sm text-text-muted">
        <GlossaryText text={callout.body} />
      </p>
    </div>
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

export function LessonBlockList({ blocks, scene }: { blocks: VisualBlock[]; scene?: ChartSceneData }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i} className="text-sm leading-relaxed text-text-muted">
                <GlossaryText text={block.text} />
              </p>
            );
          case "chart":
            return scene ? <LessonChart key={i} scene={scene} /> : null;
          case "microDiagrams":
            return <MicroDiagramGrid key={i} items={block.items} />;
          case "conceptCards":
            return <ConceptGrid key={i} concepts={block.concepts} />;
          case "comparePanels":
            return <ComparePanelsBlock key={i} spec={block.spec} />;
          case "meterBar":
            return <MeterBarBlock key={i} spec={block.spec} />;
          case "stackFit":
            return <StackFitBlock key={i} spec={block.spec} />;
          case "flowChart":
            return <FlowChartBlock key={i} heading={block.heading} steps={block.steps} />;
          case "truthTable":
            return <TruthTableBlock key={i} pair={block.pair} />;
          case "dataTable":
            return <DataTableBlock key={i} table={block.table} />;
          case "callout":
            return <CalloutBlock key={i} callout={block.callout} />;
          case "recallCheck":
            return <RecallCheckBlock key={i} check={block.check} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
