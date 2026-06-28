# Visual SEO Audit Report — staysinmarrakech.netlify.app

**Date:** June 28, 2026  
**URL:** https://staysinmarrakech.netlify.app  
**Auditor:** Visual SEO Analyst (Playwright)

---

## Executive Summary

The site is a luxury villa rental agency for Marrakech. While the overall design is clean and professional, there are **several critical and high-severity issues** impacting mobile usability, SEO, Core Web Vitals (CLS), and accessibility. The most alarming issue is a **massive horizontal overflow** on the Activities section where **23 of 25 service links are positioned off-screen** on mobile.

**Overall Score: 55/100**

---

## Screenshots Captured

| Viewport | File | Description |
|----------|------|-------------|
| Desktop 1440×900 | `screenshots/desktop-1440x900.png` | Full-page desktop screenshot |
| Desktop Above-Fold | `screenshots/desktop-above-fold-1440x900.png` | Above-the-fold desktop |
| Mobile 375×812 | `screenshots/mobile-375x812.png` | Full-page mobile screenshot |
| Mobile Above-Fold | `screenshots/mobile-above-fold-375x812.png` | Above-the-fold mobile |

---

## CRITICAL Issues

### 1. Activities Section — 23/25 Links Off-Screen on Mobile
| Field | Value |
|-------|-------|
| **Severity** | 🔴 CRITICAL |
| **Impact** | UX, SEO crawlability, mobile usability |
| **Location** | "Activités marrakech à découvrir" section |

**Finding:** The Activities carousel contains 25 service links (Transfert Aéroport, Location de Voitures, Guide Touristique, etc.) laid out in a horizontal flex row with `overflow-x: visible`. On mobile (375px viewport), **23 of 25 links are positioned off-screen** (starting at x=447px and extending to x=5211px). Only the first 2 links are visible. Users cannot scroll to them because the container uses `overflow: visible` instead of `overflow-x: scroll` or wrapping.

**Recommendation:**
- Convert to a CSS grid with `grid-template-columns: repeat(2, 1fr)` on mobile
- Or add `overflow-x: auto` with `flex-wrap: nowrap` and visual scroll indicators
- Or use a horizontal scrollable carousel with snap points
- This is also a Google Mobile Usability test failure

---

### 2. API Error — 500 Server Response
| Field | Value |
|-------|-------|
| **Severity** | 🔴 CRITICAL |
| **Impact** | Dynamic content broken, potential empty sections |

**Finding:** Console error: `Failed to load resource: the server responded with a status of 500 () @ /api/properties?limit=6`. The properties API endpoint is returning a 500 error. While the page renders, this likely means the dynamically-loaded villa listings section is broken or showing fallback content.

**Recommendation:**
- Investigate and fix the `/api/properties` endpoint
- Add error handling / fallback UI for when the API is unavailable
- Monitor uptime for this critical data endpoint

---

## HIGH Severity Issues

### 3. 38 Images Missing Explicit Width/Height Dimensions (CLS Risk)
| Field | Value |
|-------|-------|
| **Severity** | 🟠 HIGH |
| **Impact** | Cumulative Layout Shift (CLS), Core Web Vitals |
| **Location** | 38 out of 42 images site-wide |

**Finding:** 38 of 42 images lack explicit `width` and `height` HTML attributes. While 40 images do use `loading="lazy"` (good), the missing dimensions mean the browser cannot reserve space before images load, causing layout shifts — a direct Core Web Vitals penalty.

**Recommendation:**
- Add explicit `width` and `height` attributes to all `<img>` tags
- Use `aspect-ratio` CSS as a fallback for responsive images
- This directly impacts your CLS score in Google PageSpeed / Lighthouse

---

### 4. H1 Font Size Too Small on Desktop (24px)
| Field | Value |
|-------|-------|
| **Severity** | 🟠 HIGH |
| **Impact** | Visual hierarchy, SEO signal, readability |
| **Location** | Hero section |

**Finding:** The H1 heading "Location de villas de luxe à Marrakech" is only **24px on desktop** (1440px viewport) and also **24px on mobile** (375px). This is:
- Too small for an H1 on desktop (should be 36-48px+)
- Indistinguishable from H2 sizes (20-26px)
- Weakens the visual hierarchy signal for both users and crawlers

**Recommendation:**
- Desktop: Increase H1 to at least 40-48px
- Mobile: Keep at 28-32px minimum
- Ensure clear size differentiation: H1 > H2 > H3 > H4

---

### 5. H3 Stats Section — Font Size 12px (Too Small)
| Field | Value |
|-------|-------|
| **Severity** | 🟠 HIGH |
| **Impact** | Readability, accessibility |
| **Location** | Stats bar below hero (Expérience, Base clients, etc.) |

**Finding:** All 5 stat headings (Expérience, Base clients, Qualité villas, Services intégrés, Présence sur place) render at **12px** with **16px line-height**. The stat values (2014, 1000+, etc.) are also very small. This fails WCAG readability guidelines and is nearly illegible on mobile.

**Recommendation:**
- Increase stat heading font size to at least 16px on mobile, 18-20px on desktop
- Increase stat value font size to at least 20px on mobile, 24-28px on desktop
- Add proper semantic markup — the "2014" value has extraneous quote marks (`"2014"`)

---

### 6. 63 Small Tap Targets Below 44px Threshold
| Field | Value |
|-------|-------|
| **Severity** | 🟠 HIGH |
| **Impact** | Mobile usability, accessibility (WCAG 2.5.8) |
| **Location** | Throughout the page |

**Finding:** 63 interactive elements are below the minimum 44×44px tap target size:
- **Carousel slide indicators:** 6×6px (e.g., "Slide 1", "Slide 2")
- **+/- buttons on guest selector:** 32×32px
- **Social media icons in header:** 13×13px (Facebook, Instagram, LinkedIn)
- **Social media icons in footer:** 36×36px (just below threshold)
- **Footer links:** 25+ links at only 21px height
- **Arrow "scroll down" icon:** 30×19px

**Recommendation:**
- All interactive elements must be at least 44×44px (Apple) / 48×48px (Google/Material)
- Add padding/margin to increase tap area without changing visual size
- Increase social icon hit areas to 48×48px with padding
- Carousel dots should be at least 44px tap targets (use padding)

---

### 7. Duplicate Copyright Text
| Field | Value |
|-------|-------|
| **Severity** | 🟠 HIGH |
| **Impact** | Content quality, professionalism |
| **Location** | Footer |

**Finding:** The copyright text reads: `© 2026 © 2026 Villa Premium. Tous droits réservés.` — "© 2026" appears twice, indicating a template bug.

**Recommendation:**
- Fix the template to render the copyright line only once
- Check for duplicate i18n/translation keys

---

## MEDIUM Severity Issues

### 8. Heading Hierarchy Issues
| Field | Value |
|-------|-------|
| **Severity** | 🟡 MEDIUM |
| **Impact** | SEO structure, screen reader navigation, content hierarchy |
| **Location** | Throughout page |

**Finding:**
- **10 H2 headings** on the homepage — excessive; dilutes heading signals
- H2 headings are inconsistent in size (20px, 24px, 26px) without clear hierarchy
- H3 headings jump between 12px (stats) and 18-20px (content)
- The "staysinmarrakech" brand name appears in an H2 — should not be a heading
- Several H2s are used for section labels that should be H3 or styled divs

**Recommendation:**
- Reduce to 5-7 meaningful H2s per page
- Ensure consistent sizing: H1 (40px+) > H2 (28-32px) > H3 (22-24px) > H4 (18-20px)
- Use heading tags only for actual section headings, not decorative text

---

### 9. Search Form Stacked Vertically on Mobile (Search Button at Bottom)
| Field | Value |
|-------|-------|
| **Severity** | 🟡 MEDIUM |
| **Impact** | UX, conversion rate |
| **Location** | Hero search widget on mobile |

**Finding:** The search form (Destination, Arrivée, Départ, Voyageurs, Rechercher) stacks vertically on mobile, requiring significant scrolling to reach the CTA. The "Rechercher" button is at y=592px (below the fold on a 812px viewport). Users must scroll past 4 input fields before reaching the search button.

**Recommendation:**
- Group date fields (Arrivée + Départ) side-by-side on mobile
- Make the search button sticky at the bottom of the form
- Or restructure to a 2-column layout on mobile

---

### 10. Stats Section — "2014" Wrapped in Quote Marks
| Field | Value |
|-------|-------|
| **Severity** | 🟡 MEDIUM |
| **Impact** | Content accuracy, visual consistency |
| **Location** | Stats bar |

**Finding:** The "Expérience" stat displays as `"2014"` with visible double-quote characters instead of just `2014`. This appears to be a data/template error where quotes were included in the content.

**Recommendation:**
- Remove quote marks from the stat value
- Store/display as `Depuis 2014` or simply `2014`

---

### 11. "À propos" Footer Section — Insufficient Content
| Field | Value |
|-------|-------|
| **Severity** | 🟡 MEDIUM |
| **Impact** | User trust, internal linking |
| **Location** | Footer |

**Finding:** The "À propos" footer section contains only one line: "Location de villas de luxe et de prestige à Marrakech. Service de conciergerie dédié pour vous." This is thin content that could be expanded with a brief company description, years of experience, and a CTA link.

**Recommendation:**
- Expand the "À propos" section with key trust signals
- Add a "Read more about us" link to the /agence page

---

### 12. Inconsistent Section Label — "Services & activités" (Footer)
| Field | Value |
|-------|-------|
| **Severity** | 🟡 MEDIUM |
| **Impact** | Content organization |
| **Location** | Footer |

**Finding:** On desktop, the "Services & activités" footer heading is present but the column appears empty (no links rendered beneath it), while on mobile the same section renders 50+ service links. This inconsistency suggests a rendering bug on desktop.

**Recommendation:**
- Ensure the Services & activités footer column renders correctly on all viewports
- Verify CSS media queries aren't hiding desktop content

---

### 13. "Conciergerie 24h/24" and Others Overlapping in Activity Labels
| Field | Value |
|-------|-------|
| **Severity** | 🟡 MEDIUM |
| **Impact** | Readability, UX |
| **Location** | Activities grid labels |

**Finding:** Some activity labels wrap to 2 lines (e.g., "Traiteur & Événementiel", "Réservation Restaurant", "Photographe Professionnel", "Service VIP & Personnalisé", "Investissement Immobilier") making the label heights inconsistent at 42px vs 21px for single-line labels.

**Recommendation:**
- Use `text-overflow: ellipsis` or shorten labels
- Ensure consistent card heights in the grid

---

## LOW Severity Issues

### 14. Meta Description Length
| Field | Value |
|-------|-------|
| **Severity** | 🔵 LOW |
| **Impact** | SERP click-through rate |
| **Location** | `<head>` |

**Finding:** The meta description is ~210 characters, which is longer than the recommended 155-160 character limit for Google SERPs. It will likely be truncated in search results.

**Recommendation:**
- Condense the meta description to 150-160 characters
- Front-load the most important keywords

---

### 15. Image Alt Text Quality
| Field | Value |
|-------|-------|
| **Severity** | 🔵 LOW |
| **Impact** | Image SEO, accessibility |
| **Location** | All 42 images |

**Finding:** All 42 images have alt text (good!), and 40 of 42 use lazy loading. However, many alt texts are generic or repetitive. For example, star rating icons all share the same alt text pattern. Social media icon images use empty or generic alt text.

**Recommendation:**
- Ensure decorative images use `alt=""` (empty) and `aria-hidden="true"`
- Make icon alt texts more descriptive for screen readers
- Optimize hero images with keyword-rich alt text

---

### 16. Footer Link Density — Many Links at 21px Height
| Field | Value |
|-------|-------|
| **Severity** | 🔵 LOW |
| **Impact** | Accessibility, tap target compliance |
| **Location** | Footer |

**Finding:** 25+ footer links render at only 21px height. While the link spacing is reasonable for desktop, these are below the 44px tap target minimum on mobile. Additionally, the footer has an extremely high link count (50+ on mobile) which may dilute link equity.

**Recommendation:**
- Add vertical padding to footer links to meet 44px tap target minimum
- Consider consolidating similar footer links
- Add `rel="nofollow"` to non-essential footer links if appropriate

---

### 17. Copyright Year Already Stated as 2026
| Field | Value |
|-------|-------|
| **Severity** | 🔵 LOW |
| **Impact** | Content freshness signal |
| **Location** | Footer |

**Finding:** The copyright reads "© 2026 © 2026 Villa Premium" — while the year is current, the duplicate text makes it look like a bug.

**Recommendation:**
- Fix the duplicate (already covered in Issue #7)
- Consider auto-generating the year with JavaScript

---

## Visual Hierarchy Analysis

### Desktop (1440×900)
| Element | Assessment |
|---------|------------|
| **Navigation** | ✅ Clean, well-structured with clear CTAs ("Réserver" button) |
| **Hero** | ⚠️ Background images load properly; CTA visible but search widget could be more prominent |
| **H1** | ⚠️ Visible above fold but too small (24px) — needs 40px+ |
| **Stats bar** | ❌ Font too small (12px headings), nearly invisible |
| **Search form** | ✅ Visible above fold, all fields accessible |
| **Footer** | ⚠️ Dense but functional; "Services & activités" column appears empty |

### Mobile (375×812)
| Element | Assessment |
|---------|------------|
| **Navigation** | ✅ Hamburger menu present; logo visible |
| **H1** | ✅ Visible above fold at 24px (small but readable) |
| **Search form** | ⚠️ Stacked vertically; CTA at bottom requires scroll |
| **Activities** | ❌ CRITICAL: 23/25 links off-screen, invisible to users |
| **Testimonials** | ✅ Single-column stacking works well |
| **Footer** | ⚠️ Very long; 50+ links; social icons too small |

---

## Core Web Vitals Impact Summary

| Metric | Risk Level | Primary Causes |
|--------|------------|----------------|
| **CLS** (Cumulative Layout Shift) | 🟠 HIGH | 38 images without width/height attributes |
| **LCP** (Largest Contentful Paint) | 🟡 MEDIUM | Hero images load but 500 API error may delay content |
| **INP** (Interaction to Next Paint) | 🟢 LOW | No obvious JS blocking detected |
| **Mobile Usability** | 🔴 CRITICAL | Activities overflow, 63 small tap targets |

---

## Priority Action Plan

| Priority | Issue | Effort | Impact |
|----------|-------|--------|--------|
| 1 | Fix Activities section horizontal overflow on mobile | Medium | Critical UX fix |
| 2 | Fix API `/api/properties` 500 error | High | Broken functionality |
| 3 | Add width/height to all images (CLS) | Low | Core Web Vitals |
| 4 | Increase H1 font size to 40px+ desktop | Low | Visual hierarchy |
| 5 | Fix all small tap targets (63 elements) | Medium | Mobile usability |
| 6 | Fix duplicate copyright text | Low | Professionalism |
| 7 | Increase stats section font sizes | Low | Readability |
| 8 | Fix quote marks around "2014" | Low | Content quality |
| 9 | Restructure search form for mobile | Medium | Conversion rate |
| 10 | Trim meta description to 155 chars | Low | SERP optimization |

---

*Report generated by Visual SEO Audit — Playwright Browser Automation*
