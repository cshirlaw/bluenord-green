"use client";

import Link from "next/link";
import { useEffect } from "react";

type Item = { href: string; label: string };

export default function MobileNav({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: Item[];
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="border-t bg-white md:hidden" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <nav className="flex flex-col gap-3">
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="rounded-md px-2 py-2 text-sm hover:bg-black/5"
            >
              {i.label}
            </Link>
          ))}
          <Link href="/investors#reports" className="rounded-lg border px-3 py-2 text-sm font-medium">
            Reports
          </Link>
          <button onClick={onClose} className="mt-2 self-start rounded-md text-sm underline">
            Close
          </button>
        </nav>
      </div>
    </div>
  );
}
