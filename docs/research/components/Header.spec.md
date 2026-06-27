# Header Specification

## Overview
- **Target file:** `src/components/Header.tsx`
- **Screenshot:** `docs/design-references/www.villapremium.fr/full-page-desktop.png`
- **Interaction model:** Static with hover-driven dropdowns

## DOM Structure
- `.header-container` (full-width, background image)
  - `.top-bar` (phone, email, language, currency, wishlist)
  - `.navbar` (logo, nav links)
    - Logo (left)
    - Nav links: Location, Vente, Nos Services (with dropdowns)
  - Hero carousel (overlay on header background)
  - Search form (overlay on carousel)

## Computed Styles

### Header Container
- background: url(header-bg.webp) no-repeat center/cover
- padding: 0 15px 20px
- position: relative

### Top Bar
- fontSize: 12.8px
- color: white
- display: flex
- justifyContent: space-between
- alignItems: center
- padding: 5px 15px

### Navigation
- display: flex
- justifyContent: space-between
- alignItems: center
- padding: 15px 0

### Logo
- height: ~60px
- width: auto

### Nav Links
- color: white
- fontSize: 16px
- fontWeight: 500
- textTransform: uppercase
- hover: color changes to gold (#ffb000)
- transition: 0.2s ease-out

## States & Behaviors

### Dropdown Menus
- Trigger: hover on parent link
- State A: hidden (display: none)
- State B: visible (display: block)
- Animation: fade in (opacity transition)

## Assets
- Logo: `public/images/logo.svg`
- Header background: `public/images/header-bg.webp`
- Icons: FontAwesome (phone, envelope, heart, language, money, bars, chevron-down)

## Text Content
- Phone: "+33 6 19 07 84 48"
- Phone: "+ 212 6 59 59 33 49"
- Email: "contact@villapremium.fr"
- Wishlist: "Ma sélection"
- Language: "Français"
- Currency: "EUR"
- Nav: "Location", "Vente", "Nos Services"
- Dropdown items: "Votre séjour", "Vos repas", "Votre transport sur place", etc.

## Responsive Behavior
- **Desktop (1440px):** Full navigation with dropdowns
- **Tablet (768px):** Hamburger menu, dropdowns become full-width
- **Mobile (390px):** Hamburger menu, stacked layout
- **Breakpoint:** ~768px
