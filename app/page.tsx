import Link from "next/link";

const stats = [
  { value: "7", label: "beginner sections, each with a real interactive chart" },
  { value: "6", label: "chart-reading stages, dependency-ordered" },
  { value: "5", label: "decision gates before any position is sized" },
];

const pathways = [
  {
    href: "/start/beginner-academy",
    kicker: "Start here",
    title: "Beginner Academy",
    body: "Build the visual language in dependency order before touching the operating card. Real charts you tap, not static screenshots.",
    cta: "Open route",
  },
  {
    href: "/learn",
    kicker: "Five-Track Curriculum",
    title: "Depth library",
    body: "Move from chart literacy through evidence, risk, simulation and controlled decision practice.",
    cta: "Open route",
  },
  {
    href: "/labs/cold-chart-assessment",
    kicker: "Cold-Chart Assessment",
    title: "Future-hidden decisions",
    body: "Work a synthetic chart with the future hidden. Commit before you see what happened next.",
    cta: "Open route",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <span className="text-xs font-bold uppercase tracking-wide text-accent">
        Build 12 · Commercial architecture
      </span>
      <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight text-text sm:text-4xl">
        Build the decision <em className="text-accent not-italic">before</em> the trade.
      </h1>
      <p className="mt-4 max-w-xl text-sm text-text-muted sm:text-base">
        A beginner-first market education system that separates observation, classification, decision quality
        and performance evidence.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-bg-card p-4">
            <div className="text-2xl font-bold text-accent">{s.value}</div>
            <div className="mt-1 text-xs text-text-muted">{s.label}</div>
          </div>
        ))}
      </div>

      <h2 className="mt-14 mb-4 text-lg font-bold text-text">Three ways in</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {pathways.map((p) => (
          <Link key={p.href} href={p.href} className="flex flex-col rounded-xl border border-border bg-bg-card p-5 hover:border-accent">
            <span className="text-xs font-bold uppercase tracking-wide text-accent">{p.kicker}</span>
            <span className="mt-1.5 text-base font-bold text-text">{p.title}</span>
            <span className="mt-2 flex-1 text-sm text-text-muted">{p.body}</span>
            <span className="mt-4 text-sm font-bold text-accent">{p.cta} →</span>
          </Link>
        ))}
      </div>

      <div className="mt-14 rounded-xl border border-border bg-bg-card p-5">
        <h2 className="text-sm font-bold uppercase tracking-wide text-accent">Teaching philosophy</h2>
        <p className="mt-2 text-sm text-text-muted">
          Observation first. Commitment before feedback. What price printed, how it&apos;s classified, which
          decisions are permitted, and whether the reasoning held up — kept separate from whether it happened
          to make money.
        </p>
      </div>
    </div>
  );
}
