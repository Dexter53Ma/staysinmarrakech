"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash2, RefreshCw, Wrench } from "lucide-react";
import { AdminPageHeader } from "@/components/admin";
import { EmptyState } from "@/components/admin";
import { TableSkeleton } from "@/components/admin";
import { Pagination } from "@/components/admin/Pagination";

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string | null;
  category: string | null;
  price: number | null;
  priceUnit: string | null;
  isActive: boolean;
  sortOrder: number;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/services?page=${page}&limit=20`);
      const data = await res.json();
      setServices(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotal(data.pagination?.total || 0);
    } catch {
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { fetchServices(); }, [fetchServices]);

  const toggleActive = async (id: string, current: boolean) => {
    setToggling(id);
    try {
      await fetch(`/api/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !current }),
      });
      fetchServices();
    } finally {
      setToggling(null);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await fetch(`/api/services/${id}`, { method: "DELETE" });
      fetchServices();
    } catch {
      alert("Erreur lors de la suppression");
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Services"
        description={`${total} service${total > 1 ? "s" : ""}`}
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Services" }]}
        action={{ label: "Nouveau service", href: "/admin/services/new", icon: Plus }}
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Actif</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <TableSkeleton rows={3} cols={5} />
                  </TableCell>
                </TableRow>
              ) : services.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <EmptyState
                      icon={Wrench}
                      title="Aucun service"
                      description="Ajoutez votre premier service."
                      action={{ label: "Nouveau service", href: "/admin/services/new" }}
                    />
                  </TableCell>
                </TableRow>
              ) : (
                services.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>
                      {s.image ? (
                        <Image
                          src={s.image}
                          alt={s.title}
                          width={48}
                          height={48}
                          className="rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                          —
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{s.title}</TableCell>
                    <TableCell>{s.category || "—"}</TableCell>
                    <TableCell>
                      {s.price ? `${s.price} € ${s.priceUnit || ""}` : "Gratuit"}
                    </TableCell>
                    <TableCell>
                      <Switch
                        size="sm"
                        checked={s.isActive}
                        disabled={toggling === s.id}
                        onCheckedChange={() => toggleActive(s.id, s.isActive)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        <Link href={`/admin/services/${s.id}/edit`}>
                          <Button size="icon-sm" variant="ghost" title="Modifier">
                            <Pencil size={16} />
                          </Button>
                        </Link>
                        {confirmDeleteId === s.id ? (
                          <div className="flex items-center gap-1">
                            <Button
                              size="icon-sm"
                              variant="destructive"
                              disabled={deletingId === s.id}
                              onClick={() => handleDelete(s.id)}
                            >
                              {deletingId === s.id ? (
                                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              ) : "Oui"}
                            </Button>
                            <Button
                              size="icon-sm"
                              variant="outline"
                              onClick={() => setConfirmDeleteId(null)}
                            >
                              Non
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="icon-sm"
                            variant="ghost"
                            title="Supprimer"
                            onClick={() => setConfirmDeleteId(s.id)}
                          >
                            <Trash2 size={16} className="text-red-600" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
