// src/lib/features.ts

export interface FeatureInfo {
  label: string;
  category: FeatureCategory;
}

export type FeatureCategory =
  | "Extérieur"
  | "Bien-être"
  | "Divertissement"
  | "Confort"
  | "Sécurité & Accès"
  | "Connectivité"
  | "Enfants"
  | "Services";

export const FEATURES: Record<string, FeatureInfo> = {
  // Extérieur
  pool: { label: "Piscine", category: "Extérieur" },
  heated_pool: { label: "Piscine chauffée", category: "Extérieur" },
  infinity_pool: { label: "Piscine à débordement", category: "Extérieur" },
  garden: { label: "Jardin", category: "Extérieur" },
  terrace: { label: "Terrasse", category: "Extérieur" },
  balcony: { label: "Balcon", category: "Extérieur" },
  rooftop: { label: "Toiture-terrasse", category: "Extérieur" },
  bbq: { label: "BBQ", category: "Extérieur" },
  outdoor_kitchen: { label: "Cuisine extérieure", category: "Extérieur" },
  sun_loungers: { label: "Transats", category: "Extérieur" },
  hammock: { label: "Hamac", category: "Extérieur" },
  // Bien-être
  hammam: { label: "Hammam", category: "Bien-être" },
  jacuzzi: { label: "Jacuzzi", category: "Bien-être" },
  sauna: { label: "Sauna", category: "Bien-être" },
  spa: { label: "Spa", category: "Bien-être" },
  gym: { label: "Salle de sport", category: "Bien-être" },
  yoga_room: { label: "Salle de yoga", category: "Bien-être" },
  massage_room: { label: "Salle de massage", category: "Bien-être" },
  // Divertissement
  cinema: { label: "Cinéma", category: "Divertissement" },
  game_room: { label: "Salle de jeux", category: "Divertissement" },
  billiards: { label: "Billard", category: "Divertissement" },
  foosball: { label: "Baby-foot", category: "Divertissement" },
  sound_system: { label: "Sono", category: "Divertissement" },
  smart_tv: { label: "Smart TV", category: "Divertissement" },
  streaming: { label: "Streaming", category: "Divertissement" },
  // Confort
  ac: { label: "Climatisation", category: "Confort" },
  heating: { label: "Chauffage", category: "Confort" },
  fireplace: { label: "Cheminée", category: "Confort" },
  washer: { label: "Lave-linge", category: "Confort" },
  dryer: { label: "Sèche-linge", category: "Confort" },
  iron: { label: "Fer à repasser", category: "Confort" },
  hair_dryer: { label: "Sèche-cheveux", category: "Confort" },
  kitchen: { label: "Cuisine", category: "Confort" },
  full_kitchen: { label: "Cuisine équipée", category: "Confort" },
  dishwasher: { label: "Lave-vaisselle", category: "Confort" },
  microwave: { label: "Micro-ondes", category: "Confort" },
  espresso_machine: { label: "Machine à café", category: "Confort" },
  wine_cellar: { label: "Cave à vin", category: "Confort" },
  // Sécurité & Accès
  security: { label: "Sécurité", category: "Sécurité & Accès" },
  alarm: { label: "Alarme", category: "Sécurité & Accès" },
  cctv: { label: "Vidéosurveillance", category: "Sécurité & Accès" },
  gated: { label: "Clôturé", category: "Sécurité & Accès" },
  guard: { label: "Gardien", category: "Sécurité & Accès" },
  parking: { label: "Parking", category: "Sécurité & Accès" },
  garage: { label: "Garage", category: "Sécurité & Accès" },
  ev_charger: { label: "Bornes de recharge", category: "Sécurité & Accès" },
  elevator: { label: "Ascenseur", category: "Sécurité & Accès" },
  wheelchair: { label: "Accès PMR", category: "Sécurité & Accès" },
  // Connectivité
  wifi: { label: "WiFi", category: "Connectivité" },
  workspace: { label: "Espace de travail", category: "Connectivité" },
  office: { label: "Bureau", category: "Connectivité" },
  // Enfants
  baby_crib: { label: "Berceau", category: "Enfants" },
  high_chair: { label: "Chaise haute", category: "Enfants" },
  kids_playground: { label: "Aire de jeux", category: "Enfants" },
  pool_toys: { label: "Jouets piscine", category: "Enfants" },
  // Services
  concierge: { label: "Conciergerie", category: "Services" },
  chef: { label: "Chef", category: "Services" },
  housekeeping: { label: "Ménage", category: "Services" },
  butler: { label: "Majordome", category: "Services" },
  driver: { label: "Chauffeur", category: "Services" },
  babysitter: { label: "Baby-sitter", category: "Services" },
};

export type FeatureKey = keyof typeof FEATURES;

export const FEATURE_KEYS = Object.keys(FEATURES) as FeatureKey[];

export const FEATURE_CATEGORIES: FeatureCategory[] = [
  "Extérieur",
  "Bien-être",
  "Divertissement",
  "Confort",
  "Sécurité & Accès",
  "Connectivité",
  "Enfants",
  "Services",
];

export function getFeaturesByCategory(): Record<FeatureCategory, { key: string; label: string }[]> {
  const result: Record<FeatureCategory, { key: string; label: string }[]> = {} as any;
  for (const cat of FEATURE_CATEGORIES) {
    result[cat] = [];
  }
  for (const [key, info] of Object.entries(FEATURES)) {
    result[info.category].push({ key, label: info.label });
  }
  return result;
}

export function getFeatureLabel(key: string): string {
  return FEATURES[key]?.label ?? key;
}
