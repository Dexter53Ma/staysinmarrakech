import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";

export async function logAudit(
  userId: string | null,
  action: string,
  entity: string,
  entityId?: string,
  newValues?: Record<string, unknown>
) {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        entity,
        entityId: entityId || undefined,
        newValues: newValues ? (newValues as unknown as Prisma.InputJsonValue) : undefined,
      },
    });
  } catch (e) {
    console.error("[Audit] Failed to log:", e);
  }
}