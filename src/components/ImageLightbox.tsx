"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { PropertyImage } from "@/types";

interface ImageLightboxProps {
  images: PropertyImage[];
  selectedIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageLightbox({ images, selectedIndex, onClose, onNavigate }: ImageLightboxProps) {
  const t = useTranslations("lightbox");
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [isVisible, setIsVisible] = useState(false);
  const thumbContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  const goNext = useCallback(() => {
    if (selectedIndex < images.length - 1) onNavigate(selectedIndex + 1);
  }, [selectedIndex, images.length, onNavigate]);

  const goPrev = useCallback(() => {
    if (selectedIndex > 0) onNavigate(selectedIndex - 1);
  }, [selectedIndex, onNavigate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleClose, goNext, goPrev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  useEffect(() => {
    if (thumbContainerRef.current) {
      const thumb = thumbContainerRef.current.children[selectedIndex] as HTMLElement;
      if (thumb) {
        thumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [selectedIndex]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black/98 flex flex-col transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0">
        <div className="text-white/70 text-sm font-medium">
          {selectedIndex + 1} / {images.length}
        </div>
        <button
          onClick={handleClose}
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          aria-label={t("close")}
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Main image area */}
      <div
        className="flex-1 flex items-center justify-center px-4 sm:px-16 pb-4 relative min-h-0"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Previous arrow */}
        {selectedIndex > 0 && (
          <button
            onClick={goPrev}
            className="absolute left-2 sm:left-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
            aria-label={t("prevImage")}
          >
            <ChevronLeft className="size-6" />
          </button>
        )}

        {/* Next arrow */}
        {selectedIndex < images.length - 1 && (
          <button
            onClick={goNext}
            className="absolute right-2 sm:right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
            aria-label={t("nextImage")}
          >
            <ChevronRight className="size-6" />
          </button>
        )}

        {/* Image */}
        {images[selectedIndex] && (
          <Image
            src={images[selectedIndex].url}
            alt={images[selectedIndex].alt || `Image ${selectedIndex + 1}`}
            width={1400}
            height={900}
            unoptimized
            className="max-w-full max-h-full object-contain transition-opacity duration-300"
            priority
          />
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="shrink-0 px-4 pb-4 pt-2">
          <div
            ref={thumbContainerRef}
            className="flex gap-2 justify-center overflow-x-auto scrollbar-hide max-w-full"
          >
            {images.map((img, i) => (
              <button
                key={img.id}
                onClick={() => onNavigate(i)}
                className={`relative w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden shrink-0 transition-all duration-200 ${
                  i === selectedIndex
                    ? "ring-2 ring-white opacity-100 scale-105"
                    : "opacity-50 hover:opacity-80 hover:ring-1 hover:ring-white/50"
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.alt || `Image ${i + 1}`}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
