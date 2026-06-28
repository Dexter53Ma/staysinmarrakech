import Image from "next/image";
import Link from "next/link";
import type { SimilarProperty } from "@/types";
import { formatPrice } from "@/types";

interface SimilarPropertiesGridProps {
  properties: SimilarProperty[];
}

export default function SimilarPropertiesGrid({ properties }: SimilarPropertiesGridProps) {
  if (properties.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Propriétés similaires</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {properties.map((sp) => (
          <Link
            key={sp.id}
            href={`/properties/${sp.slug}`}
            className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="relative h-36">
              {sp.image ? (
                <Image
                  src={sp.image}
                  alt={sp.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-100" />
              )}
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 text-sm line-clamp-1 group-hover:text-[#0d47a1] transition-colors">
                {sp.title}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {sp.bedrooms} ch. · {sp.bathrooms} sdb
              </p>
              <p className="text-sm font-bold text-[#0d47a1] mt-1">
                {formatPrice(sp.price, sp.currency)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
