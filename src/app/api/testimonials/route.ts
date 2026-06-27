import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(testimonials);
  } catch {
    return NextResponse.json({ error: "Erreur lors de la récupération des témoignages" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireApiAuth();
  if (auth.error) return auth.error;
  try {
    const body = await request.json();
    const { guestName, guestCountry, propertyName, duration, year, rating, reviewText } = body;

    if (!guestName) {
      return NextResponse.json({ error: "Le nom du client est requis" }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        guestName,
        guestCountry: guestCountry || null,
        propertyName: propertyName || null,
        duration: duration || null,
        year: year || null,
        rating: rating || null,
        reviewText: reviewText || null,
      },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la création du témoignage" }, { status: 500 });
  }
}
