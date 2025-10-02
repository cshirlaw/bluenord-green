import React from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import VideoEmbed from "@/components/VideoEmbed";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function DanPage() {
  const trail = [
    { label: "Home", href: "/" },
    { label: "Assets", href: "/assets" },
    { label: "Dan" }
  ];
  const photos = [{ src: "/images/assets/dan/dan-1.png", alt: "Dan field" }];
  const videoSrc = "";

  return (
    <div className="space-y-8">
      <PageHero
        imageSrc="/images/assets/dan/dan-1.png"
        imageAlt="Dan field"
        title="Dan"
        intro="Overview, media, and key information for the Dan field."
      />
      <main className="mx-auto max-w-6xl px-4 space-y-12">
        <Breadcrumbs trail={trail} />

        <Section eyebrow="Overview" title="Field summary">
          <div className="prose max-w-none">
            <p>Add Dan’s description here. Include partners, production notes, and milestones.</p>
          </div>
        </Section>

        <Section eyebrow="Media" title="Video">
          <VideoEmbed src={videoSrc} title="Dan video" />
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
              <Link href="/assets/halfdan" className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 hover:shadow focus:outline-none focus:ring">
                <span>←</span><span>Halfdan</span>
              </Link>
            </div>
            <div className="justify-self-center">
              <Link href="/assets" className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 hover:shadow focus:outline-none focus:ring">
                All assets
              </Link>
            </div>
            <div className="justify-self-end">
              <Link href="/assets/gorm" className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 hover:shadow focus:outline-none focus:ring">
                <span>Gorm</span><span>→</span>
              </Link>
            </div>
          </div>
        </section>

        <Breadcrumbs trail={trail} />
      </main>
    </div>
  );
}