import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { email, referenceCode } = await request.json();

    if (!email || !referenceCode) {
      return NextResponse.json(
        { error: "Email and reference code are required" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.findFirst({
      where: {
        guestEmail: email.toLowerCase().trim(),
        referenceCode: referenceCode.toUpperCase().trim(),
      },
      select: {
        id: true,
        referenceCode: true,
        status: true,
        checkIn: true,
        checkOut: true,
        guestsCount: true,
        totalPrice: true,
        guestName: true,
        property: {
          select: {
            title: true,
            address: true,
            city: true,
          },
        },
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Aucune réservation trouvée / No booking found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ booking });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la recherche / Lookup failed" },
      { status: 500 }
    );
  }
}
