import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cold-Chart Assessment · SMC Decision Lab",
};

export default function ColdChartAssessmentPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
      <span className="text-xs font-bold uppercase tracking-wide text-accent">Phase 3 · Assessment engine</span>
      <h1 className="mt-3 text-2xl font-bold text-text">The cold-chart assessment is being rebuilt next</h1>
      <p className="mt-3 text-sm text-text-muted">
        Twenty future-hidden cases, scored across five domains (Structure, Location, Reaction, Context,
        Risk/Decision), matching the legacy CCAP-SYN-1.0 pack — rebuilt on the same interactive chart engine as
        Beginner Academy instead of a static case list.
      </p>
      <Link href="/start/beginner-academy" className="mt-6 inline-block rounded-full bg-accent px-4 py-2 text-sm font-bold text-bg hover:bg-accent/90">
        Start with Beginner Academy →
      </Link>
    </div>
  );
}
