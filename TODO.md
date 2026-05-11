# To Do

- [ ] Should refactor HTML scripts
  - [ ] Separation of concerns: manage HTML building (DOM manipulation)?

---

## Copilot's Suggestions

Great, thanks for posting the *actual* current structure — that makes this much more concrete.

What you want is **an incremental refactor**, not a rewriteYou’re already **very close** to a good structure. What you want is *not* to blow it up into something “framework‑shaped”, but to **refine what you have so each file has one clear reason to change**.

Below is a **minimal, incremental refactor** of *your exact layout*, not a theoretical one.

---

## 1. What’s wrong with the current structure (briefly)

Your current JS folder:

```text
js/
├── builders.js
├── edit.js
├── main.js
└── util.js
```

The issues are:

- `builders.js` mixes **generic DOM helpers** and **movie-specific UI**
- `main.js` mixes **page bootstrapping**, **data fetching**, **event handling**
- `edit.js` is page-specific (✅ that part is correct)
- `util.js` is fine, but will grow uncontrollably without boundaries

This is a classic “organized by filename, not responsibility” problem, which many vanilla JS projects hit early on. [\[gomakethings.com\]](https://gomakethings.com/how-i-structure-my-vanilla-js-projects/), [\[stackoverflow.com\]](https://stackoverflow.com/questions/35807001/web-projects-folders-directories-structure-best-practices)

---

## 2. Adjusted structure (smallest sensible step)

Here’s a **direct evolution** of what you currently have:

```text
public/
├── css/
│   ├── base-style.css
│   ├── edit-style.css
│   ├── main-style.css
│   └── responsive.style.css
├── edit.html
├── index.html
├── images/
│   └── header-background.jpg
└── js/
    ├── api/
    │   └── movies.js
    ├── components/
    │   ├── list.js
    │   ├── section.js
    │   └── movieCard.js
    ├── pages/
    │   ├── index.js
    │   └── edit.js
    ├── util/
    │   └── dom.js
    └── main.js
```

✅ Same size  
✅ Same deployment model  
✅ No build tools required  
✅ Still works with `<script type="module">`

---

## 3. How each *existing* file maps to the new structure

### ✅ `util.js` → `util/dom.js`

**Before**:

```js
createHtmlElement(...)
```

This is already correct—just narrow its scope.

**Rule**:  
`util/` = *pure helpers only*, no app knowledge.

---

### ✅ `builders.js` → split into components

Your `builders.js` currently contains **three different abstraction levels**.

#### `components/list.js`

```js
createList(...)
```

#### `components/section.js`

```js
createSection(...)
```

#### `components/movieCard.js`

```js
createMovieCard(movie)
```

This aligns with best practices for modular vanilla JS UI code. [\[geeksforgeeks.org\]](https://www.geeksforgeeks.org/javascript/file-and-folder-organization-best-practices-for-web-development/), [\[gomakethings.com\]](https://gomakethings.com/how-i-structure-my-vanilla-js-projects/)

Each file:

- exports **one thing**
- has **no side effects**
- knows **nothing about where it’s used**

---

### ✅ XHR logic → `api/movies.js`

Everything like this:

```js
new XMLHttpRequest()
xhr.open('GET', '/movies')
```

moves to:

```text
js/api/movies.js
```

```js
export function fetchMovies(genre) { ... }
export function fetchGenres() { ... }
```

Reason:

- Network ≠ UI ≠ events
- Easier later migration to `fetch()`

This mirrors separation-of-concerns advice commonly given for frontend scaling. [\[stackoverflow.com\]](https://stackoverflow.com/questions/35807001/web-projects-folders-directories-structure-best-practices)

---

### ✅ `main.js` vs `pages/index.js`

This is the most important conceptual cleanup.

#### `pages/index.js`

Contains:

- DOM queries for **this page**
- calls API
- calls components
- wires event handlers

#### `main.js`

Only decides **what page to initialize**:

```js
import { initIndexPage } from './pages/index.js'

window.addEventListener('DOMContentLoaded', initIndexPage)
```

Now:

- `main.js` never grows
- page logic is discoverable
- `edit.js` gets equal treatment

This pattern is recommended for multi-page vanilla apps without routers. [\[gomakethings.com\]](https://gomakethings.com/how-i-structure-my-vanilla-js-projects/)

---

## 4. Resulting mental model (simple and stable)

When you open the project later:

| Folder        | Question it answers            |
| ------------- | ------------------------------ |
| `util/`       | “Tiny helpers usable anywhere” |
| `api/`        | “Where data comes from”        |
| `components/` | “How things look”              |
| `pages/`      | “What happens on *this* page”  |
| `main.js`     | “Which page am I on?”          |

That’s **90% of what frameworks give you**, without adopting one.

---

## 5. Naming rules that keep it clean long-term

These rules matter more than the folders themselves:

1. **One export per file** (mostly)
2. **No DOM access in `api/`**
3. **No network calls in `components/`**
4. **No page selectors in shared components**
5. **Page files may glue anything together**

Violating these rules is how “just add this one thing” turns back into a monolith.

---

## 6. Why this structure scales *without regret*

- ✅ Works for small scripts
- ✅ Works for multiple pages
- ✅ Adapts easily to SPA later
- ✅ Easy test boundaries
- ✅ Clear onboarding for other devs

This “feature light, boundary heavy” organization is exactly what experienced vanilla JS developers converge on over time. [\[gomakethings.com\]](https://gomakethings.com/how-i-structure-my-vanilla-js-projects/), [\[stackoverflow.com\]](https://stackoverflow.com/questions/35807001/web-projects-folders-directories-structure-best-practices)

---

If you want next, I can:

- Mark **exactly** which functions move where in your current code
- Show how this structure evolves into a mini SPA
- Compare this with a component‑first structure (by feature instead of type)

Just tell me the direction.
