# Task 3 Report: Move layout and homepage to [locale] dynamic segment

## Status: DONE

## Changes Made
1. Created `src/app/[locale]/layout.tsx` with next-intl integration (NextIntlClientProvider, generateMetadata, etc.)
2. Moved `src/app/page.tsx` to `src/app/[locale]/page.tsx`
3. Deleted `src/app/layout.tsx` (root layout)
4. Deleted `src/app/page.tsx` (root page)
5. Deleted `src/app/[slug]/page.tsx` (legacy redirect that conflicted with [locale])

## Commits
- `cac2b37` feat(i18n): move layout and homepage to [locale] dynamic segment

## Build Verification
- Build passes successfully
- Route `/[locale]` is now registered as a dynamic route
- All admin pages remain outside [locale] (French only)

## Concerns
- The legacy `[slug]` route was removed to avoid route ambiguity with `[locale]`. This route was a redirect to `/properties/[slug]`. If any external links point to `/{slug}` directly, they will now 404 instead of redirecting. Consider adding middleware to handle these redirects if needed.
- The new layout uses `useMessages()` which requires next-intl message files to exist. Ensure `src/messages/fr.json` and `src/messages/en.json` are properly configured.

## Test Summary
- Build: PASS (38 pages generated, no errors)
