"use client";

import React from "react";

type Stat = { label: string; value: string; note?: string };

export default function StatsRow() {
  const [items, setItems] = React.useState<Stat[] | null>(null);

  React.useEffect(() => {
    fetch("/data/financials.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => setItems(j?.stats || null))
      .catch(() => setItems(null));
  }, []);

  const stats = items ?? [
    { label: "Production", value: "—" },
    { label: "EBITDA", value: "—" },
    { label: "Liquidity", value: "—" },
    { label: "Net debt", value: "—" }
  ];

  return (
    <section aria-label="Key metrics">
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <li key={s.label} className="rounded-2xl border p-4">
            <div className="text-xs uppercase tracking-wide opacity-70">{s.label}</div>
            <div className="text-2xl font-semibold">{s.value}</div>
            {s.note ? <div className="text-xs opacity-70">{s.note}</div> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}