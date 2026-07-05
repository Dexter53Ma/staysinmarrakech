"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

export type Currency = "EUR" | "MAD" | "USD";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  convert: (price: number, from: Currency) => number;
  symbol: string;
}

const RATES: Record<Currency, number> = {
  EUR: 1,
  MAD: 10.7,
  USD: 1.09,
};

const SYMBOLS: Record<Currency, string> = {
  EUR: "€",
  MAD: "DH",
  USD: "$",
};

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "EUR",
  setCurrency: () => {},
  convert: (p) => p,
  symbol: "€",
});

export function useCurrency() {
  return useContext(CurrencyContext);
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("EUR");

  useEffect(() => {
    const saved = localStorage.getItem("currency") as Currency | null;
    if (saved && saved in RATES) setCurrencyState(saved);
  }, []);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("currency", c);
  }, []);

  const convert = useCallback(
    (price: number, from: Currency) => {
      const inEur = price / RATES[from];
      return inEur * RATES[currency];
    },
    [currency]
  );

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convert, symbol: SYMBOLS[currency] }}>
      {children}
    </CurrencyContext.Provider>
  );
}
