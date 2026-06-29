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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, FileText } from "lucide-react";
import { AdminPageHeader } from "@/components/admin";
import { EmptyState } from "@/components/admin";
import { TableSkeleton } from "@/components/admin";
import { Pagination } from "@/components/admin/Pagination";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  image: string | null;
  author: string;
  isPublished: boolean;
  createdAt: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/blog?page=${page}&limit=20`);
      const data = await res.json();
      setPosts(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotal(data.pagination?.total || 0);
    } catch {
      console.error("Erreur lors du chargement des articles");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const togglePublish = async (id: string, current: boolean) => {
    try {
      await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !current }),
      });
      fetchPosts();
    } catch {
      console.error("Erreur lors de la mise à jour");
    }
  };

  const deletePost = async (id: string) => {
    setDeletingId(id);
    try {
      await fetch(`/api/blog/${id}`, { method: "DELETE" });
      fetchPosts();
    } catch {
      console.error("Erreur lors de la suppression");
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Articles de blog"
        description={`${total} article${total > 1 ? "s" : ""}`}
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Blog" }]}
        action={{ label: "Nouvel article", href: "/admin/blog/new", icon: Plus }}
      />

      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <TableSkeleton rows={5} cols={5} />
        </div>
      ) : posts.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="Aucun article"
          description="Commencez par rédiger votre premier article."
          action={{ label: "Nouvel article", href: "/admin/blog/new" }}
        />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Auteur</TableHead>
                <TableHead>Publié le</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={48}
                        height={48}
                        className="rounded object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">
                        —
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>
                    {new Date(post.createdAt).toLocaleDateString("fr-FR")}
                  </TableCell>
                  <TableCell>
                    <Switch
                      size="sm"
                      checked={post.isPublished}
                      onCheckedChange={() => togglePublish(post.id, post.isPublished)}
                    />
                    <Badge variant={post.isPublished ? "default" : "secondary"} className="ml-2">
                      {post.isPublished ? "Publié" : "Brouillon"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/blog/${post.id}/edit`}>
                        <Button variant="ghost" size="icon-sm">
                          <Pencil size={14} />
                        </Button>
                      </Link>
                      {confirmDeleteId === post.id ? (
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            disabled={deletingId === post.id}
                            onClick={() => deletePost(post.id)}
                          >
                            {deletingId === post.id ? (
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
                          disabled={deletingId === post.id}
                          onClick={() => setConfirmDeleteId(post.id)}
                        >
                          {deletingId === post.id ? (
                            <span className="w-3.5 h-3.5 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
                          ) : (
                            <Trash2 size={14} className="text-destructive" />
                          )}
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
    </div>
  );
}
