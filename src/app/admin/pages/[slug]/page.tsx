"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

interface PageData {
  id: string;
  slug: string;
  title: string;
  content: string;
  metaDesc: string | null;
}

export default function AdminEditPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    metaDesc: "",
  });

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(`/api/pages/${slug}`);
        if (!res.ok) {
          router.push("/admin/pages");
          return;
        }
        const data = await res.json();
        setPage(data);
        setForm({
          title: data.title,
          content: data.content,
          metaDesc: data.metaDesc || "",
        });
      } catch {
        router.push("/admin/pages");
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [slug, router]);

  const handleSave = async () => {
    if (!form.title || !form.content) {
      alert("Le titre et le contenu sont requis");
      return;
    }
    setSaving(true);
    try {
      await fetch(`/api/pages/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      alert("Page sauvegardée !");
    } catch {
      alert("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-gray-500">Chargement...</p>;
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Link href="/admin/pages">
          <Button variant="ghost" size="icon-sm">
            <ArrowLeft size={16} />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Modifier la page</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{page?.slug}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Titre de la page"
            />
          </div>
          <div>
            <Label htmlFor="content">Contenu</Label>
            <Textarea
              id="content"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Contenu de la page (HTML supporté)"
              rows={15}
              className="font-mono text-sm"
            />
          </div>
          <div>
            <Label htmlFor="metaDesc">Meta Description</Label>
            <Textarea
              id="metaDesc"
              value={form.metaDesc}
              onChange={(e) => setForm({ ...form, metaDesc: e.target.value })}
              placeholder="Description pour le SEO"
              rows={3}
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={saving}>
              <Save size={16} className="mr-1" />
              {saving ? "Sauvegarde..." : "Sauvegarder"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
