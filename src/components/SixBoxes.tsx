type Box = { title: string; text?: string; href?: string };

export default function SixBoxes({ items }: { items: Box[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((b) => (
        <a
          key={b.title}
          href={b.href || "#"}
          className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <h3 className="text-lg font-semibold tracking-tight">{b.title}</h3>
          {b.text && <p className="mt-2 text-sm leading-6 text-slate-700">{b.text}</p>}
          <span className="mt-4 inline-block text-sm font-medium text-blue-700 group-hover:underline">
            Learn more →
          </span>
        </a>
      ))}
    </div>
  );
}
