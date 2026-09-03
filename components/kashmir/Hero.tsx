"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { brand } from "./data";
import { useConcierge } from "./ConciergeContext";

/**
 * Pinned full-bleed hero. Deliberately bare: a wordmark, one line of type and
 * a single call to action, floating over the film. The video plate is left
 * blank (a deep neutral ground) until footage is dropped into /public/media.
 */
export default function Hero() {
  const { openConcierge } = useConcierge();
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollY } = useScroll();
  const rowOpacity = useTransform(scrollY, [0, 420], [1, 0]);

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

  return (
    <section id="top" className="sticky top-0 z-0 h-[100svh] overflow-hidden bg-[#15140f]">
      {/* film plate — blank until /public/media/hero.mp4 exists */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
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

      {/* scrim — kept light; just enough to hold the type */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0f0e0b]/45 via-[#0f0e0b]/15 to-[#0f0e0b]/55" />

      {/* the only content: one centred row */}
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="k-on-dark relative flex h-full items-center"
      >
        <motion.div
          style={reduce ? undefined : { opacity: rowOpacity }}
          className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-6 px-6 md:px-12"
        >
          {/* wordmark */}
          <a
            href="#top"
            aria-label={`${brand.name} — home`}
            className="k-serif shrink-0 text-[1.35rem] tracking-[0.34em] text-[var(--paper)] md:text-[1.7rem]"
          >
            {brand.name}
          </a>

          {/* the single line of copy — also the page's H1 */}
          <h1 className="k-serif hidden flex-1 text-center text-[1.05rem] font-medium tracking-[0.01em] text-[var(--paper)] md:block lg:text-[1.15rem]">
            A valley of journeys, quietly composed.
          </h1>

          {/* contact */}
          <div className="flex shrink-0 items-center gap-4 md:gap-6">
            <button
              type="button"
              onClick={() => openConcierge()}
              className="rounded-full border border-[var(--paper)]/70 px-5 py-2.5 text-[var(--paper)] transition-colors duration-500 hover:bg-[var(--paper)] hover:text-[var(--ink)] md:px-7"
            >
              <span className="k-label !tracking-[0.2em] !text-inherit">Contact Us</span>
            </button>
            <a
              href={brand.whatsapp}
              aria-label="Instagram"
              className="text-[var(--paper)]/80 transition-colors duration-300 hover:text-[var(--paper)]"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
