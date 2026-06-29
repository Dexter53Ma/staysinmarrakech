import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { validate, testimonialSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
    const body = await request.json();
    const v = validate(testimonialSchema, body);
    if (!v.success) {
      return NextResponse.json({ error: v.error }, { status: 400 });
    }

    const existing = await prisma.testimonial.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Témoignage non trouvé" }, { status: 404 });
    }

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        guestName: v.data.guestName ?? existing.guestName,
        guestCountry: v.data.guestCountry !== undefined ? v.data.guestCountry : existing.guestCountry,
        propertyName: v.data.propertyName !== undefined ? v.data.propertyName : existing.propertyName,
        duration: v.data.duration !== undefined ? v.data.duration : existing.duration,
        year: v.data.year !== undefined ? v.data.year : existing.year,
        rating: v.data.rating !== undefined ? v.data.rating : existing.rating,
        reviewText: v.data.reviewText !== undefined ? v.data.reviewText : existing.reviewText,
        isApproved: v.data.isApproved ?? existing.isApproved,
      },
    });

    await logAudit(auth.dbUser?.id || null, "update", "testimonial", id, { guestName: testimonial.guestName });

    return NextResponse.json(testimonial);
  } catch {
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
    await logAudit(auth.dbUser?.id || null, "delete", "testimonial", id);
    await prisma.testimonial.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}
