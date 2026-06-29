"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Lock, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { AdminPageHeader } from "@/components/admin";
import { createSupabaseBrowser } from "@/lib/supabase-browser";

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
  const [saveMsg, setSaveMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Account state
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [emailMsg, setEmailMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

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

  // Fetch current user email
  useEffect(() => {
    const supabase = createSupabaseBrowser();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) {
        setCurrentEmail(data.user.email);
        setNewEmail(data.user.email);
      }
    });
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg(null);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error("Failed");
      setSaveMsg({ type: "success", text: "Paramètres sauvegardés avec succès." });
    } catch {
      setSaveMsg({ type: "error", text: "Erreur lors de la sauvegarde." });
    } finally {
      setSaving(false);
    }
  };

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailLoading(true);
    setEmailMsg(null);
    try {
      const supabase = createSupabaseBrowser();
      const { error } = await supabase.auth.updateUser({ email: newEmail });
      if (error) {
        setEmailMsg({ type: "error", text: error.message });
      } else {
        setEmailMsg({ type: "success", text: "Un email de confirmation a été envoyé. Vérifiez votre boîte de réception." });
        setCurrentEmail(newEmail);
      }
    } catch {
      setEmailMsg({ type: "error", text: "Une erreur est survenue." });
    } finally {
      setEmailLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordMsg(null);

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "Les mots de passe ne correspondent pas." });
      setPasswordLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMsg({ type: "error", text: "Le mot de passe doit contenir au moins 6 caractères." });
      setPasswordLoading(false);
      return;
    }

    try {
      const supabase = createSupabaseBrowser();
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        setPasswordMsg({ type: "error", text: error.message });
      } else {
        setPasswordMsg({ type: "success", text: "Mot de passe modifié avec succès." });
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch {
      setPasswordMsg({ type: "error", text: "Une erreur est survenue." });
    } finally {
      setPasswordLoading(false);
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

      {saveMsg && (
        <div className={`flex items-center gap-2 text-sm px-3 py-2.5 rounded-xl ${
          saveMsg.type === "success"
            ? "text-green-700 bg-green-50 border border-green-100"
            : "text-red-600 bg-red-50 border border-red-100"
        }`}>
          {saveMsg.type === "success" ? <CheckCircle className="size-4 shrink-0" /> : <AlertCircle className="size-4 shrink-0" />}
          {saveMsg.text}
        </div>
      )}

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

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="size-5" />
            Modifier l&apos;email
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailChange} className="space-y-4">
            <div>
              <Label htmlFor="current_email">Email actuel</Label>
              <Input id="current_email" value={currentEmail} disabled className="mt-1.5 bg-gray-50" />
            </div>
            <div>
              <Label htmlFor="new_email">Nouvel email</Label>
              <Input
                id="new_email"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="nouveau@email.com"
                required
                className="mt-1.5"
              />
            </div>
            {emailMsg && (
              <div className={`flex items-center gap-2 text-sm px-3 py-2.5 rounded-xl ${
                emailMsg.type === "success"
                  ? "text-green-700 bg-green-50 border border-green-100"
                  : "text-red-600 bg-red-50 border border-red-100"
              }`}>
                {emailMsg.type === "success" ? <CheckCircle className="size-4 shrink-0" /> : <AlertCircle className="size-4 shrink-0" />}
                {emailMsg.text}
              </div>
            )}
            <button
              type="submit"
              disabled={emailLoading || newEmail === currentEmail}
              className="h-10 px-5 bg-[#0d47a1] hover:bg-[#0a3a82] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-all duration-200 active:scale-[0.98] flex items-center gap-2"
            >
              {emailLoading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Mail className="size-4" />
              )}
              Modifier l&apos;email
            </button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="size-5" />
            Modifier le mot de passe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <Label htmlFor="new_password">Nouveau mot de passe</Label>
              <Input
                id="new_password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="confirm_password">Confirmer le mot de passe</Label>
              <Input
                id="confirm_password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="mt-1.5"
              />
            </div>
            {passwordMsg && (
              <div className={`flex items-center gap-2 text-sm px-3 py-2.5 rounded-xl ${
                passwordMsg.type === "success"
                  ? "text-green-700 bg-green-50 border border-green-100"
                  : "text-red-600 bg-red-50 border border-red-100"
              }`}>
                {passwordMsg.type === "success" ? <CheckCircle className="size-4 shrink-0" /> : <AlertCircle className="size-4 shrink-0" />}
                {passwordMsg.text}
              </div>
            )}
            <button
              type="submit"
              disabled={passwordLoading || !newPassword || !confirmPassword}
              className="h-10 px-5 bg-[#0d47a1] hover:bg-[#0a3a82] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-all duration-200 active:scale-[0.98] flex items-center gap-2"
            >
              {passwordLoading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Lock className="size-4" />
              )}
              Modifier le mot de passe
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
