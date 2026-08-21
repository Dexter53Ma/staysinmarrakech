"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {useLocale} from 'next-intl';

export interface SiteSettings {
  site_name?: string;
  site_name_en?: string;
  site_description?: string;
  site_description_en?: string;
  phone_1?: string;
  phone_2?: string;
  email?: string;
  address?: string;
  address_en?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  logo_url?: string;
  hero_title?: string;
  hero_title_en?: string;
  hero_subtitle?: string;
  hero_subtitle_en?: string;
  location_title?: string;
  location_title_en?: string;
  location_description?: string;
  location_description_en?: string;
  location_image?: string;
  location_link_text?: string;
  location_link_text_en?: string;
  location_link_href?: string;
  shortrental_title?: string;
  shortrental_title_en?: string;
  shortrental_description?: string;
  shortrental_description_en?: string;
  shortrental_image?: string;
  shortrental_link_text?: string;
  shortrental_link_text_en?: string;
  shortrental_link_href?: string;
  stats_experience?: string;
  stats_clients?: string;
  stats_quality?: string;
  stats_services?: string;
  stats_presence?: string;
  events_title?: string;
  events_title_en?: string;
  events_description?: string;
  events_description_en?: string;
  events_image?: string;
  vacations_title?: string;
  vacations_title_en?: string;
  vacations_description?: string;
  vacations_description_en?: string;
  vacations_image?: string;
}

export interface SiteSettingsContextValue extends SiteSettings {
  getLocalizedValue: (valueFr: string | undefined, valueEn: string | undefined) => string | undefined;
}

const SettingsContext = createContext<SiteSettingsContextValue>({
  getLocalizedValue: (valueFr) => valueFr,
});

export function useSettings() {
  return useContext(SettingsContext);
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [rawSettings, setRawSettings] = useState<Record<string, string>>({});
  const locale = useLocale();

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data: Record<string, string>) => {
        const map: Record<string, string> = {};
        Object.entries(data).forEach(([key, value]) => { map[key] = value || ""; });
        setRawSettings(map);
      })
      .catch(() => setRawSettings({}));
  }, []);

  const getLocalizedValue = useCallback(
    (valueFr: string | undefined, valueEn: string | undefined): string | undefined => {
      if (locale === 'en' && valueEn) return valueEn;
      return valueFr;
    },
    [locale],
  );

  const localizedKeys = useMemo(() => [
    'hero_title', 'hero_subtitle', 'site_name', 'site_description', 'address',
    'location_title', 'location_description', 'location_link_text',
    'shortrental_title', 'shortrental_description', 'shortrental_link_text',
    'events_title', 'events_description', 'vacations_title', 'vacations_description',
  ], []);

  const settings: SiteSettings = useMemo(() => {
    const result: SiteSettings = {};
    for (const [key, value] of Object.entries(rawSettings)) {
      if (localizedKeys.includes(key)) {
        (result as Record<string, string>)[key] = getLocalizedValue(value, rawSettings[`${key}_en`]) || '';
      } else {
        (result as Record<string, string>)[key] = value;
      }
    }
    return result;
  }, [rawSettings, localizedKeys, getLocalizedValue]);

  const contextValue: SiteSettingsContextValue = useMemo(
    () => ({ ...settings, getLocalizedValue }),
    [settings, getLocalizedValue],
  );

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
}
