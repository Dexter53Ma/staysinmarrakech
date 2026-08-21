"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { MapPin, Bed, Bath, ArrowLeft } from "lucide-react";
import type { PropertyListItem } from "@/types";

const PropertyMapCluster = dynamic(
  () => import("@/components/PropertyMapCluster"),
  { ssr: false }
);

function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function MapPage() {
  const t = useTranslations("map");
  const tProp = useTranslations("properties");
  const [properties, setProperties] = useState<PropertyListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/properties?limit=200")
      .then((r) => r.json())
      .then((data) => {
        setProperties(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 shrink-0">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#0d47a1] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {tProp("back")}
        </Link>
        <div className="h-4 w-px bg-gray-300" />
        <h1 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#0d47a1]" />
          {t("title")}
        </h1>
        <span className="ml-auto text-xs text-gray-400">
          {properties.length} {t("propertiesCount")}
        </span>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[340px] shrink-0 overflow-y-auto border-r border-gray-200 bg-white">
          {loading ? (
            <div className="p-6 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-3 animate-pulse">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {properties.map((property) => {
                const primaryImage = property.images?.[0];
                return (
                  <button
                    key={property.id}
                    onClick={() => setSelectedId(property.id)}
                    className={`w-full flex items-start gap-3 p-3 text-left hover:bg-gray-50 transition-colors ${
                      selectedId === property.id ? "bg-blue-50 border-l-2 border-[#0d47a1]" : ""
                    }`}
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                      {primaryImage ? (
                        <Image
                          src={primaryImage.url}
                          alt={primaryImage.alt || property.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <MapPin className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-gray-900 truncate">{property.title}</h3>
                      <p className="text-[#0d47a1] font-bold text-sm mt-0.5">
                        {formatPrice(property.price, property.currency)}
                        {property.pricePeriod && (
                          <span className="text-gray-400 font-normal text-xs">
                            /{property.pricePeriod === "NIGHT" ? "nuit" : "mois"}
                          </span>
                        )}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <span className="flex items-center gap-0.5">
                          <Bed className="w-3 h-3" />
                          {property.bedrooms}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <Bath className="w-3 h-3" />
                          {property.bathrooms}
                        </span>
                        {property.quarter && (
                          <span className="truncate">{property.quarter}</span>
                        )}
                      </div>
                      <Link
                        href={`/properties/${property.slug}`}
                        className="inline-block mt-1.5 text-xs font-semibold text-[#0d47a1] hover:underline"
                      >
                        {tProp("seeDetails")} →
                      </Link>
                    </div>
                  </button>
                );
              })}
              {properties.length === 0 && (
                <div className="p-8 text-center text-gray-400">
                  <MapPin className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">{t("noProperties")}</p>
                </div>
              )}
            </div>
          )}
        </aside>

        {/* Map */}
        <div className="flex-1 relative">
          <PropertyMapCluster selectedPropertyId={selectedId || undefined} />
        </div>
      </div>
    </div>
  );
}
