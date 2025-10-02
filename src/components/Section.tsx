import React from "react";

export default function Section({
  eyebrow,
  title,
  desc,
  children,
}: {
  eyebrow?: string;
  title?: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="pt-6">
      <div className="border-t"></div>
      <div className="py-6">
        {(eyebrow || title || desc) && (
          <header className="mb-4 space-y-1">
            {eyebrow ? <div className="text-[11px] uppercase tracking-[0.08em] text-gray-500">{eyebrow}</div> : null}
            {title ? <h2 className="text-xl font-semibold">{title}</h2> : null}
            {desc ? <p className="text-[13.5px] text-gray-600 leading-relaxed">{desc}</p> : null}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
