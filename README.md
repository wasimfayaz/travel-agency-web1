# SERAI — Bespoke Kashmir

A standalone, ultra-luxury travel agency website for Kashmir, designed on the
quiet-minimalist editorial DNA of [avenueh.com](https://www.avenueh.com/).

Originally prototyped inside the Cinmach Productions repo at `/kashmir`; this
folder is the same site extracted into its own independent Next.js project.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion (editorial scroll reveals, concierge drawer)
- Lucide React (iconography)

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Structure

```
app/
  layout.tsx      Root layout — metadata, fonts, theme
  globals.css      Design tokens, type scale, Tailwind import
  page.tsx         Homepage assembly + TravelAgency/TouristTrip JSON-LD
components/kashmir/
  data.ts               Content model (journeys, stays, stats, copy)
  Nav.tsx               Floating header + mobile drawer
  Hero.tsx              Editorial hero with live Srinagar clock
  Journeys.tsx          Curated Kashmir itinerary grid
  Spotlight.tsx         Houseboats & alpine chalets storytelling
  Trust.tsx             Pillars, stats, testimonials
  ConciergeContext.tsx  Enquiry-drawer state
  ConciergeDrawer.tsx   Slide-in bespoke enquiry form
  Footer.tsx            Architectural footer + links
  Reveal.tsx            Scroll-reveal motion primitive
  Figure.tsx            Art-directed image panels w/ duotone fallback
```

## Notes for production

- Photography in [`components/kashmir/Figure.tsx`](components/kashmir/Figure.tsx)
  currently uses generic Himalayan stock photography (Unsplash). Replace the
  `SOURCES` map with licensed, Kashmir-specific imagery before launch.
- The concierge form (`ConciergeDrawer.tsx`) currently just flips to a success
  state locally — wire `handleSubmit` to your CRM/email endpoint.
- SEO keyword clusters are already integrated into `app/layout.tsx` metadata
  and the JSON-LD in `app/page.tsx` (Kashmir Tour Packages, Gulmarg Ski
  Experiences, Dal Lake Heritage Houseboats, Private Pahalgam Retreats,
  Offbeat Gurez Valley Tours).
