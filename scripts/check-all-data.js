const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
async function main() {
  const props = await p.property.findMany({ select: { slug: true, title: true, description: true, price: true, bedrooms: true, bathrooms: true, type: true, address: true, quarter: true } });
  for (const p2 of props) {
    const desc = (p2.description || "").substring(0, 60);
    console.log(`${p2.slug}: price=${p2.price} beds=${p2.bedrooms} baths=${p2.bathrooms} type=${p2.type} desc="${desc}..."`);
  }

  // Check hero slides
  const slides = await p.heroSlide.findMany();
  console.log("\nHero slides:", slides.length);

  // Check settings
  const logo = await p.siteSetting.findUnique({ where: { key: "logo_url" } });
  console.log("Logo setting:", logo?.value || "EMPTY");

  // Check services count
  const svcCount = await p.service.count();
  console.log("Services:", svcCount);

  // Check blog count
  const blogCount = await p.blogPost.count();
  console.log("Blog posts:", blogCount);

  // Check property images
  const imgCount = await p.propertyImage.count();
  console.log("Property images:", imgCount);
}
main().finally(() => p.$disconnect());
