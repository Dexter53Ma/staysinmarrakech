# i18n English Translation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add English language support to StaysInMarrakech using `next-intl` with `/[locale]/...` URL prefix routing.

**Architecture:** Move all pages under `src/app/[locale]/...`, create `next-intl` config with `fr` (default) and `en` locales, extract ~800+ hardcoded French strings into JSON translation files, and replace them with `t()` calls. DB models get `_en` columns for dynamic content.

**Tech Stack:** `next-intl`, Next.js App Router, Prisma, `date-fns/locale`

## Global Constraints

- Default locale: `fr` (no redirect — `/` and `/fr/` both serve French)
- Admin pages (`/admin/...`) stay outside `[locale]` — French only
- URL paths stay the same in both languages (translated UI, same routes)
- DB schema changes are additive only (new `_en` columns, no renames)
- Preserve brand name "StaysInMarrakech" in both languages
- Keep French proper nouns (Marrakech, Palmeraie, etc.) unchanged

---

## Task 1: Install next-intl and create i18n config

**Files:**
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/request.ts`
- Create: `src/i18n/middleware.ts`
- Create: `src/i18n/navigation.ts`
- Modify: `next.config.ts`

**Interfaces:**
- Produces: `routing.locales`, `routing.defaultLocale`, `getRequestConfig`, `createNavigation` helpers

- [ ] **Step 1: Install next-intl**

Run: `npm install next-intl`

- [ ] **Step 2: Create `src/i18n/routing.ts`**

```typescript
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr'
});
```

- [ ] **Step 3: Create `src/i18n/request.ts`**

```typescript
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
```

- [ ] **Step 4: Create `src/i18n/middleware.ts`**

```typescript
import createMiddleware from 'next-intl/middleware';
import {routing} from './routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(fr|en)/:path*']
};
```

- [ ] **Step 5: Create `src/i18n/navigation.ts`**

```typescript
import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
```

- [ ] **Step 6: Update `next.config.ts`**

```typescript
import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {key: 'X-Frame-Options', value: 'DENY'},
        {key: 'X-Content-Type-Options', value: 'nosniff'},
        {key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin'},
        {key: 'X-XSS-Protection', value: '1; mode=block'},
        {key: 'X-Powered-By', value: ''},
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
        {
          key: 'Content-Security-Policy',
          value:
            "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https://*.supabase.co; frame-src https://www.google.com https://maps.google.com; frame-ancestors 'none';",
        },
      ],
    },
  ],
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 7: Verify build compiles**

Run: `npx next build 2>&1 | head -20`
Expected: Build starts without config errors (will fail on missing messages file, that's OK)

- [ ] **Step 8: Commit**

```bash
git add src/i18n/ next.config.ts package.json package-lock.json
git commit -m "feat(i18n): install next-intl and create i18n config files"
```

---

## Task 2: Create translation message files

**Files:**
- Create: `messages/fr.json`
- Create: `messages/en.json`

**Interfaces:**
- Consumes: None
- Produces: Translation namespaces `common`, `navigation`, `homepage`, `properties`, `services`, `contact`, `legal`, `seo`, `features`, `faqs`, `validation`, `dates`

- [ ] **Step 1: Create `messages/fr.json` with all French strings**

```json
{
  "common": {
    "back": "Retour",
    "loading": "Chargement...",
    "error": "Une erreur est survenue",
    "errorRetry": "Veuillez réessayer",
    "retry": "Réessayer",
    "notFound": "Page non trouvée",
    "notFoundDesc": "La page que vous recherchez n'est pas disponible ou a été déplacée.",
    "home": "Retour à l'accueil",
    "skipToContent": "Aller au contenu principal",
    "close": "Fermer",
    "confirm": "Confirmer",
    "cancel": "Annuler",
    "save": "Enregistrer",
    "delete": "Supprimer",
    "edit": "Modifier",
    "viewAll": "Voir tout",
    "seeDetails": "Voir détails",
    "currency": "Devise",
    "language": "Langue"
  },
  "navigation": {
    "location": "Location",
    "vente": "Vente",
    "villaLuxe": "Villa de Luxe",
    "villaException": "Villa d'Exception",
    "agence": "L'agence",
    "temoignages": "Témoignages",
    "blog": "Blog",
    "contact": "Contact",
    "selection": "Sélection",
    "services": "Services",
    "allServices": "Voir tous les services",
    "book": "Réserver",
    "bookNow": "Réserver maintenant"
  },
  "homepage": {
    "heroTitle": "Marrakech, Maroc",
    "heroSubtitle": "Location de villas de luxe à Marrakech",
    "heroConcierge": "Service de conciergerie dédié pour un séjour inoubliable",
    "typeLabel": "Type",
    "typeAll": "Tous",
    "typeApartment": "Appartement",
    "locationLabel": "Location",
    "saleLabel": "Vente",
    "arrivalLabel": "Arrivée",
    "departureLabel": "Départ",
    "whenLabel": "Quand?",
    "guestsLabel": "Voyageurs",
    "confirmLabel": "Confirmer",
    "searchLabel": "Rechercher",
    "chooseLabel": "Choisir",
    "discoverTitle": "Découvrez notre sélection de villas de luxe à Marrakech",
    "discoverSubtitle": "Une sélection des meilleures villas pour un séjour d'exception",
    "terrain": "Terrain",
    "surface": "Surface",
    "bedrooms": "Chambres",
    "pax": "Pax",
    "new": "Nouveauté",
    "fromPrice": "A partir de",
    "perNight": "€/nuit",
    "prev": "Précédent",
    "next": "Suivant",
    "removeSelection": "Retirer de la sélection",
    "addSelection": "Ajouter à la sélection",
    "experienceLabel": "Expérience",
    "clientsLabel": "Base clients",
    "qualityLabel": "Qualité villas",
    "servicesLabel": "Services intégrés",
    "presenceLabel": "Présence sur place",
    "discoverMarrakech": "Découvrez Marrakech",
    "seeMore": "Voir plus",
    "shortTermRental": "Courte durée",
    "contactUs": "Contactez-nous",
    "vacationVillas": "Location villas Marrakech",
    "vacationSubtitle": "Réservez une villa de luxe pour vos vacances à Marrakech",
    "eventsTitle": "Événements",
    "vacationsTitle": "Vacances",
    "activitiesTitle": "Activités Marrakech à découvrir",
    "newsletterTitle": "Restez informé",
    "newsletterSubtitle": "Rejoignez notre newsletter pour recevoir nos offres exclusives",
    "emailPlaceholder": "Votre adresse email",
    "subscribe": "S'abonner",
    "subscribeSuccess": "Inscription réussie!",
    "subscribeError": "Erreur lors de l'inscription",
    "subscribeNetworkError": "Erreur réseau. Veuillez réessayer.",
    "blogTitle": "Derniers articles du blog",
    "blogSubtitle": "Découvrez nos actualités et conseils pour votre séjour à Marrakech",
    "noImage": "Pas d'image",
    "seeAllArticles": "Voir tous les articles",
    "testimonialsTitle": "Avis clients",
    "testimonialsSubtitle": "Témoignages de nos clients",
    "testimonialsDesc": "Ce que nos clients disent de leur expérience avec StaysInMarrakech",
    "callUs": "Appelez-nous",
    "backToTop": "Retour en haut"
  },
  "properties": {
    "title": "Nos propriétés",
    "subtitle": "Découvrez notre sélection de villas et propriétés de luxe à Marrakech",
    "noResults": "Aucune propriété trouvée",
    "noResultsDesc": "Essayez de modifier vos filtres",
    "resultsCount": "propriétés trouvées",
    "bedrooms": "chambres",
    "bathrooms": "sdb",
    "perNight": "/nuit",
    "noImage": "Aucune image",
    "filters": "Filtres",
    "all": "Tous",
    "villa": "Villa",
    "riad": "Riad",
    "apartment": "Appartement",
    "house": "Maison",
    "land": "Terrain",
    "commercial": "Commercial",
    "sortRecent": "Plus récent",
    "sortPriceAsc": "Prix croissant",
    "sortPriceDesc": "Prix décroissant",
    "sortViews": "Plus vues",
    "forRent": "Location",
    "forSale": "Vente",
    "budget": "Budget",
    "bedroomsMin": "Chambres (min)",
    "allBedrooms": "Toutes",
    "quarter": "Quartier",
    "amenities": "Équipements",
    "sortBy": "Trier par",
    "reset": "Réinitialiser",
    "apply": "Appliquer",
    "openFilters": "Ouvrir les filtres",
    "featured": "Vedette",
    "guests": "pers.",
    "back": "Retour",
    "views": "vues",
    "description": "Description",
    "amenitiesTitle": "Équipements",
    "salePrice": "Prix de vente",
    "contact": "Contacter",
    "nights": "nuit(s)",
    "total": "Total",
    "selectDates": "Sélectionnez vos dates",
    "bookingBtn": "Réserver",
    "editDates": "Modifier/Choisir les dates",
    "guestsLabel": "Voyageurs",
    "fullName": "Nom complet",
    "email": "Email",
    "phone": "Téléphone (optionnel)",
    "message": "Message (optionnel)",
    "sendSuccess": "Demande envoyée avec succès!",
    "sendError": "Erreur lors de l'envoi",
    "selectDatesError": "Veuillez sélectionner vos dates",
    "cleaningFee": "Frais de ménage",
    "serviceFee": "Frais de service",
    "continue": "Continuer",
    "verify": "Vérifier",
    "confirmRequest": "Confirmer la demande",
    "sending": "Envoi...",
    "dates": "Dates",
    "info": "Infos",
    "confirm": "Confirm.",
    "bedroomsFeature": "Chambres",
    "bathroomsFeature": "Salles de bain",
    "garages": "Garages",
    "maxGuests": "Max. voyageurs",
    "plotArea": "Terrain",
    "builtArea": "Surface construite",
    "yearBuilt": "Année construction",
    "minStay": "Min. séjour",
    "featuresTitle": "Caractéristiques",
    "nightsUnit": "nuits",
    "reviews": "Avis",
    "similarTitle": "Propriétés similaires",
    "bedroomsAbbrev": "ch.",
    "bathroomsAbbrev": "sdb",
    "availability": "Disponibilité",
    "liveCalendar": "Calendrier en temps réel",
    "daysReserved": "jour(s) réservé(s)",
    "available": "Disponible",
    "reserved": "Réservé",
    "today": "Aujourd'hui",
    "legend": "Légende",
    "daysThisMonth": "jours ce mois",
    "daysBlocked": "jours bloqués"
  },
  "services": {
    "title": "Nos Services & Activités",
    "subtitle": "Découvrez notre sélection de services et activités à Marrakech",
    "specificRequest": "Une demande spécifique?",
    "contactUs": "Contactez-nous",
    "whatsIncluded": "Ce qui est inclus",
    "interested": "Intéressé par ce service?",
    "requestQuote": "Demandez un devis",
    "callUs": "Appelez-nous",
    "summary": "Résumé",
    "otherServices": "Autres services",
    "location": "Marrakech, Maroc",
    "notFound": "Service introuvable",
    "serviceInMarrakech": "Service à Marrakech",
    "highPoints": "Points forts",
    "whatWeOffer": "Ce que nous offrons",
    "whyChoose": "Pourquoi choisir StaysInMarrakech",
    "similarArticles": "Articles similaires",
    "bookActivity": "Réserver cette activité",
    "similarActivities": "Activités similaires",
    "newService": "Nouveau service",
    "editService": "Modifier le service",
    "titleLabel": "Titre",
    "shortDesc": "Description courte",
    "fullContent": "Contenu complet",
    "metaDesc": "Meta description",
    "featuresLabel": "Features / Inclus",
    "imageUrl": "URL de l'image",
    "category": "Catégorie",
    "priceLabel": "Prix",
    "priceUnit": "Unite de prix",
    "saving": "Enregistrement...",
    "update": "Mettre à jour",
    "create": "Créer",
    "cancel": "Annuler",
    "error": "Erreur",
    "networkError": "Erreur réseau"
  },
  "contact": {
    "title": "Contactez-nous",
    "responseTime": "Nous répondons sous 2 heures",
    "formTitle": "Envoyez-nous un message",
    "successMessage": "Merci! Votre message a été envoyé avec succès.",
    "name": "Nom",
    "email": "Email",
    "phone": "Téléphone",
    "subject": "Sujet",
    "chooseSubject": "Choisir un sujet",
    "subjectBooking": "Réservation de villa",
    "subjectAvailability": "Vérifier la disponibilité",
    "subjectQuote": "Demande de devis",
    "subjectEvent": "Organisation d'événement",
    "subjectConcierge": "Services de conciergerie",
    "subjectOther": "Autre demande",
    "message": "Message",
    "sending": "Envoi en cours...",
    "send": "Envoyer",
    "address": "Adresse",
    "telephone": "Téléphone",
    "emailLabel": "Email",
    "hours": "Horaires",
    "followUs": "Suivez-nous",
    "sendError": "Erreur lors de l'envoi",
    "sendErrorMsg": "Une erreur est survenue. Veuillez réessayer."
  },
  "legal": {
    "mentionsLegales": "Mentions légales",
    "privacyPolicy": "Politique de confidentialité"
  },
  "seo": {
    "homepageTitle": "Location et vente de villas de luxe à Marrakech",
    "homepageDesc": "StaysInMarrakech est une société spécialisée dans la location de villas de luxe et de prestige à Marrakech. Découvrez nos villas avec piscine privée, locations pour vacances, mariages et événements.",
    "propertiesTitle": "Propriétés à Marrakech",
    "propertiesDesc": "Découvrez notre sélection de villas et propriétés de luxe à Marrakech pour la location et la vente.",
    "villaLocationTitle": "Location de villa à Marrakech",
    "servicesTitle": "Nos Services & Activités à Marrakech",
    "blogTitle": "Blog -- Évasion",
    "testimonialsTitle": "Témoignages des clients",
    "contactTitle": "Contactez-nous - StaysInMarrakech",
    "agencyTitle": "L'agence - StaysInMarrakech"
  },
  "features": {
    "pool": "Piscine",
    "privatePool": "Piscine privée",
    "heatedPool": "Piscine chauffée",
    "indoorPool": "Piscine intérieure",
    "garden": "Jardin",
    "terrace": "Terrasse",
    "balcon": "Balcon",
    "rooftop": "Toiture terrasse",
    "parking": "Parking",
    "garage": "Garage",
    "aircon": "Climatisation",
    "heating": "Chauffage",
    "wifi": "Wi-Fi",
    "tv": "Télévision",
    "washer": "Lave-linge",
    "dryer": "Sèche-linge",
    "dishwasher": "Lave-vaisselle",
    "oven": "Four",
    "microwave": "Micro-ondes",
    "coffee": "Machine à café",
    "bbq": "Barbecue",
    "outdoorKitchen": "Cuisine extérieure",
    "hammam": "Hammam",
    "sauna": "Sauna",
    "gym": "Salle de sport",
    "spa": "Spa",
    "massage": "Massage",
    "cinema": "Salle de cinéma",
    "billiards": "Billard",
    "tableTennis": "Ping-pong",
    "football": "Terrain de football",
    "tennis": "Tennis",
    "security": "Sécurité",
    "alarm": "Alarme",
    "camera": "Caméras",
    "guard": "Gardien",
    "concierge": "Conciergerie",
    "housekeeper": "Femme de ménage",
    "chef": "Chef privé",
    "driver": "Chauffeur",
    "babyEquipment": "Équipement bébé",
    "accessible": "Accessible PMR",
    "fireplace": "Cheminée",
    "library": "Bibliothèque",
    "office": "Bureau",
    "laundry": "Buanderie",
    "storage": "Rangement",
    "view": "Vue",
    "mountainView": "Vue montagne",
    "gardenView": "Vue jardin",
    "cityView": "Vue ville",
    "golf": "Golf",
    "beach": "Plage",
    "mountains": "Montagnes",
    "historicalCenter": "Centre historique",
    "medina": "Médina",
    "souk": "Souk",
    "categories": {
      "exterior": "Extérieur",
      "wellness": "Bien-être",
      "entertainment": "Divertissement",
      "kitchen": "Cuisine",
      "comfort": "Confort",
      "services": "Services",
      "securityCat": "Sécurité",
      "location": "Emplacement"
    }
  },
  "faqs": {
    "title": "Questions fréquentes",
    "q1": "Comment réserver une villa?",
    "a1": "Vous pouvez réserver directement en ligne ou nous contacter par téléphone ou email. Notre équipe vous accompagnera tout au long du processus.",
    "q2": "Quels sont les modalités de paiement?",
    "a2": "Nous acceptons les virements bancaires, les cartes de crédit et les paiements en espèces. Un acompte de 30% est requis à la réservation.",
    "q3": "Puis-je annuler ma réservation?",
    "a3": "Oui, vous pouvez annuler gratuitement jusqu'à 30 jours avant votre arrivée. Au-delà, des frais d'annulation s'appliquent.",
    "q4": "Les villas sont-elles meublées?",
    "a4": "Oui, toutes nos villas sont entièrement meublées et équipées pour votre confort.",
    "q5": "Y a-t-il un service de ménage?",
    "a5": "Oui, un service de ménage est inclus dans toutes nos villas. Des services supplémentaires sont disponibles sur demande.",
    "q6": "Puis-je organiser un événement dans une villa?",
    "a6": "Oui, certaines villas sont adaptées aux événements. Contactez-nous pour discuter de votre projet.",
    "q7": "Les animaux sont-ils admis?",
    "a7": "Cela dépend de la villa. Contactez-nous pour vérifier la politique animaux de la villa qui vous intéresse.",
    "q8": "Comment puis-je arriver à l'aéroport?",
    "a8": "Nous pouvons organiser un transfert depuis l'aéroport de Marrakech-Ménara. Contactez-nous pour réserver."
  },
  "validation": {
    "nameRequired": "Le nom est requis",
    "emailRequired": "L'email est requis",
    "emailInvalid": "Format d'email invalide",
    "phoneInvalid": "Format de téléphone invalide",
    "messageRequired": "Le message est requis",
    "subjectRequired": "Le sujet est requis"
  },
  "dates": {
    "months": ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
    "monthsShort": ["Janv", "Févr", "Mars", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"],
    "days": ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
    "daysShort": ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"],
    "today": "Aujourd'hui"
  },
  "error": {
    "title": "Une erreur est survenue",
    "message": "Nous nous excusons pour ce désagrément.",
    "retry": "Veuillez réessayer",
    "retryBtn": "Réessayer"
  }
}
```

- [ ] **Step 2: Create `messages/en.json` with all English strings**

```json
{
  "common": {
    "back": "Back",
    "loading": "Loading...",
    "error": "An error occurred",
    "errorRetry": "Please try again",
    "retry": "Try again",
    "notFound": "Page not found",
    "notFoundDesc": "The page you are looking for is not available or has been moved.",
    "home": "Back to homepage",
    "skipToContent": "Skip to main content",
    "close": "Close",
    "confirm": "Confirm",
    "cancel": "Cancel",
    "save": "Save",
    "delete": "Delete",
    "edit": "Edit",
    "viewAll": "View all",
    "seeDetails": "See details",
    "currency": "Currency",
    "language": "Language"
  },
  "navigation": {
    "location": "Rent",
    "vente": "Sale",
    "villaLuxe": "Luxury Villa",
    "villaException": "Exceptional Villa",
    "agence": "Agency",
    "temoignages": "Testimonials",
    "blog": "Blog",
    "contact": "Contact",
    "selection": "Selection",
    "services": "Services",
    "allServices": "View all services",
    "book": "Book",
    "bookNow": "Book now"
  },
  "homepage": {
    "heroTitle": "Marrakech, Morocco",
    "heroSubtitle": "Luxury villa rental in Marrakech",
    "heroConcierge": "Dedicated concierge service for an unforgettable stay",
    "typeLabel": "Type",
    "typeAll": "All",
    "typeApartment": "Apartment",
    "locationLabel": "Rent",
    "saleLabel": "Sale",
    "arrivalLabel": "Arrival",
    "departureLabel": "Departure",
    "whenLabel": "When?",
    "guestsLabel": "Guests",
    "confirmLabel": "Confirm",
    "searchLabel": "Search",
    "chooseLabel": "Choose",
    "discoverTitle": "Discover our selection of luxury villas in Marrakech",
    "discoverSubtitle": "A selection of the finest villas for an exceptional stay",
    "terrain": "Plot",
    "surface": "Area",
    "bedrooms": "Bedrooms",
    "pax": "Guests",
    "new": "New",
    "fromPrice": "From",
    "perNight": "€/night",
    "prev": "Previous",
    "next": "Next",
    "removeSelection": "Remove from selection",
    "addSelection": "Add to selection",
    "experienceLabel": "Experience",
    "clientsLabel": "Client base",
    "qualityLabel": "Villa quality",
    "servicesLabel": "Integrated services",
    "presenceLabel": "On-site presence",
    "discoverMarrakech": "Discover Marrakech",
    "seeMore": "See more",
    "shortTermRental": "Short term",
    "contactUs": "Contact us",
    "vacationVillas": "Marrakech villa rental",
    "vacationSubtitle": "Book a luxury villa for your vacation in Marrakech",
    "eventsTitle": "Events",
    "vacationsTitle": "Vacations",
    "activitiesTitle": "Marrakech activities to discover",
    "newsletterTitle": "Stay informed",
    "newsletterSubtitle": "Join our newsletter to receive exclusive offers",
    "emailPlaceholder": "Your email address",
    "subscribe": "Subscribe",
    "subscribeSuccess": "Successfully subscribed!",
    "subscribeError": "Error during subscription",
    "subscribeNetworkError": "Network error. Please try again.",
    "blogTitle": "Latest blog posts",
    "blogSubtitle": "Discover our news and tips for your stay in Marrakech",
    "noImage": "No image",
    "seeAllArticles": "See all articles",
    "testimonialsTitle": "Client reviews",
    "testimonialsSubtitle": "Testimonials from our clients",
    "testimonialsDesc": "What our clients say about their experience with StaysInMarrakech",
    "callUs": "Call us",
    "backToTop": "Back to top"
  },
  "properties": {
    "title": "Our properties",
    "subtitle": "Discover our selection of luxury villas and properties in Marrakech",
    "noResults": "No property found",
    "noResultsDesc": "Try modifying your filters",
    "resultsCount": "properties found",
    "bedrooms": "bedrooms",
    "bathrooms": "bath",
    "perNight": "/night",
    "noImage": "No image",
    "filters": "Filters",
    "all": "All",
    "villa": "Villa",
    "riad": "Riad",
    "apartment": "Apartment",
    "house": "House",
    "land": "Land",
    "commercial": "Commercial",
    "sortRecent": "Most recent",
    "sortPriceAsc": "Price ascending",
    "sortPriceDesc": "Price descending",
    "sortViews": "Most viewed",
    "forRent": "Rent",
    "forSale": "Sale",
    "budget": "Budget",
    "bedroomsMin": "Bedrooms (min)",
    "allBedrooms": "All",
    "quarter": "District",
    "amenities": "Amenities",
    "sortBy": "Sort by",
    "reset": "Reset",
    "apply": "Apply",
    "openFilters": "Open filters",
    "featured": "Featured",
    "guests": "guests",
    "back": "Back",
    "views": "views",
    "description": "Description",
    "amenitiesTitle": "Amenities",
    "salePrice": "Sale price",
    "contact": "Contact",
    "nights": "night(s)",
    "total": "Total",
    "selectDates": "Select your dates",
    "bookingBtn": "Book",
    "editDates": "Edit/Choose dates",
    "guestsLabel": "Guests",
    "fullName": "Full name",
    "email": "Email",
    "phone": "Phone (optional)",
    "message": "Message (optional)",
    "sendSuccess": "Request sent successfully!",
    "sendError": "Error sending request",
    "selectDatesError": "Please select your dates",
    "cleaningFee": "Cleaning fee",
    "serviceFee": "Service fee",
    "continue": "Continue",
    "verify": "Verify",
    "confirmRequest": "Confirm request",
    "sending": "Sending...",
    "dates": "Dates",
    "info": "Info",
    "confirm": "Confirm",
    "bedroomsFeature": "Bedrooms",
    "bathroomsFeature": "Bathrooms",
    "garages": "Garages",
    "maxGuests": "Max. guests",
    "plotArea": "Plot",
    "builtArea": "Built area",
    "yearBuilt": "Year built",
    "minStay": "Min. stay",
    "featuresTitle": "Features",
    "nightsUnit": "nights",
    "reviews": "Reviews",
    "similarTitle": "Similar properties",
    "bedroomsAbbrev": "bed.",
    "bathroomsAbbrev": "bath",
    "availability": "Availability",
    "liveCalendar": "Live calendar",
    "daysReserved": "day(s) reserved",
    "available": "Available",
    "reserved": "Reserved",
    "today": "Today",
    "legend": "Legend",
    "daysThisMonth": "days this month",
    "daysBlocked": "days blocked"
  },
  "services": {
    "title": "Our Services & Activities",
    "subtitle": "Discover our selection of services and activities in Marrakech",
    "specificRequest": "A specific request?",
    "contactUs": "Contact us",
    "whatsIncluded": "What's included",
    "interested": "Interested in this service?",
    "requestQuote": "Request a quote",
    "callUs": "Call us",
    "summary": "Summary",
    "otherServices": "Other services",
    "location": "Marrakech, Morocco",
    "notFound": "Service not found",
    "serviceInMarrakech": "Service in Marrakech",
    "highPoints": "Highlights",
    "whatWeOffer": "What we offer",
    "whyChoose": "Why choose StaysInMarrakech",
    "similarArticles": "Similar articles",
    "bookActivity": "Book this activity",
    "similarActivities": "Similar activities",
    "newService": "New service",
    "editService": "Edit service",
    "titleLabel": "Title",
    "shortDesc": "Short description",
    "fullContent": "Full content",
    "metaDesc": "Meta description",
    "featuresLabel": "Features / Included",
    "imageUrl": "Image URL",
    "category": "Category",
    "priceLabel": "Price",
    "priceUnit": "Price unit",
    "saving": "Saving...",
    "update": "Update",
    "create": "Create",
    "cancel": "Cancel",
    "error": "Error",
    "networkError": "Network error"
  },
  "contact": {
    "title": "Contact us",
    "responseTime": "We respond within 2 hours",
    "formTitle": "Send us a message",
    "successMessage": "Thank you! Your message has been sent successfully.",
    "name": "Name",
    "email": "Email",
    "phone": "Phone",
    "subject": "Subject",
    "chooseSubject": "Choose a subject",
    "subjectBooking": "Villa booking",
    "subjectAvailability": "Check availability",
    "subjectQuote": "Quote request",
    "subjectEvent": "Event planning",
    "subjectConcierge": "Concierge services",
    "subjectOther": "Other request",
    "message": "Message",
    "sending": "Sending...",
    "send": "Send",
    "address": "Address",
    "telephone": "Phone",
    "emailLabel": "Email",
    "hours": "Hours",
    "followUs": "Follow us",
    "sendError": "Error sending message",
    "sendErrorMsg": "An error occurred. Please try again."
  },
  "legal": {
    "mentionsLegales": "Legal notices",
    "privacyPolicy": "Privacy policy"
  },
  "seo": {
    "homepageTitle": "Luxury villa rental and sale in Marrakech",
    "homepageDesc": "StaysInMarrakech specializes in luxury and prestige villa rentals in Marrakech. Discover our villas with private pools, vacation rentals, weddings and events.",
    "propertiesTitle": "Properties in Marrakech",
    "propertiesDesc": "Discover our selection of luxury villas and properties in Marrakech for rent and sale.",
    "villaLocationTitle": "Villa rental in Marrakech",
    "servicesTitle": "Our Services & Activities in Marrakech",
    "blogTitle": "Blog -- Escape",
    "testimonialsTitle": "Client testimonials",
    "contactTitle": "Contact us - StaysInMarrakech",
    "agencyTitle": "The agency - StaysInMarrakech"
  },
  "features": {
    "pool": "Swimming pool",
    "privatePool": "Private pool",
    "heatedPool": "Heated pool",
    "indoorPool": "Indoor pool",
    "garden": "Garden",
    "terrace": "Terrace",
    "balcon": "Balcony",
    "rooftop": "Rooftop",
    "parking": "Parking",
    "garage": "Garage",
    "aircon": "Air conditioning",
    "heating": "Heating",
    "wifi": "Wi-Fi",
    "tv": "Television",
    "washer": "Washing machine",
    "dryer": "Dryer",
    "dishwasher": "Dishwasher",
    "oven": "Oven",
    "microwave": "Microwave",
    "coffee": "Coffee machine",
    "bbq": "Barbecue",
    "outdoorKitchen": "Outdoor kitchen",
    "hammam": "Hammam",
    "sauna": "Sauna",
    "gym": "Gym",
    "spa": "Spa",
    "massage": "Massage",
    "cinema": "Cinema room",
    "billiards": "Billiards",
    "tableTennis": "Table tennis",
    "football": "Football field",
    "tennis": "Tennis",
    "security": "Security",
    "alarm": "Alarm",
    "camera": "Cameras",
    "guard": "Guard",
    "concierge": "Concierge",
    "housekeeper": "Housekeeper",
    "chef": "Private chef",
    "driver": "Driver",
    "babyEquipment": "Baby equipment",
    "accessible": "Wheelchair accessible",
    "fireplace": "Fireplace",
    "library": "Library",
    "office": "Office",
    "laundry": "Laundry",
    "storage": "Storage",
    "view": "View",
    "mountainView": "Mountain view",
    "gardenView": "Garden view",
    "cityView": "City view",
    "golf": "Golf",
    "beach": "Beach",
    "mountains": "Mountains",
    "historicalCenter": "Historic center",
    "medina": "Medina",
    "souk": "Souk",
    "categories": {
      "exterior": "Exterior",
      "wellness": "Wellness",
      "entertainment": "Entertainment",
      "kitchen": "Kitchen",
      "comfort": "Comfort",
      "services": "Services",
      "securityCat": "Security",
      "location": "Location"
    }
  },
  "faqs": {
    "title": "Frequently asked questions",
    "q1": "How to book a villa?",
    "a1": "You can book directly online or contact us by phone or email. Our team will guide you throughout the process.",
    "q2": "What are the payment terms?",
    "a2": "We accept bank transfers, credit cards and cash payments. A 30% deposit is required upon booking.",
    "q3": "Can I cancel my booking?",
    "a3": "Yes, you can cancel free of charge up to 30 days before your arrival. Beyond that, cancellation fees apply.",
    "q4": "Are the villas furnished?",
    "a4": "Yes, all our villas are fully furnished and equipped for your comfort.",
    "q5": "Is there a cleaning service?",
    "a5": "Yes, cleaning service is included in all our villas. Additional services are available upon request.",
    "q6": "Can I organize an event at a villa?",
    "a6": "Yes, some villas are suitable for events. Contact us to discuss your project.",
    "q7": "Are pets allowed?",
    "a7": "It depends on the villa. Contact us to check the pet policy of the villa you're interested in.",
    "q8": "How can I get to the airport?",
    "a8": "We can arrange a transfer from Marrakech-Menara airport. Contact us to book."
  },
  "validation": {
    "nameRequired": "Name is required",
    "emailRequired": "Email is required",
    "emailInvalid": "Invalid email format",
    "phoneInvalid": "Invalid phone format",
    "messageRequired": "Message is required",
    "subjectRequired": "Subject is required"
  },
  "dates": {
    "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    "monthsShort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    "days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "daysShort": ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    "today": "Today"
  },
  "error": {
    "title": "An error occurred",
    "message": "We apologize for the inconvenience.",
    "retry": "Please try again",
    "retryBtn": "Try again"
  }
}
```

- [ ] **Step 3: Verify JSON is valid**

Run: `node -e "JSON.parse(require('fs').readFileSync('messages/fr.json','utf8')); JSON.parse(require('fs').readFileSync('messages/en.json','utf8')); console.log('Both JSON files are valid')"`

- [ ] **Step 4: Commit**

```bash
git add messages/
git commit -m "feat(i18n): create French and English translation message files"
```

---

## Task 3: Move layout to [locale] and create root page

**Files:**
- Create: `src/app/[locale]/layout.tsx`
- Move: `src/app/layout.tsx` → delete after
- Move: `src/app/page.tsx` → `src/app/[locale]/page.tsx`
- Move: `src/app/globals.css` stays (imported by layout)

**Interfaces:**
- Consumes: `next-intl/server` `getTranslations`, `routing` config
- Produces: Locale-aware root layout with dynamic `<html lang>`

- [ ] **Step 1: Create `src/app/[locale]/layout.tsx`**

```typescript
import type {Metadata, Viewport} from 'next';
import {Raleway} from 'next/font/google';
import {NextIntlClientProvider, useMessages} from 'next-intl';
import {getTranslations} from 'next-intl/server';
import {SettingsProvider} from '@/components/SettingsContext';
import {ServicesProvider} from '@/components/ServicesContext';
import {CurrencyProvider} from '@/components/CurrencyContext';
import FloatingContact from '@/components/FloatingContact';
import BackToTop from '@/components/BackToTop';
import ErrorBoundary from '@/components/ErrorBoundary';
import '../globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
};

const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'seo'});

  return {
    metadataBase: new URL('https://staysinmarrakech.netlify.app'),
    title: {
      default: t('homepageTitle') + ' - StaysInMarrakech',
      template: '%s | StaysInMarrakech',
    },
    description: t('homepageDesc'),
    keywords: ['luxury villa rental marrakech', 'marrakech villa', 'villa sale marrakech', 'private pool villa marrakech', 'vacation rental marrakech', 'stays in marrakech'],
    authors: [{name: 'StaysInMarrakech'}],
    creator: 'StaysInMarrakech',
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'fr_MA',
      url: 'https://staysinmarrakech.netlify.app',
      siteName: 'StaysInMarrakech',
      title: t('homepageTitle') + ' - StaysInMarrakech',
      description: t('homepageDesc'),
      images: [
        {
          url: 'https://staysinmarrakech.netlify.app/seo/og-default.svg',
          width: 1200,
          height: 630,
          alt: 'StaysInMarrakech - Luxury villas in Marrakech',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('homepageTitle') + ' - StaysInMarrakech',
      description: t('homepageDesc'),
      images: ['https://staysinmarrakech.netlify.app/seo/og-default.svg'],
    },
    icons: {
      icon: '/seo/favicon.png',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: 'https://staysinmarrakech.netlify.app',
      languages: {
        'fr': 'https://staysinmarrakech.netlify.app/fr',
        'en': 'https://staysinmarrakech.netlify.app/en',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;
  const messages = useMessages();
  const t = await getTranslations({locale, namespace: 'common'});

  return (
    <html
      lang={locale}
      className={`${raleway.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col font-sans pb-[env(safe-area-inset-bottom)]">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:bg-[#0d47a1] focus:text-white focus:px-4 focus:py-2 focus:rounded">
          {t('skipToContent')}
        </a>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SettingsProvider>
            <ServicesProvider>
              <CurrencyProvider>
                <div id="main-content" className="flex-1 flex flex-col">
                  <ErrorBoundary>{children}</ErrorBoundary>
                </div>
                <FloatingContact />
                <BackToTop />
              </CurrencyProvider>
            </ServicesProvider>
          </SettingsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Move `src/app/page.tsx` to `src/app/[locale]/page.tsx`**

Copy the existing `src/app/page.tsx` content to `src/app/[locale]/page.tsx` (no changes needed yet — page components will be migrated individually in later tasks).

- [ ] **Step 3: Delete old `src/app/layout.tsx` and `src/app/page.tsx`**

Run: `Remove-Item src/app/layout.tsx; Remove-Item src/app/page.tsx`

- [ ] **Step 4: Verify build starts**

Run: `npx next build 2>&1 | Select-Object -First 30`
Expected: Build progresses past layout compilation

- [ ] **Step 5: Commit**

```bash
git add src/app/ 
git commit -m "feat(i18n): move layout and page to [locale] dynamic segment"
```

---

## Task 4: Migrate Header component

**Files:**
- Modify: `src/components/Header.tsx`

**Interfaces:**
- Consumes: `useTranslations('navigation')`, `useTranslations('common')`, `Link` from `@/i18n/navigation`
- Produces: All nav labels use `t()` calls, language switcher calls `router.push` with locale

- [ ] **Step 1: Read current Header.tsx fully**

Read `src/components/Header.tsx` to understand all hardcoded strings.

- [ ] **Step 2: Update imports and add useTranslations**

Replace the import block. Add `useTranslations` from `next-intl`. Replace `Link` from `next/link` with `Link` from `@/i18n/navigation`.

Key changes in the component:
- `const t = useTranslations('navigation');`
- `const tCommon = useTranslations('common');`
- Replace `"Location"` with `t('location')`, `"Vente"` with `t('vente')`, etc.
- Replace `Link` import to use localized version
- Update `villaLinks` array to use `t()` calls inside the component
- Update `extraNavLinks` array similarly
- Replace language switcher to call `router.push(pathname, {locale: newLocale})`

- [ ] **Step 3: Rewrite villaLinks and extraNavLinks as functions**

```typescript
// Inside the component, before the return:
const villaLinks: SubMenuItem[] = [
  { label: t('location'), href: '/marrakech-villas/location-villa-marrakech', icon: faKey },
  { label: t('vente'), href: '/marrakech-villas/vente-villa-marrakech', icon: faHome },
  { label: t('villaLuxe'), href: '/marrakech-villas/villa-de-luxe', icon: faStar },
  { label: t('villaException'), href: '/marrakech-villas/villa-exception', icon: faStar },
];

const extraNavLinks = [
  { label: t('agence'), href: '/agence' },
  { label: t('temoignages'), href: '/testimonials' },
  { label: t('blog'), href: '/blog' },
  { label: t('contact'), href: '/contactez-nous' },
];
```

- [ ] **Step 4: Update language switcher to use next-intl router**

Replace the language dropdown click handlers to use:
```typescript
import {useRouter, usePathname} from '@/i18n/navigation';
const router = useRouter();
const pathname = usePathname();

// In the language switch handler:
const handleLanguageChange = (newLocale: string) => {
  router.push(pathname, {locale: newLocale});
  setLangOpen(false);
};
```

Update the language display from `["Français", "English"]` to `[{code: "fr", label: "Français"}, {code: "en", label: "English"}]`.

- [ ] **Step 5: Replace all remaining hardcoded French strings**

Search for remaining French strings in Header.tsx and replace:
- `"FR"` → use locale display
- `"Langue"` → `tCommon('language')`
- `"Devise"` → `tCommon('currency')`
- `"Sélection"` → `t('selection')`
- `"Réserver"` / `"Réserver maintenant"` → `t('book')` / `t('bookNow')`
- `"Voir tous les services"` → `t('allServices')`
- `"Voir tout"` → `tCommon('viewAll')`

- [ ] **Step 6: Verify no remaining hardcoded French strings**

Run: `rg "\"[A-ZÉÈÊËÀÂÎÔÛÇa-zéèêëàâîôûç]" src/components/Header.tsx | rg -v "t\(|//|href=|className|src=|import|icon:|width|height|alt|key|onClick|variant|size|role|type|target|rel|stroke|fill|viewBox|d="`

- [ ] **Step 7: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat(i18n): migrate Header component to use translations"
```

---

## Task 5: Migrate Footer component

**Files:**
- Modify: `src/components/Footer.tsx`

**Interfaces:**
- Consumes: `useTranslations('navigation')`, `useTranslations('common')`, `useTranslations('contact')`, `Link` from `@/i18n/navigation`
- Produces: All footer labels use `t()` calls

- [ ] **Step 1: Update imports**

Add `useTranslations` from `next-intl`. Replace `Link` from `next/link` with `Link` from `@/i18n/navigation`.

- [ ] **Step 2: Add translation hooks**

```typescript
const t = useTranslations('navigation');
const tCommon = useTranslations('common');
const tContact = useTranslations('contact');
```

- [ ] **Step 3: Replace villaLinks array**

```typescript
const villaLinks = [
  { label: t('location') + ' villa Marrakech', href: '/marrakech-villas/location-villa-marrakech' },
  { label: t('vente') + ' villa Marrakech', href: '/marrakech-villas/vente-villa-marrakech' },
  { label: 'Villas de luxe', href: '/marrakech-villas/villa-de-luxe' },
  { label: "Villas d'exception", href: '/marrakech-villas/villa-exception' },
  { label: t('location') + ' courte durée', href: '/marrakech-villas/location-villa-marrakech' },
  { label: t('location') + ' longue durée', href: '/marrakech-villas/location-villa-marrakech' },
];
```

- [ ] **Step 4: Replace usefulLinks and section headings**

Replace `"Liens utiles"`, `"Services & activités"`, `"À propos"`, `"Contact"`, `"Suivez-nous"`, `"Tous droits réservés"` with translation calls.

- [ ] **Step 5: Verify build**

Run: `npx next build 2>&1 | Select-Object -First 30`

- [ ] **Step 6: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat(i18n): migrate Footer component to use translations"
```

---

## Task 6: Migrate Homepage components (Hero, VillaCarousel, Icons, Search)

**Files:**
- Modify: `src/components/HeroWithSearch.tsx`
- Modify: `src/components/VillaCarousel.tsx`
- Modify: `src/components/IconsSection.tsx`

**Interfaces:**
- Consumes: `useTranslations('homepage')`, `useTranslations('properties')`, `useTranslations('common')`
- Produces: All homepage UI text uses `t()` calls

- [ ] **Step 1: Migrate HeroWithSearch.tsx**

Add `useTranslations('homepage')`. Replace:
- `"Marrakech, Maroc"` → `t('heroTitle')`
- `"Location de villas de luxe..."` → `t('heroSubtitle')`
- `"Service de conciergerie dédié..."` → `t('heroConcierge')`
- All form labels: Type, Tous, Appartement, Location, Vente, Arrivée, Départ, Quand?, Voyageurs, Confirmer, Rechercher, Choisir

- [ ] **Step 2: Migrate VillaCarousel.tsx**

Add `useTranslations('homepage')`. Replace:
- `"Découvrez notre sélection..."` → `t('discoverTitle')`
- `"Une sélection des meilleures villas..."` → `t('discoverSubtitle')`
- Card labels: Terrain, Surface, Chambres, Pax, Nouveauté
- `"A partir de...€/nuit"` → `t('fromPrice') + '...€' + t('perNight')`
- `"Voir details"` → `tCommon('seeDetails')`
- Navigation: Précédent, Suivant
- Selection: Retirer/Ajouter à la sélection

- [ ] **Step 3: Migrate IconsSection.tsx**

Add `useTranslations('homepage')`. Replace stats labels:
- `"Expérience"`, `"Base clients"`, `"Qualité villas"`, `"Services intégrés"`, `"Présence sur site"`

- [ ] **Step 4: Commit**

```bash
git add src/components/HeroWithSearch.tsx src/components/VillaCarousel.tsx src/components/IconsSection.tsx
git commit -m "feat(i18n): migrate homepage hero, carousel, and icons to translations"
```

---

## Task 7: Migrate remaining homepage components

**Files:**
- Modify: `src/components/LocationSection.tsx`
- Modify: `src/components/ShortTermRental.tsx`
- Modify: `src/components/QuartiersCarousel.tsx`
- Modify: `src/components/EventsSection.tsx`
- Modify: `src/components/ActivitiesCarousel.tsx`
- Modify: `src/components/Newsletter.tsx`
- Modify: `src/components/BlogSection.tsx`
- Modify: `src/components/TestimonialsSection.tsx`
- Modify: `src/components/HomepageContent.tsx`
- Modify: `src/components/FloatingContact.tsx`
- Modify: `src/components/BackToTop.tsx`

**Interfaces:**
- Consumes: `useTranslations('homepage')`, `useTranslations('common')`
- Produces: All homepage section text uses `t()` calls

- [ ] **Step 1: Migrate LocationSection.tsx**

Replace `"Découvrez Marrakech"`, `"Voir plus"` with `t('discoverMarrakech')`, `tCommon('seeMore')`.

- [ ] **Step 2: Migrate ShortTermRental.tsx**

Replace `"Courte durée"`, `"Contactez-nous"` with `t('shortTermRental')`, `t('contactUs')`.

- [ ] **Step 3: Migrate QuartiersCarousel.tsx**

Replace `"Location villas Marrakech"`, `"Réservez une villa..."`, `"Précédent"`, `"Suivant"`.

- [ ] **Step 4: Migrate EventsSection.tsx**

Replace `"Événements"`, `"Vacances"`, `"Contactez-nous"`.

- [ ] **Step 5: Migrate ActivitiesCarousel.tsx**

Replace `"Activités Marrakech à découvrir"`, `"Précédent"`, `"Suivant"`.

- [ ] **Step 6: Migrate Newsletter.tsx**

Replace form labels, success/error messages with translation calls.

- [ ] **Step 7: Migrate BlogSection.tsx**

Replace `"Derniers articles du blog"`, `"Découvrez nos actualités..."`, `"Pas d'image"`, `"Voir tous les articles"`.

- [ ] **Step 8: Migrate TestimonialsSection.tsx**

Replace `"Avis clients"`, `"Témoignages de nos clients"`, `"Ce que nos clients disent..."`.

- [ ] **Step 9: Migrate HomepageContent.tsx**

This is the largest file (~90 lines of French SEO content). Replace all long-form text with translation keys. Use nested keys for paragraphs:
```json
"homepage": {
  "content": {
    "expertiseTitle": "Notre expertise",
    "expertiseP1": "...",
    "expertiseP2": "...",
    ...
  }
}
```
Add these keys to both `fr.json` and `en.json`.

- [ ] **Step 10: Migrate FloatingContact.tsx and BackToTop.tsx**

Replace `"Appelez-nous"`, `"Retour en haut"`.

- [ ] **Step 11: Commit**

```bash
git add src/components/LocationSection.tsx src/components/ShortTermRental.tsx src/components/QuartiersCarousel.tsx src/components/EventsSection.tsx src/components/ActivitiesCarousel.tsx src/components/Newsletter.tsx src/components/BlogSection.tsx src/components/TestimonialsSection.tsx src/components/HomepageContent.tsx src/components/FloatingContact.tsx src/components/BackToTop.tsx
git commit -m "feat(i18n): migrate all remaining homepage components to translations"
```

---

## Task 8: Migrate Property list and filter components

**Files:**
- Modify: `src/components/PropertyGrid.tsx`
- Modify: `src/components/PropertyFilters.tsx`
- Modify: `src/components/PriceDisplay.tsx`
- Modify: `src/app/properties/PropertiesPageClient.tsx`

**Interfaces:**
- Consumes: `useTranslations('properties')`, `useTranslations('common')`
- Produces: All property listing text uses `t()` calls

- [ ] **Step 1: Migrate PropertyGrid.tsx**

Replace:
- `"Aucune propriété trouvée"` → `t('noResults')`
- `"Essayez de modifier vos filtres"` → `t('noResultsDesc')`
- `"propriétés trouvées"` → `t('resultsCount')`
- `"chambres"` → `t('bedrooms')`
- `"sdb"` → `t('bathrooms')`
- `"/nuit"` → `t('perNight')`
- `"Aucune image"` → `t('noImage')`

- [ ] **Step 2: Migrate PropertyFilters.tsx**

Replace all filter labels:
- `"Filtres"` → `t('filters')`
- Type options: Tous, Villa, Riad, Appartement, Maison, Terrain, Commercial
- Sort options: Plus récent, Prix croissant/décroissant, Plus vues
- Location/Sale toggle, Budget, Chambres (min), Toutes, Quartier, Équipements
- Trier par, Réinitialiser, Appliquer, Ouvrir les filtres

- [ ] **Step 3: Migrate PriceDisplay.tsx**

Replace `toLocaleString("fr-FR")` with locale-aware formatting:
```typescript
import {useLocale} from 'next-intl';
const locale = useLocale();
// Use toLocaleString(locale === 'en' ? 'en-US' : 'fr-FR')
```

- [ ] **Step 4: Migrate PropertiesPageClient.tsx**

Replace `"Nos propriétés"`, `"Découvrez notre sélection..."`, and the long SEO paragraph.

- [ ] **Step 5: Commit**

```bash
git add src/components/PropertyGrid.tsx src/components/PropertyFilters.tsx src/components/PriceDisplay.tsx src/app/properties/PropertiesPageClient.tsx
git commit -m "feat(i18n): migrate property listing and filter components to translations"
```

---

## Task 9: Migrate Property detail page

**Files:**
- Modify: `src/app/properties/[slug]/PropertyDetailClient.tsx`
- Modify: `src/app/properties/[slug]/components/PropertyFeatures.tsx`
- Modify: `src/app/properties/[slug]/components/PropertyTestimonials.tsx`
- Modify: `src/app/properties/[slug]/components/SimilarPropertiesGrid.tsx`
- Modify: `src/app/properties/[slug]/components/AvailabilityCalendar.tsx`
- Modify: `src/app/properties/[slug]/page.tsx`

**Interfaces:**
- Consumes: `useTranslations('properties')`, `useTranslations('common')`
- Produces: All property detail text uses `t()` calls

- [ ] **Step 1: Migrate PropertyDetailClient.tsx**

Replace all booking flow labels:
- `"Retour"`, `"vues"`, `"Description"`, `"Équipements"`, `"Prix de vente"`, `"Contacter"`
- `"nuit(s)"`, `"Total"`, `"Sélectionnez vos dates"`, `"Réserver"`
- Form fields: Nom complet, Email, Telephone, Message
- Status: Demande envoyée avec succès!, Erreur, Veuillez sélectionner vos dates
- Fees: Frais de ménage, Frais de service
- Navigation: Continuer, Vérifier, Retour, Confirmer la demande, Envoi
- Tabs: Dates, Infos, Confirm.

- [ ] **Step 2: Migrate PropertyFeatures.tsx**

Replace feature labels: Chambres, Salles de bain, Garages, Max. voyageurs, Terrain, Surface construite, Année construction, Min. séjour, Caractéristiques, nuits.

- [ ] **Step 3: Migrate SimilarPropertiesGrid.tsx**

Replace `"Propriétés similaires"`, `"ch."`, `"sdb"`.

- [ ] **Step 4: Migrate AvailabilityCalendar.tsx**

Replace: Disponibilité, Calendrier en temps réel, jour(s) réservé(s), Disponible, Réservé, Aujourd'hui, Légende, jours ce mois, jours bloqués.

Use `date-fns/locale` with the current locale for month/day names.

- [ ] **Step 5: Migrate PropertyTestimonials.tsx**

Replace `"Avis"`.

- [ ] **Step 6: Migrate property detail page.tsx metadata**

Update metadata generation to use `getTranslations`.

- [ ] **Step 7: Commit**

```bash
git add src/app/properties/
git commit -m "feat(i18n): migrate property detail page and sub-components to translations"
```

---

## Task 10: Migrate Location pages

**Files:**
- Modify: `src/app/locations/palmeraie/page.tsx`
- Modify: `src/app/locations/gueliz/page.tsx`
- Modify: `src/app/locations/targa/page.tsx`
- Modify: `src/app/locations/amelkis/page.tsx`
- Modify: `src/app/locations/route-ourika/page.tsx`

**Interfaces:**
- Consumes: `getTranslations('properties')`, `getTranslations('common')`
- Produces: All location page content uses `t()` calls

- [ ] **Step 1: Add location-specific translation keys**

Add to both `fr.json` and `en.json` under a new `locations` namespace:
```json
"locations": {
  "palmeraie": {
    "title": "Location de villa dans la Palmeraie",
    "subtitle": "...",
    "whyChoose": "Pourquoi choisir la Palmeraie?",
    "bullets": ["...", "..."],
    "faq": {"q1": "...", "a1": "..."},
    "seeVilla": "Voir la villa",
    "noVilla": "Aucune villa disponible"
  },
  "gueliz": { ... },
  "targa": { ... },
  "amelkis": { ... },
  "routeOurika": { ... }
}
```

- [ ] **Step 2: Migrate palmeraie/page.tsx**

Replace all hardcoded French content with `t('locations.palmeraie.title')` etc.

- [ ] **Step 3: Migrate gueliz, targa, amelkis, route-ourika pages**

Same pattern as palmeraie.

- [ ] **Step 4: Commit**

```bash
git add src/app/locations/
git commit -m "feat(i18n): migrate location pages to use translations"
```

---

## Task 11: Migrate Service pages and ServiceDetail

**Files:**
- Modify: `src/app/service/page.tsx`
- Modify: `src/app/service/[slug]/page.tsx`
- Modify: `src/components/ServiceDetail.tsx`
- Modify: `src/components/ServiceForm.tsx`

**Interfaces:**
- Consumes: `useTranslations('services')`, `useTranslations('common')`
- Produces: All service text uses `t()` calls

- [ ] **Step 1: Add service-specific translation keys**

Add to both JSON files under `services` namespace the service detail strings (highPoints, whatWeOffer, whyChoose, etc.).

- [ ] **Step 2: Migrate service/page.tsx**

Replace `"Nos Services & Activités"`, `"Découvrez notre sélection..."`, `"Une demande spécifique?"`, `"Contactez-nous"`.

- [ ] **Step 3: Migrate service/[slug]/page.tsx**

Replace breadcrumbs: `"Accueil"`, `"Services"`. Replace `"Ce qui est inclus"`, `"Intéressé par ce service?"`, `"Demandez un devis"`, `"Appelez-nous"`, `"Résumé"`, `"Autres services"`, `"Marrakech, Maroc"`, `"Service introuvable"`, `"Service à Marrakech"`.

- [ ] **Step 4: Migrate ServiceDetail.tsx**

This is the largest task. The file has ~600 lines of hardcoded French service descriptions. Strategy:
1. Extract all service titles, descriptions, features into `services` namespace in JSON files
2. Create a helper that looks up service data by slug and locale
3. Replace hardcoded strings with translation lookups

For the service data (titles, descriptions, features), since it's static content embedded in code, add them as translation keys:
```json
"services": {
  "data": {
    "catering": {
      "title": "Traiteur & Cuisine",
      "description": "...",
      "longDescription": "...",
      "features": ["...", "..."],
      "highlights": ["...", "..."]
    },
    ...
  }
}
```

- [ ] **Step 5: Migrate ServiceForm.tsx**

Replace admin form labels. Since admin stays French-only, this component can stay as-is OR use translations for consistency. Keep it French-only since it's admin-only.

- [ ] **Step 6: Commit**

```bash
git add src/app/service/ src/components/ServiceDetail.tsx src/components/ServiceForm.tsx
git commit -m "feat(i18n): migrate service pages and ServiceDetail to translations"
```

---

## Task 12: Migrate Contact, Legal, Blog, Testimonials, Agency pages

**Files:**
- Modify: `src/app/contactez-nous/page.tsx`
- Modify: `src/app/mentions-legales/page.tsx`
- Modify: `src/app/politique-de-confidentialite/page.tsx`
- Modify: `src/app/blog/page.tsx`
- Modify: `src/app/testimonials/page.tsx`
- Modify: `src/app/agence/page.tsx`
- Modify: `src/app/error.tsx`
- Modify: `src/app/loading.tsx`
- Modify: `src/app/not-found.tsx`

**Interfaces:**
- Consumes: `useTranslations('contact')`, `useTranslations('legal')`, `useTranslations('seo')`, etc.
- Produces: All page text uses `t()` calls

- [ ] **Step 1: Migrate contactez-nous/page.tsx**

Replace all form labels: Nom, Email, Telephone, Sujet, Message, Envoi en cours, Envoyer. Replace subject options, address/phone/email/hours labels, success/error messages.

- [ ] **Step 2: Migrate mentions-legales/page.tsx**

Extract all legal text into `legal` namespace in JSON files. Replace with `t()` calls.

- [ ] **Step 3: Migrate politique-de-confidentialite/page.tsx**

Same approach as mentions légales.

- [ ] **Step 4: Migrate blog/page.tsx**

Replace `"Aucun article pour le moment"`, date formatting locale.

- [ ] **Step 5: Migrate testimonials/page.tsx**

Replace `"Témoignages des clients"`, `"Filtrer"`, `"Nom de la villa"`, `"Aucun témoignage trouvé"`.

- [ ] **Step 6: Migrate agence/page.tsx**

Replace fallback biography text.

- [ ] **Step 7: Migrate error.tsx, loading.tsx, not-found.tsx**

Replace error messages with translation calls. These are server components — use `getTranslations`.

- [ ] **Step 8: Commit**

```bash
git add src/app/contactez-nous/ src/app/mentions-legales/ src/app/politique-de-confidentialite/ src/app/blog/ src/app/testimonials/ src/app/agence/ src/app/error.tsx src/app/loading.tsx src/app/not-found.tsx
git commit -m "feat(i18n): migrate contact, legal, blog, testimonials, and error pages"
```

---

## Task 13: Migrate shared utilities (types, faqs, features, validations, calendar)

**Files:**
- Modify: `src/types/index.ts`
- Modify: `src/lib/faqs.ts`
- `src/lib/features.ts` (keep as-is — features are display labels used by PropertyFilters)
- Modify: `src/lib/validations.ts`
- Modify: `src/components/DateCalendarPicker.tsx`

**Interfaces:**
- Consumes: `useTranslations('features')`, `useTranslations('faqs')`, `useTranslations('validation')`
- Produces: Locale-aware utility functions

- [ ] **Step 1: Migrate types/index.ts**

Replace `TYPE_LABELS` and `STATUS_LABELS` with translation-aware lookup:
```typescript
export function getTypeLabel(type: PropertyType, locale: string): string {
  const labels: Record<PropertyType, {fr: string; en: string}> = {
    VILLA: {fr: 'Villa', en: 'Villa'},
    RIAD: {fr: 'Riad', en: 'Riad'},
    APARTMENT: {fr: 'Appartement', en: 'Apartment'},
    HOUSE: {fr: 'Maison', en: 'House'},
    LAND: {fr: 'Terrain', en: 'Land'},
    COMMERCIAL: {fr: 'Commercial', en: 'Commercial'},
  };
  return labels[type]?.[locale as 'fr' | 'en'] ?? type;
}
```

Update `formatPrice` to accept locale parameter:
```typescript
export function formatPrice(price: number, locale: string = 'fr'): string {
  return price.toLocaleString(locale === 'en' ? 'en-US' : 'fr-FR');
}
```

- [ ] **Step 2: Update lib/faqs.ts**

Make faqs locale-aware. Export a function:
```typescript
export function getFaqs(locale: string) {
  // Return faqs from translation file or keep as-is and use t() in components
}
```

Alternatively, keep the French data and add English via translations in the FAQ component.

- [ ] **Step 3: Migrate DateCalendarPicker.tsx**

Replace hardcoded French month/day names with translation calls:
```typescript
const tDates = useTranslations('dates');
const months = tDates.raw('months'); // ["January", "February", ...]
const days = tDates.raw('daysShort');
```

- [ ] **Step 4: Migrate validations.ts**

Replace Zod error messages with translation keys. Since Zod runs server-side or in forms, pass locale to a validation factory:
```typescript
export function createContactSchema(locale: string) {
  const t = getValidationMessages(locale);
  return z.object({
    name: z.string().min(1, t.nameRequired),
    email: z.string().email(t.emailInvalid),
    // ...
  });
}
```

- [ ] **Step 5: Commit**

```bash
git add src/types/index.ts src/lib/faqs.ts src/lib/validations.ts src/components/DateCalendarPicker.tsx
git commit -m "feat(i18n): migrate shared utilities to be locale-aware"
```

---

## Task 14: Update Prisma schema and create locale migration

**Files:**
- Modify: `prisma/schema.prisma`
- Create: Prisma migration

**Interfaces:**
- Consumes: None
- Produces: `_en` columns on 6 models

- [ ] **Step 1: Add _en columns to SiteSetting**

```prisma
model SiteSetting {
  id        String   @id @default(cuid())
  key       String   @unique
  value     String?  @db.Text
  valueEn   String?  @db.Text @map("value_en")
  updatedAt DateTime @updatedAt @map("updated_at")
  @@map("site_settings")
}
```

- [ ] **Step 2: Add _en columns to Service**

```prisma
model Service {
  # ... existing fields ...
  titleEn           String?  @map("title_en")
  descriptionEn     String?  @db.Text @map("description_en")
  longDescriptionEn String?  @db.Text @map("long_description_en")
  metaDescriptionEn String?  @db.Text @map("meta_description_en")
  featuresEn        String?  @db.Text @map("features_en")
  # ...
}
```

- [ ] **Step 3: Add _en columns to Location**

```prisma
model Location {
  # ... existing fields ...
  nameEn          String?  @map("name_en")
  descriptionEn   String?  @db.Text @map("description_en")
  # ...
}
```

- [ ] **Step 4: Add _en columns to HeroSlide**

```prisma
model HeroSlide {
  # ... existing fields ...
  titleEn         String?  @map("title_en")
  subtitleEn      String?  @map("subtitle_en")
  buttonTextEn    String?  @map("button_text_en")
  # ...
}
```

- [ ] **Step 5: Add _en columns to StaticPage and BlogPost**

```prisma
model StaticPage {
  # ... existing fields ...
  titleEn         String?  @map("title_en")
  contentEn       String?  @db.Text @map("content_en")
  metaDescEn      String?  @map("meta_desc_en")
  # ...
}

model BlogPost {
  # ... existing fields ...
  titleEn         String?  @map("title_en")
  excerptEn       String?  @map("excerpt_en")
  contentEn       String?  @db.Text @map("content_en")
  # ...
}
```

- [ ] **Step 6: Create and apply migration**

Run: `npx prisma migrate dev --name add_i18n_en_columns`

- [ ] **Step 7: Update SettingsContext to include _en fields**

Add `value_en` to the `SiteSettings` interface in `SettingsContext.tsx`:
```typescript
export interface SiteSettings {
  // ... existing fields ...
  value_en?: string;
  // Add all _en variants for fields used in UI
}
```

- [ ] **Step 8: Create seed script for English translations**

Create `scripts/seed-i18n-en.ts` that populates `value_en` for existing SiteSetting records.

- [ ] **Step 9: Commit**

```bash
git add prisma/schema.prisma prisma/migrations/ src/components/SettingsContext.tsx scripts/seed-i18n-en.ts
git commit -m "feat(i18n): add Prisma schema _en columns and migration"
```

---

## Task 15: Update SettingsContext to read locale-aware data

**Files:**
- Modify: `src/components/SettingsContext.tsx`

**Interfaces:**
- Consumes: `useLocale()` from `next-intl`
- Produces: Settings values respect current locale

- [ ] **Step 1: Add locale-aware helper**

```typescript
import {useLocale} from 'next-intl';

// Inside the provider, add a helper:
const getLocalizedValue = (valueFr: string | undefined, valueEn: string | undefined): string | undefined => {
  const locale = useLocale();
  if (locale === 'en' && valueEn) return valueEn;
  return valueFr;
};
```

- [ ] **Step 2: Expose localized settings**

Update the context value to expose a `getSetting(key)` function that automatically returns the locale-appropriate value.

- [ ] **Step 3: Commit**

```bash
git add src/components/SettingsContext.tsx
git commit -m "feat(i18n): add locale-aware settings helper to SettingsContext"
```

---

## Task 16: Create LanguageSwitcher component and integrate

**Files:**
- Create: `src/components/LanguageSwitcher.tsx`
- Modify: `src/components/Header.tsx` (replace inline language dropdown)

**Interfaces:**
- Consumes: `useLocale()`, `useRouter()`, `usePathname()` from `next-intl`
- Produces: `<LanguageSwitcher />` component

- [ ] **Step 1: Create `src/components/LanguageSwitcher.tsx`**

```typescript
"use client";

import {useLocale} from 'next-intl';
import {useRouter, usePathname} from '@/i18n/navigation';
import {Icon, faLanguage, faChevronDown} from "@/components/icons";
import {useState, useRef, useEffect} from "react";

const languages = [
  {code: 'fr', label: 'Français'},
  {code: 'en', label: 'English'},
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSwitch = (newLocale: string) => {
    router.push(pathname, {locale: newLocale});
    setOpen(false);
  };

  const current = languages.find(l => l.code === locale) ?? languages[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm hover:text-[#d4a853] transition-colors"
      >
        <Icon icon={faLanguage} className="w-4 h-4" />
        <span>{current.label}</span>
        <Icon icon={faChevronDown} className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white shadow-lg rounded-lg py-1 z-50 min-w-[120px]">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => handleSwitch(lang.code)}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${locale === lang.code ? 'text-[#d4a853] font-semibold' : 'text-gray-700'}`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Update Header.tsx to use LanguageSwitcher**

Replace the inline language dropdown in Header with:
```typescript
import LanguageSwitcher from "@/components/LanguageSwitcher";
// In JSX: <LanguageSwitcher />
```

Remove the old `langOpen` state and language dropdown code from Header.

- [ ] **Step 3: Commit**

```bash
git add src/components/LanguageSwitcher.tsx src/components/Header.tsx
git commit -m "feat(i18n): create LanguageSwitcher component and integrate into Header"
```

---

## Task 17: Verify build and fix remaining issues

**Files:**
- Modify: any files with remaining TypeScript errors

**Interfaces:**
- Consumes: All previous tasks
- Produces: Clean build with no TypeScript errors

- [ ] **Step 1: Run full build**

Run: `npx next build 2>&1 | Tee-Object -FilePath build-output.txt`

- [ ] **Step 2: Fix any TypeScript errors**

Common issues to watch for:
- Missing `use client` directive in components using `useTranslations`
- Import paths that still reference old `src/app/layout.tsx`
- Components that import from `next/link` instead of `@/i18n/navigation`
- Missing translation keys in JSON files

- [ ] **Step 3: Run lint**

Run: `npm run lint`

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "fix(i18n): resolve build errors and type issues"
```

---

## Task 18: Test locale switching end-to-end

**Files:**
- None (testing task)

**Interfaces:**
- Consumes: All previous tasks
- Produces: Verified working locale switching

- [ ] **Step 1: Start dev server**

Run: `npm run dev`

- [ ] **Step 2: Test French default**

Navigate to `http://localhost:3000/` — should redirect to `/fr/` and display French content.

- [ ] **Step 3: Test English version**

Navigate to `http://localhost:3000/en/` — should display English content.

- [ ] **Step 4: Test language switcher**

Click language switcher on any page — should switch between FR and EN while staying on the same page.

- [ ] **Step 5: Test key pages**

Visit each major page type in both locales:
- Homepage
- Properties list
- Property detail
- Service list
- Service detail
- Contact
- Blog

- [ ] **Step 6: Test admin (should stay French)**

Navigate to `/admin/` — should display French-only admin interface.

- [ ] **Step 7: Final commit with any fixes**

```bash
git add -A
git commit -m "feat(i18n): complete English translation implementation"
```
