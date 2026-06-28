"use client";

import Image from "next/image";
import type { PropertyImage } from "@/types";

interface ImageGalleryProps {
  images: PropertyImage[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  title: string;
}

export default function ImageGallery({ images, selectedIndex, onSelect, title }: ImageGalleryProps) {
  return (
    <div>
      <div className="relative h-[300px] md:h-[450px] rounded-xl overflow-hidden">
        {images[selectedIndex] ? (
          <Image
            src={images[selectedIndex].url}
            alt={images[selectedIndex].alt || title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
            Aucune image
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => onSelect(i)}
              className={`relative w-20 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-colors ${
                i === selectedIndex ? "border-[#0d47a1]" : "border-transparent hover:border-gray-300"
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt || `${title} ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
