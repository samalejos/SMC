"use client";

import { useMemo, useState, Fragment, type ReactNode } from "react";
import { glossary, type GlossaryEntry } from "@/lib/content/glossary";

interface Token {
  text: string;
  entry?: GlossaryEntry;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const allMatches = glossary
  .flatMap((entry) => entry.match.map((m) => ({ m, entry })))
  .sort((a, b) => b.m.length - a.m.length);

const pattern = new RegExp(`\\b(${allMatches.map((a) => escapeRegExp(a.m)).join("|")})\\b`, "gi");

function tokenize(text: string): Token[] {
  const seen = new Set<string>();
  const result: Token[] = [];
  let lastIndex = 0;
  pattern.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    const matched = match[0];
    const idx = match.index;
    if (idx > lastIndex) result.push({ text: text.slice(lastIndex, idx) });
    const found = allMatches.find((a) => a.m.toLowerCase() === matched.toLowerCase())?.entry;
    if (found && !seen.has(found.term)) {
      seen.add(found.term);
      result.push({ text: matched, entry: found });
    } else {
      result.push({ text: matched });
    }
    lastIndex = idx + matched.length;
  }
  if (lastIndex < text.length) result.push({ text: text.slice(lastIndex) });
  return result;
}

export function InlineTerm({ entry, children }: { entry: GlossaryEntry; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="rounded font-semibold text-accent underline decoration-accent/50 decoration-dotted underline-offset-2 hover:decoration-solid"
        aria-expanded={open}
      >
        {children}
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute left-0 top-full z-20 mt-1 block w-56 rounded-lg border border-accent/40 bg-bg-elevated p-2.5 text-xs font-normal normal-case leading-snug text-text shadow-xl"
        >
          <strong className="text-accent">{entry.term}</strong>
          <span className="mt-1 block text-text-muted">{entry.body}</span>
        </span>
      )}
    </span>
  );
}

export function GlossaryText({ text }: { text: string }) {
  const tokens = useMemo(() => tokenize(text), [text]);
  return (
    <>
      {tokens.map((t, i) =>
        t.entry ? (
          <InlineTerm key={i} entry={t.entry}>
            {t.text}
          </InlineTerm>
        ) : (
          <Fragment key={i}>{t.text}</Fragment>
        )
      )}
    </>
  );
}
