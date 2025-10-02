import HeroBanner from "@/components/HeroBanner";

export default function ContactHero() {
  return (
    <HeroBanner
      imageSrc="/images/hero-contact.jpg"
      imageAlt="Contact BlueNord"
      title="Contact"
      intro="General enquiries and investor relations."
      primaryCta={{ href: "#form", label: "Send a message" }}
      secondaryCta={{ href: "/investors", label: "Investor relations" }}
    />
  );
}
