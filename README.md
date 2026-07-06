# Creative Portfolio — Frontend

A premium, Apple-inspired interactive portfolio landing page built with **React + Vite**, featuring a 3D card slider, glassmorphism navigation, cinematic background transitions, and a modular architecture designed for team collaboration.

---

## 🚀 Quick Start

```bash
# Step 1 — navigate into the frontend folder
cd frontend

# Step 2 — install all dependencies
npm install

# Step 3 — start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

> ⚠️ **Important:** All npm commands must be run from inside the `frontend/` folder, NOT from the root `portfolio/` folder.

---

## 📦 Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | ^19.2.7 | UI component framework |
| `react-dom` | ^19.2.7 | DOM rendering layer |
| `react-router-dom` | ^7.18.1 | Client-side page routing |
| `framer-motion` | ^12.42.2 | Animations and transitions |
| `react-icons` | ^5.7.0 | Icon library (Ionicons set) |
| `vite` | ^8.1.1 | Build tool and dev server |

---

## 📁 Project Structure

```
portfolio/               ← Repo root (future: backend/, admin/ go here)
└── frontend/            ← All React source code lives here
    ├── public/          ← Static public assets
    ├── src/
    │   ├── assets/
    │   │   └── images/  ← Card images, grouped by section
    │   ├── components/  ← Reusable UI components
    │   ├── data/        ← Central config (sliderData.js)
    │   ├── pages/       ← Route-level page components
    │   ├── routes/      ← Router configuration
    │   ├── App.jsx      ← Root component with BrowserRouter
    │   ├── main.jsx     ← React DOM entry point
    │   └── index.css    ← Global styles & design tokens
    ├── index.html       ← HTML entry point
    ├── package.json     ← Dependencies and scripts
    └── vite.config.js   ← Vite bundler configuration
```

---

## 🛠️ Available Scripts

Run these from inside the `frontend/` directory:

```bash
npm run dev       # Start local dev server at http://localhost:5173
npm run build     # Build optimised production bundle to dist/
npm run preview   # Preview the production build locally
npm run lint      # Run oxlint code quality checks
```

---

## 🎨 Design Philosophy

- **Dark mode first** — rich blacks (#050508) with glassmorphism overlays
- **Apple-inspired** — minimal, cinematic, smooth spring physics
- **Typography-driven** — oversized faded letters float behind the slider
- **Data-driven** — all card content, colors, and backgrounds edit from one file: `sliderData.js`

---

## 🗺️ Routes

| Path | Page | Description |
|---|---|---|
| `/` | Landing | Interactive slider showcase |
| `/education` | Education | Placeholder — education case study |
| `/ngo` | NGO | Placeholder — community impact section |
| `/stock-market` | StockMarket | Placeholder — financial analytics |
| `/business` | Business | Placeholder — enterprise strategies |
| `/blog` | Blog | Placeholder — backend-connected blog feed |

---

## ✏️ How to Customise the Landing Page

All editable values live in `frontend/src/data/sliderData.js`:

- **Change background gradient** → edit `bgGradient` per card
- **Add a background image** → set `bgImage` to an imported image path
- **Change huge typography text** → edit `bgTypography` (e.g. `"LEARN"`)
- **Change accent color** → edit `accentColor` (supports any CSS color)
- **Change card image** → import a new image and assign to `image`

---

## 📖 Full Documentation

See [`PROJECT_DOCUMENTATION.md`](./PROJECT_DOCUMENTATION.md) for:
- File-by-file documentation
- Component relationship diagrams
- State management explanation
- Animation flow
- Team guidelines
- How to add new cards/pages

---

## 🤝 Contribution Guide

- **Components** → editable by UI/frontend developers
- **Pages** → each page is independent; teams can work in parallel
- **`sliderData.js`** → coordinate changes here to avoid merge conflicts
- **`index.css`** → global tokens only; never put page-specific styles here
- **`assets/images/`** → add new images in their own named subfolder

---

## 📐 Coding Standards

- Use **CSS Modules** for all component styling (`.module.css`)
- No inline styles except for **dynamic values** (colors, gradients from data)
- Component filenames use **PascalCase** (`Card.jsx`, `Slider.jsx`)
- CSS class names use **camelCase** (`.cardWrapper`, `.navPanel`)
- Image folders use **kebab-case** (`stock-market/`, `ngo/`)
- One component per file — no exceptions

---

## 🔮 Future Plans

- `backend/` — REST API / Node.js + Express server
- `admin/` — Admin portal for blog post management
- Blog section will connect to backend API for dynamic content
