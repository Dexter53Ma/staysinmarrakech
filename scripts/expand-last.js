const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const lastPush = {
  "grand-canyon-marrakech": `<p>Cette aventure dans les gorges est une expérience qui transforme les voyageurs. La combinaison de l'effort physique, de la beauté naturelle et de la richesse culturelle crée un souvenir profond et durable. Les participants reviennent de cette excursion avec une appreciation renouvelée pour la nature, pour les cultures locales et pour leurs propres capacités physiques et mentales.</p>`,
  "aqua-karting": `<p>Réservez votre session d'aqua karting dès aujourd'hui et préparez-vous pour une expérience unique, amusante et inoubliable. Que ce soit pour un anniversaire, un team building ou simplement pour passer un bon moment entre amis, l'aqua karting à Marrakech est l'activité parfaite qui combine sport, fun et découverte dans un cadre naturel d'une beauté exceptionnelle.</p>`,
  "jet-ski": `<p>Le jet ski à Marrakech est bien plus qu'un sport — c'est une expérience sensorielle complète qui combine la vitesse, la liberté, la beauté du cadre et la chaleur humaine. Les lacs de l'Agafay, avec leur eau calme et leurs paysages grandioses, offrent un terrain de jeu idéal pour les passionnés de glisse et les amateurs de sensations fortes.</p>`,
  "vos-demandes-specifiques": `<p>Contactez-nous dès aujourd'hui pour discuter de votre projet. Notre première consultation est gratuite et sans engagement. Ensemble, nous créerons une expérience qui dépassera vos attentes et qui restera gravée dans votre mémoire pour toujours.</p>`,
};

async function main() {
  console.log("=== LAST PUSH ===\n");
  const services = await prisma.service.findMany({ select: { slug: true, longDescription: true } });

  for (const s of services) {
    const currentWords = (s.longDescription || "").replace(/<[^>]*>/g, "").split(/\s+/).filter(w => w).length;
    if (currentWords >= 2000) {
      console.log(`  ✓ ${s.slug}: ${currentWords} words`);
      continue;
    }
    const addition = lastPush[s.slug];
    if (!addition) { console.log(`  ✗ ${s.slug}: ${currentWords} words`); continue; }
    const newContent = s.longDescription + "\n" + addition;
    const newWords = newContent.replace(/<[^>]*>/g, "").split(/\s+/).filter(w => w).length;
    await prisma.service.updateMany({ where: { slug: s.slug }, data: { longDescription: newContent } });
    console.log(`  ✓ ${s.slug}: ${currentWords} → ${newWords} words`);
  }

  console.log("\n=== FINAL ===\n");
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
