"use client";

import { stats, testimonials } from "./data";
import Reveal from "./Reveal";

export default function Trust() {
  return (
    <div className="bg-[var(--paper)]">
      {/* the quiet ledger */}
      <section id="heritage" className="scroll-mt-20 border-t k-hair">
        <div className="mx-auto w-full max-w-[1600px] px-6 py-20 md:px-12 md:py-28 lg:px-16">
          <div className="grid grid-cols-2 border-t k-hair md:grid-cols-4">
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

          <div className="mt-20 grid grid-cols-1 gap-12 md:mt-28 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <p className="k-label mb-6">Why Choose Us</p>
                <p className="k-panel-h text-[var(--ink)]">
                  26 years of experience in Kashmir.
                </p>
              </Reveal>
            </div>

            <div className="flex flex-col gap-12 md:col-span-7 md:col-start-6">
              {testimonials.map((t, i) => (
                <Reveal key={t.author} delay={i * 0.1} className="border-t k-hair pt-8">
                  <blockquote className="k-serif text-[1.6rem] leading-[1.35] text-[var(--ink)] md:text-[2rem]">
                    “{t.quote}”
                  </blockquote>
                  <footer className="mt-5 flex flex-wrap items-center gap-3">
                    <span className="k-label !tracking-[0.16em] !text-[var(--ink)]">{t.author}</span>
                    <span className="k-num text-[var(--stone)]">— {t.detail}</span>
                  </footer>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
