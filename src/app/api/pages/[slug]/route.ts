import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const page = await prisma.staticPage.findUnique({ where: { slug } });
    if (!page) {
      return NextResponse.json({ error: "Page non trouvée" }, { status: 404 });
    }
    return NextResponse.json(page);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const auth = await requireApiAuth();
  if (auth.error) return auth.error;

  try {
    const { slug } = await params;
    const body = await request.json();

    const existing = await prisma.staticPage.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json({ error: "Page non trouvée" }, { status: 404 });
    }

    const page = await prisma.staticPage.update({
      where: { slug },
      data: {
        title: body.title ?? existing.title,
        content: body.content ?? existing.content,
        metaDesc: body.metaDesc !== undefined ? body.metaDesc : existing.metaDesc,
      },
    });

    return NextResponse.json(page);
  } catch {
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}
