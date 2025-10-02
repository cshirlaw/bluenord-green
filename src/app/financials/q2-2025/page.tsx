'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, Legend as RLegend,
  BarChart, Bar,
} from 'recharts';
import { m } from 'framer-motion';

/* ------------------------------------------------------------------ */
/* Brand & assets                                                      */
/* ------------------------------------------------------------------ */
const BRAND = {
  primary: '#0A2A4A',
  accent: '#00A3E0',
  positive: '#10B981',
  text: '#0f172a',
  subtext: '#475569',
  border: '#E5E7EB',
};
const CHART = {
  colors: {
    grid: BRAND.border,
    avg: BRAND.accent,
    peak: '#F97316',
    hedgedVolume: '#2563EB',
    floorPrice: BRAND.positive,
  },
};
const ASSETS = {
  logo: '/images/brand/bluenord-logo-260925.png', // adjust if yours lives elsewhere
};

/* ------------------------------------------------------------------ */
/* Types & sample                                                      */
/* ------------------------------------------------------------------ */
type ProductionPoint = { month: string; avg: number; peak: number };
type HedgePoint = { label: string; hedgedVolume?: number; floorPrice?: number };
type Q2Data = {
  hero: { title: string; subtitle?: string };
  production: ProductionPoint[];
  gasHedge: HedgePoint[];
  oilHedge: HedgePoint[];
};

const INLINE_SAMPLE: Q2Data = {
  hero: {
    title: 'Q2 2025 presentation (interactive)',
    subtitle: 'Illustrative data for layout. Replace via /public/data/financials/q2-2025.json when you have final numbers.',
  },
  production: [
    { month: 'Mar-25', avg: 21, peak: 25 },
    { month: 'Apr-25', avg: 23, peak: 27 },
    { month: 'May-25', avg: 26, peak: 29 },
    { month: 'Jun-25', avg: 28, peak: 31 },
    { month: 'Jul-25', avg: 26, peak: 30 },
    { month: 'Aug-25', avg: 25, peak: 29 },
  ],
  gasHedge: [
    { label: 'Q4-2025', hedgedVolume: 60, floorPrice: 65 },
    { label: 'Q1-2026', hedgedVolume: 50, floorPrice: 63 },
    { label: 'Q2-2026', hedgedVolume: 45, floorPrice: 62 },
  ],
  oilHedge: [
    { label: 'Q4-2025', hedgedVolume: 40, floorPrice: 70 },
    { label: 'Q1-2026', hedgedVolume: 35, floorPrice: 68 },
    { label: 'Q2-2026', hedgedVolume: 30, floorPrice: 66 },
  ],
};

/* ------------------------------------------------------------------ */
/* UI helpers                                                          */
/* ------------------------------------------------------------------ */
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
              <Link href={it.href} className="hover:underline">
                {it.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold" style={{ color: BRAND.text }}>{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Responsive helpers for charts                                       */
/* ------------------------------------------------------------------ */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return isMobile;
}

/** Keeps charts from overflowing on mobile */
function ChartShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full min-w-0 overflow-hidden rounded-2xl border bg-white/70 p-4 md:p-5 shadow-sm"
      style={{ borderColor: BRAND.border }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Charts                                                              */
/* ------------------------------------------------------------------ */
function ProductionChart({ data }: { data: ProductionPoint[] }) {
  const isMobile = useIsMobile();
  return (
    <div className={isMobile ? 'h-72 w-full' : 'h-96 w-full'}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ left: 8, right: 16, top: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART.colors.grid} />
          <XAxis dataKey="month" interval={isMobile ? 'preserveStartEnd' : 0} tick={{ fontSize: isMobile ? 10 : 12 }} />
          <YAxis
            label={{ value: 'kboe/d', angle: -90, position: 'insideLeft' }}
            tick={{ fontSize: isMobile ? 10 : 12 }}
            width={isMobile ? 32 : 40}
          />
          <RTooltip formatter={(v: any, n: any) => [v, n === 'avg' ? 'Average' : 'Peak']} />
          <RLegend />
          <Line
            type="monotone"
            dataKey="avg"
            name="Average"
            stroke={CHART.colors.avg}
            strokeWidth={2.5}
            dot={{ r: 2, stroke: CHART.colors.avg, fill: '#fff' }}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="peak"
            name="Peak"
            stroke={CHART.colors.peak}
            strokeWidth={2.5}
            dot={{ r: 2, stroke: CHART.colors.peak, fill: '#fff' }}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-2 text-xs" style={{ color: BRAND.subtext }}>
        Monthly average and peak production (kboe/d). Values marked c. are indicative.
      </div>
    </div>
  );
}

/** Mobile-safe bar chart for hedge portfolios */
function HedgeChart({ data, title }: { data: HedgePoint[]; title: string }) {
  const isMobile = useIsMobile();
  const margin = { left: isMobile ? 0 : 8, right: isMobile ? 0 : 16, top: 8, bottom: isMobile ? 26 : 12 };
  const barGap = isMobile ? 2 : 6;
  const barCategoryGap = isMobile ? '25%' : '15%';

  return (
    <div className={isMobile ? 'h-72 w-full' : 'h-96 w-full'}>
      <div className="mb-2 text-sm font-semibold" style={{ color: BRAND.text }}>{title}</div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={margin} barGap={barGap} barCategoryGap={barCategoryGap}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART.colors.grid} />
          <XAxis
            dataKey="label"
            interval={isMobile ? 'preserveStartEnd' : 0}
            tick={{ fontSize: isMobile ? 10 : 12 }}
            angle={isMobile ? -15 : 0}
            dy={isMobile ? 10 : 0}
            height={isMobile ? 36 : undefined}
          />
          <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} width={isMobile ? 28 : 40} />
          <RTooltip />
          <RLegend verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: isMobile ? 8 : 6, fontSize: isMobile ? 11 : 12 }} />
          <Bar dataKey="hedgedVolume" name="Hedged volume" fill={CHART.colors.hedgedVolume} radius={[6, 6, 0, 0]} />
          <Bar dataKey="floorPrice"  name="Floor price"  fill={CHART.colors.floorPrice}  radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-2 text-xs" style={{ color: BRAND.subtext }}>
        Hedged volume and floor price by quarter (illustrative).
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default function Q2InteractivePage() {
  const [data, setData] = useState<Q2Data | null>(null);

  // Optional override via /public/data/financials/q2-2025.json
  useEffect(() => {
    let alive = true;
    fetch('/data/financials/q2-2025.json', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (!alive) return;
        if (j && j.production && j.gasHedge && j.oilHedge) setData(j as Q2Data);
        else setData(INLINE_SAMPLE);
      })
      .catch(() => setData(INLINE_SAMPLE));
    return () => { alive = false; };
  }, []);

  const hero = data?.hero ?? INLINE_SAMPLE.hero;
  const production = data?.production ?? INLINE_SAMPLE.production;
  const gasHedge = data?.gasHedge ?? INLINE_SAMPLE.gasHedge;
  const oilHedge = data?.oilHedge ?? INLINE_SAMPLE.oilHedge;
  const latestAvg = useMemo(() => production.at(-1)?.avg, [production]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Header breadcrumbs */}
      <Breadcrumbs
        className="mb-4"
        items={[
          { href: '/', label: 'Home' },
          { href: '/financials', label: 'Financials' },
          { href: '/financials/q2-2025', label: 'Q2 2025 presentation' },
        ]}
      />

      {/* HERO with brand bar */}
      <div className="overflow-hidden rounded-3xl border shadow-sm" style={{ borderColor: BRAND.border }}>
        <div
          className="flex items-center gap-3 px-5 py-3"
          style={{ background: `linear-gradient(90deg, ${BRAND.primary} 0%, ${BRAND.accent} 100%)`, color: 'white' }}
        >
          <img src={ASSETS.logo} alt="BlueNord" className="h-6 w-auto" />
          <span className="text-sm opacity-90">Q2 2025 Interactive</span>
        </div>
        <div className="bg-white/80 p-6 md:p-7">
          <h1 className="text-2xl font-semibold" style={{ color: BRAND.text }}>{hero.title}</h1>
          {hero.subtitle && (
            <p className="mt-2 max-w-2xl text-sm" style={{ color: BRAND.subtext }}>{hero.subtitle}</p>
          )}
          <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            <div className="rounded-2xl border p-3" style={{ borderColor: BRAND.border }}>
              <div className="text-xs" style={{ color: BRAND.subtext }}>Latest avg production</div>
              <div className="mt-1 text-xl font-semibold" style={{ color: BRAND.text }}>
                {latestAvg ? `${Math.round(latestAvg)} kboe/d` : '—'}
              </div>
            </div>
            <div className="rounded-2xl border p-3" style={{ borderColor: BRAND.border }}>
              <div className="text-xs" style={{ color: BRAND.subtext }}>Gas hedge points</div>
              <div className="mt-1 text-xl font-semibold" style={{ color: BRAND.text }}>{gasHedge.length}</div>
            </div>
            <div className="rounded-2xl border p-3" style={{ borderColor: BRAND.border }}>
              <div className="text-xs" style={{ color: BRAND.subtext }}>Oil hedge points</div>
              <div className="mt-1 text-xl font-semibold" style={{ color: BRAND.text }}>{oilHedge.length}</div>
            </div>
            <div className="rounded-2xl border p-3" style={{ borderColor: BRAND.border }}>
              <div className="text-xs" style={{ color: BRAND.subtext }}>Data source</div>
              <div className="mt-1 text-xl font-semibold" style={{ color: BRAND.text }}>Inline / JSON</div>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTION */}
      <Section title="Stable production outlook">
        <ChartShell>
          <ProductionChart data={production} />
        </ChartShell>
      </Section>

      {/* HEDGE PORTFOLIOS */}
      <Section title="Hedge portfolio snapshots">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="min-w-0">
            <ChartShell>
              <HedgeChart title="Gas hedge portfolio" data={gasHedge} />
            </ChartShell>
          </div>
          <div className="min-w-0">
            <ChartShell>
              <HedgeChart title="Oil hedge portfolio" data={oilHedge} />
            </ChartShell>
          </div>
        </div>
      </Section>

      {/* Footer breadcrumbs */}
      <Breadcrumbs
        className="mt-10"
        items={[
          { href: '/', label: 'Home' },
          { href: '/financials', label: 'Financials' },
          { href: '/financials/q2-2025', label: 'Q2 2025 presentation' },
        ]}
      />
    </div>
  );
}