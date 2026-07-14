import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const baseDatabaseUrl = process.env.DATABASE_URL || "";

const isProduction = process.env.NODE_ENV === "production";

const databaseUrl = (() => {
  if (!isProduction || !baseDatabaseUrl) return baseDatabaseUrl;
  const url = new URL(baseDatabaseUrl);
  if (!url.searchParams.has("connection_limit")) url.searchParams.set("connection_limit", "2");
  if (!url.searchParams.has("pool_timeout")) url.searchParams.set("pool_timeout", "10");
  if (!url.searchParams.has("sslmode")) url.searchParams.set("sslmode", "require");
  return url.toString();
})();

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
