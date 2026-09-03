"use client";

import Panel from "./Panel";

export default function Defines() {
  return (
    <Panel
      id="defines"
      label="What Defines Us"
      lines={["Native.", "Discreet.", "Quietly Present."]}
      image="dal"
      alt="Dawn on Dal Lake, Srinagar — a shikara crossing still water beneath the Kashmir Himalaya"
      caption="Dal Lake, Srinagar"
      body={
        <>
          <p>
            For over two decades our specialists have arranged private journeys through the Vale from
            an office on the Boulevard, a few minutes from the water. We are Srinagar-born; the
            houseboat, the guide and the mountain host are people we know by name.
          </p>
          <p className="mt-5">
            That is what makes a bespoke Kashmir travel agency worth the name — not a catalogue of
            Kashmir tour packages, but the judgement to say what is genuinely exceptional, and the
            restraint to leave the rest out.
          </p>
        </>
      }
    />
  );
}
