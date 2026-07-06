# COMPONENT_GUIDELINES.md — Component Authoring Standards

Standards every developer must follow when creating or modifying components in this project.

---

## 1. Component Structure Template

Every new component must follow this structure exactly:

```jsx
/**
 * --------------------------------------------------
 * Component: ComponentName
 *
 * Purpose:
 *   One sentence describing what this component renders.
 *
 * Responsibilities:
 *   - Bullet point 1
 *   - Bullet point 2
 *
 * Props:
 *   propName  {type}  — description
 *
 * State:
 *   stateName  {type}  — description (or "None")
 *
 * Dependencies:
 *   - framer-motion
 *   - react-router-dom
 *   (list external packages used)
 *
 * Reusable: Yes / No
 * --------------------------------------------------
 */

import React from 'react';
import styles from './ComponentName.module.css';

const ComponentName = ({ prop1, prop2 }) => {
  return (
    <div className={styles.container}>
      {/* content */}
    </div>
  );
};

export default ComponentName;
```

---

## 2. CSS Module Structure Template

Every `.module.css` file must be sectioned with comments:

```css
/* ============================================
   ComponentName.module.css
   ============================================ */

/* --- Layout --- */
.container { }
.wrapper { }

/* --- Typography --- */
.title { }
.subtitle { }

/* --- Buttons & Controls --- */
.button { }

/* --- Animations & Transitions --- */
.element {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* --- Hover States --- */
.element:hover { }

/* --- Responsive (Mobile ≤ 768px) --- */
@media (max-width: 768px) {
  .container { }
}
```

---

## 3. Import Order

Imports inside any `.jsx` file must follow this order:

```jsx
// 1. React (always first)
import React, { useState, useEffect } from 'react';

// 2. Third-party libraries
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

// 3. Internal components
import Card from '../Card/Card';

// 4. Internal data / utilities
import { sliderData } from '../../data/sliderData';

// 5. Styles (always last)
import styles from './ComponentName.module.css';
```

---

## 4. Props Rules

- Always **destructure** props in the function signature: `({ title, image, accentColor })`
- Never access `props.something` inside the component body
- All props should be **explicitly named** — avoid spread operators (`{...props}`)
- Dynamic inline styles are allowed ONLY for values that come from props/data (e.g. `accentColor`):

```jsx
// ✅ Correct — dynamic value from data
<div style={{ '--accent-color': accentColor }} />

// ❌ Wrong — hardcoded inline style (use CSS Module instead)
<div style={{ padding: '2rem' }} />
```

---

## 5. Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Component name | PascalCase | `BottomNavigation` |
| Component file | PascalCase | `BottomNavigation.jsx` |
| CSS module file | PascalCase + `.module.css` | `BottomNavigation.module.css` |
| CSS class name | camelCase | `.navPanel`, `.thumbnailWrapper` |
| State variable | camelCase | `activeIndex`, `isMobile` |
| Handler function | camelCase with `handle` prefix | `handlePrev`, `handleNext` |
| Boolean props | start with `is` or `has` | `isActive`, `hasImage` |

---

## 6. State Rules

- **State lives as high as it needs to, and no higher.** If only one component needs it, keep it there.
- `activeIndex` is the only piece of state shared between multiple components. It lives in `Landing.jsx` and is passed down.
- Never lift state into `App.jsx` unless it is truly global (e.g. auth, theme).
- For future global state (blog filters, search, user auth), use **React Context** or **Zustand** — do NOT prop-drill more than 2 levels.

---

## 7. Accessibility Requirements

Every interactive element must have:

```jsx
// Buttons must have aria-label if they contain only an icon
<button aria-label="Previous Project">
  <IoChevronBackOutline />
</button>

// Images must have descriptive alt text
<img src={image} alt={`${title} project view`} />

// Never remove outline entirely without a custom focus style
button:focus-visible {
  outline: 2px solid var(--accent-color);
}
```

---

## 8. Do Not

- ❌ Do NOT put page-specific logic inside `components/`
- ❌ Do NOT import a page from inside a component
- ❌ Do NOT use inline styles for layout (padding, margin, flex, grid)
- ❌ Do NOT create a component without a `.module.css` counterpart
- ❌ Do NOT leave `console.log()` statements in committed code
- ❌ Do NOT use `!important` in CSS modules
- ❌ Do NOT hardcode colors in component CSS — use CSS custom properties (`var(--accent-color)`)

---

## 9. Team Ownership

| Folder | Owner | Notes |
|---|---|---|
| `components/` | UI/Frontend team | Shared — coordinate changes |
| `pages/Education/` | Education team | Independent — self-contained |
| `pages/NGO/` | NGO team | Independent — self-contained |
| `pages/StockMarket/` | Finance team | Independent — self-contained |
| `pages/Business/` | Business team | Independent — self-contained |
| `pages/Blog/` | Blog/Backend team | Connects to future API |
| `data/sliderData.js` | Lead developer | Coordinate before editing |
| `routes/AppRoutes.jsx` | Lead developer | Coordinate before editing |
| `src/index.css` | Lead developer | Global tokens only |

---

## 10. Git Workflow

- One branch per feature: `feature/add-photography-section`
- Page folders are independent — no merge conflicts between page teams
- `sliderData.js` and `AppRoutes.jsx` are coordination points — communicate before changing
- Run `npm run build` before opening a pull request to verify there are no compilation errors
