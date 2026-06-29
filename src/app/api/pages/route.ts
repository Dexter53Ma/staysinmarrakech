import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { generateSlug, ensureUniqueSlug, validateFields, apiError } from "@/lib/api-helpers";
import { validate, pageSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    const where = slug ? { slug } : {};

    const pages = await prisma.staticPage.findMany({
      where,
      orderBy: { slug: "asc" },
      select: { id: true, slug: true, title: true, updatedAt: true },
    });
    return NextResponse.json(pages);
  } catch {
    return apiError("Erreur lors de la récupération des pages");
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    const v = validate(pageSchema, body);
    if (!v.success) {
      return NextResponse.json({ error: v.error }, { status: 400 });
    }

    const { title, content, metaDescription: metaDesc } = v.data;

    let slug = generateSlug(title);
    slug = await ensureUniqueSlug(slug, (s) => prisma.staticPage.findUnique({ where: { slug: s }, select: { id: true } }));

    const page = await prisma.staticPage.create({
      data: {
        slug,
        title,
        content: content || "",
        metaDesc: metaDesc || null,
      },
    });

    return NextResponse.json(page, { status: 201 });
  } catch {
    return apiError("Erreur lors de la création de la page");
  }
}
