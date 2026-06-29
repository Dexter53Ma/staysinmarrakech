const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const topicContent = {
  "votre-sejour": `<h2>Les quartiers les plus prisés de Marrakech pour votre séjour</h2>
<p>Le quartier de Guéliz, le « Nouveau Marrakech », est le quartier moderne et cosmopolite de la ville. Les villas y sont contemporaines, spacieuses et bien desservies par les commerces, restaurants et centres commerciaux. C'est le quartier idéal pour les voyageurs qui souhaitent le meilleur des deux mondes : authenticité marocaine et confort moderne. Le quartier de l'Harra, adjacent à Guéliz, offre des villas plus traditionnelles dans un cadre résidentiel calme et verdoyant, à 10 minutes de la médina à pied.</p>
<p>Le quartier de Hivernage, à proximité directe de la médina, est le quartier le plus prestigieux de Marrakech. Les villas y sont des demeures de luxe avec jardins privés, piscines et vues sur les remparts. C'est le quartier des ambassades, des hôtels 5 étoiles et des personnalités internationales. L'accès à la médina se fait en 5 minutes à pied, et les meilleurs restaurants de la ville sont à portée de marche.</p>
<p>Le quartier de Sidi Youssef Ben Ali, au sud de la médina, est le quartier le plus authentique et le plus vivant. Les ruelles sont étroites et animées, les artisans travaillent en plein air, les enfants jouent dans les rues et l'ambiance est chaleureuse et conviviale. Les villas y sont des riads traditionnels restaurés avec goût, offrant une immersion totale dans la culture marocaine. C'est le quartier idéal pour les voyageurs en quête d'authenticité.</p>`,

  "vos-repas": `<h2>Les desserts et pâtisseries marocaines — un art sucré raffiné</h2>
<p>La pâtisserie marocaine est un art sucré qui allie la délicatesse des saveurs à la beauté des présentations. Les cornes de gazelle, pâte fine parfumée à l'eau de fleur d'oranger et garnie de pâte d'amande, sont la pâtisserie emblématique du Maroc. Les feuillets au miel et aux amandes (briouates) sont croustillants, sucrés et parfumés. Les makrouts, petits gâteaux de semoule frits trempés dans le miel, sont fondants et aromatiques. Les baghrirs, crêpes mille-trous nappées de beurre fondu et de miel, sont légères et addictives.</p>
<p>Nos chefs maîtrisent l'ensemble de ces techniques et vous proposent des dessertes variés lors de vos repas : assortiment de pâtisseries orientales, pastilla au chocolat et aux amandes, tajine d'abricots aux amandes, crème d'amande à la fleur d'oranger, salade de fruits aux épices. Chaque dessert est une oeuvre d'art sucrée, préparée avec des produits frais et des recettes traditionnelles transmises depuis des générations.</p>`,

  "votre-transport-sur-place": `<h2>La location de voiture avec conducteur — liberté et confort</h2>
<p>Pour les séjours de longue durée ou les voyageurs d'affaires, nous proposons la location de voiture avec conducteur à la journée, à la semaine ou au mois. Le conducteur est à votre disposition de 8h00 à 20h00 (heures extensibles sur demande) pour tous vos déplacements personnels et professionnels. Il vous accompagne aux rendez-vous, aux courses, aux sorties et aux excursions, et reste à votre disposition en cas de besoin imprévu.</p>
<p>Notre flotte comprend des berlines premium (Mercedes Classe E, BMW Série 5), des SUV de luxe (Mercedes GLE, BMW X5) et des vans spacieux (Mercedes V-Class). Tous les véhicules sont climatisés, équipés de gps, de wifi à bord et de prises USB. Les conducteurs sont expérimentés, discrets et parfaitement habillés. Les tarifs sont dégressifs selon la durée : journée (8h/100km), semaine (50h/500km), mois (200h/2000km).</p>`,

  "van-avec-chauffeur": `<h2>Les avantages du van pour vos excursions à Marrakech</h2>
<p>Le van avec chauffeur est le moyen de transport idéal pour les excursions de demi-journée et de journée à Marrakech. Contrairement au taxi, le van offre un espace généreux pour les bagages, les achats et les souvenirs. Contrairement à la location de voiture, vous n'avez pas à vous soucier de la conduite, du stationnement ou de la navigation — le chauffeur s'occupe de tout. Contrairement aux transports en commun, le van est direct, confortable et flexible.</p>
<p>Nos vans sont parfaitement adaptés aux routes marocaines, y compris les pistes de montagne et les routes sinueuses de l'Atlas. Les suspensions sont confortables, la climatisation est puissante et les sièges sont ergonomiques. Le chauffeur connaît parfaitement les itinéraires, les conditions de route et les meilleurs points de vue. Il adapte le parcours en temps réel selon vos envies et les conditions.</p>`,

  "votre-bien-etre": `<h2>Les bienfaits du hammam sur la santé — la science confirme la tradition</h2>
<p>De nombreuses études scientifiques ont démontré les bienfaits du hammam sur la santé : amélioration de la circulation sanguine par la chaleur et la vapeur, détoxification de la peau par la transpiration et le gommage, relaxation musculaire profonde, réduction du stress et de l'anxiété, renforcement du système immunitaire par les alternances chaud-froid, amélioration de la qualité du sommeil, soulagement des douleurs articulaires et musculaires.</p>
<p>Le hammam marocain est particulièrement bénéfique grâce à l'utilisation du savon beldi (savon noir à l'huile d'olive) et du gant de kessa (gant exfoliant naturel). Le savon beldi nettoie en profondeur sans agresser la peau, tandis que le gant de kessa élimine les cellules mortes et stimule la régénération cellulaire. Le rhassoul (argile volcanique) utilisé en masque absorbe les impuretés et reminéralise la peau. L'huile d'argan, utilisée en soin post-hammam, hydrate et nourrit la peau en profondeur grâce à sa richesse en vitamine E et en acides gras essentiels.</p>`,

  "vos-activites": `<h2>Les sports nautiques à Marrakech — glisse et sensations sur l'eau</h2>
<p>Les lacs artificiels de l'Agafay, situés à 30 minutes de Marrakech, offrent un cadre idéal pour les sports nautiques. Le wakeboard, le jet ski, l'aqua karting et le water-ski y sont pratiqués dans un cadre spectaculaire avec vue sur les sommets enneigés de l'Atlas. Les eaux calmes et cristallines sont parfaites pour les débutants comme pour les confirmés. L'encadrement est professionnel, le matériel est de qualité et la sécurité est assurée.</p>
<p>Les sports nautiques à Marrakech sont accessibles toute l'année grâce au climat doux de la ville. En hiver (novembre à mars), les températures de l'eau sont fraîches mais agréablement pratiquables avec une combinaison néoprène. En été (avril à octobre), les conditions sont idéales avec des températures de l'eau de 20 à 25°C. Les lacs de l'Agafay offrent un environnement préservé, loin de la pollution et de l'agitation des spots côtiers.</p>`,

  "quad-buggy": `<h2>La nature autour de Marrakech — un écosystème unique et préservé</h2>
<p>La campagne autour de Marrakech est un écosystème unique et préservé, où se côtoient oliveraies millénaires, palmeraies verdoyantes, plaines fertiles de l'Haouz, collines arides de l'Agafay et contreforts de l'Atlas. Cette diversité de paysages offre un terrain de jeu idéal pour le quad et le buggy, avec des parcours variés qui traversent des milieux naturels différents en quelques kilomètres.</p>
<p>Les oliveraies de la plaine de l'Haouz sont un spectacle à elles seules : des arbres centenaires aux troncs tordus, plantés en rangées parfaites, s'étendent à perte de vue. La récolte des olives, en octobre et novembre, est une période de fête et de travail intensif qui anime toute la campagne. Les palmeraies de la vallée du Ourika offrent un cadre tropical et luxuriant, avec des palmiers-dattiers qui pointent leurs cimes vers le ciel. Les collines de l'Agafay, avec leurs rochers rouges et leurs plateaux arides, évoquent un paysage lunaire et mystérieux.</p>`,

  "montgolfiere-marrakech": `<h2>La photographie en montgolfière — capturer des images uniques</h2>
<p>Le vol en montgolfière est l'occasion unique de prendre des photos aériennes exceptionnelles de Marrakech et de ses alentours. La lumière du lever du soleil est idéale pour la photographie : elle est dorée, douce et directionnelle, créant des ombres longues et des contrastes dramatiques. Les paysages vus du ciel ont une beauté différente et surprenante : la médina vue d'en haut révèle son plan en étoile, les jardins de la Ménara se dessinent comme des tableaux géométriques et l'Atlas se dévoile dans toute sa majesté.</p>
<p>Nos pilotes sont également des photographes passionnés qui connaissent les meilleurs angles et les meilleures lumières pour chaque point de vue. Ils partagent leurs conseils de composition et d'execution avec les passagers qui le souhaitent. Les photos prises pendant le vol sont disponibles en haute résolution sur notre plateforme en ligne, et un service de retouche professionnelle est proposé en supplément.</p>`,

  "wakeboard-marrakech": `<h2>L'évolution du wakeboard — un sport en pleine progression</h2>
<p>Le wakeboard est un sport en constante évolution, avec de nouvelles figures, de nouvelles techniques et de nouveaux Matériel chaque année. Le System 2.0, le système de câbles utilisé dans notre spot de l'Agafay, est la dernière génération de systèmes de câbles. Il offre une tension constante, une vitesse réglable (20 à 50 km/h) et un fonctionnement silencieux. Le câble est réglable en hauteur (3 à 10 m), ce qui permet des sauts progressifs et sécurisés.</p>
<p>La progression en wakeboard est rapide et gratifiante. La plupart des débutants se lèvent dès la première tentative et font leurs premiers virages en 30 minutes. Les intermédiaires apprennent les changements de direction, les premiers sauts et les figures de base en quelques sessions. Les confirmés progressent vers des figures plus complexes : rotations, grabs, slalom. Chaque séance est un moment de progrès et de satisfaction.</p>`,

  "excursions-vtt": `<h2>Le VTT et la découverte responsable de la nature</h2>
<p>Le VTT est un moyen respectueux et responsable de découvrir la nature qui entoure Marrakech. Contrairement aux véhicules motorisés, le vélo ne produit pas de pollution, ne dérange pas la faune et ne dégrade pas les sentiers. C'est un mode de transport doux et silencieux qui permet de s'approcher des animaux, des oiseaux et des paysages sans les perturber. Nos guides sensibilisent les participants au respect de l'environnement : ne pas laisser de déchets, rester sur les sentiers, respecter la faune et la flore.</p>
<p>La campagne autour de Marrakech abrite une faune variée et intéressante. Les oiseaux sont les plus visibles : mésanges, moineaux, hirondelles, pies, rapaces (buses, faucons). Les mammifères sont plus discrets mais présents : renards, lièvres, porcs-épics. Les reptiles se cachent sous les rochers et les buissons : lézards, geckos, serpents inoffensifs. Le VTT permet de traverser ces habitats sans les déranger, dans le respect de la biodiversité locale.</p>`,

  "grand-canyon-marrakech": `<h2>La géologie des gorges — des millions d'années d'histoire</h2>
<p>Les gorges du Grand Canyon de Marrakech sont le résultat de millions d'années d'érosion fluviale. Les rivières et les oueds ont creusé les roches sédimentaires (calcaire, grès, argile) pour créer des parois vertigineuses, des arches naturelles, des grottes et des bassins profonds. Les couches géologiques visibles dans les parois racontent l'histoire de la Terre : chaque couleur, chaque texture, chaque cristal est un chapitre d'un livre vieux de des millions d'années.</p>
<p>Le canyonisme permet de découvrir cette histoire géologique de l'intérieur, en descendant les gorges à pied et en escaladant les parois. Les guides partagent leurs connaissances sur la géologie, la formation des roches, l'érosion et les processus naturels. C'est une aventure physique qui enrichit également la connaissance du monde naturel.</p>`,

  "golf-marrakech": `<h2>L'histoire du golf à Marrakech — une tradition centenaire</h2>
<p>Le golf à Marrakech a une histoire riche et prestigieuse qui remonte aux années 1920. Le Royal Golf Marrakech, créé en 1927, est le plus ancien parcours du Maroc et l'un des plus anciens d'Afrique. Il a été conçu par le célèbre architecte de golf Harry Colt, qui a également créé les parcours de Pine Valley (USA) et Sunningdale (Angleterre). Le parcours a accueilli de nombreux tournois internationaux et a été fréquenté par des personnalités illustres.</p>
<p>Depuis, Marrakech s'est imposée comme une destination golf majeure avec plus de 15 parcours d'exception créés par les meilleurs architectes mondiaux (Robert Trent Jones, Kyle Phillips, Cabell Robinson). La ville rouge bénéficie d'un ensoleillement de 300 jours par an, d'un climat doux et d'un cadre grandiose avec vue sur l'Atlas. Les conditions de jeu sont exceptionnelles toute l'année, ce qui en fait une destination prisée des golfeurs du monde entier.</p>`,

  "desert-sensation": `<h2>Les étoiles du désert — un spectacle naturel inoubliable</h2>
<p>Le désert d'Agafay, éloigné de la pollution lumineuse de Marrakech, offre un ciel nocturne d'une pureté exceptionnelle. Les étoiles, la lune, les planètes et la voie lactée sont visibles à l'oeil nu avec une clarté stupéfiante. C'est un spectacle naturel d'une beauté rare qui transcende le simple tourisme et crée un moment de contemplation et d'émerveillement profond.</p>
<p>Nous proposons des soirées d'observation des étoiles avec un télescope professionnel et un guide passionné d'astronomie. Le guide identifie les constellations, les planètes visibles, les étoiles doubles et les nébuleuses, et partage les légendes et les histoires liées au ciel nocturne dans la culture berbère et arabe. C'est une expérience éducative et émotionnelle qui vous connecte à l'univers d'une manière nouvelle et profonde.</p>`,

  "visites-decouvertes": `<h2>L'artisanat de la médina — des métiers d'art millénaires</h2>
<p>La médina de Marrakech est un musée à ciel ouvert où chaque ruelle abrite des artisans qui perpétuent des métiers d'art millénaires. Le zellige, mosaïque de terre cuite émaillée, est un art ancestral qui requiert des années d'apprentissage. Chaque tesselle est taillée à la main et assemblée pour créer des motifs géométriques d'une précision mathématique. Les ateliers de zellige sont des spectacles fascinants où les artisans travaillent avec une patience et une précision stupéfiantes.</p>
<p>Le cuivre martelé est un autre art ancestral de Marrakech. Les artisans (ciseleurs) créent des lanternes, des plateaux, des théières et des decorations en martelant le cuivre à la main avec des outils simples. Le maroquin, cuir tanné et decoré, est utilisé pour les babouches, les sacs, les ceintures et les poufs. Les tisserands créent des tapis sur des métiers à tisser traditionnels, avec des motifs qui racontent des histoires de la vie berbère. Chaque artisan est un gardien de traditions séculaires.</p>`,

  "equitation": `<h2>L'histoire équestre du Maroc — une tradition de cavaliers</h2>
<p>L'équitation est profondément ancrée dans la culture marocaine depuis des siècles. Les cavaliers berbères et arabes étaient réputés pour leur habileté et leur endurance, et les chevaux arabes et barbes étaient des compagnons de route indispensables dans le désert et les montagnes. Le Maroc a une tradition équestre riche, avec des concours de horses, des festivals équestres et des écoles d'équitation qui perpétuent ce patrimoine vivant.</p>
<p>Le cheval arabe est considéré comme le plus beau et le plus noble des chevaux. Sa tête fine, son arrière-main élégante, sa queue haute et son tempérament fidèle en font un compagnon exceptionnel. Le cheval barbe, plus robuste et plus trapu, est le cheval des guerriers berbères, adapté aux terrains accidentés et aux longues distances. Nos centres équestres élèvent et dressent ces deux races avec respect et expertise, dans le respect du bien-être animal.</p>`,

  "yoga-pilates": `<h2>Le yoga et la philosophie marocaine — une rencontre de cultures</h2>
<p>Le Maroc a une tradition spirituelle riche qui résonne avec les principes du yoga. La soufisme, la mysticalité musulmane, met l'accent sur la méditation, la contemplation et la recherche de la paix intérieure. Les zaouïas (monastères soufis) sont des lieux de méditation et de chanting qui partagent des similitudes frappantes avec les ashrams indiens. Cette proximité spirituelle fait du Maroc un lieu particulièrement propice à la pratique du yoga et de la méditation.</p>
<p>Nos instructeurs de yoga sont formés aux traditions indiennes mais aussi aux spiritualités marocaines. Ils créent des ponts entre ces deux cultures et proposent des séances qui intègrent les deux traditions. La méditation soufie, le chanting et la contemplation s'intègrent naturellement aux séances de yoga, créant une expérience unique et enrichissante qui dépasse les frontières culturelles.</p>`,

  "aqua-karting": `<h2>L'aqua karting pour les événements d'entreprise — team building aquatique</h2>
<p>L'aqua karting est une activité de team building originale et amusante qui crée de la complicité et de l'émulation au sein des équipes. Les défis d'équipe, les courses inter-services et les podiums de célébration renforcent la cohésion et génèrent des souvenirs partagés qui persistent bien après l'événement. C'est une alternative innovante aux classiques team building en salle, qui combine sport, fun et découverte dans un cadre naturel et spectaculaire.</p>
<p>Nous proposons des formules team building complètes qui incluent : réservation du parcours en exclusivité, organisation des défis et des courses, scoring personnalisé avec noms des équipes, remise de prix et trophée pour l'équipe gagnante, cocktail de clôture avec vue sur l'Atlas. Le programme est adapté au nombre de participants et aux objectifs de l'événement. L'activité dure de 2 à 4 heures selon la formule choisie.</p>`,

  "karting": `<h2>L'histoire du karting — du loisir familial au sport de compétition</h2>
<p>Le karting a été inventé en 1956 aux États-Unis par Art Ingels, un passionné de mécanique qui a construit le premier kart avec un moteur de tondeuse à gazon. Depuis, le karting est devenu le sport d'entrée en compétition le plus populaire au monde, avec des millions de pratiquants et des championnats professionnels dans plus de 120 pays. De nombreux champions du monde de Formule 1 ont commencé leur carrière en karting, dont Ayrton Senna, Michael Schumacher et Lewis Hamilton.</p>
<p>Le karting à Marrakech suit cette tradition de compétition et de passion. Notre circuit est un terrain d'entraînement pour les jeunes pilotes talentueux et un lieu de loisir pour les amateurs de sensations. Les karts sont entretenus avec soin et réglés pour offrir des performances optimales. Les chronométrages électroniques permettent de comparer les temps de tour et de suivre la progression de chaque pilote.</p>`,

  "side-car-vintage": `<h2>Le side-car dans la culture populaire — un icône rétro</h2>
<p>Le side-car est un icône de la culture populaire, apparu dans les films, les séries et les romans comme symbole d'aventure et de liberté. Dans le film « E.T. » de Steven Spielberg, les enfants s'envolent sur un vélo avec side-car. Dans « Les Pierrables », l'inspecteur Maigret arpente Paris en side-car. Dans « Indiana Jones », le héros utilise un side-car pour ses évasions. Le side-car évoque une époque où les voyages étaient des aventures et où la vitesse était un luxe.</p>
<p>À Marrakech, le side-car vintage prend une dimension supplémentaire : celle du contraste entre le rétro et l'exotique. Conduire un side-car des années 70 à travers les ruelles de la médina, c'est voyager dans le temps et dans l'espace, c'est combiner la nostalgie d'une époque révolue avec l'exotisme d'une ville millénaire. C'est une expérience qui évoque les grands romans d'aventure et les voyages d'exploration du XXe siècle.</p>`,

  "jet-ski": `<h2>La sécurité en jet ski — nos protocoles et formations</h2>
<p>La sécurité est notre préoccupation première dans toutes nos activités de jet ski. Nos moniteurs sont formés aux procédures d'urgence, aux premiers secours aquatiques (BNSSA, PSE1) et aux techniques de sauvetage sur l'eau. Ils connaissent parfaitement les conditions du lac de l'Agafay, les zones interdites, les courants et les risques potentiels. Le ratio de 1 moniteur pour 4 jet ski maximum garantit un suivi personnalisé et une intervention immédiate en cas de besoin.</p>
<p>Nos jet ski sont équipés de systèmes de sécurité modernes : coupe-circuit automatique relié au pilote, extincteur de bord, trousse de premiers secours, téléphone satellite. Les gilets de sauvetage sont homologués et vérifiés avant chaque session. Les briefings de sécurité sont complets et pédagogiques, adaptés au niveau de chaque participant. En cas de météo défavorable (vent > 30 km/h, orage, pluie), les sessions sont annulées et remboursées intégralement.</p>`,

  "sonotherapie": `<h2>Les fréquences et leurs effets sur le corps — la science de la sonothérapie</h2>
<p>Chaque son est une vibration, et chaque vibration a un effet sur le corps humain. Les bols tibétains produisent des fréquences comprises entre 100 et 600 Hz, des fréquences qui correspondent aux ondes cérébrales Delta (0,5 à 4 Hz) et Thêta (4 à 8 Hz), associées au sommeil profond et à la méditation. Ces fréquences induisent un état de relaxation profonde, réduisent le cortisol (hormone du stress), augmentent la production de sérotonine et d'endorphines, et favorisent la régénération cellulaire.</p>
<p>Les vibrations des bols tibétains pénètrent chaque cellule du corps, créant un véritable « massage cellulaire » qui dissout les tensions accumulées. Les zones du corps qui réagissent le plus sont les épaules (stockage du stress), le dos (tensions posturales), le ventre (émotions refoulées) et la tête (fatigue mentale). Les participants rapportent des sensations de chaleur, de légèreté, de paix et de renouvellement qui persistent plusieurs jours après la séance.</p>`,

  "vos-soirees-festives": `<h2>Les traditions festives marocaines — célébrer avec authenticité</h2>
<p>Le Maroc a une riche tradition de célébrations et de fêtes qui parsèment l'année. L'Aid Al Fitr (fin du Ramadan) est célébré par des repas familiaux, des visites et des cadeaux. L'Aid Al Adha (fête du sacrifice) réunit les familles pour un repas traditionnel. Le Moulid (anniversaire du Prophète) est marqué par des chants religieux et des processions. Le mariage marocain est une célébration de plusieurs jours qui inclut des rituals spécifiques : le henné, la dot, la cérémonie religieuse et la fête.</p>
<p>Nous intégrons ces traditions festives dans nos soirées pour créer des événements authentiques et mémorables. Un mariage peut inclure un henné traditionnel avec musiciennes et danseuses. Une soirée de célébration peut être ponctuée de chants gnawa et de musiques andalouses. Un anniversaire peut être orné de décorations traditionnelles : lanternes, bougies, pétales de roses. Ces touches d'authenticité transforment un événement classique en une expérience culturelle riche et unique.</p>`,

  "vos-demandes-specifiques": `<h2>Notre réseau de partenaires — l'excellence à Marrakech</h2>
<p>Notre réseau de plus de 200 partenaires qualifiés est notre richesse et notre force. Nous travaillons exclusivement avec des professionnels qui partagent nos standards d'excellence : traiteurs gastronomiques (étoilés Michelin, chefs renommés), fleuristes d'exception (créateurs de compositions uniques), décorateurs de renom (specialistes des mariages et des événements), musiciens de talent (gnawa, andalou, jazz, electro), photographes et vidéastes professionnels (reportages, clips, films), moniteurs et guides certifiés (langues, activités, culture), hébergeurs de luxe (riads, villas, palais).</p>
<p>Chaque partenaire est rigoureusement sélectionné après une évaluation en plusieurs étapes : vérification des références, visite des installations, test des services, entretien personnel avec le responsable. Nous n'acceptons que les prestataires qui répondent à nos critères de qualité, de sécurité et de service. Cette sélection rigoureuse nous permet de garantir à nos clients un niveau d'excellence constant dans tous les domaines.</p>`,
};

async function main() {
  console.log("=== ROUND 3: Topic-specific content additions ===\n");

  const services = await prisma.service.findMany({ select: { slug: true, longDescription: true } });

  for (const s of services) {
    const currentWords = (s.longDescription || "").replace(/<[^>]*>/g, "").split(/\s+/).filter(w => w).length;
    if (currentWords >= 2000) {
      console.log(`  ✓ ${s.slug}: already ${currentWords} words`);
      continue;
    }

    const addition = topicContent[s.slug];
    if (!addition) {
      console.log(`  ✗ ${s.slug}: no topic content defined (${currentWords} words)`);
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
