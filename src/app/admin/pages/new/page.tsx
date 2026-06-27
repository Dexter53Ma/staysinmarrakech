"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function AdminNewPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    metaDesc: "",
  });

  const handleSave = async () => {
    if (!form.title || !form.content) {
      alert("Le titre et le contenu sont requis");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const data = await res.json();
        router.push(`/admin/pages/${data.slug}`);
      } else {
        alert("Erreur lors de la création");
      }
    } catch {
      alert("Erreur lors de la création");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Link href="/admin/pages">
          <Button variant="ghost" size="icon-sm">
            <ArrowLeft size={16} />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Nouvelle page</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Créer une page</CardTitle>
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
              {saving ? "Création..." : "Créer la page"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
