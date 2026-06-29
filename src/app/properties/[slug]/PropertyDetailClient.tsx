"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useCsrf } from "@/hooks/useCsrf";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Calendar,
  Check,
  Send,
  ArrowLeft,
  Eye,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar as DatePicker } from "@/components/ui/calendar";
import { fr } from "date-fns/locale";
import type { PropertyData, Booking, Testimonial, SimilarProperty } from "@/types";
import { TYPE_LABELS, TYPE_COLORS, STATUS_LABELS, STATUS_COLORS, formatPrice } from "@/types";
import ImageGallery from "./components/ImageGallery";
import PropertyFeatures from "./components/PropertyFeatures";
import PropertyMap from "./components/PropertyMap";
import PropertyTestimonials from "./components/PropertyTestimonials";
import SimilarPropertiesGrid from "./components/SimilarPropertiesGrid";
import AvailabilityCalendar from "./components/AvailabilityCalendar";

interface PropertyDetailClientProps {
  property: PropertyData;
  bookings: Booking[];
  viewCount: number;
  testimonials: Testimonial[];
  similarProperties: SimilarProperty[];
}

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("session-id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("session-id", id);
  }
  return id;
}

function isDateRangeOverlapping(start1: Date, end1: Date, start2: Date, end2: Date): boolean {
  return start1 < end2 && start2 < end1;
}

export default function PropertyDetailClient({
  property,
  bookings,
  viewCount,
  testimonials,
  similarProperties,
}: PropertyDetailClientProps) {
  const router = useRouter();
  const { csrfFetch } = useCsrf();
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [guestCount, setGuestCount] = useState(1);
  const [formData, setFormData] = useState({ guestName: "", guestEmail: "", guestPhone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [showRangeCalendar, setShowRangeCalendar] = useState(true);
  const [showBookingPanel, setShowBookingPanel] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const features: string[] = useMemo(() => {
    if (Array.isArray(property.features)) return property.features;
    if (typeof property.features === "string") {
      try { return JSON.parse(property.features); } catch { return []; }
    }
    return [];
  }, [property.features]);

  const bookedDates = useMemo(() => {
    return bookings.map((b) => ({ start: new Date(b.checkIn), end: new Date(b.checkOut) }));
  }, [bookings]);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const diff = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [checkIn, checkOut]);

  const pricing = useMemo(() => {
    const nightlyRate = property.price;
    const subtotal = nightlyRate * nights;
    const cleaning = property.cleaningFee || 0;
    const service = property.serviceFee || 0;
    const total = subtotal + cleaning + service;
    return { nightlyRate, subtotal, cleaning, service, total };
  }, [property.price, nights, property.cleaningFee, property.serviceFee]);

  useEffect(() => {
    csrfFetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ propertyId: property.id }),
    }).catch(() => {});
  }, [property.id, csrfFetch]);

  const isDateBooked = useCallback(
    (date: Date) => {
      const day = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const nextDay = new Date(day);
      nextDay.setDate(nextDay.getDate() + 1);
      return bookedDates.some((b) => isDateRangeOverlapping(day, nextDay, b.start, b.end));
    },
    [bookedDates]
  );

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      setSubmitMessage({ type: "error", text: "Veuillez sélectionner vos dates d'arrivée et de départ" });
      return;
    }
    setSubmitting(true);
    setSubmitMessage(null);
    try {
      const res = await csrfFetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId: property.id,
          guestName: formData.guestName,
          guestEmail: formData.guestEmail,
          guestPhone: formData.guestPhone,
          checkIn: checkIn.toISOString(),
          checkOut: checkOut.toISOString(),
          guestsCount: guestCount,
          message: formData.message,
        }),
      });
      if (res.ok) {
        setSubmitMessage({ type: "success", text: "Demande envoyée avec succès ! Nous vous contacterons bientôt." });
        setFormData({ guestName: "", guestEmail: "", guestPhone: "", message: "" });
        setCheckIn(undefined);
        setCheckOut(undefined);
        setGuestCount(1);
        setBookingStep(1);
        setShowRangeCalendar(true);
      } else {
        const data = await res.json();
        setSubmitMessage({ type: "error", text: data.error || "Erreur lors de l'envoi" });
      }
    } catch {
      setSubmitMessage({ type: "error", text: "Erreur réseau. Veuillez réessayer." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1200px] mx-auto px-4 pt-6 pb-28">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-[#0d47a1] transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="size-4" />
            Retour
          </button>

          <div className="space-y-8">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${TYPE_COLORS[property.type] || "bg-gray-100 text-gray-800"}`}>
                  {TYPE_LABELS[property.type] || property.type}
                </span>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_COLORS[property.status] || "bg-gray-100 text-gray-800"}`}>
                  {STATUS_LABELS[property.status] || property.status}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 min-w-0">
                <span className="flex items-center gap-1 min-w-0">
                  <MapPin className="size-4 shrink-0" />
                  <span className="truncate">{property.address}, {property.city}{property.quarter ? ` - ${property.quarter}` : ""}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="size-4" />
                  {viewCount} vues
                </span>
              </div>
            </div>

            <ImageGallery images={property.images} selectedIndex={selectedImage} onSelect={setSelectedImage} title={property.title} />

            <div className="prose prose-gray max-w-none">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{property.description}</p>
            </div>

            <PropertyFeatures property={property} />

            {features.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Équipements</h2>
                <div className="flex flex-wrap gap-2">
                  {features.map((f) => (
                    <span key={f} className="bg-blue-50 text-blue-800 text-sm px-3 py-1.5 rounded-full">{f}</span>
                  ))}
                </div>
              </div>
            )}

            <AvailabilityCalendar bookedDates={bookedDates} isDateBooked={isDateBooked} />

            {property.latitude && property.longitude && (
              <PropertyMap latitude={property.latitude} longitude={property.longitude} />
            )}

            <PropertyTestimonials testimonials={testimonials} />
            <SimilarPropertiesGrid properties={similarProperties} />
          </div>
        </div>
      </main>
      <Footer />

      {/* Sticky Booking Bar */}
      {property.status === "AVAILABLE" && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200 pb-[env(safe-area-inset-bottom)]">
          <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-lg font-bold text-gray-900 truncate">
                {formatPrice(property.price, property.currency)}
                {property.pricePeriod && (
                  <span className="text-sm font-normal text-gray-500">/{property.pricePeriod === "nightly" ? "nuit" : property.pricePeriod === "weekly" ? "semaine" : property.pricePeriod === "monthly" ? "mois" : property.pricePeriod}</span>
                )}
              </p>
              {nights > 0 ? (
                <p className="text-xs text-gray-500">{nights} nuit{nights > 1 ? "s" : ""} · Total {formatPrice(pricing.total, property.currency)}</p>
              ) : checkIn ? (
                <p className="text-xs text-gray-500">{checkIn.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })} → {checkOut?.toLocaleDateString("fr-FR", { day: "numeric", month: "short" }) || "?"}</p>
              ) : (
                <p className="text-xs text-gray-400">Sélectionnez vos dates</p>
              )}
            </div>
            <button
              onClick={() => {
                if (!checkIn || !checkOut) { setBookingStep(1); setShowBookingPanel(true); }
                else if (!formData.guestName || !formData.guestEmail) { setBookingStep(2); setShowBookingPanel(true); }
                else { setBookingStep(3); setShowBookingPanel(true); }
              }}
              className="bg-[#0d47a1] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#0a3a82] active:scale-[0.98] transition-all shadow-lg shadow-[#0d47a1]/25 shrink-0"
            >
              Réserver
            </button>
          </div>
        </div>
      )}

      {/* Booking Slide-Up Panel */}
      {showBookingPanel && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowBookingPanel(false)} />
          <div className="relative w-full sm:max-w-lg sm:mx-4 max-h-[90vh] bg-white sm:rounded-2xl rounded-t-3xl overflow-hidden animate-fadeIn flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
              <div>
                <h3 className="font-bold text-gray-900">Réserver {property.title}</h3>
                <p className="text-sm text-gray-500">{formatPrice(property.price, property.currency)}{property.pricePeriod && `/${property.pricePeriod === "nightly" ? "nuit" : property.pricePeriod}`}</p>
              </div>
              <button onClick={() => setShowBookingPanel(false)} className="size-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <span className="text-xl leading-none">×</span>
              </button>
            </div>

            <div className="px-5 pt-4 pb-2 shrink-0">
              <div className="flex items-center gap-3">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-3 flex-1">
                    <div className={`flex items-center justify-center size-8 rounded-full text-sm font-semibold transition-all duration-300 ${
                      bookingStep === s ? "bg-[#0d47a1] text-white scale-110 shadow-md shadow-[#0d47a1]/30"
                      : bookingStep > s ? "bg-[#0d47a1] text-white"
                      : "bg-gray-100 text-gray-400"
                    }`}>
                      {bookingStep > s ? <Check className="size-4" /> : s}
                    </div>
                    {s < 3 && <div className={`flex-1 h-0.5 rounded-full transition-all duration-500 ${bookingStep > s ? "bg-[#0d47a1]" : "bg-gray-100"}`} />}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <span className={`text-xs font-medium ${bookingStep >= 1 ? "text-[#0d47a1]" : "text-gray-400"}`}>Dates</span>
                <span className={`text-xs font-medium ${bookingStep >= 2 ? "text-[#0d47a1]" : "text-gray-400"}`}>Infos</span>
                <span className={`text-xs font-medium ${bookingStep >= 3 ? "text-[#0d47a1]" : "text-gray-400"}`}>Confirm.</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 pb-6 pb-[calc(24px+env(safe-area-inset-bottom,0px))]">
              <form onSubmit={handleSubmitBooking}>
                {bookingStep === 1 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="grid grid-cols-2 gap-3">
                      <button type="button" onClick={() => setShowRangeCalendar(true)} className={`text-left p-3 rounded-xl border-2 transition-all duration-200 ${checkIn ? "border-[#0d47a1] bg-[#0d47a1]/5" : "border-gray-200 hover:border-gray-300 bg-gray-50"}`}>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Arrivée</span>
                        <p className={`text-sm font-semibold mt-0.5 ${checkIn ? "text-gray-900" : "text-gray-300"}`}>
                          {checkIn ? checkIn.toLocaleDateString("fr-FR", { day: "numeric", month: "short" }) : "Sélectionner"}
                        </p>
                      </button>
                      <button type="button" onClick={() => checkIn && setShowRangeCalendar(true)} className={`text-left p-3 rounded-xl border-2 transition-all duration-200 ${checkOut ? "border-[#0d47a1] bg-[#0d47a1]/5" : "border-gray-200 hover:border-gray-300 bg-gray-50"}`}>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Départ</span>
                        <p className={`text-sm font-semibold mt-0.5 ${checkOut ? "text-gray-900" : "text-gray-300"}`}>
                          {checkOut ? checkOut.toLocaleDateString("fr-FR", { day: "numeric", month: "short" }) : "Sélectionner"}
                        </p>
                      </button>
                    </div>
                    {showRangeCalendar && (
                      <div className="border border-gray-100 rounded-xl p-3 bg-gray-50/50">
                        <DatePicker mode="range" selected={checkIn && checkOut ? { from: checkIn, to: checkOut } : undefined}
                          onSelect={(range) => { setCheckIn(range?.from); setCheckOut(range?.to); if (range?.from && range?.to) setShowRangeCalendar(false); }}
                          disabled={(date) => isDateBooked(date) || date < new Date(new Date().setHours(0, 0, 0, 0))} locale={fr} numberOfMonths={isDesktop ? 2 : 1} className="w-full" />
                      </div>
                    )}
                    {!showRangeCalendar && (
                      <button type="button" onClick={() => setShowRangeCalendar(true)} className="w-full py-2.5 text-sm font-medium text-[#0d47a1] bg-[#0d47a1]/5 hover:bg-[#0d47a1]/10 rounded-xl transition-colors">
                        {checkIn && checkOut ? "Modifier les dates" : "Choisir les dates"}
                      </button>
                    )}
                    {nights > 0 && (
                      <div className="flex items-center gap-2 bg-[#0d47a1]/5 rounded-xl px-4 py-2.5">
                        <Calendar className="size-4 text-[#0d47a1]" />
                        <span className="text-sm font-medium text-[#0d47a1]">{nights} nuit{nights > 1 ? "s" : ""}</span>
                      </div>
                    )}
                    <button type="button" onClick={() => checkIn && checkOut && setBookingStep(2)} disabled={!checkIn || !checkOut}
                      className="w-full bg-[#0d47a1] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#0a3a82] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]">
                      Continuer
                    </button>
                  </div>
                )}

                {bookingStep === 2 && (
                  <div className="space-y-3 animate-fadeIn">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Voyageurs</label>
                      <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-1">
                        <button type="button" onClick={() => setGuestCount(Math.max(1, guestCount - 1))} className="size-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors font-medium">−</button>
                        <span className="flex-1 text-center font-semibold text-gray-900">{guestCount} voyageur{guestCount > 1 ? "s" : ""}</span>
                        <button type="button" onClick={() => setGuestCount(Math.min(property.maxGuests || 10, guestCount + 1))} className="size-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors font-medium">+</button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Nom complet</label>
                      <input type="text" placeholder="Jean Dupont" required value={formData.guestName} onChange={(e) => setFormData({ ...formData, guestName: e.target.value })} className="w-full h-11 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#0d47a1] focus:ring-2 focus:ring-[#0d47a1]/10 transition-all bg-gray-50 placeholder:text-gray-300" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
                      <input type="email" placeholder="jean@exemple.com" required value={formData.guestEmail} onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })} className="w-full h-11 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#0d47a1] focus:ring-2 focus:ring-[#0d47a1]/10 transition-all bg-gray-50 placeholder:text-gray-300" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Téléphone <span className="text-gray-300 normal-case">(optionnel)</span></label>
                      <input type="tel" placeholder="+212 6 21 18 94 96" value={formData.guestPhone} onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })} className="w-full h-11 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#0d47a1] focus:ring-2 focus:ring-[#0d47a1]/10 transition-all bg-gray-50 placeholder:text-gray-300" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Message <span className="text-gray-300 normal-case">(optionnel)</span></label>
                      <textarea placeholder="Demandes spéciales, occasion particulière..." rows={2} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#0d47a1] focus:ring-2 focus:ring-[#0d47a1]/10 transition-all resize-none bg-gray-50 placeholder:text-gray-300" />
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button type="button" onClick={() => setBookingStep(1)} className="px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Retour</button>
                      <button type="button" onClick={() => formData.guestName && formData.guestEmail && setBookingStep(3)} disabled={!formData.guestName || !formData.guestEmail} className="flex-1 bg-[#0d47a1] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#0a3a82] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]">Vérifier</button>
                    </div>
                  </div>
                )}

                {bookingStep === 3 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-[#0d47a1]/10 flex items-center justify-center"><Calendar className="size-5 text-[#0d47a1]" /></div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{checkIn?.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })} → {checkOut?.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}</p>
                          <p className="text-xs text-gray-500">{nights} nuit{nights > 1 ? "s" : ""} · {guestCount} voyageur{guestCount > 1 ? "s" : ""}</p>
                        </div>
                      </div>
                      <div className="h-px bg-gray-200" />
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-[#0d47a1]/10 flex items-center justify-center"><span className="text-[#0d47a1] font-bold text-sm">{formData.guestName.charAt(0)}</span></div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{formData.guestName}</p>
                          <p className="text-xs text-gray-500">{formData.guestEmail}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2.5 text-sm">
                      <div className="flex justify-between text-gray-600"><span>{formatPrice(pricing.nightlyRate, property.currency)} × {nights}{nights > 1 ? ` nuits` : ` nuit`}</span><span className="font-medium text-gray-900">{formatPrice(pricing.subtotal, property.currency)}</span></div>
                      {pricing.cleaning > 0 && <div className="flex justify-between text-gray-600"><span>Frais de ménage</span><span className="font-medium text-gray-900">{formatPrice(pricing.cleaning, property.currency)}</span></div>}
                      {pricing.service > 0 && <div className="flex justify-between text-gray-600"><span>Frais de service</span><span className="font-medium text-gray-900">{formatPrice(pricing.service, property.currency)}</span></div>}
                      <div className="h-px bg-gray-200" />
                      <div className="flex justify-between font-bold text-gray-900 text-base pt-0.5"><span>Total</span><span>{formatPrice(pricing.total, property.currency)}</span></div>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setBookingStep(2)} className="px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Retour</button>
                      <button type="submit" disabled={submitting} className="flex-1 bg-[#0d47a1] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#0a3a82] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.98]">
                        {submitting ? (<><span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Envoi...</>) : (<><Send className="size-4" />Confirmer la demande</>)}
                      </button>
                    </div>
                    {submitMessage && (
                      <div className={`flex items-center gap-2 p-3 rounded-xl text-sm font-medium ${submitMessage.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                        {submitMessage.type === "success" ? <Check className="size-4 shrink-0" /> : <span className="shrink-0">!</span>}
                        {submitMessage.text}
                      </div>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
