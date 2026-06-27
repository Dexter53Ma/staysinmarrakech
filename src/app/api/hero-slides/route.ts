import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const slides = await prisma.heroSlide.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(slides);
  } catch {
    return NextResponse.json({ error: "Erreur lors de la récupération des slides" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireApiAuth();
  if (auth.error) return auth.error;
  try {
    const body = await request.json();
    const { title, subtitle, image, link, buttonText, sortOrder, isActive } = body;

    if (!title || !image) {
      return NextResponse.json({ error: "Le titre et l'image sont requis" }, { status: 400 });
    }

    const slide = await prisma.heroSlide.create({
      data: {
        title,
        subtitle: subtitle || null,
        image,
        link: link || null,
        buttonText: buttonText || null,
        sortOrder: sortOrder ? parseInt(sortOrder) : 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    return NextResponse.json(slide, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la création du slide" }, { status: 500 });
  }
}
