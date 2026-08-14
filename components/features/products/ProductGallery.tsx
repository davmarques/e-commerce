// components/ui/ProductGallery.tsx
"use client";
import { useState } from "react";

export function ProductGallery({ images, name }: { images: string[], name: string }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-md bg-secondary">
        <img src={activeImage} alt={name} className="h-full w-full object-cover" />
      </div>
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((img) => (
            <button
              key={img}
              onClick={() => setActiveImage(img)}
              className={`relative aspect-square overflow-hidden rounded-md border transition-colors cursor-pointer ${
                activeImage === img ? "border-foreground" : "border-border"
              }`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}