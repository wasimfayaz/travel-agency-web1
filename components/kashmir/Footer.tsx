"use client";

import { ArrowUpRight } from "lucide-react";
import { brand, journeys, nav } from "./data";
import { useConcierge } from "./ConciergeContext";
import Reveal from "./Reveal";

export default function Footer() {
  const { openConcierge } = useConcierge();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t k-hair bg-[var(--ink)] text-[var(--paper)]">
      {/* invitation */}
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-10 xl:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="k-label mb-6 !text-[var(--stone-light)]">Begin the conversation</p>
              <h2 className="k-display !text-[clamp(2.75rem,1.4rem+5vw,6rem)] text-[var(--paper)]">
                Let us compose your <span className="italic">Kashmir</span>.
              </h2>
            </Reveal>
          </div>
          <div className="flex flex-col justify-end gap-6 lg:col-span-4">
            <Reveal delay={0.1}>
              <button
                type="button"
                onClick={() => openConcierge()}
                className="group inline-flex items-center gap-3 border-b border-[var(--stone)] pb-2 text-left"
              >
                <span className="k-serif text-[1.75rem] text-[var(--paper)]">Begin a private enquiry</span>
                <ArrowUpRight
                  size={22}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>
              <a
                href={`mailto:${brand.email}`}
                className="k-sweep mt-6 block w-fit k-num !text-[0.8rem] !text-[var(--stone-light)]"
              >
                {brand.email}
              </a>
            </Reveal>
          </div>
        </div>

        {/* columns */}
        <div className="mt-24 grid grid-cols-2 gap-10 border-t border-[#3a352c] pt-14 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <span className="k-serif text-[1.75rem] tracking-[0.18em] text-[var(--paper)]">
              {brand.name}
            </span>
            <p className="k-body mt-4 max-w-xs !text-[var(--stone-light)]">{brand.tagline}</p>
          </div>

          <FooterCol title="Journeys" className="md:col-span-3">
            {journeys.map((j) => (
              <FooterLink key={j.id} onClick={() => openConcierge(j.name)}>
                {j.name}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="The Agency" className="md:col-span-2">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="k-body !text-[0.9rem] !text-[var(--stone-light)] transition-colors hover:!text-[var(--paper)]"
              >
                {n.label}
              </a>
            ))}
          </FooterCol>

          <FooterCol title="The House" className="md:col-span-3">
            <span className="k-body !text-[0.9rem] !text-[var(--stone-light)]">{brand.address}</span>
            <a
              href={`mailto:${brand.email}`}
              className="k-body !text-[0.9rem] !text-[var(--stone-light)] transition-colors hover:!text-[var(--paper)]"
            >
              {brand.email}
            </a>
            <a
              href={brand.whatsapp}
              className="k-body !text-[0.9rem] !text-[var(--stone-light)] transition-colors hover:!text-[var(--paper)]"
            >
              WhatsApp concierge
            </a>
          </FooterCol>
        </div>
      </div>

      {/* legal */}
      <div className="border-t border-[#3a352c]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-3 px-5 py-6 md:flex-row md:px-10 xl:px-16">
          <span className="k-num !text-[0.7rem] text-[var(--stone)]">
            © {year} {brand.name} · Bespoke Kashmir Travel · Srinagar, J&amp;K
          </span>
          <div className="flex items-center gap-6">
            <span className="k-num !text-[0.7rem] text-[var(--stone)]">Privacy</span>
            <span className="k-num !text-[0.7rem] text-[var(--stone)]">Terms</span>
            <span className="k-num !text-[0.7rem] text-[var(--stone)]">Kashmir, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <h3 className="k-label !text-[var(--stone)]">{title}</h3>
      <div className="flex flex-col items-start gap-3">{children}</div>
    </div>
  );
}

function FooterLink({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="k-body !text-[0.9rem] !text-[var(--stone-light)] transition-colors hover:!text-[var(--paper)] text-left"
    >
      {children}
    </button>
  );
}
