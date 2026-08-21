import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId } = body;

    if (!bookingId) {
      return NextResponse.json({ error: "bookingId is required" }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { property: { select: { title: true, slug: true, currency: true } } },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.status !== "PENDING") {
      return NextResponse.json({ error: "Booking is not in PENDING status" }, { status: 400 });
    }

    const amount = booking.totalPrice;
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Booking has no valid total price" }, { status: 400 });
    }

    const stripe = getStripe();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://staysinmarrakech.netlify.app";

    const currency = (booking.property.currency || "EUR").toLowerCase();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: booking.guestEmail,
      metadata: {
        bookingId: booking.id,
        propertyTitle: booking.property.title,
      },
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: `${booking.property.title} — ${new Date(booking.checkIn).toLocaleDateString("fr-FR")} → ${new Date(booking.checkOut).toLocaleDateString("fr-FR")}`,
              description: `${Math.ceil((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / (1000 * 60 * 60 * 24))} nuit(s) · ${booking.guestsCount} voyageur(s)`,
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/properties/${booking.property.slug}`,
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.error("[Stripe] checkout error:", err);
    return NextResponse.json({ error: "Erreur lors de la création de la session de paiement" }, { status: 500 });
  }
}
