"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, RefreshCw } from "lucide-react";

interface Page {
  id: string;
  slug: string;
  title: string;
  updatedAt: string;
}

export default function AdminPagesPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/pages");
      const data = await res.json();
      setPages(Array.isArray(data) ? data : []);
    } catch {
      setPages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    async function loadPages() {
      setLoading(true);
      try {
        const res = await fetch("/api/pages");
        const data = await res.json();
        setPages(Array.isArray(data) ? data : []);
      } catch {
        setPages([]);
      } finally {
        setLoading(false);
      }
    }
    loadPages();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Pages</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchPages}>
            <RefreshCw size={16} />
          </Button>
          <Link href="/admin/pages/new">
            <Button size="sm">
              <Plus size={16} className="mr-1" />
              Nouvelle page
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Dernière modification</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                    Chargement...
                  </TableCell>
                </TableRow>
              ) : pages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                    Aucune page trouvée
                  </TableCell>
                </TableRow>
              ) : (
                pages.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.title}</TableCell>
                    <TableCell className="text-sm text-gray-500">/{p.slug}</TableCell>
                    <TableCell>
                      {new Date(p.updatedAt).toLocaleDateString("fr-FR")}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/admin/pages/${p.slug}`}>
                        <Button size="icon-sm" variant="ghost" title="Modifier">
                          <Pencil size={14} />
                        </Button>
                      </Link>
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
