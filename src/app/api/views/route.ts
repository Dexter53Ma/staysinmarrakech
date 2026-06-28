import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { propertyId } = await request.json();

    if (!propertyId) {
      return NextResponse.json({ error: "propertyId requis" }, { status: 400 });
    }

    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";

    // Rate limit: skip if same IP viewed this property in the last hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentView = await prisma.propertyView.findFirst({
      where: {
        propertyId,
        viewerIp: ip,
        createdAt: { gte: oneHourAgo },
      },
      select: { id: true },
    });

    if (!recentView) {
      const userAgent = request.headers.get("user-agent") || "";
      await prisma.propertyView.create({
        data: { propertyId, viewerIp: ip, userAgent },
      });
    }

    const { _count } = await prisma.propertyView.aggregate({
      where: { propertyId },
      _count: true,
    });

    return NextResponse.json({ views: _count });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
