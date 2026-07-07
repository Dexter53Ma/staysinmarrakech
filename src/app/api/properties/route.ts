import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/auth";
import { generateSlug, ensureUniqueSlug, apiError } from "@/lib/api-helpers";
import { logAudit } from "@/lib/audit";
import { parsePagination, paginatedResponse } from "@/lib/pagination";
import { validate, propertySchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    const pricePeriod = searchParams.get("pricePeriod");
    const search = searchParams.get("search");
    const { page, limit, skip } = parsePagination(searchParams);

    const where: Record<string, unknown> = {};
    if (type && type !== "ALL") where.type = type;
    if (status && status !== "ALL") where.status = status;
    if (pricePeriod && pricePeriod !== "ALL") where.pricePeriod = pricePeriod;
    if (search) where.title = { contains: search, mode: "insensitive" };

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        include: {
          images: { where: { isPrimary: true }, take: 1 },
          _count: { select: { views: true } },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.property.count({ where }),
    ]);

    return NextResponse.json(paginatedResponse(properties, total, page, limit));
  } catch (e) {
    console.error("GET /api/properties error:", e);
    return apiError("Erreur serveur");
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;
  try {
    const body = await request.json();
    const v = validate(propertySchema, body);
    if (!v.success) {
      return NextResponse.json({ error: v.error }, { status: 400 });
    }

    const { images, ...rawData } = v.data as typeof v.data & { images?: Array<{ url: string; alt?: string }> };

    let slug = generateSlug(rawData.title);
    slug = await ensureUniqueSlug(slug, (s) => prisma.property.findUnique({ where: { slug: s }, select: { id: true } }));

    const property = await prisma.property.create({
      data: {
        title: rawData.title,
        slug,
        description: rawData.description || "",
        titleEn: rawData.titleEn || null,
        descriptionEn: rawData.descriptionEn || null,
        type: (rawData.type || "VILLA") as "VILLA" | "RIAD" | "APARTMENT" | "HOUSE" | "LAND" | "COMMERCIAL",
        status: (rawData.status || "AVAILABLE") as "AVAILABLE" | "SOLD" | "RENTED" | "PENDING" | "MAINTENANCE",
        price: rawData.price ?? 0,
        currency: rawData.currency ?? "EUR",
        pricePeriod: rawData.pricePeriod ?? undefined,
        cleaningFee: rawData.cleaningFee ?? undefined,
        serviceFee: rawData.serviceFee ?? undefined,
        address: rawData.address ?? "",
        addressEn: rawData.addressEn || null,
        city: rawData.city ?? "Marrakech",
        quarter: rawData.quarter ?? undefined,
        quarterEn: rawData.quarterEn || null,
        latitude: rawData.latitude ?? undefined,
        longitude: rawData.longitude ?? undefined,
        bedrooms: rawData.bedrooms ?? 0,
        bathrooms: rawData.bathrooms ?? 0,
        garages: rawData.garages ?? 0,
        maxGuests: rawData.maxGuests ?? undefined,
        plotArea: rawData.plotArea ?? undefined,
        builtArea: rawData.builtArea ?? undefined,
        yearBuilt: rawData.yearBuilt ?? undefined,
        minStay: rawData.minStay ?? undefined,
        maxStay: rawData.maxStay ?? undefined,
        checkInTime: rawData.checkInTime ?? undefined,
        checkOutTime: rawData.checkOutTime ?? undefined,
        features: rawData.features ?? [],
        isFeatured: rawData.isFeatured ?? false,
        images: images?.length
          ? { create: images.map((img: { url: string; alt?: string }, i: number) => ({ url: img.url, alt: img.alt || "", sortOrder: i, isPrimary: i === 0 })) }
          : undefined,
      },
      include: { images: true },
    });

    await logAudit(auth.dbUser?.id || null, "create", "property", property.id, { title: property.title });

    return NextResponse.json(property, { status: 201 });
  } catch (e: unknown) {
    console.error("POST /api/properties error:", e);
    return apiError("Erreur serveur");
  }
}
