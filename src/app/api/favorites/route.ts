import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { validateCsrfToken } from "@/lib/csrf";

export async function POST(request: NextRequest) {
  try {
    const { allowed, response } = await rateLimit(request, { limit: 20, windowMs: 60_000 });
    if (!allowed) {
      return response;
    }

    const csrfError = await validateCsrfToken(request);
    if (csrfError) return csrfError;

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
    const { allowed, response } = await rateLimit(request, { limit: 20, windowMs: 60_000 });
    if (!allowed) {
      return response;
    }

    const csrfError = await validateCsrfToken(request);
    if (csrfError) return csrfError;

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
    const { allowed, response } = await rateLimit(request, { limit: 20, windowMs: 60_000 });
    if (!allowed) {
      return response;
    }

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
