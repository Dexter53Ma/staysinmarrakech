"use client";

import { useSettings } from "@/components/SettingsContext";
import Image from "next/image";
import { Icon, faArrowRight } from "@/components/icons";

export default function ShortTermRental() {
  const settings = useSettings();

  const title = settings.shortrental_title || "Location villas courte durée à Marrakech";
  const description = settings.shortrental_description || "Notre équipe connaît parfaitement Marrakech et se passionne pour proposer des villas de charme et de caractère, idéales pour une location de villa de luxe à Marrakech. Ces villas se distinguent par leur architecture exceptionnelle, leur situation privilégiée, leur mobilier raffiné, et leur décoration soignée.";
  const image = settings.shortrental_image || "/images/sections/courte-duree.webp";
  const linkText = settings.shortrental_link_text || "Contactez-nous";
  const linkHref = settings.shortrental_link_href || "/contactez-nous";

  return (
    <section className="bg-gray-50 py-14 md:py-20">
      <div className="max-w-[1140px] mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-14 items-center">
          <div className="w-full md:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="inline-flex items-center gap-2 bg-[#0d47a1]/10 rounded-full px-4 py-1.5 mb-5">
              <span className="text-[#0d47a1] text-sm font-semibold">Courte durée</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#22313d] mb-4 leading-tight">
              {title}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-gray-600 text-justify mb-8">
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
        </div>
      </div>
    </section>
  );
}
