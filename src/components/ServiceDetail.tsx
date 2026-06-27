import Image from "next/image";
import Link from "next/link";
import { Icon, faCheck, faPhone } from "@/components/icons";

export interface ServiceDetailData {
  slug: string;
  title: string;
  image: string;
  description: string;
  longDescription?: string;
  features?: string[];
  highlights?: string[];
  category?: string;
  metaDescription?: string;
}

export const servicesData: Record<string, ServiceDetailData> = {
  "votre-sejour": {
    slug: "votre-sejour",
    title: "Votre séjour",
    image: "/images/activities/sonotherapie.webp",
    category: "Conciergerie",
    metaDescription: "Service de conciergerie de luxe à Marrakech. Concierge dédié, check-in VIP, ménage, blanchisserie et services sur mesure pour un séjour inoubliable.",
    description:
      "Profitez d'un séjour de luxe à Marrakech avec nos services de conciergerie dédiés. Un concierge personnel s'occupe de chaque détail pour que vous n'ayez rien à faire.",
    longDescription:
      "Notre service de conciergerie premium met à votre disposition un conseiller dédié dès votre arrivée à Marrakech. Du transfert aéroport à l'organisation de vos activités, chaque demande est traitée avec une attention minutieuse. Nous gérons le check-in et le check-out de votre villa, coordonnons le ménage quotidien, supervisons la blanchisserie et veillons à ce que votre espace soit toujours impeccable.",
    features: [
      "Concierge personnel dédié 24h/24",
      "Check-in et check-out VIP dans votre villa",
      "Ménage quotidien par équipe professionnelle",
      "Service de blanchisserie et repassage",
      "Gestion des courses et approvisionnement",
      "Réservations restaurants et activités",
      "Assistance multilingue (FR, EN, AR)",
      "Service de garde d'enfants sur demande",
    ],
    highlights: [
      "Un seul interlocuteur pour tout votre séjour",
      "Disponible 7j/7 par téléphone et WhatsApp",
      "Réponse garantie en moins de 30 minutes",
    ],
  },
  "vos-repas": {
    slug: "vos-repas",
    title: "Vos repas",
    image: "/images/activities/voiture-luxe.webp",
    category: "Gastronomie",
    metaDescription: "Cuisine privée et traiteur de luxe à Marrakech. Chef cuisinier marocain et international, menus sur mesure, dîners privés dans votre villa.",
    description:
      "Nos cuisiniers préparent des repas savoureux adaptés à vos envies. Cuisine marocaine authentique ou gastronomie internationale, directement dans votre villa.",
    longDescription:
      "Oubliez les restaurants bondés et savourez une expérience culinaire privée au confort de votre villa. Nos chefs cuisiniers, formés dans les meilleurs établissements de Marrakech et de l'international, préparent des repas exceptionnels adaptés à vos goûts, allergies et régimes alimentaires. Du petit-déjeuner copieux au dîner gastronomique sous les étoiles, chaque repas devient un moment de partage.",
    features: [
      "Chef cuisinier marocain et international",
      "Menus sur mesure (halal, végétarien, sans gluten)",
      "Petit-déjeuner, déjeuner et dîner",
      "Courses et approvisionnement inclus",
      "Vaisselle et nettoyage compris",
      "Dîners privés en terrasse ou jardin",
      "Cours de cuisine marocaine disponibles",
      "Service de traiteur pour événements",
    ],
    highlights: [
      "Produits frais du marché de Marrakech",
      "Menus adaptés aux enfants",
      "Possibilité de dîners thématiques",
    ],
  },
  "votre-transport-sur-place": {
    slug: "votre-transport-sur-place",
    title: "Votre transport sur place",
    image: "/images/activities/van-chauffeur.webp",
    category: "Transport",
    metaDescription: "Location de voitures de luxe avec chauffeur à Marrakech. VTC, berlines, minibus, navettes aéroport. Transferts privés et déplacements sur mesure.",
    description:
      "Déplacez-vous en toute sérénité avec nos services de transport de luxe. VTC, berlines, minibus... nous avons la solution pour tous vos déplacements à Marrakech.",
    longDescription:
      "Que ce soit pour un transfert depuis l'aéroport Marrakech Ménara, une journée d'excursion dans l'Atlas ou simplement pour vous déplacer dans la ville, notre flotte de véhicules de luxe et nos chauffeurs professionnels vous garantissent un trajet confortable et ponctuel. Chaque véhicule est climatisé, spacieux et entretenu according aux normes les plus strictes.",
    features: [
      "Flotte de véhicules premium (Mercedes, BMW, Audi)",
      "Chauffeurs professionnels et multilingues",
      "Transferts aéroport aller-retour",
      "Excursions journée dans l'Atlas et le désert",
      "Mise à disposition pour la journée ou la semaine",
      "Sièges bébé et rehausseurs disponibles",
      "Eau minérale et Wi-Fi dans chaque véhicule",
      "Réservation 24h/24 par téléphone ou WhatsApp",
    ],
    highlights: [
      "Ponctualité garantie",
      "Véhicules neufs et climatisés",
      "Pas de frais cachés",
    ],
  },
  "van-avec-chauffeur": {
    slug: "van-avec-chauffeur",
    title: "Van avec chauffeur",
    image: "/images/activities/van-chauffeur.webp",
    category: "Transport",
    metaDescription: "Location van avec chauffeur à Marrakech. Transport de groupes, familles et séminaires. Vans spacieux et confortables avec chauffeur professionnel.",
    description:
      "Voyagez confortablement en van avec chauffeur pour vos déplacements à Marrakech et ses alentours. Idéal pour les groupes et les familles nombreuses.",
    longDescription:
      "Notre service de van avec chauffeur est la solution idéale pour les groupes, familles nombreuses et séminaires d'entreprise. Nos vans 7, 8 et 15 places offrent un espace généreux pour les passagers et leurs bagages. Que ce soit pour un transfert aéroport, une excursion dans l'Atlas ou une journée de découverte de Marrakech, votre chauffeur vous attend à l'heure et vous accompagne tout au long de la journée.",
    features: [
      "Vans 7, 8 et 15 places climatisés",
      "Chauffeur professionnel et courtois",
      "Grand espace bagages",
      "Transferts aéroport groupes",
      "Excursions journée avec itinéraire personnalisé",
      "Eau, Wi-Fi et chargeurs USB à bord",
      "Service de porte-à-porte",
      "Facturation transparente",
    ],
    highlights: [
      "Idéal pour groupes de 4 à 15 personnes",
      "Réduction pour réservations longue durée",
      "Chauffeur à votre disposition toute la journée",
    ],
  },
  "votre-bien-etre": {
    slug: "votre-bien-etre",
    title: "Votre bien être",
    image: "/images/activities/sonotherapie.webp",
    category: "Bien-être",
    metaDescription: "Services de bien-être et spa à Marrakech. Massage, yoga, hammam, sonothérapie et soins du corps. Relaxation et détente dans votre villa.",
    description:
      "Offrez-vous des moments de détente absolue avec nos services de bien-être. Yoga, massage, hammam, spa... nous sublimons votre séjour.",
    longDescription:
      "Marrakech est une ville de sérénité et de traditions millénaires. Plongez dans cette atmosphère unique avec nos services de bien-être exclusifs. Nos praticiens certifiés se déplacent directement dans votre villa pour vous offrir des moments de relaxation profonde. Du massage relaxant à la sonothérapie, en passant par le yoga de l'aube sur votre terrasse, chaque soin est une invitation au lâcher-prise.",
    features: [
      "Massage relaxant, thai, californien et balinais",
      "Séance de yoga et pilates en villa ou en plein air",
      "Hammam traditionnel marocain avec gommage",
      "Sonothérapie et méditation sonore",
      "Soins du corps et du visage",
      "Réflexologie plantaire",
      "Rituels bien-être pour couples",
      "Séances de respiration et cohérence cardiaque",
    ],
    highlights: [
      "Praticiens certifiés et expérimentés",
      "Déplacement dans votre villa",
      "Produits naturels et bio",
    ],
  },
  "vos-activites": {
    slug: "vos-activites",
    title: "Vos activités",
    image: "/images/activities/quad-buggy.webp",
    category: "Activités",
    metaDescription: "Toutes les activités à Marrakech : quad, buggy, montgolfière, wakeboard, jet ski, VTT, golf. Réservez vos expériences inoubliables.",
    description:
      "Découvrez notre sélection d'activités pour rendre votre séjour inoubliable. Quad, buggy, montgolfière, wakeboard, jet ski et bien plus.",
    longDescription:
      "Marrakech offre une diversité d'activités exceptionnelle, entre montagnes de l'Atlas, Palmeraie verdoyante et lacs paisibles. Notre équipe sélectionne pour vous les meilleures expériences, encadrées par des professionnels passionnés. Que vous soyez en quête de sensations fortes ou de moments de détente, nous avons l'activité parfaite pour chaque membre de votre groupe.",
    features: [
      "Quad et buggy en Palmeraie et montagne",
      "Montgolfière au lever du soleil",
      "Wakeboard et jet ski sur les lacs",
      "Excursions VTT dans l'Atlas",
      "Golf sur les parcours prestigieux",
      "Equitation et balades à cheval",
      "Karting, paintball et side-car",
      "Visites culturelles et découverte",
    ],
    highlights: [
      "Activités pour tous les âges",
      "Équipement de sécurité fourni",
      "Transfert inclus depuis votre villa",
    ],
  },
  "quad-buggy": {
    slug: "quad-buggy",
    title: "Quad/Buggy",
    image: "/images/activities/quad-buggy.webp",
    category: "Sensations fortes",
    metaDescription: "Location de quad et buggy à Marrakech. Balade en Palmeraie et montagne de l'Atlas. Séances de 1h à 4h avec guide expert. Tous niveaux.",
    description:
      "Envie de sensations fortes ? Découvrez la Palmeraie et les pistes de montagne en quad ou en buggy avec un guide expert.",
    longDescription:
      "Parcourez les pistes sablonneuses de la Palmeraie de Marrakech en quad ou en buggy. Notre équipe de guides passionnés vous emmène à la découverte de paysages grandioses, entre oliveraies, palmeraies et villages berbères. Les véhicules, régulièrement entretenus et équipés de protections complètes, sont adaptés à tous les niveaux, des débutants aux conducteurs expérimentés.",
    features: [
      "Quads 150cc, 250cc et 450cc",
      "Buggys 2 places et 4 places",
      "Parcours de 1h à 4h en Palmeraie",
      "Excursion montagne dans l'Atlas",
      "Guide expert et formé à la sécurité",
      "Casques, gants et lunettes fournis",
      "Eau minérale et rafraîchissements inclus",
      "Photos et vidéos du parcours disponibles",
    ],
    highlights: [
      "Aucun permis nécessaire (quad 150cc)",
      "Départ directement depuis votre villa",
      "Parcours adapté aux débutants et confirmés",
    ],
  },
  "montgolfiere": {
    slug: "montgolfiere",
    title: "Montgolfière à Marrakech",
    image: "/images/activities/montgolfiere.webp",
    category: "Expérience unique",
    metaDescription: "Vol en montgolfière au lever du soleil à Marrakech. Vol au-dessus de la Palmeraie et de l'Atlas. Expérience inoubliable avec champagne.",
    description:
      "Volez au-dessus de la Palmeraie en montgolfière et découvrez Marrakech sous un angle unique. Une expérience inoubliable au lever du soleil.",
    longDescription:
      "L'expérience du vol en montgolfière à Marrakech est l'une des activités les plus emblématiques de la ville. Décollage à l'aube depuis la Palmeraie, ascension douce au-dessus des palmeraies et des villages berbères, avec en toile de fond les sommets enneigés de l'Atlas. À l'atterrissage, un petit-déjeuner traditionnel marocain avec thé à la menthe et jus d'orange frais vous attend. Un souvenir gravé à jamais.",
    features: [
      "Vol au lever du soleil (départ 6h-7h)",
      "Durée du vol : 45 à 60 minutes",
      "Capacité : 16 à 24 passagers par nacelle",
      "Petit-déjeuner marocain inclus",
      "Certificat de vol souvenir",
      "Transfert aller-retour depuis votre villa",
      "Guide francophone à bord",
      "Vol possible toute l'année (météo permitting)",
    ],
    highlights: [
      "Vue panoramique sur l'Atlas et la Palmeraie",
      "Expérience romantique pour couples",
      "Idéal pour célébrer un anniversaire",
    ],
  },
  "wakeboard-marrakech": {
    slug: "wakeboard-marrakech",
    title: "Wakeboard à Marrakech",
    image: "/images/activities/wakeboard.jpg",
    category: "Sports nautiques",
    metaDescription: "Wakeboard et wake sur lac à Marrakech. École de wakeboard pour débutants et confirmés. Équipement complet et moniteur diplômé.",
    description:
      "Envie de sensations aquatiques ? Le wakeboard est l'activité parfaite pour les amateurs de sports nautiques sur les lacs de Marrakech.",
    longDescription:
      "Les lacs de Marrakech, nichés au pied de l'Atlas, offrent un cadre idéal pour pratiquer le wakeboard. Que vous soyez débutant ou rider confirmé, nos moniteurs diplômés vous accompagnent pour progresser rapidement en toute sécurité. Le câble de traction permet de glisser à vitesse constante tout en profitant du paysage spectaculaire des montagnes.",
    features: [
      "Lac artificiel avec câble de traction",
      "Écoles pour débutants et confirmés",
      "Moniteurs diplômés et francophones",
      "Équipement complet fourni (board, gilet, casque)",
      "Cours individuels et en groupe",
      "Séances de 1h à demi-journée",
      "Eau tiède en été (juin-septembre)",
      "Vestiaires et douches sur place",
    ],
    highlights: [
      "Accessible dès 8 ans",
      "Progression rapide avec le câble",
      "Cadre exceptionnel au pied de l'Atlas",
    ],
  },
  "vtt": {
    slug: "vtt",
    title: "Excursions VTT",
    image: "/images/activities/vtt.webp",
    category: "Aventure",
    metaDescription: "Excursions VTT dans l'Atlas et la Palmeraie de Marrakech. Parcours pour tous les niveaux. VTT électrique disponible. Guide expert inclus.",
    description:
      "Parcourez les sentiers de l'Atlas et de la Palmeraie en VTT. Des parcours adaptés à tous les niveaux pour découvrir les paysages exceptionnels.",
    longDescription:
      "Marrakech est un terrain de jeu exceptionnel pour les amateurs de VTT. Des sentiers de la Palmeraie aux cols de l'Atlas, nos excursions vous emmènent à la découverte de paysages variés : palmeraies, gorges, villages berbères et terrasses agricoles. Nos guides locaux connaissent chaque sentier et partagent avec vous leur passion pour la montagne et la culture amazigh.",
    features: [
      "VTT traditionnel et VTT électrique (e-MTB)",
      "Parcours Palmeraie, montagne et mixed",
      "Difficultés : facile, moyenne, difficile",
      "Durée : demi-journée ou journée complète",
      "Guide expert et formé aux premiers secours",
      "Véhicule de support sur les parcours longs",
      "Casque et gants fournis",
      "Pique-nique ou déjeuner inclus (journée)",
    ],
    highlights: [
      "E-MTB pour les débutants (assistance électrique)",
      "Départ et retour depuis votre villa",
      "Petit-déjeuner berbère en montagne possible",
    ],
  },
  "terres-d-amanar-polo-berbere-babyfoot-humain-tyrolienne-accrobranche": {
    slug: "terres-d-amanar-polo-berbere-babyfoot-humain-tyrolienne-accrobranche",
    title: "Grand Canyon",
    image: "/images/activities/grand-canyon.webp",
    category: "Aventure",
    metaDescription: "Parcours aventure au Grand Canyon de Marrakech. Tyrolienne, accrobranche, polo berbère et team building. Sensations garanties pour tous.",
    description:
      "Vivez une aventure unique au Grand Canyon de Marrakech. Tyrolienne, accrobranche, polo berbère... des sensations garanties pour toute la famille.",
    longDescription:
      "Le complexe des Terres d'Amanar, situé à 30 minutes de Marrakech, offre un parcours aventure complet au cœur de la nature. Glissez sur la tyrolienne de 180 mètres, enchaînez les ponts suspendus de l'accrobranche, affrontez vos amis au baby-foot géant humain ou initiés au polo berbère. Un terrain de jeu d'exception pour les familles, groupes d'amis et séminaires d'entreprise.",
    features: [
      "Tyrolienne de 180 mètres",
      "Parcours accrobranche 5 niveaux",
      "Baby-foot humain géant",
      "Initiation au polo berbère",
      "Team building et games sur mesure",
      "Déjeuner traditionnel inclus",
      "Guide et moniteurs diplômés",
      "Accessible dès 6 ans",
    ],
    highlights: [
      "Séjour d'une demi-journée ou journée complète",
      "Cadre naturel exceptionnel dans l'Atlas",
      "Idéal pour anniversaire et evénements",
    ],
  },
  "golf-1": {
    slug: "golf-1",
    title: "Golf",
    image: "/images/activities/golf.webp",
    category: "Sport",
    metaDescription: "Golf à Marrakech : Greenaouia Palmeraie, Amelkis, Royal Golf. Réservation parcours, cours avec pro et forfaits tout compris.",
    description:
      "Marrakech est un paradis pour les golfeurs. Profitez de nos parcours prestigieux 18 trous avec vue spectaculaire sur l'Atlas.",
    longDescription:
      "Marrakech compte certains des plus beaux parcours de golf d'Afrique du Nord. Des fairways de la Palmeraie aux terrains ombragés de l'Atlas, chaque parcours offre un cadre exceptionnel. Nous réservons vos créneaux, organisons les transferts et proposons des séances avec un pro pour parfaire votre swing sous le soleil de Marrakech.",
    features: [
      "Réservation sur les meilleurs parcours de Marrakech",
      "Greenaouia Palmeraie, Amelkis, Royal Golf, Noria",
      "Transferts aller-retour depuis votre villa",
      "Location de matériel complet (clubs, chariot)",
      "Cours avec pro certifié PGA",
      "Forfaits demi-journée et journée",
      "Restaurant et club house sur place",
      "Compétitions et tournois organisés",
    ],
    highlights: [
      "Parcours ouverts toute l'année",
      "Climat idéal même en hiver (18-22°C)",
      "Réduction pour groupes et séminaires",
    ],
  },
  "desert-sensation": {
    slug: "desert-sensation",
    title: "Désert sensation",
    image: "/images/activities/desert-sensation.webp",
    category: "Aventure",
    metaDescription: "Excursion désert depuis Marrakech : buggy, quad, dromadaire et bivouac sous les étoiles. Aventure de 1 jour à 3 jours dans les dunes.",
    description:
      "Partez à l'aventure dans le désert de Marrakech. Buggy, quad, dromadaire... vivez des moments inoublables au cœur des dunes.",
    longDescription:
      "Le désert de Marrakech, à quelques heures de la ville, vous attend pour une aventure unique. Parcourez les dunes en buggy ou en quad, chevauchez un dromadaire au coucher du soleil et dormez sous les étoiles dans un bivouac de luxe. Nos excursions désert sont conçues pour tous les âges et tous les niveaux d'adrénaline.",
    features: [
      "Excursion d'une journée au désert d'Agafay",
      "Séjours de 2 à 3 jours au Sahara (Merzouga)",
      "Buggy, quad et 4x4 dans les dunes",
      "Chevauchée de dromadaire au coucher du soleil",
      "Bivouac de luxe sous les étoiles",
      "Dîner traditionnel avec musique berbère",
      "Petit-déjeuner et déjeuner inclus",
      "Transfert depuis votre villa inclus",
    ],
    highlights: [
      "Désert d'Agafay à 40 min de Marrakech",
      "Sahara (Merzouga) pour les grands voyages",
      "Expérience magique au coucher du soleil",
    ],
  },
  "visites-decouvertes": {
    slug: "visites-decouvertes",
    title: "Visites découvertes",
    image: "/images/activities/visites-decouvertes.webp",
    category: "Culture",
    metaDescription: "Visites guidées à Marrakech : Jardin Majorelle, Bahia, Koutoubia, souks, Ourika. Guide francophone, demi-journée ou journée complète.",
    description:
      "Découvrez les trésors de Marrakech avec nos visites guidées. Jardin Majorelle, Bahia, Koutoubia, souks et bien plus.",
    longDescription:
      "Marrakech regorge de trésors architecturaux et culturels. Nos guides passionnés et francophones vous emmènent à la découverte des sites incontournables et des cachettes secrètes de la ville. Du Jardin Majorelle aux souks animés, en passant par le Palais Bahia et la Koutoubia, chaque visite est une immersion dans l'histoire et la culture marocaine.",
    features: [
      "Guide francophone certifié",
      "Jardin Majorelle + Musée Yves Saint Laurent",
      "Palais Bahia et Palais El Badi",
      "Mosquée Koutoubia (extérieur)",
      "Souks de la médina et artisanat",
      "Cimetière Saâdien",
      "Jardin Secret et Le Tanja",
      "Demi-journée ou journée complète",
    ],
    highlights: [
      "Petit-déjeuner traditionnel au souk inclus",
      "Dégustation de thé à la menthe",
      "Arrêts photos dans les meilleurs spots",
    ],
  },
  "equitation": {
    slug: "equitation",
    title: "Equitation",
    image: "/images/activities/equitation.webp",
    category: "Nature",
    metaDescription: "Balade à cheval à Marrakech : Palmeraie, montagne Atlas, plages d'Essaouira. Équitation pour débutants et confirmés. Poneys pour enfants.",
    description:
      "Promenez-vous à cheval dans les paysages exceptionnels de Marrakech. Balades en Palmeraie, randonnées en montagne, galop sur la plage.",
    longDescription:
      "L'equitation est une tradition séculaire au Maroc. Nos écuries, situées en Palmeraie ou au pied de l'Atlas, proposent des balades adaptées à tous les niveaux, des débutants aux cavaliers expérimentés. Chevaux et poneys bien dressés, encadrement passionné et paysages à couper le souffle pour des moments inoubliables.",
    features: [
      "Balade en Palmeraie (1h, 2h, demi-journée)",
      "Randonnée en montagne de l'Atlas",
      "Galop sur la plage d'Essaouira (excursion)",
      "Poneys pour enfants dès 4 ans",
      "Cavaliers et guides professionnels",
      "Chevaux arabes et barbes bien dressés",
      "Casque et équipement fournis",
      "Thé à la menthe au retour de balade",
    ],
    highlights: [
      "Aucune expérience nécessaire pour les débutants",
      "Cadre exceptionnel des palmeraies",
      "Excursion Essaouira possible en journée",
    ],
  },
  "yoga-et-pilates": {
    slug: "yoga-et-pilates",
    title: "Yoga et Pilates",
    image: "/images/activities/yoga-pilates.webp",
    category: "Bien-être",
    metaDescription: "Cours de yoga et pilates à Marrakech. Instructeur certifié dans votre villa ou en extérieur. Hatha, vinyasa, yin et reformer. Tous niveaux.",
    description:
      "Séance de yoga et pilates dans le confort de votre villa ou en plein air. Nos instructeurs certifiés vous accompagnent.",
    longDescription:
      "Le climat ensoleillé de Marrakech est idéal pour pratiquer le yoga et le pilates en plein air. Nos instructeurs certifiés se déplacent dans votre villa, sur votre terrasse ou dans le jardin pour des séances personnalisées. Du yoga de l'aube au pilates du crépuscule, chaque séance est une parenthèse de sérénité au milieu de votre séjour.",
    features: [
      "Cours de yoga (Hatha, Vinyasa, Yin, Restauratif)",
      "Cours de pilates (mat et reformer)",
      "Séances privées ou en petit groupe",
      "En villa, en terrasse ou en jardin",
      "Horaires flexibles (matin ou soir)",
      "Tous niveaux : débutant à avancé",
      "Matériel fourni (tapis, blocs, sangles)",
      "Séances méditation et respiration",
    ],
    highlights: [
      "Instructeurs certifiés RYT-200 minimum",
      "Séance d'essai gratuite de 30 min",
      "Idéal pour retrouver forme et énergie",
    ],
  },
  "aqua-karting": {
    slug: "aqua-karting",
    title: "Aqua Karting",
    image: "/images/activities/aqua-karting.webp",
    category: "Famille",
    metaDescription: "Aqua karting à Marrakech : karting sur l'eau pour toute la famille. Activité originale et fun. Location par session de 15 min.",
    description:
      "Le karting aquatique, une activité originale et fun pour toute la famille. Adrénaline et rires garantis sur l'eau.",
    longDescription:
      "L'aqua karting est l'activité la plus originale de Marrakech. Des karts sur pneus spéciaux glissent sur la surface de l'eau pour une expérience unique et hilarante. Accessible dès 6 ans avec un adulte, c'est l'activité parfaite pour une pause ludique entre deux visites ou pour occuper les enfants en toute sécurité.",
    features: [
      "Karts sur l'eau à propulsion humaine",
      "Accessible dès 6 ans (accompagné)",
      "Sessions de 15 et 30 minutes",
      "Équipement de sécurité fourni",
      "Piscine dédiée et sécurisée",
      "Surveillance par maître-nageur",
      "Activité en extérieur, soleil garanti",
      "Idéal pour groupes et anniversaires",
    ],
    highlights: [
      "Activité unique à Marrakech",
      "Fun garanti pour petits et grands",
      "Pas besoin de savoir nager",
    ],
  },
  "karting": {
    slug: "karting",
    title: "Karting",
    image: "/images/activities/karting.webp",
    category: "Sensations fortes",
    metaDescription: "Circuit de karting à Marrakech. Karts seniors et juniors. Chronomètre, courses privées et événements d'entreprise.",
    description:
      "Prouvez vos talents de pilote sur notre circuit de karting professionnel. Émotions et vitesse pour petits et grands.",
    longDescription:
      "Notre circuit de karting, conçu selon les normes FIA, offre des sensations de vitesse authentiques dans un environnement sécurisé. Karts 4 temps puissants, chicanes techniques et lignes droites rapides pour un parcours exigeant. Chronomètre professionnel pour défier vos amis et family. Les plus petits ont leurs propres karts junior sur un circuit adapté.",
    features: [
      "Circuit professionnel de 800m",
      "Karts seniors 4 temps (270cc)",
      "Karts juniors dès 8 ans",
      "Chronomètre en temps réel",
      "Courses privées pour groupes",
      "Événements d'entreprise et team building",
      "Casque, combinaison et gants fournis",
      "Briefing sécurité et formation incluse",
    ],
    highlights: [
      "Circuit homologué et sécurisé",
      "Records personnels et podium",
      "Idéal pour anniversaire et EVJF/EVG",
    ],
  },
  "paintball": {
    slug: "paintball",
    title: "Paintball",
    image: "/images/activities/paintball.webp",
    category: "Team building",
    metaDescription: "Paintball à Marrakech : terrain en pleine nature, équipement complet, scénarios sur mesure. Team building, enterrement de vie et groupes.",
    description:
      "Affrontez vos amis sur notre terrain de paintball en pleine nature. Stratégie, team spirit et adrénaline au programme.",
    longDescription:
      "Notre terrain de paintball, situé en pleine nature à la sortie de Marrakech, offre des scénarios variés et immersifs. Forteresse, jungle, village berbère... chaque partie est une aventure stratégique unique. Équipement de dernière génération, barrières naturelles et artificielles, et équipe d'animation professionnelle pour des parties mémorables.",
    features: [
      "Terrain de 5000m² en pleine nature",
      "Scénarios variés (forteresse, jungle, berbère)",
      "Équipement Markerm, gilet, masque, gants",
      "Munitions : 200 billes par personne (plus disponibles)",
      "Équipe d'animation et arbitrage",
      "Groupes de 10 à 50 personnes",
      "Waterproofing pour les marques",
      "Eau et rafraîchissements inclus",
    ],
    highlights: [
      "Scénarios sur mesure pour team building",
      "Enterrement de vie de jeune marié/mariée",
      "Briefing sécurité et formation incluse",
    ],
  },
  "side-car-vintage": {
    slug: "side-car-vintage",
    title: "Side Car Vintage",
    image: "/images/activities/side-car.webp",
    category: "Expérience unique",
    metaDescription: "Balade en side-car vintage à Marrakech. Tour de la médina, Palmeraie et atlas. Expérience unique et romantique en duo.",
    description:
      "Explorez Marrakech en side-car vintage. Une expérience unique et originale pour découvrir la ville rouge en duo.",
    longDescription:
      "Le side-car vintage est la façon la plus originale de découvrir Marrakech. En duo avec un pilote passionné, vous parcourez les ruelles animées de la médina, les routes ombragées de la Palmeraie et les villages de l'Atlas. Une expérience à la fois nostalgique et aventureuse, parfaite pour les couples et les amis en quête d'authenticité.",
    features: [
      "Side-cars BMW et Ural vintage",
      "Pilote passionné et guide local",
      "Tour de la médina et souks",
      "Balade en Palmeraie",
      "Excursion dans l'Atlas (demi-journée)",
      "Casque et lunettes fournis",
      "Gilet pare-balles vestige (option)",
      "Photos souvenir du trajet",
    ],
    highlights: [
      "Expérience exclusive à Marrakech",
      "Idéal pour couples et anniversaires",
      "Parcours personnalisable",
    ],
  },
  "jet-ski": {
    slug: "jet-ski",
    title: "Jet Ski",
    image: "/images/activities/jet-ski.webp",
    category: "Sports nautiques",
    metaDescription: "Location de jet ski à Marrakech sur les lacs de l'Agdal. Balade en jet ski avec guide. Séances de 15 min à 1h. Tous niveaux.",
    description:
      "Envie d'adrénaline ? Partez en jet ski sur les lacs paisibles de Marrakech. Une expérience inoubliable au pied de l'Atlas.",
    longDescription:
      "Les lacs de l'Agdal et du barrage de Lalla Takerkoust offrent un cadre idéal pour la pratique du jet ski. L'eau calme et le paysage montagneux de l'Atlas créent un terrain de jeu spectaculaire. Nos moniteurs vous accompagnent pour une balade ou une session libre, en toute sécurité.",
    features: [
      "Jet ski monoplace et biplace",
      "Séances de 15 min, 30 min et 1h",
      "Balade guidée sur le lac",
      "Session libre pour confirmés",
      "Équipement de sécurité fourni",
      "Maître-nageur et bateau de surveillance",
      "Transfert depuis votre villa possible",
      "Photos et vidéos disponibles",
    ],
    highlights: [
      "Pas de permis nécessaire",
      "Cadre exceptionnel au pied de l'Atlas",
      "Activité pour les 12 ans et +",
    ],
  },
  "sonographie": {
    slug: "sonographie",
    title: "Sonothérapie",
    image: "/images/activities/sonotherapie.webp",
    category: "Bien-être",
    metaDescription: "Séance de sonothérapie et méditation sonore à Marrakech. Bols tibétains, gongs et instruments vibratoires. Relaxation profonde en villa.",
    description:
      "Plongez dans une expérience de relaxation profonde avec la sonothérapie. Les vibrations des bols tibétains et gongs vous apaiseront.",
    longDescription:
      "La sonothérapie est une pratique ancestrale qui utilise les vibrations sonores pour harmoniser le corps et l'esprit. Nos praticiens certifiés utilisent des bols tibétains, des gongs et des instruments vibratoires pour vous guider vers un état de relaxation profonde. Cette expérience immersive, idéale en complément d'un yoga ou d'un massage, vous procure un lâcher-prise total.",
    features: [
      "Séance individuelle ou collective",
      "Bols tibétains, gongs, carillons",
      "Méditation guidée et respiration",
      "Durée : 45 min à 1h30",
      "En villa, en jardin ou en extérieur",
      "Tapis, couvertures et coussins fournis",
      "Thé de wellness en entrée",
      "Possibilité de séance nocturne sous les étoiles",
    ],
    highlights: [
      "Expérience rare et authentique",
      "Idéal pour le stress et l'insomnie",
      "Praticien certifié en son-thérapie",
    ],
  },
  "vos-soirees-festives": {
    slug: "vos-soirees-festives",
    title: "Vos soirées festives",
    image: "/images/activities/voiture-luxe.webp",
    category: "Événementiel",
    metaDescription: "Organisation de soirées privées à Marrakech. DJ, traiteur, décoration, sonorisation. Soirées dans votre villa ou en lieu privé.",
    description:
      "Organisez des soirées mémorables dans votre villa. DJ, traiteur, décoration, sonorisation... nous nous occupons de tout.",
    longDescription:
      "Marrakech est la ville parfaite pour célébrer. Que ce soit pour un anniversaire, un enterrement de vie, un réveillon ou simplement une soirée entre amis, notre équipe événementielle transforme votre villa en un lieu de fête exceptionnel. DJ, traiteur gastronomique, décorateur, éclairage d'ambiance... chaque détail est pensé pour créer une atmosphère inoubliable.",
    features: [
      "DJ et sonorisation professionnelle",
      "Traiteur gastronomique et bar open",
      "Décoration et éclairage d'ambiance",
      "Show de lumière et fumée",
      "Animation et hostesses",
      "Location de matériel (tables, chaises, vaisselle)",
      "Photographe et vidéaste sur demande",
      "Coordination complète de A à Z",
    ],
    highlights: [
      "Événements de 20 à 200 personnes",
      "Résidences privées et riads disponibles",
      "Conformité avec les règlements locaux",
    ],
  },
  "vos-demandes-specifiques": {
    slug: "vos-demandes-specifiques",
    title: "Vos demandes spécifiques",
    image: "/images/activities/van-chauffeur.webp",
    category: "Sur mesure",
    metaDescription: "Service sur mesure à Marrakech. Demandes spéciales, événements privés, expériences exclusives. Contactez-nous pour un devis personnalisé.",
    description:
      "Vous avez une demande particulière ? Notre équipe est à votre écoute pour créer une expérience 100% sur mesure à Marrakech.",
    longDescription:
      "Chaque client est unique et chaque séjour mérite une touche personnalisée. Que vous souhaitiez organiser un mariage sur une terrasse avec vue Atlas, réserver un dîner privée dans un riad historique, organiser un vol en hélicoptère au-dessus du désert ou toute autre idée créative, notre équipe se mobilise pour transformer votre rêve en réalité.",
    features: [
      "Étude personnalisée de votre projet",
      "Devis gratuit et sans engagement",
      "Réseau de prestataires certifiés",
      "Événements sur mesure (mariages, anniversaires)",
      "Expériences exclusives et insolites",
      "Gestion logistique complète",
      "Suivi en temps réel par WhatsApp",
      "Assurance et garantie décennale",
    ],
    highlights: [
      "Réponse sous 24h maximum",
      "Aucune demande n'est trop complexe",
      "Accompagnement de A à Z",
    ],
  },
  "votre-seminaire": {
    slug: "votre-seminaire",
    title: "Votre séminaire",
    image: "/images/activities/voiture-luxe.webp",
    category: "Entreprise",
    metaDescription: "Organisation de séminaires d'entreprise à Marrakech. Salles de réunion, team building, gala diner. Résidences de luxe et riads privés.",
    description:
      "Organisez votre séminaire d'entreprise à Marrakech. Espaces de réception, équipements, team building... tout est possible.",
    longDescription:
      "Marrakech est devenue la destination de référence pour les séminaires d'entreprise en Afrique du Nord. Le mélange unique de modernité et de tradition, le climat ensoleillé et la richesse des expériences disponibles en font un cadre idéal pour motiver vos équipes. Nos résidences de luxe et riads privés offrent des espaces de réception modulables, des équipements techniques dernière génération et un service sur mesure.",
    features: [
      "Résidences de luxe et riads privés",
      "Salles de réunion modulables (10 à 200 personnes)",
      "Équipements techniques (vidéoprojecteur, son, Wi-Fi)",
      "Team building sur mesure (quad, escape game, cooking)",
      "Gala diner et soirées privées",
      "Excursions et activités de groupe",
      "Logistique et coordinateur dédié",
      "Transferts et navettes aéroport",
    ],
    highlights: [
      "Destination ensoleillée toute l'année",
      "Excellent rapport qualité-prix",
      "Équipe francophone dédiée",
    ],
  },
};

export default function ServiceDetail({ service }: { service: ServiceDetailData }) {
  const relatedServices = Object.values(servicesData)
    .filter((s) => s.slug !== service.slug && s.category === service.category)
    .slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative w-full h-[350px] sm:h-[400px] md:h-[480px] lg:h-[520px]">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 sm:pb-16 px-4">
          {service.category && (
            <span className="bg-[#ffb000] text-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              {service.category}
            </span>
          )}
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold text-center px-4 leading-tight">
            {service.title}
          </h1>
          <p className="text-white/70 text-sm sm:text-base mt-3 max-w-xl text-center">
            {service.description}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-[1140px] mx-auto px-4 py-12 md:py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-[#0d47a1] transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/service" className="hover:text-[#0d47a1] transition-colors">Services</Link>
          <span>/</span>
          <span className="text-[#34495e] font-medium">{service.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Intro */}
            <h2 className="text-2xl md:text-3xl font-bold text-[#34495e] mb-6">
              {service.title} à Marrakech
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              {service.longDescription || service.description}
            </p>

            {/* Highlights */}
            {service.highlights && service.highlights.length > 0 && (
              <div className="bg-blue-50 border-l-4 border-[#0d47a1] rounded-r-xl p-5 mb-8">
                <h3 className="text-[#0d47a1] font-bold text-sm uppercase tracking-wide mb-3">
                  Points forts
                </h3>
                <ul className="space-y-2">
                  {service.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-gray-700">
                      <Icon icon={faCheck} className="text-[#0d47a1] text-xs mt-0.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#34495e] mb-4">
                  Ce que nous offrons
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5 bg-white border border-gray-100 rounded-lg p-3.5 shadow-sm">
                      <Icon icon={faCheck} className="text-[#0d47a1] text-xs mt-0.5 shrink-0" />
                      <span className="text-sm text-gray-700">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* CTA Card */}
              <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-[#34495e] mb-2">Réserver cette activité</h3>
                <p className="text-sm text-gray-500 mb-5">
                  Contactez-nous pour un devis personnalisé et gratuit.
                </p>
                <Link
                  href="/contactez-nous"
                  className="flex items-center justify-center gap-2 w-full bg-[#0d47a1] hover:bg-[#0a3a82] text-white font-bold py-3.5 px-6 rounded-xl transition-all hover:shadow-lg text-sm"
                >
                  <Icon icon={faPhone} className="text-xs" />
                  <span>Contactez-nous</span>
                </Link>
                <a
                  href="https://wa.me/212600000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold py-3.5 px-6 rounded-xl transition-all hover:shadow-lg text-sm mt-3"
                >
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-5">
                  <h4 className="text-sm font-bold text-[#34495e] uppercase tracking-wide mb-3">
                    Activités similaires
                  </h4>
                  <div className="space-y-3">
                    {relatedServices.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/service/${s.slug}`}
                        className="flex items-center gap-3 group hover:bg-white rounded-xl p-2 transition-colors"
                      >
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                          <Image src={s.image} alt={s.title} fill className="object-cover" sizes="56px" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#34495e] group-hover:text-[#0d47a1] transition-colors">
                            {s.title}
                          </p>
                          <span className="text-xs text-gray-400">{s.category}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
