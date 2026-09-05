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

        {/* grid — four package cards across one line on desktop */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-20 lg:grid-cols-4 lg:gap-5">
          {journeys.map((j, i) => (
            <Reveal key={j.id} delay={i * 0.06} className="h-full">
              <article className="group/card relative flex h-full flex-col border k-hair bg-[var(--paper-2)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)]">
                {/* header band — reads as a package label */}
                <div className="flex items-center justify-between border-b k-hair px-5 py-3.5">
                  <span className="k-num !text-[0.62rem] text-[var(--stone)]">{j.index}</span>
                  <span className="k-label !text-[0.56rem] !tracking-[0.14em] !text-[var(--pine)]">
                    {j.nights}
                  </span>
                </div>

                {/* body */}
                <div className="flex flex-1 flex-col px-5 py-5">
                  <p className="k-label !text-[0.56rem] !tracking-[0.18em] text-[var(--stone)]">
                    {j.region}
                  </p>
                  <h3 className="k-serif mt-2 text-[1.3rem] leading-[1.12] text-[var(--ink)]">
                    {j.name}
                  </h3>
                  <p className="k-num mt-2 !text-[0.62rem] text-[var(--stone)]">{j.route}</p>

                  <p className="k-body mt-3.5 !text-[0.83rem] !leading-[1.6]">{j.blurb}</p>

                  <p className="k-label mt-5 !text-[0.54rem] !tracking-[0.18em] text-[var(--stone)]">
                    What&apos;s included
                  </p>
                  <ul className="mt-2.5 flex flex-col gap-2">
                    {j.inclusions.map((inc) => (
                      <li key={inc} className="flex items-start gap-2.5">
                        <span className="mt-2 h-px w-3 shrink-0 bg-[var(--line-strong)]" aria-hidden />
                        <span className="k-body !text-[0.8rem] !leading-[1.5]">{inc}</span>
                      </li>
                    ))}
                  </ul>

                  {/* price + action */}
                  <div className="mt-auto flex items-end justify-between gap-3 border-t k-hair pt-4">
                    <div>
                      {j.priceAmount !== "On request" && (
                        <span className="k-label !text-[0.5rem] !tracking-[0.16em] text-[var(--stone)]">
                          From
                        </span>
                      )}
                      <div className="k-serif text-[1.35rem] leading-none text-[var(--ink)]">
                        {j.priceAmount}
                      </div>
                      {j.priceUnit && (
                        <span className="k-num mt-1 block !text-[0.56rem] text-[var(--stone)]">
                          {j.priceUnit}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => openConcierge(j.name)}
                      aria-label={`See details and enquire about ${j.name}`}
                      className="inline-flex shrink-0 items-center gap-1.5 border border-[var(--ink)]/25 px-3.5 py-2 text-[var(--ink)] transition-colors duration-300 after:absolute after:inset-0 after:content-[''] group-hover/card:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]"
                    >
                      <span className="k-label !text-[0.55rem] !tracking-[0.14em] !text-inherit">
                        See Details
                      </span>
                      <ArrowUpRight size={12} className="shrink-0" />
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
