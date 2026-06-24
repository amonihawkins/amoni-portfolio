# Amoni Hawkins — Portfolio

Built with React + Vite + plain CSS.

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start the dev server
```bash
npm run dev
```
Open http://localhost:5173 in your browser.

### 3. Build for production
```bash
npm run build
```

---

## Project Structure

```
src/
├── App.jsx                  ← Page router + layout
├── main.jsx                 ← React entry point
├── styles/
│   └── index.css            ← Design tokens + global styles
└── components/
    ├── Navbar.jsx / .css    ← Fixed top nav
    ├── Hero.jsx / .css      ← Home page hero
    ├── Projects.jsx / .css  ← Featured work cards
    ├── Testimonials.jsx / .css
    ├── Footer.jsx / .css
    └── About.jsx / .css     ← /about page
```

---

## Your TODOs

- [ ] Fill in your "My 2026 So Far" section in `About.jsx`

### Features to build yourself (great practice!)
- [ ] Mobile menu drawer animation in `Navbar.jsx`
- [ ] Scroll-triggered fade-in for project cards (hint: IntersectionObserver)
- [ ] Active nav link highlight based on scroll position
- [ ] Individual case study pages (create `/projects/flikshop` etc.)

### Deployment
- Easiest: [Netlify](https://netlify.com) — drag & drop the `dist/` folder after `npm run build`
- Or: Vercel — connect your GitHub repo and it deploys automatically

