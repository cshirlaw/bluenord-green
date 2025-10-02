import HeroBanner from "@/components/HeroBanner";
// If you later add assets.json, you can pull title/intro from there.

export default function AssetsHero() {
  return (
    <HeroBanner
      imageSrc="/images/hero-assets.jpg"
      imageAlt="North Sea assets"
      title="Assets"
      intro="North Sea portfolio overview and key development areas."
      primaryCta={{ href: "/company", label: "About BlueNord" }}
      secondaryCta={{ href: "/investors", label: "Investor centre" }}
    />
  );
}
