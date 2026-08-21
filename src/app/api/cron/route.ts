import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendPreArrivalEmail, sendReviewRequestEmail } from "@/lib/email-templates";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const results = {
      preArrivalSent: 0,
      reviewSent: 0,
      errors: [] as string[],
    };

    // Send pre-arrival emails (48h before check-in)
    const fortyEightHoursFromNow = new Date(now.getTime() + 48 * 60 * 60 * 1000);
    const bookingsForPreArrival = await prisma.booking.findMany({
      where: {
        status: "CONFIRMED",
        preArrivalSent: false,
        checkIn: {
          gte: now,
          lte: fortyEightHoursFromNow,
        },
      },
      include: {
        property: {
          select: {
            title: true,
            address: true,
          },
        },
      },
    });

    for (const booking of bookingsForPreArrival) {
      try {
        await sendPreArrivalEmail({
          guestName: booking.guestName,
          guestEmail: booking.guestEmail,
          propertyTitle: booking.property.title,
          propertyAddress: booking.property.address,
          checkIn: booking.checkIn.toLocaleDateString("fr-FR"),
          checkOut: booking.checkOut.toLocaleDateString("fr-FR"),
          totalPrice: booking.totalPrice ? `${booking.totalPrice} €` : "Sur demande",
          referenceCode: booking.referenceCode || booking.id,
        });

        await prisma.booking.update({
          where: { id: booking.id },
          data: { preArrivalSent: true },
        });

        results.preArrivalSent++;
      } catch (error) {
        results.errors.push(`Pre-arrival email failed for booking ${booking.id}: ${error}`);
      }
    }

    // Send review request emails (2 days after checkout)
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
    const bookingsForReview = await prisma.booking.findMany({
      where: {
        status: "CONFIRMED",
        reviewSent: false,
        checkOut: {
          lte: twoDaysAgo,
        },
      },
      include: {
        property: {
          select: {
            title: true,
          },
        },
      },
    });

    for (const booking of bookingsForReview) {
      try {
        await sendReviewRequestEmail({
          guestName: booking.guestName,
          guestEmail: booking.guestEmail,
          propertyTitle: booking.property.title,
          checkIn: booking.checkIn.toLocaleDateString("fr-FR"),
          checkOut: booking.checkOut.toLocaleDateString("fr-FR"),
          totalPrice: booking.totalPrice ? `${booking.totalPrice} €` : "Sur demande",
          referenceCode: booking.referenceCode || booking.id,
        });

        await prisma.booking.update({
          where: { id: booking.id },
          data: { reviewSent: true },
        });

        results.reviewSent++;
      } catch (error) {
        results.errors.push(`Review email failed for booking ${booking.id}: ${error}`);
      }
    }

    return NextResponse.json({
      success: true,
      ...results,
      timestamp: now.toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", details: error },
      { status: 500 }
    );
  }
}
