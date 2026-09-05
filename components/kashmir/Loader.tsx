"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Premium intro screen — the SERAI wordmark over the site's ivory ground with a
 * hairline progress line and a quiet counter, then the whole panel lifts away
 * like a curtain to reveal the hero (echoing the site's curtain-reveal motif).
 * Renders on first paint (SSR included) so the hero is never briefly visible.
 */
export default function Loader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const DURATION = reduce ? 450 : 1750;
    const HOLD = reduce ? 120 : 320;
    const start = performance.now();
    let raf = 0;
    let exitTimer: ReturnType<typeof setTimeout>;

    document.body.style.overflow = "hidden";

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      // ease-out so the fill decelerates toward 100 — feels considered
      const eased = 1 - Math.pow(1 - p, 3);
      setPct(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        exitTimer = setTimeout(() => {
          document.body.style.overflow = "";
          setVisible(false);
        }, HOLD);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(exitTimer);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          role="status"
          aria-label="Loading"
          className="k-root fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[var(--paper)]"
          initial={{ y: 0 }}
          exit={reduce ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: reduce ? 0.4 : 0.95, ease: EASE }}
        >
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <span className="k-serif text-[1.9rem] leading-none tracking-[0.42em] text-[var(--ink)] sm:text-[2.25rem]">
              SERAI
            </span>
            <span className="k-num mt-3 !text-[0.6rem] !tracking-[0.44em] text-[var(--stone)]">
              KASHMIR
            </span>
          </motion.div>

          {/* hairline progress + counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
            className="mt-10 flex flex-col items-center gap-3"
          >
            <span className="relative block h-px w-[150px] bg-[var(--line-strong)]">
              <span
                className="absolute inset-y-0 left-0 bg-[var(--ink)]"
                style={{ width: `${pct}%` }}
              />
            </span>
            <span className="k-num !text-[0.6rem] !tracking-[0.2em] tabular-nums text-[var(--stone)]">
              {String(pct).padStart(2, "0")}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
