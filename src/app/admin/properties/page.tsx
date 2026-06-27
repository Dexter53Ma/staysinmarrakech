"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, Eye, ChevronLeft, ChevronRight } from "lucide-react";

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
    const params = new URLSearchParams({
      page: page.toString(),
      limit: "10",
    });
    if (typeFilter !== "ALL") params.set("type", typeFilter);
    if (statusFilter !== "ALL") params.set("status", statusFilter);
    if (search) params.set("search", search);

    const res = await fetch(`/api/properties?${params}`);
    const data = await res.json();
    setProperties(data.properties || []);
    setTotal(data.total || 0);
    setTotalPages(data.totalPages || 1);
    setLoading(false);
  }, [page, typeFilter, statusFilter, search]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
      });
      if (typeFilter !== "ALL") params.set("type", typeFilter);
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      if (search) params.set("search", search);

      const res = await fetch(`/api/properties?${params}`);
      const data = await res.json();
      setProperties(data.properties || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
      setLoading(false);
    };
    load();
  }, [page, typeFilter, statusFilter, search]);

  const handleDelete = async (id: string) => {
    await fetch(`/api/properties/${id}`, { method: "DELETE" });
    fetchProperties();
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency }).format(price);
  };

  const typeBadgeColor = (type: string) => {
    const colors: Record<string, string> = {
      VILLA: "bg-purple-100 text-purple-800",
      APARTMENT: "bg-blue-100 text-blue-800",
      HOUSE: "bg-green-100 text-green-800",
      LAND: "bg-yellow-100 text-yellow-800",
      COMMERCIAL: "bg-red-100 text-red-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const statusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      AVAILABLE: "bg-green-100 text-green-800",
      SOLD: "bg-red-100 text-red-800",
      RENTED: "bg-blue-100 text-blue-800",
      PENDING: "bg-yellow-100 text-yellow-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const statusLabel = (status: string) => {
    const labels: Record<string, string> = {
      AVAILABLE: "Disponible",
      SOLD: "Vendu",
      RENTED: "Loué",
      PENDING: "En attente",
    };
    return labels[status] || status;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Propriétés</h1>
        <Link href="/admin/properties/new">
          <Button>
            <Plus className="mr-2 size-4" />
            Nouvelle propriété
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Liste des propriétés</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par titre..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="pl-9"
              />
            </div>
            <select
              value={typeFilter}
                onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
              className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {PROPERTY_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {PROPERTY_STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Table */}
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Chargement...</div>
          ) : properties.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">Aucune propriété trouvée</div>
          ) : (
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
                      <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100">
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
                            Aucune
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{property.title}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${typeBadgeColor(property.type)}`}>
                        {property.type}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusBadgeColor(property.status)}`}>
                        {statusLabel(property.status)}
                      </span>
                    </TableCell>
                    <TableCell>{formatPrice(property.price, property.currency)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Eye className="size-3.5" />
                        {property._count.views}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => router.push(`/admin/properties/${property.id}/edit`)}
                        >
                          <Edit className="size-4" />
                        </Button>
                        <Dialog>
                          <DialogTrigger
                            render={<Button variant="ghost" size="icon-sm" />}
                          >
                            <Trash2 className="size-4 text-destructive" />
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
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                {total} propriété{total > 1 ? "s" : ""} au total
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <span className="text-sm">
                  Page {page} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
