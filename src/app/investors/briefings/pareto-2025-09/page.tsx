'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell, RadialBarChart, RadialBar, PolarAngleAxis, LabelList,
} from 'recharts';

/* ----------------------------- Brand ----------------------------- */
const BRAND = {
  primary: '#0A2A4A',
  accent: '#00A3E0',
  positive: '#10B981',
  text: '#0f172a',
  subtext: '#475569',
  border: '#E5E7EB',
};
const CHART = {
  grid: BRAND.border,
  palette: ['#00A3E0', '#2563EB', '#F59E0B', '#10B981', '#EF4444', '#6B7280'],
};

/* ----------------------------- Types ----------------------------- */
type Slice = { label: string; value: number };

type ChartsRowItem =
  | { kind: 'kpi'; label: string; value: string; unit?: string; hint?: string }
  | { kind: 'donut'; title: string; unit?: string; total?: number; slices: Slice[] }
  | { kind: 'radial'; title: string; unit?: string; slices: Slice[] }
  | { kind: 'stacked100'; title: string; unit?: string; slices: Slice[] }
  | { kind: 'bar'; title: string; unit?: string; data: { label: string; value: number; approx?: boolean }[]; notes?: string };

type Block =
  | { type: 'hero'; image: string; logo?: string; title: string; subtitle?: string }
  | { type: 'statKpi'; label: string; value: string; unit?: string; hint?: string }
  | { type: 'chartsRow'; cols?: 2 | 3 | 4; items: ChartsRowItem[] }
  | { type: 'figure'; src: string; caption?: string }
  | { type: 'callouts'; items: string[] }
  | { type: 'footnotes'; items: string[]; source?: { pdf?: string; pageHint?: string }; updateCadence?: string }
  | { type: 'barLine'; title: string; yLeftUnit?: string; series: { label: string; avg: number; peak: number }[]; notes?: string }
  | {
      type: 'hedgeTabs';
      kpis: { label: string; value: string }[];
      oil: {
        unitVolume: string; unitPrice: string;
        rows: { period: string; volume: number; price: number }[];
        totals: { label: string; value: number; unit: string }[];
        avgPrices: { label: string; value: number; unit: string }[];
        spot: number;
      };
      gas: {
        unitVolume: string; unitPrice: string;
        rows: { period: string; volume: number; price: number }[];
        totals: { label: string; value: number; unit: string }[];
        avgPrices: { label: string; value: number; unit: string }[];
        spot: number;
      };
      disclaimer?: string[];
    }
  | {
      type: 'checklistPills';
      title?: string;
      columns: { heading: string; items: { text: string; highlight?: boolean }[] }[];
      sideNotes?: string[];
    };

type Slide = { id: string; title?: string; blocks: Block[] };
type BlocksDoc = { slides: Slide[] };

/* ----------------------------- UI bits ----------------------------- */
function Breadcrumbs({ items, className = '' }: { items: { href: string; label: string }[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-xs md:text-sm ${className}`}>
      <ol className="flex flex-wrap items-center gap-1 md:gap-1.5 text-gray-500">
        {items.map((it, i) => (
          <li key={it.href} className="flex items-center gap-1 md:gap-1.5">
            {i > 0 && <span aria-hidden className="opacity-60">›</span>}
            {i === items.length - 1 ? (
              <span className="text-gray-700">{it.label}</span>
            ) : (
              <Link href={it.href} className="hover:underline">{it.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Section({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 rounded-2xl border bg-white/70 p-5 shadow-sm" style={{ borderColor: BRAND.border }}>
      {title && <h2 className="text-xl font-semibold" style={{ color: BRAND.text }}>{title}</h2>}
      <div className={title ? 'mt-4' : ''}>{children}</div>
    </section>
  );
}

function KPI({ label, value, unit, hint }: { label: string; value: string; unit?: string; hint?: string }) {
  return (
    <div className="rounded-2xl border p-4 h-full" style={{ borderColor: BRAND.border }}>
      <div className="text-sm" style={{ color: BRAND.subtext }}>{label}</div>
      <div className="mt-1 text-2xl font-semibold" style={{ color: BRAND.text }}>
        {value}{unit ? <span className="ml-1 text-base font-normal">{unit}</span> : null}
      </div>
      {hint && <div className="mt-1 text-xs" style={{ color: BRAND.subtext }}>{hint}</div>}
    </div>
  );
}

/* ----------------------------- Charts ----------------------------- */
function Donut({ item }: { item: Extract<ChartsRowItem, { kind: 'donut' }> }) {
  const data = item.slices.map((s) => ({ name: s.label, value: s.value }));
  return (
    <div className="w-full">
      <div className="mb-2 text-sm font-medium" style={{ color: BRAND.text }}>{item.title}</div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip formatter={(v: any) => [`${v}`, '']} />
            <Legend />
            <Pie data={data} dataKey="value" nameKey="name" innerRadius="55%" outerRadius="80%">
              {data.map((_, i) => <Cell key={i} fill={CHART.palette[i % CHART.palette.length]} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      {item.unit && <div className="mt-2 text-xs" style={{ color: BRAND.subtext }}>Units: {item.unit}</div>}
    </div>
  );
}

function Radial({ item }: { item: Extract<ChartsRowItem, { kind: 'radial' }> }) {
  const total = item.slices.reduce((a, s) => a + s.value, 0) || 1;
  const data = item.slices.map((s, i) => ({
    name: s.label,
    value: s.value,
    percent: (s.value / total) * 100,
    fill: CHART.palette[i % CHART.palette.length],
  }));
  return (
    <div className="w-full">
      <div className="mb-2 text-sm font-medium" style={{ color: BRAND.text }}>{item.title}</div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart innerRadius="45%" outerRadius="85%" data={data} startAngle={90} endAngle={-270}>
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <Tooltip formatter={(v: any, _n: any, p: any) => [`${(p.payload.percent).toFixed(1)}%`, p.payload.name]} />
            <Legend />
            {/* NOTE: removed unsupported `clockWise` prop for build stability */}
            <RadialBar background dataKey="percent" cornerRadius={8}>
              {data.map((d, i) => <Cell key={i} fill={d.fill} />)}
            </RadialBar>
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      {item.unit && <div className="mt-2 text-xs" style={{ color: BRAND.subtext }}>Units: {item.unit}</div>}
    </div>
  );
}

/** 100% stacked bar (horizontal) — sorted largest→smallest with centered labels + custom legend */
function Stacked100({ item }: { item: Extract<ChartsRowItem, { kind: 'stacked100' }> }) {
  // Sort slices by value desc to control left→right order + legend order
  const sorted = [...item.slices].sort((a, b) => b.value - a.value);
  const total = sorted.reduce((a, s) => a + s.value, 0) || 1;

  // Build single-row dataset with percentage values
  const row: Record<string, number | string> = { name: 'Ownership' };
  sorted.forEach((s) => {
    row[s.label] = (s.value / total) * 100;
  });
  const data = [row];

  // Centered label renderer (adapts to available width)
  function renderInsideLabel(props: any, label: string) {
    const { x = 0, y = 0, width = 0, height = 0, value = 0 } = props || {};
    if (width <= 0 || height <= 0) return null;

    const pct = `${Number(value).toFixed(1)}%`;
    const long = `${label} ${pct}`;
    const textToShow = width >= 120 ? long : width >= 56 ? pct : '';

    if (!textToShow) return null;

    const cx = x + width / 2;
    const cy = y + height / 2;

    return (
      <text
        x={cx}
        y={cy}
        dy="0.35em"
        textAnchor="middle"
        fill="#ffffff"
        fontSize={12}
        fontWeight={700}
        style={{
          paintOrder: 'stroke',
          stroke: 'rgba(0,0,0,0.35)',
          strokeWidth: 3,
          strokeLinejoin: 'round',
          pointerEvents: 'none',
        }}
      >
        {textToShow}
      </text>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-2 text-sm font-medium" style={{ color: BRAND.text }}>{item.title}</div>
      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={data} margin={{ left: 8, right: 16, top: 8, bottom: 8 }}>
            <CartesianGrid horizontal={false} stroke={CHART.grid} />
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis type="category" dataKey="name" hide />
            <Tooltip formatter={(v: any, name: string) => [`${Number(v).toFixed(1)}%`, name]} />
            {/* No default <Legend/>; we render a custom one below */}
            {sorted.map((s, i) => (
              <Bar key={s.label} dataKey={s.label} stackId="a" fill={CHART.palette[i % CHART.palette.length]}>
                <LabelList dataKey={s.label} content={(p: any) => renderInsideLabel(p, s.label)} />
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Custom legend/description line in sorted order */}
      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
        {sorted.map((s, i) => (
          <span key={s.label} className="inline-flex items-center gap-1">
            <span
              className="inline-block h-2 w-2 rounded-sm"
              style={{ background: CHART.palette[i % CHART.palette.length] }}
              aria-hidden
            />
            <span className="font-medium" style={{ color: BRAND.text }}>{s.label}</span>
            <span style={{ color: BRAND.subtext }}>
              &nbsp;{((s.value / total) * 100).toFixed(1)}%
            </span>
          </span>
        ))}
      </div>

      <div className="mt-1 text-xs" style={{ color: BRAND.subtext }}>
        {item.unit ? `Units: ${item.unit}. ` : ''}Shares sum to 100%.
      </div>
    </div>
  );
}

function SimpleBar({ item }: { item: Extract<ChartsRowItem, { kind: 'bar' }> }) {
  const data = item.data;
  return (
    <div className="w-full">
      <div className="mb-2 text-sm font-medium" style={{ color: BRAND.text }}>{item.title}</div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ left: 8, right: 16, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {data.map((_, i) => <Cell key={i} fill={CHART.palette[i % CHART.palette.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 text-xs" style={{ color: BRAND.subtext }}>{item.unit ? `Unit: {item.unit}. ` : ''}{item.notes ?? ''}</div>
    </div>
  );
}

/* ----------------------------- Bar/Line Combo ----------------------------- */
/** Generic bar+line combo that lets us name both series (so Tyra != Hedging). */
function BarLine({
  title,
  unit,
  series,
  spot,
  leftLabel = 'Series A',
  rightLabel = 'Series B',
  unitLabelText = 'Left axis unit:',
}: {
  title: string;
  unit?: string;
  series: { label: string; left: number; right: number }[];
  spot?: number;
  leftLabel?: string;
  rightLabel?: string;
  unitLabelText?: string;
}) {
  return (
    <div className="w-full">
      <div className="mb-2 text-sm font-medium" style={{ color: BRAND.text }}>{title}</div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={series} margin={{ left: 8, right: 16, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} />
            <XAxis dataKey="label" />
            <YAxis yAxisId="L" />
            <YAxis yAxisId="R" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar
              yAxisId="L"
              dataKey="left"
              name={leftLabel}
              radius={[6, 6, 0, 0]}
            />
            <Line
              yAxisId="R"
              type="monotone"
              dataKey="right"
              name={rightLabel}
              stroke={BRAND.accent}
              strokeWidth={2.5}
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {unit && (
        <div className="mt-2 text-xs" style={{ color: BRAND.subtext }}>
          {unitLabelText} {unit}
        </div>
      )}
      {typeof spot === 'number' && (
        <div className="mt-1 text-xs" style={{ color: BRAND.subtext }}>
          Dashed spot ref: {spot}
        </div>
      )}
    </div>
  );
}

/* ----------------------------- Hedge Tabs ----------------------------- */
function HedgeTabs({ block }: { block: Extract<Block, { type: 'hedgeTabs' }> }) {
  const [tab, setTab] = useState<'oil' | 'gas'>('oil');
  const active = block[tab];

  const series = active.rows.map(r => ({ label: r.period, left: r.volume, right: r.price }));

  return (
    <div>
      {/* KPIs */}
      <div className="grid gap-3 md:grid-cols-3">
        {block.kpis.map((k, i) => <KPI key={i} label={k.label} value={k.value} />)}
      </div>

      {/* Tabs */}
      <div className="mt-4 flex gap-2">
        {(['oil','gas'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-xl border px-3 py-1.5 text-sm ${tab === t ? 'bg-gray-100' : ''}`}
            style={{ borderColor: BRAND.border, color: BRAND.text }}
          >
            {t === 'oil' ? 'Oil' : 'Gas'}
          </button>
        ))}
      </div>

      {/* Chart — keep hedging wording */}
      <div className="mt-4">
        <BarLine
          title={`${tab === 'oil' ? 'Oil' : 'Gas'} hedged volume & price`}
          unit={active.unitVolume}
          unitLabelText="Left axis unit:"
          series={series}
          spot={active.spot}
          leftLabel="Hedged volume"
          rightLabel="Price / floor"
        />
      </div>

      {/* Totals & averages */}
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border p-4" style={{ borderColor: BRAND.border }}>
          <div className="text-sm font-medium" style={{ color: BRAND.text }}>Totals</div>
          <ul className="mt-2 list-disc pl-5 text-sm" style={{ color: BRAND.subtext }}>
            {active.totals.map((t, i) => <li key={i}>{t.label}: {t.value} {t.unit}</li>)}
          </ul>
        </div>
        <div className="rounded-2xl border p-4" style={{ borderColor: BRAND.border }}>
          <div className="text-sm font-medium" style={{ color: BRAND.text }}>Average hedged price</div>
          <ul className="mt-2 list-disc pl-5 text-sm" style={{ color: BRAND.subtext }}>
            {active.avgPrices.map((t, i) => <li key={i}>{t.label}: {t.value} {active.unitPrice}</li>)}
          </ul>
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-auto rounded-2xl border" style={{ borderColor: BRAND.border }}>
        <table className="min-w-[600px] w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="px-3 py-2 font-medium">Period</th>
              <th className="px-3 py-2 font-medium">Volume ({active.unitVolume})</th>
              <th className="px-3 py-2 font-medium">Price ({active.unitPrice})</th>
            </tr>
          </thead>
          <tbody>
            {active.rows.map((r, i) => (
              <tr key={i} className="border-t" style={{ borderColor: BRAND.border }}>
                <td className="px-3 py-2">{r.period}</td>
                <td className="px-3 py-2">{r.volume}</td>
                <td className="px-3 py-2">{r.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {block.disclaimer?.length ? (
        <div className="mt-3 text-xs" style={{ color: BRAND.subtext }}>
          {block.disclaimer.join(' ')}
        </div>
      ) : null}
    </div>
  );
}

/* ----------------------------- Checklist Pills ----------------------------- */
function ChecklistPills({ block }: { block: Extract<Block, { type: 'checklistPills' }> }) {
  return (
    <div>
      {block.title && <div className="mb-2 text-sm font-medium" style={{ color: BRAND.text }}>{block.title}</div>}
      <div className="grid gap-4 md:grid-cols-2">
        {block.columns.map((col, idx) => (
          <div key={idx} className="rounded-2xl border p-4" style={{ borderColor: BRAND.border }}>
            <div className="mb-2 font-medium" style={{ color: BRAND.text }}>{col.heading}</div>
            <ul className="space-y-2">
              {col.items.map((it, i) => (
                <li key={i}>
                  <div
                    className={`inline-block rounded-full border px-3 py-1.5 text-sm shadow-sm ${
                      it.highlight ? 'ring-2 ring-rose-300 bg-rose-50' : 'bg-white'
                    }`}
                    style={{ borderColor: BRAND.border, color: BRAND.text }}
                  >
                    {it.text}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {!!block.sideNotes?.length && (
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {block.sideNotes.map((n, i) => (
            <div key={i} className="rounded-xl border px-3 py-2 text-sm" style={{ borderColor: BRAND.border, color: BRAND.subtext }}>
              {n}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ----------------------------- Block renderer ----------------------------- */
function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'hero':
      return (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="overflow-hidden rounded-3xl border shadow-sm" style={{ borderColor: BRAND.border }}>
            {/* Brand bar */}
            <div
              className="flex items-center gap-3 px-5 py-3"
              style={{ background: `linear-gradient(90deg, ${BRAND.primary} 0%, ${BRAND.accent} 100%)`, color: 'white' }}
            >
              {block.logo && <img src={block.logo} alt="BlueNord" className="h-6 w-auto" />}
              <span className="text-sm opacity-90">Investor Briefing</span>
            </div>

            {/* Image + overlays + content */}
            <div className="relative">
              {/* Background image */}
              <img src={block.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
              {/* Brightening veil for stronger dark-text contrast */}
              <div className="absolute inset-0 bg-white/40" />
              {/* Bottom fade for readability */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
                style={{ background: 'linear-gradient(0deg, rgba(255,255,255,0.92), rgba(255,255,255,0))' }}
              />
              {/* Content */}
              <div className="relative z-10 min-h-[240px] p-6 md:p-7">
                <h1 className="text-2xl font-semibold" style={{ color: BRAND.primary }}>{block.title}</h1>
                {block.subtitle && (
                  <p className="mt-2 max-w-3xl text-sm" style={{ color: BRAND.text }}>
                    {block.subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      );

    case 'statKpi':
      return <KPI label={block.label} value={block.value} unit={block.unit} hint={block.hint} />;

    case 'chartsRow': {
      const cols = block.cols ?? 3;
      const colClass = cols === 2 ? 'md:grid-cols-2' : cols === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3';
      return (
        <div className={`grid gap-4 ${colClass}`}>
          {block.items.map((it, i) => {
            if (it.kind === 'kpi') return <KPI key={i} label={it.label} value={it.value} unit={it.unit} hint={it.hint} />;
            if (it.kind === 'donut') return <Donut key={i} item={it} />;
            if (it.kind === 'radial') return <Radial key={i} item={it} />;
            if (it.kind === 'stacked100') return <Stacked100 key={i} item={it} />;
            return <SimpleBar key={i} item={it} />;
          })}
        </div>
      );
    }

    case 'figure':
      return (
        <div className="rounded-2xl border p-2" style={{ borderColor: BRAND.border }}>
          <img src={block.src} alt={block.caption ?? ''} className="w-full rounded-xl" />
          {block.caption && <div className="p-2 text-xs" style={{ color: BRAND.subtext }}>{block.caption}</div>}
        </div>
      );

    case 'callouts':
      return (
        <ul className="list-disc space-y-1 pl-5 text-sm" style={{ color: BRAND.subtext }}>
          {block.items.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      );

    case 'footnotes':
      return (
        <div className="text-xs" style={{ color: BRAND.subtext }}>
          {block.items.map((t, i) => <p key={i} className="mt-1">{t}</p>)}
          {block.source?.pdf && (
            <p className="mt-2">
              Source: <a className="underline" href={block.source.pdf} target="_blank" rel="noreferrer">PDF</a>
              {block.source.pageHint ? ` (${block.source.pageHint})` : ''}
              {block.updateCadence ? ` · Update cadence: ${block.updateCadence}` : ''}
            </p>
          )}
        </div>
      );

    case 'barLine':
      // Tyra production: Average vs Peak production (both in mboe/d)
      return (
        <BarLine
          title={block.title}
          unit={block.yLeftUnit}
          unitLabelText="Unit:"
          leftLabel="Average production"
          rightLabel="Peak production"
          series={block.series.map(p => ({ label: p.label, left: p.avg, right: p.peak }))}
        />
      );

    case 'hedgeTabs':
      return <HedgeTabs block={block} />;

    case 'checklistPills':
      return <ChecklistPills block={block} />;

    default:
      return null;
  }
}

/* ----------------------------- Page ----------------------------- */
export default function ParetoBriefingBlocks() {
  const [doc, setDoc] = useState<BlocksDoc | null>(null);

  useEffect(() => {
    let alive = true;
    fetch('/data/briefings/pareto-2025-09.blocks.json', { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .then((j) => { if (!alive) return; setDoc(j && (j as BlocksDoc).slides ? (j as BlocksDoc) : null); })
      .catch(() => setDoc(null));
    return () => { alive = false; };
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Header crumbs */}
      <Breadcrumbs
        className="mb-4"
        items={[
          { href: '/', label: 'Home' },
          { href: '/investors', label: 'Investors' },
          { href: '/investors/briefings/pareto-2025-09', label: 'Pareto briefing (Sep 2025)' },
        ]}
      />

      {!doc ? (
        <div className="rounded-2xl border p-6 text-sm" style={{ borderColor: BRAND.border, color: BRAND.subtext }}>
          Couldn’t load blocks JSON. Check <code>/public/data/briefings/pareto-2025-09.blocks.json</code>.
        </div>
      ) : (
        doc.slides.map((s) => (
          <Section key={s.id} title={s.title}>
            <div className="grid gap-5">
              {s.blocks.map((b, i) => <BlockRenderer key={i} block={b} />)}
            </div>
          </Section>
        ))
      )}

      {/* Footer crumbs */}
      <Breadcrumbs
        className="mt-10"
        items={[
          { href: '/', label: 'Home' },
          { href: '/investors', label: 'Investors' },
          { href: '/investors/briefings/pareto-2025-09', label: 'Pareto briefing (Sep 2025)' },
        ]}
      />
    </div>
  );
}