# Mobile Header, Image Lightbox, Admin Amenities — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enhance the mobile header with missing links and visual polish, add a fullscreen image lightbox for property images, and expand the admin amenities list from 18 to 50+ with proper categorization and French labels.

**Architecture:** Shared constants file eliminates duplication across admin forms and public filters. New ImageLightbox component provides fullscreen viewing with keyboard/swipe navigation. Mobile header gets contact info, social icons, and wishlist link added to the existing hamburger menu.

**Tech Stack:** React, Next.js, Tailwind CSS, Lucide icons, existing SettingsContext/ServicesContext

## Global Constraints

- All feature keys must be lowercase (e.g., `pool`, `garden`) — fixes existing case mismatch
- French labels displayed to users, English keys stored in database
- No new npm dependencies — use native React + Tailwind
- Existing code patterns: inline Tailwind classes, `"use client"` components, SettingsContext for site data

---

## File Structure

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/lib/features.ts` | Shared amenities constants (keys, labels, categories) |
| Create | `src/components/ImageLightbox.tsx` | Fullscreen image viewer modal |
| Modify | `src/app/admin/properties/new/page.tsx` | Use shared features, remove hardcoded arrays |
| Modify | `src/app/admin/properties/[id]/edit/page.tsx` | Use shared features, remove hardcoded arrays |
| Modify | `src/components/PropertyFilters.tsx` | Show all amenities grouped by category |
| Modify | `src/app/properties/[slug]/PropertyDetailClient.tsx` | Display French labels, group by category |
| Modify | `src/app/properties/[slug]/components/ImageGallery.tsx` | Integrate lightbox on main image click |
| Modify | `src/components/Header.tsx` | Add wishlist, contact info, social icons to mobile menu |

---

### Task 1: Create shared features constants

**Files:**
- Create: `src/lib/features.ts`

**Interfaces:**
- Produces: `FEATURES` object, `FeatureKey` type, `FEATURE_KEYS` array, `FeatureCategory` type, `FEATURE_CATEGORIES` array, `getFeaturesByCategory()` helper

- [ ] **Step 1: Create the shared constants file**

```ts
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
```

- [ ] **Step 2: Verify the file compiles**

Run: `npx tsc --noEmit src/lib/features.ts`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/features.ts
git commit -m "feat: add shared amenities constants with 50+ features and categories"
```

---

### Task 2: Update admin new property form

**Files:**
- Modify: `src/app/admin/properties/new/page.tsx` (lines 45-57 remove, lines 96-98 update, lines 386-413 update)

**Interfaces:**
- Consumes: `FEATURES`, `FEATURE_KEYS`, `getFeaturesByCategory` from `src/lib/features.ts`

- [ ] **Step 1: Replace hardcoded constants with shared imports**

Remove the hardcoded `FEATURES` array (lines 45-49) and `FEATURE_LABELS` object (lines 51-57). Add import at top:

```ts
import { FEATURES, FEATURE_KEYS, getFeaturesByCategory } from "@/lib/features";
```

- [ ] **Step 2: Update features state initialization**

Change from:
```ts
const [features, setFeatures] = useState<Record<string, boolean>>(
  Object.fromEntries(FEATURES.map((f) => [f, false]))
);
```

To:
```ts
const [features, setFeatures] = useState<Record<string, boolean>>(
  Object.fromEntries(FEATURE_KEYS.map((f) => [f, false]))
);
```

- [ ] **Step 3: Replace flat checkbox grid with categorized sections**

Replace the Section 5 card content (lines 391-412) with:

```tsx
<CardContent>
  <div className="space-y-4">
    {Object.entries(getFeaturesByCategory()).map(([category, items]) => (
      <div key={category}>
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{category}</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.map(({ key, label }) => (
            <label
              key={key}
              className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                features[key]
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <input
                type="checkbox"
                checked={features[key]}
                onChange={() => toggleFeature(key)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm">{label}</span>
            </label>
          ))}
        </div>
      </div>
    ))}
  </div>
</CardContent>
```

- [ ] **Step 4: Verify form renders correctly**

Run: `npm run build 2>&1 | head -30`
Expected: No build errors

- [ ] **Step 5: Commit**

```bash
git add src/app/admin/properties/new/page.tsx
git commit -m "feat: use shared amenities constants in new property form"
```

---

### Task 3: Update admin edit property form

**Files:**
- Modify: `src/app/admin/properties/[id]/edit/page.tsx` (lines 45-57 remove, update features state and grid)

**Interfaces:**
- Consumes: `FEATURES`, `FEATURE_KEYS`, `getFeaturesByCategory` from `src/lib/features.ts`

- [ ] **Step 1: Replace hardcoded constants with shared imports**

Same changes as Task 2 — remove hardcoded `FEATURES` and `FEATURE_LABELS`, add import from `@/lib/features`.

- [ ] **Step 2: Update features state initialization**

Same as Task 2 step 2 — use `FEATURE_KEYS` instead of `FEATURES` array.

- [ ] **Step 3: Replace flat checkbox grid with categorized sections**

Same categorized layout as Task 2 step 3.

- [ ] **Step 4: Commit**

```bash
git add src/app/admin/properties/[id]/edit/page.tsx
git commit -m "feat: use shared amenities constants in edit property form"
```

---

### Task 4: Update PropertyFilters with all amenities

**Files:**
- Modify: `src/components/PropertyFilters.tsx` (lines 31-37 remove, lines 172-187 update)

**Interfaces:**
- Consumes: `getFeaturesByCategory` from `src/lib/features.ts`

- [ ] **Step 1: Replace hardcoded FEATURE_OPTIONS with shared constants**

Remove the `FEATURE_OPTIONS` array (lines 31-37). Add import:

```ts
import { getFeaturesByCategory } from "@/lib/features";
```

- [ ] **Step 2: Replace flat checkbox list with categorized collapsible sections**

Replace the Équipements section (lines 172-187) with:

```tsx
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">Équipements</label>
  <div className="space-y-3">
    {Object.entries(getFeaturesByCategory()).map(([category, items]) => (
      <FeatureCategoryGroup
        key={category}
        category={category}
        items={items}
        selected={filters.features}
        onToggle={toggleFeature}
      />
    ))}
  </div>
</div>
```

Add a `FeatureCategoryGroup` sub-component inside the file (before the main export):

```tsx
function FeatureCategoryGroup({
  category,
  items,
  selected,
  onToggle,
}: {
  category: string;
  items: { key: string; label: string }[];
  selected: string[];
  onToggle: (key: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const activeCount = items.filter((i) => selected.includes(i.key)).length;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <span>{category}</span>
        <span className="flex items-center gap-2">
          {activeCount > 0 && (
            <span className="bg-blue-100 text-blue-700 text-xs px-1.5 py-0.5 rounded-full">{activeCount}</span>
          )}
          <Icon icon={faChevronDown} className={`text-[10px] transition-transform ${open ? "rotate-180" : ""}`} />
        </span>
      </button>
      {open && (
        <div className="px-3 pb-3 space-y-1.5 border-t border-gray-100">
          {items.map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer py-1">
              <input
                type="checkbox"
                checked={selected.includes(key)}
                onChange={() => onToggle(key)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">{label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
```

Add the `Icon` and `faChevronDown` imports at the top:

```ts
import { Icon, faChevronDown } from "@/components/icons";
```

- [ ] **Step 3: Commit**

```bash
git add src/components/PropertyFilters.tsx
git commit -m "feat: expand property filters to show all amenities by category"
```

---

### Task 5: Update PropertyDetailClient with French labels

**Files:**
- Modify: `src/app/properties/[slug]/PropertyDetailClient.tsx` (lines 210-218)

**Interfaces:**
- Consumes: `getFeatureLabel` from `src/lib/features.ts`

- [ ] **Step 1: Import shared helper**

Add at top:
```ts
import { getFeatureLabel } from "@/lib/features";
```

- [ ] **Step 2: Update features display to use French labels**

Replace lines 213-216:
```tsx
{features.map((f) => (
  <span key={f} className="bg-blue-50 text-blue-800 text-sm px-3 py-1.5 rounded-full">{f}</span>
))}
```

With:
```tsx
{features.map((f) => (
  <span key={f} className="bg-blue-50 text-blue-800 text-sm px-3 py-1.5 rounded-full">{getFeatureLabel(f)}</span>
))}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/properties/[slug]/PropertyDetailClient.tsx
git commit -m "feat: display French labels for amenities on property detail page"
```

---

### Task 6: Create ImageLightbox component

**Files:**
- Create: `src/components/ImageLightbox.tsx`

**Interfaces:**
- Produces: `<ImageLightbox images selectedIndex onClose onNavigate />` component

- [ ] **Step 1: Create the lightbox component**

```tsx
"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { PropertyImage } from "@/types";

interface ImageLightboxProps {
  images: PropertyImage[];
  selectedIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageLightbox({ images, selectedIndex, onClose, onNavigate }: ImageLightboxProps) {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goNext = useCallback(() => {
    if (selectedIndex < images.length - 1) onNavigate(selectedIndex + 1);
  }, [selectedIndex, images.length, onNavigate]);

  const goPrev = useCallback(() => {
    if (selectedIndex > 0) onNavigate(selectedIndex - 1);
  }, [selectedIndex, onNavigate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goNext, goPrev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="Fermer"
      >
        <X className="size-5" />
      </button>

      {/* Previous arrow */}
      {selectedIndex > 0 && (
        <button
          onClick={goPrev}
          className="absolute left-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors hidden sm:flex"
          aria-label="Image précédente"
        >
          <ChevronLeft className="size-5" />
        </button>
      )}

      {/* Next arrow */}
      {selectedIndex < images.length - 1 && (
        <button
          onClick={goNext}
          className="absolute right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors hidden sm:flex"
          aria-label="Image suivante"
        >
          <ChevronRight className="size-5" />
        </button>
      )}

      {/* Image */}
      <div
        className="w-full h-full flex items-center justify-center p-4 sm:p-12"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images[selectedIndex] && (
          <Image
            src={images[selectedIndex].url}
            alt={images[selectedIndex].alt || `Image ${selectedIndex + 1}`}
            width={1200}
            height={800}
            unoptimized
            className="max-w-full max-h-[85vh] object-contain"
            priority
          />
        )}
      </div>

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium">
        {selectedIndex + 1} / {images.length}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify component compiles**

Run: `npx tsc --noEmit src/components/ImageLightbox.tsx`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/ImageLightbox.tsx
git commit -m "feat: add ImageLightbox component with keyboard/swipe navigation"
```

---

### Task 7: Integrate lightbox into ImageGallery

**Files:**
- Modify: `src/app/properties/[slug]/components/ImageGallery.tsx`

**Interfaces:**
- Consumes: `ImageLightbox` from `@/components/ImageLightbox`

- [ ] **Step 1: Add lightbox state and import**

Add import:
```ts
import ImageLightbox from "@/components/ImageLightbox";
```

Add state inside the component:
```ts
const [lightboxOpen, setLightboxOpen] = useState(false);
const [lightboxIndex, setLightboxIndex] = useState(0);

const openLightbox = (index: number) => {
  setLightboxIndex(index);
  setLightboxOpen(true);
};
```

Add `useState` to the React import:
```ts
import { useState } from "react";
```

- [ ] **Step 2: Make main image clickable**

Wrap the main image div with a button:
```tsx
<div
  className="relative h-[300px] md:h-[450px] rounded-xl overflow-hidden cursor-pointer"
  onClick={() => openLightbox(selectedIndex)}
>
```

- [ ] **Step 3: Add lightbox rendering at the end of the component**

Before the closing `</div>` of the component, add:
```tsx
{lightboxOpen && (
  <ImageLightbox
    images={images}
    selectedIndex={lightboxIndex}
    onClose={() => setLightboxOpen(false)}
    onNavigate={setLightboxIndex}
  />
)}
```

- [ ] **Step 4: Verify build**

Run: `npm run build 2>&1 | head -30`
Expected: No build errors

- [ ] **Step 5: Commit**

```bash
git add src/app/properties/[slug]/components/ImageGallery.tsx
git commit -m "feat: integrate lightbox into property image gallery"
```

---

### Task 8: Enhance mobile header

**Files:**
- Modify: `src/components/Header.tsx` (lines 282-367 mobile menu section)

**Interfaces:**
- Consumes: `useSettings()` for phone, email, social URLs

- [ ] **Step 1: Add wishlist link to extra nav links in mobile menu**

Add a wishlist link after the `extraNavLinks` section in the mobile menu (after line 335), before the language switcher:

```tsx
{/* Wishlist */}
<Link
  href="/villas/wishlist"
  onClick={() => setMobileOpen(false)}
  className="flex items-center gap-2 text-white text-sm font-semibold uppercase py-3 border-b border-white/10 hover:text-[#ffb000] transition-colors min-h-[44px]"
>
  <Icon icon={faHeart} className="text-[#ffb000] text-xs" />
  Sélection
</Link>
```

- [ ] **Step 2: Add social icons to mobile menu**

Add after the contact info section (after line 363), before the closing `</div>`:

```tsx
{/* Social Icons */}
<div className="flex items-center gap-3 mt-2">
  {settings.facebook && (
    <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#ffb000] hover:text-black transition-colors">
      <Icon icon={faFacebookF} className="text-sm" />
    </a>
  )}
  {settings.instagram && (
    <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#ffb000] hover:text-black transition-colors">
      <Icon icon={faInstagram} className="text-sm" />
    </a>
  )}
  {settings.linkedin && (
    <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#ffb000] hover:text-black transition-colors">
      <Icon icon={faLinkedinIn} className="text-sm" />
    </a>
  )}
</div>
```

- [ ] **Step 3: Add logo to top of mobile menu**

Add inside the mobile menu panel, before the Villas accordion (before line 286):

```tsx
{/* Mobile Logo */}
<div className="flex justify-center py-3 border-b border-white/10">
  <Image
    src={settings.logo_url || "/images/logo.png"}
    alt="StaysInMarrakech"
    width={120}
    height={40}
    priority
  />
</div>
```

- [ ] **Step 4: Add visual polish — animation and styling**

Replace the mobile menu container (line 284) opening tag:

From:
```tsx
<div className="lg:hidden bg-[#111] border-t border-white/10 max-h-[80vh] overflow-y-auto">
```

To:
```tsx
<div className="lg:hidden bg-[#111] border-t border-white/10 max-h-[80vh] overflow-y-auto shadow-2xl shadow-black/50 animate-in fade-in slide-in-from-top-2 duration-300">
```

Add `active:scale-[0.98]` to tappable items — update the extra nav links (line 332):

From:
```tsx
className="text-white text-sm font-semibold uppercase py-3 border-b border-white/10 hover:text-[#ffb000] transition-colors min-h-[44px] flex items-center"
```

To:
```tsx
className="text-white text-sm font-semibold uppercase py-3 border-b border-white/10 hover:text-[#ffb000] transition-colors min-h-[44px] flex items-center active:scale-[0.98]"
```

- [ ] **Step 5: Verify build**

Run: `npm run build 2>&1 | head -30`
Expected: No build errors

- [ ] **Step 6: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat: enhance mobile header with wishlist, social icons, logo, and polish"
```

---

### Task 9: Final verification

- [ ] **Step 1: Run full build**

Run: `npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 2: Run dev server and test manually**

Run: `npm run dev`
Test:
- Open mobile view → verify hamburger menu shows logo, wishlist, contact info, social icons
- Go to /properties → verify filters show all amenities grouped by category
- Click a property → verify clicking main image opens lightbox
- In lightbox → test arrow keys, escape, swipe (if on mobile)
- Go to /admin/properties/new → verify amenities section shows 50+ features grouped by category
- Go to /admin/properties/[id]/edit → verify same

- [ ] **Step 3: Run lint/typecheck if available**

Run: `npm run lint 2>&1 | head -20`
Expected: No errors

---

## Summary

| Task | Description | Files Changed |
|------|-------------|---------------|
| 1 | Create shared features constants | `src/lib/features.ts` (new) |
| 2 | Update admin new property form | `src/app/admin/properties/new/page.tsx` |
| 3 | Update admin edit property form | `src/app/admin/properties/[id]/edit/page.tsx` |
| 4 | Update PropertyFilters with all amenities | `src/components/PropertyFilters.tsx` |
| 5 | Display French labels on detail page | `src/app/properties/[slug]/PropertyDetailClient.tsx` |
| 6 | Create ImageLightbox component | `src/components/ImageLightbox.tsx` (new) |
| 7 | Integrate lightbox into gallery | `src/app/properties/[slug]/components/ImageGallery.tsx` |
| 8 | Enhance mobile header | `src/components/Header.tsx` |
| 9 | Final verification | — |
