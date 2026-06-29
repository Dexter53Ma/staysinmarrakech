import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { validate, locationSchema } from "@/lib/validations";

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
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  try {
    const { id } = await params;
    const body = await request.json();
    const v = validate(locationSchema, body);
    if (!v.success) {
      return NextResponse.json({ error: v.error }, { status: 400 });
    }

    const existing = await prisma.location.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Location non trouvée" }, { status: 404 });
    }

    const location = await prisma.location.update({
      where: { id },
      data: {
        name: v.data.name ?? existing.name,
        description: v.data.description !== undefined ? v.data.description : existing.description,
        image: v.data.image !== undefined ? v.data.image : existing.image,
        sortOrder: v.data.sortOrder !== undefined ? v.data.sortOrder : existing.sortOrder,
      },
    });

    await logAudit(auth.dbUser?.id || null, "update", "location", id, { name: location.name });

    return NextResponse.json(location);
  } catch {
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  try {
    const { id } = await params;
    await logAudit(auth.dbUser?.id || null, "delete", "location", id);
    await prisma.location.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}
