"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Search, Calendar, MapPin, User, Hash, CheckCircle, XCircle, Clock, Ban } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface BookingData {
  id: string;
  referenceCode: string;
  status: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  totalPrice: number | null;
  guestName: string;
  property: {
    title: string;
    address: string;
    city: string;
  };
}

const STATUS_CONFIG: Record<string, { icon: typeof CheckCircle; color: string; bg: string; labelKey: string }> = {
  PENDING: { icon: Clock, color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200", labelKey: "pending" },
  CONFIRMED: { icon: CheckCircle, color: "text-green-700", bg: "bg-green-50 border-green-200", labelKey: "confirmed" },
  REJECTED: { icon: XCircle, color: "text-red-700", bg: "bg-red-50 border-red-200", labelKey: "rejected" },
  CANCELLED: { icon: Ban, color: "text-gray-600", bg: "bg-gray-50 border-gray-200", labelKey: "cancelled" },
};

export default function BookingsPage() {
  const t = useTranslations("myBookings");
  const [email, setEmail] = useState("");
  const [referenceCode, setReferenceCode] = useState("");
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setBooking(null);
    setSearched(true);

    try {
      const res = await fetch("/api/bookings/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, referenceCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t("notFound"));
        return;
      }

      setBooking(data.booking);
    } catch {
      setError(t("notFound"));
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="max-w-[600px] mx-auto px-4 pt-10 pb-20">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t("title")}</h1>
            <p className="text-gray-500 text-sm">{t("subtitle")}</p>
          </div>

          <form onSubmit={handleLookup} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 mb-8">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{t("emailLabel")}</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jean@exemple.com"
                className="w-full h-11 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#0d47a1] focus:ring-2 focus:ring-[#0d47a1]/10 transition-all bg-gray-50 placeholder:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{t("referenceLabel")}</label>
              <input
                type="text"
                required
                value={referenceCode}
                onChange={(e) => setReferenceCode(e.target.value.toUpperCase())}
                placeholder="AB12CD34"
                maxLength={8}
                className="w-full h-11 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#0d47a1] focus:ring-2 focus:ring-[#0d47a1]/10 transition-all bg-gray-50 placeholder:text-gray-300 uppercase tracking-widest font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0d47a1] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#0a3a82] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t("searching")}
                </>
              ) : (
                <>
                  <Search className="size-4" />
                  {t("lookupBtn")}
                </>
              )}
            </button>
          </form>

          {searched && !loading && error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
              <XCircle className="size-8 text-red-400 mx-auto mb-2" />
              <p className="text-red-700 font-medium text-sm">{error}</p>
            </div>
          )}

          {booking && (
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className={`px-6 py-4 border-b ${STATUS_CONFIG[booking.status]?.bg || "bg-gray-50 border-gray-200"}`}>
                <div className="flex items-center gap-2">
                  {(() => {
                    const cfg = STATUS_CONFIG[booking.status] || STATUS_CONFIG.PENDING;
                    const Icon = cfg.icon;
                    return <Icon className={`size-5 ${cfg.color}`} />;
                  })()}
                  <span className={`font-semibold text-sm ${STATUS_CONFIG[booking.status]?.color || "text-gray-700"}`}>
                    {t("status")}: {t(`statusValues.${booking.status.toLowerCase()}`)}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="size-5 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{t("property")}</p>
                    <p className="text-sm font-medium text-gray-900">{booking.property.title}</p>
                    <p className="text-xs text-gray-500">{booking.property.address}, {booking.property.city}</p>
                  </div>
                </div>

                <div className="h-px bg-gray-100" />

                <div className="flex items-start gap-3">
                  <Calendar className="size-5 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{t("dates")}</p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatDate(booking.checkIn)} → {formatDate(booking.checkOut)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {booking.guestsCount} {t("guests")}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-gray-100" />

                <div className="flex items-start gap-3">
                  <User className="size-5 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{t("guest")}</p>
                    <p className="text-sm font-medium text-gray-900">{booking.guestName}</p>
                  </div>
                </div>

                {booking.totalPrice != null && (
                  <>
                    <div className="h-px bg-gray-100" />
                    <div className="flex items-start gap-3">
                      <Hash className="size-5 text-gray-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{t("total")}</p>
                        <p className="text-sm font-medium text-gray-900">{booking.totalPrice.toLocaleString("fr-FR")} EUR</p>
                      </div>
                    </div>
                  </>
                )}

                {booking.referenceCode && (
                  <>
                    <div className="h-px bg-gray-100" />
                    <div className="flex items-start gap-3">
                      <Hash className="size-5 text-gray-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{t("referenceLabel")}</p>
                        <p className="text-sm font-mono font-medium text-gray-900 tracking-wider">{booking.referenceCode}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
