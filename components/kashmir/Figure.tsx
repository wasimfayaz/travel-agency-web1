"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Art-directed figure. A duotone ground is painted first so the panel always
 * reads as intentional; the photograph fades in over it once loaded, and on
 * any load error we simply keep the colour field (never a broken-image icon).
 */

type Key = "hero" | "dal" | "gulmarg" | "pahalgam" | "gurez" | "houseboat" | "chalet";

// Editorial landscape photography (Himalayan lake / pine / snow moods).
const SOURCES: Record<Key, string> = {
  hero: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80",
  // Streamed directly from Unsplash (free-to-use stock photography), same
  // approach as the hero video — swap this URL to replace the About Us photo.
  dal: "https://images.unsplash.com/photo-1661747340818-df15f186554e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGthc2htaXIlMjB2YWxsZXl8ZW58MHx8MHx8fDA%3D",
  gulmarg: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
  pahalgam: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
  gurez: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
  // Self-hosted from /public/media — a real Kashmir houseboat, not stock.
  houseboat: "/media/houseboat.png",
  // Self-hosted from /public/media — a real cozy cabin, not stock.
  chalet: "/media/cabin.png",
};

export default function Figure({
  image,
  alt,
  className = "",
  imgClassName = "",
  priority = false,
}: {
  image: Key;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Handle cached/already-complete images: a ref callback's synchronous
  // check can race the browser's own "complete" bookkeeping, so re-check
  // after paint too — this is the reliable path for a cache hit, while
  // onLoad below covers a genuine fresh network fetch.
  useEffect(() => {
    const node = imgRef.current;
    if (node?.complete && node.naturalWidth > 0) setLoaded(true);
  }, [image]);

  return (
    <div className={`k-figure k-duo-${image} ${className}`}>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={SOURCES[image]}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
          style={{ opacity: loaded ? 1 : 0 }}
        />
      )}
    </div>
  );
}
