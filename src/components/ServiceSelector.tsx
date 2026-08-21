"use client";

import { useState, useEffect, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Check, Plus, Minus, Loader2 } from "lucide-react";
import { useCurrency } from "@/components/CurrencyContext";

interface Service {
  id: string;
  title: string;
  titleEn?: string | null;
  description: string;
  descriptionEn?: string | null;
  image?: string | null;
  price?: number | null;
  priceUnit?: string | null;
  category?: string | null;
}

interface SelectedService {
  serviceId: string;
  serviceName: string;
  serviceNameEn?: string;
  quantity: number;
  price: number;
  notes: string;
}

interface ServiceSelectorProps {
  selected: SelectedService[];
  onChange: (services: SelectedService[]) => void;
}

export default function ServiceSelector({ selected, onChange }: ServiceSelectorProps) {
  const t = useTranslations("properties");
  const locale = useLocale();
  const { convert, symbol } = useCurrency();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.data || [];
        setServices(list.filter((s: Service & { isActive?: boolean }) => s.isActive !== false));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const getLocalizedField = (service: Service, field: "title" | "description") => {
    if (locale === "en") {
      const enField = field === "title" ? service.titleEn : service.descriptionEn;
      if (enField) return enField;
    }
    return field === "title" ? service.title : service.description;
  };

  const getServicePrice = (service: Service) => {
    if (service.price == null) return null;
    return service.price;
  };

  const toggleService = (service: Service) => {
    const existing = selected.find((s) => s.serviceId === service.id);
    if (existing) {
      onChange(selected.filter((s) => s.serviceId !== service.id));
    } else {
      const price = getServicePrice(service);
      if (price != null) {
        const titleEn = service.titleEn || undefined;
        onChange([...selected, { serviceId: service.id, serviceName: service.title, serviceNameEn: titleEn, quantity: 1, price, notes: "" }]);
      }
    }
  };

  const updateQuantity = (serviceId: string, delta: number) => {
    onChange(
      selected.map((s) =>
        s.serviceId === serviceId ? { ...s, quantity: Math.max(1, Math.min(100, s.quantity + delta)) } : s
      )
    );
  };

  const servicesTotal = useMemo(
    () => selected.reduce((sum, s) => sum + s.price * s.quantity, 0),
    [selected]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-6 text-gray-400 animate-spin" />
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <p className="text-center text-gray-400 text-sm py-8">{t("noServices")}</p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        {services.map((service) => {
          const isSelected = selected.some((s) => s.serviceId === service.id);
          const selectedEntry = selected.find((s) => s.serviceId === service.id);
          const price = getServicePrice(service);

          return (
            <div
              key={service.id}
              className={`rounded-xl border-2 p-4 transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-[#0d47a1] bg-[#0d47a1]/5"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
              onClick={() => toggleService(service)}
            >
              <div className="flex items-start gap-3">
                <div className={`size-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                  isSelected ? "border-[#0d47a1] bg-[#0d47a1]" : "border-gray-300"
                }`}>
                  {isSelected && <Check className="size-3.5 text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm">{getLocalizedField(service, "title")}</h4>
                      {service.category && (
                        <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">{service.category}</span>
                      )}
                    </div>
                    {price != null && (
                      <p className="text-sm font-bold text-[#0d47a1] whitespace-nowrap">
                        {convert(price, "EUR").toLocaleString(locale === "en" ? "en-US" : "fr-FR")} {symbol}
                        {service.priceUnit && <span className="text-[10px] font-normal text-gray-400 ml-0.5">/{service.priceUnit}</span>}
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{getLocalizedField(service, "description")}</p>

                  {isSelected && price != null && (
                    <div className="flex items-center gap-3 mt-3" onClick={(e) => e.stopPropagation()}>
                      <span className="text-xs text-gray-500">{t("quantity")}:</span>
                      <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(service.id, -1)}
                          className="size-7 rounded-md bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-gray-900">{selectedEntry?.quantity || 1}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(service.id, 1)}
                          className="size-7 rounded-md bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {convert(price * (selectedEntry?.quantity || 1), "EUR").toLocaleString(locale === "en" ? "en-US" : "fr-FR")} {symbol}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selected.length > 0 && (
        <div className="bg-[#0d47a1]/5 rounded-xl p-4 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">{t("serviceTotal")}</span>
          <span className="text-base font-bold text-[#0d47a1]">
            {convert(servicesTotal, "EUR").toLocaleString(locale === "en" ? "en-US" : "fr-FR")} {symbol}
          </span>
        </div>
      )}
    </div>
  );
}
