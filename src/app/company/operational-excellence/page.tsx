import React from "react";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function OperationalExcellencePage() {
  const trail = [{ label: "Home", href: "/" }, { label: "Company", href: "/company" }, { label: "Operational excellence" }];

  return (
    <div className="space-y-12">
      <PageHero
        imageSrc="/images/hero-offshore.png"
        imageAlt="Operational excellence"
        title="Operational excellence"
        intro="Reliability, uptime and continuous improvement."
      />
      <main className="mx-auto max-w-6xl px-4 space-y-12">
        <Breadcrumbs trail={trail} />
        <Section eyebrow="Overview" title="Our approach">
          <div className="prose max-w-none">
            <p>Add your copy for operational excellence here.</p>
          </div>
        </Section>
        <Breadcrumbs trail={trail} />
      </main>
    </div>
  );
}