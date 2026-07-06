# Task 4: Migrate Header component to use translations

## Status: DONE_WITH_CONCERNS

## Commit
- `2454217` feat(i18n): migrate Header component to use translations

## Changes Made
- Replaced `import Link from 'next/link'` with `import {Link, useRouter, usePathname} from '@/i18n/navigation'`
- Added `import {useTranslations, useLocale} from 'next-intl'`
- Added `const t = useTranslations('navigation')`, `const tCommon = useTranslations('common')`, `const locale = useLocale()`, `const router = useRouter()`, `const pathname = usePathname()`
- Moved `villaLinks`, `extraNavLinks`, and `languages` arrays inside the component (after hooks) since they now use `t()` calls
- Replaced all hardcoded French strings with translation key calls:
  - `"Sélection"` → `t('selection')`
  - `"FR"` → `locale.toUpperCase()`
  - `"Voir tous les services"` → `t('allServices')`
  - `"Réserver"` → `t('book')`
  - `"Voir tout"` → `tCommon('viewAll')`
  - `"Réserver maintenant"` → `t('bookNow')`
  - `"Langue"` → `tCommon('language')`
  - `"Devise"` → `tCommon('currency')`
- Language switcher now uses `router.push(pathname, {locale: l.code})` for locale-aware switching
- Languages array changed from `["Français", "English"]` to `[{code: 'fr', label: 'Français'}, {code: 'en', label: 'English'}]`

## Test Summary
- TypeScript compilation (`tsc --noEmit`): PASS — zero errors

## Concerns

**Build fails during prerendering** — `next build` fails on pages outside `[locale]` (e.g., `/agence`, `/testimonials`, `/blog`, `/contactez-nous`, `/service`, etc.) because they don't have the `NextIntlClientProvider` context. These pages existed at the root level before the i18n migration and used the Header without i18n hooks. Now that Header uses `useTranslations`/`useLocale`, prerendering these pages without the provider throws an error.

This is a **pre-existing architectural issue** — the app needs to either:
1. Move all public-facing pages into `src/app/[locale]/` (recommended), or
2. Add a root-level `NextIntlClientProvider` wrapper, or
3. Mark these pages as dynamic (no static prerendering)

This should be addressed in a follow-up task as part of the full i18n migration.
