"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import InvestorsClient from "@/components/InvestorsClient";

type TabKey = "reports" | "presentations" | "calendar" | "news" | "governance" | "contacts";

const TABS: { key: TabKey; label: string }[] = [
  { key: "reports",       label: "Reports" },
  { key: "presentations", label: "Presentations" },
  { key: "calendar",      label: "Financial Calendar" },
  { key: "news",          label: "News" },
  { key: "governance",    label: "Governance & ESG" },
  { key: "contacts",      label: "IR Contacts" },
];

export default function InvestorsTabs() {
  const search = useSearchParams();
  const router = useRouter();
  const [tab, setTab] = useState<TabKey>("reports");

  useEffect(() => {
    const t = (search.get("tab") as TabKey) || "reports";
    if (TABS.find(x => x.key === t)) setTab(t);
  }, [search]);

  function selectTab(next: TabKey) {
    setTab(next);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", next);
    router.replace(url.pathname + "?" + url.searchParams.toString());
  }

  function renderContent() {
    switch (tab) {
      case "reports":
        return <InvestorsClient />;
      case "presentations":
        return <p className="opacity-70">Add investor deck PDFs here.</p>;
      case "calendar":
        return <p className="opacity-70">Add key reporting dates and events.</p>;
      case "news":
        return <p className="opacity-70">Wire this to your RNS/regulatory news when ready.</p>;
      case "governance":
        return <p className="opacity-70">Policies, governance and ESG documents.</p>;
      case "contacts":
        return (
          <ul className="list-disc pl-5">
            <li className="opacity-70">Add IR contact names, roles and emails.</li>
          </ul>
        );
      default:
        return null;
    }
  }

  return (
    <div className="space-y-6">
      <nav className="flex flex-wrap gap-2">
        {TABS.map(t => {
          const active = t.key === tab;
          return (
            <button
              key={t.key}
              onClick={() => selectTab(t.key)}
              className={`rounded-full border px-4 py-2 text-sm ${active ? "bg-black text-white border-black" : "hover:bg-gray-50"}`}
              aria-pressed={active}
            >
              {t.label}
            </button>
          );
        })}
      </nav>
      <section>{renderContent()}</section>
    </div>
  );
}
