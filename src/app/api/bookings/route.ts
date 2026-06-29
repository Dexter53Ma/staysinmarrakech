import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendBookingNotification } from "@/lib/resend";
import { requireAdminApi } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { validateCsrfToken } from "@/lib/csrf";
import { parsePagination, paginatedResponse } from "@/lib/pagination";
import { validate, bookingSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const { page, limit, skip } = parsePagination(searchParams);

    const where = status && status !== "ALL" ? { status: status as "PENDING" | "CONFIRMED" | "REJECTED" | "CANCELLED" } : {};

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: { property: { select: { title: true, slug: true } } },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.booking.count({ where }),
    ]);

    return NextResponse.json(paginatedResponse(bookings, total, page, limit));
  } catch {
    return NextResponse.json({ error: "Erreur lors du chargement" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const rl = await rateLimit(request, { limit: 3, windowMs: 60_000 });
  if (!rl.allowed) return rl.response!;

  const csrfError = await validateCsrfToken(request);
  if (csrfError) return csrfError;

  try {
    const body = await request.json();
    const v = validate(bookingSchema, body);
    if (!v.success) {
      return NextResponse.json({ error: v.error }, { status: 400 });
    }

    const { propertyId, guestName, guestEmail, guestPhone, checkIn, checkOut, guestsCount, message } = v.data;

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      return NextResponse.json({ error: "La date de départ doit être après la date d'arrivée" }, { status: 400 });
    }

    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        propertyId,
        status: { in: ["PENDING", "CONFIRMED"] },
        checkIn: { lt: checkOutDate },
        checkOut: { gt: checkInDate },
      },
      select: { id: true, checkIn: true, checkOut: true, status: true },
    });

    if (conflictingBooking) {
      return NextResponse.json(
        { error: "Ces dates ne sont pas disponibles. Veuillez choisir d'autres dates." },
        { status: 409 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        propertyId,
        guestName,
        guestEmail,
        guestPhone: guestPhone || null,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        guestsCount,
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
    } catch (e) {
      console.error("[Email] booking notification failed:", e);
    }

    return NextResponse.json(booking, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 });
  }
}
