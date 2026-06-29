import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { parsePagination, paginatedResponse } from "@/lib/pagination";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  try {
    const { searchParams } = new URL(request.url);
    const entity = searchParams.get("entity");
    const { page, limit, skip } = parsePagination(searchParams);

    const where = entity ? { entity } : {};

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: { user: { select: { name: true, email: true } } },
      }),
      prisma.auditLog.count({ where }),
    ]);
    return NextResponse.json(paginatedResponse(logs, total, page, limit));
  } catch {
    return NextResponse.json({ error: "Erreur lors de la recuperation des logs" }, { status: 500 });
  }
}
