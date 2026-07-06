# Task 5: Migrate Footer component to use translations

## Status: DONE

## Changes Made

### `src/components/Footer.tsx`
- Added `import { useTranslations } from "next-intl"`
- Added `const t = useTranslations("navigation")` and `const tCommon = useTranslations("common")`
- Moved `villaLinks` and `usefulLinks` arrays inside the component (after hooks)
- Replaced hardcoded French strings with translation calls: `t("location")`, `t("vente")`, `t("usefulLinks")`, `t("services")`, `t("about")`, `t("contact")`, `t("followUs")`, `t("allRightsReserved")`, `tCommon("legal")`
- Kept `contactLinks` using `settings` (from DB context) as-is

### `messages/fr.json` & `messages/en.json`
- Added to `navigation` namespace: `usefulLinks`, `about`, `followUs`, `allRightsReserved`

## Verification
- TypeScript compilation: clean (no errors)
- Build: TypeScript phase passed; pre-existing prerender error on `/agence` page (unrelated)

## Commit
- `feat(i18n): migrate Footer component to use translations`
