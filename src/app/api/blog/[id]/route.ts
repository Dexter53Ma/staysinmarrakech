import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { logAudit } from "@/lib/audit";

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const auth = await requireAdminApi();
    const isAdmin = !auth.error;

    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post) {
      return NextResponse.json({ error: "Article non trouvé" }, { status: 404 });
    }

    if (!isAdmin && !post.isPublished) {
      return NextResponse.json({ error: "Article non trouvé" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, excerpt, content, image, author, category, isPublished } = body;

    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Article non trouvé" }, { status: 404 });
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        title: title ?? existing.title,
        excerpt: excerpt !== undefined ? excerpt : existing.excerpt,
        content: content ?? existing.content,
        image: image !== undefined ? image : existing.image,
        author: author ?? existing.author,
        category: category !== undefined ? category : existing.category,
        isPublished: isPublished ?? existing.isPublished,
        publishedAt: isPublished && !existing.isPublished ? new Date() : existing.publishedAt,
      },
    });

    await logAudit(auth.dbUser?.id || null, "update", "blog_post", id, { title: post.title });

    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
    await logAudit(auth.dbUser?.id || null, "delete", "blog_post", id);
    await prisma.blogPost.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}
