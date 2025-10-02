// File: src/components/FieldGallery.tsx
import Image from "next/image";

type Photo = { src: string; alt: string; width?: number; height?: number };

export default function FieldGallery({ images }: { images: Photo[] }) {
  if (!images?.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((img, i) => (
        <div key={img.src} className="rounded-xl shadow-sm overflow-hidden">
          {/* 4:3 aspect ratio without relying on Tailwind's aspect utilities */}
          <div className="relative h-0 pb-[75%] bg-slate-100">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
