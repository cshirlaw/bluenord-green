'use client';

import Link from 'next/link';
import Image from 'next/image';

/* ----------------------------- Brand & UI ----------------------------- */
const BRAND = {
  primary: '#0A2A4A',
  accent: '#00A3E0',
  text: '#0f172a',
  subtext: '#475569',
  border: '#E5E7EB',
};

/** Smaller text breadcrumbs (xs on mobile, sm on desktop) */
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

function Card({
  title, href, children,
}: { title: string; href: string; children?: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border p-5 transition hover:shadow-sm"
      style={{ borderColor: BRAND.border }}
    >
      <div className="text-base font-semibold" style={{ color: BRAND.text }}>{title}</div>
      {children && <div className="mt-2 text-sm" style={{ color: BRAND.subtext }}>{children}</div>}
    </Link>
  );
}

export default function InvestorsHubPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
      {/* HEADER BREADCRUMBS */}
      <Breadcrumbs
        className="mb-4"
        items={[
          { href: '/', label: 'Home' }, // (Optional: change to 'HomeGreen' for consistency)
          { href: '/investors', label: 'Investors' },
        ]}
      />

      {/* HERO (with image) */}
      <section
        className="overflow-hidden rounded-3xl border shadow-sm"
        style={{ borderColor: BRAND.border }}
      >
        <div className="grid grid-cols-1 items-center gap-6 p-6 md:grid-cols-2 md:gap-8 md:p-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold" style={{ color: BRAND.primary }}>
              Investors
            </h1>
            <p className="mt-2 max-w-2xl text-sm md:text-base" style={{ color: BRAND.subtext }}>
              Reports, results and interactive briefings derived from official presentations.
            </p>
          </div>
          <div
            className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border"
            style={{ borderColor: BRAND.border }}
          >
            <Image
              src="/investors/investors-hero.jpg"
              alt="Investor relations — BlueNord-Green"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* GRID */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {/* Reports & Results */}
        <Card title="Reports & Results" href="/investors/reports">
          Annual reports, quarterlies, and investor presentations — searchable and filterable by year.
        </Card>

        {/* Interactive briefings */}
        <div className="rounded-2xl border p-5" style={{ borderColor: BRAND.border }}>
          <div className="text-base font-semibold" style={{ color: BRAND.text }}>Interactive briefings</div>
          <div className="mt-2 text-sm" style={{ color: BRAND.subtext }}>
            Web-native summaries with charts derived from the source PDFs/spreadsheets.
          </div>
          <div className="mt-3 grid gap-2">
            <Link href="/investors/briefings/pareto-2025-09" className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50" style={{ borderColor: BRAND.border, color: BRAND.primary }}>
              Pareto briefing (Sep 2025)
            </Link>
            {/* Until we move routes, link to the existing financials pages */}
            <Link href="/financials/q2-2025" className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50" style={{ borderColor: BRAND.border, color: BRAND.primary }}>
              Q2 2025 presentation (interactive)
            </Link>
            <Link href="/financials/q3-2025" className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50" style={{ borderColor: BRAND.border, color: BRAND.primary }}>
              Q3 2025 presentation (interactive)
            </Link>
          </div>
        </div>
      </div>

      {/* FOOTER BREADCRUMBS */}
      <Breadcrumbs
        className="mt-10"
        items={[
          { href: '/', label: 'Home' }, // (Optional: 'HomeGreen')
          { href: '/investors', label: 'Investors' },
        ]}
      />
    </div>
  );
}