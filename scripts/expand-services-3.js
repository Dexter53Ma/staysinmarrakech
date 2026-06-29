const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const expansions = {
  "karting": `<h2>Karting à Marrakech : l'adrénaline sur circuit professionnel</h2>
<p>Le karting est l'une des activités les plus populaires et les plus accessibles de Marrakech. Sur notre circuit professionnel de 800 mètres asphalté, vous profitez de virages techniques, de lignes droites pour les dépassements et de sensations fortes garanties. Que vous soyez un débutant curieux ou un amateur de vitesse en quête de défi, notre karting offre une expérience passionnante et sécurisée pour tous les âges à partir de 8 ans. C'est l'activité idéale pour les familles, les groupes d'amis et les événements d'entreprise.</p>
<p>Notre circuit est conçu selon les normes internationales de la FIA (Fédération Internationale de l'Automobile) avec des largeurs de piste généreuses, des zones de dépassement sécurisées, des bordures de protection et un système de chronométrage électronique précis. Les karts sont entretenus et vérifiés avant chaque session pour garantir performances et sécurité optimales.</p>

<h2>Nos karts — trois niveaux de performance pour tous les pilotes</h2>
<h3>Kart Débutant (max 60 km/h) — à partir de 8 ans</h3>
<p>Le kart débutant est un kart à transmission automatique, facile à conduire et parfaitement adapté aux novices et aux jeunes pilotes. La vitesse maximale de 60 km/h offre des sensations agréables sans danger, et la transmission automatique élimine la complexity de la manipulation des vitesses. Le siège est ajustable pour s'adapter à toutes les tailles, et les pédales d'accélérateur et de frein sont ergonomiques et intuitives.</p>
<p>Les karts débutants sont idéaux pour les enfants à partir de 8 ans (1m20 minimum), les adolescents et les adultes qui n'ont jamais conduit de kart. Le briefing de sécurité est complet mais simple, et les moniteurs sont présents pour guider les premiers tours. La plupart des débutants se sentent à l'aise après 2 ou 3 tours et commencent à profiter pleinement de l'expérience.</p>

<h3>Kart Intermédiaire (max 80 km/h) — pour les pilotes confirmés</h3>
<p>Le kart intermédiaire est un kart à transmission manuelle avec 3 vitesses, offrant plus de contrôle et plus de performance. La vitesse maximale de 80 km/h offre des sensations nettement plus intenses, et la manipulation des vitesses ajoute une dimension technique à la conduite. Ce kart est idéal pour les adolescents de plus de 14 ans et les adultes qui ont déjà conduit un kart et qui souhaitent progresser.</p>
<p>La transmission manuelle demande une technique de conduite plus élaborée : appuyer sur l'embrayage, sélectionner la vitesse, accélérer progressivement. Les moniteurs vous apprennent les bases de la conduite sportive : trajectoire de racing, freinage en virage, gestion de l'accélérateur. C'est une progression passionnante qui développe l'adresse, la concentration et la réactivité.</p>

<h3>Kart Performance (max 100 km/h) — l'expérience ultime</h3>
<p>Le kart performance est un kart à transmission manuelle 6 vitesses avec un moteur 2 temps puissant. La vitesse maximale de 100 km/h sur un circuit de 800 mètres offre des sensations proches de la Formule 1. C'est un kart exigeant qui nécessite une bonne condition physique, une technique de conduite solide et une concentration maximale. Réservé aux pilotes de plus de 18 ans avec expérience en karting.</p>
<p>Le kart performance est un vrai défi technique et physique. Les virages sont rapides, les freinages sont puissants, les dépassements sont stratégiques. Chaque tour est une épreuve de concentration et d'adresse. Les pilotes expérimentés adorent ce kart pour son authenticité et ses performances. C'est l'expérience karting ultime à Marrakech.</p>

<h2>Le circuit — 800 mètres de sensations</h2>
<p>Notre circuit de 800 mètres est asphalté selon les normes FIA et offre un mélange équilibré de virages techniques et de lignes droites pour les dépassements. Le profil d'ensemble est un circuit rapide avec 12 virages, dont 3 virages à 180°, 2 chicanes rapides et 2 lignes droites de 80 et 120 mètres. La largeur moyenne de 8 mètres permet des dépassements faciles et sécurisés.</p>
<p>Le circuit est équipé de bordures de protection, de pneus amortisseurs aux endroits critiques, d'un système de chronométrage électronique avec affichage en temps réel, et d'un drapeau à damier automatique. Les conditions de la piste sont vérifiées avant chaque session (température, humidité, débris), et les karts sont réglés en conséquence.</p>

<h2>Sécurité et encadrement — professionnel et rigoureux</h2>
<p>Chaque session est précédée d'un briefing de sécurité complet de 10 minutes qui couvre : les règles de conduite sur le circuit (trajectoire, signaux de dépassement, zones de freinage), l'utilisation des commandes (accélérateur, frein, embrayage pour les karts manuels), les consignes en cas d'incident (sortie de piste, drapeau jaune, arrêt d'urgence) et les règles de courtoisie (respect des autres pilotes, fair-play).</p>
<p>Des moniteurs sont positionnés aux endroits stratégiques du circuit avec des drapeaux (vert = tout libre, jaune = danger, rouge = arrêt immédiat). Un stand de premiers secours est ouvert pendant toute la durée des sessions. Les casques homologués, les combinaisons et les gants sont fournis et obligatoires. L'âge minimum est de 8 ans (1m20 minimum) pour les karts débutants, 14 ans pour les intermédiaires et 18 ans pour les performance.</p>

<h2>Formules et tarifs — pour tous les budgets et toutes les envies</h2>
<h3>Session individuelle</h3>
<p>Session de 10 minutes : accès au kart de votre niveau, briefing sécurité, matériel complet inclus. Idéal pour les débutants qui veulent essayer, ou pour les pilotes pressés. Session de 20 minutes : double session avec point de régulation au milieu. Idéal pour progresser et battre son propre record. Session de 30 minutes : expérience complète avec analyse des temps de tour et conseil personnalisé du moniteur.</p>

<h3>Formule Compétition</h3>
<p>Pour les groupes de 6 à 12 personnes, nous organisons des Grand Prix complets avec : qualification (1 tour chrono), course de départ (8 tours), finale (12 tours), podium de remise des prix et champagne de célébration. Le classement est affiché en temps réel sur un écran géant. C'est l'activité idéale pour les anniversaires, les séminaires et les-enterrements de vie.</p>

<h3>Carte prépayée</h3>
<p>Les cartes prépayées offrent des tarifs dégressifs : 5 sessions au prix de 4, 10 sessions au prix de 8. Idéal pour les habitués et les familles qui reviennent régulièrement. Les cartes sont valables 1 an et utilisables par plusieurs personnes.</p>

<h2>Événements et groupes — nous organisons tout</h2>
<p>Pour les événements, nous offrons un service complet : réservation privée du circuit, organisation du format de course, scoring personnalisé avec noms des équipes, décoration, photographer professionnel, gâteau et champagne. Les groupes de 10 à 30 personnes peuvent réserver le circuit en exclusivité pour une expérience privée et mémorable.</p>
<p>Les séminaires d'entreprise apprécient notre formule team building : course inter-services avec classement, trophée pour l'équipe gagnante et cocktail de clôture. L'activité crée de l'émulation, renforce la cohésion et génère des souvenirs partagés qui renforcent les liens professionnels dans un cadre ludique et inoubliable.</p>

<h2>Réservation et disponibilités</h2>
<p>Le karting est ouvert tous les jours de 10h00 à 22h00 (nocturne le vendredi et le samedi). La réservation n'est pas obligatoire pour les sessions individuelles (premier arrivé, premier servi). Pour les formules compétition et les événements, la réservation est obligatoire. Le tarif comprend le kart, le briefing sécurité, le matériel complet (casque, combinaison, gants) et l'encadrement. L'annulation est gratuite jusqu'à 24h avant la session.</p>`,

  "side-car-vintage": `<h2>Side Car Vintage à Marrakech : une expérience rétro et authentique unique</h2>
<p>Le side-car vintage est l'un des moyens les plus originaux, les plus charmants et les plus mémorables de découvrir Marrakech. Conduisez ou soyez passager d'un side-car d'époque parfaitement restauré et traversez la ville rouge dans un style rétro incomparable. Le vrombissement du moteur, le vent dans les cheveux, les regards émerveillés des passants, les photos spontanées — c'est une expérience qui surprend, qui ravit et qui crée des souvenirs inoubliables. Contrairement aux visites classiques en voiture ou en bus, le side-car vous immerge dans l'ambiance de la ville avec une proximité et une authenticité incomparables.</p>
<p>Nos side-cars sont des Honda CM 125 des années 1970, des véhicules mythiques parfaitement restaurés et entretenus. Chaque side-car est unique, avec sa personnalité, sa patine et son charme d'époque. Les restaurations sont méticuleuses : mécanique révisée, carrosserie repeinte dans les couleurs d'origine, cuir reconditionné, chrome poli. Ces véhicules sont des pièces de collection roulantes, des objets de beauté qui méritent d'être admirés et conduits.</p>

<h2>Nos circuits — trois immersions rétro dans Marrakech</h2>
<h3>Circuit Médina (1h — l'authenticité urbaine)</h3>
<p>Le circuit médina est l'expérience la plus immersive et la plus authentique. Vous chevauchez un side-car d'époque à travers les ruelles étroites et animées de la médina, guidé par un conducteur local qui connaît chaque recoin de cette ville fascinante. Le vrombissement du moteur résonne entre les murs de pisé ocre, les vendeurs des souks se retournent et vous saluent, les enfants courent après vous avec des sourires éclatants — c'est un moment de pur bonheur partagé avec la population locale.</p>
<p>Le parcours traverse les souks les plus animés (épices, cuivre, tapis, babouches), passe devant les monuments emblématiques (mosquée Koutoubia, palais Bahia), s'arrête à la place Jemaa el-Fna pour admirer l'animation, et se termine par un thé à la menthe sur un rooftop avec vue panoramique. Le conducteur partage ses connaissances sur l'histoire de chaque site, les anecdotes des rues traversées et les secrets de la vie quotidienne dans la médina.</p>

<h3>Circuit Panoramique (2h — les vues exceptionnelles)</h3>
<p>Le circuit panoramique est plus long et plus varié. Il combine la médina, la nouvelle ville, les jardins de la Ménara, le quartier de Guéliz et les meilleures vues sur l'Atlas. Le side-car traverse des quartiers contrastés : ruelles animées de la médina, boulevards modernes de Guéliz, zones résidentielles verdoyantes, zones industrielles en pleine mutation. C'est un panorama complet de Marrakech moderne et traditionnel, ancien et nouveau.</p>
<p>Le parcours inclut des arrêts photo dans les endroits les plus photogéniques : terrasse de la Koutoubia avec vue sur l'Atlas, jardins de la Ménara avec le bassin mythique, place Mohammed V avec son architecture coloniale, vue panoramique depuis la colline du quartier des Ambassadeurs. Le conducteur vous raconte l'histoire de Marrakech, de sa fondation au XIe siècle à son essor touristique contemporain.</p>

<h3>Circuit Coucher de Soleil (1h30 — le moment magique)</h3>
<p>Le circuit coucher de soleil est le plus romantique et le plus photogénique. Vous partez en fin d'après-midi et traversez les rues de Marrakech au moment où la lumière dorée baigne la ville rouge dans une atmosphère magique. Le side-car serpent entre les ombres allongées, les rayons dorés filtrent entre les bâtiments ocre, et les minarets des mosquées se découpent sur un ciel éblouissant.</p>
<p>Le parcours se termine sur un belvédère naturel d'où vous contemplez le coucher de soleil derrière les sommets de l'Atlas. Les couleurs du ciel — orange, rose, violet, doré — se reflètent sur les toits terrasses de la médina et les sommets enneigés. C'est un moment de pure magie qui restera éternellement gravé dans votre mémoire. Un thé à la menthe et des pâtisseries sont servis pendant la contemplation.</p>

<h2>Conduire ou être passager — votre choix</h2>
<p>Vous avez le choix entre conduire le side-car vous-même (si vous avez un permis moto valide) ou être passager et profiter du paysage en toute sérénité. Conduire un side-car est une expérience unique et amusante — la prise en main est différente d'une voiture, avec une sensibilité particulière aux virages et aux accélérations. Les conducteurs expérimentés de notre équipe vous donnent un briefing de prise en main de 15 minutes avant le départ.</p>
<p>Être passager est l'option la plus relaxante et la plus contemplative. Vous êtes installé confortablement dans le side-car, les pieds en avant, le vent dans les cheveux et les yeux libres pour admirer le paysage. Le conducteur gère la conduite et partage ses connaissances. C'est l'expérience idéale pour les couples, les familles et les personnes qui veulent profiter du moment sans stress.</p>

<h2>Sécurité et confort</h2>
<p>Tous nos side-cars sont assurés et contrôlés régulièrement. Les casques homologués sont fournis et obligatoires. Les conducteurs sont titulaires du permis moto et formés à la conduite de side-car. L'assurance responsabilité civile est contractée pour chaque sortie. Les side-cars sont équipés de ceintures de sécurité pour les passagers, de rétroviseurs et de feux de signalisation.</p>
<p>Pour votre confort, nous fournissons des lunettes de protection, des écharpes légères pour les journées venteuses et des couvertures pour les balades en fin de journée. Des gants sont disponibles sur demande. Les side-cars ont un petit coffre pour ranger vos affaires personnelles (appareil photo, eau, veste).</p>

<h2>Réservation et disponibilités</h2>
<p>Les balades en side-car sont disponibles tous les jours de 8h00 à 19h00. La réservation est obligatoire et se fait en ligne, par téléphone ou par e-mail. L'annulation est gratuite jusqu'à 24h avant la balade. Le tarif comprend le side-car, le conducteur, le casque, l'assurance et le thé d'accueil. Les balades coucher de soleil et les circuits panoramiques sont les plus demandés — réservez à l'avance pendant la haute saison.</p>`,

  "jet-ski": `<h2>Jet Ski à Marrakech : vitesse et sensations fortes sur les lacs de l'Agafay</h2>
<p>Les lacs artificiels de l'Agafay, situés à seulement 30 minutes du centre-ville de Marrakech, offrent un cadre idéal et spectaculaire pour pratiquer le jet ski. Eaux calmes et cristallines, paysages montagneux grandioses avec vue sur les sommets enneigés de l'Atlas, et encadrement professionnel — tout est réuni pour des sensations fortes en toute sécurité. Le jet ski est l'activité parfaite pour les amateurs de vitesse, de glisse et d'adrénaline, dans un cadre naturel d'une beauté exceptionnelle qui rend l'expérience doubly mémorable.</p>
<p>Contrairement aux spots de jet ski côtiers souvent surpeuplés et pollués, les lacs de l'Agafay sont un espace préservé, calme et sécurisé. Les eaux sont propres, les paysages sont préservés et l'ambiance est sportive et détendue. C'est l'endroit idéal pour profiter du jet ski dans les meilleures conditions possibles, à la fois pour les débutants et pour les pratiquants expérimentés.</p>

<h2>Nos formules — pour tous les niveaux et toutes les durées</h2>
<h3>Session Découverte (30 minutes — pour les débutants)</h3>
<p>La session découverte est idéale pour les personnes qui n'ont jamais fait de jet ski ou qui veulent essayer en toute sécurité. La session comprend un briefing de sécurité complet de 10 minutes (fonctionnement du jet ski, règles de navigation, zones interdites, consignes d'urgence), une démonstration pratique par le moniteur, et 20 minutes de conduite libre. Le moniteur est présent sur un jet ski de surveillance et vous suit à distance, prêt à intervenir si nécessaire.</p>
<p>Pendant la session, vous apprenez les bases : démarrage, accélération, freinage, virage, arrêt. La plupart des débutants se sentent à l'aise après 5 minutes et commencent à profiter pleinement des sensations de vitesse et de glisse. Les eaux calmes de l'Agafay sont idéales pour apprendre — pas de vagues, pas de courants, une eau plate et prévisible.</p>

<h3>Session Intensive (1 heure — pour les confirmés)</h3>
<p>La session intensive est réservée aux personnes qui ont déjà fait du jet ski et qui souhaitent profiter pleinement du spot. Vous naviguez librement sur le lac pendant 1 heure, en explorant les différentes zones : zones rapides pour les accélérations franches, zones techniques pour les virages serrés, zones de vue pour les pauses contemplatives. Le moniteur est présent en cas de besoin mais vous laisse profiter de votre autonomie.</p>
<p>La session de 1 heure permet d'explorer le lac en profondeur, de découvrir les angles morts, de faire des allers-retours entre les berges et de profiter des panoramas sur l'Atlas. C'est l'expérience parfaite pour les pratiquants qui veulent un minimum de constraints et un maximum de liberté.</p>

<h3>Session Compétition (pour les groupes)</h3>
<p>Pour les groupes de 4 à 8 personnes, nous proposons des sessions compétition avec course chronométrée, dépassements stratégiques et podium de remise des prix. Chaque pilote a son numéro, sa couleur de dossard et son temps de tour chronométré. La course dure 15 minutes et le classement est affiché en temps réel. C'est l'activité idéale pour les anniversaires, les-enterrements de vie et les sorties entre amis en quête de défis.</p>

<h2>Matériel et sécurité — notre engagement</h2>
<p>Nos jet ski sont des Yamaha VX Cruiser, des modèles réputés pour leur fiabilité, leur confort et leurs performances. Chaque jet ski est entretenu et vérifié quotidiennement par notre équipe mécanique : moteur, carburant, éclairage, système de sécurité. Les gilets de sauvetage homologués et les casques de protection sont fournis et obligatoires.</p>
<p>Un briefing de sécurité complet précède chaque session : fonctionnement du jet ski, règles de navigation, zones interdites, consignes en cas de panne ou de chute. Les moniteurs sont brevetés BNSSA (Brevet National de Sécurité et de Sauvetage Aquatique) et formés aux premiers secours. Le ratio est de 1 moniteur pour 4 jet ski maximum. Un bateau de surveillance est présent sur le lac pendant toutes les sessions.</p>

<h2>Conditions et restrictions</h2>
<p>L'âge minimum pour conduire un jet ski seul est de 18 ans. Les jeunes de 12 à 17 ans peuvent conduire en accompagnement d'un adulte titulaire du permis bateau. Les passagers de tout âge sont acceptés (dès 6 ans avec gilet de sauvetage). La condition physique requise est moyenne — il faut être à l'aise sur l'eau et avoir une force suffisante pour manipuler le guidon.</p>
<p>Les sessions de jet ski ne sont pas disponibles en cas de vent fort (supérieur à 30 km/h), de pluie ou de visibilité réduite. La météo est vérifiée avant chaque session, et les annulations pour raisons météo sont remboursées intégralement.</p>

<h2>Réservation et tarifs</h2>
<p>Les sessions de jet ski sont disponibles tous les jours de 9h00 à 17h00. La réservation est recommandée, surtout pendant la haute saison (octobre à avril). Le tarif comprend le jet ski, le gilet de sauvetage, le casque, le briefing sécurité et l'encadrement par un moniteur certifié. L'annulation est gratuite jusqu'à 24h avant la session. Les paiements sont acceptés en espèces et par carte bancaire.</p>`,

  "sonotherapie": `<h2>Sonothérapie à Marrakech : harmonie vibratoire et relaxation profonde</h2>
<p>La sonothérapie est une pratique ancestrale de guérison par le son qui utilise les vibrations de bols tibétains, de gongs, de diapasons et d'autres instruments à vibration pour induire un état de relaxation profonde et favoriser l'équilibre physique, émotionnel et spirituel. Les ondes sonores pénètrent chaque cellule du corps, dissolvant les tensions physiques accumulées, les blocages émotionnels et le stress mental. C'est une expérience méditative et profondément apaisante, particulièrement bénéfique contre le stress chronique, l'insomnie, les douleurs, l'anxiété et la fatigue.</p>
<p>Marrakech, avec son ambiance spirituelle, son calme intérieur et sa lumière dorée, est le cadre idéal pour cette expérience de relaxation. Nos séances de sonothérapie sont dispensées par des praticiens certifiés et expérimentés, dans des riads paisibles et des jardins zen, loin de l'agitation de la médina. C'est une parenthèse de sérénité absolue au cœur de la ville rouge.</p>

<h2>Nos instruments — des vibrations authentiques et puissantes</h2>
<h3>Bols Tibétains</h3>
<p>Les bols tibétains (aussi appelés bols à chanter ou singing bowls) sont des bols en métal martelé à la main, fabriqués dans le Tibet et le Népal selon des traditions millénaires. Chaque bol est unique, avec sa propre fréquence de résonance, sa propre couleur et sa propre personnalité sonore. Les bols tibétains produisent des harmoniques riches et profondes qui créent un bain sonore enveloppant et méditatif.</p>
<p>Nos bols tibétains sont authentiques, importés directement du Népal et du Tibet. Ils sont fabriqués à partir d'un alliage de sept métaux (cuivre, étain, plomb, fer, mercure, or, argent) qui correspond aux sept planètes de l'astrologie traditionnelle. La qualité sonore de ces bols est exceptionnelle — les vibrations sont puissantes, profondes et durables, capables de pénétrer chaque cellule du corps.</p>

<h3>Gongs</h3>
<p>Le gong est l'instrument le plus puissant de la sonothérapie. Ses vibrations sont si intenses qu'elles créent un véritable « nettoyage vibratoire » du corps et de l'esprit. Le gong produit des harmoniques complexes qui varient en fonction de l'endroit où il est frappé, de l'outil utilisé et de l'intensité du choc. Les sons du gong sont profonds, mystérieux et transformatifs.</p>
<p>Nos gongs sont des gongs chinois et vietnamiens de qualité professionnelle, avec des diamètres de 60 à 100 cm. Leur son est puissant et enveloppant, capable de remplir un espace entier de vibrations. L'utilisation du gong est réservée aux praticiens expérimentés, car la gestion de l'intensité et de la dynamique demande une grande maîtrise technique et une sensibilité artistique.</p>

<h3>Autres instruments</h3>
<p>En plus des bols tibétains et des gongs, nos praticiens utilisent des diapasons d'accupuncture (fréquences précises ciblant des organes spécifiques), des baguettes de cristal (vibrations pures et pénétrantes), des tambours de cadres (rythmes ancestraux), des clochettes tibétaines (harmoniques légères) et des instruments de la nature (coquillages, pierres, bambou). Chaque séance est unique, car le praticien choisit les instruments en fonction des besoins spécifiques du participant.</p>

<h2>Déroulement d'une séance — un voyage sensoriel en 60 à 90 minutes</h2>
<h3>Accueil et préparation</h3>
<p>Vous êtes accueilli dans un riad paisible ou un jardin zen, avec un thé aux plantes médicinales et une courte explication de la sonothérapie. Le praticien vous explique le déroulement de la séance, les effets possibles (relaxation profonde, émotion, chaleur, frisson) et les consignes (respirer normalement, ne rien forcer, laisser les sons vous porter). Vous vous installez confortablement sur un tapis de yoga ou un lit de relaxation, avec des couvertures moelleuses et des coussins de soutien.</p>

<h3>La séance de sonothérapie</h3>
<p>La séance dure 60 à 90 minutes selon la formule choisie. Le praticien fait résonner les bols tibétains autour de vous, en les plaçant sur votre corps ou à proximité. Les vibrations pénètrent chaque zone de votre corps, des pieds à la tête, en passant par les chakras (centres énergétiques). Le son est progressif : il commence en douceur et augmente progressivement en intensité, créant un véritable bain sonore qui vous enveloppe et vous emporte.</p>
<p>Vous entrez progressivement dans un état de relaxation profonde, entre veille et sommeil, où les pensées s'arrêtent et le corps se détend complètement. Certains participants ressentent des chaleurs, des frissons, des picotements ou des émotions. Tous ces effets sont normaux et bénéfiques — c'est le corps qui libère les tensions accumulées. Le praticien adapte les sons en temps réel en fonction de vos réactions.</p>

<h3>Retour progressif</h3>
<p>À la fin de la séance, le praticien réduit progressivement l'intensité des sons et vous ramène doucement à l'état de veille. Un thé chaud et des biscuits sont servis, et un temps de partage est prévu pour échanger sur votre expérience. Vous repartez avec des conseils de practice à domicile et, si vous le souhaitez, un enregistrement de la séance pour prolonger les bienfaits chez vous.</p>

<h2>Effets bénéfiques — la science confirme la tradition</h2>
<p>De nombreuses études scientifiques ont démontré les bienfaits de la sonothérapie : réduction du stress (mesurée par le cortisol salivaire), amélioration de la qualité du sommeil, diminution des douleurs chroniques, réduction de l'anxiété et de la dépression, amélioration de la concentration et de la créativité. Les vibrations des bols tibétains induisent un état de relaxation profonde comparable à la méditation, mais sans effort de concentration — c'est le corps qui se détend tout seul, porté par les sons.</p>
<p>Les effets sont ressentis dès la première séance, mais les bénéfices s'accumulent avec la pratique régulière. Nous recommandons une série de 3 à 5 séances pour des résultats durables. La sonothérapie est sans danger, sans effet secondaire et sans contre-indication (sauf pour les porteurs de stimulateurs cardiaques).</p>

<h2>Séances privées et collectives</h2>
<p>Les séances privées sont individuelles ou en duo (couple, ami). Le praticien se consacre entièrement à vous et adapte la séance à vos besoins spécifiques. Les séances collectives réunissent 6 à 12 personnes dans un jardin ou une salle dédiée. L'énergie du groupe amplifie les effets de la sonothérapie et crée une expérience de partage unique.</p>
<p>Nous proposons également des séances de sonothérapie à domicile : le praticien se déplace à votre villa avec tout le matériel nécessaire (bols, gongs, tapis, couvertures). C'est l'option idéale pour les personnes qui préfèrent le confort et l'intimité de leur propre espace.</p>

<h2>Réservation et tarifs</h2>
<p>Les séances de sonothérapie sont disponibles du lundi au dimanche, sur rendez-vous. La réservation est obligatoire et se fait en ligne, par téléphone ou par e-mail. L'annulation est gratuite jusqu'à 24h avant la séance. Le tarif comprend la séance complète, le thé d'accueil et les conseils de practice à domicile. Les séances collectives sont à tarif réduit par rapport aux séances privées.</p>`,

  "vos-soirees-festives": `<h2>Soirées Festives à Marrakech : célébrez dans le cadre le plus somptueux</h2>
<p>Marrakech est une ville qui vibre la nuit, une ville où les lumières dorées des lanternes transforment les riads en palais enchantés, où la musique emplit les rues de rythmes envoûtants et où la gastronomie révèle ses saveurs les plus intenses. Nos soirées privées dans des riads et des villas de luxe sont des expériences exclusives qui combinent ambiance festive, gastronomie raffinée, musique live et cadre somptueux pour créer des événements véritablement inoubliables. Mariages, anniversaires, enterrements de vie de jeune fille/garçon, séminaires d'entreprise, lancements de produits, célébrations familiales — nous créons l'événement de vos rêves dans le cadre le plus exceptionnel du Maroc.</p>
<p>Chaque événement est entièrement personnalisé et sur mesure. Notre équipe créative transforme votre vision en réalité, avec un souci du détail qui force l'admiration. Du premier verre de champagne au dernier bal, chaque instant est choreographié pour créer une expérience unique et mémorable.</p>

<h2>Nos formules — trois niveaux d'élégance et de fête</h2>
<h3>Cocktail Privé (3h — l'élégance en un instant)</h3>
<p>Le cocktail privé est l'option idéale pour les événements élégants et sophistiqués. Durant 3 heures, vos invités profitent de champagne (ou mocktails non alcoolisés), de canapés gastronomiques préparés par un chef sur place, de boissons variées (vins, spiritueux, jus de fruits frais) et d'une ambiance musicale soignée. Le DJ sélectionne une playlist adaptée à l'ambiance — jazz, lounge, musique marocaine contemporaine, hits internationaux.</p>
<p>La décoration est soignée avec des fleurs fraîches, des bougies parfumées, des nappes en lin et des luminaires tamisés. Le riad est transformé en un espace de réception élégant, avec des zones de conversation, un bar élégant et une piste de danse discrète. C'est l'option parfaite pour les cocktails d'entreprise, les vernissages, les lancements de produits et les réceptions familiales.</p>

<h3>Soirée Complète (6h — la fête à l'état pur)</h3>
<p>La soirée complète est l'expérience festive ultime. Durant 6 heures, vos invités vivent une soirée complète avec dîner gastronomique, boissons en quantité, musique live (groupe gnawa, DJ, musiciens traditionnels) et animations (danse du ventre, mousse, feux d'artifice). Le dîner est servi en buffet ou en service assis, selon vos préférences, avec un menu préparé par un chef étoilé : tajines de luxe, pastillas royales, pâtisseries orientales, fruits de saison.</p>
<p>La soirée se déroule en plusieurs temps : accueil au champagne, dîner gastronomique, spectacle musical, danse et fête, et clôture avec pâtisseries et thé. Chaque moment est chorégraphié pour créer une progression émotionnelle et festive qui culmine dans une fête mémorable. Les invités repartent avec le sourire aux lèvres et des souvenirs inoubliables.</p>

<h3>Mariage de Rêve — l'événement le plus important de votre vie</h3>
<p>Notre service de mariages est le plus complet et le plus prestigieux. Nous créons le mariage de vos rêves dans un riad de charme, une villa de luxe ou un jardin majestueux, avec un planning complet qui comprend : la cérémonie (laïque ou religieuse), le cocktail d'accueil, le dîner de gala, le bal et la soirée dansante, la décoration florale et lumineuse, la musique (groupe live, DJ, musiciens traditionnels), la photographie et la vidéographie professionnelle, le transport des invités, l'hébergement des invités VIP.</p>
<p>Notre équipe de wedding planners expérimentés vous accompagne de A à Z, de la conception à l'exécution. Nous gérons tous les détails : traiteur, fleuriste, décoration, musique, photographie, logistique, timing. Vous n'avez rien à faire sauf profiter de votre jour spécial. Les mariages que nous organisons sont des événements exceptionnels, des histoires d'amour racontées dans le cadre le plus beau du Maroc.</p>

<h2>Nos cadres — des riads et villas d'exception</h2>
<p>Nous travaillons avec une sélection exclusive de riads et villas de luxe à Marrakech, chacun offrant un cadre unique et une atmosphère différente. Les riads de la médina avec leurs jardins intérieurs, leurs fontaines et leurs mosaïques offrent une authenticité incomparable. Les villas modernes de l'Agafay avec leurs piscines, leurs jardins paysagers et leurs vues sur l'Atlas offrent un luxe contemporain. Les bastions et ksars (forteresses) restaurés offrent un cadre historique et majestueux.</p>
<p>Chaque cadre est soigneusement sélectionné pour sa beauté, son atmosphère, sa capacité d'accueil et ses équipements. Nous visitons personnellement chaque lieu et n'y travaillons qu'avec des propriétaires qui partagent nos standards d'excellence et de service.</p>

<h2>Services inclus — tout est prévu pour votre tranquillité</h2>
<p>Tous nos forfaits incluent : la location du lieu, la décoration sur mesure (fleurs, bougies, nappes, luminaires), le traiteur gastronomique (chef sur place), les boissons (champagne, vins, spiritueux, jus), la musique (DJ ou groupe live selon la formule), le service (serveurs, bartenders, maître d'hôtel), le nettoyage post-événement, et un coordinateur dédié qui gère toute la logistique le soir de l'événement.</p>
<p>Les options supplémentaires incluent : la photographie et la vidéographie professionnelles, le maquillage et la coiffure pour les mariées, le transport en limousine ou en calèche, les feux d'artifice, le cigar lounge, le photobooth avec accessoires, le trousseau de cadeaux pour les invités. Chaque option est personnalisable selon vos envies et votre budget.</p>

<h2>Démarche et réservation</h2>
<p>La organisation d'une soirée festive commence par un rendez-vous de conception gratuit avec notre équipe créative. Nous discutons de votre vision, de votre budget, de votre nombre d'invités et de vos envies. Nous vous proposons des concepts personnalisés, des lieux adaptés et un devis détaillé. Une fois le concept validé, nous gérons l'intégralité de l'organisation, de la A à la Z.</p>
<p>Les soiréesfestives sont disponibles tous les soirs de l'année, mais les disponibilités sont limitées pendant la haute saison (octobre à mai) et pendant les périodes de fêtes (Nouvel An, Aid Al Fitr, Aid Al Adha). Nous vous recommandons de réserver au moins 3 mois à l'avance pour les mariages et les grands événements, et 1 mois à l'avance pour les soirées et cocktails.</p>`,

  "vos-demandes-specifiques": `<h2>Expériences sur Mesure à Marrakech : transformez vos rêves en réalité</h2>
<p>Chaque client est unique, et certaines expériences ne peuvent être cataloguées dans des formules standard. Notre service « Demandes Spécifiques » accueille toutes vos demandes particulières, vos idées creatives, vos projets originaux et vos rêves les plus ambitieux. Voyage de noces romantique, surprise pour un proche, expérience inaccessible au grand public, projet artistique, événement exceptionnel, configuration unique — notre équipe créative transforme votre idée en réalité, avec un souci du détail et un niveau d'exécution qui force l'admiration.</p>
<p>Nous ne disons jamais non. Si vous le rêvez, nous le réalisons. Notre réseau de partenaires, notre connaissance approfondie de Marrakech et du Maroc, et notre expérience dans l'organisation d'événements exceptionnels nous permettent de créer des expériences que vous ne trouverez nulle part ailleurs. Chaque projet est unique, chaque réalisation est un chef-d'œuvre personnalisé.</p>

<h2>Exemples de réalisations — pour vous inspirer</h2>
<h3>Romance et Intimité</h3>
<p>Dîner romantique sur la terrasse privée de la médina, avec vue à 360° sur les toits de la ville et les minarets éclairés. Le chef cuisine devant vous un menu gastronomique personnel, les musiciens jouent votre chanson préférée, les étoiles brillent au-dessus de vos têtes. Vol en hélicoptère au coucher du soleil, survol de la médina, atterrissage dans le désert d'Agafay pour un champagne sous les étoiles. Session photo professionnelle dans les rues de la médina, avec un photographe qui capture votre amour dans les ruelles les plus photogéniques de Marrakech. Proposale romantique organisée de A à Z, avec pétales de roses, musiciens, photographe et champagne.</p>

<h3>Aventure et Exploration</h3>
<p>Excursion privée dans l'Atlas à dos de mule, avec déjeuner dans un village berbère et nuit dans un gîte de montagne. Bivouac de luxe dans le désert de Zagora avec dromadaires au clair de lune. Plongée sous-marine à Agadir avec guide privé et déjeuner sur la plage. Safari photographique dans le Draa-Tafilalet avec guide自然iste et campement sous les étoiles.</p>

<h3>Culture et Art</h3>
<p>Atelier de cuisine privée avec un chef étoilé marocain dans sa propre cuisine. Visite privée de galeries d'art et d'ateliers d'artistes dans la médina, avec rencontres exclusives. Cours de calligraphie arabe avec un maître calligraphe. Séance de musique gnawa avec des musicians traditionnels dans un riad authentique. Visite guidée de l'architecture de Marrakech avec un professeur d'université spécialiste.</p>

<h3>Événements Exceptionnels</h3>
<p>Anniversaire surprenant transformé en soirée de gala avec traiteur, DJ et décoration. Enterrement de vie de jeune fille/garçon avec programme d'activités sur mesure (cuisine, spa, soirée). Séminaire d'entreprise avec team building créatif, conférences et gala de clôture. Lancement de produit avec invités VIP, presse et réception dans un cadre prestigieux.</p>

<h2>Notre démarche créative — de l'idée à la réalisation</h2>
<h3>Écoute et conception</h3>
<p>Tout commence par une rencontre (en personne ou en visio) où nous discutons de votre projet, de vos envies, de votre budget et de vos contraintes. Nous posons des questions, nous écoutons attentivement, nous prenons des notes et nous commençons à imaginer des solutions. Notre rôle est de comprendre votre vision et de la transformer en un plan d'action concret et réalisable.</p>

<h3>Proposition et validation</h3>
<p>Dans les 48 heures suivant notre rencontre, nous vous envoyons une proposition détaillée comprenant : concept créatif, planning détaillé, budget prévisionnel, photos des lieux et des prestataires, alternatives possibles. Vous validez, modifiez ou demandez des ajustements. Nous travaillons avec vous jusqu'à ce que la parfaite soit atteinte.</p>

<h3>Exécution et coordination</h3>
<p>Notre équipe gère l'intégralité de l'exécution : réservation des lieux, coordination des prestataires, logistique, timing, décoration, cuisine, musique, photographie. Le jour J, un coordinateur dédié est présent de 8h00 à minuit (ou plus si nécessaire) pour gérer chaque détail et résoudre les imprévus. Vous n'avez rien à faire sauf profiter de votre expérience.</p>

<h2>Pourquoi nous choisir</h2>
<p>Notre réseau de plus de 200 partenaires qualifiés à Marrakech couvre tous les métiers de l'événementiel, du voyage et de l'expérience sur mesure : traiteurs gastronomiques, fleuristes, décorateurs, musiciens, photographes, moniteurs, guides, chauffeurs, hébergeurs. Nous ne travaillons qu'avec des professionnels qui partagent nos standards d'excellence et de service.</p>
<p>Notre connaissance intime de Marrakech et du Maroc nous permet de vous proposer des expériences authentiques, originales et inaccessibles au grand public. Nous connaissons les riads cachés, les artisans secrets, les guides d'exception, les restaurants interdits, les spots photo magiques. C'est cette connaissance qui fait la différence entre un séjour ordinaire et une expérience exceptionnelle.</p>
<p>Notre confidentialité est absolue. Nous ne divulguons jamais les noms de nos clients, les détails de nos événements ou les informations privées. Votre vie privée est protégée et respectée.</p>

<h2>Démarche et réservation</h2>
<p>Le premier rendez-vous de conception est gratuit et sans engagement. Nous discutons de votre projet, nous vous donnons notre avis et nous estimons le budget nécessaire. Si vous décidez de travailler avec nous, un acompte de 50% est demandé à la signature du contrat, le solde étant réglé à la livraison de l'expérience. L'annulation est possible jusqu'à 30 jours avant l'événement avec remboursement intégral de l'acompte.</p>
<p>Contactez-nous par téléphone, par e-mail ou via notre formulaire en ligne. Notre équipe répond sous 24 heures et vous propose un rendez-vous sous 48 heures. L'essentiel est de commencer tôt — les meilleurs créneaux et les meilleurs lieux partent vite, surtout pendant la haute saison.</p>`,
};

async function main() {
  console.log("Expanding services 18-23 to 2000+ words...\n");

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
