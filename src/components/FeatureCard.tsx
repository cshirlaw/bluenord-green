type Feature = { title: string; text?: string; href?: string };

export default function FeatureCard({ f }: { f: Feature }) {
  return (
    <a
      href={f.href || "#"}
      className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <h3 className="text-lg font-semibold tracking-tight text-brand">{f.title}</h3>
      {f.text && <p className="mt-2 text-sm leading-6 text-slate-700">{f.text}</p>}
      <span className="mt-4 inline-block text-sm font-medium text-brand group-hover:underline">
        Explore →
      </span>
    </a>
  );
}
