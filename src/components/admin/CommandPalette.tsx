"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  FileText,
  Wrench,
  CalendarDays,
  Mail,
  Search,
  X,
} from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  type: "property" | "blog" | "service" | "booking" | "contact";
  href: string;
}

const TYPE_CONFIG: Record<
  SearchResult["type"],
  { icon: typeof Building2; label: string; color: string }
> = {
  property: { icon: Building2, label: "Propriétés", color: "text-blue-400" },
  blog: { icon: FileText, label: "Blog", color: "text-emerald-400" },
  service: { icon: Wrench, label: "Services", color: "text-amber-400" },
  booking: { icon: CalendarDays, label: "Réservations", color: "text-purple-400" },
  contact: { icon: Mail, label: "Contacts", color: "text-rose-400" },
};

const API_ENDPOINTS: {
  url: string;
  type: SearchResult["type"];
  mapResult: (item: Record<string, unknown>) => SearchResult;
}[] = [
  {
    url: "/api/properties?search=",
    type: "property",
    mapResult: (item) => ({
      id: item.id as string,
      title: item.title as string,
      subtitle: item.city as string | undefined,
      type: "property",
      href: `/admin/properties/${item.id}/edit`,
    }),
  },
  {
    url: "/api/blog?search=",
    type: "blog",
    mapResult: (item) => ({
      id: item.id as string,
      title: item.title as string,
      subtitle: (item.category as string | undefined) ?? undefined,
      type: "blog",
      href: `/admin/blog/${item.id}/edit`,
    }),
  },
  {
    url: "/api/services?search=",
    type: "service",
    mapResult: (item) => ({
      id: item.id as string,
      title: item.title as string,
      subtitle: (item.category as string | undefined) ?? undefined,
      type: "service",
      href: `/admin/services/${item.id}/edit`,
    }),
  },
  {
    url: "/api/bookings?search=",
    type: "booking",
    mapResult: (item) => ({
      id: item.id as string,
      title: item.guestName as string,
      subtitle: (item.property as Record<string, unknown> | undefined)?.title as string | undefined,
      type: "booking",
      href: `/admin/bookings`,
    }),
  },
  {
    url: "/api/contacts?search=",
    type: "contact",
    mapResult: (item) => ({
      id: item.id as string,
      title: item.name as string,
      subtitle: (item.subject as string | undefined) ?? undefined,
      type: "contact",
      href: `/admin/contacts`,
    }),
  },
];

export default function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const fetchResults = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const promises = API_ENDPOINTS.map(async (endpoint) => {
        try {
          const res = await fetch(endpoint.url + encodeURIComponent(q));
          if (!res.ok) return [];
          const data = await res.json();
          const items = data.data ?? data;
          if (!Array.isArray(items)) return [];
          return items.slice(0, 5).map(endpoint.mapResult);
        } catch {
          return [];
        }
      });
      const all = await Promise.all(promises);
      setResults(all.flat());
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
      setActiveIndex(0);
      return;
    }
    const timer = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (open) fetchResults(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, open, fetchResults]);

  useEffect(() => {
    setActiveIndex(0);
  }, [results]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onOpenChange]);

  const grouped = results.reduce<Record<string, SearchResult[]>>((acc, r) => {
    (acc[r.type] ??= []).push(r);
    return acc;
  }, {});

  const flatResults = Object.values(grouped).flat();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flatResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && flatResults[activeIndex]) {
      e.preventDefault();
      navigateTo(flatResults[activeIndex]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onOpenChange(false);
    }
  };

  const navigateTo = (result: SearchResult) => {
    onOpenChange(false);
    router.push(result.href);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="flex justify-center pt-[15vh]">
        <div className="relative w-full max-w-lg bg-[#111827] rounded-xl shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-4 border-b border-white/10">
            <Search className="size-4 text-gray-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Rechercher..."
              className="flex-1 h-12 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
            />
            <button
              onClick={() => onOpenChange(false)}
              className="p-1 rounded text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>
          <div ref={listRef} className="max-h-[50vh] overflow-y-auto p-2">
            {!query.trim() && (
              <p className="text-center text-gray-500 text-sm py-8">
                Tapez pour rechercher...
              </p>
            )}
            {query.trim() && loading && (
              <p className="text-center text-gray-500 text-sm py-8">Recherche...</p>
            )}
            {query.trim() && !loading && results.length === 0 && (
              <p className="text-center text-gray-500 text-sm py-8">
                Aucun résultat pour &quot;{query}&quot;
              </p>
            )}
            {Object.entries(grouped).map(([type, items]) => {
              const config = TYPE_CONFIG[type as SearchResult["type"]];
              const Icon = config.icon;
              return (
                <div key={type} className="mb-2">
                  <p className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider ${config.color}`}>
                    {config.label}
                  </p>
                  {items.map((item) => {
                    const idx = flatResults.indexOf(item);
                    return (
                      <button
                        key={`${item.type}-${item.id}`}
                        onClick={() => navigateTo(item)}
                        onMouseEnter={() => setActiveIndex(idx)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          idx === activeIndex
                            ? "bg-white/10 text-white"
                            : "text-gray-300 hover:bg-white/5"
                        }`}
                      >
                        <Icon className={`size-4 shrink-0 ${config.color}`} />
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{item.title}</p>
                          {item.subtitle && (
                            <p className="text-xs text-gray-500 truncate">{item.subtitle}</p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
