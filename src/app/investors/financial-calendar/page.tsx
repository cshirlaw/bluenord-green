import React from "react";
import Link from "next/link";

export default function FinancialCalendarPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-8 space-y-4">
      <h1 className="text-2xl font-semibold">Financial Calendar</h1>
      <p className="opacity-70">Placeholder page. Add your key dates and events.</p>
      <Link href="/investors" className="underline text-sm">← Back to Investors</Link>
    </main>
  );
}
