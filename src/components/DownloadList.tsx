type DocItem = { title: string; date?: string; size?: string; href?: string };

export default function DownloadList({ items, cta }: { items: DocItem[]; cta?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <ul className="divide-y">
        {items.map((d) => (
          <li key={d.title} className="py-3">
            <a className="font-medium underline" href={d.href || "#"}>{d.title}</a>
            <div className="text-xs text-slate-500 mt-1">
              {[d.date, d.size].filter(Boolean).join(" • ")}
            </div>
          </li>
        ))}
      </ul>
      {cta && <div className="mt-4 text-sm text-slate-600">{cta}</div>}
    </div>
  );
}
