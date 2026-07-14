"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Pagination } from "@/components/admin/Pagination";
import { CheckCircle, XCircle, Eye, RefreshCw, CalendarDays } from "lucide-react";
import { BulkActions } from "@/components/admin";

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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page: page.toString(), limit: "20" });
        if (filter !== "ALL") params.set("status", filter);
        const res = await fetch(`/api/bookings?${params}`);
        const data = await res.json();
        if (!cancelled) {
          setBookings(data.data || []);
          setTotalPages(data.pagination?.totalPages || 1);
          setTotal(data.pagination?.total || 0);
        }
      } catch {
        if (!cancelled) setBookings([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [filter, page, refreshKey]);

  const handleStatusChange = async (id: string, status: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setRefreshKey((k) => k + 1);
        setDetailBooking(null);
      }
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === bookings.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(bookings.map((b) => b.id));
    }
  };

  const handleBulkDelete = async () => {
    setBulkLoading(true);
    for (const id of selectedIds) {
      await fetch(`/api/bookings/${id}`, { method: "DELETE" });
    }
    setSelectedIds([]);
    setBulkLoading(false);
    setRefreshKey((k) => k + 1);
  };

  const handleBulkConfirm = async () => {
    setBulkLoading(true);
    for (const id of selectedIds) {
      await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CONFIRMED" }),
      });
    }
    setSelectedIds([]);
    setBulkLoading(false);
    setRefreshKey((k) => k + 1);
  };

  const handleBulkReject = async () => {
    setBulkLoading(true);
    for (const id of selectedIds) {
      await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "REJECTED" }),
      });
    }
    setSelectedIds([]);
    setBulkLoading(false);
    setRefreshKey((k) => k + 1);
  };

  const handleExportCSV = () => {
    const rows = bookings.filter((b) => selectedIds.includes(b.id));
    const header = "Client,Email,Propriété,Arrivée,Départ,Statut,Prix";
    const csvRows = rows.map(
      (b) =>
        `"${b.guestName}","${b.guestEmail}","${b.property.title}","${formatDate(b.checkIn)}","${formatDate(b.checkOut)}","${b.status}","${b.totalPrice ?? ""}"`
    );
    const csv = [header, ...csvRows].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reservations.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <AdminPageHeader
        title="Réservations"
        description={`${total} réservation${total > 1 ? "s" : ""}`}
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Réservations" }]}
        action={{ label: "Rafraîchir", onClick: () => setRefreshKey((k) => k + 1), icon: RefreshCw }}
      />

      {/* Calendar link */}
      <div className="mb-4">
        <a
          href="/admin/bookings/calendar"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-semibold border border-gray-200/60 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800 active:bg-gray-100 active:scale-[0.97] transition-all duration-150"
        >
          <CalendarDays size={14} />
          Calendrier
        </a>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 flex-wrap mb-6">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => { setFilter(s); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold active:scale-[0.97] transition-all duration-200 ${
              filter === s
                ? "bg-gray-900 text-white shadow-sm"
                : "bg-white border border-gray-200/80 text-gray-500 hover:bg-gray-50 hover:text-gray-700 hover:border-gray-300/80 active:bg-gray-100"
            }`}
          >
            {STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-gray-200/60 overflow-hidden">
        {loading ? (
          <div className="p-5">
            <TableSkeleton rows={5} cols={6} />
          </div>
        ) : bookings.length === 0 ? (
          <EmptyState
            icon={CalendarDays}
            title="Aucune réservation"
            description="Les réservations apparaîtront ici une fois qu'elles seront faites."
          />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-100">
                  <TableHead className="w-10">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === bookings.length && bookings.length > 0}
                      onChange={toggleSelectAll}
                      className="size-3.5 rounded border-gray-300 accent-blue-600 cursor-pointer"
                    />
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">Client</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">Propriété</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">Arrivée</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">Départ</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">Statut</TableHead>
                  <TableHead className="text-right text-[11px] font-semibold uppercase tracking-wider text-gray-500">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((b) => (
                  <TableRow key={b.id} className="border-gray-50 admin-table-row">
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(b.id)}
                        onChange={() => toggleSelect(b.id)}
                        className="size-3.5 rounded border-gray-300 accent-blue-600 cursor-pointer"
                      />
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-[13px] text-gray-900">{b.guestName}</p>
                      <p className="text-[11px] text-gray-500">{b.guestEmail}</p>
                    </TableCell>
                    <TableCell className="text-[13px] text-gray-700">{b.property.title}</TableCell>
                    <TableCell className="text-[13px] text-gray-700">{formatDate(b.checkIn)}</TableCell>
                    <TableCell className="text-[13px] text-gray-700">{formatDate(b.checkOut)}</TableCell>
                    <TableCell>
                      <StatusBadge status={b.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        {b.status === "PENDING" && (
                          <>
                            <button
                              title="Confirmer"
                              disabled={actionLoading === b.id}
                              onClick={() => handleStatusChange(b.id, "CONFIRMED")}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 active:bg-emerald-100 active:scale-[0.95] transition-all duration-150 disabled:opacity-40"
                            >
                              <CheckCircle size={15} />
                            </button>
                            <button
                              title="Refuser"
                              disabled={actionLoading === b.id}
                              onClick={() => handleStatusChange(b.id, "REJECTED")}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 active:bg-red-100 active:scale-[0.95] transition-all duration-150 disabled:opacity-40"
                            >
                              <XCircle size={15} />
                            </button>
                          </>
                        )}
                        <button
                          title="Voir les détails"
                          onClick={() => setDetailBooking(b)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 active:bg-gray-200 active:scale-[0.95] transition-all duration-150"
                        >
                          <Eye size={15} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <BulkActions
        selected={selectedIds}
        onClear={() => setSelectedIds([])}
        entityType="booking"
        onDelete={handleBulkDelete}
        onExport={handleExportCSV}
        onConfirm={handleBulkConfirm}
        onReject={handleBulkReject}
        loading={bulkLoading}
      />

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
                <Button size="sm" onClick={() => handleStatusChange(detailBooking.id, "CONFIRMED")} disabled={actionLoading === detailBooking.id} className="h-8 text-[12px] font-medium rounded-lg">
                  <CheckCircle size={13} className="mr-1" />
                  Confirmer
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleStatusChange(detailBooking.id, "REJECTED")} disabled={actionLoading === detailBooking.id} className="h-8 text-[12px] font-medium rounded-lg">
                  <XCircle size={13} className="mr-1" />
                  Refuser
                </Button>
              </>
            )}
            {detailBooking?.status === "CONFIRMED" && (
              <Button size="sm" variant="destructive" onClick={() => handleStatusChange(detailBooking.id, "CANCELLED")} disabled={actionLoading === detailBooking.id} className="h-8 text-[12px] font-medium rounded-lg">
                Annuler
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
