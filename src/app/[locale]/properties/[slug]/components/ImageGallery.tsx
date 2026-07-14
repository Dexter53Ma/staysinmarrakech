"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Camera, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
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
  const [isHovered, setIsHovered] = useState(false);
  const thumbContainerRef = useRef<HTMLDivElement>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  useEffect(() => {
    if (thumbContainerRef.current) {
      const thumb = thumbContainerRef.current.children[selectedIndex] as HTMLElement;
      if (thumb) {
        thumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [selectedIndex]);

  const goNext = () => {
    if (selectedIndex < images.length - 1) onSelect(selectedIndex + 1);
  };

  const goPrev = () => {
    if (selectedIndex > 0) onSelect(selectedIndex - 1);
  };

  if (images.length === 0) {
    return (
      <div className="relative h-[300px] md:h-[450px] rounded-2xl bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Camera className="size-10 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-400 text-sm">Aucune image</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div
        className="relative h-[320px] md:h-[480px] rounded-2xl overflow-hidden cursor-pointer group"
        onClick={() => openLightbox(selectedIndex)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={images[selectedIndex].url}
          alt={images[selectedIndex].alt || title}
          fill
          unoptimized={images[selectedIndex].url.startsWith("http")}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

        {/* Image counter badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <div className="bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Camera className="size-3.5" />
            {selectedIndex + 1} / {images.length}
          </div>
        </div>

        {/* Fullscreen button */}
        <div className={`absolute top-4 right-4 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
          <div className="bg-black/60 backdrop-blur-md text-white p-2 rounded-full hover:bg-black/80 transition-colors">
            <Maximize2 className="size-4" />
          </div>
        </div>

        {/* Navigation arrows */}
        {selectedIndex > 0 && (
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className={`absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
          >
            <ChevronLeft className="size-5" />
          </button>
        )}
        {selectedIndex < images.length - 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className={`absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"}`}
          >
            <ChevronRight className="size-5" />
          </button>
        )}

        {/* View all photos button */}
        <button
          onClick={(e) => { e.stopPropagation(); openLightbox(selectedIndex); }}
          className={`absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          <Maximize2 className="size-3.5" />
          Voir toutes les photos
        </button>
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="relative">
          <div
            ref={thumbContainerRef}
            className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
          >
            {images.map((img, i) => (
              <button
                key={img.id}
                onClick={() => onSelect(i)}
                className={`relative w-[72px] h-[56px] md:w-24 md:h-[72px] rounded-xl overflow-hidden shrink-0 transition-all duration-300 ${
                  i === selectedIndex
                    ? "ring-2 ring-[#0d47a1] ring-offset-2 opacity-100"
                    : "opacity-60 hover:opacity-100 hover:ring-2 hover:ring-gray-300 hover:ring-offset-1"
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.alt || `${title} ${i + 1}`}
                  fill
                  unoptimized={img.url.startsWith("http")}
                  className="object-cover"
                  sizes="96px"
                />
                {i === selectedIndex && (
                  <div className="absolute inset-0 bg-[#0d47a1]/10 pointer-events-none" />
                )}
              </button>
            ))}
          </div>
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
