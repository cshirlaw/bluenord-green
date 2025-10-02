type Asset = { name: string; location?: string; status?: string; blurb?: string; href?: string };

export default function AssetCard({ a }: { a: Asset }) {
  return (
    <a
      href={a.href || "#"}
      className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight">{a.name}</h3>
        {a.status && (
          <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100">
            {a.status}
          </span>
        )}
      </div>
      {a.location && <div className="mt-1 text-sm text-slate-500">{a.location}</div>}
      {a.blurb && <p className="mt-3 text-sm leading-6 text-slate-700">{a.blurb}</p>}
      <span className="mt-4 inline-block text-sm font-medium text-blue-700 group-hover:underline">
        View details →
      </span>
    </a>
  );
}
