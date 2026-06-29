const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const expansions = {
  "desert-sensation": `<h2>Désert d'Agafay : le désert magique à portée de Marrakech</h2>
<p>Le désert d'Agafay se trouve à seulement 40 minutes de Marrakech et offre un paysage lunaire aussi beau et impressionnant que celui du Sahara. Rochers rouges sculptés par le vent, plateaux arides striés de lumière, vallées mystérieuses et sommets enneigés de l'Atlas en arrière-plan — c'est un décor de film d'aventure qui vous attend pour une expérience inoubliable. Contrairement au Sahara qui nécessite un long trajet en voiture, Agafay est accessible en moins d'une heure, ce qui en fait l'expérience désertique idéale pour les voyageurs disposant de peu de temps.</p>
<p>Notre service « Désert Sensation » vous propose des excursions complètes qui combinent exploration du désert, rencontres culturelles et moments de pure magie. Des dromadaires aux quads, du coucher de soleil au bivouac sous les étoiles, chaque expérience est soigneusement conçue pour vous offrir un aperçu authentique et mémorable de la vie nomade dans le désert marocain.</p>

<h2>Nos formules d'excursion — pour tous les envies et tous les horaires</h2>
<h3>Demi-journée Découverte (4h — matin ou après-midi)</h3>
<p>Cette formule condensée vous emmène au cœur du désert d'Agafay pour une expérience complète en 4 heures. Vous partez en 4x4 depuis votre villa et arrivez au terrain de décollage des dromadaires. La promenade en dromadaire dure 1 heure à travers les plateaux rocheux et les vallées du désert. Le dromadaire, le « vaisseau du désert », vous emporte à un rythme paisible et contemplatif, permettant d'absorber chaque détail du paysage.</p>
<p>Après la promenade, un thé à la menthe est servi dans une tente bédouine traditionnelle, avec vue panoramique sur les rochers rouges et les montagnes. En fin de matinée ou en fin d'après-midi selon l'horaire choisi, vous profitez du coucher de soleil — un spectacle naturel d'une beauté rare où les couleurs changent chaque minute : orange, rose, violet, doré, pourpre. C'est un moment de pure magie qui transcende le simple tourisme.</p>

<h3>Journée Complète Immersion (8h — de 8h00 à 16h00)</h3>
<p>La journée complète est une immersion totale dans la vie désertique. Le programme inclut : promenade en dromadaire (1h30), exploration en quad des pistes les plus reculées (1h), visite d'un village berbère traditionnel avec accueil chez l'habitant, déjeuner gastronomique préparé par un chef sur place (tajine aux légumes du jardin, pain chaud, fruits frais), temps libre pour la contemplation et la photographie, et coucher de soleil avant le retour.</p>
<p>La visite du village berbère est un moment humain particulièrement touchant. Vous êtes accueillis par une famille locale qui vous fait visiter sa maison en pisé, vous explique son mode de vie, vous montre ses techniques agricoles et vous partage un thé. C'est une rencontre authentique et respectueuse qui vous donne une compréhension profonde de la culture nomade du Maroc.</p>

<h3>Nuit en Bivouac de Luxe — l'expérience ultime</h3>
<p>La nuit en bivouac est l'expérience la plus mémorable et la plus prisée de notre offre. Le bivouac « Étoiles du Désert » est implanté au cœur du désert d'Agafay, dans un site isolé et préservé, loin de toute pollution lumineuse. Les tentes spacieuses de 20 m² sont décorées avec goût : tapis persans authentiques, lanternes en cuivre martelé, coussins brodés, literie confortable. Chaque tente a sa propre salle de bain privée avec douche chaude.</p>
<p>Le programme de la soirée est inoubliable : accueil au coucher du soleil avec jus de fruits frais, promenade en dromadaire au clair de lune (si la lune est visible), dîner gastronomique sous les étoiles préparé par un chef sur place (Entrée : salade marocaine, Tajine : bœuf aux pruneaux et amandes, Dessert : pastilla sucrée et thé à la menthe), musique traditionnelle au feu de camp avec gnawa et andalou, contemplation des étoiles avec un télescope. Le matin, petit-déjeuner au lever du soleil avant le retour à Marrakech.</p>

<h2>Activités désertiques — pour tous les goûts et tous les âges</h2>
<h3>Promenade en dromadaire</h3>
<p>Le dromadaire est le compagnon traditionnel du nomade dans le désert. Nos dromadiers sont bien élevés, dociles et parfaitement habitués aux visiteurs. La promenade dure de 30 minutes à 1h30 selon la formule choisie, et traverse les plateaux rocheux, les vallées sèches et les collines du désert d'Agafay. Le rythme est lent et contemplatif, idéal pour la photographie et la méditation. Un guide berbère vous accompagne et partage ses connaissances sur le mode de vie nomade.</p>

<h3>Quad dans le désert</h3>
<p>Les pistes du désert d'Agafay sont un terrain de jeu idéal pour les amateurs de sensations fortes. Les quads vous emmènent dans des endroits inaccessibles en 4x4, à travers des gorges étroites, des cols rocheux et des crêtes avec vue panoramique. Le contraste entre la vitesse et la contemplation, entre l'adrénaline et la sérénité, crée une expérience unique et mémorable.</p>

<h3>Coucher de soleil et photography</h3>
<p>Le coucher de soleil dans le désert d'Agafay est un spectacle naturel d'une beauté rare. Les couleurs du ciel — orange, rose, violet, doré, pourpre — se reflètent sur les rochers rouges du désert, créant un jeu de lumière et d'ombre absolument magique. C'est le moment idéal pour la photographie de paysage, les portraits en lumière dorée et les images dramatiques. Nos guides connaissent les meilleurs points de vue et les angles les plus photogéniques.</p>

<h2>Sécurité et confort — tout est pensé pour vous</h2>
<p>Toutes nos excursions sont encadrées par des guides certifiés, formés aux premiers secours et connaissant parfaitement le terrain désertique. Le ratio est de 1 guide pour 6 participants maximum. Des bouteilles d'eau fraîche, de la crème solaire, des lunettes de soleil et des couvre-chefs sont fournis. Les véhicules 4x4 sont entretenus et vérifiés, avec kit de premiers secours et téléphone satellite.</p>
<p>Le bivouac de luxe est sécurisé par une équipe nocturne, avec éclairage solaire et générateur de secours. L'eau chaude est disponible 24h/24. Les draps sont en coton égyptien, les couvertures en laine, et les oreillers sont moelleux. Tout est pensé pour votre confort et votre sécurité dans un cadre préservé et authentique.</p>

<h2>Réservation et disponibilités</h2>
<p>Les excursions désert sont disponibles tous les jours de l'année, du lever au coucher du soleil. La réservation est obligatoire et se fait en ligne, par téléphone ou par e-mail. L'annulation est gratuite jusqu'à 48h avant l'excursion. Le tarif comprend le transfert aller-retour, l'encadrement, le matériel, les boissons et le repas selon la formule. Les paiements sont acceptés en espèces, par carte bancaire ou par virement.</p>`,

  "visites-decouvertes": `<h2>Visites Guidées de Marrakech : découvrez la ville rouge avec des experts passionnés</h2>
<p>La médina de Marrakech, inscrite au patrimoine mondial de l'UNESCO depuis 1985, est un labyrinthe fascinant de 600 hectares, l'un des plus vastes et des mieux préservés du monde arabe. Ruelles sinueuses, places animées, palais somptueux, mosquées majestueuses, riads magnifiques, souks colorés — chaque recoin raconte une partie de l'histoire millénaire de cette ville exceptionnelle. Sans guide local expérimenté, il est facile de se perdre dans le dédale de la médina et de manquer les véritables trésors cachés que les touristes ne découvrent jamais.</p>
<p>Nos guides locaux certifiés, passionnés par leur ville et dotés d'une connaissance encyclopédique de son histoire, de sa culture et de ses secrets, vous emmènent dans les recoins les plus authentiques et vous font vivre une expérience culturelle riche, immersive et véritablement inoubliable. Chaque visite est personnalissée selon vos centres d'intérêt, votre rythme et vos envies.</p>

<h2>Nos circuits — quatre immersions culturelles uniques</h2>
<h3>Circuit Découverte (3h — le grand classique)</h3>
<p>Le circuit découverte est idéal pour les premiers visiteurs de Marrakech. En 3 heures, nos guides vous emmènent aux sites incontournables tout en vous faisant découvrir les endroits secrets que seuls les Marrakchis connaissent. La place Jemaa el-Fna, cœur battant de la médina, avec ses conteurs, ses musiciens, ses acrobates et ses marchands de jus d'orange frais. Le palais Bahia, joyau architectural du XIXe siècle avec ses jardins intérieurs, ses zelliges et ses boiseries sculptées. Les tombeaux Saadiens, redécouverts en 1917 après des siècles d'oubli, avec leurs decorations somptueuses en stuc, en bois de cèdre et en marbre.</p>
<p>Mais le vrai intérêt du circuit découverte est ce que les guides vous montrent en chemin : une boutique de cuivre artisanale où un maître artisan martèle des plats depuis 40 ans, une mosquée de quartier avec son ablution traditionnelle, un riad oublié dont le jardin intérieur est un paradis de verdure, une ruelle où l'on entend encore le chant des muezzins se répondant entre minarets. Ce sont ces moments qui transforment une simple visite en expérience culturelle profonde et mémorable.</p>

<h3>Circuit Artisanat (4h — au cœur de l'art marocain)</h3>
<p>Marrakech est la capitale de l'artisanat marocain, et nos guides vous emmènent dans les ateliers les plus authentiques, loin des boutiques touristiques. Vous assistez aux artisans au travail : le faïencier qui taille des zelliges à la main, le ciseleur de cuivre qui sculpte des lanternes extraordinaires, le tisserand qui crée des tapis sur un métier à tisser traditionnel, le maroquinier qui prépare le cuivre avec des techniques transmises depuis des générations.</p>
<p>Chaque atelier est une leçon d'histoire et de culture. Les artisans vous expliquent leur technique, vous racontent l'histoire de leur métier, et vous permettent de toucher, de sentir et de comprendre la matière première. Vous découvrez pourquoi le zellige marocain est unique au monde, pourquoi le cuivre de Marrakech est si réputé, et pourquoi les tapis berbères racontent des histoires dans leurs motifs géométriques. Vous repartez avec une compréhension profonde de l'artisanat marocain et, si vous le souhaitez, avec des pièces authentiques achetées directement chez les artisans.</p>

<h3>Circuit Gastronomique (4h — les saveurs de la médina)</h3>
<p>La gastronomie marocaine est l'une des plus riches et des plus variées du monde, et nos guides vous emmènent dans les meilleurs endroits pour goûter ses saveurs authentiques. Le parcours commence au marché central (souk des épices) où vous apprenez à reconnaître les épices les plus précieuses : safran, ras el hanout, cumin, curcuma, cannelle. Vous goûtez des olives marinées, des dattes Medjool, des amandes grillées et des fruits secs.</p>
<p>Ensuite, vous visitez une boulangerie traditionnelle où le pain khobz est cuit dans un four à bois, une fromagerie où le fromage de chèvre est préparé quotidiennement, et un restaurant local où vous dégustez un tajine véritablement authentique — pas la version touristique, mais la vraie, celle que les Marrakchis mangent chez eux. Vous terminez par une pâtisserie traditionnelle où les pâtissiers préparent des cornes de gazelle, des feuillets au miel et des makrouts. Chaque dégustation est accompagnée d'explications culturelles sur les traditions alimentaires marocaines.</p>

<h3>Circuit Soirée (3h — la médina sous les étoiles)</h3>
<p>La médina de Marrakech prend une dimension toute différente le soir. Les lumières dorées des lanternes éclairent les ruelles, les musiciens animent les places, les restaurateurs préparent des dîners aromatiques et l'atmosphère est magique. Le circuit soirée vous emmène dans les meilleurs spots nocturnes de la médina : un rooftop avec vue panoramique sur Jemaa el-Fna illuminée, un riad transformé en restaurant de musique gnawa, une terrasse cachée d'où vous observez l'animation de la place de loin.</p>
<p>Vous goûtez des jus de fruits frais, des pâtisseries orientales et du thé à la menthe dans des cadres exceptionnels. Les guides vous racontent les légendes et les histoires de la médina la nuit, les secrets des ruelles obscures et les traditions séculaires qui animent encore aujourd'hui la vie nocturne de la ville rouge. C'est une expérience sensorielle et culturelle unique qui prolonge votre journée de découverte dans une atmosphère magique.</p>

<h2>Personnalisation — votre visite, vos envies</h2>
<p>Chaque visite est entièrement personnalisable. Vous pouvez combiner des éléments de différents circuits, modifier la durée, ajouter des arrêts spécifiques (boutiques, restaurants, monuments) ou adapter le rythme à vos besoins (familles avec enfants, personnes à mobilité réduite, groupes). Nos guides s'adaptent à vos centres d'intérêt : histoire, architecture, gastronomie, art, photographie, spiritualité.</p>
<p>Pour les familles avec enfants, nous proposons des circuits ludiques avec jeu de piste dans la médina, atelier de décoration de babouches et safari photo dans les souks. Pour les amateurs de photographie, nous organisons des circuits dédiés aux meilleurs spots photo, avec conseils de composition et accès à des endroits interdits au public. Pour les passionnés d'histoire, nous créons des parcours thématiques sur les dynasties almohades, saadiennes et alaouites.</p>

<h2>Langues et accessibilité</h2>
<p>Nos guides sont francophones, anglophones, hispanophones et arabophones. Les visites en français sont les plus demandées, mais nous avons des guides pour toutes les langues principales. Les visites sont accessibles aux personnes à mobilité réduite sur les circuits adaptés, et nous fournissons des fauteuils roulants si nécessaire.</p>

<h2>Réservation et tarifs</h2>
<p>Les visites guidées sont disponibles tous les jours de 8h00 à 20h00. La réservation est simple et flexible — en ligne, par téléphone ou par e-mail. Les tarifs varient selon la durée, le nombre de participants et les options choisies. Le tarif comprend l'accueil, la visite guidée, les entrées des monuments et les dégustations prévues dans les circuits gastronomiques. L'annulation est gratuite jusqu'à 24h avant la visite.</p>`,

  "equitation": `<h2>Équitation à Marrakech : cheval et nature dans un cadre d'exception</h2>
<p>L'équitation est une tradition ancestrale au Maroc, profondément ancrée dans la culture berbère et arabe. Les chevaux arabes et barbes, réputés dans le monde entier pour leur beauté, leur endurance et leur docilité, sont les compagnons de route idéaux pour explorer la campagne spectaculaire qui entoure Marrakech. Notre centre équestre, situé à 25 minutes du centre-ville, vous propose des promenades et des excursions pour tous les niveaux, du débutant absolu au cavalier expérimenté, dans des paysages à couper le souffle : oliveraies millénaires, plaines fertiles de l'Haouz, contreforts de l'Atlas.</p>
<p>Que vous souhaitiez une balade tranquille d'une heure ou une excursion aventureuse de demi-journée, nous avons le programme parfait pour vous. Nos moniteurs passionnés et compétents vous encadrent avec bienveillance, nos chevaux bien traités et bien dressés vous portent en toute sécurité, et les paysages grandioses de la campagne marocaine vous offrent un cadre d'exception inoubliable.</p>

<h2>Nos promenades équestres — trois formules pour tous les niveaux</h2>
<h3>Promenade Découverte (1h — niveau débutant)</h3>
<p>La promenade découverte est idéale pour les débutants et les personnes qui n'ont jamais monté à cheval. Vous partez de notre centre équestre et traversez les oliveraies centenaires de la campagne environnante. Le chemin est plat, les allures sont douces (pas et trot) et le rythme est adapté au plus débutant du groupe. Le cheval est calme, bien dressé et parfaitement habitué aux débutants.</p>
<p>La promenade dure 1 heure et comprend un passage devant un village berbère traditionnel, une traversée de champs cultivés et une halte thé dans un olivier centenaire. Le moniteur vous explique les bases de l'équitation en marchant à côté du cheval si vous le souhaitez, ou vous guide à distance si vous êtes plus à l'aise. Vous terminez la promenade avec le sourire aux lèvres et l'envie de recommencer.</p>

<h3>Promenade Aventure (2h — niveau intermédiaire)</h3>
<p>Pour les personnes qui ont déjà monté à cheval ou qui sont à l'aise avec les allures, la promenade aventure vous emmène plus loin dans la campagne, à travers des paysages plus variés et plus dramatics. Les chemins de terre serpentent entre les oliveraies, les collines arides et les vallées verdoyantes. Vous passez au trot et au galop sur les portions plates, vous escaladez des cols à petite allure et vous profitez de vues dégagées sur la plaine de l'Haouz et les sommets de l'Atlas.</p>
<p>La promenade inclut un arrêt dans un village berbère où vous êtes accueillis par une famille locale. Vous partagez un thé à la menthe, vous découvrez le mode de vie traditionnel et vous échangez avec les habitants. C'est un moment humain authentique qui enrichit l'expérience équestre d'une dimension culturelle profonde. Le retour se fait au galop sur les portions plates, une sensation de liberté et de bonheur absolu.</p>

<h3>Promenade Exclusive Atlas (demi-journée — niveau confirmé)</h3>
<p>Pour les cavaliers expérimentés, cette excursion de demi-journée vous emmène dans les contreforts de l'Atlas. Les chemins de montagne, les cols escarpés, les vallées profondes et les panoramas grandioses offrent une aventure équestre unique. Vous galopez dans des paysages à couper le souffle, vous traversez des rivières à gué et vous grimpez des sentiers de montagne avec vue sur les sommets enneigés.</p>
<p>Le déjeuner est servi dans un berbère au sommet d'une colline, avec vue à 360° sur les montagnes et la plaine. Le retour se fait par un sentier différent, offrant des perspectives nouvelles sur les paysages. C'est une expérience équestre d'exception qui combine adrénaline, contemplation et encounter humain.</p>

<h2>Nos chevaux — des compagnons nobles et bien traités</h2>
<p>Nos chevaux sont des Arabes et des Barbes, des races réputées dans le monde entier pour leur beauté, leur endurance et leur tempérament équilibré. Les Arabes sont reconnaissables à leur tête fine, leur arrière-main élégante et leur robe dorée. Les Barbes, plus robustes et plus trapus, sont les chevaux traditionnels des guerriers berbères. Tous nos chevaux ont un excellent caractère, sont bien dressés et parfaitement habitués aux cavaliers de tous niveaux.</p>
<p>Le bien-être animal est au cœur de nos valeurs. Nos chevaux sont entretenus par un vétérinaire, nourris avec des fourrages de qualité (foin, avoine, légumes), logés dans des écuries spacieuses et ventilées, et sortis quotidiennement au pré. Le ratio est de 1 cheval pour 2 cavaliers, ce qui garantit un repos suffisant entre chaque sortie. Nous n'acceptons pas les cavaliers de plus de 90 kg pour préserver la santé de nos chevaux.</p>

<h2>Encadrement et sécurité — des moniteurs passionnés et compétents</h2>
<p>Tous nos moniteurs sont titulaires du brevet professionnel d'instructeur d'équitation et formés aux premiers secours. Ils sont passionnés par l'équitation et par la transmission de leur savoir-faire. Le ratio est de 1 moniteur pour 4 cavaliers maximum, ce qui garantit un suivi personnalisé et une sécurité optimale.</p>
<p>Avant chaque promenade, un briefing de sécurité complet couvre les bases de l'équitation (position, aides, commandes), les consignes de sécurité (distance entre chevaux, conduite à tenir en cas de peur) et la présentation du cheval attribué. Les casques de protection homologués sont fournis et obligatoires. Les promenades sont assurées par une assurance responsabilité civile.</p>

<h2>Pratique et réservation</h2>
<p>Les promenades équestres sont disponibles tous les jours de 8h00 à 17h00. Le transfert depuis votre villa est inclus pour les excursions de 2 heures et demi-journée. La réservation est simple et flexible — en ligne, par téléphone ou par e-mail. L'annulation est gratuite jusqu'à 24h avant la promenade. Il suffit de porter des vêtements confortables, des chaussures fermées et d'apporter de l'eau. Le tarif comprend le cheval, l'encadrement, le matériel (selle, bridon, casque) et le thé d'accueil.</p>`,

  "yoga-pilates": `<h2>Yoga et Pilates à Marrakech : équilibre, sérénité et bien-être au soleil</h2>
<p>Marrakech est un lieu idéal pour pratiquer le yoga et le pilates. Le climat doux et ensoleillé toute l'année, l'ambiance spirituelle de la ville, le cadre grandiose de l'Atlas en arrière-plan et le silence des jardins et des terrasses créent un environnement parfaitement propice à la méditation, à la pratique corporelle et à la introspection. Que vous soyez un pratiquant régulier en quête d'un cadre inspirant ou un débutant curieux de découvrir ces disciplines, nos cours vous offrent une expérience unique alliant tradition ancestrale et modernité.</p>
<p>Nos instructeurs certifiés et expérimentés vous guident avec bienveillance et compétence dans votre pratique, en adaptant les postures et les séquences à votre niveau, à vos objectifs et à vos besoins spécifiques. L'ambiance est bienveillante, non compétitive et inclusive — chaque participant est accueilli tel qu'il est et progresse à son rythme.</p>

<h2>Nos disciplines — pour chaque corps et chaque esprit</h2>
<h3>Yoga Vinyasa — le souffle en mouvement</h3>
<p>Le yoga vinyasa est une pratique dynamique et fluide où les postures (asanas) sont enchaînées au rythme du souffle (pranayama). C'est une méditation en mouvement qui développe la force, la souplesse, l'équilibre et la concentration. Les séquences sont variées et créatives, allant du solaire (énergisant) au lunaire (apaisant), en passant par des flows créatifs et des séquences thématiques.</p>
<p>Notre cours de vinyasa a lieu chaque matin à 7h00 sur la terrasse du riad, avec vue sur les toits de la médina et les minarets des mosquées. Le lever du soleil, la fraîcheur matinale, le chant des oiseaux et l'animation de la médina qui s'éveille créent une atmosphère magique et inspirante. Le cours dure 75 minutes et est ouvert à tous les niveaux, du débutant au pratiquant avancé.</p>

<h3>Yoga Yin — la contemplation profonde</h3>
<p>Le yoga yin est une pratique lente et contemplative où les postures sont maintenues pendant 3 à 5 minutes, ciblant les tissus profonds (ligaments, fascias, articulations). C'est une méditation passive qui développe la souplesse profonde, la patience et la conscience corporelle. Le yin est particulièrement bénéfique contre le stress, les douleurs chroniques et les troubles du sommeil.</p>
<p>Notre cours de yin a lieu chaque dimanche à 17h00, dans le jardin intérieur du riad. L'ambiance est calme et tamisée, avec des bougies, de la musique douce et des aromathérapies aux huiles essentielles de lavande et de camomille. Le cours dure 90 minutes et se termine par une méditation guidée de 15 minutes. C'est l'expérience parfaite pour une fin de semaine de relaxation et de reconquête intérieure.</p>

<h3>Pilates — renforcement et alignment</h3>
<p>Le Pilates est une méthode de renforcement musculaire en douceur qui cible le core (muscles profonds du tronc), améliore la posture, développe la souplesse et prévient les douleurs dorsales. Les exercices sont précis, contrôlés et adaptés à chaque participant, avec une attention particulière à la respiration et à l'alignement corporel. Le Pilates est particulièrement recommandé pour les personnes souffrant de douleurs lombaires, de problèmes articulaires ou de sédentarité prolongée.</p>
<p>Nos cours de Pilates ont lieu trois fois par semaine (mardi, jeudi, samedi) à 10h00, dans notre studio intérieur climatisé. Les cours durent 60 minutes et sont limités à 12 participants pour garantir un suivi personnalisé. Nous utilisons du matériel complet : tapis, blocs, bandes élastiques, rouleurs, sphères. L'ambiance est sportive mais détendue, avec musique instrumentale en fond.</p>

<h3>Méditation Guidée — le calme intérieur</h3>
<p>La méditation guidée est une pratique de pleine conscience qui développe la concentration, la sérénité et la lucidité. Sous la voix d'un instructeur expérimenté, vous apprenez à observer vos pensées sans jugement, à ancrer votre attention dans l'instant présent et à cultiver un espace intérieur de calme et de paix. La méditation est particulièrement efficace contre le stress, l'anxiété, l'insomnie et la rumination mentale.</p>
<p>Nos séances de méditation ont lieu tous les soirs à 19h00, sur la terrasse du riad au coucher du soleil. La lumière dorée, le silence de la soirée, le chant des oiseaux et l'animation lointaine de la médina créent une atmosphère de contemplation unique. La séance dure 45 minutes et est suivie d'un thé à la menthe partagé. Les débutants sont les bienvenus — aucune expérience préalable n'est nécessaire.</p>

<h2>Cours privés à domicile — dans le confort de votre villa</h2>
<p>Pour ceux qui préfèrent la confidentialité et le confort de leur villa, nous proposons des cours privés à domicile. Un instructeur se déplace à votre villa avec tout le matériel nécessaire (tapis, blocs, bandes, poids) et vous enseigne une séance personnalisée selon vos objectifs et votre niveau. Le cours peut avoir lieu dans votre jardin, sur votre terrasse, au bord de votre piscine ou dans l'espace que vous choisissez.</p>
<p>Les cours privés sont idéaux pour les personnes qui souhaitent progresser à leur rythme, pour les groupes d'amis qui veulent pratiquer ensemble, pour les familles avec enfants, et pour les personnes souffrant de pathologies spécifiques qui nécessitent une adaptation (grossesse, douleurs chroniques, récupération post-opératoire). La durée et la fréquence sont flexibles — nous nous adaptons à votre emploi du temps et à vos envies.</p>

<h2>Matériel et installations</h2>
<p>Nous fournissons tout le matériel nécessaire à votre pratique : tapis de yoga antiderapants premium, blocs en liège, bandes élastiques, couvertures de relaxation, coussins de méditation, poids légers pour le Pilates. Notre studio intérieur est climatisé, spacieux et lumineux, avec sol en bois et miroirs. La terrasse extérieure offre un cadre magnifique avec vue panoramique. Le jardin est un espace de verdure et de calme, idéal pour les pratiques contemplatives.</p>

<h2>Réservation et tarifs</h2>
<p>Nos cours collectifs sont disponibles du lundi au dimanche, à différents horaires selon la discipline. Le tarif par cours collectif est de 150 MAD par personne (environ 15 €). Les cours privés à domicile sont à partir de 500 MAD par heure pour 1 personne, avec réductions pour les groupes. La réservation se fait en ligne, par téléphone ou par e-mail. L'annulation est gratuite jusqu'à 12h avant le cours.</p>`,

  "aqua-karting": `<h2>Aqua Karting à Marrakech : le karting sur l'eau, une expérience unique et inoubliable</h2>
<p>L'aqua karting est une activité innovante et amusante qui combine le karting terrestre et le kayak aquatique. Vous conduisez un kart flottant sur un plan d'eau, avec la possibilité de freiner, de virer et de jouter avec d'autres participants. C'est une expérience accessible, drôle et originale, adaptée à tous les âges dès 8 ans, qui garantit des rires et des moments de pur bonheur partagé. Contrairement au karting classique, l'aqua karting se pratique sur l'eau, ce qui le rend plus sûr, plus frais et plus spectaculaire.</p>
<p>Notre parcours aquatique de 5000 m² est situé à l'Agafay, à 30 minutes du centre-ville de Marrakech, avec vue panoramique sur les sommets de l'Atlas. Les eaux calmes et cristallines du lac artificiel offrent un cadre idéal pour cette activité, entre ciel bleu et montagnes majestueuses. C'est l'activité parfaite pour une demi-journée de fun entre amis, en famille ou pour un anniversaire mémorable.</p>

<h2>Le principe — simple, fun et accessible à tous</h2>
<p>Chaque kart aquatique est un petit bateau flottant équipé d'un siège confortable, d'un volant, d'un accélérateur et d'un frein. Les karts sont stables et impossibles à faire chavirer grâce à leur conception spéciale avec coque大型 et centre de gravité bas. Vous êtes assis confortablement, les pieds en hauteur, et vous conduisez le kart exactement comme un kart terrestre — sauf que vous êtes sur l'eau !</p>
<p>Le parcours est balisé par des bouées colorées avec des virages serrés, des lignes droites pour les dépassements et une zone de joust aquatique où vous pouvez vous affronter avec des piques en mousse. La vitesse maximale est de 15 km/h, suffisante pour les sensations sans danger. Les sessions durent 15 ou 30 minutes selon votre choix, et chaque session comprend un briefing de sécurité et une démonstration pratique.</p>

<h2>Comment jouer — les règles du jeu</h2>
<h3>Karting libre</h3>
<p>En mode libre, vous conduisez votre kart à votre rythme, vous explorez le parcours, vous faites des virages et vous profitez du paysage. C'est le mode idéal pour les débutants et les familles avec jeunes enfants. Vous pouvez prendre des virages à votre vitesse, vous arrêter pour admirer le panorama et vous amuser sans pression. Le mode libre est disponible en session de 15 ou 30 minutes.</p>

<h3>Course organisée</h3>
<p>Pour les groupes et les anniversaires, nous organisons des courses avec départ groupé, chronométrage et podium de remise des prix. Les karts sont répartis par couleur, et chaque coureur porte un gilet identificoire. Le circuit comporte des zones de dépassement stratégiques et des virages techniques qui récompensent l'adresse et la stratégie. Les courses durent 10 minutes et sont suivies d'un classement et d'une remise de prix symbolique. C'est l'activité idéale pour les fêtes d'anniversaire (dès 8 ans), les séminaires d'entreprise et les sorties entre amis.</p>

<h3>Mode Joust</h3>
<p>La zone de joust est l'espace le plus amusant du parcours. Deux karts se font face, et chaque participant utilise une pique en mousse pour tenter de pousser l'adversaire hors de sa zone. Le kart qui tombe à l'eau ou sort de la zone perd. C'est un jeu comique, spectaculant et hilarant qui crée des moments de rire fou et de complicité entre les participants. Le mode joust est inclus dans les sessions de 30 minutes.</p>

<h2>Sécurité et encadrement — notre priorité</h2>
<p>Chaque participant reçoit un briefing de sécurité complet avant sa session : règles de conduite, fonctionnement du kart, consignes en cas de chute (le kart ne chavire pas, mais il est possible de tomber à l'eau si on le veut exprès), utilisation des bouées de sauvetage. Un gilet de sauvetage homologué et un casque de protection sont fournis et obligatoires.</p>
<p>Des moniteurs sont présents sur le parcours et au bord de l'eau pendant toute la durée des sessions. Ils surveillent le bon déroulement, interviennent en cas de besoin et assure la sécurité de tous les participants. Les karts sont entretenus et vérifiés quotidiennement. L'eau du lac est changée régulièrement et respecte les normes de qualité. Un vestiaire, des douches et des casiers sont disponibles pour les participants.</p>

<h2>Idéal pour les groupes et les événements</h2>
<p>L'aqua karting est l'activité parfaite pour les fêtes d'anniversaire (dès 8 ans), les séminaires d'entreprise, les enterrements de vie de jeune fille/garçon, les sorties d'amis et les vacances en famille. Nous proposons des formules spéciales groupes avec tarif dégressif, espace pique-nique réservé, gâteau d'anniversaire et décorations. Le parcours peut accueillir jusqu'à 12 karts simultanément, ce qui permet des courses à grande échelle.</p>
<p>Pour les séminaires, nous proposons des formules team building avec défis d'équipe, course inter-services et remise de prix collective. L'activité crée de la complicité, de l'émulation et des souvenirs partagés qui renforcent la cohésion d'équipe dans un cadre ludique et inoubliable.</p>

<h2>Réservation et disponibilités</h2>
<p>L'aqua karting est disponible tous les jours de 9h00 à 18h00. Les sessions de 15 minutes et 30 minutes sont disponibles sans réservation préalable (premier arrivé, premier servi). Pour les groupes de plus de 8 personnes et les événements, la réservation est obligatoire. Le tarif comprend le matériel complet (kart, gilet, casque), l'encadrement et l'accès aux installations. L'annulation est gratuite jusqu'à 24h avant la session.</p>`,
};

async function main() {
  console.log("Expanding services 13-17 to 2000+ words...\n");

  for (const [slug, longDescription] of Object.entries(expansions)) {
    const result = await prisma.service.updateMany({
      where: { slug },
      data: { longDescription },
    });
    if (result.count > 0) {
      console.log(`  ✓ Updated "${slug}"`);
    } else {
      console.log(`  ✗ Not found: "${slug}"`);
    }
  }

  const count = await prisma.service.count();
  console.log(`\nDone! Total services: ${count}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
