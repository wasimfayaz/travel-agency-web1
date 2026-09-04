"use client";

import { forwardRef, useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { brand } from "./data";

const EASE = [0.16, 1, 0.3, 1] as const;
const DESTINATIONS = ["Kashmir", "Ladakh"] as const;
type Destination = (typeof DESTINATIONS)[number];

/**
 * The hero's "Start Your Journey" button opens this — a short, light enquiry
 * modal (Name, Phone/WhatsApp, Travellers, Destination) on the site's ivory
 * ground, rather than a dark form living permanently over the film.
 */
export default function QuickEnquiry({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduce = useReducedMotion();
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [destination, setDestination] = useState<Destination>("Kashmir");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [sentName, setSentName] = useState("");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => firstFieldRef.current?.focus(), 350);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open, onClose]);

  // Reset after the close animation so re-opening is clean.
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setSent(false);
        setErrors({});
        setDestination("Kashmir");
      }, 400);
      return () => clearTimeout(t);
    }
  }, [open]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const travellers = String(data.get("travellers") || "").trim();

    const next: Record<string, string> = {};
    if (!name) next.name = "Please add your name.";
    const digits = phone.replace(/[^\d]/g, "");
    if (!phone) next.phone = "Add a number.";
    else if (digits.length < 7 || digits.length > 15) next.phone = "Check the number.";
    const count = Number(travellers);
    if (!travellers) next.travellers = "How many travellers?";
    else if (!Number.isInteger(count) || count < 1 || count > 30) next.travellers = "Enter 1–30.";

    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    setErrors({});
    setSentName(name.split(" ")[0]);
    // In production this posts to the concierge CRM / WhatsApp Business API.
    setSent(true);
  }

  return (
    <AnimatePresence>
      {open && (
        <div
          className="k-root fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Start your journey"
        >
          <motion.button
            type="button"
            aria-label="Close"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 bg-[#201d18]/55 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : 20 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative w-full max-w-[520px] bg-[var(--paper)] px-7 py-8 sm:px-10 sm:py-10"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 text-[var(--ink)] transition-opacity hover:opacity-60"
            >
              <X size={20} />
            </button>

            {sent ? (
              <div className="flex flex-col items-start gap-4 py-6">
                <p className="k-label">Enquiry Received</p>
                <h2 className="k-serif text-[2rem] leading-tight text-[var(--ink)]">
                  Thank you, {sentName}.
                </h2>
                <p className="k-body max-w-sm">
                  A Kashmir specialist will be in touch within a day to start planning your journey.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="k-sweep mt-2 k-label !tracking-[0.16em] !text-[var(--ink)]"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <p className="k-label mb-2">Quick Enquiry</p>
                <h2 className="k-serif text-[2rem] leading-none text-[var(--ink)]">Start Your Journey</h2>
                <p className="k-body mt-3 !text-[0.9rem]">
                  A few details and a local expert will design your trip. No pressure, no spam.
                </p>

                <form onSubmit={handleSubmit} noValidate className="mt-7 flex flex-col gap-6">
                  <QField ref={firstFieldRef} id="qe-name" label="Name" name="name" autoComplete="name" error={errors.name} />
                  <QField
                    id="qe-phone"
                    label="Phone / WhatsApp"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    error={errors.phone}
                  />
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <QField
                      id="qe-travellers"
                      label="Travellers"
                      name="travellers"
                      type="number"
                      inputMode="numeric"
                      min={1}
                      max={30}
                      placeholder="2"
                      error={errors.travellers}
                      numeric
                    />
                    <fieldset>
                      <legend className="k-label !tracking-[0.14em]">Destination</legend>
                      <div className="mt-3 flex items-center gap-3 border-b border-[var(--line-strong)] pb-[0.7rem]">
                        {DESTINATIONS.map((d, i) => (
                          <span key={d} className="flex items-center gap-3">
                            {i > 0 && <span className="text-[var(--stone-light)]">/</span>}
                            <label className="cursor-pointer">
                              <input
                                type="radio"
                                name="destination"
                                value={d}
                                checked={destination === d}
                                onChange={() => setDestination(d)}
                                className="peer sr-only"
                              />
                              <span
                                className={`text-[0.95rem] transition-colors peer-focus-visible:underline peer-focus-visible:underline-offset-4 ${
                                  destination === d ? "text-[var(--ink)]" : "text-[var(--stone)]"
                                }`}
                              >
                                {d}
                              </span>
                            </label>
                          </span>
                        ))}
                      </div>
                    </fieldset>
                  </div>

                  <button
                    type="submit"
                    className="group mt-2 inline-flex items-center justify-center gap-2 bg-[var(--ink)] px-7 py-4 text-[var(--paper)] transition-colors duration-300 hover:bg-[var(--pine-deep)]"
                  >
                    <span className="k-label !tracking-[0.18em] !text-inherit">Send Enquiry</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    >
                      <path d="M7 17L17 7M17 7H9M17 7V15" />
                    </svg>
                  </button>

                  <p className="k-num text-center text-[var(--stone)]">Or WhatsApp us — {brand.phoneLabel}</p>
                </form>
              </>
            )}
          </motion.div>

          <style>{`
            .qe-input {
              width: 100%;
              margin-top: 0.7rem;
              background: transparent;
              border: 0;
              border-bottom: 1px solid var(--line-strong);
              color: var(--ink);
              padding: 0 0 0.7rem;
              font-family: "General Sans", sans-serif;
              font-size: 1rem;
              border-radius: 0;
              transition: border-color 0.3s ease;
            }
            .qe-input::placeholder { color: var(--stone-light); }
            .qe-input:focus { outline: none; border-bottom-color: var(--ink); }
            .qe-input-num::-webkit-outer-spin-button,
            .qe-input-num::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
            .qe-input-num { -moz-appearance: textfield; }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
}

type QFieldProps = {
  id: string;
  label: string;
  name: string;
  type?: string;
  inputMode?: "text" | "tel" | "numeric";
  autoComplete?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  error?: string;
  numeric?: boolean;
};

const QField = forwardRef<HTMLInputElement, QFieldProps>(function QField(
  { id, label, name, type = "text", inputMode, autoComplete, placeholder, min, max, error, numeric },
  ref
) {
  return (
    <div>
      <label htmlFor={id} className="k-label !tracking-[0.14em]">
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        min={min}
        max={max}
        aria-invalid={error ? true : undefined}
        className={`qe-input ${numeric ? "qe-input-num" : ""}`}
        style={error ? { borderBottomColor: "var(--pine)" } : undefined}
      />
      {error && <span className="mt-1.5 block text-[0.65rem] tracking-wide text-[var(--pine)]">{error}</span>}
    </div>
  );
});
