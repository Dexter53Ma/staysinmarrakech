import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/auth";
import { generateSlug, ensureUniqueSlug, validateFields, apiError } from "@/lib/api-helpers";
import { logAudit } from "@/lib/audit";
import { parsePagination, paginatedResponse } from "@/lib/pagination";
import { validate, serviceSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit, skip, hasPagination } = parsePagination(searchParams);

    const where = {};
    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where,
        orderBy: { sortOrder: "asc" },
        skip: hasPagination ? skip : undefined,
        take: hasPagination ? limit : undefined,
      }),
      prisma.service.count({ where }),
    ]);
    if (hasPagination) {
      return NextResponse.json(paginatedResponse(services, total, page, limit));
    }
    return NextResponse.json(services);
  } catch {
    return apiError("Erreur lors du chargement");
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;
  try {
    const body = await request.json();
    const v = validate(serviceSchema, body);
    if (!v.success) {
      return NextResponse.json({ error: v.error }, { status: 400 });
    }

    const { title, description, longDescription, metaDescription, features, image, category, price, priceUnit, isActive, sortOrder } = v.data;

    let slug = generateSlug(title);
    slug = await ensureUniqueSlug(slug, (s) => prisma.service.findUnique({ where: { slug: s }, select: { id: true } }));

    // Convert features from newline-separated string to JSON array
    const featuresJson = features ? JSON.stringify(features.split("\n").map((f: string) => f.trim()).filter(Boolean)) : null;

    const service = await prisma.service.create({
      data: {
        title,
        slug,
        description: description || "",
        longDescription: longDescription || null,
        metaDescription: metaDescription || null,
        features: featuresJson,
        image: image || null,
        category: category || null,
        price: price ?? null,
        priceUnit: priceUnit || null,
        isActive: isActive !== false,
        sortOrder: sortOrder ?? 0,
      },
    });

    await logAudit(auth.dbUser?.id || null, "create", "service", service.id, { title: service.title });

    return NextResponse.json(service, { status: 201 });
  } catch {
    return apiError("Erreur lors de la création");
  }
}
