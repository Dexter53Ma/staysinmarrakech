const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new PrismaClient();

async function main() {
  console.log("Linking villa images to database...\n");

  const villas = await prisma.property.findMany({ select: { id: true, slug: true, title: true } });
  const imagesDir = path.join(__dirname, "..", "public", "images", "villas");
  const allFiles = fs.readdirSync(imagesDir);

  let linked = 0;

  for (const villa of villas) {
    const slug = villa.slug;
    // Find images matching this villa slug
    const matching = allFiles.filter(f => {
      const base = f.replace(/\.(webp|jpg|jpeg|png)$/i, "").toLowerCase();
      return base === slug || base.startsWith(slug + "-");
    });

    if (matching.length === 0) {
      console.log(`  [no images] ${villa.title}`);
      continue;
    }

    // Check if images already linked
    const existing = await prisma.propertyImage.count({ where: { propertyId: villa.id } });
    if (existing > 0) {
      console.log(`  [skip] ${villa.title} (${existing} images already linked)`);
      continue;
    }

    // Sort: main image first, then interiors
    matching.sort((a, b) => {
      const aIsInterior = a.includes("interior");
      const bIsInterior = b.includes("interior");
      if (aIsInterior && !bIsInterior) return 1;
      if (!aIsInterior && bIsInterior) return -1;
      return a.localeCompare(b);
    });

    for (let i = 0; i < matching.length; i++) {
      const file = matching[i];
      const isPrimary = i === 0;
      const isInterior = file.includes("interior");
      const altText = isInterior
        ? `${villa.title} - Intérieur`
        : villa.title;

      await prisma.propertyImage.create({
        data: {
          propertyId: villa.id,
          url: `/images/villas/${file}`,
          alt: altText,
          isPrimary,
          sortOrder: i,
        },
      });
      linked++;
    }

    console.log(`  [linked] ${villa.title}: ${matching.length} images`);
  }

  const totalImages = await prisma.propertyImage.count();
  console.log(`\nDone! Total property images in database: ${totalImages}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
