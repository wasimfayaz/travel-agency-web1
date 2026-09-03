"use client";

import type { ReactNode } from "react";
import Figure from "./Figure";
import Reveal from "./Reveal";

type ImageKey = "hero" | "dal" | "gulmarg" | "pahalgam" | "gurez" | "houseboat" | "chalet";

/**
 * The editorial workhorse: a full-bleed photograph running to the page edge on
 * one side, an ivory column of type on the other. Label sits top, the stacked
 * serif statement centres, body copy settles at the foot.
 */
export default function Panel({
  id,
  label,
  lines,
  body,
  image,
  alt,
  caption,
  reverse = false,
  fullHeight = false,
  priority = false,
  children,
}: {
  id?: string;
  label: string;
  lines: string[];
  body: ReactNode;
  image: ImageKey;
  alt: string;
  caption?: string;
  reverse?: boolean;
  /** Locks the panel to exactly one viewport, so it can be pinned. */
  fullHeight?: boolean;
  /** Skip lazy-loading — use for a panel that sits at or near the top of the page. */
  priority?: boolean;
  children?: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 grid grid-cols-1 bg-[var(--paper)] md:grid-cols-[1.7fr_1fr] ${
        fullHeight ? "md:h-[100svh]" : "md:min-h-[88vh]"
      } ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}
    >
      {/* photograph — runs to the edge */}
      <div className="relative min-h-[52vh] md:min-h-full">
        <Figure image={image} alt={alt} priority={priority} className="absolute inset-0 h-full w-full" />
        {caption && (
          <span className="k-label absolute bottom-5 left-5 !text-[0.6rem] !text-white/75 md:bottom-7 md:left-7">
            {caption}
          </span>
        )}
      </div>

      {/* type column */}
      <div className="flex flex-col justify-between gap-12 px-6 py-16 md:px-12 md:py-20 lg:px-16">
        <Reveal>
          <p className="k-label">{label}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="k-panel-h text-[var(--ink)]">
            {lines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="k-body max-w-md">{body}</div>
          {children}
        </Reveal>
      </div>
    </section>
  );
}
