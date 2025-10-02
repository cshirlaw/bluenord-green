import Section from "@/components/Section";
import FeatureCard from "@/components/FeatureCard";
import home from "@/content/home.json";

export default function Page() {
  const hero = home.hero;
  const highlights = home.highlights || [];
  const ctas = home.ctas || [];

  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="rounded-3xl border border-brand/20 bg-gradient-to-br from-slate-50 to-white p-10">
        {hero.eyebrow && (
          <div className="text-xs uppercase tracking-wider text-brand">{hero.eyebrow}</div>
        )}
        <h1 className="mt-2 text-3xl md:text-4xl font-semibold">{hero.title}</h1>
        {hero.intro && <p className="mt-3 max-w-3xl text-slate-700">{hero.intro}</p>}

        {/* CTAs */}
        {ctas.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {ctas.map((c: any) => (
              <a
                key={c.label}
                href={c.href || "#"}
                className="inline-flex items-center rounded-lg bg-brand px-4 py-2 text-white shadow-sm transition hover:bg-brand-600"
              >
                {c.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Highlights */}
      <Section title="Explore">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((f: any) => (
            <FeatureCard key={f.title} f={f} />
          ))}
        </div>
      </Section>
    </div>
  );
}
