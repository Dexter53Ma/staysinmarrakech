import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { validate, propertySchema } from "@/lib/validations";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const property = await prisma.property.findUnique({
      where: { id },
      include: { images: { orderBy: { sortOrder: "asc" } } },
    });
    if (!property) return NextResponse.json({ error: "Propriété non trouvée" }, { status: 404 });
    return NextResponse.json(property);
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
    const v = validate(propertySchema, body);
    if (!v.success) {
      return NextResponse.json({ error: v.error }, { status: 400 });
    }

    const { images, ...rawData } = v.data as typeof v.data & { images?: Array<{ url: string; alt?: string }> };

    const updateData: Record<string, unknown> = {};
    if (rawData.title !== undefined) updateData.title = rawData.title;
    if (rawData.slug !== undefined) updateData.slug = rawData.slug || undefined;
    if (rawData.description !== undefined) updateData.description = rawData.description || undefined;
    if (rawData.price !== undefined) updateData.price = rawData.price;
    if (rawData.bedrooms !== undefined) updateData.bedrooms = rawData.bedrooms;
    if (rawData.bathrooms !== undefined) updateData.bathrooms = rawData.bathrooms;
    if (rawData.maxGuests !== undefined) updateData.maxGuests = rawData.maxGuests;
    if (rawData.type !== undefined) updateData.type = rawData.type;
    if (rawData.status !== undefined) updateData.status = rawData.status;
    if (rawData.address !== undefined) updateData.address = rawData.address || undefined;
    if (images) {
      updateData.images = {
        deleteMany: {},
        create: images.map((img: { url: string; alt?: string }, i: number) => ({
          url: img.url,
          alt: img.alt || "",
          sortOrder: i,
          isPrimary: i === 0,
        })),
      };
    }

    const property = await prisma.property.update({
      where: { id },
      data: updateData,
      include: { images: { orderBy: { sortOrder: "asc" } } },
    });

    await logAudit(auth.dbUser?.id || null, "update", "property", id, { title: property.title });

    return NextResponse.json(property);
  } catch (e: unknown) {
    console.error("PUT /api/properties/[id] error:", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
    await logAudit(auth.dbUser?.id || null, "delete", "property", id);
    await prisma.property.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
