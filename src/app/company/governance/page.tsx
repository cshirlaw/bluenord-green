import React from "react";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function GovernancePage() {
  const trail = [{ label: "Home", href: "/" }, { label: "Company", href: "/company" }, { label: "Governance" }];

  return (
    <div className="space-y-12">
      <PageHero
        imageSrc="/images/hero-offshore.png"
        imageAlt="Governance"
        title="Governance"
        intro="Risk management, integrity and accountability."
      />
      <main className="mx-auto max-w-6xl px-4 space-y-12">
        <Breadcrumbs trail={trail} />
        <Section eyebrow="Overview" title="Our governance framework">
          <div className="prose max-w-none">
            <p>Add your copy for governance here.</p>
          </div>
        </Section>
        <Breadcrumbs trail={trail} />
      </main>
    </div>
  );
}