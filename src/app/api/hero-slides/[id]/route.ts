import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { logAudit } from "@/lib/audit";

export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.heroSlide.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Slide non trouvé" }, { status: 404 });
    }

    const slide = await prisma.heroSlide.update({
      where: { id },
      data: {
        title: body.title ?? existing.title,
        subtitle: body.subtitle !== undefined ? body.subtitle : existing.subtitle,
        image: body.image ?? existing.image,
        link: body.link !== undefined ? body.link : existing.link,
        buttonText: body.buttonText !== undefined ? body.buttonText : existing.buttonText,
        sortOrder: body.sortOrder !== undefined ? parseInt(body.sortOrder) : existing.sortOrder,
        isActive: body.isActive !== undefined ? body.isActive : existing.isActive,
      },
    });

    await logAudit(auth.dbUser?.id || null, "update", "hero_slide", id, { title: slide.title });

    return NextResponse.json(slide);
  } catch {
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
    await logAudit(auth.dbUser?.id || null, "delete", "hero_slide", id);
    await prisma.heroSlide.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}
