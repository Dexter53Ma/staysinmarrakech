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
  const [error, setError] = useState<string | null>(null);
  const [locLang, setLocLang] = useState<"fr" | "en">("fr");
  const [form, setForm] = useState({
    title: "",
    titleEn: "",
    content: "",
    contentEn: "",
    metaDesc: "",
    metaDescEn: "",
  });

  const handleSave = async () => {
    if (!form.title || !form.content) {
      setError("Le titre et le contenu sont requis");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const body = {
        ...form,
        titleEn: form.titleEn || form.title,
        contentEn: form.contentEn || form.content,
        metaDescEn: form.metaDescEn || form.metaDesc,
      };
      const res = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const data = await res.json();
        router.push(`/admin/pages/${data.slug}`);
      } else {
        setError("Erreur lors de la création");
      }
    } catch {
      setError("Erreur lors de la création");
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
          {error && (
            <div className="flex items-center gap-2 text-sm px-3 py-2.5 rounded-xl text-red-600 bg-red-50 border border-red-100">
              {error}
            </div>
          )}
          <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
            <button type="button" onClick={() => setLocLang("fr")} className={`flex-1 text-sm py-1.5 rounded-md transition-colors ${locLang === "fr" ? "bg-white shadow-sm font-medium" : "text-gray-500"}`}>FR</button>
            <button type="button" onClick={() => setLocLang("en")} className={`flex-1 text-sm py-1.5 rounded-md transition-colors ${locLang === "en" ? "bg-white shadow-sm font-medium" : "text-gray-500"}`}>EN</button>
          </div>
          {locLang === "fr" ? (
            <>
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
            </>
          ) : (
            <>
              <div>
                <Label htmlFor="titleEn">Title (EN)</Label>
                <Input
                  id="titleEn"
                  value={form.titleEn}
                  onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                  placeholder="Page title"
                />
              </div>
              <div>
                <Label htmlFor="contentEn">Content (EN)</Label>
                <Textarea
                  id="contentEn"
                  value={form.contentEn}
                  onChange={(e) => setForm({ ...form, contentEn: e.target.value })}
                  placeholder="Page content (HTML supported)"
                  rows={15}
                  className="font-mono text-sm"
                />
              </div>
              <div>
                <Label htmlFor="metaDescEn">Meta Description (EN)</Label>
                <Textarea
                  id="metaDescEn"
                  value={form.metaDescEn}
                  onChange={(e) => setForm({ ...form, metaDescEn: e.target.value })}
                  placeholder="SEO description"
                  rows={3}
                />
              </div>
            </>
          )}
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
