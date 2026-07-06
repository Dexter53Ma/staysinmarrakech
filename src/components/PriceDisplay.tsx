"use client";

import { useLocale } from "next-intl";
import { useCurrency } from "./CurrencyContext";

interface PriceDisplayProps {
  price: number;
  currency: string;
  suffix?: string;
  className?: string;
}

export default function PriceDisplay({ price, currency, suffix, className }: PriceDisplayProps) {
  const { convert, symbol } = useCurrency();
  const locale = useLocale();
  const converted = convert(price, currency as "EUR" | "MAD" | "USD");
  return (
    <span className={className}>
      {converted.toLocaleString(locale === "en" ? "en-US" : "fr-FR")} {symbol}
      {suffix && <span className="text-sm font-normal text-gray-500">{suffix}</span>}
    </span>
  );
}
