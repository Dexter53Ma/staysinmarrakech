"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Icon,
  faArrowLeft,
  faArrowRight,
} from "@/components/icons";

interface Quartier {
  name: string;
  image: string;
  slug: string;
}

export default function QuartiersCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [quartiers, setQuartiers] = useState<Quartier[]>([]);

  useEffect(() => {
    fetch("/api/locations")
      .then((r) => r.json())
      .then((data) =>
        setQuartiers(
          (data || []).map((location: { name: string; image?: string; slug: string }) => ({
            name: location.name,
            image: location.image || "/images/quartiers/default.webp",
            slug: location.slug,
          }))
        )
      )
      .catch(() => {});
  }, []);

  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons);
    updateScrollButtons();
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.querySelector<HTMLElement>(":scope > div")?.offsetWidth || 200;
    const gap = 16;
    const amount = direction === "left" ? -(cardWidth + gap) : cardWidth + gap;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="max-w-[1140px] mx-auto py-[50px] px-[15px] overflow-hidden">
      <h2 className="text-[26px] font-bold uppercase text-[#0b1014] mb-6">
        Location villas Marrakech
      </h2>
      <p className="text-[#34495e] text-[16px] mb-8">
        Réservez une villa à Marrakech avec StaysInMarrakech pour profiter d&apos;un séjour unique alliant confort, élégance et services haut de gamme.
      </p>

      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-11 h-11 flex items-center justify-center hover:bg-[#0b1014] hover:text-white transition-colors"
            aria-label="Précédent"
          >
            <Icon icon={faArrowLeft} />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
        >
          {quartiers.map((q) => (
            <Link
              key={q.name}
              href={`/properties?quarter=${q.slug}`}
              className="relative flex-none w-[200px] h-[150px] rounded-[4px] overflow-hidden snap-start group cursor-pointer"
            >
              <Image
                src={q.image || "/images/placeholder.svg"}
                alt={q.name}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-105"
                sizes="200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                <span className="text-white text-[14px] font-bold uppercase">
                  {q.name}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-11 h-11 flex items-center justify-center hover:bg-[#0b1014] hover:text-white transition-colors"
            aria-label="Suivant"
          >
            <Icon icon={faArrowRight} />
          </button>
        )}
      </div>
    </section>
  );
}
