# Design: Add English Translation (i18n) to StaysInMarrakech

## Overview

Add English language support to the StaysInMarrakech Next.js application using `next-intl`. The site currently has all UI text hardcoded in French across 50+ files with zero i18n infrastructure.

**Scope:** Public-facing pages only. Admin dashboard stays French-only.

## Architecture

### Routing

- **Pattern:** `/[locale]/...` URL prefix
- **Locales:** `fr` (default), `en`
- **Default behavior:** `/` redirects to `/fr/` (or `/en/` based on Accept-Language)
- **Middleware:** `next-intl` middleware handles locale detection, redirects, and 404s

### File Structure

```
src/
  i18n/
    routing.ts          # Locale config (locales, defaultLocale, pathnames)
    request.ts          # Server-side i18n config (getRequestConfig)
    middleware.ts        # Re-exports next-intl middleware
    navigation.ts       # Localized routing helpers (Link, redirect, usePathname)
  messages/
    fr.json             # French translations
    en.json             # English translations
  app/
    [locale]/
      layout.tsx        # Root layout (was src/app/layout.tsx)
      page.tsx          # Homepage
      properties/
        page.tsx
        [slug]/
          page.tsx
      contactez-nous/   # Same URL path for both languages
        page.tsx
      ...etc
    admin/              # Stays outside [locale] - French only
    api/                # Stays outside [locale]
next.config.ts          # Updated with createNextIntlPlugin
```

### Key Files to Create

| File | Purpose |
|------|---------|
| `src/i18n/routing.ts` | Define locales, defaultLocale, pathnames map |
| `src/i18n/request.ts` | `getRequestConfig` for server components |
| `src/i18n/middleware.ts` | Middleware wrapper from next-intl |
| `src/i18n/navigation.ts` | `createNavigation` helpers (Link, redirect, usePathname, useRouter) |
| `messages/fr.json` | All French translation strings |
| `messages/en.json` | All English translation strings |
| `src/app/[locale]/layout.tsx` | Root layout (moved from `src/app/layout.tsx`) |
| `src/components/LanguageSwitcher.tsx` | Replaces current non-functional language dropdown |

### Translation Namespaces

Organize translations into logical namespaces to keep files manageable:

```json
{
  "common": { "back": "Retour", "loading": "Chargement...", "error": "Erreur..." },
  "navigation": { "location": "Location", "vente": "Vente", "agence": "L'agence" },
  "homepage": { "hero_title": "...", "hero_subtitle": "..." },
  "properties": { "filters": "...", "bedrooms": "Chambres" },
  "services": { "title": "Nos Services", "book": "Reserver" },
  "contact": { "title": "Contactez-nous", "send": "Envoyer" },
  "legal": { "mentions_legales": "..." },
  "seo": { "homepage_title": "...", "homepage_desc": "..." },
  "features": { "pool": "Piscine", "garden": "Jardin" },
  "faqs": { "q1": "...", "a1": "..." },
  "validation": { "name_required": "Le nom est requis" },
  "dates": { "months": [...], "days": [...] }
}
```

## Components Migration

### Phase 1: Foundation (i18n setup + layout)

1. Install `next-intl`
2. Create `src/i18n/` config files
3. Create `messages/fr.json` and `messages/en.json` with initial strings
4. Move `src/app/layout.tsx` → `src/app/[locale]/layout.tsx`
5. Update `next.config.ts` with `createNextIntlPlugin`
6. Create `src/i18n/middleware.ts`
7. Update `html lang` to use dynamic locale

### Phase 2: Navigation & Header/Footer

- **Header.tsx** — All nav labels, language switcher, currency labels, CTA buttons
- **Footer.tsx** — Link labels, section headings, copyright text
- **LanguageSwitcher.tsx** — New component that switches locale via `next-intl` navigation

### Phase 3: Homepage Components

- **HeroWithSearch.tsx** — Search form labels, placeholders
- **HomepageContent.tsx** — Long-form SEO content (~90 lines)
- **VillaCarousel.tsx** — Property card labels
- **IconsSection.tsx** — Stats labels
- **TestimonialsSection.tsx** — Section heading, descriptions
- **BlogSection.tsx** — Section heading, "Voir tous les articles"
- **Newsletter.tsx** — Form labels, success/error messages
- **EventsSection.tsx**, **ActivitiesCarousel.tsx**, **LocationSection.tsx**, **ShortTermRental.tsx**
- **QuartiersCarousel.tsx**

### Phase 4: Property Pages

- **PropertiesPageClient.tsx** — Title, SEO content
- **PropertyGrid.tsx** — "Aucune propriete trouvée", card labels
- **PropertyFilters.tsx** — All filter labels, sort options
- **PropertyDetailClient.tsx** — Booking flow, form labels, descriptions
- **PropertyFeatures.tsx** — Feature labels
- **AvailabilityCalendar.tsx** — Day/month names, status labels
- **SimilarPropertiesGrid.tsx** — "Proprietes similaires"

### Phase 5: Location & Service Pages

- **Location pages** (palmeraie, gueliz, targa, amelkis, route-ourika) — Full page content
- **Service pages** (service/page.tsx, service/[slug]/page.tsx) — Breadcrumbs, CTAs
- **ServiceDetail.tsx** — Massive file (~600 lines) with all service descriptions

### Phase 6: Contact, Legal, Blog, Misc

- **Contact page** — Form labels, validation messages, subject options
- **Mentions legales page** — Full legal content
- **Politique de confidentialite page** — Full privacy content
- **Blog page** — Metadata, empty state
- **Testimonials page** — Filter labels, empty state
- **Agence page** — Team bios
- **Error/Loading/Not-found pages** — Error messages

### Phase 7: Shared Utilities

- **types/index.ts** — `TYPE_LABELS`, `STATUS_LABELS`, `formatPrice` locale
- **lib/faqs.ts** — FAQ content
- **lib/features.ts** — Feature labels (~60 items), category names
- **lib/validations.ts** — Zod error messages
- **components/DateCalendarPicker.tsx** — Month/day names (use `date-fns/locale`)
- **components/PriceDisplay.tsx** — Number formatting locale

### Phase 8: Database Content

**Schema changes (Prisma):**

```prisma
model SiteSetting {
  id        String   @id @default(cuid())
  key       String   @unique
  value     String?  @db.Text    # French (existing)
  valueEn   String?  @db.Text @map("value_en")  # English
  updatedAt DateTime @updatedAt @map("updated_at")
  @@map("site_settings")
}

model Service {
  # ... existing fields
  titleEn         String?  @map("title_en")
  descriptionEn   String?  @db.Text @map("description_en")
  longDescriptionEn String? @db.Text @map("long_description_en")
  metaDescriptionEn String? @db.Text @map("meta_description_en")
  featuresEn      String?  @db.Text @map("features_en")
  # ...
}

model Location {
  # ... existing fields
  nameEn          String?  @map("name_en")
  descriptionEn   String?  @db.Text @map("description_en")
  # ...
}

model HeroSlide {
  # ... existing fields
  titleEn         String?  @map("title_en")
  subtitleEn      String?  @map("subtitle_en")
  buttonTextEn    String?  @map("button_text_en")
  # ...
}

model StaticPage {
  # ... existing fields
  titleEn         String?  @map("title_en")
  contentEn       String?  @db.Text @map("content_en")
  metaDescEn      String?  @map("meta_desc_en")
  # ...
}

model BlogPost {
  # ... existing fields
  titleEn         String?  @map("title_en")
  excerptEn       String?  @map("excerpt_en")
  contentEn       String?  @db.Text @map("content_en")
  # ...
}
```

**Migration strategy:**
1. Add `_en` columns to existing tables
2. Existing French data stays in original columns (no renames needed)
3. English translations populated via seed script or admin panel
4. Components read `locale === 'en' ? row.titleEn ?? row.title : row.title`

### Phase 9: SEO & Metadata

- All `metadata` exports become functions that accept `params.locale`
- `lang` attribute on `<html>` becomes dynamic
- `alternates.languages` updated to include both `fr` and `en`
- OpenGraph `locale` becomes dynamic (`fr_MA` / `en_US`)
- JSON-LD schema `inLanguage` becomes dynamic
- `hreflang` tags added for both languages

### Phase 10: Admin Pages (No Change)

- Admin pages stay at `/admin/...` outside `[locale]`
- All admin UI remains French-only
- Admin can edit EN content via new `_en` fields in forms

## Translation Approach

### String Extraction Process

For each component:
1. Identify all hardcoded French strings
2. Create translation key (e.g., `"navigation.location"`)
3. Add French value to `messages/fr.json`
4. Add English value to `messages/en.json`
5. Replace hardcoded string with `t("navigation.location")`
6. For client components: `const t = useTranslations("navigation")`
7. For server components: `const t = await getTranslations("navigation")`

### English Translation Quality

- Professional, SEO-optimized English translations
- Maintain Marrakech/Morocco cultural context
- Use international English (not region-specific)
- Preserve brand name "StaysInMarrakech" in both languages
- Keep French proper nouns (Marrakech, Palmeraie, etc.) unchanged

## Files Modified (Complete List)

### New Files (~5)
- `src/i18n/routing.ts`
- `src/i18n/request.ts`
- `src/i18n/middleware.ts`
- `src/i18n/navigation.ts`
- `messages/fr.json`
- `messages/en.json`
- `src/components/LanguageSwitcher.tsx`

### Modified Files (~50)
**Layout & Config:**
- `next.config.ts` — Add `createNextIntlPlugin`
- `src/app/layout.tsx` → `src/app/[locale]/layout.tsx`

**Components (20+):**
- `src/components/Header.tsx`
- `src/components/Footer.tsx`
- `src/components/HeroWithSearch.tsx`
- `src/components/HomepageContent.tsx`
- `src/components/VillaCarousel.tsx`
- `src/components/IconsSection.tsx`
- `src/components/TestimonialsSection.tsx`
- `src/components/BlogSection.tsx`
- `src/components/Newsletter.tsx`
- `src/components/EventsSection.tsx`
- `src/components/ActivitiesCarousel.tsx`
- `src/components/LocationSection.tsx`
- `src/components/ShortTermRental.tsx`
- `src/components/QuartiersCarousel.tsx`
- `src/components/FloatingContact.tsx`
- `src/components/BackToTop.tsx`
- `src/components/DateCalendarPicker.tsx`
- `src/components/PropertyGrid.tsx`
- `src/components/PropertyFilters.tsx`
- `src/components/PriceDisplay.tsx`
- `src/components/ServiceDetail.tsx`
- `src/components/ServiceForm.tsx`

**Pages (15+):**
- `src/app/page.tsx` → `src/app/[locale]/page.tsx`
- `src/app/properties/page.tsx`
- `src/app/properties/PropertiesPageClient.tsx`
- `src/app/properties/[slug]/page.tsx`
- `src/app/properties/[slug]/PropertyDetailClient.tsx`
- `src/app/properties/[slug]/components/*.tsx` (4 files)
- `src/app/locations/*/page.tsx` (5 files)
- `src/app/marrakech-villas/*/page.tsx` (4 files)
- `src/app/service/page.tsx`
- `src/app/service/[slug]/page.tsx`
- `src/app/contactez-nous/page.tsx`
- `src/app/agence/page.tsx`
- `src/app/blog/page.tsx`
- `src/app/testimonials/page.tsx`
- `src/app/mentions-legales/page.tsx`
- `src/app/politique-de-confidentialite/page.tsx`
- `src/app/error.tsx`, `loading.tsx`, `not-found.tsx`

**Lib & Types:**
- `src/types/index.ts`
- `src/lib/faqs.ts`
- `src/lib/features.ts`
- `src/lib/validations.ts`

**Prisma:**
- `prisma/schema.prisma` — Add `_en` columns to 6 models
- Prisma migration file

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| ~50 files to modify | Phased approach, test each phase before moving on |
| ServiceDetail.tsx has ~600 lines of French | Extract to translation keys systematically |
| URL paths stay the same | No SEO impact from URL changes |
| DB schema changes | Additive only (new columns), no data loss |
| French URLs in browser bar | Translated URLs (same path, translated UI) |
| Build size increase from 2 language bundles | Use `next-intl` tree-shaking, lazy-load non-default locale |

## Success Criteria

- [ ] `/en/` serves full English version of every public page
- [ ] `/fr/` serves full French version (identical to current behavior)
- [ ] Language switcher works and persists selection
- [ ] SEO metadata is correct for both languages
- [ ] `<html lang>` attribute is dynamic
- [ ] `hreflang` tags present for both locales
- [ ] Admin pages remain French-only at `/admin/...`
- [ ] No regressions in existing French functionality
- [ ] Build passes, no TypeScript errors
