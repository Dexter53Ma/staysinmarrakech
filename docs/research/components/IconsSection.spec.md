# Icons Section Specification

## Overview
- **Target file:** `src/components/IconsSection.tsx`
- **Screenshot:** `docs/design-references/www.villapremium.fr/full-page-desktop.png`
- **Interaction model:** Static

## DOM Structure
- `.icons-home-container` (full-width, black background)
  - 5 skewed cards in a row
    - Each card: icon + title + description

## Computed Styles

### Container
- background: black
- padding: 20px 15px
- display: flex
- justifyContent: space-between
- gap: 5px

### Card
- background: black
- color: white
- padding: 5px
- width: ~282px
- height: 130px
- transform: skewX(-10deg)
- transition: all 0.2s ease-out

### Card Inner (text container)
- transform: skewX(10deg) (counter-skew)
- textAlign: center

### Icon
- fontSize: 32px
- color: white
- marginBottom: 10px

### Title
- fontSize: 16px
- fontWeight: 700
- textTransform: uppercase
- marginBottom: 5px

### Description
- fontSize: 12px
- fontWeight: 300

## Content (5 cards)
1. **Expérience** - "Villa Premium est une société spécialisée dans la location de villas de luxe et de prestige à Marrakech."
2. **Base de données clients** - "+ de 15000 contacts"
3. **Qualité des villas** - "Villas de charme et de caractère"
4. **Services intégrés** - "Conciergerie, ménage, maintenance..."
5. **Présence sur place** - "Accompagnement personnalisé"

## Assets
- Icons: FontAwesome (faStar, faUsers, faHome, faConciergeBell, faShieldAlt)

## Responsive Behavior
- **Desktop (1440px):** 5 cards in a row
- **Tablet (768px):** 3 cards, then 2
- **Mobile (390px):** Stack vertically (1 column)
