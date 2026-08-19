import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { ProgressProvider } from "@/lib/progress";

export const metadata: Metadata = {
  title: "SMC Methodology & Decision Lab",
  description: "A beginner-first market education system that separates observation, classification, decision quality and performance evidence.",
};

const navLinks = [
  { href: "/learn", label: "Learn" },
  { href: "/labs/cold-chart-assessment", label: "Assessment" },
  { href: "/reference", label: "Reference" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ProgressProvider>
          <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur">
            <nav className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-3 sm:px-6">
              <Link href="/" className="text-sm font-bold text-text">
                SMC <span className="text-text-muted">Decision Lab</span>
              </Link>
              <div className="ml-auto flex gap-5">
                {navLinks.map((l) => (
                  <Link key={l.href} href={l.href} className="text-sm text-text-muted hover:text-text">
                    {l.label}
                  </Link>
                ))}
              </div>
            </nav>
          </header>
          <main id="main-content" tabIndex={-1} className="flex-1">
            {children}
          </main>
          <footer className="border-t border-border px-4 py-8 text-center text-xs text-text-muted">
            Educational use only. Futures involve substantial risk. No performance outcome is promised.
          </footer>
        </ProgressProvider>
      </body>
    </html>
  );
}
