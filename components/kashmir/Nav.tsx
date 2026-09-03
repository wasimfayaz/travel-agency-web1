"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { brand, nav } from "./data";
import { useConcierge } from "./ConciergeContext";

export default function Nav() {
  const { openConcierge } = useConcierge();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // While the nav floats over the hero video it inverts to light type;
  // once the paper curtain rises behind it, it returns to ink.
  const overHero = !scrolled && !mobileOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || mobileOpen
          ? "bg-[#f4efe6]/92 backdrop-blur-md border-b k-hair"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 md:px-10 xl:px-16 h-[76px]">
        {/* wordmark */}
        <a href="#top" className="flex items-baseline gap-2.5 leading-none" aria-label={`${brand.name} — home`}>
          <span
            className={`k-serif text-[1.6rem] tracking-[0.18em] transition-colors duration-500 ${
              overHero ? "text-[#f4efe6]" : "text-[var(--ink)]"
            }`}
          >
            {brand.name}
          </span>
          <span
            className={`hidden sm:inline k-label !text-[0.6rem] !tracking-[0.22em] transition-colors duration-500 ${
              overHero ? "!text-[#f4efe6]/70" : "text-[var(--stone)]"
            }`}
          >
            {brand.descriptor}
          </span>
        </a>

        {/* desktop links */}
        <nav className="hidden lg:flex items-center gap-9">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`k-sweep k-label !tracking-[0.18em] transition-colors duration-500 ${
                overHero
                  ? "!text-[#f4efe6]/85 hover:!text-[#f4efe6]"
                  : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <button
            type="button"
            onClick={() => openConcierge()}
            className={`group inline-flex items-center gap-2 rounded-full border px-6 py-2.5 transition-colors duration-500 ${
              overHero
                ? "border-[#f4efe6]/60 text-[#f4efe6] hover:bg-[#f4efe6] hover:text-[var(--ink)]"
                : "border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            }`}
          >
            <span className="k-label !tracking-[0.16em] !text-inherit">Plan Your Journey</span>
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          className={`lg:hidden transition-colors duration-500 ${
            overHero ? "text-[#f4efe6]" : "text-[var(--ink)]"
          }`}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* mobile drawer */}
      <div
        aria-hidden={!mobileOpen}
        className={`lg:hidden fixed inset-x-0 top-[76px] bottom-0 bg-[#f4efe6] transition-transform duration-500 ease-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex h-full flex-col justify-between px-6 py-10">
          <nav className="flex flex-col">
            {nav.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-baseline gap-4 border-b k-hair py-5"
              >
                <span className="k-num text-[var(--stone)]">0{i + 1}</span>
                <span className="k-serif text-[2rem] text-[var(--ink)]">{item.label}</span>
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              openConcierge();
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-6 py-4 text-[var(--paper)]"
          >
            <span className="k-label !tracking-[0.16em] !text-inherit">Plan Your Journey</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
