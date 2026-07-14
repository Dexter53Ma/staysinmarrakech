"use client";

import Image from "next/image";
import {Link} from "@/i18n/navigation";
import { Eye, BedDouble, Bath, MapPin, ChevronLeft, ChevronRight, Heart, Camera } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { PropertyListItem, TYPE_COLORS } from "@/types";
import { useCurrency } from "@/components/CurrencyContext";

const TYPE_KEYS: Record<string, string> = {
  VILLA: "Villa",
  APARTMENT: "properties.apartment",
  HOUSE: "properties.house",
  LAND: "properties.land",
  COMMERCIAL: "properties.commercial",
};

const STATUS_KEYS: Record<string, string> = {
  AVAILABLE: "properties.available",
  SOLD: "properties.sold",
  RENTED: "properties.rented",
  PENDING: "properties.pending",
  MAINTENANCE: "Maintenance",
};

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
  const { convert, symbol } = useCurrency();
  const t = useTranslations("properties");
  const locale = useLocale();
  const localeStr = locale === "en" ? "en-US" : "fr-FR";
  if (properties.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">{t("noResults")}</p>
        <p className="text-gray-400 text-sm mt-2">
          {t("noResultsDesc")}
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-500 mb-6">
        {total} {t("resultsCount")}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Link
            key={property.id}
            href={`/properties/${property.slug}`}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200"
          >
            {/* Image Section */}
            <div className="relative h-60 overflow-hidden">
              {property.images[0] ? (
                <Image
                  src={property.images[0].url}
                  alt={property.images[0].alt || property.title}
                  fill
                  unoptimized={property.images[0].url.startsWith("http")}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                  {t("noImage")}
                </div>
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />

              {/* Type badge */}
              <div className="absolute top-3 left-3 flex gap-2">
                <span
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm ${TYPE_COLORS[property.type] || "bg-gray-100 text-gray-800"}`}
                >
                  {t(TYPE_KEYS[property.type] || "Villa")}
                </span>
                {property.status !== "AVAILABLE" && (
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-orange-500/90 backdrop-blur-sm text-white">
                    {t(STATUS_KEYS[property.status] || property.status)}
                  </span>
                )}
              </div>

              {/* Wishlist button */}
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md group/heart"
              >
                <Heart className="size-4 text-gray-600 group-hover/heart:text-red-500 transition-colors" />
              </button>

              {/* Image count & views */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                {property.images.length > 1 && (
                  <div className="bg-black/60 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <Camera className="size-3" />
                    {property.images.length}
                  </div>
                )}
                <div className="bg-black/60 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 ml-auto">
                  <Eye className="size-3" />
                  {property._count?.views ?? 0}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4">
              <h3 className="font-bold text-gray-900 group-hover:text-[#0d47a1] transition-colors line-clamp-1 text-base">
                {property.title}
              </h3>

              <div className="flex items-center gap-1 text-gray-500 text-sm mt-1.5">
                <MapPin className="size-3.5 shrink-0 text-gray-400" />
                <span className="line-clamp-1">
                  {property.address}, {property.city}
                  {property.quarter ? ` - ${property.quarter}` : ""}
                </span>
              </div>

              <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                <span className="flex items-center gap-1.5">
                  <BedDouble className="size-4 text-gray-400" />
                  {property.bedrooms} {t("bedrooms")}
                </span>
                <span className="flex items-center gap-1.5">
                  <Bath className="size-4 text-gray-400" />
                  {property.bathrooms} {t("bathrooms")}
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-lg font-bold text-[#0d47a1]">
                  {convert(property.price, property.currency as "EUR" | "MAD" | "USD").toLocaleString(localeStr)} {symbol}
                </span>
                {property.pricePeriod && (
                  <span className="text-xs text-gray-400 font-medium">
                    {t("perNight")}
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
