import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const location = await prisma.location.findUnique({ where: { id } });
    if (!location) {
      return NextResponse.json({ error: "Location non trouvée" }, { status: 404 });
    }
    return NextResponse.json(location);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireApiAuth();
  if (auth.error) return auth.error;

  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.location.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Location non trouvée" }, { status: 404 });
    }

    const location = await prisma.location.update({
      where: { id },
      data: {
        name: body.name ?? existing.name,
        description: body.description !== undefined ? body.description : existing.description,
        image: body.image !== undefined ? body.image : existing.image,
        latitude: body.latitude !== undefined ? (body.latitude ? parseFloat(body.latitude) : null) : existing.latitude,
        longitude: body.longitude !== undefined ? (body.longitude ? parseFloat(body.longitude) : null) : existing.longitude,
        sortOrder: body.sortOrder !== undefined ? parseInt(body.sortOrder) : existing.sortOrder,
      },
    });

    return NextResponse.json(location);
  } catch {
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireApiAuth();
  if (auth.error) return auth.error;

  try {
    const { id } = await params;
    await prisma.location.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}
