"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, Eye, RefreshCw } from "lucide-react";

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
const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
  CANCELLED: "bg-gray-100 text-gray-600",
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
    async function fetchBookings() {
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
    }
    fetchBookings();
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

  const formatDate = (d: string) => new Date(d).toLocaleDateString("fr-FR");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Réservations</h1>
        <Button variant="outline" size="sm" onClick={fetchBookings}>
          <RefreshCw size={16} />
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {STATUS_FILTERS.map((s) => (
          <Button
            key={s}
            variant={filter === s ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(s)}
          >
            {STATUS_LABELS[s]}
          </Button>
        ))}
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Propriété</TableHead>
                <TableHead>Arrivée</TableHead>
                <TableHead>Départ</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Chargement...
                  </TableCell>
                </TableRow>
              ) : bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Aucune réservation trouvée
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{b.guestName}</p>
                        <p className="text-xs text-gray-500">{b.guestEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>{b.property.title}</TableCell>
                    <TableCell>{formatDate(b.checkIn)}</TableCell>
                    <TableCell>{formatDate(b.checkOut)}</TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded-full ${STATUS_COLORS[b.status] || ""}`}>
                        {STATUS_LABELS[b.status] || b.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        {b.status === "PENDING" && (
                          <>
                            <Button
                              size="icon-sm"
                              variant="ghost"
                              title="Confirmer"
                              disabled={actionLoading === b.id}
                              onClick={() => handleStatusChange(b.id, "CONFIRMED")}
                            >
                              <CheckCircle size={16} className="text-green-600" />
                            </Button>
                            <Button
                              size="icon-sm"
                              variant="ghost"
                              title="Refuser"
                              disabled={actionLoading === b.id}
                              onClick={() => handleStatusChange(b.id, "REJECTED")}
                            >
                              <XCircle size={16} className="text-red-600" />
                            </Button>
                          </>
                        )}
                        <Button
                          size="icon-sm"
                          variant="ghost"
                          title="Voir les détails"
                          onClick={() => setDetailBooking(b)}
                        >
                          <Eye size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail dialog */}
      <Dialog open={!!detailBooking} onOpenChange={(open) => !open && setDetailBooking(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Détails de la réservation</DialogTitle>
            <DialogDescription>
              {detailBooking?.property.title}
            </DialogDescription>
          </DialogHeader>
          {detailBooking && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-gray-500">Client</p>
                  <p className="font-medium">{detailBooking.guestName}</p>
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium">{detailBooking.guestEmail}</p>
                </div>
                <div>
                  <p className="text-gray-500">Téléphone</p>
                  <p className="font-medium">{detailBooking.guestPhone || "—"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Voyageurs</p>
                  <p className="font-medium">{detailBooking.guestsCount}</p>
                </div>
                <div>
                  <p className="text-gray-500">Arrivée</p>
                  <p className="font-medium">{formatDate(detailBooking.checkIn)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Départ</p>
                  <p className="font-medium">{formatDate(detailBooking.checkOut)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Prix total</p>
                  <p className="font-medium">
                    {detailBooking.totalPrice ? `${detailBooking.totalPrice} €` : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Statut</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${STATUS_COLORS[detailBooking.status] || ""}`}>
                    {STATUS_LABELS[detailBooking.status] || detailBooking.status}
                  </span>
                </div>
              </div>
              {detailBooking.message && (
                <div>
                  <p className="text-gray-500">Message</p>
                  <p className="bg-gray-50 p-2 rounded text-sm">{detailBooking.message}</p>
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
                >
                  <CheckCircle size={14} className="mr-1" />
                  Confirmer
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleStatusChange(detailBooking.id, "REJECTED")}
                  disabled={actionLoading === detailBooking.id}
                >
                  <XCircle size={14} className="mr-1" />
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
