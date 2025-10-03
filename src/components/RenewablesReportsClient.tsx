"use client";
import { useEffect, useState } from "react";

type ReportItem = {
  title: string;
  href: string; // public path to the PDF
  year?: number;
  sizeKB?: number;
  tags?: string[];
};

type Manifest = {
  items: ReportItem[];
};

export default function RenewablesReportsClient() {
  const [items, setItems] = useState<ReportItem[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetch("/reports/renewables/manifest.json")
      .then((r) => r.json())
      .then((m: Manifest) => setItems(m.items || []))
      .catch(() => setItems([]));
  }, []);

  const filtered = items.filter((it) => {
    const hay = (it.title + " " + (it.tags || []).join(" ")).toLowerCase();
    return hay.includes(q.toLowerCase());
  });

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-green-600">Renewables Reports</h2>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search reports…"
          className="h-9 w-56 rounded-xl border px-3"
          aria-label="Search reports"
        />
      </div>

      <div className="grid gap-3">
        {filtered.map((r) => (
          <a
            key={r.href}
            href={r.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md"
          >
            <div className="text-lg font-medium">{r.title}</div>
            <div className="text-sm text-neutral-500">
              {r.year ? `${r.year} • ` : ""}{r.sizeKB ? `${r.sizeKB} KB` : ""}
            </div>
            {r.tags?.length ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {r.tags.map((t) => (
                  <span key={t} className="rounded-full border px-2 py-0.5 text-xs">{t}</span>
                ))}
              </div>
            ) : null}
          </a>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-2xl border bg-white p-6 text-center text-neutral-500">
            No reports found.
          </div>
        )}
      </div>
    </section>
  );
}