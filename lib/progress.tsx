"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

const COMPLETION_KEY = "smc_mastery_completion_v1";
const RECALL_KEY = "smc_beginner_recall_v1";

interface RecallRecord {
  answer: string;
  committedAt: string;
}

interface ProgressContextValue {
  completed: string[];
  recalls: Record<string, RecallRecord>;
  markComplete: (slug: string) => void;
  commitRecall: (checkId: string, answer: string) => void;
  isComplete: (slug: string) => boolean;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

function loadArray(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function loadObj(key: string): Record<string, RecallRecord> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Record<string, RecallRecord>) : {};
  } catch {
    return {};
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [recalls, setRecalls] = useState<Record<string, RecallRecord>>({});

  useEffect(() => {
    // Reads localStorage after mount so the client's first render matches
    // the server (empty state) and hydration doesn't mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCompleted(loadArray(COMPLETION_KEY));
    setRecalls(loadObj(RECALL_KEY));
  }, []);

  const markComplete = useCallback((slug: string) => {
    setCompleted((prev) => {
      if (prev.includes(slug)) return prev;
      const next = [...prev, slug];
      window.localStorage.setItem(COMPLETION_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const commitRecall = useCallback((checkId: string, answer: string) => {
    setRecalls((prev) => {
      const next = { ...prev, [checkId]: { answer, committedAt: new Date().toISOString() } };
      window.localStorage.setItem(RECALL_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isComplete = useCallback((slug: string) => completed.includes(slug), [completed]);

  return (
    <ProgressContext.Provider value={{ completed, recalls, markComplete, commitRecall, isComplete }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
