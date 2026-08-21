import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { requireAdminApi } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "all";

    const now = new Date();
    let dateFilter: Date | undefined;

    if (period === "7d") {
      dateFilter = new Date(now);
      dateFilter.setDate(dateFilter.getDate() - 7);
    } else if (period === "30d") {
      dateFilter = new Date(now);
      dateFilter.setDate(dateFilter.getDate() - 30);
    } else if (period === "90d") {
      dateFilter = new Date(now);
      dateFilter.setDate(dateFilter.getDate() - 90);
    }

    const whereClause = dateFilter ? { createdAt: { gte: dateFilter } } : {};

    const sixMonthsAgo = new Date(now);
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const [
      totalProperties,
      bookings,
      totalViews,
      bookingStatusCounts,
      monthlyBookingsRaw,
      topProperties,
    ] = await Promise.all([
      prisma.property.count(),
      prisma.booking.findMany({
        where: whereClause,
        select: {
          createdAt: true,
          totalPrice: true,
          status: true,
        },
      }),
      prisma.propertyView.count({
        ...(dateFilter ? { where: { createdAt: { gte: dateFilter } } } : {}),
      }),
      prisma.booking.groupBy({
        by: ["status"],
        _count: { status: true },
        ...(dateFilter ? { where: { createdAt: { gte: dateFilter } } } : {}),
      }),
      prisma.booking.findMany({
        where: { createdAt: { gte: sixMonthsAgo } },
        select: { createdAt: true },
      }),
      prisma.property.findMany({
        take: 5,
        orderBy: { views: { _count: "desc" } },
        select: { title: true, slug: true, _count: { select: { views: true } } },
      }),
    ]);

    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

    const statusMap: Record<string, number> = {
      pending: 0,
      confirmed: 0,
      rejected: 0,
      cancelled: 0,
    };
    for (const item of bookingStatusCounts) {
      const key = item.status.toLowerCase();
      statusMap[key] = item._count.status;
    }

    const conversionRate = totalViews > 0 ? (totalBookings / totalViews) * 100 : 0;

    const monthNames = ["Jan", "Fev", "Mar", "Avr", "Mai", "Jun", "Jul", "Aout", "Sep", "Oct", "Nov", "Dec"];
    const monthlyBookings: { month: string; count: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now);
      d.setMonth(d.getMonth() - i);
      const label = monthNames[d.getMonth()];
      monthlyBookings.push({ month: label, count: 0 });
    }
    for (const b of monthlyBookingsRaw) {
      const d = new Date(b.createdAt);
      const label = monthNames[d.getMonth()];
      const entry = monthlyBookings.find((e) => e.month === label);
      if (entry) entry.count += 1;
    }

    return NextResponse.json({
      totalProperties,
      totalBookings,
      totalRevenue,
      totalViews,
      bookingStatusCounts: statusMap,
      monthlyBookings,
      topProperties: topProperties.map((p) => ({
        title: p.title,
        slug: p.slug,
        views: p._count.views,
      })),
      conversionRate: Math.round(conversionRate * 100) / 100,
    });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la récupération des analytics" }, { status: 500 });
  }
}
