import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireApiAuth();
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.testimonial.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Témoignage non trouvé" }, { status: 404 });
    }

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        guestName: body.guestName ?? existing.guestName,
        guestCountry: body.guestCountry !== undefined ? body.guestCountry : existing.guestCountry,
        propertyName: body.propertyName !== undefined ? body.propertyName : existing.propertyName,
        duration: body.duration !== undefined ? body.duration : existing.duration,
        year: body.year !== undefined ? body.year : existing.year,
        rating: body.rating !== undefined ? body.rating : existing.rating,
        reviewText: body.reviewText !== undefined ? body.reviewText : existing.reviewText,
        isApproved: body.isApproved ?? existing.isApproved,
      },
    });

    return NextResponse.json(testimonial);
  } catch {
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireApiAuth();
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
    await prisma.testimonial.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}
