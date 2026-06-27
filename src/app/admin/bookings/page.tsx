"use client";

import { useEffect, useState, useCallback } from "react";
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
import { EmptyState } from "@/components/admin";
import { TableSkeleton } from "@/components/admin";
import { CheckCircle, XCircle, Eye, RefreshCw, CalendarDays } from "lucide-react";

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

const STATUS_FILTERS = ["ALL", "PENDING", "CONFIRMED", "REJECTED", "CANCELLED"] as const;
const STATUS_LABELS: Record<string, string> = {
  ALL: "Toutes",
  PENDING: "En attente",
  CONFIRMED: "Confirmée",
  REJECTED: "Refusée",
  CANCELLED: "Annulée",
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("ALL");
  const [detailBooking, setDetailBooking] = useState<Booking | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const url = filter === "ALL" ? "/api/bookings" : `/api/bookings?status=${filter}`;
      const res = await fetch(url);
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const url = filter === "ALL" ? "/api/bookings" : `/api/bookings?status=${filter}`;
        const res = await fetch(url);
        const data = await res.json();
        if (!cancelled) setBookings(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled) setBookings([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [filter]);

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

  const formatDate = (d: string) => new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div>
      <AdminPageHeader
        title="Réservations"
        description={`${bookings.length} réservation${bookings.length > 1 ? "s" : ""}`}
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Réservations" }]}
        action={{ label: "Rafraîchir", onClick: fetchBookings, icon: RefreshCw }}
      />

      <div className="flex gap-2 flex-wrap mb-6">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === s
                ? "bg-gray-900 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-6">
            <TableSkeleton rows={5} cols={6} />
          </div>
        ) : bookings.length === 0 ? (
          <EmptyState
            icon={CalendarDays}
            title="Aucune réservation"
            description="Les réservations apparaîtront ici une fois qu&apos;elles seront faites."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Client</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Propriété</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Arrivée</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Départ</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Statut</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3.5">
                      <p className="font-medium text-sm text-gray-900">{b.guestName}</p>
                      <p className="text-xs text-gray-500">{b.guestEmail}</p>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-gray-700">{b.property.title}</td>
                    <td className="px-6 py-3.5 text-sm text-gray-700">{formatDate(b.checkIn)}</td>
                    <td className="px-6 py-3.5 text-sm text-gray-700">{formatDate(b.checkOut)}</td>
                    <td className="px-6 py-3.5">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex gap-1 justify-end">
                        {b.status === "PENDING" && (
                          <>
                            <button
                              title="Confirmer"
                              disabled={actionLoading === b.id}
                              onClick={() => handleStatusChange(b.id, "CONFIRMED")}
                              className="p-2 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors disabled:opacity-40"
                            >
                              <CheckCircle size={16} />
                            </button>
                            <button
                              title="Refuser"
                              disabled={actionLoading === b.id}
                              onClick={() => handleStatusChange(b.id, "REJECTED")}
                              className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40"
                            >
                              <XCircle size={16} />
                            </button>
                          </>
                        )}
                        <button
                          title="Voir les détails"
                          onClick={() => setDetailBooking(b)}
                          className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Dialog open={!!detailBooking} onOpenChange={(open) => !open && setDetailBooking(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Détails de la réservation</DialogTitle>
            <DialogDescription>{detailBooking?.property.title}</DialogDescription>
          </DialogHeader>
          {detailBooking && (
            <div className="space-y-4 text-sm">
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
                    <p className="text-gray-400 text-xs mb-0.5">{item.label}</p>
                    <p className="font-medium text-gray-900">{item.value}</p>
                  </div>
                ))}
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">Statut</p>
                  <StatusBadge status={detailBooking.status} />
                </div>
              </div>
              {detailBooking.message && (
                <div>
                  <p className="text-gray-400 text-xs mb-1">Message</p>
                  <p className="bg-gray-50 p-3 rounded-xl text-sm text-gray-700">{detailBooking.message}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            {detailBooking?.status === "PENDING" && (
              <>
                <Button size="sm" onClick={() => handleStatusChange(detailBooking.id, "CONFIRMED")} disabled={actionLoading === detailBooking.id}>
                  <CheckCircle size={14} className="mr-1" />
                  Confirmer
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleStatusChange(detailBooking.id, "REJECTED")} disabled={actionLoading === detailBooking.id}>
                  <XCircle size={14} className="mr-1" />
                  Refuser
                </Button>
              </>
            )}
            {detailBooking?.status === "CONFIRMED" && (
              <Button size="sm" variant="destructive" onClick={() => handleStatusChange(detailBooking.id, "CANCELLED")} disabled={actionLoading === detailBooking.id}>
                Annuler
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
