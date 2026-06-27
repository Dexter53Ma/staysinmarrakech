import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireApiAuth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    if (!email) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

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

export async function GET() {
  const auth = await requireApiAuth();
  if (auth.error) return auth.error;

  try {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(subscribers);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
