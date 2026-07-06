# PROJECT_DOCUMENTATION.md — Complete Developer Reference

> **For new developers:** This document explains every folder, every file, every component, and every design decision in the project. Read this before touching any code.

---

## 1. Project Overview

### What is this project?

This is a **premium interactive portfolio landing page** built with React. It serves as the public-facing entry point for showcasing five portfolio sections: Education, NGO, Stock Market, Business, and Blog.

### Purpose

The landing page is a cinematic, Apple-inspired slider that displays five portfolio sections as large 3D-effect cards. The user can swipe, click, or use keyboard arrows to browse sections. Clicking the active card navigates to a dedicated section page. Each section page is a placeholder designed for independent development by separate teams.

### Architecture Summary

- **SPA (Single Page Application):** React Router handles navigation without full page reloads.
- **Data-driven:** All card content (text, colors, images, routes) is sourced from one config file (`sliderData.js`). Changing the landing page means editing only that file.
- **Component-driven:** Each UI element is an isolated, reusable React component with its own scoped CSS.
- **Future-ready:** The `blog/` page is pre-wired for backend API integration. The folder structure reserves space for `backend/` and `admin/` directories at the repo root.

---

## 2. Tech Stack

| Technology | Version | Why It's Used |
|---|---|---|
| **React** | ^19.2.7 | Component-based UI framework. Enables reusable, composable interface elements and efficient re-renders using the virtual DOM. |
| **React DOM** | ^19.2.7 | Renders React component trees into the actual browser DOM. |
| **React Router DOM** | ^7.18.1 | Handles client-side page routing. Maps URL paths (`/education`, `/blog`) to React components without server round-trips. |
| **Framer Motion** | ^12.42.2 | Production-grade animation library for React. Provides spring physics for the card slider, `AnimatePresence` for crossfade transitions, and drag gesture support. |
| **React Icons** | ^5.7.0 | Icon library. Used for navigation arrows (IoChevronBackOutline, IoChevronForwardOutline), menu icon (IoMenuOutline), and back arrow (IoArrowBackOutline). |
| **Vite** | ^8.1.1 | Build tool and development server. Extremely fast HMR (Hot Module Replacement), optimises assets on build, and tree-shakes unused code. |
| **CSS Modules** | built-in | Scoped CSS — class names are transformed to unique hashes at build time, preventing style leaks between components. |
| **Outfit (Google Fonts)** | — | The primary typeface. Outfit is a geometric sans-serif with weights from 300 (light) to 900 (black), giving the Apple-inspired aesthetic. |

**What is NOT used (and why):**
- ❌ Bootstrap / Tailwind — too opinionated; we need full visual control
- ❌ jQuery — React handles DOM manipulation
- ❌ Redux / MobX — state is simple enough for local React state + sessionStorage

---

## 3. Complete Folder Structure

```
portfolio/                        ← Repository root
│
├── README.md                     ← Quick start and project overview
├── PROJECT_DOCUMENTATION.md      ← This file — full developer reference
├── ARCHITECTURE.md               ← System diagrams and design decisions
├── FOLDER_STRUCTURE.md           ← Folder-by-folder ownership guide
├── ROUTING.md                    ← Route map and navigation guide
├── COMPONENT_GUIDELINES.md       ← Coding standards for component authors
│
└── frontend/                     ← All React application source
    │
    ├── index.html                ← HTML shell (single <div id="root">)
    ├── package.json              ← Dependencies and npm scripts
    ├── vite.config.js            ← Bundler configuration
    ├── .gitignore                ← Files excluded from version control
    │
    ├── public/                   ← Static files, served at root URL as-is
    │
    └── src/                      ← All React source code
        │
        ├── main.jsx              ← React DOM entry point
        ├── App.jsx               ← Root component, BrowserRouter setup
        ├── index.css             ← Global design tokens and resets
        │
        ├── assets/
        │   └── images/
        │       ├── education/
        │       │   └── education.jpg
        │       ├── ngo/
        │       │   └── ngo.jpg
        │       ├── stock-market/
        │       │   └── stock-market.jpg
        │       ├── business/
        │       │   └── business.jpg
        │       └── blog/
        │           └── blog.jpg
        │
        ├── data/
        │   └── sliderData.js     ← Central config: all card data lives here
        │
        ├── routes/
        │   └── AppRoutes.jsx     ← React Router <Routes> configuration
        │
        ├── components/
        │   ├── BackgroundTypography/
        │   │   ├── BackgroundTypography.jsx
        │   │   └── BackgroundTypography.module.css
        │   ├── BottomNavigation/
        │   │   ├── BottomNavigation.jsx
        │   │   └── BottomNavigation.module.css
        │   ├── Card/
        │   │   ├── Card.jsx
        │   │   └── Card.module.css
        │   ├── Hero/
        │   │   ├── Hero.jsx
        │   │   └── Hero.module.css
        │   └── Slider/
        │       ├── Slider.jsx
        │       └── Slider.module.css
        │
        └── pages/
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

---

## 4. File-by-File Documentation

---

### `frontend/index.html`

**Purpose:** HTML shell for the single-page application.

**What it does:**
- Defines the single `<div id="root">` that React mounts into
- Loads `src/main.jsx` as a module script
- Hosts meta tags (charset, viewport)

**Do not add:** Page content, stylesheets, or scripts — Vite injects everything automatically.

---

### `frontend/package.json`

**Purpose:** Defines project metadata, npm scripts, and dependency versions.

**Key scripts:**
```json
"dev":     "vite"           // Start dev server with HMR
"build":   "vite build"     // Create optimised production bundle
"preview": "vite preview"   // Test the production build locally
"lint":    "oxlint"         // Run code quality checks
```

**When to edit:** Only when adding/removing npm packages or adding new scripts.

---

### `frontend/vite.config.js`

**Purpose:** Vite bundler configuration.

**Current state:** Default Vite React config. The `@vitejs/plugin-react` plugin enables JSX transformation and React Fast Refresh.

**When to edit:** Adding path aliases, proxy API calls for development, or custom build output settings.

---

### `frontend/src/main.jsx`

**Purpose:** React application entry point.

**What it does:**
- Imports `index.css` (global styles)
- Creates a React root at `<div id="root">`
- Renders `<App />` inside `<StrictMode>`

**`StrictMode`:** A development-only wrapper that:
- Detects deprecated APIs
- Double-invokes render functions to catch side effects
- Does not affect production builds

**Do not add:** Routing, components, or any business logic here.

---

### `frontend/src/App.jsx`

**Purpose:** Root React component. Configures the Router.

**What it does:**
- Imports `BrowserRouter` from `react-router-dom`
- Wraps the entire app in `<BrowserRouter>` so all child components can use `useNavigate()` and `useLocation()`
- Renders `<AppRoutes />` which contains all page routes

**Why `BrowserRouter` is here and not in `main.jsx`:**
Placing it in `App.jsx` keeps routing concerns inside the component tree, making it easier to wrap with other providers (e.g. AuthProvider, ThemeProvider) in the future without modifying the DOM entry point.

**Do not add:** Anything else. This file should remain minimal.

---

### `frontend/src/index.css`

**Purpose:** Global stylesheet — design tokens, CSS resets, and base element styles.

**Sections:**
1. **Google Fonts import** — Loads Outfit typeface (weights 300–900)
2. **`:root` variables** — Reusable CSS custom properties:
   - `--font-family`: System font stack with Outfit first
   - `--transition-smooth`: Cubic bezier for smooth animations
   - `--transition-spring`: Cubic bezier for spring-like animations
   - `--glass-bg`, `--glass-border`, `--glass-shadow`, `--glass-blur`: Glassmorphism tokens
3. **Universal reset** — Zeroes margins, paddings, and sets `box-sizing: border-box`
4. **Body defaults** — Font, background color (#050508), anti-aliasing
5. **Custom scrollbar** — Thin dark scrollbar matching the design theme
6. **Element resets** — `<a>` (no underline), `<button>` (no border/background)
7. **`.sr-only`** — Screen reader only utility class for accessible hidden text

---

### `frontend/src/data/sliderData.js`

**Purpose:** Central configuration file. The single source of truth for all portfolio section data.

**What it exports:** `sliderData` — an array of 5 objects, one per portfolio section.

**Object schema:**

| Field | Type | Editable | Description |
|---|---|---|---|
| `id` | number | Yes | Unique identifier for React key |
| `title` | string | Yes | Display name of the section |
| `image` | imported module | Yes | Card image (imported via Vite) |
| `route` | string | Yes | URL path for React Router |
| `bgTypography` | string | ✅ Easily editable | Huge faded background word |
| `description` | string | Yes | Section description for subpage hero |
| `bgImage` | string | ✅ Easily editable | Background image URL (empty = use gradient) |
| `bgGradient` | string | ✅ Easily editable | CSS gradient for landing background |
| `accentColor` | string | ✅ Easily editable | Hex/CSS color for glow and borders |
| `tagline` | string | Yes | Short tagline for subpage hero |

**How to change the background behind the slider:**
```js
// Option 1: Pure CSS gradient (current default)
bgGradient: "linear-gradient(135deg, #150f2e 0%, #090615 100%)",
bgImage: "",

// Option 2: A background image (import it first!)
import myBg from '../assets/images/education/bg.jpg';
bgImage: myBg,
bgGradient: "",
```

**Dependencies:** None (pure JS, images imported at top)

**Reusable:** Yes — imported by Landing, and by every subpage

---

### `frontend/src/routes/AppRoutes.jsx`

**Purpose:** Defines all client-side URL routes.

**What it does:**
- Imports all 6 page components (Landing, Education, NGO, StockMarket, Business, Blog)
- Renders a `<Routes>` block with one `<Route>` per path

**Props:** None

**State:** None

**Dependencies:** `react-router-dom`

**Reusable:** No — this is configuration, not a UI component

---

### `frontend/src/components/BackgroundTypography/BackgroundTypography.jsx`

**Purpose:** Renders the large faded typographic word that floats behind the card slider (e.g. "LEARN", "IMPACT").

**Props:**

| Prop | Type | Required | Description |
|---|---|---|---|
| `text` | string | Yes | The word to display (e.g. "LEARN") |

**State:** None

**How it works:**
- Uses Framer Motion's `AnimatePresence` in `"wait"` mode — the current text exits BEFORE the new text enters
- Each text is keyed by its value (`key={text}`), so when `text` changes, Framer Motion detects the key change and triggers exit/enter animations
- The text animates from: `opacity: 0, y: 50, scale: 0.95` → `opacity: 0.03, y: 0, scale: 1`
- The tiny opacity value (`0.03`) creates the "ghosted" appearance through CSS, not an overlay

**Animation timeline:**
```
Old text: opacity 0.03 → 0, y 0 → -50, scale 1 → 1.02   (exit, 0.8s)
New text: opacity 0 → 0.03, y 50 → 0, scale 0.95 → 1    (enter, 0.8s)
```

**CSS:** `BackgroundTypography.module.css` — `font-size: clamp(8rem, 28vw, 32rem)`, blurred 2px

**Reusable:** Yes — can be used anywhere a full-screen background word is needed

---

### `frontend/src/components/BackgroundTypography/BackgroundTypography.module.css`

**Purpose:** Styles the giant background typography container and text element.

**Key styles:**
- `.container`: `position: absolute`, full viewport, `pointer-events: none`, `z-index: 1`
- `.typography`: `font-size: clamp(8rem, 28vw, 32rem)`, `font-weight: 900`, `filter: blur(2px)`, `white-space: nowrap`
- Responsive: scales down to `clamp(5rem, 24vw, 15rem)` on mobile (≤768px)

---

### `frontend/src/components/Card/Card.jsx`

**Purpose:** Renders a single portfolio section card with image, gradient overlay, title, and hover micro-animations.

**Props:**

| Prop | Type | Required | Description |
|---|---|---|---|
| `title` | string | Yes | Section name shown on the card |
| `image` | string (url) | Yes | Imported image module for the card background |
| `isActive` | boolean | Yes | Whether this card is the current centered card |
| `accentColor` | string | Yes | CSS color for the accent line and sub-label |

**State:** None

**How it works:**
- The `accentColor` prop is injected as a CSS custom property: `style={{ '--accent-color': accentColor }}`
- CSS module rules that use `var(--accent-color)` automatically pick it up
- The "VIEW CASE STUDY" label and accent underline are hidden by default and revealed on hover via CSS transitions

**Hover effects (CSS only):**
1. `.cardImg` scales to `1.06` and brightness goes to `1` (image zoom + brighten)
2. `.sub` (VIEW CASE STUDY label) translates from `y: 10px` to `y: 0` (slide up)
3. `.borderLine` grows from `width: 0` to `width: 100%` (expanding underline)

**Click handling:** NOT inside `Card.jsx`. Click events are handled in `Slider.jsx`'s `motion.div` wrapper to maintain separation of concerns.

**Reusable:** Yes — can display any image/title/accent combination

---

### `frontend/src/components/Card/Card.module.css`

**Purpose:** All visual styles for the card component.

**Key styles:**
- `.cardContent`: `border-radius: 24px`, `overflow: hidden`, `border: 1px solid rgba(255,255,255,0.08)`
- `.cardImg`: `object-fit: cover`, `transition: transform 0.8s` and `filter 0.8s`
- `.overlay`: Gradient from transparent → 85% black, sits above the image
- `.contentOverlay`: Absolute positioned, anchored to bottom, `padding: 2.5rem`
- `.borderLine`: `height: 2px`, `width: 0` → animates to `100%` on hover

---

### `frontend/src/components/Slider/Slider.jsx`

**Purpose:** Orchestrates the 3D card track — calculates positions for every card, applies spring animations, handles swipe gestures, and keyboard navigation.

**Props:**

| Prop | Type | Required | Description |
|---|---|---|---|
| `cards` | array | Yes | Full `sliderData` array |
| `activeIndex` | number | Yes | Index of the currently centered card |
| `setActiveIndex` | function | Yes | Callback to update the active index |

**State:**

| State | Type | Description |
|---|---|---|
| `isMobile` | boolean | True when window width ≤ 768px |

**Effects:**
1. **Resize listener** (mount/unmount): Sets `isMobile` based on `window.innerWidth`
2. **Keyboard listener** (updates when `activeIndex` changes): Responds to `ArrowLeft`, `ArrowRight`, and `Enter`

**How positions are calculated:**

For each card, `diff = index - activeIndex` gives the distance from center. Circular wrapping ensures the last card wraps around to position -1 correctly:

```js
if (diff < -Math.floor(n / 2)) diff += n;
if (diff > Math.floor(n / 2)) diff -= n;
```

Positions by `diff` value (desktop):
```
diff = -1 (prev):  x="-22vw", scale=0.8, opacity=0.45, rotateY=15°
diff =  0 (active): x=0,      scale=1.0, opacity=1.0,  rotateY=0°
diff = +1 (next):  x="+22vw", scale=0.8, opacity=0.45, rotateY=-15°
diff = ±2+:         x=±45vw,  scale=0.65, opacity=0    (hidden)
```

**Swipe gesture:**
- `drag="x"` on the wrapping `motion.div`
- `dragConstraints={{ left: 0, right: 0 }}` keeps the container from shifting
- `dragElastic={0.2}` gives slight resistance/bounce feeling
- `onDragEnd` checks if offset > 50px threshold, then calls `handleNext()` or `handlePrev()`

**Click behavior:**
- Click on active card (`diff === 0`) → `navigate(card.route)` (goes to subpage)
- Click on side card → `setActiveIndex(index)` (pulls card to center)

**Spring transition settings:**
```js
type: 'spring', stiffness: 170, damping: 24, mass: 0.8
```
This produces a slightly bouncy, premium feel — not stiff, not too springy.

**Reusable:** Yes (pass any `cards` array with `route` field)

---

### `frontend/src/components/Slider/Slider.module.css`

**Purpose:** CSS layout for the slider viewport and card wrapper.

**Key styles:**
- `.sliderContainer`: `height: 520px`, `perspective: 1200px` (enables 3D depth)
- `.track`: Framer Motion drag target, `cursor: grab`, `overflow: visible`
- `.cardWrapper`: `position: absolute`, `width: 320px`, `height: 460px`, `transform-style: preserve-3d`

**Responsive sizes:**
- ≤1024px: `cardWrapper` shrinks to `290px × 420px`
- ≤768px: `cardWrapper` shrinks to `260px × 380px`

---

### `frontend/src/components/BottomNavigation/BottomNavigation.jsx`

**Purpose:** Floating glassmorphism control panel at the bottom of the landing page.

**Props:**

| Prop | Type | Required | Description |
|---|---|---|---|
| `cards` | array | Yes | Full `sliderData` array |
| `activeIndex` | number | Yes | Current active index |
| `setActiveIndex` | function | Yes | Callback to change active index |
| `accentColor` | string | Yes | Color for thumbnail border |

**State:** None

**What it renders:**
1. **Thumbnail** — circular image of current card with accent-colored border
2. **"Active Showcase"** label (hidden on mobile)
3. **Section title** — text name of active card
4. **← prev button** — decrements activeIndex (with circular wrap)
5. **1 / 5 indicator** — shows current position in the set
6. **next → button** — increments activeIndex (with circular wrap)
7. **☰ menu button** — placeholder for a future project list overlay

**Navigation logic:**
```js
handlePrev: setActiveIndex(prev => (prev - 1 + length) % length)
handleNext: setActiveIndex(prev => (prev + 1) % length)
```
The modulo arithmetic ensures circular wrap (last → first, first → last).

**Menu button:** Currently has an empty `onClick` — deliberately left for future extensibility (e.g. a full-screen project grid overlay).

**Reusable:** Yes — can be placed on any page that needs a floating slider control

---

### `frontend/src/components/BottomNavigation/BottomNavigation.module.css`

**Purpose:** All glassmorphism styles for the floating navigation panel.

**Key styles:**
- `.navContainer`: `position: fixed`, `bottom: 2.5rem`, `left: 50%`, `translateX(-50%)`, `max-width: 600px`
- `.navPanel`: `backdrop-filter: blur(20px)`, `border-radius: 40px`, `background: rgba(10,10,15,0.6)`, `border: 1px solid rgba(255,255,255,0.08)`
- `.thumbnailWrapper`: `width: 38px`, `height: 38px`, circular, `border: 1.5px solid var(--accent-color)`
- `.navBtn`: `width: 36px`, `height: 36px`, circular, hover lifts `translateY(-1px)`

**Responsive (≤768px):**
- Smaller padding and thumbnails
- `.activeLabel` hidden to save horizontal space

---

### `frontend/src/components/Hero/Hero.jsx`

**Purpose:** Reusable page header component used on all subpages (Education, NGO, etc.).

**Props:**

| Prop | Type | Required | Description |
|---|---|---|---|
| `title` | string | Yes | Large h1 heading |
| `tagline` | string | Yes | Small colored label above title |
| `description` | string | Yes | Paragraph below title |
| `accentColor` | string | Yes | Color for tagline and glow |
| `bgGradient` | string | Yes | CSS gradient for header background |

**State:** None

**What it renders:**
1. **Back button** — `← Back` navigates to `/` via `useNavigate()`
2. **Tagline** — Colored in `accentColor`, uppercase, spaced
3. **h1 Title** — Large gradient text (white to 70% opacity)
4. **Description paragraph** — Muted white text
5. **Glow blob** — A radial gradient div in the accent color, positioned top-right

**Why it's a separate component:** All 5 subpages use the exact same header layout. Without this component, any change to the header structure would require editing 5 separate files.

**Reusable:** Yes — works for any page that needs a hero header. Just pass the appropriate props.

---

### `frontend/src/components/Hero/Hero.module.css`

**Purpose:** Styles for the subpage hero header.

**Key styles:**
- `.hero`: `min-height: 50vh`, `position: relative`, dynamic `background` from prop
- `.backButton`: `position: absolute`, `top: 3rem`, glassmorphism style, hover lifts `translateY(-2px)`
- `.title`: `font-size: clamp(3rem, 8vw, 5.5rem)`, `font-weight: 900`, gradient text via `-webkit-background-clip: text`
- `.glow`: Absolute positioned, right side, `filter: blur(50px)`, `pointer-events: none`

---

### `frontend/src/pages/Landing/Landing.jsx`

**Purpose:** The main landing page — the first thing users see.

**State:**

| State | Type | Description |
|---|---|---|
| `activeIndex` | number | Index of the currently active slider card (0–4) |

**State is read from `sessionStorage`** on mount to restore position after back navigation.

**`handleSetActiveIndex(index)`:** Custom setter that:
1. Updates React state normally
2. Persists the new value to `sessionStorage`
3. Handles both direct values and functional updaters (e.g. `prev => prev + 1`)

**What it renders (top to bottom):**
1. **Background layer** — `AnimatePresence` crossfades between gradient/image backgrounds on slide change
2. **Background overlay** — Radial vignette that darkens edges
3. **BackgroundTypography** — Huge faded word behind the cards
4. **Top header** — "CREATIVE SHOWCASE" label and intro text with entry animation
5. **Slider section** — Card track with all 5 cards
6. **BottomNavigation** — Fixed floating control panel

**Dependencies:** `sliderData.js`, `Slider`, `BottomNavigation`, `BackgroundTypography`, `framer-motion`, `react-router-dom`

---

### `frontend/src/pages/Landing/Landing.module.css`

**Purpose:** Layout for the full-screen landing container.

**Key styles:**
- `.landingContainer`: `width: 100vw`, `height: 100vh`, `overflow: hidden`, `flex-direction: column`
- `.backgroundTrack`: `position: absolute`, full coverage, `pointer-events: none`
- `.backgroundImage`: `position: absolute`, full coverage, receives inline `background` from `currentCard`
- `.bgOverlay`: `radial-gradient` vignette — transparent center, dark edges — creates cinematic depth
- `.topHeader`: centered, flexbox column, `z-index: 10`

---

### `frontend/src/pages/Education/Education.jsx`

**Purpose:** Placeholder page for the Education portfolio section.

**What it does:**
- Finds its data from `sliderData` using `.find(item => item.route === '/education')`
- Passes that data to `<Hero />`
- Renders a placeholder section card with guidance text for the next developer

**State:** None

**Future:** Replace the `.placeholderCard` with actual education case study content, interactive prototypes, or course listings.

---

### `frontend/src/pages/Education/Education.module.css`

**Purpose:** Layout styles for the Education page.

Identical structure to all other subpage CSS files:
- `.pageContainer`: full width, `min-height: 100vh`, dark background, flex column
- `.mainContent`: `padding: 4rem 10%`
- `.placeholderCard`: dashed border, relative positioning for glow
- `.glowCircle`: accent-colored radial blur in bottom-right corner

---

### `frontend/src/pages/NGO/NGO.jsx`

**Purpose:** Placeholder page for the NGO (Non-Governmental Organization) portfolio section.

Same structure as `Education.jsx`. Finds NGO data from `sliderData` and renders the Hero + placeholder card.

**Future:** Add community impact metrics, donation flow diagrams, project timelines.

---

### `frontend/src/pages/StockMarket/StockMarket.jsx`

**Purpose:** Placeholder page for the Stock Market portfolio section.

**Future:** Connect to financial data API, render chart components (e.g. Recharts, Chart.js), add trading analysis tools.

---

### `frontend/src/pages/Business/Business.jsx`

**Purpose:** Placeholder page for the Business portfolio section.

**Future:** Add enterprise case studies, revenue charts, partnership frameworks.

---

### `frontend/src/pages/Blog/Blog.jsx`

**Purpose:** Placeholder page for the Blog section. This page is **intentionally designed for backend integration**.

**Future integration plan:**
```jsx
// Replace the placeholder section with:
const [posts, setPosts] = useState([]);

useEffect(() => {
  fetch('/api/blog/posts')
    .then(res => res.json())
    .then(data => setPosts(data));
}, []);

// Render posts dynamically:
{posts.map(post => <BlogCard key={post.id} {...post} />)}
```

The admin portal (future `admin/` folder) will provide the interface for creating/editing posts. This page will consume those posts via the shared backend API.

---

## 5. Component Relationships

```
sliderData.js (data)
      │
      ├────────────────────────────────────────────┐
      │                                            │
  Landing.jsx                              Subpages (Education,
  [owns: activeIndex]                       NGO, StockMarket,
      │                                     Business, Blog)
      │                                            │
      ├── BackgroundTypography                  Hero.jsx
      │     (text = bgTypography)         (uses: title, tagline,
      │                                    description, accentColor,
      ├── Slider                              bgGradient)
      │     (cards, activeIndex,
      │      setActiveIndex)
      │         │
      │         └── Card (×5)
      │               (title, image,
      │                isActive, accentColor)
      │
      └── BottomNavigation
            (cards, activeIndex,
             setActiveIndex, accentColor)
```

**Data flows in one direction:** `sliderData.js` → `Landing` → children. Child components never read from `sliderData.js` directly except subpages (which do a `.find()` lookup).

---

## 6. Routing

| Path | Component | File | Notes |
|---|---|---|---|
| `/` | `Landing` | `pages/Landing/Landing.jsx` | Main interactive slider |
| `/education` | `Education` | `pages/Education/Education.jsx` | Placeholder, ready for content |
| `/ngo` | `NGO` | `pages/NGO/NGO.jsx` | Placeholder, ready for content |
| `/stock-market` | `StockMarket` | `pages/StockMarket/StockMarket.jsx` | Placeholder, ready for content |
| `/business` | `Business` | `pages/Business/Business.jsx` | Placeholder, ready for content |
| `/blog` | `Blog` | `pages/Blog/Blog.jsx` | Placeholder, awaiting backend |

All routes are defined in `routes/AppRoutes.jsx` and mounted inside `<BrowserRouter>` in `App.jsx`.

---

## 7. Data Flow

```
1. IMAGES
   PNG files → imported in sliderData.js (top of file)
       → Vite processes → hashed filenames in dist/
       → passed as `image` field in sliderData array

2. CONFIGURATION
   sliderData.js exports sliderData array
       → imported in Landing.jsx (for slider display)
       → imported in each subpage (for Hero props via .find())

3. SLIDER STATE
   Landing.jsx: const [activeIndex, setActiveIndex] = useState(...)
       → passed to Slider as props
       → passed to BottomNavigation as props
       → both components can READ activeIndex and CALL setActiveIndex

4. CLICK → NAVIGATION
   User clicks active card
       → Slider.jsx onClick detects `isActive === true`
       → calls navigate(card.route)  ← from react-router-dom
       → React Router renders corresponding Page component

5. BACK NAVIGATION
   User on /education, clicks Back
       → Hero.jsx calls navigate('/')
       → Landing mounts, reads sessionStorage for activeIndex
       → Slider renders with the same card centered
```

---

## 8. State Management

| State | Owner | Type | Initial Value | Updated By |
|---|---|---|---|---|
| `activeIndex` | `Landing.jsx` | `number` | `sessionStorage` or `0` | `Slider`, `BottomNavigation` |
| `isMobile` | `Slider.jsx` | `boolean` | `window.innerWidth <= 768` | window resize event |

**There is no global state store.** The application is simple enough that prop-passing is sufficient. If complexity grows (e.g. user authentication, blog post cache), introduce:
- **React Context** for auth state
- **Zustand** or **React Query** for server state

---

## 9. Animation Flow

### Initial Page Load (Landing)

```
t=0.00s  → Page renders, backgroundTrack starts opacity:0→1 (0.8s)
t=0.20s  → "CREATIVE SHOWCASE" logo fades in (y: -20→0, opacity 0→1)
t=0.30s  → Intro paragraph fades in (same animation, 0.1s offset)
t=0.00s  → BackgroundTypography enters (y: 50→0, scale: 0.95→1, opacity: 0→0.03)
t=0.00s  → Cards mount and spring into their positions immediately
```

### Slide Change

```
User triggers slide change (click/swipe/keyboard)
    │
    ├── activeIndex updates
    │
    ├── Background: AnimatePresence popLayout
    │     Old div: opacity 1→0 (0.8s)
    │     New div: opacity 0→1 (0.8s)
    │
    ├── BackgroundTypography: AnimatePresence wait
    │     Old word: exits first (y 0→-50, scale 1→1.02, opacity 0.03→0)
    │     New word: enters after (y 50→0, scale 0.95→1, opacity 0→0.03)
    │
    └── Cards: Framer Motion spring
          All 5 cards simultaneously animate to new positions
          Spring: stiffness 170, damping 24, mass 0.8
          Active: springs to x=0, scale=1, opacity=1
          Prev/Next: spring to ±22vw, scale=0.8, opacity=0.45
```

### Card Hover

Pure CSS transitions (no JS/Framer):
- `0.4s` for label, border line, button transforms
- `0.8s` for image scale and brightness

### Route Transition

No explicit transition animation currently. The page changes cleanly via React Router. **To add page transitions**, wrap the `<Routes>` block with Framer Motion's `AnimatePresence` and add `initial/animate/exit` variants to each page component.

---

## 10. Styling Strategy

### Why CSS Modules?

CSS Modules compile class names to unique hashes (e.g. `.navPanel_x7k2a`). This means:
- Style in `Card.module.css` can use `.title` without conflicting with `.title` in `Hero.module.css`
- No global namespace pollution
- Dead code elimination — unused classes are tree-shaken at build time

### Responsive Strategy

All responsive overrides use a single breakpoint: **768px**. This keeps the media query structure simple:

```css
/* Default: Desktop + Tablet */
.element { ... }

/* Override: Mobile */
@media (max-width: 768px) {
  .element { ... }
}
```

`clamp()` is used for font-size to create fluid, device-adaptive typography without breakpoints:
```css
font-size: clamp(3rem, 8vw, 5.5rem);
/* min: 3rem, preferred: 8% of viewport width, max: 5.5rem */
```

### CSS Custom Properties for Dynamic Values

Accent colors come from `sliderData.js` (JavaScript). To use them in CSS:
```jsx
// In JSX — inject as CSS variable
<div style={{ '--accent-color': accentColor }} />
```
```css
/* In CSS Module — consume the variable */
.thumbnail { border-color: var(--accent-color); }
```

---

## 11. Assets

### Where images live
```
src/assets/images/
  {section-name}/
    {section-name}.jpg
```

### Naming convention
- Folder: kebab-case (`stock-market/`, `ngo/`)
- File: same as folder name (`stock-market.jpg`)

### How to replace an image
1. Prepare your new image file
2. Replace the existing file at the same path (keep the same filename)
3. Vite will automatically use the new file — no code changes needed

### How to add a new image for a new section
```
1. Create folder:  src/assets/images/photography/
2. Add file:       src/assets/images/photography/photography.jpg
3. Import in sliderData.js:
   import photographyImg from '../assets/images/photography/photography.jpg';
4. Add to sliderData array
```

---

## 12. How to Add a New Card (Section)

**Step 1** — Prepare image:
```
src/assets/images/photography/photography.jpg
```

**Step 2** — Import and add to `sliderData.js`:
```js
import photographyImg from '../assets/images/photography/photography.jpg';

// Add to sliderData array:
{
  id: 6,
  title: "Photography",
  image: photographyImg,
  route: "/photography",
  bgTypography: "CAPTURE",
  description: "Visual storytelling through the lens.",
  bgImage: "",
  bgGradient: "linear-gradient(135deg, #1a0a1e 0%, #0a0510 100%)",
  accentColor: "#ec4899",
  tagline: "Visual Storytelling"
}
```

**Step 3** — Create page folder:
```
src/pages/Photography/
  Photography.jsx
  Photography.module.css
```

**Step 4** — Build `Photography.jsx` (copy from `Education.jsx`, change route in `.find()`):
```jsx
const pageData = sliderData.find(item => item.route === '/photography');
```

**Step 5** — Register route in `AppRoutes.jsx`:
```jsx
import Photography from '../pages/Photography/Photography';
<Route path="/photography" element={<Photography />} />
```

Done. The Landing slider, BottomNavigation, and routing will all automatically include the new section.

---

## 13. How to Add a New Page (Without a Card)

For pages that are not part of the slider (e.g. Contact, About, Privacy Policy):

**Step 1** — Create page folder:
```
src/pages/Contact/
  Contact.jsx
  Contact.module.css
```

**Step 2** — Add to `AppRoutes.jsx`:
```jsx
import Contact from '../pages/Contact/Contact';
<Route path="/contact" element={<Contact />} />
```

**Step 3** — Link to it from anywhere:
```jsx
// In any component:
import { Link } from 'react-router-dom';
<Link to="/contact">Contact Us</Link>

// Or programmatically:
const navigate = useNavigate();
navigate('/contact');
```

These pages do NOT need to be added to `sliderData.js` — they exist independently of the slider.

---

## 14. Component Responsibilities Table

| Component | Purpose | Receives Props | Returns | Reusable | State | Owned By |
|---|---|---|---|---|---|---|
| `App` | Root wrapper + Router setup | None | `<BrowserRouter><AppRoutes/>` | No | None | All |
| `AppRoutes` | Route definitions | None | `<Routes>` block | No | None | Lead Dev |
| `Landing` | Main landing page | None | Full landing layout | No | `activeIndex` | Landing team |
| `BackgroundTypography` | Giant faded background text | `text` | Animated `<h2>` | Yes | None | UI team |
| `Slider` | 3D card track + gestures | `cards`, `activeIndex`, `setActiveIndex` | Array of animated `<Card>` | Yes | `isMobile` | UI team |
| `Card` | Single portfolio card | `title`, `image`, `isActive`, `accentColor` | Card DOM with hover effects | Yes | None | UI team |
| `BottomNavigation` | Floating glass control panel | `cards`, `activeIndex`, `setActiveIndex`, `accentColor` | Fixed nav with controls | Yes | None | UI team |
| `Hero` | Subpage header | `title`, `tagline`, `description`, `accentColor`, `bgGradient` | Hero section with back button | Yes | None | UI team |
| `Education` | Education section page | None | Hero + placeholder | No | None | Education team |
| `NGO` | NGO section page | None | Hero + placeholder | No | None | NGO team |
| `StockMarket` | Finance section page | None | Hero + placeholder | No | None | Finance team |
| `Business` | Business section page | None | Hero + placeholder | No | None | Business team |
| `Blog` | Blog section page | None | Hero + placeholder | No | None | Blog/Backend team |

---

## 15. Future Expansion Guide

### Adding a REST API (Backend Integration)

```
portfolio/
├── frontend/     ← unchanged
└── backend/      ← new Node.js/Express server
    ├── server.js
    ├── routes/
    │   └── blog.js    → GET /api/blog/posts
    └── models/
        └── Post.js
```

In `frontend/`, connect to backend API in the `Blog` page:
```jsx
// In Blog.jsx:
useEffect(() => {
  fetch('http://localhost:4000/api/blog/posts')
    .then(res => res.json())
    .then(posts => setPosts(posts));
}, []);
```

For production, configure Vite proxy in `vite.config.js`:
```js
server: {
  proxy: {
    '/api': 'http://localhost:4000'
  }
}
```

### Adding Authentication

```jsx
// src/context/AuthContext.jsx
export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => { ... };

// In App.jsx:
<AuthProvider>
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
</AuthProvider>
```

Protected routes in `AppRoutes.jsx`:
```jsx
<Route path="/admin" element={
  <ProtectedRoute>
    <AdminDashboard />
  </ProtectedRoute>
} />
```

### Adding Search

Add a search context or Zustand store. The Blog page can filter posts client-side:
```jsx
const filtered = posts.filter(p =>
  p.title.toLowerCase().includes(query.toLowerCase())
);
```

### Adding Blog Filters / Categories

Tag-based filtering is pure UI state:
```jsx
const [activeTag, setActiveTag] = useState('all');
const filtered = posts.filter(p =>
  activeTag === 'all' || p.tags.includes(activeTag)
);
```

### Adding a New Portfolio Section (Summary)

1. Add image to `src/assets/images/your-section/`
2. Add entry to `sliderData.js`
3. Create `src/pages/YourSection/YourSection.jsx` and `.module.css`
4. Add `<Route>` to `AppRoutes.jsx`

No other files need to change.

---

## Appendix: Common Debug Scenarios

| Problem | Likely Cause | Fix |
|---|---|---|
| `npm` commands fail | Running from wrong directory | `cd frontend` then run command |
| Images not loading | Incorrect import path in `sliderData.js` | Check path relative to `sliderData.js` |
| New card not showing | Added to `sliderData.js` but forgot route | Add `<Route>` in `AppRoutes.jsx` |
| Styles not applying | Using wrong class name | Check `.module.css` — class names are camelCase |
| Back button loses slider position | `sessionStorage` was cleared | Restart browser; or check `handleSetActiveIndex` |
| Animations feel wrong | Changed spring values | Restore `stiffness: 170, damping: 24, mass: 0.8` |
| Font not loading | Google Fonts blocked | Check network / firewall; font is imported in `index.css` |
