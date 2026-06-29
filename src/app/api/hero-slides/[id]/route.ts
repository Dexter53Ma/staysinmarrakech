import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { validate, heroSlideSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
    const body = await request.json();
    const v = validate(heroSlideSchema, body);
    if (!v.success) {
      return NextResponse.json({ error: v.error }, { status: 400 });
    }

    const existing = await prisma.heroSlide.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Slide non trouvé" }, { status: 404 });
    }

    const slide = await prisma.heroSlide.update({
      where: { id },
      data: {
        title: v.data.title ?? existing.title,
        subtitle: v.data.subtitle !== undefined ? v.data.subtitle : existing.subtitle,
        image: v.data.image ?? existing.image,
        link: v.data.link !== undefined ? v.data.link : existing.link,
        buttonText: v.data.buttonText !== undefined ? v.data.buttonText : existing.buttonText,
        sortOrder: v.data.sortOrder !== undefined ? v.data.sortOrder : existing.sortOrder,
        isActive: v.data.isActive !== undefined ? v.data.isActive : existing.isActive,
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
