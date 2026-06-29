import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { generateSlug, ensureUniqueSlug, validateFields, apiError } from "@/lib/api-helpers";
import { createSupabaseServer } from "@/lib/supabase-server";
import { logAudit } from "@/lib/audit";
import { parsePagination, paginatedResponse } from "@/lib/pagination";
import { validate, blogPostSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published");
    const { page, limit, skip, hasPagination } = parsePagination(searchParams);

    // Check if user is admin — admins can see unpublished posts
    let isAdmin = false;
    try {
      const supabase = await createSupabaseServer();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const dbUser = await prisma.user.findUnique({ where: { id: user.id }, select: { role: true } });
        isAdmin = dbUser?.role === "ADMIN";
      }
    } catch {
      // Not authenticated — continue as public
    }

    const where: Record<string, unknown> = {};
    if (published === "true") {
      where.isPublished = true;
    } else if (published === "false" && isAdmin) {
      where.isPublished = false;
    } else if (!isAdmin) {
      // Public: only show published posts
      where.isPublished = true;
    }
    // If admin and no published param: show all (no filter)

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: hasPagination ? skip : undefined,
        take: hasPagination ? limit : undefined,
      }),
      prisma.blogPost.count({ where }),
    ]);

    if (hasPagination) {
      return NextResponse.json(paginatedResponse(posts, total, page, limit));
    }
    return NextResponse.json(posts);
  } catch {
    return apiError("Erreur lors de la récupération des articles");
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;
  try {
    const body = await request.json();
    const v = validate(blogPostSchema, body);
    if (!v.success) {
      return NextResponse.json({ error: v.error }, { status: 400 });
    }

    const { title, excerpt, content, image, author, category, isPublished } = v.data;

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

    await logAudit(auth.dbUser?.id || null, "create", "blog_post", post.id, { title: post.title });

    return NextResponse.json(post, { status: 201 });
  } catch {
    return apiError("Erreur lors de la création de l'article");
  }
}
