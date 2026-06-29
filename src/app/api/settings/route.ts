import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { logAudit } from "@/lib/audit";

export const dynamic = "force-dynamic";

const ALLOWED_KEYS = new Set([
  "site_name", "site_description", "logo_url", "phone_1", "phone_2", "email", "address",
  "facebook", "twitter", "instagram", "linkedin",
  "hero_title", "hero_subtitle",
  "stat_experience", "stat_clients", "stat_quality", "stat_services", "stat_presence",
  "section_location_title", "section_location_description", "section_location_image", "section_location_button",
  "section_short_title", "section_short_description", "section_short_image",
  "section_events_title", "section_events_description", "section_events_image",
  "section_vacations_title", "section_vacations_description", "section_vacations_image",
]);

export async function GET() {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;
  try {
    const settings = await prisma.siteSetting.findMany();
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
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  try {
    const body = await request.json();

    const filteredEntries = Object.entries(body).filter(([key]) => ALLOWED_KEYS.has(key));

    const upserts = filteredEntries.map(([key, value]) =>
      prisma.siteSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      })
    );

    await Promise.all(upserts);

    await logAudit(auth.dbUser?.id || null, "update_settings", "site_setting", undefined, { keys: filteredEntries.map(([k]) => k) });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la mise à jour des paramètres" }, { status: 500 });
  }
}
