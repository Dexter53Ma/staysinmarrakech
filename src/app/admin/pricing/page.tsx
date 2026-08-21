"use client";

import { useState, useEffect } from "react";
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
import { EmptyState } from "@/components/admin";
import { TableSkeleton } from "@/components/admin";
import { Plus, Edit, Trash2, Tag } from "lucide-react";

interface PriceOverride {
  id: string;
  propertyId: string;
  startDate: string;
  endDate: string;
  price: number;
  reason: string | null;
  createdAt: string;
  property: { title: string; slug: string };
}

interface Property {
  id: string;
  title: string;
  price: number;
  currency: string;
}

export default function AdminPricingPage() {
  const [overrides, setOverrides] = useState<PriceOverride[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingOverride, setEditingOverride] = useState<PriceOverride | null>(null);
  const [saving, setSaving] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState<PriceOverride | null>(null);

  const [form, setForm] = useState({
    propertyId: "",
    startDate: "",
    endDate: "",
    price: "",
    reason: "",
  });

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const [overridesRes, propertiesRes] = await Promise.all([
          fetch("/api/price-overrides"),
          fetch("/api/properties?limit=100"),
        ]);
        const overridesData = await overridesRes.json();
        const propertiesData = await propertiesRes.json();
        if (!cancelled) {
          setOverrides(Array.isArray(overridesData) ? overridesData : []);
          setProperties(propertiesData.data || []);
        }
      } catch {
        if (!cancelled) {
          setOverrides([]);
          setProperties([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [refreshKey]);

  const openCreate = () => {
    setEditingOverride(null);
    setForm({ propertyId: "", startDate: "", endDate: "", price: "", reason: "" });
    setDialogOpen(true);
  };

  const openEdit = (override: PriceOverride) => {
    setEditingOverride(override);
    setForm({
      propertyId: override.propertyId,
      startDate: override.startDate.split("T")[0],
      endDate: override.endDate.split("T")[0],
      price: override.price.toString(),
      reason: override.reason || "",
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.propertyId || !form.startDate || !form.endDate || !form.price) return;
    setSaving(true);

    try {
      const url = editingOverride ? `/api/price-overrides/${editingOverride.id}` : "/api/price-overrides";
      const method = editingOverride ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId: form.propertyId,
          startDate: form.startDate,
          endDate: form.endDate,
          price: parseFloat(form.price),
          reason: form.reason || null,
        }),
      });

      if (res.ok) {
        setDialogOpen(false);
        setRefreshKey((k) => k + 1);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/price-overrides/${id}`, { method: "DELETE" });
    setDeleteTarget(null);
    setRefreshKey((k) => k + 1);
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });

  const formatPrice = (price: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(price);

  return (
    <div>
      <AdminPageHeader
        title="Tarification saisonnière"
        description={`${overrides.length} override${overrides.length > 1 ? "s" : ""} de prix`}
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Tarification" }]}
        action={{ label: "Nouvel override", onClick: openCreate, icon: Plus }}
      />

      {loading ? (
        <div className="bg-white rounded-xl border border-gray-200/60 p-5">
          <TableSkeleton rows={5} cols={5} />
        </div>
      ) : overrides.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200/60">
          <EmptyState
            icon={Tag}
            title="Aucun override de prix"
            description="Créez des tarifs saisonniers pour vos propriétés (haute saison, événements, etc.)."
            action={{ label: "Créer un override", onClick: openCreate }}
          />
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200/60 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-100">
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">Propriété</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">Du</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">Au</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">Prix/nuit</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">Raison</TableHead>
                  <TableHead className="text-right text-[11px] font-semibold uppercase tracking-wider text-gray-500">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {overrides.map((o) => {
                  const prop = properties.find((p) => p.id === o.propertyId);
                  const basePrice = prop?.price || 0;
                  const diff = basePrice > 0 ? ((o.price - basePrice) / basePrice * 100) : 0;

                  return (
                    <TableRow key={o.id} className="border-gray-50 admin-table-row">
                      <TableCell className="font-medium text-[13px] text-gray-900">{o.property.title}</TableCell>
                      <TableCell className="text-[13px] text-gray-700">{formatDate(o.startDate)}</TableCell>
                      <TableCell className="text-[13px] text-gray-700">{formatDate(o.endDate)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-semibold text-gray-900">{formatPrice(o.price)}</span>
                          {diff !== 0 && (
                            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${diff > 0 ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
                              {diff > 0 ? "+" : ""}{diff.toFixed(0)}%
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-[13px] text-gray-500">{o.reason || "—"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-1 justify-end">
                          <button
                            title="Modifier"
                            onClick={() => openEdit(o)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 active:bg-gray-200 active:scale-[0.95] transition-all duration-150"
                          >
                            <Edit size={15} />
                          </button>
                          <button
                            title="Supprimer"
                            onClick={() => setDeleteTarget(o)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 active:bg-red-100 active:scale-[0.95] transition-all duration-150"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) setDialogOpen(false); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingOverride ? "Modifier l'override" : "Nouvel override de prix"}</DialogTitle>
            <DialogDescription>
              {editingOverride ? "Modifiez les dates et le prix de cet override." : "Définissez un prix spécial pour une période donnée."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Propriété</label>
              <select
                value={form.propertyId}
                onChange={(e) => setForm({ ...form, propertyId: e.target.value })}
                disabled={!!editingOverride}
                className="w-full h-11 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#0d47a1] focus:ring-2 focus:ring-[#0d47a1]/10 transition-all bg-gray-50 disabled:opacity-50"
              >
                <option value="">Sélectionner une propriété</option>
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>{p.title} — {formatPrice(p.price)}/nuit (base)</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Date début</label>
                <input
                  type="date"
                  required
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  className="w-full h-11 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#0d47a1] focus:ring-2 focus:ring-[#0d47a1]/10 transition-all bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Date fin</label>
                <input
                  type="date"
                  required
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                  className="w-full h-11 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#0d47a1] focus:ring-2 focus:ring-[#0d47a1]/10 transition-all bg-gray-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Prix par nuit (€)</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                placeholder="250"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full h-11 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#0d47a1] focus:ring-2 focus:ring-[#0d47a1]/10 transition-all bg-gray-50 placeholder:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Raison (optionnel)</label>
              <input
                type="text"
                placeholder="Haute saison, Ramadan, F1 GP..."
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                className="w-full h-11 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#0d47a1] focus:ring-2 focus:ring-[#0d47a1]/10 transition-all bg-gray-50 placeholder:text-gray-300"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="h-8 text-[12px] font-medium rounded-lg" onClick={() => setDialogOpen(false)}>
              Annuler
            </Button>
            <Button
              className="h-8 text-[12px] font-medium rounded-lg"
              onClick={handleSave}
              disabled={saving || !form.propertyId || !form.startDate || !form.endDate || !form.price}
            >
              {saving ? "Enregistrement..." : editingOverride ? "Mettre à jour" : "Créer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer l&apos;override</DialogTitle>
            <DialogDescription>
              Supprimer l&apos;override de prix pour &quot;{deleteTarget?.property.title}&quot; du {deleteTarget ? formatDate(deleteTarget.startDate) : ""} au {deleteTarget ? formatDate(deleteTarget.endDate) : ""} ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" className="h-8 text-[12px] font-medium rounded-lg" onClick={() => setDeleteTarget(null)}>
              Annuler
            </Button>
            <Button
              variant="destructive"
              className="h-8 text-[12px] font-medium rounded-lg"
              onClick={() => deleteTarget && handleDelete(deleteTarget.id)}
            >
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
