"use client";

import { useEffect, useState, useCallback } from "react";
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
import { Pagination } from "@/components/admin/Pagination";
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/contacts?page=${page}&limit=20`);
      const data = await res.json();
      setContacts(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotal(data.pagination?.total || 0);
    } catch {
      console.error("Erreur lors du chargement des messages");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "READ" }),
      });
      fetchContacts();
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
      fetchContacts();
    } catch {
      console.error("Erreur lors de la mise à jour");
    }
  };

  const deleteContact = async (id: string) => {
    setDeletingId(id);
    try {
      await fetch(`/api/contacts/${id}`, { method: "DELETE" });
      fetchContacts();
      if (selected?.id === id) setSelected(null);
    } catch {
      console.error("Erreur lors de la suppression");
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
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
        description={`${total} message${total > 1 ? "s" : ""}`}
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
                      {confirmDeleteId === c.id ? (
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            disabled={deletingId === c.id}
                            onClick={() => deleteContact(c.id)}
                          >
                            {deletingId === c.id ? (
                              <span className="w-3.5 h-3.5 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
                            ) : <span className="text-destructive text-xs">Oui</span>}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => setConfirmDeleteId(null)}
                          >
                            <span className="text-xs">Non</span>
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => setConfirmDeleteId(c.id)}
                        >
                          <Trash2 size={14} className="text-destructive" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

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
            {confirmDeleteId === selected?.id ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="destructive"
                  disabled={deletingId === selected?.id}
                  onClick={() => selected && deleteContact(selected.id)}
                >
                  {deletingId === selected?.id ? "Suppression..." : "Confirmer"}
                </Button>
                <Button variant="outline" onClick={() => setConfirmDeleteId(null)}>
                  Annuler
                </Button>
              </div>
            ) : (
              <Button variant="destructive" onClick={() => selected && setConfirmDeleteId(selected.id)}>
                Supprimer
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
