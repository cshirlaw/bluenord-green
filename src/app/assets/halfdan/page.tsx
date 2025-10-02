import React from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import VideoEmbed from "@/components/VideoEmbed";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function HalfdanPage() {
  const trail = [
    { label: "Home", href: "/" },
    { label: "Assets", href: "/assets" },
    { label: "Halfdan" }
  ];
  const photos = [{ src: "/images/assets/halfdan/halfdan-1.png", alt: "Halfdan field" }];

  return (
    <div className="space-y-8">
      <PageHero
        imageSrc="/images/assets/halfdan/halfdan-1.png"
        imageAlt="Halfdan field"
        title="Halfdan"
        intro="Overview, media, and key information for the Halfdan field."
      />
      <main className="mx-auto max-w-6xl px-4 space-y-12">
        <Breadcrumbs trail={trail} />

        <Section eyebrow="Overview" title="Field summary">
          <div className="prose max-w-none">
            <p>Add Halfdan’s description here. Include production notes and milestones.</p>
          </div>
        </Section>

        <Section eyebrow="Media" title="Video">
          <VideoEmbed src="https://player.vimeo.com/video/657831147?h=f5589982f8" title="Halfdan video" />
        </Section>

        <Section eyebrow="Gallery" title="Photos">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((p) => (
              <li key={p.src} className="rounded-2xl border overflow-hidden">
                <img src={p.src} alt={p.alt} className="w-full h-48 object-cover" />
              </li>
            ))}
          </ul>
        </Section>

        <section aria-label="Asset navigation" className="pt-4">
          <div className="grid grid-cols-3 items-center">
            <div className="justify-self-start">
              <Link href="/assets/tyra" className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 hover:shadow focus:outline-none focus:ring">
                <span>←</span><span>Tyra</span>
              </Link>
            </div>
            <div className="justify-self-center">
              <Link href="/assets" className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 hover:shadow focus:outline-none focus:ring">
                All assets
              </Link>
            </div>
            <div className="justify-self-end">
              <Link href="/assets/dan" className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 hover:shadow focus:outline-none focus:ring">
                <span>Dan</span><span>→</span>
              </Link>
            </div>
          </div>
        </section>

        <Breadcrumbs trail={trail} />
      </main>
    </div>
  );
}