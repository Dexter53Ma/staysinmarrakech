const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  console.log("Properties:", await prisma.property.count());
  console.log("PropertyImages:", await prisma.propertyImage.count());
  console.log("Services:", await prisma.service.count());
  console.log("BlogPosts:", await prisma.blogPost.count());
  console.log("Testimonials:", await prisma.testimonial.count());
  console.log("HeroSlides:", await prisma.heroSlide.count());
  console.log("Settings:", await prisma.siteSetting.count());
  
  // Check a sample property
  const p = await prisma.property.findFirst({ select: { id: true, title: true, slug: true, type: true, images: { select: { url: true } } } });
  console.log("\nSample property:", JSON.stringify(p, null, 2));
}
main().finally(() => prisma.$disconnect());
