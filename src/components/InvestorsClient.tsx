"use client";

import React, { useEffect, useMemo, useState } from "react";

export type Report = {
  href: string;
  title?: string;
  size?: string;
  size_bytes?: number;
  year?: number;
  created_at?: string;
};

type Overrides = Record<string, string>;

function humanFileSize(bytes?: number) {
  if (!bytes || bytes <= 0) return undefined;
  const u = ["KB","MB","GB","TB"];
  let b = bytes, i = -1;
  do { b /= 1024; i++; } while (b >= 1024 && i < u.length - 1);
  return `${b.toFixed(1)} ${u[i]}`;
}

function normaliseManifest(raw: any): Report[] {
  const arr: any[] = Array.isArray(raw) ? raw : (raw?.items && Array.isArray(raw.items) ? raw.items : []);
  return arr.map((it) => {
    const href: string = it?.href || it?.path || it?.url || (typeof it === "string" ? it : "");
    if (!href) return null as any;
    const name = (it?.filename || it?.name || href.split("/").pop() || "report.pdf") as string;
    const m = href.match(/\/reports\/(\d{4})\//);
    const year = m ? Number(m[1]) : undefined;
    const size_bytes = it?.size_bytes ?? it?.bytes ?? it?.size?.bytes;
    return {
      href: href.startsWith("/") ? href : `/${href}`,
      title: it?.title || name.replace(/[-_]/g, " ").replace(/\.pdf$/i, ""),
      size_bytes,
      size: it?.size || humanFileSize(size_bytes),
      year,
      created_at: it?.created_at || it?.date
    };
  }).filter(Boolean) as Report[];
}

function displayTitle(r: Report, overrides: Overrides) {
  const fname = r.href.split("/").pop() || "";
  const fromOverride = overrides[fname];
  const base = fromOverride || r.title || fname.replace(/[-_]/g, " ").replace(/\.pdf$/i, "");
  return base
    .replace(/\bbluenord\b/gi, "BlueNord")
    .replace(/\bnoreco\b/gi, "Noreco");
}

export default function InvestorsClient({ initialKind }: { initialKind?: "all" | "report" | "presentation" | "annual" }) {
  const [reports, setReports] = useState<Report[]>([]);
  const [overrides, setOverrides] = useState<Overrides>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [selectedYears, setSelectedYears] = useState<number[] | null>(null);
  const [groupByYear, setGroupByYear] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const [mRes, oRes] = await Promise.allSettled([
          fetch("/reports/manifest.json", { cache: "no-store" }),
          fetch("/data/report-title-overrides.json", { cache: "no-store" })
        ]);
        if (mRes.status !== "fulfilled" || !mRes.value.ok) throw new Error("HTTP manifest");
        const raw = await mRes.value.json();
        const items = normaliseManifest(raw);
        if (!cancelled) setReports(items);
        if (oRes.status === "fulfilled" && oRes.value.ok) {
          const j = await oRes.value.json();
          if (!cancelled) setOverrides(j || {});
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const years = useMemo(() => {
    const ys = Array.from(new Set(reports.map((r) => r.year).filter(Boolean))) as number[];
    return ys.sort((a, b) => b - a);
  }, [reports]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const byYear = (r: Report) => !selectedYears || !r.year || selectedYears.includes(r.year);
    const byText = (r: Report) =>
      !needle ||
      displayTitle(r, overrides).toLowerCase().includes(needle) ||
      r.href.toLowerCase().includes(needle);
    return reports.filter((r) => byYear(r) && byText(r));
  }, [reports, q, selectedYears, overrides]);

  function toggleYear(y: number) {
    setSelectedYears((cur) => {
      if (cur === null) return [y];
      return cur.includes(y) ? cur.filter((n) => n !== y) : [...cur, y];
    });
  }

  function clearYearFilter() {
    setSelectedYears(null);
  }

  function openAll() {
    const max = Math.min(filtered.length, 20);
    filtered.slice(0, max).forEach((r, i) => {
      setTimeout(() => window.open(r.href, "_blank", "noopener,noreferrer"), i * 40);
    });
  }

  const groups: Record<string, Report[]> = useMemo(() => {
    if (!groupByYear) return { All: filtered };
    const g: Record<string, Report[]> = {};
    for (const r of filtered) {
      const key = r.year ? String(r.year) : "Other";
      (g[key] ||= []).push(r);
    }
    return g;
  }, [filtered, groupByYear]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex-1 flex gap-2">
          <input
            type="search"
            placeholder="Search documents…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full rounded-2xl border px-4 py-2 outline-none focus:ring"
            aria-label="Search documents"
          />
          {filtered.length > 0 && (
            <button
              onClick={openAll}
              className="rounded-2xl border px-4 py-2 shadow hover:shadow-md"
              title="Open all matching documents in new tabs"
            >
              Open all ({filtered.length})
            </button>
          )}
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={groupByYear} onChange={(e) => setGroupByYear(e.target.checked)} />
          Group by year
        </label>
      </div>

      {years.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm opacity-70">Years:</span>
          {years.map((y) => {
            const active = selectedYears === null || selectedYears.includes(y);
            return (
              <button
                key={y}
                onClick={() => toggleYear(y)}
                className={`rounded-full border px-3 py-1 text-sm ${active ? "bg-black text-white border-black" : "hover:bg-gray-50"}`}
                aria-pressed={active}
              >
                {y}
              </button>
            );
          })}
          {selectedYears && (
            <button onClick={clearYearFilter} className="text-sm underline ml-2">
              Clear
            </button>
          )}
        </div>
      )}

      {loading && <p>Loading…</p>}
      {error && <p className="text-red-600">Failed to load: {error}</p>}
      {!loading && !error && filtered.length === 0 && <p>No documents match the current filters.</p>}

      {!loading && !error && filtered.length > 0 && (
        <div className="space-y-8">
          {Object.entries(groups)
            .sort((a, b) => (b[0] > a[0] ? 1 : -1))
            .map(([heading, items]) => (
              <section key={heading} className="space-y-3">
                {groupByYear && <h3 className="text-lg font-semibold">{heading}</h3>}
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((r) => (
                    <li key={r.href} className="rounded-2xl border p-4 hover:shadow">
                      <div className="font-medium leading-snug">{displayTitle(r, overrides)}</div>
                      <div className="text-sm opacity-70">
                        {r.size ? r.size : r.size_bytes ? humanFileSize(r.size_bytes) : null}
                        {typeof r.year === "number" ? ` · ${r.year}` : ""}
                      </div>
                      <div className="flex gap-2 pt-2">
                        <a href={r.href} target="_blank" rel="noopener noreferrer" className="rounded-xl border px-3 py-1 text-sm hover:shadow">Open</a>
                        <a href={r.href} download className="rounded-xl border px-3 py-1 text-sm hover:shadow">Download</a>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
        </div>
      )}
    </div>
  );
}