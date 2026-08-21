import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json({ error: "session_id is required" }, { status: 400 });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const bookingId = session.metadata?.bookingId;
    if (!bookingId) {
      return NextResponse.json({ error: "No booking associated" }, { status: 404 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { property: { select: { title: true, currency: true } } },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({
      bookingId: booking.id,
      propertyTitle: booking.property.title,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      nights: Math.ceil((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / (1000 * 60 * 60 * 24)),
      guestsCount: booking.guestsCount,
      totalPrice: booking.totalPrice,
      currency: booking.property.currency || "EUR",
      guestName: booking.guestName,
      guestEmail: booking.guestEmail,
    });
  } catch (err) {
    console.error("[Stripe] session lookup error:", err);
    return NextResponse.json({ error: "Erreur lors de la récupération" }, { status: 500 });
  }
}
