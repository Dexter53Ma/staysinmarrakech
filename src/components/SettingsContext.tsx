"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface SiteSettings {
  site_name?: string;
  site_description?: string;
  phone_1?: string;
  phone_2?: string;
  email?: string;
  address?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  logo_url?: string;
  hero_title?: string;
  hero_subtitle?: string;
  location_title?: string;
  location_description?: string;
  location_image?: string;
  location_link_text?: string;
  location_link_href?: string;
  shortrental_title?: string;
  shortrental_description?: string;
  shortrental_image?: string;
  shortrental_link_text?: string;
  shortrental_link_href?: string;
  stats_experience?: string;
  stats_clients?: string;
  stats_quality?: string;
  stats_services?: string;
  stats_presence?: string;
  events_title?: string;
  events_description?: string;
  events_image?: string;
  vacations_title?: string;
  vacations_description?: string;
  vacations_image?: string;
}

const SettingsContext = createContext<SiteSettings>({});

export function useSettings() {
  return useContext(SettingsContext);
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data: Record<string, string>) => {
        const map: Record<string, string> = {};
        Object.entries(data).forEach(([key, value]) => { map[key] = value || ""; });
        setSettings(map as SiteSettings);
      })
      .catch(() => {});
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}
