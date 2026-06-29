import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { parsePagination, paginatedResponse } from "@/lib/pagination";

export const dynamic = "force-dynamic";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit, skip, hasPagination } = parsePagination(searchParams);

    const where = {};
    const [locations, total] = await Promise.all([
      prisma.location.findMany({
        where,
        orderBy: { sortOrder: "asc" },
        skip: hasPagination ? skip : undefined,
        take: hasPagination ? limit : undefined,
      }),
      prisma.location.count({ where }),
    ]);
    if (hasPagination) {
      return NextResponse.json(paginatedResponse(locations, total, page, limit));
    }
    return NextResponse.json(locations);
  } catch {
    return NextResponse.json({ error: "Erreur lors de la récupération des locations" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    const { name, description, image, latitude, longitude, sortOrder } = body;

    if (!name) {
      return NextResponse.json({ error: "Le nom est requis" }, { status: 400 });
    }

    let slug = generateSlug(name);
    const slugExists = await prisma.location.findUnique({ where: { slug } });
    if (slugExists) {
      slug = `${slug}-${Date.now()}`;
    }

    const location = await prisma.location.create({
      data: {
        name,
        slug,
        description: description || null,
        image: image || null,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        sortOrder: sortOrder ? parseInt(sortOrder) : 0,
      },
    });

    await logAudit(auth.dbUser?.id || null, "create", "location", location.id, { name: location.name });

    return NextResponse.json(location, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la création de la location" }, { status: 500 });
  }
}
