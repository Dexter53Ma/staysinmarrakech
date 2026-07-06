# Task 8+9+10+11: Migrate Property, Location, and Service Pages to Translations

## Status: DONE

## Commits
- No commits yet (user asked to commit with specific message)

## Files Modified

### Part A: Property Pages (Tasks 8+9)
1. **`src/components/PriceDisplay.tsx`** — Added `useLocale`, locale-aware `toLocaleString`
2. **`src/components/PropertyGrid.tsx`** — Added `useTranslations`, `useLocale`; replaced "Aucune propriété trouvée", "propriétés trouvées", "chambres", "sdb", "/nuit", "Aucune image"
3. **`src/components/PropertyFilters.tsx`** — Added `useTranslations`; replaced ALL filter labels (Filtres, Tous, Villa, Riad, etc.), sort options, Budget, Chambres, Quartier, Équipements, Trier par, Réinitialiser, Appliquer, Ouvrir les filtres
4. **`src/app/[locale]/properties/PropertiesPageClient.tsx`** — Added `useTranslations`; replaced "Nos propriétés", "Découvrez notre sélection...", SEO paragraph
5. **`src/app/[locale]/properties/[slug]/PropertyDetailClient.tsx`** — Added `useTranslations`, `useLocale`; replaced ALL booking flow labels (Retour, vues, Description, Équipements, Prix de vente, Contacter, nuit(s), Total, dates, form fields, status messages, fees, navigation tabs, error messages)
6. **`src/app/[locale]/properties/[slug]/components/PropertyFeatures.tsx`** — Converted to client component; added `useTranslations`; replaced feature labels (Chambres, Salles de bain, Garages, etc.)
7. **`src/app/[locale]/properties/[slug]/components/SimilarPropertiesGrid.tsx`** — Added `useTranslations`, `useLocale`; replaced "Propriétés similaires", "ch.", "sdb", locale-aware price formatting
8. **`src/app/[locale]/properties/[slug]/components/AvailabilityCalendar.tsx`** — Added `useTranslations`, `useLocale`; replaced status labels (Disponible, Réservé, Aujourd'hui, Légende, etc.); locale-aware calendar via `date-fns/locale`
9. **`src/app/[locale]/properties/[slug]/components/PropertyTestimonials.tsx`** — Converted to client component; added `useTranslations`; replaced "Avis"
10. **`src/app/[locale]/properties/[slug]/page.tsx`** — Updated metadata to use `getTranslations`

### Part B: Location Pages (Task 10)
11. **`src/app/[locale]/locations/palmeraie/page.tsx`** — Migrated to `getTranslations` with `locations.palmeraie` namespace
12. **`src/app/[locale]/locations/gueliz/page.tsx`** — Migrated to `getTranslations` with `locations.gueliz` namespace
13. **`src/app/[locale]/locations/targa/page.tsx`** — Migrated to `getTranslations` with `locations.targa` namespace
14. **`src/app/[locale]/locations/amelkis/page.tsx`** — Migrated to `getTranslations` with `locations.amelkis` namespace
15. **`src/app/[locale]/locations/route-ourika/page.tsx`** — Migrated to `getTranslations` with `locations.routeOurika` namespace

### Part C: Service Pages (Task 11)
16. **`src/app/[locale]/service/page.tsx`** — Migrated to `getTranslations` with `services` namespace
17. **`src/app/[locale]/service/[slug]/page.tsx`** — Migrated to `getTranslations` with `services` namespace

### Translation Files
18. **`messages/en.json`** — Added `seoTitle`, `seoP1`, `seoP2`, `seoP3` keys to `properties` namespace
19. **`messages/fr.json`** — Added `seoTitle`, `seoP1`, `seoP2`, `seoP3` keys to `properties` namespace

## Test Summary
- `npx next build` passes successfully with all pages compiled and generated

## Concerns
- `ServiceDetail.tsx` component is no longer imported anywhere but was left as-is (dead code). Could be cleaned up in a future task.
- Location pages use `t.raw("bullets")` and `t.raw("nearbyItems")` for array translations — this is the standard next-intl pattern for arrays.
- The PropertyDetailClient `toLocaleString` calls were all updated to use locale-aware formatting via `localeStr` variable.
