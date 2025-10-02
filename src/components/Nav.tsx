"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const links = [
    { href: "/the-company", label: "The Company" },
    { href: "/assets", label: "Assets" },
    { href: "/investors", label: "Investors" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-30 mb-8 rounded-2xl border bg-white/80 p-4 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <img src="/logo.svg" alt="Logo" className="h-6 w-6" />
          <span>Bluenord</span>
        </Link>

        <ul className="flex gap-5">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    isActive
                      ? "text-brand font-semibold bg-brand/10 rounded-md px-2 py-1"
                      : "text-slate-700 hover:text-brand hover:bg-brand/5 hover:underline rounded-md px-2 py-1"
                  }
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
