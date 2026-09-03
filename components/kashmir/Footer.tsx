"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { brand, nav } from "./data";
import Reveal from "./Reveal";

/**
 * The only beige surface on the site. Sits above the pinned "How We Work"
 * panel and rises over it as the page ends.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(data.get("name") || "").trim()) next.name = "Please share your name.";
    const email = String(data.get("email") || "").trim();
    if (!email) next.email = "Please share an email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "That email doesn't look right.";
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    setErrors({});
    // Wire this to your concierge CRM / mail endpoint in production.
    setSent(true);
  }

  return (
    <footer className="relative z-10 bg-[var(--sand)] text-[var(--ink)]">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 md:px-12 md:py-24 lg:px-16">
        {/* invitation + coordinates */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <div className="flex items-center gap-5">
              <span className="k-serif flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[var(--ink)]/50 text-[1.15rem] tracking-[0.08em]">
                S
              </span>
              <p className="k-serif text-[1.35rem] leading-snug md:text-[1.6rem]">
                Begin Your Journey with {brand.name}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="md:col-span-3">
            <h3 className="k-label !tracking-[0.24em] !text-[var(--ink)]/70">Address</h3>
            <p className="k-body mt-4 !text-[var(--ink)]/85">{brand.address}</p>
          </Reveal>

          <Reveal delay={0.14} className="md:col-span-3">
            <h3 className="k-label !tracking-[0.24em] !text-[var(--ink)]/70">E-mail</h3>
            <a
              href={`mailto:${brand.email}`}
              className="k-sweep k-body mt-4 inline-block !text-[var(--ink)]/85"
            >
              {brand.email}
            </a>
          </Reveal>
        </div>

        {/* enquiry form */}
        <div className="mt-20 grid grid-cols-1 gap-12 md:mt-28 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <nav className="flex flex-col items-start gap-3">
                {nav.map((item) => (
                  <a key={item.label} href={item.href} className="k-sweep k-body !text-[var(--ink)]/80">
                    {item.label}
                  </a>
                ))}
              </nav>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            {sent ? (
              <Reveal className="flex flex-col items-start gap-5 py-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--pine)] text-[var(--pine)]">
                  <Check size={22} />
                </span>
                <h3 className="k-serif text-[2rem] leading-tight">Your enquiry is with us.</h3>
                <p className="k-body max-w-md !text-[var(--ink)]/80">
                  A Srinagar-born specialist will write to you within one working day to begin
                  shaping your journey — unhurried, and entirely private.
                </p>
              </Reveal>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <FField label="Name" name="name" placeholder="Jane Smith" error={errors.name} />
                  <FField
                    label="E-mail"
                    name="email"
                    type="email"
                    placeholder="janesmith@icloud.com"
                    error={errors.email}
                  />
                </div>
                <FField label="Subject" name="subject" placeholder="Share with us" />
                <label className="flex flex-col gap-3">
                  <span className="k-serif text-[1.05rem] font-medium">Message</span>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Share with us"
                    className="k-line-input resize-none"
                  />
                </label>

                <button
                  type="submit"
                  className="group mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--ink)] px-7 py-3.5 text-[var(--sand)] transition-colors duration-300 hover:bg-[var(--pine-deep)]"
                >
                  <span className="k-label !tracking-[0.16em] !text-inherit">Send enquiry</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--ink)]/15">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center justify-between gap-3 px-6 py-6 md:flex-row md:px-12 lg:px-16">
          <span className="k-num !text-[0.7rem] text-[var(--ink)]/60">
            © {year} {brand.name} · Bespoke Kashmir Travel · Srinagar, J&amp;K
          </span>
          <div className="flex items-center gap-6">
            <span className="k-num !text-[0.7rem] text-[var(--ink)]/60">Privacy</span>
            <span className="k-num !text-[0.7rem] text-[var(--ink)]/60">Terms</span>
            <span className="k-num !text-[0.7rem] text-[var(--ink)]/60">Kashmir, India</span>
          </div>
        </div>
      </div>

      <style>{`
        .k-line-input {
          width: 100%;
          background: transparent;
          border: 0;
          border-bottom: 1px solid rgba(32, 29, 24, 0.35);
          color: var(--ink);
          padding: 0.5rem 0;
          font-family: "General Sans", sans-serif;
          font-size: 1rem;
          border-radius: 0;
          transition: border-color 0.3s ease;
        }
        .k-line-input::placeholder { color: rgba(32, 29, 24, 0.42); }
        .k-line-input:focus { outline: none; border-color: var(--ink); }
      `}</style>
    </footer>
  );
}

function FField({
  label,
  name,
  type = "text",
  placeholder,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-3">
      <span className="k-serif text-[1.05rem] font-medium">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="k-line-input"
        style={error ? { borderColor: "var(--pine)" } : undefined}
      />
      {error && <span className="k-num text-[var(--pine)]">{error}</span>}
    </label>
  );
}
