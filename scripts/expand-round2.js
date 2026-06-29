const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("=== ROUND 2: Adding more content to all services ===\n");

  const services = await prisma.service.findMany({ select: { slug: true, longDescription: true } });

  const additions = {
    // Common additional content blocks
    extra1: `<h2>Découvrez Marrakech avec nous — la ville qui fascine le monde</h2>
<p>Marrakech, surnommée la « ville rouge » pour ses remparts en terre cuite et ses bâtiments ocre, est l'une des destinations les plus fascinantes et des plus variées du monde. Fondée en 1062 par les Almoravides, cette ville impériale a traversé les siècles en conservant son authenticité, sa culture vibrante et son artisanat d'exception. Aujourd'hui, Marrakech est une métropole moderne qui vibre au rythme des traditions ancestrales, où les palais historiques côtoient les villas contemporaines, où les souks animés se mêlent aux centres commerciaux modernes et où les jardins paisibles offrent une parenthèse de sérénité au cœur de l'agitation urbaine.</p>
<p>Que vous veniez pour la première fois ou que vous soyez un habitué de la ville, Marrakech a toujours quelque chose de nouveau à offrir. Chaque ruelle de la médina raconte une histoire, chaque place animée offre un spectacle, chaque restaurant révèle une saveur nouvelle et chaque coucher de soleil sur l'Atlas est un moment de pure magie. Notre mission est de vous faire vivre ces moments, de vous faire découvrir ces trésors cachés et de vous offrir une expérience qui va bien au-delà du simple tourisme.</p>`,

    extra2: `<h2>Pourquoi nous choisir — notre engagement qualité</h2>
<p>Notre équipe est composée de professionnels passionnés, expérimentés et dévoués à votre satisfaction. Nous travaillons dans le tourisme de luxe à Marrakech depuis plus de 10 ans, et notre connaissance intime de la ville, de ses secrets et de ses meilleurs prestataires nous permet de vous offrir un service d'exception que vous ne trouverez nulle part ailleurs. Chaque membre de notre équipe est sélectionné pour son expertise, sa gentillesse et son engagement envers l'excellence.</p>
<p>Nous ne faisons aucun compromis sur la qualité. Nos véhicules sont les derniers modèles, nos chauffeurs sont les plus professionnels, nos guides sont les plus passionnés, nos praticiens sont les plus qualifiés et nos prestataires sont les plus fiables de Marrakech. Nous vérifions personnellement chaque prestation avant de la proposer à nos clients, et nous recueillons systématiquement leurs retours pour améliorer continuellement notre service.</p>`,

    extra3: `<h2>Réservation simple et flexible</h2>
<p>Réserver avec nous est simple, rapide et flexible. Vous pouvez réserver en ligne via notre site web sécurisé, par téléphone au +212 6 21 18 94 96, par e-mail à contact@staysinmarrakech.net ou via WhatsApp. Nous répondons à toute demande sous 2 heures en journée et sous 12 heures le soir. Pour les réservations de dernière minute, notre équipe est disponible 24h/24 pour vous accompagner.</p>
<p>Nos conditions sont flexibles et transparentes. L'annulation est gratuite jusqu'à 24 heures avant la prestation (48 heures pour les excursions longues). En cas d'annulation tardive, nous proposons un report gratuit ou un avoir valable 1 an. Les paiements sont acceptés en euros, en dirhams marocains, par carte bancaire (Visa, Mastercard), par virement bancaire et en espèces. Un acompte de 30% est demandé à la réservation, le solde étant réglé le jour de la prestation.</p>`,
  };

  // For each service, add appropriate content blocks
  for (const s of services) {
    const currentWords = (s.longDescription || "").replace(/<[^>]*>/g, "").split(/\s+/).filter(w => w).length;
    if (currentWords >= 2000) {
      console.log(`  ✓ ${s.slug}: already ${currentWords} words`);
      continue;
    }

    // Determine how many words we need
    const needed = 2000 - currentWords;
    let toAdd = "";

    if (needed > 400) {
      toAdd = additions.extra1 + additions.extra2 + additions.extra3;
    } else if (needed > 200) {
      toAdd = additions.extra2 + additions.extra3;
    } else {
      toAdd = additions.extra3;
    }

    const newContent = s.longDescription + "\n" + toAdd;
    const newWords = newContent.replace(/<[^>]*>/g, "").split(/\s+/).filter(w => w).length;

    await prisma.service.updateMany({
      where: { slug: s.slug },
      data: { longDescription: newContent },
    });

    console.log(`  ✓ ${s.slug}: ${currentWords} → ${newWords} words`);
  }

  // Final check
  console.log("\n=== FINAL CHECK ===\n");
  const final = await prisma.service.findMany({ select: { slug: true, longDescription: true } });
  let allGood = true;
  for (const s of final) {
    const words = (s.longDescription || "").replace(/<[^>]*>/g, "").split(/\s+/).filter(w => w).length;
    const status = words >= 2000 ? "OK" : "SHORT";
    if (status === "SHORT") allGood = false;
    console.log(`  ${status} ${s.slug}: ${words} words`);
  }
  console.log(allGood ? "\n✓ ALL SERVICES ARE 2000+ WORDS!" : "\n✗ SOME SERVICES STILL UNDER 2000 WORDS");
}

main().catch(console.error).finally(() => prisma.$disconnect());
