# LNA_STUDIO

A brutalist production house portfolio built with React, Framer Motion, and Lenis smooth scroll.

## Preview

**Live Sections:** Hero → Studio → Archive → Inquiry → Footer — each locked to `100vh` for a full-screen scroll experience.

**Preloader:** Clapperboard animation with sequential words (LIGHTING → CAMERA → ROLL → LAUGH → N → ACTION) — clapper snaps on "ACTION" and immediately slides up.

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React 18 + Vite |
| Animation | Framer Motion |
| Smooth Scroll | Lenis (`@studio-freight/lenis`) |
| Routing | React Router DOM v7 |
| Styling | CSS Modules + CSS Custom Properties |

## Project Structure

```
src/
├── data/
│   └── projects.js              # Centralized project data (single source of truth)
├── utils/
│   ├── animations.js            # Shared Framer Motion variants
│   └── scroll.js                # Scroll helpers & section definitions
├── styles/
│   ├── global.css               # Reset, design tokens, typography, utilities
│   └── components/
│       ├── Hero.module.css
│       ├── About.module.css
│       ├── Projects.module.css
│       ├── Contact.module.css
│       └── Footer.module.css
├── components/
│   ├── layout/                  # Persistent UI chrome
│   │   ├── Header.jsx           # Fixed nav with fullscreen mobile menu
│   │   ├── Footer.jsx           # Marquee, CTA, info grid, back-to-top
│   │   └── SectionDots.jsx      # Right-side scroll position indicator
│   ├── ui/                      # Reusable interactive elements
│   │   ├── Cursor.jsx           # Dot + ring cursor with mix-blend-mode
│   │   ├── Magnetic.jsx         # Magnetic hover effect wrapper
│   │   └── Preloader.jsx        # Clapperboard loading sequence
│   └── sections/                # Home page full-screen sections
│       ├── Hero.jsx             # Video background with parallax
│       ├── About.jsx            # Studio info in 3-column grid
│       ├── Projects.jsx         # Horizontal slider carousel
│       └── Contact.jsx          # Inquiry form with custom radio buttons
├── pages/
│   ├── Home.jsx                 # Composes all sections
│   ├── AllArchive.jsx           # Full project grid (8 projects)
│   └── ProjectDetail.jsx        # Individual project with video + stills
├── App.jsx                      # Router, Lenis, preloader orchestration
└── main.jsx                     # Entry point
```

## Architecture Decisions

**Centralized Data** — All project info lives in `data/projects.js`. Components import `featuredProjects`, `allProjects`, or `getProjectById()` instead of hardcoding data.

**CSS Modules** — Each component has a co-located `.module.css` file. Zero inline styles in section components. Design tokens (`--bg-color`, `--accent-color`, `--section-height`) are defined in `global.css`.

**Shared Utilities** — Animation variants (`fadeInUp`, `slideInRight`, `staggerContainer`) and scroll helpers (`scrollToElement`, `scrollToTop`) are reusable across all components.

**Mobile Responsive** — Every CSS module includes `@media (max-width: 768px)` breakpoints. Sections stay `100vh` on mobile. Section dots and custom cursor are hidden on touch devices.

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build
```

## Design

- **Palette:** Deep black (`#0d0d0d`), off-white (`#f0f0f0`), vibrant orange (`#FF5722`)
- **Typography:** Syne (headings), Inter (body)
- **Aesthetic:** Brutalist, industrial, high-contrast
- **Cursor:** Dual-layer (dot + trailing ring) with `mix-blend-mode: difference` and context-aware labels (VIEW, EXPLORE, SEND)

## License

MIT
