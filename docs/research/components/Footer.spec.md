# Footer Specification

## Overview
- **Target file:** `src/components/Footer.tsx`
- **Interaction model:** Static

## DOM Structure
- `.footer-container` (full-width, dark background)
  - 5 columns of links
  - Social media icons
  - Copyright text

## Computed Styles

### Container
- background: rgb(0, 17, 34)
- padding: 50px 15px 20px
- color: white

### Grid
- display: grid
- gridTemplateColumns: repeat(5, 1fr)
- gap: 30px
- maxWidth: 1140px
- margin: 0 auto

### Column Title
- fontSize: 18px
- fontWeight: 600
- color: #d9d9d9
- marginBottom: 8px

### Link
- fontSize: 14px
- color: #d9d9d9
- hover: color white
- transition: 0.2s ease-out
- display: block
- marginBottom: 5px

### Social Icons
- display: flex
- gap: 15px
- marginTop: 20px

### Social Icon
- color: #d9d9d9
- fontSize: 20px
- hover: color white
- transition: 0.2s ease-out

### Copyright
- textAlign: center
- marginTop: 30px
- paddingTop: 20px
- borderTop: 1px solid rgba(255,255,255,0.1)
- fontSize: 14px
- color: #d9d9d9

## Footer Columns

### Column 1: Location & vente villas
- Location villa Marrakech
- Villa a louer Marrakech
- Achat villa Marrakech
- Location villa pour mariage Marrakech
- Location villa Marrakech avec piscine privée
- Location villa Marrakech avec piscine chauffée
- Location villa courte durée Marrakech
- Louer villa pour vacances Marrakech
- Vente villa Marrakech
- Villa a vendre marrakech

### Column 2: Liens utiles
- Location villa luxe Gueliz
- Location villa luxe palmeraie
- Location villa luxe route de l'Ourika
- Location villa luxe Royal Palm
- Location villa luxe golf de Samanah
- Location villa luxe Targa
- Location villa luxe désert d'Agafay
- Location villa luxe Medina
- Location villa luxe route de Fès
- Location villa luxe golf Amelkis

### Column 3: Services & activités
- Villas & Repas
- Location voiture de luxe Marrakech
- Location Van Marrakech
- Soins & Bien-être
- Quad/Buggy
- Aqua Karting
- Karting
- Golf
- Paintball
- Voyage en montgolfière

### Column 4: À propos
- (empty in original)

### Column 5: Contact
- Residence Farah, Camp Mangin, Gueliz, 40000 Marrakech
- +33 6 19 07 84 48
- + 212 6 59 59 33 49
- contact@villapremium.fr
- www.villapremium.fr

### Social Links
- Facebook: https://www.facebook.com/villapremium.fr/
- Twitter: https://twitter.com/villapremium
- Instagram: https://www.instagram.com/villapremium.fr/
- LinkedIn: https://www.linkedin.com/company/villa-premium/

## Copyright Text
"© 2026 All rights reserved - Villa premium"

## Responsive Behavior
- **Desktop (1440px):** 5 columns
- **Tablet (768px):** 3 columns
- **Mobile (390px):** 1 column (stacked)
