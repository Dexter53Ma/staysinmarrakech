import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const baseDatabaseUrl = process.env.DATABASE_URL || "";

const isProduction = process.env.NODE_ENV === "production";

const databaseUrl =
  baseDatabaseUrl +
  (isProduction
    ? (baseDatabaseUrl.includes("?") ? "&" : "?") + "connection_limit=2&pool_timeout=10"
    : "");

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: isProduction ? ["error"] : ["error", "warn"],
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });

if (!isProduction) globalForPrisma.prisma = prisma;
