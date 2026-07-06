# Task 6+7 Report: Move pages to [locale] and migrate homepage components

## Status: DONE

## What was done

### Part A: Moved all pages into `[locale]`

Moved these directories from `src/app/` to `src/app/[locale]/`:
- `properties/` (with `[slug]/page.tsx`)
- `contactez-nous/`
- `agence/`
- `blog/` (with `[slug]/page.tsx`)
- `testimonials/`
- `mentions-legales/`
- `politique-de-confidentialite/`
- `locations/` (with palmeraie, gueliz, targa, amelkis, route-ourika)
- `marrakech-villas/` (with location-villa-marrakech, vente-villa-marrakech, villa-de-luxe, villa-exception)
- `service/` (with `[slug]/page.tsx`)
- `villas/` (wishlist page)
- `auteurs/` (author page)

Moved root-level files:
- `src/app/error.tsx` → `src/app/[locale]/error.tsx`
- `src/app/loading.tsx` → `src/app/[locale]/loading.tsx`
- `src/app/not-found.tsx` → `src/app/[locale]/not-found.tsx`

**NOT moved:** `admin/`, `api/` — these stay outside `[locale]` as intended.

### Part B: Migrated 14 homepage components to use translations

Components updated:
1. **HeroWithSearch.tsx** — All form labels, hero text, search button
2. **VillaCarousel.tsx** — Section title/subtitle, feature labels, price format, navigation
3. **IconsSection.tsx** — Stats card titles
4. **LocationSection.tsx** — "Découvrez Marrakech" badge, "Voir plus" link
5. **ShortTermRental.tsx** — "Courte durée" badge, "Contactez-nous" link
6. **QuartiersCarousel.tsx** — Section title/subtitle, navigation
7. **EventsSection.tsx** — "Événements", "Vacances", "Contactez-nous" labels
8. **ActivitiesCarousel.tsx** — Section title, navigation
9. **Newsletter.tsx** — Title, subtitle, email placeholder, subscribe text, messages
10. **BlogSection.tsx** — Title, subtitle, "Voir tous les articles"
11. **TestimonialsSection.tsx** — "Avis clients", title, description
12. **HomepageContent.tsx** — Full long-form SEO content using `homepage.content` namespace
13. **FloatingContact.tsx** — "Appelez-nous" label
14. **BackToTop.tsx** — "Retour en haut" aria-label

For each component:
- Added `import {useTranslations} from 'next-intl';`
- Replaced `import Link from 'next/link'` with `import {Link} from '@/i18n/navigation';` where applicable
- Added `const t = useTranslations('homepage');` (and other namespaces as needed)
- Replaced all hardcoded French strings with `t('keyName')`

### Moved error/loading/not-found also use translations:
- `error.tsx` — Uses `common.error`, `common.errorRetry`, `common.retry`
- `loading.tsx` — Uses `common.loading`
- `not-found.tsx` — Uses `common.notFound`, `common.notFoundDesc`, `common.home`

## Build verification

`npx next build` passes successfully. All 27 pages generate correctly:
- All public pages are now under `/[locale]/...`
- Admin pages remain at `/admin/...`
- API routes remain at `/api/...`

## Commit

To be created with message: `feat(i18n): move all pages to [locale] and migrate homepage components`

## Report file

`.superpowers/sdd/task-6-7-report.md`
