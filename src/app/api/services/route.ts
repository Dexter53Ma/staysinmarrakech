import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireApiAuth } from "@/lib/auth";
import { generateSlug, ensureUniqueSlug, validateFields, apiError } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(services);
  } catch {
    return apiError("Erreur lors du chargement");
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireApiAuth();
  if (auth.error) return auth.error;
  try {
    const body = await request.json();
    const { title, description, image, category, price, priceUnit, isActive, sortOrder } = body;

    const validationError = validateFields(body, ["title", "description"]);
    if (validationError) return validationError;

    let slug = generateSlug(title);
    slug = await ensureUniqueSlug(slug, (s) => prisma.service.findUnique({ where: { slug: s }, select: { id: true } }));

    const service = await prisma.service.create({
      data: {
        title,
        slug,
        description,
        image: image || null,
        category: category || null,
        price: price ? parseFloat(price) : null,
        priceUnit: priceUnit || null,
        isActive: isActive !== false,
        sortOrder: sortOrder ? parseInt(sortOrder) : 0,
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch {
    return apiError("Erreur lors de la création");
  }
}
