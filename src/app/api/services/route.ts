import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireApiAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

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

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(services);
  } catch {
    return NextResponse.json({ error: "Erreur lors du chargement" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireApiAuth();
  if (auth.error) return auth.error;
  try {
    const body = await request.json();
    const { title, description, image, category, price, priceUnit, isActive, sortOrder } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "Titre et description requis" }, { status: 400 });
    }

    let slug = generateSlug(title);
    const existing = await prisma.service.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

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
    return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 });
  }
}
