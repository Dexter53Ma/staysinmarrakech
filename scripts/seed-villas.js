/**
 * Seed script: Migrate hardcoded villa data to the Property table.
 * Run with: node scripts/seed-villas.js
 *
 * This reads the hardcoded villa data from the legacy [slug]/page.tsx
 * and creates Property records in the database.
 */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Hardcoded villa slugs to migrate (from the legacy page)
const villaSlugs = [
  "nouma", "nayma", "lya", "nera", "selma", "shakira", "gabriella",
  "paloma", "ilana", "nemeno", "loubna", "myriam", "katia", "bchir",
  "hamza", "jad", "zineb", "safaa", "safa", "nadia", "maria", "sofia",
  "amina", "fatima", "leila", "yasmine", "houda", "salma", "ghita",
  "noor", "laila", "hanane", "samira", "meriem", "zohra",
];

async function main() {
  console.log("Seeding villa properties...");

  for (const slug of villaSlugs) {
    const existing = await prisma.property.findUnique({ where: { slug } });
    if (existing) {
      console.log(`  [skip] ${slug} already exists`);
      continue;
    }

    // Create a basic property record — the full data migration from the
    // hardcoded page can be done manually or via a more detailed script.
    await prisma.property.create({
      data: {
        title: `Villa ${slug.charAt(0).toUpperCase() + slug.slice(1)}`,
        slug,
        description: `Description de la villa ${slug}. À compléter.`,
        type: "VILLA",
        status: "AVAILABLE",
        price: 0,
        currency: "EUR",
        pricePeriod: "nightly",
        address: "Marrakech, Morocco",
        city: "Marrakech",
        features: [],
      },
    });
    console.log(`  [created] ${slug}`);
  }

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
