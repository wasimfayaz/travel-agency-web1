"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { brand } from "./data";
import QuickEnquiry from "./QuickEnquiry";

// Streamed directly from Pexels' CDN (free-to-use stock footage) rather than
// self-hosted — swap for /media/hero.mp4 if you'd rather bundle your own cut.
const HERO_VIDEO_SRC = "https://videos.pexels.com/video-files/18923430/18923430-uhd_2560_1440_30fps.mp4";

const EASE = [0.16, 1, 0.3, 1] as const;

function fmt(t: number) {
  if (!isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * Framed, resort-style hero: a quiet wordmark, an editorial title block seated
 * over a soft frosted panel, one solid call to action, and a minimal film
 * control strip along the base. The button opens the light QuickEnquiry modal.
 */
export default function Hero() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [playing, setPlaying] = useState(!reduce);
  const userPaused = useRef(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);

  const { scrollY } = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 460], [1, 0]);

  // Track playback for the control strip.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      setCurrent(v.currentTime);
      if (v.duration) setProgress(v.currentTime / v.duration);
    };
    const onMeta = () => setDuration(v.duration || 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  // Pause while the hero is scrolled out of view — unless the viewer paused it.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduce) return;
    let raf = 0;
    const sync = () => {
      raf = 0;
      const covered = window.scrollY > window.innerHeight * 1.05;
      if (covered) {
        if (!v.paused) v.pause();
      } else if (v.paused && !userPaused.current) {
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

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      void v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  }

  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 12 },
    show: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: EASE, delay },
    }),
  };

  return (
    <section id="top" className="sticky top-0 z-0 h-[100svh] overflow-hidden bg-[#15140f]">
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
        animate={reduce ? undefined : { scale: [1, 1.02, 1] }}
        transition={reduce ? undefined : { duration: 36, repeat: Infinity, ease: "easeInOut" }}
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </motion.video>

      {/* cinematic wash — a little darker overall than the editorial hero so the
          centred title block reads, with weight top and bottom */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0f0e0b]/55 via-[#0f0e0b]/25 to-[#0f0e0b]/70" />

      <motion.div
        style={reduce ? undefined : { opacity: contentOpacity }}
        className="k-on-dark relative flex h-full flex-col"
      >
        <div className="mx-auto flex w-full max-w-[1560px] flex-1 flex-col px-6 pt-8 pb-6 sm:px-10 sm:pt-10 md:px-14 lg:px-20 xl:px-24">
          {/* top row — wordmark + a balancing detail (no nav; that arrives on scroll) */}
          <div className="flex items-start justify-between">
            <motion.a
              custom={0.15}
              variants={rise}
              initial="hidden"
              animate="show"
              href="#top"
              aria-label={`${brand.name} — home`}
              className="leading-none"
            >
              <span className="k-serif block text-[1.2rem] tracking-[0.32em] text-[var(--paper)] sm:text-[1.35rem]">
                {brand.name}
              </span>
              <span className="k-num mt-1.5 block !text-[0.55rem] !tracking-[0.4em] text-[var(--paper)]/60">
                KASHMIR
              </span>
            </motion.a>

            <motion.span
              custom={0.2}
              variants={rise}
              initial="hidden"
              animate="show"
              className="k-num hidden !text-[0.6rem] !tracking-[0.32em] text-[var(--paper)]/55 sm:block"
            >
              Srinagar · Est. 1998
            </motion.span>
          </div>

          {/* centre — the title block over a soft frosted panel */}
          <div className="flex flex-1 items-center justify-center">
            <div className="relative w-full max-w-[620px] text-center">
              {/* frosted panel */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-8 -inset-y-10 -z-[1] bg-[#f4efe6]/[0.06] backdrop-blur-[6px] sm:-inset-x-14 sm:-inset-y-14"
                style={{ maskImage: "radial-gradient(120% 120% at 50% 50%, #000 55%, transparent 100%)", WebkitMaskImage: "radial-gradient(120% 120% at 50% 50%, #000 55%, transparent 100%)" }}
              />

              <motion.p
                custom={0.35}
                variants={rise}
                initial="hidden"
                animate="show"
                className="k-label !tracking-[0.42em] text-[var(--paper)]/75"
              >
                Welcome to the Vale
              </motion.p>

              <motion.h1
                custom={0.5}
                variants={rise}
                initial="hidden"
                animate="show"
                className="k-serif mt-5 text-[clamp(2.5rem,1.5rem+3.6vw,4.75rem)] font-normal leading-[1.04] tracking-[-0.01em] text-[var(--paper)]"
              >
                Discover Kashmir,
                <br />
                beyond the ordinary.
              </motion.h1>

              <motion.p
                custom={0.65}
                variants={rise}
                initial="hidden"
                animate="show"
                className="mx-auto mt-6 max-w-[440px] text-[1.0625rem] leading-relaxed text-[var(--paper)]/80"
              >
                Private houseboats, alpine escapes and unhurried valleys — the Kashmir that only a
                local house can open for you.
              </motion.p>

              <motion.div custom={0.8} variants={rise} initial="hidden" animate="show" className="mt-9">
                <button
                  type="button"
                  onClick={() => setEnquiryOpen(true)}
                  className="group inline-flex items-center gap-3 bg-[var(--paper)] px-8 py-4 text-[var(--ink)] transition-colors duration-300 hover:bg-white"
                >
                  <span className="k-label !tracking-[0.2em] !text-inherit">Start Your Journey</span>
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
              </motion.div>
            </div>
          </div>

          {/* base — minimal film control strip */}
          <motion.div
            custom={1}
            variants={rise}
            initial="hidden"
            animate="show"
            className="flex items-center gap-4 text-[var(--paper)]"
          >
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "Pause background film" : "Play background film"}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--paper)]/40 text-[var(--paper)] transition-colors duration-300 hover:border-[var(--paper)]"
            >
              {playing ? <Pause size={13} /> : <Play size={13} className="translate-x-[1px]" />}
            </button>
            <div className="relative h-px flex-1 bg-[var(--paper)]/25">
              <span
                className="absolute inset-y-0 left-0 bg-[var(--paper)]"
                style={{ width: `${Math.min(100, progress * 100)}%` }}
              />
            </div>
            <span className="k-num shrink-0 !text-[0.6rem] !tracking-[0.2em] tabular-nums text-[var(--paper)]/70">
              {fmt(current)} / {fmt(duration)}
            </span>
          </motion.div>
        </div>
      </motion.div>

      <QuickEnquiry open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </section>
  );
}
