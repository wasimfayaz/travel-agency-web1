import type { Metadata } from "next";
import "./globals.css";

const SITE = "https://serai-kashmir.com";

export const metadata: Metadata = {
  title: {
    default: "Bespoke Kashmir Travel Agency | Luxury Kashmir Itineraries — SERAI",
    template: "%s | SERAI — Bespoke Kashmir",
  },
  description:
    "SERAI is a bespoke Kashmir travel agency composing luxury Kashmir itineraries — private Dal Lake heritage houseboats, Gulmarg ski & heli experiences, private Pahalgam retreats and offbeat Gurez Valley tours, arranged by Srinagar-born specialists.",
  keywords: [
    "Kashmir Tour Packages",
    "Bespoke Kashmir Travel Agency",
    "Luxury Kashmir Itineraries",
    "Gulmarg Ski Experiences",
    "Dal Lake Heritage Houseboats",
    "Private Pahalgam Retreats",
    "Offbeat Gurez Valley Tours",
    "Kashmir luxury travel",
  ],
  metadataBase: new URL(SITE),
  openGraph: {
    title: "SERAI — Bespoke Kashmir Travel Agency",
    description:
      "Luxury Kashmir itineraries composed by Srinagar-born specialists: Dal Lake houseboats, Gulmarg heli-ski, Pahalgam retreats and the offbeat Gurez Valley.",
    url: SITE,
    type: "website",
    locale: "en_US",
    siteName: "SERAI — Bespoke Kashmir",
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="k-root min-h-screen">{children}</body>
    </html>
  );
}
