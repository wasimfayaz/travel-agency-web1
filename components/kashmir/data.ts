/**
 * Content model for the SERAI Kashmir travel site.
 * Copy is written in plain, everyday English — short sentences, common
 * words — while still carrying the target keyword clusters (Kashmir tour
 * packages, Kashmir travel agency, Gulmarg skiing, Dal Lake houseboats,
 * Pahalgam trips, Gurez valley) naturally within headings and body text.
 */

export const brand = {
  name: "SERAI",
  descriptor: "Kashmir Travel Agency",
  established: "Est. Srinagar · 1998",
  tagline: "A Kashmir travel agency that plans private trips, houseboats, and tours for you.",
  email: "journeys@serai-kashmir.com",
  phoneLabel: "+91 194 000 0000",
  whatsapp: "https://wa.me/910000000000",
  address: "Boulevard Road, Dal Lake · Srinagar 190001 · Jammu & Kashmir, India",
} as const;

export const nav = [
  { label: "Tour Packages", href: "#journeys" },
  { label: "Hotels & Houseboats", href: "#stays" },
  { label: "How We Work", href: "#craft" },
  { label: "Why Choose Us", href: "#heritage" },
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
    name: "Dal Lake Houseboat Stay",
    region: "Srinagar",
    nights: "5 nights",
    route: "Srinagar · Nishat · Nagin · Old City",
    blurb:
      "Stay on a traditional wooden houseboat on Dal Lake in Srinagar. Take a quiet boat ride at sunrise, visit the floating vegetable market, and see the Mughal Gardens before the crowds arrive.",
    inclusions: [
      "Your own private houseboat on Dal Lake",
      "Sunrise boat ride & floating market visit",
      "A local guide who knows Srinagar well",
    ],
    priceNote: "From ₹4.8L per couple",
    image: "dal",
    keyword: "Dal Lake Heritage Houseboats",
  },
  {
    id: "gulmarg-alpine",
    index: "02",
    name: "Gulmarg Skiing Trip",
    region: "Gulmarg",
    nights: "6 nights",
    route: "Srinagar · Tangmarg · Gulmarg · Apharwat",
    blurb:
      "Ski the slopes of Gulmarg with a private instructor. Ride the world's highest cable car, try heli-skiing on fresh powder, and warm up by the fire in a cosy mountain cabin each evening.",
    inclusions: [
      "Private ski & heli-ski instructor",
      "World's highest cable car, no queues",
      "A cosy cabin high up in the mountains",
    ],
    priceNote: "From ₹7.2L per couple",
    image: "gulmarg",
    keyword: "Gulmarg Ski Experiences",
  },
  {
    id: "pahalgam-retreat",
    index: "03",
    name: "Pahalgam Valley Trip",
    region: "Pahalgam",
    nights: "4 nights",
    route: "Srinagar · Pampore · Aru · Betaab",
    blurb:
      "Slow down by the Lidder River in Pahalgam. Stay in a riverside cottage surrounded by pine trees, go fishing in the morning, and take a horse ride through the Aru and Betaab valleys.",
    inclusions: [
      "A riverside cottage, just for you",
      "A private guide for Pahalgam and Aru valley",
      "A fishing trip and picnic in the meadows",
    ],
    priceNote: "From ₹3.9L per couple",
    image: "pahalgam",
    keyword: "Private Pahalgam Retreats",
  },
  {
    id: "gurez-frontier",
    index: "04",
    name: "Gurez Valley Trip",
    region: "Gurez Valley",
    nights: "7 nights",
    route: "Srinagar · Bandipora · Razdan · Dawar",
    blurb:
      "Visit Gurez, one of the most beautiful and least-visited parts of Kashmir. Drive over the Razdan Pass, stay in a local village, and see the famous Habba Khatoon mountain peak.",
    inclusions: [
      "All permits and travel arranged for you",
      "A local village host and translator",
      "A walk to the base of Habba Khatoon peak",
    ],
    priceNote: "Price on request",
    image: "gurez",
    keyword: "Offbeat Gurez Valley Tours",
  },
];

export const stays = [
  {
    id: "houseboats",
    kicker: "Houseboats",
    title: "Traditional houseboats on the lake",
    body:
      "Our houseboats on Dal and Nagin Lake are beautifully hand-carved wooden boats, passed down through generations. You get the whole houseboat to yourself, plus a private cook and a boatman on call, so the lake feels like your own back yard.",
    image: "houseboat",
    meta: ["Nagin & Dal Lake", "Just for you", "Private cook & boatman"],
  },
  {
    id: "chalets",
    kicker: "Mountain Cabins",
    title: "Cosy cabins high in the mountains",
    body:
      "We keep a small number of wooden cabins and riverside cottages in Gulmarg and Pahalgam — quiet, private, and never crowded. Helicopter transfers are available if you want them, plus a host who lives on site and the kind of peace only the mountains can give.",
    image: "chalet",
    meta: ["Gulmarg & Pahalgam", "Helicopter transfers", "On-site host"],
  },
];

export const stats = [
  { value: "26", label: "Years in business" },
  { value: "400+", label: "Trips planned" },
  { value: "100%", label: "Local Kashmir experts" },
  { value: "31", label: "Countries we've served" },
];

export const testimonials = [
  {
    quote:
      "They didn't just show us Kashmir — they knew it inside out. Every door was already open before we got there, and nothing ever felt rushed or planned last-minute.",
    author: "H. & M. Renaud",
    detail: "Trip to Dal Lake & Gulmarg",
  },
  {
    quote:
      "The most professional and caring team we've ever travelled with. Friendly, relaxed, and on top of every little detail.",
    author: "A. Vill.",
    detail: "Custom trip to Gurez & Pahalgam",
  },
];

export const journeyOptions = [
  "Dal Lake Houseboat Stay",
  "Gulmarg Skiing Trip",
  "Pahalgam Valley Trip",
  "Gurez Valley Trip",
  "A custom trip",
];
