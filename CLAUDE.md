# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Earthy Munchy is a premium e-commerce website for organic botanical products (honey, spices, millets). The project is mid-migration from vanilla HTML to React + Vite, so both architectures coexist.

## Commands

```bash
npm run dev       # Start Vite dev server at http://localhost:5173
npm run build     # TypeScript type check + Vite production build
npm run preview   # Preview production build locally
npm run lint      # TypeScript type checking (strict mode)
```

No test suite is currently configured.

## Architecture

### Hybrid State

- **React app**: `src/` directory with React 18, TypeScript, shadcn/ui components
- **Legacy HTML**: `index.html` (main), plus `product-*.html`, `shop-*.html`, `contact.html`, `story.html`
- **Entry points**: `index-react.html` (React) and `index.html` (legacy) - both built via Vite

### Key Directories

- `src/components/ui/` - shadcn/ui components (button, card, input, etc.)
- `src/components/layout/` - Header and Footer components
- `src/pages/` - React page components
- `src/lib/utils.ts` - `cn()` utility for Tailwind class merging
- `public/fonts/` - Local font files (Tex Gyre Termes, Solway)
- `public/img/` - Product images and backgrounds

### Path Alias

`@/*` maps to `./src/*` in both TypeScript and Vite configs.

## Design System

### Color Palette (earth.*)

| Token | Value | Use |
|-------|-------|-----|
| cream | #F5F1E8 | Backgrounds |
| sage | #8B9A7E | Accents |
| darkSage | #4A5D43 | CTA buttons |
| terracotta | #D4876F | Highlights |
| clay | #C17855 | Hover states |
| warmBrown | #8B6F47 | Secondary text |
| text | #594a42 | Body text |
| darkText | #2c2420 | Headings |

### Typography

Three font families defined in Tailwind config:
- **Heading**: Tex Gyre Termes (serif) - `font-heading`
- **Subheading**: Solway (serif) - `font-subheading`
- **Body**: Lato (sans-serif) - `font-body`

Fluid typography using `clamp()` - sizes scale automatically between mobile and desktop. Use the predefined text utilities (e.g., `text-display`, `text-h1`, `text-body-lg`) rather than raw pixel values.

### Animation System

- GSAP + ScrollTrigger for scroll-linked animations
- CSS keyframes for performance-critical effects (`gradient-shift`, `fade-up`, `blur-in`)
- Custom easing: `ease-out-expo`, `ease-out-quart`, `ease-in-out-circ`, `ease-elastic`
- Duration utilities: `duration-fast` (200ms), `duration-normal` (400ms), `duration-slow` (800ms)
- Respects `prefers-reduced-motion`

## Component Library

Using shadcn/ui (New York style) with Radix UI primitives. Add new components via:
```bash
npx shadcn@latest add <component-name>
```

Configuration in `components.json`.

## E-commerce Features

- `cart.js` - Shopping cart with localStorage persistence + WhatsApp checkout integration
- `products.json` - Product database with SKU, barcode, ingredients, sourcing info

## Deployment

Deployed on Vercel with auto-deploy on push. Build output goes to `dist/`.
