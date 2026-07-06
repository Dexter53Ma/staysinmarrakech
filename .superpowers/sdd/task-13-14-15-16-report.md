# Tasks 13+14+15+16: i18n Utilities, Prisma Schema, SettingsContext, LanguageSwitcher

## Status: DONE

### Changes Made

**Task 13 — Shared Utilities**
- `src/types/index.ts`: Added `getTypeLabel()`, `getStatusLabel()` (locale-aware), updated `formatPrice()` to accept locale. Kept `TYPE_LABELS` and `STATUS_LABELS` as deprecated backward-compatible exports.
- `src/components/DateCalendarPicker.tsx`: Replaced hardcoded French month/day names with `useTranslations('dates')`. Uses `t('locale')` for `toLocaleDateString` formatting.
- `src/lib/validations.ts`: All schema functions now accept optional `locale` parameter. Static exports (French defaults) preserved for backward compatibility. Added `create*Schema()` factory functions for locale-aware usage.

**Task 14 — Prisma Schema**
- Added `_en` columns to: `SiteSetting.valueEn`, `Service.titleEn/descriptionEn/longDescriptionEn/metaDescriptionEn/featuresEn`, `Location.nameEn/descriptionEn`, `HeroSlide.titleEn/subtitleEn/buttonTextEn`, `StaticPage.titleEn/contentEn/metaDescEn`, `BlogPost.titleEn/excerptEn/contentEn`.
- No `prisma migrate dev` run — database not available locally.

**Task 15 — SettingsContext**
- Added `_en` variants to `SiteSettings` interface.
- Added `getLocalizedValue(valueFr, valueEn)` helper using `useLocale()`.
- Extended context value type to `SiteSettingsContextValue` with the helper.

**Task 16 — LanguageSwitcher**
- Created `src/components/LanguageSwitcher.tsx` as standalone dropdown component.
- Updated `src/components/Header.tsx` to import and use `<LanguageSwitcher />` instead of inline desktop language dropdown. Mobile language buttons left as-is (different UI pattern).

**Translation Updates**
- Added individual month/day keys and `locale` to `dates` namespace in both `messages/fr.json` and `messages/en.json`.

### Commits
- (Pending commit)

### Test Summary
- TypeScript compilation not verified (no build command available in context). All changes follow existing patterns.

### Concerns
- Prisma migration was not run (no DATABASE_URL). Migration SQL should be generated when deploying.
- The `langOpen` state in Header.tsx is now only used by the mobile language section — could be cleaned up in a future pass.
