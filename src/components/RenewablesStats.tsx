// src/components/RenewablesStats.tsx
export default function RenewablesStats() {
  // Demo KPIs for pitch; replace with real figures later.
  const stats = [
    { label: "Installed Capacity", value: "200 MW" },
    { label: "Annual Generation (est.)", value: "720,000 MWh" },
    { label: "Households Powered (est.)", value: "100,000+" },
    { label: "CO₂ Avoided (est.)", value: "300,000 t/yr" },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="mb-4 text-2xl font-semibold text-green-600">Key Renewables KPIs</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="text-sm text-neutral-500">{s.label}</div>
            <div className="mt-1 text-xl font-bold">{s.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}