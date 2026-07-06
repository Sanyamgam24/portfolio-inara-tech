# ROUTING.md — Navigation & Route Reference

This document explains the React Router configuration, every available route, and how to add new routes to the project.

---

## 1. Router Setup

The application uses **React Router DOM v7** with a `BrowserRouter` (HTML5 History API).

**Entry chain:**

```
index.html
  └── main.jsx          (React.createRoot)
        └── <App />     (wraps BrowserRouter)
              └── <AppRoutes />  (contains all <Route> definitions)
```

**`App.jsx`:**
```jsx
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
```

`BrowserRouter` is placed in `App.jsx` — not `main.jsx` — so that the router context wraps the entire component tree cleanly, making `useNavigate()` and `useLocation()` accessible in every component below it.

---

## 2. Route Map

All routes are defined in `frontend/src/routes/AppRoutes.jsx`:

| Path | Component Rendered | File Location |
|---|---|---|
| `/` | `<Landing />` | `src/pages/Landing/Landing.jsx` |
| `/education` | `<Education />` | `src/pages/Education/Education.jsx` |
| `/ngo` | `<NGO />` | `src/pages/NGO/NGO.jsx` |
| `/stock-market` | `<StockMarket />` | `src/pages/StockMarket/StockMarket.jsx` |
| `/business` | `<Business />` | `src/pages/Business/Business.jsx` |
| `/blog` | `<Blog />` | `src/pages/Blog/Blog.jsx` |

---

## 3. Navigation Methods

There are two ways navigation happens in this project:

### A. Programmatic Navigation via `useNavigate()`

Used in `Slider.jsx` when the active card is clicked:

```jsx
const navigate = useNavigate();
// when active card is clicked:
navigate(card.route);  // e.g. navigate('/education')
```

Used in `Hero.jsx` when the Back button is clicked:

```jsx
const navigate = useNavigate();
navigate('/');  // always returns to Landing
```

### B. Declarative Navigation (`<Link>`)

Not currently used, but if you want to add text links between pages:

```jsx
import { Link } from 'react-router-dom';
<Link to="/blog">Go to Blog</Link>
```

---

## 4. Navigation Flow Diagram

```
User lands on /
        │
        ├── clicks active card  →  navigate('/education')
        │                                │
        │                           Education page renders
        │                                │
        │                           clicks ← Back
        │                                │
        │                           navigate('/')  →  Landing re-renders
        │                           (activeIndex restored from sessionStorage)
        │
        ├── clicks side card  →  setActiveIndex(index)
        │                        (pulls card to center, NO page change)
        │
        └── presses ← / → keys  →  same as clicking prev/next button
```

---

## 5. Back Navigation & State Persistence

When a user clicks a card and goes to `/education`, then clicks **Back**, they expect to return to the same slider position they left.

This is implemented in `Landing.jsx` using `sessionStorage`:

```js
// On mount: read saved index (default 0)
const [activeIndex, setActiveIndex] = useState(() => {
  const saved = sessionStorage.getItem('portfolioActiveIndex');
  return saved !== null ? parseInt(saved, 10) : 0;
});

// On every index change: write to sessionStorage
sessionStorage.setItem('portfolioActiveIndex', index.toString());
```

`sessionStorage` is used (not `localStorage`) because it clears when the browser tab is closed — appropriate for UI position memory.

---

## 6. How to Add a New Route

**Step 1** — Add the section data to `sliderData.js`:
```js
{
  id: 6,
  title: "Photography",
  image: photographyImg,
  route: "/photography",
  bgTypography: "CAPTURE",
  bgGradient: "linear-gradient(135deg, #1a1020 0%, #0a0810 100%)",
  accentColor: "#ec4899",
  tagline: "Visual Storytelling",
  description: "..."
}
```

**Step 2** — Create the page folder and files:
```
src/pages/Photography/
  ├── Photography.jsx
  └── Photography.module.css
```

**Step 3** — Register the route in `AppRoutes.jsx`:
```jsx
import Photography from '../pages/Photography/Photography';
// inside <Routes>:
<Route path="/photography" element={<Photography />} />
```

That's all. The Landing slider and BottomNavigation will automatically pick up the new card from `sliderData.js` — no other changes needed.

---

## 7. Future Route Patterns

As the project grows, consider these patterns:

### Protected Routes (for Admin Portal)
```jsx
// routes/ProtectedRoute.jsx
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuth(); // custom hook
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Usage in AppRoutes:
<Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
```

### Dynamic Blog Routes
```jsx
// When blog connects to backend:
<Route path="/blog/:slug" element={<BlogPost />} />
// In BlogPost.jsx:
const { slug } = useParams();
// fetch('/api/posts/' + slug)
```

### 404 Not Found
```jsx
// Add at the bottom of AppRoutes:
<Route path="*" element={<NotFound />} />
```
