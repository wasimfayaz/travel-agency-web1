"use client";

import Panel from "./Panel";

export default function Defines() {
  return (
    <Panel
      priority
      id="defines"
      label="About Us"
      lines={["Local.", "Honest.", "Helpful."]}
      image="dal"
      alt="A boat crossing calm water on Dal Lake, Srinagar, with mountains in the background"
      caption="Dal Lake, Srinagar"
      body={
        <>
          <p>
            We&apos;ve been planning trips to Kashmir for over 20 years, from our office in Srinagar,
            just minutes from Dal Lake. Our team grew up here, so we personally know the houseboat
            owners, guides, and mountain hosts we work with.
          </p>
          <p className="mt-5">
            That&apos;s what makes us different from a regular Kashmir travel agency — we don&apos;t
            hand you a long list of tour packages. We tell you honestly what&apos;s worth doing, and
            leave out the rest.
          </p>
        </>
      }
    />
  );
}
