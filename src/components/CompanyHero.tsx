import HeroBanner from "@/components/HeroBanner";
import company from "@/content/company.json";

export default function CompanyHero() {
  const { hero } = company as { hero: { title: string; intro?: string } };
  return (
    <HeroBanner
      imageSrc="/images/hero-company.jpg"   // add this image in step 2
      imageAlt="BlueNord company"
      title={hero.title}
      intro={hero.intro}
      primaryCta={{ href: "/assets", label: "View assets" }}
      secondaryCta={{ href: "/contact", label: "Contact us" }}
    />
  );
}

