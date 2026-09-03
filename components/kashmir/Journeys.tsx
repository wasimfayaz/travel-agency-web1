"use client";

import { ArrowUpRight } from "lucide-react";
import { journeys } from "./data";
import { useConcierge } from "./ConciergeContext";
import Reveal from "./Reveal";
import Figure from "./Figure";

export default function Journeys() {
  const { openConcierge } = useConcierge();

  return (
    <section id="journeys" className="scroll-mt-24 border-t k-hair">
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-10 xl:px-16 py-24 md:py-36">
        {/* section header */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="k-label mb-6 flex items-center gap-3">
                <span className="k-num text-[var(--stone)]">01</span> Curated Journeys
              </p>
              <h2 className="k-h2 text-[var(--ink)]">
                Four signature Kashmir<br className="hidden sm:block" /> tour packages.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex items-end">
            <Reveal delay={0.1}>
              <p className="k-body max-w-md">
                Not a catalogue — a small, considered collection. Each itinerary is a starting point we
                tailor to the season, your pace, and the doors we can open. Nothing is fixed; everything
                is arranged.
              </p>
            </Reveal>
          </div>
        </div>

        {/* grid */}
        <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-20 md:mt-24 md:grid-cols-2">
          {journeys.map((j, i) => (
            <Reveal key={j.id} delay={(i % 2) * 0.1} className="group">
              <article className="flex flex-col">
                <button
                  type="button"
                  onClick={() => openConcierge(j.name)}
                  className="block text-left"
                  aria-label={`Enquire about ${j.name}`}
                >
                  <Figure
                    image={j.image as "dal"}
                    alt={`${j.name} — ${j.keyword} in ${j.region}, Kashmir`}
                    className="aspect-[4/3] w-full"
                  />
                </button>

                <div className="mt-6 flex items-baseline justify-between border-b k-hair pb-4">
                  <span className="k-num text-[var(--stone)]">{j.index}</span>
                  <span className="k-label !tracking-[0.16em]">
                    {j.region} · {j.nights}
                  </span>
                </div>

                <h3 className="k-h3 mt-5 text-[var(--ink)]">{j.name}</h3>
                <p className="k-num mt-2 text-[var(--stone)]">{j.route}</p>

                <p className="k-body mt-4">{j.blurb}</p>

                <ul className="mt-6 flex flex-col gap-2.5">
                  {j.inclusions.map((inc) => (
                    <li key={inc} className="flex items-start gap-3">
                      <span className="mt-2.5 h-px w-4 shrink-0 bg-[var(--line-strong)]" aria-hidden />
                      <span className="k-body !text-[0.95rem]">{inc}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex items-center justify-between border-t k-hair pt-5">
                  <span className="k-label !tracking-[0.14em] text-[var(--ink)]">{j.priceNote}</span>
                  <button
                    type="button"
                    onClick={() => openConcierge(j.name)}
                    className="k-sweep inline-flex items-center gap-1.5 k-label !tracking-[0.14em] text-[var(--ink)]"
                  >
                    Explore itinerary
                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
