"use client";

import React, { useEffect, useMemo, useState } from "react";

type Kind = "report" | "presentation" | "annual" | "other" | "all";
type Report = {
  href: string;
  title?: string;
  size?: string;
  size_bytes?: number;
  year?: number;
  pub_year?: number;
  kind?: Kind;
  pub_date_ISO?: string | null;
  note?: string | null;
};

function humanFileSize(bytes?: number) {
  if (!bytes || bytes <= 0) return undefined;
  const u = ["KB","MB","GB","TB"]; let b = bytes, i = -1;
  do { b /= 1024; i++; } while (b >= 1024 && i < u.length - 1);
  return `${b.toFixed(1)} ${u[i]}`;
}
function fmtDate(iso?: string | null) {
  if (!iso) return undefined;
  const d = new Date(iso);
  if (Number.isNaN(+d)) return undefined;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
function normalizeBrand(s: string) {
  return s
    .replace(/\bblue[\s_-]?nord\b/gi, "BlueNord")
    .replace(/\bbluenord\b/gi, "BlueNord");
}
function friendlyTitle(r: Report) {
  const base = r.title || r.href.split("/").pop() || "Document";
  let t = base.replace(/\.pdf$/i, "").replace(/[-_]+/g, " ").trim();
  t = normalizeBrand(t);
  t = t.replace(/\bcmd\b/gi, "Capital Markets Day")
       .replace(/\bq([1-4])\b/gi, (_m, q) => `Q${q}`)
       .replace(/\bh([12])\b/gi, (_m, h) => `H${h}`);
  t = t.split(" ").filter(Boolean).map((w) => {
    const upper = w.toUpperCase();
    if (/^(Q[1-4]|H[12]|ESG|RNS|AGM|CMD)$/.test(upper)) return upper;
    if (w.length <= 3) return w.toLowerCase();
    return w[0].toUpperCase() + w.slice(1);
  }).join(" ");
  t = normalizeBrand(t);
  const hasLabel = /Results|Report|Presentation/i.test(t);
  if (r.kind === "annual" && !/Annual Report/i.test(t)) t += " – Annual Report";
  if (r.kind === "presentation" && !/Presentation/i.test(t)) t += " – Presentation";
  if (r.kind === "report" && !hasLabel) t += " – Results";
  return t;
}

export default function InvestorsDocs() {
  const [items, setItems] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [q, setQ] = useState("");
  const [kind, setKind] = useState<Kind>("all");
  const [groupKey, setGroupKey] = useState<string>("all");
  const [showTypePicker, setShowTypePicker] = useState(false);

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/reports/manifest.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw = await res.json();
        const arr: Report[] = Array.isArray(raw?.items) ? raw.items : (Array.isArray(raw) ? raw : []);
        const norm = arr.map((r) => ({
          ...r,
          title: r.title ? normalizeBrand(r.title) : r.title,
          kind: (r.kind as Kind) || "other",
          pub_year: typeof r.pub_year === "number" ? r.pub_year : (r.year ?? undefined),
        }));
        if (!cancel) setItems(norm);
      } catch (e: any) {
        if (!cancel) setError(e?.message || "Failed to load manifest");
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, []);

  const presentYears = useMemo(() => {
    return Array.from(new Set(items
      .map(x => (x.pub_year ?? x.year))
      .filter((n): n is number => Number.isFinite(n))
    )).sort((a,b)=>b-a);
  }, [items]);

  const groups = useMemo(() => {
    const inRange = (min:number, max:number) => presentYears.filter(y => y >= min && y <= max).sort((a,b)=>b-a);
    const defs = [
      { id: "2025",       label: "2025",       years: presentYears.includes(2025) ? [2025] : [] },
      { id: "2024",       label: "2024",       years: presentYears.includes(2024) ? [2024] : [] },
      { id: "2023",       label: "2023",       years: presentYears.includes(2023) ? [2023] : [] },
      { id: "2013-2021",  label: "2013–2021",  years: inRange(2013, 2021) },
      { id: "2005-2012",  label: "2005–2012",  years: inRange(2005, 2012) }
    ];
    const usable = defs.filter(g => g.years.length > 0);
    return [{ id: "all", label: "All", years: [] as number[] }, ...usable];
  }, [presentYears]);

  useEffect(() => {
    if (!groups.find(g => g.id === groupKey)) setGroupKey(groups[0]?.id ?? "all");
  }, [groups, groupKey]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const g = groups.find(x => x.id === groupKey);
    return items.filter((r) => {
      const k = (kind === "all") ? (r.kind ?? "other") : kind;
      if (kind !== "all" && (r.kind ?? "other") !== k) return false;
      if (g && g.id !== "all") {
        const py = r.pub_year ?? r.year;
        if (!py || !g.years.includes(py)) return false;
      }
      if (!needle) return true;
      const hay = `${r.title ?? ""} ${r.href}`.toLowerCase();
      return hay.includes(needle);
    }).sort((a,b)=>{
      const ay = a.pub_year ?? a.year ?? 0;
      const by = b.pub_year ?? b.year ?? 0;
      if (by !== ay) return by - ay;
      return (a.title ?? a.href).localeCompare(b.title ?? b.href);
    });
  }, [items, q, kind, groupKey, groups]);

  const sectionLabel = useMemo(() => {
    const g = groups.find(x => x.id === groupKey);
    return g ? g.label : "All";
  }, [groups, groupKey]);

  const TYPE_OPTIONS: { key: Kind; label: string }[] = [
    { key: "all",          label: "All" },
    { key: "presentation", label: "Presentation" },
    { key: "report",       label: "Report" },
    { key: "annual",       label: "Annual" },
  ];
  function chooseType(k: Kind) {
    setKind(k);
    setShowTypePicker(false);
  }

  return (
    <div className="space-y-6">
      {groups.length > 0 && (
        <nav className="flex flex-wrap gap-2">
          {groups.map(g => {
            const active = groupKey === g.id;
            return (
              <button key={g.id}
                onClick={() => setGroupKey(g.id)}
                className={`rounded-full border px-3 py-1 text-sm ${active ? "bg-black text-white border-black" : "hover:bg-gray-50"}`}
                aria-pressed={active}>
                {g.label}
              </button>
            );
          })}
        </nav>
      )}

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-auto md:flex-1">
          <input
            type="search"
            placeholder="Search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => setShowTypePicker(true)}
            className="w-full rounded-2xl border px-4 py-2 outline-none focus:ring"
            aria-label="Search"
          />
          {showTypePicker && (
            <>
              <button
                aria-label="Close filters"
                className="fixed inset-0 bg-black/10 md:hidden"
                onClick={() => setShowTypePicker(false)}
              />
              <div className="absolute left-0 right-0 mt-2 rounded-2xl border bg-white shadow-md p-2 z-50 md:hidden" role="listbox" aria-label="Filter by type">
                <div className="text-xs px-2 pb-1 opacity-70">Filter by type</div>
                <div className="flex flex-wrap gap-2">
                  {TYPE_OPTIONS.map(opt => {
                    const active = kind === opt.key;
                    return (
                      <button key={opt.key} role="option" aria-selected={active} onClick={() => chooseType(opt.key)}
                        className={`rounded-full border px-3 py-1 text-sm ${active ? "bg-black text-white border-black" : "hover:bg-gray-50"}`}>
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
                <div className="pt-2 flex justify-end">
                  <button onClick={() => setShowTypePicker(false)} className="text-sm underline">Done</button>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="hidden md:flex items-center gap-2 flex-wrap">
          <span className="text-sm opacity-70">Filter by type</span>
          {TYPE_OPTIONS.map(t => {
            const active = kind === t.key;
            return (
              <button key={t.key} onClick={() => setKind(t.key)}
                className={`rounded-full border px-3 py-1 text-sm ${active ? "bg-black text-white border-black" : "hover:bg-gray-50"}`}
                aria-pressed={active}>
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="text-sm opacity-70">
        Showing {filtered.length} item{filtered.length === 1 ? "" : "s"} in {sectionLabel}
      </div>

      {loading && <p>Loading…</p>}
      {error && <p className="text-red-600">Failed to load: {error}</p>}
      {!loading && !error && filtered.length === 0 && (<p>No documents match the current filters.</p>)}

      {!loading && !error && filtered.length > 0 && (
        <ul className="space-y-4">
          {filtered.map((r) => {
            const title = friendlyTitle(r);
            const when = fmtDate(r.pub_date_ISO) ?? (r.pub_year ?? r.year);
            return (
              <li key={r.href} className="rounded-2xl border p-4 hover:shadow">
                <div className="flex flex-col gap-1">
                  <div className="font-medium leading-snug">{title}</div>
                  <div className="text-sm opacity-70">
                    {when}{r.note ? ` · ${r.note}` : ""}{r.size_bytes ? ` · ${humanFileSize(r.size_bytes)}` : ""}
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <a href={r.href} target="_blank" rel="noopener noreferrer" className="rounded-xl border px-3 py-1 text-sm hover:shadow">View PDF</a>
                  <a href={r.href} download className="rounded-xl border px-3 py-1 text-sm hover:shadow">Download</a>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
