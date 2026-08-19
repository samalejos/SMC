import Link from "next/link";
import type { Metadata } from "next";
import { depthModules, phases } from "@/lib/content/depth-library";

export const metadata: Metadata = {
  title: "Depth Library · SMC Decision Lab",
};

export default function LearnPage() {
  const readyCount = depthModules.filter((m) => m.status === "ready").length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <span className="text-xs font-bold uppercase tracking-wide text-accent">Five-Track Curriculum</span>
      <h1 className="mt-2 text-2xl font-bold text-text sm:text-3xl">Depth library — 44 modules</h1>
      <p className="mt-3 text-sm text-text-muted">
        Not assumed prerequisites — these branches go deeper once you&apos;re practicing a stage from{" "}
        <Link href="/start/beginner-academy" className="text-accent underline decoration-dotted underline-offset-2">
          Beginner Academy
        </Link>
        . {readyCount} of {depthModules.length} have the full interactive treatment so far; the rest are ported next.
      </p>

      <div className="mt-8 space-y-8">
        {phases.map((phase) => (
          <div key={phase.name}>
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-text">{phase.name}</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {phase.numbers.map((n) => {
                const mod = depthModules.find((m) => m.number === n)!;
                return (
                  <Link
                    key={mod.slug}
                    href={`/learn/${mod.slug}`}
                    className="flex items-start gap-2.5 rounded-lg border border-border bg-bg-card p-3 hover:border-accent"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bg-elevated text-[11px] font-bold text-text-muted">
                      {mod.number}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm text-text">{mod.title}</span>
                      {mod.status === "coming-soon" && <span className="text-[11px] text-text-muted">Coming next</span>}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
