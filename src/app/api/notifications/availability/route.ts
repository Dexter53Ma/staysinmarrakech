import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { email, propertyId, desiredStart, desiredEnd } = await request.json();

    if (!email || !propertyId || !desiredStart || !desiredEnd) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: { id: true },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    const existing = await prisma.availabilityNotification.findFirst({
      where: {
        email: email.toLowerCase().trim(),
        propertyId,
        desiredStart: new Date(desiredStart),
        desiredEnd: new Date(desiredEnd),
        notified: false,
      },
    });

    if (existing) {
      return NextResponse.json({ success: true, message: "Already registered" });
    }

    await prisma.availabilityNotification.create({
      data: {
        email: email.toLowerCase().trim(),
        propertyId,
        desiredStart: new Date(desiredStart),
        desiredEnd: new Date(desiredEnd),
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to create notification" },
      { status: 500 }
    );
  }
}
