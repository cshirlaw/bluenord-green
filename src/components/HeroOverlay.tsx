"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

type CTA = { href: string; label: string };

export default function HeroOverlay({
  title = "BlueNord",
  subtitle = "Focused North Sea operator. Explore investor information, reports and assets.",
  ctas = [
    { href: "/investors", label: "Investors" },
    { href: "/investors/reports", label: "Reports & Presentations" },
    { href: "/assets", label: "Assets" }
  ],
  // only use the file that exists
  sources = ["/images/hero-offshore.png"],
}: {
  title?: string;
  subtitle?: string;
  ctas?: CTA[];
  sources?: string[];
}) {
  const [i] = React.useState(0);
  const src = sources[0];

  return (
    <section className="relative rounded-3xl overflow-hidden border">
      <div className="relative h-[88vw] sm:h-[50vw] lg:h-[34vw] xl:h-[30vw]">
        <Image
          src={src}
          alt="BlueNord"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-5 sm:px-10 lg:px-16 pb-6 sm:pb-10 lg:pb-14">
            <div className="max-w-3xl space-y-3 text-white">
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-semibold leading-tight">{title}</h1>
              <p className="text-[13.5px] sm:text-base text-white/90">{subtitle}</p>
              <div className="flex flex-wrap gap-3 pt-1.5">
                {ctas.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="rounded-xl border border-white/30 bg-white/90 text-black px-4 py-2 hover:bg-white focus-visible:ring-2 focus-visible:ring-black/25"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
