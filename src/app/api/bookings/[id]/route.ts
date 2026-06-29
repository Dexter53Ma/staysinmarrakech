import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendBookingConfirmation } from "@/lib/resend";
import { requireAdminApi } from "@/lib/auth";
import { validateCsrfToken } from "@/lib/csrf";
import { logAudit } from "@/lib/audit";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { property: { select: { title: true, slug: true, address: true, city: true } } },
    });

    if (!booking) {
      return NextResponse.json({ error: "Réservation introuvable" }, { status: 404 });
    }

    return NextResponse.json(booking);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  const csrfError = await validateCsrfToken(request);
  if (csrfError) return csrfError;

  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.booking.findUnique({
      where: { id },
      include: { property: { select: { title: true } } },
    });

    if (!existing) {
      return NextResponse.json({ error: "Réservation introuvable" }, { status: 404 });
    }

    const VALID_STATUSES = ["PENDING", "CONFIRMED", "REJECTED", "CANCELLED"];
    if (body.status && !VALID_STATUSES.includes(body.status)) {
      return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: {
        status: body.status,
        adminNotes: body.adminNotes !== undefined ? body.adminNotes : existing.adminNotes,
      },
      include: { property: { select: { title: true } } },
    });

    if (body.status === "CONFIRMED" && existing.status !== "CONFIRMED") {
      const conflictingBooking = await prisma.booking.findFirst({
        where: {
          id: { not: id },
          propertyId: existing.propertyId,
          status: "CONFIRMED",
          checkIn: { lt: existing.checkOut },
          checkOut: { gt: existing.checkIn },
        },
        select: { id: true, guestName: true },
      });

      if (conflictingBooking) {
        await prisma.booking.update({
          where: { id },
          data: { status: existing.status },
        });
        return NextResponse.json(
          { error: "Conflit de dates avec une autre réservation confirmée. Annulez d'abord cette réservation." },
          { status: 409 }
        );
      }
    }

    await logAudit(auth.dbUser?.id || null, "update_status", "booking", id, { status: body.status });

    if (body.status && body.status !== existing.status) {
      try {
        await sendBookingConfirmation(
          existing.guestEmail,
          existing.guestName,
          booking.property.title,
          body.status
        );
      } catch (e) {
        console.error("[Email] booking confirmation failed:", e);
      }
    }

    return NextResponse.json(booking);
  } catch {
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
    await logAudit(auth.dbUser?.id || null, "delete", "booking", id);
    await prisma.booking.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}
