import React from "react";
import Link from "next/link";

export default function InvestorsHub() {
  const cards = [
    { href: "/investors/reports", title: "Reports & Results", desc: "Financial reports, results, and downloads." },
    { href: "/investors/presentations", title: "Presentations", desc: "Investor decks and slide PDFs." },
    { href: "/investors/financial-calendar", title: "Financial Calendar", desc: "Key dates, reporting and events." },
    { href: "/investors/news", title: "Regulatory News", desc: "Company announcements and updates." },
    { href: "/investors/governance", title: "Governance & ESG", desc: "Policies, governance and ESG materials." },
    { href: "/investors/contacts", title: "IR Contacts", desc: "Who to contact for investor relations." },
  ];

  return (
    <main className="container mx-auto max-w-6xl px-4 py-8 space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Investors</h1>
        <p className="opacity-70">Everything for shareholders and analysts in one place.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.href} href={c.href}
            className="rounded-2xl border p-5 hover:shadow focus:outline-none focus:ring block">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">{c.title}</h2>
              <p className="text-sm opacity-70">{c.desc}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
