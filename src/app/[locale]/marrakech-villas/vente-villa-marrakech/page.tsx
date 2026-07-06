"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import {Link} from "@/i18n/navigation";
import { useCurrency } from "@/components/CurrencyContext";
import { useTranslations, useLocale } from "next-intl";
import {
  Icon,
  faBed,
  faMaximize,
  faBath,
  faMapMarkerAlt,
  faSearch,
  faSlidersH,
  faTimes,
  faArrowRight,
  faHome,
  faKey,
  faShieldAlt,
  faHandshake,
} from "@/components/icons";

interface ApiProperty {
  slug: string;
  title: string;
  images: { url: string }[];
  quarter?: string;
  city?: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests?: number;
  plotArea?: number;
  builtArea?: number;
  price: number;
  features?: string[];
  isFeatured?: boolean;
  status?: string;
}

interface Villa {
  slug: string;
  name: string;
  image: string;
  terrain: number;
  surface: number;
  chambres: number;
  bathrooms: number;
  pax: number;
  price: number;
  quartier: string;
  isFeatured: boolean;
  features: string[];
}

const quartierOptions = [
  "Palmeraie", "Hivernage", "Gueliz", "Médina", "Route de l'Ourika",
  "Route de Ouarzazate", "Golf d'Amelkis", "Golf de Samanah",
  "Royal Palm", "Targa", "Désert d'Agafay", "Route de Fès",
];

type SortKey = "newest" | "price-asc" | "price-desc" | "surface";

export default function VenteVillaMarrakech() {
  const { convert, symbol } = useCurrency();
  const t = useTranslations("properties");
  const ts = useTranslations("salePage");
  const locale = useLocale();
  const [villas, setVillas] = useState<Villa[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuartiers, setSelectedQuartiers] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortKey>("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    fetch("/api/properties?status=AVAILABLE&pricePeriod=sale&limit=50")
      .then((r) => r.json())
      .then((data: { data?: ApiProperty[] }) => {
        setVillas(
          (data.data || []).map((p) => ({
            slug: p.slug,
            name: p.title,
            image: p.images?.[0]?.url || "/images/villas/default.jpg",
            terrain: p.plotArea || 0,
            surface: p.builtArea || 0,
            chambres: p.bedrooms,
            bathrooms: p.bathrooms,
            pax: p.maxGuests || p.bedrooms * 2,
            price: p.price,
            quartier: p.quarter || p.city || "Marrakech",
            isFeatured: p.isFeatured || false,
            features: p.features || [],
          }))
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleQuartier = (val: string) =>
    setSelectedQuartiers((p) => p.includes(val) ? p.filter((q) => q !== val) : [...p, val]);

  const filtered = (() => {
    let result = [...villas];
    if (selectedQuartiers.length > 0)
      result = result.filter((v) => selectedQuartiers.includes(v.quartier));
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "surface") result.sort((a, b) => b.surface - a.surface);
    return result;
  })();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-[#1a3c5e] to-[#2c5f8a] py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%23ffffff' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E\")"
          }} />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5">
            <Icon icon={faHome} className="text-[#f39c12] text-xs" />
            <span className="text-white/90 text-sm font-medium">{ts("exclusiveProperties")}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            {ts("villasForSale")}
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto">
            {ts("investSubtitle")}
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-8">
            {[
              { icon: faShieldAlt, label: ts("secureTransactions") },
              { icon: faHandshake, label: ts("legalSupport") },
              { icon: faKey, label: ts("turnkey") },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-white/60 text-sm">
                <Icon icon={item.icon} className="text-[#f39c12]" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="max-w-[1200px] mx-auto px-4 -mt-5 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                selectedQuartiers.length > 0
                  ? "bg-[#1a3c5e] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Icon icon={faSlidersH} className="text-xs" />
              {t("quarter")}
              {selectedQuartiers.length > 0 && (
                <span className="bg-[#f39c12] text-[#1a3c5e] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {selectedQuartiers.length}
                </span>
              )}
            </button>
            {selectedQuartiers.length > 0 && (
              <button
                onClick={() => setSelectedQuartiers([])}
                className="text-xs text-red-500 hover:text-red-600 font-medium"
              >
                {t("clearAll")}
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 hidden sm:inline">{t("sortBy")}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="bg-gray-100 border-0 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#1a3c5e]/20"
            >
              <option value="newest">{t("sortRecent")}</option>
              <option value="price-asc">{t("sortPriceAsc")}</option>
              <option value="price-desc">{t("sortPriceDesc")}</option>
              <option value="surface">{t("sortSurface")}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {filtersOpen && (
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-[1200px] mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#1a3c5e]">{t("filters")}</h3>
              {selectedQuartiers.length > 0 && (
                <button
                  onClick={() => setSelectedQuartiers([])}
                  className="text-sm text-red-500 hover:text-red-600 font-medium"
                >
                  {t("clearAll")}
                </button>
              )}
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">
                {t("quarter")}
              </label>
              <div className="flex flex-wrap gap-2">
                {quartierOptions.map((q) => (
                  <button
                    key={q}
                    onClick={() => toggleQuartier(q)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border-2 transition-all ${
                      selectedQuartiers.includes(q)
                        ? "bg-[#1a3c5e] text-white border-[#1a3c5e]"
                        : "bg-white text-gray-500 border-gray-200 hover:border-[#1a3c5e] hover:text-[#1a3c5e]"
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <section className="max-w-[1200px] mx-auto px-4 py-10">
        {/* Active Filters */}
        {selectedQuartiers.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedQuartiers.map((q) => (
              <span key={q} className="inline-flex items-center gap-1 bg-[#1a3c5e]/10 text-[#1a3c5e] text-xs font-medium px-3 py-1.5 rounded-full">
                {q}
                <button onClick={() => toggleQuartier(q)} className="hover:text-red-500">
                  <Icon icon={faTimes} className="text-[10px]" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="h-[240px] bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-6 bg-gray-200 rounded w-2/3" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon icon={faSearch} className="text-gray-300 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">{t("noResults")}</h3>
            <p className="text-gray-400 mb-6">{t("noResultsDesc")}</p>
            <button
              onClick={() => setSelectedQuartiers([])}
              className="bg-[#1a3c5e] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#14324e] transition-colors"
            >
              {t("resetFilters")}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((villa) => (
              <Link
                key={villa.slug}
                href={`/properties/${villa.slug}`}
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
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                      <span className="text-[#1a3c5e] font-bold text-lg">{convert(villa.price, "EUR").toLocaleString(locale === "en" ? "en-US" : "fr-FR")} {symbol}</span>
                    </div>
                  </div>

                  {/* Sale Badge */}
                  <div className="absolute top-4 left-4 bg-[#27ae60] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {ts("forSale")}
                  </div>

                  {villa.isFeatured && (
                    <div className="absolute top-4 right-4 bg-[#f39c12] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {ts("exclusive")}
                    </div>
                  )}

                  {/* View Button */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg">
                      <Icon icon={faArrowRight} className="text-[#1a3c5e] text-sm" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Icon icon={faMapMarkerAlt} className="text-[#1a3c5e] text-xs" />
                    <span className="text-xs font-medium text-[#1a3c5e] uppercase tracking-wider">{villa.quartier}</span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-[#1a3c5e] transition-colors">
                    {villa.name}
                  </h3>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    {villa.surface > 0 && (
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center">
                          <Icon icon={faMaximize} className="text-emerald-600 text-xs" />
                        </div>
                        <span>{villa.surface} m²</span>
                      </div>
                    )}
                    {villa.terrain > 0 && (
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center">
                          <Icon icon={faMaximize} className="text-emerald-600 text-xs" />
                        </div>
                        <span>{t("land")} {villa.terrain} m²</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center">
                        <Icon icon={faBed} className="text-emerald-600 text-xs" />
                      </div>
                      <span>{villa.chambres} {t("bedroomsAbbrev")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center">
                        <Icon icon={faBath} className="text-emerald-600 text-xs" />
                      </div>
                      <span>{villa.bathrooms} {t("bathroomsAbbrev")}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-[#1a3c5e] py-16">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {ts("ctaTitle")}
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            {ts("ctaDesc")}
          </p>
          <Link
            href="/contactez-nous"
            className="inline-flex items-center gap-2 bg-[#f39c12] hover:bg-[#e67e22] text-white px-8 py-3.5 rounded-xl font-bold transition-colors shadow-lg"
          >
            {ts("ctaButton")}
            <Icon icon={faArrowRight} className="text-sm" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
