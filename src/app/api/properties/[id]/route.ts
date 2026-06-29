import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/auth";
import { logAudit } from "@/lib/audit";

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
    const { images, title, slug, description, price, bedrooms, bathrooms, maxGuests, propertyType, status, locationId, address, features } = body;

    const property = await prisma.property.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(description !== undefined && { description }),
        ...(price !== undefined && { price }),
        ...(bedrooms !== undefined && { bedrooms }),
        ...(bathrooms !== undefined && { bathrooms }),
        ...(maxGuests !== undefined && { maxGuests }),
        ...(propertyType !== undefined && { propertyType }),
        ...(status !== undefined && { status }),
        ...(locationId !== undefined && { locationId }),
        ...(address !== undefined && { address }),
        features: features || undefined,
        images: images
          ? {
              deleteMany: {},
              create: images.map((img: { url: string; alt?: string }, i: number) => ({
                url: img.url,
                alt: img.alt || "",
                sortOrder: i,
                isPrimary: i === 0,
              })),
            }
          : undefined,
      },
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
