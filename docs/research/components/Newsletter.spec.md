# Newsletter Specification

## Overview
- **Target file:** `src/components/Newsletter.tsx`
- **Interaction model:** Click-driven (form submission)

## DOM Structure
- `.newsletter-container` (container)
  - Description text
  - Email input + subscribe button

## Computed Styles

### Container
- padding: 50px 15px 0
- maxWidth: 1140px
- margin: 0 auto
- textAlign: center

### Description
- fontSize: 16px
- lineHeight: 24px
- color: #22313d
- marginBottom: 20px

### Form
- display: flex
- justifyContent: center
- gap: 10px

### Input
- padding: 10px 15px
- border: 1px solid #eaedf1
- borderRadius: 4px
- fontSize: 14px
- width: 300px

### Button
- background: #0d47a1
- color: white
- padding: 10px 30px
- borderRadius: 4px
- fontWeight: 600
- textTransform: uppercase
- hover: background darkens
- transition: 0.2s ease-out

## Text Content
"Rejoignez notre newsletter et restez informé des dernières nouveautés, offres exclusives de location villa marrakech et événements exceptionnels de Villa Premium. Inscrivez-vous dès maintenant !"

## Responsive Behavior
- **Desktop (1440px):** Centered form
- **Tablet (768px):** Form stacks
- **Mobile (390px):** Full width input and button
