import Image from "next/image";
import Link from "next/link";

export default function HeroPrimary() {
  return (
    <section className="relative overflow-hidden min-h-[60vh]">
      {/* Background image layer */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-offshore.png"  // <- your PNG file
          alt="Offshore platform"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Dark overlay above the image */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

      {/* Foreground content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 md:py-36">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Energy for people, progress for society
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/90">
            Focused North Sea operator with resilient production and disciplined capital allocation.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              href="/investors"
              className="rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black hover:bg-white/90"
            >
              Investor Centre
            </Link>
            <Link
              href="/assets"
              className="rounded-lg border border-white/60 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10"
            >
              View Assets
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
