type KPI = { label: string; value: string; change?: string };

export default function KPIBlock({ items }: { items: KPI[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((k) => (
        <div key={k.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm text-slate-600">{k.label}</div>
          <div className="mt-1 text-3xl font-semibold tracking-tight">{k.value}</div>
          {k.change && <div className="mt-2 text-xs text-slate-500">{k.change}</div>}
        </div>
      ))}
    </div>
  );
}
