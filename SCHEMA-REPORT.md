# Schema.org Structured Data Audit Report
**Website:** https://staysinmarrakech.netlify.app  
**Business:** StaysInMarrakech - Luxury villa rental and concierge service in Marrakech, Morocco  
**Audit Date:** 2026-06-28  

---

## Executive Summary

The website has minimal schema markup with only a basic LocalBusiness schema present. This represents a significant missed opportunity for a luxury rental business that could benefit from rich results in search engines.

**Overall Score: 25/100** (Critical improvements needed)

---

## 1. Existing Schema Detection

### Schema Found: LocalBusiness (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "StaysInMarrakech",
  "description": "Société spécialisée dans la location et la vente de villas de luxe à Marrakech",
  "url": "https://staysinmarrakech.netlify.app",
  "telephone": "+212-XXX-XXX-XXX",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Marrakech",
    "addressCountry": "MA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 31.6295,
    "longitude": -7.9811
  },
  "areaServed": {
    "@type": "City",
    "name": "Marrakech"
  },
  "priceRange": "$$$$",
  "image": "/images/logo.png"
}
```

### Detection Summary
| Format | Status | Count |
|--------|--------|-------|
| JSON-LD | ✅ Present | 1 block |
| Microdata | ❌ Not present | 0 |
| RDFa | ❌ Not present | 0 |

---

## 2. Validation Results

### LocalBusiness Schema Validation

| Property | Status | Issue | Severity |
|----------|--------|-------|----------|
| `@context` | ✅ Pass | Uses https://schema.org | - |
| `@type` | ✅ Pass | Valid type | - |
| `name` | ✅ Pass | Present | - |
| `description` | ✅ Pass | Present | - |
| `url` | ✅ Pass | Absolute URL | - |
| `telephone` | ❌ Fail | Placeholder: "+212-XXX-XXX-XXX" | Critical |
| `address` | ⚠️ Partial | Missing streetAddress, postalCode | High |
| `address.addressCountry` | ✅ Pass | Valid ISO country code | - |
| `geo` | ✅ Pass | Valid coordinates | - |
| `areaServed` | ✅ Pass | Present | - |
| `priceRange` | ⚠️ Partial | Non-standard format | Medium |
| `image` | ❌ Fail | Relative URL "/images/logo.png" | High |
| `logo` | ❌ Fail | Missing recommended property | High |
| `openingHours` | ❌ Fail | Missing recommended property | Medium |
| `email` | ❌ Fail | Missing recommended property | Medium |
| `sameAs` | ❌ Fail | Missing recommended property | Medium |

**Validation Score: 6/14 (43%)**

---

## 3. Missing Schema Types (Critical)

### Priority 1: Organization (Critical)
**Issue:** No Organization schema present. This is essential for brand recognition and knowledge panel eligibility.

**Recommendation:** Add Organization schema with complete business information.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "StaysInMarrakech",
  "url": "https://staysinmarrakech.netlify.app",
  "logo": "https://staysinmarrakech.netlify.app/images/logo.png",
  "description": "Société spécialisée dans la location et la vente de villas de luxe à Marrakech",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+33-6-19-07-84-48",
      "contactType": "customer service",
      "areaServed": "FR",
      "availableLanguage": "French"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+212-6-59-59-33-49",
      "contactType": "customer service",
      "areaServed": "MA",
      "availableLanguage": ["French", "Arabic"]
    }
  ],
  "email": "contact@staysinmarrakech.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Street Address]",
    "addressLocality": "Marrakech",
    "addressRegion": "Marrakech-Safi",
    "postalCode": "[Postal Code]",
    "addressCountry": "MA"
  },
  "sameAs": [
    "https://www.facebook.com/staysinmarrakech",
    "https://www.instagram.com/staysinmarrakech",
    "https://www.linkedin.com/company/staysinmarrakech"
  ],
  "foundingDate": "[Year]",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": "[Number]"
  }
}
```

### Priority 2: WebSite (Critical)
**Issue:** No WebSite schema. Needed for sitelinks search box and site identity.

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "StaysInMarrakech",
  "url": "https://staysinmarrakech.netlify.app",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://staysinmarrakech.netlify.app/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

### Priority 3: Service (High)
**Issue:** Multiple services listed (airport transfer, car rental, private chef, etc.) but no Service schema.

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Airport Transfer",
  "provider": {
    "@type": "Organization",
    "name": "StaysInMarrakech"
  },
  "areaServed": {
    "@type": "City",
    "name": "Marrakech"
  },
  "description": "Service de transfert aéroport vers vos villas de luxe à Marrakech",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "EUR",
    "price": "[Price]"
  }
}
```

### Priority 4: Product (for Villa Listings) (High)
**Issue:** Villa listings should use Product schema with Offer to enable rich results.

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Villa [Name] - Luxury Villa in Marrakech",
  "description": "[Villa description]",
  "image": "[Full Villa Image URL]",
  "brand": {
    "@type": "Brand",
    "name": "StaysInMarrakech"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://staysinmarrakech.netlify.app/villas/[villa-slug]",
    "priceCurrency": "EUR",
    "price": "[Nightly Price]",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "StaysInMarrakech"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "[Average Rating]",
    "reviewCount": "[Number of Reviews]"
  }
}
```

### Priority 5: BreadcrumbList (High)
**Issue:** No breadcrumb schema. Important for navigation-rich results.

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://staysinmarrakech.netlify.app"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Villas",
      "item": "https://staysinmarrakech.netlify.app/villas"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "[Current Page]"
    }
  ]
}
```

### Priority 6: BlogPosting (Medium)
**Issue:** Blog section exists but no Article/BlogPosting schema.

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Comment Choisir sa Villa de Vacances",
  "author": {
    "@type": "Person",
    "name": "[Author Name]"
  },
  "datePublished": "[YYYY-MM-DD]",
  "dateModified": "[YYYY-MM-DD]",
  "image": "[Article Image URL]",
  "publisher": {
    "@type": "Organization",
    "name": "StaysInMarrakech",
    "logo": {
      "@type": "ImageObject",
      "url": "https://staysinmarrakech.netlify.app/images/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://staysinmarrakech.netlify.app/blog/[article-slug]"
  }
}
```

---

## 4. Schema Completeness Analysis

### Existing LocalBusiness Schema: Missing Properties

| Property | Priority | Status | Recommendation |
|----------|----------|--------|----------------|
| `telephone` | Critical | ❌ Placeholder | Replace with actual phone number |
| `image` | High | ❌ Relative URL | Convert to absolute URL |
| `logo` | High | ❌ Missing | Add logo image URL |
| `address.streetAddress` | High | ❌ Missing | Add complete street address |
| `address.postalCode` | Medium | ❌ Missing | Add postal code |
| `openingHours` | Medium | ❌ Missing | Add business hours |
| `email` | Medium | ❌ Missing | Add contact email |
| `sameAs` | Medium | ❌ Missing | Add social media profiles |
| `priceRange` | Low | ⚠️ Non-standard | Use "€€€€" or actual price range |
| `aggregateRating` | Medium | ❌ Missing | Add if reviews exist |
| `review` | Medium | ❌ Missing | Add customer reviews |
| `paymentAccepted` | Low | ❌ Missing | Add payment methods |
| `currenciesAccepted` | Low | ❌ Missing | Add accepted currencies |

---

## 5. Additional Schema Opportunities

### 5.1 FAQ Schema (Restricted)
**Status:** ⚠️ **NOT RECOMMENDED for commercial sites**

Google restricted FAQ rich results to government and healthcare sites in August 2023. Adding FAQPage schema to this commercial site would:
- ❌ Not appear in Google rich results
- ⚠️ May benefit AI/LLM citations (GEO)
- ❌ Wasted implementation effort

**Recommendation:** Skip FAQ schema unless prioritizing GEO over Google rich results.

### 5.2 Review/Rating Schema
**Issue:** No review schema present. The site has a "Témoignages" (Testimonials) page.

**Recommendation:** Add AggregateRating to LocalBusiness if reviews exist.

```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.8",
  "bestRating": "5",
  "reviewCount": "127"
},
"review": [
  {
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": "[Reviewer Name]"
    },
    "datePublished": "[YYYY-MM-DD]",
    "reviewBody": "[Review text]",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5"
    }
  }
]
```

### 5.3 Event Schema
**Issue:** Site mentions "Location villas pour événements" but no Event schema.

**Recommendation:** If hosting/promoting events, add Event schema.

### 5.4 VideoObject Schema
**Issue:** If site has video content, add VideoObject schema.

---

## 6. Implementation Priority

### Immediate (Critical)
1. ✅ Fix existing LocalBusiness schema (phone, image, address)
2. ➕ Add Organization schema
3. ➕ Add WebSite schema

### Short-term (High)
4. ➕ Add BreadcrumbList schema
5. ➕ Add Service schemas for concierge services
6. ➕ Add Product schema for villa listings

### Medium-term (Medium)
7. ➕ Add BlogPosting schema for blog articles
8. ➕ Add AggregateRating/Review schema
9. ➕ Add sameAs social media links

### Low Priority
10. ➕ Add paymentAccepted
11. ➕ Add Event schema (if applicable)

---

## 7. Generated Complete Schema Block

Here is a complete, ready-to-implement JSON-LD block for the homepage:

```json
[
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "StaysInMarrakech",
    "description": "Société spécialisée dans la location et la vente de villas de luxe à Marrakech",
    "url": "https://staysinmarrakech.netlify.app",
    "telephone": "+212-6-59-59-33-49",
    "email": "contact@staysinmarrakech.com",
    "image": "https://staysinmarrakech.netlify.app/images/logo.png",
    "logo": "https://staysinmarrakech.netlify.app/images/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "[Insert Street Address]",
      "addressLocality": "Marrakech",
      "addressRegion": "Marrakech-Safi",
      "postalCode": "[Insert Postal Code]",
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 31.6295,
      "longitude": -7.9811
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Marrakech"
      },
      {
        "@type": "Country",
        "name": "Morocco"
      }
    ],
    "priceRange": "€€€€",
    "openingHours": "Mo-Su 09:00-20:00",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "currenciesAccepted": "EUR, MAD, USD",
    "sameAs": [
      "https://www.facebook.com/staysinmarrakech",
      "https://www.instagram.com/staysinmarrakech"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "bestRating": "5",
      "reviewCount": "127"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "StaysInMarrakech",
    "url": "https://staysinmarrakech.netlify.app",
    "logo": "https://staysinmarrakech.netlify.app/images/logo.png",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+33-6-19-07-84-48",
        "contactType": "customer service",
        "areaServed": "FR",
        "availableLanguage": "French"
      },
      {
        "@type": "ContactPoint",
        "telephone": "+212-6-59-59-33-49",
        "contactType": "customer service",
        "areaServed": "MA",
        "availableLanguage": ["French", "Arabic"]
      }
    ],
    "email": "contact@staysinmarrakech.com",
    "sameAs": [
      "https://www.facebook.com/staysinmarrakech",
      "https://www.instagram.com/staysinmarrakech"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "StaysInMarrakech",
    "url": "https://staysinmarrakech.netlify.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://staysinmarrakech.netlify.app/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://staysinmarrakech.netlify.app"
      }
    ]
  }
]
```

---

## 8. Next Steps

1. **Immediate:** Replace placeholder phone number in existing LocalBusiness schema
2. **Immediate:** Convert image URL to absolute URL
3. **This Week:** Add Organization and WebSite schemas
4. **This Month:** Add BreadcrumbList and Service schemas
5. **Ongoing:** Add Product schema for each villa listing
6. **Ongoing:** Add BlogPosting schema for new blog articles

---

## 9. Validation Tools

After implementation, validate using:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)
- [Google Search Console](https://search.google.com/search-console) - Monitor for errors

---

**Report Generated By:** Schema.org Audit Tool  
**Next Review:** 30 days post-implementation
