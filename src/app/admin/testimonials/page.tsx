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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Star, Trash2, MessageSquare } from "lucide-react";
import { AdminPageHeader } from "@/components/admin";
import { EmptyState } from "@/components/admin";
import { TableSkeleton } from "@/components/admin";
import { Pagination } from "@/components/admin/Pagination";

interface Testimonial {
  id: string;
  guestName: string;
  propertyName: string | null;
  rating: number | null;
  isApproved: boolean;
  createdAt: string;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/testimonials?page=${page}&limit=20`);
      const data = await res.json();
      setTestimonials(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotal(data.pagination?.total || 0);
    } catch {
      console.error("Erreur lors du chargement des témoignages");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const toggleApprove = async (id: string, current: boolean) => {
    try {
      await fetch(`/api/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isApproved: !current }),
      });
      fetchTestimonials();
    } catch {
      console.error("Erreur lors de la mise à jour");
    }
  };

  const deleteTestimonial = async (id: string) => {
    setDeletingId(id);
    try {
      await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      fetchTestimonials();
    } catch {
      console.error("Erreur lors de la suppression");
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Témoignages"
        description={`${total} témoignage${total > 1 ? "s" : ""}`}
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Témoignages" }]}
      />

      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <TableSkeleton rows={5} cols={4} />
        </div>
      ) : testimonials.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="Aucun témoignage"
          description="Les témoignages clients apparaîtront ici."
        />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom du client</TableHead>
                <TableHead>Propriété</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Approuvé</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.guestName}</TableCell>
                  <TableCell>{t.propertyName || "—"}</TableCell>
                  <TableCell>
                    {t.rating ? (
                      <span className="flex items-center gap-1">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        {t.rating}
                      </span>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        size="sm"
                        checked={t.isApproved}
                        onCheckedChange={() => toggleApprove(t.id, t.isApproved)}
                      />
                      <Badge variant={t.isApproved ? "default" : "secondary"}>
                        {t.isApproved ? "Approuvé" : "En attente"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {confirmDeleteId === t.id ? (
                      <div className="flex items-center gap-1 justify-end">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          disabled={deletingId === t.id}
                          onClick={() => deleteTestimonial(t.id)}
                        >
                          {deletingId === t.id ? (
                            <span className="w-3.5 h-3.5 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
                          ) : <span className="text-destructive text-xs">Oui</span>}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => setConfirmDeleteId(null)}
                        >
                          <span className="text-xs">Non</span>
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => setConfirmDeleteId(t.id)}
                      >
                        <Trash2 size={14} className="text-destructive" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
