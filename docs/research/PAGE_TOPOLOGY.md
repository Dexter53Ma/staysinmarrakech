# Page Topology - villapremium.fr Homepage

## Visual Order (Top to Bottom)

1. **Top Bar** (fixed within header)
   - Phone numbers, email, language/currency selectors, wishlist link
   - Position: relative, part of header-container

2. **Navigation Bar**
   - Logo (left), main nav links (Location, Vente, Nos Services dropdowns)
   - Position: relative, part of header-container

3. **Hero Section** (#slider)
   - Background: header-bg.webp (full-width cover)
   - Carousel with 6 villa images (auto-rotating)
   - Search form overlay (destination, dates, guests)
   - Height: ~414px (from top of slider)

4. **Icons Section** (#second-section)
   - 5 black skewed cards with icons: Expérience, Base de données clients, Qualité des villas, Services intégrés, Présence sur place
   - Transform: skewX(-10deg)
   - Height: 150px

5. **Villa Selection Section** (.second-section)
   - Title: "Découvrez notre sélection de villas de luxe à Marrakech"
   - Subtitle: "Une sélection des meilleures villas à Marrakech."
   - Slick carousel with 6 villa cards (image, title, features, contact buttons)
   - Height: ~568px

6. **Location Section** (.third-section.bg-overlay)
   - Background: location-villa-marrakech.webp with overlay
   - Title (white): "Villa Premium : Location de villa de luxe a Marrakech"
   - Description (white): Company description
   - "Voir plus" button
   - Height: ~350px

7. **Short-term Rental Section** (.second-section)
   - Image: location-villas-courte-duree-a-marrakech.webp (left)
   - Description text (right): Detailed paragraph about short-term rentals
   - Height: ~580px

8. **Quartiers Section** (.fifth-section.quartiers-container)
   - Title: "Location villas Marrakech"
   - Grid of 10 neighborhood images with hover overlay
   - Slick carousel
   - Height: ~558px

9. **Events Section** (.third-section.bg-overlay)
   - Background: location-villa-de-luxe-pour-vacances-a-marrakech.webp
   - Title (white): "Location villa de luxe pour vacances à Marrakech"
   - Description (white): Events description
   - Height: ~450px

10. **Activities Section** (.fifth-section.activites-container)
    - Title: "Activités marrakech à découvrir"
    - Grid of 20+ activity images with hover overlay
    - Slick carousel
    - Height: ~582px

11. **Newsletter Section** (.newsletter-container)
    - Description text about newsletter
    - Email input + subscribe button
    - Height: ~170px

12. **Blog Section** (.fifth-section)
    - Title: "Derniers articles du blog"
    - Grid of 3 blog cards (image, title, excerpt)
    - "Découvrez tous les articles du blog" link
    - Height: ~582px

13. **Footer** (.footer-container)
    - Background: rgb(0, 17, 34) (dark navy)
    - 5 columns: Location & vente, Liens utiles, Services & activités, À propos, Contact
    - Social media icons
    - Copyright text
    - Height: ~645px

## Layout Structure
- Overall: Single column, full-width sections
- No sticky elements (header is relative)
- No scroll-snap
- No smooth scroll library (native scrolling)
- Z-index: slider has z-index 10, rest is static

## Interaction Models
- Hero: Auto-rotating carousel (time-driven, ~5s interval)
- Villa cards: Slick carousel (click/drag-driven)
- Quartiers: Slick carousel (click/drag-driven)
- Activities: Slick carousel (click/drag-driven)
- Icons: Static (no interaction)
- Newsletter: Form input (click-driven)
- Nav dropdowns: Hover-driven (CSS)
- All sections: Static on scroll (no scroll animations)

## Dependencies
- Header overlays hero section (relative positioning)
- Search form overlays hero carousel
- No floating elements or modals
