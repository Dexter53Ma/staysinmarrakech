"use client";

import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Bed, Maximize } from "lucide-react";
import type { PropertyListItem } from "@/types";

function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

function createPriceIcon(price: string) {
  return L.divIcon({
    className: "",
    html: `<div style="
      background: #0d47a1;
      color: white;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
      white-space: nowrap;
      box-shadow: 0 2px 8px rgba(0,0,0,0.25);
      border: 2px solid white;
      text-align: center;
      line-height: 1.2;
    ">${price}</div>`,
    iconSize: [0, 0],
    iconAnchor: [40, 10],
  });
}

function FlyToLocation({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 14, { duration: 1.2 });
  }, [center, map]);
  return null;
}

interface PropertyMapClusterProps {
  selectedPropertyId?: string;
}

export default function PropertyMapCluster({ selectedPropertyId }: PropertyMapClusterProps) {
  const t = useTranslations("map");
  const [properties, setProperties] = useState<PropertyListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(selectedPropertyId || null);

  useEffect(() => {
    fetch("/api/properties?limit=200")
      .then((r) => r.json())
      .then((data) => {
        setProperties(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedPropertyId) setSelectedId(selectedPropertyId);
  }, [selectedPropertyId]);

  const center: [number, number] = useMemo(() => {
    const selected = properties.find((p) => p.id === selectedId);
    if (selected) {
      const lat = (selected as unknown as { latitude?: number }).latitude;
      const lng = (selected as unknown as { longitude?: number }).longitude;
      if (lat && lng) return [lat, lng];
    }
    return [31.6295, -7.9811];
  }, [properties, selectedId]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100 rounded-xl">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#0d47a1] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">{t("loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <MapContainer
      center={[31.6295, -7.9811]}
      zoom={12}
      className="h-full w-full rounded-xl"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyToLocation center={center} />
      {properties.map((property) => {
        const lat = (property as unknown as { latitude?: number }).latitude;
        const lng = (property as unknown as { longitude?: number }).longitude;
        if (!lat || !lng) return null;

        const primaryImage = property.images?.[0];
        const priceLabel = formatPrice(property.price, property.currency);

        return (
          <Marker
            key={property.id}
            position={[lat, lng]}
            icon={createPriceIcon(priceLabel)}
            eventHandlers={{
              click: () => setSelectedId(property.id),
            }}
          >
            <Popup maxWidth={280} minWidth={240}>
              <div className="p-1">
                {primaryImage && (
                  <div className="relative w-full h-[140px] rounded-lg overflow-hidden mb-2">
                    <Image
                      src={primaryImage.url}
                      alt={primaryImage.alt || property.title}
                      fill
                      className="object-cover"
                      sizes="280px"
                    />
                  </div>
                )}
                <h3 className="font-bold text-sm text-gray-900 mb-1 leading-tight">{property.title}</h3>
                <p className="text-[#0d47a1] font-bold text-base mb-1.5">
                  {priceLabel}
                  {property.pricePeriod && (
                    <span className="text-gray-400 font-normal text-xs"> /{property.pricePeriod === "NIGHT" ? "nuit" : "mois"}</span>
                  )}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                  <span className="flex items-center gap-1">
                    <Bed className="w-3.5 h-3.5" />
                    {property.bedrooms} {t("bedrooms")}
                  </span>
                  {property.bathrooms > 0 && (
                    <span>{property.bathrooms} {t("bathrooms")}</span>
                  )}
                </div>
                <Link
                  href={`/properties/${property.slug}`}
                  className="block w-full text-center bg-[#0d47a1] hover:bg-[#0b3d8a] text-white text-sm font-semibold py-2 rounded-lg transition-colors"
                >
                  {t("view")}
                </Link>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
