"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, BedDouble, Bath, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { PropertyListItem, TYPE_LABELS, TYPE_COLORS, STATUS_LABELS, formatPrice } from "@/types";

interface PropertyGridProps {
  properties: PropertyListItem[];
  total: number;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PropertyGrid({
  properties,
  total,
  page,
  totalPages,
  onPageChange,
}: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">Aucune propriété trouvée</p>
        <p className="text-gray-400 text-sm mt-2">
          Essayez de modifier vos filtres
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-500 mb-6">
        {total} propriété{total !== 1 ? "s" : ""} trouvée{total !== 1 ? "s" : ""}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Link
            key={property.id}
            href={`/properties/${property.slug}`}
            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
          >
            <div className="relative h-56 overflow-hidden">
              {property.images[0] ? (
                <Image
                  src={property.images[0].url}
                  alt={property.images[0].alt || property.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                  Aucune image
                </div>
              )}
              <div className="absolute top-3 left-3 flex gap-2">
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${TYPE_COLORS[property.type] || "bg-gray-100 text-gray-800"}`}
                >
                  {TYPE_LABELS[property.type] || property.type}
                </span>
                {property.status !== "AVAILABLE" && (
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-orange-100 text-orange-800">
                    {STATUS_LABELS[property.status] || property.status}
                  </span>
                )}
              </div>
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                <Eye className="size-3" />
                {property._count?.views ?? 0}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-gray-900 group-hover:text-[#0d47a1] transition-colors line-clamp-1">
                {property.title}
              </h3>

              <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                <MapPin className="size-3.5 shrink-0" />
                <span className="line-clamp-1">
                  {property.address}, {property.city}
                  {property.quarter ? ` - ${property.quarter}` : ""}
                </span>
              </div>

              <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <BedDouble className="size-4 text-gray-400" />
                  {property.bedrooms} {property.bedrooms > 1 ? "chambres" : "chambre"}
                </span>
                <span className="flex items-center gap-1">
                  <Bath className="size-4 text-gray-400" />
                  {property.bathrooms} {property.bathrooms > 1 ? "sdb" : "sdb"}
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-lg font-bold text-[#0d47a1]">
                  {formatPrice(property.price, property.currency)}
                </span>
                {property.pricePeriod && (
                  <span className="text-xs text-gray-400">
                    /{property.pricePeriod === "nightly" ? "nuit" : property.pricePeriod}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="size-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
            .reduce<(number | "ellipsis")[]>((acc, p, i, arr) => {
              if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("ellipsis");
              acc.push(p);
              return acc;
            }, [])
            .map((p, i) =>
              p === "ellipsis" ? (
                <span key={`e${i}`} className="px-2 text-gray-400">
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => onPageChange(p as number)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                    page === p
                      ? "bg-[#0d47a1] text-white"
                      : "border border-gray-200 hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  {p}
                </button>
              )
            )}
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
