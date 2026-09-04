"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { brand } from "./data";
import { useConcierge } from "./ConciergeContext";

// Streamed directly from Pexels' CDN (free-to-use stock footage) rather than
// self-hosted — swap for /media/hero.mp4 if you'd rather bundle your own cut.
const HERO_VIDEO_SRC = "https://videos.pexels.com/video-files/18923430/18923430-uhd_2560_1440_30fps.mp4";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Pinned full-bleed hero. An art-directed, asymmetric composition rather than
 * a row of UI: the headline sits upper-right, the wordmark holds the quiet
 * centre-left, and the enquiry link closes the frame at the bottom-right —
 * the landscape itself stays the subject throughout.
 */
export default function Hero() {
  const { openConcierge } = useConcierge();
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollY } = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 420], [1, 0]);

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

  // Slow, staggered rise — headline first, wordmark, then the enquiry link.
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

      {/* one quiet vertical gradient — legible top and bottom, open sky at centre */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#100f0b]/48 via-[#100f0b]/10 to-[#100f0b]/58" />

      {/* composition */}
      <motion.div style={reduce ? undefined : { opacity: contentOpacity }} className="k-on-dark relative h-full">
        <div className="mx-auto flex h-full max-w-[1600px] flex-col justify-between px-6 py-10 sm:px-10 sm:py-12 md:px-14 md:py-14 lg:px-20 lg:py-16 xl:px-24 xl:py-20">
          {/* upper zone — editorial headline, held to the right on larger screens */}
          <div className="flex justify-start md:justify-end">
            <motion.h1
              custom={0.25}
              variants={rise}
              initial="hidden"
              animate="show"
              className="k-serif max-w-[300px] text-left text-[clamp(1.85rem,1.5rem+2.25vw,4rem)] font-normal leading-[1.08] tracking-[-0.01em] text-[var(--paper)] sm:max-w-[380px] md:max-w-[480px] md:text-right lg:max-w-[520px]"
            >
              Discover Kashmir,
              <br />
              beyond the ordinary.
            </motion.h1>
          </div>

          {/* centre zone — the wordmark, quietly left */}
          <div className="flex flex-1 items-center">
            <motion.div custom={0.55} variants={rise} initial="hidden" animate="show">
              <a
                href="#top"
                aria-label={`${brand.name} — home`}
                className="k-serif block text-[1.1rem] leading-none tracking-[0.42em] text-[var(--paper)] sm:text-[1.2rem]"
              >
                {brand.name}
              </a>
              <p className="k-num mt-3 !text-[0.65rem] !tracking-[0.32em] text-[var(--paper)]/60">
                Private Journeys · Kashmir
              </p>
            </motion.div>
          </div>

          {/* lower zone — a subtle social mark, and the one call to action */}
          <div className="flex items-end justify-between gap-6">
            <motion.a
              custom={0.7}
              variants={rise}
              initial="hidden"
              animate="show"
              href={brand.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="-m-3 p-3 text-[var(--paper)]/40 transition-colors duration-300 hover:text-[var(--paper)]/75"
            >
              <svg
                width="16"
                height="16"
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
            </motion.a>

            <motion.button
              custom={0.85}
              variants={rise}
              initial="hidden"
              animate="show"
              type="button"
              onClick={() => openConcierge()}
              className="group -m-3 inline-flex items-center gap-2 border-b border-[var(--paper)]/45 p-3 pb-[calc(0.75rem+1px)] text-[var(--paper)] transition-colors duration-300 hover:border-[var(--paper)]"
            >
              <span className="k-label !text-[0.72rem] !tracking-[0.24em] !text-inherit">
                Plan Your Journey
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
            </motion.button>
          </div>
        </div>

        {/* scroll cue — bottom centre, barely there */}
        <motion.div
          custom={1.05}
          variants={rise}
          initial="hidden"
          animate="show"
          className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 text-[var(--paper)]/45 md:bottom-8"
        >
          <span className="k-num !text-[0.6rem] !tracking-[0.34em]">Scroll</span>
          <span className="relative h-7 w-px overflow-hidden bg-current/25">
            <motion.span
              className="absolute inset-x-0 top-0 h-2.5 bg-current"
              animate={reduce ? undefined : { y: [0, 20, 0] }}
              transition={reduce ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
