"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import BilingualTabs from "@/components/BilingualTabs";

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    titleEn: "",
    excerpt: "",
    excerptEn: "",
    content: "",
    contentEn: "",
    image: "",
    author: "Admin",
    category: "",
    isPublished: false,
  });

  useEffect(() => {
    fetch(`/api/blog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          title: data.title || "",
          titleEn: data.titleEn || "",
          excerpt: data.excerpt || "",
          excerptEn: data.excerptEn || "",
          content: data.content || "",
          contentEn: data.contentEn || "",
          image: data.image || "",
          author: data.author || "Admin",
          category: data.category || "",
          isPublished: data.isPublished ?? false,
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push("/admin/blog");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-gray-500">Chargement…</p>;
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/blog">
          <Button variant="ghost" size="icon-sm">
            <ArrowLeft size={16} />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Modifier l&apos;article</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg border">
        <div className="space-y-2">
          <Label>Titre *</Label>
          <BilingualTabs
            frContent={<Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />}
            enContent={<Input id="titleEn" value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} placeholder="English title" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Extrait</Label>
          <BilingualTabs
            frContent={<Input id="excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />}
            enContent={<Input id="excerptEn" value={form.excerptEn} onChange={(e) => setForm({ ...form, excerptEn: e.target.value })} placeholder="English excerpt" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Contenu *</Label>
          <BilingualTabs
            frContent={<Textarea id="content" rows={12} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required />}
            enContent={<Textarea id="contentEn" rows={12} value={form.contentEn} onChange={(e) => setForm({ ...form, contentEn: e.target.value })} placeholder="English content" />}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">URL de l&apos;image</Label>
          <Input
            id="image"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            placeholder="https://..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="author">Auteur</Label>
            <Input
              id="author"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Input
              id="category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Switch
            size="sm"
            checked={form.isPublished}
            onCheckedChange={(val) => setForm({ ...form, isPublished: val })}
          />
          <Label>Publié</Label>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Link href="/admin/blog">
            <Button type="button" variant="outline">
              Annuler
            </Button>
          </Link>
          <Button type="submit" disabled={saving}>
            {saving ? "Enregistrement…" : "Enregistrer"}
          </Button>
        </div>
      </form>
    </div>
  );
}
