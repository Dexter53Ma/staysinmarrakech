"use client";

import { useSettings } from "@/components/SettingsContext";
import Image from "next/image";
import { Icon, faArrowRight } from "@/components/icons";

export default function LocationSection() {
  const settings = useSettings();

  const title = settings.location_title || "StaysInMarrakech : Location de villa de luxe à Marrakech";
  const description = settings.location_description || "StaysInMarrakech est une société spécialisée dans la location de villas de luxe et de prestige à Marrakech.";
  const image = settings.location_image || "/images/sections/location-villa-marrakech.webp";
  const linkText = settings.location_link_text || "Voir plus";
  const linkHref = settings.location_link_href || "/marrakech-villas/location-villa-marrakech";

  return (
    <section className="relative w-full overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      <div className="relative z-10 max-w-[1140px] mx-auto px-4 md:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/10">
          <span className="text-white/90 text-sm font-medium">Découvrez Marrakech</span>
        </div>
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold uppercase mb-4 md:mb-5 leading-tight">
          {title}
        </h2>
        <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-[800px] mx-auto">
          {description}
        </p>
        <a
          href={linkHref}
          className="inline-flex items-center gap-2 bg-[#0d47a1] hover:bg-[#0a3a82] text-white text-sm font-bold uppercase py-3.5 px-10 rounded-xl transition-all hover:shadow-lg hover:shadow-[#0d47a1]/25"
        >
          {linkText}
          <Icon icon={faArrowRight} className="text-xs" />
        </a>
      </div>
    </section>
  );
}
