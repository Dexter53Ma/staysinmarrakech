"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { AdminPageHeader } from "@/components/admin";

const fields = [
  { key: "site_name", label: "Nom du site", type: "input" },
  { key: "site_description", label: "Description du site", type: "textarea" },
  { key: "phone_1", label: "Telephone 1", type: "input" },
  { key: "phone_2", label: "Telephone 2", type: "input" },
  { key: "email", label: "Email", type: "input" },
  { key: "address", label: "Adresse", type: "textarea" },
  { key: "facebook", label: "Facebook", type: "input" },
  { key: "twitter", label: "Twitter", type: "input" },
  { key: "instagram", label: "Instagram", type: "input" },
  { key: "linkedin", label: "LinkedIn", type: "input" },
];

const sectionFields = [
  { key: "hero_title", label: "Hero Titre", type: "input" },
  { key: "hero_subtitle", label: "Hero Sous-titre", type: "input" },
  { key: "stats_experience", label: "Stat Expérience", type: "input" },
  { key: "stats_clients", label: "Stat Clients", type: "input" },
  { key: "stats_quality", label: "Stat Qualité", type: "input" },
  { key: "stats_services", label: "Stat Services", type: "input" },
  { key: "stats_presence", label: "Stat Présence", type: "input" },
  { key: "location_title", label: "Section Location Titre", type: "input" },
  { key: "location_description", label: "Section Location Description", type: "textarea" },
  { key: "location_image", label: "Section Location Image", type: "input" },
  { key: "location_link_text", label: "Section Location Bouton", type: "input" },
  { key: "shortrental_title", label: "Section Courte Durée Titre", type: "input" },
  { key: "shortrental_description", label: "Section Courte Durée Description", type: "textarea" },
  { key: "shortrental_image", label: "Section Courte Durée Image", type: "input" },
  { key: "events_title", label: "Section Événements Titre", type: "input" },
  { key: "events_description", label: "Section Événements Description", type: "textarea" },
  { key: "events_image", label: "Section Événements Image", type: "input" },
  { key: "vacations_title", label: "Section Vacances Titre", type: "input" },
  { key: "vacations_description", label: "Section Vacances Description", type: "textarea" },
  { key: "vacations_image", label: "Section Vacances Image", type: "input" },
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      setSettings(data);
    } catch {
      console.error("Erreur lors du chargement des parametres");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        setSettings(data);
      } catch {
        console.error("Erreur lors du chargement des parametres");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      // Saved successfully
    } catch {
      console.error("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-3xl">
        <AdminPageHeader
          title="Paramètres du site"
          description="Configuration générale et contenu des sections"
          breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Paramètres" }]}
        />
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-100 rounded w-32 animate-pulse" />
              <div className="h-10 bg-gray-100 rounded-xl animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <AdminPageHeader
        title="Paramètres du site"
        description="Configuration générale et contenu des sections"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Paramètres" }]}
        action={{ label: saving ? "Sauvegarde..." : "Sauvegarder", onClick: handleSave, icon: Save }}
      />

      <Card>
        <CardHeader>
          <CardTitle>Informations generales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.map((f) => (
            <div key={f.key}>
              <Label htmlFor={f.key}>{f.label}</Label>
              {f.type === "textarea" ? (
                <Textarea
                  id={f.key}
                  value={settings[f.key] || ""}
                  onChange={(e) => handleChange(f.key, e.target.value)}
                  rows={3}
                />
              ) : (
                <Input
                  id={f.key}
                  value={settings[f.key] || ""}
                  onChange={(e) => handleChange(f.key, e.target.value)}
                />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contenu des sections</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sectionFields.map((f) => (
            <div key={f.key}>
              <Label htmlFor={f.key}>{f.label}</Label>
              {f.type === "textarea" ? (
                <Textarea
                  id={f.key}
                  value={settings[f.key] || ""}
                  onChange={(e) => handleChange(f.key, e.target.value)}
                  rows={3}
                />
              ) : (
                <Input
                  id={f.key}
                  value={settings[f.key] || ""}
                  onChange={(e) => handleChange(f.key, e.target.value)}
                />
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
