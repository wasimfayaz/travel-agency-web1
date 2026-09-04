"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "./data";
import Reveal from "./Reveal";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 border-t k-hair bg-[var(--paper)]">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 md:px-12 md:py-28 lg:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <p className="k-label mb-6 flex items-center gap-3">
                <span className="k-num text-[var(--stone)]">06</span> Good to Know
              </p>
              <h2 className="k-h2 text-[var(--ink)]">Questions, answered.</h2>
            </Reveal>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <Reveal>
              <dl className="border-t k-hair">
                {faqs.map((f, i) => {
                  const isOpen = open === i;
                  return (
                    <div key={f.q} className="border-b k-hair">
                      <dt>
                        <button
                          type="button"
                          onClick={() => setOpen(isOpen ? null : i)}
                          aria-expanded={isOpen}
                          className="flex w-full items-center justify-between gap-6 py-5 text-left"
                        >
                          <span className="k-serif text-[1.15rem] leading-snug text-[var(--ink)] md:text-[1.3rem]">
                            {f.q}
                          </span>
                          <Plus
                            size={18}
                            className={`shrink-0 text-[var(--stone)] transition-transform duration-300 ${
                              isOpen ? "rotate-45" : ""
                            }`}
                          />
                        </button>
                      </dt>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.dd
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="k-body max-w-xl pb-6 !text-[0.95rem]">{f.a}</p>
                          </motion.dd>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
