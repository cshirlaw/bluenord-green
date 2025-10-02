import React from "react";
import PageHero from "@/components/PageHero";
import InvestorsClient from "@/components/InvestorsClient";

export default function PresentationsPage() {
  return (
    <div className="space-y-12">
      <PageHero
        imageSrc="/images/hero-offshore.png"
        imageAlt="Presentations"
        title="Presentations"
        intro="Decks and slides for analysts and shareholders."
      />
      <main className="mx-auto max-w-6xl px-4">
        <InvestorsClient initialKind="presentation" />
      </main>
    </div>
  );
}