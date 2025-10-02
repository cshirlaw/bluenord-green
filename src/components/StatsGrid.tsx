type Stat = { label: string; value: string };

export default function StatsGrid({ items }: { items: Stat[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
      {items.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="text-sm text-slate-600">{s.label}</div>
          <div className="mt-2 text-2xl font-semibold text-brand">{s.value}</div>
        </div>
      ))}
    </div>
  );
}
