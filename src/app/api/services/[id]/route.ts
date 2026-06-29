import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { validate, serviceSchema } from "@/lib/validations";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const service = await prisma.service.findUnique({ where: { id } });

    if (!service) {
      return NextResponse.json({ error: "Service introuvable" }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
    const body = await request.json();
    const v = validate(serviceSchema, body);
    if (!v.success) {
      return NextResponse.json({ error: v.error }, { status: 400 });
    }

    const { title, description, longDescription, metaDescription, features, image, category, price, priceUnit, isActive, sortOrder } = v.data;

    const existing = await prisma.service.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Service introuvable" }, { status: 404 });
    }

    let slug = existing.slug;
    if (title && title !== existing.title) {
      slug = generateSlug(title);
      const slugExists = await prisma.service.findFirst({ where: { slug, id: { not: id } } });
      if (slugExists) {
        slug = `${slug}-${Date.now()}`;
      }
    }

    // Convert features from newline-separated string to JSON array
    const featuresJson = features !== undefined
      ? (features ? JSON.stringify(features.split("\n").map((f: string) => f.trim()).filter(Boolean)) : null)
      : existing.features;

    const service = await prisma.service.update({
      where: { id },
      data: {
        title: title || existing.title,
        slug,
        description: description || existing.description,
        longDescription: longDescription !== undefined ? longDescription : existing.longDescription,
        metaDescription: metaDescription !== undefined ? metaDescription : existing.metaDescription,
        features: featuresJson,
        image: image !== undefined ? image : existing.image,
        category: category !== undefined ? category : existing.category,
        price: price !== undefined ? (price ?? null) : existing.price,
        priceUnit: priceUnit !== undefined ? priceUnit : existing.priceUnit,
        isActive: isActive !== undefined ? isActive : existing.isActive,
        sortOrder: sortOrder !== undefined ? sortOrder : existing.sortOrder,
      },
    });

    await logAudit(auth.dbUser?.id || null, "update", "service", id, { title: service.title });

    return NextResponse.json(service);
  } catch {
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
    await logAudit(auth.dbUser?.id || null, "delete", "service", id);
    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}
