"use client";

import React from "react";
import Chip from "@/components/Chip";
import TypeDropdown from "@/components/TypeDropdown";

type Kind = "presentation" | "report" | "annual" | "other";
type TypeSel = "all" | "presentation" | "report" | "annual";

type Report = {
  href: string;
  title?: string;
  size_bytes?: number;
  size?: string;
  year?: number;
  kind?: Kind;
};

function humanFileSize(bytes?: number) {
  if (!bytes || bytes <= 0) return undefined;
  const u = ["KB","MB","GB","TB"]; let b = bytes, i = -1;
  do { b /= 1024; i++; } while (b >= 1024 && i < u.length - 1);
  return `${b.toFixed(1)} ${u[i]}`;
}

function normalise(raw: any): Report[] {
  const arr: any[] = Array.isArray(raw) ? raw : (raw?.items && Array.isArray(raw.items) ? raw.items : []);
  return arr.map((it) => {
    const href: string = it?.href || it?.path || it?.url || (typeof it === "string" ? it : "");
    if (!href) return null as any;
    const name = (it?.filename || it?.name || href.split("/").pop() || "document.pdf") as string;
    const m = href.match(/\/reports\/(\d{4})\//);
    const year = m ? Number(m[1]) : (Number.isFinite(it?.year) ? Number(it.year) : undefined);
    const size_bytes = it?.size_bytes ?? it?.bytes ?? it?.size?.bytes;
    return {
      href: href.startsWith("/") ? href : `/${href}`,
      title: it?.title || name.replace(/[-_]/g, " ").replace(/\.pdf$/i, ""),
      size_bytes,
      size: it?.size,
      year,
    };
  }).filter(Boolean) as Report[];
}

function isPresentation(x: Report): boolean {
  const t = `${x.title ?? ""} ${x.href}`.toLowerCase();
  return /presentation|deck|cmd|capital markets|investor day/.test(t) || /\/presentations?\//.test(x.href.toLowerCase());
}
function isAnnual(x: Report): boolean {
  const t = `${x.title ?? ""} ${x.href}`.toLowerCase();
  return /annual report|annual-report|annual and sustainability|annual\s*&\s*sustainability/.test(t) || /\/annuals?\//.test(t);
}
function detectKind(x: Report): Kind {
  if (isPresentation(x)) return "presentation";
  if (isAnnual(x)) return "annual";
  const t = `${x.title ?? ""} ${x.href}`.toLowerCase();
  if (/(report|financial statements|accounts|quarter|q[1-4]\b|interim|half[-\s]?year|h[12]\b|full[-\s]?year)/.test(t)) return "report";
  return "other";
}

const YEAR_FILTERS = [
  { key: "y2025",      label: "2025",      contains: (y?: number) => y === 2025 },
  { key: "y2024",      label: "2024",      contains: (y?: number) => y === 2024 },
  { key: "y2023",      label: "2023",      contains: (y?: number) => y === 2023 },
  { key: "y2022",      label: "2022",      contains: (y?: number) => y === 2022 },
  { key: "r2013_2021", label: "2013–2021", contains: (y?: number) => typeof y === "number" && y >= 2013 && y <= 2021 },
  { key: "r2005_2012", label: "2005–2012", contains: (y?: number) => typeof y === "number" && y >= 2005 && y <= 2012 },
  { key: "all",        label: "All",       contains: (_?: number) => true }
] as const;
type BucketKey = typeof YEAR_FILTERS[number]["key"];

export default function PresentationsClient() {
  const [items, setItems] = React.useState<Report[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [q, setQ] = React.useState("");
  const [selectedBucket, setSelectedBucket] = React.useState<BucketKey>("y2025");
  const [typeSel, setTypeSel] = React.useState<TypeSel>("presentation");
  const [touched, setTouched] = React.useState(false);

  React.useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        setLoading(true); setError(null);
        const res = await fetch("/reports/manifest.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const list = normalise(data).map(r => ({ ...r, kind: detectKind(r) }));
        if (!cancel) setItems(list);
      } catch (e: any) {
        if (!cancel) setError(e?.message || "Failed to load manifest");
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, []);

  const sorted = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const ay = a.year ?? 0, by = b.year ?? 0;
      if (by !== ay) return by - ay;
      return (a.title ?? a.href).localeCompare(b.title ?? b.href);
    });
  }, [items]);

  const filtered = React.useMemo(() => {
    const needle = q.trim().toLowerCase();
    return sorted.filter(r => {
      if (selectedBucket !== "all") {
        const bucket = YEAR_FILTERS.find(b => b.key === selectedBucket)!;
        if (!bucket.contains(r.year)) return false;
      }
      if (typeSel !== "all" && r.kind !== typeSel) return false;
      if (needle) {
        const hay = `${r.title ?? ""} ${r.href}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
  }, [sorted, selectedBucket, typeSel, q]);

  const toRender = React.useMemo(() => {
    const isDefault = !touched && q.trim() === "" && selectedBucket === "y2025" && typeSel === "presentation";
    return isDefault ? filtered.slice(0, 1) : filtered;
  }, [filtered, touched, q, selectedBucket, typeSel]);

  function pickBucket(k: BucketKey) { setTouched(true); setSelectedBucket(k); }
  function onSearch(v: string) { setTouched(true); setQ(v); }
  function onTypeChange(v: TypeSel) { setTouched(true); setTypeSel(v); }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {YEAR_FILTERS.map((b) => (
            <Chip key={b.key} active={selectedBucket === b.key} onClick={() => pickBucket(b.key)}>
              {b.label}
            </Chip>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <TypeDropdown value={typeSel} onChange={onTypeChange} />
          <input
            type="search"
            placeholder="Search presentations…"
            value={q}
            onChange={(e) => onSearch(e.target.value)}
            className="w-56 rounded-2xl border px-4 py-2 text-sm outline-none focus:ring"
            aria-label="Search presentations"
          />
          {toRender.length > 0 && (
            <span className="text-sm opacity-70 whitespace-nowrap">{toRender.length} item{toRender.length === 1 ? "" : "s"}</span>
          )}
        </div>
      </div>

      {loading && <p>Loading…</p>}
      {error && <p className="text-red-600">Failed to load: {error}</p>}
      {!loading && !error && toRender.length === 0 && <p>No presentations match the current filters.</p>}

      {!loading && !error && toRender.length > 0 && (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {toRender.map((r) => (
            <li key={r.href} className="rounded-2xl border p-4 hover:shadow">
              <div className="font-medium leading-snug">{r.title ?? r.href.split("/").pop()}</div>
              <div className="text-sm opacity-70">
                {typeof r.year === "number" ? r.year : ""}
                {r.size ? ` · ${r.size}` : r.size_bytes ? ` · ${humanFileSize(r.size_bytes)}` : ""}
                {r.kind && r.kind !== "other" ? ` · ${r.kind[0].toUpperCase()+r.kind.slice(1)}` : ""}
              </div>
              <div className="flex gap-2 pt-2">
                <a href={r.href} target="_blank" rel="noopener noreferrer" className="rounded-xl border px-3 py-1 text-sm hover:shadow">Open</a>
                <a href={r.href} download className="rounded-xl border px-3 py-1 text-sm hover:shadow">Download</a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
