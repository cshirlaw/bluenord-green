import Image from "next/image";
import Link from "next/link";

export default function HeroSplit({
  title = "BlueNord Company",
  subtitle = "Operational excellence with a long-term perspective.",
  image = "/images/rig-deck.jpg",
  ctaHref = "/company#leadership",
  ctaLabel = "Leadership",
}: {
  title?: string;
  subtitle?: string;
  image?: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <section className="border-b bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
        <div>
          <h1 className="text-3xl font-semibold md:text-4xl">{title}</h1>
          <p className="mt-4 text-black/70">{subtitle}</p>
          <div className="mt-6">
            <Link href={ctaHref} className="rounded-lg border px-4 py-2.5 text-sm font-medium hover:bg-black hover:text-white">
              {ctaLabel}
            </Link>
          </div>
        </div>
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
          <Image src={image} alt="Operational imagery" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
