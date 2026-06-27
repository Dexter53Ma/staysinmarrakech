import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/auth";

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

export async function GET() {
  try {
    const locations = await prisma.location.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(locations);
  } catch {
    return NextResponse.json({ error: "Erreur lors de la récupération des locations" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireApiAuth();
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

    return NextResponse.json(location, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la création de la location" }, { status: 500 });
  }
}
