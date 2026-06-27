# ShortTermRental Specification

## Overview
- **Target file:** `src/components/ShortTermRental.tsx`
- **Interaction model:** Static

## DOM Structure
- `.second-section` (container)
  - Two columns:
    - Left: image (location-villas-courte-duree-a-marrakech.webp)
    - Right: description text

## Computed Styles

### Container
- padding: 50px 15px
- maxWidth: 1140px
- margin: 0 auto
- display: flex
- gap: 30px
- alignItems: center

### Image Column
- flex: 1
- borderRadius: 4px
- overflow: hidden

### Image
- width: 100%
- height: auto
- objectFit: cover

### Text Column
- flex: 1

### Description
- fontSize: 16px
- lineHeight: 24px
- color: #22313d
- textAlign: justify

## Text Content
"Notre équipe connaît parfaitement Marrakech et se passionne pour proposer des villas de charme et de caractère, idéales pour une location de villa de luxe à Marrakech. Ces villas se distinguent par leur style architectural unique, alliant tradition marocaine et modernité. Que vous recherchiez une villa avec piscine privée, un riad traditionnel ou une propriété de luxe avec vue sur l'Atlas, Villa Premium vous propose une sélection exclusive de villas soigneusement choisies pour leur charme, leur confort et leur emplacement privilégié."

## Assets
- Image: `public/images/sections/courte-duree.webp`

## Responsive Behavior
- **Desktop (1440px):** Two columns side by side
- **Tablet (768px):** Two columns, smaller gap
- **Mobile (390px):** Stack vertically (image on top)
