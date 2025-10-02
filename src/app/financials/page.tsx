import Link from 'next/link';

/* ----------------------------- Brand ----------------------------- */
const BRAND = {
  primary: '#0A2A4A',
  accent: '#00A3E0',
  text: '#0f172a',
  subtext: '#475569',
  border: '#E5E7EB',
  chip: '#EEF2F7',
};

/* ----------------------------- UI bits ----------------------------- */
function Breadcrumbs({
  items,
  className = '',
}: {
  items: { href: string; label: string }[];
  className?: string;
}) {
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

/* ----------------------------- Page ----------------------------- */
export default function FinancialsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Header breadcrumbs */}
      <Breadcrumbs
        className="mb-4"
        items={[
          { href: '/', label: 'Home' },
          { href: '/financials', label: 'Financials' },
        ]}
      />

      {/* Heading */}
      <header className="mb-6">
        <h1 className="text-2xl font-semibold" style={{ color: BRAND.text }}>
          Financials
        </h1>
        <p className="mt-1 text-sm" style={{ color: BRAND.subtext }}>
          Presentations, results, and interactive briefings. Use the quick links below to jump to what you need.
        </p>
      </header>

      {/* Featured presentation (static card) */}
      <section
        className="mb-6 rounded-2xl border p-5 shadow-sm"
        style={{ borderColor: BRAND.border, background: 'white' }}
      >
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div
                className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium"
                style={{ background: BRAND.chip, color: BRAND.primary }}
              >
                Featured
              </div>
              <h2 className="truncate text-base font-medium" style={{ color: BRAND.text }}>
                Pareto Securities Energy Conference (10 Sep 2025)
              </h2>
            </div>
            <div className="mt-1 text-xs" style={{ color: BRAND.subtext }}>
              PDF · 10 Sep 2025
            </div>
          </div>
          <a
            href="/reports/2025/BlueNord_ASA_Pareto_Securities_Energy_Conference_10_September_2025.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm shadow-sm transition hover:bg-gray-50"
            style={{ borderColor: BRAND.border, color: BRAND.primary }}
          >
            Open PDF
          </a>
        </div>
      </section>

      {/* Interactive briefings */}
      <section
        className="mb-6 rounded-2xl border p-5"
        style={{ borderColor: BRAND.border, background: 'white' }}
      >
        <div className="text-sm" style={{ color: BRAND.text }}>
          <span className="mr-2 font-medium">Interactive briefings:</span>
          <Link href="/financials/q2-2025" className="underline">
            Q2 2025 presentation
          </Link>
          <span className="mx-2 text-gray-400">·</span>
          <Link href="/investors/briefings/pareto-2025-09" className="underline">
            Pareto (Sep 2025)
          </Link>
        </div>
        <p className="mt-2 text-xs" style={{ color: BRAND.subtext }}>
          These pages are updated from simple JSON files so new figures can be published without code changes.
        </p>
      </section>

      {/* Quick links */}
      <section className="grid gap-4 md:grid-cols-2">
        <Link
          href="/investors/reports"
          className="rounded-2xl border p-5 transition hover:bg-gray-50"
          style={{ borderColor: BRAND.border, background: 'white', color: BRAND.text }}
        >
          <div className="text-base font-medium">All Reports &amp; Results</div>
          <div className="mt-1 text-sm" style={{ color: BRAND.subtext }}>
            Annual reports, quarterlies, and investor presentations.
          </div>
        </Link>

        <Link
          href="/investors/share"
          className="rounded-2xl border p-5 transition hover:bg-gray-50"
          style={{ borderColor: BRAND.border, background: 'white', color: BRAND.text }}
        >
          <div className="text-base font-medium">Shares &amp; Debt</div>
          <div className="mt-1 text-sm" style={{ color: BRAND.subtext }}>
            Share information and debt overview.
          </div>
        </Link>
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