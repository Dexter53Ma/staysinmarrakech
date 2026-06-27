"use client";

import { useEffect, useState } from "react";
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
import { Plus, Pencil, Trash2 } from "lucide-react";

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

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        setPosts(data);
      } catch {
        console.error("Erreur lors du chargement des articles");
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const togglePublish = async (id: string, current: boolean) => {
    try {
      await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !current }),
      });
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isPublished: !current } : p))
      );
    } catch {
      console.error("Erreur lors de la mise à jour");
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Supprimer cet article ?")) return;
    try {
      await fetch(`/api/blog/${id}`, { method: "DELETE" });
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      console.error("Erreur lors de la suppression");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Articles de blog</h1>
        <Link href="/admin/blog/new">
          <Button>
            <Plus size={16} />
            Nouvel article
          </Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Chargement…</p>
      ) : posts.length === 0 ? (
        <p className="text-sm text-gray-500">Aucun article.</p>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden">
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
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => deletePost(post.id)}
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
    </div>
  );
}
