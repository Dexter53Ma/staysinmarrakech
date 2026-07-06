"use client";

import { useState } from "react";
import Image from "next/image";
import ImageLightbox from "@/components/ImageLightbox";
import type { PropertyImage } from "@/types";

interface ImageGalleryProps {
  images: PropertyImage[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  title: string;
}

export default function ImageGallery({ images, selectedIndex, onSelect, title }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div>
      <div
        className="relative h-[300px] md:h-[450px] rounded-xl overflow-hidden cursor-pointer"
        onClick={() => openLightbox(selectedIndex)}
      >
        {images[selectedIndex] ? (
          <Image
            src={images[selectedIndex].url}
            alt={images[selectedIndex].alt || title}
            fill
            unoptimized={images[selectedIndex].url.startsWith("http")}
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
                unoptimized={img.url.startsWith("http")}
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <ImageLightbox
          images={images}
          selectedIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
