import React from "react";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} BlueNord
          </div>
          <nav className="text-sm text-gray-600">
            <ul className="flex flex-wrap gap-4">
              <li><Link href="/company" className="hover:text-black">Company</Link></li>
              <li><Link href="/assets" className="hover:text-black">Assets</Link></li>
              <li><Link href="/investors" className="hover:text-black">Investors</Link></li>
            </ul>
          </nav>
          <div className="text-sm text-gray-600">
            <a href="/sitemap" className="hover:text-black">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
