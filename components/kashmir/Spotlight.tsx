"use client";

import { ArrowUpRight } from "lucide-react";
import Panel from "./Panel";
import { useConcierge } from "./ConciergeContext";

const CTA_CLASS =
  "group/cta mt-7 !inline-flex w-fit items-center gap-1.5 border-b border-[var(--ink)]/40 pb-1 k-label !tracking-[0.14em] !text-[var(--pine)] transition-colors hover:border-[var(--pine)]";

export default function Spotlight() {
  const { openConcierge } = useConcierge();

  return (
    <div id="stays" className="scroll-mt-20">
      <Panel
        label="Houseboats"
        lines={["Traditional", "Houseboats", "on Dal Lake"]}
        image="houseboat"
        alt="A traditional wooden houseboat on Nagin Lake, Kashmir"
        caption="Nagin Lake, Srinagar"
        body={
          <>
            <p>
              Our houseboats on Dal and Nagin Lake are beautifully hand-carved wooden boats, passed
              down through generations. You get the whole houseboat to yourself, plus a private cook
              and a boatman on call.
            </p>
            <button type="button" onClick={() => openConcierge("Dal Lake Houseboat Stay")} className={CTA_CLASS}>
              Book This Houseboat
              <ArrowUpRight size={14} />
            </button>
          </>
        }
      />

      <Panel
        reverse
        label="Hotels & Resorts"
        lines={["Five-Star", "Hotels &", "Resorts"]}
        image="hotel"
        alt="A luxury five-star resort surrounded by mountains near Gulmarg, Kashmir"
        caption="Gulmarg & Srinagar"
        body={
          <>
            <p>
              Prefer a proper hotel? We book you into Kashmir&apos;s best five-star hotels and
              resorts — grand lakeside properties in Srinagar and alpine spa resorts in Gulmarg — with
              rooms, views and rates we&apos;ve secured for our guests. Ideal for families and first
              visits.
            </p>
            <button type="button" onClick={() => openConcierge("A custom trip")} className={CTA_CLASS}>
              See Our Hotels
              <ArrowUpRight size={14} />
            </button>
          </>
        }
      />

      <Panel
        label="Mountain Cabins"
        lines={["Cosy Cabins", "in the", "Mountains"]}
        image="chalet"
        alt="A wooden cabin in the snowy mountains above Gulmarg, Kashmir"
        caption="Gulmarg, 2,650m"
        body={
          <>
            <p>
              We keep a small number of wooden cabins and riverside cottages in Gulmarg and
              Pahalgam — quiet, private, and never crowded. Helicopter transfers are available if
              you want them, along with a host who lives on site.
            </p>
            <button type="button" onClick={() => openConcierge("Gulmarg Skiing Trip")} className={CTA_CLASS}>
              Book This Cabin
              <ArrowUpRight size={14} />
            </button>
          </>
        }
      />
    </div>
  );
}
