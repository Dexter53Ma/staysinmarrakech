import { prisma } from "@/lib/prisma";
import { sendContactConfirmation, sendContactNotification } from "@/lib/resend";
import { NextRequest, NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await requireApiAuth();
  if (auth.error) return auth.error;
  try {
    const contacts = await prisma.contactInquiry.findMany({
      orderBy: { createdAt: "desc" },
      include: { property: { select: { title: true } } },
    });
    return NextResponse.json(contacts);
  } catch {
    return NextResponse.json({ error: "Erreur lors de la récupération des messages" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, propertyId } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Le nom, l'email et le message sont requis" }, { status: 400 });
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
