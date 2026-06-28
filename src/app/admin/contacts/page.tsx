"use client";

import { useEffect, useState } from "react";
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
import { Eye, Trash2, CheckCircle, Mail } from "lucide-react";
import { AdminPageHeader } from "@/components/admin";
import { EmptyState } from "@/components/admin";
import { TableSkeleton } from "@/components/admin";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  createdAt: string;
  property?: { title: string } | null;
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await fetch("/api/contacts");
        const data = await res.json();
        setContacts(data);
      } catch {
        console.error("Erreur lors du chargement des messages");
      } finally {
        setLoading(false);
      }
    }
    fetchContacts();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "READ" }),
      });
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: "READ" } : c))
      );
    } catch {
      console.error("Erreur lors de la mise à jour");
    }
  };

  const markAsReplied = async (id: string) => {
    try {
      await fetch(`/api/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "REPLIED" }),
      });
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: "REPLIED" } : c))
      );
    } catch {
      console.error("Erreur lors de la mise à jour");
    }
  };

  const deleteContact = async (id: string) => {
    if (!confirm("Supprimer ce message ?")) return;
    try {
      await fetch(`/api/contacts/${id}`, { method: "DELETE" });
      setContacts((prev) => prev.filter((c) => c.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch {
      console.error("Erreur lors de la suppression");
    }
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case "NEW":
        return <Badge className="bg-blue-100 text-blue-800">Nouveau</Badge>;
      case "READ":
        return <Badge variant="secondary">Lu</Badge>;
      case "REPLIED":
        return <Badge variant="outline">Répondu</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Messages de contact"
        description={`${contacts.length} message${contacts.length > 1 ? "s" : ""}`}
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Contacts" }]}
      />

      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <TableSkeleton rows={5} cols={5} />
        </div>
      ) : contacts.length === 0 ? (
        <EmptyState
          icon={Mail}
          title="Aucun message"
          description="Les messages de contact apparaîtront ici."
        />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Sujet</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((c) => (
                <TableRow key={c.id} className={c.status === "NEW" ? "bg-blue-50/50" : ""}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.subject || "—"}</TableCell>
                  <TableCell>{statusBadge(c.status)}</TableCell>
                  <TableCell>
                    {new Date(c.createdAt).toLocaleDateString("fr-FR")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => {
                          setSelected(c);
                          if (c.status === "NEW") markAsRead(c.id);
                        }}
                      >
                        <Eye size={14} />
                      </Button>
                      {c.status !== "REPLIED" && (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          title="Marquer comme répondu"
                          onClick={() => markAsReplied(c.id)}
                        >
                          <CheckCircle size={14} className="text-green-600" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => deleteContact(c.id)}
                      >
                        <Trash2 size={14} className="text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selected?.subject || "Message"}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 text-sm">
              <p><strong>De :</strong> {selected.name} ({selected.email})</p>
              {selected.phone && <p><strong>Téléphone :</strong> {selected.phone}</p>}
              {selected.property && (
                <p><strong>Propriété :</strong> {selected.property.title}</p>
              )}
              <p className="text-muted-foreground whitespace-pre-wrap">{selected.message}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelected(null)}>
              Fermer
            </Button>
            <Button variant="destructive" onClick={() => selected && deleteContact(selected.id)}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
