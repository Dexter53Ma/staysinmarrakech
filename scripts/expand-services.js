const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const expansions = {
  "quad-buggy": `<h2>Quad et Buggy à Marrakech : l'aventure en plein air vous attend</h2>
<p>Marrakech est bien plus qu'une ville de palais et de souks — c'est aussi le point de départ d'aventures en plein air parmi les plus mémorables du Maroc. Le quad et le buggy sont les véhicules tout-terrain idéaux pour explorer les paysages variés qui entourent la ville rouge : oliveraies millénaires, palmeraies verdoyantes, villages berbères perchés sur les collines, wadis mystérieux et, en arrière-plan majestueux, les sommets enneigés de l'Atlas.</p>
<p>Notre base d'opérations est située à seulement 20 minutes du centre-ville de Marrakech, dans la campagne de l'Agafay. De là, vous partez en aventure de 1h30 à 4h selon le forfait choisi, à travers des itinéraires soigneusement balisés et des panoramas à couper le souffle. Que vous soyez un débutant complet ou un praticien expérimenté, nous avons le parcours parfait pour vous.</p>

<h2>Quad vs Buggy : quel véhicule choisir ?</h2>
<h3>Le quad (ATV) — pour les amateurs de sensations</h3>
<p>Le quad est un quatre-roues tout-terrain, robuste et maniable. Il se conduit debout ou assis, ce qui offre une meilleure visibilité et une sensation de liberté totale face aux paysages grandioses. Le quad est idéal pour les amateurs de sensations fortes et les personnes à l'aise avec un véhicule plus sportif. À partir de 14 ans accompagné d'un adulte, ou 16 ans pour conduire seul, c'est le véhicule le plus populaire auprès de nos clients.</p>
<p>Nos quads sont des Honda TRX 420 et Yamaha Grizzly 700, des véhicules réputés pour leur fiabilité, leur robustesse et leurs performances en tout terrain. Chaque quad est équipé de suspensions longue course pour absorber les creux et les bosses, de pneus tout-terrain performants pour une adhérence maximale, de protections main et d'un kit complet de premiers secours. Le réservoir offre une autonomie de 80 km minimum, suffisant pour profiter pleinement de chaque excursion.</p>
<p>Le guidon ergonomique et les commandes intuitives rendent la conduite accessible même aux personnes qui n'ont jamais touché un quad. Nos moniteurs vous expliquent les bases en 15 minutes : démarrage, freinage, vitesse, virages. En quelques minutes, vous êtes à l'aise et prêt à profiter du paysage et des sensations.</p>

<h3>Le buggy — confort et accessibilité pour tous</h3>
<p>Le buggy est un véhicule plus stable et plus confortable que le quad, avec une carrosserie ouverte qui protège du vent et de la poussière tout en offrant une vue panoramique exceptionnelle. Il se conduit assis confortablement, avec un volant classique et une boîte de vitesses automatique, ce qui le rend accessible même aux débutants complets. Le buggy est idéal pour les couples en quête d'une aventure partagée, les familles avec enfants à partir de 10 ans, et les personnes qui préfèrent un rythme plus posé. La position assise protégée et le volant offrent un confort supérieur lors des excursions longues. Le buggy transporte deux personnes côte à côte, permettant de partager l'expérience en discutant et en admirant les paysages ensemble.</p>
<p>Nos buggies sont des Yamaha YXZ1000R, des véhicules performants mais faciles à conduire. La boîte automatique à 6 rapports et l'assistance de direction rendent la conduite agréable même sur des terrains accidentés. Le réservoir offre une autonomie de 120 km pour des excursions prolongées sans contrainte.</p>

<h2>Nos parcours variés — de la découverte à l'intense</h2>
<h3>Parcours Découverte (1h30 — 25 km)</h3>
<p>Idéal pour les débutants et les familles, ce parcours traverse les oliveraies centenaires de la plaine de l'Agafay, les villages berbères traditionnels et les champs cultivés de la campagne environnante. Le terrain est relativement plat avec quelques légères bosses, parfait pour prendre confiance et apprécier les paysages. Les points de vue panoramiques sur l'Atlas sont magnifiques, particulièrement au lever et au coucher du soleil. Un arrêt thé est prévu au milieu du parcours, dans un olivier séculaire, pour savourer un thé à la menthe authentique.</p>

<h3>Parcours Aventure (2h30 — 45 km)</h3>
<p>Pour les personnes qui ont déjà conduit un quad ou un buggy, ce parcours vous emmène plus loin dans la campagne, à travers des wadis asséchés, des collines rocheuses et des villages berbères perchés. Les montées et descentes sont plus prononcées, les virages plus serrés et les paysages plus dramatics. Un déjeuner pique-nique est inclus au sommet d'une colline, avec vue à 360° sur la plaine de l'Haouz et les sommets de l'Atlas. Ce parcours combine parfaitement l'adrénaline de la conduite tout-terrain avec la beauté des paysages et la richesse des rencontres humaines.</p>

<h3>Parcours Intense (3h30 — 65 km)</h3>
<p>Réservé aux pratiquants expérimentés, ce parcours est une véritable aventure dans les terres. Les passages techniques sont nombreux : wadis à franchir, collines à escalader, pistes de montagne à maîtriser. Les panoramas sont à couper le souffle : vallées profondes, crêtes rocheuses, oasis cachées. Ce parcours inclut un arrêt dans un village berbère authentique où vous partagez un thé avec les habitants, et une visite d'un ancien ksar fortifié. C'est une immersion totale dans la campagne marocaine, loin de toute trace de tourisme de masse.</p>

<h3>Parcours Coucher de soleil (2h — 35 km)</h3>
<p>Le parcours le plus romantique et le plus photogénique. Vous partez en fin d'après-midi et traversez les paysages dorés de l'Agafay au moment où la lumière devient magique. Le parcours se termine sur un belvédère naturel d'où vous contemplez le coucher de soleil derrière les sommets de l'Atlas, avec un verre de thé à la menthe et des pâtisseries. Les couleurs du ciel — orange, rose, violet, doré — se reflètent sur les rochers rouges du désert d'Agafay. C'est un moment de pure magie qui restera éternellement gravé dans votre mémoire.</p>

<h2>Sécurité et encadrement — notre priorité absolue</h2>
<p>Chaque excursion est encadrée par un moniteur certifié, titulaire du brevet professionnel de moniteur de sports mécaniques et formé aux premiers secours. Le ratio est de 1 moniteur pour 4 participants maximum, ce qui garantit un suivi personnalisé et une réactivité immédiate en cas de besoin.</p>
<p>Avant chaque départ, un briefing de sécurité complet de 15 minutes couvre les bases de la conduite tout-terrain, les règles à respecter sur le parcours, l'utilisation des freins et des vitesses, et les consignes en cas d'obstacle imprévu. Un casque homologué, des gants, des lunettes de protection et un gilet haute visibilité sont fournis et obligatoires.</p>
<p>Tous nos véhicules sont entretenus et vérifiés avant chaque sortie par notre équipe mécanique. Les freins, pneus, suspensions et éclairage sont contrôlés quotidiennement. Un kit de premiers secours complet, un extincteur et un téléphone satellite sont embarqués sur chaque véhicule. Nos moniteurs connaissent parfaitement le terrain et les conditions météorologiques, et ils adaptent le parcours en temps réel si nécessaire.</p>

<h2>Logistique pratique — tout est inclus pour votre confort</h2>
<p>Un transfert aller-retour depuis votre villa ou votre hôtel à Marrakech est inclus dans tous nos forfaits. Notre véhicule de récupération passe à l'heure convenue et vous dépose à la base d'opérations. Le retour se fait à la fin de l'excursion, avec une douche et des vestiaires disponibles sur place.</p>
<p>Nous fournissons des vêtements adaptés si nécessaire, de l'eau fraîche en quantité suffisante, des collations énergétiques et de la crème solaire. Pour les excursions longues, un déjeuner pique-nique gastronomique est inclus : tajine préparé sur place, salade fraîche, fruits de saison et thé à la menthe.</p>
<p>La réservation est simple et flexible. Vous pouvez réserver par téléphone, par e-mail ou en ligne. L'annulation est gratuite jusqu'à 24h avant l'excursion. Nous acceptons les paiements en espèces, par carte bancaire et par virement. Un acompte de 30% est demandé à la réservation, le solde étant réglé le jour de l'excursion.</p>`,

  "montgolfiere-marrakech": `<h2>Vol en Montgolfière à Marrakech : une expérience magique au-dessus de la ville rouge</h2>
<p>Le vol en montgolfière au-dessus de Marrakech est l'une des expériences les plus mémorables que l'on puisse vivre au Maroc. Au lever du soleil, quand la lumière dorée baigne la ville rouge et que les sommets de l'Atlas se parent de rose, décoller dans la douceur d'une montgolfière est un moment de pur bonheur qui transcende le simple voyage touristique. C'est une aventure silencieuse, contemplative et profondément émouvante qui vous permettra de voir Marrakech sous un angle absolument unique.</p>
<p>Contrairement aux vols en hélicoptère bruyants et stressants, le vol en montgolfière est une expérience silencieuse et contemplative. Pas de bruit de moteur, pas de vibrations — juste le crépitement occasionnel du brûleur, le chant des oiseaux au lever du soleil et le murmure du vent. C'est une méditation en plein ciel, un moment suspendu dans le temps où chaque seconde est précieuse et inoubliable.</p>

<h2>Le déroulement complet du vol — du transfert à la célébration</h2>
<h3>Transfert et accueil chaleureux</h3>
<p>Un chauffeur vous récupère à votre villa entre 5h00 et 5h30 selon la saison et vous conduit au terrain de décollage de l'Agafay, à environ 30 minutes du centre-ville. Sur place, un café thé chaud et des pâtisseries traditionnelles sont servis pendant que l'équipe technique prépare méticuleusement la montgolfière. L'ambiance est festive mais détendue : musique marocaine traditionnelle en fond sonore, rires, anticipation et excitement palpables. Vous observez l'enveloppement du ballon par la chaleur des brûleurs, un spectacle impressionnant en soi.</p>
<p>L'équipe technique explique en détail le fonctionnement de la montgolfière, les principes physiques du vol, et les consignes de sécurité. Vous pouvez poser toutes vos questions et même participer à la préparation si vous le souhaitez. Cette phase de préparation dure environ 45 minutes et fait partie intégrante de l'expérience.</p>

<h3>Le vol lui-même — 1 heure de magie pure</h3>
<p>Le vol dure environ 1 heure et offre des vues panoramiques magnifiques à 360° sur la ville, la campagne environnante et les montagnes majestueuses de l'Atlas. Le pilote expérimenté ajuste l'altitude pour vous faire survoler les quartiers emblématiques de la médina, les jardins de la Ménara avec leur bassin mythique, le golf Royal et les villages berbères des alentours. Au loin, les sommets du Toubkal et du Mgoun se dessinent à l'horizon, majestueux et éternels.</p>
<p>La sensation de légèreté est extraordinaire. Sans parois de verre entre vous et le paysage, vous êtes véritablement dans le paysage, pas simplement en train de l'observer. L'air est frais et pur, les couleurs sont intenses, les détails se dessinent avec une clarté surprenante. Vous distinguez les moindres détails de la médina : les minarets des mosquées, les toits terrasses des riads, les ruelles sinueuses, les animations de la place Jemaa el-Fna qui commence à s'animer.</p>
<p>Le pilote partage ses connaissances sur l'histoire de Marrakech, la géographie de la région, l'architecture des monuments et les traditions locales. Ses anecdotes et ses expériences rendent le vol encore plus riche et mémorable. Vous comprenez pourquoi Marrakech est surnommée « la ville rouge » et pourquoi elle fascine les voyageurs depuis des siècles.</p>

<h3>Atterrissage et célébration — le moment festif</h3>
<p>L'atterrissage est doux et parfaitement contrôlé, généralement dans un champ de la campagne environnante. L'équipe au sol vous attend avec un petit-déjeuner champagne festif : jus d'orange frais pressé, champagne ou jus de fruits, croissants chauds, pain grillé avec confitures artisanales, fruits frais de saison et pâtisseries marocaines. C'est un moment de convivialité et de partage, où les passagers échangent leurs impressions et leurs photos.</p>
<p>Chaque participant reçoit un certificat de vol personnalisé avec la date, le nom du pilote et les détails du vol. C'est un souvenir précieux que vous conserverez éternellement. Une séance photo est organisée pendant le remplissage du ballon et pendant le vol — les images sont disponibles en haute résolution sur notre plateforme en ligne.</p>

<h2>Pourquoi voler au lever du soleil ?</h2>
<p>Le lever du soleil est le moment idéal pour voler en montgolfière à Marrakech pour plusieurs raisons. La lumière est dorée et douce, parfaite pour la photographie. Les vents sont calmes et stables, garantissant un vol sûr et agréable. La température est fraîche et agréable, contrairement à la chaleur de midi. Et surtout, le spectacle du soleil se levant derrière les sommets de l'Atlas, baignant la ville rouge d'une lumière magique, est tout simplement époustouflant.</p>
<p>La durée du vol est d'environ 1 heure, suffisante pour profiter pleinement du spectacle sans que l'expérience ne devienne fatigante. Les passagers de tous âges — de 6 ans à 80 ans — peuvent profiter du vol en toute sécurité. Les seules contre-indications sont la grossesse avancée et les problèmes cardiaques graves.</p>

<h2>Sécurité et certifications — notre engagement</h2>
<p>Tous nos pilotes sont titulaires de la licence de pilote de montgolfière délivrée par l'AACM (Association des Aviateurs Civils du Maroc) avec plus de 500 heures de vol. Nos montgolfières sont des Cameron A-210, des ballons de fabrication britannique réputés pour leur fiabilité et leur sécurité. Chaque ballon est inspecté et entretenu selon les normes internationales les plus strictes.</p>
<p>Avant chaque vol, une météo détaillée est analysée. Le vol n'a lieu que si les conditions sont parfaites : vent inférieur à 15 km/h, pas de pluie, bonne visibilité. La sécurité est notre priorité absolue — si les conditions ne sont pas réunies, le vol est reporté sans frais supplémentaires.</p>
<p>L'assurance responsabilité civile est contractée pour chaque vol. Un téléphone satellite est embarqué, et l'équipe au sol suit le vol en temps réel par GPS. En cas d'atterrissage d'urgence, l'équipe de secours est sur place en moins de 15 minutes.</p>

<h2>Réservation et conditions pratiques</h2>
<p>Le vol en montgolfière est disponible tous les jours de l'année, sauf en cas de conditions météorologiques défavorables. Le départ est entre 5h30 et 6h30 selon la saison. La durée totale de l'expérience — transfert inclus — est d'environ 4 heures.</p>
<p>Le tarif comprend le transfert aller-retour depuis votre villa, le vol d'une heure, le petit-déjeuner champagne, le certificat de vol et les photos haute résolution. Un vêtement chaud est fourni pendant le vol (il fait frais en altitude tôt le matin). La réservation est simple : par téléphone, par e-mail ou en ligne. L'annulation est gratuite jusqu'à 48h avant le vol.</p>`,

  "wakeboard-marrakech": `<h2>Wakeboard à Marrakech : glisse sur les eaux cristallines de l'Agafay</h2>
<p>Le wakeboard est l'une des activités les plus fun et accessibles de Marrakech. Sur les lacs artificiels de l'Agafay, à 30 minutes du centre-ville, vous pouvez pratiquer ce sport de glisse en toute sécurité, avec un encadrement professionnel et du matériel de dernière génération. Les eaux calmes et cristallines de l'Agafay, encadrées par des paysages montagneux spectaculaires, offrent des conditions idéales pour les débutants comme pour les confirmés. C'est une expérience à la fois sportive et esthétique, où la beauté du cadre accentue le plaisir de la glisse.</p>
<p>Le wakeboard est un sport de glisse qui combine le snowboard, le surfing et le water-ski. Vous êtes attaché à une planche et tiré par un câble fixé à un bateau ou à un système de câbles. Le but est de glisser sur l'eau, de faire des virages, des sauts et des figures. C'est un sport accessible dès le premier essai, mais qui offre une progression infinie pour les plus ambitieux. L'apprentissage est rapide et gratifiant — la plupart des débutants réussissent à se lever dès la première tentative.</p>

<h2>Cours pour tous les niveaux — de l'initiation à la compétition</h2>
<h3>Débutants — apprenez en 30 minutes</h3>
<p>Vous n'avez jamais fait de wakeboard ? Parfait. Nos moniteurs certifiés vous apprennent les bases en 30 minutes : posture correcte sur la planche, équilibre, démarrage depuis l'eau, premiers virages. La plupart des débutants réussissent à se lever dès la première tentative — c'est un sport plus accessible qu'il n'y paraît quand on a les bons conseils.</p>
<p>Les moniteurs sont patients, pédagogues et passionnés. Ils transmettent leur amour du sport avec enthousiasme communicatif et adaptent leur pédagogie à chaque apprenant. L'approche est progressive et encourageante : d'abord rester debout, puis glisser droit, puis faire les premiers virages, puis progresser vers les figures plus avancées. Chaque étape est célébrée, chaque progrès est encourage.</p>
<p>Le matériel de débutant est spécialement adapté : planches plus stables, harnais confortables, câbles à vitesse réduite. Vous progressez à votre rythme, sans pression, dans un cadre sécurisé et bienveillant. Les eaux calmes de l'Agafay sont idéales pour apprendre — pas de vagues, pas de courants, une eau plate et prévisible.</p>

<h3>Intermédiaires — perfectionnez votre technique</h3>
<p>Vous avez déjà fait du wakeboard et vous voulez progresser ? Nos moniteurs vous aident à perfectionner vos virages, à améliorer votre posture, à maîtriser les changements de direction et à aborder les premiers sauts. Le système de câbles moderne (System 2.0) offre une tension constante et une vitesse réglable, idéal pour la progression rapide et sécurisée.</p>
<p>Vous apprenez les techniques avancées : edging (utilisation des bords de la planche), carving (virages fluides et puissants), jump (saut depuis la surface), grabs (attraper la planche en l'air). Chaque technique est décomposée en étapes simples et progressives, avec des démonstrations en direct et des exercices ciblés.</p>

<h3>Confirmés — repoussez vos limites</h3>
<p>Pour les pratiquants avancés, nos moniteurs proposent des sessions intensives de figures : sauts avec rotation (180°, 360°), grabs variés (mute, indy, melon), sliding sur les obstacles aquatiques. Les installlations incluent des rails, des kickers et des funboxes pour les riders expérimentés. C'est l'endroit parfait pour repousser vos limites et apprendre de nouvelles figures dans un cadre sécurisé.</p>

<h2>Matériel et sécurité — tout est fourni</h2>
<p>Nous fournissons tout le matériel nécessaire pour votre session : wakeboard adapté à votre niveau et à votre poids, gilet de sauvetage homologué, casque de protection, combinaison néoprène selon la saison pour un confort thermique optimal. Le matériel est régulièrement inspecté, entretenu et remplacé pour garantir votre sécurité et votre confort.</p>
<p>Les moniteurs sont brevetés BNSSA (Brevet National de Sécurité et de Sauvetage Aquatique) et titulaires du brevet professionnel de moniteur de wakeboard. Ils sont présents sur le bord de l'eau pendant toute la session et interviennent immédiatement en cas de chute ou de besoin d'assistance. Le ratio est de 1 moniteur pour 6 pratiquants maximum.</p>
<p>Un briefing de sécurité complet précède chaque session : utilisation du matériel, règles de sécurité sur l'eau, signaux à adopter en cas de besoin. Les zones de navigation sont balisées et surveillées. Un kit de premiers secours est disponible au bord de l'eau, et un médecin est joignable en cas d'urgence.</p>

<h2>Cadre exceptionnel — un décor de carte postale</h2>
<p>Les lacs de l'Agafay offrent un cadre véritablement exceptionnel pour pratiquer le wakeboard. Les eaux calmes et cristallines sont bordées de rochers rouges et de collines arides, avec en toile de fond les sommets enneigés de l'Atlas. La lumière est dorée et dorée, les paysages sont grandioses, et l'ambiance est à la fois sportive et détendue.</p>
<p>Le spot est accessible en 30 minutes depuis le centre-ville de Marrakech. Un parking gratuit est disponible à proximité. Les installations comprennent un vestiaire, des douches, une terrasse ombragée avec vue sur le lac et un bar servant boissons fraîches et collations. C'est l'endroit idéal pour passer une demi-journée ou une journée complète entre amis ou en famille.</p>

<h2>Réservation et tarifs</h2>
<p>Les sessions de wakeboard sont disponibles tous les jours de 9h00 à 18h00. Les sessions durent 30 minutes ou 1 heure selon votre choix. Le tarif comprend le matériel complet, l'encadrement par un moniteur certifié et l'accès aux installations. La réservation est simple et flexible — en ligne, par téléphone ou sur place. Annulation gratuite jusqu'à 24h avant la session.</p>`,

  "excursions-vtt": `<h2>VTT à Marrakech : deux-roues dans la campagne marocaine</h2>
<p>Marrakech et ses alentours offrent un terrain de jeu idéal pour les amateurs de VTT. Plaines fertiles de l'Haouz, collines arides de l'Agafay, villages berbères perchés sur les flancs des collines, palmeraies verdoyantes, oliveraies centenaires — les paysages sont variés et les parcours sont adaptés à tous les niveaux. Notre service de location de VTT avec guide vous permet de découvrir ces paysages de manière active, authentique et responsable, tout en profitant de l'expertise de cyclistes passionnés qui connaissent chaque recoin de la campagne environnante.</p>
<p>Que vous soyez un cycliste occasionnel recherchant une balade agréable ou un VTTiste expérimenté en quête de challenges techniques, nous avons le parcours parfait pour vous. Nos guides adaptent le rythme, les arrêts et les itinéraires aux capacités et aux souhaits de chaque groupe, garantissant une expérience à la fois sportive et agréable.</p>

<h2>Nos parcours — trois niveaux pour tous les cyclistes</h2>
<h3>Parcours Plaine (niveau facile — 15 km — 2h30)</h3>
<p>Pour les débutants, les familles et les personnes qui souhaitent une balade agréable sans difficulté technique, ce parcours de 15 km traverse les plaines fertiles de l'Haouz et les oliveraies environnantes. Le terrain est plat ou très doucement vallonné, les pistes sont bien entretenues et les points de vue sont magnifiques. Vous passez à travers les champs de blé, d'orge et d'olives, vous traversez des villages berbères traditionnels où les habitants vous saluent chaleureusement, et vous faites un arrêt dans un café local pour savourer un thé à la menthe.</p>
<p>Ce parcours est accessible aux enfants à partir de 10 ans (accompagnés d'un adulte) et aux personnes qui n'ont pas l'habitude du VTT. Le guide adapte le rythme au plus lent du groupe et s'arrête régulièrement pour expliquer la culture locale, les techniques agricoles et les traditions berbères. C'est une expérience à la fois sportive et culturelle, parfaite pour découvrir la campagne marocaine loin des sentiers battus.</p>

<h3>Parcours Colline (niveau intermédiaire — 30 km — 4h)</h3>
<p>Pour les cyclistes habitués au VTT, ce parcours de 30 km comprend des montées modérées, des descentes techniques sur terrain rocheux, des passages de wadis asséchés et des pistes de terre battue. Les paysages sont spectaculaires : vallées profondes, crêtes rocheuses, villages perchés, vues dégagées sur la plaine de l'Haouz. Le niveau de fitness requis est moyen — il faut être à l'aise avec des montées de 15 à 20 minutes et des descentes techniques.</p>
<p>Le parcours inclut un déjeuner pique-nique au sommet d'une colline, avec vue à 360° sur les paysages environnants. Le pique-nique est préparé sur place par notre équipe : tajine de poulet aux olives, salade marocaine, fruits frais, thé à la menthe. C'est un moment de repos et de partage au milieu de la nature, avec un cadre magnifique et un silence absolu.</p>

<h3>Parcours Atlas (niveau confirmé — 50 km — 6h)</h3>
<p>Pour les sportifs aguerris et les VTTistes expérimentés, ce parcours de 50 km vous emmène dans les contreforts de l'Atlas. Montées exigeantes (jusqu'à 800 m de dénivelé positif), descentes techniques sur terrain varié (rochers, racines, sable), passages de rivières et sentiers de montagne. Les paysages sont grandioses : gorges profondes, forêts de cèdres, sommets enneigés au loin. C'est une aventure physique et mentale unique qui vous fera découvrir des aspects de la campagne marocaine que peu de touristes ont l'occasion de voir.</p>
<p>Le parcours inclut un déjeuner copieux dans un village berbère, où vous êtes accueillis par une famille locale qui vous prépare un repas traditionnel. Vous partagez le repas avec vos hôtes, vous échangez sur vos cultures respectives et vous découvrez le mode de vie berbère dans toute son authenticité. C'est une expérience humaine aussi riche que l'expérience sportive elle-même.</p>

<h2>Vélos et matériel fournis — qualité et confort</h2>
<p>Nous proposons des vélos VTT de dernière génération des marques Scott, Specialized et Giant, équipés de suspensions avant et arrière pour un confort optimal sur terrain accidenté, de freins à disque hydrauliques pour un freinage puissant et modulable, et de vitesses Shimano à 12 rapports pour s'adapter à tous les profils de pente. Les vélos sont entretenus et vérifiés avant chaque sortie par notre mécanicien.</p>
<p>Nous fournissons également un casque homologué, des gants de protection, une gourde d'eau, un kit de réparation de base (chambre à air, multi-outil, pompe mini) et un gilet haute visibilité pour les passages sur route. Pour les sorties longues, un sac à dos technique est fourni pour transporter les affaires personnelles et l'eau supplémentaire.</p>

<h2>Encadrement et sécurité — des guides passionnés et compétents</h2>
<p>Tous nos guides sont des cyclistes passionnés, titulaires du brevet professionnel de moniteur de VTT et formés aux premiers secours (PSC1). Ils connaissent parfaitement le terrain, les conditions météorologiques et les points d'eau, et ils adaptent le parcours en temps réel selon les conditions et les capacités du groupe.</p>
<p>Le ratio est de 1 guide pour 6 participants maximum. Un téléphone portable et un kit de premiers secours sont embarqués. L'assurance responsabilité civile est contractée pour chaque sortie. Les mineurs de moins de 16 ans doivent être accompagnés d'un adulte. Un briefing de sécurité est donné avant chaque départ.</p>

<h2>Réservation et disponibilités</h2>
<p>Les excursions VTT sont disponibles tous les jours de 8h00 à 17h00, sauf en cas de pluie ou de conditions météorologiques dangereuses. Le transfert depuis votre villa est inclus. La réservation est simple et flexible — en ligne, par téléphone ou par e-mail. L'annulation est gratuite jusqu'à 24h avant la sortie.</p>`,

  "grand-canyon-marrakech": `<h2>Grand Canyon de Marrakech : aventure dans les gorges spectaculaires</h2>
<p>À seulement 45 minutes de Marrakech, les gorges du Grand Canyon offrent un paysage lunaire d'une beauté saisissante. Parois rocheuses rouges et oranges sculptées par des millions d'années d'érosion, formations géologiques extraordinaires, wadis asséchés et cascades saisonnières — c'est un décor de film d'aventure qui vous attend pour une expérience physique et mentale unique. Le canyonisme est une activité qui combine randonnée, escalade légère, nage en eau libre et exploration de grottes, le tout dans un cadre naturel grandiose et préservé.</p>
<p>Contrairement aux idées reçues, le canyonisme n'est pas réservé aux sportifs aguerris. Nos excursions sont adaptées à tous les niveaux de condition physique, du débutant complet au pratiquant expérimenté. L'important est de savoir nager et d'être à l'aise dans l'eau — le reste s'apprend sur place avec nos guides certifiés et passionnés.</p>

<h2>Le programme complet de l'excursion</h2>
<h3>Transfert et préparation</h3>
<p>Un 4x4 robuste et confortable vous récupère à votre villa entre 7h30 et 8h00 et vous conduit au point de départ des gorges, à environ 45 minutes de Marrakech. Le trajet en 4x4 est déjà une aventure en soi : les pistes de terre rouge serpentent à travers la campagne, les villages berbères apparaissent et disparaissent, et les premières parois rocheuses se dessinent à l'horizon.</p>
<p>Sur place, les guides distribuent le matériel (casque, baudrier, néoprène si nécessaire, chaussures aquatiques) et donnent un briefing de sécurité complet de 20 minutes. Ils expliquent les techniques de descente, les consignes de sécurité dans l'eau et les signalisations à adopter. Le matériel est vérifié et ajusté individuellement pour chaque participant.</p>

<h3>La descente — 3 heures d'aventure pure</h3>
<p>La descente dure environ 3 heures et couvre 8 km de terrain varié et passionnant. Vous traversez des wadis à l'eau vive (selon la saison), escaladez des parois rocheuses avec cordes et baudriers (passages assurés), sautez dans des bassins naturels d'une turquoise éblouissante et explorez des grottes aux formes sculptées par l'eau et le temps.</p>
<p>Les guides encadrent chaque passage technique avec un système de cordes professionnel et un baudrier de sécurité. Le ratio est de 1 guide pour 6 participants maximum, ce qui garantit un suivi individuel et une sécurité optimale. Chaque saut dans l'eau est évalué par le guide — il n'y a aucune obligation de sauter, et des alternatives existent pour chaque passage.</p>
<p>Les paysages au fil de la descente sont époustouflants : parois vertigineuses de 100 m de haut, arches naturelles, cascades, bassins d'eau claire et fraîche, formations rocheuses aux couleurs changeantes. Le silence absolu, ponctué uniquement par le chant des oiseaux et le bruit de l'eau, crée une atmosphère de méditation et de connexion avec la nature.</p>

<h3>Déjeuner dans les gorges</h3>
<p>Au milieu de la descente, un déjeuner pique-nique gastronomique vous attend sur les berges d'un bassin naturel ombragé. Le menu comprend un tajine de bœuf aux légumes préparé sur place, une salade marocaine fraîche, du pain chaud, des fruits de saison et du thé à la menthe. C'est un moment de repos, de partage et de contemplation au cœur des gorges, dans un cadre absoluement unique.</p>

<h3>La remontée — plus facile mais tout aussi belle</h3>
<p>La remontée se fait par un sentier aménagé qui grimpe doucement le long des parois du canyon. Le sentier est balisé et sécurisé avec des mains courantes aux endroits techniques. La vue sur les gorges depuis le haut est spectaculaire — vous découvrez l'ampleur du parcours que vous venez de faire et la beauté du canyon vu d'en haut. La remontée dure environ 1 heure et est nettement plus facile que la descente.</p>

<h2>Sécurité et encadrement — des professionnels certifiés</h2>
<p>Toutes nos excursions sont encadrées par des guides certifiés en canyonisme (Brevet d'État) et secouristes (PSC1 et SST). Le ratio de 1 guide pour 6 participants maximum garantit un suivi personnalisé et une réactivité immédiate en cas de besoin. Le matériel technique (cordes, baudriers, casques, descendeurs) est inspecté et remplacé régulièrement selon les normes EN.</p>
<p>Un kit de premiers secours complet est emporté, et un téléphone satellite permet de joindre les secours en cas d'urgence. Les guides connaissent parfaitement le terrain et les conditions d'eau, et ils adaptent l'excursion en temps réel si nécessaire (crue soudaine, météo changeante). L'assurance responsabilité civile est contractée pour chaque sortie.</p>

<h2>Conditions physiques et matériel</h2>
<p>L'excursion nécessite un niveau de condition physique moyen. Il faut savoir nager (bassin de natation obligatoire avant l'excursion pour les personnes incertaines), être à l'aise dans l'eau et avoir une mobilité correcte. L'âge minimum est de 12 ans accompagné d'un adulte. Nous fournissons tout le matériel technique nécessaire : casque, baudrier, cordes, néoprène, chaussures aquatiques. Il suffit de porter des vêtements de sport, de prendre une bouteille d'eau et de venir l'esprit ouvert.</p>

<h2>Réservation et disponibilités</h2>
<p>Les excursions canyon sont disponibles de mars à novembre (selon les conditions d'eau). Le départ est à 8h00 et le retour est prévu vers 16h00. La réservation est obligatoire et se fait en ligne, par téléphone ou par e-mail. L'annulation est gratuite jusqu'à 48h avant l'excursion. Le tarif comprend le transfert aller-retour, le matériel technique, l'encadrement par des guides certifiés et le déjeuner pique-nique.</p>`,

  "golf-marrakech": `<h2>Golf à Marrakech : un paradis pour les golfeurs sous le soleil de l'Atlas</h2>
<p>Marrakech est l'une des destinations golf les plus prisées d'Afrique et du monde entier. Avec plus de 15 parcours d'exception dessus par des architectes de renommée internationale, un ensoleillement de 300 jours par an, un climat doux toute l'année et un cadre grandiose avec vue permanente sur les sommets enneigés de l'Atlas, la ville rouge offre une expérience de golf unique qui attire les joueurs de tous les continents. Des beginners aux professionnels, chaque golfeur trouve son bonheur dans les parcours variés et exigeants de Marrakech.</p>
<p>La saison de golf à Marrakech est idéale d'octobre à mai, avec des températures comprises entre 18°C et 28°C. Même en hiver, les parcours sont jouables et les conditions sont excellentes. Les fairways sont entretenus au plus haut standard, les greens sont rapides et rolling, et les bunkers sont soigneusement curés. C'est un environnement de jeu digne des meilleurs clubs européens, dans un cadre culturel et paysager incomparable.</p>

<h2>Nos parcours recommandés — trois excellences à découvrir</h2>
<h3>Le Royal Golf Marrakech — le classique prestigieux</h3>
<p>Le Royal Golf Marrakech est le plus ancien et le plus prestigieux parcours de la ville. Créé en 1927 et entièrement rénové, il a accueilli les plus grands noms du golf mondial, dont les Rois du Maroc eux-mêmes. Les 18 trous (par 72, 6 200 m) parcourent des jardins majestueux de 200 hectares, des oliveraies centenaires et des palmeraies verdoyantes. Les fairways sinueux et les greens stratégiquement placés offrent un défi technique tout en restant accessibles.</p>
<p>Le club-house est un bâtiment élégant inspiré de l'architecture marocaine traditionnelle, avec vue sur le 18e trou et les montagnes de l'Atlas. Le restaurant propose une gastronomie raffinée marocaine et internationale. La boutique de golf propose du matériel des plus grandes marques et des articles exclusifs souvenirs.</p>

<h3>Al Maaden Golf — le moderne spectaculaire</h3>
<p>Al Maaden Golf est un parcours moderne et spectaculaire conçu par l'architecte Kyle Phillips, l'un des plus grands noms du design de golf mondial. Les 18 trous (par 72, 6 800 m) sont implantés dans un cadre grandiose de 150 hectares, avec des fairways larges, des greens complexes et des obstacles naturels impressionnants. Les vues sur l'Atlas sont spectaculaires depuis chaque trou.</p>
<p>Le parcours a reçu de nombreux prix internationaux, dont le « Best New Golf Course in Africa » décerné par l'International Golf Magazine. Les conditions de jeu sont exceptionnelles : greens ultrarapides, fairways immaculés, bunkers de sable blanc. Le practice est équipé de 40 postes couverts avec analyse de swing par vidéo.</p>

<h3>Amelkis Golf — l'accessible et convivial</h3>
<p>Amelkis Golf offre 27 trous accessibles et agréables, répartis en 3 parcours de 9 trous. C'est le parcours idéal pour les familles, les débutants et les groupes mixtes où les niveaux varient. Les fairways sont larges, les greens sont généreux et les obstacles naturels sont bien balisés. L'ambiance est détendue et conviviale, parfaite pour passer un agréable moment entre amis ou en famille.</p>
<p>Le club-house propose un restaurant avec terrasse ombragée, une boutique de golf, des vestiaires confortables et une piscine. Les leçons de golf sont disponibles pour les débutants et les joueurs qui souhaitent améliorer leur jeu. Le practice couvert de 40 postes permet de s'échauffer confortablement même les jours de grande chaleur.</p>

<h2>Services complémentaires — tout est prévu pour votre confort</h2>
<h3>Leçons avec nos professeurs PGA</h3>
<p>Nos professeurs PGA certifiés proposent des leçons individuelles ou collectives pour tous les niveaux, du débutant absolu au joueur confirmé qui souhaite perfectionner un aspect spécifique de son jeu. Les leçons durent 45 minutes ou 1 heure et incluent l'analyse de swing par vidéo, les exercices pratiques et les conseils personnalisés. Les professeurs sont francophones, expérimentés et passionnés par la transmission de leur savoir.</p>

<h3>Location de matériel professionnel</h3>
<p>Nous proposons la location complète de clubs des plus grandes marques (Titleist, Callaway, TaylorMade) adaptés à votre gabarit et à votre niveau. Les sets comprennent driver, bois, hybrides, fers, wedges et putter. Des chariots électriques (GPS intégré), des caddies manuels et des chaussures de golf sont également disponibles. Le matériel est en excellent état et régulièrement renouvelé.</p>

<h3>Organisation de tournois et d'événements</h3>
<p>Pour les groupes de plus de 8 personnes, nous organisons des tournois complets avec scoring personnalisé, classification, prix et cocktail de clôture. Les formats incluent : Stableford, Better Ball, Scramble, Shot Gun. Nous gérons l'intégralité de l'événement : réservation des tee times, distribution du matériel, organisation du scoring, remise des prix. C'est l'activité idéale pour les séminaires d'entreprise, les événements de team building et les célébrations entre amis.</p>

<h2>Transferts et logistique</h2>
<p>Un transfert aller-retour depuis votre villa ou votre hôtel à Marrakech est inclus dans tous nos forfaits. Le transfert dure 15 à 30 minutes selon le parcours choisi. Nous réservons vos tee times aux heures idéales (matin tôt ou fin d'après-midi pour éviter la chaleur) et nous gérons toutes les démarches administratives. Il vous suffit de vous présenter au parcours avec votre tenue de golf et de profiter de votre journée.</p>

<h2>Réservation et disponibilités</h2>
<p>Les parcours de golf sont ouverts tous les jours de l'année. Les réservations de tee times se font en ligne, par téléphone ou par e-mail. Nous recommandons de réserver au moins une semaine à l'avance pendant la haute saison (octobre à avril). Le tarif comprend le transfert, le green fee et le chariot électrique. Les leçons de golf et la location de matériel sont en supplément.</p>`,
};

async function main() {
  console.log("Expanding services 7-12 to 2000+ words...\n");

  for (const [slug, longDescription] of Object.entries(expansions)) {
    const wordCount = longDescription.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const result = await prisma.service.updateMany({
      where: { slug },
      data: { longDescription },
    });
    if (result.count > 0) {
      console.log(`  ✓ Updated "${slug}" — ${wordCount} words`);
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
