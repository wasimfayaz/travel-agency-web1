"use client";

import { forwardRef, useEffect, useRef, useState, type FormEvent } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { brand } from "./data";

// Streamed directly from Pexels' CDN (free-to-use stock footage) rather than
// self-hosted — swap for /media/hero.mp4 if you'd rather bundle your own cut.
const HERO_VIDEO_SRC = "https://videos.pexels.com/video-files/18923430/18923430-uhd_2560_1440_30fps.mp4";

const EASE = [0.16, 1, 0.3, 1] as const;
const DESTINATIONS = ["Kashmir", "Ladakh"] as const;
type Destination = (typeof DESTINATIONS)[number];

/**
 * Pinned full-bleed hero, art-directed against the photograph itself: the sky
 * and treeline are left to breathe, while the brand, the headline and a very
 * short enquiry sit in the calm lower meadow — one composition, not a row of
 * UI. The enquiry strip is the hero's single conversion action.
 */
export default function Hero() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const { scrollY } = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 460], [1, 0]);

  const [destination, setDestination] = useState<Destination>("Kashmir");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [sentName, setSentName] = useState("");

  // Stop decoding frames once the curtain has covered the hero.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduce) return;

    let raf = 0;
    const sync = () => {
      raf = 0;
      const covered = window.scrollY > window.innerHeight * 1.05;
      if (covered) {
        if (!v.paused) v.pause();
      } else if (v.paused) {
        void v.play().catch(() => {});
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(sync);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);

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
    if (!travellers) next.travellers = "How many?";
    else if (!Number.isInteger(count) || count < 1 || count > 30) next.travellers = "1–30.";

    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    setErrors({});
    setSentName(name.split(" ")[0]);
    // In production this posts to the concierge CRM / WhatsApp Business API.
    setSent(true);
  }

  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 10 },
    show: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1.3, ease: EASE, delay },
    }),
  };

  return (
    <section id="top" className="sticky top-0 z-0 h-[100svh] overflow-hidden bg-[#15140f]">
      {/* film plate — a very slow, near-imperceptible breathing zoom */}
      <motion.video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay={!reduce}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
        animate={reduce ? undefined : { scale: [1, 1.015, 1] }}
        transition={reduce ? undefined : { duration: 34, repeat: Infinity, ease: "easeInOut" }}
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </motion.video>

      {/* cinematic gradients — a light veil at top for the wordmark, a deeper
          one rising from the base to seat the headline and enquiry; the middle
          of the frame (sky + treeline) stays open */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32%] bg-gradient-to-b from-[#100f0b]/45 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[64%] bg-gradient-to-t from-[#100f0b]/80 via-[#100f0b]/32 to-transparent" />

      {/* composition */}
      <motion.div style={reduce ? undefined : { opacity: contentOpacity }} className="k-on-dark relative h-full">
        <div className="mx-auto flex h-full max-w-[1560px] flex-col justify-between px-6 py-9 sm:px-10 sm:py-11 md:px-14 md:py-12 lg:px-20 lg:py-14 xl:px-24">
          {/* wordmark — quiet, top-left, allowed to breathe */}
          <motion.a
            custom={0.2}
            variants={rise}
            initial="hidden"
            animate="show"
            href="#top"
            aria-label={`${brand.name} — home`}
            className="k-serif w-fit text-[1.15rem] leading-none tracking-[0.44em] text-[var(--paper)] sm:text-[1.3rem]"
          >
            {brand.name}
          </motion.a>

          {/* lower story — headline + enquiry, anchored in the calm meadow */}
          <div className="max-w-[760px]">
            <motion.h1
              custom={0.35}
              variants={rise}
              initial="hidden"
              animate="show"
              className="k-serif max-w-[500px] text-[clamp(1.9rem,1.25rem+2.1vw,3.25rem)] font-normal leading-[1.1] tracking-[-0.01em] text-[var(--paper)]"
            >
              Discover Kashmir,
              <br />
              beyond the ordinary.
            </motion.h1>

            <motion.div custom={0.6} variants={rise} initial="hidden" animate="show" className="mt-9 md:mt-11">
              {sent ? (
                <p className="k-serif max-w-md text-[1.35rem] leading-snug text-[var(--paper)]">
                  Thank you, {sentName}. A Kashmir specialist will be in touch within a day.
                </p>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Quick enquiry"
                  className="flex flex-col gap-5 lg:flex-row lg:items-end lg:gap-8"
                >
                  <HeroField
                    ref={firstFieldRef}
                    id="hero-name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    error={errors.name}
                    className="lg:flex-1"
                  />
                  <HeroField
                    id="hero-phone"
                    label="Phone / WhatsApp"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    error={errors.phone}
                    className="lg:flex-1"
                  />
                  <HeroField
                    id="hero-travellers"
                    label="Travellers"
                    name="travellers"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={30}
                    placeholder="2"
                    error={errors.travellers}
                    className="lg:w-[92px]"
                    numeric
                  />

                  {/* destination — an editorial toggle, not a dropdown */}
                  <fieldset className="lg:shrink-0">
                    <legend className="hero-label">Destination</legend>
                    <div className="mt-[0.55rem] flex items-center gap-3 border-b border-[var(--paper)]/30 pb-[0.5rem]">
                      {DESTINATIONS.map((d, i) => (
                        <span key={d} className="flex items-center gap-3">
                          {i > 0 && <span className="text-[var(--paper)]/25">/</span>}
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
                                destination === d ? "text-[var(--paper)]" : "text-[var(--paper)]/45"
                              }`}
                            >
                              {d}
                            </span>
                          </label>
                        </span>
                      ))}
                    </div>
                  </fieldset>

                  <button
                    type="submit"
                    className="group inline-flex items-center gap-2 self-start border-b border-[var(--paper)]/45 pb-[0.5rem] pt-1 text-[var(--paper)] transition-colors duration-300 hover:border-[var(--paper)] lg:ml-1 lg:self-auto"
                  >
                    <span className="k-label !text-[0.7rem] !tracking-[0.22em] !text-inherit">
                      Start Your Journey
                    </span>
                    <svg
                      width="13"
                      height="13"
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
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      <style>{`
        .hero-label {
          font-family: "General Sans", sans-serif;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-size: 0.62rem;
          color: color-mix(in srgb, var(--paper) 55%, transparent);
        }
        .hero-input {
          width: 100%;
          margin-top: 0.55rem;
          background: transparent;
          border: 0;
          border-bottom: 1px solid color-mix(in srgb, var(--paper) 30%, transparent);
          color: var(--paper);
          padding: 0 0 0.5rem;
          font-family: "General Sans", sans-serif;
          font-size: 0.95rem;
          border-radius: 0;
          transition: border-color 0.3s ease;
        }
        .hero-input::placeholder { color: color-mix(in srgb, var(--paper) 32%, transparent); }
        .hero-input:focus { outline: none; border-bottom-color: var(--paper); }
        .hero-input-num::-webkit-outer-spin-button,
        .hero-input-num::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        .hero-input-num { -moz-appearance: textfield; }
        /* keep browser autofill from painting a light box over the film */
        .hero-input:-webkit-autofill,
        .hero-input:-webkit-autofill:focus {
          -webkit-text-fill-color: var(--paper);
          transition: background-color 9999s ease-in-out 0s;
        }
      `}</style>
    </section>
  );
}

type HeroFieldProps = {
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
  className?: string;
  numeric?: boolean;
};

const HeroField = forwardRef<HTMLInputElement, HeroFieldProps>(function HeroField(
  { id, label, name, type = "text", inputMode, autoComplete, placeholder, min, max, error, className = "", numeric },
  ref
) {
  return (
    <div className={className}>
      <label htmlFor={id} className="hero-label">
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
        className={`hero-input ${numeric ? "hero-input-num" : ""}`}
        style={error ? { borderBottomColor: "#e9b9a6" } : undefined}
      />
      {error && <span className="mt-1.5 block text-[0.62rem] tracking-wide text-[#eabfae]">{error}</span>}
    </div>
  );
});
