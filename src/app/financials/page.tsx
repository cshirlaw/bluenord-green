import Link from 'next/link';

/* ----------------------------- Brand ----------------------------- */
const BRAND = {
  primary: '#0A2A4A',
  accent: '#00A3E0',
  text: '#0f172a',
  subtext: '#475569',
  border: '#E5E7EB',
};

const ASSETS = {
  logo: '/images/brand/bluenord-logo-260925.png',
};

/* --------------------------- Breadcrumbs -------------------------- */
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

/* ----------------------------- Page ------------------------------ */
export default function FinancialsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Header breadcrumbs */}
      <Breadcrumbs
        className="mb-4"
        items={[
          { href: '/', label: 'Home' },
          { href: '/financials', label: 'Financials' },
        ]}
      />

      {/* Hero / Brand band */}
      <div className="overflow-hidden rounded-3xl border shadow-sm" style={{ borderColor: BRAND.border }}>
        <div
          className="flex items-center gap-3 px-5 py-4"
          style={{ background: `linear-gradient(90deg, ${BRAND.primary} 0%, ${BRAND.accent} 100%)`, color: 'white' }}
        >
          <img src={ASSETS.logo} alt="BlueNord" className="h-7 w-auto" />
          <div className="ml-1">
            <h1 className="text-lg font-semibold">Financials</h1>
            <p className="text-xs opacity-90">
              Interactive quarterlies and key investor documents.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive briefings */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold" style={{ color: BRAND.text }}>Interactive presentations</h2>
        <p className="mt-1 text-sm" style={{ color: BRAND.subtext }}>
          Explore live charts and summaries derived from the company presentations.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {/* Q3 2025 */}
          <Link
            href="/financials/q3-2025"
            className="block rounded-2xl border p-5 transition hover:bg-gray-50"
            style={{ borderColor: BRAND.border }}
          >
            <div className="text-sm font-semibold" style={{ color: BRAND.text }}>
              Q3 2025 presentation (interactive)
            </div>
            <div className="mt-1 text-xs" style={{ color: BRAND.subtext }}>
              XLSX → JSON powered page with production & hedge charts.
            </div>
          </Link>

          {/* Q2 2025 */}
          <Link
            href="/financials/q2-2025"
            className="block rounded-2xl border p-5 transition hover:bg-gray-50"
            style={{ borderColor: BRAND.border }}
          >
            <div className="text-sm font-semibold" style={{ color: BRAND.text }}>
              Q2 2025 presentation (interactive)
            </div>
            <div className="mt-1 text-xs" style={{ color: BRAND.subtext }}>
              Production outlook and hedge portfolio snapshots.
            </div>
          </Link>
        </div>
      </section>

      {/* Key documents */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold" style={{ color: BRAND.text }}>Key documents</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {/* Featured PDF (Pareto) */}
          <a
            href="/reports/2025/BlueNord_ASA_Pareto_Securities_Energy_Conference_10_September_2025.pdf"
            target="_blank"
            rel="noreferrer"
            className="block rounded-2xl border p-5 transition hover:bg-gray-50"
            style={{ borderColor: BRAND.border }}
          >
            <div className="text-sm font-semibold" style={{ color: BRAND.text }}>
              Pareto Securities Energy Conference (10 Sep 2025) — PDF
            </div>
            <div className="mt-1 text-xs" style={{ color: BRAND.subtext }}>
              Full presentation deck (opens in a new tab).
            </div>
          </a>

          {/* Reports & Results hub */}
          <Link
            href="/investors/reports"
            className="block rounded-2xl border p-5 transition hover:bg-gray-50"
            style={{ borderColor: BRAND.border }}
          >
            <div className="text-sm font-semibold" style={{ color: BRAND.text }}>
              Reports &amp; Results
            </div>
            <div className="mt-1 text-xs" style={{ color: BRAND.subtext }}>
              Browse annual reports, quarterly results, and investor decks.
            </div>
          </Link>
        </div>
      </section>

      {/* Footer breadcrumbs */}
      <Breadcrumbs
        className="mt-10"
        items={[
          { href: '/', label: 'Home' },
          { href: '/financials', label: 'Financials' },
        ]}
      />
    </div>
  );
}