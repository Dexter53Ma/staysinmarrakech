"use client";

import { use } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VillaDetail, { VillaDetailData } from "@/components/VillaDetail";
import SimilarVillas from "@/components/SimilarVillas";

const villasData: Record<string, VillaDetailData> = {
  nouma: {
    slug: "nouma",
    title: "Villa Nouma",
    images: [
      "/images/villas/nouma.jpg",
      "/images/villas/nouma-interior-1.jpg",
      "/images/villas/nouma-interior-2.jpg",
      "/images/villas/nouma-interior-3.jpg",
      "/images/villas/nouma-interior-4.jpg",
      "/images/villas/nouma-interior-5.jpg",
    ],
    terrain: "3 000 m²",
    surface: "1 200 m²",
    chambres: 6,
    pax: 16,
    description:
      "La Villa Nouma est une résidence de luxe alliant architecture moderne et tradition marocaine. Située dans un cadre paisible, elle offre un espace de vie spacieux avec une vue imprenable sur les paysages environnants.",
    nousAimons:
      "Nous aimons la luminosité naturelle qui inonde chaque pièce, la piscine à débordement offrant une vue sur les jardins tropicaux, ainsi que le salon extérieur idéal pour les soirées entre amis.",
    avisSpecialiste:
      "Le spécialiste souligne l'harmonie parfaite entre le design contemporain et les touches marocaines traditionnelles. La finition soignée et les matériaux haut de gamme font de cette villa un véritable biju immobilier.",
    chambresLits:
      "6 chambres spacieuses : 2 suites parentales avec salle de bain privée et balcon, 3 chambres doubles avec douche italienne, 1 chambre enfant avec lits superposés. Toutes les chambres disposent de rangements sur mesure et de la climatisation.",
    features: [
      "Piscine à débordement chauffée",
      "Jardin paysager",
      "Garage double",
      "Climatisation centrale",
    ],
    equipment: [
      "Wi-Fi haut débit",
      "Cuisine équipée professionnelle",
      "Piscine à débordement",
      "Jacuzzi",
      "BBQ / Plancha",
      "Climatisation reversible",
      "TV écran plat 65\"",
      "Systeme audio JBL",
      "Lave-linge & sèche-linge",
      "Table de ping-pong",
      "Terrasse panoramique",
      "Parking privé",
    ],
    servicesIncluded: [
      "Ménage quotidien",
      "Gardien 24h/24",
      "Wi-Fi",
      "Linge de maison",
      "Transfert aéroport (aller simple)",
      "Petit-déjeuner continental",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Masseur / spa à domicile",
      "Location de voiture",
      "Organisation d'événements",
      "Garde d'enfants",
      "Guide touristique",
    ],
  },
  nayma: {
    slug: "nayma",
    title: "Villa Nayma",
    images: [
      "/images/villas/nayma.jpeg",
      "/images/villas/nayma-interior-1.jpg",
      "/images/villas/nayma-interior-2.jpg",
      "/images/villas/nayma-interior-3.jpg",
    ],
    terrain: "9 600 m²",
    surface: "650 m²",
    chambres: 6,
    pax: 12,
    description:
      "La Villa Nayma est une propriété d'exception nichée au cœur de la Palmeraie. Avec son architecture inspirée des palais andalous, elle offre un cadre de vie somptueux entouré de jardins luxuriants.",
    nousAimons:
      "Nous aimons le jardin majestueux avec ses palmiers centenaires, la grande piscine bordée de pierre naturelle, et les salons intérieurs aux motifs zellige authentiques.",
    avisSpecialiste:
      "Une villa qui impressione par sa taille généreuse et son aménagement paysager exceptionnel. L'intérieur mêle avec brio artisanat marocain et confort moderne.",
    chambresLits:
      "6 chambres dont 3 suites avec bain, 2 doubles et 1 enfant. Mobilier de qualité, draps en coton égyptien, et climatisation individuelle.",
    features: [
      "Piscine naturelle",
      "Jardin de 2 hectares",
      "Tennis privé",
      "Salle de sport",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine naturelle",
      "Terrain de tennis",
      "Salle de sport",
      "Cuisine professionnelle",
      "Climatisation",
      "TV satellite",
      "BBQ",
      "Buanderie",
      "Cheminée",
    ],
    servicesIncluded: [
      "Jardinier",
      "Gardien",
      "Ménage 3x/semaine",
      "Wi-Fi",
      "Linge de maison",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Infirmier à domicile",
      "Location voiture de luxe",
      "Organisation événements",
    ],
  },
  lya: {
    slug: "lya",
    title: "Villa Lya",
    images: [
      "/images/villas/lya.jpg",
      "/images/villas/lya-interior-1.jpg",
      "/images/villas/lya-interior-2.jpg",
    ],
    terrain: "2 500 m²",
    surface: "350 m²",
    chambres: 4,
    pax: 8,
    description:
      "La Villa Lya est une villa intimate et raffinée, parfaite pour des vacances en famille ou entre amis. Son design épuré et ses espaces verts offrent un havre de paix à Marrakech.",
    nousAimons:
      "Nous aimons l'intimité de cette villa, sa terrasse sur le toit avec vue sur l'Atlas, et sa cuisine ouverte idéale pour partager des repas conviviaux.",
    avisSpecialiste:
      "Un bon rapport qualité-prix pour une villa de standing supérieure. L'aménagement est intelligent et les finitions soignées.",
    chambresLits:
      "4 chambres : 1 suite parentale, 2 doubles, 1 avec lits jumeaux. Chaque chambre a sa propre salle de bain.",
    features: [
      "Toit-terrasse",
      "Piscine privée",
      "Jardin clos",
      "Vue Atlas",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine chauffée",
      "Climatisation",
      "TV",
      "Cuisine équipée",
      "Terrasse",
      "BBQ",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
      "Petit-déjeuner",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Spa à domicile",
      "Transfert aéroport",
    ],
  },
  nera: {
    slug: "nera",
    title: "Villa Nera",
    images: [
      "/images/villas/nera.jpg",
      "/images/villas/nera-interior-1.jpg",
      "/images/villas/nera-interior-2.jpg",
    ],
    terrain: "2 500 m²",
    surface: "750 m²",
    chambres: 5,
    pax: 10,
    description:
      "La Villa Nera incarne le luxe contemporain avec ses lignes épurées et ses finitions noires et dorées. Une résidence d'exception pour les amateurs de design.",
    nousAimons:
      "Nous aimons le design audacieux aux tons sombres, la piscine chauffée avec éclairage LED, et la salle de cinéma privée.",
    avisSpecialiste:
      "Une villa qui sort de l'ordinaire avec son thème noir élégant. L'équipement est complet et la localisation idéale.",
    chambresLits:
      "5 chambres design : 2 suites luxueuses, 3 doubles. Salle de cinéma convertible en 6ème chambre.",
    features: [
      "Salle de cinéma",
      "Piscine chauffée",
      "Design contemporain",
      "Domotique",
    ],
    equipment: [
      "Wi-Fi",
      "Salle de cinéma",
      "Piscine chauffée",
      "Domotique",
      "Climatisation",
      "Système audio",
      "Cuisine design",
      "Bar",
    ],
    servicesIncluded: [
      "Ménage quotidien",
      "Gardien 24h/24",
      "Wi-Fi",
      "Concierge",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Butler personnel",
      "Location yacht",
    ],
  },
  selma: {
    slug: "selma",
    title: "Villa Selma",
    images: [
      "/images/villas/selma.jpg",
      "/images/villas/selma-interior-1.jpg",
      "/images/villas/selma-interior-2.jpg",
    ],
    terrain: "60 000 m²",
    surface: "2 500 m²",
    chambres: 21,
    pax: 46,
    description:
      "La Villa Selma est une propriété grandiose de 6 hectares, idéale pour les grands événements et séjours de groupe. Son domaine privé comprend jardin, oliveraie et fontaines.",
    nousAimons:
      "Nous aimons l'immensité du domaine, la grande salle de réception pouvant accueillir 100 personnes, et la vue panoramique sur l'Atlas.",
    avisSpecialiste:
      "Un domaine exceptionnel, rare sur le marché. Parfait pour les weddings, séminaires et grands rassemblements familiaux.",
    chambresLits:
      "21 chambres réparties dans le bâtiment principal et les dépendances. Suites familiales, chambres doubles, et appartement indépendant pour le personnel.",
    features: [
      "Domaine de 6 hectares",
      "Grande salle de réception",
      "Olivier centenaire",
      "Multiple piscines",
    ],
    equipment: [
      "Wi-Fi",
      "3 piscines",
      "Salle de réception 100p",
      "Cuisine événementielle",
      "Climatisation",
      "Générateur",
      "Parking 20 véhicules",
      "Hélicoptère possible",
    ],
    servicesIncluded: [
      "Équipe complète",
      "Ménage permanent",
      "Sécurité 24h/24",
      "Wi-Fi",
      "Linge",
    ],
    servicesExtra: [
      "Traiteur événementiel",
      "Décorateur",
      "Photographe",
      "Dj / Sonorisation",
    ],
  },
  shakira: {
    slug: "shakira",
    title: "Villa Shakira",
    images: [
      "/images/villas/shakira.jpeg",
      "/images/villas/shakira-interior-1.jpg",
      "/images/villas/shakira-interior-2.jpg",
    ],
    terrain: "10 000 m²",
    surface: "700 m²",
    chambres: 5,
    pax: 16,
    description:
      "La Villa Shakira est une résidence de charme alliant confort moderne et authenticité marocaine. Ses jardins luxuriants et sa vue sur les palmiers en font un paradis tropical.",
    nousAimons:
      "Nous aimons la piscine bordée de végétation tropicale, le hammam traditionnel, et les terrasses ombragées pour la détente.",
    avisSpecialiste:
      "Une villa au charme incomparable, parfaitement entretenue. Le jardin est un véritable coup de coeur.",
    chambresLits:
      "5 chambres : 2 suites avec bain, 3 doubles. Décoration artisanale marocaine dans chaque pièce.",
    features: [
      "Hammam",
      "Jardin tropical",
      "Piscine",
      "Vue palmiers",
    ],
    equipment: [
      "Wi-Fi",
      "Hammam",
      "Piscine",
      "Climatisation",
      "Cuisine équipée",
      "TV",
      "BBQ",
      "Terrasse",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
      "Linge de maison",
    ],
    servicesExtra: [
      "Hammam à domicile",
      "Chef à domicile",
      "Excursion désert",
    ],
  },
  gabriella: {
    slug: "gabriella",
    title: "Villa Gabriella",
    images: [
      "/images/villas/gabriella.jpg",
      "/images/villas/gabriella-interior-1.jpg",
      "/images/villas/gabriella-interior-2.jpg",
    ],
    terrain: "4 500 m²",
    surface: "550 m²",
    chambres: 5,
    pax: 10,
    description:
      "La Villa Gabriella est une résidence élégante aux lignes classiques, nichée dans un jardin méditerranéen. Son architecture raffinée et ses espaces généreux en font un cadre de choix pour des vacances de luxe.",
    nousAimons:
      "Nous aimons la façade blanche éclatante, la grande terrasse ombragée donnant sur la piscine, et les intérieurs baignés de lumière naturelle.",
    avisSpecialiste:
      "Une villa qui séduit par son équilibre parfait entre espace intérieur et extérieur. Le jardin est magnifiquement entretenu.",
    chambresLits:
      "5 chambres : 2 suites parentales avec bain, 2 doubles, 1 chambre junior. Mobilier haut de gamme et draps en lin.",
    features: [
      "Piscine à débordement",
      "Jardin méditerranéen",
      "Terrasse panoramique",
      "Poêle à bois",
    ],
    equipment: [
      "Wi-Fi",
      "Cuisine équipée",
      "Piscine chauffée",
      "Climatisation",
      "TV écran plat",
      "BBQ",
      "Terrasse",
      "Parking couvert",
    ],
    servicesIncluded: [
      "Ménage quotidien",
      "Gardien",
      "Wi-Fi",
      "Linge de maison",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Massage à domicile",
      "Location vélos",
    ],
  },
  paloma: {
    slug: "paloma",
    title: "Villa Paloma",
    images: [
      "/images/villas/paloma.jpg",
      "/images/villas/paloma-interior-1.jpg",
      "/images/villas/paloma-interior-2.jpg",
    ],
    terrain: "3 200 m²",
    surface: "420 m²",
    chambres: 4,
    pax: 8,
    description:
      "La Villa Paloma est un havre de paix au design contemporain, entourée de jardins fleuris. Parfaite pour les familles, elle offre un environnement sécurisé et des espaces de vie lumineux.",
    nousAimons:
      "Nous aimons la piscine à rim flow entourée de transats, le salon ouvert sur le jardin, et la vue sur les palmiers de la Palmeraie.",
    avisSpecialiste:
      "Une villa idéale pour les familles avec enfants. L'espace extérieur est particulièrement bien aménagé pour la détente.",
    chambresLits:
      "4 chambres confortables : 1 suite parentale, 2 doubles, 1 chambre avec lits jumeaux. Salle de bain commune et WC séparé.",
    features: [
      "Piscine rim flow",
      "Jardin clôturé",
      "Espace enfants",
      "Vue Palmeraie",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine",
      "Climatisation",
      "Cuisine équipée",
      "TV",
      "BBQ",
      "Jeux pour enfants",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Garde d'enfants",
      "Transfert aéroport",
    ],
  },
  ilana: {
    slug: "ilana",
    title: "Villa Ilana",
    images: [
      "/images/villas/ilana.jpg",
      "/images/villas/ilana-interior-1.jpg",
      "/images/villas/ilana-interior-2.jpg",
    ],
    terrain: "12 000 m²",
    surface: "1 400 m²",
    chambres: 9,
    pax: 23,
    description:
      "La Villa Ilana est une grande villa d'exception dans la Palmeraie, conçue pour accueillir de grands groupes. Son architecture imposante et ses nombreux espaces de vie en font un domaine privé complet.",
    nousAimons:
      "Nous aimons les multiples salons intérieurs et extérieurs, la grande piscine avec bassin enfants, et le jardin tropical luxuriant.",
    avisSpecialiste:
      "Un domaine rarement disponible sur le marché. Idéal pour les séminaires d'entreprise ou les réunions familiales importantes.",
    chambresLits:
      "9 chambres réparties sur 2 étages : 4 suites parentales, 3 doubles, 2 chambres enfants. Chaque étage dispose d'un salon commun.",
    features: [
      "Grande piscine + bassin enfants",
      "Domaine de 1,2 hectare",
      "2 salons extérieurs",
      "Salle de réception",
    ],
    equipment: [
      "Wi-Fi haut débit",
      "Cuisine professionnelle",
      "2 piscines",
      "Climatisation",
      "Générateur",
      "Salle de sport",
      "Hammam",
      "Parking 8 véhicules",
      "BBQ",
      "Terrasse panoramique",
    ],
    servicesIncluded: [
      "Équipe de ménage",
      "Gardien 24h/24",
      "Wi-Fi",
      "Linge de maison",
      "Jardinier",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Organisation d'événements",
      "Location matériel événementiel",
      "Guide touristique",
    ],
  },
  nemeno: {
    slug: "nemeno",
    title: "Villa Nemeno",
    images: [
      "/images/villas/nemeno.jpg",
      "/images/villas/nemeno-interior-1.jpg",
      "/images/villas/nemeno-interior-2.jpg",
    ],
    terrain: "5 500 m²",
    surface: "680 m²",
    chambres: 6,
    pax: 12,
    description:
      "La Villa Nemeno est une résidence de standing supérieur alliant artisanat marocain et confort moderne. Ses jardins paysagers et sa piscine à débordement offrent un cadre idéal de détente.",
    nousAimons:
      "Nous aimons les zelliges artisanaux, la fontaine du patio central, et la vue imprenable sur les montagnes de l'Atlas depuis la terrasse.",
    avisSpecialiste:
      "Une villa qui respire le calme et le raffinement. L'attention portée aux détails artisanaux est remarquable.",
    chambresLits:
      "6 chambres : 2 suites avec bain et balcon, 3 doubles, 1 chambre communicante pour enfants. Revêtements en tadelakt.",
    features: [
      "Piscine à débordement",
      "Patio central avec fontaine",
      "Vue Atlas",
      "Jardin paysager",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine chauffée",
      "Climatisation",
      "Cuisine équipée",
      "TV",
      "Cheminée",
      "BBQ",
      "Terrasse",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
      "Petit-déjeuner",
      "Jardinier",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Excursion montagne",
      "Cours de cuisine",
    ],
  },
  loubna: {
    slug: "loubna",
    title: "Villa Loubna",
    images: [
      "/images/villas/loubna.jpg",
      "/images/villas/loubna-interior-1.jpg",
      "/images/villas/loubna-interior-2.jpg",
    ],
    terrain: "2 800 m²",
    surface: "380 m²",
    chambres: 4,
    pax: 8,
    description:
      "La Villa Loubna est une villa chaleureuse au charme authentique, idéale pour un séjour en famille. Son jardin arboré et sa piscine garantissent des moments de douceur.",
    nousAimons:
      "Nous aimons l'ambiance chaleureuse des intérieurs, la terrasse ombragée avec hamac, et le jardin fleuri parfait pour les enfants.",
    avisSpecialiste:
      "Un excellent choix pour les familles. La villa est parfaitement équipée et le rapport qualité-prix est très attractif.",
    chambresLits:
      "4 chambres : 1 suite parentale, 2 doubles, 1 chambre avec 2 lits simples. Salle de bain avec baignoire.",
    features: [
      "Piscine privée",
      "Jardin arboré",
      "Terrasse ombragée",
      "Environnement familial",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine",
      "Climatisation",
      "Cuisine équipée",
      "TV",
      "BBQ",
      "Jeux de société",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Garde d'enfants",
      "Location vélos",
    ],
  },
  myriam: {
    slug: "myriam",
    title: "Villa Myriam",
    images: [
      "/images/villas/myriam.jpg",
      "/images/villas/myriam-interior-1.jpg",
      "/images/villas/myriam-interior-2.jpg",
    ],
    terrain: "4 000 m²",
    surface: "520 m²",
    chambres: 5,
    pax: 10,
    description:
      "La Villa Myriam est une propriété raffinée dans la Palmeraie, où le luxe se mêle à l'authenticité. Ses espaces extérieurs verdoyants et ses intérieurs élégants créent une atmosphère unique.",
    nousAimons:
      "Nous aimons le jardin de cactus et plantes grasses, la piscine bordée de pierre, et les voûtes en berbère du salon principal.",
    avisSpecialiste:
      "Une villa avec beaucoup de caractère. Le jardin est original et les intérieurs sont décorés avec goût.",
    chambresLits:
      "5 chambres : 2 suites avec douche italienne, 2 doubles, 1 chambre avec lit queen. Rangements intégrés.",
    features: [
      "Piscine bordée de pierre",
      "Jardin de cactus",
      "Architecture voûtée",
      "Calme absolu",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine",
      "Climatisation",
      "Cuisine équipée",
      "TV",
      "BBQ",
      "Terrasse",
      "Cheminée",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
      "Linge de maison",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Spa à domicile",
      "Organisation pique-nique",
    ],
  },
  katia: {
    slug: "katia",
    title: "Villa Katia",
    images: [
      "/images/villas/katia.jpg",
      "/images/villas/katia-interior-1.jpg",
      "/images/villas/katia-interior-2.jpg",
    ],
    terrain: "3 000 m²",
    surface: "400 m²",
    chambres: 4,
    pax: 8,
    description:
      "La Villa Katia est une villa moderne et lumineuse, idéale pour des vacances entre amis. Son design épuré et ses espaces ouverts sur le jardin offrent une sensation de liberté.",
    nousAimons:
      "Nous aimons la grande baie vitrée du salon donnant sur la piscine, les intérieurs design, et la terrasse au coucher du soleil.",
    avisSpecialiste:
      "Une villa contemporaine très bien pensée. L'espace extérieur est généreux et parfaitement aménagé.",
    chambresLits:
      "4 chambres : 1 suite parentale, 2 doubles, 1 chambre avec lits jumeaux. Salle de bain moderne.",
    features: [
      "Piscine à débordement",
      "Design intérieur",
      "Grande baie vitrée",
      "Terrasse sud",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine chauffée",
      "Climatisation",
      "Cuisine équipée",
      "TV écran plat",
      "BBQ",
      "Sound system",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Cours de yoga",
      "Location voiture",
    ],
  },
  bchir: {
    slug: "bchir",
    title: "Villa Bchir",
    images: [
      "/images/villas/bchir.jpg",
      "/images/villas/bchir-interior-1.jpg",
      "/images/villas/bchir-interior-2.jpg",
    ],
    terrain: "4 200 m²",
    surface: "530 m²",
    chambres: 5,
    pax: 10,
    description:
      "La Villa Bchir est une résidence de luxe entourée de végétation, offrant un cadre paisible et raffiné. Son jardin paysager et ses espaces de vie spacieux en font un véritable paradis.",
    nousAimons:
      "Nous aimons la grande piscine avec espace détente, le jardin tropical aux multiples essences, et le salon extérieur avec cheminée.",
    avisSpecialiste:
      "Une villa parfaitement entretenue avec des prestations de grande qualité. Le jardin est un vrai point fort.",
    chambresLits:
      "5 chambres : 2 suites parentales avec terrasse, 2 doubles, 1 chambre enfant. Mobilier artisanal.",
    features: [
      "Grande piscine",
      "Jardin tropical",
      "Salon extérieur",
      "Cheminée extérieure",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine",
      "Climatisation",
      "Cuisine équipée",
      "TV",
      "BBQ",
      "Terrasse",
      "Buanderie",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
      "Jardinier",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Massage",
      "Excursion",
    ],
  },
  hamza: {
    slug: "hamza",
    title: "Villa Hamza",
    images: [
      "/images/villas/hamza.jpg",
      "/images/villas/hamza-interior-1.jpg",
      "/images/villas/hamza-interior-2.jpg",
    ],
    terrain: "3 500 m²",
    surface: "420 m²",
    chambres: 4,
    pax: 8,
    description:
      "La Villa Hamza est une villa de charme au cœur de la Palmeraie, alliant confort moderne et touches traditionnelles. Son environnement verdoyant assure tranquillité et intimité.",
    nousAimons:
      "Nous aimons le patio intérieur avec figuier, la piscine bordée de bambous, et les lampe en cuivre ciselé.",
    avisSpecialiste:
      "Une villa au charme certain, parfaite pour ceux qui recherchent authenticité et calme. Bien située dans la Palmeraie.",
    chambresLits:
      "4 chambres : 1 suite parentale, 2 doubles, 1 chambre avec lit queen. Décoration marocaine raffinée.",
    features: [
      "Patio intérieur",
      "Piscine",
      "Jardin tropical",
      "Authenticité marocaine",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine",
      "Climatisation",
      "Cuisine équipée",
      "TV",
      "BBQ",
      "Terrasse",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Hammam à domicile",
      "Transfert aéroport",
    ],
  },
  jad: {
    slug: "jad",
    title: "Villa Jad",
    images: [
      "/images/villas/jad.jpg",
      "/images/villas/jad-interior-1.jpg",
      "/images/villas/jad-interior-2.jpg",
    ],
    terrain: "2 200 m²",
    surface: "300 m²",
    chambres: 3,
    pax: 6,
    description:
      "La Villa Jad est une villa intime et élégante, parfaite pour un couple ou une petite famille. Son design minimaliste et son jardin zen offrent un cadre de sérénité.",
    nousAimons:
      "Nous aimons l'ambiance zen du jardin, la petite piscine à débordement avec vue, et les intérieurs épurés et lumineux.",
    avisSpecialiste:
      "Une villa charmante pour ceux qui recherchent l'intimité et le calme. Le rapport qualité-prix est excellent.",
    chambresLits:
      "3 chambres : 1 suite parentale, 2 doubles. Salle de bain moderne avec douche à l'italienne.",
    features: [
      "Piscine à débordement",
      "Jardin zen",
      "Design minimaliste",
      "Intimité totale",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine chauffée",
      "Climatisation",
      "Cuisine équipée",
      "TV",
      "Terrasse",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Spa à domicile",
    ],
  },
  zineb: {
    slug: "zineb",
    title: "Villa Zineb",
    images: [
      "/images/villas/zineb.jpg",
      "/images/villas/zineb-interior-1.jpg",
      "/images/villas/zineb-interior-2.jpg",
    ],
    terrain: "4 800 m²",
    surface: "580 m²",
    chambres: 5,
    pax: 10,
    description:
      "La Villa Zineb est une propriété de prestige alliant luxe contemporain et artisanat marocain. Ses vastes jardins et sa vue sur la Palmeraie enfont un lieu d'exception.",
    nousAimons:
      "Nous aimons la grande terrasse avec vue panoramique, la piscine à débordement, et les détails artisanaux dans chaque pièce.",
    avisSpecialiste:
      "Une villa qui ne laisse personne indifférent. L'aménagement intérieur est soigné et les prestations sont haut de gamme.",
    chambresLits:
      "5 chambres : 2 suites luxueuses, 3 doubles. Linge en coton égyptien et produits d'accueil premium.",
    features: [
      "Piscine à débordement",
      "Vue panoramique",
      "Jardin paysager",
      "Terrasse panoramique",
    ],
    equipment: [
      "Wi-Fi haut débit",
      "Piscine chauffée",
      "Climatisation",
      "Cuisine équipée professionnelle",
      "TV écran plat",
      "BBQ",
      "Système audio",
      "Parking privé",
    ],
    servicesIncluded: [
      "Ménage quotidien",
      "Gardien",
      "Wi-Fi",
      "Linge de maison",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Masseur",
      "Location voiture luxe",
    ],
  },
  safaa: {
    slug: "safaa",
    title: "Villa Safaa",
    images: [
      "/images/villas/safaa.jpg",
      "/images/villas/safaa-interior-1.jpg",
      "/images/villas/safaa-interior-2.jpg",
    ],
    terrain: "3 300 m²",
    surface: "430 m²",
    chambres: 4,
    pax: 8,
    description:
      "La Villa Safaa est une villa lumineuse au design soigné, offrant un cadre de vie agréable et confortable. Son jardin fleuri et sa piscine créent une atmosphère de vacances parfaites.",
    nousAimons:
      "Nous aimons la luminosité des intérieurs, la terrasse avec vue sur le jardin, et la piscine bordée de oliviers.",
    avisSpecialiste:
      "Une villa bien entretenue avec de bonnes prestations. L'emplacement dans la Palmeraie est très apprécié.",
    chambresLits:
      "4 chambres : 1 suite parentale, 2 doubles, 1 chambre avec lits jumeaux. Salle de bain avec double vasque.",
    features: [
      "Piscine",
      "Jardin fleuri",
      "Terrasse",
      "Vue oliviers",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine",
      "Climatisation",
      "Cuisine équipée",
      "TV",
      "BBQ",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Transfert aéroport",
      "Location vélos",
    ],
  },
  safa: {
    slug: "safa",
    title: "Villa Safa",
    images: [
      "/images/villas/safa.jpg",
      "/images/villas/safa-interior-1.jpg",
      "/images/villas/safa-interior-2.jpg",
    ],
    terrain: "5 800 m²",
    surface: "720 m²",
    chambres: 6,
    pax: 12,
    description:
      "La Villa Safa est une résidence d'exception au cœur de la Palmeraie, où le luxe rencontre la tradition. Ses jardins majestueux et ses intérieurs raffinés offrent une expérience unique.",
    nousAimons:
      "Nous aimons le grand jardin avec fontaines, la piscine avec espace bar, et les salons décorés de zelliges artisanaux.",
    avisSpecialiste:
      "Une villa de grande envergure avec des finitions impeccables. Idéale pour les séjours prolongés en famille ou entre amis.",
    chambresLits:
      "6 chambres : 3 suites avec bain, 2 doubles, 1 chambre enfant. Toutes avec climatisation et rangements.",
    features: [
      "Grande piscine",
      "Jardin avec fontaines",
      "Espace bar extérieur",
      "Zelliges artisanaux",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine",
      "Climatisation",
      "Cuisine équipée",
      "TV",
      "BBQ",
      "Cheminée",
      "Terrasse",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
      "Jardinier",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Organisation événements",
      "Guide touristique",
    ],
  },
  nadia: {
    slug: "nadia",
    title: "Villa Nadia",
    images: [
      "/images/villas/nadia.jpg",
      "/images/villas/nadia-interior-1.jpg",
      "/images/villas/nadia-interior-2.jpg",
    ],
    terrain: "3 600 m²",
    surface: "450 m²",
    chambres: 4,
    pax: 8,
    description:
      "La Villa Nadia est une villa élégante et accueillante, nichée dans un cadre verdoyant. Son design chaleureux et ses espaces de vie spacieux en font un lieu idéal pour des vacances en famille.",
    nousAimons:
      "Nous aimons la piscine avec jet massage, le jardin avec jeux pour enfants, et la terrasse couverte pour les dîners en plein air.",
    avisSpecialiste:
      "Une villa familiale par excellence. Les équipements pour enfants sont un vrai plus, et la villa est très bien entretenue.",
    chambresLits:
      "4 chambres : 1 suite parentale, 2 doubles, 1 chambre kids. Salle de jeu pour les plus petits.",
    features: [
      "Piscine avec jet massage",
      "Jardin familial",
      "Terrasse couverte",
      "Espace enfants",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine",
      "Climatisation",
      "Cuisine équipée",
      "TV",
      "BBQ",
      "Jeux extérieurs",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Garde d'enfants",
      "Location vélos",
    ],
  },
  maria: {
    slug: "maria",
    title: "Villa Maria",
    images: [
      "/images/villas/maria.jpg",
      "/images/villas/maria-interior-1.jpg",
      "/images/villas/maria-interior-2.jpg",
    ],
    terrain: "4 300 m²",
    surface: "540 m²",
    chambres: 5,
    pax: 10,
    description:
      "La Villa Maria est une résidence de charme avec une architecture coloniale revisitée. Ses jardins tropicaux et sa décoration soignée en font un lieu enchanteur.",
    nousAimons:
      "Nous aimons le balcon en fer forgé, la grande véranda donnant sur le jardin, et la piscine entourée de palmiers.",
    avisSpecialiste:
      "Un charme fou pour cette villa au style unique. Les finitions sont soignées et l'ambiance y est très agréable.",
    chambresLits:
      "5 chambres : 2 suites avec balcon, 3 doubles. Mobilier vintage et touches colorées.",
    features: [
      "Piscine",
      "Jardin tropical",
      "Véranda",
      "Style colonial",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine",
      "Climatisation",
      "Cuisine équipée",
      "TV",
      "BBQ",
      "Terrasse",
      "Cheminée",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
      "Linge de maison",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Massage",
      "Cours de peinture",
    ],
  },
  sofia: {
    slug: "sofia",
    title: "Villa Sofia",
    images: [
      "/images/villas/sofia.jpg",
      "/images/villas/sofia-interior-1.jpg",
      "/images/villas/sofia-interior-2.jpg",
    ],
    terrain: "6 200 m²",
    surface: "800 m²",
    chambres: 6,
    pax: 14,
    description:
      "La Villa Sofia est une grande villa de luxe offrant des espaces de vie somptueux. Son architecture moderne et ses finitions haut de gamme en font une propriété d'exception.",
    nousAimons:
      "Nous aimons la grande piscine à débordement, le salon avec hauteur sous plafond, et la vue sur les jardins depuis la terrasse du premier étage.",
    avisSpecialiste:
      "Une villa impressionnante par sa taille et la qualité de ses prestations. L'espace de vie principal est véritablement magistral.",
    chambresLits:
      "6 chambres : 3 suites parentales, 2 doubles, 1 chambre junior. Mobilier design et rangements sur mesure.",
    features: [
      "Piscine à débordement",
      "Grande terrasse",
      "Salon majestueux",
      "Jardin paysager",
    ],
    equipment: [
      "Wi-Fi haut débit",
      "Cuisine professionnelle",
      "Piscine chauffée",
      "Climatisation",
      "TV écran plat 75\"",
      "Domotique",
      "Système audio",
      "Parking couvert",
    ],
    servicesIncluded: [
      "Ménage quotidien",
      "Gardien 24h/24",
      "Wi-Fi",
      "Linge de maison",
      "Concierge",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Butler",
      "Location voiture luxe",
      "Organisation événements",
    ],
  },
  amina: {
    slug: "amina",
    title: "Villa Amina",
    images: [
      "/images/villas/amina.jpg",
      "/images/villas/amina-interior-1.jpg",
      "/images/villas/amina-interior-2.jpg",
    ],
    terrain: "2 000 m²",
    surface: "280 m²",
    chambres: 3,
    pax: 6,
    description:
      "La Villa Amina est une petite villa de charme, parfaite pour un couple ou une petite famille. Son jardin intime et sa piscine offrent un cadre idéal pour la détente.",
    nousAimons:
      "Nous aimons l'intimité de cette villa, le jardin fleuri avec coin lecture, et la petite piscine chauffée.",
    avisSpecialiste:
      "Une villa cozy et bien équipée. Parfaite pour ceux qui recherchent un havre de paix à prix raisonnable.",
    chambresLits:
      "3 chambres : 1 suite parentale, 2 doubles. Intérieurs chaleureux et lumineux.",
    features: [
      "Piscine chauffée",
      "Jardin intime",
      "Coin lecture",
      "Charme",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine",
      "Climatisation",
      "Cuisine équipée",
      "TV",
      "Terrasse",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Transfert aéroport",
    ],
  },
  fatima: {
    slug: "fatima",
    title: "Villa Fatima",
    images: [
      "/images/villas/fatima.jpg",
      "/images/villas/fatima-interior-1.jpg",
      "/images/villas/fatima-interior-2.jpg",
    ],
    terrain: "4 100 m²",
    surface: "510 m²",
    chambres: 5,
    pax: 10,
    description:
      "La Villa Fatima est une résidence élégante aux influences art déco, nichée dans un jardin luxuriant. Ses espaces de vie raffinés et sa piscine créent une ambiance de rêve.",
    nousAimons:
      "Nous aimons les motifs géométriques du sol, la grande piscine bordée de lauriers-roses, et le bar extérieur avec vue.",
    avisSpecialiste:
      "Un style unique qui se démarque des autres villas. L'attention aux détails décoratifs est remarquable.",
    chambresLits:
      "5 chambres : 2 suites avec bain, 2 doubles, 1 chambre avec lit king size. Décoration art déco soignée.",
    features: [
      "Piscine",
      "Jardin luxuriant",
      "Bar extérieur",
      "Style art déco",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine",
      "Climatisation",
      "Cuisine équipée",
      "TV",
      "BBQ",
      "Bar",
      "Terrasse",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
      "Linge de maison",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Masseur",
      "Organisation soirée",
    ],
  },
  leila: {
    slug: "leila",
    title: "Villa Leila",
    images: [
      "/images/villas/leila.jpg",
      "/images/villas/leila-interior-1.jpg",
      "/images/villas/leila-interior-2.jpg",
    ],
    terrain: "3 400 m²",
    surface: "410 m²",
    chambres: 4,
    pax: 8,
    description:
      "La Villa Leila est une villa raffinée avec une touche bohème chic. Ses intérieurs colorés et son jardin méditerranéen offrent une atmosphère décontractée et élégante.",
    nousAimons:
      "Nous aimons les couleurs vibrantes des intérieurs, la pergola couverte de glycine, et la petite terrasse sur le toit.",
    avisSpecialiste:
      "Un style original et bien exécuté. La villa a du caractère et offre un cadre de vie très agréable.",
    chambresLits:
      "4 chambres : 1 suite parentale, 2 doubles, 1 chambre avec lits jumeaux. Textiles artisanaux.",
    features: [
      "Piscine",
      "Jardin méditerranéen",
      "Toit-terrasse",
      "Style bohème chic",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine",
      "Climatisation",
      "Cuisine équipée",
      "TV",
      "BBQ",
      "Terrasse",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Cours de yoga",
      "Spa à domicile",
    ],
  },
  yasmine: {
    slug: "yasmine",
    title: "Villa Yasmine",
    images: [
      "/images/villas/yasmine.jpg",
      "/images/villas/yasmine-interior-1.jpg",
      "/images/villas/yasmine-interior-2.jpg",
    ],
    terrain: "5 200 m²",
    surface: "650 m²",
    chambres: 6,
    pax: 12,
    description:
      "La Villa Yasmine est une propriété de prestige au cadre enchanteur. Son architecture mêle tradition et modernité, créant un espace de vie harmonieux et luxueux.",
    nousAimons:
      "Nous aimons le jardin avec bassin ornamental, la grande terrasse voûtée, et les chambres spacieuses baignées de lumière.",
    avisSpecialiste:
      "Une villa très bien conçue qui offre un grand confort de vie. Le jardin est un véritable atout.",
    chambresLits:
      "6 chambres : 3 suites parentales, 2 doubles, 1 chambre communicante. Plafonds voûtés et tadelakt.",
    features: [
      "Piscine",
      "Jardin avec bassin",
      "Terrasse voûtée",
      "Plafonds voûtés",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine",
      "Climatisation",
      "Cuisine équipée",
      "TV",
      "BBQ",
      "Cheminée",
      "Terrasse",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
      "Jardinier",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Excursion montagne",
      "Guide touristique",
    ],
  },
  houda: {
    slug: "houda",
    title: "Villa Houda",
    images: [
      "/images/villas/houda.jpg",
      "/images/villas/houda-interior-1.jpg",
      "/images/villas/houda-interior-2.jpg",
    ],
    terrain: "2 100 m²",
    surface: "290 m²",
    chambres: 3,
    pax: 6,
    description:
      "La Villa Houda est une villa paisible et bien entretenue, offrant tout le confort nécessaire pour des vacances réussies. Son jardin arboré et sa piscine garantissent des moments de relaxation.",
    nousAimons:
      "Nous aimons le calme de cette villa, le jardin ombragé avec hamac, et la petite cuisine extérieure pour les BBQ.",
    avisSpecialiste:
      "Une villa simple mais très fonctionnelle. Parfaite pour un séjour décontracté en famille ou entre amis.",
    chambresLits:
      "3 chambres : 1 suite parentale, 2 doubles. Intérieurs épurés et fonctionnels.",
    features: [
      "Piscine",
      "Jardin ombragé",
      "Cuisine extérieure",
      "Hamac",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine",
      "Climatisation",
      "Cuisine équipée",
      "TV",
      "BBQ",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Transfert aéroport",
    ],
  },
  salma: {
    slug: "salma",
    title: "Villa Salma",
    images: [
      "/images/villas/salma.jpg",
      "/images/villas/salma-interior-1.jpg",
      "/images/villas/salma-interior-2.jpg",
    ],
    terrain: "4 600 m²",
    surface: "560 m²",
    chambres: 5,
    pax: 10,
    description:
      "La Villa Salma est une résidence moderne aux lignes épurées, nichée dans un jardin paysager. Son design contemporain et ses équipements haut de gamme en font un lieu de choix.",
    nousAimons:
      "Nous aimons la grande baie vitrée du salon, la piscine à débordement, et les intérieurs design aux tons neutres.",
    avisSpecialiste:
      "Une villa très moderne avec des prestations de qualité. L'espace extérieur est particulièrement bien aménagé.",
    chambresLits:
      "5 chambres : 2 suites modernes, 2 doubles, 1 chambre avec lit king. Salle de bain design.",
    features: [
      "Piscine à débordement",
      "Jardin paysager",
      "Baie vitrée",
      "Design contemporain",
    ],
    equipment: [
      "Wi-Fi haut débit",
      "Piscine chauffée",
      "Climatisation",
      "Cuisine équipée",
      "TV écran plat",
      "Domotique",
      "BBQ",
      "Terrasse",
    ],
    servicesIncluded: [
      "Ménage quotidien",
      "Gardien",
      "Wi-Fi",
      "Linge de maison",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Masseur",
      "Location voiture",
    ],
  },
  ghita: {
    slug: "ghita",
    title: "Villa Ghita",
    images: [
      "/images/villas/ghita.jpg",
      "/images/villas/ghita-interior-1.jpg",
      "/images/villas/ghita-interior-2.jpg",
    ],
    terrain: "3 100 m²",
    surface: "390 m²",
    chambres: 4,
    pax: 8,
    description:
      "La Villa Ghita est une villa de charme au style marocain authentique. Ses intérieurs chaleureux et son jardin fleuri créent une atmosphère accueillante et relaxante.",
    nousAimons:
      "Nous aimons les portes sculptées en bois de cèdre, le jardin avec citronniers, et la terrasse avec vue sur la Palmeraie.",
    avisSpecialiste:
      "Une villa qui respire l'authenticité marocaine. Les détails artisanaux sont magnifiques et l'accueil est chaleureux.",
    chambresLits:
      "4 chambres : 1 suite parentale, 2 doubles, 1 chambre avec lits jumeaux. Portes en bois sculpté.",
    features: [
      "Piscine",
      "Jardin de citronniers",
      "Terrasse panoramique",
      "Artisanat marocain",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine",
      "Climatisation",
      "Cuisine équipée",
      "TV",
      "BBQ",
      "Terrasse",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Cours de cuisine marocaine",
      "Hammam",
    ],
  },
  noor: {
    slug: "noor",
    title: "Villa Noor",
    images: [
      "/images/villas/noor.jpg",
      "/images/villas/noor-interior-1.jpg",
      "/images/villas/noor-interior-2.jpg",
    ],
    terrain: "7 500 m²",
    surface: "900 m²",
    chambres: 7,
    pax: 16,
    description:
      "La Villa Noor est une grande villa de luxe au design spectaculaire. Ses espaces de vie immenses et ses prestations d'exception en font une propriété unique dans la Palmeraie.",
    nousAimons:
      "Nous aimons la piscine infinity avec vue sur les palmiers, le home cinéma, et la grande cuisine ouverte sur le salon.",
    avisSpecialiste:
      "Une villa d'exception avec des équipements rares. Le home cinéma et la salle de sport sont des vrais plus.",
    chambresLits:
      "7 chambres : 4 suites parentales, 2 doubles, 1 chambre enfants. Chaque suite a sa propre terrasse.",
    features: [
      "Piscine infinity",
      "Home cinéma",
      "Salle de sport",
      "Grande terrasse",
    ],
    equipment: [
      "Wi-Fi haut débit",
      "Cuisine professionnelle",
      "Piscine infinity",
      "Home cinéma",
      "Salle de sport",
      "Climatisation",
      "Domotique",
      "BBQ",
      "Parking 6 véhicules",
    ],
    servicesIncluded: [
      "Ménage quotidien",
      "Gardien 24h/24",
      "Wi-Fi",
      "Linge de maison",
      "Jardinier",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Personal trainer",
      "Location voiture luxe",
      "Organisation événements",
    ],
  },
  laila: {
    slug: "laila",
    title: "Villa Laila",
    images: [
      "/images/villas/laila.jpg",
      "/images/villas/laila-interior-1.jpg",
      "/images/villas/laila-interior-2.jpg",
    ],
    terrain: "4 400 m²",
    surface: "530 m²",
    chambres: 5,
    pax: 10,
    description:
      "La Villa Laila est une résidence élégante avec une vue imprenable sur la Palmeraie. Son architecture raffinée et ses espaces de vie lumineux créent une atmosphère de sérénité.",
    nousAimons:
      "Nous aimons la vue panoramique depuis la terrasse, la piscine bordée de rosiers, et les intérieurs au goût sûr.",
    avisSpecialiste:
      "Une villa très bien située avec une vue exceptionnelle. Les finitions sont soignées et l'ambiance y est magique.",
    chambresLits:
      "5 chambres : 2 suites avec vue, 2 doubles, 1 chambre junior. Mobilier de qualité supérieure.",
    features: [
      "Vue panoramique",
      "Piscine",
      "Terrasse",
      "Jardin de rosiers",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine chauffée",
      "Climatisation",
      "Cuisine équipée",
      "TV",
      "BBQ",
      "Terrasse",
      "Cheminée",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
      "Linge de maison",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Spa à domicile",
      "Excursion balloon",
    ],
  },
  hanane: {
    slug: "hanane",
    title: "Villa Hanane",
    images: [
      "/images/villas/hanane.jpg",
      "/images/villas/hanane-interior-1.jpg",
      "/images/villas/hanane-interior-2.jpg",
    ],
    terrain: "3 200 m²",
    surface: "400 m²",
    chambres: 4,
    pax: 8,
    description:
      "La Villa Hanane est une villa chaleureuse au design épuré, offrant un cadre de vie confortable et élégant. Son jardin paysager et sa piscine créent une ambiance de vacances parfaites.",
    nousAimons:
      "Nous aimons l'espace de vie ouvert sur le jardin, la terrasse couverte, et les chambres lumineuses et confortables.",
    avisSpecialiste:
      "Une villa bien pensée avec un excellent rapport qualité-prix. L'espace extérieur est particulièrement agréable.",
    chambresLits:
      "4 chambres : 1 suite parentale, 2 doubles, 1 chambre avec lits jumeaux. Salle de bain moderne.",
    features: [
      "Piscine",
      "Jardin paysager",
      "Terrasse couverte",
      "Espace de vie ouvert",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine",
      "Climatisation",
      "Cuisine équipée",
      "TV",
      "BBQ",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Transfert aéroport",
      "Location vélos",
    ],
  },
  samira: {
    slug: "samira",
    title: "Villa Samira",
    images: [
      "/images/villas/samira.jpg",
      "/images/villas/samira-interior-1.jpg",
      "/images/villas/samira-interior-2.jpg",
    ],
    terrain: "5 600 m²",
    surface: "700 m²",
    chambres: 6,
    pax: 12,
    description:
      "La Villa Samira est une propriété d'exception alliant luxe et confort dans un cadre naturel préservé. Son jardin botanique et ses espaces de vie somptueux en font un lieu unique.",
    nousAimons:
      "Nous aimons le jardin botanique avec ses essences rares, la grande piscine naturelle, et le hammam avec salle de massage.",
    avisSpecialiste:
      "Une villa rare avec un jardin exceptionnel. Les prestations sont haut de gamme et l'expérience y est inoubliable.",
    chambresLits:
      "6 chambres : 3 suites avec bain et terrasse, 2 doubles, 1 chambre communicante. Linge premium.",
    features: [
      "Piscine naturelle",
      "Jardin botanique",
      "Hammam",
      "Salle de massage",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine naturelle",
      "Hammam",
      "Climatisation",
      "Cuisine équipée",
      "TV",
      "BBQ",
      "Terrasse",
      "Cheminée",
    ],
    servicesIncluded: [
      "Ménage quotidien",
      "Gardien",
      "Wi-Fi",
      "Jardinier",
      "Linge de maison",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Masseur qualifié",
      "Excursion désert",
      "Guide botanique",
    ],
  },
  meriem: {
    slug: "meriem",
    title: "Villa Meriem",
    images: [
      "/images/villas/meriem.jpg",
      "/images/villas/meriem-interior-1.jpg",
      "/images/villas/meriem-interior-2.jpg",
    ],
    terrain: "2 300 m²",
    surface: "310 m²",
    chambres: 3,
    pax: 6,
    description:
      "La Villa Meriem est une villa cosy et bien située, parfaite pour un séjour romantique ou en petite compagnie. Son jardin fleuri et sa terrasse offrent un cadre idéal pour se ressourcer.",
    nousAimons:
      "Nous aimons l'intimité de cette villa, la terrasse avec vue sur le jardin, et la petite piscine bordée de fleurs.",
    avisSpecialiste:
      "Un petit bijou de villa, parfaite pour ceux qui recherchent le calme et le charme. L'accueil est toujours très chaleureux.",
    chambresLits:
      "3 chambres : 1 suite parentale, 2 doubles. Intérieurs chaleureux avec textiles artisanaux.",
    features: [
      "Piscine",
      "Jardin fleuri",
      "Terrasse",
      "Intimité",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine",
      "Climatisation",
      "Cuisine équipée",
      "TV",
      "Terrasse",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Spa à domicile",
    ],
  },
  zohra: {
    slug: "zohra",
    title: "Villa Zohra",
    images: [
      "/images/villas/zohra.jpg",
      "/images/villas/zohra-interior-1.jpg",
      "/images/villas/zohra-interior-2.jpg",
    ],
    terrain: "4 700 m²",
    surface: "570 m²",
    chambres: 5,
    pax: 10,
    description:
      "La Villa Zohra est une résidence de luxe au design sophistiqué, nichée dans un cadre verdoyant. Ses finitions soignées et ses équipements modernes en font un lieu de choix.",
    nousAimons:
      "Nous aimons la grande piscine avec éclairage nocturne, la cuisine ouverte sur le salon, et la terrasse avec pergola.",
    avisSpecialiste:
      "Une villa moderne et bien équipée. L'espace de vie principal est très convivial et lumineux.",
    chambresLits:
      "5 chambres : 2 suites modernes, 2 doubles, 1 chambre avec lit king. Salle de bain en marbre.",
    features: [
      "Piscine avec éclairage",
      "Cuisine ouverte",
      "Terrasse avec pergola",
      "Design moderne",
    ],
    equipment: [
      "Wi-Fi haut débit",
      "Piscine chauffée",
      "Climatisation",
      "Cuisine équipée professionnelle",
      "TV écran plat",
      "Système audio",
      "BBQ",
      "Parking privé",
    ],
    servicesIncluded: [
      "Ménage quotidien",
      "Gardien",
      "Wi-Fi",
      "Linge de maison",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Masseur",
      "Location voiture",
    ],
  },
  jamila: {
    slug: "jamila",
    title: "Villa Jamila",
    images: [
      "/images/villas/jamila.jpg",
      "/images/villas/jamila-interior-1.jpg",
      "/images/villas/jamila-interior-2.jpg",
    ],
    terrain: "3 500 m²",
    surface: "430 m²",
    chambres: 4,
    pax: 8,
    description:
      "La Villa Jamila est une villa de charme avec une décoration raffinée. Ses intérieurs élégants et son jardin méditerranéen offrent un cadre de vie harmonieux et confortable.",
    nousAimons:
      "Nous aimons les moulures sur les murs, la grande baie vitrée, et le jardin avec fontaine centrale.",
    avisSpecialiste:
      "Une villa avec beaucoup de caractère. La décoration est soignée et les prestations sont de qualité.",
    chambresLits:
      "4 chambres : 1 suite parentale, 2 doubles, 1 chambre avec lits jumeaux. Moulures et lambris.",
    features: [
      "Piscine",
      "Jardin méditerranéen",
      "Fontaine centrale",
      "Décoration raffinée",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine",
      "Climatisation",
      "Cuisine équipée",
      "TV",
      "BBQ",
      "Terrasse",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Cours de cuisine",
      "Excursion",
    ],
  },
  charifa: {
    slug: "charifa",
    title: "Villa Charifa",
    images: [
      "/images/villas/charifa.jpg",
      "/images/villas/charifa-interior-1.jpg",
      "/images/villas/charifa-interior-2.jpg",
    ],
    terrain: "6 800 m²",
    surface: "850 m²",
    chambres: 6,
    pax: 14,
    description:
      "La Villa Charifa est une grande villa de prestige avec une architecture imposante. Ses espaces de vie vastes et ses jardins étendus en font une propriété de premier choix.",
    nousAimons:
      "Nous aimons la grande salle de réception, la piscine avec espace lounge, et les chambres spacieuses avec vue sur les jardins.",
    avisSpecialiste:
      "Une villa majestueuse qui conviendra parfaitement aux grands groupes. Les espaces communs sont impressionnants.",
    chambresLits:
      "6 chambres : 3 suites parentales, 2 doubles, 1 chambre enfant. Chaque suite dispose d'un dressing.",
    features: [
      "Grande salle de réception",
      "Piscine avec lounge",
      "Jardins étendus",
      "Dressing par chambre",
    ],
    equipment: [
      "Wi-Fi haut débit",
      "Cuisine professionnelle",
      "Piscine",
      "Climatisation",
      "TV écran plat",
      "Système audio",
      "BBQ",
      "Parking 8 véhicules",
      "Générateur",
    ],
    servicesIncluded: [
      "Ménage quotidien",
      "Gardien 24h/24",
      "Wi-Fi",
      "Linge de maison",
      "Jardinier",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Traiteur",
      "Organisation événements",
      "Location matériel",
    ],
  },
  naima: {
    slug: "naima",
    title: "Villa Naima",
    images: [
      "/images/villas/naima.jpg",
      "/images/villas/naima-interior-1.jpg",
      "/images/villas/naima-interior-2.jpg",
    ],
    terrain: "2 400 m²",
    surface: "320 m²",
    chambres: 3,
    pax: 6,
    description:
      "La Villa Naima est une villa authentique et chaleureuse, idéale pour un séjour paisible. Son architecture traditionnelle et son jardin arboré créent une atmosphère sereine.",
    nousAimons:
      "Nous aimons le patio intérieur avec fontaine, les voûtes en tadelakt, et le jardin avec orangers.",
    avisSpecialiste:
      "Une villa qui transporte dans une autre époque. L'authenticité marocaine y est magnifiquement préservée.",
    chambresLits:
      "3 chambres : 1 suite parentale, 2 doubles. Voûtes en tadelakt et mobilier traditionnel.",
    features: [
      "Piscine",
      "Patio intérieur",
      "Voûtes en tadelakt",
      "Jardin d'orangers",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine",
      "Climatisation",
      "Cuisine équipée",
      "TV",
      "Terrasse",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Hammam",
      "Cours de poterie",
    ],
  },
  rachida: {
    slug: "rachida",
    title: "Villa Rachida",
    images: [
      "/images/villas/rachida.jpg",
      "/images/villas/rachida-interior-1.jpg",
      "/images/villas/rachida-interior-2.jpg",
    ],
    terrain: "4 500 m²",
    surface: "550 m²",
    chambres: 5,
    pax: 10,
    description:
      "La Villa Rachida est une résidence de luxe au design unique, combinant modernité et tradition. Ses espaces de vie généreux et son jardin paysager en font un lieu d'exception.",
    nousAimons:
      "Nous aimons la piscine bordée de végétation, le salon avec cheminée monumentale, et la terrasse sur le toit avec jacuzzi.",
    avisSpecialiste:
      "Une villa originale avec des prestations rares. Le jacuzzi sur le toit est un vrai plus pour les soirées étoilées.",
    chambresLits:
      "5 chambres : 2 suites avec bain, 2 doubles, 1 chambre avec lit queen. Cheminée dans la suite parentale.",
    features: [
      "Piscine",
      "Jacuzzi toit-terrasse",
      "Cheminée monumentale",
      "Jardin paysager",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine chauffée",
      "Jacuzzi",
      "Climatisation",
      "Cuisine équipée",
      "TV",
      "BBQ",
      "Terrasse",
      "Cheminée",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
      "Linge de maison",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Masseur",
      "Location voiture luxe",
    ],
  },
  khadija: {
    slug: "khadija",
    title: "Villa Khadija",
    images: [
      "/images/villas/khadija.jpg",
      "/images/villas/khadija-interior-1.jpg",
      "/images/villas/khadija-interior-2.jpg",
    ],
    terrain: "3 800 m²",
    surface: "460 m²",
    chambres: 4,
    pax: 8,
    description:
      "La Villa Khadija est une villa élégante et moderne, offrant un cadre de vie luxueux dans un environnement naturel préservé. Ses finitions soignées et ses équipements dernier cri en font un lieu de choix.",
    nousAimons:
      "Nous aimons la grande piscine à débordement, le jardin zen avec bassin, et les intérieurs au design épuré.",
    avisSpecialiste:
      "Une villa moderne et fonctionnelle avec des prestations haut de gamme. L'espace extérieur est magnifiquement aménagé.",
    chambresLits:
      "4 chambres : 1 suite parentale, 2 doubles, 1 chambre avec lits jumeaux. Salle de bain contemporaine.",
    features: [
      "Piscine à débordement",
      "Jardin zen",
      "Bassin ornemental",
      "Design épuré",
    ],
    equipment: [
      "Wi-Fi haut débit",
      "Piscine chauffée",
      "Climatisation",
      "Cuisine équipée professionnelle",
      "TV écran plat",
      "Domotique",
      "BBQ",
      "Parking privé",
    ],
    servicesIncluded: [
      "Ménage quotidien",
      "Gardien",
      "Wi-Fi",
      "Linge de maison",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Spa à domicile",
      "Location voiture",
    ],
  },
  meryem: {
    slug: "meryem",
    title: "Villa Meryem",
    images: [
      "/images/villas/meryem.jpg",
      "/images/villas/meryem-interior-1.jpg",
      "/images/villas/meryem-interior-2.jpg",
    ],
    terrain: "8 000 m²",
    surface: "950 m²",
    chambres: 7,
    pax: 16,
    description:
      "La Villa Meryem est une grande propriété de luxe dans la Palmeraie, offrant des espaces de vie somptueux et un jardin majestueux. Idéale pour les grands rassemblements familiaux.",
    nousAimons:
      "Nous aimons la grande piscine avec bord en pierre naturelle, les multiples terrasses, et la salle de jeux pour enfants.",
    avisSpecialiste:
      "Un domaine familial parfaitement aménagé. Les espaces communs sont vastes et les chambres très confortables.",
    chambresLits:
      "7 chambres : 4 suites parentales, 2 doubles, 1 chambre enfants. Terrasse commune au premier étage.",
    features: [
      "Grande piscine",
      "Multiple terrasses",
      "Salle de jeux",
      "Jardin majestueux",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine",
      "Climatisation",
      "Cuisine professionnelle",
      "TV",
      "BBQ",
      "Salle de jeux",
      "Parking",
    ],
    servicesIncluded: [
      "Ménage quotidien",
      "Gardien",
      "Wi-Fi",
      "Jardinier",
      "Linge de maison",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Garde d'enfants",
      "Organisation événements",
      "Guide touristique",
    ],
  },
  dounia: {
    slug: "dounia",
    title: "Villa Dounia",
    images: [
      "/images/villas/dounia.jpg",
      "/images/villas/dounia-interior-1.jpg",
      "/images/villas/dounia-interior-2.jpg",
    ],
    terrain: "4 200 m²",
    surface: "520 m²",
    chambres: 5,
    pax: 10,
    description:
      "La Villa Dounia est une résidence raffinée au cadre enchanteur. Son jardin méditerranéen et ses intérieurs élégants créent une atmosphère de paix et de sérénité.",
    nousAimons:
      "Nous aimons la fontaine du jardin, la terrasse avec pergola et glycine, et les chambres baignées de lumière.",
    avisSpecialiste:
      "Une villa avec beaucoup de charme. L'ambiance y est très agréable et les prestations sont de qualité.",
    chambresLits:
      "5 chambres : 2 suites avec bain, 2 doubles, 1 chambre junior. Textiles et déco soignés.",
    features: [
      "Piscine",
      "Jardin méditerranéen",
      "Fontaine",
      "Pergola",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine",
      "Climatisation",
      "Cuisine équipée",
      "TV",
      "BBQ",
      "Terrasse",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
      "Linge de maison",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Cours de yoga",
      "Excursion",
    ],
  },
  "loubna-grande": {
    slug: "loubna-grande",
    title: "Villa Loubna Grande",
    images: [
      "/images/villas/loubna.jpg",
      "/images/villas/loubna-interior-1.jpg",
      "/images/villas/loubna-interior-2.jpg",
    ],
    terrain: "10 500 m²",
    surface: "1 100 m²",
    chambres: 8,
    pax: 20,
    description:
      "La Villa Loubna Grande est une extension prestigieuse de la Villa Loubna, offrant des espaces de vie encore plus généreux. Idéale pour les grands groupes, elle dispose de tout le confort nécessaire.",
    nousAimons:
      "Nous aimons les deux piscines, le grand jardin avec espace sport, et les multiples salons intérieurs et extérieurs.",
    avisSpecialiste:
      "Un domaine complet pour les grands groupes. L'espace extérieur est exceptionnel et parfaitement aménagé.",
    chambresLits:
      "8 chambres : 4 suites parentales, 3 doubles, 1 chambre enfants. Deux salons communs.",
    features: [
      "Double piscine",
      "Grand jardin",
      "Espace sport",
      "Multiples salons",
    ],
    equipment: [
      "Wi-Fi haut débit",
      "Cuisine professionnelle",
      "2 piscines",
      "Climatisation",
      "Générateur",
      "TV",
      "BBQ",
      "Parking 8 véhicules",
      "Terrain de pétanque",
    ],
    servicesIncluded: [
      "Équipe de ménage",
      "Gardien 24h/24",
      "Wi-Fi",
      "Jardinier",
      "Linge de maison",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Organisation événements",
      "Location matériel",
      "Guide touristique",
    ],
  },
  aicha: {
    slug: "aicha",
    title: "Villa Aicha",
    images: [
      "/images/villas/aicha.jpg",
      "/images/villas/aicha-interior-1.jpg",
      "/images/villas/aicha-interior-2.jpg",
    ],
    terrain: "3 300 m²",
    surface: "410 m²",
    chambres: 4,
    pax: 8,
    description:
      "La Villa Aicha est une villa moderne et accueillante, nichée dans un cadre verdoyant. Son design soigné et ses espaces de vie confortables en font un lieu idéal pour des vacances réussies.",
    nousAimons:
      "Nous aimons la grande terrasse couverte, la piscine avec espace détente, et les intérieurs chaleureux et lumineux.",
    avisSpecialiste:
      "Une villa très bien entretenue avec de bonnes prestations. L'emplacement est idéal pour explorer la région.",
    chambresLits:
      "4 chambres : 1 suite parentale, 2 doubles, 1 chambre avec lits jumeaux. Mobilier moderne.",
    features: [
      "Piscine",
      "Terrasse couverte",
      "Espace détente",
      "Jardin verdoyant",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine",
      "Climatisation",
      "Cuisine équipée",
      "TV",
      "BBQ",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Transfert aéroport",
      "Location vélos",
    ],
  },
  fatiha: {
    slug: "fatiha",
    title: "Villa Fatiha",
    images: [
      "/images/villas/fatiha.jpg",
      "/images/villas/fatiha-interior-1.jpg",
      "/images/villas/fatiha-interior-2.jpg",
    ],
    terrain: "5 900 m²",
    surface: "730 m²",
    chambres: 6,
    pax: 12,
    description:
      "La Villa Fatiha est une propriété de luxe au charme incomparable. Son architecture unique et ses finitions artisanales en font une villa d'exception dans la Palmeraie.",
    nousAimons:
      "Nous aimons le patio avec fontaine en zellige, la grande piscine bordée de palmiers, et les plafonds en bois de cèdre.",
    avisSpecialiste:
      "Une villa qui sublime l'artisanat marocain. Les détails sont magnifiques et l'authenticité y est préservée.",
    chambresLits:
      "6 chambres : 3 suites avec bain, 2 doubles, 1 chambre communicante. Plafonds en bois de cèdre sculpté.",
    features: [
      "Piscine",
      "Patio en zellige",
      "Plafonds en cèdre",
      "Artisanat marocain",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine",
      "Climatisation",
      "Cuisine équipée",
      "TV",
      "BBQ",
      "Cheminée",
      "Terrasse",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
      "Jardinier",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Hammam à domicile",
      "Cours d'artisanat",
      "Excursion",
    ],
  },
  "nadia-grande": {
    slug: "nadia-grande",
    title: "Villa Nadia Grande",
    images: [
      "/images/villas/nadia.jpg",
      "/images/villas/nadia-interior-1.jpg",
      "/images/villas/nadia-interior-2.jpg",
    ],
    terrain: "11 500 m²",
    surface: "1 350 m²",
    chambres: 9,
    pax: 22,
    description:
      "La Villa Nadia Grande est un domaine familial complet avec tous les équipements pour un séjour de luxe. Ses vastes jardins et ses nombreux espaces de vie en font un lieu d'exception.",
    nousAimons:
      "Nous aimons la grande piscine avec jacuzzi, le terrain de tennis, et les multiples terrasses pour la détente.",
    avisSpecialiste:
      "Un domaine rarement disponible. Les équipements sportifs et de détente sont un vrai plus pour les grands groupes.",
    chambresLits:
      "9 chambres réparties dans le bâtiment principal et les dépendances. 5 suites, 3 doubles, 1 appartement.",
    features: [
      "Grande piscine + jacuzzi",
      "Terrain de tennis",
      "Multiple terrasses",
      "Domaine privé",
    ],
    equipment: [
      "Wi-Fi haut débit",
      "Cuisine professionnelle",
      "Piscine + jacuzzi",
      "Terrain de tennis",
      "Climatisation",
      "Générateur",
      "Salle de sport",
      "Parking 10 véhicules",
    ],
    servicesIncluded: [
      "Équipe complète",
      "Ménage permanent",
      "Sécurité 24h/24",
      "Wi-Fi",
      "Jardinier",
      "Linge de maison",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Instructeur tennis",
      "Organisation événements",
      "Location matériel sportif",
    ],
  },
  "zineb-luxe": {
    slug: "zineb-luxe",
    title: "Villa Zineb Luxe",
    images: [
      "/images/villas/zineb.jpg",
      "/images/villas/zineb-interior-1.jpg",
      "/images/villas/zineb-interior-2.jpg",
    ],
    terrain: "7 200 m²",
    surface: "880 m²",
    chambres: 7,
    pax: 16,
    description:
      "La Villa Zineb Luxe est la version premium de la Villa Zineb, avec des prestations encore plus haut de gamme. Son design spectaculaire et ses équipements d'exception en font une propriété unique.",
    nousAimons:
      "Nous aimons la piscine infinity avec vue panoramique, le home cinéma, et la suite parentale avec dressing et bain à remous.",
    avisSpecialiste:
      "Une villa d'exception pour les plus exigeants. Les prestations sont au niveau des plus grands hôtels de luxe.",
    chambresLits:
      "7 chambres : 4 suites luxueuses, 2 doubles, 1 chambre junior. Suite parentale avec bain à remous et dressing.",
    features: [
      "Piscine infinity",
      "Home cinéma",
      "Bain à remous",
      "Dressing",
    ],
    equipment: [
      "Wi-Fi haut débit",
      "Cuisine professionnelle",
      "Piscine infinity",
      "Home cinéma",
      "Bain à remous",
      "Climatisation",
      "Domotique",
      "Système audio premium",
      "Parking 6 véhicules",
    ],
    servicesIncluded: [
      "Ménage quotidien",
      "Gardien 24h/24",
      "Wi-Fi",
      "Concierge",
      "Linge de maison",
      "Jardinier",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Butler personnel",
      "Location voiture luxe",
      "Organisation événements",
      "Masseur à domicile",
    ],
  },
  amira: {
    slug: "amira",
    title: "Villa Amira",
    images: [
      "/images/villas/amira.jpg",
      "/images/villas/amira-interior-1.jpg",
      "/images/villas/amira-interior-2.jpg",
    ],
    terrain: "4 300 m²",
    surface: "540 m²",
    chambres: 5,
    pax: 10,
    description:
      "La Villa Amira est une résidence élégante au design raffiné, offrant un cadre de vie luxueux et confortable. Son jardin paysager et sa piscine créent une ambiance de rêve.",
    nousAimons:
      "Nous aimons la grande baie vitrée du salon, la terrasse avec vue sur le jardin, et les chambres spacieuses et lumineuses.",
    avisSpecialiste:
      "Une villa moderne et bien équipée avec des finitions de qualité. L'espace extérieur est particulièrement réussi.",
    chambresLits:
      "5 chambres : 2 suites parentales, 2 doubles, 1 chambre avec lit king. Salle de bain en marbre.",
    features: [
      "Piscine",
      "Jardin paysager",
      "Grande baie vitrée",
      "Terrasse panoramique",
    ],
    equipment: [
      "Wi-Fi haut débit",
      "Piscine chauffée",
      "Climatisation",
      "Cuisine équipée",
      "TV écran plat",
      "Système audio",
      "BBQ",
      "Parking privé",
    ],
    servicesIncluded: [
      "Ménage quotidien",
      "Gardien",
      "Wi-Fi",
      "Linge de maison",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Masseur",
      "Location voiture",
    ],
  },
  hajar: {
    slug: "hajar",
    title: "Villa Hajar",
    images: [
      "/images/villas/hajar.jpg",
      "/images/villas/hajar-interior-1.jpg",
      "/images/villas/hajar-interior-2.jpg",
    ],
    terrain: "3 600 m²",
    surface: "440 m²",
    chambres: 4,
    pax: 8,
    description:
      "La Villa Hajar est une villa de charme au design authentique, nichée dans un cadre verdoyant. Ses intérieurs chaleureux et son jardin fleuri offrent un havre de paix.",
    nousAimons:
      "Nous aimons le jardin avec bassin et nénuphars, la terrasse ombragée, et les détails artisanaux marocains.",
    avisSpecialiste:
      "Une villa authentique et bien entretenue. L'ambiance y est très chaleureuse et les prestations sont correctes.",
    chambresLits:
      "4 chambres : 1 suite parentale, 2 doubles, 1 chambre avec lits jumeaux. Décoration artisanale.",
    features: [
      "Piscine",
      "Jardin avec bassin",
      "Terrasse ombragée",
      "Artisanat marocain",
    ],
    equipment: [
      "Wi-Fi",
      "Piscine",
      "Climatisation",
      "Cuisine équipée",
      "TV",
      "BBQ",
      "Terrasse",
    ],
    servicesIncluded: [
      "Ménage",
      "Gardien",
      "Wi-Fi",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Hammam à domicile",
      "Excursion",
    ],
  },
  rajae: {
    slug: "rajae",
    title: "Villa Rajae",
    images: [
      "/images/villas/rajae.jpg",
      "/images/villas/rajae-interior-1.jpg",
      "/images/villas/rajae-interior-2.jpg",
    ],
    terrain: "6 500 m²",
    surface: "820 m²",
    chambres: 6,
    pax: 14,
    description:
      "La Villa Rajae est une propriété de prestige offrant des espaces de vie somptueux et des prestations d'exception. Son jardin majestueux et sa piscine créent un environnement de luxe absolu.",
    nousAimons:
      "Nous aimons la grande piscine avec éclairage LED, le salon avec double hauteur, et la vue imprenable sur la Palmeraie.",
    avisSpecialiste:
      "Une villa impressionnante par sa taille et la qualité de ses finitions. Les espaces de vie sont très bien pensés.",
    chambresLits:
      "6 chambres : 3 suites parentales avec terrasse, 2 doubles, 1 chambre junior. Salon à double hauteur.",
    features: [
      "Grande piscine LED",
      "Salon double hauteur",
      "Vue Palmeraie",
      "Jardin majestueux",
    ],
    equipment: [
      "Wi-Fi haut débit",
      "Cuisine professionnelle",
      "Piscine chauffée",
      "Climatisation",
      "TV écran plat 75\"",
      "Domotique",
      "Système audio",
      "BBQ",
      "Parking couvert",
      "Générateur",
    ],
    servicesIncluded: [
      "Ménage quotidien",
      "Gardien 24h/24",
      "Wi-Fi",
      "Concierge",
      "Linge de maison",
      "Jardinier",
    ],
    servicesExtra: [
      "Chef à domicile",
      "Butler",
      "Location voiture luxe",
      "Organisation événements",
      "Masseur à domicile",
    ],
  },
};

const allVillas = Object.values(villasData);

export default function VillaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const villa = villasData[slug];

  if (!villa) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-[#0d47a1] mb-4">Villa introuvable</h1>
            <p className="text-[#34495e]">La villa que vous recherchez n&apos;existe pas.</p>
            <Link href="/" className="inline-block mt-6 bg-[#0d47a1] text-white px-6 py-3 rounded hover:bg-[#0a3a82] transition-colors">
              Retour à l&apos;accueil
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const similarVillas = allVillas.filter((v) => v.slug !== slug).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <VillaDetail villa={villa} />
        <SimilarVillas villas={similarVillas} />
      </main>
      <Footer />
    </div>
  );
}
