"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash2, RefreshCw } from "lucide-react";

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string | null;
  category: string | null;
  price: number | null;
  priceUnit: string | null;
  isActive: boolean;
  sortOrder: number;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch {
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        setServices(Array.isArray(data) ? data : []);
      } catch {
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const toggleActive = async (id: string, current: boolean) => {
    setToggling(id);
    try {
      await fetch(`/api/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !current }),
      });
      fetchServices();
    } finally {
      setToggling(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce service ?")) return;
    try {
      await fetch(`/api/services/${id}`, { method: "DELETE" });
      fetchServices();
    } catch {
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Services</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchServices}>
            <RefreshCw size={16} />
          </Button>
          <Link href="/admin/services/new">
            <Button size="sm">
              <Plus size={16} className="mr-1" />
              Nouveau service
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Actif</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Chargement...
                  </TableCell>
                </TableRow>
              ) : services.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Aucun service trouvé
                  </TableCell>
                </TableRow>
              ) : (
                services.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>
                      {s.image ? (
                        <Image
                          src={s.image}
                          alt={s.title}
                          width={48}
                          height={48}
                          className="rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                          —
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{s.title}</TableCell>
                    <TableCell>{s.category || "—"}</TableCell>
                    <TableCell>
                      {s.price ? `${s.price} € ${s.priceUnit || ""}` : "Gratuit"}
                    </TableCell>
                    <TableCell>
                      <Switch
                        size="sm"
                        checked={s.isActive}
                        disabled={toggling === s.id}
                        onCheckedChange={() => toggleActive(s.id, s.isActive)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        <Link href={`/admin/services/${s.id}/edit`}>
                          <Button size="icon-sm" variant="ghost" title="Modifier">
                            <Pencil size={16} />
                          </Button>
                        </Link>
                        <Button
                          size="icon-sm"
                          variant="ghost"
                          title="Supprimer"
                          onClick={() => handleDelete(s.id)}
                        >
                          <Trash2 size={16} className="text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
