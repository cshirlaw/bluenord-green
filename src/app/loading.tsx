import React from "react";

export default function Loading() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-12">
      <div className="animate-pulse space-y-6">
        <div className="h-48 rounded-3xl bg-gray-200" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="h-28 rounded-2xl bg-gray-200" />
          <div className="h-28 rounded-2xl bg-gray-200" />
          <div className="h-28 rounded-2xl bg-gray-200" />
        </div>
      </div>
    </main>
  );
}
