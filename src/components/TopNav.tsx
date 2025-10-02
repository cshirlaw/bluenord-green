'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ASSET_LINKS = [
  { href: '/assets/tyra', label: 'Tyra' },
  { href: '/assets/halfdan', label: 'Halfdan' },
  { href: '/assets/dan', label: 'Dan' },
  { href: '/assets/gorm', label: 'Gorm' },
];

export default function TopNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-12 max-w-6xl items-center gap-6 px-4">
        {/* Brand */}
        <Link href="/" className="text-sm font-semibold tracking-tight">
          BlueNord
        </Link>

        {/* Primary nav */}
        <nav className="relative flex items-center gap-4 text-sm">
          {/* Home */}
          <Link
            href="/"
            aria-current={isActive('/') ? 'page' : undefined}
            className={
              isActive('/') ? 'font-medium text-gray-900' : 'text-gray-600 hover:text-gray-900'
            }
          >
            Home
          </Link>

          {/* Assets (dropdown) */}
          <div className="relative group">
            <Link
              href="/assets/tyra"
              aria-current={pathname.startsWith('/assets') ? 'page' : undefined}
              className={
                pathname.startsWith('/assets')
                  ? 'font-medium text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }
            >
              Assets
            </Link>
            <div
              className="invisible absolute left-0 top-full z-30 mt-2 w-44 rounded-xl border bg-white p-2 opacity-0 shadow transition
                         group-hover:visible group-hover:opacity-100"
            >
              {ASSET_LINKS.map((a) => (
                <Link
                  key={a.href}
                  href={a.href}
                  className={`block rounded-lg px-3 py-1.5 ${
                    isActive(a.href)
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {a.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Investors hub (→ featured briefing + link to Reports) */}
          <Link
            href="/investors"
            aria-current={isActive('/investors') ? 'page' : undefined}
            className={
              isActive('/investors')
                ? 'font-medium text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }
          >
            Investors
          </Link>

          {/* Financials */}
          <Link
            href="/financials"
            aria-current={isActive('/financials') ? 'page' : undefined}
            className={
              isActive('/financials')
                ? 'font-medium text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }
          >
            Financials
          </Link>
        </nav>
      </div>
    </header>
  );
}