import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireApiAuth } from "@/lib/auth";

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
  const auth = await requireApiAuth();
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
    const body = await request.json();
    const { images, ...data } = body;

    const property = await prisma.property.update({
      where: { id },
      data: {
        ...data,
        features: data.features || undefined,
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

    return NextResponse.json(property);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erreur serveur";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireApiAuth();
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
    await prisma.property.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
