import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/auth";
import { generateSlug, ensureUniqueSlug, validateFields, apiError } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

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
    return apiError("Erreur lors de la récupération des articles");
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireApiAuth();
  if (auth.error) return auth.error;
  try {
    const body = await request.json();
    const { title, excerpt, content, image, author, category, isPublished } = body;

    const validationError = validateFields(body, ["title", "content"]);
    if (validationError) return validationError;

    let slug = generateSlug(title);
    slug = await ensureUniqueSlug(slug, (s) => prisma.blogPost.findUnique({ where: { slug: s }, select: { id: true } }));

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
    return apiError("Erreur lors de la création de l'article");
  }
}
