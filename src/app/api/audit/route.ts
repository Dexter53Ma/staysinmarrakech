import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const auth = await requireApiAuth();
  if (auth.error) return auth.error;

  try {
    const { searchParams } = new URL(request.url);
    const entity = searchParams.get("entity");

    const where = entity ? { entity } : {};

    const logs = await prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 200,
      include: { user: { select: { name: true, email: true } } },
    });
    return NextResponse.json(logs);
  } catch {
    return NextResponse.json({ error: "Erreur lors de la recuperation des logs" }, { status: 500 });
  }
}
