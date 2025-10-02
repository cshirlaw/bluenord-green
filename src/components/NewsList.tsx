type NewsItem = { title: string; date: string; summary?: string; href?: string };

export default function NewsList({ items }: { items: NewsItem[] }) {
  return (
    <div className="grid gap-4">
      {items.map((n) => (
        <a
          key={n.title}
          href={n.href || "#"}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition"
        >
          <div className="text-xs text-slate-500">{n.date}</div>
          <div className="font-medium mt-1">{n.title}</div>
          {n.summary && <div className="text-sm text-slate-600 mt-1">{n.summary}</div>}
        </a>
      ))}
    </div>
  );
}
