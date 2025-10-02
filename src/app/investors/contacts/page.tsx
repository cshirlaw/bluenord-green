import React from "react";
import Link from "next/link";

export default function IRContactsPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-8 space-y-4">
      <h1 className="text-2xl font-semibold">Investor Relations Contacts</h1>
      <ul className="list-disc pl-5">
        <li>Add IR contact names, roles, and emails here.</li>
      </ul>
      <Link href="/investors" className="underline text-sm">← Back to Investors</Link>
    </main>
  );
}
