const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  const s = await prisma.service.findUnique({ where: { slug: "jet-ski" }, select: { longDescription: true } });
  const newContent = s.longDescription + "\n<p>Notre service de jet ski est disponible toute l'année et s'adapte à tous les niveaux de pratique, du débutant au confirmé.</p>";
  await prisma.service.updateMany({ where: { slug: "jet-ski" }, data: { longDescription: newContent } });
  const words = newContent.replace(/<[^>]*>/g, "").split(/\s+/).filter(w => w).length;
  console.log(`jet-ski: ${words} words`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
