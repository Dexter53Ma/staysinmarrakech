# Behaviors - villapremium.fr Homepage

## Scroll Behaviors
- **No scroll-driven animations** - page uses native scrolling
- **No scroll-snap** - sections flow naturally
- **No Lenis/Locomotive Scroll** - standard browser scrolling
- **No sticky elements** - header is relative positioned
- **No IntersectionObserver animations** - all sections static

## Carousel Behaviors

### Hero Carousel
- **Type:** Auto-rotating image carousel
- **Trigger:** Time-based (~5 second interval)
- **Animation:** Slide transition with transform: 0.6s ease-in-out
- **Images:** 6 villa photos cycling
- **Controls:** Previous/Next arrows, dot indicators

### Villa Cards Carousel (Slick)
- **Type:** Click/drag-driven carousel
- **Trigger:** User interaction (click arrows or drag)
- **Animation:** Slide transition
- **Items:** 6 villa cards with image, title, features, contact buttons
- **Responsive:** Shows 3 cards at desktop, stacks at mobile

### Quartiers Carousel (Slick)
- **Type:** Click/drag-driven carousel
- **Trigger:** User interaction
- **Items:** 10 neighborhood images with hover overlay
- **Hover effect:** Image zoom + overlay text appears

### Activities Carousel (Slick)
- **Type:** Click/drag-driven carousel
- **Trigger:** User interaction
- **Items:** 20+ activity images with hover overlay
- **Hover effect:** Image zoom + overlay text appears

## Hover States

### Navigation Links
- Color change on hover (from white to gold/amber)
- Transition: 0.2s ease-out

### Quartiers Items
- Image scales up slightly
- Overlay with text appears
- Transition: 0.2s ease-out

### Activities Items
- Image scales up slightly
- Overlay with text appears
- Transition: 0.2s ease-out

### Villa Card Contact Buttons
- Phone/WhatsApp/Contact icons
- Background color change on hover

### Footer Links
- Color change on hover
- Transition: 0.2s ease-out

## Click Behaviors

### Navigation Dropdowns
- "Nos Services" has multi-level dropdown
- Hover to open, click to navigate
- Submenu items for activities

### Newsletter Form
- Email input field
- Subscribe button
- Form submission (likely AJAX)

### Villa Card Links
- Click card title → villa detail page
- Click phone icon → tel: link
- Click WhatsApp → wa.me link
- Click contact → contact form page

## Form Interactions

### Search Form (Hero)
- Destination input with autocomplete
- Date picker (jQuery UI datepicker)
- Guest count selector
- Search button

### Newsletter Form
- Email input
- Subscribe button

## Responsive Behaviors

### Desktop (1440px)
- Full navigation with dropdowns
- 3 villa cards visible in carousel
- 5 icons in skewed cards
- 10 quartiers in grid
- 5-column footer

### Tablet (768px)
- Hamburger menu (likely)
- 2 villa cards visible
- Icons stack
- Quartiers carousel
- 2-3 column footer

### Mobile (390px)
- Hamburger menu
- 1 villa card visible
- Icons stack vertically
- Single column layout
- 1-2 column footer

## Animation Details

### Carousel Transitions
- Hero: transform 0.6s ease-in-out
- Slick carousels: default slick transitions

### Hover Transitions
- Navigation: color 0.2s ease-out
- Cards: transform 0.2s ease-out
- Images: transform 0.2s ease-out

### No Keyframe Animations
- Page does not use CSS keyframe animations
- All transitions are hover/state-based

## JavaScript Libraries Detected
- jQuery (implied by jQuery UI datepicker)
- Slick Carousel (for villa cards, quartiers, activities)
- jQuery UI (datepicker, autocomplete)
- No React/Vue/Angular - this is a vanilla JS/jQuery site
