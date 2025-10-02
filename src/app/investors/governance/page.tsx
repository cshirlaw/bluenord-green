import React from "react";
import Link from "next/link";

export default function GovernancePage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-8 space-y-4">
      <h1 className="text-2xl font-semibold">Governance & ESG</h1>
      <p className="opacity-70">Placeholder page. Add governance documents, ESG policy, codes, etc.</p>
      <Link href="/investors" className="underline text-sm">← Back to Investors</Link>
    </main>
  );
}
