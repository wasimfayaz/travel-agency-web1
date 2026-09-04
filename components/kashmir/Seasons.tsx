"use client";

import { seasons } from "./data";
import Reveal from "./Reveal";

/**
 * "Best time to visit" — a quiet, text-forward seasonal grid. No photos, so it
 * reads as an editorial almanac rather than another image section.
 */
export default function Seasons() {
  return (
    <section id="seasons" className="scroll-mt-20 border-t k-hair bg-[var(--paper)]">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 md:px-12 md:py-28 lg:px-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="k-label mb-6 flex items-center gap-3">
                <span className="k-num text-[var(--stone)]">05</span> Best Time to Visit
              </p>
              <h2 className="k-h2 text-[var(--ink)]">
                Kashmir is beautiful<br className="hidden sm:block" /> all year round.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex items-end">
            <Reveal delay={0.1}>
              <p className="k-body max-w-md">
                Every season has its own character — blossom and tulips in spring, open mountains in
                summer, golden chinars in autumn, and snow in winter. Tell us what you love and
                we&apos;ll pick the perfect time.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 border-t k-hair pt-10 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {seasons.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.06}>
              <div className="flex items-baseline justify-between border-b k-hair pb-3">
                <h3 className="k-serif text-[1.5rem] leading-none text-[var(--ink)]">{s.name}</h3>
                <span className="k-num !text-[0.65rem] text-[var(--stone)]">{s.months}</span>
              </div>
              <p className="k-body mt-4 !text-[0.85rem] !leading-[1.6]">{s.note}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
