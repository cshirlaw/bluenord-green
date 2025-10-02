import React from "react";

export default function HomeStats() {
  const stats = [
    { label: "Production (net)", value: "30–35 kboepd" },
    { label: "Guidance", value: "On track" },
    { label: "Reserves (2P)", value: "—" },
    { label: "Net debt", value: "—" },
  ];
  return (
    <section className="rounded-3xl border p-5 sm:p-6">
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="space-y-1">
            <dt className="text-[11px] uppercase tracking-[0.08em] text-gray-500">{s.label}</dt>
            <dd className="text-lg font-medium">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
