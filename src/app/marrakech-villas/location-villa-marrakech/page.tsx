"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  Icon,
  faBed,
  faMaximize,
  faUsers,
  faBath,
  faMapMarkerAlt,
  faSearch,
  faSlidersH,
  faTimes,
  faArrowRight,
} from "@/components/icons";

interface ListingVilla {
  slug: string;
  name: string;
  image: string;
  quartier: string;
  chambres: number;
  bathrooms: number;
  pax: number;
  terrain: number;
  surface: number;
  price: number;
  features: string[];
  isFeatured: boolean;
}

const chambresOptions = [
  { label: "3+", value: 3 },
  { label: "4+", value: 4 },
  { label: "5+", value: 5 },
  { label: "6+", value: 6 },
  { label: "7+", value: 7 },
  { label: "8+", value: 8 },
];

const quartierOptions = [
  "Palmeraie", "Hivernage", "Gueliz", "Médina", "Route de l'Ourika",
  "Route de Ouarzazate", "Golf d'Amelkis", "Golf de Samanah",
  "Royal Palm", "Targa", "Désert d'Agafay", "Route de Fès",
];

type SortKey = "newest" | "price-asc" | "price-desc" | "bedrooms";

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
}

export default function LocationVillaMarrakech() {
  const [villas, setVillas] = useState<ListingVilla[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChambres, setSelectedChambres] = useState<number[]>([]);
  const [selectedQuartiers, setSelectedQuartiers] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortKey>("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    fetch("/api/properties?status=AVAILABLE&limit=50")
      .then((r) => r.json())
      .then((data: { properties?: ApiProperty[] }) => {
        setVillas(
          (data.properties || []).map((p) => ({
            slug: p.slug,
            name: p.title,
            image: p.images?.[0]?.url || "/images/villas/default.jpg",
            quartier: p.quarter || p.city || "Marrakech",
            chambres: p.bedrooms,
            bathrooms: p.bathrooms,
            pax: p.maxGuests || p.bedrooms * 2,
            terrain: p.plotArea || 0,
            surface: p.builtArea || 0,
            price: p.price,
            features: p.features || [],
            isFeatured: p.isFeatured ?? false,
          }))
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleChambres = (val: number) =>
    setSelectedChambres((p) => p.includes(val) ? p.filter((c) => c !== val) : [...p, val]);

  const toggleQuartier = (val: string) =>
    setSelectedQuartiers((p) => p.includes(val) ? p.filter((q) => q !== val) : [...p, val]);

  const filtered = (() => {
    let result = [...villas];
    if (selectedChambres.length > 0)
      result = result.filter((v) => selectedChambres.some((c) => v.chambres >= c));
    if (selectedQuartiers.length > 0)
      result = result.filter((v) => selectedQuartiers.includes(v.quartier));
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "bedrooms") result.sort((a, b) => b.chambres - a.chambres);
    return result;
  })();

  const hasFilters = selectedChambres.length > 0 || selectedQuartiers.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-[#0d47a1] to-[#1565c0] py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }} />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5">
            <Icon icon={faMapMarkerAlt} className="text-[#ffb000] text-xs" />
            <span className="text-white/90 text-sm font-medium">Marrakech, Maroc</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            Villas de Luxe en Location
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto">
            Découvrez notre sélection exclusive de villas prestigieuses à Marrakech
          </p>

          {/* Quick Stats */}
          <div className="flex items-center justify-center gap-6 mt-6 text-white/60 text-sm">
            <span>{filtered.length} villas disponibles</span>
            <span className="w-1 h-1 bg-white/30 rounded-full" />
            <span>{quartierOptions.length} quartiers</span>
            <span className="w-1 h-1 bg-white/30 rounded-full" />
            <span>Service 24/7</span>
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
                hasFilters
                  ? "bg-[#0d47a1] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Icon icon={faSlidersH} className="text-xs" />
              Filtres
              {hasFilters && (
                <span className="bg-[#ffb000] text-[#0d47a1] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {selectedChambres.length + selectedQuartiers.length}
                </span>
              )}
            </button>
            {hasFilters && (
              <button
                onClick={() => { setSelectedChambres([]); setSelectedQuartiers([]); }}
                className="text-xs text-red-500 hover:text-red-600 font-medium"
              >
                Tout effacer
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 hidden sm:inline">Trier par</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="bg-gray-100 border-0 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#0d47a1]/20"
            >
              <option value="newest">Plus récentes</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="bedrooms">Plus de chambres</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {filtersOpen && (
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-[1200px] mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#0d47a1]">Filtres avancés</h3>
              {hasFilters && (
                <button
                  onClick={() => { setSelectedChambres([]); setSelectedQuartiers([]); }}
                  className="text-sm text-red-500 hover:text-red-600 font-medium"
                >
                  Tout effacer
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">
                  Chambres
                </label>
                <div className="flex flex-wrap gap-2">
                  {chambresOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => toggleChambres(opt.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                        selectedChambres.includes(opt.value)
                          ? "bg-[#0d47a1] text-white border-[#0d47a1] shadow-md"
                          : "bg-white text-gray-600 border-gray-200 hover:border-[#0d47a1] hover:text-[#0d47a1]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">
                  Quartier
                </label>
                <div className="flex flex-wrap gap-2">
                  {quartierOptions.map((q) => (
                    <button
                      key={q}
                      onClick={() => toggleQuartier(q)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border-2 transition-all ${
                        selectedQuartiers.includes(q)
                          ? "bg-[#0d47a1] text-white border-[#0d47a1]"
                          : "bg-white text-gray-500 border-gray-200 hover:border-[#0d47a1] hover:text-[#0d47a1]"
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <section className="max-w-[1200px] mx-auto px-4 py-10">
        {/* Active Filters */}
        {hasFilters && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedChambres.map((c) => (
              <span key={`c-${c}`} className="inline-flex items-center gap-1 bg-[#0d47a1]/10 text-[#0d47a1] text-xs font-medium px-3 py-1.5 rounded-full">
                {c}+ chambres
                <button onClick={() => toggleChambres(c)} className="hover:text-red-500">
                  <Icon icon={faTimes} className="text-[10px]" />
                </button>
              </span>
            ))}
            {selectedQuartiers.map((q) => (
              <span key={`q-${q}`} className="inline-flex items-center gap-1 bg-[#0d47a1]/10 text-[#0d47a1] text-xs font-medium px-3 py-1.5 rounded-full">
                {q}
                <button onClick={() => toggleQuartier(q)} className="hover:text-red-500">
                  <Icon icon={faTimes} className="text-[10px]" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Loading State */}
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
            <h3 className="text-xl font-bold text-gray-700 mb-2">Aucune villa trouvée</h3>
            <p className="text-gray-400 mb-6">Essayez de modifier vos critères de recherche</p>
            <button
              onClick={() => { setSelectedChambres([]); setSelectedQuartiers([]); }}
              className="bg-[#0d47a1] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#0a3a82] transition-colors"
            >
              Réinitialiser les filtres
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
                      <span className="text-[#0d47a1] font-bold text-lg">{villa.price.toLocaleString("fr-FR")} €</span>
                      <span className="text-gray-400 text-xs ml-1">/ nuit</span>
                    </div>
                  </div>

                  {/* Featured Badge */}
                  {villa.isFeatured && (
                    <div className="absolute top-4 left-4 bg-[#ffb000] text-[#0d47a1] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Vedette
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
                  <div className="flex items-center gap-1.5 mb-2">
                    <Icon icon={faMapMarkerAlt} className="text-[#0d47a1] text-xs" />
                    <span className="text-xs font-medium text-[#0d47a1] uppercase tracking-wider">{villa.quartier}</span>
                  </div>

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
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Icon icon={faBath} className="text-[#0d47a1] text-xs" />
                      </div>
                      <span>{villa.bathrooms} SdB</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Icon icon={faUsers} className="text-[#0d47a1] text-xs" />
                      </div>
                      <span>{villa.pax} pers.</span>
                    </div>
                    {villa.surface > 0 && (
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                          <Icon icon={faMaximize} className="text-[#0d47a1] text-xs" />
                        </div>
                        <span>{villa.surface} m²</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
