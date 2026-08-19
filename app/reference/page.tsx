import type { Metadata } from "next";
import { beginnerAcademyLessons } from "@/lib/content/beginner-academy";

export const metadata: Metadata = {
  title: "Reference · SMC Decision Lab",
};

const extraTerms = [
  { term: "BOS · Break of Structure", body: "Price closes beyond a prior swing in the current direction. Confirms continuation of the visible sequence — it does not prove the next trade wins." },
  { term: "CHoCH · Change of Character", body: "Price closes beyond a protected swing against the current direction. Warns the prior sequence may be failing — it is an alert, not an entry." },
];

export default function ReferencePage() {
  const seen = new Set<string>();
  const glossary = beginnerAcademyLessons
    .flatMap((l) => l.concepts ?? [])
    .concat(extraTerms.map((t) => ({ plain: "", term: t.term, body: t.body })))
    .filter((c) => {
      if (seen.has(c.term)) return false;
      seen.add(c.term);
      return true;
    })
    .sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-text">Reference</h1>
      <p className="mt-2 text-sm text-text-muted">
        Every term used across the curriculum, defined once. Lessons link here instead of repeating the
        definition inline.
      </p>
      <dl className="mt-8 grid gap-3 sm:grid-cols-2">
        {glossary.map((c) => (
          <div key={c.term} className="rounded-lg border border-border bg-bg-card p-3">
            <dt className="text-sm font-bold uppercase tracking-wide text-accent">{c.term}</dt>
            <dd className="mt-1 text-sm text-text-muted">{c.body}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
