/**
 * Content model for the SERAI — Bespoke Kashmir microsite.
 * Copy is written to read as editorial luxury while carrying the target
 * keyword clusters (Kashmir tour packages, bespoke Kashmir travel agency,
 * luxury Kashmir itineraries, Gulmarg ski, Dal Lake houseboats, Pahalgam
 * retreats, Gurez valley) naturally within headings and body prose.
 */

export const brand = {
  name: "SERAI",
  descriptor: "Bespoke Kashmir",
  established: "Est. Srinagar · 1998",
  tagline: "A bespoke Kashmir travel agency composing private journeys through the Vale.",
  email: "journeys@serai-kashmir.com",
  phoneLabel: "+91 194 000 0000",
  whatsapp: "https://wa.me/910000000000",
  address: "Boulevard Road, Dal Lake · Srinagar 190001 · Jammu & Kashmir, India",
} as const;

export const nav = [
  { label: "Journeys", href: "#journeys" },
  { label: "Stays", href: "#stays" },
  { label: "Our Craft", href: "#craft" },
  { label: "The Vale", href: "#heritage" },
] as const;

export type Journey = {
  id: string;
  index: string;
  name: string;
  region: string;
  nights: string;
  route: string;
  blurb: string;
  inclusions: string[];
  priceNote: string;
  image: string;
  keyword: string;
};

export const journeys: Journey[] = [
  {
    id: "dal-lake-heritage",
    index: "01",
    name: "The Dal Lake Heritage",
    region: "Srinagar",
    nights: "5 nights",
    route: "Srinagar · Nishat · Nagin · Old City",
    blurb:
      "A slow immersion in the old capital. Wake aboard a private, hand-carved cedar houseboat on Dal Lake, drift the floating gardens by shikara at first light, and take the Mughal gardens before the crowds arrive.",
    inclusions: [
      "Private Dal Lake heritage houseboat",
      "Dawn shikara & floating-market visit",
      "Srinagar-born cultural historian",
    ],
    priceNote: "From ₹4.8L · per couple",
    image: "dal",
    keyword: "Dal Lake Heritage Houseboats",
  },
  {
    id: "gulmarg-alpine",
    index: "02",
    name: "Gulmarg Alpine & Powder",
    region: "Gulmarg",
    nights: "6 nights",
    route: "Srinagar · Tangmarg · Gulmarg · Apharwat",
    blurb:
      "The meadow of flowers turns to a private ski theatre. Days of curated Gulmarg ski experiences on Apharwat's upper bowls, guided heli-ski descents, and long evenings by the fire in a secluded pine chalet.",
    inclusions: [
      "Private heli-ski & off-piste guide",
      "World's-highest gondola, reserved runs",
      "Secluded alpine pine chalet",
    ],
    priceNote: "From ₹7.2L · per couple",
    image: "gulmarg",
    keyword: "Gulmarg Ski Experiences",
  },
  {
    id: "pahalgam-retreat",
    index: "03",
    name: "The Pahalgam Retreat",
    region: "Pahalgam",
    nights: "4 nights",
    route: "Srinagar · Pampore · Aru · Betaab",
    blurb:
      "An unhurried private Pahalgam retreat along the Lidder. Riverside cottages under deodar, quiet trout mornings, and horseback afternoons into the Aru and Betaab valleys with a private naturalist.",
    inclusions: [
      "Riverside deodar cottage, exclusive use",
      "Private Lidder valley & Aru guide",
      "Fly-fishing & meadow picnic",
    ],
    priceNote: "From ₹3.9L · per couple",
    image: "pahalgam",
    keyword: "Private Pahalgam Retreats",
  },
  {
    id: "gurez-frontier",
    index: "04",
    name: "Gurez, the Northern Frontier",
    region: "Gurez Valley",
    nights: "7 nights",
    route: "Srinagar · Bandipora · Razdan · Dawar",
    blurb:
      "For the few. An offbeat Gurez Valley expedition over the Razdan Pass to the Kishanganga — Dard-Shin villages, log homes, and the pyramid of Habba Khatoon, arranged with the discretion the frontier requires.",
    inclusions: [
      "Permits & frontier logistics handled",
      "Dard-Shin village host & interpreter",
      "Habba Khatoon base walk",
    ],
    priceNote: "On request",
    image: "gurez",
    keyword: "Offbeat Gurez Valley Tours",
  },
];

export const stays = [
  {
    id: "houseboats",
    kicker: "The Cedar Houseboats",
    title: "Handcrafted deodar, moored in stillness",
    body:
      "Our signature Dal and Nagin Lake houseboats are heirlooms — walnut fretwork, khatamband ceilings, and verandahs that meet the water. Each is taken on exclusive use, staffed by a private cook and a shikara at your call, so the lake becomes a wing of your home.",
    image: "houseboat",
    meta: ["Nagin & Dal Lake", "Exclusive use", "Private cook & shikara"],
  },
  {
    id: "chalets",
    kicker: "The Alpine Chalets",
    title: "Firelit pine, above the tree line",
    body:
      "In Gulmarg and Pahalgam we hold a small collection of pine chalets and riverside cottages — deliberately few, deliberately quiet. Heli-access on request, a resident host, and the kind of silence that only altitude and deodar forest can keep.",
    image: "chalet",
    meta: ["Gulmarg & Pahalgam", "Heli-access", "Resident host"],
  },
];

export const stats = [
  { value: "26", label: "Winters on the water" },
  { value: "400+", label: "Private journeys composed" },
  { value: "100%", label: "Srinagar-born specialists" },
  { value: "31", label: "Countries hosted" },
];

export const testimonials = [
  {
    quote:
      "They did not sell us a tour of Kashmir; they lent us their Kashmir. Every door opened before we reached it, and nothing once felt arranged.",
    author: "H. & M. Renaud",
    detail: "Private journey · Dal Lake & Gulmarg",
  },
  {
    quote:
      "The most discreet operators we have travelled with, anywhere. Native, unhurried, and quietly exacting about every hour.",
    author: "A. Vill.",
    detail: "Bespoke itinerary · Gurez & Pahalgam",
  },
];

export const journeyOptions = [
  "The Dal Lake Heritage",
  "Gulmarg Alpine & Powder",
  "The Pahalgam Retreat",
  "Gurez, the Northern Frontier",
  "A wholly bespoke itinerary",
];
