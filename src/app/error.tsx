"use client";
import React from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-16">
      <div className="rounded-3xl border p-10 text-center space-y-4">
        <div className="text-[11px] uppercase tracking-[0.08em] text-gray-500">Something went wrong</div>
        <h1 className="text-2xl font-semibold">Please try again</h1>
        <p className="text-[13.5px] text-gray-600">{error?.message || "Unexpected error"}</p>
        <div className="pt-2">
          <button onClick={reset} className="rounded-xl border px-4 py-2 hover:bg-gray-50">Reload page</button>
        </div>
      </div>
    </main>
  );
}
