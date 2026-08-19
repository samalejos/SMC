import Link from "next/link";
import type { Metadata } from "next";
import { beginnerBridge, depthModules, phases } from "@/lib/content/depth-library";

export const metadata: Metadata = {
  title: "Depth Library · SMC Decision Lab",
};

export default function LearnPage() {
  const readyModules = depthModules.filter((m) => m.status === "ready");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <span className="text-xs font-bold uppercase tracking-wide text-accent">Five-Track Curriculum</span>
      <h1 className="mt-2 text-2xl font-bold text-text sm:text-3xl">Core Interactive Course</h1>
      <p className="mt-3 text-sm text-text-muted">
        {readyModules.length} modules, fully built — real interactive charts, not static screenshots. Not assumed
        prerequisites — these go deeper once you&apos;re practicing a stage from{" "}
        <Link href="/start/beginner-academy" className="text-accent underline decoration-dotted underline-offset-2">
          Beginner Academy
        </Link>
        .
      </p>

      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        {readyModules.map((mod) => (
          <Link
            key={mod.slug}
            href={`/learn/${mod.slug}`}
            className="flex items-start gap-2.5 rounded-lg border border-border bg-bg-card p-3 hover:border-accent"
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 text-[11px] font-bold text-accent">
              {mod.number}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm text-text">{mod.title}</span>
              <span className="text-[11px] text-text-muted">{mod.phase}</span>
            </span>
          </Link>
        ))}
      </div>

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
                const ready = mod.status === "ready";
                return (
                  <Link
                    key={n}
                    href={`/learn/${mod.slug}`}
                    className={`rounded-full border px-2 py-0.5 ${ready ? "border-border bg-bg-card text-text-muted hover:border-accent hover:text-text" : "border-dashed border-border/60 bg-transparent text-text-muted/60"}`}
                  >
                    {n}. {mod.title.split(":")[0].split("—")[0].trim()}
                    {!ready && " (soon)"}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 border-t border-border pt-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-text-muted">Advanced Library Roadmap</h2>
        <p className="mt-1 text-xs text-text-muted">
          {depthModules.length - readyModules.length} more modules planned across the same five phases, ported next.
        </p>
        <div className="mt-4 space-y-4">
          {phases.map((phase) => {
            const modules = phase.numbers.map((n) => depthModules.find((m) => m.number === n)!).filter((m) => m.status !== "ready");
            if (modules.length === 0) return null;
            return (
              <div key={phase.name}>
                <h3 className="text-xs font-bold text-text-muted">{phase.name}</h3>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {modules.map((mod) => (
                    <Link
                      key={mod.slug}
                      href={`/learn/${mod.slug}`}
                      className="rounded-full border border-dashed border-border px-2 py-0.5 text-[11px] text-text-muted hover:border-accent hover:text-text"
                    >
                      {mod.number}. {mod.title.split(":")[0].split("—")[0].trim()}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
