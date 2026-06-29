import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { parsePagination, paginatedResponse } from "@/lib/pagination";
import { logAudit } from "@/lib/audit";
import { validate, heroSlideSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit, skip, hasPagination } = parsePagination(searchParams);

    const where = {};
    const [slides, total] = await Promise.all([
      prisma.heroSlide.findMany({
        where,
        orderBy: { sortOrder: "asc" },
        skip: hasPagination ? skip : undefined,
        take: hasPagination ? limit : undefined,
      }),
      prisma.heroSlide.count({ where }),
    ]);
    if (hasPagination) {
      return NextResponse.json(paginatedResponse(slides, total, page, limit));
    }
    return NextResponse.json(slides);
  } catch {
    return NextResponse.json({ error: "Erreur lors de la récupération des slides" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;
  try {
    const body = await request.json();
    const v = validate(heroSlideSchema, body);
    if (!v.success) {
      return NextResponse.json({ error: v.error }, { status: 400 });
    }

    const { title, subtitle, image, link, buttonText, sortOrder, isActive } = v.data;

    const slide = await prisma.heroSlide.create({
      data: {
        title,
        subtitle: subtitle || null,
        image,
        link: link || null,
        buttonText: buttonText || null,
        sortOrder: sortOrder ?? 0,
        isActive: isActive ?? true,
      },
    });

    await logAudit(auth.dbUser?.id || null, "create", "hero_slide", slide.id, { title: slide.title });

    return NextResponse.json(slide, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la création du slide" }, { status: 500 });
  }
}
