# Full SEO Audit Report — StaysInMarrakech

**Audit Date:** June 27, 2026  
**URL:** https://staysinmarrakech.netlify.app  
**Framework:** Next.js 16 + Netlify  
**Language:** French (fr)  
**Business Type:** Luxury villa rental & concierge service

---

## Executive Summary

| Metric | Score | Status |
|--------|-------|--------|
| **Overall SEO Health** | **32/100** | CRITICAL |
| Technical SEO | 38/100 | CRITICAL |
| Content Quality | 38/100 | CRITICAL |
| Schema / Structured Data | 0/100 | CRITICAL |
| Performance | 85/100 | GOOD |
| On-Page SEO | 25/100 | CRITICAL |
| AI Search Readiness | 30/100 | POOR |

### Top 5 Critical Issues
1. **No robots.txt or sitemap.xml** — Search engines cannot discover or crawl the site properly
2. **Duplicate meta tags on ALL pages** — Every page shares the same title/description
3. **Zero structured data** — No JSON-LD schemas of any kind
4. **Broken internal links** — Dozens of 404s (/villas, footer links, location pages)
5. **Empty/broken pages** — Testimonials page empty, villa listings show 0 results

### Top 5 Quick Wins
1. Add robots.txt and sitemap.xml
2. Add unique title + meta description per page
3. Add LocalBusiness JSON-LD schema to homepage
4. Fix the /api/properties 500 error
5. Add Open Graph + Twitter Card meta tags

---

## 1. Technical SEO — 38/100

### Crawlability — 10/100 (CRITICAL)

| Check | Status | Issue |
|-------|--------|-------|
| robots.txt | MISSING | Returns SPA shell HTML |
| XML Sitemap | MISSING | Returns SPA shell HTML |
| Canonical Tags | MISSING | No `<link rel="canonical">` on any page |
| noindex directives | OK | No accidental noindex found |

### Indexability — 15/100 (CRITICAL)

| Check | Status | Issue |
|-------|--------|-------|
| Unique title tags | FAIL | ALL pages share identical title |
| Unique meta descriptions | FAIL | ALL pages share identical description |
| Open Graph tags | MISSING | No og:* tags on any page |
| Twitter Card tags | MISSING | No twitter:* tags on any page |
| Hreflang tags | MISSING | No multilingual markup |

**Current title (all pages):** "Location et vente de villas de luxe à Marrakech - StaysInMarrakech"

### Security — 85/100 (GOOD)

| Header | Status |
|--------|--------|
| HSTS | ✅ Present |
| X-Frame-Options | ✅ DENY |
| X-Content-Type-Options | ✅ nosniff |
| X-XSS-Protection | ✅ Present |
| Content-Security-Policy | ❌ Missing |
| X-Powered-By | ⚠️ Exposed (should hide) |

### URL Structure — 70/100 (FAIR)

- ✅ Clean, readable URLs
- ⚠️ Mixed language slugs (/contactez-nous vs /testimonials)
- ❌ Broken /villas routes

### JavaScript Rendering — 20/100 (CRITICAL)

- Site is Client-Side Rendered (CSR) SPA
- Initial HTML contains only loading skeletons
- Content rendered after JS execution + API calls
- Social crawlers may not see content

---

## 2. Content Quality — 38/100

### Page-by-Page Content Score

| Page | Words | Score | Status |
|------|-------|-------|--------|
| Homepage | ~400 | 45/100 | Below minimum |
| Villa Listings | ~50 | 8/100 | CRITICAL |
| Service Listing | ~200 | 30/100 | THIN |
| Service Detail | ~280 each | 35/100 | THIN |
| Blog Index | ~15 | 25/100 | THIN |
| Contact | ~50 | 15/100 | CRITICAL |
| Testimonials | ~4 | 2/100 | EMPTY |
| Agency | ~200 | 40/100 | Below |
| Villa Sale | ~60 | 10/100 | CRITICAL |

### E-E-A-T Assessment — 37.5/100

| Factor | Score | Evidence |
|--------|-------|----------|
| Experience | 5/10 | "Depuis 2014", Cyrille's career, service specifics |
| Expertise | 3/10 | No author bios, no credentials |
| Authoritativeness | 2/10 | No external citations, reviews, or press |
| Trustworthiness | 5/10 | Physical address, phone, email present |

### Critical Content Issues

1. **Broken internal links** — /villas returns 404, ~20 footer links broken
2. **Empty testimonials page** — "Aucun témoignage trouvé"
3. **Villa listings show 0 results** — Core business page broken
4. **Contact page has empty address field**
5. **Blog author "Amine" has no last name or credentials**

### French Language Quality — 65/100

- ✅ Natural French phrasing
- ✅ Professional tone for luxury market
- ✅ Consistent formal "vous" address
- ⚠️ Mixed English ("Information") on contact page
- ⚠️ Some generic marketing-speak

---

## 3. Schema / Structured Data — 0/100 (CRITICAL)

**Zero structured data found on the entire site.**

### Missing Schema Types (Priority Order)

| Schema | Priority | Impact |
|--------|----------|--------|
| LocalBusiness / Organization | CRITICAL | Knowledge panel, local pack |
| Product + Offer (per villa) | CRITICAL | Price display in SERPs |
| BreadcrumbList | HIGH | Breadcrumb trail in SERPs |
| AggregateRating / Review | HIGH | Star ratings in SERPs |
| WebSite + SearchAction | MEDIUM | Sitelinks search box |
| BlogPosting | MEDIUM | Article rich results |
| Service | MEDIUM | Service rich results |

---

## 4. Performance — 85/100 (GOOD)

### Core Web Vitals (Lab)

| Metric | Value | Threshold | Status |
|--------|-------|-----------|--------|
| TTFB | 51ms | ≤800ms | ✅ GOOD |
| FCP | ~64ms | ≤1,800ms | ✅ GOOD |
| LCP | ~200ms | ≤2,500ms | ✅ GOOD |
| CLS | 0 | ≤0.1 | ✅ GOOD |
| INP | N/A | ≤200ms | ✅ GOOD |

### Performance Issues

| Issue | Severity | Details |
|-------|----------|---------|
| JS bundle 733 KB | HIGH | 16 chunks, largest 227 KB |
| CSS 314 KB | HIGH | 211 KB file with 80+ font-face rules |
| /api/properties 500 | CRITICAL | Core content broken |
| Missing image dimensions | HIGH | 38/42 images lack width/height |
| 12+ API calls on load | MEDIUM | Excessive network requests |
| Duplicate /api/services calls | LOW | Called 3 times |

---

## 5. On-Page SEO — 25/100

### Title Tags

| Page | Current Title | Issue |
|------|---------------|-------|
| ALL pages | "Location et vente de villas de luxe à Marrakech - StaysInMarrakech" | DUPLICATE |

### Meta Descriptions

| Page | Current Description | Issue |
|------|---------------------|-------|
| ALL pages | "StaysInMarrakech est une société spécialisée dans la location de villas de luxe et de prestige à Marrakech." | DUPLICATE |

### Heading Structure

| Page | H1 | H2 | H3 | Issue |
|------|----|----|----|----|
| Homepage | ✅ 1 | ✅ Multiple | ✅ Multiple | OK |
| Service listing | ✅ 1 | ✅ 1 | ❌ 24 | Skips H2 level |
| Blog | ✅ 1 | ❌ 0 | ❌ 0 | No structure |
| Testimonials | ✅ 1 | ❌ 0 | ❌ 0 | Empty page |

---

## 6. AI Search Readiness — 30/100

| Factor | Score | Notes |
|--------|-------|-------|
| Structured data | 2/10 | No schema markup |
| Quotable facts | 3/10 | "Depuis 2014", "1000 clients" |
| Clear hierarchy | 5/10 | Some pages have good H1→H2→H3 |
| Unique insights | 1/10 | No original research or expertise |
| Author attribution | 2/10 | Only "Amine" for blog |

---

## Prioritized Action Plan

### CRITICAL (Fix Immediately)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 1 | Create robots.txt | Blocks proper crawling | 5 min |
| 2 | Generate XML sitemap | Blocks indexing | 30 min |
| 3 | Add unique title + meta description per page | Duplicate content penalty | 2 hours |
| 4 | Fix /api/properties 500 error | Core content broken | 1 hour |
| 5 | Add LocalBusiness JSON-LD schema | Knowledge panel eligibility | 1 hour |
| 6 | Fix broken /villas links | 404 errors destroying trust | 30 min |
| 7 | Populate testimonials page | Zero social proof | 2 hours |

### HIGH (Fix Within 1 Week)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 8 | Add Product + Offer schema per villa | Rich results with prices | 4 hours |
| 9 | Add Open Graph + Twitter Card tags | Social sharing broken | 2 hours |
| 10 | Add BreadcrumbList schema | SERP breadcrumb trail | 1 hour |
| 11 | Add AggregateRating schema | Star ratings in SERPs | 1 hour |
| 12 | Add 500+ words to homepage | Content depth | 4 hours |
| 13 | Add 800+ words to villa listings | Content depth | 6 hours |
| 14 | Fix contact page (add address, hours) | Trust signals | 1 hour |

### MEDIUM (Fix Within 1 Month)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 15 | Convert CSR to SSR/SSG | Indexability reliability | 2 days |
| 16 | Add 800+ words per service page | Content depth | 2 days |
| 17 | Create location-specific landing pages | Local SEO | 1 week |
| 18 | Add author bios to blog posts | E-E-A-T | 2 hours |
| 19 | Add BlogPosting schema | Article rich results | 2 hours |
| 20 | Reduce JS bundle (code splitting) | Performance | 1 day |
| 21 | Purge unused CSS | Performance | 4 hours |

### LOW (Backlog)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 22 | Add CSP security header | XSS protection | 30 min |
| 23 | Remove X-Powered-By header | Security | 5 min |
| 24 | Standardize URL slugs | Consistency | 2 hours |
| 25 | Implement ISR for villa data | Freshness + performance | 4 hours |
| 26 | Add skip-to-content link | Accessibility | 15 min |
| 27 | Convert JPG/PNG to WebP/AVIF | Performance | 1 hour |

---

## Score Breakdown

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 38 | 8.4 |
| Content Quality | 23% | 38 | 8.7 |
| On-Page SEO | 20% | 25 | 5.0 |
| Schema / Structured Data | 10% | 0 | 0.0 |
| Performance (CWV) | 10% | 85 | 8.5 |
| AI Search Readiness | 10% | 30 | 3.0 |
| Images | 5% | 60 | 3.0 |
| **OVERALL** | **100%** | — | **36.6/100** |

---

## Next Steps

1. **Immediate:** Fix the 7 critical issues (robots.txt, sitemap, meta tags, API error, schema, broken links, testimonials)
2. **This week:** Add OG tags, schemas, homepage content, villa listing content
3. **This month:** Convert to SSR/SSG, expand all page content, create location pages
4. **Ongoing:** Blog publishing, link building, review collection
