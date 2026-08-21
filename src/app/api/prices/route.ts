import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface NightlyPrice {
  date: string;
  price: number;
  basePrice: number;
  reason: string | null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { propertyId, checkIn, checkOut } = body;

    if (!propertyId || !checkIn || !checkOut) {
      return NextResponse.json({ error: "propertyId, checkIn, and checkOut are required" }, { status: 400 });
    }

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: { price: true, currency: true },
    });

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      return NextResponse.json({ error: "checkOut must be after checkIn" }, { status: 400 });
    }

    const overrides = await prisma.priceOverride.findMany({
      where: {
        propertyId,
        startDate: { lt: checkOutDate },
        endDate: { gt: checkInDate },
      },
      orderBy: { startDate: "asc" },
    });

    const nightlyBreakdown: NightlyPrice[] = [];
    const current = new Date(checkInDate);

    while (current < checkOutDate) {
      const dayStr = current.toISOString().split("T")[0];
      const dayStart = new Date(current);
      const dayEnd = new Date(current);
      dayEnd.setDate(dayEnd.getDate() + 1);

      const override = overrides.find(
        (o) => dayStart >= o.startDate && dayStart < o.endDate
      );

      nightlyBreakdown.push({
        date: dayStr,
        price: override ? override.price : property.price,
        basePrice: property.price,
        reason: override?.reason || null,
      });

      current.setDate(current.getDate() + 1);
    }

    const total = nightlyBreakdown.reduce((sum, n) => sum + n.price, 0);
    const nights = nightlyBreakdown.length;

    return NextResponse.json({
      nightlyBreakdown,
      total,
      nights,
      currency: property.currency,
    });
  } catch {
    return NextResponse.json({ error: "Erreur lors du calcul des prix" }, { status: 500 });
  }
}
