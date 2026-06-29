import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { parsePagination, paginatedResponse } from "@/lib/pagination";
import { validateCsrfToken } from "@/lib/csrf";
import { validate, newsletterSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  const rl = await rateLimit(request, { limit: 3, windowMs: 60_000 });
  if (!rl.allowed) return rl.response!;

  const csrfError = await validateCsrfToken(request);
  if (csrfError) return csrfError;

  try {
    const body = await request.json();
    const v = validate(newsletterSchema, body);
    if (!v.success) {
      return NextResponse.json({ error: v.error }, { status: 400 });
    }

    const { email, name } = v.data;

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      if (existing.isActive) {
        return NextResponse.json({ message: "Vous êtes déjà inscrit." });
      }
      await prisma.newsletterSubscriber.update({
        where: { email },
        data: { isActive: true },
      });
      return NextResponse.json({ message: "Inscription réactivée avec succès !" });
    }

    await prisma.newsletterSubscriber.create({
      data: { email, name: name || null },
    });

    return NextResponse.json({ message: "Inscription réussie ! Merci de votre confiance." }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  try {
    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = parsePagination(searchParams);

    const where = {};
    const [subscribers, total] = await Promise.all([
      prisma.newsletterSubscriber.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.newsletterSubscriber.count({ where }),
    ]);
    return NextResponse.json(paginatedResponse(subscribers, total, page, limit));
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
