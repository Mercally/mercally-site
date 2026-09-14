# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## CodeGraph — use first

Repo has `.codegraph/` index. Use `codegraph_explore` (MCP) or `codegraph explore "<query>"` (shell) BEFORE grep/find/Read when locating or understanding code — one call returns verbatim source plus call paths. Reach for it before edits too, to see blast radius (callers, tests). Only fall back to Read/Grep if codegraph misses something specific.

## Commands

```bash
npm start          # Dev server at localhost:4200
npm run build      # Production build
npm run watch      # Dev build with watch mode
npm test           # Run Karma/Jasmine tests
```

To run a single spec file, use:
```bash
npx ng test --include='src/app/pages/home/home.spec.ts'
```

## Architecture

This is an Angular 20 personal portfolio SPA using **zoneless change detection** (`provideZonelessChangeDetection`) and **standalone components** throughout — no NgModules.

**Routing** is defined in [src/app/app.routes.ts](src/app/app.routes.ts). All routes are eagerly loaded:
- `/` → `HomeComponent`
- `/projects` → `ProjectsComponent`
- `/certifications` → `CertificationsComponent`
- `/about-me` → `AboutmeComponent`
- `/contact` → `ContactComponent`

**Shell** ([src/app/app.ts](src/app/app.ts)) owns the navbar, dark/light theme toggle (persisted to `localStorage` under key `'theme'`), and mobile menu state. The `dark` CSS class is toggled on `document.documentElement`.

**Styling** uses Tailwind CSS v4 via PostCSS (`@tailwindcss/postcss`). Global styles live in [src/styles.css](src/styles.css) with a single `@import "tailwindcss"`. Component-scoped CSS files sit alongside each component. Dark mode is class-based (`dark:` prefix).

**Pages** live under `src/app/pages/`, each in its own folder with `.ts`, `.html`, `.css`, and `.spec.ts` files. Data (e.g., certifications list, stats) is defined directly in the component class — there are no services or HTTP calls yet.

**Prettier** is configured in `package.json` (100 char print width, single quotes, Angular HTML parser for `.html` files).
