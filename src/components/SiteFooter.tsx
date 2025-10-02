import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-start justify-between gap-4 text-xs text-black/60 md:flex-row">
          <div>© {new Date().getFullYear()} BlueNord. All rights reserved.</div>
          <nav className="flex flex-wrap gap-4">
            <Link href="/investors" className="hover:underline">Investors</Link>
            <Link href="/company" className="hover:underline">Company</Link>
            <Link href="/assets" className="hover:underline">Assets</Link>
            <Link href="/financials" className="hover:underline">Financials</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}