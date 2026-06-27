"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface Settings {
  [key: string]: string;
}

const SettingsContext = createContext<Settings>({});

export function useSettings() {
  return useContext(SettingsContext);
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data: Record<string, string>) => {
        const map: Settings = {};
        Object.entries(data).forEach(([key, value]) => { map[key] = value || ""; });
        setSettings(map);
      })
      .catch(() => {});
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}
