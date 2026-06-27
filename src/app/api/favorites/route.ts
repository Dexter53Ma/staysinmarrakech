import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { propertyId, sessionId } = await request.json();

    if (!propertyId || !sessionId) {
      return NextResponse.json({ error: "propertyId et sessionId requis" }, { status: 400 });
    }

    const existing = await prisma.favorite.findUnique({
      where: { propertyId_sessionId: { propertyId, sessionId } },
    });

    if (existing) {
      return NextResponse.json({ favorited: true });
    }

    await prisma.favorite.create({
      data: { propertyId, sessionId },
    });

    return NextResponse.json({ favorited: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get("propertyId");
    const sessionId = searchParams.get("sessionId");

    if (!propertyId || !sessionId) {
      return NextResponse.json({ error: "propertyId et sessionId requis" }, { status: 400 });
    }

    await prisma.favorite.deleteMany({
      where: { propertyId, sessionId },
    });

    return NextResponse.json({ favorited: false });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get("propertyId");
    const sessionId = searchParams.get("sessionId");

    if (!propertyId || !sessionId) {
      return NextResponse.json({ favorited: false });
    }

    const existing = await prisma.favorite.findUnique({
      where: { propertyId_sessionId: { propertyId, sessionId } },
    });

    return NextResponse.json({ favorited: !!existing });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
