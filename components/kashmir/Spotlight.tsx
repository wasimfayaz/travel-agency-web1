"use client";

import { ArrowUpRight } from "lucide-react";
import Panel from "./Panel";
import { useConcierge } from "./ConciergeContext";

export default function Spotlight() {
  const { openConcierge } = useConcierge();

  return (
    <div id="stays" className="scroll-mt-20">
      <Panel
        label="The Stays — Houseboats"
        lines={["Handcrafted", "cedar, moored", "in stillness."]}
        image="houseboat"
        alt="A hand-carved cedar heritage houseboat moored on Nagin Lake, Kashmir"
        caption="Nagin Lake, Srinagar"
        body={
          <>
            <p>
              Our Dal and Nagin Lake heritage houseboats are heirlooms — walnut fretwork, khatamband
              ceilings, verandahs that meet the water. Each is taken on exclusive use, with a private
              cook and a shikara at your call.
            </p>
            <button
              type="button"
              onClick={() => openConcierge("The Dal Lake Heritage")}
              className="k-sweep mt-7 inline-flex items-center gap-1.5 k-label !tracking-[0.14em] !text-[var(--ink)]"
            >
              Reserve on exclusive use
              <ArrowUpRight size={14} />
            </button>
          </>
        }
      />

      <Panel
        reverse
        label="The Stays — Chalets"
        lines={["Firelit pine,", "above the", "tree line."]}
        image="chalet"
        alt="A secluded alpine pine chalet above Gulmarg, Kashmir, under snow"
        caption="Gulmarg, 2,650m"
        body={
          <>
            <p>
              In Gulmarg and Pahalgam we hold a small collection of pine chalets and riverside
              cottages — deliberately few, deliberately quiet. Heli-access on request, a resident
              host, and the silence only altitude and deodar can keep.
            </p>
            <button
              type="button"
              onClick={() => openConcierge("Gulmarg Alpine & Powder")}
              className="k-sweep mt-7 inline-flex items-center gap-1.5 k-label !tracking-[0.14em] !text-[var(--ink)]"
            >
              Reserve on exclusive use
              <ArrowUpRight size={14} />
            </button>
          </>
        }
      />
    </div>
  );
}
