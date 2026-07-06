# ARCHITECTURE.md — System Architecture & Component Hierarchy

This document explains the high-level technical architecture of the Creative Portfolio frontend application.

---

## 1. Architecture Overview

The application follows a **component-driven, data-driven, single-page application (SPA)** pattern.

- All page content is sourced from a single configuration file (`sliderData.js`)
- React Router handles client-side navigation between pages without full page reloads
- Framer Motion drives all visual transitions — no CSS animation keyframes are used for interactive elements
- CSS Modules ensure zero style bleed between components

```
┌─────────────────────────────────────────────────────────────────┐
│  Browser (http://localhost:5173)                                 │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  index.html  (Vite HTML entry)                           │   │
│  │    └── <div id="root">                                   │   │
│  │           └── main.jsx (React DOM mount)                 │   │
│  │                  └── <App />                             │   │
│  │                       └── <BrowserRouter>               │   │
│  │                            └── <AppRoutes />            │   │
│  │                                 ├── /  → <Landing />    │   │
│  │                                 ├── /education          │   │
│  │                                 ├── /ngo                │   │
│  │                                 ├── /stock-market       │   │
│  │                                 ├── /business           │   │
│  │                                 └── /blog               │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Component Hierarchy (Landing Page)

```
<Landing>
│
│  [State: activeIndex (integer, 0–4)]
│  [State: sessionStorage sync for back-navigation]
│
├── <BackgroundTypography text={bgTypography} />
│     └── Framer Motion AnimatePresence crossfade
│         (renders huge faded word: LEARN / IMPACT / ANALYZE / VENTURE / WRITE)
│
├── <header> (top intro text — "CREATIVE SHOWCASE")
│     └── Framer Motion fade-in-down on mount
│
├── <Slider cards={sliderData} activeIndex setActiveIndex>
│     │
│     └── [cards.map()] → <motion.div> (card wrapper with spring animation)
│           │
│           └── <Card title image accentColor isActive />
│                 ├── <img> (project image)
│                 ├── <div overlay> (gradient overlay)
│                 └── <div contentOverlay>
│                       ├── <span> "VIEW CASE STUDY"
│                       ├── <h3> title
│                       └── <div> accent underline
│
└── <BottomNavigation cards activeIndex setActiveIndex accentColor>
      ├── thumbnail <img> (current card preview)
      ├── <span> current card title
      ├── <button> ← prev
      ├── <div> 1 / 5 page indicator
      ├── <button> next →
      └── <button> ☰ menu (extensible)
```

---

## 3. Component Hierarchy (Subpages)

All subpages share the same layout structure:

```
<Education> (or NGO, StockMarket, Business, Blog)
│
├── <Hero title tagline description accentColor bgGradient>
│     ├── <button> ← Back (navigates to /)
│     ├── <span> tagline  (colored with accentColor)
│     ├── <h1> title
│     ├── <p> description
│     └── <div> glow blob (radial gradient accent)
│
└── <main> (.mainContent)
      └── <section> (.futureContent)
            └── <div> (.placeholderCard)  ← teammate fills this in
                  ├── <h3> section name
                  ├── <p> guidance text
                  └── <div> glow circle
```

---

## 4. Data Flow

```
sliderData.js (source of truth)
       │
       ├── imported by Landing.jsx
       │     └── passed as `cards` prop to:
       │           ├── Slider (renders all cards)
       │           └── BottomNavigation (reads active card)
       │
       └── imported by each subpage (Education, NGO, etc.)
             └── .find(item => item.route === '/education')
                   └── passes props to Hero component
```

---

## 5. State Flow

```
Landing.jsx owns: activeIndex (integer)
        │
        ├── reads from sessionStorage on mount (back-navigation memory)
        ├── writes to sessionStorage on every change
        │
        ├── passed DOWN to Slider → used to position cards
        │     └── Slider also calls setActiveIndex when:
        │           - user clicks side card (pull to center)
        │           - user swipes left/right (drag gesture)
        │           - user presses ArrowLeft / ArrowRight keys
        │
        └── passed DOWN to BottomNavigation → used to show current title
              └── BottomNavigation also calls setActiveIndex when:
                    - user clicks ← prev button
                    - user clicks next → button
```

---

## 6. Navigation Flow

```
User on Landing (/)
       │
       ├── clicks active centered card
       │     └── Slider.jsx → navigate(card.route)
       │           └── React Router loads Education / NGO / etc.
       │
       └── clicks side card
             └── setActiveIndex(index) — pulls card to center
                   └── no navigation, just slider update

User on subpage (/education)
       └── clicks ← Back button
             └── Hero.jsx → navigate('/')
                   └── Landing loads with SAME activeIndex (sessionStorage)
```

---

## 7. Animation Architecture

```
Entry Animations (on mount):
  Landing header text → opacity 0→1, y -20→0 (Framer Motion, delay 0.2–0.3s)

Background Crossfade:
  AnimatePresence (popLayout) → opacity 0→1→0 over 0.8s
  Triggered every time activeIndex changes

BackgroundTypography:
  AnimatePresence (wait) → y 50→0, scale 0.95→1, opacity 0→0.03
  Reversed on exit: y 0→-50, scale 1→1.02

Card Slide (Slider):
  Spring physics: stiffness 170, damping 24, mass 0.8
  Properties animated: x, scale, opacity, rotateY
  Active card:   x=0,     scale=1.0, opacity=1.0,  rotateY=0
  Prev card:     x=-22vw, scale=0.8, opacity=0.45, rotateY=15°
  Next card:     x=+22vw, scale=0.8, opacity=0.45, rotateY=-15°
  Hidden cards:  x=±45vw, scale=0.65, opacity=0,  rotateY=±30°

Hover Animations (CSS Transitions, 0.4–0.8s):
  Card image → scale(1.06), brightness(1)
  Sub label  → translateY(0), opacity 1
  Accent line → width 0 → 100%
  Back button → translateY(-2px)
  Nav buttons → translateY(-1px)
```

---

## 8. Responsive Breakpoints

| Breakpoint | Behaviour |
|---|---|
| > 1024px | Full desktop: 3 cards visible (prev + active + next) |
| 769–1024px | Tablet: same layout, smaller card dimensions |
| ≤ 768px | Mobile: single card only, side cards opacity=0 |

---

## 9. Folder Philosophy

```
components/   ← Reusable, stateless or minimal-state UI pieces
pages/        ← Route-level containers, each owns its own state
data/         ← Plain JS config, no React, easily importable anywhere
routes/       ← Router wiring only, no business logic
assets/       ← Static binary files (images), grouped by feature
```

**Rule:** Pages import from `components/` and `data/`. Components never import from `pages/`. Data never imports from anywhere.

---

## 10. Scalability Notes

- Adding a new section = add one object to `sliderData.js` + create one page folder
- Backend integration = replace static `sliderData.js` entries with API fetch inside a `useEffect` or React Query hook
- Authentication = wrap `<AppRoutes />` in an `<AuthProvider>` context, add protected `<Route>` wrappers
- Global state = if complexity grows, introduce Zustand or React Context above `<AppRoutes />`
