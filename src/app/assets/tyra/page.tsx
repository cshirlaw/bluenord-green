import React from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import VideoEmbed from "@/components/VideoEmbed";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function TyraPage() {
  const trail = [
    { label: "Home", href: "/" },
    { label: "Assets", href: "/assets" },
    { label: "Tyra" }
  ];
  const photos = [{ src: "/images/hero-offshore.png", alt: "Offshore platform" }];

  return (
    <div className="space-y-8">
      <PageHero
        imageSrc="/images/hero-offshore.png"
        imageAlt="Tyra field"
        title="Tyra"
        intro="Overview, media, and key milestones for the Tyra redevelopment."
      />
      <main className="mx-auto max-w-6xl px-4 space-y-12">
        <Breadcrumbs trail={trail} />

        <Section eyebrow="Overview" title="Field summary">
          <div className="prose max-w-none">
            <p>Tyra text…</p>
          </div>
        </Section>

        <Section eyebrow="Media" title="Tyra development">
          <VideoEmbed src="https://player.vimeo.com/video/657831189" title="Tyra development" />
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
              <Link href="/assets/gorm" className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 hover:shadow focus:outline-none focus:ring">
                <span>←</span><span>Gorm</span>
              </Link>
            </div>
            <div className="justify-self-center">
              <Link href="/assets" className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 hover:shadow focus:outline-none focus:ring">
                All assets
              </Link>
            </div>
            <div className="justify-self-end">
              <Link href="/assets/halfdan" className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 hover:shadow focus:outline-none focus:ring">
                <span>Halfdan</span><span>→</span>
              </Link>
            </div>
          </div>
        </section>

        <Breadcrumbs trail={trail} />
      </main>
    </div>
  );
}