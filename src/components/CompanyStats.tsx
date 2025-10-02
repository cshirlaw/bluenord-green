import React from "react";

type Item = { label: string; value: string; note?: string };

export default function CompanyStats({
  items = [
    { label: "Employees", value: "—" },
    { label: "Operating years", value: "—" },
    { label: "Countries", value: "—" },
    { label: "Safety (TRIR)", value: "—" },
  ],
}: { items?: Item[] }) {
  return (
    <section className="rounded-3xl border p-5 sm:p-6">
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((s) => (
          <div key={s.label} className="space-y-1">
            <dt className="text-[11px] uppercase tracking-[0.08em] text-gray-500">{s.label}</dt>
            <dd className="text-lg font-medium">{s.value}</dd>
            {s.note ? <div className="text-xs text-gray-500">{s.note}</div> : null}
          </div>
        ))}
      </dl>
    </section>
  );
}
