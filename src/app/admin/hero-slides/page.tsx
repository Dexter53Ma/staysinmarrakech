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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, ArrowUp, ArrowDown, Pencil, Image as ImageIcon } from "lucide-react";
import { AdminPageHeader } from "@/components/admin";
import { EmptyState } from "@/components/admin";
import { TableSkeleton } from "@/components/admin";
import { Pagination } from "@/components/admin/Pagination";

interface HeroSlide {
  id: string;
  title: string;
  titleEn: string | null;
  subtitle: string | null;
  subtitleEn: string | null;
  image: string;
  link: string | null;
  buttonText: string | null;
  buttonTextEn: string | null;
  sortOrder: number;
  isActive: boolean;
}

export default function AdminHeroSlidesPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [locLang, setLocLang] = useState<"fr" | "en">("fr");
  const [form, setForm] = useState({
    title: "",
    titleEn: "",
    subtitle: "",
    subtitleEn: "",
    image: "",
    link: "",
    buttonText: "",
    buttonTextEn: "",
  });

  const fetchSlides = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/hero-slides?page=${page}&limit=20`);
      const data = await res.json();
      setSlides(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotal(data.pagination?.total || 0);
    } catch {
      setSlides([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchSlides();
  }, [fetchSlides]);

  const toggleActive = async (id: string, current: boolean) => {
    try {
      await fetch(`/api/hero-slides/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !current }),
      });
      fetchSlides();
    } catch {
      console.error("Erreur lors de la mise à jour");
    }
  };

  const moveSlide = async (id: string, direction: "up" | "down") => {
    const idx = slides.findIndex((s) => s.id === id);
    if (idx === -1) return;
    const target = direction === "up" ? idx - 1 : idx + 1;
    if (target < 0 || target >= slides.length) return;

    const current = slides[idx];
    const other = slides[target];

    await Promise.all([
      fetch(`/api/hero-slides/${current.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sortOrder: other.sortOrder }),
      }),
      fetch(`/api/hero-slides/${other.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sortOrder: current.sortOrder }),
      }),
    ]);
    fetchSlides();
  };

  const deleteSlide = async (id: string) => {
    setDeletingId(id);
    try {
      await fetch(`/api/hero-slides/${id}`, { method: "DELETE" });
      fetchSlides();
    } catch {
      console.error("Erreur lors de la suppression");
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  const createSlide = async () => {
    if (!form.title || !form.image) {
      setFormError("Le titre et l'image sont requis");
      return;
    }
    setFormError(null);
    try {
      const body = {
        ...form,
        titleEn: form.titleEn || form.title,
        subtitleEn: form.subtitleEn || form.subtitle,
        buttonTextEn: form.buttonTextEn || form.buttonText,
      };
      if (editingSlide) {
        await fetch(`/api/hero-slides/${editingSlide.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        await fetch("/api/hero-slides", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }
      setDialogOpen(false);
      setEditingSlide(null);
      setForm({ title: "", titleEn: "", subtitle: "", subtitleEn: "", image: "", link: "", buttonText: "", buttonTextEn: "" });
      fetchSlides();
    } catch {
      console.error("Erreur lors de la sauvegarde");
    }
  };

  const openEdit = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setLocLang("fr");
    setForm({
      title: slide.title,
      titleEn: slide.titleEn || "",
      subtitle: slide.subtitle || "",
      subtitleEn: slide.subtitleEn || "",
      image: slide.image,
      link: slide.link || "",
      buttonText: slide.buttonText || "",
      buttonTextEn: slide.buttonTextEn || "",
    });
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Slides Hero"
        description={`${total} slide${total > 1 ? "s" : ""}`}
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Slides Hero" }]}
        action={{ label: "Nouveau slide", onClick: () => setDialogOpen(true), icon: Plus }}
      />

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Sous-titre</TableHead>
                <TableHead>Actif</TableHead>
                <TableHead>Ordre</TableHead>
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
              ) : slides.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <EmptyState
                      icon={ImageIcon}
                      title="Aucun slide"
                      description="Ajoutez votre premier slide hero."
                      action={{ label: "Nouveau slide", onClick: () => setDialogOpen(true) }}
                    />
                  </TableCell>
                </TableRow>
              ) : (
                slides.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>
                      {s.image ? (
                        <Image
                          src={s.image}
                          alt={s.title}
                          width={80}
                          height={48}
                          className="rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-20 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                          —
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{s.title}</TableCell>
                    <TableCell>{s.subtitle || "—"}</TableCell>
                    <TableCell>
                      <Switch
                        size="sm"
                        checked={s.isActive}
                        onCheckedChange={() => toggleActive(s.id, s.isActive)}
                      />
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{s.sortOrder}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        <Button
                          size="icon-sm"
                          variant="ghost"
                          title="Monter"
                          onClick={() => moveSlide(s.id, "up")}
                        >
                          <ArrowUp size={14} />
                        </Button>
                        <Button
                          size="icon-sm"
                          variant="ghost"
                          title="Descendre"
                          onClick={() => moveSlide(s.id, "down")}
                        >
                          <ArrowDown size={14} />
                        </Button>
                        <Button
                          size="icon-sm"
                          variant="ghost"
                          title="Modifier"
                          onClick={() => openEdit(s)}
                        >
                          <Pencil size={14} className="text-blue-600" />
                        </Button>
                        {confirmDeleteId === s.id ? (
                          <div className="flex items-center gap-1">
                            <Button
                              size="icon-sm"
                              variant="destructive"
                              disabled={deletingId === s.id}
                              onClick={() => deleteSlide(s.id)}
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
            <DialogTitle>{editingSlide ? "Modifier le slide" : "Nouveau slide"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {formError && (
              <div className="flex items-center gap-2 text-sm px-3 py-2.5 rounded-xl text-red-600 bg-red-50 border border-red-100">
                {formError}
              </div>
            )}
            <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
              <button type="button" onClick={() => setLocLang("fr")} className={`flex-1 text-sm py-1.5 rounded-md transition-colors ${locLang === "fr" ? "bg-white shadow-sm font-medium" : "text-gray-500"}`}>FR</button>
              <button type="button" onClick={() => setLocLang("en")} className={`flex-1 text-sm py-1.5 rounded-md transition-colors ${locLang === "en" ? "bg-white shadow-sm font-medium" : "text-gray-500"}`}>EN</button>
            </div>
            {locLang === "fr" ? (
              <>
                <div>
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Titre du slide"
                  />
                </div>
                <div>
                  <Label htmlFor="subtitle">Sous-titre</Label>
                  <Input
                    id="subtitle"
                    value={form.subtitle}
                    onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                    placeholder="Sous-titre"
                  />
                </div>
                <div>
                  <Label htmlFor="buttonText">Texte du bouton</Label>
                  <Input
                    id="buttonText"
                    value={form.buttonText}
                    onChange={(e) => setForm({ ...form, buttonText: e.target.value })}
                    placeholder="Découvrir"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label htmlFor="titleEn">Title (EN) *</Label>
                  <Input
                    id="titleEn"
                    value={form.titleEn}
                    onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                    placeholder="Slide title"
                  />
                </div>
                <div>
                  <Label htmlFor="subtitleEn">Subtitle (EN)</Label>
                  <Input
                    id="subtitleEn"
                    value={form.subtitleEn}
                    onChange={(e) => setForm({ ...form, subtitleEn: e.target.value })}
                    placeholder="Subtitle"
                  />
                </div>
                <div>
                  <Label htmlFor="buttonTextEn">Button text (EN)</Label>
                  <Input
                    id="buttonTextEn"
                    value={form.buttonTextEn}
                    onChange={(e) => setForm({ ...form, buttonTextEn: e.target.value })}
                    placeholder="Discover"
                  />
                </div>
              </>
            )}
            <div>
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Titre du slide"
              />
            </div>
            <div>
              <Label htmlFor="subtitle">Sous-titre</Label>
              <Input
                id="subtitle"
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                placeholder="Sous-titre"
              />
            </div>
            <div>
              <Label htmlFor="image">URL de l&apos;image *</Label>
              <Input
                id="image"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div>
              <Label htmlFor="link">Lien</Label>
              <Input
                id="link"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                placeholder="/properties"
              />
            </div>
            <div>
              <Label htmlFor="buttonText">Texte du bouton</Label>
              <Input
                id="buttonText"
                value={form.buttonText}
                onChange={(e) => setForm({ ...form, buttonText: e.target.value })}
                placeholder="Découvrir"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={createSlide}>Créer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
