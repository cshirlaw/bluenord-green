'use client';

import Link from 'next/link';
import { FileDown, ExternalLink } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Brand                                                              */
/* ------------------------------------------------------------------ */
const BRAND = {
  primary: '#0A2A4A',
  accent: '#00A3E0',
  text: '#0f172a',
  subtext: '#475569',
  border: '#E5E7EB',
};

/* ------------------------------------------------------------------ */
/* Featured briefing config                                           */
/* ------------------------------------------------------------------ */
const BRIEFING = {
  slug: '/investors/briefings/pareto-2025-09',
  title: 'Investor Briefing — Pareto Energy Conference (Sep 2025)',
  summary:
    'Web-style version of the September 10, 2025 presentation. Interactive charts on production, hedging and distributions.',
  logo: '/images/brand/bluenord-logo-260925.png',
  hero: '/images/briefings/pareto-2025-09/hero.png',
  pdf: '/reports/2025/BlueNord_ASA_Pareto_Securities_Energy_Conference_10_September_2025.pdf',
  dateISO: '2025-09-10T12:00:00.000Z',
};

/* ------------------------------------------------------------------ */
/* Deterministic date formatter (no Intl to avoid hydration issues)    */
/* ------------------------------------------------------------------ */
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmtDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const mm = MONTHS[d.getUTCMonth()];
  const yy = d.getUTCFullYear();
  return `${dd} ${mm} ${yy}`;
}

/* ------------------------------------------------------------------ */
/* Small breadcrumbs (xs on mobile)                                   */
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
              <Link href={it.href} className="hover:underline">{it.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default function InvestorsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* HEADER BREADCRUMBS */}
      <Breadcrumbs
        className="mb-4"
        items={[
          { href: '/', label: 'Home' },
          { href: '/investors', label: 'Investors' },
        ]}
      />

      <header className="mb-6">
        <h1 className="text-2xl font-semibold" style={{ color: BRAND.text }}>Investors</h1>
        <p className="mt-1 text-sm" style={{ color: BRAND.subtext }}>
          Key materials for shareholders, lenders and analysts.
        </p>
      </header>

      {/* Featured investor briefing */}
      <section className="overflow-hidden rounded-3xl border shadow-sm" style={{ borderColor: BRAND.border }}>
        {/* brand bar */}
        <div
          className="flex items-center gap-3 px-5 py-3"
          style={{ background: `linear-gradient(90deg, ${BRAND.primary} 0%, ${BRAND.accent} 100%)`, color: 'white' }}
        >
          <img src={BRIEFING.logo} alt="BlueNord" className="h-6 w-auto" />
          <span className="text-sm opacity-90">Featured investor briefing</span>
        </div>

        {/* hero card */}
        <div className="relative">
          <img src={BRIEFING.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" loading="eager" />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
            style={{ background: 'linear-gradient(0deg, rgba(255,255,255,0.95), rgba(255,255,255,0))' }}
          />
          <div className="relative z-10 grid gap-4 p-6 md:grid-cols-3 md:gap-6 md:p-7">
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold" style={{ color: BRAND.text }}>{BRIEFING.title}</h2>
              <div className="mt-1 text-xs" style={{ color: BRAND.subtext }}>
                <span suppressHydrationWarning>{fmtDate(BRIEFING.dateISO)}</span>
              </div>
              <p className="mt-3 text-sm" style={{ color: BRAND.subtext }}>{BRIEFING.summary}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Link
                  href={BRIEFING.slug}
                  className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm shadow-sm transition hover:bg-gray-50"
                  style={{ borderColor: BRAND.border, color: BRAND.primary }}
                >
                  <ExternalLink className="h-4 w-4" />
                  View briefing
                </Link>
                <a
                  href={BRIEFING.pdf}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm shadow-sm transition hover:bg-gray-50"
                  style={{ borderColor: BRAND.border, color: BRAND.primary }}
                >
                  <FileDown className="h-4 w-4" />
                  Download PDF
                </a>
              </div>
            </div>

            {/* Quick facts / CTA box */}
            <div className="rounded-2xl border bg-white/70 p-4" style={{ borderColor: BRAND.border }}>
              <div className="text-sm font-medium" style={{ color: BRAND.text }}>What’s inside</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm" style={{ color: BRAND.subtext }}>
                <li>Production outlook post-Tyra</li>
                <li>Hedging snapshot</li>
                <li>Distribution framework</li>
              </ul>
              <Link href={BRIEFING.slug} className="mt-3 inline-block text-sm underline" style={{ color: BRAND.primary }}>
                Explore the interactive briefing →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="mt-10">
        <h3 className="mb-3 text-lg font-semibold" style={{ color: BRAND.text }}>More investor materials</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/investors/reports"
            className="group block rounded-2xl border p-5 transition hover:bg-gray-50"
            style={{ borderColor: BRAND.border }}
          >
            <div className="text-base font-medium" style={{ color: BRAND.text }}>Reports &amp; Results</div>
            <p className="mt-1 text-sm" style={{ color: BRAND.subtext }}>
              Annual reports, quarterlies, and investor presentations.
            </p>
            <div
              className="mt-3 inline-flex items-center gap-1 text-sm underline underline-offset-4 group-hover:no-underline"
              style={{ color: BRAND.primary }}
            >
              Open reports
              <ExternalLink className="h-4 w-4" />
            </div>
          </Link>

          {/* Placeholder for future sections */}
          <div className="rounded-2xl border p-5" style={{ borderColor: BRAND.border }}>
            <div className="text-base font-medium" style={{ color: BRAND.text }}>Share &amp; Debt (coming soon)</div>
            <p className="mt-1 text-sm" style={{ color: BRAND.subtext }}>
              Key figures, capital structure and distribution policy.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER BREADCRUMBS */}
      <Breadcrumbs
        className="mt-10"
        items={[
          { href: '/', label: 'Home' },
          { href: '/investors', label: 'Investors' },
        ]}
      />
    </div>
  );
}