# EventsSection Specification

## Overview
- **Target file:** `src/components/EventsSection.tsx`
- **Interaction model:** Static

## DOM Structure
- `.third-section.bg-overlay.qs_background` (full-width)
  - Background image with dark overlay
  - Title (white)
  - Description (white)

## Computed Styles

### Container
- backgroundImage: url(location-villa-de-luxe-pour-vacances-a-marrakech.webp)
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

### Content
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
- fontSize: 16px
- lineHeight: 24px
- color: white
- marginBottom: 20px

## Text Content
- Title: "Location villa de luxe pour vacances à Marrakech"
- Description: "Réservez une villa à Marrakech avec Villa Premium pour profiter d'un séjour unique alliant confort, élégance et services haut de gamme."

## Assets
- Background: `public/images/sections/vacances-marrakech.webp`

## Responsive Behavior
- **Desktop (1440px):** Centered, max-width 1140px
- **Tablet (768px):** Padding reduces
- **Mobile (390px):** Full width, smaller text
