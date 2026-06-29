"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Icon,
  faArrowLeft,
  faArrowRight,
  faMapMarkerAlt,
  faMaximize,
  faBed,
  faUsers,
  farHeart,
  faHeart,
} from "@/components/icons";

interface Villa {
  name: string;
  image: string;
  quartier: string;
  price: string;
  terrain: string;
  surface: string;
  chambres: number;
  pax: number;
  slug: string;
  isFeatured: boolean;
}

interface RawProperty {
  title: string;
  images?: { url: string }[];
  quarter?: string;
  price?: number | string;
  plotArea?: number | string;
  builtArea?: number | string;
  bedrooms?: number;
  maxGuests?: number;
  slug: string;
  isFeatured?: boolean;
}

const features = [
  { icon: faMapMarkerAlt, label: "Terrain" },
  { icon: faMaximize, label: "Surface" },
  { icon: faBed, label: "Chambres" },
  { icon: faUsers, label: "Pax" },
];

export default function VillaCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [villas, setVillas] = useState<Villa[]>([]);

  useEffect(() => {
    fetch("/api/properties?limit=6")
      .then((r) => r.json())
      .then((data) => {
        const mapped: Villa[] = (data.data || []).map((p: RawProperty) => ({
          name: p.title,
          image: p.images?.[0]?.url || "/images/villas/default.webp",
          quartier: p.quarter || "",
          price: p.price ? `À partir de ${Number(p.price).toLocaleString("fr-FR")} € /nuit` : "",
          terrain: p.plotArea ? `${p.plotArea}m²` : "",
          surface: p.builtArea ? `${p.builtArea}m²` : "",
          chambres: p.bedrooms || 0,
          pax: p.maxGuests || 0,
          slug: p.slug,
          isFeatured: p.isFeatured || false,
        }));
        setVillas(mapped);
      })
      .catch((e) => console.error("[VillaCarousel] fetch error:", e));
  }, []);

  const toggleWishlist = (name: string) => {
    setWishlist((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

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
    const cardWidth = scrollRef.current.querySelector<HTMLElement>(":scope > div")?.offsetWidth || 360;
    const gap = 24;
    const amount = direction === "left" ? -(cardWidth + gap) : cardWidth + gap;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  const isLoading = villas.length === 0;

  return (
    <section className="py-16 px-4 max-w-[1200px] mx-auto overflow-hidden">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0d47a1] mb-3">
          Découvrez notre sélection de villas de luxe à Marrakech
        </h2>
        <p className="text-[#34495e] text-lg">
          Une sélection des meilleures villas à Marrakech.
        </p>
      </div>

      {isLoading ? (
        <div className="flex gap-6 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-none w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white rounded-[4px] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
              <div className="w-full h-[200px] bg-gray-200 animate-pulse" />
              <div className="p-[15px] space-y-3">
                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                <div className="h-5 bg-gray-200 rounded animate-pulse w-2/3" />
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-4 bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>
              </div>
              <div className="px-[15px] pb-[15px]">
                <div className="h-10 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : (
      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-11 h-11 flex items-center justify-center hover:bg-[#0d47a1] hover:text-white transition-colors"
            aria-label="Précédent"
          >
            <Icon icon={faArrowLeft} />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-4"
        >
          {villas.map((villa) => (
            <div
              key={villa.slug}
              className="flex-none w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start bg-white rounded-[4px] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.1)]"
            >
              <Link href={`/properties/${villa.slug}`} className="block">
                <div className="relative w-full h-[200px]">
                  <Image
                    src={villa.image || "/images/placeholder.svg"}
                    alt={villa.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {villa.isFeatured && (
                    <span className="absolute top-2 left-2 bg-[#0d47a1] text-white text-[11px] font-bold px-2 py-1 rounded">
                      Nouveauté
                    </span>
                  )}
                  <button
                    onClick={(e) => { e.preventDefault(); toggleWishlist(villa.name); }}
                    className="absolute top-2 right-2 w-11 h-11 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors z-10"
                    aria-label={wishlist.includes(villa.name) ? "Retirer de la sélection" : "Ajouter à la sélection"}
                  >
                    <Icon
                      icon={wishlist.includes(villa.name) ? faHeart : farHeart}
                      className={`text-sm ${wishlist.includes(villa.name) ? "text-red-500" : "text-gray-500"}`}
                    />
                  </button>
                </div>

                <div className="p-[15px]">
                  <p className="text-[13px] text-[#34495e] mb-1">{villa.quartier}</p>
                  <p className="text-[14px] font-bold text-[#0d47a1] mb-2">{villa.price}</p>
                  <h3 className="text-[18px] font-bold text-[#0d47a1] mb-3 hover:underline">
                    {villa.name}
                  </h3>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {features.map((feat, i) => (
                      <div key={feat.label} className="flex items-center gap-1.5 text-[14px] text-[#34495e]">
                        <Icon icon={feat.icon} className="text-[#0d47a1] text-[12px]" />
                        <span>
                          <strong>
                            {i === 0 && villa.terrain}
                            {i === 1 && villa.surface}
                            {i === 2 && villa.chambres}
                            {i === 3 && villa.pax}
                          </strong>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>

              <div className="px-[15px] pb-[15px]">
                <Link
                  href={`/properties/${villa.slug}`}
                  className="flex items-center justify-center gap-2 w-full bg-[#0d47a1] text-white text-[13px] font-medium py-2.5 rounded hover:bg-[#0a3a82] transition-colors"
                >
                  Voir détails
                </Link>
              </div>
            </div>
          ))}
        </div>

        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-11 h-11 flex items-center justify-center hover:bg-[#0d47a1] hover:text-white transition-colors"
            aria-label="Suivant"
          >
            <Icon icon={faArrowRight} />
          </button>
        )}
      </div>
      )}
    </section>
  );
}
