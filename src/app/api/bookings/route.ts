import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendBookingNotification } from "@/lib/resend";
import { requireApiAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const auth = await requireApiAuth();
  if (auth.error) return auth.error;
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const where = status && status !== "ALL" ? { status: status as "PENDING" | "CONFIRMED" | "REJECTED" | "CANCELLED" } : {};

    const bookings = await prisma.booking.findMany({
      where,
      include: { property: { select: { title: true, slug: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(bookings);
  } catch {
    return NextResponse.json({ error: "Erreur lors du chargement" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { propertyId, guestName, guestEmail, guestPhone, checkIn, checkOut, guestsCount, message } = body;

    if (!propertyId || !guestName || !guestEmail || !checkIn || !checkOut || !guestsCount) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        propertyId,
        guestName,
        guestEmail,
        guestPhone: guestPhone || null,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        guestsCount: parseInt(guestsCount),
        message: message || null,
      },
      include: { property: { select: { title: true } } },
    });

    try {
      await sendBookingNotification({
        guestName: booking.guestName,
        guestEmail: booking.guestEmail,
        propertyTitle: booking.property.title,
        checkIn: booking.checkIn.toLocaleDateString("fr-FR"),
        checkOut: booking.checkOut.toLocaleDateString("fr-FR"),
        guestsCount: booking.guestsCount,
        message: booking.message || undefined,
      });
    } catch {
      // Email failure shouldn't block booking creation
    }

    return NextResponse.json(booking, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 });
  }
}
