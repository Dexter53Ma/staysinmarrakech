"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials");
        const data = await res.json();
        setTestimonials(data);
      } catch {
        console.error("Erreur lors du chargement des témoignages");
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const toggleApprove = async (id: string, current: boolean) => {
    try {
      await fetch(`/api/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isApproved: !current }),
      });
      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, isApproved: !current } : t))
      );
    } catch {
      console.error("Erreur lors de la mise à jour");
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Supprimer ce témoignage ?")) return;
    try {
      await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    } catch {
      console.error("Erreur lors de la suppression");
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Témoignages"
        description={`${testimonials.length} témoignage${testimonials.length > 1 ? "s" : ""}`}
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
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => deleteTestimonial(t.id)}
                    >
                      <Trash2 size={14} className="text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
