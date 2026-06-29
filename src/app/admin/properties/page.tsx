"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { AdminPageHeader } from "@/components/admin";
import { StatusBadge } from "@/components/admin";
import { EmptyState } from "@/components/admin";
import { TableSkeleton } from "@/components/admin";
import { Pagination } from "@/components/admin/Pagination";
import { Plus, Search, Edit, Trash2, Eye, Home } from "lucide-react";

interface PropertyImage {
  url: string;
}

interface Property {
  id: string;
  title: string;
  slug: string;
  type: string;
  status: string;
  price: number;
  currency: string;
  images: PropertyImage[];
  _count: { views: number };
}

const PROPERTY_TYPES = [
  { value: "ALL", label: "Tous les types" },
  { value: "VILLA", label: "Villa" },
  { value: "RIAD", label: "Riad" },
  { value: "APARTMENT", label: "Appartement" },
  { value: "HOUSE", label: "Maison" },
  { value: "LAND", label: "Terrain" },
  { value: "COMMERCIAL", label: "Commercial" },
];

const PROPERTY_STATUSES = [
  { value: "ALL", label: "Tous les statuts" },
  { value: "AVAILABLE", label: "Disponible" },
  { value: "SOLD", label: "Vendu" },
  { value: "RENTED", label: "Loué" },
  { value: "PENDING", label: "En attente" },
  { value: "MAINTENANCE", label: "Maintenance" },
];

export default function PropertiesPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: page.toString(), limit: "10" });
    if (typeFilter !== "ALL") params.set("type", typeFilter);
    if (statusFilter !== "ALL") params.set("status", statusFilter);
    if (search) params.set("search", search);

    const res = await fetch(`/api/properties?${params}`);
    const data = await res.json();
    setProperties(data.data || []);
    setTotal(data.pagination?.total || 0);
    setTotalPages(data.pagination?.totalPages || 1);
    setLoading(false);
  }, [page, typeFilter, statusFilter, search]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      const params = new URLSearchParams({ page: page.toString(), limit: "10" });
      if (typeFilter !== "ALL") params.set("type", typeFilter);
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      if (search) params.set("search", search);

      const res = await fetch(`/api/properties?${params}`);
      const data = await res.json();
      if (!cancelled) {
        setProperties(data.data || []);
        setTotal(data.pagination?.total || 0);
        setTotalPages(data.pagination?.totalPages || 1);
        setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [page, typeFilter, statusFilter, search]);

  const handleDelete = async (id: string) => {
    await fetch(`/api/properties/${id}`, { method: "DELETE" });
    fetchProperties();
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency }).format(price);
  };

  return (
    <div>
      <AdminPageHeader
        title="Propriétés"
        description={`${total} propriété${total > 1 ? "s" : ""} au total`}
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Propriétés" }]}
        action={{ label: "Nouvelle propriété", href: "/admin/properties/new", icon: Plus }}
      />

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                placeholder="Rechercher par titre..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="pl-9 bg-gray-50 border-gray-200"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
              className="h-10 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm outline-none focus:border-gray-400 transition-colors duration-150"
            >
              {PROPERTY_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="h-10 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm outline-none focus:border-gray-400 transition-colors duration-150"
            >
              {PROPERTY_STATUSES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="p-6">
            <TableSkeleton rows={5} cols={6} />
          </div>
        ) : properties.length === 0 ? (
          <EmptyState
            icon={Home}
            title="Aucune propriété"
            description="Commencez par ajouter votre première propriété."
            action={{ label: "Ajouter une propriété", href: "/admin/properties/new" }}
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Titre</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Vues</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {properties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell>
                        <div className="w-16 h-12 rounded-xl overflow-hidden bg-gray-100">
                          {property.images[0] ? (
                            <Image
                              src={property.images[0].url}
                              alt={property.title}
                              width={64}
                              height={48}
                              unoptimized
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                              —
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{property.title}</TableCell>
                      <TableCell>
                        <StatusBadge status={property.type} />
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={property.status} />
                      </TableCell>
                      <TableCell className="text-sm font-medium tabular-nums">
                        {formatPrice(property.price, property.currency)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-sm text-gray-500 tabular-nums">
                          <Eye className="size-3.5" />
                          {property._count.views}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => router.push(`/admin/properties/${property.id}/edit`)}
                            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 active:bg-gray-200 active:scale-[0.95] transition-all duration-150"
                          >
                            <Edit className="size-4" />
                          </button>
                          <Dialog>
                            <DialogTrigger
                              render={<button className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 active:bg-red-100 active:scale-[0.95] transition-all duration-150" />}
                            >
                              <Trash2 className="size-4" />
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Supprimer la propriété</DialogTitle>
                                <DialogDescription>
                                  Êtes-vous sûr de vouloir supprimer &quot;{property.title}&quot; ? Cette action est irréversible.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <DialogClose render={<Button variant="outline" />}>
                                  Annuler
                                </DialogClose>
                                <DialogClose
                                  render={<Button variant="destructive" />}
                                  onClick={() => handleDelete(property.id)}
                                >
                                  Supprimer
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && (
              <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
