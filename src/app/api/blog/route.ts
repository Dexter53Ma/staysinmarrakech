import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published");

    const where: Record<string, unknown> = {};
    if (published === "true") where.isPublished = true;
    if (published === "false") where.isPublished = false;

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: "Erreur lors de la récupération des articles" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireApiAuth();
  if (auth.error) return auth.error;
  try {
    const body = await request.json();
    const { title, excerpt, content, image, author, category, isPublished } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Le titre et le contenu sont requis" }, { status: 400 });
    }

    let slug = slugify(title);
    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        image: image || null,
        author: author || "Admin",
        category: category || null,
        isPublished: isPublished ?? false,
        publishedAt: isPublished ? new Date() : null,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la création de l'article" }, { status: 500 });
  }
}
