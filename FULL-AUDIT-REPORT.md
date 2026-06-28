# Full SEO Audit Report — StaysInMarrakech

**Audit Date:** June 28, 2026
**URL:** https://staysinmarrakech.netlify.app
**Framework:** Next.js 16 + Netlify
**Language:** French (fr)
**Business Type:** Luxury villa rental & concierge service, Marrakech

---

## Executive Summary

| Metric | Score | Status | Previous |
|--------|-------|--------|----------|
| **Overall SEO Health** | **49/100** | NEEDS WORK | 32/100 |
| Technical SEO | 76/100 | GOOD | 38/100 |
| Content Quality | 42/100 | POOR | 38/100 |
| On-Page SEO | 50/100 | FAIR | 25/100 |
| Schema / Structured Data | 25/100 | CRITICAL | 0/100 |
| Performance (CWV) | 85/100 | GOOD | 85/100 |
| AI Search Readiness (GEO) | 28/100 | CRITICAL | 30/100 |
| Local SEO | 28/100 | CRITICAL | — |

### Top 5 Critical Issues
1. **Sitemap.xml returns homepage HTML** — Search engines cannot discover pages
2. **Empty testimonials page** — Zero social proof, destroys trust signals
3. **Villa listing shows 0 results** — Core product page broken (API 500 error)
4. **No structured data on most pages** — Only incomplete LocalBusiness on homepage
5. **38/42 images missing width/height** — Causes CLS failures on all pages

### Top 5 Quick Wins
1. Fix `/sitemap.xml` to return valid XML (1 hour)
2. Add `width`/`height` to all images (2 hours)
3. Create `/llms.txt` for AI crawlers (30 min)
4. Fix placeholder phone number in schema (5 min)
5. Add `og:image` and Twitter Card tags (1 hour)

---

## 1. Technical SEO — 76/100

### Critical Issues

| Issue | Severity | Detail |
|-------|----------|--------|
| Sitemap returns HTML | CRITICAL | `/sitemap.xml` serves homepage instead of XML |
| API 500 error | CRITICAL | `/api/properties?limit=6` returns HTTP 500 |
| www SSL error | CRITICAL | `www.staysinmarrakech.netlify.app` has invalid cert |

### High Issues

| Issue | Severity | Detail |
|-------|----------|--------|
| Missing X-Robots-Tag header | HIGH | No HTTP-level indexing control |
| Missing hreflang tags | HIGH | French site targeting Morocco lacks `hreflang="fr-ma"` |
| Incomplete structured data | HIGH | Only LocalBusiness with placeholder phone |

### Medium Issues

| Issue | Severity | Detail |
|-------|----------|--------|
| Missing og:image | MEDIUM | No social sharing preview image |
| Missing Twitter Cards | MEDIUM | No Twitter/X meta tags |
| No IndexNow protocol | MEDIUM | Slower indexing on Bing/Yandex |
| No AI crawler directives | MEDIUM | robots.txt lacks GPTBot/ClaudeBot rules |

### What's Working
- HTTPS with valid SSL, HTTP→HTTPS redirect
- Security headers: CSP, HSTS, X-Frame-Options, X-Content-Type-Options
- Mobile viewport correctly set
- Canonical tags present
- Clean URL structure
- Next.js SSR renders content in initial HTML

---

## 2. Content Quality — 42/100

### Critical Issues

| Issue | Severity | Detail |
|-------|----------|--------|
| Empty testimonials page | CRITICAL | "Aucun témoignage trouvé" — zero social proof |
| Villa listing shows 0 results | CRITICAL | Core product page functionally broken |
| No privacy policy / legal pages | CRITICAL | GDPR compliance mandatory for data collection |

### High Issues

| Issue | Severity | Detail |
|-------|----------|--------|
| Thin homepage content | HIGH | ~580 words, barely meets minimum |
| No author attribution on blog | HIGH | "Amine" with no bio, credentials, or author page |
| Dated blog content | HIGH | Last post February 2025 — 4+ months stale |

### Medium Issues

| Issue | Severity | Detail |
|-------|----------|--------|
| Repetitive footer links | MEDIUM | 30+ keyword-stuffed internal links |
| No schema markup | MEDIUM | Missing Organization, Product, FAQ schemas |
| Generic content | MEDIUM | Could apply to any luxury villa agency |
| No FAQ section | MEDIUM | Missed long-tail and featured snippet opportunities |

### E-E-A-T Assessment

| Signal | Score | Notes |
|--------|-------|-------|
| Experience | 12/20 | Founder story present; no guest case studies |
| Expertise | 16/25 | Founder credentials strong; team under-documented |
| Authoritativeness | 8/25 | No external citations, reviews, or press mentions |
| Trustworthiness | 10/30 | Contact info present; testimonials empty; no legal pages |

### AI Citation Readiness: 30/100
- Only 3 stats (1000+ clients, 50+ villas, 10+ years)
- No quotable data, methodology, or structured facts
- Generic phrasing an LLM could generate from scratch
- **Verdict:** Would NOT be cited by ChatGPT, Perplexity, or Google AI Overviews

---

## 3. Schema / Structured Data — 25/100

### Current State
- 1 JSON-LD block: `LocalBusiness` (incomplete)
- No Microdata or RDFa

### Critical Issues

| Issue | Severity | Detail |
|-------|----------|--------|
| Placeholder phone number | CRITICAL | `+212-XXX-XXX-XXX` instead of real number |
| Relative image URL | HIGH | `/images/logo.png` should be absolute |
| Missing Organization schema | CRITICAL | No brand identity schema |
| Missing WebSite schema | CRITICAL | No sitelinks search box |
| Incomplete address | HIGH | Only city & country, missing street/postal code |

### Missing Schema Types

| Schema Type | Priority | Use Case |
|-------------|----------|----------|
| Organization | Critical | Brand identity & knowledge panel |
| WebSite | Critical | Search action & sitelinks |
| BreadcrumbList | High | Navigation rich results |
| Service | High | 10+ concierge services |
| Product | High | Villa listings with pricing |
| BlogPosting | Medium | Blog articles |
| AggregateRating | Medium | Testimonials/reviews |

### Note on FAQ Schema
Google restricted FAQ rich results to government/healthcare sites only (Aug 2023). Adding FAQPage schema won't produce Google rich results — but it IS valuable for AI/LLM citations (GEO).

---

## 4. Performance — 85/100

### Core Metrics

| Metric | Value | Status |
|--------|-------|--------|
| TTFB | ~51ms | Excellent |
| DOM Interactive | ~64ms | Excellent |
| Page Load | ~107ms | Excellent |
| DOM Size | 728 elements | Good |

### Critical Issues

| Issue | Severity | CWV Impact |
|-------|----------|------------|
| 38/42 images missing width/height | CRITICAL | CLS — will fail threshold |
| API 500 error | CRITICAL | Content render failure |

### High Issues

| Issue | Severity | CWV Impact |
|-------|----------|------------|
| Render-blocking resources (3) | HIGH | LCP, FCP delay |
| Excessive JS payload (180KB+) | HIGH | INP, LCP |
| 70+ font declarations, only 4 used | HIGH | LCP, CLS (FOUT) |
| Hero images not prioritized | HIGH | LCP delay |

### Medium Issues

| Issue | Severity | Detail |
|-------|----------|--------|
| Images request w=3840 for 200px cards | MEDIUM | 19.2× over-fetch |
| 10 placeholder SVGs instead of real images | MEDIUM | UX + CLS risk |
| Missing preconnect hints | MEDIUM | Font load delay |
| JPG/PNG where WebP available | MEDIUM | 25-50% size savings missed |

### Font Overload Detail

| Font Family | Declared | Actually Used |
|-------------|----------|---------------|
| Raleway | 300-800 | 400, 500, 600, 700 |
| Rubik | 300-700 | **None** |
| Font Awesome 7 | Brands, 400, 900 | **None** |
| Font Awesome 5 | Brands, 400, 900 | **None** |

**Wasted:** 78KB of preloaded font files for unused fonts.

---

## 5. Visual & Mobile — Issues

### Critical

| Issue | Detail |
|-------|--------|
| Activities section overflow on mobile | 23/25 links positioned off-screen, not scrollable |
| 63 tap targets below 44px | Carousel dots (6px), social icons (13px), footer links (21px) |

### High

| Issue | Detail |
|-------|--------|
| H1 only 24px on desktop | Needs 40-48px for hero heading |
| Stats headings at 12px | Nearly illegible |
| Duplicate copyright | "© 2026 © 2026 Villa Premium" |

### Medium

| Issue | Detail |
|-------|--------|
| 10 H2 headings on homepage | Excessive, dilutes heading signals |
| Search CTA below fold on mobile | Users scroll past 4 fields before reaching button |
| Footer services section empty on desktop | 50+ links render on mobile but 0 on desktop |

---

## 6. AI Search Readiness (GEO) — 28/100

### Platform Scores

| Platform | Score |
|----------|-------|
| Google AI Overviews | 30/100 |
| ChatGPT Web Search | 22/100 |
| Perplexity | 25/100 |
| Bing Copilot | 28/100 |

### Critical Issues

| Issue | Detail |
|-------|--------|
| No llms.txt | Returns 404 error page |
| No structured data | AI systems can't extract business info |
| Villa listings render client-side only | AI crawlers see empty pages |
| Testimonials page empty | Zero social proof for AI trust assessment |

### High Issues

| Issue | Detail |
|-------|--------|
| No question-based headings | All headings declarative, not matching AI queries |
| No FAQ content | Missed opportunity for AI-citable Q&A |
| Weak brand entity presence | No Wikipedia, Reddit, YouTube, LinkedIn |
| French only | Missing English versions for global AI reach |

### Citability Assessment
- Homepage has some citable stats but lacks self-contained answer blocks
- No passages hit the optimal 134-167 word citable block
- Content reads like templated copy, not authoritative expertise

---

## 7. Local SEO — 28/100

### NAP Consistency Issues

| Source | Phone | Email |
|--------|-------|-------|
| Homepage footer | +33 6 19 07 84 48 / +212 6 59 59 33 49 | contact@villapremium.fr |
| Contact page | +212 6 59 59 33 49 / +33 6 19 07 84 48 | contact@staysinmarrakech.com |
| JSON-LD schema | **+212-XXX-XXX-XXX** (placeholder) | N/A |

**Three different email domains** across the site (villapremium.fr, staysinmarrakech.com, netlify.app).

### Critical Issues

| Issue | Detail |
|-------|--------|
| Schema phone is placeholder | `+212-XXX-XXX-XXX` |
| Empty testimonials page | Zero reviews = zero trust signal |
| No Google Maps embed | Missing on contact page |
| Sitemap returns error | Google can't discover location pages |

### High Issues

| Issue | Detail |
|-------|--------|
| No dedicated location pages | /locations returns 404; all neighborhood links go to same page |
| No unique service pages | All services mentioned on homepage but no dedicated pages |
| Netlify subdomain | Weak domain signal vs. custom domain |
| Footer domain mismatch | Links to villapremium.fr instead of staysinmarrakech.com |

### Local Schema Status

| Property | Status |
|----------|--------|
| @type | Generic `LocalBusiness` (should be `VacationRental`) |
| telephone | Placeholder |
| address | Incomplete (no street/postal code) |
| openingHoursSpecification | Missing |
| aggregateRating | Missing |
| sameAs | Missing (no social profiles) |

---

## Priority Action Plan

### This Week (Critical)

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 1 | Fix `/sitemap.xml` to return valid XML | 1h | Unblocks page discovery |
| 2 | Fix `/api/properties` 500 error | 2h | Restores core functionality |
| 3 | Fix schema phone number `+212-XXX-XXX-XXX` | 5min | Fixes schema validation |
| 4 | Add `width`/`height` to all 42 images | 2h | Fixes CLS failures |
| 5 | Populate testimonials page with real reviews | 4h | Restores trust signals |

### Next 2 Weeks (High)

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 6 | Create `/llms.txt` for AI crawlers | 30min | +5 GEO points |
| 7 | Add Organization + WebSite JSON-LD schemas | 2h | Rich results eligible |
| 8 | Create `/mentions-legales` and `/politique-de-confidentialite` | 4h | GDPR compliance |
| 9 | Add `og:image` and Twitter Card meta tags | 1h | Social sharing preview |
| 10 | Remove unused fonts (Rubik, Font Awesome) | 1h | ~200KB CSS reduction |
| 11 | Create blog author pages with bios | 3h | E-E-A-T improvement |
| 12 | Fix activities section mobile overflow | 2h | Mobile usability |
| 13 | Enlarge tap targets to 44px minimum | 3h | Mobile usability |

### This Month (Medium)

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 14 | Add FAQ section to homepage (8-10 questions) | 4h | Long-tail keywords + GEO |
| 15 | Create individual location pages (Palmeraie, Gueliz, etc.) | 1-2w | Local SEO + doorway fix |
| 16 | Create dedicated service pages | 1w | Local organic ranking factor |
| 17 | Add Google Maps embed to contact page | 1h | Local signal reinforcement |
| 18 | Implement hreflang="fr-ma" | 30min | Regional targeting |
| 19 | Add preconnect hints for fonts | 15min | Font load speed |
| 20 | Convert JPG/PNG images to WebP | 2h | 25-50% image size reduction |
| 21 | Expand homepage content to 800+ words | 4h | Topical depth |
| 22 | Create LinkedIn + Google Business Profile | 1w | Cross-platform entity signals |
| 23 | Build YouTube channel with property videos | 2w | Highest AI citation correlation |
| 24 | Publish 2-4 blog posts per month | Ongoing | Freshness signal |

---

## Estimated Score Impact

| Fix Category | Current | After Fix | Points Gained |
|-------------|---------|-----------|---------------|
| Technical SEO (sitemap, API, www) | 76 | 90 | +14 |
| Content (testimonials, legal, blog) | 42 | 65 | +23 |
| Schema (complete markup) | 25 | 70 | +45 |
| Performance (images, fonts) | 85 | 92 | +7 |
| GEO (llms.txt, structured data, FAQ) | 28 | 60 | +32 |
| Local (NAP, GBP, location pages) | 28 | 55 | +27 |

**Projected Overall Score after all fixes: ~75/100** (up from 49)

---

*Audit performed by 7 parallel specialist agents: Technical SEO, Content Quality, Schema, Performance, Visual, GEO/AI, and Local SEO.*
