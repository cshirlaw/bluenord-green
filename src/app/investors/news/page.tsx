import React from "react";
import Link from "next/link";

export default function RegulatoryNewsPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-8 space-y-4">
      <h1 className="text-2xl font-semibold">Regulatory News</h1>
      <p className="opacity-70">Placeholder page. Hook this up to your news/RNS source when ready.</p>
      <Link href="/investors" className="underline text-sm">← Back to Investors</Link>
    </main>
  );
}
