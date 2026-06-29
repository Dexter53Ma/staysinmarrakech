const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Each service needs 2000+ words of rich, SEO-optimized French content
// about Marrakech villa rental experiences

async function main() {
  console.log("=== COMPREHENSIVE SERVICE EXPANSION ===\n");

  // Service 1: Votre Séjour (already 3117 words on page - keep current)
  // Service 2: Vos Repas (already 3161 words on page - keep current)
  // Let me check the actual DB content first
  const existing = await prisma.service.findMany({ select: { slug: true, longDescription: true } });
  for (const s of existing) {
    const words = (s.longDescription || "").replace(/<[^>]*>/g, "").split(/\s+/).filter(w => w).length;
    console.log(`  ${s.slug}: ${words} words`);
  }

  console.log("\nDone checking. Need to expand ALL services to 2000+ words.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
