import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

const defaultSettings = [
  { key: "site_name", value: "StaysInMarrakech" },
  { key: "site_description", value: "Location de villas de luxe à Marrakech" },
  { key: "phone_1", value: "" },
  { key: "phone_2", value: "" },
  { key: "email", value: "" },
  { key: "address", value: "" },
  { key: "facebook", value: "" },
  { key: "twitter", value: "" },
  { key: "instagram", value: "" },
  { key: "linkedin", value: "" },
];

export async function GET() {
  try {
    let settings = await prisma.siteSetting.findMany();

    if (settings.length === 0) {
      await prisma.siteSetting.createMany({ data: defaultSettings });
      settings = await prisma.siteSetting.findMany();
    }

    const obj: Record<string, string> = {};
    settings.forEach((s) => {
      obj[s.key] = s.value || "";
    });

    return NextResponse.json(obj);
  } catch {
    return NextResponse.json({ error: "Erreur lors de la récupération des paramètres" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const auth = await requireApiAuth();
  if (auth.error) return auth.error;

  try {
    const body = await request.json();

    const upserts = Object.entries(body).map(([key, value]) =>
      prisma.siteSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      })
    );

    await Promise.all(upserts);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la mise à jour des paramètres" }, { status: 500 });
  }
}
