import Link from "next/link";

type NavItem = { label: string; href: string };

export default function FieldNav({ prev, next }: { prev: NavItem; next: NavItem }) {
  return (
    <nav aria-label="Field navigation" className="mt-12 pt-6 border-t border-slate-200">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <Link
          href={prev.href}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-800 hover:underline"
        >
          <span aria-hidden="true">←</span>
          {prev.label}
        </Link>

        <Link
          href="/assets"
          className="inline-flex items-center justify-center text-sm font-medium text-slate-800 hover:underline"
        >
          Back to Assets
        </Link>

        <Link
          href={next.href}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-800 hover:underline"
        >
          {next.label}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </nav>
  );
}
