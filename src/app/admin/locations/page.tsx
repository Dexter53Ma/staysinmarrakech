"use client";

import { useEffect, useState, useCallback } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, MapPin } from "lucide-react";
import { AdminPageHeader } from "@/components/admin";
import { EmptyState } from "@/components/admin";
import { TableSkeleton } from "@/components/admin";
import { Pagination } from "@/components/admin/Pagination";

interface Location {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  latitude: number | null;
  longitude: number | null;
  sortOrder: number;
}

export default function AdminLocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Location | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    latitude: "",
    longitude: "",
  });

  const fetchLocations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/locations?page=${page}&limit=20`);
      const data = await res.json();
      setLocations(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotal(data.pagination?.total || 0);
    } catch {
      setLocations([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", description: "", image: "", latitude: "", longitude: "" });
    setDialogOpen(true);
  };

  const openEdit = (loc: Location) => {
    setEditing(loc);
    setForm({
      name: loc.name,
      description: loc.description || "",
      image: loc.image || "",
      latitude: loc.latitude?.toString() || "",
      longitude: loc.longitude?.toString() || "",
    });
    setDialogOpen(true);
  };

  const saveLocation = async () => {
    if (!form.name) {
      setFormError("Le nom est requis");
      return;
    }
    setFormError(null);
    try {
      if (editing) {
        await fetch(`/api/locations/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/locations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setDialogOpen(false);
      fetchLocations();
    } catch {
      console.error("Erreur lors de la sauvegarde");
    }
  };

  const deleteLocation = async (id: string) => {
    setDeletingId(id);
    try {
      await fetch(`/api/locations/${id}`, { method: "DELETE" });
      fetchLocations();
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
        title="Locations"
        description={`${total} location${total > 1 ? "s" : ""}`}
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Locations" }]}
        action={{ label: "Nouvelle location", onClick: openCreate, icon: Plus }}
      />

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Ordre</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <TableSkeleton rows={3} cols={4} />
                  </TableCell>
                </TableRow>
              ) : locations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <EmptyState
                      icon={MapPin}
                      title="Aucune location"
                      description="Ajoutez votre première location."
                      action={{ label: "Nouvelle location", onClick: openCreate }}
                    />
                  </TableCell>
                </TableRow>
              ) : (
                locations.map((loc) => (
                  <TableRow key={loc.id}>
                    <TableCell>
                      {loc.image ? (
                        <Image
                          src={loc.image}
                          alt={loc.name}
                          width={64}
                          height={40}
                          className="rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-16 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                          —
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{loc.name}</TableCell>
                    <TableCell className="text-sm text-gray-500">{loc.slug}</TableCell>
                    <TableCell>{loc.sortOrder}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        <Button size="icon-sm" variant="ghost" title="Modifier" onClick={() => openEdit(loc)}>
                          <Pencil size={14} />
                        </Button>
                        {confirmDeleteId === loc.id ? (
                          <div className="flex items-center gap-1">
                            <Button
                              size="icon-sm"
                              variant="destructive"
                              disabled={deletingId === loc.id}
                              onClick={() => deleteLocation(loc.id)}
                            >
                              {deletingId === loc.id ? (
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
                          <Button size="icon-sm" variant="ghost" title="Supprimer" onClick={() => setConfirmDeleteId(loc.id)}>
                            <Trash2 size={14} className="text-red-600" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <Dialog open={dialogOpen} onOpenChange={(open) => !open && setDialogOpen(false)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? "Modifier la location" : "Nouvelle location"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {formError && (
              <div className="flex items-center gap-2 text-sm px-3 py-2.5 rounded-xl text-red-600 bg-red-50 border border-red-100">
                {formError}
              </div>
            )}
            <div>
              <Label htmlFor="name">Nom *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Nom de la location"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Description de la location"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="image">URL de l&apos;image</Label>
              <Input
                id="image"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  value={form.latitude}
                  onChange={(e) => setForm({ ...form, latitude: e.target.value })}
                  placeholder="31.6295"
                />
              </div>
              <div>
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  value={form.longitude}
                  onChange={(e) => setForm({ ...form, longitude: e.target.value })}
                  placeholder="-7.9811"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={saveLocation}>{editing ? "Mettre à jour" : "Créer"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
