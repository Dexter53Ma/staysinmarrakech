# QuartiersCarousel Specification

## Overview
- **Target file:** `src/components/QuartiersCarousel.tsx`
- **Interaction model:** Click/drag-driven carousel

## DOM Structure
- `.fifth-section.quartiers-container` (container)
  - Title: "Location villas Marrakech"
  - Slick carousel with 10 neighborhood images

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

### Quartier Card
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

## Quartier Data (10 items)
1. Route de Fès - /images/quartiers/route-de-fes.webp
2. Route de l'Ourika - /images/quartiers/route-de-lourika.webp
3. Route de Ouarzazate - /images/quartiers/route-de-ouerzazate.webp
4. Royal Palm et ses environs - /images/quartiers/royal-palm.webp
5. Targa - /images/quartiers/targa.webp
6. Golf d'Amelkis - /images/quartiers/golf-amelkis.webp
7. Proche d'Amelkis - /images/quartiers/proche-damelkis.webp
8. Golf de Samanah - /images/quartiers/samanah-golf.webp
9. Palmeraie - /images/quartiers/palmeraie.webp
10. Désert d'Agafay - /images/quartiers/desert-agafay.webp

## Responsive Behavior
- **Desktop (1440px):** 5-6 cards visible
- **Tablet (768px):** 3-4 cards visible
- **Mobile (390px):** 2 cards visible
