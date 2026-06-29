import { prisma } from "@/lib/prisma";
import { sendContactConfirmation, sendContactNotification } from "@/lib/resend";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { validateCsrfToken } from "@/lib/csrf";
import { parsePagination, paginatedResponse } from "@/lib/pagination";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = parsePagination(searchParams);

    const where = {};
    const [contacts, total] = await Promise.all([
      prisma.contactInquiry.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: { property: { select: { title: true } } },
        skip,
        take: limit,
      }),
      prisma.contactInquiry.count({ where }),
    ]);
    return NextResponse.json(paginatedResponse(contacts, total, page, limit));
  } catch {
    return NextResponse.json({ error: "Erreur lors de la récupération des messages" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const rl = await rateLimit(request, { limit: 5, windowMs: 60_000 });
  if (!rl.allowed) return rl.response!;

  const csrfError = await validateCsrfToken(request);
  if (csrfError) return csrfError;

  try {
    const body = await request.json();
    const { name, email, phone, subject, message, propertyId } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Le nom, l'email et le message sont requis" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Format d'email invalide" }, { status: 400 });
    }

    const contact = await prisma.contactInquiry.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject: subject || null,
        message,
        propertyId: propertyId || null,
      },
    });

    // Send notification emails
    const subjectText = subject || "Sans objet";
    try {
      await sendContactNotification(name, email, subjectText, message);
    } catch (e) {
      console.error("[Email] contact notification failed:", e);
    }
    try {
      await sendContactConfirmation(email, name);
    } catch (e) {
      console.error("[Email] contact confirmation failed:", e);
    }

    return NextResponse.json(contact, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur lors de l'envoi du message" }, { status: 500 });
  }
}
