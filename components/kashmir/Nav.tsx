"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { brand, nav } from "./data";
import { useConcierge } from "./ConciergeContext";

/**
 * The hero carries its own wordmark row, so this bar stays out of the way
 * until the content curtain has risen — then it slides in over the ivory.
 */
export default function Nav() {
  const { openConcierge } = useConcierge();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.72);
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

  const shown = scrolled || mobileOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-[var(--paper)]/94 backdrop-blur-md transition-all duration-500 ${
        shown
          ? "k-hair translate-y-0 opacity-100"
          : "-translate-y-full border-transparent opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto flex h-[70px] max-w-[1600px] items-center justify-between gap-6 px-6 md:px-12">
        <a href="#top" className="leading-none" aria-label={`${brand.name} — home`}>
          <span className="k-serif text-[1.3rem] tracking-[0.3em] text-[var(--ink)]">{brand.name}</span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="k-sweep k-label !tracking-[0.18em] text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <button
            type="button"
            onClick={() => openConcierge()}
            className="group inline-flex items-center gap-2 rounded-full border border-[var(--ink)] px-6 py-2.5 text-[var(--ink)] transition-colors duration-300 hover:bg-[var(--ink)] hover:text-[var(--paper)]"
          >
            <span className="k-label !tracking-[0.16em] !text-inherit">Plan Your Journey</span>
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>

        <button
          type="button"
          className="text-[var(--ink)] lg:hidden"
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
        className={`fixed inset-x-0 bottom-0 top-[70px] bg-[var(--paper)] transition-transform duration-500 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
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
