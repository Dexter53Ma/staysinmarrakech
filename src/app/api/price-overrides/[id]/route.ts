import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  try {
    const { id } = await params;
    const body = await request.json();
    const { startDate, endDate, price, reason } = body;

    const existing = await prisma.priceOverride.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Override not found" }, { status: 404 });
    }

    const start = startDate ? new Date(startDate) : existing.startDate;
    const end = endDate ? new Date(endDate) : existing.endDate;
    const priceVal = price !== undefined ? price : existing.price;

    if (end <= start) {
      return NextResponse.json({ error: "endDate must be after startDate" }, { status: 400 });
    }

    if (priceVal < 0) {
      return NextResponse.json({ error: "Price must be non-negative" }, { status: 400 });
    }

    const conflict = await prisma.priceOverride.findFirst({
      where: {
        propertyId: existing.propertyId,
        id: { not: id },
        startDate: { lt: end },
        endDate: { gt: start },
      },
    });

    if (conflict) {
      return NextResponse.json(
        { error: "Conflit avec un autre override de prix" },
        { status: 409 }
      );
    }

    const override = await prisma.priceOverride.update({
      where: { id },
      data: {
        startDate: start,
        endDate: end,
        price: priceVal,
        reason: reason !== undefined ? (reason || null) : existing.reason,
      },
      include: { property: { select: { title: true } } },
    });

    return NextResponse.json(override);
  } catch {
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  try {
    const { id } = await params;
    const existing = await prisma.priceOverride.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Override not found" }, { status: 404 });
    }

    await prisma.priceOverride.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}
