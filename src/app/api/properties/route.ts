import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireApiAuth } from "@/lib/auth";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (type && type !== "ALL") where.type = type;
    if (status && status !== "ALL") where.status = status;
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

    return NextResponse.json({
      properties,
      total,
      totalPages: Math.ceil(total / limit),
      page,
    });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireApiAuth();
  if (auth.error) return auth.error;
  try {
    const body = await request.json();
    const { images, ...data } = body;

    let slug = generateSlug(data.title);
    const existing = await prisma.property.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const property = await prisma.property.create({
      data: {
        ...data,
        slug,
        features: data.features || [],
        images: images?.length
          ? { create: images.map((img: { url: string; alt?: string }, i: number) => ({ url: img.url, alt: img.alt || "", sortOrder: i, isPrimary: i === 0 })) }
          : undefined,
      },
      include: { images: true },
    });

    return NextResponse.json(property, { status: 201 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erreur serveur";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
