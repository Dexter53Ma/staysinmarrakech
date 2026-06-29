import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { logAudit } from "@/lib/audit";

export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.contactInquiry.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Message non trouvé" }, { status: 404 });
    }

    const contact = await prisma.contactInquiry.update({
      where: { id },
      data: {
        status: body.status ?? existing.status,
      },
    });

    await logAudit(auth.dbUser?.id || null, "update", "contact_inquiry", id, { status: contact.status });

    return NextResponse.json(contact);
  } catch {
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
    await logAudit(auth.dbUser?.id || null, "delete", "contact_inquiry", id);
    await prisma.contactInquiry.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}
