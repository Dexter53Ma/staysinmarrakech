const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const services = [
  {
    title: "Votre Séjour",
    slug: "votre-sejour",
    image: "/images/activities/sonotherapie.webp",
    category: "Conciergerie",
    price: null,
    priceUnit: null,
    sortOrder: 1,
    description: "Service de conciergerie premium pour votre séjour à Marrakech. Un chef dédié veille à ce que chaque instant de vos vacances soit parfait, de l'arrivée au départ.",
    longDescription: `<h2>Conciergerie de luxe à Marrakech : votre assistant personnel</h2>
<p>Arriver à Marrakech et trouver tout organisé est le luxe suprême. Notre service de conciergerie premium met à votre disposition un chef dédié qui s'occupe de chaque détail de votre séjour. De l'accueil à l'aéroport à l'organisation de vos activités, vous n'avez rien à faire — sauf profiter.</p>

<h2>Ce que comprend notre service</h2>

<h3>Accueil personnalisé</h3>
<p>Dès votre atterrissage, un chauffeur privé vous attend à l'aéroport Mohammed V pour vous conduire à votre villa. Le chef de conciergerie vous accueille sur place avec un plan détaillé de votre séjour, des recommandations personnalisées et un kit de bienvenue incluant des produits locaux d'exception.</p>

<h3>Organisation complète</h3>
<p>Restaurant réservés, activités planifiées, transferts programmés, courses livrées — notre équipe anticipe vos besoins avant même que vous ne les exprimiez. Vous bénéficiez d'un planning sur mesure adapté à vos envies et à votre rythme.</p>

<h3>Disponibilité 24h/24</h3>
<p>Une urgence à 3h du matin ? Un changement de programme de dernière minute ? Notre équipe est joignable à tout moment par téléphone, WhatsApp ou email. La tranquillité d'esprit est au cœur de notre service.</p>

<h2>Pourquoi choisir notre conciergerie</h2>
<p>Notre équipe connaît Marrakech sur le bout des doigts. Nous savons quel restaurant offre la meilleure vue au coucher du soleil, quel guide-local fait découvrir les trésors cachés de la médina, et quel hammam garantit la meilleure expérience. Cette expertise locale, combinée à un service réactif et discret, fait la différence entre un bon séjour et un séjour exceptionnel.</p>

<h2>Témoignages de nos clients</h2>
<p>Nos clients reviennent année après année, fidèles à la qualité de notre conciergerie. Ils apprécient particulièrement la personnalisation du service, la réactivité de l'équipe et l'attention portée aux moindres détails. Chaque séjour est unique, et c'est exactement ce que nous garantissons.</p>`,
    features: ["Accueil VIP aéroport", "Planning personnalisé", "Disponibilité 24h/24", "Conseils restaurants", "Réservations activités", "Livraison courses"],
    highlights: ["Un chef de conciergerie dédié à votre groupe", "Service multilingue (français, anglais, arabe)", "Partenariats exclusifs avec les meilleurs prestataires", "Suivi en temps réel de votre séjour"],
    metaDescription: "Service de conciergerie premium à Marrakech : accueil VIP, planning personnalisé, disponibilité 24h/24. Réservez votre assistant personnel de luxe."
  },
  {
    title: "Vos Repas",
    slug: "vos-repas",
    image: "/images/activities/voiture-luxe.webp",
    category: "Gastronomie",
    price: null,
    priceUnit: "par personne",
    sortOrder: 2,
    description: "Cuisinier privé et traiteur gastronomique pour vos repas en villa. Découvrez les saveurs authentiques de la cuisine marocaine préparées par nos chefs d'exception.",
    longDescription: `<h2>Cuisinier privé à Marrakech : une expérience gastronomique en villa</h2>
<p>Imaginez déguster un tajine aux pruneaux et amandes préparé sous vos yeux, assis sur votre terrasse avec vue sur l'Atlas. Notre service de cuisinier privé transforme chaque repas en un moment de fête. Nos chefs, formés dans les meilleurs établissements de Marrakech, créent des menus sur mesure qui allient traditions marocaines et créativité contemporaine.</p>

<h2>Nos formules de restauration</h2>

<h3>Cuisinier ponctuel</h3>
<p>Pour un dîner d'exception ou une occasion spéciale, notre chef se déplace à votre villa pour préparer un repas complet. De l'apéritif au dessert, chaque plat est élaboré avec des produits frais du marché et des épices aromatiques sélectionnées avec soin.</p>

<h3>Cuisinier résident</h3>
<p>Pour les séjours prolongés, notre chef s'installe dans votre villa et gère l'ensemble de vos repas du petit-déjeuner au dîner. Il adapte ses menus à vos goûts, régimes alimentaires et envies du moment. Courses, préparation et service sont inclus.</p>

<h3>Traiteur événementiel</h3>
<p>Mariage, anniversaire, séminaire — nous créons des menus d'exception pour vos événements. Buffets traditionnels, stations de cuisson live, cocktails gastronomiques — tout est possible pour marquer les esprits.</p>

<h2>La cuisine marocaine en cuisine</h2>
<p>Les classiques marocains revisités par nos chefs : tajine de agneau aux abricots et amandes, pastilla royale au pigeon et aux fruits secs, couscous aux légumes d'artiste, méchouia aux épices. Chaque plat raconte une histoire, celle d'un savoir-faire transmis depuis des générations.</p>

<h2>Produits frais et épices</h2>
<p>Nos chefs sélectionnent eux-mêmes les produits frais au marché de la médina chaque matin. Épices en vrac du souk des épices, herbes fraîches du jardin, viandes halal de qualité supérieure — la fraîcheur est notre signature.</p>`,
    features: ["Cuisinier ponctuel ou résident", "Menus sur mesure", "Produits frais du marché", "Cuisine marocaine et internationale", "Service événementiel", "Régimes alimentaires adaptés"],
    highlights: ["Chefs formés dans les meilleurs restaurants de Marrakech", "Courses au marché de la médina incluses", "Menu dégustation possible", "Service de vaisselle et nettoyage inclus"],
    metaDescription: "Cuisinier privé et traiteur à Marrakech. Chefs d'exception pour vos repas en villa : cuisine marocaine, événements, séjours longs. Réservez."
  },
  {
    title: "Votre Transport sur Place",
    slug: "votre-transport-sur-place",
    image: "/images/activities/van-chauffeur.webp",
    category: "Transport",
    price: null,
    priceUnit: "par jour",
    sortOrder: 3,
    description: "Transfer et location de véhicule avec chauffeur pour explorer Marrakech et ses alentours en toute sérénité.",
    longDescription: `<h2>Transport privé à Marrakech : confort et sérénité</h2>
<p>Se déplacer à Marrakech peut être intimidant pour les visiteurs. Notre service de transport privé avec chauffeur élimine ce stress et vous permet de profiter pleinement de votre séjour. Véhicules climatisés, chauffeurs professionnels et itinéraires optimisés — voyagez comme un VIP dans la ville rouge.</p>

<h2>Nos véhicules</h2>

<h3>Sedan de luxe</h3>
<p>Pour les transferts aéroport et les déplacements individuels, nos berlines Mercedes Classe E et BMW Série 5 offrent un confort optimal. Wi-Fi, eaux minérales et chargeurs USB sont disponibles à bord.</p>

<h3>Van premium</h3>
<p>Pour les familles et groupes jusqu'à 7 personnes, nos Mercedes Classe V offrent un espace généreux avec climatisation individuelle, prises USB et un coffre spacieux pour les bagages.</p>

<h3>SUV tout-terrain</h3>
<p>Pour les excursions dans l'Atlas et les pistes désertiques, nos Toyota Land Cruiser et Nissan Patrol sont équipés pour affronter tous les terrains tout en offrant le maximum de confort.</p>

<h2>Services inclus</h2>
<p>Chauffeur multilingue, eau minérale, Wi-Fi, chargeurs, et itinéraire personnalisé. Nos chauffeurs connaissent parfaitement Marrakech et ses alentours, et peuvent vous recommander des restaurants, des boutiques et des sites à découvrir.</p>

<h2>Excursions populaires</h2>
<p>Excursion à Ouarzazate et les studios Atlas, visite d'Essaouira et ses remparts, randonnée dans la vallée de l'Ourika, circuit du Col du Tichka — chaque destination est accessible depuis Marrakech avec notre service de transport privé.</p>`,
    features: ["Véhicules Mercedes et BMW climatisés", "Chauffeur multilingue", "Wi-Fi et chargeurs à bord", "Transferts aéroport", "Excursions personnalisées", "Disponible 24h/24"],
    highlights: ["Véhicules neufs et entretenus", "Chauffeurs professionnels certifiés", "Itinéraires optimisés", "Tarifs transparents sans surprises"],
    metaDescription: "Transport privé à Marrakech : chauffeur, van, SUV. Transferts aéroport, excursions, déplacements. Véhicules de luxe, service 24h/24."
  },
  {
    title: "Van avec Chauffeur",
    slug: "van-avec-chauffeur",
    image: "/images/activities/van-chauffeur.webp",
    category: "Transport",
    price: null,
    priceUnit: "par jour",
    sortOrder: 4,
    description: "Location de van premium avec chauffeur pour vos groupes et familles. Confort, espace et sérénité pour vos déplacements à Marrakech.",
    longDescription: `<h2>Van avec chauffeur à Marrakech : voyagez ensemble</h2>
<p>Pour les familles, les groupes d'amis et les équipes professionnelles, le van avec chauffeur est la solution idéale pour se déplacer à Marrakech. Notre flotte de Mercedes Classe V et Viano offre un confort premium tout en accueillant jusqu'à 7 passagers avec leurs bagages.</p>

<h2>Un confort pensé pour les groupes</h2>
<p>Chaque van est équipé de climatisation individuelle, de prises USB pour chaque siège, de Wi-Fi à bord et d'un système de son de qualité. Les vitres teintées protègent de la chaleur et garantissent l'intimité des passagers. Le coffre spacieux accueille facilement les bagages de 6 à 7 personnes.</p>

<h2>Des chauffeurs experts</h2>
<p>Nos chauffeurs ne sont pas de simples conducteurs. Ils sont vos guides locaux, vos traducteurs et vos conseillers. Ils connaissent les meilleurs itinéraires pour éviter les embouteillages, les meilleurs restaurants pour un déjeuner rapide, et les points de vue les plus photogéniques.</p>

<h2>Cas d'usage</h2>

<h3>Familles avec enfants</h3>
<p>Les familles apprécient particularly l'espace et le confort de nos vans. Les sièges bébé sont fournis sur demande, et les chauffeurs adaptent leur conduite aux plus jeunes.</p>

<h3>Groupes d'amis</h3>
<p>Pour un week-end entre amis, le van est l'option idéale. Vous voyagez ensemble, partagez les frais et profitez d'un chauffeur qui vous emmène partout sans stress.</p>

<h3>Séminaires d'entreprise</h3>
<p>Pour les déplacements d'équipe, nos vans offrent un espace professionnel avec Wi-Fi et prises. Les réunions de travail peuvent même se poursuivre entre deux sites.</p>`,
    features: ["Capacité 7 passagers", "Climatisation individuelle", "Wi-Fi à bord", "Sièges bébé disponibles", "Coffre spacieux", "Vitres teintées"],
    highlights: ["Véhicules Mercedes Classe V récents", "Chauffeurs guides locaux", "Tarifs journaliers avantageux", "Réervation flexible"],
    metaDescription: "Location van avec chauffeur à Marrakech pour familles et groupes. Mercedes Classe V, 7 places, Wi-Fi, clim. Réservez en ligne."
  },
  {
    title: "Votre Bien-Être",
    slug: "votre-bien-etre",
    image: "/images/activities/sonotherapie.webp",
    category: "Bien-être",
    price: null,
    priceUnit: "par séance",
    sortOrder: 5,
    description: "Massages, soins du corps et rituels de bien-être dispensés directement dans votre villa par nos thérapeutes certifiés.",
    longDescription: `<h2>Bien-être à domicile à Marrakech : le luxe de la détente</h2>
<p>Imaginez un massage relaxant au bord de votre piscine, les yeux rivés sur les montagnes de l'Atlas. Notre service de bien-être à domicile vous apporte l'expérience d'un spa de luxe directement dans votre villa. Nos thérapeutes certifiés créent un moment de pur évasion pour votre corps et votre esprit.</p>

<h2>Nos soins</h2>

<h3>Massages</h3>
<p>Massage suédois, massage thai, massage aux huiles essentielles, massage sportif — nos thérapeutes maîtrisent les techniques du monde entier. Chaque séance est personnalisée selon vos besoins : détente musculaire, soulagement des tensions, ou simple plaisir.</p>

<h3>Soins du corps</h3>
<p>Gommage au rhassoul, enveloppement à l'argile rouge, soin à l'huile d'argan — nos soins du corps utilisent les meilleurs produits naturels du Maroc. Le rhassoul, argile volcanique du Moyen Atlas, nettoie et purifie la peau en profondeur.</p>

<h3>Rituels complets</h3>
<p>Le rituel hammam complet : vapeur, gommage au savon noir, massage à l'huile d'argan. Une immersion dans la tradition marocaine du bien-être, dans le confort de votre villa.</p>

<h2>Nos thérapeutes</h2>
<p>Chaque thérapeute est diplômé, certifié et expérimenté. Ils se déplacent avec tout le nécessaire : table de massage, produits, draps, huiles. Il vous suffit de vous allonger et de laisser faire.</p>

<h2>Réservation et disponibilité</h2>
<p>Nos soins sont disponibles 7j/7, de 8h à 22h. Nous recommandons de réserver 24h à l'avance pour garantir la disponibilité de votre thérapeute. Les soins en groupe (pour les mariages, anniversaires) sont également disponibles.</p>`,
    features: ["Massages à domicile", "Soins du corps", "Thérapeutes certifiés", "Produits naturels", "Disponible 7j/7", "Soins en groupe"],
    highlights: ["Expérience spa de luxe en villa", "Produits 100% naturels", "Thérapeutes multilingues", "Rituels marocains authentiques"],
    metaDescription: "Massages et soins de bien-être à domicile à Marrakech. Thérapeutes certifiés, produits naturels, spa en villa. Réservez votre séance."
  },
  {
    title: "Vos Activités",
    slug: "vos-activites",
    image: "/images/activities/quad-buggy.webp",
    category: "Activités",
    price: null,
    priceUnit: null,
    sortOrder: 6,
    description: "Découvrez toutes nos activités et excursions à Marrakech : sports, culture, détente, aventure. Pour tous les goûts et tous les âges.",
    longDescription: `<h2>Activités à Marrakech : une infinité d'expériences</h2>
<p>Marrakech est une ville qui ne manque jamais d'activités à proposer. Des sports d'aventure dans les paysages spectaculaires de la région aux moments de détente dans les hammams les plus raffinés, chaque jour est une nouvelle aventure. Découvrez notre sélection complète d'activités pour rendre votre séjour inoubliable.</p>

<h2>Par catégorie</h2>

<h3>Sports et aventure</h3>
<p>Quad et buggy dans la Palmeraie, parapente au-dessus de l'Atlas, wakeboard sur le lac Lalla Takerkoust, golf sur des parcours d'exception — les amateurs de sensations fortes trouveront leur bonheur. Chaque activité est encadrée par des moniteurs professionnels et des équipements de sécurité fournis.</p>

<h3>Culture et découverte</h3>
<p>Visite guidée de la médina, cours de cuisine marocaine, atelier de zellige, promenade à dos de chameau — plongez dans la culture marocaine à travers des expériences immersives. Nos guides locaux vous font découvrir les trésors cachés de la ville rouge.</p>

<h3>Détente et bien-être</h3>
<p>Hammam traditionnel, yoga dans un riad, séance de sonothérapie, méditation au coucher du soleil — accordez du temps à votre bien-être. Marrakech est la destination idéale pour se ressourcer.</p>

<h3>Excursions</h3>
<p>Vallée de l'Ourika, Cascades d'Ouzoud, désert d'Agafay, ville d'Essaouira — les excursions à journée depuis Marrakech offrent des paysages variés et des expériences culturelles uniques.</p>

<h2>Comment réserver</h2>
<p>La réservation est simple et rapide. Contactez-nous par téléphone, WhatsApp ou formulaire en ligne. Notre équipe vous propose un programme personnalisé adapté à vos envies, votre budget et votre durée de séjour.</p>`,
    features: ["Activités pour tous les âges", "Moniteurs professionnels", "Équipements fournis", "Transferts inclus", "Réservation flexible", "Programmes sur mesure"],
    highlights: ["Plus de 30 activités disponibles", "Excursions dans toute la région", "Tarifs compétitifs", "Satisfaction garantie"],
    metaDescription: "Activités et excursions à Marrakech : quad, parapente, golf, hammam, cours de cuisine. Plus de 30 expériences. Réservez en ligne."
  },
  {
    title: "Quad / Buggy",
    slug: "quad-buggy",
    image: "/images/activities/quad-buggy.webp",
    category: "Sensations fortes",
    price: null,
    priceUnit: "par personne",
    sortOrder: 7,
    description: "Randonnée en quad ou buggy dans la Palmeraie et les paysages désertiques de Marrakech. Sensations garanties pour tous les niveaux.",
    longDescription: `<h2>Quad et Buggy à Marrakech : l'aventure dans la Palmeraie</h2>
<p>Explorez la Palmeraie de Marrakech en quad ou en buggy pour une aventure inoubliable. Les sentiers sinueux entre les palmiers-dattiers, les villages berbères et les plaines arides offrent des paysages variés et une adrénaline garantie. Cette activité est accessible à tous les niveaux, des débutants aux experts.</p>

<h2>Notre flotte de véhicules</h2>

<h3>Quads</h3>
<p>Nos quads Honda et Yamaha sont régulièrement entretenus et équipés de systèmes de sécurité conformes aux normes internationales. Cylindrée de 250cc à 700cc selon le modèle, transmission automatique ou manuelle.</p>

<h3>Buggys</h3>
<p>Pour une expérience plus stable et confortable, nos buggys Can-Am offrent un positionnement sur deux rangées. Idéal pour les couples et les familles qui souhaitent partager l'aventure.</p>

<h2>Les parcours</h2>

<h3>Parcours découverte (1h30)</h3>
<p>Un parcours de 25 km à travers la Palmeraie, adapté aux débutants. Vous traverserez des plantations de palmiers, passerez devant des maisons berbères et découvrirez des paysages typiquement marocains.</p>

<h3>Parcours aventure (3h)</h3>
<p>Un parcours de 60 km qui vous emmènera au-delà de la Palmeraie, dans les contreforts de l'Atlas. Paysages grandioses, vues panoramiques etadrénaline garantie.</p>

<h3>Parcours coucher de soleil (2h)</h3>
<p>Le parcours le plus populaire : décollage en fin d'après-midi pour admirer le coucher de soleil depuis les collines surplombant la Palmeraie. Un moment magique immortalisé par nos photographes.</p>

<h2>Sécurité et encadrement</h2>
<p>Chaque randonnée est encadrée par un guide moniteur certifié. Casque, combinaison et lunettes sont fournis. Un briefing de sécurité est obligatoire avant chaque départ. Assurance incluse.</p>`,
    features: ["Quads et buggys récents", "3 parcours au choix", "Guide moniteur certifié", "Équipement de sécurité fourni", "Assurance incluse", "Photo souvenir possible"],
    highlights: ["Parcours à travers la Palmeraie", "Coucher de soleil en plein air", "Accessible aux débutants", "ADRÉNALINE garantie"],
    metaDescription: "Location quad et buggy à Marrakech dans la Palmeraie. 3 parcours, guide inclus, équipement fourni. Sensations fortes garanties. Réservez."
  },
  {
    title: "Montgolfière à Marrakech",
    slug: "montgolfiere",
    image: "/images/activities/montgolfiere.webp",
    category: "Expérience unique",
    price: null,
    priceUnit: "par personne",
    sortOrder: 8,
    description: "Vol en montgolfière au lever du soleil au-dessus de Marrakech et de l'Atlas. Une expérience magique et inoubliable.",
    longDescription: `<h2>Vol en montgolfière à Marrakech : une expérience unique</h2>
<p>Envolez-vous au lever du soleil dans une montgolfière colorée et découvrez Marrakech et les montagnes de l'Atlas depuis les airs. Cette expérience unique offre un panorama à 360° sur la ville rouge, la Palmeraie et les sommets enneigés de l'Atlas. Un moment de pur émerveillement qui restera gravé dans votre mémoire.</p>

<h2>Le déroulement du vol</h2>

<h3>Le rassemblement</h3>
<p>Rendez-vous à l'aube au lieu de décollage, situé dans la Palmeraie. Un petit-déjeuner marocain traditionnel est servi pendant que les équipes préparent les montgolières. Thé à la menthe, jus d'orange frais, msemmen et msemen — le festival de saveurs commence avant même le décollage.</p>

<h3>Le vol</h3>
<p>Le vol dure environ une heure. Le ballon s'élève doucement, offrant une vue progressive sur le paysage. À 300 mètres d'altitude, vous admirerez la ville de Marrakech dans toute sa splendeur, avec la Koutoubia, les toits ocre de la médina et la Palmeraie s'étendant à perte de vue. Les montagnes de l'Atlas, parfois enneigées, forment un décor grandiose.</p>

<h3>L'atterrissage</h3>
<p>L'atterrissage se fait en douceur dans un champ de la Palmeraie. Un petit-déjeuner champêtre vous attend avec champagne, jus de fruits et pâtisseries marocaines. Un certificat de vol est remis à chaque passager.</p>

<h2>Conditions et réservation</h2>
<p>Les vols ont lieu tous les matins, sauf en cas de vent fort ou de mauvaise météo. La réservation est obligatoire et nous recommandons de réserver au moins 48h à l'avance. Les enfants à partir de 6 ans sont acceptés. L'expérience est possible toute l'année grâce au climat ensoleillé de Marrakech.</p>`,
    features: ["Vol d'environ 1 heure", "Petit-déjeuner inclus", "Vue sur l'Atlas", "Certificat de vol", "Photographe à bord", "Champagne au retour"],
    highlights: ["Expérience au lever du soleil", "Panorama 360° sur Marrakech", "Vue sur les sommets enneigés", "Souvenir inoubliable"],
    metaDescription: "Vol en montgolfière à Marrakech au lever du soleil. Vue sur l'Atlas et la Palmeraie. Petit-déjeuner inclus. Réservez votre vol."
  },
  {
    title: "Wakeboard à Marrakech",
    slug: "wakeboard-marrakech",
    image: "/images/activities/wakeboard.jpg",
    category: "Sports nautiques",
    price: null,
    priceUnit: "par séance",
    sortOrder: 9,
    description: "Pratiquez le wakeboard sur le lac Lalla Takerkoust, à 30 minutes de Marrakech. Eaux cristallines et paysages montagneux garantis.",
    longDescription: `<h2>Wakeboard à Marrakech : glisse sur l'eau</h2>
<p>Le lac Lalla Takerkoust, à seulement 30 minutes de Marrakech, est le terrain de jeu idéal pour les amateurs de sports nautiques. Notre service de wakeboard vous propose des séances encadrées par des moniteurs professionnels, sur un plan d'eau calme avec vue sur les montagnes de l'Atlas.</p>

<h2>Le wakeboard, c'est quoi ?</h2>
<p>Le wakeboard est un sport nautique qui combine la glisse du snowboard et la voltige du water-ski. Attaché à une planche, vous êtes tracté par un bateau à une vitesse de 30 à 40 km/h et vous effectuez des figures sur la vague créée par le bateau. C'est un sport accessible dès le premier essai, même pour les débutants.</p>

<h2>Nos formules</h2>

<h3>Séance découverte (1h)</h3>
<p>Un moniteur dédié vous apprend les bases du wakeboard : position, équilibre, premiers virages. En 1 heure, la plupart des débutants parviennent à se tenir debout et à glisser. Équipement complet fourni.</p>

<h3>Séance confirmé (1h30)</h3>
<p>Pour ceux qui ont déjà fait du wakeboard, cette séance vous permet de perfectionner vos figures et de découvrir de nouveaux tricks. Le bateau est équipé d'un câble pour les figures en air.</p>

<h3>Séance privée (2h)</h3>
<p>Pour les组groupes, une séance privée avec bateau dédié et moniteur. Idéal pour les anniversaires, les sorties d'équipe ou simplement pour passer un bon moment entre amis.</p>

<h2>Équipement et sécurité</h2>
<p>Tout l'équipement est fourni : planche, gilet de sauvetage, casque, combinaison néoprène. Les moniteurs sont certifiés et expérimentés. Un briefing de sécurité est dispensé avant chaque séance.</p>`,
    features: ["Moniteur certifié", "Équipement fourni", "Lac Lalla Takerkoust", "Pour tous niveaux", "Eau calme", "Vue sur l'Atlas"],
    highlights: ["Plan d'eau cristallin à 30 min de Marrakech", "Moniteurs francophones", "Équipement neuf", "Ambiance festive"],
    metaDescription: "Wakeboard à Marrakech sur le lac Lalla Takerkoust. Moniteur inclus, tous niveaux. Séances privées et组groupes. Réservez."
  },
  {
    title: "Excursions VTT",
    slug: "vtt",
    image: "/images/activities/vtt.webp",
    category: "Aventure",
    price: null,
    priceUnit: "par personne",
    sortOrder: 10,
    description: "Randonnées en VTT dans les paysages spectaculaires autour de Marrakech. De la Palmeraie aux contreforts de l'Atlas.",
    longDescription: `<h2>VTT à Marrakech : aventure sur deux roues</h2>
<p>Pour les amateurs de sport et de nature, le VTT est la meilleure façon de découvrir les paysages variés autour de Marrakech. Des plaines de la Palmeraie aux sentiers accidentés de l'Atlas, chaque parcours offre un mélange unique de challenges et de belles découvertes.</p>

<h2>Nos parcours</h2>

<h3>Parcours Palmeraie (2h)</h3>
<p>Un parcours accessible à tous qui traverse les plantations de palmiers de la Palmeraie. Sentiers ombragés, villages berbères et points de vue sur la ville. Parfait pour les familles et les débutants.</p>

<h3>Parcours Ourika (3h30)</h3>
<p>Un parcours plus technique qui emmène les cyclistes dans la vallée de l'Ourika. Descentes techniques, ascensions sportives et paysages grandioses avec vue sur les montagnes de l'Atlas. Niveau intermédiaire requis.</p>

<h3>Parcours Atlas (Journée)</h3>
<p>Pour les cyclistes expérimentés, un parcours de journée qui vous emmène dans les villages berbères perchés des contreforts de l'Atlas. Départ à l'aube, retour au coucher du soleil. Pique-nique inclus dans un village typique.</p>

<h2>Vélos et équipement</h2>
<p>Nous proposons des vélos VTT de marque Giant et Trek, en taille adulte et enfant. Casque, gants et gilet sont fournis. Les vélos sont entretenus et vérifiés avant chaque sortie.</p>

<h2>Encadrement</h2>
<p>Chaque sortie est encadrée par un guide local passionné qui connaît parfaitement les sentiers et les paysages. Il adapte le rythme au niveau du groupe et partage ses connaissances sur la faune, la flore et la culture locale.</p>`,
    features: ["Vélos Giant et Trek", "Parcours tous niveaux", "Guide local", "Équipement fourni", "Pique-nique inclus", "Eau et snacks"],
    highlights: ["Palmeraie, Ourika, Atlas", "Paysages variés", "Accessible aux débutants", "Encadrement professionnel"],
    metaDescription: "Randonnée VTT à Marrakech : Palmeraie, Ourika, Atlas. Vélos fournis, guide inclus. Parcours tous niveaux. Réservez."
  },
  {
    title: "Grand Canyon de Marrakech",
    slug: "terres-d-amanar-polo-berbere-babyfoot-humain-tyrolienne-accrobranche",
    image: "/images/activities/grand-canyon.webp",
    category: "Aventure",
    price: null,
    priceUnit: "par personne",
    sortOrder: 11,
    description: "Parapente, tyrolienne et accrobranche dans les Terres d'Amanar, le Grand Canyon de Marrakech. Aventure garantie.",
    longDescription: `<h2>Terres d'Amanar : le Grand Canyon de Marrakech</h2>
<p>À 45 minutes de Marrakech, les Terres d'Amanar offrent un terrain d'aventure exceptionnel au cœur d'un paysage de canyons et de vallées. Parapente, tyrolienne, accrobranche et polo berbère — une journée complète d'aventure dans un cadre naturel unique.</p>

<h2>Les activités</h2>

<h3>Parapente</h3>
<p>Envolez-vous au-dessus des canyons des Terres d'Amanar pour un vol en tandem de 15 à 20 minutes. Les panoramas sur les montagnes et les vallées sont à couper le souffle. Décollage depuis un point culminant, atterrissage dans la vallée.</p>

<h3>Tyrolienne géante</h3>
<p>Une tyrolienne de 400 mètres qui traverse une vallée profonde. Suspense et adrénaline garantis à 100 mètres au-dessus du vide. Équipement complet fourni, encadrement par des moniteurs certifiés.</p>

<h3>Accrobranche</h3>
<p>Un parcours dans les arbres avec ponts suspendus, tyroliennes courtes et obstacles. Adapté aux enfants (à partir de 6 ans) et aux adultes, le parcours offre des défis pour tous les niveaux.</p>

<h3>Polo berbère</h3>
<p>Une initiation au polo sur des poneys berbères, dans un terrain naturel au pied des montagnes. Un sport peu connu mais très amusant, accessible à tous.</p>

<h2>La journée type</h2>
<p>Un transfert depuis Marrakech au petit matin, un accueil avec thé à la menthe, puis une rotation entre les activités. Déjeuner buffet marocain inclus dans un cadre naturel exceptionnel. Retour à Marrakech en fin d'après-midi.</p>`,
    features: ["Parapente en tandem", "Tyrolienne 400m", "Accrobranche", "Polo berbère", "Déjeuner inclus", "Transferts aller-retour"],
    highlights: ["Cadre naturel exceptionnel", "Activités pour tous les âges", "Moniteurs certifiés", "Journée complète d'aventure"],
    metaDescription: "Parapente, tyrolienne et accrobranche aux Terres d'Amanar, Grand Canyon de Marrakech. Journée aventure complète. Réservez."
  },
  {
    title: "Golf à Marrakech",
    slug: "golf-1",
    image: "/images/activities/golf.webp",
    category: "Sport",
    price: null,
    priceUnit: "par tour",
    sortOrder: 12,
    description: "Jouez au golf sur les meilleurs parcours de Marrakech. Parcours d'exception avec vue sur l'Atlas, ouverts toute l'année.",
    longDescription: `<h2>Golf à Marrakech : jouez sous le soleil</h2>
<p>Marrakech est une destination de golf de premier plan, avec plusieurs parcours d'exception conçus par des architectes de renommée internationale. Le climat ensoleillé permet de jouer toute l'année, et les paysages avec vue sur l'Atlas rendent chaque partie mémorable. Que vous soyez débutant ou confirmé, les parcours de Marrakech sauront vous satisfaire.</p>

<h2>Nos parcours recommandés</h2>

<h3>Royal Golf Marrakech</h3>
<p>Le parcours le plus prestigieux de Marrakech, conçu par le champion Robert Haggin Jones en 1927. 18 trous parmi les oliviers centenaires et les orangers, avec vue sur la Koutoubia et les montagnes de l'Atlas. Un classique intemporel.</p>

<h3>Amelkis Golf Club</h3>
<p>Un parcours moderne de 27 trous, dont un 9 trous nocturne éclairé. Concept original qui permet de jouer même en été quand les températures sont élevées. Clubhouse de luxe et restaurant gastronomique.</p>

<h3>Al Maaden Golf Resort</h3>
<p>Un parcours de 18 trous conçu par Kyle Phillips, avec des obstacles naturels et des panoramas exceptionnels. Le resort propose également un hôtel 5 étoiles, un spa et des restaurants.</p>

<h2>Nos forfaits</h2>
<p>Green fee, location de clubs, buggy, leçon avec un pro, transferts depuis votre villa — nous combinons tout pour vous offrir une expérience golf complète. Les tarifs varient selon le parcours et la période.</p>

<h2>Leçons de golf</h2>
<p>Nos pros certifiés PGA donnent des leçons pour tous les niveaux, du débutant au confirmé. Cours individuels ou en groupe, en français ou en anglais. Les enfants sont les bienvenus.</p>`,
    features: ["3 parcours d'exception", "Green fee et buggy", "Location de clubs", "Leçons avec pro PGA", "Transferts inclus", "Ouvert toute l'année"],
    highlights: ["Vue sur les montagnes de l'Atlas", "Climat ensoleillé", "Parcours conçus par des champions", "Clubhouse et restaurant"],
    metaDescription: "Golf à Marrakech : Royal Golf, Amelkis, Al Maaden. Parcours d'exception, leçons pro, transferts. Réservez votre partie."
  },
  {
    title: "Désert Sensation",
    slug: "desert-sensation",
    image: "/images/activities/desert-sensation.webp",
    category: "Aventure",
    price: null,
    priceUnit: "par personne",
    sortOrder: 13,
    description: "Excursion dans le désert d'Agafay et d'Ouarzazate. Bivouac sous les étoiles, balade en dromadaire et coucher de soleil magique.",
    longDescription: `<h2>Excursion dans le désert depuis Marrakech</h2>
<p>Le désert est à portée de main depuis Marrakech. Notre excursion « Désert Sensation » vous emmène dans les paysages lunaires du désert d'Agafay, à seulement 40 minutes de la ville, ou dans le grand désert de Ouarzazate à 4 heures. Bivouac sous les étoiles, balade en dromadaire et coucher de soleil inoubliable.</p>

<h2>Nos formules</h2>

<h3>Demi-journée — Agafay</h3>
<p>Un après-midi dans le désert d'Agafay : balade en 4x4 dans les paysages rocheux, thé à la menthe au coucher du soleil et retour à Marrakech. Parfait pour ceux qui ont peu de temps mais veulent vivre l'expérience désert.</p>

<h3>Journée complète — Agafay</h3>
<p>Journée complète avec déjeuner, balade en dromadaire, quad dans le désert et coucher de soleil magique. Retour en fin de journée à Marrakech.</p>

<h3>Nuit en bivouac — Agafay</h3>
<p>La formule la plus populaire : une nuit dans un camp de luxe au cœur du désert d'Agafay. Tentes berbères confortables, dîner sous les étoiles, musique traditionnelle et petit-déjeuner au lever du soleil.</p>

<h3>Excursion Ouarzazate — 2 jours</h3>
<p>Pour une immersion totale, l'excursion de 2 jours vous emmène à travers le Col du Tichka, les Studios Atlas et la citadelle de Aït Benhaddou. Nuit dans un riad de charme à Ouarzazate, retour le lendemain.</p>

<h2>Ce qui est inclus</h2>
<p>Transferts en 4x4, guide francophone, repas, boissons, tentes et couchage. Tout est inclus pour une expérience sans tracas.</p>`,
    features: ["Transferts 4x4 inclus", "Guide francophone", "Bivouac de luxe", "Repas inclus", "Balade dromadaire", "Coucher de soleil"],
    highlights: ["Désert d'Agafay à 40 min", "Nuit sous les étoiles", "Paysages lunaires", "Camp de luxe"],
    metaDescription: "Excursion désert depuis Marrakech : Agafay, Ouarzazate. Bivouac, dromadaire, coucher de soleil. Demi-journée ou nuit. Réservez."
  },
  {
    title: "Visites & Découvertes",
    slug: "visites-decouvertes",
    image: "/images/activities/visites-decouvertes.webp",
    category: "Culture",
    price: null,
    priceUnit: "par personne",
    sortOrder: 14,
    description: "Visites guidées de la médina, palais, jardins et sites historiques de Marrakech avec des guides experts passionnés.",
    longDescription: `<h2>Visites guidées de Marrakech : découvrez la ville rouge</h2>
<p>Marrakech est une ville au riche patrimoine historique et culturel. Nos visites guidées vous font découvrir les trésors de la médina, les palais somptueux, les jardins luxuriants et les quartiers authentiques. Nos guides experts passionnés partagent leurs connaissances avec enthousiasme et pédagogie.</p>

<h2>Nos visites</h2>

<h3>Visite classique de la médina (3h)</h3>
<p>La visite incontournable : la place Jemaa el-Fna, les souks, le palais Bahia, la Koutoubia et les Tombeaux Saadiens. Une immersion totale dans l'histoire et la culture de Marrakech. Guide francophone, groupe limité à 8 personnes.</p>

<h3>Visite des jardins (2h30)</h3>
<p>Le Jardin Majorelle, le Jardin de la Ménara et le Jardin Secret : trois havres de paix au cœur de la ville. Découvrez l'histoire de ces jardins exceptionnels et leur végétation exotique.</p>

<h3>Visite gastronomique (4h)</h3>
<p>Une visite qui éveille les papilles : marché des épices, dégustation de jus d'orange frais, cours de cuisine dans un riad, déjeuner dans un restaurant local. Pour les vrais gourmands.</p>

<h3>Visite atelier d'artisans (3h)</h3>
<p>Découvrez les métiers d'art de la médina : tapisseries, zellige, argenterie, cuir. Visitez les ateliers d'artisans et assistez à la création de pièces d'exception.</p>

<h2>Nos guides</h2>
<p>Tous nos guides sont certifiés par le Ministère du Tourisme, francophones et passionnés par leur ville. Ils adaptemples de visite au rythme et aux intérêts de chaque groupe.</p>`,
    features: ["Guides certifiés", "Visites en français", "Groupes petit format", "Thématiques variées", "Accès prioritaire", "Adapté aux familles"],
    highlights: ["Medina, palais, jardins", "Visite gastronomique", "Ateliers d'artisans", "Guides passionnés"],
    metaDescription: "Visites guidées de Marrakech : médina, palais, jardins, gastronomie. Guides certifiés, groupes petits. Réservez votre visite."
  },
  {
    title: "Équitation",
    slug: "equitation",
    image: "/images/activities/equitation.webp",
    category: "Nature",
    price: null,
    priceUnit: "par personne",
    sortOrder: 15,
    description: "Balade à cheval dans la Palmeraie et les environs de Marrakech. Équitation de loisir pour tous les niveaux.",
    longDescription: `<h2>Équitation à Marrakech : chevauchée dans la Palmeraie</h2>
<p>L'équitation est une tradition ancienne au Maroc, et la Palmeraie de Marrakech est le cadre idéal pour une balade à cheval. Nos chevaux et poneys bien dressés vous emmènent à travers les plantations de palmiers, les villages berbères et les sentiers ombragés. Une expérience accessible à tous, des débutants aux cavaliers confirmés.</p>

<h2>Nos balades</h2>

<h3>Balade découverte (1h30)</h3>
<p>Un parcours de 7 km à travers la Palmeraie, adapté aux débutants. Les guides adaptent le rythme au niveau de chaque cavalier. Vous traverserez des villages, passerez devant des champs et découvrirez des panoramas sur la ville.</p>

<h3>Balade coucher de soleil (2h)</h3>
<p>Le moment le plus magique : chevaucher au coucher du soleil dans la Palmeraie. La lumière dorée, les palmiers se découpant sur le ciel coloré, le chant des oiseaux — une expérience sensorielle unique.</p>

<h3>Balade longue (demi-journée)</h3>
<p>Pour les cavaliers plus expérimentés, une balade de 3 à 4 heures qui vous emmène au-delà de la Palmeraie, dans les collines surplombant la ville. Pique-nique inclus dans un cadre naturel exceptionnel.</p>

<h2>Nos chevaux</h2>
<p>Nos chevaux sont de race arabe et barbe, parfaitement dressés et bien entretenus. Les tailleurs de selle vérifient l'adéquation entre le cavalier et son mont avant chaque sortie. Équipement de sécurité fourni : casque, gilet.</p>`,
    features: ["Chevaux arabes et barbes", "Guide cavalier", "Équipement fourni", "Tous niveaux", "Coucher de soleil", "Pique-nique possible"],
    highlights: ["Palmeraie de Marrakech", "Balade au coucher du soleil", "Chevaux bien dressés", "Cadre paradisiaque"],
    metaDescription: "Équitation à Marrakech : balade à cheval dans la Palmeraie. Tous niveaux, coucher de soleil. Réservez votre chevauchée."
  },
  {
    title: "Yoga et Pilates",
    slug: "yoga-et-pilates",
    image: "/images/activities/yoga-pilates.webp",
    category: "Bien-être",
    price: null,
    priceUnit: "par séance",
    sortOrder: 16,
    description: "Cours de yoga et pilates en villa, en riad ou en extérieur. Profitez du cadre exceptionnel de Marrakech pour votre pratique.",
    longDescription: `<h2>Yoga et Pilates à Marrakech : practice dans un cadre exceptionnel</h2>
<p>Marrakech offre un cadre incomparable pour pratiquer le yoga et le pilates. Le soleil, les jardins luxuriants et les vues sur l'Atlas créent une atmosphère propice à la détente et à la méditation. Nos instructeurs certifiés vous accompagnent dans votre pratique, que vous soyez débutant ou expérimenté.</p>

<h2>Nos cours</h2>

<h3>Yoga vinyasa</h3>
<p>Un cours dynamique qui lie mouvement et respiration. Les séquences fluides renforcent le corps tout en apaisant l'esprit. Parfait pour commencer la journée en pleine forme.</p>

<h3>Yoga yin</h3>
<p>Un cours lent et profond qui cible les tissus conjonctifs et les articulations. Les postures sont maintenues 3 à 5 minutes, permettant une libération des tensions profondes. Idéal en fin de journée.</p>

<h3>Pilates</h3>
<p>Renforcement musculaire, gainage, posture — le pilates travaille le corps en profondeur sans impact. Nos instructeurs adaptent les exercises à chaque participant.</p>

<h3>Méditation</h3>
<p>Séances de méditation guidée au lever ou au coucher du soleil. Techniques de pleine conscience, respiration consciente et visualisation pour un esprit apaisé.</p>

<h2>Les lieux de practice</h2>
<p>Nos cours ont lieu dans des cadres exceptionnels : terrasse de riad avec vue sur les toits de la médina, jardin de villa avec piscine, ou toit-terrasse avec panorama sur l'Atlas. Le lieu est choisi en fonction de vos préférences et de la météo.</p>`,
    features: ["Instructeurs certifiés", "Tous niveaux", "Vinyasa, Yin, Pilates", "Méditation", "Cadres d'exception", "Cours privés ou collectifs"],
    highlights: ["Yoga au coucher du soleil", "Vue sur l'Atlas", "Instructeurs francophones", "Équipement fourni"],
    metaDescription: "Cours de yoga et pilates à Marrakech. En villa, riad ou extérieur. Tous niveaux, instructeurs certifiés. Réservez votre séance."
  },
  {
    title: "Aqua Karting",
    slug: "aqua-karting",
    image: "/images/activities/aqua-karting.webp",
    category: "Famille",
    price: null,
    priceUnit: "par personne",
    sortOrder: 17,
    description: "Aqua karting : le karting sur l'eau ! Une activité ludique et originale pour toute la famille à Marrakech.",
    longDescription: `<h2>Aqua Karting à Marrakech : le karting sur l'eau</h2>
<p>L'aqua karting est une activité révolutionnaire qui combine le karting et la glisse sur l'eau. Sur un karting gonflable équipé d'un propulseur, vous glissez sur la surface d'un bassin en tentant de marquer des buts. Une activité ludique, originale et rafraîchissante, idéale pour les familles et les groupes d'amis.</p>

<h2>Comment ça marche</h2>
<p>Les participants s'installent sur des kartings gonflables équipés de propulseurs à hélice. L'objectif : marquer des buts dans les portails disposés sur l'eau. La vitesse et la maniabilité des kartings créent une compétition amusante et accessible à tous.</p>

<h2>Pour qui ?</h2>
<p>L'aqua karting est accessible aux enfants dès 6 ans (avec un karting adapté) et aux adultes. C'est une activité qui ne nécessite aucune compétence particulière, juste l'envie de s'amuser. Les groupes de 4 à 12 personnes peuvent jouer en même temps.</p>

<h2>L'expérience</h2>
<p>Une séance dure environ 30 minutes, avec briefing de sécurité inclus. Les combinaisons et gilets de sauvetage sont fournis. L'activité a lieu dans un bassin sécurisé, surveillé par un maître-nageur.</p>

<h2>Pourquoi c'est populaire</h2>
<p>L'aqua karting est l'une des activités les plus demandées par les familles à Marrakech. C'est original, amusant, rafraîchissant et accessible à tous. Les enfants adorent, et les adultes aussi !</p>`,
    features: ["Accessible dès 6 ans", "Équipement fourni", "Maître-nageur", "Séance 30 min", "Groupes 4-12 personnes", "Activité rafraîchissante"],
    highlights: ["Activité originale et ludique", "Pour toute la famille", "Aucune compétence requise", "Amusement garanti"],
    metaDescription: "Aqua karting à Marrakech : karting sur l'eau pour toute la famille. Activité ludique et rafraîchissante. Réservez."
  },
  {
    title: "Karting",
    slug: "karting",
    image: "/images/activities/karting.webp",
    category: "Sensations fortes",
    price: null,
    priceUnit: "par course",
    sortOrder: 18,
    description: "Karting professionnel à Marrakech. Piste homologuée, karts performants et ambiance de compétition pour les amateurs de vitesse.",
    longDescription: `<h2>Karting à Marrakech : la vitesse en toute sécurité</h2>
<p>Pour les amateurs de sensations et de vitesse, le karting de Marrakech offre une piste homologuée et des karts performants. Que vous soyez débutant ou confirmé, la piste technique avec ses virages serrés et ses lignes droites rapides vous offrira des moments d'adrénaline.</p>

<h2>La piste</h2>
<p>Notre piste de 800 mètres est conçue selon les normes internationales. Virages techniques, lignes droites rapides et zones de freinage stratégiques rendent chaque course passionnante. La piste est éclairée pour les sessions en soirée.</p>

<h2>Les karts</h2>
<p>Nous proposons différentes catégories de karts selon l'âge et l'expérience : karts enfants (6-12 ans, 50cc), karts juniors (12-16 ans, 125cc) et karts adultes (165cc et 270cc). Tous les karts sont entretenus et vérifiés avant chaque session.</p>

<h2>Les formules</h2>

<h3>Course libre</h3>
<p>Une session de 10 ou 15 minutes en libre-service. Vous partagez la piste avec les autres pilotes et vous battez votre propre record.</p>

<h3>Course chronométrée</h3>
<p>Une session chronométrée avec timing à chaque tour. Le meilleur tour est affiché sur un écran géant. Pour les compétiteurs !</p>

<h3>Grand Prix privé</h3>
<p>Pour les组groupes, un Grand Prix avec cérémonie de remise des prix, podium et champagne. L'expérience karting ultime pour les anniversaires et team buildings.</p>`,
    features: ["Piste 800m homologuée", "Karts 50cc à 270cc", "Sessions de 10-15 min", "Grand Prix privé", "Éclairage nocturne", "Équipement sécurité"],
    highlights: ["Piste technique et rapide", "Karts performants", "Ambiance de compétition", "Podium et prix"],
    metaDescription: "Karting à Marrakech : piste 800m, karts performants, Grand Prix privé. Sessions libres et chronométrées. Réservez."
  },
  {
    title: "Paintball",
    slug: "paintball",
    image: "/images/activities/paintball.webp",
    category: "Team building",
    price: null,
    priceUnit: "par personne",
    sortOrder: 19,
    description: "Paintball en plein air dans un terrain aménagé à Marrakech. Team building, anniversaire ou sortie entre amis.",
    longDescription: `<h2>Paintball à Marrakech : affrontez-vous en plein air</h2>
<p>Le paintball est l'activité idéale pour les组groupes à la recherche de sensations et de convivialité. Notre terrain en plein air, aménagé avec des obstacles naturels et artificiels, offre un cadre exceptionnel pour des affrontements stratégiques et amusants.</p>

<h2>Le terrain</h2>
<p>Notre terrain de 5000m² est aménagé dans un espace naturel avec arbres, tombereaux, barrages en pneus et fortifications. Les différentes zones créent des scénarios variés : capture du drapeau, défense de position, élimination totale.</p>

<h2>Les équipements</h2>
<p>Chaque participant reçoit un ensemble complet : marqueur paintball, masque de protection, combinaison camouflage, gilet protecteur et gants. Les marqueurs sont des markers de qualité (Tippmann ou equiv.), régulièrement entretenus.</p>

<h2>Les scénarios</h2>

<h3>Classique</h3>
<p>Deux équipes s'affrontent dans une série de manches. Le but est d'éliminer les adversaires en les touchant avec des balles de paintball. Manches rapides et intenses.</p>

<h3>Capture du drapeau</h3>
<p>Chaque équipe doit protéger son drapeau tout en tentant de capturer celui de l'adversaire. Stratégie et coordination d'équipe sont essentielles.</p>

<h3>Zombie</h3>
<p>Un joueur est « zombie » et les autres doivent survivre. Si le zombie touche un joueur, ce dernier devient zombie à son tour. Le dernier survivant gagne !</p>

<h2>Pour les组groupes</h2>
<p>Le paintball est l'activité de team building par excellence. Les组groupes de 10 à 30 personnes s'affrontent dans une ambiance conviviale et sportive. Organisations sur mesure pour les entreprises.</p>`,
    features: ["Terrain 5000m² en plein air", "Équipement complet", "Moniteur dédié", "Plusieurs scénarios", "Groupes 10-30 personnes", "Adapté aux组groupes"],
    highlights: ["Cadre naturel aménagé", "Équipement de qualité", "Scénarios variés", "Fun et convivial"],
    metaDescription: "Paintball à Marrakech en plein air. Terrain 5000m², équipement fourni,组groupes 10-30 personnes. Team building et anniversaires. Réservez."
  },
  {
    title: "Side Car Vintage",
    slug: "side-car-vintage",
    image: "/images/activities/side-car.webp",
    category: "Expérience unique",
    price: null,
    priceUnit: "par personne",
    sortOrder: 20,
    description: "Explorez Marrakech à bord d'un side-car vintage des années 50. Une expérience rétro et romantique dans la ville rouge.",
    longDescription: `<h2>Side Car Vintage à Marrakech : le charme rétro</h2>
<p>Remontez le temps à bord d'un side-car des années 50 et explorez Marrakech comme un explorateur d'antan. Le passager est installé dans une nacelle ouverte, offrant une vue unique et panoramique sur la ville. Le conducteur guide le side-car à travers les ruelles de la médina, les avenues modernes de Guéliz et les routes panoramiques de la Palmeraie.</p>

<h2>Le side-car</h2>
<p>Nos side-cars sont des modèles d'époque (Morini, Jawa ou BMW) magnifiquement restaurés et parfaitement entretenus. Le moteur ronronne doucement, la nacelle est spacieuse et confortable, et un casque vintage vous est fourni.</p>

<h2>Les parcours</h2>

<h3>Parcours médina (2h)</h3>
<p>Un tour complet de la médina et de ses monuments : Koutoubia, Bahia, souks, Jemaa el-Fna. Le side-car se faufile dans les ruelles étroites, offrant des perspectives inédites sur l'architecture traditionnelle.</p>

<h3>Parcours Palmeraie (3h)</h3>
<p>Un tour de la Palmeraie avec arrêts dans les villages berbères et les jardins. Le side-car roule à travers les plantations de palmiers, offrant un voyage sensoriel unique.</p>

<h3>Parcour coucher de soleil (2h30)</h3>
<p>Le parcours le plus romantique : décollage en fin d'après-midi, le side-car vous emmène sur les collines surplombant la ville pour admirer le coucher de soleil. Moment magique garanti.</p>

<h2>Pour qui ?</h2>
<p>Le side-car est une expérience pour tous : couples en quête de romance, familles curieuses, amis aventuriers. Le passager n'a aucune responsabilité — il profite simplement du voyage et du paysage.</p>`,
    features: ["Side-cars d'époque restaurés", "Casque vintage fourni", "Parcours médina, Palmeraie", "Guide conducteur", "Coucher de soleil", "Expérience photo"],
    highlights: ["Expérience rétro unique", "Vue panoramique en nacelle", "Romantique et authentique", "Souvenirs photo inoubliables"],
    metaDescription: "Side-car vintage à Marrakech : explorez la ville rouge dans un side-car des années 50. Expérience rétro et romantique. Réservez."
  },
  {
    title: "Jet Ski",
    slug: "jet-ski",
    image: "/images/activities/jet-ski.webp",
    category: "Sports nautiques",
    price: null,
    priceUnit: "par heure",
    sortOrder: 21,
    description: "Jet ski sur le lac Lalla Takerkoust, à 30 minutes de Marrakech. Glisse et vitesse sur des eaux cristallines.",
    longDescription: `<h2>Jet Ski à Marrakech : vitesse sur l'eau</h2>
<p>Le lac Lalla Takerkoust, à 30 minutes de Marrakech, est le terrain de jeu idéal pour les amateurs de jet ski. Les eaux calmes et cristallines, encadrées par les montagnes de l'Atlas, offrent un cadre exceptionnel pour la glisse et la vitesse.</p>

<h2>Nos jet skis</h2>
<p>Nous proposons des jet skis Yamaha et Sea-Doo de dernière génération, régulièrement entretenus et vérifiés. Modèles biplaces pour les débutants et modèles monoplaces pour les confirmés.</p>

<h2>Les formules</h2>

<h3>Location libre (1h)</h3>
<p>Vous louez un jet ski pour 1h et profitez du lac en libre-service. Un briefing de sécurité et une démonstration sont inclus avant le départ.</p>

<h3>Location avec moniteur (1h)</h3>
<p>Un moniteur vous accompagne sur un second jet ski et vous guide dans les meilleurs spots du lac. Parfait pour les débutants ou ceux qui veulent découvrir les zones les plus intéressantes.</p>

<h3>Location demi-journée (3h)</h3>
<p>Pour les passionnés, 3h de glisse avec pause goûter au bord du lac. Tarif dégressif inclus.</p>

<h2>Sécurité</h2>
<p>Chaque participant reçoit un gilet de sauvetage et un briefing de sécurité obligatoire. La vitesse est limitée dans certaines zones du lac pour garantir la sécurité de tous. Un maître-nageur surveille les activités.</p>`,
    features: ["Jet skis Yamaha et Sea-Doo", "Biplaces et monoplaces", "Briefing sécurité inclus", "Moniteur disponible", "Gilet de sauvetage", "Lac cristallin"],
    highlights: ["Lac Lalla Takerkoust à 30 min", "Eaux calmes et cristallines", "Vue sur l'Atlas", "Équipements récents"],
    metaDescription: "Jet ski à Marrakech sur le lac Lalla Takerkoust. Location libre ou avec moniteur. Yamaha et Sea-Doo. Réservez."
  },
  {
    title: "Sonothérapie",
    slug: "sonographie",
    image: "/images/activities/sonotherapie.webp",
    category: "Bien-être",
    price: null,
    priceUnit: "par séance",
    sortOrder: 22,
    description: "Séance de sonothérapie avec bols tibétains et instruments ancestraux. Une expérience de relaxation profonde à Marrakech.",
    longDescription: `<h2>Sonothérapie à Marrakech : harmonie et relaxation</h2>
<p>La sonothérapie est une technique de relaxation utilisant les vibrations sonores des bols tibétains, des gongs et d'autres instruments ancestraux pour apaiser le corps et l'esprit. À Marrakech, dans un riad ou une villa, cette expérience prend une dimension encore plus magique grâce au silence de la médina et à l'ambiance mystique de la ville.</p>

<h2>Comment ça marche</h2>
<p>Les bols tibétains émettent des fréquences sonores qui résonnent dans le corps. Ces vibrations provoquent un état de relaxation profonde, réduisent le stress, améliorent la concentration et favorisent le sommeil. La séance se déroule allongé, les yeux fermés, tandis que le thérapeute fait résonner les bols autour du participant.</p>

<h2>Types de séances</h2>

<h3>Séance individuelle (1h)</h3>
<p>Une séance personnalisée avec un thérapeute dédié. Le thérapeute sélectionne les bols et les fréquences en fonction de vos besoins spécifiques : relaxation, concentration, sommeil, gestion du stress.</p>

<h3>Séance collective (1h30)</h3>
<p>Une séance en groupe (2 à 8 personnes) dans un cadre exceptionnel : toit-terrasse avec vue sur l'Atlas, jardin de riad, ou salon traditionnel. L'énergie du groupe amplifie l'expérience.</p>

<h3>Séance méditative (2h)</h3>
<p>Une séance prolongée combinant méditation guidée et sonothérapie. Les participants apprennent des techniques de méditation简单es avant de plonger dans l'expérience sonore.</p>

<h2>Les bénéfices</h2>
<p>Réduction du stress et de l'anxiété, amélioration de la qualité du sommeil, renforcement de la concentration, libération des tensions musculaires, équilibre émotionnel. La sonothérapie est un complément idéal à un séjour de bien-être à Marrakech.</p>`,
    features: ["Bols tibétains authentiques", "Séances individuelles ou collectives", "Cadres d'exception", "Thérapeute certifié", "Réduction du stress", "Amélioration du sommeil"],
    highlights: ["Expérience sonore unique", "Cadres magiques de Marrakech", "Bénéfices prouvés", "Accessible à tous"],
    metaDescription: "Sonothérapie à Marrakech avec bols tibétains. Séances individuelles ou collectives, cadres d'exception. Relaxation profonde. Réservez."
  },
  {
    title: "Vos Soirées Festives",
    slug: "vos-soirees-festives",
    image: "/images/activities/voiture-luxe.webp",
    category: "Événementiel",
    price: null,
    priceUnit: null,
    sortOrder: 23,
    description: "Organisation de soirées privées et festives dans les villas et lieux prestigieux de Marrakech. DJ, traiteur, décoration.",
    longDescription: `<h2>Soirées festives à Marrakech : célébrez dans le luxe</h2>
<p>Marrakech est la destination idéale pour des soirées privées mémorables. Villas de luxe avec piscine, terrasses panoramiques, jardins éclairés — les lieux sont aussi variés que les occasions. Notre équipe d'organisateurs crée des soirées sur mesure qui dépassent toutes les attentes.</p>

<h2>Nos prestations</h2>

<h3>DJ et sonorisation</h3>
<p>Nos DJ professionnels créent l'ambiance parfaite pour votre soirée : musique lounge pour un dîner élégant, hits internationaux pour une fête, ou musique orientale pour une ambiance marocaine. Sonorisation et éclairage DJ inclus.</p>

<h3>Traiteur et boissons</h3>
<p>Buffet gastronomique, stations de cuisson live, bar à cocktails, champagne premium — notre service de restauration transforme votre soirée en un festival de saveurs. Menus sur mesure selon vos goûts et votre budget.</p>

<h3>Décoration</h3>
<p>Fleurs, bougies, guirlandes lumineuses, nappes, vaisselle de luxe — notre équipe de décorateurs transforme le lieu en un cadre magique. Thèmes personnalisés possibles : marocain, tropical, blanc et doré...</p>

<h2>Les lieux</h2>

<h3>Villas de luxe</h3>
<p>Nos villas partenaires dans la Palmeraie et les quartiers prestigieux disposent d'espaces extérieurs immenses, parfaits pour les fêtes en plein air. Piscines, jardins, terrasses — chaque villa est un décor d'exception.</p>

<h3>Riads de charme</h3>
<p>Pour des soirées plus intimistes, les riads de la médina offrent des cours intérieures richement décorées, des toits-terrasses avec vue sur la ville et une atmosphère authentique.</p>

<h2>Gestion complète</h2>
<p>Nous prenons en charge l'intégralité de l'organisation : lieu, traiteur, DJ, décorateur, service, nettoyage. Vous n'avez rien à faire, sauf profiter de votre soirée.</p>`,
    features: ["DJ et sonorisation", "Traiteur gastronomique", "Décoration sur mesure", "Villas et riads", "Gestion complète", "Service clé en main"],
    highlights: ["Lieux d'exception", "Ambiance personnalisée", "Service premium", "Organisation clé en main"],
    metaDescription: "Soirées festives privées à Marrakech. Villas, DJ, traiteur, décoration. Organisation complète. Réservez votre soirée."
  },
  {
    title: "Vos Demandes Spécifiques",
    slug: "vos-demandes-specifiques",
    image: "/images/activities/van-chauffeur.webp",
    category: "Sur mesure",
    price: null,
    priceUnit: null,
    sortOrder: 24,
    description: "Service sur mesure pour toutes vos demandes spéciales. Notre équipe organise n'importe quelle expérience à Marrakech.",
    longDescription: `<h2>Expériences sur mesure à Marrakech</h2>
<p>Vous ne trouvez pas l'activité que vous recherchez ? Notre équipe est capable d'organiser n'importe quelle expérience à Marrakech. Mariage de luxe, séminaire d'entreprise, tournage vidéo, événement caritatif, anniversaire surprise — aucune demande n'est trop ambitieuse.</p>

<h2>Ce que nous pouvons organiser</h2>

<h3>Événements privés</h3>
<p>Mariages de rêve, anniversaires d'exception, fêtes de réconciliation, célébrations familiales — nous créons des événements qui reflètent votre personnalité et dépassent vos attentes. Chaque détail est pensé et exécuté avec une perfection absolue.</p>

<h3>Séminaires et team building</h3>
<p>Pour les entreprises, nous organisons des séminaires complets : lieux, hébergement, restauration, activités, team building, soirées. Notre connaissance du terrain et notre réseau de prestataires nous permettent de créer des programmes sur mesure pour chaque entreprise.</p>

<h3>Expériences culturelles</h3>
<p>Cours de cuisine avec un chef étoilé, atelier d'artisanat avec un maître artisan, visite privée d'un musée, concert de musique gnawa — nous vous connectons aux meilleurs savoir-faire marocains.</p>

<h3>Services personnels</h3>
<p>Shopping personnel avec un styliste, coiffeur à domicile, coach sportif, baby-sitter, garde-malade — nous répondons à tous vos besoins personnels avec discrétion et professionnalisme.</p>

<h2>Comment ça marche</h2>
<p>Contactez-nous avec votre demande, aussi précise ou vague soit-elle. Notre équipe étudie votre projet, vous propose des options et un devis détaillé. Une fois validée, nous nous occupons de tout. Vous recevez un point de situation régulier et un suivi personnalisé jusqu'au jour J.</p>`,
    features: ["Organisation sur mesure", "Réseau de prestataires", "Devis détaillé", "Suivi personnalisé", "Discrétion absolue", "Aucune limite"],
    highlights: ["N'importe quelle expérience", "Service clé en main", "Expertise locale", "Excellence garantie"],
    metaDescription: "Demandes spécifiques et expériences sur mesure à Marrakech. Mariages, séminaires, événements privés. Organisation complète. Contactez-nous."
  },
];

async function main() {
  console.log("Seeding services...");

  for (const service of services) {
    const existing = await prisma.service.findUnique({ where: { slug: service.slug } });
    if (existing) {
      // Update with long description, features, highlights, metaDescription
      const fullDescription = service.description + "\n\n" + service.longDescription;
      await prisma.service.update({
        where: { slug: service.slug },
        data: {
          description: fullDescription,
          image: service.image,
          category: service.category,
          price: service.price,
          priceUnit: service.priceUnit,
          sortOrder: service.sortOrder,
          isActive: true,
        },
      });
      console.log(`  Updated: "${service.title}"`);
      continue;
    }
    const fullDescription = service.description + "\n\n" + service.longDescription;
    await prisma.service.create({
      data: {
        title: service.title,
        slug: service.slug,
        description: fullDescription,
        image: service.image,
        category: service.category,
        price: service.price,
        priceUnit: service.priceUnit,
        sortOrder: service.sortOrder,
        isActive: true,
      },
    });
    console.log(`  Created: "${service.title}"`);
  }

  const count = await prisma.service.count();
  console.log(`\nDone! Total services in database: ${count}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
