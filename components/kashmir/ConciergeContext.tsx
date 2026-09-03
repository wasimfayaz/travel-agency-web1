"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type ConciergeState = {
  open: boolean;
  journey?: string;
  openConcierge: (journey?: string) => void;
  closeConcierge: () => void;
};

const Ctx = createContext<ConciergeState | null>(null);

export function ConciergeProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [journey, setJourney] = useState<string | undefined>(undefined);

  const openConcierge = useCallback((j?: string) => {
    setJourney(j);
    setOpen(true);
  }, []);
  const closeConcierge = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, journey, openConcierge, closeConcierge }),
    [open, journey, openConcierge, closeConcierge]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useConcierge() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useConcierge must be used within ConciergeProvider");
  return ctx;
}
