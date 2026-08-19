"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress";

export function LessonProgressBar({ total }: { total: number }) {
  const { completed } = useProgress();
  const beginnerSlugs = ["before-stage-1", "stage-1", "stage-2", "stage-3", "stage-4", "stage-5", "apply"];
  const done = completed.filter((s) => beginnerSlugs.includes(s)).length;
  const pct = Math.round((done / total) * 100);
  return (
    <div className="mb-6">
      <div className="h-2 w-full overflow-hidden rounded-full bg-bg-elevated">
        <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-1.5 text-xs text-text-muted">{done} of {total} sections completed</div>
    </div>
  );
}

export function LessonCompletionChip({ slug }: { slug: string }) {
  const { isComplete } = useProgress();
  if (!isComplete(slug)) return null;
  return <span className="rounded-full bg-bull/20 px-2 py-0.5 text-xs font-bold text-bull">✓ done</span>;
}

export function LessonNextButton({ slug, nextSlug, nextLabel }: { slug: string; nextSlug: string | null; nextLabel: string | null }) {
  const { markComplete } = useProgress();
  return (
    <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-5">
      <Link href="/start/beginner-academy" className="text-sm text-text-muted hover:text-text">
        ← Back to overview
      </Link>
      {nextSlug ? (
        <Link
          href={`/start/beginner-academy/${nextSlug}`}
          onClick={() => markComplete(slug)}
          className="rounded-full bg-accent px-4 py-2 text-sm font-bold text-bg hover:bg-accent/90"
        >
          Mark understood · {nextLabel} →
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => markComplete(slug)}
          className="rounded-full bg-bull px-4 py-2 text-sm font-bold text-bg hover:bg-bull/90"
        >
          Mark Beginner Academy complete ✓
        </button>
      )}
    </div>
  );
}
