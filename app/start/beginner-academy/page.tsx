import Link from "next/link";
import type { Metadata } from "next";
import { beginnerAcademyLessons } from "@/lib/content/beginner-academy";
import { LessonCompletionChip, LessonProgressBar } from "@/components/lesson/LessonNav";

export const metadata: Metadata = {
  title: "Beginner Academy · SMC Decision Lab",
};

const startChoices = [
  { href: "/start/beginner-academy/before-stage-1", title: "I am completely new", label: "Begin before Stage 1", body: "Learn contracts, long/short, points, ticks, orders, candles and the difference between observation and interpretation." },
  { href: "/start/beginner-academy/stage-2", title: "I can already read candles", label: "Begin at Stage 2", body: "Learn direction, ranges, structure breaks and why a label is not a prediction." },
  { href: "/start/beginner-academy/apply", title: "I know the SMC vocabulary", label: "Test the full sequence", body: "Work through one synthetic chart without skipping location, reaction, invalidation or risk." },
];

export default function BeginnerAcademyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <span className="text-xs font-bold uppercase tracking-wide text-accent">Start here · no prior SMC knowledge required</span>
      <h1 className="mt-2 text-2xl font-bold text-text sm:text-3xl">
        Do not begin with the System Card. First learn what the questions mean.
      </h1>
      <p className="mt-3 text-sm text-text-muted">
        The beginner path teaches one visual question at a time and introduces the SMC term only after the
        plain-language idea is understood. {beginnerAcademyLessons.length} guided sections, each with a real
        interactive chart — no acronym is used before its plain-language idea is taught first.
      </p>

      <LessonProgressBar total={beginnerAcademyLessons.length} />

      <div className="grid gap-3 sm:grid-cols-3">
        {startChoices.map((c) => (
          <Link key={c.href} href={c.href} className="rounded-lg border border-border bg-bg-card p-4 hover:border-accent">
            <strong className="block text-sm text-text">{c.title}</strong>
            <b className="mt-1 block text-xs font-bold text-accent">{c.label}</b>
            <span className="mt-1.5 block text-xs text-text-muted">{c.body}</span>
          </Link>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-warn/40 bg-warn/10 p-3">
        <strong className="text-xs font-bold uppercase tracking-wide text-warn">Beginner rule</strong>
        <p className="mt-1 text-sm text-text-muted">
          Never memorize an acronym you cannot explain in ordinary language. If &ldquo;BOS,&rdquo; &ldquo;FVG,&rdquo;
          &ldquo;POI&rdquo; or &ldquo;DOL&rdquo; interrupts the thought, return to the matching stage below instead of guessing.
        </p>
      </div>

      <h2 className="mt-10 mb-3 text-lg font-bold text-text">The dependency chain</h2>
      <p className="mb-4 text-sm text-text-muted">
        Move forward when the stage question can be answered on a fresh chart without looking at the definition —
        not because a page was read.
      </p>
      <ol className="space-y-2">
        {beginnerAcademyLessons.map((lesson) => (
          <li key={lesson.slug}>
            <Link
              href={`/start/beginner-academy/${lesson.slug}`}
              className="flex items-center gap-3 rounded-lg border border-border bg-bg-card p-3 hover:border-accent"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bg-elevated text-xs font-bold text-text-muted">
                {lesson.index}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-bold uppercase tracking-wide text-accent">{lesson.stageKicker}</span>
                <span className="block truncate text-sm text-text">{lesson.title}</span>
              </span>
              <LessonCompletionChip slug={lesson.slug} />
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
