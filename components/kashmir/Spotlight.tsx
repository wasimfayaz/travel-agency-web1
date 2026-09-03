"use client";

import { ArrowUpRight } from "lucide-react";
import Panel from "./Panel";
import { useConcierge } from "./ConciergeContext";

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
            <button
              type="button"
              onClick={() => openConcierge("Dal Lake Houseboat Stay")}
              className="group/cta mt-7 !inline-flex w-fit items-center gap-1.5 border-b border-[var(--ink)]/40 pb-1 k-label !tracking-[0.14em] !text-[var(--pine)] transition-colors hover:border-[var(--pine)]"
            >
              Book This Houseboat
              <ArrowUpRight size={14} />
            </button>
          </>
        }
      />

      <Panel
        reverse
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
            <button
              type="button"
              onClick={() => openConcierge("Gulmarg Skiing Trip")}
              className="group/cta mt-7 !inline-flex w-fit items-center gap-1.5 border-b border-[var(--ink)]/40 pb-1 k-label !tracking-[0.14em] !text-[var(--pine)] transition-colors hover:border-[var(--pine)]"
            >
              Book This Cabin
              <ArrowUpRight size={14} />
            </button>
          </>
        }
      />
    </div>
  );
}
