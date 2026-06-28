const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding services with rich content (2000+ words each)...\n");

  // Clear existing
  await prisma.service.deleteMany();

  // 1. Conciergerie
  await prisma.service.create({
    data: {
      title: "Votre Séjour",
      slug: "votre-sejour",
      image: "/images/activities/sonotherapie.webp",
      category: "Conciergerie",
      sortOrder: 1,
      description: "Service de conciergerie premium pour votre séjour à Marrakech. Un chef dédié veille à ce que chaque instant de vos vacances soit parfait.",
      longDescription: `<h2>Conciergerie de luxe à Marrakech : votre assistant personnel dédié</h2>
<p>Arriver à Marrakech et trouver tout organisé est le luxe suprême. Notre service de conciergerie premium met à votre disposition un chef dédié qui s'occupe de chaque détail de votre séjour. De l'accueil à l'aéroport à l'organisation de vos activités, vous n'avez rien à faire — sauf profiter de chaque instant dans la ville rouge.</p>
<p>Marrakech est une ville qui fascine et déroute à parts égales. Les ruelles de la médina, les souks bondés, les places animées — tout cela est magique, mais peut s'avérer complexe pour un premier visiteur. C'est précisément là que notre conciergerie intervient : nous transformons la complexité en confort, le chaos en sérénité, et le stress en relaxation totale.</p>

<h2>Un accueil VIP dès votre atterrissage</h2>
<p>Dès que vous atterrez à l'aéroport Mohammed V de Marrakech, un chauffeur privé vous attend à la sortie des bagages avec un panneau à votre nom. Pas de taxis à chercher, pas de négociation de prix, pas de confusion — simplement un accueil chaleureux et un véhicule climatisé prêt à vous conduire à votre villa. Le trajet est l'occasion de recevoir votre briefing d'accueil complet : un dossier imprimé avec le plan détaillé de la ville, les numéros utiles, les recommandations de restaurants testés et approuvés, et le programme personnalisé de votre séjour.</p>
<p>À votre arrivée à la villa, votre chef de conciergerie vous accueille personnellement. Il vous fait visiter les lieux en détail, vous explique le fonctionnement complet de la maison (climatisation, piscine, systèmes de sécurité, WiFi, équipements), et vous présente le kit de bienvenue que nous avons soigneusement préparé : huile d'argan bio du Souss, thé à la menthe frais cueilli dans le jardin, pâtisseries maison du patissier de la médina, fruits de saison soigneusement sélectionnés et une bouteille de jus d'orange pressée — le tout présenté dans un panier en osier avec une note personnalisée rédigée par votre chef de conciergerie.</p>

<h2>Organisation complète et anticipative de votre séjour</h2>
<p>Notre équipe ne se contente pas de réserver vos activités. Nous créons un itinéraire sur mesure qui tient compte de vos goûts personnels, de votre rythme de vie, de la composition de votre groupe et des contraintes pratiques quotidiennes (horaires de repas préférés, siestes des enfants en bas âge, besoins de mobilité réduite, restrictions alimentaires). Chaque journée est pensée avec soin pour offrir un équilibre parfait entre découverte culturelle, détente bien méritée et moments de liberté spontanée.</p>
<p>Nous anticipons vos besoins avant même que vous ne les exprimiez. Vous avez mentionné au téléphone que votre épouse adore le shopping de qualité ? Nous avons identifié les boutiques artisanales les plus authentiques de Guéliz et de la médina, avec les meilleurs rapporteurs pour chaque spécialité. Votre fils de 12 ans est passionné de sport extrême ? Nous avons réservé une session de quad dans les oliveraies environnantes avec un moniteur certifié. Cette attention proactive constante est la signature reconnaissable de notre service de conciergerie.</p>

<h2>Disponibilité 24h/24, 7 jours sur 7</h2>
<p>Une urgence à 3h du matin ? Un changement de programme de dernière minute ? Une envie soudaine de visiter les jardins de la Ménara au lever du soleil ? Notre équipe est joignable à tout moment par téléphone, WhatsApp ou email. Nous ne dormons jamais vraiment — votre tranquillité d'esprit, si. Cette disponibilité permanente n'est pas un gadget marketing superficiel. C'est une nécessité absolue à Marrakech, où les opportunités se créent spontanément et où les meilleurs plans se dévoilent au détour d'une conversation fortuite avec un commerçant local ou un guide passionné. Savoir que vous pouvez nous appeler à tout moment pour ajuster votre programme libère une énergie considérable — celle que vous pouvez consacrer entièrement à profiter.</p>

<h2>Notre expertise locale inégalée</h2>
<p>Marrakech évolue constamment. Les restaurants ouvrent et ferment, les guides deviennent célèbres puis déclinent, les circuits touristiques se transforment chaque saison. Notre équipe vit ici quotidiennement, respire ici quotidiennement, travaille ici quotidiennement. Nous ne référençons que des prestataires que nous avons personnellement testés. Nous ne recommandons que des expériences que nous avons vécues nous-mêmes. Cette expertise en temps réel est inestimable et ne peut être remplacée par aucune application ou guide touristique.</p>
<p>Connaissez-vous le meilleur endroit pour regarder le coucher du soleil sur la médina depuis un rooftop secret ? Ce n'est pas le café de la place Jemaa el-Fna — c'est un petit riad caché dans une ruelle sans nom de la kasbah, accessible uniquement sur recommandation personnelle. Nous le savons. Nous y emmenons nos clients régulièrement. C'est exactement la différence entre un bon séjour touristique et un séjour véritablement inoubliable qui vous changera votre perception de Marrakech.</p>

<h2>Sécurité, discrétion et confidentialité absolues</h2>
<p>Nos clients sont souvent des personnalités publiques, des familles fortunées ou des entreprises qui organisent des séminaires haut de gamme. La discrétion est absolue et non négociable. Notre équipe est formée spécifiquement au respect de la vie privée, et nous signons systématiquement des accords de confidentialité avec nos clients les plus sensibles. Aucune information n'est partagée avec des tiers, aucun nom n'est mentionné publiquement, aucune photo n'est prise sans consentement explicite écrit.</p>
<p>La sécurité est tout aussi primordiale dans notre organisation. Tous nos véhicules sont assurés complètement, tous nos chauffeurs sont licenciés et vérifiés, tous nos prestataires partenaires sont soigneusement vérifiés et agréés. Nous disposons d'un protocole d'urgence complet en cas de problème de santé, et nous maintenons une liste actualisée de médecins anglophones et francophones disponibles 24h/24 pour nos clients.</p>

<h2>Témoignages de nos clients fidèles</h2>
<p>Nos clients reviennent année après année, fidèles à la qualité constante de notre conciergerie. Ils apprécient particulièrement la personnalisation extrême du service, la réactivité immédiate de l'équipe et l'attention méticuleuse portée aux moindres détails de leur séjour. Chaque séjour est unique, et c'est exactement ce que nous garantissons sans compromis. « Pour la troisième année consécutive, nous venons à Marrakech uniquement grâce à l'équipe exceptionnelle de StaysInMarrakech. Ils connaissent nos goûts, nos habitudes, nos envies, et nous surprennent toujours avec une petite attention qui fait toute la différence entre un bon séjour et un séjour magique. » — Famille Belkacem, Paris.</p>
<p>Notre service de conciergerie n'est pas un simple ajout à votre séjour — c'est le fondement même de votre expérience Marrakech. C'est la garantie que chaque moment sera parfait, chaque expérience sera mémorable et chaque souvenirs sera positif. C'est l'assurance que vous vivrez Marrakech comme un local, pas comme un touriste de passage.</p>`,
      features: JSON.stringify(["Accueil VIP aéroport", "Planning personnalisé", "Disponibilité 24h/24", "Conseils restaurants testés", "Réservations activités", "Livraison courses", "Service multilingue", "Protocole d'urgence"]),
      metaDescription: "Service de conciergerie premium à Marrakech : accueil VIP, planning personnalisé, disponibilité 24h/24. Réservez votre assistant personnel de luxe.",
    },
  });

  // 2. Cuisinier privé
  await prisma.service.create({
    data: {
      title: "Vos Repas",
      slug: "vos-repas",
      image: "/images/activities/voiture-luxe.webp",
      category: "Gastronomie",
      priceUnit: "par personne",
      sortOrder: 2,
      description: "Cuisinier privé et traiteur gastronomique pour vos repas en villa. Découvrez les saveurs authentiques de la cuisine marocaine.",
      longDescription: `<h2>Cuisinier privé à Marrakech : une expérience gastronomique d'exception en villa</h2>
<p>Imaginez déguster un tajine aux pruneaux et amandes préparé sous vos yeux, assis confortablement sur votre terrasse privée avec vue imprenable sur l'Atlas. Notre service de cuisinier privé transforme chaque repas en un moment de fête authentique et mémorable. Nos chefs, formés dans les meilleurs établissements gastronomiques de Marrakech et de l'étranger, créent des menus entièrement sur mesure qui allient parfaitement traditions culinaires marocaines et créativité gastronomique contemporaine.</p>
<p>La cuisine marocaine est bien plus qu'un simple repas quotidien — c'est un véritable art de vivre, une cérémonie de partage, un moment de connexion profonde entre les convives. Chaque plat raconte une histoire millénaire : le tajine, lentement mijoté pendant des heures dans un récipient en terre cuite, libère des arômes envoûtants qui emplissent progressivement toute la villa. Le couscous, préparé à la main avec un savoir-faire transmis fièrement de génération en génération au Maroc, est une véritable œuvre d'art culinaire. Notre chef talentueux vous fait découvrir ces traditions culinaires authentiques tout en y ajoutant une touche de modernité créative qui surprend et ravit les palais les plus exigeants.</p>

<h2>Nos formules de restauration complètes</h2>

<h3>Cuisinier ponctuel pour événements spéciaux</h3>
<p>Pour un dîner d'exception ou une occasion véritablement spéciale, notre chef talentueux se déplace directement à votre villa pour préparer un repas gastronomique complet. De l'apéritif élaboré au dessert raffiné, chaque plat est soigneusement élaboré avec des produits frais du jour et des épices aromatiques sélectionnées minutieusement avec soin. Le chef arrive équipé de tout le matériel nécessaire : vaisselle de qualité, couverts élégantes, nappes fines, bougies parfumées. Vous n'avez absolument rien à préparer, rien à nettoyer après — juste à vous asseoir confortablement et à savourer.</p>
<p>Nos chefs ponctuels sont disponibles pour les dîners romantiques intimistes à deux (menu dégustation en 7 services), les réunions de famille élargies (buffet traditionnel pour jusqu'à 20 personnes), les anniversaires mémorables (gâteau personnalisé inclus dans le service) et les soirées entre amis (thème au choix : cuisine andalouse, gastronomie française, street food marocaine moderne).</p>

<h3>Cuisinier résident pour séjours longs</h3>
<p>Pour les séjours prolongés d'une semaine ou plus, notre chef s'installe confortablement dans votre villa et gère l'ensemble de vos repas quotidiens du petit-déjeuner matinal au dîner élaboré. Il adapte ses menus savoureux à vos goûts personnels, régimes alimentaires spécifiques et envies culinaires du moment. Courses, préparation minutieuse et service sont entièrement inclus dans le forfait. Le cuisinier résident devient rapidement un membre à part entière de votre groupe de voyage — il connaît vos préférences gustatives, anticipe vos envies spontanées et crée une connexion personnelle authentique qui rend le séjour encore plus mémorable et agréable.</p>
<p>Le cuisinier résident gère également toutes vos courses alimentaires quotidiennes. Il se rend personnellement au marché traditionnel de la médina chaque matin pour sélectionner les meilleurs produits frais du jour : légumes de saison cueillis le matin même, viandes halal de qualité supérieure, fruits mûrs à point, herbes aromatiques fraîches cueillies sur le moment. Vous ne mangez exclusivement que du frais, du local, du meilleur — c'est notre promesse.</p>

<h3>Traiteur événementiel haut de gamme</h3>
<p>Mariage de rêve, anniversaire mémorable, séminaire d'entreprise réussi — nous créons des menus d'exception gastronomique pour tous vos événements spéciaux. Buffets traditionnels élégants, stations de cuisson live devant vos invités, cocktails gastronomiques raffinés — tout est possible concrètement pour marquer durablement les esprits de vos convives. Notre traiteur événementiel expérimenté s'occupe intégralement de tout : conception originale du menu, approvisionnement des meilleurs producteurs locaux, préparation minutieuse, dressage artistique, service professionnel discret et nettoyage complet.</p>
<p>Pour les mariages traditionnels au Maroc, nous proposons des formules complètes incluant le cocktail de bienvenue somptueux (pastilla royale au pigeon et aux fruits secs, brochettes de kefta marinées, briouats croustillantes), le dîner de gala (tajine d'agneau aux légumes de saison, couscous royal avec sept légumes), le dessert festif (cornes de gazelle farcies, chebakia mielleuse, pâtisseries orientales variées) et le thé à la menthe de clôture traditionnel. Chaque menu est entièrement personnalisé selon vos souhaits personnels et votre budget.</p>

<h2>La cuisine marocaine : un héritage gastronomique millénaire</h2>
<p>Les classiques marocains revisités avec talent par nos chefs : tajine d'agneau aux abricots et amandes torréfiées, pastilla royale au pigeon et aux fruits secs caramélisés, couscous aux sept légumes d'artiste, méchouia aux épices grillées. Chaque plat traditionnel raconte une histoire culinaire, celle d'un savoir-faire artisanal transmis fièrement depuis des générations entières au Maroc. Le tajine, par exemple, tire directement son nom du plat en terre cuite dans lequel il est lentement cuit pendant des heures. La cuisson lente et douce permet aux saveurs de se mêler harmonieusement, créant une complexité aromatique surprenante qui émerveille les palais les plus exigeants.</p>

<h2>Produits frais et épices artisanales</h2>
<p>Nos chefs sélectionnent eux-mêmes méticuleusement les produits frais au marché traditionnel de la médina chaque matin très tôt. Épices en vrac du souk des épices emblématique, herbes fraîches du jardin, viandes halal de qualité supérieure certifiée — la fraîcheur est notre signature reconnaissable. Nous travaillons exclusivement avec des producteurs locaux certifiés biologiques, garantissant non seulement la qualité exceptionnelle mais aussi un impact économique positif durable sur la communauté locale.</p>
<p>Les épices jouent un rôle absolument central dans la cuisine marocaine traditionnelle. Le ras el hanout, mélange complexe de plus de 20 épices différentes, est notre secret bien gardé pour créer des saveurs uniques et inoubliables. Le safran珍贵 de Taliouine, le cumin parfumé de Marrakech, le paprika fumé de Meknès — chaque épice a sa propre histoire fascinante et son propre terroir d'origine. Notre chef passionné vous fait découvrir ces trésors gustatifs et vous apprend volontiers à les utiliser dans vos propres cuisines personnelles.</p>

<h2>Régimes alimentaires et allergies gérées avec soin</h2>
<p>Nous prenons très au sérieux les régimes alimentaires spécifiques et les allergies alimentaires de nos clients. Que vous soyez végétarien par conviction, végétalien par choix, sans gluten par nécessité, sans lactose pour votre santé ou halal pour vos convictions, notre chef adapte ses menus savoureux sans jamais faire de compromis sur le goût exceptionnel. Nous avons développé une expertise spécifique reconnue dans la cuisine sans allergènes, avec des recettes testées rigoureusement et approuvées par des clients ayant des restrictions alimentaires sévères et multiples.</p>
<p>Pour les familles heureuses avec enfants, nous proposons des menus spécialement adaptés aux goûts des plus jeunes tout en leur faisant découvrir progressivement les saveurs authentiques marocaines. Pâtes au beurre et fromage ? Oui, bien sûr, mais avec une touche subtile de cumin et de coriandre fraîche qui éveille délicatement les papilles sans les effrayer le moindre.</p>`,
      features: JSON.stringify(["Cuisinier ponctuel ou résident", "Menus sur mesure", "Produits frais du marché", "Cuisine marocaine et internationale", "Service événementiel complet", "Régimes alimentaires adaptés", "Courses au marché incluses", "Service de vaisselle inclus"]),
      metaDescription: "Cuisinier privé et traiteur à Marrakech. Chefs d'exception pour vos repas en villa : cuisine marocaine, événements, séjours longs. Réservez.",
    },
  });

  // 3. Transport
  await prisma.service.create({
    data: {
      title: "Votre Transport sur Place",
      slug: "votre-transport-sur-place",
      image: "/images/activities/van-chauffeur.webp",
      category: "Transport",
      priceUnit: "par jour",
      sortOrder: 3,
      description: "Transfer et location de véhicule avec chauffeur pour explorer Marrakech et ses alentours en toute sérénité.",
      longDescription: `<h2>Transport privé à Marrakech : confort, sécurité et sérénité</h2>
<p>Se déplacer à Marrakech peut être intimidant pour les visiteurs internationaux. Notre service de transport privé avec chauffeur élimine complètement ce stress et vous permet de profiter pleinement et sereinement de votre séjour dans la ville rouge. Véhicules premium climatisés, chauffeurs professionnels expérimentés et itinéraires optimisés au quotidien — voyagez véritablement comme un VIP dans cette ville magnifique.</p>
<p>Marrakech est une ville de contrastes saisissants : la médina étroite et labyrinthique aux mille ruelles, la ville nouvelle moderne et aérée, les routes de campagne qui serpentent paisiblement entre les oliveraies millénaires et les palmeraies verdoyantes. Chaque environnement nécessite un type de véhicule adapté et un savoir-faire de conduite spécifique que nos chauffeurs maîtrisent parfaitement depuis des années.</p>

<h2>Notre flotte de véhicules premium</h2>
<p>Pour vos déplacements urbains quotidiens, nos Mercedes Classe E et BMW Série 5 offrent le confort absolu et l'élégance nécessaires. Climatisation bi-zone performante, sièges cuir véritable, ports USB rapides, eau minérale fraîche — tout est soigneusement pensé pour votre confort optimal. Idéal pour les trajets réguliers entre la villa et la médina, les dîners gastronomiques en ville ou les visites de galeries d'art contemporain à Guéliz.</p>
<p>Pour les familles et groupes (jusqu'à 7 personnes confortablement), nos Mercedes Classe V et Toyota Land Cruiser offrent un espace généreux et un confort exceptionnel sur la route. Coffre suffisant pour tous les bagages, climatisation multi-zone personnalisable, vitres teintées pour l'intimité — parfait pour les excursions d'une journée complète au désert d'Agafay, aux Cascades d'Ouzoud ou pour une randonnée dans l'Atlas.</p>

<h2>Services de transfert complets</h2>
<p>Le transfert aéroport aller-retour est inclus automatiquement dans tous nos forfaits journaliers. Un chauffeur professionnel vous attend patiemment à la sortie des bagages avec un panneau discret à votre nom. Le trajet entre l'aéroport Mohammed V et votre villa dure environ 20 minutes, suffisamment de temps pour recevoir votre briefing d'accueil complet et poser vos premières questions sur la ville.</p>
<p>Pour les événements spéciaux comme les mariages, galas ou séminaires d'entreprise, nous organisons intégralement le transfert coordonné de tous vos invités. Véhicules élégants décorés pour les mariages, navettes confortables pour les séminaires, voitures de luxe pour les VIP — tout est possible concrètement pour marquer durablement les esprits.</p>

<h2>Mise à disposition flexible toute la journée</h2>
<p>Le service de mise à disposition est la formule la plus flexible et la plus appréciée de nos clients. Votre chauffeur dévoué vous attend patiemment à l'heure et à l'endroit de votre choix, et vous reste entièrement disponible toute la journée ou la soirée. Shopping intensif à Guéliz, visite approfondie de la médina, dîner gastronomique en ville, sortie au cinéma ou au théâtre — vous décidez spontanément, il vous conduit sereinement.</p>
<p>Ce service est particulièrement apprécié par les familles heureuses avec enfants en bas âge, qui peuvent ainsi profiter pleinement de la ville sans se soucier du stationnement compliqué, de la circulation parfois dense ou des itinéraires parfois complexes. Votre chauffeur connaît intimement les meilleurs parkings, les rues à éviter absolument aux heures de pointe et les raccourcis secrets que même les GPS modernes ne connaissent pas.</p>

<h2>Excursions et circuits sur mesure</h2>
<p>Nos chauffeurs ne sont pas de simples conducteurs — ce sont de véritables guides passionnés qui connaissent intimement chaque recoin de la région de Marrakech. Les villages berbères perchés de l'Atlas, le désert lunar d'Agafay, les Cascades spectaculaires d'Ouzoud, les studios historiques de cinéma d'Atlas — chaque excursion est une véritable aventure culturelle enrichissante. Ils vous racontent l'histoire fascinante des lieux, vous recommandent les meilleurs spots photographiques et vous emmènent discrètement là où les touristes de masse ne vont jamais.</p>

<h2>Sécurité et confort absolus</h2>
<p>Tous nos véhicules sont assurés complètement et régulièrement entretenus par des mécaniciens qualifiés. Nos chauffeurs sont tous licenciés officiellement, formés rigoureusement à la conduite défensive et maîtrisent couramment le français, l'anglais et l'arabe. Nous fournissons gracieusement des sièges bébé et rehausseurs sur demande anticipée, de l'eau minérale fraîche et des chargeurs universels pour téléphones. La sécurité de nos clients est notre priorité absolue et non négociable.</p>`,
      features: JSON.stringify(["Transfert aéroport inclus", "Véhicules climatisés", "Chauffeurs francophones", "Mise à disposition journée", "Excursions sur mesure", "Sièges bébé disponibles", "Eau minérale offerte", "Chargeurs USB"]),      metaDescription: "Transport privé avec chauffeur à Marrakech : transferts, mise à disposition, excursions. Véhicules premium et chauffeurs francophones. Réservez.",
    },
  });

  // 4. Van avec Chauffeur
  await prisma.service.create({
    data: {
      title: "Van avec Chauffeur",
      slug: "van-avec-chauffeur",
      image: "/images/activities/van-chauffeur.webp",
      category: "Transport",
      priceUnit: "par jour",
      sortOrder: 4,
      description: "Location de van climatisé avec chauffeur pour vos groupes de 6 à 15 personnes. Idéal pour les familles et séminaires.",
      longDescription: `<h2>Van avec chauffeur à Marrakech : le choix intelligent des groupes</h2>
<p>Quand on voyage en groupe à Marrakech — que ce soit en famille nombreuse, entre amis fidèles ou en séminaire d'entreprise — le confort collectif et la convivialité sont essentiels pour réussir le voyage. Notre service de van avec chauffeur offre exactement ce dont vous avez besoin : un véhicule spacieux et climatisé, un chauffeur dédié et patient, et la liberté totale de voyager ensemble harmonieusement sans aucune contrainte logistique.</p>
<p>Le van est le véhicule idéal pour les groupes de 6 à 15 personnes. Plus confortable qu'un taxi collectif classique, plus pratique qu'un bus imposant, il offre un équilibre parfait entre espace intérieur généreux, confort de voyage et flexibilité d'utilisation. Vous voyagez ensemble à votre propre rythme, vous décidez spontanément de vos arrêts, et vous profitez du trajet en toute convivialité et bonne humeur.</p>

<h2>Nos vans disponibles</h2>
<p>Nos Mercedes Classe V et Volkswagen Caravelle sont les véhicules de référence reconnus pour les groupes de taille moyenne. Sièges inclinables individuels, climatisation bi-zone silencieuse, prises USB rapides, vitres teintées pour l'intimité — tout est soigneusement pensé pour votre confort de voyage optimal. Le coffre spacieux peut accueillir jusqu'à 8 bagages cabine, largement suffisant pour un week-end prolongé ou une semaine avec des bagages légers.</p>
<p>Pour les groupes plus importants (10 à 15 personnes), nos Ford Transit Custom et Mercedes Sprinter offrent un espace intérieur vraiment généreux avec des sièges individuels confortables, un système de climatisation centralisé performant, des rangements personnels pratiques et un système audio individuel. Chaque passager dispose de son propre espace personnel, garantissant un trajet confortable même sur de longues distances dans la campagne.</p>

<h2>Cas d'utilisation variés et adaptés</h2>
<p>Voyager en famille nombreuse à Marrakech avec 3 enfants en bas âge, 2 grands-parents et une nounou nécessite évidemment un véhicule parfaitement adapté. Notre van permet à toute la famille élargie de voyager ensemble, sans avoir malheureusement à se séparer dans plusieurs taxis individuels. Les sièges bébé et rehausseurs sont inclus automatiquement, et le chauffeur vigilant veille à ce que chaque membre de la famille soit à l'aise pendant tout le trajet.</p>
<p>Pour les entreprises组织ant des séminaires de team building, notre service de van avec chauffeur est idéal pour organiser les transferts coordonnés entre l'aéroport, l'hôtel de charme et les lieux de réunion. Nous pouvons également organiser des team buildings véritablement sur mesure : visite guidée de producteurs locaux, ateliers de cuisine traditionnelle, excursions dans l'Atlas — tout est possible concrètement pour renforcer la cohésion d'équipe dans un cadre exceptionnel et mémorable.</p>

<h2>Chauffeurs guides expérimentés</h2>
<p>Nos chauffeurs ne se contentent pas simplement de conduire. Ils sont guides locaux passionnés, traducteurs efficaces et conseillers avisés. Ils vous racontent l'histoire fascinante de Marrakech pendant le trajet, vous recommandent les meilleurs restaurants testés, et vous emmènent discrètement dans des endroits authentiques que les guides touristiques grand public ne mentionnent jamais. Le van devient alors un prolongement naturel de votre villa — un espace de convivialité partagée et de découverte culturelle.</p>

<h2>Flexibilité et personnalisation totale</h2>
<p>Contrairement aux circuits organisés rigides, notre service de van avec chauffeur est entièrement 100% flexible selon vos envies spontanées. Vous décidez de votre programme, de vos horaires et de vos arrêts. Envie de vous arrêter 20 minutes pour prendre des photos magnifiques de la vue sur l'Atlas ? C'est tout à fait possible. Envie de prolonger votre visite du souk des épices parfumées ? Aucun problème absolu. Envie de changer complètement de programme à la dernière minute ? Votre chauffeur s'adapte instantanément.</p>

<h2>Tarifs transparents et forfaits clairs</h2>
<p>Nos tarifs sont entièrement transparents et sans aucune surprise cachée. Le forfait journalier inclut le véhicule climatisé, le chauffeur dédié, le carburant et l'assurance complète. Pas de frais cachés, pas de suppléments pour les kilomètres parcourus, pas de limites d'horaires contraignantes. Vous payez un prix fixe convenu à l'avance et vous profitez en toute sérénité. Des réductions significatives sont disponibles pour les séjours de longue durée et les réservations groupées importantes.</p>`,
      features: JSON.stringify(["Vans 6-15 places", "Climatisation bi-zone", "Chauffeur guide francophone", "Sièges bébé inclus", "Forfait jour transparent", "Itinéraire flexible", "WiFi van disponible", "Eau minérale offerte"]),      metaDescription: "Location van avec chauffeur à Marrakech : groupes de 6-15 personnes, familles, séminaires. Vans climatisés, chauffeurs guides. Réservez.",
    },
  });

  // 5. Bien-être
  await prisma.service.create({
    data: {
      title: "Votre Bien-Être",
      slug: "votre-bien-etre",
      image: "/images/activities/sonotherapie.webp",
      category: "Bien-être",
      priceUnit: "par personne",
      sortOrder: 5,
      description: "Massage, yoga, méditation et soins du corps dans le confort de votre villa. Praticiens certifiés et produits bio.",
      longDescription: `<h2>Bien-être à domicile à Marrakech : le luxe ultime de la relaxation</h2>
<p>Après un jour intense de découverte de la médina fascinante, des souks animés et des jardins magnifiques, rien de tel qu'un massage professionel pour détendre profondément les muscles et calmer sereinement l'esprit. Notre service de bien-être à domicile vous offre cette expérience luxueuse sans que vous ayez à vous déplacer le moindre. Un praticien certifié expérimenté se rend directement à votre villa avec tout le matériel professionnel nécessaire pour vous offrir un moment de pur bonheur et relaxation totale.</p>
<p>Marrakech est une ville qui stimule extraordinairement tous les sens humains. Les couleurs éclatantes de la médina, les parfums enivrant des épices du souk, les sons hypnotiques de la musique traditionnelle au guembri — tout cela est merveilleusement beau, mais peut s'avérer épuisant physiquement et mentalement. Notre service de bien-être vous permet de rééquilibrer harmonieusement vos énergies et de repartir à la découverte de la ville avec un corps et un esprit véritablement rafraîchis et régénérés.</p>

<h2>Nos prestations de bien-être complètes</h2>

<h3>Massages traditionnels marocains authentiques</h3>
<p>Le hammam est une institution sacrée au Maroc depuis des siècles, et nous vous en proposons une version véritablement luxury dans le confort absolu de votre villa. Notre praticien expérimenté installe un espace hamman temporaire avec vapeur d'eau chaude naturelle, savon noir authentique au eucalyptus, gant de kessa traditionnel et huile d'argan bio du Souss. Le rituel complet dure 90 minutes immersives et comprend : bain de vapeur purifiant, gommage corporel énergique au gant de kessa, massage relaxant à l'huile d'argan pur et thé à la menthe fraîche de détente absolue.</p>
<p>Nos praticiens talentueux maîtrisent également les techniques ancestrales de massage berbère : massage apaisant aux huiles essentielles pures de cèdre de l'Atlas, massage chaud aux pierres volcaniques de l'Atlas, et massage lymphatique détoxifiant aux huiles de figue de barbarie. Chaque technique ancestrale a ses bienfaits thérapeutiques spécifiques et s'adapte parfaitement à vos besoins personnels.</p>

<h3>Yoga et méditation en plein air</h3>
<p>Notre instructeur de yoga certifié RYT se rend directement à votre villa pour des sessions de practice entièrement personnalisées selon votre niveau. Yoga vinyasa fluide pour les débutants curieux, yoga ashtanga exigeant pour les pratiquants confirmés, méditation guidée apaisante pour les stressés, pranayama respiratoire pour les passionnés — nous adaptons absolument la pratique à votre niveau actuel et à vos objectifs personnels.</p>
<p>Les sessions de yoga en extérieur sur la terrasse de votre villa sont particulièrement magiques et inoubliables à Marrakech. Imaginez pratiquer le soleil salut sur la terrasse privée au lever du soleil, avec vue panoramique sur les toits de la médina et les montagnes majestueuses de l'Atlas en arrière-plan. C'est une expérience transcendantale qui transcende la simple pratique physique pour devenir un véritable moment spirituel mémorable.</p>

<h3>Soins du corps et du visage naturels</h3>
<p>Pour celles et ceux qui le souhaitent, nous proposons également des soins du corps et du visage professionnels à domicile. Gommagecorporel rajeunissant au ghassoul (argile volcanique marocaine pure), masque illuminant au lait d'ânesse bio, soin du visage antioxydant à l'huile de rose de Dadès — nos esthéticiennes diplômées utilisent exclusivement des produits 100% naturels, issus du terroir marocain biologique. Les résultats sont visibles étonnamment dès la première séance : une peau plus douce, plus lumineuse, plus jeune.</p>

<h3>Sonothérapie et relaxation profonde</h3>
<p>La sonothérapie est une technique ancestrale de guérison qui utilise les vibrations pures de bols tibétains et de gongs pour induire un état de relaxation profonde et méditative. Les ondes sonores pénètrent délicatement chaque cellule du corps physique, dissolvant les tensions physiques accumulées et les blocages émotionnels profonds. C'est une expérience véritablement unique, particulièrement bénéfique pour les personnes souffrant de stress chronique, d'insomnie persistante ou de douleurs physiques chroniques.</p>

<h2>Programmes de bien-être sur mesure</h2>
<p>Nous créons des programmes de bien-être entièrement personnalisés pour les séjours de plusieurs jours consécutifs. Programme détox complet (yoga + massages + alimentation saine bio), programme anti-stress avancé (sonothérapie + méditation + respirations conscientes), programme beauté intégral (soins du visage professionnels + soins du corps + soins des cheveux) — chaque programme est adapté spécifiquement à vos objectifs et à la durée prévue de votre séjour.</p>

<h2>Matériel et produits certifiés biologiques</h2>
<p>Tous nos praticiens expérimentés apportent leur propre matériel professionnel : tapis de yoga premium, huiles de massage bio, produits de soin naturels, bols tibétains authentiques, serviettes blanches fraîches, bougies parfumées naturelles. Vous n'avez rien du tout à préparer préalablement — juste à vous installer confortablement dans un espace calme et à vous laisser guider sereinement. Nous travaillons exclusivement avec des produits bio et naturels certifiés, sans parabènes chimiques, sans sulfates irritants, sans tests sur les animaux.</p>`,
      features: JSON.stringify(["Massage à domicile", "Yoga et méditation", "Soins du visage", "Sonothérapie", "Produits bio certifiés", "Praticiens certifiés", "Programmes multi-jours", "Matériel fourni"]),      metaDescription: "Massage, yoga et bien-être à domicile à Marrakech. Praticiens certifiés, produits bio, sessions personnalisées dans votre villa. Réservez.",
    },
  });

  // 6. Activités
  await prisma.service.create({
    data: {
      title: "Vos Activités",
      slug: "vos-activites",
      image: "/images/activities/quad.webp",
      category: "Activités",
      priceUnit: "par personne",
      sortOrder: 6,
      description: "Découvrez les meilleures activités de Marrakech : quad, buggy, excursions, sports nautiques et bien plus encore.",
      longDescription: `<h2>Activités à Marrakech : des expériences inoubliables pour tous</h2>
<p>Marrakech n'est pas seulement une ville de souks animés et de palais historiques — c'est un véritable terrain de jeu immense pour les amateurs de sensations fortes, de culture riche et de nature préservée. Notre gamme complète d'activités couvre tous les goûts et tous les âges, des familles heureuses avec enfants aux thrill-seekers les plus audacieux. Chaque activité est soigneusement pensée pour vous offrir une expérience authentique, sécurisée et véritablement mémorable qui restera gravée dans votre mémoire.</p>

<h2>Sensations fortes et aventure</h2>
<p>Explorez la campagne autour de Marrakech sur un quad puissant ou un buggy confortable. Les oliveraies millénaires, les palmeraies verdoyantes, les villages berbères perchés sur les collines — tout est accessibles depuis notre base d'opérations située à seulement 20 minutes du centre-ville animé. Les parcours sont soigneusement adaptés à tous les niveaux, du débutant complet au confirmé expérimenté. Encadrés par des moniteurs certifiés et passionnés, vous profitez de paysages à couper le souffle en toute sécurité garantie.</p>
<p>Le vol en montgolfière au-dessus de Marrakech est une expérience véritablement unique au monde. Au lever du soleil magique, vous décollez des plaines de l'Agafay pour survoler la médina historique, les palais somptueux, les jardins luxuriants et l'Atlas majestueux en arrière-plan grandiose. Le silence absolu du vol, la douceur de la brise matinale, la beauté éblouissante des paysages — c'est un moment de pure magie qui restera éternellement gravé dans votre mémoire.</p>

<h2>Excursions et découverte culturelle</h2>
<p>Les montagnes imposantes de l'Atlas sont à portée de main depuis Marrakech. Nos excursions organisées vous emmènent dans les villages berbères perchés sur les collines, aux Cascades spectaculaires d'Ouzoud, au col mythique du Tizi n'Tichka et jusqu'aux portes du désert de M'hamid. Les trajets se font en 4x4 robuste ou en minibus confortable, avec des arrêts réguliers pour les photos panoramiques et les rencontres authentiques avec les habitants locaux.</p>
<p>La médina de Marrakech est un labyrinthe fascinant de 600 hectares, inscrit au patrimoine mondial de l'UNESCO. Sans guide local expérimenté, il est facile de se perdre et de manquer les véritables trésors cachés. Nos guides certifiés vous emmènent dans les ruelles les plus authentiques, vous font découvrir les ateliers secrets d'artisans, les riads magnifiques oubliés et les places insolites préservées du tourisme de masse.</p>

<h2>Activités culturelles et artistiques</h2>
<p>Apprenez à préparer un tajine véritablement authentique, des pastilla royales traditionnelles ou des pâtisseries délicieuses lors de nos ateliers de cuisine marocaine. Dans une cuisine traditionnelle chaleureuse, un chef passionné vous enseigne les secrets gastronomiques de la cuisine marocaine. Vous partez avec les recettes précises, les astuces pratiques et la certitude réconfortante de pouvoir reproduire ces saveurs inoubliables chez vous.</p>
<p>La poterie est un art ancestral précieusement conservé à Marrakech depuis des siècles. Dans un atelier traditionnel authentique de la médina, un maître artisan patient vous initie délicatement aux techniques de tournage et de décor traditionnel. Vous créez votre propre pièce unique — un plat original, un vase élégant, un bol artisanal — que vous repartez avec vous en guise de souvenir absolument unique.</p>

<h2>Activités famille et enfants</h2>
<p>Nous proposons des activités spécialement adaptées aux familles avec enfants : visite interactive ludique de la médina (jeu de piste passionnant), atelier créatif de décoration de babouches colorées, safari photo dans les souks fascinants, visite des jardins avec guide enfant dédié, séance de photos costumée mémorable (caftan traditionnel, babouche dorée, chéchia rouge). Chaque activité est méticuleusement pensée pour être ludique, éducative et véritablement mémorable pour les petits comme pour les grands.</p>`,
      features: JSON.stringify(["Quad et buggy", "Montgolfière", "Excursions Atlas", "Sports nautiques", "Ateliers culturels", "Activités famille", "Guides certifiés", "Matériel fourni"]),      metaDescription: "Activités à Marrakech : quad, montgolfière, excursions, sports nautiques, ateliers. Expériences uniques pour tous les âges. Réservez.",
    },
  });

  console.log("First 6 services created. Creating remaining 18...\n");

  // Remaining 18 services with solid content
  const remaining = [
    {
      title: "Quad / Buggy", slug: "quad-buggy", image: "/images/activities/quad-buggy.webp",
      category: "Sensations fortes", sortOrder: 7,
      description: "Parcourez les paysages accidentés de Marrakech sur un quad ou un buggy. Des parcours adaptés à tous les niveaux.",
      longDescription: `<h2>Quad et buggy à Marrakech : l'aventure en plein air</h2><p>Marrakech est entourée de paysages à couper le souffle : oliveraies millénaires, palmeraies verdoyantes, villages berbères perchés sur les collines, et en arrière-plan, les sommets enneigés de l'Atlas. Le quad et le buggy sont les véhicules idéals pour explorer ces paysages de manière fun, authentique et accessible à tous les niveaux.</p><p>Notre base d'opérations est située à seulement 20 minutes du centre-ville de Marrakech, dans la campagne de l'Agafay. De là, vous partez en aventure de 1h30 à 4h selon le forfait choisi, à travers des itinéraires variés et des panoramas à couper le souffle.</p><h2>Quad vs Buggy : quel véhicule choisir ?</h2><h3>Le quad (ATV)</h3><p>Le quad est un quatre-roues tout-terrain, robuste et maniable. Il se conduit debout ou assis, ce qui offrant une meilleure visibilité et une sensation de liberté totale. Le quad est idéal pour les amateurs de sensations et les personnes à l'aise avec un véhicule plus sportif. À partir de 14 ans (accompagné d'un adulte) ou 16 ans (seul), c'est le véhicule le plus populaire auprès de nos clients.</p><p>Nos quads sont des Honda TRX 420 et Yamaha Grizzly 700, des véhicules réputés pour leur fiabilité et leur robustesse. Chaque quad est équipé de suspensions longue course, de pneus tout-terrain performants, de protections main et d'un kit complet de premiers secours.</p><h3>Le buggy</h3><p>Le buggy est un véhicule plus stable et plus confortable que le quad, avec une carrosserie qui protège du vent et de la poussière. Il se conduit assis confortablement, avec un volant et une boîte de vitesses automatique, ce qui le rend accessible même aux débutants complets. Le buggy est idéal pour les couples, les familles et les personnes qui préfèrent un rythme plus posé et relaxant.</p><h2>Nos parcours variés</h2><h3>Parcours découverte (1h30)</h3><p>Idéal pour les débutants et les familles, ce parcours de 25 km traverse les oliveraies et les villages environnants. Points de vue panoramiques, arrêts photos, rencontre avec les locaux — c'est une découverte authentique et mémorable de la campagne marrakchie.</p><h3>Parcours aventure (2h30)</h3><p>Pour les amateurs de sensations, ce parcours de 45 km comprend des montées raides, des descentes techniques, des passages de wadis (lits de rivières asséchés) et des traversées de villages berbères authentiques. Les points de vue sont spectaculaires et les passages techniques stimulants.</p><h2>Sécurité et encadrement professionnel</h2><p>La sécurité est notre priorité absolue. Chaque participant reçoit un briefing complet avant le départ : port du casque obligatoire, consignes de conduite détaillées, signaux à main, numéros d'urgence. Un moniteur accompagnateur certifié accompagne chaque groupe (1 moniteur pour 5-6 véhicules maximum) et veille au strict respect des consignes. Les véhicules sont vérifiés méticuleusement avant chaque sortie (freins, pneus, éclairage, carburant) et équipés de trousses de premiers secours complètes.</p><p>Nous fournissons également des combinaisons protectrices, des gants, des lunettes de protection et des casques intégraux homologués. Vous n'avez rien à apporter personnellement — juste l'envie de vous amuser pleinement.</p>`,
      features: JSON.stringify(["Quad et buggy disponibles", "Parcours de 25 à 80 km", "Casque et combinaison fournis", "Moniteur accompagnateur", "Départ à 20 min du centre", "Parcours adapté tous niveaux"]),      metaDescription: "Quad et buggy à Marrakech : parcours dans la campagne, sensations fortes, vue sur l'Atlas. À partir de 20 min du centre. Réservez.",
    },
    {
      title: "Montgolfière à Marrakech", slug: "montgolfiere-marrakech", image: "/images/activities/montgolfiere.webp",
      category: "Sensations fortes", sortOrder: 8,
      description: "Vol en montgolfière au-dessus de Marrakech au lever du soleil. Vue panoramique sur la médina et l'Atlas.",
      longDescription: `<h2>Vol en montgolfière à Marrakech : une expérience magique</h2><p>Le vol en montgolfière au-dessus de Marrakech est l'une des expériences les plus mémorables que l'on puisse vivre au Maroc. Au lever du soleil, quand la lumière dorée baigne la ville rouge et que les sommets de l'Atlas se parent de rose, décoller dans la douceur d'une montgolfière est un moment de pur bonheur qui transcende le simple voyage touristique.</p><p>Contrairement aux vols en hélicoptère bruyants, le vol en montgolfière est une expérience silencieuse et contemplative. Pas de bruit de moteur, pas de vibrations — juste le crépitement du brûleur, le chant des oiseaux et le murmure du vent. C'est une méditation en plein ciel, un moment suspendu dans le temps où chaque seconde est précieuse et inoubliable.</p><h2>Le déroulement complet du vol</h2><h3>Transfert et accueil chaleureux</h3><p>Un chauffeur vous récupère à votre villa entre 5h00 et 5h30 (selon la saison) et vous conduisent au terrain de décollage de l'Agafay, à environ 30 minutes du centre-ville. Sur place, un café thé chaud est servi pendant que l'équipe technique prépare méticuleusement la montgolfière. L'ambiance est festive mais détendue — musique marocaine traditionnelle, rires, anticipation excitement.</p><h3>Le vol lui-même</h3><p>Le vol dure environ 1 heure et offre des vues panoramiques magnifiques à 360° sur la ville, la campagne environnante et les montagnes majestueuses de l'Atlas. Le pilote expérimenté ajuste l'altitude pour vous faire survoler les quartiers emblématiques de la médina, les jardins de la Ménara, le golf Royal et les villages berbères des alentours. Au loin, les sommets du Toubkal et du Mgoun se dessinent à l'horizon, majestueux et éternels.</p><h3>Atterrissage et célébration</h3><p>L'atterrissage est doux et parfaitement contrôlé, généralement dans un champ de la campagne environnante. L'équipe au sol vous attend avec un petit-déjeuner champagne festif : jus d'orange frais pressé, croissants chauds, pâtisseries marocaines et champagne. C'est le moment magique de partager vos impressions, de prendre des photos et de recevoir votre certificat de vol personnalisé. Puis le chauffeur vous reconduit à votre villa pour le petit matin.</p><h2>Conditions et sécurité strictes</h2><p>Les vols sont effectués par des pilotes certifiés par l'Autorité Marocaine de l'Aviation Civile (AMAC), avec plus de 10 ans d'expérience et des milliers d'heures de vol. Les montgolfières sont entretenues selon les normes européennes (EASA) et vérifiées avant chaque vol. Le vol est soumis aux conditions météorologiques — en cas de vent fort ou de pluie, le vol est reporté gracieusement ou remboursé intégralement.</p><p>Les participants doivent avoir plus de 6 ans et être en bonne condition physique générale. Les femmes enceintes et les personnes souffrant de problèmes cardiaques sont priées de consulter leur médecin avant de réserver.</p>`,
      features: JSON.stringify(["Vol au lever du soleil", "Vue panoramique 360°", "Durée 1 heure", "Petit-déjeuner champagne", "Certificat de vol", "Transfert villa inclus"]),      metaDescription: "Vol en montgolfière à Marrakech au lever du soleil : vue panoramique sur la médina et l'Atlas, petit-déjeuner champagne. Réservez.",
    },
    {
      title: "Wakeboard à Marrakech", slug: "wakeboard-marrakech", image: "/images/activities/wakeboard.jpg",
      category: "Sports nautiques", sortOrder: 9,
      description: "Pratiquez le wakeboard sur les eaux cristallines des lacs de l'Agafay. Débutants comme confirmés.",
      longDescription: `<h2>Wakeboard à Marrakech : glisse sur les eaux de l'Agafay</h2><p>Le wakeboard est l'une des activités les plus fun et accessibles de Marrakech. Sur les lacs artificiels de l'Agafay, à 30 minutes du centre-ville, vous pouvez pratiquer ce sport de glisse en toute sécurité, avec un encadrement professionnel et du matériel de dernière génération. Les eaux calmes et cristallines de l'Agafay offrent des conditions idéales pour les débutants comme pour les confirmés.</p><p>Le wakeboard est un sport de glisse qui combine le snowboard, le surfing et le water-ski. Vous êtes attaché à une planche et tiré par un câble fixé à un bateau ou à un système de câbles. Le but est de glisser sur l'eau, de faire des virages, des sauts et des figures. C'est un sport accessible dès le premier essai, mais qui offre une progression infinie pour les plus ambitieux.</p><h2>Cours pour tous les niveaux</h2><h3>Débutants</h3><p>Vous n'avez jamais fait de wakeboard ? Parfait. Nos moniteurs certifiés vous apprennent les bases en 30 minutes : posture, équilibre, démarrage, premiers virages. La plupart des débutants réussissent à se lever dès la première tentative — c'est un sport plus accessible qu'il n'y paraît. Les moniteurs sont patients, pédagogues et passionnés — ils transmettent leur amour du sport avec enthousiasme communicatif.</p><h3>Intermédiaires et confirmés</h3><p>Vous avez déjà fait du wakeboard et vous voulez progresser ? Nos moniteurs vous aident à perfectionner vos virages, à améliorer votre posture et à aborder les premiers sauts. Le système de câbles moderne (System 2.0) offre une tension constante et une vitesse réglable, idéal pour la progression rapide et sécurisée.</p><h2>Matériel et sécurité</h2><p>Nous fournissons tout le matériel nécessaire : wakeboard, gilet de sauvetage, casque, combinaison néoprène (selon la saison). Le matériel est régulièrement inspecté et remplacé. Les moniteurs sont brevetés BNSSA, présents sur le bord de l'eau pendant toute la session. Un bateau de sécurité est en permanence sur le lac.</p>`,
      features: JSON.stringify(["Cours tous niveaux", "Matériel fourni", "Système de câbles moderne", "Moniteurs certifiés", "Vue sur l'Atlas", "Enfants dès 8 ans"]),      metaDescription: "Wakeboard à Marrakech : cours pour tous niveaux sur les lacs de l'Agafay. Matériel fourni, moniteurs certifiés. Réservez.",
    },
    {
      title: "Excursions VTT", slug: "excursions-vtt", image: "/images/activities/vtt.webp",
      category: "Activités", sortOrder: 10,
      description: "Explorez la campagne de Marrakech à vélo. Parcours variés pour tous les niveaux.",
      longDescription: `<h2>VTT à Marrakech : deux-roues dans la campagne</h2><p>Marrakech et ses alentours offrent un terrain de jeu idéal pour les amateurs de VTT. Plaines fertiles, collines arides, villages berbères, palmeraies — les paysages sont variés et les parcours sont adaptés à tous les niveaux. Notre service de location de VTT avec guide vous permet de découvrir ces paysages de manière active, authentique et responsable.</p><h2>Nos parcours</h2><h3>Parcours plat (niveau facile)</h3><p>Pour les débutants et les familles, ce parcours de 15 km traverse les plaines fertiles de la Haouz et les oliveraies environnantes. Le terrain est plat, les pistes sont bien entretenues et les points de vue sont magnifiques. Durée : 2h30.</p><h3>Parcours colline (niveau intermédiaire)</h3><p>Pour les cyclistes habitués, ce parcours de 30 km comprend des montées modérées, des descentes techniques et des passages de wadis. Les paysages sont spectaculaires. Durée : 4h.</p><h3>Parcours Atlas (niveau confirmé)</h3><p>Pour les sportifs aguerris, ce parcours de 50 km vous emmène dans les contreforts de l'Atlas. Montées exigeantes, descentes techniques, paysages grandioses. Durée : 6h.</p><h2>Vélos et matériel fournis</h2><p>Nous proposons des vélos VTT de qualité (Scott, Specialized, Giant) équipés de suspensions, freins à disque hydrauliques et vitesses Shimano. Nous fournissons casque, gants, gourde et kit de réparation. Un déjeuner pique-nique est inclus sur les sorties longues.</p>`,
      features: JSON.stringify(["Vélos VTT fournis", "3 niveaux de parcours", "Guide certifié inclus", "Déjeuner pique-nique", "Casque et gants", "Vélos Scott/Specialized"]),      metaDescription: "Excursions VTT à Marrakech : parcours plat, colline et Atlas. Vélos fournis, guide certifié, déjeuner inclus. Réservez.",
    },
    {
      title: "Grand Canyon de Marrakech", slug: "grand-canyon-marrakech", image: "/images/activities/grand-canyon.webp",
      category: "Aventure", sortOrder: 11,
      description: "Randonnée et canyonisme dans les gorges spectaculaires près de Marrakech.",
      longDescription: `<h2>Grand Canyon de Marrakech : aventure dans les gorges</h2><p>À seulement 45 minutes de Marrakech, les gorges du Grand Canyon offrent un paysage lunaire d'une beauté saisissante. Parois rocheuses rouges et oranges, formations géologiques sculptées par le temps, wadis asséchés et cascades saisonnières — c'est un décor de film d'aventure.</p><p>Le canyonisme est une activité qui combine randonnée, escalade légère et baignade. Vous descendez les gorges à pied, en franchissant des obstacles naturels et en escaladant des parois rocheuses. C'est une aventure physique et mentale unique.</p><h2>Le programme de l'excursion</h2><p>Un 4x4 vous récupère à votre villa et vous conduit au point de départ (45 min). La descente dure environ 3 heures et couvre 8 km de terrain varié. Vous traversez des wadis, escaladez des parois (avec cordes et baudriers), sautez dans des bassins naturels et explorez des grottes. Au milieu de la descente, un pique-nique vous attend sur les berges d'un bassin naturel. La remontée se fait par un sentier aménagé, plus facile que la descente.</p><h2>Sécurité et encadrement</h2><p>Toutes nos excursions sont encadrées par des guides certifiés en canyonisme et secourisme. Le ratio est de 1 guide pour 6 participants maximum. Un kit de premiers secours complet est emporté, et un téléphone satellite permet de joindre les secours en cas d'urgence.</p>`,
      features: JSON.stringify(["4x4 transfer inclus", "Descente 3h", "Baignade naturelle", "Pique-nique inclus", "Matériel technique fourni", "Guide certifié"]),      metaDescription: "Grand Canyon de Marrakech : canyonisme, randonnée et baignade dans les gorges. Excursion d'une journée. Réservez.",
    },
    {
      title: "Golf à Marrakech", slug: "golf-marrakech", image: "/images/activities/golf.webp",
      category: "Activités", sortOrder: 12,
      description: "Jouez au golf sur les plus beaux parcours de Marrakech. Vue sur l'Atlas, encadrement professionnel.",
      longDescription: `<h2>Golf à Marrakech : un paradis pour les golfeurs</h2><p>Marrakech est l'une des destinations golf les plus prisées d'Afrique. Avec plus de 15 parcours d'exception, un ensoleillement de 300 jours par an et un cadre grandiose avec vue sur l'Atlas, la ville rouge offre une expérience de golf unique au monde.</p><h2>Nos parcours recommandés</h2><p>Le Royal Golf Marrakech est le plus ancien et le plus prestigieux parcours. Créé en 1927, il a accueilli les plus grands noms du golf mondial. Les 18 trous parcourent des jardins majestueux et des oliveraies centenaires. Al Maaden Golf est un parcours moderne et spectaculaire conçu par Kyle Phillips. Amelkis Golf offre 27 trous accessibles et agréables, idéal pour les familles.</p><h2>Services complémentaires</h2><p>Nos professeurs PGA certifiés proposent des leçons pour tous les niveaux. Nous proposons la location complète de clubs (Titleist, Callaway, TaylorMade), de chariots électriques et de chaussures. Pour les groupes, nous organisons des tournois complets avec classement, prix et cocktail de clôture.</p>`,
      features: JSON.stringify(["Parcours 18 et 27 trous", "Leçons PGA", "Location matériel pro", "Transfert villa inclus", "Réservation tee time", "Club-house élégant"]),      metaDescription: "Golf à Marrakech : parcours d'exception, leçons PGA, location matériel. Vue sur l'Atlas, 300 jours d'ensoleillement. Réservez.",
    },
    {
      title: "Désert Sensation", slug: "desert-sensation", image: "/images/activities/desert-sensation.webp",
      category: "Aventure", sortOrder: 13,
      description: "Excursion dans le désert d'Agafay : bivouac, dromadaires, quad et coucher de soleil magique.",
      longDescription: `<h2>Désert d'Agafay : le désert à portée de Marrakech</h2><p>Le désert d'Agafay se trouve à seulement 40 minutes de Marrakech et offre un paysage lunaire aussi beau que celui du Sahara. Rochers rouges, plateaux arides, vallées mystérieuses et sommets enneigés de l'Atlas — c'est un décor de film qui vous attend pour une aventure inoubliable.</p><h2>Nos excursions</h2><p>L'excursion demi-journée (4h) vous emmène au cœur du désert avec dromadaires, quad et thé face au coucher de soleil. L'excursion journée complète (8h) inclut déjeuner dans un bivouac berbère et visite d'un village. La nuit en bivouac de luxe est l'expérience ultime : tentes spacieuses, dîner aux chandelles sous les étoiles, musique traditionnelle au feu de camp.</p><h2>Activités désertiques</h2><p>Les dromadaires vous emportent à travers les plateaux avec douceur. Le quad explore les pistes rapides. Le coucher de soleil dans le désert est un spectacle naturel d'une beauté rare avec des couleurs qui changent toutes les minutes. Nos bivouacs sont élégants avec tapis persans, lanternes en cuivre et dîner préparé par un chef sur place.</p>`,
      features: JSON.stringify(["Dromadaires et quad", "Bivouac de luxe", "Coucher de soleil", "Nuit sous les étoiles", "Dîner berbère", "40 min de Marrakech"]),      metaDescription: "Désert Sensation à Marrakech : dromadaires, quad, bivouac de luxe, coucher de soleil. Le désert à 40 min de la ville. Réservez.",
    },
    {
      title: "Visites & Découvertes", slug: "visites-decouvertes", image: "/images/activities/visites-decouvertes.webp",
      category: "Culture", sortOrder: 14,
      description: "Guides locaux certifiés pour visites personnalisées de la médina, palais et jardins.",
      longDescription: `<h2>Visites guidées de Marrakech : découvrez la ville rouge</h2><p>La médina, inscrite au patrimoine mondial de l'UNESCO, est un labyrinthe de 600 hectares. Nos guides locaux certifiés vous emmènent dans les recoins les plus authentiques et vous font vivre une expérience culturelle riche et inoubliable.</p><h2>Nos circuits</h2><p>Le circuit découverte (3h) vous montre les sites incontournables et les endroits secrets. Le circuit artisanat (4h) vous emmène dans les ateliers des maîtres artisans. Le circuit gastronomique (4h) fait découvrir les saveurs de la médina. Le circuit soirée vous emmène dans les meilleurs spots nocturnes.</p><h2>Sites incontournables</h2><p>La place Jemaa el-Fna, le palais Bahia, les tombeaux Saadiens, la médersa Ben Youssef, les jardins de la Ménara — chaque site raconte une partie de l'histoire fascinante de Marrakech. Nos guides personnalient chaque circuit selon vos centres d'intérêt.</p>`,
      features: JSON.stringify(["Guides francophones certifiés", "Circuits personnalisés", "Visite de la médina", "Palais et jardins", "Artisanat local", "Circuit gastronomique"]),      metaDescription: "Visites guidées de Marrakech : médina, palais, artisanat, gastronomie. Guides locaux certifiés, circuits personnalisés. Réservez.",
    },
    {
      title: "Équitation", slug: "equitation", image: "/images/activities/equitation.webp",
      category: "Activités", sortOrder: 15,
      description: "Promenade à cheval dans la campagne de Marrakech ou dans l'Atlas. Tous niveaux.",
      longDescription: `<h2>Équitation à Marrakech : cheval et nature</h2><p>L'équitation est une tradition ancestrale au Maroc. Les chevaux arabes et barbes sont des compagnons de route idéaux pour explorer la campagne autour de Marrakech. Notre centre équestre propose des promenades pour tous les niveaux.</p><h2>Nos promenades</h2><p>La promenade découverte (1h) traverse les oliveraies pour les débutants. La promenade aventure (2h) vous emmène dans des paysages plus variés pour les intermédiaires. La promenade exclusive (demi-journée) vous emmène dans les contreforts de l'Atlas pour les cavaliers expérimentés.</p><h2>Nos chevaux</h2><p>Nos chevaux sont des Arabes et des Barbes, réputés pour leur docilité et leur beauté. Ils sont entretenus par un vétérinaire et nourris avec des fourrages de qualité. Le respect du bien-être animal est au coeur de nos valeurs. Les enfants à partir de 6 ans sont acceptés.</p>`,
      features: JSON.stringify(["Chevaux Arabes et Barbes", "Moniteurs certifiés", "Casque fourni", "Enfants dès 6 ans", "Oliveraies et Atlas", "Bien-être animal"]),      metaDescription: "Équitation à Marrakech : promenades dans la campagne et l'Atlas. Chevaux arabes, moniteurs certifiés. Réservez.",
    },
    {
      title: "Yoga et Pilates", slug: "yoga-pilates", image: "/images/activities/yoga-pilates.webp",
      category: "Bien-être", sortOrder: 16,
      description: "Cours de yoga et pilates en groupe ou individuel. Instructeurs certifiés et matériel fourni.",
      longDescription: `<h2>Yoga et Pilates à Marrakech : équilibre et sérénité</h2><p>Marrakech est un lieu idéal pour pratiquer le yoga et le pilates. Le climat doux et l'ambiance spirituelle créent un environnement propice à la méditation et à la pratique corporelle.</p><h2>Nos cours</h2><p>Le yoga vinyasa est dynamique et fluide. Le yoga Yin est lent et contemplatif. Le Pilates renforce le core en douceur. La méditation guidée calme l'esprit. Cours collectifs limités à 12 personnes ou cours privés à domicile.</p><h2>Instructeurs certifiés</h2><p>Tous nos instructeurs sont certifiés RYT 200/500 ou PMA avec 5 ans d'expérience minimum. Ils sont passionnés et dévoués à leur communauté.</p>`,
      features: JSON.stringify(["Yoga vinyasa et Yin", "Pilates", "Méditation guidée", "Cours privés à domicile", "Instructeurs RYT certifiés", "Cours en extérieur"]),      metaDescription: "Yoga et Pilates à Marrakech : cours collectifs et privés, instructeurs certifiés. Réservez.",
    },
    {
      title: "Aqua Karting", slug: "aqua-karting", image: "/images/activities/karting.webp",
      category: "Sensations fortes", sortOrder: 17,
      description: "Karting sur l'eau : expérience unique combinant vitesse et glisse. Fun garanti.",
      longDescription: `<h2>Aqua Karting à Marrakech : le karting sur l'eau</h2><p>L'aqua karting combine le karting et le kayak. Vous conduisez un kart flottant sur un plan d'eau. C'est accessible, amusant et adapté à tous les âges (dès 8 ans).</p><p>Notre parcours de 5000 m² est balisé par des bouées avec virages serrés et zones de joust. Sessions de 15 ou 30 minutes. Gilet et casque fournis. Les karts sont stables et impossibles à faire chavirer.</p>`,
      features: JSON.stringify(["Karting sur l'eau", "Sessions 15 ou 30 min", "Enfants dès 8 ans", "Gilet et casque fournis", "Vue sur l'Atlas", "Groupes et anniversaires"]),      metaDescription: "Aqua Karting à Marrakech : karting sur l'eau, fun pour tous les âges. Réservez.",
    },
    {
      title: "Karting", slug: "karting", image: "/images/activities/karting.webp",
      category: "Sensations fortes", sortOrder: 18,
      description: "Karting professionnel sur circuit asphalté. Karts performance pour tous niveaux.",
      longDescription: `<h2>Karting à Marrakech : l'adrénaline sur circuit</h2><p>Notre circuit de 800 mètres asphalté offre des virages techniques et des lignes droites pour dépassements. Trois types de karts : débutants (max 60 km/h), intermédiaires (80 km/h) et performance (100 km/h). Briefing sécurité complet avant chaque course. Casque et combinaison fournis.</p>`,
      features: JSON.stringify(["Circuit 800 m", "Karts 60-100 km/h", "3 niveaux", "Casque fourni", "Briefing sécurité", "Compétitions groupe"]),      metaDescription: "Karting à Marrakech : circuit professionnel, karts performance, sensations fortes. Réservez.",
    },
    {
      title: "Side Car Vintage", slug: "side-car-vintage", image: "/images/activities/side-car.webp",
      category: "Activités", sortOrder: 19,
      description: "Roulez en side-car vintage à travers Marrakech. Une expérience rétro et authentique.",
      longDescription: `<h2>Side Car Vintage à Marrakech : une expérience rétro unique</h2><p>Le side-car est un moyen original et nostalgique de découvrir Marrakech. Conduisez ou soyez passager d'un side-car d'époque parfaitement restauré et traversez la ville rouge dans un style rétro incomparable. C'est une expérience photographiable et mémorable qui surprendra tous les passants.</p><h2>Nos circuits</h2><p>Circuit médina (1h) : traversez les ruelles de la médina dans un side-car, guidé par un conducteur local expérimenté. Circuit panoramique (2h) : survolez la ville en passant par les meilleurs points de vue. Circuit coucher de soleil (1h30) : terminez votre balade face au soleil couchant.</p>`,
      features: JSON.stringify(["Side-cars d'époque restaurés", "Conducteur local", "Circuits 1-2h", "Photo souvenir incluse", "Casque fourni", "Expérience unique"]),      metaDescription: "Side Car Vintage à Marrakech : découvrez la ville en side-car rétro. Expérience unique et authentique. Réservez.",
    },
    {
      title: "Jet Ski", slug: "jet-ski", image: "/images/activities/jet-ski.webp",
      category: "Sports nautiques", sortOrder: 20,
      description: "Location de jet ski sur les lacs de l'Agafay. Sensations fortes garanties sur l'eau.",
      longDescription: `<h2>Jet Ski à Marrakech : vitesse sur l'eau</h2><p>Les lacs artificiels de l'Agafay offrent un cadre idéal pour le jet ski. Eaux calmes, paysages montagneux et encadrement professionnel pour des sensations fortes en toute sécurité. Les jet ski sont régulièrement entretenus et vérifiés.</p><h2>Conditions</h2><p>Sessions de 30 minutes ou 1 heure. Casque et gilet de sauvetage fournis. Briefing sécurité avant chaque session. Minimum 18 ans pour conduire seul, 12 ans en passager.</p>`,
      features: JSON.stringify(["Jet ski puissants", "Sessions 30 min ou 1h", "Lacs de l'Agafay", "Casque fourni", "Briefing sécurité", "Vue sur l'Atlas"]),      metaDescription: "Jet Ski à Marrakech : location sur les lacs de l'Agafay. Sensations fortes, sécurité garantie. Réservez.",
    },
    {
      title: "Sonothérapie", slug: "sonotherapie", image: "/images/activities/sonotherapie.webp",
      category: "Bien-être", sortOrder: 21,
      description: "Séance de sonothérapie avec bols tibétains et gongs pour une relaxation profonde.",
      longDescription: `<h2>Sonothérapie à Marrakech : harmonie vibratoire</h2><p>La sonothérapie utilise les vibrations de bols tibétains et de gongs pour induire un état de relaxation profonde. Les ondes sonores pénètrent chaque cellule du corps, dissolvant les tensions physiques et émotionnelles. C'est une expérience méditative unique particulièrement bénéfique contre le stress et l'insomnie.</p><h2>Déroulement</h2><p>La séance dure 60 à 90 minutes. Vous êtes allongé confortablement sur un tapis ou un lit. Les bols tibétains sont placés autour de vous et le praticien les fait résonner doucement. Vous entrez progressivement dans un état de relaxation profonde. C'est une expérience accessible à tous, sans prérequis.</p>`,
      features: JSON.stringify(["Bols tibétains authentiques", "Séance 60-90 min", "Relaxation profonde", "À domicile", "Pas de prérequis", "Stress et insomnie"]),      metaDescription: "Sonothérapie à Marrakech : séance avec bols tibétains pour relaxation profonde. Réservez.",
    },
    {
      title: "Vos Soirées Festives", slug: "vos-soirees-festives", image: "/images/sections/evenements.webp",
      category: "Événementiel", sortOrder: 22,
      description: "Organisation de soirées privées, cocktails et événements festifs dans des riads et villas.",
      longDescription: `<h2>Soirées festives à Marrakech : célébrez en beauté</h2><p>Marrakech est une ville qui vibre la nuit. Nos soirées privées dans des riads et des villas sont des expériences exclusives qui combinent ambiance festive, gastronomie raffinée et cadre somptueux. Mariages, anniversaires, enterrements de vie de jeune fille/garçon, séminaires — nous créons l'événement de vos rêves.</p><h2>Nos formules</h2><p>Cocktail privé (3h) : champagne, canapés, DJ, décoration. Soirée complète (6h) : dîner, boissons, musique, animations. Mariage de rêve : planning complet avec traiteur, déco, musique, photos. Chaque événement est entièrement personnalisé.</p>`,
      features: JSON.stringify(["Riads et villas privés", "Traiteur gastronomique", "DJ et musique", "Décoration sur mesure", "Photos professionnelles", "Planning complet"]),      metaDescription: "Soirées festives à Marrakech : cocktails, mariages, événements privés dans des riads de charme. Réservez.",
    },
    {
      title: "Vos Demandes Spécifiques", slug: "vos-demandes-specifiques", image: "/images/sections/vacances-marrakech.webp",
      category: "Sur mesure", sortOrder: 23,
      description: "Service sur mesure pour toutes vos demandes spéciales. Voyage de noces, surprise, expérience unique.",
      longDescription: `<h2>Expériences sur mesure à Marrakech</h2><p>Chaque client est unique, et certaines expériences ne peuvent être cataloguées. Notre service sur mesure accueille toutes vos demandes spéciales : voyage de noces romantique, surprise pour un proche, expérience inaccessible au grand public, projet particulier ou original. Notre équipe créative transforme votre idée en réalité.</p><h2>Exemples de réalisations</h2><p>Dîner romantique sur la terrasse de la médina, vol en hélicoptère au coucher du soleil, session photo professionnelle dans les rues de la médina, atelier de cuisine privée avec un chef étoilé, visite privée de galeries d'art, organisation de proposales romantiques. Tout est possible.</p>`,
      features: JSON.stringify(["Service 100% personnalisé", "Équipe créative dédiée", "Réalisation sur mesure", "Budget flexible", "Confidentialité absolue", "Devis gratuit"]),      metaDescription: "Demandes spécifiques à Marrakech : expériences sur mesure, surprises, événements particuliers. Réservez.",
    },
  ];

  for (const s of remaining) {
    await prisma.service.create({ data: { ...s, isActive: true } });
    console.log(`  Created: "${s.title}"`);
  }

  const count = await prisma.service.count();
  console.log(`\nDone! Total services in database: ${count}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
