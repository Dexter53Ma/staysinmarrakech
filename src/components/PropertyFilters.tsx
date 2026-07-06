"use client";

import { useState, useCallback } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { getFeaturesByCategory } from "@/lib/features";
import { Icon, faChevronDown } from "@/components/icons";

export interface FilterState {
  type: string;
  pricePeriod: string;
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

function FeatureCategoryGroup({
  category,
  items,
  selected,
  onToggle,
}: {
  category: string;
  items: { key: string; label: string }[];
  selected: string[];
  onToggle: (key: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const activeCount = items.filter((i) => selected.includes(i.key)).length;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <span>{category}</span>
        <span className="flex items-center gap-2">
          {activeCount > 0 && (
            <span className="bg-blue-100 text-blue-700 text-xs px-1.5 py-0.5 rounded-full">{activeCount}</span>
          )}
          <Icon icon={faChevronDown} className={`text-[10px] transition-transform ${open ? "rotate-180" : ""}`} />
        </span>
      </button>
      {open && (
        <div className="px-3 pb-3 space-y-1.5 border-t border-gray-100">
          {items.map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer py-1">
              <input
                type="checkbox"
                checked={selected.includes(key)}
                onChange={() => onToggle(key)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">{label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PropertyFilters({ filters, onFiltersChange }: PropertyFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("properties");

  const PROPERTY_TYPES = [
    { value: "ALL", label: t("all") },
    { value: "VILLA", label: t("villa") },
    { value: "RIAD", label: t("riad") },
    { value: "APARTMENT", label: t("apartment") },
    { value: "HOUSE", label: t("house") },
    { value: "LAND", label: t("land") },
    { value: "COMMERCIAL", label: t("commercial") },
  ];

  const SORT_OPTIONS = [
    { value: "newest", label: t("sortRecent") },
    { value: "price-asc", label: t("sortPriceAsc") },
    { value: "price-desc", label: t("sortPriceDesc") },
    { value: "views", label: t("sortViews") },
  ];

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
      pricePeriod: "nightly",
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
    filters.pricePeriod !== "nightly" ||
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
          {t("filters")}
        </h3>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <X className="size-3" />
            {t("reset")}
          </button>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
        <div className="flex flex-wrap gap-2">
          {PROPERTY_TYPES.map((pt) => (
            <button
              key={pt.value}
              onClick={() => updateFilter("type", pt.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filters.type === pt.value
                  ? "bg-[#0d47a1] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {pt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{t("forRent")} / {t("forSale")}</label>
        <div className="flex gap-2">
          <button
            onClick={() => updateFilter("pricePeriod", "nightly")}
            className={`flex-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filters.pricePeriod === "nightly"
                ? "bg-[#0d47a1] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {t("forRent")}
          </button>
          <button
            onClick={() => updateFilter("pricePeriod", "sale")}
            className={`flex-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filters.pricePeriod === "sale"
                ? "bg-[#0d47a1] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {t("forSale")}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{t("budget")} (€)</label>
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
        <label className="block text-sm font-medium text-gray-700 mb-2">{t("bedroomsMin")}</label>
        <select
          value={filters.bedrooms}
          onChange={(e) => updateFilter("bedrooms", e.target.value)}
          className="w-full h-9 rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
        >
          <option value="">{t("allBedrooms")}</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <option key={n} value={n}>
              {n}+
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{t("quarter")}</label>
        <input
          type="text"
          placeholder="Ex: Palmeraie, Guéliz..."
          value={filters.quarter}
          onChange={(e) => updateFilter("quarter", e.target.value)}
          className="w-full h-9 rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{t("amenities")}</label>
        <div className="space-y-3">
          {Object.entries(getFeaturesByCategory()).map(([category, items]) => (
            <FeatureCategoryGroup
              key={category}
              category={category}
              items={items}
              selected={filters.features}
              onToggle={toggleFeature}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{t("sortBy")}</label>
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
        aria-label={t("openFilters")}
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
              <h3 className="font-semibold text-gray-900">{t("filters")}</h3>
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
              {t("apply")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
