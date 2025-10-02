import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-16">
      <div className="rounded-3xl border p-10 text-center space-y-4">
        <div className="text-[11px] uppercase tracking-[0.08em] text-gray-500">404</div>
        <h1 className="text-2xl font-semibold">We couldn’t find that page</h1>
        <p className="text-[13.5px] text-gray-600">
          The link may be broken or the page may have moved.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Link href="/" className="rounded-xl border px-4 py-2 hover:bg-gray-50">Go home</Link>
          <Link href="/investors" className="rounded-xl border px-4 py-2 hover:bg-gray-50">Investors</Link>
        </div>
      </div>
    </main>
  );
}
