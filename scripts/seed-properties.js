const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

// Realistic villa data for Marrakech luxury rentals
const villaData = [
  { slug: "zohra", title: "Villa Zohra", description: "Magnifique villa de luxe nichée dans les oliveraies de Marrakech, offrant un cadre paisible et raffiné pour des vacances inoubliables. Villa Zohra allie architecture marocaine traditionnelle et confort moderne dans un environnement verdoyant et préservé. Avec sa piscine privée chauffée, ses jardins méditerranéens et ses prestations haut de gamme, cette villa est l'endroit idéal pour des vacances en famille ou entre amis dans la plus pure tradition marocaine.", price: 450, bedrooms: 5, bathrooms: 4, maxGuests: 10, quarter: "Harra", builtArea: 350, plotArea: 800, features: ["pool","garden","wifi","ac","bbq","parking","security"], pricePeriod: "nightly", isFeatured: true },
  { slug: "meriem", title: "Villa Meriem", description: "Villa contemporaine élégante avec vue imprenable sur les sommets enneigés de l'Atlas. Meriem offre un design moderne et épuré, des espaces de vie lumineuses et une terrasse panoramique idéale pour admirer les couchers de soleil. La piscine à débordement, le jardin paysager et les finitions haut de gamme font de cette villa une véritable perle de luxe à Marrakech.", price: 380, bedrooms: 4, bathrooms: 3, maxGuests: 8, quarter: "Guéliz", builtArea: 280, plotArea: 600, features: ["pool","garden","wifi","ac","bbq","parking"], pricePeriod: "nightly", isFeatured: true },
  { slug: "samira", title: "Villa Samira", description: "Riad de charme restauré avec goût au cœur de la médina, offrant une immersion authentique dans l'architecture marocaine. Ses zelliges artisanaux, ses fontaines murales et ses jardins intérieurs créent une atmosphère de sérénité absolue. Villa Samira est un havre de paix où tradition et modernité se rejoignent pour offrir un séjour d'exception.", price: 320, bedrooms: 4, bathrooms: 4, maxGuests: 8, quarter: "Médina", builtArea: 250, plotArea: 400, features: ["wifi","ac","hammam","terrace","roof"], pricePeriod: "nightly", isFeatured: false },
  { slug: "hanane", title: "Villa Hanane", description: "Villa spacieuse et chaleureuse dans le quartier résidentiel de l'Harra, parfaite pour les familles. Son jardin arboré, sa grande piscine et ses espaces de vie conviviales en font un lieu de séjour agréable et confortable. Villa Hanane bénéficie d'un emplacement privilégié à proximité des commerces, restaurants et centres d'intérêt de Marrakech.", price: 280, bedrooms: 4, bathrooms: 3, maxGuests: 8, quarter: "Harra", builtArea: 260, plotArea: 500, features: ["pool","garden","wifi","ac","bbq","parking","security"], pricePeriod: "nightly", isFeatured: false },
  { slug: "laila", title: "Villa Laila", description: "Villa de prestige avec jardin exotique et piscine privée, située dans un quartier calme et verdoyant. Laila offre un design raffiné, des finitions soignées et un confort optimal. La terrasse sur le toit-terrasse offre une vue panoramique sur la ville et l'Atlas, idéale pour les apéritifs au coucher du soleil.", price: 350, bedrooms: 3, bathrooms: 3, maxGuests: 6, quarter: "Hivernage", builtArea: 220, plotArea: 450, features: ["pool","garden","wifi","ac","terrace","roof","parking"], pricePeriod: "nightly", isFeatured: true },
  { slug: "noor", title: "Villa Noor", description: "Villa moderne et lumineuse avec design intérieur signé par un architecte de renom. Noor combine lignes épurées et touches marocaines pour un résultat à la fois contemporain et chaleureux. La piscine chauffée, le spa privatif et le home-cinéma en font une villa d'exception pour des vacances de luxe.", price: 520, bedrooms: 5, bathrooms: 5, maxGuests: 10, quarter: "Hivernage", builtArea: 400, plotArea: 900, features: ["pool","garden","wifi","ac","spa","cinema","bbq","parking","security"], pricePeriod: "nightly", isFeatured: true },
  { slug: "ghita", title: "Villa Ghita", description: "Villa de caractère avec architecture traditionnelle et jardins luxuriants. Ghita offre une expérience authentique dans un cadre préservé, avec ses murs en pisé ocre, ses toits terrasses et ses oliveraies centenaires. Le parfait équilibre entre tradition et confort moderne pour un séjour inoubliable à Marrakech.", price: 300, bedrooms: 3, bathrooms: 2, maxGuests: 6, quarter: "Sidi Youssef Ben Ali", builtArea: 200, plotArea: 400, features: ["pool","garden","wifi","ac","terrace"], pricePeriod: "nightly", isFeatured: false },
  { slug: "salma", title: "Villa Salma", description: "Villa de luxe contemporaine avec piscine à débordement et vue spectaculaire sur l'Atlas. Salma offre un design architectural impressionnant, des espaces de vie ouverts sur l'extérieur et des prestations haut de gamme. Le jardin paysager, la terrasse panoramique et le barbecue extérieur en font un lieu idéal pour des vacances entre amis.", price: 420, bedrooms: 4, bathrooms: 4, maxGuests: 8, quarter: "Agafay", builtArea: 320, plotArea: 700, features: ["pool","garden","wifi","ac","bbq","parking","view"], pricePeriod: "nightly", isFeatured: true },
  { slug: "houda", title: "Villa Houda", description: "Villa charmante et authentique dans un quartier traditionnel de Marrakech. Houda offre le charme du pisé ocre, la fraîcheur des jardins intérieurs et le confort des équipements modernes. Un écrin de sérénité au coeur de l'animation de la ville rouge, idéal pour découvrir l'âme de Marrakech.", price: 250, bedrooms: 3, bathrooms: 2, maxGuests: 6, quarter: "Sidi Youssef Ben Ali", builtArea: 180, plotArea: 350, features: ["wifi","ac","terrace","garden"], pricePeriod: "nightly", isFeatured: false },
  { slug: "yasmine", title: "Villa Yasmine", description: "Villa somptueuse avec hamman privé et jardin d'agrément. Yasmine est une demeure de prestige qui allie le luxe le plus raffiné aux traditions marocaines les plus authentiques. Ses espaces de vie généreuses, ses chambres somptueuses et ses prestations d'exception en font la villa idéale pour les voyageurs les plus exigeants.", price: 480, bedrooms: 5, bathrooms: 5, maxGuests: 10, quarter: "Hivernage", builtArea: 380, plotArea: 850, features: ["pool","garden","wifi","ac","hammam","spa","bbq","parking","security"], pricePeriod: "nightly", isFeatured: true },
];

// Additional villas with basic data
const moreVillas = [
  { slug: "nouma", title: "Villa Nouma" },
  { slug: "nayma", title: "Villa Nayma" },
  { slug: "lya", title: "Villa Lya" },
  { slug: "nera", title: "Villa Nera" },
  { slug: "shakira", title: "Villa Shakira" },
  { slug: "gabriella", title: "Villa Gabriella" },
  { slug: "paloma", title: "Villa Paloma" },
  { slug: "ilana", title: "Villa Ilana" },
  { slug: "nemeno", title: "Villa Nemeno" },
  { slug: "loubna", title: "Villa Loubna" },
  { slug: "myriam", title: "Villa Myriam" },
  { slug: "katia", title: "Villa Katia" },
  { slug: "bchir", title: "Villa Bchir" },
  { slug: "hamza", title: "Villa Hamza" },
  { slug: "jad", title: "Villa Jad" },
  { slug: "zineb", title: "Villa Zineb" },
  { slug: "safaa", title: "Villa Safaa" },
  { slug: "safa", title: "Villa Safa" },
  { slug: "nadia", title: "Villa Nadia" },
  { slug: "maria", title: "Villa Maria" },
  { slug: "sofia", title: "Villa Sofia" },
  { slug: "amina", title: "Villa Amina" },
  { slug: "fatima", title: "Villa Fatima" },
  { slug: "leila", title: "Villa Leila" },
];

async function main() {
  console.log("=== Updating properties with real data ===\n");

  // Update the 10 featured villas with full data
  for (const v of villaData) {
    const result = await p.property.updateMany({
      where: { slug: v.slug },
      data: {
        title: v.title,
        description: v.description,
        price: v.price,
        bedrooms: v.bedrooms,
        bathrooms: v.bathrooms,
        maxGuests: v.maxGuests,
        quarter: v.quarter,
        builtArea: v.builtArea,
        plotArea: v.plotArea,
        features: v.features,
        pricePeriod: v.pricePeriod,
        isFeatured: v.isFeatured,
        address: `Quartier ${v.quarter}, Marrakech`,
      },
    });
    console.log(`  ✓ ${v.slug}: ${result.count} updated`);
  }

  // Update remaining villas with basic realistic data
  const quarters = ["Harra", "Guéliz", "Hivernage", "Sidi Youssef Ben Ali", "Agafay"];
  const bedroomOptions = [3, 4, 5];
  const priceOptions = [250, 300, 350, 400, 450];

  for (let i = 0; i < moreVillas.length; i++) {
    const v = moreVillas[i];
    const q = quarters[i % quarters.length];
    const beds = bedroomOptions[i % bedroomOptions.length];
    const price = priceOptions[i % priceOptions.length];
    const result = await p.property.updateMany({
      where: { slug: v.slug },
      data: {
        description: `Belle villa de caractère dans le quartier de ${q} à Marrakech. Cette propriété offre ${beds} chambres spacieuses, une piscine privée, un jardin méditerranéen et tout le confort moderne pour des vacances agréables. Idéalement située à proximité des commerces, restaurants et sites touristiques de la ville rouge.`,
        price: price,
        bedrooms: beds,
        bathrooms: beds - 1,
        maxGuests: beds * 2,
        quarter: q,
        builtArea: 180 + (beds * 30),
        plotArea: 300 + (beds * 50),
        features: ["pool","garden","wifi","ac","parking"],
        pricePeriod: "nightly",
        address: `Quartier ${q}, Marrakech`,
      },
    });
    console.log(`  ✓ ${v.slug}: ${result.count} updated`);
  }

  // Set logo_url setting
  await p.siteSetting.upsert({
    where: { key: "logo_url" },
    update: { value: "/images/logo.png" },
    create: { key: "logo_url", value: "/images/logo.png" },
  });
  console.log("\n  ✓ Set logo_url to /images/logo.png");

  console.log("\nDone!");
}

main().catch(console.error).finally(() => p.$disconnect());
