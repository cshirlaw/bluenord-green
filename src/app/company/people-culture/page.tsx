import React from "react";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function PeopleCulturePage() {
  const trail = [{ label: "Home", href: "/" }, { label: "Company", href: "/company" }, { label: "People & culture" }];

  return (
    <div className="space-y-12">
      <PageHero
        imageSrc="/images/hero-offshore.png"
        imageAlt="People and culture"
        title="People & culture"
        intro="Capability, wellbeing and inclusion."
      />
      <main className="mx-auto max-w-6xl px-4 space-y-12">
        <Breadcrumbs trail={trail} />
        <Section eyebrow="Overview" title="Our people">
          <div className="prose max-w-none">
            <p>Add your copy for people & culture here.</p>
          </div>
        </Section>
        <Breadcrumbs trail={trail} />
      </main>
    </div>
  );
}