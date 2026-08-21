import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  try {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get("propertyId");

    const where: Record<string, unknown> = {};
    if (propertyId) where.propertyId = propertyId;

    const overrides = await prisma.priceOverride.findMany({
      where,
      include: { property: { select: { title: true, slug: true } } },
      orderBy: { startDate: "desc" },
    });

    return NextResponse.json(overrides);
  } catch {
    return NextResponse.json({ error: "Erreur lors du chargement" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    const { propertyId, startDate, endDate, price, reason } = body;

    if (!propertyId || !startDate || !endDate || price === undefined) {
      return NextResponse.json({ error: "propertyId, startDate, endDate, and price are required" }, { status: 400 });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      return NextResponse.json({ error: "endDate must be after startDate" }, { status: 400 });
    }

    if (price < 0) {
      return NextResponse.json({ error: "Price must be non-negative" }, { status: 400 });
    }

    const property = await prisma.property.findUnique({ where: { id: propertyId } });
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    const existing = await prisma.priceOverride.findFirst({
      where: {
        propertyId,
        startDate: { lt: end },
        endDate: { gt: start },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Un override existe déjà pour ces dates. Modifiez-le ou supprimez-le d'abord." },
        { status: 409 }
      );
    }

    const override = await prisma.priceOverride.create({
      data: {
        propertyId,
        startDate: start,
        endDate: end,
        price,
        reason: reason || null,
      },
      include: { property: { select: { title: true } } },
    });

    return NextResponse.json(override, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 });
  }
}
