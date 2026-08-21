"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react";
import { AdminPageHeader } from "@/components/admin";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

interface EmailTemplate {
  name: string;
  subject: string;
  body: string;
  updatedAt: string;
}

const TEMPLATE_KEYS = ["booking_confirmation", "booking_rejection", "contact_reply", "pre_arrival", "post_stay_review"] as const;

const TEMPLATE_LABELS: Record<string, string> = {
  booking_confirmation: "Confirmation de réservation",
  booking_rejection: "Refus de réservation",
  contact_reply: "Réponse au contact",
  pre_arrival: "Email pré-arrivée (48h avant)",
  post_stay_review: "Demande d'avis après séjour",
};

const TEMPLATE_DESCRIPTIONS: Record<string, string> = {
  booking_confirmation: "Envoyé lorsqu'une réservation est acceptée",
  booking_rejection: "Envoyé lorsqu'une réservation est refusée",
  contact_reply: "Réponse automatique aux messages de contact",
  pre_arrival: "Envoyé 48 heures avant l'arrivée avec les informations pratiques",
  post_stay_review: "Envoyé 2 jours après le départ pour demander un avis",
};

const AVAILABLE_VARIABLES = [
  { name: "guest_name", desc: "Nom du client" },
  { name: "property_name", desc: "Nom de la propriété" },
  { name: "check_in", desc: "Date d'arrivée" },
  { name: "check_out", desc: "Date de départ" },
  { name: "total_price", desc: "Prix total" },
  { name: "admin_email", desc: "Email administrateur" },
  { name: "site_url", desc: "URL du site" },
  { name: "property_address", desc: "Adresse de la propriété" },
  { name: "reference_code", desc: "Code de référence" },
  { name: "discount_code", desc: "Code de réduction" },
];

function getEmptyTemplates(): EmailTemplate[] {
  return TEMPLATE_KEYS.map((key) => ({
    name: key,
    subject: "",
    body: "",
    updatedAt: "",
  }));
}

export default function AdminEmailTemplatesPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(getEmptyTemplates());
  const [loading, setLoading] = useState(true);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [editSubject, setEditSubject] = useState("");
  const [editBody, setEditBody] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const fetchTemplates = useCallback(async () => {
    try {
      const res = await fetch("/api/email-templates");
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      if (Array.isArray(data)) {
        const merged = getEmptyTemplates().map((empty) => {
          const saved = data.find((t: EmailTemplate) => t.name === empty.name);
          return saved ? { ...empty, ...saved } : empty;
        });
        setTemplates(merged);
      }
    } catch {
      console.error("Erreur lors du chargement des templates");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const handleEdit = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setEditSubject(template.subject);
    setEditBody(template.body);
    setSaveMsg(null);
    setShowPreview(false);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingTemplate) return;
    setSaving(true);
    setSaveMsg(null);
    try {
      const key = `email_template_${editingTemplate.name}`;
      const value = JSON.stringify({ subject: editSubject, body: editBody });
      const res = await fetch("/api/email-templates", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value }),
      });
      if (!res.ok) throw new Error("Failed");
      setSaveMsg({ type: "success", text: "Template sauvegardé avec succès." });
      setTemplates((prev) =>
        prev.map((t) =>
          t.name === editingTemplate.name
            ? { ...t, subject: editSubject, body: editBody, updatedAt: new Date().toISOString() }
            : t
        )
      );
    } catch {
      setSaveMsg({ type: "error", text: "Erreur lors de la sauvegarde." });
    } finally {
      setSaving(false);
    }
  };

  const insertVariable = (varName: string) => {
    setEditBody((prev) => prev + `{{${varName}}}`);
  };

  const previewBody = editBody
    .replace(/\{\{guest_name\}\}/g, "Jean Dupont")
    .replace(/\{\{property_name\}\}/g, "Villa Les Oliviers")
    .replace(/\{\{check_in\}\}/g, "15/03/2026")
    .replace(/\{\{check_out\}\}/g, "22/03/2026")
    .replace(/\{\{total_price\}\}/g, "1 250 €")
    .replace(/\{\{admin_email\}\}/g, "admin@staysinmarrakech.com")
    .replace(/\{\{site_url\}\}/g, "https://staysinmarrakech.com");

  if (loading) {
    return (
      <div className="space-y-6 max-w-3xl">
        <AdminPageHeader
          title="Templates d'email"
          description="Gérer les emails automatiques"
          breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Templates d'email" }]}
        />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <AdminPageHeader
        title="Templates d'email"
        description="Gérer les emails automatiques envoyés aux clients"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Templates d'email" }]}
      />

      <div className="space-y-3">
        {templates.map((template) => (
          <Card
            key={template.name}
            className="cursor-pointer hover:border-gray-300 transition-colors duration-150"
            onClick={() => handleEdit(template)}
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {TEMPLATE_LABELS[template.name] || template.name}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 truncate">
                  {TEMPLATE_DESCRIPTIONS[template.name] || ""}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Sujet : {template.subject || <span className="italic">Non défini</span>}
                </p>
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="text-[11px] text-gray-400">
                  {template.updatedAt
                    ? new Date(template.updatedAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingTemplate && TEMPLATE_LABELS[editingTemplate.name]}
            </DialogTitle>
            <DialogDescription>
              Modifier le template d&apos;email
            </DialogDescription>
          </DialogHeader>

          {saveMsg && (
            <div
              className={`flex items-center gap-2 text-sm px-3 py-2.5 rounded-xl ${
                saveMsg.type === "success"
                  ? "text-green-700 bg-green-50 border border-green-100"
                  : "text-red-600 bg-red-50 border border-red-100"
              }`}
            >
              {saveMsg.type === "success" ? (
                <CheckCircle className="size-4 shrink-0" />
              ) : (
                <AlertCircle className="size-4 shrink-0" />
              )}
              {saveMsg.text}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <Label htmlFor="template-subject">Sujet</Label>
              <Input
                id="template-subject"
                value={editSubject}
                onChange={(e) => setEditSubject(e.target.value)}
                placeholder="Ex: Confirmation de votre réservation"
                className="mt-1.5"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label htmlFor="template-body">Corps de l&apos;email (HTML)</Label>
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPreview ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                  {showPreview ? "Masquer aperçu" : "Aperçu"}
                </button>
              </div>
              <textarea
                id="template-body"
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                rows={12}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200 font-mono text-[13px] leading-relaxed resize-y"
                placeholder="<h1>Bonjour {{guest_name}},</h1>&#10;<p>Votre réservation est confirmée...</p>"
              />
            </div>

            {showPreview && (
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-3 py-2 border-b border-gray-200">
                  <p className="text-xs font-medium text-gray-500">Aperçu (avec données de test)</p>
                </div>
                <div
                  className="p-4 text-sm text-gray-800 bg-white prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: previewBody }}
                />
              </div>
            )}

            <div>
              <Label className="text-xs text-gray-500 font-medium">Variables disponibles</Label>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {AVAILABLE_VARIABLES.map((v) => (
                  <button
                    key={v.name}
                    type="button"
                    onClick={() => insertVariable(v.name)}
                    className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-mono bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                    title={v.desc}
                  >
                    {`{{${v.name}}}`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              Annuler
            </DialogClose>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0d47a1] hover:bg-[#0a3a82] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-all duration-200 active:scale-[0.98]"
            >
              {saving ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              Sauvegarder
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
