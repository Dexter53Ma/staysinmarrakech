import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function GET() {
  try {
    const pages = await prisma.staticPage.findMany({
      orderBy: { slug: "asc" },
      select: { id: true, slug: true, title: true, updatedAt: true },
    });
    return NextResponse.json(pages);
  } catch {
    return NextResponse.json({ error: "Erreur lors de la récupération des pages" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireApiAuth();
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    const { title, content, metaDesc } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Le titre et le contenu sont requis" }, { status: 400 });
    }

    let slug = generateSlug(title);
    const slugExists = await prisma.staticPage.findUnique({ where: { slug } });
    if (slugExists) {
      slug = `${slug}-${Date.now()}`;
    }

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
    return NextResponse.json({ error: "Erreur lors de la création de la page" }, { status: 500 });
  }
}
