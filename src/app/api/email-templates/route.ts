import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";

export const dynamic = "force-dynamic";

const TEMPLATE_PREFIX = "email_template_";

const TEMPLATE_NAMES = ["booking_confirmation", "booking_rejection", "contact_reply"] as const;

interface EmailTemplateData {
  subject: string;
  body: string;
}

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany({
      where: {
        key: { startsWith: TEMPLATE_PREFIX },
      },
    });

    const templates = settings
      .filter((s) => TEMPLATE_NAMES.includes(s.key.replace(TEMPLATE_PREFIX, "") as typeof TEMPLATE_NAMES[number]))
      .map((s) => {
        const name = s.key.replace(TEMPLATE_PREFIX, "");
        let data: EmailTemplateData = { subject: "", body: "" };
        try {
          data = JSON.parse(s.value || "{}") as EmailTemplateData;
        } catch {
          // default empty
        }
        return {
          name,
          subject: data.subject,
          body: data.body,
          updatedAt: s.updatedAt,
        };
      });

    return NextResponse.json(templates);
  } catch {
    return NextResponse.json({ error: "Erreur lors de la récupération des templates" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    const { key, value } = body as { key: string; value: string };

    if (!key || !key.startsWith(TEMPLATE_PREFIX)) {
      return NextResponse.json({ error: "Clé invalide" }, { status: 400 });
    }

    const name = key.replace(TEMPLATE_PREFIX, "");
    if (!TEMPLATE_NAMES.includes(name as typeof TEMPLATE_NAMES[number])) {
      return NextResponse.json({ error: "Template inconnu" }, { status: 400 });
    }

    // Validate JSON
    try {
      JSON.parse(value || "{}");
    } catch {
      return NextResponse.json({ error: "JSON invalide pour le template" }, { status: 400 });
    }

    await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la mise à jour du template" }, { status: 500 });
  }
}
