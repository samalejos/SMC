import Link from "next/link";
import type { Metadata } from "next";
import { beginnerBridge, depthModules, phases } from "@/lib/content/depth-library";

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

      <div className="mt-8 rounded-xl border border-border bg-bg-card p-4">
        <h2 className="text-sm font-bold text-text">How this connects to Beginner Academy</h2>
        <p className="mt-1 text-xs text-text-muted">Each beginner stage has depth modules that go further on the same idea. Jump straight to either side.</p>
        <div className="mt-3 space-y-1.5">
          {beginnerBridge.map((row) => (
            <div key={row.stageSlug} className="flex flex-wrap items-center gap-2 rounded-md bg-bg-elevated px-2.5 py-2 text-xs">
              <Link href={`/start/beginner-academy/${row.stageSlug}`} className="font-bold text-accent hover:underline">
                {row.stageLabel}
              </Link>
              <span className="text-text-muted">→</span>
              {row.moduleNumbers.map((n) => {
                const mod = depthModules.find((m) => m.number === n)!;
                return (
                  <Link
                    key={n}
                    href={`/learn/${mod.slug}`}
                    className="rounded-full border border-border bg-bg-card px-2 py-0.5 text-text-muted hover:border-accent hover:text-text"
                  >
                    {n}. {mod.title.split(":")[0].split("—")[0].trim()}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-8">
        {phases.map((phase) => (
          <div key={phase.name}>
            <h2 className="text-sm font-bold uppercase tracking-wide text-text">{phase.name}</h2>
            <p className="mb-2.5 mt-1 text-xs text-text-muted">{phase.description}</p>
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
