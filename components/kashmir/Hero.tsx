"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { brand } from "./data";
import { useConcierge } from "./ConciergeContext";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Still frame shown before the video buffers — and in place of it entirely
 * if no file is present. Drop `hero.mp4` (and optionally `hero.webm`) into
 * /public/media to swap in real footage; the layout is identical either way.
 */
const POSTER =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2400&q=85";

function useSrinagarTime() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 30000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function Hero() {
  const { openConcierge } = useConcierge();
  const time = useSrinagarTime();
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  // The copy recedes as the white curtain rises over the pinned hero.
  const { scrollY } = useScroll();
  const copyOpacity = useTransform(scrollY, [0, 480], [1, 0]);
  const copyY = useTransform(scrollY, [0, 480], [0, 42]);

  // Stop decoding frames once the curtain has fully covered the hero.
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

  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 30 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: EASE, delay: 0.15 + i * 0.12 },
    }),
  };

  return (
    /* Pinned at top:0 — the sections that follow scroll up over this. */
    <section id="top" className="sticky top-0 z-0 h-[100svh] overflow-hidden">
      {/* media plate */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        poster={POSTER}
        autoPlay={!reduce}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/media/hero.webm" type="video/webm" />
        <source src="/media/hero.mp4" type="video/mp4" />
      </video>

      {/* scrim — vertical weight for the type, plus a soft left bias */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0f0e0b]/60 via-[#0f0e0b]/25 to-[#0f0e0b]/80" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0f0e0b]/55 via-transparent to-transparent" />

      {/* copy */}
      <motion.div
        style={reduce ? undefined : { opacity: copyOpacity, y: copyY }}
        className="k-on-dark relative flex h-full flex-col pt-[76px]"
      >
        {/* meta bar */}
        <div className="mx-auto w-full max-w-[1440px] shrink-0 px-5 md:px-10 xl:px-16">
          <div className="flex items-center justify-between border-b k-hair py-4">
            <span className="k-num text-[var(--stone)]">Srinagar · 34°N 74°E</span>
            <span className="hidden sm:inline k-num text-[var(--stone)] tabular-nums">
              {time || "—"} IST
            </span>
            <span className="k-num text-[var(--stone)]">{brand.established}</span>
          </div>
        </div>

        {/* statement */}
        <div className="mx-auto flex w-full max-w-[1440px] min-h-0 flex-1 flex-col justify-center px-5 py-10 md:px-10 md:py-14 xl:px-16">
          <motion.p custom={0} variants={rise} initial="hidden" animate="show" className="k-label mb-6">
            Bespoke Kashmir Travel Agency
          </motion.p>

          <h1 className="k-display text-[var(--paper)]">
            <motion.span custom={1} variants={rise} initial="hidden" animate="show" className="block">
              Kashmir,
            </motion.span>
            <motion.span
              custom={2}
              variants={rise}
              initial="hidden"
              animate="show"
              className="block italic text-[#b9c9b7]"
            >
              quietly composed.
            </motion.span>
          </h1>

          <motion.p
            custom={3}
            variants={rise}
            initial="hidden"
            animate="show"
            className="k-lead mt-8 max-w-xl"
          >
            A private travel house crafting luxury Kashmir itineraries for a discerning few — heritage
            houseboats on Dal Lake, heli-ski days above Gulmarg, unhurried Pahalgam retreats, and the
            offbeat frontier of the Gurez Valley. Composed by Srinagar-born specialists.
          </motion.p>

          <motion.div
            custom={4}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center"
          >
            <button
              type="button"
              onClick={() => openConcierge()}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--paper)] px-7 py-4 text-[var(--ink)] transition-colors duration-300 hover:bg-white"
            >
              <span className="k-label !tracking-[0.16em] !text-inherit">Begin a Private Enquiry</span>
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
            <a href="#journeys" className="k-sweep k-label !tracking-[0.16em] !text-[var(--paper)]">
              View Curated Journeys
            </a>
          </motion.div>
        </div>

        {/* scroll cue */}
        <div className="mx-auto w-full max-w-[1440px] shrink-0 px-5 md:px-10 xl:px-16">
          <div className="flex items-center gap-3 border-t k-hair py-5 text-[var(--stone)]">
            <ArrowDown size={14} className="animate-bounce" />
            <span className="k-num">Scroll — four signature journeys</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
