"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useSettings } from "@/components/SettingsContext";
import {
  Icon,
  faSearch,
  faMapMarkerAlt,
  faUsers,
  faChevronDown,
  faHome,
} from "@/components/icons";
import DateCalendarPicker from "@/components/DateCalendarPicker";

interface HeroSlide {
  image: string;
  title: string;
}

export default function HeroWithSearch({ heroSlides }: { heroSlides: HeroSlide[] }) {
  const settings = useSettings();
  const router = useRouter();
  const t = useTranslations("homepage");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [propertyType, setPropertyType] = useState("ALL");
  const [pricePeriod, setPricePeriod] = useState("nightly");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const guestRef = useRef<HTMLDivElement>(null);

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
      if (propertyType && propertyType !== "ALL") params.set("type", propertyType);
      if (pricePeriod) params.set("pricePeriod", pricePeriod);
      if (checkIn) params.set("checkIn", checkIn);
      if (checkOut) params.set("checkOut", checkOut);
      if (guests) params.set("guests", guests.toString());
      router.push(`/marrakech-villas/location-villa-marrakech?${params.toString()}`);
    },
    [propertyType, pricePeriod, checkIn, checkOut, guests, router]
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
            <span className="text-white/90 text-xs sm:text-sm font-medium">{t("heroTitle")}</span>
          </div>
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-3 sm:mb-4 leading-tight px-2">
            {settings.hero_title || t("heroSubtitle")}
          </h1>
          <p className="text-white/70 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4">
            {settings.hero_subtitle || t("heroConcierge")}
          </p>
        </div>

        {/* ═══════════════════ DESKTOP SEARCH BAR ═══════════════════ */}
        <form onSubmit={handleSearch} className="hidden md:block max-w-[1040px] mx-auto">
          <div className="bg-white/[0.95] backdrop-blur-xl rounded-[2rem] shadow-[0_8px_60px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.2)] p-2.5">
            <div className="flex items-center">
              {/* Property Type */}
              <div className="flex items-center gap-3 px-6 py-3 rounded-[1.5rem] hover:bg-gray-50/80 transition-all duration-200 min-w-[170px] group">
                <Icon icon={faHome} className="text-[#0d47a1] text-sm shrink-0 group-hover:scale-110 transition-transform" />
                <div className="flex-1 min-w-0">
                  <p id="type-label-desktop" className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.08em]">{t("typeLabel")}</p>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    aria-labelledby="type-label-desktop"
                    className="w-full text-[13px] text-gray-800 outline-none bg-transparent font-semibold mt-0.5 cursor-pointer"
                  >
                    <option value="ALL">{t("typeAll")}</option>
                    <option value="VILLA">Villa</option>
                    <option value="RIAD">Riad</option>
                    <option value="APARTMENT">{t("typeApartment")}</option>
                  </select>
                </div>
              </div>

              <div className="w-px h-8 bg-gray-200/60 shrink-0" />

              {/* Rent / Sale Toggle */}
              <div className="flex items-center gap-1.5 px-5 py-2.5 rounded-full mx-1">
                <button
                  type="button"
                  onClick={() => setPricePeriod("nightly")}
                  className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 ${
                    pricePeriod === "nightly"
                      ? "bg-[#0d47a1] text-white shadow-md shadow-[#0d47a1]/20"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {t("locationLabel")}
                </button>
                <button
                  type="button"
                  onClick={() => setPricePeriod("sale")}
                  className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 ${
                    pricePeriod === "sale"
                      ? "bg-[#0d47a1] text-white shadow-md shadow-[#0d47a1]/20"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {t("saleLabel")}
                </button>
              </div>

              <div className="w-px h-8 bg-gray-200/60 shrink-0" />

              {/* Dates */}
              <div className="flex items-center">
                <DateCalendarPicker value={checkIn} onChange={setCheckIn} minDate={todayStr} label={t("arrivalLabel")} placeholder={t("whenLabel")} variant="desktop" />
                <div className="w-px h-8 bg-gray-200/60 shrink-0 mx-1" />
                <DateCalendarPicker value={checkOut} onChange={setCheckOut} minDate={checkIn || todayStr} label={t("departureLabel")} placeholder={t("whenLabel")} variant="desktop" />
              </div>

              <div className="w-px h-8 bg-gray-200/60 shrink-0" />

              {/* Guests */}
              <div
                ref={guestRef}
                className="relative flex items-center gap-3 px-6 py-3 rounded-[1.5rem] hover:bg-gray-50/80 transition-all duration-200 cursor-pointer min-w-[160px] group"
                onClick={() => setShowGuestPicker(!showGuestPicker)}
              >
                <Icon icon={faUsers} className="text-[#0d47a1] text-sm shrink-0 group-hover:scale-110 transition-transform" />
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.08em]">{t("guestsLabel")}</p>
                  <p className="text-[13px] text-gray-800 font-semibold mt-0.5">
                    {t("guestsCount", { count: guests })}
                  </p>
                </div>
                <Icon icon={faChevronDown} className={`text-gray-400 text-[10px] transition-transform duration-200 ${showGuestPicker ? "rotate-180" : ""}`} />

                {showGuestPicker && (
                  <div className="absolute right-0 top-full mt-3 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-100 p-5 z-50 w-64" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700 font-medium">{t("guestsLabel")}</span>
                      <div className="flex items-center gap-3">
                        <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#0d47a1] hover:text-[#0d47a1] transition-all duration-200 text-base font-bold active:scale-95">−</button>
                        <span className="text-base font-bold text-gray-800 w-6 text-center">{guests}</span>
                        <button type="button" onClick={() => setGuests(Math.min(20, guests + 1))} className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#0d47a1] hover:text-[#0d47a1] transition-all duration-200 text-base font-bold active:scale-95">+</button>
                      </div>
                    </div>
                    <button type="button" onClick={() => setShowGuestPicker(false)} className="mt-4 w-full bg-[#0d47a1] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-[#0a3a82] transition-all duration-200 active:scale-[0.98]">
                      {t("confirmLabel")}
                    </button>
                  </div>
                )}
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="bg-[#0d47a1] hover:bg-[#0a3a82] text-white font-bold py-3.5 px-8 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-[#0d47a1]/25 flex items-center gap-2.5 text-sm shrink-0 ml-1 active:scale-[0.97]"
              >
                <Icon icon={faSearch} className="text-sm" />
                <span className="hidden lg:inline">{t("searchLabel")}</span>
              </button>
            </div>
          </div>
        </form>

        {/* ═══════════════════ MOBILE SEARCH BAR ═══════════════════ */}
        <form onSubmit={handleSearch} className="md:hidden max-w-[420px] mx-auto px-1">
          <div className="bg-white/[0.97] backdrop-blur-xl rounded-[1.75rem] shadow-[0_8px_40px_rgba(0,0,0,0.28),0_0_0_1px_rgba(255,255,255,0.3)] p-4 space-y-3">
            {/* Property Type */}
            <div className="flex items-center gap-3 bg-gray-50/80 rounded-2xl px-4 py-3.5 hover:bg-gray-100/80 transition-colors">
              <Icon icon={faHome} className="text-[#0d47a1] shrink-0" />
              <div className="flex-1 min-w-0">
                <p id="type-label-mobile" className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.08em]">{t("typeLabel")}</p>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  aria-labelledby="type-label-mobile"
                  className="w-full text-[13px] text-gray-800 outline-none bg-transparent font-semibold mt-0.5 cursor-pointer"
                >
                  <option value="ALL">{t("typeAll")}</option>
                  <option value="VILLA">Villa</option>
                  <option value="RIAD">Riad</option>
                  <option value="APARTMENT">{t("typeApartment")}</option>
                </select>
              </div>
            </div>

            {/* Rent / Sale Toggle */}
            <div className="flex items-center gap-2 bg-gray-50/80 rounded-2xl p-1.5">
              <button
                type="button"
                onClick={() => setPricePeriod("nightly")}
                className={`flex-1 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                  pricePeriod === "nightly"
                    ? "bg-[#0d47a1] text-white shadow-md shadow-[#0d47a1]/20"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {t("locationLabel")}
              </button>
              <button
                type="button"
                onClick={() => setPricePeriod("sale")}
                className={`flex-1 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                  pricePeriod === "sale"
                    ? "bg-[#0d47a1] text-white shadow-md shadow-[#0d47a1]/20"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {t("saleLabel")}
              </button>
            </div>

            {/* Date Pickers */}
            <div className="space-y-2">
              <DateCalendarPicker value={checkIn} onChange={setCheckIn} minDate={todayStr} label={t("arrivalLabel")} placeholder={t("chooseLabel")} variant="mobile" />
              <DateCalendarPicker value={checkOut} onChange={setCheckOut} minDate={checkIn || todayStr} label={t("departureLabel")} placeholder={t("chooseLabel")} variant="mobile" />
            </div>

            {/* Guests */}
            <div className="flex items-center justify-between bg-gray-50/80 rounded-2xl px-4 py-3.5">
              <div className="flex items-center gap-3">
                <Icon icon={faUsers} className="text-[#0d47a1] shrink-0" />
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.08em]">{t("guestsLabel")}</p>
                  <p className="text-[13px] font-semibold text-gray-800 mt-0.5">{t("guestsCount", { count: guests })}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#0d47a1] hover:text-[#0d47a1] transition-all duration-200 text-sm font-bold active:scale-95">−</button>
                <span className="text-sm font-bold text-gray-800 w-5 text-center">{guests}</span>
                <button type="button" onClick={() => setGuests(Math.min(20, guests + 1))} className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#0d47a1] hover:text-[#0d47a1] transition-all duration-200 text-sm font-bold active:scale-95">+</button>
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full bg-[#0d47a1] hover:bg-[#0a3a82] text-white font-bold py-4 rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-[#0d47a1]/25 flex items-center justify-center gap-2.5 text-sm active:scale-[0.98]"
            >
              <Icon icon={faSearch} className="text-sm" />
              <span>{t("searchLabel")}</span>
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
                className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? "bg-[#ffb000] w-8 sm:w-10" : "bg-white/40 hover:bg-white/60 w-2"}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <a href="#icons-section" aria-label="Scroll to content" className="w-11 h-11 flex items-center justify-center text-white/50 hover:text-white transition-colors">
          <Icon icon={faChevronDown} className="text-2xl" />
        </a>
      </div>
    </section>
  );
}
