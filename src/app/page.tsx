import React from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import StatsRow from "@/components/StatsRow";
import VideoEmbed from "@/components/VideoEmbed";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <PageHero
        imageSrc="/images/hero-offshore.png"
        imageAlt="BlueNord offshore"
        title="BlueNord"
        intro="Focused North Sea operator delivering reliable value."
      >
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/company" className="block rounded-2xl bg-white/95 backdrop-blur border p-4 hover:shadow focus:outline-none focus:ring">
            <h3 className="font-semibold">Company</h3>
            <p className="text-sm opacity-70">At a glance</p>
          </Link>
          <Link href="/assets" className="block rounded-2xl bg-white/95 backdrop-blur border p-4 hover:shadow focus:outline-none focus:ring">
            <h3 className="font-semibold">Assets</h3>
            <p className="text-sm opacity-70">Tyra, Halfdan, Dan, Gorm</p>
          </Link>
          <Link href="/investors" className="block rounded-2xl bg-white/95 backdrop-blur border p-4 hover:shadow focus:outline-none focus:ring">
            <h3 className="font-semibold">Investors</h3>
            <p className="text-sm opacity-70">Reports, Share & Debt</p>
          </Link>
          <Link href="/financials" className="block rounded-2xl bg-white/95 backdrop-blur border p-4 hover:shadow focus:outline-none focus:ring">
            <h3 className="font-semibold">Financials</h3>
            <p className="text-sm opacity-70">Key metrics & featured PDF</p>
          </Link>
        </div>
      </PageHero>

      <main className="mx-auto max-w-6xl px-4 space-y-12">
        <Section eyebrow="Highlights" title="Key metrics">
          <StatsRow />
        </Section>

        <Section eyebrow="Media" title="Noreco to BlueNord">
          <VideoEmbed src="https://player.vimeo.com/video/840426356" title="Noreco to BlueNord" />
        </Section>
      </main>
    </div>
  );
}