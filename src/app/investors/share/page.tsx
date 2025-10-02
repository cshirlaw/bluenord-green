import React from "react";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function SharePage() {
  const trail = [
    { label: "Home", href: "/" },
    { label: "Investors", href: "/investors" },
    { label: "Share" }
  ];

  return (
    <div className="space-y-12">
      <PageHero
        imageSrc="/images/hero-offshore.png"
        imageAlt="Share"
        title="Share"
        intro="Key information for current and prospective shareholders."
      />
      <main className="mx-auto max-w-6xl px-4 space-y-12">
        <Breadcrumbs trail={trail} />
        <Section eyebrow="Snapshot" title="Share at a glance">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <li className="rounded-2xl border p-4"><div className="text-xs uppercase opacity-70">Ticker</div><div className="text-xl font-semibold">BNOR</div></li>
            <li className="rounded-2xl border p-4"><div className="text-xs uppercase opacity-70">Exchange</div><div className="text-xl font-semibold">Oslo Børs</div></li>
            <li className="rounded-2xl border p-4"><div className="text-xs uppercase opacity-70">Shares out.</div><div className="text-xl font-semibold">—</div></li>
            <li className="rounded-2xl border p-4"><div className="text-xs uppercase opacity-70">ISIN</div><div className="text-xl font-semibold">—</div></li>
          </ul>
        </Section>
        <Section eyebrow="Ownership" title="Shareholder structure">
          <div className="prose max-w-none">
            <p>Add ownership breakdown and policy notes.</p>
          </div>
        </Section>
        <Section eyebrow="Contacts" title="Investor relations">
          <div className="prose max-w-none">
            <p>IR contact details, email and phone.</p>
          </div>
        </Section>
        <Breadcrumbs trail={trail} />
      </main>
    </div>
  );
}