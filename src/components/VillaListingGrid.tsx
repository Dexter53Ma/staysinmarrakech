"use client";

import Image from "next/image";
import {
  Icon,
  faBed,
  faMaximize,
  faUsers,
  faBath,
  faArrowRight,
  faMapMarkerAlt,
} from "@/components/icons";

export interface Villa {
  slug?: string;
  name: string;
  image: string;
  terrain: string;
  surface: string;
  chambres: number;
  bathrooms?: number;
  pax: number;
  price?: string;
  quartier?: string;
}

export default function VillaListingGrid({ villas }: { villas: Villa[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {villas.map((villa) => (
        <a
          key={villa.name}
          href={villa.slug ? `/properties/${villa.slug}` : "#"}
          className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          {/* Image */}
          <div className="relative h-[240px] overflow-hidden">
            <Image
              src={villa.image}
              alt={villa.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Price Badge */}
            {villa.price && (
              <div className="absolute bottom-4 left-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                  <span className="text-[#0d47a1] font-bold text-lg">{villa.price}</span>
                </div>
              </div>
            )}

            {/* View Button */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg">
                <Icon icon={faArrowRight} className="text-[#0d47a1] text-sm" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {villa.quartier && (
              <div className="flex items-center gap-1.5 mb-2">
                <Icon icon={faMapMarkerAlt} className="text-[#0d47a1] text-xs" />
                <span className="text-xs font-medium text-[#0d47a1] uppercase tracking-wider">{villa.quartier}</span>
              </div>
            )}

            <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-[#0d47a1] transition-colors">
              {villa.name}
            </h3>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Icon icon={faBed} className="text-[#0d47a1] text-xs" />
                </div>
                <span>{villa.chambres} ch.</span>
              </div>
              {villa.bathrooms && (
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Icon icon={faBath} className="text-[#0d47a1] text-xs" />
                  </div>
                  <span>{villa.bathrooms} SdB</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Icon icon={faUsers} className="text-[#0d47a1] text-xs" />
                </div>
                <span>{villa.pax} pers.</span>
              </div>
              {villa.surface && villa.surface !== "0 m²" && (
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Icon icon={faMaximize} className="text-[#0d47a1] text-xs" />
                  </div>
                  <span>{villa.surface}</span>
                </div>
              )}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
