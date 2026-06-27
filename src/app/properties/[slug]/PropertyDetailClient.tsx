"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  BedDouble,
  Bath,
  Car,
  Users,
  Maximize,
  Home,
  Calendar,
  Heart,
  Share2,
  Copy,
  Check,
  Send,
  Star,
  ArrowLeft,
  Eye,
  Clock,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar as DatePicker } from "@/components/ui/calendar";
import { fr } from "date-fns/locale";

interface PropertyImage {
  id: string;
  url: string;
  alt?: string | null;
  isPrimary: boolean;
  sortOrder: number;
}

interface PropertyData {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: string;
  status: string;
  price: number;
  currency: string;
  pricePeriod?: string;
  address: string;
  city: string;
  quarter?: string;
  latitude?: number;
  longitude?: number;
  bedrooms: number;
  bathrooms: number;
  garages: number;
  maxGuests?: number;
  plotArea?: number;
  builtArea?: number;
  yearBuilt?: number;
  features: string[] | string;
  cleaningFee?: number;
  serviceFee?: number;
  minStay?: number;
  maxStay?: number;
  checkInTime?: string;
  checkOutTime?: string;
  isFeatured: boolean;
  images: PropertyImage[];
  createdAt: string;
  updatedAt: string;
}

interface Booking {
  checkIn: string;
  checkOut: string;
}

interface Testimonial {
  id: string;
  guestName: string;
  guestCountry?: string;
  duration?: string;
  year?: number;
  rating?: number;
  reviewText?: string;
}

interface SimilarProperty {
  id: string;
  title: string;
  slug: string;
  type: string;
  price: number;
  currency: string;
  pricePeriod?: string;
  bedrooms: number;
  bathrooms: number;
  address: string;
  city: string;
  quarter?: string;
  image: string | null;
  viewCount: number;
}

interface PropertyDetailClientProps {
  property: PropertyData;
  bookings: Booking[];
  viewCount: number;
  testimonials: Testimonial[];
  similarProperties: SimilarProperty[];
}

const TYPE_LABELS: Record<string, string> = {
  VILLA: "Villa",
  APARTMENT: "Appartement",
  HOUSE: "Maison",
  LAND: "Terrain",
  COMMERCIAL: "Commercial",
};

const TYPE_COLORS: Record<string, string> = {
  VILLA: "bg-purple-100 text-purple-800",
  APARTMENT: "bg-blue-100 text-blue-800",
  HOUSE: "bg-green-100 text-green-800",
  LAND: "bg-yellow-100 text-yellow-800",
  COMMERCIAL: "bg-red-100 text-red-800",
};

const STATUS_LABELS: Record<string, string> = {
  AVAILABLE: "Disponible",
  SOLD: "Vendu",
  RENTED: "Loué",
  PENDING: "En attente",
};

const STATUS_COLORS: Record<string, string> = {
  AVAILABLE: "bg-green-100 text-green-800",
  SOLD: "bg-red-100 text-red-800",
  RENTED: "bg-blue-100 text-blue-800",
  PENDING: "bg-yellow-100 text-yellow-800",
};

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
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
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [copied, setCopied] = useState(false);
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [guestCount, setGuestCount] = useState(1);
  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showMap, setShowMap] = useState(false);

  const isRental = property.pricePeriod === "nightly" || property.pricePeriod === "weekly" || property.pricePeriod === "monthly" || !!property.minStay || !!property.checkInTime;

  const features: string[] = useMemo(() => {
    if (Array.isArray(property.features)) return property.features;
    if (typeof property.features === "string") {
      try {
        return JSON.parse(property.features);
      } catch {
        return [];
      }
    }
    return [];
  }, [property.features]);

  const bookedDates = useMemo(() => {
    const dates: { start: Date; end: Date }[] = [];
    for (const b of bookings) {
      dates.push({ start: new Date(b.checkIn), end: new Date(b.checkOut) });
    }
    return dates;
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
    const sessionId = getSessionId();
    if (sessionId) {
      fetch(`/api/favorites?propertyId=${property.id}&sessionId=${sessionId}`)
        .then((r) => r.json())
        .then((data) => setIsFavorited(data.favorited))
        .catch(() => {});
    }

    fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ propertyId: property.id }),
    }).catch(() => {});
  }, [property.id]);

  const isDateBooked = useCallback(
    (date: Date) => {
      const day = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const nextDay = new Date(day);
      nextDay.setDate(nextDay.getDate() + 1);
      return bookedDates.some((b) => isDateRangeOverlapping(day, nextDay, b.start, b.end));
    },
    [bookedDates]
  );

  const toggleFavorite = async () => {
    const sessionId = getSessionId();
    if (!sessionId) return;
    const method = isFavorited ? "DELETE" : "POST";
    const url = isFavorited
      ? `/api/favorites?propertyId=${property.id}&sessionId=${sessionId}`
      : "/api/favorites";
    const body = isFavorited ? undefined : JSON.stringify({ propertyId: property.id, sessionId });
    await fetch(url, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body,
    });
    setIsFavorited(!isFavorited);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOn = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Découvrez ${property.title} sur StaysInMarrakech`);
    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
    };
    if (urls[platform]) window.open(urls[platform], "_blank", "width=600,height=400");
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkIn || !checkOut) {
      setSubmitMessage({ type: "error", text: "Veuillez sélectionner vos dates d'arrivée et de départ" });
      return;
    }

    setSubmitting(true);
    setSubmitMessage(null);

    try {
      const res = await fetch("/api/bookings", {
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
        <div className="max-w-[1200px] mx-auto px-4 py-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-[#0d47a1] transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="size-4" />
            Retour
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
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
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {property.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="size-4" />
                    {property.address}, {property.city}
                    {property.quarter ? ` - ${property.quarter}` : ""}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="size-4" />
                    {viewCount} vues
                  </span>
                </div>
              </div>

              <div className="relative h-[300px] md:h-[450px] rounded-xl overflow-hidden">
                {property.images[selectedImage] ? (
                  <Image
                    src={property.images[selectedImage].url}
                    alt={property.images[selectedImage].alt || property.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                    Aucune image
                  </div>
                )}
              </div>

              {property.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {property.images.map((img, i) => (
                    <button
                      key={img.id}
                      onClick={() => setSelectedImage(i)}
                      className={`relative w-20 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-colors ${
                        i === selectedImage ? "border-[#0d47a1]" : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={img.url}
                        alt={img.alt || `${property.title} ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}

              <div className="prose prose-gray max-w-none">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Caractéristiques</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {[
                    { icon: BedDouble, label: "Chambres", value: property.bedrooms },
                    { icon: Bath, label: "Salles de bain", value: property.bathrooms },
                    { icon: Car, label: "Garages", value: property.garages },
                    { icon: Users, label: "Max. voyageurs", value: property.maxGuests },
                    { icon: Maximize, label: "Terrain", value: property.plotArea ? `${property.plotArea} m²` : null },
                    { icon: Home, label: "Surface construite", value: property.builtArea ? `${property.builtArea} m²` : null },
                    { icon: Calendar, label: "Année construction", value: property.yearBuilt },
                    { icon: Clock, label: "Min. séjour", value: property.minStay ? `${property.minStay} nuits` : null },
                  ]
                    .filter((item) => item.value !== null && item.value !== undefined && item.value !== 0)
                    .map((item) => (
                      <div
                        key={item.label}
                        className="bg-gray-50 rounded-lg p-3 text-center"
                      >
                        <item.icon className="size-5 text-[#0d47a1] mx-auto mb-1" />
                        <p className="text-lg font-bold text-gray-900">{item.value}</p>
                        <p className="text-xs text-gray-500">{item.label}</p>
                      </div>
                    ))}
                </div>
              </div>

              {features.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Équipements</h2>
                  <div className="flex flex-wrap gap-2">
                    {features.map((f) => (
                      <span
                        key={f}
                        className="bg-blue-50 text-blue-800 text-sm px-3 py-1.5 rounded-full"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Disponibilité</h2>
                <div className="bg-gray-50 rounded-xl p-4 inline-block">
                  <DatePicker
                    mode="multiple"
                    selected={bookedDates.flatMap((b) => {
                      const dates: Date[] = [];
                      const d = new Date(b.start);
                      while (d < b.end) {
                        dates.push(new Date(d));
                        d.setDate(d.getDate() + 1);
                      }
                      return dates;
                    })}
                    disabled={[]}
                    locale={fr}
                    className="rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-200 border border-red-300" />
                    Réservé
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-green-200 border border-green-300" />
                    Disponible
                  </span>
                </div>
              </div>

              {property.latitude && property.longitude && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Emplacement</h2>
                  <button
                    onClick={() => setShowMap(!showMap)}
                    className="text-sm text-[#0d47a1] hover:underline mb-3 flex items-center gap-1"
                  >
                    <MapPin className="size-4" />
                    {showMap ? "Masquer la carte" : "Voir sur la carte"}
                  </button>
                  {showMap && (
                    <div className="h-[350px] rounded-xl overflow-hidden border border-gray-200">
                      <iframe
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${property.longitude - 0.01}%2C${property.latitude - 0.01}%2C${property.longitude + 0.01}%2C${property.latitude + 0.01}&layer=mapnik&marker=${property.latitude}%2C${property.longitude}`}
                        className="w-full h-full border-0"
                        loading="lazy"
                        title="Emplacement de la propriété"
                      />
                    </div>
                  )}
                </div>
              )}

              {testimonials.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Avis</h2>
                  <div className="space-y-4">
                    {testimonials.map((t) => (
                      <div key={t.id} className="bg-gray-50 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-semibold text-gray-900">{t.guestName}</p>
                            {t.guestCountry && (
                              <p className="text-sm text-gray-500">{t.guestCountry}</p>
                            )}
                          </div>
                          {t.rating && (
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`size-4 ${i < t.rating! ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        {t.reviewText && (
                          <p className="text-gray-600 text-sm leading-relaxed">{t.reviewText}</p>
                        )}
                        {(t.duration || t.year) && (
                          <p className="text-xs text-gray-400 mt-2">
                            {[t.duration, t.year].filter(Boolean).join(" - ")}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {similarProperties.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Propriétés similaires</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {similarProperties.map((sp) => (
                      <Link
                        key={sp.id}
                        href={`/properties/${sp.slug}`}
                        className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                      >
                        <div className="relative h-36">
                          {sp.image ? (
                            <Image
                              src={sp.image}
                              alt={sp.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 640px) 100vw, 33vw"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100" />
                          )}
                        </div>
                        <div className="p-3">
                          <h3 className="font-semibold text-gray-900 text-sm line-clamp-1 group-hover:text-[#0d47a1] transition-colors">
                            {sp.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {sp.bedrooms} ch. · {sp.bathrooms} sdb
                          </p>
                          <p className="text-sm font-bold text-[#0d47a1] mt-1">
                            {formatPrice(sp.price, sp.currency)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <p className="text-3xl font-bold text-[#0d47a1] mb-1">
                    {formatPrice(property.price, property.currency)}
                  </p>
                  {property.pricePeriod && (
                    <p className="text-sm text-gray-500 mb-4">
                      /{property.pricePeriod === "nightly" ? "nuit" : property.pricePeriod === "weekly" ? "semaine" : property.pricePeriod === "monthly" ? "mois" : property.pricePeriod}
                    </p>
                  )}
                  {!property.pricePeriod && (
                    <p className="text-sm text-gray-500 mb-4">Prix</p>
                  )}

                  <div className="flex items-center gap-2 mb-4">
                    <button
                      onClick={toggleFavorite}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isFavorited
                          ? "bg-red-50 text-red-600 hover:bg-red-100"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Heart className={`size-4 ${isFavorited ? "fill-current" : ""}`} />
                      {isFavorited ? "Enregistré" : "Enregistrer"}
                    </button>
                    <div className="relative group">
                      <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                        <Share2 className="size-4" />
                        Partager
                      </button>
                      <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-2 min-w-[160px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                        <button
                          onClick={copyLink}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                        >
                          {copied ? <Check className="size-4 text-green-600" /> : <Copy className="size-4" />}
                          {copied ? "Copié !" : "Copier le lien"}
                        </button>
                        <button
                          onClick={() => shareOn("facebook")}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                        >
                          Facebook
                        </button>
                        <button
                          onClick={() => shareOn("whatsapp")}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                        >
                          WhatsApp
                        </button>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmitBooking} className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Arrivée</label>
                      <DatePicker
                        mode="single"
                        selected={checkIn}
                        onSelect={(day) => setCheckIn(day)}
                        disabled={(date) => isDateBooked(date) || date < new Date(new Date().setHours(0, 0, 0, 0))}
                        locale={fr}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Départ</label>
                      <DatePicker
                        mode="single"
                        selected={checkOut}
                        onSelect={(day) => setCheckOut(day)}
                        disabled={(date) => isDateBooked(date) || date <= (checkIn || new Date())}
                        locale={fr}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Voyageurs</label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(parseInt(e.target.value))}
                        className="w-full h-9 rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                      >
                        {Array.from({ length: property.maxGuests || 10 }).map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} voyageur{i > 0 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>

                    {nights > 0 && (
                      <div className="bg-gray-50 rounded-lg p-3 text-sm space-y-1.5">
                        <div className="flex justify-between text-gray-600">
                          <span>
                            {formatPrice(pricing.nightlyRate, property.currency)} × {nights} nuit{nights > 1 ? "s" : ""}
                          </span>
                          <span>{formatPrice(pricing.subtotal, property.currency)}</span>
                        </div>
                        {pricing.cleaning > 0 && (
                          <div className="flex justify-between text-gray-600">
                            <span>Frais de ménage</span>
                            <span>{formatPrice(pricing.cleaning, property.currency)}</span>
                          </div>
                        )}
                        {pricing.service > 0 && (
                          <div className="flex justify-between text-gray-600">
                            <span>Frais de service</span>
                            <span>{formatPrice(pricing.service, property.currency)}</span>
                          </div>
                        )}
                        <div className="flex justify-between font-bold text-gray-900 pt-1.5 border-t border-gray-200">
                          <span>Total</span>
                          <span>{formatPrice(pricing.total, property.currency)}</span>
                        </div>
                      </div>
                    )}

                    <input
                      type="text"
                      placeholder="Votre nom"
                      required
                      value={formData.guestName}
                      onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                      className="w-full h-9 rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <input
                      type="email"
                      placeholder="Votre email"
                      required
                      value={formData.guestEmail}
                      onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
                      className="w-full h-9 rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <input
                      type="tel"
                      placeholder="Téléphone (optionnel)"
                      value={formData.guestPhone}
                      onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
                      className="w-full h-9 rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <textarea
                      placeholder="Message (optionnel)"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                    />

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#0d47a1] text-white py-3 rounded-lg font-medium hover:bg-[#0a3a82] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Send className="size-4" />
                      {submitting ? "Envoi..." : "Demander une réservation"}
                    </button>

                    {submitMessage && (
                      <p
                        className={`text-sm text-center ${
                          submitMessage.type === "success" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {submitMessage.text}
                      </p>
                    )}
                  </form>
                </div>

                {(property.checkInTime || property.checkOutTime || property.minStay) && (
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                  {property.checkInTime && (
                    <p>Check-in : {property.checkInTime}</p>
                  )}
                  {property.checkOutTime && (
                    <p>Check-out : {property.checkOutTime}</p>
                  )}
                  {property.minStay && (
                    <p>Séjour minimum : {property.minStay} nuits</p>
                  )}
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
