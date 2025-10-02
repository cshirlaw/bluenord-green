"use client";

import React, { useState } from "react";

export default function SmartHero() {
  const [i, setI] = useState(0);
  const candidates = ["/images/tyra.jpg", "/images/tyra.png", "/images/tyra.webp", "/images/hero-offshore.png"];
  const src = candidates[i] ?? null;
  if (!src) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt="Tyra"
      className="absolute inset-0 h-full w-full object-cover"
      onError={() => setI(i + 1)}
    />
  );
}
