"use client";

import Panel from "./Panel";

/**
 * The closing panel. Locked to one viewport so it can pin at top:0 while the
 * beige footer curtains up over it.
 */
export default function Craft() {
  return (
    <Panel
      fullHeight
      id="craft"
      label="How We Work"
      lines={["Personal.", "Private.", "Well Planned."]}
      image="pahalgam"
      alt="The Lidder river valley in Pahalgam, Kashmir, surrounded by pine forest"
      caption="Lidder Valley, Pahalgam"
      body={
        <p>
          We plan every trip carefully, from a relaxing week on the lake to a big trip over the
          Razdan Pass. We sort out the permits, check the weather, and pick the right local host for
          you — so all you have to do is enjoy the trip.
        </p>
      }
    />
  );
}
