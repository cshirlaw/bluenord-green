"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

type CTA = { href: string; label: string };

export type HeroBannerProps = {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  intro?: string;
  primaryCta?: CTA;
  secondaryCta?: CTA;
  sources?: string[];
};

export default function HeroBanner({
  imageSrc,
  imageAlt = "BlueNord",
  title = "BlueNord",
  intro = "Focused North Sea operator. Explore investor information, reports and assets.",
  primaryCta,
  secondaryCta,
  sources = ["/images/tyra.jpg", "/images/tyra.png", "/images/tyra.webp", "/images/hero-offshore.png"],
}: HeroBannerProps) {
  const [i, setI] = React.useState(0);
  const src = imageSrc || sources[i] || sources[sources.length - 1];

  return (
    <section className="relative rounded-3xl overflow-hidden border">
      <div className="relative h-[58vw] sm:h-[42vw] lg:h-[34vw] xl:h-[30vw] 2xl:h-[28vw]">
        <Image
          src={src}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          onError={() => setI((n) => Math.min(n + 1, sources.length - 1))}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="px-6 py-8 sm:px-10 lg:px-16">
            <div className="max-w-3xl space-y-3 text-white">
              <h1 className="text-3xl sm:text-4xl font-semibold">{title}</h1>
              <p className="text-base sm:text-lg text-white/90">{intro}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                {primaryCta ? (
                  <Link
                    href={primaryCta.href}
                    className="rounded-xl border border-white/30 bg-white/90 text-black px-4 py-2 hover:bg-white"
                  >
                    {primaryCta.label}
                  </Link>
                ) : (
                  <Link
                    href="/investors"
                    className="rounded-xl border border-white/30 bg-white/90 text-black px-4 py-2 hover:bg-white"
                  >
                    Investors
                  </Link>
                )}
                {secondaryCta ? (
                  <Link
                    href={secondaryCta.href}
                    className="rounded-xl border border-white/30 bg-white/90 text-black px-4 py-2 hover:bg-white"
                  >
                    {secondaryCta.label}
                  </Link>
                ) : (
                  <Link
                    href="/investors/reports"
                    className="rounded-xl border border-white/30 bg-white/90 text-black px-4 py-2 hover:bg-white"
                  >
                    Reports &amp; Presentations
                  </Link>
                )}
                <Link
                  href="/assets"
                  className="rounded-xl border border-white/30 bg-white/90 text-black px-4 py-2 hover:bg-white"
                >
                  Assets
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
