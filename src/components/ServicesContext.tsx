"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface ServiceItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  isActive: boolean;
}

interface ServicesContextValue {
  services: ServiceItem[];
  loading: boolean;
}

const ServicesContext = createContext<ServicesContextValue>({ services: [], loading: true });

export function useServices() {
  return useContext(ServicesContext);
}

export function ServicesProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data: ServiceItem[]) => setServices(data.filter((s) => s.isActive)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <ServicesContext.Provider value={{ services, loading }}>
      {children}
    </ServicesContext.Provider>
  );
}
