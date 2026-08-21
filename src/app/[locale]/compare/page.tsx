"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { BedDouble, Bath, Users, Maximize, MapPin, X, ArrowLeft, Check } from "lucide-react";
import { useComparison } from "@/components/ComparisonContext";
import { useCurrency } from "@/components/CurrencyContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { PropertyData } from "@/types";

export default function ComparePage() {
  const t = useTranslations("compare");
  const tProp = useTranslations("properties");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const localeStr = locale === "en" ? "en-US" : "fr-FR";
  const { compareList, removeFromCompare, clearCompare } = useComparison();
  const { convert, symbol } = useCurrency();
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (compareList.length === 0) {
      setLoading(false);
      return;
    }

    const fetchProperties = async () => {
      setLoading(true);
      try {
        const results = await Promise.all(
          compareList.map(async (id) => {
            const res = await fetch(`/api/properties/${id}`);
            if (!res.ok) return null;
            return res.json();
          })
        );
        setProperties(results.filter(Boolean));
      } catch {
        // ignore
      }
      setLoading(false);
    };

    fetchProperties();
  }, [compareList]);

  const allFeatures = Array.from(
    new Set(properties.flatMap((p) => (Array.isArray(p.features) ? p.features : [])))
  ).sort();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-6 pb-20">
        <div className="max-w-[1200px] mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link
                href="/properties"
                className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="size-4 text-gray-600" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
            </div>
            {compareList.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-sm text-gray-500 hover:text-red-500 transition-colors"
              >
                {t("clearAll")}
              </button>
            )}
          </div>

          {/* Empty state */}
          {!loading && compareList.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">{t("noProperties")}</p>
              <Link
                href="/properties"
                className="mt-4 inline-block bg-[#0d47a1] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0b3d91] transition-colors"
              >
                {tProp("back")}
              </Link>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">{tCommon("loading")}</p>
            </div>
          )}

          {/* Comparison Table */}
          {!loading && properties.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-2xl shadow-sm overflow-hidden min-w-[640px]">
                <thead>
                  <tr>
                    <th className="w-[180px] p-4 bg-gray-50 border-b border-gray-100" />
                    {properties.map((p) => (
                      <th key={p.id} className="p-4 border-b border-gray-100 text-center min-w-[240px]">
                        <div className="relative inline-block">
                          <div className="relative w-full h-48 rounded-xl overflow-hidden mb-3">
                            {p.images[0] ? (
                              <Image
                                src={p.images[0].url}
                                alt={p.images[0].alt || p.title}
                                fill
                                unoptimized={p.images[0].url.startsWith("http")}
                                className="object-cover"
                                sizes="240px"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                                {tProp("noImage")}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCompare(p.id)}
                            className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                          >
                            <X className="size-3" />
                          </button>
                          <h3 className="font-bold text-gray-900 text-sm line-clamp-2">{p.title}</h3>
                          <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                            <MapPin className="size-3 shrink-0" />
                            <span className="line-clamp-1">
                              {p.address}{p.quarter ? ` - ${p.quarter}` : ""}
                            </span>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Price */}
                  <tr className="border-b border-gray-50">
                    <td className="p-4 font-semibold text-gray-700 text-sm bg-gray-50">{tProp("salePrice")}</td>
                    {properties.map((p) => (
                      <td key={p.id} className="p-4 text-center">
                        <span className="text-lg font-bold text-[#0d47a1]">
                          {convert(p.price, p.currency as "EUR" | "MAD" | "USD").toLocaleString(localeStr)} {symbol}
                        </span>
                        {p.pricePeriod && (
                          <span className="text-xs text-gray-400 block">{tProp("perNight")}</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Bedrooms */}
                  <tr className="border-b border-gray-50">
                    <td className="p-4 font-semibold text-gray-700 text-sm bg-gray-50">
                      <span className="flex items-center gap-2"><BedDouble className="size-4 text-gray-400" />{t("bedrooms")}</span>
                    </td>
                    {properties.map((p) => (
                      <td key={p.id} className="p-4 text-center text-gray-900 font-medium">{p.bedrooms}</td>
                    ))}
                  </tr>

                  {/* Bathrooms */}
                  <tr className="border-b border-gray-50">
                    <td className="p-4 font-semibold text-gray-700 text-sm bg-gray-50">
                      <span className="flex items-center gap-2"><Bath className="size-4 text-gray-400" />{t("bathrooms")}</span>
                    </td>
                    {properties.map((p) => (
                      <td key={p.id} className="p-4 text-center text-gray-900 font-medium">{p.bathrooms}</td>
                    ))}
                  </tr>

                  {/* Max Guests */}
                  <tr className="border-b border-gray-50">
                    <td className="p-4 font-semibold text-gray-700 text-sm bg-gray-50">
                      <span className="flex items-center gap-2"><Users className="size-4 text-gray-400" />{t("maxGuests")}</span>
                    </td>
                    {properties.map((p) => (
                      <td key={p.id} className="p-4 text-center text-gray-900 font-medium">{p.maxGuests ?? "—"}</td>
                    ))}
                  </tr>

                  {/* Built Area */}
                  <tr className="border-b border-gray-50">
                    <td className="p-4 font-semibold text-gray-700 text-sm bg-gray-50">
                      <span className="flex items-center gap-2"><Maximize className="size-4 text-gray-400" />{t("builtArea")}</span>
                    </td>
                    {properties.map((p) => (
                      <td key={p.id} className="p-4 text-center text-gray-900 font-medium">
                        {p.builtArea ? `${p.builtArea} m²` : "—"}
                      </td>
                    ))}
                  </tr>

                  {/* Plot Area */}
                  <tr className="border-b border-gray-50">
                    <td className="p-4 font-semibold text-gray-700 text-sm bg-gray-50">
                      <span className="flex items-center gap-2"><Maximize className="size-4 text-gray-400" />{t("plotArea")}</span>
                    </td>
                    {properties.map((p) => (
                      <td key={p.id} className="p-4 text-center text-gray-900 font-medium">
                        {p.plotArea ? `${p.plotArea} m²` : "—"}
                      </td>
                    ))}
                  </tr>

                  {/* Location */}
                  <tr className="border-b border-gray-50">
                    <td className="p-4 font-semibold text-gray-700 text-sm bg-gray-50">
                      <span className="flex items-center gap-2"><MapPin className="size-4 text-gray-400" />{tProp("quarter")}</span>
                    </td>
                    {properties.map((p) => (
                      <td key={p.id} className="p-4 text-center text-gray-900 text-sm">{p.quarter || p.city}</td>
                    ))}
                  </tr>

                  {/* Features/Amenities header */}
                  {allFeatures.length > 0 && (
                    <tr className="border-b border-gray-50 bg-gray-50/50">
                      <td colSpan={properties.length + 1} className="p-4 font-bold text-gray-900 text-sm">
                        {t("features")}
                      </td>
                    </tr>
                  )}

                  {/* Features rows */}
                  {allFeatures.map((feature) => (
                    <tr key={feature} className="border-b border-gray-50">
                      <td className="p-3 text-gray-600 text-sm bg-gray-50 pl-6">{feature}</td>
                      {properties.map((p) => {
                        const hasFeature = Array.isArray(p.features) && p.features.includes(feature);
                        return (
                          <td key={p.id} className="p-3 text-center">
                            {hasFeature ? (
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100">
                                <Check className="size-3.5 text-green-600" />
                              </span>
                            ) : (
                              <span className="text-gray-300">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}

                  {/* CTA */}
                  <tr>
                    <td className="p-4 bg-gray-50" />
                    {properties.map((p) => (
                      <td key={p.id} className="p-4 text-center">
                        <Link
                          href={`/properties/${p.slug}`}
                          className="inline-block bg-[#ffb000] hover:bg-[#e6a000] text-black text-sm font-bold px-6 py-2.5 rounded-lg transition-colors"
                        >
                          {tProp("bookingBtn")}
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
