import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  try {
    const now = new Date();
    const sixMonthsAgo = new Date(now);
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const bookings = await prisma.booking.findMany({
      where: {
        createdAt: { gte: sixMonthsAgo },
      },
      select: {
        createdAt: true,
        totalPrice: true,
      },
    });

    const monthNames = [
      "Jan", "Fev", "Mar", "Avr", "Mai", "Jun",
      "Jul", "Aout", "Sep", "Oct", "Nov", "Dec",
    ];

    const bookingsByMonth: { month: string; count: number }[] = [];
    const revenueByMonth: { month: string; total: number }[] = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now);
      d.setMonth(d.getMonth() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const label = monthNames[d.getMonth()];
      bookingsByMonth.push({ month: label, count: 0 });
      revenueByMonth.push({ month: label, total: 0 });
    }

    for (const b of bookings) {
      const d = new Date(b.createdAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const label = monthNames[d.getMonth()];
      const bEntry = bookingsByMonth.find((e) => e.month === label);
      const rEntry = revenueByMonth.find((e) => e.month === label);
      if (bEntry) bEntry.count += 1;
      if (rEntry && b.totalPrice) rEntry.total += b.totalPrice;
    }

    revenueByMonth.forEach((e) => {
      e.total = Math.round(e.total * 100) / 100;
    });

    return NextResponse.json({ bookingsByMonth, revenueByMonth });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la recuperation des analytics" }, { status: 500 });
  }
}
