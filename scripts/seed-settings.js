const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding hero slides...");
  await prisma.heroSlide.deleteMany();

  const slides = [
    {
      title: "Villas de Luxe à Marrakech",
      subtitle: "Découvrez notre sélection exclusive de villas premium avec piscine privée et vue sur l'Atlas",
      image: "/images/activities/villa-luxe.webp",
      link: "/properties",
      buttonText: "Voir les villas",
      sortOrder: 1,
    },
    {
      title: "Expériences Inoubliables",
      subtitle: "Montgolfière, quad, désert, bien-être — vivez Marrakech autrement",
      image: "/images/activities/sonotherapie.webp",
      link: "/service",
      buttonText: "Découvrir nos services",
      sortOrder: 2,
    },
    {
      title: "Conciergerie Premium",
      subtitle: "Un assistant personnel dédié pour transformer votre séjour en expérience de luxe",
      image: "/images/activities/voiture-luxe.webp",
      link: "/service/conciergerie",
      buttonText: "En savoir plus",
      sortOrder: 3,
    },
  ];

  for (const s of slides) {
    await prisma.heroSlide.create({ data: s });
    console.log(`  Created slide: "${s.title}"`);
  }

  console.log("\nSeeding site settings...");
  await prisma.siteSetting.deleteMany();

  const settings = [
    { key: "site_name", value: "StaysInMarrakech" },
    { key: "site_description", value: "Location de villas de luxe à Marrakech avec services de conciergerie premium" },
    { key: "phone_1", value: "+212 621 189 496" },
    { key: "phone_2", value: "" },
    { key: "email", value: "contact@staysinmarrakech.net" },
    { key: "address", value: "Résidence Farah Camp, Rue Mangin, Guéliz, Marrakech, Maroc" },
    { key: "facebook", value: "https://facebook.com/staysinmarrakech" },
    { key: "twitter", value: "" },
    { key: "instagram", value: "https://instagram.com/staysinmarrakech" },
    { key: "linkedin", value: "" },
    { key: "logo_url", value: "" },
    { key: "hero_title", value: "Villas de Luxe à Marrakech" },
    { key: "hero_subtitle", value: "Votre séjour de rêve au cœur de la ville rouge" },
    { key: "location_title", value: "Locations Saisonnières" },
    { key: "location_description", value: "Louez une villa de luxe avec piscine privée pour vos vacances à Marrakech" },
    { key: "location_image", value: "/images/activities/villa-luxe.webp" },
    { key: "location_link_text", value: "Voir les villas" },
    { key: "location_link_href", value: "/properties" },
    { key: "shortrental_title", value: "Vente de Villas" },
    { key: "shortrental_description", value: "Découvrez nos villas à vendre à Marrakech — investissement immobilier de prestige" },
    { key: "shortrental_image", value: "/images/activities/medina.webp" },
    { key: "shortrental_link_text", value: "Voir les propriétés" },
    { key: "shortrental_link_href", value: "/properties?type=sale" },
    { key: "stats_experience", value: "10+ ans" },
    { key: "stats_clients", value: "500+" },
    { key: "stats_quality", value: "98%" },
    { key: "stats_services", value: "24+" },
    { key: "stats_presence", value: "24h/24" },
    { key: "events_title", value: "Événements Privés" },
    { key: "events_description", value: "Mariages, anniversaires, séminaires — nous créons l'événement de vos rêves" },
    { key: "events_image", value: "/images/activities/soiree.webp" },
    { key: "vacations_title", value: "Vacances de Rêve" },
    { key: "vacations_description", value: "Séjournez dans une villa de luxe avec conciergerie et services premium" },
    { key: "vacations_image", value: "/images/activities/villa-luxe.webp" },
  ];

  for (const s of settings) {
    await prisma.siteSetting.create({ data: s });
  }
  console.log(`  Created ${settings.length} settings`);

  const counts = {
    heroSlides: await prisma.heroSlide.count(),
    settings: await prisma.siteSetting.count(),
  };
  console.log(`\nDone! Hero slides: ${counts.heroSlides}, Settings: ${counts.settings}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
