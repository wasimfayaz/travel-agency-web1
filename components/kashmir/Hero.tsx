"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { brand } from "./data";
import { useConcierge } from "./ConciergeContext";
import Figure from "./Figure";

const EASE = [0.16, 1, 0.3, 1] as const;

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

  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 30 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: EASE, delay: 0.15 + i * 0.12 },
    }),
  };

  return (
    <section id="top" className="relative min-h-[100svh] flex flex-col pt-[76px]">
      {/* meta bar */}
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-10 xl:px-16">
        <div className="flex items-center justify-between border-b k-hair py-4">
          <span className="k-num text-[var(--stone)]">Srinagar · 34°N 74°E</span>
          <span className="hidden sm:inline k-num text-[var(--stone)] tabular-nums">
            {time || "—"} IST
          </span>
          <span className="k-num text-[var(--stone)]">{brand.established}</span>
        </div>
      </div>

      {/* body */}
      <div className="mx-auto w-full max-w-[1440px] flex-1 px-5 md:px-10 xl:px-16 py-10 md:py-14">
        <div className="grid h-full grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* left — statement */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <motion.p
              custom={0}
              variants={rise}
              initial="hidden"
              animate="show"
              className="k-label mb-6"
            >
              Bespoke Kashmir Travel Agency
            </motion.p>

            <h1 className="k-display text-[var(--ink)]">
              <motion.span custom={1} variants={rise} initial="hidden" animate="show" className="block">
                Kashmir,
              </motion.span>
              <motion.span
                custom={2}
                variants={rise}
                initial="hidden"
                animate="show"
                className="block italic text-[var(--pine)]"
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
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-7 py-4 text-[var(--paper)] transition-colors duration-300 hover:bg-[var(--pine-deep)]"
              >
                <span className="k-label !tracking-[0.16em] text-current">Begin a Private Enquiry</span>
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <a href="#journeys" className="k-sweep k-label !tracking-[0.16em] text-[var(--ink)]">
                View Curated Journeys
              </a>
            </motion.div>
          </div>

          {/* right — tall editorial plate */}
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)", opacity: reduce ? 1 : 0 }}
            animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <Figure
              image="hero"
              priority
              alt="Dawn over Dal Lake, Srinagar — mist on the water beneath the Kashmir Himalaya"
              className="h-[46vh] w-full lg:h-full min-h-[320px]"
            />
            <div className="mt-3 flex items-center justify-between">
              <span className="k-num text-[var(--stone)]">Dal Lake — first light</span>
              <span className="k-num text-[var(--stone)]">01 / 04</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-10 xl:px-16">
        <div className="flex items-center gap-3 border-t k-hair py-5 text-[var(--stone)]">
          <ArrowDown size={14} className="animate-bounce" />
          <span className="k-num">Scroll — four signature journeys</span>
        </div>
      </div>
    </section>
  );
}
