"use client";

import { useState } from "react";

/**
 * Art-directed figure. A duotone ground is painted first so the panel always
 * reads as intentional; the photograph fades in over it once loaded, and on
 * any load error we simply keep the colour field (never a broken-image icon).
 */

type Key = "hero" | "dal" | "gulmarg" | "pahalgam" | "gurez" | "houseboat" | "chalet";

// Editorial landscape photography (Himalayan lake / pine / snow moods).
const SOURCES: Record<Key, string> = {
  hero: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80",
  dal: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1600&q=80",
  gulmarg: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
  pahalgam: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
  gurez: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
  houseboat: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80",
  chalet: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1600&q=80",
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

  return (
    <div className={`k-figure k-duo-${image} ${className}`}>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          // Handle cached images: if the node is already complete on mount,
          // onLoad may never fire — mark loaded from the ref callback.
          ref={(node) => {
            if (node?.complete && node.naturalWidth > 0) setLoaded(true);
          }}
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
