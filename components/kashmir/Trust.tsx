"use client";

import { stats, testimonials } from "./data";
import Reveal from "./Reveal";

const pillars = [
  {
    k: "Personal",
    t: "Srinagar-born",
    b: "Our specialists were raised on these lakes and passes. The access — a houseboat, a home, a mountain guide — is personal, never brokered.",
  },
  {
    k: "Discreet",
    t: "Wholly private",
    b: "One journey at a time. No groups, no fixed departures, no crowds at the garden gate. Your itinerary is yours alone.",
  },
  {
    k: "Intentful",
    t: "Quietly exacting",
    b: "We hold the logistics — permits, weather windows, the right host — so nothing is left to chance and your days stay effortless.",
  },
];

export default function Trust() {
  return (
    <section id="craft" className="scroll-mt-24 border-t k-hair">
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-10 xl:px-16 py-24 md:py-36">
        {/* header */}
        <div className="max-w-2xl">
          <Reveal>
            <p className="k-label mb-6 flex items-center gap-3">
              <span className="k-num text-[var(--stone)]">03</span> How We Work
            </p>
            <h2 className="k-h2 text-[var(--ink)]">
              Native, unhurried, <span className="italic text-[var(--pine)]">exacting</span>.
            </h2>
          </Reveal>
        </div>

        {/* pillars */}
        <div className="mt-16 grid grid-cols-1 gap-px md:mt-20 md:grid-cols-3 md:gap-12">
          {pillars.map((p, i) => (
            <Reveal key={p.k} delay={i * 0.1} className="border-t k-hair pt-6 md:border-t md:pt-8">
              <span className="k-label !tracking-[0.16em] text-[var(--pine)]">{p.k}</span>
              <h3 className="k-h3 mt-4 text-[var(--ink)]">{p.t}</h3>
              <p className="k-body mt-4">{p.b}</p>
            </Reveal>
          ))}
        </div>

        {/* stats */}
        <div className="mt-20 grid grid-cols-2 border-t k-hair md:mt-28 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className={`border-b k-hair py-8 md:border-b-0 md:py-10 ${
                i !== 0 ? "md:border-l md:pl-8" : ""
              } ${i % 2 !== 0 ? "border-l pl-6 md:pl-8" : ""}`}
            >
              <div className="k-serif text-[3rem] leading-none text-[var(--ink)] md:text-[3.75rem]">
                {s.value}
              </div>
              <div className="k-label !tracking-[0.14em] mt-3">{s.label}</div>
            </Reveal>
          ))}
        </div>

        {/* heritage / testimonials */}
        <div id="heritage" className="scroll-mt-24 mt-24 md:mt-36">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <p className="k-label mb-6 flex items-center gap-3">
                  <span className="k-num text-[var(--stone)]">04</span> The Vale
                </p>
                <p className="k-h3 k-serif text-[var(--ink)]">
                  Twenty-six winters on these waters — and a quiet ledger of travellers from thirty-one
                  countries who return.
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-7 md:col-start-6 flex flex-col gap-12">
              {testimonials.map((t, i) => (
                <Reveal key={t.author} delay={i * 0.1} className="border-t k-hair pt-8">
                  <blockquote className="k-serif text-[1.6rem] leading-[1.35] text-[var(--ink)] md:text-[2rem]">
                    “{t.quote}”
                  </blockquote>
                  <footer className="mt-5 flex items-center gap-3">
                    <span className="k-label !tracking-[0.16em] text-[var(--ink)]">{t.author}</span>
                    <span className="k-num text-[var(--stone)]">— {t.detail}</span>
                  </footer>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
