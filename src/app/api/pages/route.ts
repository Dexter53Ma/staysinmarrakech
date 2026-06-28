import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/auth";
import { generateSlug, ensureUniqueSlug, validateFields, apiError } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const pages = await prisma.staticPage.findMany({
      orderBy: { slug: "asc" },
      select: { id: true, slug: true, title: true, updatedAt: true },
    });
    return NextResponse.json(pages);
  } catch {
    return apiError("Erreur lors de la récupération des pages");
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireApiAuth();
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    const { title, content, metaDesc } = body;

    const validationError = validateFields(body, ["title", "content"]);
    if (validationError) return validationError;

    let slug = generateSlug(title);
    slug = await ensureUniqueSlug(slug, (s) => prisma.staticPage.findUnique({ where: { slug: s }, select: { id: true } }));

    const page = await prisma.staticPage.create({
      data: {
        slug,
        title,
        content,
        metaDesc: metaDesc || null,
      },
    });

    return NextResponse.json(page, { status: 201 });
  } catch {
    return apiError("Erreur lors de la création de la page");
  }
}
