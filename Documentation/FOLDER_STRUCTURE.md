# FOLDER_STRUCTURE.md — Directory Reference

Every folder in this project has a defined purpose and ownership. This document explains what lives where and why.

---

## Root Level: `portfolio/`

```
portfolio/
├── frontend/                ← All React source code
├── README.md                ← Project overview and quick-start
├── ARCHITECTURE.md          ← System design and component diagrams
├── FOLDER_STRUCTURE.md      ← This file
├── ROUTING.md               ← Route map and navigation guide
├── PROJECT_DOCUMENTATION.md ← Full file-by-file developer reference
└── COMPONENT_GUIDELINES.md  ← Component authoring standards
```

**Why separate `frontend/` from root?**
The root `portfolio/` folder is reserved for the full project monorepo. Future additions will sit alongside `frontend/`:

```
portfolio/
├── frontend/    ← React SPA (this project)
├── backend/     ← Future: Node.js / Express REST API
└── admin/       ← Future: Admin portal for blog management
```

This structure means the frontend team, backend team, and admin portal team can work in completely separate directories without conflicts.

---

## `frontend/`

```
frontend/
├── public/          ← Static assets served at root URL
├── src/             ← All application source code
├── index.html       ← Vite HTML shell (single root div)
├── package.json     ← npm scripts and dependency list
├── vite.config.js   ← Vite bundler settings
└── .gitignore       ← Files excluded from git tracking
```

---

## `frontend/public/`

Static files that are served directly by the web server without processing.

- Place favicons, `robots.txt`, or any file that needs a fixed public URL here.
- Do NOT store project images here — use `src/assets/images/` instead (Vite optimises those).

---

## `frontend/src/`

```
src/
├── assets/
├── components/
├── data/
├── pages/
├── routes/
├── App.jsx
├── main.jsx
└── index.css
```

---

## `frontend/src/assets/`

```
assets/
└── images/
    ├── education/
    │   └── education.jpg
    ├── ngo/
    │   └── ngo.jpg
    ├── stock-market/
    │   └── stock-market.jpg
    ├── business/
    │   └── business.jpg
    └── blog/
        └── blog.jpg
```

**Rules:**
- Each section gets its own subfolder using **kebab-case** naming
- Images are imported directly into `sliderData.js` using relative paths
- Never hardcode image URLs as strings — always import them so Vite can hash and optimise the file
- When adding a new image, create a new subfolder: `assets/images/my-section/my-section.jpg`

**Who owns this:** Any team member adding a new portfolio section

---

## `frontend/src/components/`

```
components/
├── BackgroundTypography/
│   ├── BackgroundTypography.jsx
│   └── BackgroundTypography.module.css
├── BottomNavigation/
│   ├── BottomNavigation.jsx
│   └── BottomNavigation.module.css
├── Card/
│   ├── Card.jsx
│   └── Card.module.css
├── Hero/
│   ├── Hero.jsx
│   └── Hero.module.css
└── Slider/
    ├── Slider.jsx
    └── Slider.module.css
```

**Rules:**
- Each component lives in its own folder
- Every component has a paired `.module.css` file
- Components are **reusable** — they accept props, they do not hard-code content
- Components never import from `pages/`
- Components may import from other `components/` (e.g. Slider imports Card)

**Who owns this:** UI/Frontend developers

---

## `frontend/src/data/`

```
data/
└── sliderData.js
```

This is the **single source of truth** for all portfolio section configuration.

- Contains the full array of section objects
- Each object defines: `id`, `title`, `image`, `route`, `bgTypography`, `bgGradient`, `bgImage`, `accentColor`, `tagline`, `description`
- Adding a new portfolio section starts here

**Who owns this:** Lead frontend developer (coordinate changes to avoid merge conflicts)

---

## `frontend/src/pages/`

```
pages/
├── Landing/
│   ├── Landing.jsx
│   └── Landing.module.css
├── Education/
│   ├── Education.jsx
│   └── Education.module.css
├── NGO/
│   ├── NGO.jsx
│   └── NGO.module.css
├── StockMarket/
│   ├── StockMarket.jsx
│   └── StockMarket.module.css
├── Business/
│   ├── Business.jsx
│   └── Business.module.css
└── Blog/
    ├── Blog.jsx
    └── Blog.module.css
```

**Rules:**
- One folder per route/page — never mix multiple pages in one folder
- Pages may import reusable `components/`, `data/`, and their own styles
- Pages are the only place route-level state (like `activeIndex`) should live
- Each page folder is **independently developable** — different team members can work on different pages simultaneously

**Who owns this:** Each section's assigned developer team

---

## `frontend/src/routes/`

```
routes/
└── AppRoutes.jsx
```

Contains only the React Router `<Routes>` and `<Route>` configuration. No business logic, no styling.

**Who owns this:** Lead frontend developer / architect

---

## `frontend/src/App.jsx`

Root component. Wraps the application in `<BrowserRouter>` and renders `<AppRoutes />`. Nothing else should be added here.

---

## `frontend/src/main.jsx`

React DOM entry point. Mounts `<App />` to `<div id="root">` in `index.html`. Wraps in `<StrictMode>` for development warnings.

---

## `frontend/src/index.css`

Global stylesheet. Contains:
- Google Fonts import (`Outfit`)
- CSS custom properties (design tokens)
- Universal reset (`* { box-sizing: border-box; margin: 0; padding: 0; }`)
- Body defaults
- Custom scrollbar styles
- Accessibility utility (`.sr-only`)

**Rule:** Only **global** styles go here. Component-specific styles belong in `.module.css` files.

---

## Naming Conventions Summary

| Resource | Convention | Example |
|---|---|---|
| Component files | PascalCase | `Card.jsx`, `Slider.jsx` |
| CSS module files | PascalCase + `.module.css` | `Card.module.css` |
| CSS class names | camelCase | `.cardWrapper`, `.navPanel` |
| Image folders | kebab-case | `stock-market/`, `ngo/` |
| Image files | kebab-case | `stock-market.jpg` |
| Page folders | PascalCase | `StockMarket/`, `Education/` |
| Data files | camelCase | `sliderData.js` |
| Route files | PascalCase | `AppRoutes.jsx` |
