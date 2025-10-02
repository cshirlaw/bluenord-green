"use client";

import React from "react";

export type TypeSel = "all" | "presentation" | "report" | "annual";
const OPTIONS: { value: TypeSel; label: string }[] = [
  { value: "presentation", label: "Presentations" },
  { value: "report",       label: "Reports" },
  { value: "annual",       label: "Annual" },
  { value: "all",          label: "All" },
];

export default function TypeDropdown({
  value,
  onChange,
  className = "",
}: {
  value: TypeSel;
  onChange: (v: TypeSel) => void;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const current = OPTIONS.find((o) => o.value === value) ?? OPTIONS[0];

  return (
    <div ref={wrapRef} className={`relative w-full sm:w-auto ${className}`}>
      <select
        className="sm:hidden w-full rounded-2xl border px-3 py-2 text-sm text-gray-900 bg-white"
        value={value}
        onChange={(e) => onChange(e.target.value as TypeSel)}
        aria-label="Filter type"
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="hidden sm:inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm text-gray-900 bg-white hover:shadow"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {current.label}
        <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden="true" className="opacity-70">
          <path d="M5 7l5 6 5-6" fill="currentColor" />
        </svg>
      </button>

      {open && (
        <div
          className="hidden sm:block absolute left-0 right-0 z-50 mt-1 rounded-2xl border bg-white shadow-lg max-h-64 overflow-auto overscroll-contain"
          role="listbox"
        >
          {OPTIONS.map((o) => (
            <button
              key={o.value}
              className={`w-full text-left px-3 py-2 text-sm ${o.value === value ? "bg-black text-white" : "text-gray-900 hover:bg-gray-50"}`}
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              role="option"
              aria-selected={o.value === value}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}