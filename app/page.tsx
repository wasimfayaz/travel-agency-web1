import { ConciergeProvider } from "@/components/kashmir/ConciergeContext";
import Nav from "@/components/kashmir/Nav";
import Hero from "@/components/kashmir/Hero";
import Defines from "@/components/kashmir/Defines";
import Journeys from "@/components/kashmir/Journeys";
import Spotlight from "@/components/kashmir/Spotlight";
import Seasons from "@/components/kashmir/Seasons";
import Trust from "@/components/kashmir/Trust";
import Faq from "@/components/kashmir/Faq";
import Craft from "@/components/kashmir/Craft";
import Footer from "@/components/kashmir/Footer";
import ConciergeDrawer from "@/components/kashmir/ConciergeDrawer";
import { brand, faqs, journeys } from "@/components/kashmir/data";

const SITE = "https://serai-kashmir.com";

/** TravelAgency + per-journey TouristTrip structured data. */
function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": `${SITE}/#agency`,
        name: "SERAI — Bespoke Kashmir",
        description:
          "Bespoke Kashmir travel agency composing luxury Kashmir itineraries: Dal Lake heritage houseboats, Gulmarg ski experiences, private Pahalgam retreats and offbeat Gurez Valley tours.",
        url: SITE,
        email: brand.email,
        areaServed: [
          "Kashmir",
          "Srinagar",
          "Dal Lake",
          "Gulmarg",
          "Pahalgam",
          "Gurez Valley",
        ],
        knowsAbout: [
          "Kashmir Tour Packages",
          "Luxury Kashmir Itineraries",
          "Gulmarg Ski Experiences",
          "Dal Lake Heritage Houseboats",
          "Private Pahalgam Retreats",
          "Offbeat Gurez Valley Tours",
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "Boulevard Road, Dal Lake",
          addressLocality: "Srinagar",
          addressRegion: "Jammu & Kashmir",
          postalCode: "190001",
          addressCountry: "IN",
        },
        makesOffer: journeys.map((j) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: j.name,
            description: j.blurb,
            touristType: "Luxury, private travellers",
            itinerary: {
              "@type": "ItemList",
              itemListElement: j.route.split(" · ").map((stop, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: stop,
              })),
            },
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE}/#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export default function HomePage() {
  return (
    <ConciergeProvider>
      <JsonLd />
      <Nav />
      <main className="relative">
        {/* Hero pins at top:0 (z-0) … */}
        <Hero />
        {/* … and this ivory curtain scrolls up over it. */}
        <div className="relative z-10 bg-[var(--paper)]">
          <Defines />
          <Journeys />
          <Spotlight />
          <Seasons />
          <Trust />
          <Faq />
          {/* The closing panel pins in turn (z-0) so the beige footer
              curtains up over it, mirroring the hero. */}
          <div className="sticky top-0 z-0">
            <Craft />
          </div>
          <Footer />
        </div>
      </main>
      <ConciergeDrawer />
    </ConciergeProvider>
  );
}
