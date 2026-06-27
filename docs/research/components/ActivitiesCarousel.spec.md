# ActivitiesCarousel Specification

## Overview
- **Target file:** `src/components/ActivitiesCarousel.tsx`
- **Interaction model:** Click/drag-driven carousel

## DOM Structure
- `.fifth-section.activites-container` (container)
  - Title: "Activités marrakech à découvrir"
  - Slick carousel with 20+ activity images

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

### Activity Card
- position: relative
- overflow: hidden
- borderRadius: 4px
- width: 200px
- height: 150px
- margin: 0 5px

### Card Image
- width: 100%
- height: 100%
- objectFit: cover
- transition: transform 0.2s ease-out

### Card Overlay
- position: absolute
- top: 0, left: 0, right: 0, bottom: 0
- background: linear-gradient(transparent 40%, rgba(0,0,0,0.7))
- display: flex
- alignItems: flex-end
- justifyContent: center
- padding: 10px

### Card Title
- color: white
- fontSize: 14px
- fontWeight: 600
- textTransform: uppercase

## Activity Data (20 items)
1. Side Car Vintage - /images/activities/side-car.webp
2. Jet Ski - /images/activities/jet-ski.webp
3. Sonothérapie - /images/activities/sonotherapie.webp
4. Voiture de luxe avec chauffeur - /images/activities/voiture-luxe.webp
5. Van avec chauffeur - /images/activities/van-chauffeur.webp
6. Quad/Buggy - /images/activities/quad-buggy.webp
7. Montgolfière - /images/activities/montgolfiere.webp
8. Wakeboard - /images/activities/wakeboard.jpg
9. Excursions VTT - /images/activities/vtt.webp
10. Grand Canyon - /images/activities/grand-canyon.webp
11. Golf - /images/activities/golf.webp
12. Désert sensation - /images/activities/desert-sensation.webp
13. Visites découvertes - /images/activities/visites-decouvertes.webp
14. Equitation - /images/activities/equitation.webp
15. Yoga et Pilates - /images/activities/yoga-pilates.webp
16. Aqua Karting - /images/activities/aqua-karting.webp
17. Karting - /images/activities/karting.webp
18. Paintball - /images/activities/paintball.webp

## Responsive Behavior
- **Desktop (1440px):** 5-6 cards visible
- **Tablet (768px):** 3-4 cards visible
- **Mobile (390px):** 2 cards visible
