"use client";

import { ArrowUpRight } from "lucide-react";
import { stays } from "./data";
import { useConcierge } from "./ConciergeContext";
import Reveal from "./Reveal";
import Figure from "./Figure";

export default function Spotlight() {
  const { openConcierge } = useConcierge();

  return (
    <section id="stays" className="scroll-mt-24 border-t k-hair bg-[var(--paper-2)]">
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-10 xl:px-16 py-24 md:py-36">
        <div className="max-w-2xl">
          <Reveal>
            <p className="k-label mb-6 flex items-center gap-3">
              <span className="k-num text-[var(--stone)]">02</span> The Stays
            </p>
            <h2 className="k-h2 text-[var(--ink)]">
              Places we hold, so you arrive to <span className="italic text-[var(--pine)]">stillness</span>.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-24 md:mt-24 md:gap-36">
          {stays.map((s, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={s.id}
                className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12"
              >
                <Reveal
                  className={`md:col-span-7 ${reversed ? "md:order-2 md:col-start-6" : ""}`}
                  y={20}
                >
                  <Figure
                    image={s.image as "houseboat"}
                    alt={`${s.title} — bespoke Kashmir stay`}
                    className="aspect-[16/11] w-full"
                  />
                </Reveal>

                <Reveal
                  delay={0.1}
                  className={`md:col-span-4 ${reversed ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}
                >
                  <p className="k-label mb-4">{s.kicker}</p>
                  <h3 className="k-h3 text-[var(--ink)]">{s.title}</h3>
                  <p className="k-body mt-5">{s.body}</p>

                  <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                    {s.meta.map((m) => (
                      <li key={m} className="k-num text-[var(--stone)]">
                        {m}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => openConcierge(i === 0 ? "The Dal Lake Heritage" : "Gulmarg Alpine & Powder")}
                    className="k-sweep mt-7 inline-flex items-center gap-1.5 k-label !tracking-[0.14em] text-[var(--ink)]"
                  >
                    Reserve on exclusive use
                    <ArrowUpRight size={14} />
                  </button>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
