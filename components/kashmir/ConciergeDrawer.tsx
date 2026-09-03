"use client";

import { forwardRef, useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { brand, journeyOptions } from "./data";
import { useConcierge } from "./ConciergeContext";

const EASE = [0.16, 1, 0.3, 1] as const;
const PARTY = ["Two travellers", "A family", "A private group", "Solo"];

export default function ConciergeDrawer() {
  const { open, journey, closeConcierge } = useConcierge();
  const reduce = useReducedMotion();
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  // The select defaults to the journey the visitor arrived from; once they pick
  // something else, their choice (the override) wins until the drawer resets.
  const [journeyOverride, setJourneyOverride] = useState<string | null>(null);
  const selectedJourney =
    journeyOverride ?? (journey && journeyOptions.includes(journey) ? journey : journeyOptions[0]);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeConcierge();
    if (open) {
      window.addEventListener("keydown", onKey);
      const t = setTimeout(() => firstFieldRef.current?.focus(), 350);
      return () => {
        window.removeEventListener("keydown", onKey);
        clearTimeout(t);
      };
    }
  }, [open, closeConcierge]);

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setSent(false);
        setErrors({});
        setJourneyOverride(null);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [open]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(data.get("name") || "").trim()) next.name = "Please share your name.";
    const email = String(data.get("email") || "").trim();
    if (!email) next.email = "Please share an email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "That email doesn't look right.";
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    setErrors({});
    // High-touch lead capture: in production this posts to the concierge CRM.
    setSent(true);
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] k-root" role="dialog" aria-modal="true" aria-label="Plan your journey">
          <motion.button
            type="button"
            aria-label="Close"
            onClick={closeConcierge}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[#201d18]/45 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: reduce ? 0 : "100%", opacity: reduce ? 0 : 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: reduce ? 0 : "100%", opacity: reduce ? 0 : 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="absolute right-0 top-0 flex h-full w-full max-w-[520px] flex-col bg-[var(--paper)]"
          >
            {/* header */}
            <div className="flex items-start justify-between border-b k-hair px-7 py-6 md:px-10">
              <div>
                <p className="k-label mb-2">The Concierge</p>
                <h2 className="k-serif text-[2rem] leading-none text-[var(--ink)]">Plan your journey</h2>
              </div>
              <button
                type="button"
                onClick={closeConcierge}
                aria-label="Close"
                className="mt-1 text-[var(--ink)] transition-opacity hover:opacity-60"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-7 py-8 md:px-10">
              {sent ? (
                <div className="flex h-full flex-col items-start justify-center gap-5">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--pine)] text-[var(--pine)]">
                    <Check size={22} />
                  </span>
                  <h3 className="k-serif text-[2rem] leading-tight text-[var(--ink)]">
                    Your enquiry is with us.
                  </h3>
                  <p className="k-body max-w-sm">
                    A Srinagar-born specialist will write to you within one working day to begin shaping
                    your itinerary — unhurried, and entirely private. With gratitude.
                  </p>
                  <button
                    type="button"
                    onClick={closeConcierge}
                    className="k-sweep mt-2 k-label !tracking-[0.16em] text-[var(--ink)]"
                  >
                    Return to the Vale
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                  <p className="k-body !text-[0.95rem]">
                    Tell us a little, and we will begin the conversation. No obligation, no noise.
                  </p>

                  <KField label="Full name" name="name" ref={firstFieldRef} error={errors.name} />
                  <KField label="Email" name="email" type="email" error={errors.email} />

                  <label className="flex flex-col gap-2">
                    <span className="k-label !tracking-[0.14em]">Journey of interest</span>
                    <select
                      name="journey"
                      value={selectedJourney}
                      onChange={(e) => setJourneyOverride(e.target.value)}
                      className="k-input appearance-none"
                    >
                      {journeyOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <KField label="Preferred dates" name="dates" placeholder="e.g. Sept 2026" />
                    <label className="flex flex-col gap-2">
                      <span className="k-label !tracking-[0.14em]">Party</span>
                      <select name="party" defaultValue={PARTY[0]} className="k-input appearance-none">
                        {PARTY.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label className="flex flex-col gap-2">
                    <span className="k-label !tracking-[0.14em]">A few words</span>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="What would make this journey feel like yours?"
                      className="k-input resize-none"
                    />
                  </label>

                  <button
                    type="submit"
                    className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-7 py-4 text-[var(--paper)] transition-colors duration-300 hover:bg-[var(--pine-deep)]"
                  >
                    <span className="k-label !tracking-[0.16em] text-current">Send to the concierge</span>
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  <p className="k-num text-center text-[var(--stone)]">
                    Or write to us — {brand.email}
                  </p>
                </form>
              )}
            </div>
          </motion.aside>

          <style>{`
            .k-input {
              width: 100%;
              background: transparent;
              border: 0;
              border-bottom: 1px solid var(--line-strong);
              color: var(--ink);
              padding: 0.65rem 0;
              font-family: "General Sans", sans-serif;
              font-size: 1rem;
              border-radius: 0;
              transition: border-color 0.3s ease;
            }
            .k-input::placeholder { color: var(--stone-light); }
            .k-input:focus { outline: none; border-color: var(--ink); }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
}

const KField = forwardRef<
  HTMLInputElement,
  { label: string; name: string; type?: string; placeholder?: string; error?: string }
>(function KField({ label, name, type = "text", placeholder, error }, ref) {
  return (
    <label className="flex flex-col gap-2">
      <span className="k-label !tracking-[0.14em]">{label}</span>
      <input
        ref={ref}
        name={name}
        type={type}
        placeholder={placeholder}
        className="k-input"
        style={error ? { borderColor: "var(--pine)" } : undefined}
      />
      {error && <span className="k-num text-[var(--pine)]">{error}</span>}
    </label>
  );
});
