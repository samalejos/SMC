import type { Metadata } from "next";
import { glossary } from "@/lib/content/glossary";

export const metadata: Metadata = {
  title: "Reference · SMC Decision Lab",
};

export default function ReferencePage() {
  const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-text">Reference</h1>
      <p className="mt-2 text-sm text-text-muted">
        Every term used across the curriculum, defined once. Lessons link here, or you can tap a term
        in place wherever it appears in a lesson — the definition never has to be repeated.
      </p>
      <dl className="mt-8 grid gap-3 sm:grid-cols-2">
        {sorted.map((c) => (
          <div key={c.term} id={c.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="rounded-lg border border-border bg-bg-card p-3">
            <dt className="text-sm font-bold uppercase tracking-wide text-accent">{c.term}</dt>
            <dd className="mt-1 text-sm text-text-muted">{c.body}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
