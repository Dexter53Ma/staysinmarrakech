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
    if (rawData.type !== undefined) updateData.type = rawData.type;
    if (rawData.status !== undefined) updateData.status = rawData.status;
    if (rawData.price !== undefined) updateData.price = rawData.price;
    if (rawData.currency !== undefined) updateData.currency = rawData.currency || undefined;
    if (rawData.pricePeriod !== undefined) updateData.pricePeriod = rawData.pricePeriod || undefined;
    if (rawData.cleaningFee !== undefined) updateData.cleaningFee = rawData.cleaningFee;
    if (rawData.serviceFee !== undefined) updateData.serviceFee = rawData.serviceFee;
    if (rawData.address !== undefined) updateData.address = rawData.address || undefined;
    if (rawData.city !== undefined) updateData.city = rawData.city || undefined;
    if (rawData.quarter !== undefined) updateData.quarter = rawData.quarter || undefined;
    if (rawData.latitude !== undefined) updateData.latitude = rawData.latitude;
    if (rawData.longitude !== undefined) updateData.longitude = rawData.longitude;
    if (rawData.bedrooms !== undefined) updateData.bedrooms = rawData.bedrooms;
    if (rawData.bathrooms !== undefined) updateData.bathrooms = rawData.bathrooms;
    if (rawData.garages !== undefined) updateData.garages = rawData.garages;
    if (rawData.maxGuests !== undefined) updateData.maxGuests = rawData.maxGuests;
    if (rawData.plotArea !== undefined) updateData.plotArea = rawData.plotArea;
    if (rawData.builtArea !== undefined) updateData.builtArea = rawData.builtArea;
    if (rawData.yearBuilt !== undefined) updateData.yearBuilt = rawData.yearBuilt;
    if (rawData.minStay !== undefined) updateData.minStay = rawData.minStay;
    if (rawData.maxStay !== undefined) updateData.maxStay = rawData.maxStay;
    if (rawData.checkInTime !== undefined) updateData.checkInTime = rawData.checkInTime || undefined;
    if (rawData.checkOutTime !== undefined) updateData.checkOutTime = rawData.checkOutTime || undefined;
    if (rawData.features !== undefined) updateData.features = rawData.features;
    if (rawData.isFeatured !== undefined) updateData.isFeatured = rawData.isFeatured;
    if (rawData.titleEn !== undefined) updateData.titleEn = rawData.titleEn || null;
    if (rawData.descriptionEn !== undefined) updateData.descriptionEn = rawData.descriptionEn || null;
    if (rawData.quarterEn !== undefined) updateData.quarterEn = rawData.quarterEn || null;
    if (rawData.addressEn !== undefined) updateData.addressEn = rawData.addressEn || null;
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
