import React from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function AssetsPage() {
  const trail = [{ label: "Home", href: "/" }, { label: "Assets" }];

  return (
    <div className="space-y-12">
      <PageHero
        imageSrc="/images/assets/field-map-1.png"
        imageAlt="Field map of BlueNord assets in the North Sea"
        title="Assets"
        intro="North Sea portfolio overview and key development areas."
        mode="contain"
      />
      <main className="mx-auto max-w-6xl px-4 space-y-12">
        <Breadcrumbs trail={trail} />
        <Section eyebrow="Fields" title="Explore the fields">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/assets/tyra" className="block rounded-2xl border p-5 hover:shadow focus:outline-none focus:ring">
              <h3 className="font-semibold">Tyra</h3>
              <p className="opacity-70 text-sm">Redevelopment & key milestones</p>
            </Link>
            <Link href="/assets/halfdan" className="block rounded-2xl border p-5 hover:shadow focus:outline-none focus:ring">
              <h3 className="font-semibold">Halfdan</h3>
              <p className="opacity-70 text-sm">Overview & media</p>
            </Link>
            <Link href="/assets/dan" className="block rounded-2xl border p-5 hover:shadow focus:outline-none focus:ring">
              <h3 className="font-semibold">Dan</h3>
              <p className="opacity-70 text-sm">Overview & media</p>
            </Link>
            <Link href="/assets/gorm" className="block rounded-2xl border p-5 hover:shadow focus:outline-none focus:ring">
              <h3 className="font-semibold">Gorm</h3>
              <p className="opacity-70 text-sm">Overview & media</p>
            </Link>
          </div>
        </Section>
        <Breadcrumbs trail={trail} />
      </main>
    </div>
  );
}