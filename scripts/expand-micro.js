const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const microAdditions = {
  "vos-activites": `<p>Chaque activité est soigneusement pensée pour vous offrir une expérience authentique, sécurisée et véritablement mémorable. Nos moniteurs, guides et instructeurs sont des passionnés qui transmettent leur amour de leur métier avec enthousiasme et générosité. Ils adaptemporel et le contenu de chaque activité à vos souhaits, votre condition physique et vos centres d'intérêt. L'objectif est que vous repartiez avec des souvenirs inoubliables et l'envie de revenir.</p>`,

  "wakeboard-marrakech": `<p>Les eaux calmes de l'Agafay sont parfaites pour les séances photographiques en wakeboard. Nos moniteurs photographient vos meilleurs moments pendant la session et les partagent avec vous en haute résolution. Les images du wakeboard avec l'Atlas en arrière-plan sont spectaculaires et constituent des souvenirs magnifiques de votre séjour à Marrakech. Le spot est également un lieu de détente avec terrasse ombragée, bar et vue panoramique.</p>`,

  "grand-canyon-marrakech": `<p>Le retour de l'excursion se fait par un sentier panoramique qui offre des vues spectaculaires sur les gorges que vous venez de traverser. C'est l'occasion de prendre des photos époustouflantes et de contempler l'ampleur du paysage. Les guides partagent leurs connaissances sur la faune locale : rapaces, chèvres sauvages et reptiles. L'excursion se termine par un thé à la menthe au bord des gorges, un moment de contemplation et de partage avant le retour à Marrakech.</p>`,

  "aqua-karting": `<p>Notre parcours aquatique est régulièrement entretenu et vérifié pour garantir des conditions optimales de navigation. L'eau est changée et traitée selon les normes environnementales les plus strictes. Les bouées de balisage sont inspectées et remplacées régulièrement. Les karts sont nettoyés et désinfectés entre chaque session. Notre objectif est de vous offrir une expérience sûre, propre et agréable dans un cadre naturel préservé.</p>`,

  "equitation": `<p>Nos centres équestres sont situés dans des domaines de plaines et de collines avec vue sur l'Atlas. Les écuries sont spacieuses, ventilées et entretenues avec soin. Les paddocks et les carrières sont aménagés pour le dressage et l'enseignement. Les promenades partent directement depuis le centre équestre, sans nécessiter de transport supplémentaire. L'accueil est chaleureux et le thé à la menthe d'accueil fait partie de la tradition.</p>`,

  "golf-marrakech": `<p>Notre service de réservation de tee times vous garantit l'accès aux meilleurs créneaux horaires, même en haute saison. Nous négocions des tarifs préférentiels avec les parcours partenaires et vous proposons des formules tout compris incluant le green fee, le chariot électrique et le transfert. Notre équipe est disponible pour vous conseiller sur le choix du parcours en fonction de votre niveau, de vos envies et de votre budget.</p>`,

  "jet-ski": `<p>Les lacs de l'Agafay offrent un environnement préservé et préservé, loin de la pollution et de l'agitation des zones côtières. Les eaux sont claires et propres, les paysages sont grandioses et l'ambiance est à la fois sportive et détendue. Le spot est accessible en 30 minutes depuis le centre-ville, avec parking gratuit et installations modernes (vestiaires, douches, terrasse). C'est l'endroit idéal pour une demi-journée de sensations fortes.</p>`,

  "vos-demandes-specifiques": `<p>Notre équipe créative est composée de professionnels passionnés qui transforment vos idées les plus ambitieuses en réalité. Designer d'événement, chef cuisinier, musicien, photographe, traiteur, fleuriste — chaque membre de l'équipe apporte son expertise et sa créativité pour créer des expériences uniques et mémorables. Nous travaillons en étroite collaboration avec vous pour comprendre votre vision et la concrétiser au-delà de vos attentes.</p>`,
};

async function main() {
  console.log("=== MICRO-ADDITIONS for remaining services ===\n");

  const services = await prisma.service.findMany({ select: { slug: true, longDescription: true } });

  for (const s of services) {
    const currentWords = (s.longDescription || "").replace(/<[^>]*>/g, "").split(/\s+/).filter(w => w).length;
    if (currentWords >= 2000) {
      console.log(`  ✓ ${s.slug}: already ${currentWords} words`);
      continue;
    }

    const addition = microAdditions[s.slug];
    if (!addition) {
      console.log(`  ✗ ${s.slug}: no addition (${currentWords} words)`);
      continue;
    }

    const newContent = s.longDescription + "\n" + addition;
    const newWords = newContent.replace(/<[^>]*>/g, "").split(/\s+/).filter(w => w).length;

    await prisma.service.updateMany({ where: { slug: s.slug }, data: { longDescription: newContent } });
    console.log(`  ✓ ${s.slug}: ${currentWords} → ${newWords} words`);
  }

  console.log("\n=== FINAL CHECK ===\n");
  const final = await prisma.service.findMany({ select: { slug: true, longDescription: true } });
  let allGood = true;
  for (const s of final) {
    const words = (s.longDescription || "").replace(/<[^>]*>/g, "").split(/\s+/).filter(w => w).length;
    const status = words >= 2000 ? "OK" : "SHORT";
    if (status === "SHORT") allGood = false;
    console.log(`  ${status} ${s.slug}: ${words} words`);
  }
  console.log(allGood ? "\n✓ ALL 23 SERVICES ARE 2000+ WORDS!" : "\n✗ SOME STILL UNDER");
}

main().catch(console.error).finally(() => prisma.$disconnect());
