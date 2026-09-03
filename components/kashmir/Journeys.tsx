"use client";

import { ArrowUpRight } from "lucide-react";
import { journeys } from "./data";
import { useConcierge } from "./ConciergeContext";
import Reveal from "./Reveal";

export default function Journeys() {
  const { openConcierge } = useConcierge();

  return (
    <section id="journeys" className="scroll-mt-20 border-t k-hair bg-[var(--paper)]">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 md:px-12 md:py-28 lg:px-16">
        {/* section header */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="k-label mb-6 flex items-center gap-3">
                <span className="k-num text-[var(--stone)]">01</span> Tour Packages
              </p>
              <h2 className="k-h2 text-[var(--ink)]">
                Our Kashmir<br className="hidden sm:block" /> tour packages.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex items-end">
            <Reveal delay={0.1}>
              <p className="k-body max-w-md">
                We keep a few handpicked trips rather than a hundred options. Each one can be changed
                to fit your dates and what you like — just tell us what you have in mind.
              </p>
            </Reveal>
          </div>
        </div>

        {/* grid — all four across one line on desktop */}
        <div className="mt-14 grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {journeys.map((j, i) => (
            <Reveal key={j.id} delay={i * 0.06} className="group h-full">
              <article className="flex h-full flex-col">
                <button
                  type="button"
                  onClick={() => openConcierge(j.name)}
                  className="flex items-baseline justify-between gap-2 border-b border-t k-hair pb-3 pt-4 text-left"
                  aria-label={`Enquire about ${j.name}`}
                >
                  <span className="k-num !text-[0.65rem] text-[var(--stone)]">{j.index}</span>
                  <span className="k-label !text-[0.6rem] !tracking-[0.12em]">
                    {j.region} · {j.nights}
                  </span>
                </button>

                <h3 className="k-serif mt-4 text-[1.25rem] leading-[1.15] text-[var(--ink)]">
                  {j.name}
                </h3>
                <p className="k-num mt-1.5 !text-[0.65rem] text-[var(--stone)]">{j.route}</p>

                <p className="k-body mt-3 !text-[0.85rem] !leading-[1.6]">{j.blurb}</p>

                <ul className="mt-4 flex flex-col gap-2">
                  {j.inclusions.map((inc) => (
                    <li key={inc} className="flex items-start gap-2.5">
                      <span className="mt-2 h-px w-3 shrink-0 bg-[var(--line-strong)]" aria-hidden />
                      <span className="k-body !text-[0.8rem] !leading-[1.5]">{inc}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between gap-3 border-t k-hair pt-4">
                  <span className="k-label !text-[0.6rem] !tracking-[0.12em] !text-[var(--ink)]">
                    {j.priceNote}
                  </span>
                  <button
                    type="button"
                    onClick={() => openConcierge(j.name)}
                    className="group/cta !inline-flex shrink-0 items-center gap-1 border-b border-[var(--ink)]/40 pb-0.5 k-label !text-[0.6rem] !tracking-[0.12em] !text-[var(--pine)] transition-colors hover:border-[var(--pine)]"
                  >
                    See Details
                    <ArrowUpRight
                      size={12}
                      className="shrink-0 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                    />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
