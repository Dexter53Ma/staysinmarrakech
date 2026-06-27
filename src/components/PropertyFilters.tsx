"use client";

import { useState, useCallback } from "react";
import { SlidersHorizontal, X } from "lucide-react";

export interface FilterState {
  type: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  quarter: string;
  features: string[];
  sort: string;
}

interface PropertyFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const PROPERTY_TYPES = [
  { value: "ALL", label: "Tous" },
  { value: "VILLA", label: "Villa" },
  { value: "APARTMENT", label: "Appartement" },
  { value: "HOUSE", label: "Maison" },
  { value: "LAND", label: "Terrain" },
  { value: "COMMERCIAL", label: "Commercial" },
];

const FEATURE_OPTIONS = [
  { value: "pool", label: "Piscine" },
  { value: "garden", label: "Jardin" },
  { value: "wifi", label: "WiFi" },
  { value: "ac", label: "Climatisation" },
  { value: "gym", label: "Salle de sport" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Plus récent" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "views", label: "Plus vues" },
];

export default function PropertyFilters({ filters, onFiltersChange }: PropertyFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const updateFilter = useCallback(
    (key: keyof FilterState, value: string | string[]) => {
      onFiltersChange({ ...filters, [key]: value });
    },
    [filters, onFiltersChange]
  );

  const toggleFeature = useCallback(
    (feat: string) => {
      const current = filters.features;
      const next = current.includes(feat)
        ? current.filter((f) => f !== feat)
        : [...current, feat];
      updateFilter("features", next);
    },
    [filters.features, updateFilter]
  );

  const resetFilters = useCallback(() => {
    onFiltersChange({
      type: "ALL",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      quarter: "",
      features: [],
      sort: "newest",
    });
  }, [onFiltersChange]);

  const hasActiveFilters =
    filters.type !== "ALL" ||
    filters.minPrice !== "" ||
    filters.maxPrice !== "" ||
    filters.bedrooms !== "" ||
    filters.quarter !== "" ||
    filters.features.length > 0;

  const filterContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <SlidersHorizontal className="size-4" />
          Filtres
        </h3>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <X className="size-3" />
            Réinitialiser
          </button>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
        <div className="flex flex-wrap gap-2">
          {PROPERTY_TYPES.map((t) => (
            <button
              key={t.value}
              onClick={() => updateFilter("type", t.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filters.type === t.value
                  ? "bg-[#0d47a1] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Budget (€)</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => updateFilter("minPrice", e.target.value)}
            className="w-full h-9 rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <span className="text-gray-400">—</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => updateFilter("maxPrice", e.target.value)}
            className="w-full h-9 rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Chambres (min)</label>
        <select
          value={filters.bedrooms}
          onChange={(e) => updateFilter("bedrooms", e.target.value)}
          className="w-full h-9 rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
        >
          <option value="">Toutes</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <option key={n} value={n}>
              {n}+
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Quartier</label>
        <input
          type="text"
          placeholder="Ex: Palmeraie, Guéliz..."
          value={filters.quarter}
          onChange={(e) => updateFilter("quarter", e.target.value)}
          className="w-full h-9 rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Équipements</label>
        <div className="space-y-2">
          {FEATURE_OPTIONS.map((f) => (
            <label key={f.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.features.includes(f.value)}
                onChange={() => toggleFeature(f.value)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{f.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Trier par</label>
        <select
          value={filters.sort}
          onChange={(e) => updateFilter("sort", e.target.value)}
          className="w-full h-9 rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-20 right-4 z-40 bg-[#0d47a1] text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
        aria-label="Ouvrir les filtres"
      >
        <SlidersHorizontal className="size-5" />
      </button>

      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          {filterContent}
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-xl p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">Filtres</h3>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="size-5" />
              </button>
            </div>
            {filterContent}
            <button
              onClick={() => setMobileOpen(false)}
              className="w-full mt-6 bg-[#0d47a1] text-white py-2.5 rounded-lg font-medium hover:bg-[#0a3a82] transition-colors"
            >
              Appliquer
            </button>
          </div>
        </div>
      )}
    </>
  );
}
