import React from "react";

type HeroMode = "cover" | "contain";
type HeroSize = "default" | "compact";

export default function PageHero({
  imageSrc,
  imageAlt,
  title,
  intro,
  children,
  mode = "cover",
  size = "default",
}: {
  imageSrc: string;
  imageAlt: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
  mode?: HeroMode;
  size?: HeroSize;
}) {
  // Contain mode (no crop, earlier height)
  if (mode === "contain") {
    return (
      <section className="relative">
        <div className="relative mx-auto max-w-6xl px-4 pt-6 sm:pt-8">
          <div className="absolute left-4 top-4 z-10">
            <img src="/images/nordblue-2-1.png" alt="BlueNord" className="h-8 w-auto drop-shadow" />
          </div>
          <img
            src={imageSrc}
            alt={imageAlt}
            className="mx-auto w-full max-h-[420px] sm:max-h-[520px] object-contain"
          />
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-6 sm:pb-8">
          <h1 className="text-3xl sm:text-5xl font-semibold leading-tight">{title}</h1>
          {intro ? <p className="mt-3 max-w-2xl text-gray-700 text-sm sm:text-base">{intro}</p> : null}
          {children}
        </div>
      </section>
    );
  }

  // Default cover mode (with gradient overlay)
  const pad = size === "compact" ? "py-10 sm:py-14 lg:py-16" : "py-14 sm:py-20 lg:py-24";
  const minH = size === "compact" ? "min-h-[34vh] sm:min-h-[40vh]" : "min-h-[46vh] sm:min-h-[52vh]";

  return (
    <section className="relative overflow-hidden">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover object-center md:object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/60" />
      <div className="absolute left-4 top-4 z-10">
        <img src="/images/nordblue-2-1.png" alt="BlueNord" className="h-8 w-auto drop-shadow" />
      </div>
      <div className={`relative mx-auto max-w-6xl px-4 ${pad} ${minH} flex flex-col justify-end`}>
        <h1 className="text-white text-3xl sm:text-5xl font-semibold leading-tight">{title}</h1>
        {intro ? <p className="mt-3 max-w-2xl text-white/90 text-sm sm:text-base">{intro}</p> : null}
        {children}
      </div>
    </section>
  );
}