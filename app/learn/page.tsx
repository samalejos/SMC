import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn · SMC Decision Lab",
};

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
      <span className="text-xs font-bold uppercase tracking-wide text-accent">Phase 2 · Depth library</span>
      <h1 className="mt-3 text-2xl font-bold text-text">The five-track curriculum is being ported next</h1>
      <p className="mt-3 text-sm text-text-muted">
        Beginner Academy shipped first because it&apos;s the part everyone starts with. The 44 depth modules —
        liquidity, displacement, order blocks, risk, simulation — are being migrated from the legacy build into
        this same lesson format.
      </p>
      <Link href="/start/beginner-academy" className="mt-6 inline-block rounded-full bg-accent px-4 py-2 text-sm font-bold text-bg hover:bg-accent/90">
        Start with Beginner Academy →
      </Link>
    </div>
  );
}
