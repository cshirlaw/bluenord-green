"use client";
import React from "react";

export default function VideoEmbed({ src, title }: { src: string; title?: string }) {
  return (
    <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
      <iframe
        src={src}
        title={title || "Embedded video"}
        className="absolute inset-0 h-full w-full rounded-xl border"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}