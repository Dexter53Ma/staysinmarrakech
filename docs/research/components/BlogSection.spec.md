# BlogSection Specification

## Overview
- **Target file:** `src/components/BlogSection.tsx`
- **Interaction model:** Static

## DOM Structure
- `.fifth-section` (container)
  - Title: "Derniers articles du blog"
  - Grid of 3 blog cards
  - "Découvrez tous les articles du blog" link

## Computed Styles

### Section
- padding: 50px 15px
- maxWidth: 1140px
- margin: 0 auto

### Title
- fontSize: 26px
- fontWeight: 700
- textTransform: uppercase
- color: #0b1014
- marginBottom: 10px

### Blog Grid
- display: grid
- gridTemplateColumns: repeat(3, 1fr)
- gap: 30px

### Blog Card
- background: white
- borderRadius: 4px
- overflow: hidden
- boxShadow: 0 2px 10px rgba(0,0,0,0.1)

### Card Image
- width: 100%
- height: 200px
- objectFit: cover

### Card Content
- padding: 15px

### Card Title
- fontSize: 18px
- fontWeight: 600
- color: #0d47a1
- marginBottom: 10px

### Card Excerpt
- fontSize: 14px
- color: #34495e
- lineHeight: 20px

### View All Link
- display: inline-block
- marginTop: 20px
- color: #0d47a1
- fontWeight: 600
- textTransform: uppercase
- hover: underline

## Blog Data (3 cards)
1. Image: /images/blog/blog1.webp, Title: "Les plus belles villas de Marrakech"
2. Image: /images/blog/blog2.png, Title: "Guide de la Palmeraie"
3. Image: /images/blog/blog3.png, Title: "Activités incontournables à Marrakech"

## Responsive Behavior
- **Desktop (1440px):** 3 columns
- **Tablet (768px):** 2 columns
- **Mobile (390px):** 1 column
