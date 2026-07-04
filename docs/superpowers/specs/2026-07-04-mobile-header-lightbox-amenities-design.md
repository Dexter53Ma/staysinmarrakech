# Design Spec: Mobile Header, Image Lightbox, Admin Amenities

**Date:** 2026-07-04
**Status:** Approved
**Scope:** Three related UI enhancements for the Stays in Marrakech property rental site

---

## Feature 1: Mobile Header — Visual Polish + Missing Links

### Problem
The mobile header is functional but feels unpolished. Key links (wishlist, phone, email, social icons) are hidden on mobile since the top bar is `hidden lg:block`.

### File to modify
- `src/components/Header.tsx`

### Changes

#### 1a. Add missing links to mobile menu
Add a **contact info section** at the bottom of the mobile menu (before the CTA):
- Phone numbers with `tel:` links and phone icon (from `SettingsContext`)
- Email with `mailto:` link and envelope icon
- Social icons row: Facebook, Instagram, LinkedIn (from `SettingsContext`)

Add a **wishlist link** (`/villas/wishlist`) with heart icon in the extra nav links section.

#### 1b. Visual polish
- Add the logo at the top of the mobile menu panel (smaller version, centered)
- Smoother open/close: add `transition-all duration-300 ease-in-out` with opacity + translate-y animation on the menu panel
- Better section dividers: use `border-gradient` or subtle gradient separators
- Improve hover/active states: add `active:scale-95` transition on tappable items
- Refine padding/spacing for better visual hierarchy
- Add subtle shadow/glow on the mobile menu panel

### No changes
- Language switcher stays as-is (visual only, no i18n system exists)
- Desktop nav untouched

---

## Feature 2: Property Image Lightbox

### Problem
There is no way to view property images at full size. The `ImageGallery` component only shows inline images with thumbnails.

### Files to create/modify
- **Create:** `src/components/ImageLightbox.tsx` (new component)
- **Modify:** `src/app/properties/[slug]/components/ImageGallery.tsx` (integrate lightbox)

### Design

#### ImageLightbox component
A modal overlay with:
- **Backdrop:** `bg-black/90` covering full viewport
- **Main image:** centered, `max-w-[90vw] max-h-[85vh]` with `object-contain`
- **Close button:** X icon top-right, `absolute` positioned
- **Navigation arrows:** left/right chevron buttons, positioned on sides of image, hidden on mobile (swipe instead)
- **Image counter:** "3 / 12" text at bottom center
- **Keyboard support:** Escape closes, Left/Right arrows navigate
- **Touch swipe:** detect horizontal swipe gestures on mobile for prev/next
- **Body scroll lock:** `document.body.style.overflow = "hidden"` while open

#### Integration in ImageGallery
- Make the main image clickable (`cursor-pointer`)
- On click → opens `ImageLightbox` at the currently selected index
- Lightbox manages its own navigation state (independent of gallery thumbnail selection)

---

## Feature 3: Admin Amenities — Full Luxury Villa Set

### Problem
Only 18 amenities exist, hardcoded separately in create/edit forms. Case mismatch between admin (PascalCase) and public filters (lowercase). Public filters only show 5 of 18.

### Files to create/modify
- **Create:** `src/lib/features.ts` (shared constants)
- **Modify:** `src/app/admin/properties/new/page.tsx` (use shared constants)
- **Modify:** `src/app/admin/properties/[id]/edit/page.tsx` (use shared constants)
- **Modify:** `src/components/PropertyFilters.tsx` (expand filters, grouped by category)
- **Modify:** `src/app/properties/[slug]/PropertyDetailClient.tsx` (use French labels)

### Shared constants file (`src/lib/features.ts`)

```ts
export const FEATURES = {
  // Outdoor
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
  // Wellness
  hammam: { label: "Hammam", category: "Bien-être" },
  jacuzzi: { label: "Jacuzzi", category: "Bien-être" },
  sauna: { label: "Sauna", category: "Bien-être" },
  spa: { label: "Spa", category: "Bien-être" },
  gym: { label: "Salle de sport", category: "Bien-être" },
  yoga_room: { label: "Salle de yoga", category: "Bien-être" },
  massage_room: { label: "Salle de massage", category: "Bien-être" },
  // Entertainment
  cinema: { label: "Cinéma", category: "Divertissement" },
  game_room: { label: "Salle de jeux", category: "Divertissement" },
  billiards: { label: "Billard", category: "Divertissement" },
  foosball: { label: "Baby-foot", category: "Divertissement" },
  sound_system: { label: "Sono", category: "Divertissement" },
  smart_tv: { label: "Smart TV", category: "Divertissement" },
  streaming: { label: "Streaming", category: "Divertissement" },
  // Comfort
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
  // Safety/Access
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
  // Connectivity
  wifi: { label: "WiFi", category: "Connectivité" },
  workspace: { label: "Espace de travail", category: "Connectivité" },
  office: { label: "Bureau", category: "Connectivité" },
  // Kids
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
} as const;

export type FeatureKey = keyof typeof FEATURES;
export const FEATURE_KEYS = Object.keys(FEATURES) as FeatureKey[];
```

### Admin forms
- Import `FEATURES` and `FEATURE_KEYS` from `src/lib/features.ts`
- Remove hardcoded `FEATURES` and `FEATURE_LABELS` arrays
- Render checkboxes grouped by category (collapsible sections)
- Store lowercase keys in the database (fix case mismatch)

### PropertyFilters.tsx
- Import shared constants
- Render all amenities grouped by category in a collapsible filter section
- Use lowercase keys consistently

### PropertyDetailClient.tsx
- Import `FEATURES` from shared constants
- Display French labels (`FEATURES[f].label`) instead of raw keys
- Group features by category for better visual presentation

---

## Bug Fixes Included

1. **Case mismatch:** Standardize all feature keys to lowercase across admin forms, public filters, and display
2. **Public filter gap:** Expose all amenities in `PropertyFilters.tsx` (currently only 5 of 18)
3. **Raw key display:** Show French labels on property detail page instead of raw keys like "Pool"
4. **Code duplication:** Extract shared constants to eliminate duplicate `FEATURES` arrays in create/edit forms
