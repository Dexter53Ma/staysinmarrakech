"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ServiceFormData {
  title: string;
  description: string;
  longDescription: string;
  metaDescription: string;
  features: string;
  image: string;
  category: string;
  price: string;
  priceUnit: string;
}

interface ServiceFormProps {
  initialData?: ServiceFormData & { id: string };
  isEdit?: boolean;
}

export default function ServiceForm({ initialData, isEdit }: ServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<ServiceFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    longDescription: initialData?.longDescription || "",
    metaDescription: initialData?.metaDescription || "",
    features: initialData?.features || "",
    image: initialData?.image || "",
    category: initialData?.category || "",
    price: initialData?.price || "",
    priceUnit: initialData?.priceUnit || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEdit ? `/api/services/${initialData?.id}` : "/api/services";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Erreur");
        return;
      }

      router.push("/admin/services");
      router.refresh();
    } catch {
      alert("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? "Modifier le service" : "Nouveau service"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description courte <span className="text-gray-400 font-normal">(carte + intro page)</span></Label>
            <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="longDescription">Contenu complet <span className="text-gray-400 font-normal">(HTML — headings h2/h3, paragraphes, listes)</span></Label>
            <Textarea id="longDescription" value={form.longDescription} onChange={(e) => setForm({ ...form, longDescription: e.target.value })} rows={20} placeholder="<h2>Titre de section</h2>&#10;<p>Contenu de la section...</p>" className="font-mono text-sm" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="metaDescription">Meta description <span className="text-gray-400 font-normal">(150-160 caractères pour SEO)</span></Label>
            <Textarea id="metaDescription" value={form.metaDescription} onChange={(e) => setForm({ ...form, metaDescription: e.target.value })} rows={2} maxLength={200} placeholder="Description courte pour les moteurs de recherche..." />
            <p className="text-xs text-gray-400">{form.metaDescription.length}/200 caractères</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Features / Inclus <span className="text-gray-400 font-normal">(un par ligne)</span></Label>
            <Textarea id="features" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} rows={5} placeholder="Guide francophone&#10;Équipement fourni&#10;Transferts inclus" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">URL de l&apos;image</Label>
            <Input id="image" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Input id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Ex: Bien-être" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Prix</Label>
              <Input id="price" type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0.00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priceUnit">Unité de prix</Label>
              <Input id="priceUnit" value={form.priceUnit} onChange={(e) => setForm({ ...form, priceUnit: e.target.value })} placeholder="Ex: par personne" />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Enregistrement..." : isEdit ? "Mettre à jour" : "Créer"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Annuler
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
