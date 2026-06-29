const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  const services = await prisma.service.findMany({ select: { slug: true, title: true, longDescription: true } });
  for (const s of services) {
    const words = (s.longDescription || "").replace(/<[^>]*>/g, "").split(/\s+/).filter(w => w).length;
    const status = words >= 2000 ? "OK" : "SHORT";
    console.log(status + " " + s.slug + ": " + words + " words");
  }
}
main().finally(() => prisma.$disconnect());
