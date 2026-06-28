const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Fixing image references...\n");

  // Fix hero slides - use existing images
  const slideUpdates = [
    { where: { slug: undefined }, data: {} }, // can't filter easily, just update all
  ];
  
  await prisma.heroSlide.updateMany({
    where: { image: "/images/activities/villa-luxe.webp" },
    data: { image: "/images/sections/location-villa-marrakech.webp" },
  });
  console.log("  Fixed hero slide: villa-luxe.webp → location-villa-marrakech.webp");

  await prisma.heroSlide.updateMany({
    where: { image: "/images/activities/voiture-luxe.webp" },
    data: { image: "/images/sections/vacances-marrakech.webp" },
  });
  console.log("  Fixed hero slide: voiture-luxe.webp → vacances-marrakech.webp");

  // Fix settings image references
  await prisma.siteSetting.updateMany({
    where: { key: "location_image", value: "/images/activities/villa-luxe.webp" },
    data: { value: "/images/sections/location-villa-marrakech.webp" },
  });
  console.log("  Fixed setting: location_image");

  await prisma.siteSetting.updateMany({
    where: { key: "shortrental_image", value: "/images/activities/medina.webp" },
    data: { value: "/images/sections/courte-duree.webp" },
  });
  console.log("  Fixed setting: shortrental_image");

  await prisma.siteSetting.updateMany({
    where: { key: "events_image", value: "/images/activities/soiree.webp" },
    data: { value: "/images/sections/evenements.webp" },
  });
  console.log("  Fixed setting: events_image");

  await prisma.siteSetting.updateMany({
    where: { key: "vacations_image", value: "/images/activities/villa-luxe.webp" },
    data: { value: "/images/sections/vacances-marrakech.webp" },
  });
  console.log("  Fixed setting: vacations_image");

  // Fix service image references  
  const serviceFixes = [
    { slug: "vos-activites", old: "/images/activities/quad.webp", new: "/images/activities/quad-buggy.webp" },
    { slug: "quad-buggy", old: "/images/activities/quad.webp", new: "/images/activities/quad-buggy.webp" },
    { slug: "montgolfiere-marrakech", old: "/images/activities/sonotherapie.webp", new: "/images/activities/montgolfiere.webp" },
    { slug: "excursions-vtt", old: "/images/activities/vtt.webp", new: "/images/activities/vtt.webp" }, // already correct
    { slug: "grand-canyon-marrakech", old: "/images/activities/canyon.webp", new: "/images/activities/grand-canyon.webp" },
    { slug: "visites-decouvertes", old: "/images/activities/medina.webp", new: "/images/activities/visites-decouvertes.webp" },
    { slug: "equitation", old: "/images/activities/cheval.webp", new: "/images/activities/equitation.webp" },
    { slug: "yoga-pilates", old: "/images/activities/yoga.webp", new: "/images/activities/yoga-pilates.webp" },
    { slug: "aqua-karting", old: "/images/activities/karting.webp", new: "/images/activities/aqua-karting.webp" },
    { slug: "karting", old: "/images/activities/karting.webp", new: "/images/activities/karting.webp" }, // already correct
    { slug: "side-car-vintage", old: "/images/activities/sidecar.webp", new: "/images/activities/side-car.webp" },
    { slug: "jet-ski", old: "/images/activities/jetski.webp", new: "/images/activities/jet-ski.webp" },
    { slug: "sonotherapie", old: "/images/activities/sonotherapie.webp", new: "/images/activities/sonotherapie.webp" }, // correct
    { slug: "vos-soirees-festives", old: "/images/activities/soiree.webp", new: "/images/sections/evenements.webp" },
    { slug: "vos-demandes-specifiques", old: "/images/activities/personnalise.webp", new: "/images/sections/vacances-marrakech.webp" },
    { slug: "vos-repas", old: "/images/activities/voiture-luxe.webp", new: "/images/activities/voiture-luxe.webp" }, // correct
    { slug: "votre-transport-sur-place", old: "/images/activities/van-chauffeur.webp", new: "/images/activities/van-chauffeur.webp" }, // correct
    { slug: "van-avec-chauffeur", old: "/images/activities/van-chauffeur.webp", new: "/images/activities/van-chauffeur.webp" }, // correct
    { slug: "votre-bien-etre", old: "/images/activities/sonotherapie.webp", new: "/images/activities/sonotherapie.webp" }, // correct
    { slug: "votre-sejour", old: "/images/activities/sonotherapie.webp", new: "/images/activities/sonotherapie.webp" }, // correct
    { slug: "desert-sensation", old: "/images/activities/desert.webp", new: "/images/activities/desert-sensation.webp" },
    { slug: "wakeboard-marrakech", old: "/images/activities/wakeboard.webp", new: "/images/activities/wakeboard.jpg" },
    { slug: "golf-marrakech", old: "/images/activities/golf.webp", new: "/images/activities/golf.webp" }, // correct
  ];

  for (const fix of serviceFixes) {
    if (fix.old !== fix.new) {
      await prisma.service.updateMany({
        where: { slug: fix.slug },
        data: { image: fix.new },
      });
      console.log(`  Fixed service "${fix.slug}": ${fix.old} → ${fix.new}`);
    }
  }

  console.log("\nDone!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
