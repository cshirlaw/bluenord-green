import Image from "next/image";
import RenewablesStats from "@/components/RenewablesStats";
import RenewablesReportsClient from "@/components/RenewablesReportsClient";

export const metadata = {
  title: "Renewables 2025 | BlueNord-Green",
  description:
    "BlueNord-Green demonstration: Renewables 2025 hub with KPIs, images, and reports.",
};

const gallery = [
  { src: "/renewables/wind/wind-1.jpg", alt: "Offshore wind farm, turbines at sea" },
  { src: "/renewables/wind/wind-2.jpg", alt: "Wind turbines against cloudy sky" },
  { src: "/renewables/wind/wind-3.jpg", alt: "Maintenance vessel near wind farm" },
  { src: "/renewables/solar/solar-1.jpg", alt: "Utility-scale solar farm at sunrise" },
  { src: "/renewables/solar/solar-2.jpg", alt: "Rows of PV panels, aerial view" },
  { src: "/renewables/solar/solar-3.jpg", alt: "Solar field with service track" },
];

export default function Page() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 px-4 py-10 md:grid-cols-2">
          <div className="w-full justify-self-start text-left">
            <h1 className="text-3xl font-bold leading-tight">
              Renewables 2025: Wind & Solar
            </h1>
            <p className="mt-3 text-neutral-600">
              A forward-looking demonstration of how BlueNord could present its
              energy transition journey in 2025 — with KPIs, investable reports,
              and strong visuals.
            </p>
            <div className="mt-5">
              <a
                href="#reports"
                className="inline-flex items-center rounded-xl bg-green-600 px-4 py-2 font-medium text-white hover:opacity-90"
              >
                View Renewables Reports
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border justify-self-stretch">
            <Image
              src="/renewables/wind/wind-1.jpg"
              alt="Wind farm hero"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* KPIs */}
      <RenewablesStats />

      {/* Gallery */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold text-green-600">Gallery</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((img) => (
            <div
              key={img.src}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Reports */}
      <div id="reports">
        <RenewablesReportsClient />
      </div>

      {/* Vision */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-6">
        <div className="rounded-2xl border bg-white p-6">
          <h3 className="text-xl font-semibold text-green-600">Vision</h3>
          <p className="mt-2 text-neutral-700">
            BlueNord’s offshore expertise, capital discipline, and project
            delivery capability can extend naturally into wind and solar. This
            investor-facing demo illustrates how an energy transition narrative
            can be communicated with substance and clarity.
          </p>
        </div>
      </section>
    </main>
  );
}