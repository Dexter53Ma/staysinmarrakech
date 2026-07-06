"use client";

import { BedDouble, Bath, Car, Users, Maximize, Home, Calendar, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import type { PropertyData } from "@/types";

interface PropertyFeaturesProps {
  property: PropertyData;
}

export default function PropertyFeatures({ property }: PropertyFeaturesProps) {
  const t = useTranslations("properties");

  const items = [
    { icon: BedDouble, label: t("bedroomsFeature"), value: property.bedrooms },
    { icon: Bath, label: t("bathroomsFeature"), value: property.bathrooms },
    { icon: Car, label: t("garages"), value: property.garages },
    { icon: Users, label: t("maxGuests"), value: property.maxGuests },
    { icon: Maximize, label: t("plotArea"), value: property.plotArea ? `${property.plotArea} m²` : null },
    { icon: Home, label: t("builtArea"), value: property.builtArea ? `${property.builtArea} m²` : null },
    { icon: Calendar, label: t("yearBuilt"), value: property.yearBuilt },
    { icon: Clock, label: t("minStay"), value: property.minStay ? `${property.minStay} ${t("nightsUnit")}` : null },
  ].filter((item) => item.value !== null && item.value !== undefined && item.value !== 0);

  if (items.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">{t("featuresTitle")}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.label} className="bg-gray-50 rounded-lg p-3 text-center">
            <item.icon className="size-5 text-[#0d47a1] mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-900">{item.value}</p>
            <p className="text-xs text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
