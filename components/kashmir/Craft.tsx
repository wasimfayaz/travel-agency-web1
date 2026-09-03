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
      lines={["Personal.", "Discreet.", "Intentful."]}
      image="pahalgam"
      alt="The Lidder valley at Pahalgam, Kashmir — deodar forest above a river"
      caption="Lidder Valley, Pahalgam"
      body={
        <p>
          We work by introduction. Every journey we design, from a week on the water to an expedition
          over the Razdan Pass, is arranged with intent and precision — permits, weather windows, the
          right host. Luxury, to us, is not in what is seen, but in what is felt.
        </p>
      }
    />
  );
}
