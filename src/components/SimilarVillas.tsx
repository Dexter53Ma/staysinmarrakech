"use client";

import Image from "next/image";
import {
  Icon,
  faMapMarkerAlt,
  faMaximize,
  faBed,
  faUsers,
} from "@/components/icons";
import { VillaDetailData } from "@/components/VillaDetail";

const featureIcons = [
  { icon: faMapMarkerAlt, label: "Terrain" },
  { icon: faMaximize, label: "Surface" },
  { icon: faBed, label: "Chambres" },
  { icon: faUsers, label: "Pax" },
];

export default function SimilarVillas({ villas }: { villas: VillaDetailData[] }) {
  if (villas.length === 0) return null;

  return (
    <section className="py-16 px-4 max-w-[1200px] mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0d47a1] mb-3">Villas similaires</h2>
        <p className="text-[#34495e] text-lg">Découvrez d&apos;autres villas de luxe à Marrakech.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {villas.map((villa) => {
          const featureValues = [villa.terrain, villa.surface, String(villa.chambres), String(villa.pax)];
          return (
            <a
              key={villa.slug}
              href={`/${villa.slug}`}
              className="bg-white rounded-[4px] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-shadow"
            >
              <div className="relative w-full h-[200px]">
                <Image
                  src={villa.images[0]}
                  alt={villa.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="p-[15px]">
                <h3 className="text-[18px] font-bold text-[#0d47a1] mb-3">{villa.title}</h3>

                <div className="grid grid-cols-2 gap-2">
                  {featureIcons.map((feat, i) => (
                    <div key={feat.label} className="flex items-center gap-1.5 text-[14px] text-[#34495e]">
                      <Icon icon={feat.icon} className="text-[#0d47a1] text-[12px]" />
                      <span>
                        <strong>{featureValues[i]}</strong> {feat.label === "Terrain" || feat.label === "Surface" ? "" : feat.label.toLowerCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
