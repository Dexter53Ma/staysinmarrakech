# LocationSection Specification

## Overview
- **Target file:** `src/components/LocationSection.tsx`
- **Screenshot:** `docs/design-references/www.villapremium.fr/full-page-desktop.png`
- **Interaction model:** Static

## DOM Structure
- `.third-section.bg-overlay.qs_background` (full-width)
  - Background image with dark overlay
  - Title (white)
  - Description (white)
  - "Voir plus" button

## Computed Styles

### Container
- backgroundImage: url(location-villa-marrakech.webp)
- backgroundSize: cover
- backgroundPosition: center
- padding: 100px 15px
- position: relative
- textAlign: center

### Overlay
- position: absolute
- top: 0, left: 0, right: 0, bottom: 0
- background: rgba(0, 0, 0, 0.4)
- zIndex: 1

### Content (above overlay)
- position: relative
- zIndex: 2
- maxWidth: 1140px
- margin: 0 auto

### Title
- fontSize: 30px
- fontWeight: 700
- textTransform: uppercase
- color: white
- marginBottom: 20px

### Description
- fontSize: 18px
- lineHeight: 27px
- color: white
- marginBottom: 20px

### Button
- background: #0d47a1
- color: white
- padding: 10px 30px
- borderRadius: 4px
- textTransform: uppercase
- fontWeight: 600
- hover: background darkens
- transition: 0.2s ease-out

## Text Content
- Title: "Villa Premium : Location de villa de luxe a Marrakech"
- Description: "Villa Premium est une société spécialisée dans la location de villas de luxe et de prestige à Marrakech."
- Button: "Voir plus"

## Assets
- Background: `public/images/sections/location-villa-marrakech.webp`

## Responsive Behavior
- **Desktop (1440px):** Centered, max-width 1140px
- **Tablet (768px):** Padding reduces
- **Mobile (390px):** Full width, smaller text
