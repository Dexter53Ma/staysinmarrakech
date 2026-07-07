"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BilingualTabs from "@/components/BilingualTabs";

interface ServiceFormData {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  longDescription: string;
  longDescriptionEn: string;
  metaDescription: string;
  metaDescriptionEn: string;
  features: string;
  featuresEn: string;
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
    titleEn: initialData?.titleEn || "",
    description: initialData?.description || "",
    descriptionEn: initialData?.descriptionEn || "",
    longDescription: initialData?.longDescription || "",
    longDescriptionEn: initialData?.longDescriptionEn || "",
    metaDescription: initialData?.metaDescription || "",
    metaDescriptionEn: initialData?.metaDescriptionEn || "",
    features: initialData?.features || "",
    featuresEn: initialData?.featuresEn || "",
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
            <Label>Titre</Label>
            <BilingualTabs
              frContent={<Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />}
              enContent={<Input id="titleEn" value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} placeholder="English title" />}
            />
          </div>

          <div className="space-y-2">
            <Label>Description courte <span className="text-gray-400 font-normal">(carte + intro page)</span></Label>
            <BilingualTabs
              frContent={<Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required rows={3} />}
              enContent={<Textarea id="descriptionEn" value={form.descriptionEn} onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })} rows={3} placeholder="English short description" />}
            />
          </div>

          <div className="space-y-2">
            <Label>Contenu complet <span className="text-gray-400 font-normal">(HTML — headings h2/h3, paragraphes, listes)</span></Label>
            <BilingualTabs
              frContent={<Textarea id="longDescription" value={form.longDescription} onChange={(e) => setForm({ ...form, longDescription: e.target.value })} rows={20} placeholder="<h2>Titre de section</h2>&#10;<p>Contenu de la section...</p>" className="font-mono text-sm" />}
              enContent={<Textarea id="longDescriptionEn" value={form.longDescriptionEn} onChange={(e) => setForm({ ...form, longDescriptionEn: e.target.value })} rows={20} placeholder="<h2>Section title</h2>&#10;<p>Section content...</p>" className="font-mono text-sm" />}
            />
          </div>

          <div className="space-y-2">
            <Label>Meta description <span className="text-gray-400 font-normal">(150-160 caractères pour SEO)</span></Label>
            <BilingualTabs
              frContent={
                <>
                  <Textarea id="metaDescription" value={form.metaDescription} onChange={(e) => setForm({ ...form, metaDescription: e.target.value })} rows={2} maxLength={200} placeholder="Description courte pour les moteurs de recherche..." />
                  <p className="text-xs text-gray-400">{form.metaDescription.length}/200 caractères</p>
                </>
              }
              enContent={
                <>
                  <Textarea id="metaDescriptionEn" value={form.metaDescriptionEn} onChange={(e) => setForm({ ...form, metaDescriptionEn: e.target.value })} rows={2} maxLength={200} placeholder="Short description for search engines..." />
                  <p className="text-xs text-gray-400">{form.metaDescriptionEn.length}/200 characters</p>
                </>
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Features / Inclus <span className="text-gray-400 font-normal">(un par ligne)</span></Label>
            <BilingualTabs
              frContent={<Textarea id="features" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} rows={5} placeholder="Guide francophone&#10;Équipement fourni&#10;Transferts inclus" />}
              enContent={<Textarea id="featuresEn" value={form.featuresEn} onChange={(e) => setForm({ ...form, featuresEn: e.target.value })} rows={5} placeholder="French-speaking guide&#10;Equipment provided&#10;Transfers included" />}
            />
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
