"use client";

import { useEffect, useCallback, useRef } from "react";
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

  const goNext = useCallback(() => {
    if (selectedIndex < images.length - 1) onNavigate(selectedIndex + 1);
  }, [selectedIndex, images.length, onNavigate]);

  const goPrev = useCallback(() => {
    if (selectedIndex > 0) onNavigate(selectedIndex - 1);
  }, [selectedIndex, onNavigate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goNext, goPrev]);

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

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label={t("close")}
      >
        <X className="size-5" />
      </button>

      {/* Previous arrow */}
      {selectedIndex > 0 && (
        <button
          onClick={goPrev}
          className="absolute left-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors hidden sm:flex"
          aria-label={t("prevImage")}
        >
          <ChevronLeft className="size-5" />
        </button>
      )}

      {/* Next arrow */}
      {selectedIndex < images.length - 1 && (
        <button
          onClick={goNext}
          className="absolute right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors hidden sm:flex"
          aria-label={t("nextImage")}
        >
          <ChevronRight className="size-5" />
        </button>
      )}

      {/* Image */}
      <div
        className="w-full h-full flex items-center justify-center p-4 sm:p-12"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images[selectedIndex] && (
          <Image
            src={images[selectedIndex].url}
            alt={images[selectedIndex].alt || `Image ${selectedIndex + 1}`}
            width={1200}
            height={800}
            unoptimized
            className="max-w-full max-h-[85vh] object-contain"
            priority
          />
        )}
      </div>

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium">
        {selectedIndex + 1} / {images.length}
      </div>
    </div>
  );
}
