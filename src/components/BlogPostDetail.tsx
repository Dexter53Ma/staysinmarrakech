import Image from "next/image";
import Link from "next/link";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  author?: string;
  authorRole?: string;
}

export const blogPosts: Record<string, BlogPost> = {
  "10-choses-a-faire-a-marrakech": {
    slug: "10-choses-a-faire-a-marrakech",
    title: "10 choses à faire à Marrakech",
    excerpt: "Découvrez les incontournables de la ville rouge...",
    image: "/images/blog/marrakech-travel.jpg",
    date: "15 Janvier 2024",
    category: "Voyage",
    author: "Cyrille",
    authorRole: "Fondateur de StaysInMarrakech",
    content: `
Marrakech, surnommée la « Ville Rouge » pour ses remparts en terre cuite, est une destination qui fascine voyageurs du monde entier. Entre palais millénaires, souks grouillants et jardins luxuriants, voici les 10 choses incontournables à faire lors de votre séjour.

<h2>1. La Place Jemaa el-Fna</h2>
<p>Cœur battant de Marrakech, cette place mythique classée au patrimoine mondial de l'UNESCO s'anime dès le crépuscule. Musiciens, conteurs, acrobates et marchands de jus d'orange se succèdent dans une atmosphère magique. Installez-vous sur la terrasse d'un café et laissez-vous envoûter par ce spectacle vivant unique au monde.</p>

<h2>2. Les Souks de la Médina</h2>
<p>Perdez-vous dans le labyrinthe des souks où artisans et commerçants proposent tapis berbères, argenterie, cuir tanné et épices parfumées. Chaque ruelle révèle un nouveau métier, un nouveau savoir-faire. N'hésitez pas à négocier, c'est faire partie du jeu et de la culture locale.</p>

<h2>3. Le Jardin Majorelle</h2>
<p>Créé par le peintre Jacques Majorelle en 1924 puis restauré par Yves Saint Laurent, ce jardin botanique est un havre de paix. Le bleu Majorelle iconique, les cactus géants et les bassins de nymphéas offrent un contraste saisissant avec l'agitation de la médina.</p>

<h2>4. Le Bahia Palace</h2>
<p>Ce palais du XIXe siècle témoigne de l'architecture marocaine à son apogée. Zellige, stuc sculpté, bois de cèdre peint et carreaux de faïence composent un ensemble d'une beauté remarquable. Les jardins intérieurs apportent une note de sérénité à la visite.</p>

<h2>5. Les Tombeaux Saadiens</h2>
<p>Découverts en 1917 après avoir été murés pendant des siècles, ces tombeaux du XVIe siècle abritent les sépultures de la dynastie saadienne. Leur décoration somptueuse, avec des colonnes en marbre de Carrare et un plafond en bois de cèdre sculpté, est à couper le souffle.</p>

<h2>6. Le Hammam traditionnel</h2>
<p>Plongez dans la tradition marocaine en fréquentant un hammam authentique. Le rituel du gommage au savon noir et au gant de kessa suivi d'un massage à l'huile d'argan est une expérience de bien-être inoubliable. Le hammam est bien plus qu'un bain, c'est un moment de purification body et esprit.</p>

<h2>7. La Koutoubia</h2>
<p>Minaret emblématique de Marrakech, la Koutoubia domine la ville depuis le XIIe siècle. Visible de très loin, ce monument de 77 mètres de haut inspire la mosquée Hassan de Rabat et la Giralda de Séville. Le jardin qui l'entoure est un lieu de promenade apprécié des habitants.</p>

<h2>8. L'Atlas en une journée</h2>
<p>À seulement 45 minutes de Marrakech, les montagnes de l'Atlas offrent des paysages à couper le souffle. Organisez une excursion au village d'Ourika, aux Cascades d'Ouzoud ou pour une randonnée dans le Toubkal National Park. Le contraste entre la chaleur de la plaine et la fraîcheur de la montagne est saisissant.</p>

<h2>9. La Gastronomie marocaine</h2>
<p>Tajine mijoté, couscous royal, pastilla au pigeon, pâtisseries au miel et amandes... La cuisine marocaine est un voyage en soi. Participez à un cours de cuisine pour apprendre les secrets des épices et des techniques culinaires traditionnelles. Les riads proposent souvent des ateliers conviviaux et gourmands.</p>

<h2>10. Le Coucher de soleil depuis un toit-terrasse</h2>
<p>Terminez chaque journée en beauté en admirant le coucher de soleil depuis un toit-terrasse de la médina. La lumière dorée qui baigne les toits ocre de Marrakech, le chant de l' muezzin et les premières étoiles qui apparaissent créent un moment de pur bonheur.</p>

<p>Marrakech est une ville qui se vit avec tous les sens. Chaque rue cache une surprise, chaque encounter est une chance de découvrir un fragment de cette culture riche et millénaire. Préparez-vous à être submergé par les émotions, les couleurs et les parfums de cette cité impériale unique.</p>
    `,
  },
  "guide-gastronomique-marrakech": {
    slug: "guide-gastronomique-marrakech",
    title: "Guide gastronomique de Marrakech",
    excerpt: "Les meilleurs restaurants et plats traditionnels...",
    image: "/images/blog/marrakech-gastronomie.jpg",
    date: "20 Décembre 2023",
    category: "Gastronomie",
    author: "Amine",
    authorRole: "Rédacteur culinaire",
    content: `
La gastronomie marocaine est reconnue mondialement pour sa richesse et sa diversité. À Marrakech, capitale culinaire du royaume, chaque repas est une aventure sensorielle. Découvrez notre guide complet pour goûter aux saveurs authentiques de la ville rouge.

<h2>Les plats incontournables</h2>

<h3>Le Tajine</h2>
<p>Véritable symbole de la cuisine marocaine, le tajine est un plat mijoté lentement dans un récipient en terre cuite au couvercle conique. Les combinaisons sont infinies : poulet aux citrons confits et olives, agneau aux pruneaux et amandes, kefta aux tomates... Le secret réside dans l'équilibre des épices : cumin, gingembre, curcuma, safran et cannelle.</p>

<h3>Le Couscous</h2>
<p>Traditionnellement servi le vendredi, le couscous est un plat de convivialité par excellence. Les semoules cuites à la vapeur sont accompagnées de légumes fondants et d'une sauce riche et parfumée. Dans les restaurants gastronomiques de Marrakech, on le décline en version haute couture avec des légumes d'artiste et des condiments raffinés.</p>

<h3>La Pastilla</h3>
<p>Ce feuilleté sucré-salé est l'un des joyaux de la gastronomie marocaine. La pâte warqa croustillante enveloppe une garniture de pigeon ou de poulet, d'amandes grillées, d'oignons caramélisés, le tout saupoudré de sucre glace et de cannelle. Un délice qui surprend à chaque bouchée.</p>

<h2>Les desserts et pâtisseries</h2>
<p>Les pâtisseries marocaines sont un univers à elles seules. Les cornes de gazelle, farcies d'une pâte d'amande à la fleur d'oranger, sont emblématiques. Les baklawas au miel, les feuilletés à la confiture de rose et les chebakias (biscuits sésame au miel) complètent ce festival de douceurs.</p>

<h2>Les meilleurs restaurants</h2>
<p>Pour une expérience gastronomique d'exception, les restaurants de Marrakech ne manquent pas d'atouts. Les établissements réputés allient cadre somptueux et cuisine créative, revisitant les classiques marocains avec une touche de modernité. Les terrasses avec vue sur les toits de la médina ajoutent une dimension magique au repas.</p>

<h2>Les marchés et food tours</h2>
<p>Pour les vrais gourmands, rien ne vaut une immersion dans les marchés. Les étals regorgent de fruits et légumes colorés, d'épices en vrac et de viandes fraîches. Un guide local peut vous accompagner dans une visite culinaire qui révélera tous les secrets de la cuisine marocaine, des meilleurs fournisseurs aux recettes de grand-mère.</p>

<p>Marrakech est une ville où la nourriture est sacrée. Chaque repas est un moment de partage et de fête. Laissez-vous guider par vos papilles et découvrez une gastronomie ancestrale qui continue de se réinventer.</p>
    `,
  },
  palmeraie: {
    slug: "palmeraie",
    title: "La Palmeraie de Marrakech",
    excerpt: "Promenez-vous au cœur de la plus grande palmeraie...",
    image: "/images/blog/marrakech-palmeraie.jpg",
    date: "10 Novembre 2023",
    category: "Découverte",
    author: "Cyrille",
    authorRole: "Fondateur de StaysInMarrakech",
    content: `
S'étendant sur plus de 13 000 hectares au nord de Marrakech, la Palmeraie est l'un des plus vastes oasis du monde. Ses 100 000 palmiers-dattiers, dont certains centenaires, créent un paysage vert saisissant au cœur de la terre aride. Découvrez cette merveille naturelle qui a façonné l'histoire de la ville rouge.

<h2>Un peu d'histoire</h2>
<p>La Palmeraie de Marrakech a été plantée il y a près de 1000 ans, lors de la fondation de la ville par les Almoravides. Les palmiers-dattiers n'étaient pas seulement une source de nourriture : ils servaient de protection contre les envahisseurs, grâce à leur hauteur et leur densité. Aujourd'hui, cet écosystème unique abrite également des oliviers, des agrumes et des fleurs sauvages.</p>

<h2>Activités dans la Palmeraie</h2>

<h3>Promenade à dos de chameau</h3>
<p>L'expérience la plus emblématique est la balade à dos de chameau à travers les plantations. Vous traverserez des chemins de terre bordés de palmiers, passerez devant des villages berbères et découvrirez des paysages qui n'ont guère changé depuis des siècles.</p>

<h3>Quad et buggy</h3>
<p>Pour les amateurs de sensations, une randonnée en quad ou en buggy dans la Palmeraie est une aventure inoubliable. Les sentiers sinueux entre les palmiers offrent des paysages variés et une adrénaline garantie.</p>

<h3>Visite de cooperatives</h3>
<p>La Palmeraie abrite plusieurs cooperatives de production de dattes et d'huile d'argan. Vous découvrirez le processus de récolte et de transformation, et pourrez déguster les dattes Medjool, considérées comme les plus fines du monde.</p>

<h2>Les villas de la Palmeraie</h2>
<p>La Palmeraie est également le quartier le plus prisé de Marrakech pour la location de villas de luxe. Les propriétés de prestige, souvent dotées de piscines privées et de jardins luxuriants, offrent un cadre de rêve à quelques minutes du centre-ville. C'est l'endroit idéal pour les voyageurs recherchant calme et espace.</p>

<p>La Palmeraie de Marrakech est bien plus qu'un simple ensemble de palmiers : c'est un écosystème vivant, un patrimoine historique et un lieu de villégiature de classe mondiale. Une visite est indispensable lors de tout séjour à Marrakech.</p>
    `,
  },
  "marrakech-en-famille": {
    slug: "marrakech-en-famille",
    title: "Marrakech en famille",
    excerpt: "Tout ce qu'il faut savoir pour un séjour en famille...",
    image: "/images/blog/marrakech-villa.jpg",
    date: "5 Octobre 2023",
    category: "Voyage",
    author: "Cyrille",
    authorRole: "Fondateur de StaysInMarrakech",
    content: `
Marrakech est une destination idéale pour un séjour en famille. Entre les activités adaptées aux petits et grands, le cadre luxuriant des villas et la richesse culturelle de la ville, tout est réuni pour des vacances mémorables. Voici notre guide complet pour un séjour en famille à Marrakech.

<h2>Pourquoi Marrakech en famille ?</h2>
<p>Marrakech combine tout ce qu'il faut pour plaire aux familles : un climat ensoleillé toute l'année, des activités pour tous les âges, un hébergement de luxe à des prix accessibles et une culture fascinante qui émerveille les enfants comme les adultes. La ville est également très sûre et accueillante envers les familles.</p>

<h2>Les activités pour les enfants</h2>

<h3>Les jardins et parcs</h3>
<p>Les jardins Majorelle et la Ménara sont des havres de paix où les enfants peuvent se dépenser en toute sécurité. Les bassins, les fontaines et la végétation exotique fascinent les petits explorateurs.</p>

<h3>Les ateliers créatifs</h3>
<p>Nombreux sont les ateliers proposés aux familles : cours de cuisine marocaine pour enfants, initiation au zellige (mosaïque traditionnelle), peinture sur tissu ou fabrication de lanternes. Ces activités éducatives et ludiques permettent aux enfants de s'initier à la culture locale.</p>

<h3>Les balades à dos de chameau</h3>
<p>Les plus jeunes adoreront monter à dos de chameau dans la Palmeraie. C'est une expérience unique qui restera gravée dans leur mémoire pour toujours.</p>

<h2>Où loger en famille ?</h2>
<p>La location d'une villa avec piscine privée est le choix le plus apprécié des familles. Les enfants profitent d'un espace sécurisé pour jouer pendant que les parents se détendent au bord de la piscine. Les villas de la Palmeraie et du quartier de Guéliz sont particulièrement adaptées, avec leurs grands jardins et leurs équipements modernes.</p>

<h2>Les conseils pratiques</h2>
<p>Prévoyez des vêtements légers et couvrants pour visiter la médina, des chaussures confortables pour marcher sur les pavés, et une crème solaire adaptée aux peaux sensibles des enfants. Les taxis et les VTC sont pratiques pour se déplacer en famille. N'oubliez pas de négocier les prix dans les souks, c'est un jeu que les enfants adorent !</p>

<p>Marrakech est une destination qui crée des souvenirs familiaux inoubliables. Chaque jour apporte son lot de découvertes et d'aventures qui renforceront les liens entre tous les membres de la famille.</p>
    `,
  },
  "marrakech-budget": {
    slug: "marrakech-budget",
    title: "Visiter Marrakech avec un petit budget",
    excerpt: "Des astuces pour profiter de Marrakech sans se ruiner...",
    image: "/images/blog/marrakech-coucher-soleil.jpg",
    date: "15 Septembre 2023",
    category: "Voyage",
    author: "Amine",
    authorRole: "Rédacteur voyage",
    content: `
Marrakech est souvent perçue comme une destination de luxe, mais il tout à fait possible de découvrir ses merveilles avec un budget modeste. Voici nos conseils et astuces pour profiter de la ville rouge sans se ruiner.

<h2>L'hébergement économique</h2>
<p>Les riads traditionnels de la médina offrent des chambres confortables à des prix très attractifs, souvent à partir de 30-40 euros la nuit. Beaucoup proposent le petit-déjeuner inclus. Les auberges de jeunesse sont également une option pour les voyageurs solo ou les groupes d'amis. En dehors de la haute saison (juillet-août), les prix sont particulièrement intéressants.</p>

<h2>La gastronomie à petit prix</h2>
<p>L'expérience culinaire à Marrakech ne coûte pas cher. Les stand de jus d'orange frais de la place Jemaa el-Fna ne coûtent que quelques dirhams. Les petits restaurants de la médina proposent des tajines savoureux à des prix défiant toute concurrence. Les fruits frais achetés sur les étals des marchés sont délicieux et accessibles à tous.</p>

<h2>Les activités gratuites</h2>
<p>Marrakech regorge d'activités gratuites ou quasi gratuites : la promenade dans les souks, l'observation de la place Jemaa el-Fna au crépuscule, la visite des mosquées (de l'extérieur pour les non-musulmans), la randonnée dans le quartier de Kasbah et l'admiration de l'architecture traditionnelle. Le jardin Majorelle demande un droit d'entrée modique mais vaut le détour.</p>

<h2>Le transport</h2>
<p>Les petits taxis (rouges) sont très abordables pour se déplacer à l'intérieur de la ville. N'hésitez pas à marcher dans la médina, c'est la meilleure façon de la découvrir et c'est entièrement gratuit. Pour les excursions hors de Marrakech, les bus intercities sont l'option la plus économique.</p>

<h2>Les meilleurs moments pour visiter</h2>
<p>Les périodes de mi-saison (mars-mai, septembre-novembre) offrent un climat agréable et des prix inférieurs à ceux de la haute saison. Évitez les fêtes et ponts, quand les prix des vols et des hébergements sont majorés.</p>

<p>Marrakech est une ville accessible à tous les budgets. Avec un peu d'organisation et de bon sens, vous pouvez vivre une expérience riche et mémorable sans vider votre portefeuille. La générosité et la chaleur du peuple marocain sont gratuites, et c'est peut-être le plus beau cadeau de la ville.</p>
    `,
  },
  "marrakech-villa-luxe": {
    slug: "marrakech-villa-luxe",
    title: "Pourquoi louer une villa de luxe à Marrakech",
    excerpt: "Les avantages d'un séjour en villa par rapport à un hôtel...",
    image: "/images/blog/marrakech-villa-luxe.jpg",
    date: "1 Septembre 2023",
    category: "Conseils",
    author: "Cyrille",
    authorRole: "Fondateur de StaysInMarrakech",
    content: `
Louer une villa de luxe à Marrakech est de plus en plus populaire auprès des voyageurs exigeants. Comparée à un hôtel, même de grande catégorie, la villa offre une expérience unique qui combine intimité, espace et service personnalisé. Voici pourquoi c'est le choix idéal pour un séjour d'exception.

<h2>L'intimité et l'espace</h2>
<p>Avec une villa, vous bénéficiez d'un espace entièrement privé : piscine, jardin, terrasse, salon extérieur... Les familles et les groupes d'amis apprécient particulièrement de pouvoir partager des moments intimes sans être dérangés par d'autres clients. C'est un luxe que même les meilleurs hôtels ne peuvent pas offrir.</p>

<h2>Le service personnalisé</h2>
<p>Nos villas de luxe à Marrakech sont accompagnées de services sur mesure : majordome dédié, cuisinier privé, chauffeur, coach sportif, baby-sitter... Vous bénéficiez d'une attention personnalisée qui dépasse largement ce qu'un hôtel peut proposer. Chaque détail de votre séjour est pensé pour votre confort.</p>

<h2>Le cadre exceptionnel</h2>
<p>Les villas de la Palmeraie et des quartiers prestigieux de Marrakech sont des architectures d'exception. Jardins luxuriants avec oliviers centenaires, piscines à débordement avec vue sur l'Atlas, intérieurs décorés par des artisans locaux... Le cadre est un élément inoubliable du séjour.</p>

<h2>Le rapport qualité-prix</h2>
<p>Contrairement aux idées reçues, louer une villa de luxe à Marrakech peut être très compétitif par rapport à un palace. Pour un même budget, vous obtenez infiniment plus d'espace, de services et d'intimité. Pour les groupes de 6 personnes et plus, l'avantage économique est encore plus marqué.</p>

<h2>L'expérience authentique</h2>
<p>Staying in a villa allows you to live Marrakech like a local. You shop at the local souks, cook with local produce, and experience the rhythm of Moroccan life. This authenticity is something hotels cannot replicate.</p>

<h2>Le choix parfait pour les événements</h2>
<p>Pour les mariages, anniversaires, séminaires ou célébrations familiales, la villa de luxe est l'endroit idéal. L'espace, la flexibilité et le cadre somptueux permettent d'organiser des événements mémorables à votre image.</p>

<p>Une villa de luxe à Marrakech n'est pas seulement un hébergement, c'est une expérience de vie qui transforme votre séjour en un véritable conte des Mille et Une Nuits.</p>
    `,
  },
  "marrakech-evenement": {
    slug: "marrakech-evenement",
    title: "Organiser un événement à Marrakech",
    excerpt: "Mariage, séminaire, anniversaire... Marrakech est l'endroit idéal...",
    image: "/images/blog/marrakech-evenement.jpg",
    date: "20 Août 2023",
    category: "Événements",
    author: "Cyrille",
    authorRole: "Fondateur de StaysInMarrakech",
    content: `
Marrakech s'est imposée comme l'une des destinations les plus prisées au monde pour l'organisation d'événements privés et professionnels. Cadre somptueux, infrastructures de luxe, savoir-faire des organisateurs locaux et cadre fiscal avantageux, tout converge pour faire de la ville rouge le lieu idéal de votre prochain événement.

<h2>Les mariages de rêve</h2>
<p>Un mariage à Marrakech est une promesse d'exotisme et de romance. Les villas de luxe offrent des cadres somptueux pour les cérémonies, les cocktails et les réceptions. Les jardins fleuris, les terrasses avec vue sur l'Atlas et les intérieurs richement décorés créent une atmosphère magique que vos invités n'oublieront jamais.</p>

<p>Les traiteurs spécialisés proposent des menus raffinés qui mêlent saveurs marocaines et cuisine internationale. Les mariages peuvent être organisés en plein air dans les jardins ou sous des tentes somptueusement décorées.</p>

<h2>Les séminaires d'entreprise</h2>
<p>Pour les entreprises, Marrakech offre un cadre idéal pour les séminaires et team building. Les villas de luxe peuvent accueillir des groupes jusqu'à 30 personnes avec des espaces de réunion équipés, des activités de team building variées (quad, golf, cours de cuisine) et des soirées festives dans des lieux magiques.</p>

<h2>Les anniversaires et célébrations</h2>
<p>Célébrer un anniversaire à Marrakech est une idéeoriginale qui marquera les esprits. Les organisateurs locaux créent des thèmes sur mesure, des décors exceptionnels et des expériences culinaires uniques pour chaque occasion.</p>

<h2>Les avantages de Marrakech</h2>
<p>La ville dispose d'un aéroport international bien desservi par de nombreuses compagnies. Les hébergements de luxe à des prix compétitifs, le soleil presque permanent et l'accueil chaleureux des Marocains font le reste. Les organisateurs professionnels locaux maîtrisent toutes les subtilités de l'organisation d'événements dans la ville.</p>

<p>Que ce soit pour un mariage, un séminaire ou un anniversaire, Marrakech offre un cadre inégalé pour transformer votre événement en un moment magique et inoubliable.</p>
    `,
  },
  "marrakech-activites": {
    slug: "marrakech-activites",
    title: "Les meilleures activités à Marrakech",
    excerpt: "Des sports d'aventure aux relaxations, découvrez toutes les activités...",
    image: "/images/blog/marrakech-activites.jpg",
    date: "10 Août 2023",
    category: "Activités",
    author: "Amine",
    authorRole: "Rédacteur activités",
    content: `
Marrakech est une ville qui ne manque jamais d'activités à proposer. Des sports d'aventure dans les paysages spectaculaires de la région aux moments de détente dans les hammams et spas les plus raffinés, chaque jour est une nouvelle aventure. Découvrez notre sélection des meilleures activités.

<h2>Les sports d'aventure</h2>

<h3>Quad et Buggy</h3>
<p>Explorez la Palmeraie et les paysages désertiques environnants en quad ou en buggy. Les parcours adaptés à tous les niveaux permettent de partir à l'aventure en toute sécurité tout en admirant des paysages grandioses.</p>

<h3>Parapente</h3>
<p>Pour une vision aérienne de Marrakech et de l'Atlas, le parapente est l'activité idéale. Les vols en tandem offrent une expérience inoubliable avec des panoramas à couper le souffle sur la ville et les montagnes.</p>

<h3>Golf</h3>
<p>La région de Marrakech abrite plusieurs parcours de golf d'exception, conçus par des architectes de renommée internationale. Le climat ensoleillé permet de jouer toute l'année, et les paysages avec vue sur l'Atlas rendent chaque partie mémorable.</p>

<h2>Les activités culturelles</h2>

<h3>Les cours de cuisine</h3>
<p>Apprenez à préparer les classiques de la cuisine marocaine lors d'un atelier culinaire dans un riad. Les chefs locaux vous transmettront leurs secrets pour réussir un tajine parfait, un couscous savoureux ou des pâtisseries traditionnelles.</p>

<h3>Les visites guidées</h2>
<p>Un guide local peut vous faire découvrir les trésors cachés de la médina, les ateliers d'artisans, les palais méconnus et les quartiers authentiques de Marrakech. C'est la meilleure façon de comprendre l'histoire et la culture de cette ville fascinante.</p>

<h2>Les activités de détente</h2>

<h3>Le Hammam</h3>
<p>L'expérience du hammam marocain est un incontournable. Le rituel traditionnel de gommage et de massage vous permettra de vous détendre tout en découvrant une tradition ancestrale.</p>

<h3>Le Yoga</h3>
<p>Beaucoup de villas et centres de bien-être proposent des séances de yoga dans des cadres exceptionnels, avec vue sur les jardins ou l'Atlas. Le yoga de l'aube au coucher de soleil est une expérience transcendante.</p>

<h2>Les excursions</h2>
<p>Les excursions à journée depuis Marrakech sont variées et accessibles : les Cascades d'Ouzoud, le désert d'Agafay, les villages berbères de l'Atlas, la ville d'Essaouira sur la côte atlantique... Chaque destination offre un changement de paysage et d'atmosphère saisissant.</p>

<p>Marrakech est une ville d'activités infinies. Que vous soyez à la recherche de sensations fortes, de culture ou de détente, vous trouverez toujours quelque chose de nouveau à découvrir et à expérimenter.</p>
    `,
  },
  "marrakech-hammam": {
    slug: "marrakech-hammam",
    title: "L'expérience hammam à Marrakech",
    excerpt: "Plongez dans la tradition marocaine du hammam...",
    image: "/images/blog/marrakech-plage.jpg",
    date: "1 Août 2023",
    category: "Bien-être",
    author: "Cyrille",
    authorRole: "Fondateur de StaysInMarrakech",
    content: `
Le hammam est bien plus qu'un simple bain turc : c'est un rituel ancestral au cœur de la culture marocaine. À Marrakech, l'expérience du hammam est une immersion dans une tradition vieille de plusieurs siècles. Découvrez tout ce qu'il faut savoir pour profiter pleinement de cette expérience unique.

<h2>L'histoire du hammam au Maroc</h2>
<p>Le hammam est arrivé au Maroc avec les Romains, puis a été transformé par la culture arabo-musulmane. Il est devenu un lieu central de la vie sociale marocaine : un espace de purification, de détente et de convivialité. Aujourd'hui, le hammam fait partie intégrante de la culture et de la religion musulmane, les ablutions étant un élément fondamental de la pratique religieuse.</p>

<h2>Le rituel traditionnel</h2>

<h3>La vapeur</h3>
<p>La première étape consiste à s'installer dans la salle de vapeur chaude pour ouvrir les pores de la peau. Ce moment de détente prépare le corps pour le gommage. La température ambiante, généralement entre 40 et 50 degrés, permet une sudation abondante qui nettoie la peau en profondeur.</p>

<h3>Le gommage au savon noir</h3>
<p>Le gommage au savon noir (savon Beldi) est l'étape emblématique du hammam. Ce savon à base d'huile d'olive est appliqué sur tout le corps puis massé avec un gant de Kessa pour éliminer les cellules mortes. La peau révèle un doux velouté qui étonne par sa douceur.</p>

<h3>Le massage à l'huile d'argan</h3>
<p>Après le gommage, un massage relaxant à l'huile d'argan est administré. L'huile d'argan, surnommée l'or liquide du Maroc, est reconnue pour ses propriétés nourrissantes et anti-âge. Ce massage terminé de l'expérience sur une note de pur bien-être.</p>

<h2>Les meilleurs hammams de Marrakech</h2>
<p>Marrakech propose une grande variété d'expériences hammam, des hammams traditionnels de quartier aux hammams de luxe des palaces et riads de prestige. Chaque établissement a sa propre identité et ses propres spécialités. Les hammams haut de gamme proposent souvent des soins additionnels : gommage au rhassoul, soins du visage, massages aux huiles essentielles.</p>

<h2>Les conseils pratiques</h2>
<p>Pour les premiers essais, privilégiez les hammams de riads de luxe où le personnel est formé pour accueillir les étrangers. Apportez un maillot de bain, un peignoir et des tongs. N'hésitez pas à communiquer votre préférence en matière de pression lors du gommage. Et n'oubliez pas de boire beaucoup d'eau après l'expérience pour vous réhydrater.</p>

<p>L'expérience du hammam à Marrakech est un voyage dans le temps et dans la tradition. C'est un moment de purification body et esprit qui vous laissera une peau de soie et un esprit apaisé. Ne manquez pas cette initiation lors de votre séjour dans la ville rouge.</p>
    `,
  },
  "marrakech-marche": {
    slug: "marrakech-marche",
    title: "Les marchés de Marrakech",
    excerpt: "Guide complet des souks et marchés de la ville rouge...",
    image: "/images/blog/marrakech-gastronomie.jpg",
    date: "15 Juillet 2023",
    category: "Découverte",
    author: "Amine",
    authorRole: "Rédacteur découverte",
    content: `
Les souks et marchés de Marrakech constituent l'un des plus grands labyrinthes commerciaux du monde. Chaque ruelle regorge d'artisans, de commerçants et de marchands proposant des produits d'exception. Découvrez notre guide complet pour vous y retrouver et acquérir de véritables trésors.

<h2>Le système des souks</h2>
<p>Les souks de Marrakech sont organisés par métier et par quartier. Chaque corps de métier possède son propre souk, ce qui permet de comparer les produits et les prix. Les souks principaux sont situés autour de la place Jemaa el-Fna et s'étendent vers le nord de la médina.</p>

<h2>Les souks incontournables</h2>

<h3>Le souk des teinturiers</h3>
<p>L'un des plus photogéniques de la médina, ce souk expose des écheveaux de laine et de soie dans toutes les couleurs de l'arc-en-ciel. Les teinturiers travaillent à ciel ouvert, donnant aux rues une atmosphere colorée et vivante.</p>

<h3>Le souk des tapis</h3>
<p>Des centaines de boutiques proposent des tapis berbères, kilims et tapis tissés à la main. Chaque tapis raconte une histoire, avec ses symboles et ses motifs traditionnels. N'hésitez pas à demander la provenance et la technique de fabrication.</p>

<h3>Le souk des babouches</h3>
<p>Les babouches marocaines sont des chaussons traditionnels en cuir coloré. Dans ce souk, vous trouverez des modèles pour hommes, femmes et enfants, dans une infinité de couleurs et de motifs. C'est le souvenir typique à rapporter de Marrakech.</p>

<h3>Le souk des épices</h3>
<p>Les senteurs envoûtantes des épices s'échappent des étals où cumin, gingembre, curcuma, safran, cannelle et ras el hanout sont proposés en vrac. Les vendeurs sont généreux en échantillons et en conseils pour utiliser ces trésors de la cuisine marocaine.</p>

<h2>Les astuces pour bien négocier</h2>
<p>La négociation fait partie intégrante de la culture marocaine. Commencez par une offre à environ 30-40% du prix demandé, puis négociez poliment. Le sourire et la courtoisie sont vos meilleurs alliés. Si le prix ne vous convient pas, il est parfaitement acceptable de partir, le vendeur vous rappellera souvent pour conclure la vente.</p>

<h2>Les meilleurs moments pour visiter</h2>
<p>Les souks sont ouverts du matin au soir, mais l'ambiance est la plus animée en milieu de matinée et en fin d'après-midi. Évitez le milieu de journée, quand la chaleur est parfois étouffante dans les ruelles étroites. Le samedi et le dimanche sont souvent les jours les plus fréquentés.</p>

<p>Les marchés de Marrakech ne sont pas de simples lieux de commerce : ce sont des musées vivants où chaque étal est une œuvre d'art. Laissez-vous guider par vos sens et découvrez un monde de couleurs, de textures et de saveurs qui vous enchantera.</p>
    `,
  },
};

export default function BlogPostDetail({ post }: { post: BlogPost }) {
  const recentPosts = Object.values(blogPosts)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const categories = Array.from(new Set(Object.values(blogPosts).map((p) => p.category)));

  return (
    <div>
      <section className="relative w-full h-[400px] md:h-[500px]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <span className="inline-block bg-[#ffb000] text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded mb-4">
              {post.category}
            </span>
            <h1 className="text-white text-3xl md:text-5xl font-bold uppercase tracking-wide mb-4">
              {post.title}
            </h1>
            <p className="text-white/80 text-sm md:text-base">{post.date}</p>
          </div>
        </div>
      </section>

      <section className="max-w-[1140px] mx-auto px-4 py-[50px]">
        <div className="flex flex-col lg:flex-row gap-10">
          <article className="flex-1 max-w-[800px]">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#0d47a1] hover:text-[#0a3a82] transition-colors mb-8 font-medium"
            >
              &larr; Retour au blog
            </Link>

            <div
              className="prose prose-lg max-w-none text-[#34495e] leading-relaxed
                [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#0d47a1] [&_h2]:mt-10 [&_h2]:mb-4
                [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#34495e] [&_h3]:mt-8 [&_h3]:mb-3
                [&_p]:text-base [&_p]:mb-6 [&_p]:leading-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.author && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#0d47a1] rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#34495e]">{post.author}</p>
                    {post.authorRole && (
                      <p className="text-sm text-gray-500">{post.authorRole}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">StaysInMarrakech — Expert en villas de luxe à Marrakech</p>
                  </div>
                </div>
              </div>
            )}
          </article>

          <aside className="lg:w-[300px] shrink-0">
            <div className="sticky top-24 space-y-8">
              <div className="bg-[#f8f9fa] rounded-lg p-6">
                <h3 className="text-lg font-bold text-[#0d47a1] mb-4">Articles récents</h3>
                <div className="space-y-4">
                  {recentPosts.map((recent) => (
                    <Link
                      key={recent.slug}
                      href={`/blog/${recent.slug}`}
                      className="flex gap-3 group"
                    >
                      <div className="relative w-16 h-16 rounded overflow-hidden shrink-0">
                        <Image
                          src={recent.image}
                          alt={recent.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#34495e] group-hover:text-[#0d47a1] transition-colors leading-snug">
                          {recent.title}
                        </h4>
                        <span className="text-xs text-gray-500">{recent.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-[#f8f9fa] rounded-lg p-6">
                <h3 className="text-lg font-bold text-[#0d47a1] mb-4">Catégories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <span
                      key={cat}
                      className="inline-block bg-white text-[#34495e] text-sm px-3 py-1.5 rounded border border-gray-200"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
