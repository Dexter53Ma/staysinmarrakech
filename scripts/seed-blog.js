const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const posts = [
  {
    title: "10 choses à faire à Marrakech",
    slug: "10-choses-a-faire-a-marrakech",
    excerpt: "Découvrez les incontournables de la ville rouge : place Jemaa el-Fna, souks, Jardin Majorelle, palais et bien plus.",
    image: "/images/blog/blog1.webp",
    author: "Cyrille",
    category: "Voyage",
    isPublished: true,
    content: `<h2>1. La Place Jemaa el-Fna</h2>
<p>Cœur battant de Marrakech, cette place mythique classée au patrimoine mondial de l'UNESCO s'anime dès le crépuscule. Musiciens, conteurs, acrobates et marchands de jus d'orange se succèdent dans une atmosphère magique. Installez-vous sur la terrasse d'un café et laissez-vous envoûter par ce spectacle vivant unique au monde. La place change de visage au fil de la journée : animée le matin avec les vendeurs de jus d'orange frais, elle se transforme en un théâtre à ciel ouvert le soir, avec ses groupes de musiciens gnawa, ses conteurs d'histoires traditionnelles et ses danseurs.</p>

<h2>2. Les Souks de la Médina</h2>
<p>Perdez-vous dans le labyrinthe des souks où artisans et commerçants proposent tapis berbères, argenterie, cuir tanné et épices parfumées. Chaque ruelle révèle un nouveau métier, un nouveau savoir-faire. N'hésitez pas à négocier, c'est faire partie du jeu et de la culture locale. Le souk des teinturiers, avec ses écheveaux de laine multicolores suspendus aux cordes, est l'un des plus photogéniques. Le souk des tapis regorge de trésors artisanaux, chaque tapis racontant une histoire à travers ses motifs et symboles traditionnels.</p>

<h2>3. Le Jardin Majorelle</h2>
<p>Créé par le peintre Jacques Majorelle en 1924 puis restauré par Yves Saint Laurent, ce jardin botanique est un havre de paix. Le bleu Majorelle iconique, les cactus géants et les bassins de nymphéas offrent un contraste saisissant avec l'agitation de la médina. Le musée Berbère, niché dans le jardin, présente une collection exceptionnelle d'objets et de bijoux traditionnels. Prévoyez au moins deux heures pour profiter pleinement de ce cadre exceptionnel.</p>

<h2>4. Le Bahia Palace</h2>
<p>Ce palais du XIXe siècle témoigne de l'architecture marocaine à son apogée. Zellige, stuc sculpté, bois de cèdre peint et carreaux de faïence composent un ensemble d'une beauté remarquable. Les jardins intérieurs apportent une note de sérénité à la visite. Le palais s'étend sur près de 8 000 m² et ses pièces sont décorées avec un soin méticuleux, chaque mur racontant une histoire de craftsmanship marocain.</p>

<h2>5. Les Tombeaux Saadiens</h2>
<p>Découverts en 1917 après avoir été murés pendant des siècles, ces tombeaux du XVIe siècle abritent les sépultures de la dynastie saadienne. Leur décoration somptueuse, avec des colonnes en marbre de Carrare et un plafond en bois de cèdre sculpté, est à couper le souffle. La salle aux Douze Colonnes, avec ses chapiteaux en stuc et ses murs en zellige, est considérée comme l'un des joyaux de l'architecture marocaine.</p>

<h2>6. Le Hammam traditionnel</h2>
<p>Plongez dans la tradition marocaine en fréquentant un hammam authentique. Le rituel du gommage au savon noir et au gant de kessa suivi d'un massage à l'huile d'argan est une expérience de bien-être inoubliable. Le hammam est bien plus qu'un bain, c'est un moment de purification body et esprit. Les hammams de luxe proposent des soins additionnels comme le gommage au rhassoul et les soins du visage aux huiles essentielles.</p>

<h2>7. La Koutoubia</h2>
<p>Minaret emblématique de Marrakech, la Koutoubia domine la ville depuis le XIIe siècle. Visible de très loin, ce monument de 77 mètres de haut inspire la mosquée Hassan de Rabat et la Giralda de Séville. Le jardin qui l'entoure est un lieu de promenade apprécié des habitants. À côté se trouve le Centre Culturel Mohammed V, qui propose des expositions d'art contemporain marocain.</p>

<h2>8. L'Atlas en une journée</h2>
<p>À seulement 45 minutes de Marrakech, les montagnes de l'Atlas offrent des paysages à couper le souffle. Organisez une excursion au village d'Ourika, aux Cascades d'Ouzoud ou pour une randonnée dans le Toubkal National Park. Le contraste entre la chaleur de la plaine et la fraîcheur de la montagne est saisissant. Les villages berbères perchés sur les flancs des montagnes offrent des panoramas extraordinaires et une immersion dans la culture locale.</p>

<h2>9. La Gastronomie marocaine</h2>
<p>Tajine mijoté, couscous royal, pastilla au pigeon, pâtisseries au miel et amandes... La cuisine marocaine est un voyage en soi. Participez à un cours de cuisine pour apprendre les secrets des épices et des techniques culinaires traditionnelles. Les riads proposent souvent des ateliers conviviaux et gourmands où vous apprendrez à préparer un tajine parfait et les délicieuses pâtisseries traditionnelles.</p>

<h2>10. Le Coucher de soleil depuis un toit-terrasse</h2>
<p>Terminez chaque journée en beauté en admirant le coucher de soleil depuis un toit-terrasse de la médina. La lumière dorée qui baigne les toits ocre de Marrakech, le chant de l' muezzin et les premières étoiles qui apparaissent créent un moment de pur bonheur. Les toits-terrasses des cafés et des riads offrent des vues panoramiques exceptionnelles sur la ville et les montagnes de l'Atlas au loin.</p>`,
  },
  {
    title: "5 stratégies pour dénicher une bonne affaire en immobilier au Maroc",
    slug: "strategie-immobilier-maroc",
    excerpt: "Vouloir investir dans l'immobilier au Maroc présente une réelle opportunité. Découvrez nos 5 stratégies pour réussir votre investissement.",
    image: "/images/blog/blog2.webp",
    author: "Amine",
    category: "Immobilier",
    isPublished: true,
    content: `<h2>Pourquoi investir dans l'immobilier au Maroc ?</h2>
<p>Le marché immobilier marocain offre des opportunités attractives pour les investisseurs internationaux. Avec un cadre fiscal avantageux, une infrastructure en développement constant et une demande croissante de la part de touristes et de résidents temporaires, le Maroc s'impose comme une destination d'investissement-immobilier de premier plan. Marrakech, en particulier, connaît un essor sans précédent dans le secteur de la location de luxe.</p>

<h2>1. Choisir le bon emplacement</h2>
<p>L'emplacement est le facteur le plus déterminant dans un investissement immobilier réussi. À Marrakech, les quartiers les plus prisés sont la Palmeraie, Guéliz, l'Route de l'Ourika et Amelkis. Chaque zone a ses spécificités : la Palmeraie pour les villas de prestige avec grand terrain, Guéliz pour la proximité des commodités modernes, et les routes périphériques pour les propriétés avec vue sur l'Atlas. Étudiez le marché local, comparez les prix au mètre carré et identifiez les zones en plein développement.</p>

<h2>2. Comprendre la fiscalité marocaine</h2>
<p>Le Maroc propose un régime fiscal intéressant pour les investisseurs immobiliers étrangers. La loi 19-96 permet aux étrangers d'acquérir des biens immobiliers sans autorisation préalable. Les plus-values immobilières sont soumises à un taux de 15% pour les résidents et 20% pour les non-résidents. Les loyers perçus sont imposables selon un barème progressif. Il est essentiel de se faire accompagner par un expert-comptable local pour optimiser votre fiscalité.</p>

<h2>3. Viser la location saisonnière</h2>
<p>La location saisonnière de villas de luxe à Marrakech génère des rendements attractifs, souvent entre 5% et 8% par an. Le tourisme à Marrakech est en croissance constante, attirant plus de 2 millions de visiteurs par an. Les plateformes de réservation en ligne facilitent la gestion locative, et les villas avec piscine privée dans les quartiers prestigieux sont les plus demandées. Investir dans une propriété avec des équipements de luxe maximise votre potentiel de revenus.</p>

<h2>4. Faire appel à des professionnels locaux</h2>
<p>Le Maroc a ses propres codes commerciaux et juridiques. Faire appel à un notaire pour les transactions, un agent immobilier local pour la recherche et un gestionnaire immobilier pour la location est indispensable. Les professionnels locaux connaissent les亚种 du marché, les quartiers en devenir et les opportunités qui ne sont pas toujours visibles sur les plateformes en ligne. Leur réseau est un atout précieux pour sécuriser votre investissement.</p>

<h2>5. Anticiper la revente</h2>
<p>Même si votre objectif principal est la location, il est sage d'anticiper la revente. Les biens immobiliers dans les zones touristiques de Marrakech ont connu une appreciation significative ces dernières années. Les villas de luxe avec piscine et jardin dans la Palmeraie ont vu leur valeur augmenter de 20% à 30% en 5 ans. En choisissant bien votre propriété et en la maintenant correctement, vous constituez un patrimoine qui prendra de la valeur au fil du temps.</p>

<p>L'investissement immobilier au Maroc est une opportunité concrète pour diversifier son patrimoine et générer des revenus complémentaires. Avec une approche méthodique et les bons conseils, vous pouvez transformer votre investissement en une source de revenus stable et pérenne.</p>`,
  },
  {
    title: "Piscines chauffées : l'atout luxe des villas à Marrakech en hiver",
    slug: "piscines-chauffees-villas-marrakech",
    excerpt: "Enviez-vous de vous évader dans un cadre de rêve même en hiver ? Découvrez l'avantage des piscines chauffées.",
    image: "/images/blog/blog3.webp",
    author: "Cyrille",
    category: "Conseils",
    isPublished: true,
    content: `<h2>Marrakech en hiver : un soleil généreux</h2>
<p>Contrairement aux idées reçues, Marrakech bénéficie d'un ensoleillement remarquable même en hiver. Avec des températures moyennes de 18 à 22°C en journée entre décembre et février, la ville rouge reste une destination agréable toute l'année. Cependant, les nuits peuvent être fraîches, avec des températures descendant parfois à 5°C. C'est dans ce contexte que la piscine chauffée devient un atout inestimable pour les villas de luxe.</p>

<h2>Les avantages d'une piscine chauffée</h2>
<p>Une piscine chauffée vous permet de profiter de votre bain à toute saison, que ce soit pour une nage matinale énergisante ou une détente en fin de journée. La température de l'eau, généralement maintenue entre 28 et 30°C, offre un confort optimal même quand l'air extérieur est plus frais. C'est un luxe qui transforme un séjour hivernal en véritable expérience de bien-être.</p>

<h2>Les technologies modernes</h2>
<p>Les systèmes de chauffage de piscines ont considérablement évolué. Les pompes à chaleur, les couvertures solaires et les systèmes à gaz haute efficacité permettent de maintenir une température constante tout en maîtrisant la consommation énergétique. Les villas de luxe à Marrakech intègrent désormais des systèmes intelligents qui adaptent la température en fonction de la météo et de l'heure d'utilisation.</p>

<h2>Le/design de la piscine</h2>
<p>Au-delà du confort thermique, la piscine chauffée est un élément architectural majeur. Les piscines à débordement avec vue sur l'Atlas, les bassins à miroir d'eau et les piscines infinity créent un cadre exceptionnel. Les matériaux haut de gamme comme le bleu de Gênes, le mozaïque de verre et la pierre naturelle confèrent à la piscine une esthétique d'exception qui s'intègre parfaitement dans le paysage marocain.</p>

<h2>Choisir la bonne villa</h2>
<p>Lorsque vous louez une villa à Marrakech en hiver, vérifiez toujours que la piscine est chauffée. C'est un critère essentiel qui fait la différence entre un séjour agréable et un séjour exceptionnel. Les villas de la Palmeraie et des quartiers prestigieux proposent généralement cette option, avec des piscines de grande taille entourées de jardins paysagés et d'espaces de détente.</p>

<p>La piscine chauffée n'est pas un simple équipement, c'est un élément central de l'expérience villa à Marrakech. Elle vous permet de profiter pleinement de votre séjour quelle que soit la saison, et ajoute une touche de luxe inégalée à votre vacances.</p>`,
  },
  {
    title: "3 thèmes tendance pour décorer votre villa pour les fêtes de fin d'année",
    slug: "decoration-villa-fetes-fin-annee",
    excerpt: "Avec son ambiance magique et ses villas somptueuses, Marrakech s'impose comme le cadre idéal pour célébrer les fêtes.",
    image: "/images/blog/blog4.webp",
    author: "Amine",
    category: "Décoration",
    isPublished: true,
    content: `<h2>1. Le thème Oriental Chic</h2>
<p>Ce thème marie l'élégance contemporaine aux touches orientales authentiques. Pensez à des lanternes en laiton doré disposées stratégiquement, des coussins en brocart et des tapis berbères aux motifs géométriques. Les coloris vont du bordeaux profond au bleu roi, en passant par le doré et le cuivré. Des bougies parfumées à la rose et au jasmin complètent l'ambiance. Les guirlandes lumineuses dorées et les boules de Noël dans les tons ambrés créent une atmosphère chaleureuse et raffinée. Pour la table de fête, optez pour de la vaisselle en céramique de Fès avec des motifs traditionnels, accompagnée de verrerie dorée.</p>

<h2>2. Le thème Nature & Éco-luxe</h2>
<p>Pour les amoureux de la nature et du design responsable, ce thème mise sur les matériaux naturels et les tons organiques. Utilisez des branches d'olivier, des feuilles de palmier séchées et des pommes de pin pour créer des中心pieces naturelles. Les coloris sont inspirés du désert : sable, terracotta, ocre et vert sauge. Des bougies en cire d'abeille, des nappes en lin et des serviettes en coton bio complètent le décor. Les lumières tamisées et les guirlandes LED à faible consommation créent une ambiance douce et eco-responsable. Ce thème s'intègre parfaitement dans les villas avec jardins paysagés de Marrakech.</p>

<h2>3. Le thème Luxe Minimaliste</h2>
<p>Le minimalisme de luxe est tendance et s'adapte parfaitement aux architectures modernes des villas de Marrakech. Le principe est simple : moins, mais mieux. Optez pour un coloris monochrome (blanc, noir, or) avec quelques touches d'accent coloré. Les bougies architecturales, les arrangements floraux structurés et les éléments en verre et métal créent un cadre sophistiqué. Les guirlandes lumineuses blanches et les ornements simples mais élégants donnent un rendu premium. Ce thème est idéal pour les villas au design contemporain avec de grands espaces ouverts.</p>

<h2>Conseils pratiques pour la décoration</h2>
<p>Quel que soit le thème choisi, pensez à l'éclairage : c'est lui qui crée l'ambiance. Les guirlandes lumineuses, les bougies et les projecteurs tamisés transforment une villa en un conte des Mille et Une Nuits. N'oubliez pas les effets personnels : photos de famille, objets de voyage et souvenirs qui racontent votre histoire. Enfin, la musique d'ambiance est essentielle : optez pour une playlist qui évoque l'esprit des fêtes dans un cadre oriental.</p>

<p>Marrakech, avec ses villas somptueuses et son atmosphère magique, est le cadre idéal pour célébrer les fêtes de fin d'année. Ces trois thèmes vous permettront de créer un décor d'exception qui marquera les esprits et créera des souvenirs inoubliables.</p>`,
  },
  {
    title: "La location de villa à Marrakech : le choix parfait pour votre mariage de rêve",
    slug: "location-villa-mariage-marrakech",
    excerpt: "Un mariage est un moment unique dans une vie. Découvrez pourquoi la location de villa à Marrakech est le choix idéal.",
    image: "/images/blog/blog5.webp",
    author: "Cyrille",
    category: "Événements",
    isPublished: true,
    content: `<h2>Un cadre exceptionnel pour un jour mémorable</h2>
<p>Un mariage à Marrakech est une promesse d'exotisme, de romance et de luxe. Les villas de luxe de la ville rouge offrent des cadres somptueux qui transforment votre cérémonie en un conte des Mille et Une Nuits. Des jardins fleuris avec orangers et oliviers centenaires aux terrasses offrant une vue panoramique sur les montagnes de l'Atlas, chaque villa est une scène de rêve pour votre jour spécial.</p>

<h2>Les avantages d'une villa pour un mariage</h2>
<p>Contrairement à un hôtel, une villa de luxe vous offre une intimité totale et une flexibilité incomparable. Vous disposez de l'espace entier pour votre événement : jardin pour la cérémonie, terrasse pour le cocktail, salon intérieur pour le dîner et piscine pour la fête. Les villas de la Palmeraie peuvent accueillir jusqu'à 150 invités dans un cadre verdoyant et prestigieux. Chaque détail peut être personnalisé selon vos envies.</p>

<h2>La cuisine de mariage</h2>
<p>Les traiteurs spécialisés de Marrakech proposent des menus raffinés qui mêlent saveurs marocaines et cuisine internationale. Le tajine royal, le couscous aux légumes d'artiste, la pastilla au pigeon et les pâtisseries traditionnelles créent un festival de saveurs. Pour le cocktail, les chef proposent des créations fusion qui surprendront vos invités. Les vins marocains de qualité et les cocktails à la menthe et au citron vert ajoutent une touche locale inoubliable.</p>

<h2>Les prestations incluses</h2>
<p>Nos villas de mariage à Marrakech incluent souvent des services clé en main : coordination de l'événement, décoration florale, musique et animations, traiteur et service de boissons, hébergement des mariés et de leur suite. Les organisateurs professionnels locaux maîtrisent toutes les subtilités de l'organisation d'événements dans la ville et peuvent créer un mariage sur mesure qui reflète votre personnalité.</p>

<h2>Le budget mariage à Marrakech</h2>
<p>Organiser un mariage de luxe à Marrakech est souvent plus abordable qu'en Europe, sans compromis sur la qualité. Le rapport qualité-prix est exceptionnel : pour un budget équivalent à un mariage classique en France, vous pouvez offrir à vos invités une expérience exotique et luxueuse. Les period de mi-saison (mars-mai, septembre-novembre) offrent les meilleurs tarifs tout en bénéficiant d'un climat ensoleillé parfait.</p>

<p>Un mariage à Marrakech est bien plus qu'une cérémonie, c'est une aventure sensorielle qui combine tradition marocaine et luxe contemporain. Les souvenirs créés dans cette ville envoûtante resteront gravés dans la mémoire de tous vos invités pour toujours.</p>`,
  },
  {
    title: "Pourquoi choisir une villa de luxe à Marrakech pour votre événement privé",
    slug: "villa-luxe-evenement-prive-marrakech",
    excerpt: "Marrakech est une destination de choix pour organiser des événements privés et professionnels d'exception.",
    image: "/images/blog/blog6.webp",
    author: "Cyrille",
    category: "Événements",
    isPublished: true,
    content: `<h2>Un cadre inégalé pour vos événements</h2>
<p>Marrakech s'est imposée comme l'une des destinations les plus prisées au monde pour l'organisation d'événements privés et professionnels. Cadre somptueux, infrastructures de luxe, savoir-faire des organisateurs locaux et climat ensoleillé, tout converge pour faire de la ville rouge le lieu idéal de votre prochain événement. Les villas de luxe, avec leurs jardins majestueux et leurs intérieurs richement décorés, offrent un cadre qui n'a rien à envier aux plus grands palaces.</p>

<h2>Les mariages de rêve</h2>
<p>Un mariage à Marrakech est une promesse d'exotisme et de romance. Les villas de luxe offrent des cadres somptueux pour les cérémonies, les cocktails et les réceptions. Les jardins fleuris, les terrasses avec vue sur l'Atlas et les intérieurs richement décorés créent une atmosphère magique. Les traiteurs spécialisés proposent des menus raffinés qui mêlent saveurs marocaines et cuisine internationale. Les mariages peuvent être organisés en plein air dans les jardins ou sous des tentes somptueusement décorées.</p>

<h2>Les séminaires d'entreprise</h2>
<p>Pour les entreprises, Marrakech offre un cadre idéal pour les séminaires et team building. Les villas de luxe peuvent accueillir des groupes jusqu'à 30 personnes avec des espaces de réunion équipés, des activités de team building variées (quad, golf, cours de cuisine) et des soirées festives dans des lieux magiques. Le changement de cadre et l'exotisme de Marrakech stimulent la créativité et renforcent la cohésion d'équipe.</p>

<h2>Les anniversaires et célébrations</h2>
<p>Célébrer un anniversaire à Marrakech est une idée originale qui marquera les esprits. Les organisateurs locaux créent des thèmes sur mesure, des décors exceptionnels et des expériences culinaires uniques pour chaque occasion. Les villas avec piscine et jardin permettent d'organiser des fêtes en plein air dans un cadre verdoyant et prestigieux.</p>

<h2>Les avantages de Marrakech</h2>
<p>La ville dispose d'un aéroport international bien desservi par de nombreuses compagnies aériennes. Les hébergements de luxe à des prix compétitifs, le soleil presque permanent et l'accueil chaleureux des Marocains font le reste. Les organisateurs professionnels locaux maîtrisent toutes les subtilités de l'organisation d'événements dans la ville, de la logistique à la décoration en passant par la gastronomie.</p>

<p>Que ce soit pour un mariage, un séminaire ou un anniversaire, Marrakech offre un cadre inégalé pour transformer votre événement en un moment magique et inoubliable.</p>`,
  },
  {
    title: "Organiser un anniversaire à Marrakech : pourquoi choisir une villa de luxe ?",
    slug: "anniversaire-villa-luxe-marrakech",
    excerpt: "Marrakech est la destination de choix pour célébrer un anniversaire dans un cadre exceptionnel et inoubliable.",
    image: "/images/blog/blog7.webp",
    author: "Amine",
    category: "Événements",
    isPublished: true,
    content: `<h2>Une célébration d'exception</h2>
<p>Célébrer un anniversaire à Marrakech est une idée qui transcende les frontières du banal. Dans cette ville où l'histoire se mêle au luxe contemporain, chaque anniversaire devient un événement mémorable. Les villas de prestige de Marrakech offrent un cadre qui transforme votre célébration en une véritable expérience sensorielle, alliant cadre somptueux, gastronomie raffinée et ambiance festive unique.</p>

<h2>Les villas adaptées aux fêtes</h2>
<p>Les villas de luxe à Marrakech sont conçues pour accueillir des événements avec style. Les grands jardins paysagés offrent un espace idéal pour les réceptions en plein air, tandis que les salons intérieurs richement décorés conviennent parfaitement aux dîners de gala. Les piscines à débordement créent une ambiance spectaculaire pour les soirées, et les toits-terrasses offrent des vues panoramiques exceptionnelles pour les célébrations au coucher du soleil.</p>

<h2>Les prestations sur mesure</h2>
<p>Les organisateurs d'événements de Marrakech créent des expériences uniques pour chaque anniversaire. Décoration florale personnalisée, traiteur gastronomique, animations musicales, spectacles de danse du ventre, feux d'artifice... Chaque détail est pensé pour créer un événement qui vous ressemble. Les villas de luxe disposent souvent de cuisines professionnelles qui permettent aux chefs de créer des menus sur mesure.</p>

<h2>Les activités annexes</h2>
<p>Pour compléter votre célébration, proposez à vos invités des activités exclusives : cours de cuisine marocaine, promenade à dos de chameau dans la Palmeraie, vol en parapente au-dessus de l'Atlas, séance de hammam de luxe ou visite privée de la médina. Ces activités ajoutent une dimension culturelle et ludique à votre anniversaire qui surprendra et émerveillera vos invités.</p>

<h2>Le choix du moment</h2>
<p>Les meilleures périodes pour un anniversaire à Marrakech sont le printemps (mars-mai) et l'automne (septembre-novembre), quand le climat est idéal et les jardins sont en pleine floraison. Les températures agréables permettent de profiter pleinement des espaces extérieurs, et la lumière dorée de Marrakech crée une atmosphère magique pour vos photos de fête.</p>

<p>Un anniversaire à Marrakech dans une villa de luxe est bien plus qu'une fête, c'est une aventure qui marquera à jamais la mémoire de tous les participants. L'exotisme, le luxe et la chaleur marocaine créent un cocktail unique qui transforme chaque célébration en un moment extraordinaire.</p>`,
  },
  {
    title: "Idées d'activités pour des vacances inoubliables à Marrakech",
    slug: "activites-vacances-marrakech",
    excerpt: "Des sports d'aventure aux relaxations, découvrez toutes les activités pour des vacances inoubliables.",
    image: "/images/blog/blog8.webp",
    author: "Amine",
    category: "Activités",
    isPublished: true,
    content: `<h2>Les sports d'aventure</h2>

<h3>Quad et Buggy dans la Palmeraie</h3>
<p>Explorez la Palmeraie et les paysages désertiques environnants en quad ou en buggy. Les parcours adaptés à tous les niveaux permettent de partir à l'aventure en toute sécurité tout en admirant des paysages grandioses. Les sensations sont garanties que vous soyez débutant ou expérimenté. Les balades durent généralement entre 1h et 3h et traversent des paysages variés : plantations de palmiers, villages berbères et plaines arides.</p>

<h3>Parapente au-dessus de Marrakech</h3>
<p>Pour une vision aérienne de Marrakech et de l'Atlas, le parapente est l'activité idéale. Les vols en tandem offrent une expérience inoubliable avec des panoramas à couper le souffle sur la ville et les montagnes. Le décollage s'effectue depuis les contreforts de l'Atlas et l'atterrissage se fait dans la Palmeraie, offrant un voyage aérien de 20 à 30 minutes au-dessus de paysages spectaculaires.</p>

<h3>Golf dans les grounds d'exception</h3>
<p>La région de Marrakech abrite plusieurs parcours de golf d'exception, conçus par des architectes de renommée internationale. Le climat ensoleillé permet de jouer toute l'année, et les paysages avec vue sur l'Atlas rendent chaque partie mémorable. Les clubs de golf proposent des installations modernes, des pro-shops bien achalandés et des restaurants gastronomiques.</p>

<h2>Les activités culturelles</h2>

<h3>Cours de cuisine marocaine</h3>
<p>Apprenez à préparer les classiques de la cuisine marocaine lors d'un atelier culinaire dans un riad. Les chefs locaux vous transmettront leurs secrets pour réussir un tajine parfait, un couscous savoureux ou des pâtisseries traditionnelles. Les ateliers durent généralement une demi-journée et incluent le marché pour sélectionner les ingrédients frais.</p>

<h3>Visites guidées de la médina</h3>
<p>Un guide local peut vous faire découvrir les trésors cachés de la médina, les ateliers d'artisans, les palais méconnus et les quartiers authentiques de Marrakech. C'est la meilleure façon de comprendre l'histoire et la culture de cette ville fascinante. Les visites thématiques (gastronomie, artisanat, histoire) permettent d'approfondir un domaine spécifique.</p>

<h2>Les activités de détente</h2>

<h3>Le Hammam de luxe</h3>
<p>L'expérience du hammam marocain est un incontournable. Le rituel traditionnel de gommage et de massage vous permettra de vous détendre tout en découvrant une tradition ancestrale. Les hammams de luxe proposent des soins premium avec des produits naturels : huile d'argan, savon noir, gommage au rhassoul.</p>

<h3>Yoga et méditation</h3>
<p>Beaucoup de villas et centres de bien-être proposent des séances de yoga dans des cadres exceptionnels, avec vue sur les jardins ou l'Atlas. Le yoga de l'aube au coucher de soleil est une expérience transcendante qui permet de se reconnecter à soi dans un cadre naturel inspirant.</p>

<h2>Les excursions incontournables</h2>
<p>Les excursions à journée depuis Marrakech sont variées et accessibles : les Cascades d'Ouzoud, le désert d'Agafay pour une nuit sous les étoiles, les villages berbères de l'Atlas, la ville d'Essaouira sur la côte atlantique avec ses remparts et sa médina. Chaque destination offre un changement de paysage et d'atmosphère saisissant qui enrichit votre séjour à Marrakech.</p>`,
  },
  {
    title: "Louer une villa à Marrakech : votre oasis de vacances au cœur du Maroc",
    slug: "louer-villa-marrakech-oasis-vacances",
    excerpt: "Marrakech combine tradition et modernité, offrant un cadre de rêve pour des vacances inoubliables en villa.",
    image: "/images/blog/blog9.webp",
    author: "Cyrille",
    category: "Conseils",
    isPublished: true,
    content: `<h2>Marrakech : une destination de choix</h2>
<p>Marrakech, la ville rouge du Maroc, est une destination envoûtante qui combine tradition et modernité, offrant aux voyageurs une expérience unique. Entre la médina historique avec ses souks grouillants et la ville nouvelle de Guéliz avec ses galeries d'art et ses restaurants gastronomiques, Marrakech séduit tous les profils de voyageurs. Louer une villa à Marrakech, c'est choisir un hébergement d'exception qui transforme vos vacances en une véritable aventure sensorielle.</p>

<h2>Les avantages de la villa</h2>
<p>La location d'une villa à Marrakech offre de nombreux avantages par rapport à un hôtel classique. L'intimité totale, l'espace généreux, la piscine privée et le jardin personnel sont des atouts majeurs pour les familles et les groupes d'amis. Les villas de la Palmeraie et des quartiers prestigieux offrent un calme absolu tout en étant à quelques minutes du centre-ville. Vous bénéficiez d'un espace entièrement privé où chaque membre de la famille peut profiter de ses centres d'intérêt.</p>

<h2>Les quartiers prisés</h2>

<h3>La Palmeraie</h3>
<p>La plus grande palmeraie du monde est le quartier le plus prestigieux de Marrakech pour la location de villas. Les propriétés de prestige, souvent dotées de piscines privées et de jardins luxuriants, offrent un cadre de rêve entouré de 100 000 palmiers-dattiers. C'est l'endroit idéal pour les voyageurs recherchant calme et espace, à 20 minutes du centre-ville.</p>

<h3>Guéliz</h3>
<p>Le quartier moderne de Marrakech, Guéliz, est prisé pour sa proximité avec les commerces, restaurants et galeries d'art. Les villas de Guéliz allient confort moderne et charme marocain, avec des équipements de premier ordre. C'est le quartier idéal pour ceux qui souhaitent profiter de la vie urbaine tout en disposant d'un cadre résidentiel agréable.</p>

<h3>L'Ourika</h3>
<p>La vallée de l'Ourika, à 30 minutes de Marrakech, offre un cadre naturel exceptionnel avec des villas perchées sur les flancs des montagnes. Les vues panoramiques sur l'Atlas et le calme de la vallée en font un choix parfait pour les voyageurs en quête de sérénité et de nature.</p>

<h2>Les services inclus</h2>
<p>Nos villas à Marrakech sont accompagnées de services sur mesure : majordome dédié, cuisinier privé, chauffeur, ménage quotidien, coaching sportif... Vous bénéficiez d'une attention personnalisée qui transforme votre séjour en une expérience véritablement luxueuse. Chaque détail est pensé pour votre confort, des produits d'accueil aux recommandations personnalisées.</p>

<h2>Le meilleur moment pour louer</h2>
<p>Les périodes de mi-saison (mars-mai, septembre-novembre) offrent le meilleur rapport qualité-prix tout en bénéficiant d'un climat ensoleillé idéal. La haute saison (juin-août) est parfaite pour les vacances en famille avec des températures chaudes et un ensoleillement optimal. La période hivernale (décembre-février) reste agréable avec des températures douces et un ensoleillement généreux, parfait pour profiter de la piscine chauffée.</p>

<p>Louer une villa à Marrakech, c'est choisir un hébergement d'exception qui transforme vos vacances en une véritable évasion dans un cadre de rêve. Le luxe, le confort et la culture marocaine se combinent pour créer des souvenirs inoubliables.</p>`,
  },
  {
    title: "Les avantages de louer une villa : idéal pour les familles et groupes d'amis",
    slug: "avantages-location-villa-familles-groupes",
    excerpt: "Rien de mieux que de partir en vacances ensemble. Découvrez pourquoi la villa est le choix parfait pour les familles et groupes.",
    image: "/images/blog/blog10.webp",
    author: "Amine",
    category: "Conseils",
    isPublished: true,
    content: `<h2>L'intimité et l'espace partagé</h2>
<p>Rien de mieux que de partir en vacances et de voyager ensemble ! Connaître de nouveaux endroits, se promener, profiter de chaque instant en famille ou entre amis, c'est un bonheur simple mais essentiel. La location d'une villa à Marrakech est le choix idéal pour les familles et les groupes d'amis qui souhaitent partager un séjour dans un cadre luxueux tout en conservant leur intimité. Contrairement à un hôtel, où chacun est dispersé dans des chambres différentes, la villa réunit tout le monde sous un même toit dans un espace commun généreux.</p>

<h2>Les avantages pour les familles</h2>

<h3>Sécurité et confort</h3>
<p>Les villas à Marrakech offrent un environnement sécurisé pour les enfants, avec des jardins clos, des piscines surveillées et des espaces de jeu. Les parents peuvent profiter en toute tranquillité pendant que les enfants se dépensent en toute sécurité. Les villas sont équipées de tout le confort moderne : climatisation, wifi, cuisines équipées et buanderies.</p>

<h3>Flexibilité horaire</h3>
<p>Avec une villa, vous n'êtes pas soumis aux horaires des hôtels. Les repas peuvent être pris à votre convenance, les enfants peuvent faire la sieste quand ils le souhaitent, et vous organisez votre journée selon vos envies. Le cuisinier privé peut préparer les repas selon les goûts et les régimes alimentaires de chacun, y compris les repas pour bébés et les plats sans allergènes.</p>

<h3>Espace de jeu et détente</h3>
<p>Les grandes surfaces des villas permettent aux enfants de se dépenser librement. Les piscines privées, les jardins spacieux et les terrasses offrent de multiples espaces de jeu et de détente. Les activités de plein air comme le badminton, le pétanque ou les jeux de piscine créent des moments de complicité familiale inoubliables.</p>

<h2>Les avantages pour les groupes d'amis</h2>

<h3>Économies réalisées</h3>
<p>Pour les groupes de 6 personnes et plus, la location d'une villa est souvent plus économique que la réservation de plusieurs chambres d'hôtel. Le coût par personne est considérablement réduit, tout en bénéficiant d'un espace et d'un confort supérieurs. Les villas de 4 à 8 chambres sont parfaitement adaptées aux groupes et offrent des espaces communs généreux pour les moments de partage.</p>

<h3>Moments de convivialité</h3>
<p>La villa est l'endroit idéal pour créer des souvenirs entre amis. Les dîners sur la terrasse, les soirées autour de la piscine, les après-midi de détente au jardin... Chaque moment devient une occasion de renforcer les liens d'amitié. Les villas avec salon extérieur et espace BBQ sont particulièrement appréciées pour les soirées conviviales.</p>

<h2>Les services sur mesure</h2>
<p>Nos villas à Marrakech sont accompagnées de services adaptés aux familles et aux groupes : baby-sitter, coach sportif, organisateur d'activités, guide local, chauffeur. Ces services vous permettent de profiter pleinement de votre séjour sans vous soucier de la logistique. Les activites sur mesure (cours de cuisine, promenade à dos de chameau, visite guidée) créent des expériences uniques pour chaque groupe.</p>

<h2>Le meilleur hébergement pour vos vacances</h2>
<p>Que vous soyez une famille avec enfants ou un groupe d'amis, la villa à Marrakech est le choix le plus avantageux pour des vacances réussies. Le confort, l'espace, l'intimité et les services personnalisés en font une option incomparable qui transforme chaque séjour en une véritable expérience de luxe et de partage. Les souvenirs créés dans une villa de Marrakech resteront gravés dans la mémoire de tous les membres du groupe.</p>`,
  },
];

async function main() {
  console.log("Seeding blog posts...");

  for (const post of posts) {
    const existing = await prisma.blogPost.findUnique({ where: { slug: post.slug } });
    if (existing) {
      console.log(`  Skipping "${post.title}" (already exists)`);
      continue;
    }
    await prisma.blogPost.create({
      data: {
        ...post,
        publishedAt: new Date(),
      },
    });
    console.log(`  Created: "${post.title}"`);
  }

  const count = await prisma.blogPost.count();
  console.log(`\nDone! Total blog posts in database: ${count}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
