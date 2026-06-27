# VillaCarousel Specification

## Overview
- **Target file:** `src/components/VillaCarousel.tsx`
- **Screenshot:** `docs/design-references/www.villapremium.fr/full-page-desktop.png`
- **Interaction model:** Click/drag-driven carousel

## DOM Structure
- `.second-section` (container)
  - Title: "Découvrez notre sélection de villas de luxe à Marrakech"
  - Subtitle: "Une sélection des meilleures villas à Marrakech."
  - Slick carousel with 6 villa cards

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

### Subtitle
- fontSize: 16px
- color: #22313d
- marginBottom: 16px

### Villa Card
- background: white
- borderRadius: 4px
- boxShadow: 0 2px 10px rgba(0,0,0,0.1)
- overflow: hidden
- width: 350px
- margin: 0 10px

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

### Features List
- display: grid
- gridTemplateColumns: 1fr 1fr
- gap: 5px
- fontSize: 14px
- color: #34495e

### Contact Buttons
- display: flex
- gap: 10px
- marginTop: 15px

## Villa Data (6 cards)
1. Villa Nouma - Terrain: 3000 m², Surface: 1200 m², Chambres: 6, Pax: 16
2. Villa Nayma - Terrain: 9600 m², Surface: 650 m², Chambres: 6, Pax: 12
3. Villa Lya - Terrain: 2500 m², Surface: 350 m², Chambres: 4, Pax: 8
4. Villa Nera - Terrain: 2500 m², Surface: 750 m², Chambres: 5, Pax: 10
5. Villa Selma - Terrain: 60000 m², Surface: 2500 m², Chambres: 21, Pax: 46
6. Villa Shakira - Terrain: 10000 m², Surface: 700 m², Chambres: 5, Pax: 16

## Assets
- Images: public/images/villas/*.jpg/*.jpeg
- Icons: FontAwesome (faPhone, faWhatsapp, faEnvelope)

## Responsive Behavior
- **Desktop (1440px):** 3 cards visible
- **Tablet (768px):** 2 cards visible
- **Mobile (390px):** 1 card visible
