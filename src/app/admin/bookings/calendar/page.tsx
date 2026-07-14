"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { AdminPageHeader } from "@/components/admin";
import { StatusBadge } from "@/components/admin";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  CalendarDays,
} from "lucide-react";

interface Booking {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string | null;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  totalPrice: number | null;
  status: string;
  message: string | null;
  adminNotes: string | null;
  createdAt: string;
  property: { title: string; slug: string };
}

const STATUS_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  PENDING: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-400" },
  CONFIRMED: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-400" },
  REJECTED: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-400" },
  CANCELLED: { bg: "bg-gray-100", text: "text-gray-500", dot: "bg-gray-400" },
};

const FRENCH_DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const FRENCH_MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function isDateInRange(dateStr: string, checkIn: string, checkOut: string) {
  const d = new Date(dateStr).getTime();
  const ci = new Date(checkIn).getTime();
  const co = new Date(checkOut).getTime();
  return d >= ci && d < co;
}

export default function AdminCalendarPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [detailBooking, setDetailBooking] = useState<Booking | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings?limit=500");
      const data = await res.json();
      setBookings(data.data || []);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/bookings?limit=500");
        const data = await res.json();
        if (!cancelled) setBookings(data.data || []);
      } catch {
        if (!cancelled) setBookings([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchBookings();
        setDetailBooking(null);
      }
    } finally {
      setActionLoading(null);
    }
  };

  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days: { date: Date; isCurrentMonth: boolean; bookings: Booking[] }[] = [];

    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, prevMonthDays - i);
      days.push({ date: d, isCurrentMonth: false, bookings: [] });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(year, month, i);
      const dateStr = d.toISOString().split("T")[0];
      const dayBookings = bookings.filter(
        (b) => isDateInRange(dateStr, b.checkIn, b.checkOut) || dateStr === b.checkIn.split("T")[0]
      );
      days.push({ date: d, isCurrentMonth: true, bookings: dayBookings });
    }

    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(year, month + 1, i);
      days.push({ date: d, isCurrentMonth: false, bookings: [] });
    }

    return days;
  }, [year, month, bookings]);

  const goToToday = () => setCurrentDate(new Date());
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div>
      <AdminPageHeader
        title="Calendrier"
        description={`${bookings.length} réservation${bookings.length > 1 ? "s" : ""} au total`}
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Réservations", href: "/admin/bookings" },
          { label: "Calendrier" },
        ]}
        action={{ label: "Rafraîchir", onClick: fetchBookings, icon: CalendarDays }}
      />

      {/* Calendar header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={prevMonth}
            className="p-2 rounded-lg border border-gray-200/60 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 active:bg-gray-100 active:scale-[0.97] transition-all duration-150"
          >
            <ChevronLeft size={16} />
          </button>
          <h2 className="text-lg font-bold text-gray-900 min-w-[180px] text-center">
            {FRENCH_MONTHS[month]} {year}
          </h2>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg border border-gray-200/60 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 active:bg-gray-100 active:scale-[0.97] transition-all duration-150"
          >
            <ChevronRight size={16} />
          </button>
        </div>
        <button
          onClick={goToToday}
          className="px-3 py-1.5 rounded-lg text-[12px] font-semibold border border-gray-200/60 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800 active:bg-gray-100 active:scale-[0.97] transition-all duration-150"
        >
          Aujourd&apos;hui
        </button>
      </div>

      {/* Calendar grid */}
      <div className="bg-white rounded-xl border border-gray-200/60 overflow-hidden">
        {/* Day names header */}
        <div className="grid grid-cols-7 border-b border-gray-200/60">
          {FRENCH_DAYS.map((day) => (
            <div
              key={day}
              className="py-2.5 text-center text-[11px] font-semibold uppercase tracking-wider text-gray-500 border-r border-gray-100 last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7">
          {calendarDays.map((cell, idx) => {
            const isToday =
              cell.date.toISOString().split("T")[0] ===
              new Date().toISOString().split("T")[0];
            return (
              <div
                key={idx}
                className={`min-h-[100px] p-1.5 border-r border-b border-gray-100 last:border-r-0 transition-colors duration-150 ${
                  cell.isCurrentMonth ? "bg-white" : "bg-gray-50/50"
                } ${isToday ? "ring-2 ring-inset ring-blue-500/30" : ""}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-[12px] font-medium w-6 h-6 flex items-center justify-center rounded-full ${
                      isToday
                        ? "bg-[#0d47a1] text-white"
                        : cell.isCurrentMonth
                        ? "text-gray-700"
                        : "text-gray-400"
                    }`}
                  >
                    {cell.date.getDate()}
                  </span>
                  {cell.bookings.length > 0 && (
                    <span className="text-[10px] font-semibold text-gray-400 bg-gray-100 rounded-full px-1.5 py-0.5 leading-none">
                      {cell.bookings.length}
                    </span>
                  )}
                </div>
                <div className="space-y-0.5">
                  {cell.bookings.slice(0, 3).map((b) => {
                    const colors = STATUS_COLORS[b.status] || STATUS_COLORS.PENDING;
                    return (
                      <button
                        key={b.id}
                        onClick={() => setDetailBooking(b)}
                        className={`w-full text-left px-1.5 py-0.5 rounded text-[10px] font-medium truncate transition-all duration-150 hover:opacity-80 active:scale-[0.98] ${colors.bg} ${colors.text}`}
                        title={`${b.guestName} — ${b.property.title}`}
                      >
                        {b.guestName}
                      </button>
                    );
                  })}
                  {cell.bookings.length > 3 && (
                    <span className="block text-[10px] text-gray-400 text-center font-medium">
                      +{cell.bookings.length - 3}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 flex-wrap">
        {Object.entries(STATUS_COLORS).map(([status, colors]) => (
          <div key={status} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
            <span className="text-[11px] font-medium text-gray-500">
              {status === "PENDING"
                ? "En attente"
                : status === "CONFIRMED"
                ? "Confirmée"
                : status === "REJECTED"
                ? "Refusée"
                : "Annulée"}
            </span>
          </div>
        ))}
      </div>

      {/* Detail dialog */}
      <Dialog open={!!detailBooking} onOpenChange={(open) => !open && setDetailBooking(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Détails de la réservation</DialogTitle>
            <DialogDescription>{detailBooking?.property.title}</DialogDescription>
          </DialogHeader>
          {detailBooking && (
            <div className="space-y-4 text-[13px]">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Client", value: detailBooking.guestName },
                  { label: "Email", value: detailBooking.guestEmail },
                  { label: "Téléphone", value: detailBooking.guestPhone || "—" },
                  { label: "Voyageurs", value: detailBooking.guestsCount.toString() },
                  { label: "Arrivée", value: formatDate(detailBooking.checkIn) },
                  { label: "Départ", value: formatDate(detailBooking.checkOut) },
                  { label: "Prix total", value: detailBooking.totalPrice ? `${detailBooking.totalPrice} €` : "—" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-gray-400 text-[11px] font-medium uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className="font-medium text-gray-900">{item.value}</p>
                  </div>
                ))}
                <div>
                  <p className="text-gray-400 text-[11px] font-medium uppercase tracking-wider mb-0.5">Statut</p>
                  <StatusBadge status={detailBooking.status} />
                </div>
              </div>
              {detailBooking.message && (
                <div>
                  <p className="text-gray-400 text-[11px] font-medium uppercase tracking-wider mb-1">Message</p>
                  <p className="bg-gray-50 p-3 rounded-lg text-[13px] text-gray-700 leading-relaxed">{detailBooking.message}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            {detailBooking?.status === "PENDING" && (
              <>
                <Button
                  size="sm"
                  onClick={() => handleStatusChange(detailBooking.id, "CONFIRMED")}
                  disabled={actionLoading === detailBooking.id}
                  className="h-8 text-[12px] font-medium rounded-lg"
                >
                  <CheckCircle size={13} className="mr-1" />
                  Confirmer
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleStatusChange(detailBooking.id, "REJECTED")}
                  disabled={actionLoading === detailBooking.id}
                  className="h-8 text-[12px] font-medium rounded-lg"
                >
                  <XCircle size={13} className="mr-1" />
                  Refuser
                </Button>
              </>
            )}
            {detailBooking?.status === "CONFIRMED" && (
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleStatusChange(detailBooking.id, "CANCELLED")}
                disabled={actionLoading === detailBooking.id}
                className="h-8 text-[12px] font-medium rounded-lg"
              >
                Annuler
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
