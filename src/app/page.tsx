import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "BlueNord-Green",
  description:
    "Demo site showcasing Renewables 2025 alongside the core BlueNord experience.",
};

export default function Home() {
  // Four navigation cards on the homepage
  const cards = [
    { href: "/investors", label: "Investors", desc: "Reports and shareholder info" },
    { href: "/renewables", label: "Renewables 2025", desc: "Wind & solar KPIs and reports" },
    { href: "/assets/tyra", label: "Assets", desc: "Tyra, Gorm, Dan, Halfdan" },
    { href: "/financials", label: "Financials", desc: "Results and presentations" },
  ].slice(0, 4); // keep at 4 cards on home

  return (
    <main>
      {/* HERO */}
      <section className="relative border-b bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 px-4 py-10 md:grid-cols-2">
          <div className="w-full justify-self-start">
            <h1 className="text-3xl font-bold leading-tight">
              BlueNord-Green: Renewables 2025
            </h1>
            <p className="mt-3 text-neutral-700">
              A live demonstration of how BlueNord could present wind &amp; solar alongside its
              core operations: credible KPIs, investor-grade reports, and strong visuals.
            </p>
            <div className="mt-5 flex gap-3">
              <Link
                href="/renewables"
                className="inline-flex items-center rounded-xl bg-green-600 px-4 py-2 font-medium text-white hover:opacity-90"
              >
                Explore Renewables 2025
              </Link>
              <Link
                href="/assets/tyra"
                className="inline-flex items-center rounded-xl border px-4 py-2 font-medium hover:bg-neutral-100"
              >
                View Assets
              </Link>
            </div>
          </div>

          {/* New hero image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border">
            <Image
              src="/home/green-hero.jpg" // ensure file exists at public/home/green-hero.jpg
              alt="Wind turbines and solar array representing BlueNord-Green"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* FOUR CARDS */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {cards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <div className="text-sm text-neutral-500">{c.desc}</div>
              <div className="mt-1 text-lg font-semibold group-hover:text-green-600">
                {c.label}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}