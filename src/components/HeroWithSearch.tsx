"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSettings } from "@/components/SettingsContext";
import {
  Icon,
  faSearch,
  faMapMarkerAlt,
  faCalendarAlt,
  faUsers,
  faChevronDown,
  faArrowLeft,
  faArrowRight,
} from "@/components/icons";

interface HeroSlide {
  image: string;
  title: string;
  isActive: boolean;
}

function CalendarDropdown({
  value,
  onChange,
  minDate,
  label,
  placeholder,
}: {
  value: string;
  onChange: (d: string) => void;
  minDate?: string;
  label: string;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => {
    if (value) return new Date(value + "T00:00:00");
    return new Date();
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const min = minDate ? new Date(minDate + "T00:00:00") : today;

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
  ];

  const dayNames = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const selectDate = (day: number) => {
    const d = new Date(year, month, day);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    onChange(iso);
    setOpen(false);
  };

  const displayValue = value
    ? new Date(value + "T00:00:00").toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  // Build calendar grid (Monday-start)
  const cells: (number | null)[] = [];
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const calendarPanel = (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-full max-w-[320px]" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between mb-3">
        <button type="button" onClick={prevMonth} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
          <Icon icon={faArrowLeft} className="text-gray-500 text-xs" />
        </button>
        <p className="text-sm font-bold text-gray-800">{monthNames[month]} {year}</p>
        <button type="button" onClick={nextMonth} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
          <Icon icon={faArrowRight} className="text-gray-500 text-xs" />
        </button>
      </div>
      <div className="grid grid-cols-7 mb-1">
        {dayNames.map((d) => (
          <div key={d} className="text-center text-[10px] font-bold text-gray-400 uppercase py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />;
          const d = new Date(year, month, day);
          d.setHours(0, 0, 0, 0);
          const isDisabled = d < min;
          const isToday = d.getTime() === today.getTime();
          const isSelected = value === `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          return (
            <button
              key={day}
              type="button"
              disabled={isDisabled}
              onClick={() => selectDate(day)}
              className={`h-9 w-full rounded-full text-xs font-medium transition-all
                ${isDisabled ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:bg-[#0d47a1] hover:text-white cursor-pointer"}
                ${isSelected ? "bg-[#0d47a1] text-white font-bold" : ""}
                ${isToday && !isSelected ? "ring-1 ring-[#0d47a1] text-[#0d47a1] font-bold" : ""}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
      <div className="mt-3 pt-3 border-t border-gray-100 text-center">
        <button
          type="button"
          onClick={() => {
            const iso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
            onChange(iso);
            setOpen(false);
          }}
          className="text-xs font-semibold text-[#0d47a1] hover:underline"
        >
          Aujourd&apos;hui
        </button>
      </div>
    </div>
  );

  return (
    <div ref={ref} className="relative">
      <div
        className="flex items-center gap-3 px-5 py-3 rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <Icon icon={faCalendarAlt} className="text-[#0d47a1] text-sm shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
          <p className={`text-sm font-medium mt-0.5 ${displayValue ? "text-gray-800" : "text-gray-400"}`}>
            {displayValue || placeholder}
          </p>
        </div>
      </div>

      {open && (
        <>
          {/* Mobile: fixed centered overlay */}
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 md:hidden" onClick={() => setOpen(false)}>
            <div className="px-4 w-full flex justify-center" onClick={(e) => e.stopPropagation()}>
              {calendarPanel}
            </div>
          </div>
          {/* Desktop: absolute upward dropdown */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 z-50 hidden md:block" onClick={(e) => e.stopPropagation()}>
            {calendarPanel}
          </div>
        </>
      )}
    </div>
  );
}

export default function HeroWithSearch() {
  const settings = useSettings();
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const guestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/hero-slides")
      .then((r) => r.json())
      .then((data) => setHeroSlides(data.filter((s: HeroSlide) => s.isActive && s.image)))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (heroSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (guestRef.current && !guestRef.current.contains(e.target as Node)) {
        setShowGuestPicker(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams();
      if (destination) params.set("search", destination);
      if (checkIn) params.set("checkIn", checkIn);
      if (checkOut) params.set("checkOut", checkOut);
      if (guests) params.set("guests", guests.toString());
      router.push(`/marrakech-villas/location-villa-marrakech?${params.toString()}`);
    },
    [destination, checkIn, checkOut, guests, router]
  );

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return (
    <section className="relative min-h-[500px] sm:min-h-[540px] md:min-h-[620px] lg:min-h-[680px] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {heroSlides.length > 0 ? (
          heroSlides.map((slide, i) => (
            <div
              key={slide.image || i}
              className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}
            >
              {slide.image && <Image src={slide.image} alt={slide.title} fill className="object-cover" sizes="100vw" priority={i === 0} />}
            </div>
          ))
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d47a1] to-[#1565c0]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-24">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 mb-4 sm:mb-5 border border-white/10">
            <Icon icon={faMapMarkerAlt} className="text-[#ffb000] text-xs" />
            <span className="text-white/90 text-xs sm:text-sm font-medium">Marrakech, Maroc</span>
          </div>
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-3 sm:mb-4 leading-tight px-2">
            {settings.hero_title || "Location de villas de luxe à Marrakech"}
          </h1>
          <p className="text-white/70 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4">
            {settings.hero_subtitle || "Service de conciergerie dédié pour vous"}
          </p>
        </div>

        {/* ═══════════════════ DESKTOP SEARCH BAR ═══════════════════ */}
        <form onSubmit={handleSearch} className="hidden md:block max-w-[1000px] mx-auto">
          <div className="bg-white rounded-full shadow-[0_8px_40px_rgba(0,0,0,0.25)] p-2 flex items-center">
            {/* Destination */}
            <div className="flex-1 flex items-center gap-3 px-5 py-3 rounded-full hover:bg-gray-50 transition-colors">
              <Icon icon={faMapMarkerAlt} className="text-[#0d47a1] text-sm shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Destination</p>
                <input
                  type="text"
                  placeholder="Rechercher une destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full text-sm text-gray-800 placeholder:text-gray-400 outline-none bg-transparent font-medium mt-0.5"
                />
              </div>
            </div>

            <span className="w-px h-8 bg-gray-200 shrink-0" />

            {/* Check-in Calendar */}
            <CalendarDropdown
              value={checkIn}
              onChange={setCheckIn}
              minDate={todayStr}
              label="Arrivée"
              placeholder="Quand ?"
            />

            <span className="w-px h-8 bg-gray-200 shrink-0" />

            {/* Check-out Calendar */}
            <CalendarDropdown
              value={checkOut}
              onChange={setCheckOut}
              minDate={checkIn || todayStr}
              label="Départ"
              placeholder="Quand ?"
            />

            <span className="w-px h-8 bg-gray-200 shrink-0" />

            {/* Guests */}
            <div
              ref={guestRef}
              className="relative flex items-center gap-3 px-5 py-3 rounded-full hover:bg-gray-50 transition-colors cursor-pointer min-w-[160px]"
              onClick={() => setShowGuestPicker(!showGuestPicker)}
            >
              <Icon icon={faUsers} className="text-[#0d47a1] text-sm shrink-0" />
              <div className="flex-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Voyageurs</p>
                <p className="text-sm text-gray-800 font-medium mt-0.5">
                  {guests} voyageur{guests > 1 ? "s" : ""}
                </p>
              </div>
              <Icon icon={faChevronDown} className={`text-gray-400 text-[10px] transition-transform duration-200 ${showGuestPicker ? "rotate-180" : ""}`} />

              {showGuestPicker && (
                <div className="absolute right-0 top-full mt-3 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 z-50 w-64" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700 font-medium">Voyageurs</span>
                    <div className="flex items-center gap-3">
                      <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#0d47a1] hover:text-[#0d47a1] transition-colors text-base font-bold">−</button>
                      <span className="text-base font-bold text-gray-800 w-6 text-center">{guests}</span>
                      <button type="button" onClick={() => setGuests(Math.min(20, guests + 1))} className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#0d47a1] hover:text-[#0d47a1] transition-colors text-base font-bold">+</button>
                    </div>
                  </div>
                  <button type="button" onClick={() => setShowGuestPicker(false)} className="mt-4 w-full bg-[#0d47a1] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-[#0a3a82] transition-colors">
                    Confirmer
                  </button>
                </div>
              )}
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="bg-[#0d47a1] hover:bg-[#0a3a82] text-white font-bold py-3.5 px-7 rounded-full transition-all hover:shadow-lg flex items-center gap-2 text-sm shrink-0 ml-1"
            >
              <Icon icon={faSearch} className="text-sm" />
              <span className="hidden lg:inline">Rechercher</span>
            </button>
          </div>
        </form>

        {/* ═══════════════════ MOBILE SEARCH BAR ═══════════════════ */}
        <form onSubmit={handleSearch} className="md:hidden max-w-[500px] mx-auto">
          <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.25)] p-4 space-y-2">
            {/* Destination */}
            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3.5">
              <Icon icon={faMapMarkerAlt} className="text-[#0d47a1] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Destination</p>
                <input
                  type="text"
                  placeholder="Où allez-vous ?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full text-sm text-gray-800 placeholder:text-gray-400 outline-none bg-transparent font-medium mt-0.5"
                />
              </div>
            </div>

            {/* Dates — mobile uses simpler version */}
            <MobileDateRow label="Arrivée" value={checkIn} onChange={setCheckIn} minDate={todayStr} placeholder="Choisir" />
            <MobileDateRow label="Départ" value={checkOut} onChange={setCheckOut} minDate={checkIn || todayStr} placeholder="Choisir" />

            {/* Guests */}
            <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-3.5">
              <div className="flex items-center gap-3">
                <Icon icon={faUsers} className="text-[#0d47a1] shrink-0" />
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Voyageurs</p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">{guests} voyageur{guests > 1 ? "s" : ""}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#0d47a1] hover:text-[#0d47a1] transition-colors text-sm font-bold">−</button>
                <span className="text-sm font-bold text-gray-800 w-5 text-center">{guests}</span>
                <button type="button" onClick={() => setGuests(Math.min(20, guests + 1))} className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#0d47a1] hover:text-[#0d47a1] transition-colors text-sm font-bold">+</button>
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full bg-[#0d47a1] hover:bg-[#0a3a82] text-white font-bold py-3.5 rounded-2xl transition-all hover:shadow-lg flex items-center justify-center gap-2 text-sm"
            >
              <Icon icon={faSearch} className="text-sm" />
              <span>Rechercher</span>
            </button>
          </div>
        </form>

        {/* Slide Indicators */}
        {heroSlides.length > 1 && (
          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? "bg-[#ffb000] w-6 sm:w-8" : "bg-white/40 hover:bg-white/60 w-1.5"}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <a href="#icons-section" className="text-white/50 hover:text-white transition-colors">
          <Icon icon={faChevronDown} className="text-2xl" />
        </a>
      </div>
    </section>
  );
}

/* ─── Mobile date row (full-width calendar button) ─── */
function MobileDateRow({
  label,
  value,
  onChange,
  minDate,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (d: string) => void;
  minDate: string;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const min = new Date(minDate + "T00:00:00");

  const [viewDate, setViewDate] = useState(() => (value ? new Date(value + "T00:00:00") : new Date()));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = firstDay === 0 ? 6 : firstDay - 1;

  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
  ];
  const dayNames = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];

  const displayValue = value
    ? new Date(value + "T00:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })
    : "";

  const calendarPanel = (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-full max-w-[320px]" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between mb-3">
        <button type="button" onClick={() => setViewDate(new Date(year, month - 1, 1))} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <Icon icon={faArrowLeft} className="text-gray-500 text-xs" />
        </button>
        <p className="text-sm font-bold text-gray-800">{monthNames[month]} {year}</p>
        <button type="button" onClick={() => setViewDate(new Date(year, month + 1, 1))} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <Icon icon={faArrowRight} className="text-gray-500 text-xs" />
        </button>
      </div>
      <div className="grid grid-cols-7 mb-1">
        {dayNames.map((d) => (
          <div key={d} className="text-center text-[10px] font-bold text-gray-400 uppercase py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {Array.from({ length: offset }).map((_, i) => <div key={`e-${i}`} />)}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const d = new Date(year, month, day);
          d.setHours(0, 0, 0, 0);
          const isDisabled = d < min;
          const isToday = d.getTime() === today.getTime();
          const isSelected = value === `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          return (
            <button
              key={day}
              type="button"
              disabled={isDisabled}
              onClick={() => {
                onChange(`${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`);
                setOpen(false);
              }}
              className={`h-9 w-full rounded-full text-xs font-medium transition-all
                ${isDisabled ? "text-gray-300 cursor-not-allowed" : "text-gray-700 active:bg-[#0d47a1] active:text-white"}
                ${isSelected ? "bg-[#0d47a1] text-white font-bold" : ""}
                ${isToday && !isSelected ? "ring-1 ring-[#0d47a1] text-[#0d47a1] font-bold" : ""}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
      <div className="mt-3 pt-3 border-t border-gray-100 text-center">
        <button
          type="button"
          onClick={() => {
            const iso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
            onChange(iso);
            setOpen(false);
          }}
          className="text-xs font-semibold text-[#0d47a1] hover:underline"
        >
          Aujourd&apos;hui
        </button>
      </div>
    </div>
  );

  return (
    <div ref={ref} className="relative">
      <div
        className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-3.5 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <Icon icon={faCalendarAlt} className="text-[#0d47a1] shrink-0" />
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
            <p className={`text-sm font-medium mt-0.5 ${displayValue ? "text-gray-800" : "text-gray-400"}`}>
              {displayValue || placeholder}
            </p>
          </div>
        </div>
        <Icon icon={faChevronDown} className={`text-gray-400 text-xs transition-transform ${open ? "rotate-180" : ""}`} />
      </div>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40" onClick={() => setOpen(false)}>
          <div className="px-4 w-full flex justify-center" onClick={(e) => e.stopPropagation()}>
            {calendarPanel}
          </div>
        </div>
      )}
    </div>
  );
}
