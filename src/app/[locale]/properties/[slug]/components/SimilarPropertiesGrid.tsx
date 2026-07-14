"use client";

import Image from "next/image";
import {Link} from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import type { SimilarProperty } from "@/types";
import { useCurrency } from "@/components/CurrencyContext";
import { BedDouble, Bath } from "lucide-react";

interface SimilarPropertiesGridProps {
  properties: SimilarProperty[];
}

export default function SimilarPropertiesGrid({ properties }: SimilarPropertiesGridProps) {
  const { convert, symbol } = useCurrency();
  const t = useTranslations("properties");
  const locale = useLocale();
  const localeStr = locale === "en" ? "en-US" : "fr-FR";
  if (properties.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">{t("similarTitle")}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {properties.map((sp) => (
          <Link
            key={sp.id}
            href={`/properties/${sp.slug}`}
            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200"
          >
            <div className="relative h-40 overflow-hidden">
              {sp.image ? (
                <Image
                  src={sp.image}
                  alt={sp.title}
                  fill
                  unoptimized={sp.image.startsWith("http")}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-100" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="p-3.5">
              <h3 className="font-semibold text-gray-900 text-sm line-clamp-1 group-hover:text-[#0d47a1] transition-colors">
                {sp.title}
              </h3>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <BedDouble className="size-3.5" />
                  {sp.bedrooms}
                </span>
                <span className="flex items-center gap-1">
                  <Bath className="size-3.5" />
                  {sp.bathrooms}
                </span>
              </div>
              <p className="text-sm font-bold text-[#0d47a1] mt-2">
                {convert(sp.price, sp.currency as "EUR" | "MAD" | "USD").toLocaleString(localeStr)} {symbol}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
