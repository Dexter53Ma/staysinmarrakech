const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const finalAdditions = {
  "montgolfiere-marrakech": `<h2>Les meilleurs moments pour voler en montgolfière</h2>
<p>Le vol en montgolfière est possible toute l'année à Marrakech, mais chaque saison offre des caractéristiques uniques. Au printemps (mars à mai), les températures sont douces et les fleurs fleurissent dans la campagne, créant un paysage coloré et parfumé. En été (juin à août), les levers de soleil sont précoces (5h30) et la chaleur est supportable en altitude. En automne (septembre à novembre), la lumière est dorée et les oliviers sont lourds de fruits. En hiver (décembre à février), les sommets de l'Atlas sont enneigés, offrant un contraste spectaculaire avec les plaines verdoyantes.</p>
<p>Quelle que soit la saison, le moment idéal pour voler est le lever du soleil, quand les vents sont calmes, la lumière est douce et la température est agréable. Les vols de fin d'après-midi sont également possibles, offrant un coucher de soleil spectaculaire depuis les airs. Les conditions météorologiques sont vérifiées en temps réel, et les vols ne sont annulés qu'en cas de vent fort ou de mauvaise visibilité.</p>`,

  "excursions-vtt": `<h2>Le VTT et la découverte des villages berbères</h2>
<p>L'un des plus grands plaisirs du VTT à Marrakech est la découverte des villages berbères perchés sur les collines. Ces villages, construits en pisé avec des toits terrasses, offrent un spectacle architectural unique et une accueil chaleureuse de la population locale. Les VTTistes sont souvent invités à partager un thé à la menthe avec les habitants, à visiter les maisons traditionnelles et à découvrir le mode de vie berbère qui a peu changé depuis des siècles.</p>
<p>Les villages les plus visités lors de nos excursions VTT sont Imlil (portes de l'Atlas, point de départ du trekking vers le Toubkal), Setti Fatma (village de bergers au-dessus des Cascades d'Ouzoud), et les hameaux de l'Ourika (villages de montagne avec vues spectaculaires). Chaque village a sa propre personnalité, ses traditions et ses spécialités culinaires. Les guides partagent leurs connaissances sur l'histoire, la culture et le mode de vie de chaque communauté.</p>`,

  "yoga-pilates": `<h2>Les bienfaits du yoga sur la santé — des millénaires de sagesse</h2>
<p>Le yoga est pratiqué depuis plus de 5 000 ans et ses bienfaits sur la santé sont aujourd'hui confirmés par la science moderne. Les études montrent que la pratique régulière du yoga réduit le stress (mesuré par le cortisol salivaire), améliore la souplesse et l'équilibre, renforce les muscles profonds du core, réduit les douleurs chroniques (dos, articulations), améliore la qualité du sommeil, diminue l'anxiété et la dépression, et augmente la concentration et la créativité.</p>
<p>À Marrakech, le yoga prend une dimension supplémentaire grâce au cadre magnifique de l'Atlas, à la lumière dorée du Maroc et à l'ambiance spirituelle de la ville. Nos instructeurs combinent les techniques traditionnelles du yoga avec les atmosphères locales pour créer des séances uniques et profondément enrichissantes. Les séances en extérieur, avec vue sur les toits de la médina et les minarets des mosquées, sont particulièrement mémorables.</p>`,

  "vos-activites": `<h2>Les ateliers d'art et d'artisanat — créez vos propres souvenirs</h2>
<p>Les ateliers d'art et d'artisanat sont parmi les activités les plus appréciées de nos clients. L'atelier de poterie vous initie au tournage sur un métier traditionnel et à la création de bols, d'assiettes et de vases que vous repartez avec vous. L'atelier de peinture sur zellige vous apprend les techniques de la mosaïque marocaine et la création de motifs géométriques complexes. L'atelier de cuir vous enseigne la découpe, le poinçonnage et la couture de babouches, de carnets et de sacs en cuir véritable.</p>
<p>Ces ateliers sont animés par des artisans maîtres, des détenteurs de savoir-faire transmis depuis des générations. Ils partagent leurs connaissances avec patience et générosité, et vous permettent de créer des pièces uniques et authentiques qui racontent votre passage à Marrakech. Chaque atelier dure de 2 à 3 heures et est accessible à tous les niveaux, du débutant au pratiquant confirmé.</p>`,

  "wakeboard-marrakech": `<h2>Le wakeboard en famille — une activité pour tous les âges</h2>
<p>Le wakeboard est une activité idéale pour les familles. Les enfants à partir de 8 ans peuvent pratiquer avec un moniteur dédié, dans des conditions sécurisées et adaptées à leur âge. Les parents peuvent profiter de la terrasse ombragée du spot pour se détendre avec un café ou un jus de fruits frais, tout en observant les progrès de leurs enfants. C'est une expérience de partage et de complicité qui crée des souvenirs familiaux inoubliables.</p>
<p>Le spot de wakeboard de l'Agafay est équipé de toutes les commodités pour les familles : vestiaires, douches, zone de pique-nique, terrain de jeux pour les jeunes enfants, parking gratuit. Les moniteurs sont expérimentés avec les enfants et savent capter leur attention par des explications ludiques et des défis adaptés. La plupart des enfants se lèvent dès la première tentative et reviennent chaque année pour progresser.</p>`,

  "grand-canyon-marrakech": `<h2>Les gorges en saison — quand partir pour la meilleure expérience</h2>
<p>La meilleure saison pour le canyonisme près de Marrakech est le printemps (mars à mai) et l'automne (septembre à novembre). En printempin, les gorges sont alimentées par les eaux de fonte des neiges de l'Atlas, créant des cascades spectaculaires et des bassins remplis d'eau claire et fraîche. En automne, les températures sont douces, la lumière est dorée et les paysages sont colorés par les feuilles mortes.</p>
<p>En été (juin à août), les gorges sont plus sèches mais les bassins naturels restent remplis. Les températures sont élevées (35-40°C) mais la fraîcheur des gorges et des baignades compensent la chaleur. En hiver (décembre à février), les gorges sont froides et certaines parties sont inondées. Les excursions sont organisées uniquement en conditions favorables, avec une surveillance météorologique en temps réel.</p>`,

  "aqua-karting": `<h2>L'aqua karting pour les anniversaires — une fête unique</h2>
<p>L'aqua karting est l'activité parfaite pour les fêtes d'anniversaire, particulièrement pour les enfants et les adolescents. Nous proposons des formules anniversaire complètes qui incluent : réservation du parcours en exclusivité, cours de conduite personnalisés pour les invités, mini-compétition avec podium et remise de prix, gâteau d'anniversaire et boissons fraîches, décoration du site avec ballons et banderoles, séance photo souvenir.</p>
<p>Les anniversaires aqua karting sont disponibles pour les groupes de 6 à 20 personnes, à partir de 8 ans. Le programme dure 2 à 3 heures et comprend des phases de conduite libre, des défis amusants et une compétition finale. Les enfants adorent l'adrénaline de la conduite sur l'eau et la compétition amicale. Les parents apprécient le cadre sécurisé, l'encadrement professionnel et le divertissement garanti.</p>`,

  "desert-sensation": `<h2>Le désert d'Agafay en hiver — un moment de grâce</h2>
<p>Le désert d'Agafay en hiver est une expérience particulièrement magique. Les températures sont fraîches mais agréables (15-20°C en journée), le ciel est d'une pureté exceptionnelle et les sommets de l'Atlas sont couronnés de neige, offrant un contraste spectaculaire avec les rochers rouges du désert. Les couchers de soleil sont encore plus dramatiques, avec des couleurs intenses qui changent chaque minute.</p>
<p>Les nuits d'hiver dans le désert sont fraîches mais inoubliables. Les étoiles sont d'une clarté exceptionnelle, la voie lactée est visible à l'oeil nu et les constellations d'hiver (Orion, le Taureau, les Gémeaux) sont particulièrement spectaculaires. Les bivouacs de luxe sont équipés de couvertures supplémentaires, de poêles à bois et de系统 de chauffage pour un confort optimal. Le thé à la menthe chaud et les pâtisseries chaudes sont servis tout au long de la soirée.</p>`,

  "equitation": `<h2>L'équitation en hiver — un cadre magique et des températures idéales</h2>
<p>L'hiver est l'une des meilleures saisons pour l'équitation à Marrakech. Les températures sont douces (15-22°C), le ciel est clair et les paysages sont embellis par la neige sur les sommets de l'Atlas. Les sentiers de montagne sont dégagés et les vues sont spectaculaires. Les chevaux sont reposés et en pleine forme après l'été, et l'ambiance est particulièrement chaleureuse et conviviale.</p>
<p>Les promenades hivernales incluent souvent un thé chaud au coin du feu dans un gîte de montagne, une expérience qui contraste magnifiquement avec la fraîcheur de l'extérieur. Les jardins d'oliviers dépouillés offrent un cadre graphique et épuré, idéal pour la photographie. L'équitation en hiver est une expérience intime et contemplative, loin de la foule et de la chaleur de l'été.</p>`,

  "golf-marrakech": `<h2>Le golf en hiver — la saison idéale à Marrakech</h2>
<p>L'hiver (novembre à mars) est la saison idéale pour jouer au golf à Marrakech. Les températures sont douces (18-25°C), le ciel est clair et l'ensoleillement est constant. Les parcours sont en parfait état, les fairways sont verts et les greens sont rapides. C'est la saison la plus prisée par les golfeurs européens qui fuient le froid et la pluie pour profiter du soleil de Marrakech.</p>
<p>Les conditions de jeu en hiver sont exceptionnelles : pas de chaleur écrasante, pas de vent fort, une lumière idéale pour la photographie et pour la visibilité des balles. Les club-houses sont ouverts et chaleureux, avec des terrasses ensoleillées et des restaurants gastronomiques. Les cours de golf avec nos professeurs PGA sont disponibles tous les jours, et les parcours sont moins fréquentés qu'en haute saison.</p>`,

  "vos-soirees-festives": `<h2>La musique et les spectacles — l'âme de vos soirées</h2>
<p>La musique est au coeur de toute célébration marocaine. Nous proposons différents types de spectacles musicaux pour vos soirées : le groupe gnawa, musique traditionnelle aux influences africaines avec loutar, guembri et qraqeb ; le quartet andalou, musique classique maure avec oud, kamanja, darbouka et flûte ; le DJ moderne, set personnalisé avec hits internationaux et marocains ; la danseuse du ventre, spectacle traditionnel et élégant qui enchante les convives.</p>
<p>Nos musiciens sont des professionnels expérimentés qui savent adapter leur répertoire à l'ambiance de votre événement. Ils peuvent jouer en fond sonore pendant le dîner, animer la piste de danse après le repas, ou créer des moments de spectacle ponctuels qui émerveillent les convives. Les spectacles sont toujours un moment fort de l'événement, créant des souvenirs musicaux qui persistent longtemps après la fête.</p>`,

  "vos-demandes-specifiques": `<h2>Le secrecy et la discrétion — notre engagement</h2>
<p>La confidentialité est un pilier fondamental de notre service. Nous ne divulguons jamais les noms de nos clients, les détails de nos événements ou les informations privées à des tiers. Notre équipe est formée au secret professionnel et au respect de la vie privée. Les contrats de confidentialité sont signés par tous les prestataires impliqués dans vos événements.</p>
<p>Pour les événements sensibles (célébrités, personnalités politiques, entreprises cotées en bourse), nous proposons un service de sécurité renforcé avec gardes du corps, discrétion absolue et communication cryptée. Les lieux que nous utilisons sont isolés, sécurisés et hors des sentiers battus. Votre vie privée est sacrée et nous la protégeons avec la plus grande vigilance.</p>`,

  "side-car-vintage": `<h2>La photographie avec un side-car — des images uniques</h2>
<p>Le side-car vintage est un accessoire photo extraordinaire qui crée des images uniques et mémorables. Le contraste entre le véhicule rétro et l'architecture millénaire de Marrakech produit des clichés d'une beauté saisissante. Les ruelles de la médina, les remparts ocre, les jardins de la Ménara, les toits terrasses avec vue sur l'Atlas — chaque décor devient un fond de studio naturel et spectaculaire.</p>
<p>Nous proposons des sessions photo avec un photographe professionnel qui vous accompagne pendant la balade en side-car. Le photogénique capture des moments spontanés et des poses chorégraphiées, créant un reportage visuel complet de votre expérience. Les photos sont retouchées et livrées en haute résolution, prêtes à être partagées sur les réseaux sociaux ou imprimées en grand format.</p>`,

  "jet-ski": `<h2>Le jet ski en couple — une expérience romantique et sportive</h2>
<p>Le jet ski en couple est une expérience unique qui combineadrénaline et romance. Deux jet ski côte à côte, naviguant sur les eaux cristallines de l'Agafay avec vue sur l'Atlas enneigé, créent un moment de complicité et de partage inoubliable. Les couples apprécient la liberté de la navigation, la beauté du cadre et l'intimité de l'expérience.</p>
<p>Nous proposons des forfaits couple qui incluent : deux jet ski avec instructeur dédié, session de 1 heure avec navigation libre et accompagnement, pause thé dans une tente bédouine au bord du lac, photos souvenir en haute résolution. C'est l'activité idéale pour une情人 escapade, un anniversaire de mariage ou une demande en mariage originale et mémorable.</p>`,
};

async function main() {
  console.log("=== FINAL ROUND: Short additions to reach 2000+ words ===\n");

  const services = await prisma.service.findMany({ select: { slug: true, longDescription: true } });

  for (const s of services) {
    const currentWords = (s.longDescription || "").replace(/<[^>]*>/g, "").split(/\s+/).filter(w => w).length;
    if (currentWords >= 2000) {
      console.log(`  ✓ ${s.slug}: already ${currentWords} words`);
      continue;
    }

    const addition = finalAdditions[s.slug];
    if (!addition) {
      console.log(`  ✗ ${s.slug}: no addition defined (${currentWords} words)`);
      continue;
    }

    const newContent = s.longDescription + "\n" + addition;
    const newWords = newContent.replace(/<[^>]*>/g, "").split(/\s+/).filter(w => w).length;

    await prisma.service.updateMany({
      where: { slug: s.slug },
      data: { longDescription: newContent },
    });

    console.log(`  ✓ ${s.slug}: ${currentWords} → ${newWords} words`);
  }

  // Final verification
  console.log("\n=== FINAL VERIFICATION ===\n");
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
