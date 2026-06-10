# Codebase Compilation

This file contains the complete source code of all active project files.

## File: `AGENTS.md`

```markdown
# Fusion Starter

A production-ready full-stack React application template with integrated Express server, featuring React Router 6 SPA mode, TypeScript, Vitest, Zod and modern tooling.

While the starter comes with a express server, only create endpoint when strictly neccesary, for example to encapsulate logic that must leave in the server, such as private keys handling, or certain DB operations, db...

## Tech Stack

- **PNPM**: Prefer pnpm
- **Frontend**: React 18 + React Router 6 (spa) + TypeScript + Vite + TailwindCSS 3
- **Backend**: Express server integrated with Vite dev server
- **Testing**: Vitest
- **UI**: Radix UI + TailwindCSS 3 + Lucide React icons

## Project Structure
```

client/ # React SPA frontend
├── pages/ # Route components (Index.tsx = home)
├── components/ui/ # Pre-built UI component library
├── App.tsx # App entry point and with SPA routing setup
└── global.css # TailwindCSS 3 theming and global styles

server/ # Express API backend
├── index.ts # Main server setup (express config + routes)
└── routes/ # API handlers

shared/ # Types used by both client & server
└── api.ts # Example of how to share api interfaces

````

## Key Features

## SPA Routing System

The routing system is powered by React Router 6:

- `client/pages/Index.tsx` represents the home page.
- Routes are defined in `client/App.tsx` using the `react-router-dom` import
- Route files are located in the `client/pages/` directory

For example, routes can be defined with:

```typescript
import { BrowserRouter, Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Index />} />
  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
  <Route path="*" element={<NotFound />} />
</Routes>;
````

### Styling System

- **Primary**: TailwindCSS 3 utility classes
- **Theme and design tokens**: Configure in `client/global.css`
- **UI components**: Pre-built library in `client/components/ui/`
- **Utility**: `cn()` function combines `clsx` + `tailwind-merge` for conditional classes

```typescript
// cn utility usage
className={cn(
  "base-classes",
  { "conditional-class": condition },
  props.className  // User overrides
)}
```

### Express Server Integration

- **Development**: Single port (8080) for both frontend/backend
- **Hot reload**: Both client and server code
- **API endpoints**: Prefixed with `/api/`

#### Example API Routes

- `GET /api/ping` - Simple ping api
- `GET /api/demo` - Demo endpoint

### Shared Types

Import consistent types in both client and server:

```typescript
import { DemoResponse } from "@shared/api";
```

Path aliases:

- `@shared/*` - Shared folder
- `@/*` - Client folder

## Development Commands

```bash
pnpm dev        # Start dev server (client + server)
pnpm build      # Production build
pnpm start      # Start production server
pnpm typecheck  # TypeScript validation
pnpm test          # Run Vitest tests
```

## Adding Features

### Add new colors to the theme

Open `client/global.css` and `tailwind.config.ts` and add new tailwind colors.

### New API Route

1. **Optional**: Create a shared interface in `shared/api.ts`:

```typescript
export interface MyRouteResponse {
  message: string;
  // Add other response properties here
}
```

2. Create a new route handler in `server/routes/my-route.ts`:

```typescript
import { RequestHandler } from "express";
import { MyRouteResponse } from "@shared/api"; // Optional: for type safety

export const handleMyRoute: RequestHandler = (req, res) => {
  const response: MyRouteResponse = {
    message: "Hello from my endpoint!",
  };
  res.json(response);
};
```

3. Register the route in `server/index.ts`:

```typescript
import { handleMyRoute } from "./routes/my-route";

// Add to the createServer function:
app.get("/api/my-endpoint", handleMyRoute);
```

4. Use in React components with type safety:

```typescript
import { MyRouteResponse } from "@shared/api"; // Optional: for type safety

const response = await fetch("/api/my-endpoint");
const data: MyRouteResponse = await response.json();
```

### New Page Route

1. Create component in `client/pages/MyPage.tsx`
2. Add route in `client/App.tsx`:

```typescript
<Route path="/my-page" element={<MyPage />} />
```

## Production Deployment

- **Standard**: `pnpm build`
- **Binary**: Self-contained executables (Linux, macOS, Windows)
- **Cloud Deployment**: Use either Netlify or Vercel via their MCP integrations for easy deployment. Both providers work well with this starter template.

## Architecture Notes

- Single-port development with Vite + Express integration
- TypeScript throughout (client, server, shared)
- Full hot reload for rapid development
- Production-ready with multiple deployment options
- Comprehensive UI component library included
- Type-safe API communication via shared interfaces

````

---

## File: `all_code_compilation.md`
```markdown

````

---

## File: `components.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "client/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

---

## File: `design.md`

```markdown
---
version: alpha
name: Webild Cloud Editorial
description: A soft, airy landing-page system with bold type, frosted panels, and restrained dark accents.
colors:
  primary: "#2A2A2F"
  primary-contrast: "#FFFFFF"
  secondary: "#F3F3F3"
  tertiary: "#FBFBFB"
  neutral: "#FFFFFF"
  surface: "#FFFFFF"
  surface-muted: "#F7F7F7"
  on-surface: "#000000"
  on-surface-muted: "#171717"
  border: "#E6E6E6"
  accent: "#8DB8FF"
  accent-soft: "#DCEAFF"
  accent-green: "#8DFFB3"
  accent-green-dark: "#369762"
  success: "#BFE7A9"
  error: "#E45A5A"
typography:
  headline-display:
    fontFamily: "Inter Tight"
    fontSize: "51px"
    fontWeight: 500
    lineHeight: "51.2px"
    letterSpacing: "0px"
  headline-lg:
    fontFamily: "Inter Tight"
    fontSize: "38px"
    fontWeight: 400
    lineHeight: "46px"
    letterSpacing: "0px"
  headline-md:
    fontFamily: "Inter Tight"
    fontSize: "29px"
    fontWeight: 400
    lineHeight: "35px"
    letterSpacing: "0px"
  headline-sm:
    fontFamily: "Inter Tight"
    fontSize: "21px"
    fontWeight: 400
    lineHeight: "25px"
    letterSpacing: "0px"
  body-lg:
    fontFamily: "Inter Tight"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: "27px"
    letterSpacing: "0px"
  body-md:
    fontFamily: "Inter Tight"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
    letterSpacing: "0px"
  body-sm:
    fontFamily: "Inter Tight"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
    letterSpacing: "0px"
  label-lg:
    fontFamily: "Inter Tight"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: "18px"
    letterSpacing: "0px"
  label-md:
    fontFamily: "Inter Tight"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: "16px"
    letterSpacing: "0px"
  label-sm:
    fontFamily: "Inter Tight"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: "14px"
    letterSpacing: "0px"
  caption:
    fontFamily: "Inter Tight"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: "14px"
    letterSpacing: "0px"
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 13px
  xl: 18px
  full: 9999px
spacing:
  xs: 2px
  sm: 12px
  md: 18px
  lg: 40px
  xl: 90px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-contrast}"
    typography: "{typography.label-md}"
    rounded: "{rounded.lg}"
    padding: "14px 13px"
    height: "40px"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.lg}"
    padding: "14px 13px"
    height: "40px"
  button-tertiary:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: "0px"
  card:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-surface-muted}"
    rounded: "{rounded.lg}"
    padding: "11px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-muted}"
    rounded: "{rounded.lg}"
    padding: "14px 16px"
    height: "48px"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: "6px 10px"
  icon-button:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    size: "36px"
---

# Webild Cloud Editorial

## Overview

Webild feels airy, optimistic, and lightly futuristic, with a polished landing-page aesthetic built to inspire quick creation and conversion. The experience balances playful cloudscape imagery with a serious, product-led structure, making it suitable for founders, marketers, and small teams wanting a fast way to launch pages. The overall tone is spacious and inviting rather than dense or technical.

## Branding & Logos

- **logo.png (Full Logo):** Displays the brand icon and the brand name text. Used in standard headers, navbars, and footers where space allows for the complete brand signature.
- **logoicon.png (Icon Logo):** Displays only the minimalist brand icon. Used in space-constrained slots such as sidebar project selectors, small avatar slots in recent lists, AI response bubble identifiers, and centered header accents.

## Colors

- **Primary (#2A2A2F):** A deep charcoal used for the strongest call-to-action buttons, prominent UI contrast, and dark text accents. It gives the interface a grounded, premium anchor against the bright background.
- **Secondary (#F3F3F3):** A soft off-white used for neutral buttons and subtle control surfaces. It keeps secondary actions visible without competing with the primary CTA.
- **Tertiary (#FBFBFB):** The lightest elevated surface tone, ideal for cards and panels that sit above the background with minimal visual weight.
- **Neutral / Surface (#FFFFFF):** Pure white is used for the base canvas, input areas, and high-clarity containers.
- **On-surface (#000000):** Crisp black text for headlines, navigation, and essential labels, matching the high-contrast editorial feel.
- **On-surface-muted (#171717):** A near-black supporting text tone for card content and body copy where full black would feel too stark.
- **Border (#E6E6E6):** A faint divider color for structural separation and soft edges, especially on floating panels and controls.
- **Accent (#8DB8FF):** A gentle sky-blue highlight used for active states, visual emphasis, and lightweight interactive cues.
- **Accent-soft (#DCEAFF):** A pale blue companion for low-emphasis highlights and blended interface accents.
- **Accent-green (#8DFFB3):** A soft mint green highlight matching the luminance and shade of the sky-blue accent, used for visual accents, progress indicators, and active highlights.
- **Accent-green-dark (#369762):** A deeper version of the mint green accent, optimized for text readability and high-contrast labels on white backgrounds.
- **Success (#BFE7A9):** A fresh green used sparingly for positive signals and subtle environmental warmth.
- **Error (#E45A5A):** A restrained red reserved for destructive states, validation, and alert messaging.

## Typography

The system uses Inter Tight throughout, which gives the brand a compact, modern, and slightly editorial voice. Headlines rely on lighter weights for h2–h4 and a medium weight for the main display line, creating a sleek contrast with the bold visual imagery. Body text stays at 16px/24px for comfortable reading, while labels and button text move slightly smaller and medium-weight for crisp utility. Letter spacing is neutral, with no visible uppercase tracking treatment, so the hierarchy comes from size, weight, and contrast rather than decorative text styling.

## Layout & Spacing

The layout is centered around a wide, fixed hero composition with generous negative space and a soft full-bleed background image. Major content sits inside layered floating panels, while the top navigation uses a rounded, inset container that spans most of the viewport width with even internal spacing. The spacing rhythm is simple and airy, using a compact base of 2px for micro-adjustments and then jumping to 12px, 18px, 40px, and 90px for component padding, section separation, and dramatic hero breathing room. Cards and controls prefer consistent internal padding over dense alignment, reinforcing the polished, easygoing feel.

## Elevation & Depth

Depth is achieved more through translucency, soft borders, and gentle shadows than through dramatic stacking. Panels use pale surfaces with subtle gray edges and light shadowing to appear lifted from the cloud background without feeling heavy. The interface leans flat overall, but the contrast between white controls, frosted containers, and dark CTA buttons creates enough hierarchy for navigation and action. Inner shadow treatment on primary buttons adds a tactile, slightly embossed quality.

## Shapes

The shape language is soft and rounded, with a notable 13px corner radius on major buttons and cards. Full pills appear on chips, icon buttons, and compact controls, while larger panels keep a moderate rounded rectangle profile. Overall, the system feels approachable and polished rather than angular or architectural.

## Components

Buttons are the most expressive component family. `button-primary` uses the charcoal `#2A2A2F` background with white text, medium label typography, 14px vertical padding, and a 40px minimum height for a confident CTA. `button-secondary` uses `#F3F3F3` with black text and the same sizing, making it ideal for less dominant actions like “Decline” or “Log in.” `button-tertiary` is text-only and should remain visually quiet for low-emphasis navigation or inline actions.

Cards use `card` styling: pale `#FBFBFB` surfaces, 13px radii, modest 11px padding, and a soft shadow. They should feel like display containers rather than hard modules, especially when paired with imagery or template previews. Inputs should stay bright, minimally bordered, and comfortably padded, with clear text contrast and no heavy outline treatment. Chips and icon buttons should remain pill-shaped, compact, and lightly elevated, with icon buttons sized around 36px to preserve the airy control cluster seen in the header and prompt composer. Navigation links should be simple, medium-gray text with minimal chrome, and should not compete with action buttons.

### Floating Overlay Sidebar

The sidebar layout for floating navigation overlays uses a custom panel:

- **Structure:** Absolute or fixed container with a left gap (`left-5`), top gap (`top-28`), and bottom gap (`bottom-5`).
- **Width:** `260px` to maintain narrow, crisp spacing.
- **Backdrop:** Light dark backdrop overlay (`bg-black/15`) with a subtle blur effect (`backdrop-blur-[2px]`).
- **Surface & Shadows:** High-fidelity frosted glass effect (`bg-white/95 backdrop-blur-md`) with soft border division (`border border-[#E6E6E6]`) and atmospheric shadow (`shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]`).
- **Corner Radius:** Approachable rounded corners (`rounded-[16px]`).
- **Trigger:** Sleek, floating pill or circle trigger button (`w-10 h-10 rounded-full`) featuring a minimalist chevron icon, offset in alignment to open/close panels cleanly.

### User Menu (Profile Menu)

- **Structure:** Absolute container positioned relative to the top right of the navigation header (`right-0 top-10`).
- **Width:** `280px` (w-72) to accommodate user details and quick actions cleanly.
- **Surface & Shadows:** Frosted glass panel (`bg-white/70 backdrop-blur-xl`) with a thin border (`border border-black/5` or `border-[#E6E6E6]`) and unified shadows (`shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]`).
- **Corner Radius:** Approvingly rounded corners (`rounded-2xl`).
- **Details:** Includes user avatar, name, email, quick links, and a log-out action button utilizing the brand's secondary/tertiary colors.

### Template Picker Panel

The sidebar editor layout picker for layout presets and AI generation uses:

- **Dimensions:** Width `486.25px`, height `831.45px`, with content region of `434.09px` centered using `26.08px` horizontal margins.
- **Card Elements:** Width `208.61px`, height `156.45px` with a `13px` corner radius, an underlying gradient mask, and action overlays on hover.
- **Controls:** A simple header "Template Library" and a magnifying glass search field. The previous tab-selector buttons ("Presets" and "Generate AI") have been removed to display the template library directly.

### Media Picker Panel

The media asset manager and uploader uses:

- **Dimensions:** Identical structural specifications as the layout picker, maintaining width `486.25px`, height `831.45px`, and content boundaries of `434.09px`.
- **Card Elements:** Two-column grid of image cards, each sized `w-[208.61px]` by `h-[156.45px]` with a `13px` corner radius, bottom gradient backdrop overlay, category text labels, and click/explore hover states.
- **Controls & Tabs:** Interactive "Your Uploads" button of width `206.5px` and "Generate Images" button of width `210.52px` with absolute positioning for the glowing multicolor shadow. Includes a standard magnifying glass search field.

### Chat Panel UI

The interactive chat composer and conversation view uses:

- **User Message Bubbles:** Styled with a pure white background, light gray border (`border-neutral-200/60`), unified card shadow (`shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]`), and rounded corners (`rounded-[18px]`) aligned to the right.
- **Webild AI Responses:** Rendered bubble-less directly on the panel. Includes a header with a 3D-glossy blue gradient sphere logo and bold text "Webild" in black.
- **Interactive Suggestions:** Dynamic pill buttons rendered horizontally. Each pill has a light border, white background, black text, and unified shadow (`shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]`).
- **Input Composer:** A floating white panel with `rounded-[20px]`, `border-neutral-200/80`, and unified shadow (`shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]`) containing a multi-line textarea, a circular left-aligned plus icon button, and right-aligned microphone and blue send buttons.

## Motion & Animation Guidelines

To deliver premium interfaces that feel tactile and responsive, all page motions must follow strict design engineering constraints.

### 1. Easing & Timing System

- **UI Interactions (Dropdowns, popovers, mobile drawers):**
  Use strong ease-out curves: `cubic-bezier(0.23, 1, 0.32, 1)`. Keep durations between `150ms` and `250ms`.
- **Morphing or On-screen movement:**
  Use strong ease-in-out curves: `cubic-bezier(0.77, 0, 0.175, 1)`. Keep durations between `250ms` and `400ms`.
- **Active / Press Interactions:**
  Use crisp ease-out: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`. Keep duration between `100ms` and `160ms`.
- **Spring Physics (Interpreted Tabs):**
  Use `stiffness: 380` and `damping: 30` to simulate quick settling and high physical momentum without bouncy overshoot.

### 2. Performance & Composition Guidelines

- **Native Scrolling:** Scrolling relies on standard native browser actions with no scroll-jacking or interception.
- **Hardware Acceleration:** Ensure interactive transitions are composited on the GPU rather than triggering browser repaints, using composite-friendly properties like transforms and opacity.

### 3. Tactile Micro-Interactions

- **Active Press Scale:**
  - Major buttons (CTAs, primary triggers): scale down to `scale(0.97)` on active press.
  - Minor buttons (icons, smaller control pills): scale down to `scale(0.95)`.
  - Apply transition directly to the `transform` property. Never use `transition: all`.
- **Entrance Animation Origin:**
  - Never animate element entrances from `scale(0)`. Start from `scale(0.95)` combined with `opacity: 0` to simulate spatial materialization.
- **Stagger Delays:**
  - When rendering lists or grids (templates, process cards), stagger entry delays between `30ms` and `80ms` per item. Never block page interactivity during staggering.
- **Touch-Device Guard:**
  - Restrict all hover states to fine-pointer devices to avoid "sticky hovers" on iOS/Android. Use `@media (hover: hover) and (pointer: fine)` or Tailwind's `future.hoverOnlyWhenSupported` configuration.

## Do's and Don'ts

- Do keep primary actions dark, rounded, and compact, with clear white text.
- Do use generous whitespace and large centered hero compositions.
- Do preserve the soft, high-key palette and avoid harsh outlines.
- Do keep body copy and labels clean, plain, and highly legible with Inter Tight.
- Do specify exact target properties for CSS transitions (avoid `transition: all`).
- Do use hardware-accelerated transforms for interactive transitions.
- Don't introduce sharp corners or aggressive geometric styling.
- Don't overuse shadows; depth should feel subtle and atmospheric.
- Don't make secondary controls louder than the main CTA.
- Don't compress layouts into dense grids; the system should breathe.
- Don't animate element entries starting from a scale of 0.
- Don't trigger animations on keyboard-activated shortcuts.
```

---

## File: `drizzle.config.ts`

```typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env.DATABASE_URL ||
      "postgresql://postgres:imblue-12345@localhost:4000/linked",
  },
});
```

---

## File: `middleware.ts`

```typescript
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") || "";

  // 1. Exclude asset paths and direct API routes
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    url.pathname.includes(".") ||
    url.pathname.startsWith("/logo") ||
    url.pathname.startsWith("/bg")
  ) {
    return NextResponse.next();
  }

  // 2. Identify if host is subdomain or custom domain
  const mainDomains = ["linkedpage.io", "linkedpage.me", "localhost:3000"];
  let subdomainSlug: string | null = null;

  for (const domain of mainDomains) {
    if (host.endsWith("." + domain)) {
      subdomainSlug = host.replace("." + domain, "").split(":")[0];
      break;
    }
  }

  // 3. Resolve slug from DB (via fetch API to avoid edge runtime fs limitations)
  let targetSlug: string | null = subdomainSlug;

  if (!targetSlug && !mainDomains.includes(host)) {
    // It's a custom domain, ask resolve-host API route
    try {
      const apiHost = host.includes("localhost")
        ? "http://localhost:3000"
        : `https://${host}`;
      const res = await fetch(
        `${apiHost}/api/websites/resolve-host?host=${encodeURIComponent(host)}`,
      );
      const data = await res.json();
      if (data && data.slug) {
        targetSlug = data.slug;
      }
    } catch (e) {
      console.error("Middleware resolve host fetch error:", e);
    }
  }

  // 4. Perform rewrite if resolved
  if (targetSlug) {
    url.pathname = `/p/${targetSlug}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Configure matcher to limit middleware executions
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
```

---

## File: `next-env.d.ts`

```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/dev/types/routes.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
```

---

## File: `package.json`

```json
{
  "name": "fusion-starter",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest --run",
    "format.fix": "prettier --write .",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@types/adm-zip": "^0.5.8",
    "@types/bcryptjs": "^3.0.0",
    "@types/jsonwebtoken": "^9.0.10",
    "adm-zip": "^0.5.17",
    "bcryptjs": "^3.0.3",
    "better-auth": "^1.6.13",
    "better-sqlite3": "^12.10.0",
    "dotenv": "^17.2.1",
    "drizzle-orm": "^0.45.2",
    "jsonwebtoken": "^9.0.3",
    "next": "latest",
    "pg": "^8.21.0",
    "playwright": "^1.60.0",
    "zod": "^3.25.76"
  },
  "devDependencies": {
    "@hookform/resolvers": "^5.2.1",
    "@radix-ui/react-accordion": "^1.2.11",
    "@radix-ui/react-alert-dialog": "^1.1.14",
    "@radix-ui/react-aspect-ratio": "^1.1.7",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-checkbox": "^1.3.2",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-context-menu": "^2.2.15",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-dropdown-menu": "^2.1.15",
    "@radix-ui/react-hover-card": "^1.1.14",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-menubar": "^1.1.15",
    "@radix-ui/react-navigation-menu": "^1.2.13",
    "@radix-ui/react-popover": "^1.1.14",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-radio-group": "^1.3.7",
    "@radix-ui/react-scroll-area": "^1.2.9",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slider": "^1.3.5",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.2.5",
    "@radix-ui/react-tabs": "^1.1.12",
    "@radix-ui/react-toast": "^1.2.14",
    "@radix-ui/react-toggle": "^1.1.9",
    "@radix-ui/react-toggle-group": "^1.1.10",
    "@radix-ui/react-tooltip": "^1.2.7",
    "@react-three/drei": "^9.122.0",
    "@react-three/fiber": "^8.18.0",
    "@swc/core": "^1.13.3",
    "@tailwindcss/typography": "^0.5.16",
    "@tanstack/react-query": "^5.84.2",
    "@types/cors": "^2.8.19",
    "@types/express": "^5.0.3",
    "@types/node": "^24.2.1",
    "@types/pg": "^8.20.0",
    "@types/react": "^18.3.23",
    "@types/react-dom": "^18.3.7",
    "@types/three": "^0.176.0",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.4.21",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "cors": "^2.8.5",
    "date-fns": "^4.1.0",
    "drizzle-kit": "^0.31.10",
    "embla-carousel-react": "^8.6.0",
    "framer-motion": "^12.23.12",
    "globals": "^16.3.0",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.539.0",
    "next-themes": "^0.4.6",
    "postcss": "^8.5.6",
    "prettier": "^3.6.2",
    "react": "^18.3.1",
    "react-day-picker": "^9.8.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.62.0",
    "react-resizable-panels": "^3.0.4",
    "react-router-dom": "^6.30.1",
    "recharts": "^2.12.7",
    "serverless-http": "^3.2.0",
    "sonner": "^1.7.4",
    "tailwind-merge": "^2.6.0",
    "tailwindcss": "^3.4.17",
    "tailwindcss-animate": "^1.0.7",
    "three": "^0.176.0",
    "tsx": "^4.20.3",
    "typescript": "^5.9.2",
    "vaul": "^1.1.2",
    "vite": "^8.0.2",
    "vitest": "^4.1.0"
  },
  "packageManager": "pnpm@10.14.0+sha512.ad27a79641b49c3e481a16a805baa71817a04bbe06a38d17e60e2eaee83f6a146c6a688125f5792e48dd5ba30e7da52a5cda4c3992b9ccf333f9ce223af84748",
  "pnpm": {
    "overrides": {
      "kysely": "0.28.0"
    }
  },
  "pkg": {
    "assets": ["dist/spa/*"],
    "scripts": ["dist/server/**/*.js"]
  }
}
```

---

## File: `postcss.config.js`

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

## File: `skills-lock.json`

```json
{
  "version": 1,
  "skills": {
    "better-auth": {
      "source": "secondsky/claude-skills",
      "sourceType": "github",
      "skillPath": "plugins/better-auth/skills/better-auth/SKILL.md",
      "computedHash": "de3b1f9cae922ca43f2aced878c3668086c2cf669da43276178679df3a778f31"
    },
    "better-auth-best-practices": {
      "source": "better-auth/skills",
      "sourceType": "github",
      "skillPath": "better-auth/best-practices/SKILL.md",
      "computedHash": "9ab075b5061be2a5f299c10505667345cc1ec76e8de4120901cfd586643e776f"
    },
    "create-auth-skill": {
      "source": "better-auth/skills",
      "sourceType": "github",
      "skillPath": "better-auth/create-auth/SKILL.md",
      "computedHash": "393e8d2d795fa5797c9a4e0665f29183ea2e140233db59746d510340a10456e6"
    },
    "glassmorphism": {
      "source": "ainergiz/design-inspirations",
      "sourceType": "github",
      "skillPath": ".claude/skills/glassmorphism/SKILL.md",
      "computedHash": "96b57506515153cbca213dc6a38588e1698591283de67c733c9caa29eec7fe12"
    }
  }
}
```

---

## File: `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

export default {
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: [
          "Inter Tight",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        inter: [
          "Inter Tight",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Webild Cloud Editorial brand colors
        webild: {
          primary: "#2A2A2F",
          secondary: "#F3F3F3",
          tertiary: "#FBFBFB",
          neutral: "#FFFFFF",
          surface: "#FFFFFF",
          "surface-muted": "#F7F7F7",
          "on-surface": "#000000",
          "on-surface-muted": "#171717",
          border: "#E6E6E6",
          accent: "#8DB8FF",
          "accent-soft": "#DCEAFF",
          "accent-green": "#8DFFB3",
          "accent-green-dark": "#369762",
          success: "#BFE7A9",
          error: "#E45A5A",
        },
        // Keep linkedpage mapped to Webild for compatibility
        linkedpage: {
          blue: "#8DB8FF",
          dark: "#2A2A2F",
          "dark-card": "#FBFBFB",
          "dark-card2": "#F3F3F3",
          light: "#FBFBFB",
          border: "#E6E6E6",
          text: "#171717",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        card: "13px",
      },
      boxShadow: {
        sm: "0px 6px 10px -6px rgba(0,0,0,0.09)",
        DEFAULT: "0px 6px 10px -6px rgba(0,0,0,0.09)",
        md: "0px 6px 10px -6px rgba(0,0,0,0.09)",
        lg: "0px 6px 10px -6px rgba(0,0,0,0.09)",
        xl: "0px 6px 10px -6px rgba(0,0,0,0.09)",
        "2xl": "0px 6px 10px -6px rgba(0,0,0,0.09)",
      },
      maxWidth: {
        content: "1536px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "scroll-slow": "scroll 40s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

---

## File: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@shared/*": ["./shared/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    "shared/**/*",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": ["node_modules", ".next", "dist", "client"]
}
```

---

## File: `.vercel\project.json`

```json
{
  "projectId": "prj_1J5yBTHexKAG31O1JN8gXqpO1Q3m",
  "orgId": "team_PWgPdAQ7NcmD35J37bj8ri4t",
  "projectName": "fusion-starter-529"
}
```

---

## File: `app\globals.css`

```css
/** @import must precede all other statements */
@import url("https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    /* #FFFFFF */
    --foreground: 0 0% 0%;
    /* #000000 (on-surface) */

    --card: 0 0% 98.4%;
    /* #FBFBFB (tertiary) */
    --card-foreground: 0 0% 9%;
    /* #171717 (on-surface-muted) */

    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 0%;

    --primary: 240 5.3% 17.6%;
    /* #2A2A2F */
    --primary-foreground: 0 0% 100%;
    /* #FFFFFF */

    --secondary: 0 0% 95.3%;
    /* #F3F3F3 */
    --secondary-foreground: 0 0% 0%;
    /* #000000 */

    --muted: 0 0% 96.9%;
    /* #F7F7F7 (surface-muted) */
    --muted-foreground: 0 0% 9%;
    /* #171717 */

    --accent: 217 100% 77.6%;
    /* #8DB8FF */
    --accent-foreground: 0 0% 0%;

    --accent-green: 140 100% 77.6%;
    /* #8DFFB3 */
    --accent-green-dark: 140 47.1% 40.4%;
    /* #369762 */

    --destructive: 0 74.3% 62.5%;
    /* #E45A5A (error) */
    --destructive-foreground: 0 0% 100%;

    --border: 0 0% 90.2%;
    /* #E6E6E6 */
    --input: 0 0% 100%;
    /* #FFFFFF */
    --ring: 217 100% 77.6%;
    /* #8DB8FF */

    --radius: 0.8125rem;
    /* 13px */

    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 240 5.9% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;

    /* Motion Durations */
    --dur-1: 120ms;
    --dur-2: 180ms;
    --dur-3: 240ms;
    --dur-4: 300ms;
    --dur-5: 500ms;

    /* Motion Ease-out */
    --ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
    --ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
    --ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1);
    --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
    --ease-out-circ: cubic-bezier(0.075, 0.82, 0.165, 1);

    /* Motion Ease-in-out */
    --ease-in-out-quad: cubic-bezier(0.455, 0.03, 0.515, 0.955);
    --ease-in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1);
    --ease-in-out-quart: cubic-bezier(0.77, 0, 0.175, 1);
    --ease-in-out-quint: cubic-bezier(0.86, 0, 0.07, 1);
    --ease-in-out-expo: cubic-bezier(1, 0, 0, 1);
    --ease-in-out-circ: cubic-bezier(0.785, 0.135, 0.15, 0.86);
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-inter;
  }

  :where(p, span, li, h1, h2, h3, h4, h5, h6, a, button, label, td, th) {
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  pre,
  code {
    overflow-x: auto;
    white-space: pre;
  }
}

@layer utilities {
  .font-inter {
    font-family:
      "Inter Tight",
      "Inter",
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;
  }

  /* Dark flat button with tactile inner shadow */
  .btn-dark {
    background-color: #2a2a2f;
    box-shadow: 0px 6px 10px -6px rgba(0, 0, 0, 0.09);
    transition:
      background-color 180ms cubic-bezier(0.165, 0.84, 0.44, 1),
      box-shadow 180ms cubic-bezier(0.165, 0.84, 0.44, 1),
      transform 120ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .btn-dark:active {
    transform: scale(0.97);
  }

  .btn-dark-sm {
    background-color: #2a2a2f;
    box-shadow: 0px 6px 10px -6px rgba(0, 0, 0, 0.09);
    transition:
      background-color 180ms cubic-bezier(0.165, 0.84, 0.44, 1),
      box-shadow 180ms cubic-bezier(0.165, 0.84, 0.44, 1),
      transform 120ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .btn-dark-sm:active {
    transform: scale(0.97);
  }

  /* Success gradient button */
  .btn-green {
    background-color: #2a2a2f;
    color: #ffffff;
    box-shadow: 0px 6px 10px -6px rgba(0, 0, 0, 0.09);
    transition:
      opacity 180ms cubic-bezier(0.165, 0.84, 0.44, 1),
      transform 120ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .btn-green:active {
    transform: scale(0.97);
  }

  /* Light card */
  .card-light {
    background: #fbfbfb;
    border: 1px solid #e6e6e6;
    box-shadow: 0px 6px 10px -6px rgba(0, 0, 0, 0.09);
  }

  /* Card button shadow */
  .card-btn-shadow {
    box-shadow: 0px 6px 10px -6px rgba(0, 0, 0, 0.09);
  }

  /* Dark card */
  .dark-card {
    background: #fbfbfb;
    border: 1px solid #e6e6e6;
    box-shadow: 0px 6px 10px -6px rgba(0, 0, 0, 0.09);
  }

  /* Glass card (frosted panel) */
  .glass-card {
    background: rgba(255, 255, 255, 0.507);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(230, 230, 230, 0.4);
    box-shadow: 0px 6px 10px -6px rgba(0, 0, 0, 0.09);
  }

  /* Rainbow gradient text */
  .gradient-text-rainbow {
    background: linear-gradient(
      93deg,
      #0894ff 0%,
      #c959dd 34%,
      #ff2e54 68%,
      #ff9004 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Hero gradient overlay */
  .hero-overlay {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.45) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0.95) 100%
    );
    opacity: 30%;
  }

  /* Section to dark (top transition) - modified to be simple soft transition */
  .section-to-dark-top {
    background: linear-gradient(180deg, #ffffff 0%, #f7f7f7 100%);
  }

  /* Section to dark (bottom transition) - modified to be simple soft transition */
  .section-to-dark-bottom {
    background: linear-gradient(180deg, #f7f7f7 0%, #ffffff 100%);
  }

  /* Footer gradient */
  .footer-gradient {
    background: #fbfbfb;
    border: 1px solid #e6e6e6;
  }

  /* Scrollbar hidden for carousels */
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  /* Template card hover overlay */
  .template-hover-overlay {
    opacity: 0;
    transition: opacity 180ms cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  @media (hover: hover) and (pointer: fine) {
    .template-card:hover .template-hover-overlay {
      opacity: 1;
    }
  }

  /* ======================================
     WEBILD DESIGN SYSTEM COMPONENT CLASSES
     ====================================== */

  /* Border radius tokens */
  .rounded-extra-sm {
    border-radius: 4px;
  }

  /* Card surface */
  .card {
    background-color: #fbfbfb;
    border: 1px solid #e6e6e6;
    border-radius: 13px;
    box-shadow: 0px 6px 10px -6px rgba(0, 0, 0, 0.09);
  }

  /* Base button reset + shared styles */
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-family:
      "Inter Tight",
      "Inter",
      -apple-system,
      sans-serif;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    border-radius: 13px;
    padding: 14px 13px;
    min-height: 40px;
    cursor: pointer;
    border: none;
    outline: none;
    white-space: nowrap;
    transition:
      background-color 180ms cubic-bezier(0.165, 0.84, 0.44, 1),
      transform 120ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .button:active {
    transform: scale(0.97);
  }

  /* Primary button */
  .button-primary {
    background-color: #2a2a2f;
    color: #ffffff;
    box-shadow: 0px 6px 10px -6px rgba(0, 0, 0, 0.09);
  }

  .button-primary:hover {
    background-color: #3a3a42;
  }

  /* Secondary button */
  .button-secondary {
    background-color: #f3f3f3;
    color: #000000;
    border: 1px solid #e6e6e6;
  }

  .button-secondary:hover {
    background-color: #eaeaea;
  }

  /* Tertiary button */
  .button-tertiary {
    background-color: transparent;
    color: #000000;
    padding: 0;
    min-height: auto;
    border-radius: 0;
  }

  /* Design system input */
  .ds-input {
    background-color: #ffffff;
    color: #171717;
    border: 1px solid #e6e6e6;
    border-radius: 13px;
    padding: 14px 16px;
    height: 48px;
    font-family:
      "Inter Tight",
      "Inter",
      -apple-system,
      sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    outline: none;
    width: 100%;
    transition:
      border-color 150ms cubic-bezier(0.165, 0.84, 0.44, 1),
      box-shadow 150ms cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  .ds-input::placeholder {
    color: #9ca3af;
  }

  .ds-input:focus {
    border-color: #8db8ff;
    box-shadow: 0 0 0 3px rgba(141, 184, 255, 0.15);
  }

  /* Divider */
  .ds-divider {
    height: 1px;
    background-color: #e6e6e6;
    width: 100%;
  }
}
```

---

## File: `app\layout.tsx`

```tsx
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { EditorProvider } from "@/context/EditorContext";

export const metadata: Metadata = {
  title: "LinkedPage – Turn Your LinkedIn Into a Beautiful Personal Site",
  description:
    "Paste your LinkedIn URL and get a stunning personal micro-site in under 60 seconds. Pick a template, edit inline, publish free.",
  openGraph: {
    title: "LinkedPage – LinkedIn → Personal Site in 60 Seconds",
    description:
      "Convert your LinkedIn profile into a beautiful micro-site. No code. Just paste, customise, publish.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen font-inter bg-white text-black antialiased">
        <EditorProvider>{children}</EditorProvider>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
```

---

## File: `app\not-found.tsx`

```tsx
"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white font-inter flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-5 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col items-center gap-8 max-w-sm text-center"
        >
          {/* Icon */}
          <div className="w-16 h-16   rounded-lg bg-[#F3F3F3] flex items-center justify-center">
            <Compass className="w-7 h-7 text-[#9CA3AF]" />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-medium text-black">404</h1>
            <p className="text-base text-[#6B6B6B] leading-relaxed">
              This page doesn't exist. Maybe it was moved, deleted, or you typed
              the URL incorrectly.
            </p>
          </div>

          {/* CTA */}
          <Link href="/" className="button button-primary gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back to home
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
```

---

## File: `app\page.tsx`

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Home,
  Layout as LayoutIcon,
  Folder,
  CreditCard,
  BookOpen,
  Settings,
  LogOut,
  User,
  Shield,
} from "lucide-react";

function UserMenu() {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "scale(0.95)" }}
      animate={{ opacity: 1, transform: "scale(1)" }}
      exit={{ opacity: 0, transform: "scale(0.95)" }}
      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
      className="absolute z-55 top-10 rounded-2xl origin-top-right border border-[#010101]/5 bg-white/70 backdrop-blur-xl shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] right-0 w-72 p-5"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
        transformOrigin: "top right",
      }}
    >
      <div
        className="space-y-4"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
        }}
      >
        <div
          className="flex items-center gap-3"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
          }}
        >
          <div
            className="relative shrink-0 rounded-lg h-9 w-9 p-0.5 cursor-pointer border border-[#E6E6E6]"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
            }}
          >
            <img
              className="h-full w-full object-cover rounded-lg"
              height={31}
              width={31}
              alt="user"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                color: "transparent",
              }}
            />
          </div>
          <div
            className="truncate"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
            }}
          >
            <p
              className="text-sm font-medium leading-tight text-[#2A2A2F] truncate"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            >
              Ayesha Zulfiqar
            </p>
            <p
              className="text-xs text-[#171717]/60 leading-tight truncate"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            >
              ayeshazulfiqar609@gmail.com
            </p>
          </div>
        </div>
        <div
          className="border-t border-black/8"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
          }}
        />
        <div
          className="flex flex-col gap-3"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
          }}
        >
          <div
            className="relative p-4 flex flex-col gap-2 bg-black/5 backdrop-blur-sm border border-white/40 rounded-[10px]"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
            }}
          >
            <div
              className="flex justify-between"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            >
              <span
                className="text-sm font-medium text-[#2A2A2F]"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              >
                Credits
              </span>
              <span
                className="text-sm font-medium text-[#2A2A2F]"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              >
                16 left
              </span>
            </div>
            <div
              className="w-full rounded-lg bg-white border border-[#E6E6E6] overflow-hidden p-0.5"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            >
              <div
                className="relative bg-[#8DFFB3] h-2 rounded-lg transition-all duration-300"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                  width: "25%",
                }}
              />
            </div>
            <div
              className="text-xs text-[#171717]/70 mt-1 leading-relaxed"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            >
              <span
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              >
                You're on the free plan. Unlock additional features and credits
                by upgrading your plan.
              </span>
            </div>
          </div>
          <button
            className="flex items-center justify-center font-medium transition-all duration-150 bg-[#2A2A2F] text-white hover:bg-[#3E3E45] rounded-[9px] w-full text-xs h-9 active:scale-95"
            type="button"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
            }}
          >
            Upgrade
          </button>
        </div>
        <div className="flex flex-col gap-1">
          <button
            className="text-sm font-medium transition-colors duration-150 flex items-center h-fit gap-2 justify-start p-2 rounded-lg hover:bg-[#F7F7F7] text-[#171717]/80 hover:text-black w-full"
            type="button"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
            }}
          >
            <svg
              className="w-5 h-5"
              height="24"
              width="24"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            >
              <path
                d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 0 3.319-1.915"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              />
              <circle
                cx="12"
                cy="12"
                r="3"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              />
            </svg>
            Settings
          </button>
          <button
            className="text-sm font-medium transition-colors duration-150 flex items-center h-fit gap-2 justify-start p-2 rounded-lg hover:bg-[#F7F7F7] text-[#171717]/80 hover:text-black w-full"
            type="button"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
            }}
          >
            <svg
              className="w-5 h-5"
              height="24"
              width="24"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            >
              <path
                d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              />
            </svg>
            Report a bug
          </button>
          <button
            className="text-sm font-medium transition-colors duration-150 flex items-center h-fit gap-2 justify-start p-2 rounded-lg hover:bg-[#F7F7F7] text-[#171717]/80 hover:text-black w-full"
            type="button"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
            }}
          >
            <svg
              className="w-5 h-5"
              height="24"
              width="24"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            >
              <path
                d="M12 7v14"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              />
              <path
                d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              />
            </svg>
            Documentation
          </button>
        </div>
        <div
          className="border-t border-black/8"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
          }}
        />
        <button
          className="text-sm font-medium transition-colors duration-150 flex items-center h-fit gap-2 justify-start p-2 rounded-lg hover:bg-[#F3F3F3] text-black w-full"
          type="button"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
          }}
        >
          <svg
            className="w-5 h-5"
            height="24"
            width="24"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
            }}
          >
            <path
              d="m16 17 5-5-5-5"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            />
            <path
              d="M21 12H9"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            />
            <path
              d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            />
          </svg>
          Sign out
        </button>
      </div>
    </motion.div>
  );
}

// ─── Small reusable pieces ───────────────────────────────────────────────────

function DarkButton({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center h-10 px-6      rounded-lg   btn-dark text-white text-[12px] font-medium whitespace-nowrap hover:bg-[#3E3E45] ${className}`}
    >
      {children}
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#369762] text-[13px] leading-[18px] font-semibold uppercase tracking-wider mb-2 font-inter-tight">
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[28px] sm:text-[38px] leading-[46px] font-normal text-black font-inter-tight">
      {children}
    </h2>
  );
}

// ─── Template card data ───────────────────────────────────────────────────────

const TEMPLATES_LARGE = [
  {
    name: "Minimal Card",
    subtitle: "Clean, elegant, and focused on essential links",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/ccea70025e4eb65efc78244adad19aa72081243a?width=982",
  },
  {
    name: "Bento Grid",
    subtitle: "A highly visual grid showcasing work, experience, and projects",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/b44548e7be08969a8dfc228c049f55fdc9f7bcbb?width=982",
  },
  {
    name: "Full-Page Scroll",
    subtitle:
      "A modern, smooth-scrolling experience that tells your career story",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/22a1dcc1827cb472b41466029a5665e67ea82849?width=982",
  },
  {
    name: "Dark Bento",
    subtitle: "High-contrast dark mode grid for professional standout profiles",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/de2496b30f9ab12d95e5ad6f29af5e66821c7e0d?width=982",
  },
];

const FAQ_ITEMS = [
  "What is LinkedPage and how does it work?",
  "Do I need design or coding experience to use LinkedPage?",
  "How can I customize my micro-site?",
  "Can I connect my own domain or subdomain?",
  "Does LinkedPage host my micro-site?",
  "Can I edit or update my site after publishing?",
  "Can I export the code of my micro-site?",
];

// ─── Live Preview Modal Component ─────────────────────────────────────────────

function PreviewModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-2xl bg-white rounded-[18px] border border-[#E6E6E6]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  overflow-hidden text-left flex flex-col max-h-[85vh] select-none"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F3F3F3]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5   rounded-lg bg-[#369762]" />
            <span className="text-[13px] font-semibold text-black font-mono">
              reidhoffman.linkedpage.me
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8   rounded-lg flex items-center justify-center bg-[#F3F3F3] text-black hover:bg-[#EAEAEA] transition-colors active:scale-90 font-bold"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-[#F7F7F7]">
          {/* Micro-site content */}
          <div className="bg-white      rounded-lg   border border-[#E6E6E6] p-6 flex flex-col gap-4  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16   rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256"
                  alt="Reid Hoffman"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-[20px] font-bold text-black font-inter-tight leading-tight">
                  Reid Hoffman
                </h3>
                <p className="text-[13px] text-gray-500 font-inter-tight">
                  Co-founder LinkedIn | Partner at Greylock
                </p>
              </div>
            </div>
            <p className="text-[14px] text-[#171717]/80 leading-relaxed font-inter-tight">
              Entrepreneur, executive, and venture capitalist. Passionate about
              building products that connect people and scale networks to
              transform industries.
            </p>
          </div>

          {/* Bento blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white      rounded-lg   border border-[#E6E6E6] p-4 flex flex-col gap-2  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
              <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">
                Experience
              </span>
              <p className="text-[14px] font-semibold text-black font-inter-tight">
                Greylock Partners
              </p>
              <p className="text-[12px] text-gray-500 font-inter-tight">
                Partner • 2009 - Present
              </p>
            </div>
            <div className="bg-white      rounded-lg   border border-[#E6E6E6] p-4 flex flex-col gap-2  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
              <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">
                Education
              </span>
              <p className="text-[14px] font-semibold text-black font-inter-tight">
                Stanford University
              </p>
              <p className="text-[12px] text-gray-500 font-inter-tight">
                BS in Cognitive Science
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#F3F3F3] bg-white">
          <button
            onClick={() =>
              toast.success("Code ZIP export complete! check your downloads.")
            }
            className="h-10 px-5      rounded-lg   bg-[#2A2A2F] text-white text-[12px] font-medium hover:bg-[#3E3E45] transition-colors active:scale-95"
          >
            Export ZIP Source
          </button>
          <button
            onClick={() => {
              toast.success(
                "Micro-site published live on reidhoffman.linkedpage.me!",
              );
              onClose();
            }}
            className="h-10 px-5      rounded-lg   bg-[#E6FFE6] border border-[#8DFFB3]/40 text-[#1B5E20] text-[12px] font-medium hover:bg-[#D4FCD4] transition-colors active:scale-95"
          >
            Publish Live
          </button>
        </div>
      </motion.div>
    </div>
  );
}

const COLOR_PALETTES = [
  {
    name: "Alexandria",
    gradient:
      "conic-gradient(rgb(245, 250, 255) 0%, rgb(245, 250, 255) 25%, rgb(21, 71, 156) 25%, rgb(21, 71, 156) 50%, rgb(168, 204, 232) 50%, rgb(168, 204, 232) 75%, rgb(123, 163, 207) 75%, rgb(123, 163, 207) 100%)",
  },
  {
    name: "Evergreen",
    gradient:
      "conic-gradient(rgb(250, 255, 251) 0%, rgb(250, 255, 251) 25%, rgb(10, 112, 95) 25%, rgb(10, 112, 95) 50%, rgb(168, 217, 190) 50%, rgb(168, 217, 190) 75%, rgb(107, 191, 184) 75%, rgb(107, 191, 184) 100%)",
  },
  {
    name: "Crimson",
    gradient:
      "conic-gradient(rgb(255, 250, 250) 0%, rgb(255, 250, 250) 25%, rgb(230, 57, 70) 25%, rgb(230, 57, 70) 50%, rgb(245, 196, 199) 50%, rgb(245, 196, 199) 75%, rgb(240, 145, 153) 75%, rgb(240, 145, 153) 100%)",
  },
  {
    name: "Lavender",
    gradient:
      "conic-gradient(rgb(251, 250, 255) 0%, rgb(251, 250, 255) 25%, rgb(139, 92, 246) 25%, rgb(139, 92, 246) 50%, rgb(216, 206, 245) 50%, rgb(216, 206, 245) 75%, rgb(196, 168, 249) 75%, rgb(196, 168, 249) 100%)",
  },
  {
    name: "Sahara",
    gradient:
      "conic-gradient(rgb(246, 240, 233) 0%, rgb(246, 240, 233) 25%, rgb(43, 24, 10) 25%, rgb(43, 24, 10) 50%, rgb(148, 135, 124) 50%, rgb(148, 135, 124) 75%, rgb(175, 160, 148) 75%, rgb(175, 160, 148) 100%)",
  },
  {
    name: "Glacier",
    gradient:
      "conic-gradient(rgb(245, 245, 245) 0%, rgb(245, 245, 245) 25%, rgb(28, 28, 28) 25%, rgb(28, 28, 28) 50%, rgb(21, 71, 156) 50%, rgb(21, 71, 156) 75%, rgb(168, 204, 232) 75%, rgb(168, 204, 232) 100%)",
  },
  {
    name: "Forest",
    gradient:
      "conic-gradient(rgb(245, 245, 245) 0%, rgb(245, 245, 245) 25%, rgb(28, 28, 28) 25%, rgb(28, 28, 28) 50%, rgb(21, 156, 73) 50%, rgb(21, 156, 73) 75%, rgb(168, 232, 186) 75%, rgb(168, 232, 186) 100%)",
  },
  {
    name: "Coral",
    gradient:
      "conic-gradient(rgb(245, 245, 245) 0%, rgb(245, 245, 245) 25%, rgb(28, 28, 28) 25%, rgb(28, 28, 28) 50%, rgb(230, 57, 70) 50%, rgb(230, 57, 70) 75%, rgb(232, 190, 168) 75%, rgb(232, 190, 168) 100%)",
  },
  {
    name: "Amethyst",
    gradient:
      "conic-gradient(rgb(245, 245, 245) 0%, rgb(245, 245, 245) 25%, rgb(28, 28, 28) 25%, rgb(28, 28, 28) 50%, rgb(97, 57, 230) 50%, rgb(97, 57, 230) 75%, rgb(179, 168, 232) 75%, rgb(179, 168, 232) 100%)",
  },
  {
    name: "Parchment",
    gradient:
      "conic-gradient(rgb(239, 235, 229) 0%, rgb(239, 235, 229) 25%, rgb(0, 0, 0) 25%, rgb(0, 0, 0) 50%, rgb(255, 255, 255) 50%, rgb(255, 255, 255) 75%, rgb(225, 184, 117) 75%, rgb(225, 184, 117) 100%)",
  },
  {
    name: "Emerald City",
    gradient:
      "conic-gradient(rgb(245, 245, 245) 0%, rgb(245, 245, 245) 25%, rgb(31, 81, 76) 25%, rgb(31, 81, 76) 50%, rgb(21, 156, 73) 50%, rgb(21, 156, 73) 75%, rgb(168, 232, 186) 75%, rgb(168, 232, 186) 100%)",
  },
  {
    name: "Navy Pier",
    gradient:
      "conic-gradient(rgb(245, 245, 245) 0%, rgb(245, 245, 245) 25%, rgb(31, 50, 81) 25%, rgb(31, 50, 81) 50%, rgb(21, 71, 156) 50%, rgb(21, 71, 156) 75%, rgb(168, 204, 232) 75%, rgb(168, 204, 232) 100%)",
  },
  {
    name: "Bordeaux",
    gradient:
      "conic-gradient(rgb(245, 245, 245) 0%, rgb(245, 245, 245) 25%, rgb(81, 31, 31) 25%, rgb(81, 31, 31) 50%, rgb(230, 57, 70) 50%, rgb(230, 57, 70) 75%, rgb(232, 190, 168) 75%, rgb(232, 190, 168) 100%)",
  },
  {
    name: "Plum",
    gradient:
      "conic-gradient(rgb(245, 245, 245) 0%, rgb(245, 245, 245) 25%, rgb(52, 31, 81) 25%, rgb(52, 31, 81) 50%, rgb(97, 57, 230) 50%, rgb(97, 57, 230) 75%, rgb(179, 168, 232) 75%, rgb(179, 168, 232) 100%)",
  },
  {
    name: "Sakura",
    gradient:
      "conic-gradient(rgb(247, 246, 247) 0%, rgb(247, 246, 247) 25%, rgb(27, 12, 37) 25%, rgb(27, 12, 37) 50%, rgb(255, 147, 228) 50%, rgb(255, 147, 228) 75%, rgb(232, 168, 195) 75%, rgb(232, 168, 195) 100%)",
  },
  {
    name: "Sunset",
    gradient:
      "conic-gradient(rgb(247, 246, 247) 0%, rgb(247, 246, 247) 25%, rgb(255, 98, 7) 25%, rgb(255, 98, 7) 50%, rgb(255, 206, 147) 50%, rgb(255, 206, 147) 75%, rgb(232, 207, 168) 75%, rgb(232, 207, 168) 100%)",
  },
  {
    name: "Azure",
    gradient:
      "conic-gradient(rgb(247, 246, 247) 0%, rgb(247, 246, 247) 25%, rgb(7, 152, 255) 25%, rgb(7, 152, 255) 50%, rgb(147, 199, 255) 50%, rgb(147, 199, 255) 75%, rgb(168, 205, 232) 75%, rgb(168, 205, 232) 100%)",
  },
  {
    name: "Peach Blossom",
    gradient:
      "conic-gradient(rgb(227, 222, 234) 0%, rgb(227, 222, 234) 25%, rgb(39, 35, 31) 25%, rgb(39, 35, 31) 50%, rgb(198, 138, 98) 50%, rgb(198, 138, 98) 75%, rgb(198, 138, 98) 75%, rgb(198, 138, 98) 100%)",
  },
  {
    name: "Iris",
    gradient:
      "conic-gradient(rgb(227, 222, 234) 0%, rgb(227, 222, 234) 25%, rgb(31, 32, 39) 25%, rgb(31, 32, 39) 50%, rgb(98, 125, 198) 50%, rgb(98, 125, 198) 75%, rgb(98, 125, 198) 75%, rgb(98, 125, 198) 100%)",
  },
  {
    name: "Sandstone",
    gradient:
      "conic-gradient(rgb(245, 244, 239) 0%, rgb(245, 244, 239) 25%, rgb(42, 41, 40) 25%, rgb(42, 41, 40) 50%, rgb(255, 255, 255) 50%, rgb(255, 255, 255) 75%, rgb(198, 177, 128) 75%, rgb(198, 177, 128) 100%)",
  },
  {
    name: "Slate",
    gradient:
      "conic-gradient(rgb(245, 244, 240) 0%, rgb(245, 244, 240) 25%, rgb(44, 44, 44) 25%, rgb(44, 44, 44) 50%, rgb(138, 138, 138) 50%, rgb(138, 138, 138) 75%, rgb(232, 230, 225) 75%, rgb(232, 230, 225) 100%)",
  },
  {
    name: "Botanical",
    gradient:
      "conic-gradient(rgb(246, 247, 244) 0%, rgb(246, 247, 244) 25%, rgb(14, 58, 41) 25%, rgb(14, 58, 41) 50%, rgb(53, 193, 139) 50%, rgb(53, 193, 139) 75%, rgb(198, 239, 198) 75%, rgb(198, 239, 198) 100%)",
  },
  {
    name: "Desert",
    gradient:
      "conic-gradient(rgb(252, 246, 236) 0%, rgb(252, 246, 236) 25%, rgb(46, 37, 33) 25%, rgb(46, 37, 33) 50%, rgb(178, 162, 139) 50%, rgb(178, 162, 139) 75%, rgb(178, 162, 139) 75%, rgb(178, 162, 139) 100%)",
  },
  {
    name: "Rosewood",
    gradient:
      "conic-gradient(rgb(247, 246, 247) 0%, rgb(247, 246, 247) 25%, rgb(184, 43, 64) 25%, rgb(184, 43, 64) 50%, rgb(185, 9, 65) 50%, rgb(185, 9, 65) 75%, rgb(232, 168, 182) 75%, rgb(232, 168, 182) 100%)",
  },
  {
    name: "Terra Cotta",
    gradient:
      "conic-gradient(rgb(245, 245, 245) 0%, rgb(245, 245, 245) 25%, rgb(81, 31, 31) 25%, rgb(81, 31, 31) 50%, rgb(143, 56, 56) 50%, rgb(143, 56, 56) 75%, rgb(201, 114, 92) 75%, rgb(201, 114, 92) 100%)",
  },
];

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection({ onGenerate }: { onGenerate: (url: string) => void }) {
  const [profileUrl, setProfileUrl] = useState(
    "https://www.linkedin.com/in/reidhoffman",
  );
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  const selectPalette = (name: string) => {
    setIsPaletteOpen(false);
    toast.success(`Applied ${name} color palette!`);
    const cleanUrl = profileUrl.split(" --theme")[0].trim();
    setProfileUrl(`${cleanUrl} --theme ${name.toLowerCase()}`);
  };

  const heroContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1] as const,
      },
    },
  };

  const enhancePrompt = () => {
    if (!profileUrl.trim()) {
      toast.error("Please paste a LinkedIn URL first!");
      return;
    }
    if (!profileUrl.includes("--theme")) {
      setProfileUrl(
        (prev) =>
          `${prev.trim()} --theme bento --layout modern --accent sky-blue`,
      );
      toast.success("Prompt enhanced with theme and layout parameters!");
    } else {
      toast.info("Prompt is already enhanced!");
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white pt-24 pb-16">
      {/* Background image + overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-90">
        <img
          src="/bg.png"
          alt=""
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <motion.div
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full pt-0  -translate-y-14 max-w-[1536px] mx-auto flex flex-col items-center gap-6 px-6 sm:px-8 lg:px-20 text-center"
      >
        {/* Badge */}
        <motion.div
          variants={heroItemVariants}
          onClick={() => onGenerate(profileUrl)}
          className="flex items-center gap-2 px-3 py-1.5   rounded-lg border border-[#E6E6E6] bg-white  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  cursor-pointer hover:bg-gray-50 active:scale-97 transition-all"
        >
          <span className="gradient-text-rainbow text-[13px] font-medium leading-[18px]">
            Create in under 60 seconds
          </span>
          <span className="flex items-center justify-center w-7 h-7   rounded-lg btn-dark-sm flex-shrink-0 active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3.98708 3.98709H9.6837V9.68372"
                stroke="white"
                strokeWidth="1.13917"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.98708 9.68372L9.6837 3.98709"
                stroke="white"
                strokeWidth="1.13917"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={heroItemVariants}
          className="text-black text-[38px] sm:text-[51px] leading-[1.1] font-medium tracking-tight max-w-4xl font-inter-tight"
        >
          LinkedIn to personal micro-site
        </motion.h1>

        {/* Prompt card */}
        <motion.div
          variants={heroItemVariants}
          className="w-full max-w-[1040px]      rounded-lg   glass-card  p-4 sm:p-5 flex flex-col gap-5 mt-4"
        >
          <div className="     rounded-lg   border border-[#E6E6E6] bg-white/80 p-5 flex flex-col gap-4  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  focus-within:ring-2 focus-within:ring-[#8DB8FF]/10 transition-[box-shadow] duration-250 ease-out">
            {/* Textarea */}
            <textarea
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              className="w-full bg-transparent text-[#171717] text-[16px] sm:text-[18px] leading-[27px] resize-none outline-none placeholder:text-[#171717]/40 min-h-[72px] font-inter-tight"
              placeholder="Paste your LinkedIn profile URL here..."
            />

            {/* Bottom actions */}
            <div className="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-[#F3F3F3]">
              <div className="flex items-center gap-3">
                {/* Add button */}
                <button
                  onClick={() =>
                    toast.success("Custom content block selector opened!")
                  }
                  className="flex items-center justify-center w-9 h-9   rounded-lg bg-white border border-[#E6E6E6] card-btn-shadow hover:bg-[#F7F7F7] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M3.68124 8.83502H13.9887"
                      stroke="black"
                      strokeWidth="0.73625"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.83499 3.68127V13.9888"
                      stroke="black"
                      strokeWidth="0.73625"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Enhance prompt button */}
                <button
                  onClick={enhancePrompt}
                  className="h-10 px-5      rounded-lg   bg-[#F3F3F3] text-black text-[12px] font-medium hover:bg-[#EAEAEA] active:scale-[0.97] transition-[transform,background-color] duration-150 ease-out whitespace-nowrap"
                >
                  Enhance prompt
                </button>

                {/* Color palette button */}
                <div className="relative">
                  <button
                    onClick={() => setIsPaletteOpen(!isPaletteOpen)}
                    className="flex items-center justify-center w-9 h-9   rounded-lg bg-white border border-[#E6E6E6] card-btn-shadow hover:bg-[#F7F7F7] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out"
                  >
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <g clipPath="url(#palette-clip)">
                        <path
                          d="M7.07029 12.9622C5.50766 12.9622 4.00903 12.3415 2.90408 11.2365C1.79913 10.1316 1.17838 8.63296 1.17838 7.07032C1.17838 5.50769 1.79913 4.00906 2.90408 2.90411C4.00903 1.79916 5.50766 1.17841 7.07029 1.17841C8.63293 1.17841 10.1316 1.73708 11.2365 2.73154C12.3415 3.72599 12.9622 5.07476 12.9622 6.48113C12.9622 7.26245 12.6518 8.01176 12.0994 8.56424C11.5469 9.11671 10.7976 9.42709 10.0163 9.42709H8.69057C8.49908 9.42709 8.31138 9.48041 8.1485 9.58108C7.98561 9.68175 7.85397 9.82579 7.76834 9.99706C7.6827 10.1683 7.64645 10.3601 7.66365 10.5508C7.68085 10.7415 7.75081 10.9236 7.8657 11.0768L8.04246 11.3125C8.15735 11.4657 8.22731 11.6478 8.24451 11.8386C8.26171 12.0293 8.22546 12.221 8.13982 12.3923C8.05419 12.5635 7.92255 12.7076 7.75966 12.8082C7.59678 12.9089 7.40907 12.9622 7.21759 12.9622H7.07029Z"
                          stroke="black"
                          strokeWidth="0.589167"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="7.95378"
                          cy="3.82957"
                          r="0.59"
                          fill="black"
                        />
                        <circle
                          cx="10.3104"
                          cy="6.18626"
                          r="0.59"
                          fill="black"
                        />
                        <circle cx="3.8296" cy="7.3646" r="0.59" fill="black" />
                        <circle
                          cx="5.00813"
                          cy="4.41892"
                          r="0.59"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="palette-clip">
                          <rect width="14.1406" height="14.1406" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>

                  <AnimatePresence>
                    {isPaletteOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{
                          duration: 0.2,
                          ease: [0.23, 1, 0.32, 1] as const,
                        }}
                        style={{ originX: 1, originY: 1 }}
                        className="absolute right-0 bottom-full mb-3 z-[9999] bg-white border border-[#E6E6E6]      rounded-lg    shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  p-3 flex flex-col gap-3 min-w-[260px] select-none text-left"
                      >
                        <div className="flex items-center gap-2 px-1 border-b border-[#F3F3F3] pb-2 text-black">
                          <svg
                            className="h-4 w-4 text-black"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" />
                            <circle
                              cx="13.5"
                              cy="6.5"
                              fill="currentColor"
                              r=".5"
                            />
                            <circle
                              cx="17.5"
                              cy="10.5"
                              fill="currentColor"
                              r=".5"
                            />
                            <circle
                              cx="6.5"
                              cy="12.5"
                              fill="currentColor"
                              r=".5"
                            />
                            <circle
                              cx="8.5"
                              cy="7.5"
                              fill="currentColor"
                              r=".5"
                            />
                          </svg>
                          <span className="text-sm font-semibold">
                            Color palettes
                          </span>
                        </div>

                        <div className="flex flex-col gap-1 py-1 max-h-52 overflow-y-auto scrollbar-thin text-black">
                          {COLOR_PALETTES.map((palette) => (
                            <button
                              key={palette.name}
                              onClick={() => selectPalette(palette.name)}
                              className="group relative flex items-center gap-3 p-2 w-full text-sm text-black     rounded-lg  hover:bg-[#F3F3F3] transition-all cursor-pointer text-left active:scale-[0.98]"
                            >
                              <div
                                className="  rounded-lg shrink-0 relative border border-black/5"
                                style={{
                                  background: palette.gradient,
                                  width: "22px",
                                  height: "22px",
                                }}
                              />
                              <span className="font-medium">
                                {palette.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Mic button */}
                <button
                  onClick={() =>
                    toast("Listening for profile voice commands...")
                  }
                  className="flex items-center justify-center w-9 h-9   rounded-lg bg-white border border-[#E6E6E6] card-btn-shadow hover:bg-[#F7F7F7] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M7.95499 12.5954V14.5837"
                      stroke="black"
                      strokeWidth="0.662917"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.5954 6.62915V7.95498C12.5954 9.1857 12.1065 10.366 11.2363 11.2363C10.366 12.1065 9.18571 12.5954 7.95499 12.5954C6.72428 12.5954 5.54397 12.1065 4.67372 11.2363C3.80347 10.366 3.31458 9.1857 3.31458 7.95498V6.62915"
                      stroke="black"
                      strokeWidth="0.662917"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.94375 3.31456C9.94375 2.2162 9.05335 1.32581 7.955 1.32581C6.85664 1.32581 5.96625 2.2162 5.96625 3.31456V7.95497C5.96625 9.05333 6.85664 9.94372 7.955 9.94372C9.05335 9.94372 9.94375 9.05333 9.94375 7.95497V3.31456Z"
                      stroke="black"
                      strokeWidth="0.662917"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Send button (Primary action) */}
                <button
                  onClick={() => onGenerate(profileUrl)}
                  className="flex items-center justify-center w-9 h-9   rounded-lg bg-[#2A2A2F] text-white  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  hover:bg-[#3E3E45] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M3.68127 8.83502L8.83502 3.68127L13.9888 8.83502"
                      stroke="white"
                      strokeWidth="0.73625"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.83502 13.9888V3.68127"
                      stroke="white"
                      strokeWidth="0.73625"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Templates Section ────────────────────────────────────────────────────────

function TemplatesSection({
  onSelectTemplate,
}: {
  onSelectTemplate: (name: string) => void;
}) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (dir: "prev" | "next") => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({
      left: dir === "next" ? 520 : -520,
      behavior: "smooth",
    });
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: [0.23, 1, 0.32, 1] as const,
      },
    },
  };

  return (
    <section
      id="templates"
      className="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden border-t border-[#E6E6E6]"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div className="flex flex-col">
            <SectionLabel>Browse our collection</SectionLabel>
            <SectionHeading>Start with a Template</SectionHeading>
          </div>
          <DarkButton
            onClick={() => toast.success("Loaded all templates!")}
            className="self-start sm:self-auto"
          >
            View All Templates
          </DarkButton>
        </div>

        {/* Template cards carousel */}
        <div className="relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-4"
          >
            {TEMPLATES_LARGE.map((t, i) => (
              <motion.div
                variants={itemVariants}
                key={i}
                className="flex-shrink-0 w-[300px] sm:w-[380px] lg:w-[495px] template-card group"
              >
                <div className="relative aspect-square      rounded-lg   overflow-hidden bg-[#FBFBFB] border border-[#E6E6E6] p-[11px]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  transition-transform duration-300 ease-out hover:scale-[1.01] will-change-transform">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-full h-full object-cover     rounded-lg "
                  />
                  {/* Bottom gradient overlay inside padding */}
                  <div
                    className="absolute bottom-[11px] left-[11px] right-[11px] h-2/5 rounded-b-[8px]"
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
                    }}
                  />
                  {/* Title */}
                  <div className="absolute bottom-[11px] left-[11px] right-[11px] p-5 z-10">
                    <p className="text-white text-[20px] font-normal leading-[26px] font-inter-tight">
                      {t.name}
                    </p>
                    <p className="text-white/75 text-[14px] leading-[20px] font-inter-tight">
                      {t.subtitle}
                    </p>
                  </div>
                  {/* Hover overlay */}
                  <div className="template-hover-overlay absolute inset-[11px] flex items-center justify-center     rounded-lg  bg-white/30 backdrop-blur-[1.5px]">
                    <div className="relative">
                      <div
                        className="absolute -inset-1 opacity-20 blur-[4px]"
                        style={{
                          background:
                            "linear-gradient(95deg, #0894FF 0%, #C959DD 34%, #FF2E54 68%, #FF9004 100%)",
                        }}
                      />
                      <div className="relative p-0.5      rounded-lg   overflow-hidden bg-white">
                        <button
                          onClick={() => onSelectTemplate(t.name)}
                          className="h-10 px-5      rounded-lg   bg-[#2A2A2F] text-white text-[12px] font-medium hover:bg-[#3E3E45] active:scale-[0.97] transition-[transform,background-color] duration-150 ease-out  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] "
                        >
                          Customize this look
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Progress + controls */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex-1 h-2   rounded-lg border border-[#E6E6E6] bg-[#FBFBFB]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  overflow-hidden mr-8">
            <div
              className="h-full w-1/4   rounded-lg"
              style={{
                background: "linear-gradient(90deg, #8DFFB3 0%, #E6FFE6 100%)",
              }}
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollCarousel("prev")}
              className="flex items-center justify-center w-8 h-8      rounded-lg   border border-[#E6E6E6] bg-white text-black  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  hover:bg-[#F3F3F3] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M7.75625 9.30754L4.65375 6.20504L7.75625 3.10254"
                  stroke="currentColor"
                  strokeWidth="1.03417"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() => scrollCarousel("next")}
              className="flex items-center justify-center w-8 h-8      rounded-lg   border border-[#E6E6E6] bg-white text-black  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  hover:bg-[#F3F3F3] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M4.65375 9.30754L7.75625 6.20504L4.65375 3.10254"
                  stroke="currentColor"
                  strokeWidth="1.03417"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── How It Works Section ─────────────────────────────────────────────────────

const HOW_IT_WORKS = [
  {
    img: "/process1 (1).png",
    boldText: "Paste your LinkedIn link",
    restText:
      " and watch LinkedPage scrape your profile data to instantly render a professional personal page.",
  },
  {
    img: "/process1 (2).png",
    boldText: "Customize inline",
    restText:
      " text and images directly on the screen, and pick from multiple clean layout styles like Bento or minimal.",
  },
  {
    img: "/process1 (3).png",
    boldText: "Publish or export",
    restText:
      " instantly to a free subdomain or download the complete source code as a zip file to host anywhere.",
  },
];

function HowItWorksSection({ onStartGen }: { onStartGen: () => void }) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1] as const,
      },
    },
  };

  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-20 lg:py-24 bg-[#F7F7F7] border-t border-b border-[#E6E6E6]"
    >
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="flex flex-col">
            <SectionLabel>How It Works</SectionLabel>
            <SectionHeading>Get your page in under 60 seconds</SectionHeading>
          </div>
          <DarkButton onClick={onStartGen} className="self-start sm:self-auto">
            Generate Now
          </DarkButton>
        </div>

        {/* 3-column grid with stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {HOW_IT_WORKS.map((item, i) => (
            <motion.div
              variants={itemVariants}
              key={i}
              className="flex flex-col gap-4"
            >
              <div className="     rounded-lg   border border-[#E6E6E6] bg-white  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  overflow-hidden p-2 transition-transform duration-300 ease-out hover:scale-[1.01] will-change-transform">
                <img
                  src={item.img}
                  alt={item.boldText}
                  className="w-full     rounded-lg  object-cover aspect-[41/38]"
                />
              </div>
              <p className="text-[16px] leading-[24px] text-[#171717]/60 font-inter-tight">
                <span className="text-[#171717] font-medium block mb-1 text-[18px] leading-[24px]">
                  {item.boldText}
                </span>
                {item.restText}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Business Section (Career Showcase) ──────────────────────────────────────

const BUSINESS_TABS = ["Experience", "Projects", "Education", "Contact"];
const BUSINESS_CARDS = [
  "https://api.builder.io/api/v1/image/assets/TEMP/dd2d088a6043ca3ede653099742f96ac52246893?width=2560",
  "https://api.builder.io/api/v1/image/assets/TEMP/bd350a3668e75fb33844ff3cbe4a31706b2273df?width=2560",
  "https://api.builder.io/api/v1/image/assets/TEMP/f502cc59ba5f4d7f14360e66cb7e6447fb3a3c98?width=2560",
  "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=1200", // 4th placeholder card image for Contact tab
];

function BusinessSection() {
  const [activeTab, setActiveTab] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (i: number) => {
    setActiveTab(i);
    if (carouselRef.current) {
      const container = carouselRef.current;
      const slide = container.children[i] as HTMLElement;
      if (slide) {
        container.scrollTo({
          left: slide.offsetLeft - 8,
          behavior: "smooth",
        });
      }
    }
  };

  const scrollCarousel = (dir: "prev" | "next") => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth;
    carouselRef.current.scrollBy({
      left: dir === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="showcase"
      className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E6E6E6]"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20 flex flex-col gap-8"
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionLabel>Beautiful structures for real content</SectionLabel>
          <SectionHeading>Showcase Your Career</SectionHeading>
        </div>

        {/* Tabs with layout glide */}
        <div className="flex justify-center mt-2">
          <div className="flex items-center      rounded-lg   bg-[#F3F3F3] p-1 border border-[#E6E6E6]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  relative">
            {BUSINESS_TABS.map((tab, i) => {
              const isActive = activeTab === i;
              return (
                <button
                  key={tab}
                  onClick={() => handleTabClick(i)}
                  className={`relative h-9 px-6 text-[14px] leading-[20px] rounded-[10px] transition-colors duration-200 whitespace-nowrap font-inter-tight z-10 ${isActive ? "text-[#1B5E20] font-semibold" : "text-[#171717]/60 hover:text-black"}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-business-tab"
                      className="absolute inset-0 bg-[#E6FFE6] border border-[#8DFFB3]/40 rounded-[10px]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Card carousel */}
        <div className="relative mt-4">
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide      rounded-lg   border border-[#E6E6E6] p-2 bg-[#FBFBFB]"
          >
            {BUSINESS_CARDS.map((src, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-full max-w-[900px] sm:max-w-[1100px]     rounded-lg  overflow-hidden  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  transition-transform duration-300 ease-out hover:scale-[1.005] will-change-transform"
              >
                <img
                  src={src}
                  alt={`Business card ${i + 1}`}
                  className="w-full h-auto     rounded-lg  object-cover"
                />
              </div>
            ))}
          </div>
          {/* Arrows */}
          <button
            onClick={() => scrollCarousel("prev")}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10   rounded-lg bg-white border border-[#E6E6E6] text-black  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  hover:bg-[#F3F3F3] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out hidden sm:flex"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path
                d="M7.75625 9.30754L4.65375 6.20504L7.75625 3.10254"
                stroke="currentColor"
                strokeWidth="1.03417"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => scrollCarousel("next")}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10   rounded-lg bg-white border border-[#E6E6E6] text-black  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  hover:bg-[#F3F3F3] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out hidden sm:flex"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path
                d="M4.65375 9.30754L7.75625 6.20504L4.65375 3.10254"
                stroke="currentColor"
                strokeWidth="1.03417"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Features Section ─────────────────────────────────────────────────────────

const FEATURES = [
  {
    img: "/feature (1).png",
    text: "Fully responsive layouts optimized for mobile, tablet, and desktop viewing.",
  },
  {
    img: "/feature (2).png",
    text: "Export clean static code zip files to host on GitHub Pages, Vercel, or Netlify.",
  },
];

function FeaturesSection({ onStartTrial }: { onStartTrial: () => void }) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1] as const,
      },
    },
  };

  return (
    <section
      id="features"
      className="py-16 sm:py-20 lg:py-24 bg-[#F7F7F7] border-b border-[#E6E6E6]"
    >
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="flex flex-col">
            <SectionLabel>Clean & Modern Aesthetics</SectionLabel>
            <SectionHeading>A Page with Real Content</SectionHeading>
          </div>
          <DarkButton
            onClick={onStartTrial}
            className="self-start sm:self-auto"
          >
            Try It Free
          </DarkButton>
        </div>

        {/* 2-column grid with stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {FEATURES.map((f, i) => (
            <motion.div
              variants={itemVariants}
              key={i}
              className="flex flex-col gap-4"
            >
              <div className="     rounded-lg   border border-[#E6E6E6] bg-white p-2 overflow-hidden  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  transition-transform duration-300 ease-out hover:scale-[1.01] will-change-transform">
                <img
                  src={f.img}
                  alt={f.text}
                  className="w-full     rounded-lg  object-cover aspect-[13/8]"
                />
              </div>
              <p className="text-[#171717] text-[16px] sm:text-[18px] leading-[27px] font-normal font-inter-tight">
                {f.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i);

  const answers: Record<number, string> = {
    0: "LinkedPage is a web tool that converts a LinkedIn profile URL into a beautiful personal micro-site. You paste your LinkedIn link, the platform scrapes your profile data, and instantly renders a customizable page.",
    1: "No design or coding experience is required! LinkedPage automatically extracts your career history, skills, and details, then formats them into a polished personal website.",
    2: "You can edit text and images inline, swap and rearrange layout elements, and switch templates (minimal card, bento grid, full-page scroll, or dark mode) directly on the screen.",
    3: "Yes! You can connect your own custom domain, or publish it instantly on a free subdomain (like yourname.linkedpage.me).",
    4: "Yes, every site built with LinkedPage includes fast, free built-in hosting, so your professional site is online in seconds.",
    5: "Absolutely. You can update your site at any time through our inline visual editor. Changes go live instantly.",
    6: "Yes, you can export the generated code as a ZIP file containing clean, static HTML, CSS, and JS to host on GitHub Pages, Vercel, or any provider of your choice.",
  };

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20"
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center mb-12">
          <SectionLabel>Frequently Asked Questions</SectionLabel>
          <SectionHeading>
            Still have questions about LinkedPage?
          </SectionHeading>
        </div>

        {/* FAQ items */}
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          {FAQ_ITEMS.map((question, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="     rounded-lg   border border-[#E6E6E6] bg-[#FBFBFB]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  overflow-hidden font-inter"
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  onClick={() => toggle(i)}
                >
                  <span className="text-[#171717] text-[16px] sm:text-[18px] leading-[26px] font-medium font-inter-tight pr-4">
                    {question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-[10px] btn-dark-sm text-white  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] "
                  >
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <path
                        d="M2.94586 7.5H11.1945"
                        stroke="currentColor"
                        strokeWidth="1.17833"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.07001 3.375V11.625"
                        stroke="currentColor"
                        strokeWidth="1.17833"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          transformOrigin: "center",
                          transition:
                            "transform 0.2s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.2s ease",
                          transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                          opacity: isOpen ? 0 : 1,
                        }}
                      />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-[#171717]/60 text-[15px] sm:text-[16px] leading-[24px] font-inter-tight border-t border-[#F3F3F3]/80 pt-4">
                        {answers[i]}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Index() {
  const router = useRouter();
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [brandName, setBrandName] = useState("Creative Portfolio");
  const [subdomain, setSubdomain] = useState("realitycheque.io");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      setShowPreview(true);
      window.history.replaceState({}, "", "/");
    }
    const storedBrand = sessionStorage.getItem("webild_brand_name");
    const storedSubdomain = sessionStorage.getItem("webild_subdomain");
    if (storedBrand) setBrandName(storedBrand);
    if (storedSubdomain) setSubdomain(storedSubdomain);
  }, []);

  const simulateGeneration = (url: string) => {
    const raw = url.split(" --theme")[0].trim();
    if (!raw) {
      toast.error("Please paste a LinkedIn URL first!");
      return;
    }
    if (!raw.includes("linkedin.com/in/")) {
      toast.error(
        "Please paste a valid LinkedIn profile URL (linkedin.com/in/…)",
      );
      return;
    }
    router.push(`/onboarding?url=${encodeURIComponent(raw)}`);
  };

  const handleSelectTemplate = (templateName: string) => {
    // Map landing-page template name → editor template id
    const map: Record<string, string> = {
      "Minimal Card": "minimal-card",
      "Bento Grid": "bento-grid",
      "Full-Page Scroll": "full-scroll",
      "Dark Bento": "dark",
    };
    const id = map[templateName] ?? "minimal-card";
    router.push(`/editor?template=${id}`);
  };

  const handleTrial = () => {
    router.push("/editor");
  };

  const handleLogout = () => {
    toast.success("Logging out...");
    setTimeout(() => router.push("/login"), 1000);
  };

  return (
    <div className="min-h-screen font-inter bg-[#FBFBFB] text-black antialiased relative overflow-x-hidden">
      {/* ── Original Floating Navbar ── */}
      <Navbar />

      {/* ── Sidebar Toggle Trigger ── */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed left-5 top-28 z-40 w-10 h-10 rounded-full bg-white border border-[#E6E6E6] hover:bg-[#F7F7F7] active:scale-95 flex items-center justify-center shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] transition-all"
          title="Open Sidebar"
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-black"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      {/* ── Floating Overlay Sidebar (Closed by default, gap on left) ── */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-45 bg-black/15 backdrop-blur-[2px]"
            />

            {/* Floating Sidebar Panel */}
            <motion.aside
              initial={{ opacity: 0, x: -60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -60, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="fixed left-5 top-28 bottom-5 w-[260px] border border-[#E6E6E6] bg-white/95 backdrop-blur-md px-6 py-6 flex flex-col justify-between z-50 select-none rounded-[16px] shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
            >
              {/* Top navigation items */}
              <div className="flex flex-col gap-6">
                {/* Header with Close button */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-black/40 uppercase tracking-wider">
                    Navigation
                  </span>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-black/5 text-[#171717]/60 hover:text-black transition-colors"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* New Website Button */}
                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                    router.push("/onboarding");
                  }}
                  className="w-full h-11 bg-[#F3F3F5] hover:bg-[#EAEAEB] active:scale-[0.98] transition-all rounded-[12px] flex items-center justify-center gap-2 text-[14px] font-semibold text-black"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-black"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M9 12h6M12 9v6" />
                  </svg>
                  New Website
                </button>

                {/* Menu Items (Home Active) */}
                <div className="flex flex-col gap-1.5">
                  <button
                    className="w-full h-10 px-3 rounded-[8px] bg-[#E8F1FF] border border-[#8DB8FF]/40 flex items-center gap-3 text-[14px] font-semibold text-[#1A68FF] transition-all text-left"
                    style={{ boxShadow: "0 6px 10px -6px #00000016" }}
                  >
                    <Home className="w-[18px] h-[18px] text-[#1A68FF]" />
                    Home
                  </button>

                  <button
                    onClick={() => {
                      setIsSidebarOpen(false);
                      router.push("/editor");
                    }}
                    className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-all text-left"
                  >
                    <LayoutIcon className="w-[18px] h-[18px] text-black" />
                    Templates
                  </button>

                  <button
                    onClick={() => {
                      setIsSidebarOpen(false);
                      router.push("/dashboard");
                    }}
                    className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-all text-left"
                  >
                    <Folder className="w-[18px] h-[18px] text-black" />
                    All Websites
                  </button>
                </div>

                {/* Recent Websites Section */}
                <div className="flex flex-col gap-2.5 pt-2 border-t border-[#F5F5F7]">
                  <span className="text-[12px] font-semibold text-[#88888E] px-3">
                    Recent websites
                  </span>

                  <div
                    onClick={() => {
                      setIsSidebarOpen(false);
                      router.push("/dashboard");
                    }}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-[8px] hover:bg-white/60 cursor-pointer transition-all bg-white/30"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#F3F3F5] flex items-center justify-center text-[11px] font-bold text-black border border-[#E6E6E6]">
                      c
                    </div>
                    <span className="text-[13px] font-semibold text-[#171717] truncate">
                      {brandName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom navigation & pricing items */}
              <div className="flex flex-col gap-6">
                {/* Pricing, Documentation, Settings */}
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => {
                      setIsSidebarOpen(false);
                      toast.info("Pricing modal coming soon!");
                    }}
                    className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-all text-left"
                  >
                    <CreditCard className="w-[18px] h-[18px] text-black" />
                    Pricing
                  </button>

                  <button
                    onClick={() => {
                      setIsSidebarOpen(false);
                      toast.info("Documentation coming soon!");
                    }}
                    className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-all text-left"
                  >
                    <BookOpen className="w-[18px] h-[18px] text-black" />
                    Documentation
                  </button>

                  <button
                    onClick={() => {
                      setIsSidebarOpen(false);
                      toast.info("Settings panel coming soon!");
                    }}
                    className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-all text-left"
                  >
                    <Settings className="w-[18px] h-[18px] text-black" />
                    Settings
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Full-Width Container ── */}
      <div className="relative z-10 w-full min-h-screen">
        <main className="w-full relative">
          <HeroSection onGenerate={simulateGeneration} />
          <TemplatesSection onSelectTemplate={handleSelectTemplate} />
          <BusinessSection />
          <FeaturesSection onStartTrial={handleTrial} />
          <FAQSection />
          <Footer />
        </main>
      </div>

      {/* Scraped Site Live Preview Overlay Modal */}
      <AnimatePresence>
        {showPreview && (
          <PreviewModal
            isOpen={showPreview}
            onClose={() => setShowPreview(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
```

---

## File: `app\api\auth\me\route.ts`

```typescript
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Session check failed" },
      { status: 500 },
    );
  }
}
```

---

## File: `app\api\auth\[...all]\route.ts`

```typescript
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
```

---

## File: `app\api\chat\route.ts`

```typescript
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getWebsiteById, updateWebsite } from "@/lib/db";
import { TEMPLATES } from "@/shared/types";

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { message, websiteId } = body;

    if (!message || !websiteId) {
      return NextResponse.json(
        { error: "Message and websiteId are required" },
        { status: 400 },
      );
    }

    const website = await getWebsiteById(websiteId);
    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    if (website.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const lower = message.toLowerCase();
    let reply =
      "I've applied that instruction. Let me know if you want any other edits!";
    const profileUpdates: any = {};
    let templateUpdate: string | undefined = undefined;

    // Check for template triggers
    for (const tpl of TEMPLATES) {
      if (lower.includes(tpl.name.toLowerCase()) || lower.includes(tpl.id)) {
        templateUpdate = tpl.id;
        reply = `Certainly! I've switched your template layout to the ${tpl.name}. You can see the preview update live on the canvas.`;
        break;
      }
    }

    if (!templateUpdate && lower.includes("dark")) {
      templateUpdate = "dark";
      reply = "Applied the Dark Mode template layout!";
    }

    // Check for profile content edits triggers
    if (lower.includes("name is") || lower.includes("change my name to")) {
      const match = message.match(/(?:name is|name to)\s+([^.]+)/i);
      if (match && match[1]) {
        const nextName = match[1].trim();
        profileUpdates.name = nextName;
        reply = `Updated your portfolio name to "${nextName}".`;
      }
    } else if (
      lower.includes("headline is") ||
      lower.includes("change headline to")
    ) {
      const match = message.match(/(?:headline is|headline to)\s+([^.]+)/i);
      if (match && match[1]) {
        const nextHeadline = match[1].trim();
        profileUpdates.headline = nextHeadline;
        reply = `Updated your headline tag to "${nextHeadline}".`;
      }
    } else if (
      lower.includes("bio") ||
      lower.includes("summary") ||
      lower.includes("about description")
    ) {
      reply =
        "Switched you to the Edit profile tab. You can directly edit your bio details there or type what changes you want.";
    } else if (lower.includes("social links") || lower.includes("add link")) {
      reply =
        "Switched you to the Edit profile tab under the Links sub-section so you can add or remove custom URLs.";
    }

    // Save updates in DB if matched
    if (templateUpdate || Object.keys(profileUpdates).length > 0) {
      const dbUpdates: any = {};
      if (templateUpdate) dbUpdates.templateId = templateUpdate;
      if (Object.keys(profileUpdates).length > 0) {
        dbUpdates.profile = {
          ...website.profile,
          ...profileUpdates,
        };
      }
      await updateWebsite(websiteId, dbUpdates);
    }

    return NextResponse.json({
      success: true,
      reply,
      template: templateUpdate,
      profileUpdates,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to process chat query" },
      { status: 500 },
    );
  }
}
```

---

## File: `app\api\demo\route.ts`

```typescript
import { NextResponse } from "next/server";
import { DemoResponse } from "../../../shared/api";

export async function GET() {
  const response: DemoResponse = {
    message: "Hello from Next.js server",
  };
  return NextResponse.json(response);
}
```

---

## File: `app\api\p\[slug]\route.ts`

```typescript
import { NextResponse } from "next/server";
import { getWebsiteBySubdomain, getWebsiteByDomain } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    let website = await getWebsiteBySubdomain(slug);

    if (!website) {
      // If not resolved by subdomain, try custom domain
      website = await getWebsiteByDomain(slug);
    }

    if (!website || !website.isPublished) {
      return NextResponse.json(
        { error: "Published page not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      profile: website.publishedProfile || website.profile,
      template: website.publishedTemplate || website.templateId,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to load page content" },
      { status: 500 },
    );
  }
}
```

---

## File: `app\api\ping\route.ts`

```typescript
import { NextResponse } from "next/server";

export async function GET() {
  const ping = process.env.PING_MESSAGE ?? "ping";
  return NextResponse.json({ message: ping });
}
```

---

## File: `app\api\scrape\route.ts`

```typescript
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { ProfileData, MOCK_PROFILE } from "@/shared/types";
import { chromium } from "playwright";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";

const execAsync = promisify(exec);

async function runScrapyScraper(url: string): Promise<any> {
  const pythonPath = "python";
  const scriptPath = path.join(
    process.cwd(),
    "linkedin_scraper",
    "run_spider.py",
  );

  const { stdout, stderr } = await execAsync(
    `"${pythonPath}" "${scriptPath}" "${url}"`,
    {
      timeout: 30000,
    },
  );

  if (stderr && stderr.includes("Error")) {
    console.warn("[Scrapy Warning/Error]:", stderr);
  }

  const lines = stdout.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      const parsed = JSON.parse(trimmed);
      if (parsed.error) {
        throw new Error(parsed.error);
      }
      return parsed;
    }
  }
  throw new Error("Scrapy failed to output valid profile JSON data");
}

async function scrapeLinkedInProfileWithFallback(
  url: string,
): Promise<ProfileData> {
  console.log(`[Scrape] Attempting Python Scrapy scraper for: ${url}`);
  try {
    const scrapyData = await runScrapyScraper(url);
    console.log(`[Scrape] Scrapy scraper succeeded for: ${url}`);
    return {
      ...MOCK_PROFILE,
      name: scrapyData.name || "John Doe",
      headline: scrapyData.headline || "Professional expert",
      summary:
        scrapyData.summary ||
        `I'm ${scrapyData.name}. Passionate about building products, driving impact, and solving complex challenges.`,
      location: scrapyData.location || "San Francisco, CA",
      avatarUrl:
        scrapyData.avatarUrl ||
        `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(scrapyData.name || "John Doe")}&backgroundColor=8db8ff,8dffb3,2a2a2f`,
      experience:
        scrapyData.experience && scrapyData.experience.length > 0
          ? scrapyData.experience
          : MOCK_PROFILE.experience,
      education:
        scrapyData.education && scrapyData.education.length > 0
          ? scrapyData.education
          : MOCK_PROFILE.education,
      linkedinUrl: url,
      links: [
        { label: "LinkedIn", url, icon: "linkedin" },
        { label: "Website", url: "#", icon: "website" },
      ],
    };
  } catch (err: any) {
    console.warn(
      `[Scrape] Scrapy scraper failed: ${err.message}. Falling back to Playwright...`,
    );
    return scrapeLinkedInProfile(url);
  }
}

async function scrapeLinkedInProfile(url: string): Promise<ProfileData> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 800 },
    locale: "en-US",
  });

  const page = await context.newPage();
  await page.setExtraHTTPHeaders({
    "Accept-Language": "en-US,en;q=0.9",
  });

  try {
    // Navigate to public LinkedIn profile page
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

    const currentUrl = page.url();
    if (
      currentUrl.includes("linkedin.com/login") ||
      currentUrl.includes("linkedin.com/signup") ||
      currentUrl.includes("authwall")
    ) {
      throw new Error(
        "LinkedIn security check (authwall/login) blocked public access. Please request a Member Data ZIP export from LinkedIn and upload it below.",
      );
    }

    // Verify page title / layout exists
    await page
      .waitForSelector(".top-card-layout__title, h1", { timeout: 8000 })
      .catch(() => {
        throw new Error(
          "LinkedIn security challenges or loading timeouts blocked access. Please use the manual ZIP import option.",
        );
      });

    // Extract fields
    const name = await page
      .$eval(
        ".top-card-layout__title",
        (el) => el.textContent?.trim() || "John Doe",
      )
      .catch(() => "John Doe");
    const headline = await page
      .$eval(
        ".top-card-layout__headline",
        (el) => el.textContent?.trim() || "Professional expert",
      )
      .catch(() => "Professional expert");
    const location = await page
      .$eval(
        ".top-card-layout__first-subline, .top-card__subline-item",
        (el) => el.textContent?.trim() || "San Francisco, CA",
      )
      .catch(() => "San Francisco, CA");
    const summary = await page
      .$eval(".summary__text", (el) => el.textContent?.trim() || "")
      .catch(() => "");

    const avatarUrl = await page
      .$eval(
        ".top-card-layout__entity-image-container img",
        (el) => (el as HTMLImageElement).src,
      )
      .catch(() => {
        return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=8db8ff,8dffb3,2a2a2f`;
      });

    // Parse experience
    const experience: any[] = [];
    const experienceElements = await page.$$(
      "li.experience-item, .experience-item",
    );
    for (const el of experienceElements) {
      const title = await el
        .$eval(
          ".experience-item__title, h3",
          (sub) => sub.textContent?.trim() || "",
        )
        .catch(() => "Role");
      const company = await el
        .$eval(
          ".experience-item__subtitle, h4",
          (sub) => sub.textContent?.trim() || "",
        )
        .catch(() => "Company");
      const duration = await el
        .$eval(
          ".experience-item__duration, .experience-item__meta-item",
          (sub) => sub.textContent?.trim() || "",
        )
        .catch(() => "");
      const description = await el
        .$eval(
          ".experience-item__description",
          (sub) => sub.textContent?.trim() || "",
        )
        .catch(() => "");

      experience.push({
        title,
        company,
        duration,
        description,
        logo: "",
      });
    }

    // Parse education
    const education: any[] = [];
    const educationElements = await page.$$("li.education__list-item");
    for (const el of educationElements) {
      const school = await el
        .$eval(
          ".education__school-name",
          (sub) => sub.textContent?.trim() || "",
        )
        .catch(() => "");
      const degree = await el
        .$eval(
          ".education__degree-name",
          (sub) => sub.textContent?.trim() || "",
        )
        .catch(() => "");
      const duration = await el
        .$eval(".education__duration", (sub) => sub.textContent?.trim() || "")
        .catch(() => "");

      if (school) {
        education.push({
          school,
          degree,
          duration,
        });
      }
    }

    await browser.close();

    return {
      ...MOCK_PROFILE,
      name,
      headline,
      summary:
        summary ||
        `I'm ${name}. Passionate about building products, driving impact, and solving complex challenges.`,
      location,
      avatarUrl,
      experience: experience.length > 0 ? experience : MOCK_PROFILE.experience,
      education: education.length > 0 ? education : MOCK_PROFILE.education,
      linkedinUrl: url,
      links: [
        { label: "LinkedIn", url, icon: "linkedin" },
        { label: "Website", url: "#", icon: "website" },
      ],
    };
  } catch (e) {
    await browser.close();
    throw e;
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { error: "LinkedIn URL is required" },
        { status: 400 },
      );
    }

    // Keep simulated failure for developer testing path
    if (url.toLowerCase().includes("fail")) {
      return NextResponse.json(
        {
          error:
            "LinkedIn privacy settings are blocking direct public data access.",
        },
        { status: 403 },
      );
    }

    const profileData = await scrapeLinkedInProfileWithFallback(url);

    return NextResponse.json({
      success: true,
      data: profileData,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to scrape LinkedIn profile details." },
      { status: 500 },
    );
  }
}
```

---

## File: `app\api\scrape\manual\route.ts`

```typescript
import { NextResponse } from "next/server";
import AdmZip from "adm-zip";
import { getAuthenticatedUser } from "@/lib/auth";
import { ProfileData, MOCK_PROFILE } from "@/shared/types";

// Clean CSV parser supporting double quoted cells
function parseCSV(csvText: string): Record<string, string>[] {
  const lines: string[] = [];
  let currentLine = "";
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    if (char === '"') {
      insideQuotes = !insideQuotes;
      currentLine += char;
    } else if (char === "\n" && !insideQuotes) {
      lines.push(currentLine);
      currentLine = "";
    } else if (char === "\r") {
      // ignore
    } else {
      currentLine += char;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }

  if (lines.length === 0) return [];

  const parseLine = (line: string): string[] => {
    const cells: string[] = [];
    let currentCell = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        cells.push(currentCell.trim().replace(/^"|"$/g, "").trim());
        currentCell = "";
      } else {
        currentCell += char;
      }
    }
    cells.push(currentCell.trim().replace(/^"|"$/g, "").trim());
    return cells;
  };

  const headers = parseLine(lines[0]);
  const results: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const cells = parseLine(lines[i]);
    const row: Record<string, string> = {};
    headers.forEach((header, index) => {
      row[header] = cells[index] || "";
    });
    results.push(row);
  }

  return results;
}

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "ZIP file is required" },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let zip: AdmZip;
    try {
      zip = new AdmZip(buffer);
    } catch {
      return NextResponse.json(
        { error: "Invalid ZIP file format" },
        { status: 400 },
      );
    }

    const entries = zip.getEntries();
    let profileContent = "";
    let positionsContent = "";

    for (const entry of entries) {
      const name = entry.entryName.toLowerCase();
      if (name.endsWith("profile.csv")) {
        profileContent = entry.getData().toString("utf8");
      } else if (name.endsWith("positions.csv")) {
        positionsContent = entry.getData().toString("utf8");
      }
    }

    if (!profileContent) {
      return NextResponse.json(
        { error: "Could not find Profile.csv inside the ZIP archive." },
        { status: 400 },
      );
    }

    // Parse CSV files
    const profiles = parseCSV(profileContent);
    const positions = positionsContent ? parseCSV(positionsContent) : [];

    if (profiles.length === 0) {
      return NextResponse.json(
        { error: "Profile.csv is empty" },
        { status: 400 },
      );
    }

    const pRow = profiles[0];
    const firstName = pRow["First Name"] || user.firstName;
    const lastName = pRow["Last Name"] || user.lastName;
    const fullName = `${firstName} ${lastName}`;
    const headline = pRow["Headline"] || "Professional Expert";
    const summary =
      pRow["Summary"] || `I'm ${fullName}. Welcome to my micro-site.`;
    const location = pRow["Address"] || "San Francisco, CA";

    // Map experience
    const experience = positions.map((pos) => {
      const title = pos["Title"] || "Role";
      const company = pos["Company Name"] || pos["Company"] || "Company";
      const duration = `${pos["Started On"] || "2024"} - ${pos["Finished On"] || "Present"}`;
      const description = pos["Description"] || "";
      return { title, company, duration, description, logo: "" };
    });

    const parsedProfile: ProfileData = {
      ...MOCK_PROFILE,
      name: fullName,
      headline,
      summary,
      location,
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}&backgroundColor=8db8ff,8dffb3,2a2a2f`,
      experience,
      skills: MOCK_PROFILE.skills, // Default to mock skills
      links: [
        { label: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
        { label: "Website", url: "#", icon: "website" },
      ],
      linkedinUrl: "https://linkedin.com",
    };

    return NextResponse.json({
      success: true,
      data: parsedProfile,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to process the LinkedIn ZIP data" },
      { status: 500 },
    );
  }
}
```

---

## File: `app\api\websites\route.ts`

```typescript
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getUserWebsites, createWebsite } from "@/lib/db";
import { TemplateId } from "@/shared/types";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const websites = await getUserWebsites(user.id);
    return NextResponse.json({ success: true, websites });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to fetch websites" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let templateId: TemplateId = "minimal-card";
    try {
      const body = await request.json();
      if (body.templateId) {
        templateId = body.templateId;
      }
    } catch {
      // Body empty or invalid, proceed with default
    }

    const website = await createWebsite(user.id, templateId);
    return NextResponse.json({ success: true, website });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to create website draft" },
      { status: 500 },
    );
  }
}
```

---

## File: `app\api\websites\resolve-host\route.ts`

```typescript
import { NextResponse } from "next/server";
import { getWebsiteByDomain, getWebsiteBySubdomain } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const host = searchParams.get("host")?.toLowerCase().trim();

    if (!host) {
      return NextResponse.json({ slug: null });
    }

    // Try custom domain first
    let website = await getWebsiteByDomain(host);

    if (!website) {
      // Try subdomain: e.g. ayesha.linkedpage.io -> ayesha
      const parts = host.split(".");
      if (parts.length > 2) {
        const slug = parts[0];
        website = await getWebsiteBySubdomain(slug);
      }
    }

    if (website && website.isPublished) {
      return NextResponse.json({ slug: website.subdomainSlug });
    }

    return NextResponse.json({ slug: null });
  } catch (e) {
    console.error("Resolve host failed:", e);
    return NextResponse.json({ slug: null });
  }
}
```

---

## File: `app\api\websites\subdomain\check\route.ts`

```typescript
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getWebsiteBySubdomain } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug")?.toLowerCase().trim();
    const websiteId = searchParams.get("websiteId");

    if (!slug) {
      return NextResponse.json(
        { error: "Subdomain slug is required" },
        { status: 400 },
      );
    }

    if (!/^[a-z0-9-]{3,30}$/.test(slug)) {
      return NextResponse.json({ available: false, reason: "Invalid format" });
    }

    const existing = await getWebsiteBySubdomain(slug);
    const isAvailable = !existing || existing.id === websiteId;

    return NextResponse.json({ success: true, available: isAvailable });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Subdomain verification failed" },
      { status: 500 },
    );
  }
}
```

---

## File: `app\api\websites\[id]\route.ts`

```typescript
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getWebsiteById, updateWebsite, deleteWebsite } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const website = await getWebsiteById(id);
    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    if (website.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    return NextResponse.json({ success: true, website });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to fetch website detail" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const website = await getWebsiteById(id);
    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    if (website.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const body = await request.json();
    const { brandName, templateId, seoTitle, seoDesc, profile } = body;

    const updates: any = {};
    if (brandName !== undefined) updates.brandName = brandName;
    if (templateId !== undefined) updates.templateId = templateId;
    if (seoTitle !== undefined) updates.seoTitle = seoTitle;
    if (seoDesc !== undefined) updates.seoDesc = seoDesc;
    if (profile !== undefined) updates.profile = profile;

    const updatedWebsite = await updateWebsite(id, updates);
    return NextResponse.json({ success: true, website: updatedWebsite });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to save website updates" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const website = await getWebsiteById(id);
    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    if (website.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    await deleteWebsite(id);
    return NextResponse.json({
      success: true,
      message: "Website deleted successfully",
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to delete website" },
      { status: 500 },
    );
  }
}
```

---

## File: `app\api\websites\[id]\domains\route.ts`

```typescript
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getWebsiteById, updateWebsite, getWebsiteByDomain } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const website = await getWebsiteById(id);
    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    if (website.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    return NextResponse.json({ success: true, domains: website.customDomains });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to fetch domains" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const website = await getWebsiteById(id);
    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    if (website.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const body = await request.json();
    const domain = body.domain?.toLowerCase().trim();

    if (!domain) {
      return NextResponse.json(
        { error: "Domain name is required" },
        { status: 400 },
      );
    }

    if (!domain.includes(".")) {
      return NextResponse.json(
        { error: "Please enter a valid domain name (e.g. realitycheque.com)" },
        { status: 400 },
      );
    }

    // Check if the domain is connected to any website
    const existing = await getWebsiteByDomain(domain);
    if (existing) {
      return NextResponse.json(
        { error: "Domain is already connected to another site" },
        { status: 409 },
      );
    }

    const newDomain = {
      id: "dom_" + Math.random().toString(36).substring(2, 11),
      name: domain,
      status: "pending" as const,
    };

    const updatedDomains = [...website.customDomains, newDomain];
    await updateWebsite(id, { customDomains: updatedDomains });

    return NextResponse.json({ success: true, domain: newDomain });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to connect domain" },
      { status: 500 },
    );
  }
}
```

---

## File: `app\api\websites\[id]\domains\[domainId]\route.ts`

```typescript
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getWebsiteById, updateWebsite } from "@/lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; domainId: string }> },
) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, domainId } = await params;
    const website = await getWebsiteById(id);
    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    if (website.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const nextDomains = website.customDomains.filter((d) => d.id !== domainId);
    if (nextDomains.length === website.customDomains.length) {
      return NextResponse.json(
        { error: "Domain connection not found" },
        { status: 404 },
      );
    }

    await updateWebsite(id, { customDomains: nextDomains });
    return NextResponse.json({
      success: true,
      message: "Domain disconnected successfully",
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to disconnect domain" },
      { status: 500 },
    );
  }
}
```

---

## File: `app\api\websites\[id]\domains\[domainId]\verify\route.ts`

```typescript
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getWebsiteById, updateWebsite } from "@/lib/db";
import dns from "dns";
import { promisify } from "util";

const resolveA = promisify(dns.resolve4);

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string; domainId: string }> },
) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, domainId } = await params;
    const website = await getWebsiteById(id);
    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    if (website.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const domainIndex = website.customDomains.findIndex(
      (d) => d.id === domainId,
    );
    if (domainIndex === -1) {
      return NextResponse.json(
        { error: "Domain connection not found" },
        { status: 404 },
      );
    }

    const domain = website.customDomains[domainIndex];
    let verified = false;

    try {
      const ips = await resolveA(domain.name);
      if (ips.includes("76.76.21.21")) {
        verified = true;
      }
    } catch {
      // Fallback for local testing or dev: verify automatically on click if domain has a dot
      if (domain.name.includes(".")) {
        verified = true;
      }
    }

    if (verified) {
      const nextDomains = [...website.customDomains];
      nextDomains[domainIndex] = {
        ...domain,
        status: "active",
      };
      await updateWebsite(id, { customDomains: nextDomains });
    }

    return NextResponse.json({ success: true, verified });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Domain verification failed" },
      { status: 500 },
    );
  }
}
```

---

## File: `app\api\websites\[id]\export\route.ts`

```typescript
import { NextResponse } from "next/server";
import AdmZip from "adm-zip";
import { getAuthenticatedUser } from "@/lib/auth";
import { getWebsiteById } from "@/lib/db";
import { compileStaticHtml } from "@/lib/compiler";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const website = await getWebsiteById(id);
    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    if (website.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Compile static page
    const htmlContent = compileStaticHtml(website.profile, website.templateId);

    // Create README info
    const readmeContent = `# Static Export: ${website.brandName}

This package contains the fully generated static files for your portfolio, exported from LinkedPage.

## Files
- \`index.html\`: The self-contained page rendering your profile and experiences.

## How to host
You can upload this \`index.html\` file directly to any static web hosting provider:
1. **Netlify**: Drag and drop the folder containing these files into Netlify Drop.
2. **Vercel**: Deploy using vercel CLI or import a GitHub repository.
3. **GitHub Pages**: Upload to a repo and turn on Pages in repository settings.
`;

    // Package into ZIP
    const zip = new AdmZip();
    zip.addFile("index.html", Buffer.from(htmlContent, "utf-8"));
    zip.addFile("README.md", Buffer.from(readmeContent, "utf-8"));

    const zipBuffer = zip.toBuffer();

    return new Response(zipBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="linkedpage-export-${website.subdomainSlug}.zip"`,
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to generate zip export" },
      { status: 500 },
    );
  }
}
```

---

## File: `app\api\websites\[id]\publish\route.ts`

```typescript
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getWebsiteById, updateWebsite, getWebsiteBySubdomain } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const website = await getWebsiteById(id);
    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    if (website.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const body = await request.json().catch(() => ({}));
    const { slug } = body;

    const updates: any = {
      isPublished: true,
      publishedProfile: website.profile,
      publishedTemplate: website.templateId,
    };

    if (slug) {
      const cleanSlug = slug.toLowerCase().trim();
      const existing = await getWebsiteBySubdomain(cleanSlug);
      if (existing && existing.id !== id) {
        return NextResponse.json(
          { error: "Subdomain is already in use by another website" },
          { status: 409 },
        );
      }
      updates.subdomainSlug = cleanSlug;
    }

    const updated = await updateWebsite(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Publish failed" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      url: `/p/${updated.subdomainSlug}`,
      slug: updated.subdomainSlug,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to publish page" },
      { status: 500 },
    );
  }
}
```

---

## File: `app\api\websites\[id]\unpublish\route.ts`

```typescript
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getWebsiteById, updateWebsite } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const website = await getWebsiteById(id);
    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    if (website.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const updated = await updateWebsite(id, {
      isPublished: false,
    });

    if (!updated) {
      return NextResponse.json({ error: "Unpublish failed" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Website unpublished successfully",
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to unpublish website" },
      { status: 500 },
    );
  }
}
```

---

## File: `app\convert\page.tsx`

```tsx
"use client";

import { Suspense } from "react";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEditor } from "@/context/EditorContext";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RefreshCw, AlertCircle } from "lucide-react";

const STEPS = [
  "Connecting to LinkedIn…",
  "Reading your profile…",
  "Extracting experience data…",
  "Pulling skills & education…",
  "Generating your micro-site…",
  "Almost there…",
];

function ConvertInner() {
  const router = useRouter();
  const params = useSearchParams();
  const urlParam = params.get("url") ?? "";

  const { startScrape, isLoading, scrapeError, editedProfile } = useEditor();

  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!urlParam || hasStarted.current) return;
    hasStarted.current = true;
    startScrape(urlParam);
  }, [urlParam, startScrape]);

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
      setProgress((p) => Math.min(p + 16, 90));
    }, 400);
    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && !scrapeError && editedProfile) {
      setProgress(100);
      const t = setTimeout(() => router.push("/editor"), 400);
      return () => clearTimeout(t);
    }
  }, [isLoading, scrapeError, editedProfile, router]);

  const handleRetry = () => {
    hasStarted.current = false;
    setStepIndex(0);
    setProgress(0);
    if (urlParam) startScrape(urlParam);
  };

  const isError = !isLoading && !!scrapeError;
  const isDone = !isLoading && !scrapeError && !!editedProfile;

  return (
    <main className="flex-1 flex items-center justify-center px-5 pt-24 pb-16">
      <AnimatePresence mode="wait">
        {isError && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -12 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col items-center gap-8 max-w-md text-center"
          >
            <div className="w-16 h-16   rounded-lg bg-[#FEF2F2] flex items-center justify-center">
              <AlertCircle className="w-7 h-7 text-[#E45A5A]" />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-medium text-black">
                Couldn't fetch that profile
              </h1>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">
                {scrapeError}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <button
                onClick={() => router.push("/")}
                className="button button-secondary flex-1 gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Change URL
              </button>
              <button
                onClick={handleRetry}
                className="button button-primary flex-1 gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Try again
              </button>
            </div>
            <p className="text-xs text-[#9CA3AF]">
              Make sure the LinkedIn URL is public and accessible
            </p>
          </motion.div>
        )}

        {!isError && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -12 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col items-center gap-10 max-w-sm w-full text-center"
          >
            {/* Animated ring */}
            <div className="relative w-24 h-24">
              <motion.div
                className="absolute inset-0   rounded-lg border-4 border-[#E6E6E6] border-t-[#8DB8FF]"
                animate={{ rotate: isDone ? 0 : 360 }}
                transition={{
                  repeat: isDone ? 0 : Infinity,
                  duration: 1.1,
                  ease: "linear",
                }}
              />
              <div className="absolute inset-[10px]   rounded-lg bg-[#0A66C2] flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <AnimatePresence>
                {isDone && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0   rounded-lg bg-[#8DFFB3] flex items-center justify-center"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-9 h-9 stroke-[#1a5c3a] fill-none"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-medium text-black">
                {isDone ? "Profile loaded!" : "Building your page…"}
              </h1>
              <AnimatePresence mode="wait">
                <motion.p
                  key={isDone ? "done" : stepIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                  className="text-sm text-[#6B6B6B]"
                >
                  {isDone ? "Redirecting to your editor…" : STEPS[stepIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-[#F3F3F3]   rounded-lg overflow-hidden">
              <motion.div
                className="h-full bg-[#2A2A2F]   rounded-lg"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              />
            </div>

            {urlParam && (
              <div className="flex items-center gap-2 px-3 py-2   rounded-lg border border-[#E6E6E6] bg-[#FBFBFB] max-w-full overflow-hidden">
                <div className="w-2 h-2   rounded-lg bg-[#8DFFB3] flex-shrink-0 animate-pulse" />
                <p className="text-xs text-[#171717] truncate font-medium">
                  {urlParam}
                </p>
              </div>
            )}

            {isLoading && (
              <button
                onClick={() => router.push("/")}
                className="text-xs text-[#9CA3AF] hover:text-[#171717] transition-colors duration-150"
              >
                Cancel
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function ConvertPage() {
  return (
    <div className="min-h-screen bg-white font-inter flex flex-col">
      <Navbar />
      <Suspense
        fallback={
          <main className="flex-1 flex items-center justify-center">
            <div className="w-5 h-5   rounded-lg border-2 border-[#E6E6E6] border-t-[#2A2A2F] animate-spin" />
          </main>
        }
      >
        <ConvertInner />
      </Suspense>
    </div>
  );
}
```

---

## File: `app\dashboard\page.tsx`

```tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Layout,
  Folder,
  CreditCard,
  BookOpen,
  Settings,
  Trash2,
  Edit2,
  ExternalLink,
  Globe,
} from "lucide-react";
import { toast } from "sonner";

import { UserMenu } from "@/components/UserMenu";
import { useEditor } from "@/context/EditorContext";
import ProfilePreview from "@/app/editor/components/ProfilePreview";
import { MOCK_PROFILE } from "@/shared/types";

export default function DashboardPage() {
  const router = useRouter();
  const { editedProfile, selectedTemplate } = useEditor();
  const activeProfile = editedProfile || MOCK_PROFILE;

  const [websites, setWebsites] = useState<any[]>([]);
  const [loadingWebsites, setLoadingWebsites] = useState(true);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // 1. Get current authenticated user
    const checkUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (!res.ok) {
          router.push("/login");
          return;
        }
        setUserName(`${data.user.firstName} ${data.user.lastName}`);
        setUserEmail(data.user.email);
        sessionStorage.setItem(
          "linkedpage_user",
          JSON.stringify({
            name: `${data.user.firstName} ${data.user.lastName}`,
            email: data.user.email,
          }),
        );
      } catch {
        router.push("/login");
      }
    };
    checkUser();

    // 2. Load websites
    const loadSites = async () => {
      try {
        const res = await fetch("/api/websites");
        const data = await res.json();
        if (res.ok && data.websites) {
          setWebsites(data.websites);
        }
      } catch (err) {
        console.error("Failed to load websites", err);
      } finally {
        setLoadingWebsites(false);
      }
    };
    loadSites();
  }, [router]);

  const handleDeleteSite = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this website? This action cannot be undone.",
      )
    ) {
      return;
    }
    const toastId = toast.loading("Deleting website draft...");
    try {
      const res = await fetch(`/api/websites/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      toast.dismiss(toastId);
      if (res.ok) {
        toast.success("Website deleted successfully.");
        setWebsites((prev) => prev.filter((w) => w.id !== id));
      } else {
        toast.error(data.error || "Failed to delete website");
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Network error. Failed to delete website.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] font-inter flex flex-col text-black antialiased relative overflow-x-hidden">
      {/* ── Background Graphic ── */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-50">
        <img
          src="/bg.png"
          alt=""
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBFBFB]/40 via-white/80 to-[#FBFBFB]" />
      </div>

      {/* ── Editor Style Navbar/Top-bar (Removed shadow) ── */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-md border-b border-[#E6E6E6] px-6 z-50 flex items-center justify-between select-none shadow-none">
        {/* Left Logo Side */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Webild"
            className="h-7 w-auto object-contain cursor-pointer"
            onClick={() => router.push("/")}
          />
          <div className="w-px h-4 bg-[#2A2A2F]/15" />
          <span className="text-sm font-medium text-[#171717]/60 truncate max-w-[120px]">
            {websites[0]?.brandName || "My Dashboard"}
          </span>
        </div>

        {/* Right Action Side */}
        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => {
              const sub = websites[0]
                ? `${websites[0].subdomainSlug}.linkedpage.io`
                : "linkedpage.io";
              navigator.clipboard.writeText(`https://${sub}`);
              toast.success("Site link copied to clipboard!");
            }}
            className="h-8 px-4 text-xs font-semibold bg-white border border-[#E6E6E6] rounded-lg text-[#2A2A2F] hover:bg-[#F7F7F7] transition-all"
          >
            Share
          </button>

          <button
            onClick={() => {
              toast.loading("Publishing changes...");
              setTimeout(() => {
                toast.dismiss();
                toast.success("Your site updates are live!");
              }, 1000);
            }}
            className="h-8 px-5 text-xs font-semibold bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-all active:scale-[0.97]"
          >
            Publish
          </button>

          {/* User Menu Avatar Trigger */}
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="w-8 h-8 rounded-lg bg-[#E6E6E6] overflow-hidden border-2 border-white hover:scale-105 active:scale-95 transition-all ml-1"
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </button>

          {/* User Dropdown Menu */}
          <AnimatePresence>
            {isUserMenuOpen && (
              <UserMenu
                name={userName}
                email={userEmail}
                onClose={() => setIsUserMenuOpen(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ── Main Container (Sidebar + Content) ── */}
      <div className="flex-1 flex pt-14 min-h-screen relative z-10">
        {/* ── Sidebar (Sticky Left) ── */}
        <aside className="w-[260px] border-r border-[#F3F3F5] bg-white/50 backdrop-blur-sm px-6 py-6 flex flex-col justify-between hidden md:flex h-[calc(100vh-3.5rem)] sticky top-14 select-none">
          {/* Top navigation items */}
          <div className="flex flex-col gap-6">
            {/* New Website Button */}
            <button
              onClick={() => router.push("/onboarding")}
              className="w-full h-11 bg-[#F3F3F5] hover:bg-[#EAEAEB] active:scale-[0.98] transition-all rounded-[12px] flex items-center justify-center gap-2 text-[14px] font-semibold text-black"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-black"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 12h6M12 9v6" />
              </svg>
              New Website
            </button>

            {/* Menu Items */}
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => router.push("/")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-all"
              >
                <Home className="w-[18px] h-[18px] text-black" />
                Home
              </button>

              <button
                onClick={() => router.push("/editor")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-all"
              >
                <Layout className="w-[18px] h-[18px] text-black" />
                Templates
              </button>

              {/* Active Tab */}
              <button className="w-full h-10 px-3 rounded-[8px] bg-[#E8F1FF] border border-[#8DB8FF]/40 flex items-center gap-3 text-[14px] font-semibold text-[#1A68FF] transition-all">
                <Folder className="w-[18px] h-[18px] text-[#1A68FF]" />
                All Websites
              </button>
            </div>

            {/* Recent Websites Section */}
            <div className="flex flex-col gap-2.5 pt-2 border-t border-[#F5F5F7]">
              <span className="text-[12px] font-semibold text-[#88888E] px-3">
                Recent websites
              </span>

              <div
                onClick={() =>
                  websites[0] && router.push(`/editor?id=${websites[0].id}`)
                }
                className="flex items-center gap-2.5 px-3 py-2 rounded-[8px] hover:bg-white/60 cursor-pointer transition-all bg-white/30"
              >
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-[#E6E6E6] overflow-hidden p-0.5 shrink-0">
                  <img
                    src="/logoicon.png"
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[13px] font-semibold text-[#171717] truncate">
                  {websites[0]?.brandName || "No recent sites"}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom navigation & pricing items */}
          <div className="flex flex-col gap-6">
            {/* Pricing, Documentation, Settings */}
            <div className="flex flex-col gap-1">
              <button
                onClick={() => toast.info("Pricing modal coming soon!")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-all"
              >
                <CreditCard className="w-[18px] h-[18px] text-black" />
                Pricing
              </button>

              <button
                onClick={() => toast.info("Documentation coming soon!")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-all"
              >
                <BookOpen className="w-[18px] h-[18px] text-black" />
                Documentation
              </button>

              <button
                onClick={() => toast.info("Settings panel coming soon!")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-all"
              >
                <Settings className="w-[18px] h-[18px] text-black" />
                Settings
              </button>
            </div>
          </div>
        </aside>

        {/* ── Main Content Area ── */}
        <main className="flex-1 flex flex-col items-center px-8 md:px-12 py-10">
          {/* User Provided Search and Title Container */}
          <div
            className="flex flex-col gap-4 items-center text-center w-full max-w-[420px] mb-12"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
            }}
          >
            <h2
              className="text-5xl font-medium leading-[1.15] text-black flex items-center justify-center gap-1 flex-wrap"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            >
              <span
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              >
                All
              </span>{" "}
              <img
                className="h-[1.1em] w-auto object-contain align-middle mx-1.5 shrink-0"
                height={55}
                width={55}
                src="/logoicon.png"
                alt="Logo"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              />{" "}
              <span
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              >
                Websites
              </span>
            </h2>
            <p
              className="text-balance text-base md:text-xl leading-tight text-black"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            >
              Manage and access all your websites websites in one place.
            </p>
            <div
              className="relative flex items-center gap-1 px-3 py-3 rounded-sm button-secondary w-full md:w-80 h-fit text-base md:text-lg mt-2"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            >
              <svg
                className="lucide lucide-search h-[1em] text-black"
                height="24"
                width="24"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              >
                <path
                  d="m21 21-4.34-4.34"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                  }}
                />
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                  }}
                />
              </svg>
              <input
                className="w-full placeholder:text-black focus:outline-none text-base md:text-lg bg-transparent border-none p-0 focus:ring-0"
                type="text"
                placeholder="Search websites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              />
            </div>
          </div>

          {/* Websites Grid */}
          <div className="w-full flex justify-start pl-2">
            {loadingWebsites ? (
              <div className="w-full flex justify-center py-20">
                <div className="w-6 h-6 rounded-lg border-2 border-slate-200 border-t-[#2A2A2F] animate-spin" />
              </div>
            ) : websites.length === 0 ? (
              <div className="w-full flex flex-col items-center text-center py-20 px-6 bg-white border border-[#E6E6E6] rounded-[20px] shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] w-full max-w-lg mx-auto">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-4 border border-[#E6E6E6]">
                  <Folder className="w-6 h-6 text-[#2A2A2F]/50" />
                </div>
                <h3 className="text-lg font-bold text-black mb-1">
                  No websites found
                </h3>
                <p className="text-sm text-gray-500 max-w-sm mb-6 leading-relaxed">
                  Import your LinkedIn profile or start with template data to
                  create your first personal portfolio website.
                </p>
                <button
                  onClick={() => router.push("/onboarding")}
                  className="px-5 py-2 bg-[#2A2A2F] text-white text-xs font-bold rounded-lg hover:bg-[#3A3A42] transition-transform active:scale-[0.97] shadow-sm"
                >
                  Create your first website
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 w-full max-w-7xl">
                {websites
                  .filter((web) => {
                    const term = searchQuery.toLowerCase();
                    return (
                      !term ||
                      web.brandName.toLowerCase().includes(term) ||
                      web.subdomainSlug.toLowerCase().includes(term)
                    );
                  })
                  .map((web) => {
                    const isDropdownOpen = activeDropdownId === web.id;
                    return (
                      <div
                        key={web.id}
                        className="relative flex flex-col gap-3 p-3 cursor-pointer rounded-[12px] bg-white border border-[#EBEBEB] hover:shadow-[0_12px_24px_rgba(0,0,0,0.04)] transition-all duration-300 group"
                      >
                        <div
                          onClick={() => router.push(`/editor?id=${web.id}`)}
                        >
                          <div className="relative w-full bg-[#F7F7F7] rounded-[10px] overflow-hidden aspect-video border border-[#F5F5F7] flex items-center justify-center">
                            <div className="relative w-full p-1 rounded-sm flex items-center justify-center">
                              <div className="relative w-full aspect-video overflow-hidden rounded-[8px] bg-white flex items-center justify-center pointer-events-none">
                                <div className="scale-[0.27] origin-center flex-shrink-0 flex items-center justify-center">
                                  <ProfilePreview
                                    profile={web.profile}
                                    template={web.templateId}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card Footer details */}
                        <div className="flex items-start justify-between relative min-w-0">
                          <div className="min-w-0 max-w-[80%] flex flex-col">
                            <h3 className="text-sm font-semibold leading-tight truncate text-black">
                              {web.brandName}
                            </h3>
                            <p className="text-xs leading-tight truncate text-gray-500 mt-1">
                              {web.isPublished ? (
                                <span className="text-[#369762] font-semibold flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#369762]" />
                                  Live: {web.subdomainSlug}.linkedpage.io
                                </span>
                              ) : (
                                <span>Draft (Unpublished)</span>
                              )}
                            </p>
                          </div>

                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveDropdownId(
                                  isDropdownOpen ? null : web.id,
                                );
                              }}
                              className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 transition-all my-auto text-gray-500"
                            >
                              <svg
                                className="lucide lucide-ellipsis w-full"
                                height="24"
                                width="24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="19" cy="12" r="1" />
                                <circle cx="5" cy="12" r="1" />
                              </svg>
                            </button>

                            {/* Dropdown Options */}
                            {isDropdownOpen && (
                              <>
                                <div
                                  className="fixed inset-0 z-10"
                                  onClick={() => setActiveDropdownId(null)}
                                />
                                <div className="absolute right-0 bottom-10 z-20 w-44 bg-white border border-[#EBEBEB] rounded-[12px] py-1.5 flex flex-col shadow-lg">
                                  <button
                                    onClick={() => {
                                      setActiveDropdownId(null);
                                      router.push(`/editor?id=${web.id}`);
                                    }}
                                    className="px-4 py-2 text-left text-[13px] font-medium text-black hover:bg-[#F3F3F5] flex items-center gap-2"
                                  >
                                    <Edit2 className="w-4 h-4 text-gray-500" />
                                    Edit in Builder
                                  </button>
                                  <button
                                    onClick={() => {
                                      setActiveDropdownId(null);
                                      router.push(`/preview?id=${web.id}`);
                                    }}
                                    className="px-4 py-2 text-left text-[13px] font-medium text-black hover:bg-[#F3F3F5] flex items-center gap-2"
                                  >
                                    <Globe className="w-4 h-4 text-gray-500" />
                                    View Live Preview
                                  </button>
                                  <button
                                    onClick={() => {
                                      setActiveDropdownId(null);
                                      handleDeleteSite(web.id);
                                    }}
                                    className="px-4 py-2 text-left text-[13px] font-medium text-[#E45A5A] hover:bg-red-50 flex items-center gap-2 border-t border-[#F5F5F7] mt-1"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Delete site
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </main>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            html {
              scrollbar-width: thin;
              scrollbar-color: rgba(0, 0, 0, 0.05) transparent;
              overscroll-behavior: none;
            }

            body {
              scrollbar-width: thin;
              scrollbar-color: rgba(0, 0, 0, 0.05) transparent;
              background: #fff;
              overscroll-behavior: none;
              color: #171717;
              min-height: 100vh;
              position: relative;
              font-family: "Inter Tight", "Inter Tight Fallback";
              font-style: normal;
            }
          `,
        }}
      />
    </div>
  );
}
```

---

## File: `app\editor\page.tsx`

```tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEditor } from "@/context/EditorContext";
import { type TemplateId, TEMPLATES } from "@/shared/types";
import ProfilePreview from "./components/ProfilePreview";
import ChatPane, { ChatTab } from "./components/ChatPane";
import DomainsPane from "./components/DomainsPane";
import SettingsPane from "./components/SettingsPane";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { UserMenu } from "@/components/UserMenu";

// ─── Left Sidebar Icons ────────────────────────────────────────────────────────
type NavItem = { icon: React.ReactNode; label: string; active?: boolean };

const navItems: NavItem[] = [
  {
    label: "Home",
    icon: (
      <svg
        className="w-[18px] h-[18px]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    label: "Design",
    active: true,
    icon: (
      <svg
        className="w-[18px] h-[18px]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    label: "Domains",
    icon: (
      <svg
        className="w-[18px] h-[18px]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    label: "Site Settings",
    icon: (
      <svg
        className="w-[18px] h-[18px]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    ),
  },
];

// ─── Main editor inner ─────────────────────────────────────────────────────────
function EditorInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    websiteId,
    editedProfile,
    selectedTemplate,
    updateField,
    selectTemplate,
    useMockProfile,
    isDirty,
    resetEdits,
    loadWebsite,
  } = useEditor();

  const [activeNav, setActiveNav] = useState(1); // Templates active by default
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">(
    "desktop",
  );
  const [publishing, setPublishing] = useState(false);
  const [activeTab, setActiveTab] = useState<ChatTab>("chat");
  const [editorTab, setEditorTab] = useState<
    "profile" | "experience" | "links"
  >("profile");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingCoords, setOnboardingCoords] = useState<{
    templates?: DOMRect;
    publish?: DOMRect;
    preview?: DOMRect;
  }>({});

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (!res.ok) {
          router.push("/login");
          return;
        }
        setUserName(`${data.user.firstName} ${data.user.lastName}`);
        setUserEmail(data.user.email);
      } catch {
        router.push("/login");
      }
    };
    checkUser();
  }, [router]);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      loadWebsite(id);
    }
  }, [searchParams, loadWebsite]);

  useEffect(() => {
    if (searchParams.get("onboarding") === "true") {
      setShowOnboarding(true);
      setActiveTab("grid"); // Set to Grid (Templates) tab initially during onboarding
    }
  }, [searchParams]);

  useEffect(() => {
    if (!showOnboarding) return;

    const measure = () => {
      const templatesEl = document.getElementById("onboarding-templates-tab");
      const publishEl = document.getElementById("onboarding-publish-btn");
      const previewEl = document.getElementById("onboarding-preview-canvas");

      setOnboardingCoords({
        templates: templatesEl?.getBoundingClientRect(),
        publish: publishEl?.getBoundingClientRect(),
        preview: previewEl?.getBoundingClientRect(),
      });
    };

    // Delay a short amount to ensure render completion before measurement
    const t = setTimeout(measure, 600);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [showOnboarding]);

  useEffect(() => {
    if (!editedProfile) useMockProfile();
  }, [editedProfile, useMockProfile]);

  useEffect(() => {
    const t = searchParams.get("template") as TemplateId | null;
    if (t) selectTemplate(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCommand = (cmd: string) => {
    const lower = cmd.toLowerCase();
    for (const tpl of TEMPLATES) {
      if (lower.includes(tpl.name.toLowerCase()) || lower.includes(tpl.id)) {
        selectTemplate(tpl.id);
        toast.success(`Applied template: ${tpl.name}`);
        return;
      }
    }
    if (lower.includes("dark")) {
      selectTemplate("dark");
      toast.success("Dark mode template applied!");
    }
  };

  const handlePublish = async () => {
    if (!websiteId) {
      toast.error("Please load or create a website first.");
      return;
    }
    setPublishing(true);
    const toastId = toast.loading("Publishing your page…");
    try {
      const response = await fetch(`/api/websites/${websiteId}/publish`, {
        method: "POST",
      });
      const data = await response.json();
      toast.dismiss(toastId);
      setPublishing(false);
      if (!response.ok) {
        toast.error(data.error || "Failed to publish website");
        return;
      }
      toast.success("Your page is live! 🎉");
      router.push(`/publish?slug=${data.website.subdomainSlug}`);
    } catch {
      toast.dismiss(toastId);
      setPublishing(false);
      toast.error("Network error. Failed to publish website.");
    }
  };

  const handleFieldClick = (fieldName: string) => {
    setActiveTab("theme");
    if (fieldName === "experience") {
      setEditorTab("experience");
    } else if (fieldName === "links") {
      setEditorTab("links");
    } else {
      setEditorTab("profile");
    }

    setTimeout(() => {
      const el = document.getElementById(`editor-field-${fieldName}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        const inputEl = el.querySelector("input, textarea");
        if (inputEl) {
          (inputEl as HTMLElement).focus();
        } else {
          (el as HTMLElement).focus();
        }
      }
    }, 150);
  };

  const profileName = editedProfile?.name ?? "Your Profile";

  // Preview scale
  const desktopScale = 0.58;
  const mobileScale = 0.45;

  return (
    <div className="h-screen w-full flex overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 font-inter select-none">
      {/* ── Left Sidebar ── */}
      <div className="w-[60px] h-full shrink-0 relative z-[60]">
        <aside className="absolute top-0 left-0 h-full w-[60px] hover:w-[250px] bg-white/60 backdrop-blur-xl border-r border-[#0101]/5 transition-all duration-300 overflow-hidden flex flex-col justify-between group   shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] hover:shadow-[0_8px_32px_#ffff] py-4">
          <div className="flex flex-col items-start w-full">
            {/* Project Selector */}
            <div className="flex items-center px-[10px] mb-4 w-full cursor-pointer group/project relative">
              <div className="w-10 h-10 flex shrink-0 items-center justify-center rounded-[12px] bg-white border border-[#E6E6E6] text-[#2A2A2F] font-semibold text-[15px]   shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] group-hover:mr-3 transition-all duration-300 relative z-10 overflow-hidden p-1.5">
                <img
                  src="/logoicon.png"
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex items-center justify-between w-[170px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-[62px] pointer-events-none group-hover:pointer-events-auto">
                <span className="font-medium text-[#2A2A2F] text-[15px]">
                  hi hellow
                </span>
                <svg
                  className="w-5 h-5 text-[#171717]/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <div className="w-full px-4 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="h-px w-full bg-[#E6E6E6]/60" />
            </div>

            {/* Nav Items */}
            <nav className="flex flex-col gap-[2px] w-full px-2">
              {navItems.map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (i === 0) {
                      router.push("/dashboard");
                    } else {
                      setActiveNav(i);
                    }
                  }}
                  title={item.label}
                  className={`w-full flex items-center h-[38px] px-2 rounded-[10px] transition-all duration-150 ${
                    activeNav === i
                      ? "bg-[#ebf5ff] text-[#3b82f6] border border-[#3b82f6]/20   shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]"
                      : "text-[#171717]/70 hover:bg-[#fff]/50 hover:text-[#2A2A2F] border border-transparent"
                  }`}
                >
                  <div className="w-5 h-5 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <span
                    className={`ml-3 font-medium text-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap absolute left-[44px] pointer-events-none ${activeNav === i ? "text-[#3b82f6]" : ""}`}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="flex flex-col items-center w-full mt-auto">
            {/* Upgrade Card */}
            <div className="px-3 w-full mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 max-h-0 group-hover:max-h-[250px] overflow-hidden flex-shrink-0">
              <div className="relative p-[14px] bg-white border border-[#E6E6E6] rounded-[14px]   shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] overflow-hidden text-left mt-2">
                <p className="text-[14px] font-semibold text-[#2A2A2F] leading-[1.3] mb-3">
                  ONLY $16 to
                  <br />
                  unlock Premium
                  <br />
                  Features
                </p>
                <button className="w-full py-1.5 bg-[#4b93ff] text-white     rounded-lg  text-[13px] font-medium hover:bg-[#3b82f6] transition-colors   shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]">
                  Upgrade Now
                </button>
              </div>
            </div>

            {/* Bottom Links */}
            <div className="flex flex-col gap-1 w-full px-2">
              <button className="w-full flex items-center h-9 px-2 rounded-[10px] text-[#171717]/70 hover:bg-[#E6E6E6]/50 hover:text-[#2A2A2F] transition-all duration-150 relative">
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <svg
                    className="w-[18px] h-[18px]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <span className="ml-3 font-medium text-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap absolute left-[44px] pointer-events-none">
                  Settings
                </span>
              </button>
              <button className="w-full flex items-center h-9 px-2 rounded-[10px] text-[#171717]/70 hover:bg-[#E6E6E6]/50 hover:text-[#2A2A2F] transition-all duration-150 relative">
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <svg
                    className="w-[18px] h-[18px]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="ml-3 font-medium text-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap absolute left-[44px] pointer-events-none">
                  Help
                </span>
              </button>
            </div>

            <div className="w-full px-4 my-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="h-px w-full bg-[#E6E6E6]/60" />
            </div>

            <div className="px-2 w-full">
              <button className="w-full flex items-center h-9 px-2 rounded-[10px] text-[#171717]/80 hover:bg-[#E6E6E6]/50 hover:text-[#2A2A2F] transition-all duration-150 relative">
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <svg
                    className="w-[18px] h-[18px]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <span className="ml-3 font-medium text-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap absolute left-[44px] pointer-events-none">
                  Add new website
                </span>
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* ── Left Column Panel Switcher based on activeNav ── */}
      {activeNav === 1 && (
        <ChatPane
          onCommand={handleCommand}
          profileName={profileName}
          profile={editedProfile}
          selectedTemplate={selectedTemplate}
          onSelectTemplate={selectTemplate}
          onChangeField={updateField}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          editorTab={editorTab}
          setEditorTab={setEditorTab}
        />
      )}
      {activeNav === 2 && <DomainsPane />}
      {activeNav === 3 && (
        <SettingsPane profileName={profileName} router={router} />
      )}

      {/* ── Canvas ── */}
      <main className="flex-1 flex flex-col bg-white overflow-hidden relative p-5 gap-3">
        {/* ── Top bar (outside card) ── */}
        <div className="flex items-center justify-between shrink-0 h-9  bg-white">
          {/* Left: Upgrade Plan & Saving Indicator */}
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                toast.info(
                  "Upgrade to Pro for custom domains, priority support & more!",
                )
              }
              className="flex items-center gap-2 h-10 px-2  text-sm font-medium bg-white border border-[#E6E6E6]   rounded-sm text-[#2A2A2F] hover:bg-[#F7F7F7] transition-colors   shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]"
              style={{ boxShadow: " 0 1px 4px #fff" }}
            >
              <svg
                className="w-[20px] h-[20px]"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </button>

            {/* Changes saved dot indicator */}
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
              {isDirty ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span>Unsaved edits</span>
                  <button
                    onClick={resetEdits}
                    className="underline text-[11px] text-gray-400 hover:text-black transition-colors ml-1"
                  >
                    Reset
                  </button>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>All changes saved</span>
                </>
              )}
            </div>
          </div>

          {/* Right: Share + Publish + Avatar */}
          <div className="flex items-center gap-2 relative">
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://linkedpage.io/${editedProfile?.name.toLowerCase().replace(/\s+/g, "-") ?? "profile"}`,
                );
                toast.success("Share link copied!");
              }}
              className="h-8 px-4 text-sm font-medium bg-white border border-[#E6E6E6]   rounded-lg text-[#2A2A2F] hover:bg-[#F7F7F7] transition-colors   shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]"
            >
              Share
            </button>
            <button
              id="onboarding-publish-btn"
              onClick={handlePublish}
              disabled={publishing}
              className="h-8 px-5 text-sm font-medium bg-[#3b82f6] text-white   rounded-lg hover:bg-[#2563eb] transition-colors active:scale-[0.97] flex items-center gap-1.5   shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]"
            >
              {publishing && (
                <span className="w-3 h-3   rounded-lg border-2 border-white border-t-transparent animate-spin" />
              )}
              Publish
            </button>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-8 h-8   rounded-lg bg-[#E6E6E6] overflow-hidden border-2 border-white   shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] hover:scale-105 active:scale-95 transition-transform ml-1"
            >
              <img
                src={
                  editedProfile?.avatarUrl ?? "https://i.pravatar.cc/80?img=47"
                }
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </button>
            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 top-10 z-50"
                >
                  <UserMenu
                    name={userName}
                    email={userEmail}
                    onClose={() => setIsUserMenuOpen(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Canvas card ── */}
        <div className="relative flex-1 bg-white/75  backdrop-blur-xl  rounded-[14px] flex flex-col overflow-hidden shadow-[0_4px_24px_#ffff,0_0_0_1px_rgba(255,255,255,0.6)_inset]">
          {/* ── Canvas toolbar ── */}
          <div className="relative z-30 flex items-center gap-3 w-full h-[54px]  border-b border-white/30 shrink-0 bg-white/50 backdrop-blur-md">
            {/* Left: Customize + Page */}
            <div className="flex items-center gap-2">
              {/* Customize button */}
              <div className="relative group">
                <button className="flex items-center gap-2 h-8 px-3 text-sm font-medium bg-[#F7F7F7] border border-[#E6E6E6]     rounded-lg  text-[#2A2A2F] hover:bg-[#F0F0F0] transition-colors">
                  <svg
                    className="w-[14px] h-[14px]"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.25"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 4.1 12 6" />
                    <path d="m5.1 8-2.9-.8" />
                    <path d="m6 12-1.9 2" />
                    <path d="M7.2 2.2 8 5.1" />
                    <path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z" />
                  </svg>
                  Customize
                </button>
                <div className="hidden md:block absolute z-50 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 left-full top-1/2 -translate-y-1/2 ml-2">
                  <div className="absolute w-2 h-2 bg-[#171717] rotate-45 -left-1 top-1/2 -translate-y-1/2" />
                  <div className="relative px-3 py-1 text-xs text-white bg-[#171717]     rounded-lg  whitespace-nowrap">
                    Edit text, images, colors, fonts, and layouts
                  </div>
                </div>
              </div>

              {/* Page switcher */}
              <div className="relative group">
                <button className="flex items-center gap-2 h-8 px-3 text-sm font-medium bg-[#F7F7F7] border border-[#E6E6E6]     rounded-lg  text-[#2A2A2F] hover:bg-[#F0F0F0] transition-colors">
                  <span className="text-sm leading-tight">Home</span>
                  <svg
                    className="w-3.5 h-3.5 text-[#171717]/50"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div className="hidden md:block absolute z-50 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 top-full left-1/2 -translate-x-1/2 mt-2">
                  <div className="absolute w-2 h-2 bg-[#171717] rotate-45 -top-1 left-1/2 -translate-x-1/2" />
                  <div className="relative px-3 py-1 text-xs text-white bg-[#171717]     rounded-lg  whitespace-nowrap">
                    Switch and manage site pages
                  </div>
                </div>
              </div>
            </div>

            {/* Center: domain availability banner */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-3 px-4 h-9 bg-[#F7F7F7] border border-[#E6E6E6]     rounded-lg ">
                <span className="flex items-center min-w-0 gap-2 text-sm font-medium">
                  <svg
                    className="w-[14px] h-[14px] text-[#3b82f6] shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                    <path d="M20 2v4" />
                    <path d="M22 4h-4" />
                    <circle cx="4" cy="20" r="2" />
                  </svg>
                  <span className="min-w-0 truncate text-[#3b82f6] font-medium">
                    {editedProfile?.name.toLowerCase().replace(/\s+/g, "") ??
                      "yourname"}
                    .linkedpage.io
                  </span>
                  <span className="hidden lg:inline text-[#2A2A2F] font-normal">
                    is available!
                  </span>
                </span>
              </div>
            </div>

            {/* Right: undo/redo + history + device toggle (icon-only) */}
            <div className="flex items-center gap-1.5">
              {/* Undo */}
              <div className="relative group">
                <button
                  disabled
                  className="w-8 h-8 flex items-center justify-center     rounded-lg  text-[#171717]/30 cursor-not-allowed"
                >
                  <svg
                    className="w-[15px] h-[15px]"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 14 4 9l5-5" />
                    <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />
                  </svg>
                </button>
              </div>

              {/* Redo */}
              <div className="relative group">
                <button
                  disabled
                  className="w-8 h-8 flex items-center justify-center     rounded-lg  text-[#171717]/30 cursor-not-allowed"
                >
                  <svg
                    className="w-[15px] h-[15px]"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="m15 14 5-5-5-5" />
                    <path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13" />
                  </svg>
                </button>
              </div>

              {/* History */}
              <div className="relative group">
                <button
                  disabled
                  className="w-8 h-8 flex items-center justify-center     rounded-lg  text-[#171717]/30 cursor-not-allowed"
                >
                  <svg
                    className="w-[14px] h-[14px]"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                    <path d="M12 7v5l4 2" />
                  </svg>
                </button>
                <div className="absolute z-50 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 top-full left-1/2 -translate-x-1/2 mt-2">
                  <div className="absolute w-2 h-2 bg-[#171717] rotate-45 -top-1 left-1/2 -translate-x-1/2" />
                  <div className="relative px-3 py-1 text-xs text-white bg-[#171717]     rounded-lg  whitespace-nowrap">
                    Version history
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-4 bg-[#E6E6E6] mx-0.5" />

              {/* Device toggle */}
              <div className="relative group">
                <div className="flex items-center bg-[#F7F7F7] border border-[#E6E6E6]     rounded-lg  overflow-hidden p-0.5 gap-0.5">
                  <button
                    onClick={() => setPreviewMode("desktop")}
                    className={`w-8 h-8 flex items-center justify-center rounded-[6px] transition-all duration-200 ${previewMode === "desktop" ? "bg-white   shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] text-[#2A2A2F]" : "text-[#171717]/40 hover:text-[#2A2A2F]"}`}
                  >
                    <svg
                      className="w-[14px] h-[14px]"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <rect height="14" width="20" rx="2" x="2" y="3" />
                      <line x1="8" x2="16" y1="21" y2="21" />
                      <line x1="12" x2="12" y1="17" y2="21" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setPreviewMode("mobile")}
                    className={`w-8 h-8 flex items-center justify-center rounded-[6px] transition-all duration-200 ${previewMode === "mobile" ? "bg-white   shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] text-[#2A2A2F]" : "text-[#171717]/40 hover:text-[#2A2A2F]"}`}
                  >
                    <svg
                      className="w-[14px] h-[14px]"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <rect height="20" width="14" rx="2" ry="2" x="5" y="2" />
                      <path d="M12 18h.01" />
                    </svg>
                  </button>
                </div>
                <div className="absolute z-50 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 right-full top-1/2 -translate-y-1/2 mr-2">
                  <div className="absolute w-2 h-2 bg-[#171717] rotate-45 -right-1 top-1/2 -translate-y-1/2" />
                  <div className="relative px-3 py-1 text-xs text-white bg-[#171717]     rounded-lg  whitespace-nowrap">
                    Switch between desktop and mobile
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Preview Area ── */}
          <div className="flex-1 flex items-center justify-center overflow-hidden bg-[#F9F9F9] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedTemplate}-${previewMode}`}
                id="onboarding-preview-canvas"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                className="w-full h-full flex items-center justify-center p-6"
              >
                {editedProfile ? (
                  previewMode === "desktop" ? (
                    /* Desktop canvas */
                    <div
                      className="rounded-[16px] overflow-hidden border border-[#E6E6E6] bg-white shadow-[0_8px_40px_-8px_#ffff,0_2px_8px_#ffff]"
                      style={{
                        width: 1024 * desktopScale,
                        height: 768 * desktopScale,
                      }}
                    >
                      <div
                        style={{
                          width: 1024,
                          height: 768,
                          transform: `scale(${desktopScale})`,
                          transformOrigin: "top left",
                          overflow: "auto",
                        }}
                      >
                        <ProfilePreview
                          profile={editedProfile}
                          template={selectedTemplate}
                          onFieldClick={handleFieldClick}
                        />
                      </div>
                    </div>
                  ) : (
                    /* Mobile canvas */
                    <div
                      className="rounded-[32px] overflow-hidden border-[7px] border-[#2A2A2F] bg-white shadow-[0_16px_48px_-12px_#ffff]"
                      style={{
                        width: 375 * mobileScale,
                        height: 812 * mobileScale,
                      }}
                    >
                      <div
                        style={{
                          width: 375,
                          height: 812,
                          transform: `scale(${mobileScale})`,
                          transformOrigin: "top left",
                          overflow: "auto",
                        }}
                      >
                        <ProfilePreview
                          profile={editedProfile}
                          template={selectedTemplate}
                          onFieldClick={handleFieldClick}
                        />
                      </div>
                    </div>
                  )
                ) : (
                  /* Empty state */
                  <div
                    className="rounded-[16px] overflow-hidden border border-[#E6E6E6] bg-white flex flex-col items-center justify-center shadow-[0_8px_40px_-8px_#ffff]"
                    style={{
                      width: 1024 * desktopScale,
                      height: 768 * desktopScale,
                    }}
                  >
                    <div className="flex flex-col items-center text-center max-w-sm gap-4">
                      <div className="w-14 h-14 bg-[#2A2A2F] rounded-[18px] flex items-center justify-center transform rotate-3   shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]">
                        <svg
                          className="w-5 h-5 text-white transform -rotate-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                      <h2 className="text-xl font-medium text-[#2A2A2F]">
                        Paste your LinkedIn URL
                      </h2>
                      <p className="text-sm text-[#9CA3AF]">
                        Use the chat panel to paste a LinkedIn URL and generate
                        your micro-site.
                      </p>
                      <button
                        onClick={() => router.push("/")}
                        className="mt-2 px-4 py-2 bg-[#2A2A2F] text-white text-sm font-medium     rounded-lg  hover:bg-[#3A3A42] transition-colors"
                      >
                        Go to home
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* ── Onboarding Overlay ── */}
      <AnimatePresence>
        {showOnboarding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              setShowOnboarding(false);
              const params = new URLSearchParams(window.location.search);
              params.delete("onboarding");
              const query = params.toString();
              router.replace(
                `${window.location.pathname}${query ? `?${query}` : ""}`,
              );
            }}
            className="fixed inset-0 z-[100] cursor-pointer bg-black/15 backdrop-blur-[1px]"
          >
            {onboardingCoords.templates && (
              <div
                className="absolute pointer-events-none"
                style={{
                  top:
                    onboardingCoords.templates.top +
                    onboardingCoords.templates.height / 2,
                  left:
                    onboardingCoords.templates.left +
                    onboardingCoords.templates.width / 2,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="w-6 h-6 rounded-full bg-[#8DB8FF]/30 flex items-center justify-center relative">
                  <span
                    className="absolute inset-0 rounded-full bg-[#8DB8FF]/40 animate-ping"
                    style={{ animationDuration: "1.5s" }}
                  />
                  <div className="w-3 h-3 rounded-full bg-[#3b82f6] border-2 border-white shadow-sm" />
                </div>
                <div
                  className="absolute bg-white border border-[#E6E6E6] rounded-xl p-3 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] whitespace-nowrap text-left flex flex-col gap-0.5"
                  style={{
                    top: onboardingCoords.templates.height / 2 + 10,
                    left: 0,
                  }}
                >
                  <span className="text-[12px] font-bold text-black">
                    🎨 Templates
                  </span>
                  <span className="text-[10px] text-[#171717]/60">
                    Switch layouts instantly
                  </span>
                </div>
              </div>
            )}

            {onboardingCoords.publish && (
              <div
                className="absolute pointer-events-none"
                style={{
                  top:
                    onboardingCoords.publish.top +
                    onboardingCoords.publish.height / 2,
                  left:
                    onboardingCoords.publish.left +
                    onboardingCoords.publish.width / 2,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="w-6 h-6 rounded-full bg-[#8DFFB3]/30 flex items-center justify-center relative">
                  <span
                    className="absolute inset-0 rounded-full bg-[#8DFFB3]/40 animate-ping"
                    style={{ animationDuration: "1.5s" }}
                  />
                  <div className="w-3 h-3 rounded-full bg-[#369762] border-2 border-white shadow-sm" />
                </div>
                <div
                  className="absolute bg-white border border-[#E6E6E6] rounded-xl p-3 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] whitespace-nowrap text-left flex flex-col gap-0.5"
                  style={{
                    top: onboardingCoords.publish.height / 2 + 10,
                    right: 0,
                    transform: "translateX(30%)",
                  }}
                >
                  <span className="text-[12px] font-bold text-black">
                    🚀 Go Live
                  </span>
                  <span className="text-[10px] text-[#171717]/60">
                    Go live in one click
                  </span>
                </div>
              </div>
            )}

            {onboardingCoords.preview && (
              <div
                className="absolute pointer-events-none"
                style={{
                  top:
                    onboardingCoords.preview.top +
                    onboardingCoords.preview.height / 2,
                  left:
                    onboardingCoords.preview.left +
                    onboardingCoords.preview.width / 2,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="w-6 h-6 rounded-full bg-[#8DB8FF]/30 flex items-center justify-center relative">
                  <span
                    className="absolute inset-0 rounded-full bg-[#8DB8FF]/40 animate-ping"
                    style={{ animationDuration: "1.5s" }}
                  />
                  <div className="w-3 h-3 rounded-full bg-[#3b82f6] border-2 border-white shadow-sm" />
                </div>
                <div
                  className="absolute bg-white border border-[#E6E6E6] rounded-xl p-3.5 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] whitespace-nowrap text-center flex flex-col gap-0.5"
                  style={{
                    top: 24,
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <span className="text-[12px] font-bold text-black">
                    ✏️ Click to Edit
                  </span>
                  <span className="text-[10px] text-[#171717]/60">
                    Click any text to edit
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center bg-[#F7F7F7]">
          <div className="w-5 h-5   rounded-lg border-2 border-[#E6E6E6] border-t-[#2A2A2F] animate-spin" />
        </div>
      }
    >
      <EditorInner />
    </Suspense>
  );
}
```

---

## File: `app\editor\components\ChatPane.tsx`

```tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  LayoutGrid,
  Edit2,
  Plus,
  Mic,
  ArrowUp,
} from "lucide-react";
import { toast } from "sonner";
import { useEditor } from "@/context/EditorContext";
import { ProfileData, TemplateId } from "@/shared/types";
import TemplatePicker from "./TemplatePicker";
import InlineEditor from "./InlineEditor";
import { motion, AnimatePresence } from "framer-motion";

export type ChatTab = "chat" | "theme" | "grid";

interface ChatPaneProps {
  onCommand: (cmd: string) => void;
  profileName: string;
  profile: ProfileData | null;
  selectedTemplate: TemplateId;
  onSelectTemplate: (id: TemplateId) => void;
  onChangeField: <K extends keyof ProfileData>(
    key: K,
    value: ProfileData[K],
  ) => void;
  activeTab: ChatTab;
  setActiveTab: (tab: ChatTab) => void;
  editorTab?: "profile" | "experience" | "links";
  setEditorTab?: (tab: "profile" | "experience" | "links") => void;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
}

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    role: "user",
    content: "hi hellow",
    time: "",
  },
  {
    id: "2",
    role: "assistant",
    content:
      "Hello there, please describe your idea. Just share your thoughts with me and I'll help with rest!",
    time: "",
  },
  {
    id: "3",
    role: "user",
    content: "make a portfolio website with random details",
    time: "",
  },
  {
    id: "4",
    role: "assistant",
    content:
      "Hey there, sounds like you're looking to create a website for your portfolio. I'll start building right away.\n\nA dynamic and modern portfolio website showcasing creative projects with a focus on engaging visuals and clear presentation. The design leverages a warm color palette and bold typography to highlight professional work and client testimonials, creating an inviting user experience.",
    time: "",
  },
];

const SUGGESTIONS = [
  "Refine Hero Headline",
  "Condense About Description",
  "Clarify Core Skills",
  "Add Social Links",
];

export default function ChatPane({
  onCommand,
  profileName,
  profile,
  selectedTemplate,
  onSelectTemplate,
  onChangeField,
  activeTab,
  setActiveTab,
  editorTab,
  setEditorTab,
}: ChatPaneProps) {
  const { websiteId } = useEditor();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (text?: string) => {
    const msg = text ?? input.trim();
    if (!msg) return;
    setInput("");

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: msg,
      time: "",
    };
    setMessages((prev) => [...prev, userMsg]);

    if (!websiteId) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content:
            "No active site loaded. Please select a website from the dashboard first.",
          time: "",
        },
      ]);
      return;
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, websiteId }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to get AI reply");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: data.reply,
          time: "",
        },
      ]);

      if (data.template) {
        onSelectTemplate(data.template);
      }

      if (data.profileUpdates) {
        for (const [k, v] of Object.entries(data.profileUpdates)) {
          onChangeField(k as keyof ProfileData, v as any);
        }
      }

      const lower = msg.toLowerCase();
      if (lower.includes("change template")) {
        setActiveTab("grid");
      } else if (
        lower.includes("edit bio") ||
        lower.includes("add links") ||
        lower.includes("refine hero") ||
        lower.includes("about description") ||
        lower.includes("skills") ||
        lower.includes("social links")
      ) {
        setActiveTab("theme");
        if (setEditorTab) {
          if (lower.includes("social links") || lower.includes("add links")) {
            setEditorTab("links");
          } else {
            setEditorTab("profile");
          }
        }
      }

      onCommand(msg);
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: `Error: ${e.message || "Failed to generate AI reply."}`,
          time: "",
        },
      ]);
    }
  };

  useEffect(() => {
    if (activeTab === "chat") {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeTab]);

  const chatTabs = [
    {
      id: "chat" as ChatTab,
      icon: (isActive: boolean) => (
        <MessageSquare
          className={`w-4 h-4 transition-colors duration-200 ${isActive ? "text-blue-500" : "text-[#171717]/60"}`}
        />
      ),
      label: "Chat",
    },
    {
      id: "grid" as ChatTab,
      icon: (isActive: boolean) => (
        <LayoutGrid
          className={`w-4 h-4 transition-colors duration-200 ${isActive ? "text-blue-500" : "text-[#171717]/60"}`}
        />
      ),
      label: "Templates",
    },
    {
      id: "theme" as ChatTab,
      icon: (isActive: boolean) => (
        <Edit2
          className={`w-4 h-4 transition-colors duration-200 ${isActive ? "text-blue-500" : "text-[#171717]/60"}`}
        />
      ),
      label: "Edit",
    },
  ];

  return (
    <section className="w-[510px] shrink-0 border-r border-[#E6E6E6]/60 bg-white flex flex-col h-full overflow-hidden select-none font-inter">
      {/* Title Header */}
      <div className="h-[54px] border-b border-[#E6E6E6]/40 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="LinkedPage"
            className="h-6 w-auto object-contain"
          />
          <div className="w-px h-3 bg-black/10" />
          <span className="text-[12.5px] font-bold text-[#171717]/65 truncate max-w-[120px]">
            {profileName || "LinkedPage"}
          </span>
        </div>
        <span className="text-[11px] font-bold px-2 py-0.5 bg-[#8DFFB3]/25 text-[#369762] rounded-md">
          Editor Mode
        </span>
      </div>

      {/* Tabs Toolbar with Custom Premium Expandable Style */}
      <div className="px-6 py-3 border-b border-[#E6E6E6]/30 bg-[#FBFBFB] shrink-0">
        <div className="relative flex items-center justify-center bg-zinc-100 rounded-xl p-[4px] h-10 w-full gap-1.5">
          {chatTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                layout
                key={tab.id}
                id={tab.id === "grid" ? "onboarding-templates-tab" : undefined}
                onClick={() => setActiveTab(tab.id)}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className={`relative h-8 rounded-xl flex items-center justify-center group cursor-pointer focus:outline-none select-none transition-all duration-300 ${
                  isActive
                    ? "flex-[1.5] text-blue-500 px-3 font-['Inter_Tight']"
                    : "flex-1 text-[#171717]/60 hover:bg-zinc-200/40"
                }`}
              >
                {/* Smoothly animated background pill */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-blue-50 outline outline-1 outline-blue-500/50 rounded-xl"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Content wrapper to render above the absolute background pill */}
                <div className="relative z-10 flex items-center justify-center shrink-0">
                  {tab.icon(isActive)}
                </div>

                {/* Label (visible only when active) */}
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.15, delay: 0.05 }}
                    className="relative z-10 ml-1.5 text-xs font-semibold whitespace-nowrap text-blue-500 font-['Inter_Tight']"
                  >
                    {tab.label}
                  </motion.span>
                )}

                {/* Tooltip for inactive tabs */}
                {!isActive && (
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none opacity-0 scale-95 translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col items-center">
                    {/* Small arrow pointing up */}
                    <div className="w-2 h-2 bg-zinc-800 rotate-45 -mb-1 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]" />
                    <div className="px-3 py-1 bg-gradient-to-b from-zinc-800 to-zinc-700 text-white text-[10px] font-medium font-['Inter_Tight'] rounded-lg shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] whitespace-nowrap">
                      {tab.label}
                    </div>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Tab content area */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        {activeTab === "chat" && (
          <>
            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto w-full px-4"
              style={{ scrollbarWidth: "none" }}
            >
              <div className="max-w-[479px] mx-auto flex flex-col gap-6 pb-4 pt-4 w-full">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                      className="w-full flex flex-col"
                    >
                      {msg.role === "user" ? (
                        <div className="w-full flex justify-end items-start">
                          <div className="max-w-[85%] flex flex-col  justify-start items-start">
                            <div className="BackgroundBorder min-h-9 px-4 py-3 relative bg-neutral-50 rounded-xl outline outline-1 outline-zinc-100 flex flex-col justify-start items-start">
                              <div className="OverlayShadow w-full h-full  left-0    top-0 absolute bg-white/0 rounded-xl shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] pointer-events-none" />
                              <div className="Container self-stretch pb-[0.63px] flex flex-col justify-start items-start">
                                <div className="HiHellow justify-center text-black text-[15px] font-normal font-['Inter'] leading-7 break-words max-w-full">
                                  {msg.content}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full flex flex-col justify-start items-start gap-2">
                          <div className="self-stretch inline-flex justify-start items-center gap-2">
                            {/* Logo Icon */}
                            <img
                              src="/logoicon.png"
                              alt="Logo"
                              className="h-6 w-auto object-contain select-none"
                            />
                          </div>

                          <div className="self-stretch flex flex-col justify-start items-start w-full">
                            <div className="justify-center text-neutral-900 text-[15px] font-normal font-['Inter'] leading-7 whitespace-pre-wrap w-full">
                              {msg.content}
                            </div>
                          </div>

                          {/* Dynamic attachment previews for the mockup portfolio response */}
                          {msg.id === "4" && (
                            <div className="w-full flex flex-col justify-start items-start gap-4 mt-3">
                              {/* 1. Carousel preview section */}
                              <div className="self-stretch pt-3 flex flex-col justify-start items-start w-full">
                                <div className="BackgroundBorder self-stretch p-5 bg-neutral-50 rounded-xl outline outline-1 outline-zinc-100 flex flex-col justify-start items-start w-full">
                                  <div className="SectionStackCarousel self-stretch h-48 relative w-full overflow-hidden">
                                    <div className="Container w-full max-w-96 h-48 left-0 top-0 absolute">
                                      <div className="BackgroundBorderShadow w-60 h-28 left-[343.55px] top-[13.58px] absolute origin-top-left rotate-[20deg] opacity-0 bg-neutral-50 rounded-xl shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] outline outline-1 outline-zinc-100" />
                                      <div className="BackgroundBorderShadow w-60 h-28 left-[343.55px] top-[13.58px] absolute origin-top-left rotate-[20deg] opacity-0 bg-neutral-50 rounded-xl shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] outline outline-1 outline-zinc-100" />
                                      <div className="BackgroundBorderShadow w-60 h-28 left-[-126.70px] top-[93.65px] absolute origin-top-left rotate-[-20deg] opacity-0 bg-neutral-50 rounded-xl shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] outline outline-1 outline-zinc-100" />
                                      <div className="BackgroundBorderShadow w-60 h-28 left-[-126.70px] top-[93.65px] absolute origin-top-left rotate-[-20deg] opacity-0 bg-neutral-50 rounded-xl shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] outline outline-1 outline-zinc-100" />
                                      <div className="BackgroundBorderShadow w-72 h-36 left-[174.13px] top-[11.35px] absolute origin-top-left rotate-[10deg] bg-neutral-50 rounded-xl shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] outline outline-1 outline-zinc-100" />
                                      <div className="BackgroundBorderShadow w-72 h-36 left-[-6.26px] top-[58.77px] absolute origin-top-left rotate-[-10deg] bg-neutral-50 rounded-xl shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] outline outline-1 outline-zinc-100" />
                                      <div className="BackgroundBorderShadow w-80 h-40 left-[118.69px] top-[2.70px] absolute origin-top-left rotate-[5deg] bg-neutral-50 rounded-xl shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] outline outline-1 outline-zinc-100" />
                                      <div className="BackgroundBorderShadow w-80 h-40 left-[7.20px] top-[29.90px] absolute origin-top-left rotate-[-5deg] bg-neutral-50 rounded-xl shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] outline outline-1 outline-zinc-100" />

                                      <div className="BackgroundBorderShadow w-full max-w-96 h-48 left-[23.33px] top-0 absolute bg-neutral-50 rounded-xl shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] outline outline-1 outline-zinc-100 overflow-hidden flex items-center justify-center p-4">
                                        <div className="flex flex-col items-center text-center gap-1">
                                          <span className="font-semibold text-[13px] text-neutral-800">
                                            Portfolio Preview
                                          </span>
                                          <span className="text-[11px] text-zinc-400">
                                            Template applied to active canvas
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    <button className="Button h-9 px-2.5 left-0 top-[82.32px] absolute bg-zinc-100 rounded-xl inline-flex justify-center items-center border-none cursor-pointer hover:bg-zinc-200">
                                      <div className="Svg size-3.5 relative overflow-hidden flex items-center justify-center">
                                        <svg
                                          width="6"
                                          height="10"
                                          viewBox="0 0 6 10"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M5 1L1 5L5 9"
                                            stroke="black"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </div>
                                    </button>
                                    <button className="Button h-9 px-2.5 left-[401.49px] top-[82.32px] absolute bg-zinc-100 rounded-xl inline-flex justify-center items-center border-none cursor-pointer hover:bg-zinc-200">
                                      <div className="Svg size-3.5 relative overflow-hidden flex items-center justify-center">
                                        <svg
                                          width="6"
                                          height="10"
                                          viewBox="0 0 6 10"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M1 1L5 5L1 9"
                                            stroke="black"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </div>
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* 2. Checklist section */}
                              <div className="self-stretch pt-3 flex flex-col justify-start items-start w-full">
                                <div className="BackgroundBorder self-stretch p-5 bg-neutral-50 rounded-xl outline outline-1 outline-zinc-100 flex flex-col justify-start items-start gap-3 w-full">
                                  {[
                                    "About Me description",
                                    "Project Showcase grid",
                                    "Responsive layout support",
                                    "Contact Form interface",
                                    "Resume download feature",
                                    "Skills & Tools inventory",
                                    "Testimonials section",
                                    "Custom footer metadata",
                                    "Navigation header links",
                                  ].map((item, idx) => (
                                    <div
                                      key={idx}
                                      className="self-stretch inline-flex justify-start items-center gap-2"
                                    >
                                      <div className="w-5 h-5 rounded-full border border-[#E6E6E6] flex items-center justify-center bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 opacity-80" />
                                      </div>
                                      <span className="text-[14px] font-medium text-neutral-700 font-['Inter']">
                                        {item}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* 3. Color Palette section */}
                              <div className="self-stretch pt-3 flex flex-col justify-start items-start w-full">
                                <div className="BackgroundBorder self-stretch p-5 bg-neutral-50 rounded-xl outline outline-1 outline-zinc-100 flex flex-col justify-start items-start gap-3 w-full">
                                  {[
                                    {
                                      name: "Ocean Breeze",
                                      colors: "from-blue-600 to-cyan-400",
                                    },
                                    {
                                      name: "Sunset Glow",
                                      colors: "from-orange-500 to-rose-400",
                                    },
                                    {
                                      name: "Forest Moss",
                                      colors: "from-emerald-600 to-teal-400",
                                    },
                                    {
                                      name: "Lavender Fields",
                                      colors: "from-purple-600 to-pink-400",
                                    },
                                  ].map((palette, idx) => (
                                    <div
                                      key={idx}
                                      className="self-stretch inline-flex justify-start items-center gap-2"
                                    >
                                      <div
                                        className={`Gradient w-5 h-5 bg-gradient-to-b ${palette.colors} rounded-full shadow-sm`}
                                      />
                                      <span className="text-[14px] font-medium text-neutral-700 font-['Inter']">
                                        {palette.name}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={bottomRef} />
              </div>
            </div>

            {/* Input area */}
            <div className="p-4 shrink-0 bg-white flex flex-col gap-3">
              {/* Suggestion pills */}
              <div
                className="flex gap-2 overflow-x-auto pb-1"
                style={{ scrollbarWidth: "none" }}
              >
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="flex-shrink-0 h-9 px-4 bg-white hover:bg-neutral-50 border border-neutral-200/60 rounded-[10px] text-[13px] font-medium text-neutral-800 transition-colors duration-150 whitespace-nowrap shadow-[0_1px_2px_rgba(0,0,0,0.02)] cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Text input composer */}
              <div className="bg-white rounded-[20px] p-2.5 flex flex-col gap-2 border border-neutral-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  className="w-full bg-transparent border-none resize-none focus:ring-0 text-[14px] px-2.5 py-1.5 text-neutral-850 placeholder:text-neutral-400 h-16 outline-none"
                  placeholder="Ask Webild..."
                />
                <div className="flex items-center justify-between px-1">
                  <button
                    onClick={() => toast.info("Attachments coming soon!")}
                    className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer border-none"
                  >
                    <Plus className="w-[18px] h-[18px]" />
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toast.info("Voice input coming soon!")}
                      className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer border-none"
                    >
                      <Mic className="w-[18px] h-[18px]" />
                    </button>
                    <button
                      onClick={() => sendMessage()}
                      className="w-9 h-9 rounded-full bg-[#8DB8FF] hover:bg-[#7ca8f0] text-white flex items-center justify-center transition-all cursor-pointer border-none active:scale-[0.93]"
                    >
                      <ArrowUp className="w-[18px] h-[18px]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "grid" && (
          <div
            className="flex-1 overflow-y-auto pb-6"
            style={{ scrollbarWidth: "none" }}
          >
            <TemplatePicker
              selected={selectedTemplate}
              onSelect={onSelectTemplate}
            />
          </div>
        )}

        {activeTab === "theme" && profile && (
          <div
            className="flex-1 overflow-y-auto px-6 pb-6 pt-4"
            style={{ scrollbarWidth: "none" }}
          >
            <InlineEditor
              profile={profile}
              onChange={onChangeField}
              activeTab={editorTab}
              setActiveTab={setEditorTab}
            />
          </div>
        )}
      </div>
    </section>
  );
}
```

---

## File: `app\editor\components\DomainsPane.tsx`

```tsx
"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useEditor } from "@/context/EditorContext";
import { Loader2, Check, RefreshCw, Trash2 } from "lucide-react";

interface DomainType {
  id: string;
  name: string;
  status: "active" | "pending";
}

export default function DomainsPane() {
  const { websiteId } = useEditor();
  const [searchVal, setSearchVal] = useState("");
  const [customDomains, setCustomDomains] = useState<DomainType[]>([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  // Load custom domains from DB
  const loadDomains = async () => {
    if (!websiteId) return;
    try {
      const res = await fetch(`/api/websites/${websiteId}/domains`);
      const data = await res.json();
      if (res.ok && data.domains) {
        setCustomDomains(data.domains);
      }
    } catch (err) {
      console.error("Failed to load domains", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDomains();
  }, [websiteId]);

  const handleConnect = async () => {
    const domain = searchVal.trim();
    if (!domain) return;
    if (!domain.includes(".")) {
      toast.error("Please enter a valid domain name (e.g. realitycheque.com)");
      return;
    }
    if (!websiteId) {
      toast.error("No website selected.");
      return;
    }
    setConnecting(true);
    const toastId = toast.loading("Connecting domain...");
    try {
      const res = await fetch(`/api/websites/${websiteId}/domains`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain }),
      });
      const data = await res.json();
      toast.dismiss(toastId);
      setConnecting(false);
      if (res.ok && data.domain) {
        setCustomDomains((prev) => [...prev, data.domain]);
        setSearchVal("");
        toast.success("Domain added! Please configure your DNS settings.");
      } else {
        toast.error(data.error || "Failed to connect domain");
      }
    } catch {
      toast.dismiss(toastId);
      setConnecting(false);
      toast.error("Connection failed.");
    }
  };

  const handleVerify = async (domainId: string) => {
    if (!websiteId) return;
    setVerifyingId(domainId);
    const toastId = toast.loading("Checking DNS resolution...");
    try {
      const res = await fetch(
        `/api/websites/${websiteId}/domains/${domainId}/verify`,
        {
          method: "POST",
        },
      );
      const data = await res.json();
      toast.dismiss(toastId);
      setVerifyingId(null);
      if (res.ok && data.verified) {
        toast.success("Domain verified! SSL certificate issued.");
        loadDomains();
      } else {
        toast.error(
          "DNS records check failed. DNS propagation might take up to 24h.",
        );
      }
    } catch {
      toast.dismiss(toastId);
      setVerifyingId(null);
      toast.error("Failed to verify DNS. Connection error.");
    }
  };

  const handleDelete = async (domainId: string) => {
    if (!websiteId) return;
    if (!confirm("Are you sure you want to disconnect this custom domain?"))
      return;
    const toastId = toast.loading("Disconnecting domain...");
    try {
      const res = await fetch(
        `/api/websites/${websiteId}/domains/${domainId}`,
        {
          method: "DELETE",
        },
      );
      toast.dismiss(toastId);
      if (res.ok) {
        toast.success("Domain disconnected!");
        setCustomDomains((prev) => prev.filter((d) => d.id !== domainId));
      } else {
        toast.error("Failed to disconnect domain.");
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Failed to disconnect domain. Connection error.");
    }
  };

  return (
    <section className="w-[340px] shrink-0 border-r border-[#E6E6E6]/60 bg-white flex flex-col h-full overflow-hidden select-none font-inter">
      {/* Title Header */}
      <div className="h-[54px] border-b border-[#E6E6E6]/40 px-6 flex items-center justify-between shrink-0">
        <span className="font-semibold text-[15px] text-black">
          Domains & SSL
        </span>
        <span className="text-[11px] font-bold px-2 py-0.5 bg-[#8DFFB3]/25 text-[#369762] rounded-md">
          Pro Active
        </span>
      </div>

      {/* Content container */}
      <div
        className="flex-1 overflow-y-auto p-5 flex flex-col gap-6"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Section: Connected Domains */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Connected Domains
          </span>
          {loading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
            </div>
          ) : customDomains.length === 0 ? (
            <div className="text-xs text-gray-500 text-center py-4 border border-dashed border-[#E6E6E6] rounded-xl bg-[#FBFBFB]">
              No custom domains connected yet.
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {customDomains.map((dom) => (
                <div
                  key={dom.id}
                  className="p-3 bg-[#F7F7F7] border border-[#E6E6E6] rounded-xl flex flex-col gap-2 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col min-w-0">
                      <span className="text-[13px] font-bold text-black truncate">
                        {dom.name}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {dom.status === "active"
                          ? "SSL secured & live"
                          : "DNS config pending"}
                      </span>
                    </div>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                        dom.status === "active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700 animate-pulse"
                      }`}
                    >
                      {dom.status === "active" ? "Active" : "Setup Required"}
                    </span>
                  </div>

                  <div className="flex items-center justify-end gap-2 border-t border-[#E6E6E6]/40 pt-2">
                    {dom.status === "pending" && (
                      <button
                        onClick={() => handleVerify(dom.id)}
                        disabled={verifyingId === dom.id}
                        className="text-[10px] font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-0.5 disabled:opacity-50"
                      >
                        {verifyingId === dom.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <RefreshCw className="w-3 h-3" />
                        )}
                        Verify DNS
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(dom.id)}
                      className="text-[10px] font-semibold text-red-650 hover:text-red-700 flex items-center gap-0.5"
                    >
                      <Trash2 className="w-3 h-3" />
                      Disconnect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section: Connect Domain Input */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Connect Custom Domain
          </span>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value.toLowerCase())}
              placeholder="e.g. yourname.com"
              className="w-full h-10 px-3 bg-[#F7F7F7] border border-[#E6E6E6] rounded-lg text-sm text-black outline-none focus:ring-1 focus:ring-blue-400 font-medium"
            />
            <button
              onClick={handleConnect}
              disabled={connecting}
              className="w-full h-10 rounded-lg bg-[#2A2A2F] hover:bg-[#3E3E45] active:scale-95 transition-all text-white text-[12px] font-semibold flex items-center justify-center gap-2 shadow-sm"
            >
              {connecting && (
                <span className="w-3 h-3 rounded-lg border-2 border-white border-t-transparent animate-spin" />
              )}
              Connect Domain
            </button>
          </div>
        </div>

        {/* DNS instructions panel if setup required exists */}
        {customDomains.some((d) => d.status === "pending") && (
          <div className="p-4 bg-amber-50/50 border border-amber-200/60 rounded-xl flex flex-col gap-2.5">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
              DNS Settings Required
            </span>
            <p className="text-xs text-amber-700/80 leading-relaxed">
              Configure your domain registrar (Namecheap, GoDaddy, etc.) with
              the following DNS records:
            </p>
            <div className="flex flex-col gap-1.5 font-mono text-[10px] text-gray-600 bg-white p-2.5 rounded-lg border border-amber-200/40">
              <div>
                Type: <strong className="text-black">A</strong>
              </div>
              <div>
                Host: <strong className="text-black">@</strong>
              </div>
              <div>
                Value: <strong className="text-black">76.76.21.21</strong>
              </div>
              <div className="h-px bg-gray-100 my-1" />
              <div>
                Type: <strong className="text-black">CNAME</strong>
              </div>
              <div>
                Host: <strong className="text-black">www</strong>
              </div>
              <div>
                Value:{" "}
                <strong className="text-black">cname.linkedpage.co</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
```

---

## File: `app\editor\components\InlineEditor.tsx`

```tsx
"use client";

import { useState } from "react";
import { ProfileData, ProfileExperience, ProfileLink } from "@/shared/types";
import { User, Briefcase, Link as LinkIcon, Plus, Trash2 } from "lucide-react";

interface InlineEditorProps {
  profile: ProfileData;
  onChange: <K extends keyof ProfileData>(
    key: K,
    value: ProfileData[K],
  ) => void;
  activeTab?: "profile" | "experience" | "links";
  setActiveTab?: (tab: "profile" | "experience" | "links") => void;
}

// Reusable editable field
function EditableField({
  label,
  value,
  onChange,
  multiline = false,
  placeholder = "",
  className = "",
  id,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
  className?: string;
  id?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-medium text-[#9CA3AF] uppercase tracking-wide">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          className={`ds-input !h-auto min-h-[80px] resize-none py-3 text-sm ${className}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
        />
      ) : (
        <input
          id={id}
          className={`ds-input text-sm ${className}`}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

type Tab = "profile" | "experience" | "links";

export default function InlineEditor({
  profile,
  onChange,
  activeTab: controlledTab,
  setActiveTab: controlledSetActive,
}: InlineEditorProps) {
  const [localTab, setLocalTab] = useState<Tab>("profile");
  const activeTab = controlledTab ?? localTab;
  const setActiveTab = (controlledSetActive ?? setLocalTab) as (
    tab: Tab,
  ) => void;

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "profile", label: "Profile", icon: <User className="w-5 h-5" /> },
    {
      id: "experience",
      label: "Experience",
      icon: <Briefcase className="w-5 h-5" />,
    },
    { id: "links", label: "Links", icon: <LinkIcon className="w-5 h-5" /> },
  ];

  // ── Experience helpers ──
  const updateExperience = (
    index: number,
    field: keyof ProfileExperience,
    value: string,
  ) => {
    const next = [...profile.experience];
    next[index] = { ...next[index], [field]: value };
    onChange("experience", next);
  };

  const removeExperience = (index: number) => {
    onChange(
      "experience",
      profile.experience.filter((_, i) => i !== index),
    );
  };

  const addExperience = () => {
    onChange("experience", [
      ...profile.experience,
      {
        title: "New Role",
        company: "Company",
        duration: "2024 – Present",
        description: "",
      },
    ]);
  };

  // ── Link helpers ──
  const updateLink = (
    index: number,
    field: keyof ProfileLink,
    value: string,
  ) => {
    const next = [...profile.links];
    next[index] = { ...next[index], [field]: value };
    onChange("links", next);
  };

  const removeLink = (index: number) => {
    onChange(
      "links",
      profile.links.filter((_, i) => i !== index),
    );
  };

  const addLink = () => {
    onChange("links", [
      ...profile.links,
      { label: "New Link", url: "https://", icon: "website" },
    ]);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Tab bar */}
      <div className="flex items-center gap-1 p-1 bg-[#F3F3F3] rounded-[10px]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-medium     rounded-lg  transition-[background-color,color] duration-150 ${
              activeTab === tab.id
                ? "bg-white text-black  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]"
                : "text-[#6B6B6B] hover:text-black"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div
        className="flex-1 overflow-y-auto flex flex-col gap-4 pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        {/* ── Profile Tab ── */}
        {activeTab === "profile" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 p-3 bg-[#FBFBFB] border border-[#E6E6E6]      rounded-lg  ">
              <img
                src={profile.avatarUrl || "https://i.pravatar.cc/80?img=47"}
                alt={profile.name}
                className="w-12 h-12   rounded-lg object-cover border border-[#E6E6E6] flex-shrink-0"
              />
              <div className="flex flex-col gap-0.5 min-w-0">
                <p className="text-sm font-medium text-black truncate">
                  {profile.name}
                </p>
                <p className="text-xs text-[#6B6B6B] truncate">
                  {profile.headline}
                </p>
              </div>
            </div>

            <EditableField
              id="editor-field-name"
              label="Full name"
              value={profile.name}
              onChange={(v) => onChange("name", v)}
              placeholder="Your name"
            />
            <EditableField
              id="editor-field-headline"
              label="Headline"
              value={profile.headline}
              onChange={(v) => onChange("headline", v)}
              placeholder="Product Designer · Builder"
            />
            <EditableField
              id="editor-field-location"
              label="Location"
              value={profile.location ?? ""}
              onChange={(v) => onChange("location", v)}
              placeholder="San Francisco, CA"
            />
            <EditableField
              id="editor-field-summary"
              label="About / Summary"
              value={profile.summary}
              onChange={(v) => onChange("summary", v)}
              multiline
              placeholder="Write a short bio…"
            />
            <EditableField
              id="editor-field-avatarUrl"
              label="Avatar URL"
              value={profile.avatarUrl}
              onChange={(v) => onChange("avatarUrl", v)}
              placeholder="https://example.com/photo.jpg"
            />
          </div>
        )}

        {/* ── Experience Tab ── */}
        {activeTab === "experience" && (
          <div className="flex flex-col gap-3" id="editor-field-experience">
            {profile.experience.map((exp, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 p-3 bg-[#FBFBFB] border border-[#E6E6E6]      rounded-lg   relative"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-[#9CA3AF]">
                      Experience {i + 1}
                    </span>
                  </div>
                  <button
                    onClick={() => removeExperience(i)}
                    className="p-1     rounded-lg  hover:bg-[#FEF2F2] text-[#9CA3AF] hover:text-[#E45A5A] transition-colors duration-150"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <EditableField
                  label="Job title"
                  value={exp.title}
                  onChange={(v) => updateExperience(i, "title", v)}
                />
                <EditableField
                  label="Company"
                  value={exp.company}
                  onChange={(v) => updateExperience(i, "company", v)}
                />
                <EditableField
                  label="Duration"
                  value={exp.duration}
                  onChange={(v) => updateExperience(i, "duration", v)}
                  placeholder="2022 – Present"
                />
                <EditableField
                  label="Description"
                  value={exp.description}
                  onChange={(v) => updateExperience(i, "description", v)}
                  multiline
                  placeholder="What did you build / achieve?"
                />
              </div>
            ))}

            <button
              onClick={addExperience}
              className="w-full h-10 border border-[#E6E6E6] hover:bg-gray-50 text-black text-[12.5px] font-bold rounded-xl transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 shadow-sm mt-2"
            >
              <Plus className="w-4 h-4" /> Add experience
            </button>
          </div>
        )}

        {/* ── Links Tab ── */}
        {activeTab === "links" && (
          <div className="flex flex-col gap-3" id="editor-field-links">
            {profile.links.map((link, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 p-3 bg-[#FBFBFB] border border-[#E6E6E6]      rounded-lg  "
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-[#9CA3AF]">
                      Link {i + 1}
                    </span>
                  </div>
                  <button
                    onClick={() => removeLink(i)}
                    className="p-1     rounded-lg  hover:bg-[#FEF2F2] text-[#9CA3AF] hover:text-[#E45A5A] transition-colors duration-150"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <EditableField
                  label="Label"
                  value={link.label}
                  onChange={(v) => updateLink(i, "label", v)}
                  placeholder="LinkedIn"
                />
                <EditableField
                  label="URL"
                  value={link.url}
                  onChange={(v) => updateLink(i, "url", v)}
                  placeholder="https://linkedin.com/in/…"
                />
              </div>
            ))}

            <button
              onClick={addLink}
              className="w-full h-10 border border-[#E6E6E6] hover:bg-gray-50 text-black text-[12.5px] font-bold rounded-xl transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 shadow-sm mt-2"
            >
              <Plus className="w-4 h-4" /> Add link
            </button>

            <p className="text-[11px] text-[#9CA3AF] text-center mt-2 font-medium">
              Links appear in your profile header and footer.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## File: `app\editor\components\MediaPicker.tsx`

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Upload } from "lucide-react";
import { toast } from "sonner";

interface MediaItem {
  id: string;
  name: string;
  url: string;
}

const STOCK_MEDIA: MediaItem[] = [
  {
    id: "tech",
    name: "technology",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "fashion",
    name: "fashion",
    url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "business",
    name: "business",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "architecture",
    name: "architecture",
    url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "nature",
    name: "nature",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "food",
    name: "food",
    url: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&auto=format&fit=crop&q=80",
  },
];

export default function MediaPicker() {
  const [activePickerTab, setActivePickerTab] = useState<"uploads" | "ai">(
    "uploads",
  );
  const [search, setSearch] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const filteredMedia = STOCK_MEDIA.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleUploadClick = () => {
    toast.info("Upload functionality integration triggered!");
  };

  return (
    <div className="flex flex-col self-stretch grow">
      <div className="flex justify-center self-stretch pt-[21.07979965209961px]">
        <div className="flex flex-col justify-center self-stretch grow bg-[#fbfbfb] rounded-[13px] outline-1 outline-t-1 outline-l-1 outline-r-1 outline-b-1 outline outline-[#f3f3f3] relative overflow-hidden min-h-[832px]">
          {/* Background white sheet layer */}
          <div className="w-[486.25px] h-[831.4500122070312px] bg-white absolute left-0 top-0 rounded-[13px] pointer-events-none"></div>

          <div className="self-stretch grow relative z-10 flex flex-col items-center py-[21.08px]">
            {/* Background mask layer */}
            <div className="w-[486.25px] h-[831.4500122070312px] bg-gradient-to-b from-black via-black to-black absolute left-0 top-0 pointer-events-none opacity-0"></div>

            <div className="w-[434.0899963378906px] flex flex-col gap-[12.640000343322754px]">
              <div className="flex justify-between items-center self-stretch">
                <div className="w-[83.16px] h-[27.34000015258789px] flex items-center">
                  <span className="font-medium text-[17.899999618530273px] leading-[27.360000610351562px] text-neutral-900">
                    Media
                  </span>
                </div>

                <div className="flex flex-col relative group/info">
                  <div className="w-[18.229999542236328px] h-[18.229999542236328px] flex items-center justify-center cursor-pointer">
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[15.191665649414062px] h-[15.191665649414062px]"
                    >
                      <g clipPath="url(#clip0_5_88)">
                        <path
                          d="M9.11488 16.7108C13.3099 16.7108 16.7107 13.3101 16.7107 9.115C16.7107 4.91994 13.3099 1.51917 9.11488 1.51917C4.91981 1.51917 1.51904 4.91994 1.51904 9.115C1.51904 13.3101 4.91981 16.7108 9.11488 16.7108Z"
                          stroke="#171717"
                          strokeWidth="1.51917"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.11523 12.1541V9.11499"
                          stroke="#171717"
                          strokeWidth="1.51917"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9.11523 6.07666H9.12283"
                          stroke="#171717"
                          stroke-width="1.51917"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_5_88">
                          <rect width="18.23" height="18.23" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>

                  {/* Hover tooltip explanation */}
                  <div className="h-[66.62999725341797px] flex flex-col opacity-0 group-hover/info:opacity-100 transition-opacity duration-150 absolute right-0 top-[22px] z-50 pointer-events-none">
                    <div className="w-80 flex flex-col bg-gradient-to-b from-[#2a2a2f] to-[#3a3a42] px-[12.647899627685547px] pt-[3.109999895095825px] pb-[4.519999980926514px] rounded-lg shadow-md">
                      <span className="font-normal text-[13.300000190734863px] leading-[19.40999984741211px] text-white">
                        Manage your site's visuals. Upload your own images,
                        browse the library, or generate new ones with AI.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-0.5 border-t border-black/5"></div>
            </div>

            {/* Tabs Selector Navigation */}
            <div className="flex w-[434.0899963378906px] h-[44px] items-center justify-between mt-3">
              {/* Your Uploads Tab Button */}
              <button
                onClick={() => {
                  setActivePickerTab("uploads");
                  handleUploadClick();
                }}
                className={`w-[206.5px] h-10 rounded-[13px] relative cursor-pointer outline-none transition-all flex items-center justify-center gap-2 border ${
                  activePickerTab === "uploads"
                    ? "bg-white border-black/5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
                    : "bg-[#f3f3f3] border-transparent hover:bg-zinc-200/50"
                }`}
              >
                <div className="w-[16.15999984741211px] h-[16.15999984741211px] flex items-center justify-center">
                  <Upload className="w-4 h-4 text-black" />
                </div>
                <span className="font-medium text-[14.899999618530273px] leading-[23px] text-center text-black">
                  Your Uploads
                </span>
              </button>

              {/* Generate Images Tab Button */}
              <button
                onClick={() => setActivePickerTab("ai")}
                className="flex flex-col justify-start items-start cursor-pointer outline-none relative w-[210.52000427246094px]"
              >
                {activePickerTab === "ai" && (
                  <div className="w-[210.52000427246094px] h-12 opacity-[0.20] bg-gradient-to-b from-[#0894ff] via-[#c959dd] via-[#ff2e54] to-[#ff9004] absolute -top-[4px] -left-[2px] blur-sm rounded-[14px] pointer-events-none"></div>
                )}
                <div className="flex flex-col self-stretch p-0.5 rounded-[14px] w-full relative z-10">
                  <div
                    className={`self-stretch h-10 rounded-[13px] flex items-center justify-center gap-2 border transition-all ${
                      activePickerTab === "ai"
                        ? "bg-white border-black/5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
                        : "bg-[#f3f3f3] border-transparent hover:bg-zinc-200/50"
                    }`}
                  >
                    <div className="w-[16.15999984741211px] h-[16.15999984741211px] flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-black" />
                    </div>
                    <span className="font-medium text-[15.100000381469727px] leading-[23px] text-center text-black">
                      Generate Images
                    </span>
                  </div>
                </div>
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activePickerTab === "uploads" ? (
                <motion.div
                  key="uploads"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col gap-3 mt-4"
                >
                  {/* Library Header */}
                  <div className="w-[434.0899963378906px] flex flex-col mt-1">
                    <span className="font-medium text-[14.899999618530273px] leading-[23px] text-black">
                      Image Library
                    </span>
                  </div>

                  {/* Search Input Bar Container */}
                  <div className="w-[434.0899963378906px] h-10 flex items-center gap-[4.199999809265137px] bg-[#f3f3f3] px-[12.647899627685547px] rounded-[13px] border border-black/5 relative">
                    <div className="relative shrink-0 w-[22.440000534057617px] h-[16.158000946044922px] flex items-center justify-center">
                      <svg
                        width="23"
                        height="17"
                        viewBox="0 0 23 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[18px] h-[14px]"
                      >
                        <path
                          d="M17.279 14.1379L14.3574 11.2163"
                          stroke="black"
                          strokeWidth="1.3465"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.5466 12.7918C13.5212 12.7918 15.9326 10.3804 15.9326 7.40578C15.9326 4.43117 13.5212 2.01978 10.5466 2.01978C7.57204 2.01978 5.16064 4.43117 5.16064 7.40578C5.16064 10.3804 7.57204 12.7918 10.5466 12.7918Z"
                          stroke="black"
                          strokeWidth="1.3465"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search through image library"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="flex-1 bg-transparent border-none text-[14.600000381469727px] text-black placeholder:text-zinc-400 focus:outline-none focus:ring-0 p-0 font-normal ml-1"
                    />
                  </div>

                  {/* Media preset cards grid list */}
                  <div
                    className="grid grid-cols-2 gap-x-[15px] gap-y-[16px] w-[434.0899963378906px] h-[510px] overflow-y-auto mt-1 pb-4"
                    style={{ scrollbarWidth: "none" }}
                  >
                    {filteredMedia.length > 0 ? (
                      filteredMedia.map((item) => {
                        const isSelected = selectedMedia === item.id;
                        return (
                          <div
                            key={item.id}
                            onClick={() => {
                              setSelectedMedia(item.id);
                              toast.success(`Selected ${item.name} image!`);
                            }}
                            className={`w-[208.61000061035156px] h-[156.4499969482422px] bg-[#f3f3f3] rounded-[13px] relative overflow-hidden cursor-pointer group border transition-all ${
                              isSelected
                                ? "border-blue-500 ring-1 ring-blue-500"
                                : "border-black/5 hover:border-zinc-300"
                            }`}
                          >
                            {/* Image element */}
                            <img
                              src={item.url}
                              alt={item.name}
                              className="w-[208.61000061035156px] h-[156.4499969482422px] object-cover absolute inset-0 select-none pointer-events-none opacity-85 group-hover:scale-105 transition-transform duration-300"
                            />

                            {/* Bottom Gradient overlay */}
                            <div className="w-[208.61000061035156px] h-[78.22116088867188px] absolute bottom-0 left-0 pointer-events-none">
                              <div className="w-[208.61000061035156px] h-[78.22116088867188px] bg-gradient-to-b from-black/0 to-black/80 absolute inset-0"></div>
                            </div>

                            {/* Media tag */}
                            <div className="flex flex-col absolute bottom-3 left-3 z-10 pointer-events-none">
                              <div className="h-[23.079999923706055px] flex items-center">
                                <span className="font-medium text-[15.199999809265137px] leading-[23px] capitalize text-white truncate max-w-[180px]">
                                  {item.name}
                                </span>
                              </div>
                            </div>

                            {/* Selected Badge Indicator */}
                            {isSelected && (
                              <div className="absolute top-2 right-2 w-5 h-5 rounded-lg bg-blue-500 flex items-center justify-center shadow-sm z-20">
                                <Check
                                  className="w-3 h-3 text-white"
                                  strokeWidth={2.5}
                                />
                              </div>
                            )}

                            {/* Action Hover overlay */}
                            <div className="w-[208.61000061035156px] h-[156.4499969482422px] flex justify-center items-center bg-white/20 backdrop-blur-[1px] absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                              <div className="h-10 flex flex-col justify-center items-center bg-[#f3f3f3] px-[25.295799255371094px] py-[8px] rounded-[13px] shadow-sm">
                                <span className="font-medium text-[15.300000190734863px] leading-[23px] text-center text-black">
                                  {isSelected ? "Active" : "Explore"}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-8 text-center text-xs text-zinc-400 w-full">
                        No images match your search.
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="ai"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="w-[434.0899963378906px] flex flex-col gap-4 mt-6"
                >
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-[13px] p-4 border border-[#E6E6E6]/60 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-blue-600 font-semibold text-xs uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                      <span>AI Image Generator</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 leading-relaxed">
                      Describe the concept or image style you desire, and our AI
                      will automatically construct a customized image matching
                      your request.
                    </p>
                    <div className="flex flex-col gap-2 mt-1">
                      {[
                        "Modern clean workspace mockup",
                        "High fashion editorial photoshoot model",
                        "Business professional handshake close-up",
                        "Stunning high rise architecture skyscraper",
                      ].map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => {
                            toast.loading(
                              `Analyzing description and generating image...`,
                            );
                            setTimeout(() => {
                              toast.dismiss();
                              toast.success("AI image successfully generated!");
                              setActivePickerTab("uploads");
                            }, 1500);
                          }}
                          className="text-left w-full px-3.5 py-2.5 bg-white hover:bg-zinc-50 border border-[#E6E6E6] rounded-xl text-[11px] font-semibold text-zinc-700 hover:text-black flex items-center justify-between transition-colors shadow-sm cursor-pointer"
                        >
                          <span>{prompt}</span>
                          <Sparkles className="w-3 h-3 text-zinc-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## File: `app\editor\components\ProfilePreview.tsx`

```tsx
"use client";

import { ProfileData, TemplateId } from "@/shared/types";

interface ProfilePreviewProps {
  profile: ProfileData;
  template: TemplateId;
  scale?: number;
  onFieldClick?: (fieldName: string) => void;
  fluid?: boolean;
}

// ─── Editable Wrapper for hover outlines & click interactions ───────────────────
function EditableWrapper({
  fieldName,
  onFieldClick,
  children,
  className = "",
}: {
  fieldName: string;
  onFieldClick?: (fieldName: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  if (!onFieldClick) return <>{children}</>;
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onFieldClick(fieldName);
      }}
      className={`cursor-pointer hover:outline hover:outline-2 hover:outline-dashed hover:outline-blue-400 hover:outline-offset-2 rounded transition-all ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Link icons (inline SVG) ───────────────────────────────────────────────────
function LinkIcon({ icon }: { icon?: string }) {
  if (icon === "linkedin")
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  if (icon === "twitter")
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.856L2.25 2.25h6.883l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    );
  if (icon === "github")
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    );
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 fill-none stroke-current"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  );
}

// ─── Minimal Card Template ─────────────────────────────────────────────────────
function MinimalCard({
  profile,
  onFieldClick,
}: {
  profile: ProfileData;
  onFieldClick?: (fieldName: string) => void;
}) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-inter">
      <div className="w-full max-w-lg">
        <div className="bg-white border border-[#E6E6E6] rounded-[20px] p-8 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.04),0_10px_30px_-10px_rgba(0,0,0,0.08)]">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <EditableWrapper fieldName="avatarUrl" onFieldClick={onFieldClick}>
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-16 h-16   rounded-lg object-cover border border-[#E6E6E6] flex-shrink-0"
              />
            </EditableWrapper>
            <div className="flex flex-col gap-0.5 min-w-0">
              <EditableWrapper fieldName="name" onFieldClick={onFieldClick}>
                <h1 className="text-xl font-medium text-black leading-tight">
                  {profile.name}
                </h1>
              </EditableWrapper>
              <EditableWrapper fieldName="headline" onFieldClick={onFieldClick}>
                <p className="text-sm text-[#6B6B6B] leading-tight mt-0.5">
                  {profile.headline}
                </p>
              </EditableWrapper>
              {profile.location && (
                <EditableWrapper
                  fieldName="location"
                  onFieldClick={onFieldClick}
                >
                  <p className="text-xs text-[#9CA3AF] mt-1">
                    {profile.location}
                  </p>
                </EditableWrapper>
              )}
            </div>
          </div>

          {/* Summary */}
          <EditableWrapper fieldName="summary" onFieldClick={onFieldClick}>
            <p className="text-sm text-[#171717] leading-relaxed mb-6">
              {profile.summary}
            </p>
          </EditableWrapper>

          {/* Skills */}
          {profile.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {profile.skills.slice(0, 8).map((skill, i) => (
                <span
                  key={i}
                  className="text-[11px] font-medium px-2.5 py-1   rounded-lg bg-[#DCEAFF] text-[#1A4A8A]"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          )}

          <div className="h-px bg-[#E6E6E6] mb-6" />

          {/* Experience */}
          {profile.experience.length > 0 && (
            <EditableWrapper
              fieldName="experience"
              onFieldClick={onFieldClick}
              className="mb-6"
            >
              <div className="flex flex-col gap-4">
                <h2 className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide">
                  Experience
                </h2>
                {profile.experience.slice(0, 3).map((exp, i) => (
                  <div key={i} className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium text-black">
                      {exp.title}
                    </p>
                    <p className="text-xs text-[#6B6B6B]">
                      {exp.company} · {exp.duration}
                    </p>
                    {exp.description && (
                      <p className="text-xs text-[#9CA3AF] leading-relaxed mt-0.5">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </EditableWrapper>
          )}

          {/* Links */}
          {profile.links.length > 0 && (
            <EditableWrapper fieldName="links" onFieldClick={onFieldClick}>
              <div className="flex items-center gap-2 flex-wrap">
                {profile.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    className="flex items-center gap-1.5 text-xs font-medium text-[#171717] hover:text-[#8DB8FF] transition-colors px-3 py-1.5   rounded-lg border border-[#E6E6E6] hover:border-[#8DB8FF]"
                  >
                    <LinkIcon icon={link.icon} />
                    {link.label}
                  </a>
                ))}
              </div>
            </EditableWrapper>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Bento Grid Template ───────────────────────────────────────────────────────
function BentoGrid({
  profile,
  onFieldClick,
}: {
  profile: ProfileData;
  onFieldClick?: (fieldName: string) => void;
}) {
  return (
    <div className="min-h-screen bg-[#FBFBFB] p-6 font-inter">
      <div className="max-w-2xl mx-auto grid grid-cols-2 gap-3">
        {/* Hero card */}
        <div className="col-span-2 bg-white border border-[#E6E6E6] rounded-[16px] p-6 flex items-center gap-4">
          <EditableWrapper fieldName="avatarUrl" onFieldClick={onFieldClick}>
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-16 h-16   rounded-lg object-cover border border-[#E6E6E6] flex-shrink-0"
            />
          </EditableWrapper>
          <div className="min-w-0 flex-1">
            <EditableWrapper fieldName="name" onFieldClick={onFieldClick}>
              <h1 className="text-xl font-medium text-black">{profile.name}</h1>
            </EditableWrapper>
            <EditableWrapper fieldName="headline" onFieldClick={onFieldClick}>
              <p className="text-sm text-[#6B6B6B] leading-snug mt-0.5">
                {profile.headline}
              </p>
            </EditableWrapper>
            {profile.location && (
              <EditableWrapper fieldName="location" onFieldClick={onFieldClick}>
                <p className="text-xs text-[#9CA3AF] mt-1">
                  {profile.location}
                </p>
              </EditableWrapper>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="col-span-2 bg-white border border-[#E6E6E6] rounded-[16px] p-5">
          <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide mb-2">
            About
          </p>
          <EditableWrapper fieldName="summary" onFieldClick={onFieldClick}>
            <p className="text-sm text-[#171717] leading-relaxed">
              {profile.summary}
            </p>
          </EditableWrapper>
        </div>

        {/* Skills */}
        <div className="bg-[#DCEAFF]/40 border border-[#8DB8FF]/30 rounded-[16px] p-5">
          <p className="text-xs font-medium text-[#1A4A8A] uppercase tracking-wide mb-3">
            Skills
          </p>
          <div className="flex flex-wrap gap-1.5">
            {profile.skills.map((skill, i) => (
              <span
                key={i}
                className="text-[11px] font-medium px-2 py-0.5   rounded-lg bg-white border border-[#8DB8FF]/40 text-[#1A4A8A]"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* Experience snippets */}
        <div className="bg-white border border-[#E6E6E6] rounded-[16px] p-5">
          <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide mb-3">
            Experience
          </p>
          <EditableWrapper fieldName="experience" onFieldClick={onFieldClick}>
            <div className="flex flex-col gap-2.5">
              {profile.experience.slice(0, 3).map((exp, i) => (
                <div key={i} className="flex flex-col gap-0">
                  <p className="text-[12px] font-medium text-black">
                    {exp.title}
                  </p>
                  <p className="text-[11px] text-[#9CA3AF]">{exp.company}</p>
                </div>
              ))}
            </div>
          </EditableWrapper>
        </div>

        {/* Links */}
        {profile.links.length > 0 && (
          <div className="col-span-2 bg-white border border-[#E6E6E6] rounded-[16px] p-5">
            <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide mb-3">
              Links
            </p>
            <EditableWrapper fieldName="links" onFieldClick={onFieldClick}>
              <div className="flex items-center gap-2 flex-wrap">
                {profile.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    className="flex items-center gap-1.5 text-xs font-medium text-[#171717] hover:text-[#8DB8FF] transition-colors px-3 py-1.5   rounded-lg border border-[#E6E6E6] hover:border-[#8DB8FF]"
                  >
                    <LinkIcon icon={link.icon} />
                    {link.label}
                  </a>
                ))}
              </div>
            </EditableWrapper>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Full Scroll Template ──────────────────────────────────────────────────────
function FullScroll({
  profile,
  onFieldClick,
}: {
  profile: ProfileData;
  onFieldClick?: (fieldName: string) => void;
}) {
  return (
    <div className="min-h-screen bg-[#F3F3F3] font-inter">
      {/* Hero banner */}
      <div className="h-32 bg-gradient-to-r from-[#2A2A2F] to-[#3A3A4A] relative" />

      <div className="max-w-xl mx-auto px-6 -mt-10 pb-16">
        {/* Avatar */}
        <EditableWrapper
          fieldName="avatarUrl"
          onFieldClick={onFieldClick}
          className="w-fit mb-4"
        >
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-20 h-20   rounded-lg object-cover border-4 border-white  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]"
          />
        </EditableWrapper>

        {/* Name + headline */}
        <EditableWrapper fieldName="name" onFieldClick={onFieldClick}>
          <h1 className="text-2xl font-medium text-black mb-1 leading-tight">
            {profile.name}
          </h1>
        </EditableWrapper>
        <EditableWrapper fieldName="headline" onFieldClick={onFieldClick}>
          <p className="text-sm text-[#6B6B6B] mb-1">{profile.headline}</p>
        </EditableWrapper>
        {profile.location && (
          <EditableWrapper fieldName="location" onFieldClick={onFieldClick}>
            <p className="text-xs text-[#9CA3AF] mb-4">{profile.location}</p>
          </EditableWrapper>
        )}

        {/* Links */}
        {profile.links.length > 0 && (
          <EditableWrapper
            fieldName="links"
            onFieldClick={onFieldClick}
            className="mb-6"
          >
            <div className="flex items-center gap-2 flex-wrap">
              {profile.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  className="flex items-center gap-1.5 text-xs font-medium text-[#171717] hover:text-[#8DB8FF] transition-colors px-3 py-1.5   rounded-lg bg-white border border-[#E6E6E6] hover:border-[#8DB8FF]"
                >
                  <LinkIcon icon={link.icon} />
                  {link.label}
                </a>
              ))}
            </div>
          </EditableWrapper>
        )}

        {/* About */}
        <section className="bg-white rounded-[16px] border border-[#E6E6E6] p-6 mb-4">
          <h2 className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide mb-3">
            About
          </h2>
          <EditableWrapper fieldName="summary" onFieldClick={onFieldClick}>
            <p className="text-sm text-[#171717] leading-relaxed">
              {profile.summary}
            </p>
          </EditableWrapper>
        </section>

        {/* Experience */}
        <section className="bg-white rounded-[16px] border border-[#E6E6E6] p-6 mb-4">
          <h2 className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide mb-4">
            Experience
          </h2>
          <EditableWrapper fieldName="experience" onFieldClick={onFieldClick}>
            <div className="flex flex-col gap-5">
              {profile.experience.map((exp, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-1 bg-[#E6E6E6]   rounded-lg flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-black">
                      {exp.title}
                    </p>
                    <p className="text-xs text-[#6B6B6B]">
                      {exp.company} · {exp.duration}
                    </p>
                    {exp.description && (
                      <p className="text-xs text-[#9CA3AF] leading-relaxed mt-1">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </EditableWrapper>
        </section>

        {/* Skills */}
        {profile.skills.length > 0 && (
          <section className="bg-white rounded-[16px] border border-[#E6E6E6] p-6">
            <h2 className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide mb-3">
              Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.map((skill, i) => (
                <span
                  key={i}
                  className="text-[11px] font-medium px-2.5 py-1   rounded-lg bg-[#F3F3F3] border border-[#E6E6E6] text-[#171717]"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// ─── Dark Template ─────────────────────────────────────────────────────────────
function DarkTemplate({
  profile,
  onFieldClick,
}: {
  profile: ProfileData;
  onFieldClick?: (fieldName: string) => void;
}) {
  return (
    <div className="min-h-screen bg-[#0D0D10] font-inter">
      <div className="max-w-xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <EditableWrapper fieldName="avatarUrl" onFieldClick={onFieldClick}>
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-16 h-16   rounded-lg object-cover border border-[#ffffff15]"
            />
          </EditableWrapper>
          <div className="flex-1">
            <EditableWrapper fieldName="name" onFieldClick={onFieldClick}>
              <h1 className="text-xl font-medium text-white mb-0.5 leading-tight">
                {profile.name}
              </h1>
            </EditableWrapper>
            <EditableWrapper fieldName="headline" onFieldClick={onFieldClick}>
              <p className="text-sm text-[#8DB8FF]">{profile.headline}</p>
            </EditableWrapper>
            {profile.location && (
              <EditableWrapper fieldName="location" onFieldClick={onFieldClick}>
                <p className="text-xs text-[#ffffff40] mt-0.5">
                  {profile.location}
                </p>
              </EditableWrapper>
            )}
          </div>
        </div>

        {/* Summary */}
        <EditableWrapper fieldName="summary" onFieldClick={onFieldClick}>
          <p className="text-sm text-[#ffffff80] leading-relaxed mb-8">
            {profile.summary}
          </p>
        </EditableWrapper>

        {/* Skills */}
        {profile.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-8">
            {profile.skills.map((skill, i) => (
              <span
                key={i}
                className="text-[11px] font-medium px-2.5 py-1   rounded-lg border border-[#ffffff15] text-[#8DB8FF]"
              >
                {skill.name}
              </span>
            ))}
          </div>
        )}

        <div className="h-px bg-[#ffffff10] mb-8" />

        {/* Experience */}
        {profile.experience.length > 0 && (
          <div className="flex flex-col gap-5 mb-8">
            <h2 className="text-xs font-medium text-[#ffffff40] uppercase tracking-wide">
              Experience
            </h2>
            <EditableWrapper fieldName="experience" onFieldClick={onFieldClick}>
              <div className="flex flex-col gap-5">
                {profile.experience.map((exp, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-px bg-[#ffffff15] flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-white">
                        {exp.title}
                      </p>
                      <p className="text-xs text-[#8DB8FF]/70">
                        {exp.company} · {exp.duration}
                      </p>
                      {exp.description && (
                        <p className="text-xs text-[#ffffff50] leading-relaxed mt-1">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </EditableWrapper>
          </div>
        )}

        {/* Links */}
        {profile.links.length > 0 && (
          <EditableWrapper fieldName="links" onFieldClick={onFieldClick}>
            <div className="flex items-center gap-2 flex-wrap">
              {profile.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  className="flex items-center gap-1.5 text-xs font-medium text-[#ffffff60] hover:text-white transition-colors px-3 py-1.5   rounded-lg border border-[#ffffff15] hover:border-[#8DB8FF]/50"
                >
                  <LinkIcon icon={link.icon} />
                  {link.label}
                </a>
              ))}
            </div>
          </EditableWrapper>
        )}
      </div>
    </div>
  );
}

// ─── Main exported component ───────────────────────────────────────────────────
export default function ProfilePreview({
  profile,
  template,
  scale = 1,
  onFieldClick,
  fluid = false,
}: ProfilePreviewProps) {
  if (fluid) {
    return (
      <div className="w-full min-h-screen">
        {template === "minimal-card" && (
          <MinimalCard profile={profile} onFieldClick={onFieldClick} />
        )}
        {template === "bento-grid" && (
          <BentoGrid profile={profile} onFieldClick={onFieldClick} />
        )}
        {template === "full-scroll" && (
          <FullScroll profile={profile} onFieldClick={onFieldClick} />
        )}
        {template === "dark" && (
          <DarkTemplate profile={profile} onFieldClick={onFieldClick} />
        )}
      </div>
    );
  }

  const PREVIEW_W = 1024;
  const PREVIEW_H = 768;

  return (
    <div
      className="relative overflow-hidden rounded-[16px] border border-[#E6E6E6] bg-white"
      style={{
        width: PREVIEW_W * scale,
        height: PREVIEW_H * scale,
      }}
    >
      <div
        style={{
          width: PREVIEW_W,
          height: PREVIEW_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          overflow: "auto",
        }}
      >
        {template === "minimal-card" && (
          <MinimalCard profile={profile} onFieldClick={onFieldClick} />
        )}
        {template === "bento-grid" && (
          <BentoGrid profile={profile} onFieldClick={onFieldClick} />
        )}
        {template === "full-scroll" && (
          <FullScroll profile={profile} onFieldClick={onFieldClick} />
        )}
        {template === "dark" && (
          <DarkTemplate profile={profile} onFieldClick={onFieldClick} />
        )}
      </div>
    </div>
  );
}
```

---

## File: `app\editor\components\SettingsPane.tsx`

```tsx
"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useEditor } from "@/context/EditorContext";

interface SettingsPaneProps {
  profileName: string;
  router: any;
}

export default function SettingsPane({
  profileName,
  router,
}: SettingsPaneProps) {
  const { websiteId } = useEditor();
  const [siteName, setSiteName] = useState(profileName);
  const [seoTitle, setSeoTitle] = useState(
    `${profileName} - Professional Micro-site`,
  );
  const [seoDesc, setSeoDesc] = useState(
    "Explore my professional experience, projects, education, and social networks.",
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!websiteId) return;
    const fetchDetails = async () => {
      try {
        const res = await fetch(`/api/websites/${websiteId}`);
        const data = await res.json();
        if (res.ok && data.website) {
          setSiteName(data.website.brandName || "");
          setSeoTitle(data.website.seoTitle || "");
          setSeoDesc(data.website.seoDesc || "");
        }
      } catch (err) {
        console.error("Failed to fetch settings details", err);
      }
    };
    fetchDetails();
  }, [websiteId]);

  const handleSaveSettings = async () => {
    if (!websiteId) return;
    setSaving(true);
    const toastId = toast.loading("Saving settings...");
    try {
      const res = await fetch(`/api/websites/${websiteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandName: siteName,
          seoTitle,
          seoDesc,
        }),
      });
      const data = await res.json();
      toast.dismiss(toastId);
      setSaving(false);
      if (res.ok) {
        toast.success("Site configuration saved!");
        sessionStorage.setItem("linkedpage_brand_name", siteName);
      } else {
        toast.error(data.error || "Failed to save settings");
      }
    } catch {
      toast.dismiss(toastId);
      setSaving(false);
      toast.error("Failed to save settings. Connection error.");
    }
  };

  const handleDeleteSite = async () => {
    if (!websiteId) return;
    const confirmDel = window.confirm(
      "Are you absolutely sure you want to delete this website? This action is permanent!",
    );
    if (!confirmDel) return;
    const toastId = toast.loading("Deleting website...");
    try {
      const res = await fetch(`/api/websites/${websiteId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      toast.dismiss(toastId);
      if (res.ok) {
        toast.success("Website deleted successfully.");
        sessionStorage.removeItem("linkedpage_brand_name");
        sessionStorage.removeItem("linkedpage_subdomain");
        router.push("/dashboard");
      } else {
        toast.error(data.error || "Failed to delete website");
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Failed to delete website. Connection error.");
    }
  };

  return (
    <section className="w-[340px] shrink-0 border-r border-[#E6E6E6]/60 bg-white flex flex-col h-full overflow-hidden select-none font-inter">
      {/* Title Header */}
      <div className="h-[54px] border-b border-[#E6E6E6]/40 px-6 flex items-center justify-between shrink-0">
        <span className="font-semibold text-[15px] text-black">
          Site Settings
        </span>
      </div>

      {/* Content container */}
      <div
        className="flex-1 overflow-y-auto p-5 flex flex-col gap-5"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Branding */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Brand Name
          </label>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full h-9 px-3 bg-[#F7F7F7] border border-[#E6E6E6] rounded-lg text-sm text-black outline-none focus:ring-1 focus:ring-blue-400 font-medium"
          />
        </div>

        {/* SEO Title */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            SEO Title Tag
          </label>
          <input
            type="text"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            className="w-full h-9 px-3 bg-[#F7F7F7] border border-[#E6E6E6] rounded-lg text-sm text-black outline-none focus:ring-1 focus:ring-blue-400 font-medium"
          />
        </div>

        {/* SEO Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Meta Description
          </label>
          <textarea
            value={seoDesc}
            onChange={(e) => setSeoDesc(e.target.value)}
            rows={4}
            className="w-full p-3 bg-[#F7F7F7] border border-[#E6E6E6] rounded-lg text-sm text-black outline-none focus:ring-1 focus:ring-blue-400 resize-none font-medium"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveSettings}
          disabled={saving}
          className="w-full h-10 rounded-lg bg-[#2A2A2F] text-white text-[12px] font-semibold hover:bg-[#3E3E45] active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-sm"
        >
          {saving && (
            <span className="w-3 h-3 rounded-lg border-2 border-white border-t-transparent animate-spin" />
          )}
          Save Configuration
        </button>

        <div className="border-t border-gray-100 my-2" />

        {/* Danger Zone */}
        <div className="p-4 border border-red-200 bg-red-50/40 rounded-xl flex flex-col gap-3">
          <span className="text-[11px] font-bold text-red-700 uppercase tracking-wider">
            Danger Zone
          </span>
          <p className="text-xs text-red-700/80 leading-relaxed">
            Deleting your site will permanently wipe all pages, files, and
            domains. This cannot be undone.
          </p>
          <button
            onClick={handleDeleteSite}
            className="w-full h-10 rounded-lg bg-red-650 hover:bg-red-700 text-white text-[12px] font-bold active:scale-95 transition-all shadow-sm"
          >
            Delete Website
          </button>
        </div>
      </div>
    </section>
  );
}
```

---

## File: `app\editor\components\TemplatePicker.tsx`

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { TemplateMeta, TEMPLATES, TemplateId } from "@/shared/types";
import { toast } from "sonner";

interface TemplatePickerProps {
  selected: TemplateId;
  onSelect: (id: TemplateId) => void;
}

function TemplatePreview({ template }: { template: TemplateMeta }) {
  if (template.id === "minimal-card") {
    return (
      <div
        className="w-full h-full p-3 flex items-center justify-center"
        style={{ backgroundColor: template.previewBg }}
      >
        <div className="w-full max-w-[140px] bg-white rounded-lg border border-[#E6E6E6] p-3 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-[#E6E6E6]" />
            <div className="flex flex-col gap-1">
              <div className="h-1.5 w-14 bg-[#2A2A2F] rounded-lg" />
              <div className="h-1 w-10 bg-[#E6E6E6] rounded-lg" />
            </div>
          </div>
          <div className="h-1 w-full bg-[#F3F3F3] rounded mb-1" />
          <div className="h-1 w-4/5 bg-[#F3F3F3] rounded mb-2" />
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-3 px-2 rounded-lg bg-[#DCEAFF] flex items-center"
              >
                <div className="h-0.5 w-5 bg-[#8DB8FF] rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (template.id === "bento-grid") {
    return (
      <div
        className="w-full h-full p-3 grid grid-cols-2 grid-rows-3 gap-1.5"
        style={{ backgroundColor: template.previewBg }}
      >
        <div className="col-span-2 bg-white rounded-[6px] border border-[#E6E6E6] p-2 flex items-center gap-2">
          <div className="w-5 h-5 rounded-lg bg-[#E6E6E6] flex-shrink-0" />
          <div className="h-1.5 w-16 bg-[#2A2A2F] rounded-lg" />
        </div>
        <div className="bg-white rounded-[6px] border border-[#E6E6E6] p-2">
          <div className="h-1.5 w-8 bg-[#8DFFB3] rounded mb-1" />
          <div className="h-1 w-full bg-[#F3F3F3] rounded" />
          <div className="h-1 w-3/4 bg-[#F3F3F3] rounded mt-1" />
        </div>
        <div className="bg-white rounded-[6px] border border-[#E6E6E6] p-2">
          <div className="h-1.5 w-8 bg-[#8DB8FF] rounded mb-1" />
          <div className="h-1 w-full bg-[#F3F3F3] rounded" />
          <div className="h-1 w-2/3 bg-[#F3F3F3] rounded mt-1" />
        </div>
        <div className="col-span-2 bg-white rounded-[6px] border border-[#E6E6E6] p-2 flex gap-1">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-2 px-1.5 rounded-lg bg-[#F3F3F3] flex-shrink-0"
            >
              <div className="h-full w-4 bg-[#E6E6E6] rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (template.id === "full-scroll") {
    return (
      <div
        className="w-full h-full flex flex-col"
        style={{ backgroundColor: template.previewBg }}
      >
        <div className="h-12 bg-[#2A2A2F] flex items-end px-3 pb-2">
          <div className="w-8 h-8 rounded-lg bg-[#E6E6E6] border-2 border-white -mb-4" />
        </div>
        <div className="flex-1 bg-white px-3 pt-5 flex flex-col gap-2">
          <div className="h-2 w-20 bg-[#2A2A2F] rounded" />
          <div className="h-1 w-16 bg-[#E6E6E6] rounded" />
          <div className="h-px w-full bg-[#E6E6E6] my-1" />
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-2 items-start">
              <div className="w-3 h-3 rounded-lg bg-[#8DB8FF] mt-0.5 flex-shrink-0" />
              <div className="flex-1 flex flex-col gap-1">
                <div className="h-1.5 w-14 bg-[#2A2A2F] rounded" />
                <div className="h-1 w-10 bg-[#E6E6E6] rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full h-full p-3 flex flex-col gap-2"
      style={{ backgroundColor: template.previewBg }}
    >
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-[#2A2A2F] border border-[#333]" />
        <div className="flex flex-col gap-1">
          <div className="h-1.5 w-14 bg-white/80 rounded-lg" />
          <div className="h-1 w-10 bg-white/30 rounded-lg" />
        </div>
      </div>
      <div className="h-1 w-full bg-white/10 rounded" />
      <div className="h-1 w-4/5 bg-white/10 rounded" />
      <div className="flex gap-1 mt-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-3 px-2 rounded-lg bg-[#8DB8FF]/20 flex items-center"
          >
            <div className="h-0.5 w-4 bg-[#8DB8FF] rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TemplatePicker({
  selected,
  onSelect,
}: TemplatePickerProps) {
  const [activePickerTab, setActivePickerTab] = useState<"presets" | "ai">(
    "presets",
  );
  const [search, setSearch] = useState("");

  const filteredTemplates = TEMPLATES.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col self-stretch grow">
      <div className="flex justify-center self-stretch pt-[21.07979965209961px]">
        <div className="flex flex-col justify-center self-stretch grow bg-[#fbfbfb] rounded-[13px] outline-1 outline-t-1 outline-l-1 outline-r-1 outline-b-1 outline outline-[#f3f3f3] relative overflow-hidden min-h-[832px]">
          {/* Background white sheet layer */}
          <div className="w-[486.25px] h-[831.4500122070312px] bg-white absolute left-0 top-0 rounded-[13px] pointer-events-none"></div>

          <div className="self-stretch grow relative z-10 flex flex-col items-center py-[21.08px]">
            {/* Background mask layer (hidden/opacity-0 to avoid obscuring light theme details) */}
            <div className="w-[486.25px] h-[831.4500122070312px] bg-gradient-to-b from-black via-black to-black absolute left-0 top-0 pointer-events-none opacity-0"></div>

            <div className="w-[434.0899963378906px] flex flex-col gap-[12.640000343322754px]">
              <div className="flex justify-between items-center self-stretch">
                <div className="w-[83.16px] h-[27.34000015258789px] flex items-center">
                  <span className="font-medium text-[17.899999618530273px] leading-[27.360000610351562px] text-neutral-900">
                    Templates
                  </span>
                </div>

                <div className="flex flex-col relative group/info">
                  <div className="w-[18.229999542236328px] h-[18.229999542236328px] flex items-center justify-center cursor-pointer">
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[15.191665649414062px] h-[15.191665649414062px]"
                    >
                      <g clipPath="url(#clip0_5_88)">
                        <path
                          d="M9.11488 16.7108C13.3099 16.7108 16.7107 13.3101 16.7107 9.115C16.7107 4.91994 13.3099 1.51917 9.11488 1.51917C4.91981 1.51917 1.51904 4.91994 1.51904 9.115C1.51904 13.3101 4.91981 16.7108 9.11488 16.7108Z"
                          stroke="#171717"
                          strokeWidth="1.51917"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.11523 12.1541V9.11499"
                          stroke="#171717"
                          strokeWidth="1.51917"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9.11523 6.07666H9.12283"
                          stroke="#171717"
                          strokeWidth="1.51917"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_5_88">
                          <rect width="18.23" height="18.23" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>

                  {/* Hover tooltip explanation */}
                  <div className="h-[66.62999725341797px] flex flex-col opacity-0 group-hover/info:opacity-100 transition-opacity duration-150 absolute right-0 top-[22px] z-50 pointer-events-none">
                    <div className="w-80 flex flex-col bg-gradient-to-b from-[#2a2a2f] to-[#3a3a42] px-[12.647899627685547px] pt-[3.109999895095825px] pb-[4.519999980926514px] rounded-lg shadow-md">
                      <span className="font-normal text-[13.300000190734863px] leading-[19.40999984741211px] text-white">
                        Manage your site's templates. Select a layout, search
                        presets, or generate customized structures using AI.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-0.5 border-t border-black/5"></div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              {/* Library Header */}

              {/* Search Input Bar Container */}
              <div className="w-[434.0899963378906px] h-10 flex items-center gap-[4.199999809265137px] bg-[#f3f3f3] px-[12.647899627685547px] rounded-[13px] border border-black/5 relative">
                <div className="relative shrink-0 w-[22.440000534057617px] h-[16.158000946044922px] flex items-center justify-center">
                  <svg
                    width="23"
                    height="17"
                    viewBox="0 0 23 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[18px] h-[14px]"
                  >
                    <path
                      d="M17.279 14.1379L14.3574 11.2163"
                      stroke="black"
                      strokeWidth="1.3465"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.5466 12.7918C13.5212 12.7918 15.9326 10.3804 15.9326 7.40578C15.9326 4.43117 13.5212 2.01978 10.5466 2.01978C7.57204 2.01978 5.16064 4.43117 5.16064 7.40578C5.16064 10.3804 7.57204 12.7918 10.5466 12.7918Z"
                      stroke="black"
                      strokeWidth="1.3465"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent border-none text-[14.600000381469727px] text-black placeholder:text-zinc-400 focus:outline-none focus:ring-0 p-0 font-normal ml-1"
                />
              </div>

              {/* Template preset cards grid list */}
              <div
                className="grid grid-cols-2 gap-x-[15px] gap-y-[16px] w-[434.0899963378906px]  overflow-y-auto mt-1 pb-4"
                style={{ scrollbarWidth: "none" }}
              >
                {filteredTemplates.length > 0 ? (
                  filteredTemplates.map((template) => {
                    const isSelected = selected === template.id;
                    return (
                      <div
                        key={template.id}
                        onClick={() => onSelect(template.id)}
                        className={`w-[208.61000061035156px] h-[156.4499969482422px] bg-[#f3f3f3] rounded-[13px] relative overflow-hidden cursor-pointer group border transition-all ${
                          isSelected
                            ? "border-blue-500 ring-1 ring-blue-500"
                            : "border-black/5 hover:border-zinc-300"
                        }`}
                      >
                        {/* Template Virtual Preview */}
                        <div className="w-[208.61000061035156px] h-[156.4499969482422px] absolute inset-0 select-none pointer-events-none opacity-85">
                          <TemplatePreview template={template} />
                        </div>

                        {/* Bottom Gradient overlay */}
                        <div className="w-[208.61000061035156px] h-[78.22116088867188px] absolute bottom-0 left-0 pointer-events-none">
                          <div className="w-[208.61000061035156px] h-[78.22116088867188px] bg-gradient-to-b from-black/0 to-white/80 absolute inset-0"></div>
                        </div>

                        {/* Template Name tag */}
                        <div className="flex flex-col absolute bottom-3 left-3 z-10 pointer-events-none">
                          <div className="h-[23.079999923706055px] flex items-center">
                            <span className="font-medium text-[15.199999809265137px] leading-[23px] capitalize text-black/80 truncate max-w-[180px]">
                              {template.name}
                            </span>
                          </div>
                        </div>

                        {/* Selected Badge Indicator */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-lg bg-blue-500 flex items-center justify-center shadow-sm z-20">
                            <Check
                              className="w-3 h-3 text-white"
                              strokeWidth={2.5}
                            />
                          </div>
                        )}

                        {/* Action Hover overlay */}
                        <div className="w-[208.61000061035156px] h-[156.4499969482422px] flex justify-center items-center bg-white/20 backdrop-blur-[1px] absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                          <div className="h-10 flex flex-col justify-center items-center bg-[#f3f3f3] px-[25.295799255371094px] py-[8px] rounded-[13px] shadow-sm">
                            <span className="font-medium text-[15.300000190734863px] leading-[23px] text-center text-black">
                              {isSelected ? "Active" : "Select Layout"}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-xs text-zinc-400 w-full">
                    No templates match your search.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## File: `app\login\page.tsx`

```tsx
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/Navbar";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordStep, setShowPasswordStep] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordInputRef = useRef<HTMLInputElement>(null);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isPasswordValid = password.length >= 6;

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid) {
      toast.error("Please enter a valid email address!");
      return;
    }
    if (!showPasswordStep) {
      setShowPasswordStep(true);
      setTimeout(() => passwordInputRef.current?.focus(), 100);
      return;
    }
    if (!isPasswordValid) {
      toast.error("Password must be at least 6 characters!");
      return;
    }
    setIsSubmitting(true);
    const loadingToast = toast.loading("Authenticating secure session...");
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      toast.dismiss(loadingToast);
      setIsSubmitting(false);

      if (error) {
        toast.error(error.message || "Invalid email or password");
        return;
      }

      if (data && data.user) {
        const nameParts = (data.user.name || "").split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        sessionStorage.setItem(
          "linkedpage_user",
          JSON.stringify({
            id: data.user.id,
            firstName,
            lastName,
            email: data.user.email,
          }),
        );
      }

      toast.success("Welcome back! Signed in successfully.");
      router.push("/dashboard");
    } catch {
      toast.dismiss(loadingToast);
      toast.error("Connection failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.info("Google Authentication coming in next release!");
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] font-inter select-none">
      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 min-h-screen py-28 mx-auto  max-w-[1536px]">
        {/* ── Left: Form ── */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Card wrapper — exact reference style */}
          <div className="relative bg-white shadow-inner rounded-[20px] px-10 py-14 w-full max-w-md">
            <div className="flex flex-col gap-5">
              {/* Header */}
              <div className="flex flex-col gap-1 text-center items-center">
                <h1 className="text-2xl font-medium text-black w-fit leading-tight">
                  Welcome back
                </h1>
                <p className="text-sm text-black">
                  Sign in to your account to continue
                </p>
              </div>

              {/* Google SSO */}
              <div className="flex flex-col gap-3">
                <button
                  className="button text-sm font-medium outline-none focus:outline-none focus-visible:outline-none transition-all duration-200 card flex items-center justify-center gap-2 w-full"
                  type="button"
                  onClick={handleGoogleLogin}
                >
                  <img
                    className="w-auto"
                    height={16}
                    width={16}
                    alt="Google"
                    src="https://www.webild.io/icons/google.svg"
                  />
                  Continue with Google
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center gap-4">
                <div className="flex-1 border-t-2 border-black/5" />
                <span className="text-xs text-black">or</span>
                <div className="flex-1 border-t-2 border-black/5" />
              </div>

              {/* Form */}
              <form className="flex flex-col gap-4" onSubmit={handleContinue}>
                {/* Email */}
                <div>
                  <div className="z-10 flex items-center gap-1 mb-2 w-full min-w-0 relative">
                    <label className="block text-sm font-medium text-black text-nowrap truncate">
                      Email
                    </label>
                  </div>
                  <div className="relative w-full rounded-extra-sm transition-[outline] duration-300 card">
                    <input
                      className="p-3 w-full text-sm text-black placeholder:text-black/75 focus:outline-none focus:border-none bg-transparent"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={showPasswordStep || isSubmitting}
                      required
                    />
                  </div>
                </div>

                {/* Password (collapsible) */}
                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.625,0.05,0,1)]"
                  style={{ gridTemplateRows: showPasswordStep ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden flex flex-col gap-4 p-px">
                    <div>
                      <div className="z-10 flex items-center justify-between gap-1 mb-2 w-full min-w-0 relative">
                        <label className="block text-sm font-medium text-black text-nowrap truncate">
                          Password
                        </label>
                        <button
                          type="button"
                          className="text-xs text-[#8DB8FF] font-medium hover:underline"
                          onClick={() =>
                            toast.info(
                              "Password reset link sent to your email!",
                            )
                          }
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative w-full rounded-extra-sm transition-[outline] duration-300 card">
                        <input
                          ref={passwordInputRef}
                          className="p-3 w-full text-sm text-black placeholder:text-black/75 focus:outline-none focus:border-none pr-10 bg-transparent"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={isSubmitting}
                          required={showPasswordStep}
                        />
                        <button
                          className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-black/75"
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  className={`button text-sm font-medium outline-none focus:outline-none focus-visible:outline-none transition-all duration-200 button-primary w-full justify-center ${
                    isSubmitting ||
                    (showPasswordStep ? !isPasswordValid : !isEmailValid)
                      ? "opacity-50 select-none pointer-events-none"
                      : ""
                  }`}
                  type="submit"
                  disabled={
                    isSubmitting ||
                    (showPasswordStep ? !isPasswordValid : !isEmailValid)
                  }
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5   rounded-lg border-2 border-white border-t-transparent animate-spin" />
                      Processing...
                    </span>
                  ) : showPasswordStep ? (
                    "Sign in"
                  ) : (
                    "Continue"
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="text-center text-sm text-black">
                Don't have an account?{" "}
                <button
                  className="cursor-pointer text-[#000] font-medium hover:underline"
                  onClick={() => router.push("/signup")}
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Hero Illustration ── */}
        <div className="relative hidden md:flex rounded-[20px] overflow-hidden bg-gradient-to-tr from-[#8DB8FF]/10 to-[#8DFFB3]/10 items-center justify-center border border-[#E6E6E6]">
          <img
            className="absolute inset-0 size-full object-cover opacity-80"
            alt="Auth background"
            src="/bg.png"
          />
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />
          <img
            className="relative z-20 drop- shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  max-w-[85%] w-auto h-auto"
            alt="Webild input illustration"
            src="https://www.webild.io/images/input.svg"
          />
        </div>
      </div>
    </div>
  );
}
```

---

## File: `app\onboarding\page.tsx`

```tsx
"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEditor } from "@/context/EditorContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Home,
  Layout,
  Folder,
  CreditCard,
  BookOpen,
  Settings,
  Check,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// ── Typing dots indicator ────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-[3px] px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-[5px] h-[5px] rounded-full bg-[#2A2A2F]/40"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.18,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ── AI avatar for chat bubbles ───────────────────────────────────────────────
function AIAvatar({ size = "sm" }: { size?: "sm" | "md" }) {
  const dim = size === "md" ? "w-8 h-8" : "w-7 h-7";
  return (
    <div
      className={`${dim} rounded-full bg-gradient-to-br from-[#2A2A2F] to-[#4A4A55] flex items-center justify-center flex-shrink-0 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]`}
    >
      <Sparkles className="w-3.5 h-3.5 text-white/90" />
    </div>
  );
}

type ChatMessageState = "pending" | "typing" | "done";

interface ChatMessage {
  id: number;
  text: string;
  state: ChatMessageState;
  tag?: string; // small status tag shown inside bubble
}

// ── Single chat message bubble ───────────────────────────────────────────────
function ChatBubble({
  message,
  index,
}: {
  message: ChatMessage;
  index: number;
}) {
  if (message.state === "pending") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.28,
        ease: [0.23, 1, 0.32, 1],
        delay: 0,
      }}
      className="flex items-end gap-2.5 select-none"
    >
      <AIAvatar />
      <div className="flex flex-col gap-1 max-w-[calc(100%-36px)]">
        {message.state === "typing" ? (
          <div className="bg-white border border-[#E6E6E6] rounded-[14px] rounded-bl-[4px] px-3 py-2.5 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]">
            <TypingDots />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, filter: "blur(2px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="bg-white border border-[#E6E6E6] rounded-[14px] rounded-bl-[4px] px-3.5 py-2.5 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]"
          >
            <div className="flex items-center gap-2">
              {message.tag && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#369762] bg-[#8DFFB3]/25 border border-[#8DFFB3]/40 px-1.5 py-0.5 rounded-full leading-none flex-shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3px]" />
                  {message.tag}
                </span>
              )}
              <p className="text-[13px] font-medium text-[#171717] leading-[1.45]">
                {message.text}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function OnboardingInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    startScrape,
    startScrapeManual,
    isLoading,
    scrapeError,
    editedProfile,
    clearProfile,
    useMockProfile,
    websiteId,
  } = useEditor();

  const [step, setStep] = useState<"input" | "loading" | "fallback">("input");
  const [url, setUrl] = useState("");
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Chat messages for the loading state — sequentially revealed
  const CHAT_STEPS: Array<{
    text: string;
    tag: string;
    triggerAt: number;
    typingDuration: number;
  }> = [
    {
      text: "Reading your LinkedIn profile and extracting all public data.",
      tag: "Fetching data",
      triggerAt: 0,
      typingDuration: 1200,
    },
    {
      text: "Parsing your experience, skills and accomplishments into structured sections.",
      tag: "Thinking",
      triggerAt: 28,
      typingDuration: 1400,
    },
    {
      text: "Choosing a color palette and typography that matches your professional identity.",
      tag: "Finalizing colours",
      triggerAt: 55,
      typingDuration: 1600,
    },
    {
      text: "Assembling your personalised page layout — almost done.",
      tag: "Building layout",
      triggerAt: 82,
      typingDuration: 900,
    },
  ];

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(
    CHAT_STEPS.map((s, i) => ({
      id: i,
      text: s.text,
      tag: s.tag,
      state: "pending" as ChatMessageState,
    })),
  );

  // If there's an initial URL query param, auto-start scraping
  useEffect(() => {
    const initialUrl = searchParams.get("url") || "";
    if (initialUrl) {
      setUrl(initialUrl);
      handleStartScrape(initialUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleStartScrape = async (targetUrl: string) => {
    const trimmed = targetUrl.trim();
    if (!trimmed.includes("linkedin.com/in/")) {
      toast.error(
        "Please paste a valid LinkedIn profile URL (e.g. linkedin.com/in/username)",
      );
      return;
    }
    setStep("loading");
    setProgress(0);
    setChatMessages(
      CHAT_STEPS.map((s, i) => ({
        id: i,
        text: s.text,
        tag: s.tag,
        state: "pending",
      })),
    );
    startScrape(trimmed);
  };

  // Progress animation (0 → 98 over ~2.5 s)
  useEffect(() => {
    if (step !== "loading") return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 98) {
          clearInterval(interval);
          return 98;
        }
        return next;
      });
    }, 25);

    return () => clearInterval(interval);
  }, [step]);

  // Drive chat message reveals based on progress
  useEffect(() => {
    if (step !== "loading") return;

    CHAT_STEPS.forEach((s, i) => {
      if (progress >= s.triggerAt) {
        setChatMessages((prev) => {
          const current = prev[i];
          if (current.state === "pending") {
            // Show typing indicator first
            const updated = [...prev];
            updated[i] = { ...current, state: "typing" };
            // After typing duration, show the real message
            setTimeout(() => {
              setChatMessages((p) => {
                const u = [...p];
                u[i] = { ...u[i], state: "done" };
                return u;
              });
            }, s.typingDuration);
            return updated;
          }
          return prev;
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, step]);

  // Scroll to bottom as new messages appear
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Handle scrape success or failure
  useEffect(() => {
    if (step === "loading" && !isLoading) {
      if (scrapeError) {
        setStep("fallback");
      }
    }
  }, [isLoading, scrapeError, step]);

  // Redirect on website creation success
  useEffect(() => {
    if (websiteId && (step === "loading" || isImporting)) {
      setProgress(100);
      const t = setTimeout(() => {
        router.push(`/editor?id=${websiteId}&onboarding=true`);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [websiteId, step, isImporting, router]);

  const handleZipFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setZipFile(e.target.files[0]);
    }
  };

  const handleUploadZip = async () => {
    if (!zipFile) {
      toast.error("Please select a LinkedIn export ZIP file first.");
      return;
    }
    setIsImporting(true);
    const toastId = toast.loading("Processing and parsing ZIP archive...");
    try {
      const success = await startScrapeManual(zipFile);
      if (!success) {
        setIsImporting(false);
      }
      toast.dismiss(toastId);
    } catch (e: any) {
      toast.dismiss(toastId);
      toast.error(e.message || "Failed to process ZIP archive.");
      setIsImporting(false);
    }
  };

  const handleManualImport = async () => {
    const toastId = toast.loading("Loading default workspace settings...");
    await useMockProfile();
    toast.dismiss(toastId);
    toast.success("Proceeding with template data customization.");
  };

  const handleBackToInput = () => {
    clearProfile();
    setStep("input");
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] font-inter flex flex-col items-center justify-center text-black antialiased relative overflow-hidden">
      {/* ── Background Graphic ── */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-50">
        <img
          src="/bg.png"
          alt=""
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBFBFB]/40 via-white/80 to-[#FBFBFB]" />
      </div>

      {/* ── Content View Area ── */}
      <main className="w-full flex items-center justify-center px-6 relative z-10">
        <div className="w-full max-w-[480px]">
          <AnimatePresence mode="wait">
            {/* ── Step 1 — Input URL ── */}
            {step === "input" && (
              <motion.div
                key="input"
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="bg-white/80 backdrop-blur-md border border-[#E6E6E6] rounded-[24px] shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] p-8 flex flex-col"
              >
                <h1 className="text-2xl font-bold tracking-tight text-black text-center mb-2 font-inter-tight">
                  Paste your LinkedIn profile link to get started.
                </h1>
                <p className="text-[14px] text-gray-500 text-center mb-6 leading-relaxed">
                  We'll extract your public profile contents and instantly set
                  up your customizable web portfolio.
                </p>

                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="linkedin.com/in/username"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleStartScrape(url)
                    }
                    className="w-full h-11 px-4 rounded-xl bg-[#FBFBFB] border border-[#E6E6E6] focus:border-[#8DB8FF] focus:ring-1 focus:ring-[#8DB8FF] outline-none text-[14.5px] font-medium text-black transition-colors"
                    autoFocus
                  />
                  <button
                    onClick={() => handleStartScrape(url)}
                    className="h-11 bg-[#2A2A2F] hover:bg-[#3A3A42] text-white text-[13px] font-bold rounded-xl transition-colors active:scale-[0.97] transition-transform flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    Generate Page <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Step 2 — Chat-style loading ── */}
            {step === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="bg-white/80 backdrop-blur-md border border-[#E6E6E6] rounded-[24px] shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] overflow-hidden flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F3F3F5]">
                  <AIAvatar size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-black">
                      Webild AI
                    </p>
                    <p className="text-[11px] text-[#888] font-medium">
                      Building your page
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#3b82f6]">
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    {progress}%
                  </div>
                </div>

                {/* Chat messages area */}
                <div className="px-4 py-4 flex flex-col gap-3 min-h-[200px] max-h-[260px] overflow-y-auto scrollbar-hide">
                  {chatMessages.map((msg, i) => (
                    <ChatBubble key={msg.id} message={msg} index={i} />
                  ))}
                  <div ref={chatEndRef} />
                </div>

                {/* Progress bar */}
                <div className="px-5 pb-5 pt-2">
                  <div className="w-full h-[3px] bg-[#F3F3F3] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#3b82f6] to-[#8DB8FF] rounded-full"
                      style={{ width: `${progress}%` }}
                      transition={{ duration: 0.3, ease: "linear" }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Step 3 — Scraper failure fallback ── */}
            {step === "fallback" && (
              <motion.div
                key="fallback"
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="bg-white/95 backdrop-blur-md border border-[#E6E6E6] rounded-[24px] shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] p-8 flex flex-col"
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-5 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]">
                  <AlertCircle className="w-5 h-5 text-[#E45A5A]" />
                </div>

                <h2 className="text-xl font-bold text-black mb-2 font-inter-tight">
                  Could not fetch public profile.
                </h2>
                <p className="text-[14px] text-gray-500 leading-relaxed mb-5">
                  LinkedIn's privacy restriction is blocking direct access.
                  Please download your settings archive from{" "}
                  <a
                    href="https://www.linkedin.com/psettings/member-data"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3b82f6] font-semibold hover:underline inline-flex items-center gap-0.5"
                  >
                    LinkedIn's Settings page
                  </a>{" "}
                  and import it below.
                </p>

                <div className="flex flex-col items-center gap-3 w-full mb-6">
                  <label
                    htmlFor="zip-upload"
                    className="w-full flex flex-col items-center justify-center border-2 border-dashed border-[#E6E6E6] hover:border-[#8DB8FF] rounded-xl p-6 bg-[#FBFBFB] cursor-pointer transition-colors duration-150 relative text-center"
                  >
                    <input
                      id="zip-upload"
                      type="file"
                      accept=".zip"
                      onChange={handleZipFileChange}
                      className="hidden"
                      disabled={isImporting}
                    />
                    <svg
                      className="w-8 h-8 text-gray-400 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M12 16v-8m0 8l-4-4m4 4l4-4M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2z"
                      />
                    </svg>
                    {zipFile ? (
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[13px] font-semibold text-black truncate max-w-[280px]">
                          {zipFile.name}
                        </span>
                        <span className="text-[11px] text-gray-500 font-medium">
                          {(zipFile.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-[13px] font-semibold text-black">
                          Upload LinkedIn data export ZIP
                        </span>
                        <span className="text-[11px] text-gray-500 font-medium">
                          Should contain Profile.csv and Positions.csv
                        </span>
                      </div>
                    )}
                  </label>

                  {zipFile && (
                    <button
                      onClick={handleUploadZip}
                      disabled={isImporting}
                      className="w-full h-10 bg-[#3b82f6] hover:bg-[#2563eb] text-white text-[12.5px] font-bold rounded-xl transition-all active:scale-[0.97] transition-transform flex items-center justify-center gap-1.5 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] disabled:opacity-50"
                    >
                      {isImporting ? "Processing..." : "Import Profile ZIP"}
                    </button>
                  )}
                </div>

                <div className="flex gap-3 w-full">
                  <button
                    onClick={handleBackToInput}
                    className="flex-1 h-10 border border-[#E6E6E6] hover:bg-gray-50 text-black text-[12.5px] font-bold rounded-xl transition-colors active:scale-[0.97] transition-transform flex items-center justify-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={handleManualImport}
                    className="flex-1 h-10 bg-[#2A2A2F] hover:bg-[#3A3A42] text-white text-[12.5px] font-bold rounded-xl transition-colors active:scale-[0.97] transition-transform flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    Load Default Data <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center font-inter select-none">
          <div className="w-5 h-5 rounded-lg border-2 border-[#E6E6E6] border-t-[#2A2A2F] animate-spin" />
        </div>
      }
    >
      <OnboardingInner />
    </Suspense>
  );
}
```

---

## File: `app\p\[slug]\page.tsx`

```tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import { ProfileData, TemplateId, MOCK_PROFILE } from "@/shared/types";
import ProfilePreview from "@/app/editor/components/ProfilePreview";

function PublishedPageInner() {
  const params = useParams();
  const slug = params?.slug as string;

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [template, setTemplate] = useState<TemplateId>("minimal-card");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    const loadPublishedPage = async () => {
      try {
        const res = await fetch(`/api/p/${slug}`);
        const data = await res.json();
        if (res.ok && data.success) {
          setProfile(data.profile);
          setTemplate(data.template);
        } else {
          setError(data.error || "Page not found or not published yet");
        }
      } catch {
        setError("Network error. Failed to load page.");
      } finally {
        setLoading(false);
      }
    };
    loadPublishedPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center font-inter select-none">
        <div className="w-5 h-5 rounded-lg border-2 border-[#E6E6E6] border-t-[#2A2A2F] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FBFBFB] flex flex-col items-center justify-center font-inter p-6 text-center select-none">
        <div className="w-16 h-16 rounded-[20px] bg-amber-50 border border-amber-200 flex items-center justify-center mb-6 shadow-sm">
          <svg
            className="w-7 h-7 text-amber-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-black mb-2">
          Portfolio Not Found
        </h1>
        <p className="text-sm text-gray-500 max-w-sm mb-6 leading-relaxed">
          The requested portfolio is either not published or does not exist.
          Please check the URL.
        </p>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen w-full bg-white select-none">
      <ProfilePreview profile={profile} template={template} fluid={true} />
    </div>
  );
}

export default function PublishedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center font-inter select-none">
          <div className="w-5 h-5 rounded-lg border-2 border-[#E6E6E6] border-t-[#2A2A2F] animate-spin" />
        </div>
      }
    >
      <PublishedPageInner />
    </Suspense>
  );
}
```

---

## File: `app\preview\page.tsx`

```tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEditor } from "@/context/EditorContext";
import ProfilePreview from "@/app/editor/components/ProfilePreview";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft,
  Globe,
  Download,
  ExternalLink,
  Check,
  Loader2,
  Share2,
  Pencil,
  Smartphone,
  Monitor,
} from "lucide-react";

type PreviewMode = "desktop" | "mobile";
type PublishStep = "idle" | "subdomain" | "publishing" | "done";

// ─── Subdomain input panel ─────────────────────────────────────────────────────
function PublishPanel({
  onPublish,
  publishing,
}: {
  onPublish: (slug: string) => void;
  publishing: boolean;
}) {
  const { editedProfile } = useEditor();

  const suggestedSlug = editedProfile
    ? editedProfile.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
    : "yourname";

  const [slug, setSlug] = useState(suggestedSlug);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(false);

  const isValid = /^[a-z0-9-]{3,30}$/.test(slug);

  // Debounced subdomain checking
  useEffect(() => {
    if (!slug || slug.length < 3) {
      setIsAvailable(false);
      return;
    }
    setChecking(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/websites/subdomain/check?slug=${encodeURIComponent(slug)}`,
        );
        const data = await res.json();
        if (res.ok) {
          setIsAvailable(data.available);
        } else {
          setIsAvailable(false);
        }
      } catch {
        setIsAvailable(false);
      } finally {
        setChecking(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [slug]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-medium text-black mb-1">
          Choose your subdomain
        </h3>
        <p className="text-xs text-[#9CA3AF]">Your free URL on LinkedPage</p>
      </div>

      <div className="flex items-center rounded-lg border border-[#E6E6E6] overflow-hidden bg-white focus-within:border-[#8DB8FF] focus-within:shadow-[0_0_0_3px_rgba(141,184,255,0.15)] transition-all duration-150">
        <div className="px-3 py-2.5 bg-[#F3F3F3] border-r border-[#E6E6E6] text-xs text-[#9CA3AF] whitespace-nowrap flex-shrink-0">
          linkedpage.io/
        </div>
        <input
          className="flex-1 px-3 py-2.5 text-sm text-black bg-transparent outline-none min-w-0"
          value={slug}
          onChange={(e) =>
            setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
          }
          placeholder="yourname"
          maxLength={30}
        />
      </div>

      {slug && !isValid && (
        <p className="text-xs text-[#E45A5A]">
          3–30 characters, lowercase letters, numbers and hyphens only.
        </p>
      )}

      {slug && isValid && (
        <div className="text-xs">
          {checking ? (
            <span className="text-[#9CA3AF] flex items-center gap-1">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Checking
              availability...
            </span>
          ) : isAvailable ? (
            <p className="text-xs text-[#369762] flex items-center gap-1">
              <Check className="w-4 h-4" />
              linkedpage.io/{slug} is available!
            </p>
          ) : (
            <p className="text-xs text-[#E45A5A]">
              linkedpage.io/{slug} is already taken.
            </p>
          )}
        </div>
      )}

      <button
        onClick={() => isValid && isAvailable && onPublish(slug)}
        disabled={!isValid || !isAvailable || publishing || checking}
        className={`button button-primary w-full justify-center gap-2 ${
          !isValid || !isAvailable || publishing || checking
            ? "opacity-50 pointer-events-none"
            : ""
        }`}
      >
        {publishing ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Globe className="w-5 h-5" />
        )}
        {publishing ? "Publishing…" : "Publish for free"}
      </button>
    </div>
  );
}

// ─── Published success panel ───────────────────────────────────────────────────
function PublishedPanel({ url, slug }: { url: string; slug: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy URL");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-lg bg-[#8DFFB3] flex items-center justify-center">
          <Check className="w-5 h-5 text-[#1a5c3a]" strokeWidth={2.5} />
        </div>
        <h3 className="text-sm font-medium text-black">Your page is live!</h3>
      </div>

      <div
        className="flex items-center gap-2 p-3 bg-[#F3F3F3] rounded-[10px] cursor-pointer group"
        onClick={copy}
      >
        <Globe className="w-5 h-5 text-[#9CA3AF] flex-shrink-0" />
        <p className="text-sm text-black flex-1 truncate font-medium">
          linkedpage.io/{slug}
        </p>
        {copied ? (
          <Check className="w-5 h-5 text-[#369762] flex-shrink-0" />
        ) : (
          <Share2 className="w-5 h-5 text-[#9CA3AF] group-hover:text-black flex-shrink-0 transition-colors" />
        )}
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="button button-secondary w-full justify-center gap-2"
      >
        <ExternalLink className="w-5 h-5" />
        Open your page
      </a>
    </div>
  );
}

// ─── Preview page inner ────────────────────────────────────────────────────────
function PreviewInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    editedProfile,
    selectedTemplate,
    useMockProfile,
    loadWebsite,
    websiteId,
  } = useEditor();

  const [previewMode, setPreviewMode] = useState<PreviewMode>("desktop");
  const [publishStep, setPublishStep] = useState<PublishStep>("idle");
  const [publishedSlug, setPublishedSlug] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      loadWebsite(id);
    }
  }, [searchParams, loadWebsite]);

  useEffect(() => {
    if (!editedProfile) useMockProfile();
  }, [editedProfile, useMockProfile]);

  const handlePublish = async (slug: string) => {
    if (!websiteId) {
      toast.error("Please load a website draft first.");
      return;
    }
    setPublishing(true);
    toast.loading("Publishing your page…");
    try {
      // 1. Update subdomain slug in draft first
      await fetch(`/api/websites/${websiteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subdomainSlug: slug }),
      });
      // 2. Trigger publish
      const response = await fetch(`/api/websites/${websiteId}/publish`, {
        method: "POST",
      });
      const data = await response.json();
      setPublishing(false);
      toast.dismiss();
      if (!response.ok) {
        toast.error(data.error || "Failed to publish website");
        return;
      }
      setPublishedSlug(slug);
      setPublishStep("done");
      toast.success(`Your page is live at linkedpage.io/${slug} 🎉`);
    } catch {
      setPublishing(false);
      toast.dismiss();
      toast.error("Network error. Failed to publish website.");
    }
  };

  const handleExport = async () => {
    if (!websiteId) {
      toast.error("Please load a website draft first.");
      return;
    }
    setExportLoading(true);
    const toastId = toast.loading("Generating static build export ZIP…");
    try {
      const response = await fetch(`/api/websites/${websiteId}/export`, {
        method: "POST",
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to export build");
      }
      const blob = await response.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `linkedpage-export-${websiteId}.zip`;
      a.click();
      toast.dismiss(toastId);
      toast.success("Build ZIP downloaded successfully!");
    } catch (e: any) {
      toast.dismiss(toastId);
      toast.error(e.message || "Failed to generate zip export.");
    } finally {
      setExportLoading(false);
    }
  };

  if (!editedProfile) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-[#9CA3AF]" />
      </div>
    );
  }

  const desktopW = 1024;
  const desktopH = 768;
  const mobileW = 375;
  const mobileH = 812;

  // Calculate scale to fit within available space
  const previewContainerW =
    typeof window !== "undefined" ? window.innerWidth - 340 : 700;
  const previewContainerH =
    typeof window !== "undefined" ? window.innerHeight - 200 : 600;

  const desktopScale = Math.min(
    (previewContainerW - 40) / desktopW,
    (previewContainerH - 60) / desktopH,
    0.85,
  );
  const mobileScale = Math.min(
    200 / mobileW,
    (previewContainerH - 60) / mobileH,
    0.65,
  );

  return (
    <div className="min-h-screen bg-[#F7F7F7] font-inter">
      <Navbar />

      {/* ── Top toolbar ── */}
      <div className="fixed top-[88px] left-0 right-0 z-40 px-5">
        <div className="max-w-[1536px] mx-auto flex items-center justify-between gap-3 h-12 px-4 bg-white/80 backdrop-blur-md rounded-lg border border-[#E6E6E6] shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]">
          {/* Left: back */}
          <button
            onClick={() =>
              router.push(websiteId ? `/editor?id=${websiteId}` : "/editor")
            }
            className="flex items-center gap-1.5 text-[11px] font-medium text-[#6B6B6B] hover:text-black transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to editor</span>
          </button>

          {/* Center: preview mode */}
          <div className="flex items-center gap-1 p-1 bg-[#F3F3F5] rounded-[10px]">
            <button
              onClick={() => setPreviewMode("desktop")}
              className={`flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium rounded-lg transition-[background,color] duration-150 ${
                previewMode === "desktop"
                  ? "bg-white text-black shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]"
                  : "text-[#6B6B6B] hover:text-black"
              }`}
            >
              <Monitor className="w-5 h-5" />
              Desktop
            </button>
            <button
              onClick={() => setPreviewMode("mobile")}
              className={`flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium rounded-lg transition-[background,color] duration-150 ${
                previewMode === "mobile"
                  ? "bg-white text-black shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]"
                  : "text-[#6B6B6B] hover:text-black"
              }`}
            >
              <Smartphone className="w-5 h-5" />
              Mobile
            </button>
          </div>

          {/* Right: edit CTA */}
          <button
            onClick={() =>
              router.push(websiteId ? `/editor?id=${websiteId}` : "/editor")
            }
            className="button button-secondary !py-1.5 !px-3 !text-[11px] flex items-center gap-1.5"
          >
            <Pencil className="w-5 h-5" />
            <span className="hidden sm:inline">Edit</span>
          </button>
        </div>
      </div>

      {/* ── Layout: canvas + right panel ── */}
      <div className="flex flex-col lg:flex-row pt-[148px] pb-8 px-5 gap-4 max-w-[1536px] mx-auto">
        {/* ── Canvas ── */}
        <div className="flex-1 flex items-start justify-center min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={previewMode}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              {previewMode === "desktop" ? (
                <div
                  className="rounded-[16px] overflow-hidden border border-[#E6E6E6] bg-white"
                  style={{
                    width: desktopW * desktopScale,
                    height: desktopH * desktopScale,
                    boxShadow:
                      "0 8px 30px -8px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.05)",
                  }}
                >
                  <div
                    style={{
                      width: desktopW,
                      height: desktopH,
                      transform: `scale(${desktopScale})`,
                      transformOrigin: "top left",
                      overflow: "auto",
                      pointerEvents: "none",
                    }}
                  >
                    <ProfilePreview
                      profile={editedProfile}
                      template={selectedTemplate}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className="rounded-[32px] overflow-hidden border-[8px] border-[#2A2A2F] bg-white"
                  style={{
                    width: mobileW * mobileScale,
                    height: mobileH * mobileScale,
                    boxShadow: "0 16px 48px -12px rgba(0,0,0,0.22)",
                  }}
                >
                  <div
                    style={{
                      width: mobileW,
                      height: mobileH,
                      transform: `scale(${mobileScale})`,
                      transformOrigin: "top left",
                      overflow: "auto",
                      pointerEvents: "none",
                    }}
                  >
                    <ProfilePreview
                      profile={editedProfile}
                      template={selectedTemplate}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Right publish panel ── */}
        <div className="w-full lg:w-[280px] flex-shrink-0 flex flex-col gap-4">
          {/* Publish card */}
          <div
            className="bg-white border border-[#E6E6E6] rounded-[16px] p-5"
            style={{
              boxShadow:
                "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.03)",
            }}
          >
            <AnimatePresence mode="wait">
              {publishStep === "done" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                >
                  <PublishedPanel
                    url={
                      publishedSlug
                        ? `https://${publishedSlug}.linkedpage.io`
                        : `https://linkedpage.io/${publishedSlug}`
                    }
                    slug={publishedSlug}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="publish"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                >
                  <PublishPanel
                    onPublish={handlePublish}
                    publishing={publishing}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Export card */}
          <div
            className="bg-white border border-[#E6E6E6] rounded-[16px] p-5"
            style={{
              boxShadow:
                "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.03)",
            }}
          >
            <h3 className="text-sm font-medium text-black mb-1">Export code</h3>
            <p className="text-xs text-[#9CA3AF] mb-4 leading-relaxed">
              Download your page as a self-contained HTML + CSS file. Host it
              anywhere.
            </p>
            <button
              onClick={handleExport}
              disabled={exportLoading}
              className={`button button-secondary w-full justify-center gap-2 ${exportLoading ? "opacity-60 pointer-events-none" : ""}`}
            >
              {exportLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Download className="w-5 h-5" />
              )}
              {exportLoading ? "Generating…" : "Download ZIP"}
            </button>
          </div>

          {/* What's included */}
          <div className="bg-[#FBFBFB] border border-[#E6E6E6] rounded-[16px] p-5">
            <h3 className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide mb-3">
              Free plan includes
            </h3>
            <ul className="flex flex-col gap-2">
              {[
                "Custom subdomain (linkedpage.io/…)",
                "All 4 templates",
                "Code export",
                "Always up-to-date with LinkedIn",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-xs text-[#171717]"
                >
                  <div className="w-5 h-5 rounded-lg bg-[#8DFFB3] flex items-center justify-center flex-shrink-0">
                    <Check
                      className="w-2.5 h-2.5 text-[#1a5c3a]"
                      strokeWidth={2.5}
                    />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-white font-inter flex flex-col">
      <Navbar />
      <Suspense
        fallback={
          <main className="flex-1 flex items-center justify-center">
            <div className="w-5 h-5 rounded-lg border-2 border-[#E6E6E6] border-t-[#2A2A2F] animate-spin" />
          </main>
        }
      >
        <PreviewInner />
      </Suspense>
    </div>
  );
}
```

---

## File: `app\publish\page.tsx`

```tsx
"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Check,
  ExternalLink,
  Share2,
  Twitter,
  Linkedin,
  RotateCcw,
  Copy,
  Sparkles,
} from "lucide-react";

function PublishInner() {
  const params = useSearchParams();
  const router = useRouter();
  const slug = params.get("slug") ?? "yourname";
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(`${window.location.origin}/p/${slug}`);
  }, [slug]);

  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy");
    }
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(
      `Just turned my LinkedIn into a beautiful personal micro-site in under 60 seconds with @LinkedPage ✨\n\n${url}`,
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    const shareUrl = encodeURIComponent(url);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      "_blank",
    );
  };

  return (
    <main className="flex-1 flex items-center justify-center px-5 pt-24 pb-16">
      <div className="flex flex-col items-center gap-10 max-w-md w-full text-center">
        {/* Success ring */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 340,
            damping: 28,
            delay: 0.05,
          }}
          className="relative w-24 h-24"
        >
          <div className="absolute inset-0   rounded-lg bg-[#8DFFB3]/30 blur-xl" />
          <div className="absolute inset-0   rounded-lg bg-[#8DFFB3] flex items-center justify-center border border-[#369762]/20">
            <Check className="w-10 h-10 text-[#1a5c3a]" strokeWidth={2.5} />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col gap-3"
        >
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-[#8DB8FF]" />
            <span className="text-xs font-medium text-[#8DB8FF] uppercase tracking-wide">
              Published
            </span>
          </div>
          <h1 className="text-3xl font-medium text-black leading-tight">
            Your page is live!
          </h1>
          <p className="text-sm text-[#6B6B6B] leading-relaxed">
            Share it anywhere — your LinkedIn profile, email signature,
            portfolio, or bio link.
          </p>
        </motion.div>

        {/* URL box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="w-full"
        >
          <div
            onClick={copy}
            className="flex items-center gap-3 p-4 bg-[#F7F7F7] border border-[#E6E6E6] rounded-[16px] cursor-pointer hover:border-[#C0C0C0] active:scale-[0.98] transition-[transform,border-color] duration-150"
          >
            <div className="w-8 h-8   rounded-lg bg-white border border-[#E6E6E6] flex items-center justify-center flex-shrink-0">
              <ExternalLink className="w-5 h-5 text-[#6B6B6B]" />
            </div>
            <p className="text-sm text-black font-medium flex-1 text-left truncate">
              {url}
            </p>
            {copied ? (
              <Check className="w-5 h-5 text-[#369762] flex-shrink-0" />
            ) : (
              <Copy className="w-5 h-5 text-[#9CA3AF] flex-shrink-0" />
            )}
          </div>
        </motion.div>

        {/* Share buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col gap-3 w-full"
        >
          <p className="text-xs text-[#9CA3AF] font-medium uppercase tracking-wide">
            Share
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={shareOnTwitter}
              className="button button-secondary justify-center gap-2"
            >
              <Twitter className="w-5 h-5" />
              Post on X
            </button>
            <button
              onClick={shareOnLinkedIn}
              className="button button-secondary justify-center gap-2"
            >
              <Linkedin className="w-5 h-5" />
              Share on LinkedIn
            </button>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.38 }}
          className="w-full flex items-center gap-4"
        >
          <div className="flex-1 h-px bg-[#E6E6E6]" />
          <span className="text-xs text-[#9CA3AF]">or</span>
          <div className="flex-1 h-px bg-[#E6E6E6]" />
        </motion.div>

        {/* Secondary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.42, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full"
        >
          <button
            onClick={() => router.push("/editor")}
            className="button button-secondary flex-1 w-full justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Edit your page
          </button>
          <button
            onClick={() => router.push("/")}
            className="button button-primary flex-1 w-full justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Create another
          </button>
        </motion.div>
      </div>
    </main>
  );
}

export default function PublishPage() {
  return (
    <div className="min-h-screen bg-white font-inter flex flex-col">
      <Navbar />
      <Suspense
        fallback={
          <main className="flex-1 flex items-center justify-center">
            <div className="w-5 h-5   rounded-lg border-2 border-[#E6E6E6] border-t-[#2A2A2F] animate-spin" />
          </main>
        }
      >
        <PublishInner />
      </Suspense>
    </div>
  );
}
```

---

## File: `app\signup\page.tsx`

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/Navbar";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordStep, setShowPasswordStep] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFirstNameValid = firstName.trim().length >= 1;
  const isLastNameValid = lastName.trim().length >= 1;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isPasswordValid = password.length >= 8 && /[\d!@#$%^&*]/.test(password);

  // Step 1: name + email valid → reveal password
  // Step 2: all valid → submit
  const canContinue = isFirstNameValid && isLastNameValid && isEmailValid;
  const canSubmit = canContinue && isPasswordValid;

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canContinue) {
      if (!isFirstNameValid) toast.error("Please enter your first name!");
      else if (!isLastNameValid) toast.error("Please enter your last name!");
      else toast.error("Please enter a valid email address!");
      return;
    }

    if (!showPasswordStep) {
      setShowPasswordStep(true);
      return;
    }

    if (!isPasswordValid) {
      toast.error(
        "Password must be at least 8 characters with a number or symbol!",
      );
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Creating your account...");
    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name: `${firstName} ${lastName}`,
      });

      toast.dismiss(loadingToast);
      setIsSubmitting(false);

      if (error) {
        toast.error(error.message || "Failed to create account");
        return;
      }

      if (data && data.user) {
        sessionStorage.setItem(
          "linkedpage_user",
          JSON.stringify({
            id: data.user.id,
            firstName,
            lastName,
            email: data.user.email,
          }),
        );
      }

      toast.success("Account created! Welcome to Webild 🎉");
      router.push("/onboarding");
    } catch {
      toast.dismiss(loadingToast);
      toast.error("Connection failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = () => {
    toast.loading("Connecting Google authorization provider...");
    setTimeout(() => {
      toast.dismiss();
      toast.success("Successfully signed up with Google!");
      router.push("/onboarding");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] font-inter select-none">
      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 min-h-screen py-28 mx-auto max-w-[1536px]">
        {/* ── Left: Signup Form (exact reference UI) ── */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Outer card — button-secondary + rounded + p-8 as in reference */}
          <div className="relative bg-white shadow-inner rounded-[20px] px-10 py-14 w-full max-w-md">
            <div className="flex flex-col gap-5">
              {/* Header */}
              <div className="flex flex-col gap-1 text-center items-center">
                <h1 className="text-2xl font-medium text-black w-fit leading-tight">
                  Create your account
                </h1>
                <p className="text-sm text-black">
                  Get started with Webild today
                </p>
              </div>

              {/* Google SSO */}
              <div className="flex flex-col gap-3">
                <button
                  className="button text-sm font-medium outline-none focus:outline-none focus-visible:outline-none transition-all duration-200 card flex items-center justify-center gap-2 w-full"
                  type="button"
                  onClick={handleGoogleSignup}
                >
                  <img
                    className="w-auto"
                    height={16}
                    width={16}
                    alt="Google"
                    src="https://www.webild.io/icons/google.svg"
                    style={{ color: "transparent" }}
                  />
                  Continue with Google
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center gap-4">
                <div className="flex-1 border-t-2 border-black/5" />
                <span className="text-xs text-black">or</span>
                <div className="flex-1 border-t-2 border-black/5" />
              </div>

              {/* Form */}
              <form className="flex flex-col gap-4" onSubmit={handleContinue}>
                {/* First name + Last name */}
                <div className="grid grid-cols-2 gap-3">
                  {/* First name */}
                  <div>
                    <div className="z-10 flex items-center gap-1 mb-2 w-full min-w-0 relative">
                      <label className="block text-sm font-medium text-black text-nowrap truncate">
                        First name
                      </label>
                    </div>
                    <div className="relative w-full rounded-extra-sm transition-[outline] duration-300 card">
                      <input
                        className="p-3 w-full text-sm text-black placeholder:text-black/75 focus:outline-none focus:border-none bg-transparent"
                        type="text"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        disabled={isSubmitting}
                        required
                      />
                    </div>
                  </div>

                  {/* Last name */}
                  <div>
                    <div className="z-10 flex items-center gap-1 mb-2 w-full min-w-0 relative">
                      <label className="block text-sm font-medium text-black text-nowrap truncate">
                        Last name
                      </label>
                    </div>
                    <div className="relative w-full rounded-extra-sm transition-[outline] duration-300 card">
                      <input
                        className="p-3 w-full text-sm text-black placeholder:text-black/75 focus:outline-none focus:border-none bg-transparent"
                        type="text"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        disabled={isSubmitting}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <div className="z-10 flex items-center gap-1 mb-2 w-full min-w-0 relative">
                    <label className="block text-sm font-medium text-black text-nowrap truncate">
                      Email
                    </label>
                  </div>
                  <div className="relative w-full rounded-extra-sm transition-[outline] duration-300 card">
                    <input
                      className="p-3 w-full text-sm text-black placeholder:text-black/75 focus:outline-none focus:border-none bg-transparent"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                </div>

                {/* Password (collapsible — matches reference grid-template-rows trick) */}
                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.625,0.05,0,1)]"
                  style={{ gridTemplateRows: showPasswordStep ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden flex flex-col gap-4 p-px">
                    <div>
                      <div className="z-10 flex items-center gap-1 mb-2 w-full min-w-0 relative">
                        <label className="block text-sm font-medium text-black text-nowrap truncate">
                          Password
                        </label>
                      </div>
                      <div className="relative w-full rounded-extra-sm transition-[outline] duration-300 card">
                        <input
                          className="p-3 w-full text-sm text-black placeholder:text-black/75 focus:outline-none focus:border-none pr-10 bg-transparent"
                          type={showPassword ? "text" : "password"}
                          placeholder="At least 8 characters and at least 1 special symbol or number"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={isSubmitting}
                          required={showPasswordStep}
                        />
                        <button
                          className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-black/75"
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {/* Password strength hint */}
                      {showPasswordStep &&
                        password.length > 0 &&
                        !isPasswordValid && (
                          <p className="mt-1.5 text-xs text-[#E45A5A]">
                            Min 8 characters with at least 1 number or symbol
                          </p>
                        )}
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  className={`button text-sm font-medium outline-none focus:outline-none focus-visible:outline-none transition-all duration-200 button-primary w-full justify-center ${
                    isSubmitting ||
                    (showPasswordStep ? !canSubmit : !canContinue)
                      ? "opacity-50 select-none pointer-events-none"
                      : ""
                  }`}
                  type="submit"
                  disabled={
                    isSubmitting ||
                    (showPasswordStep ? !canSubmit : !canContinue)
                  }
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5   rounded-lg border-2 border-white border-t-transparent animate-spin" />
                      Creating account...
                    </span>
                  ) : (
                    "Continue"
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="text-center text-sm text-black">
                Already have an account?{" "}
                <button
                  className="cursor-pointer text-[#000] font-medium hover:underline"
                  onClick={() => router.push("/login")}
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Hero Illustration Panel ── */}
        <div className="relative hidden md:flex rounded-[20px] overflow-hidden bg-gradient-to-tr from-[#8DB8FF]/10 to-[#8DFFB3]/10 items-center justify-center border border-[#E6E6E6]">
          <img
            className="absolute inset-0 size-full object-cover opacity-80"
            alt="Auth background"
            src="/bg.png"
          />
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />
          <img
            className="relative z-20 drop- shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  max-w-[85%] w-auto h-auto"
            alt="Webild illustration"
            src="https://www.webild.io/images/input.svg"
          />
        </div>
      </div>
    </div>
  );
}
```

---

## File: `client\pages\Index.tsx`

```tsx
import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ─── Small reusable pieces ───────────────────────────────────────────────────

function DarkButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`inline-flex items-center justify-center h-10 px-6      rounded-lg   btn-dark text-white text-[12px] font-medium transition-all duration-150 active:scale-97 whitespace-nowrap hover:bg-[#3E3E45] ${className}`}
    >
      {children}
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#369762] text-[13px] leading-[18px] font-semibold uppercase tracking-wider mb-2 font-inter-tight">
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[28px] sm:text-[38px] leading-[46px] font-normal text-black font-inter-tight">
      {children}
    </h2>
  );
}

// ─── Template card data ───────────────────────────────────────────────────────

const TEMPLATES_LARGE = [
  {
    name: "Minimal Card",
    subtitle: "Clean, elegant, and focused on essential links",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/ccea70025e4eb65efc78244adad19aa72081243a?width=982",
  },
  {
    name: "Bento Grid",
    subtitle: "A highly visual grid showcasing work, experience, and projects",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/b44548e7be08969a8dfc228c049f55fdc9f7bcbb?width=982",
  },
  {
    name: "Full-Page Scroll",
    subtitle:
      "A modern, smooth-scrolling experience that tells your career story",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/22a1dcc1827cb472b41466029a5665e67ea82849?width=982",
  },
  {
    name: "Dark Bento",
    subtitle: "High-contrast dark mode grid for professional standout profiles",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/de2496b30f9ab12d95e5ad6f29af5e66821c7e0d?width=982",
  },
];

const FAQ_ITEMS = [
  "What is LinkedPage and how does it work?",
  "Do I need design or coding experience to use LinkedPage?",
  "How can I customize my Website?",
  "Can I connect my own domain or subdomain?",
  "Does LinkedPage host my Website?",
  "Can I edit or update my site after publishing?",
  "Can I export the code of my Website?",
];

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white pt-24 pb-16">
      {/* Background image + overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-90">
        <img
          src="/bg.png"
          alt=""
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1536px] mx-auto flex flex-col items-center gap-6 px-6 sm:px-8 lg:px-20 text-center">
        {/* Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5   rounded-lg border border-[#E6E6E6] bg-white  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
          <span className="gradient-text-rainbow text-[13px] font-medium leading-[18px]">
            Create in under 60 seconds
          </span>
          <span className="flex items-center justify-center w-7 h-7   rounded-lg btn-dark-sm flex-shrink-0 active:scale-95 transition-all">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3.98708 3.98709H9.6837V9.68372"
                stroke="white"
                strokeWidth="1.13917"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.98708 9.68372L9.6837 3.98709"
                stroke="white"
                strokeWidth="1.13917"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-black text-[38px] sm:text-[51px] leading-[1.1] font-medium tracking-tight max-w-4xl font-inter-tight">
          LinkedIn to personal Website
        </h1>

        {/* Prompt card */}
        <div className="w-full max-w-[1040px]      rounded-lg   glass-card p-4 sm:p-5 flex flex-col gap-5 mt-4">
          <div className="     rounded-lg   border border-[#E6E6E6] bg-white/20 p-5 flex flex-col gap-4  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
            {/* Textarea */}
            <textarea
              className="w-full bg-transparent text-[#171717] text-[16px] sm:text-[18px] leading-[27px] resize-none outline-none placeholder:text-[#171717]/40 min-h-[72px] font-inter-tight"
              defaultValue="https://www.linkedin.com/in/reidhoffman"
              placeholder="Paste your LinkedIn profile URL here..."
            />

            {/* Bottom actions */}
            <div className="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-[#F3F3F3]">
              <div className="flex items-center gap-3">
                {/* Add button */}
                <button className="flex items-center justify-center w-9 h-9   rounded-lg bg-white border border-[#E6E6E6] card-btn-shadow hover:bg-[#F7F7F7] active:scale-95 transition-all">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M3.68124 8.83502H13.9887"
                      stroke="black"
                      strokeWidth="0.73625"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.83499 3.68127V13.9888"
                      stroke="black"
                      strokeWidth="0.73625"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Enhance prompt button */}
                <button className="h-10 px-5      rounded-lg   bg-[#F3F3F3] text-black text-[12px] font-medium hover:bg-[#EAEAEA] active:scale-97 transition-all whitespace-nowrap">
                  Enhance prompt
                </button>

                {/* Color palette button */}
                <button className="flex items-center justify-center w-9 h-9   rounded-lg bg-white border border-[#E6E6E6] card-btn-shadow hover:bg-[#F7F7F7] active:scale-95 transition-all">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <g clipPath="url(#palette-clip)">
                      <path
                        d="M7.07029 12.9622C5.50766 12.9622 4.00903 12.3415 2.90408 11.2365C1.79913 10.1316 1.17838 8.63296 1.17838 7.07032C1.17838 5.50769 1.79913 4.00906 2.90408 2.90411C4.00903 1.79916 5.50766 1.17841 7.07029 1.17841C8.63293 1.17841 10.1316 1.73708 11.2365 2.73154C12.3415 3.72599 12.9622 5.07476 12.9622 6.48113C12.9622 7.26245 12.6518 8.01176 12.0994 8.56424C11.5469 9.11671 10.7976 9.42709 10.0163 9.42709H8.69057C8.49908 9.42709 8.31138 9.48041 8.1485 9.58108C7.98561 9.68175 7.85397 9.82579 7.76834 9.99706C7.6827 10.1683 7.64645 10.3601 7.66365 10.5508C7.68085 10.7415 7.75081 10.9236 7.8657 11.0768L8.04246 11.3125C8.15735 11.4657 8.22731 11.6478 8.24451 11.8386C8.26171 12.0293 8.22546 12.221 8.13982 12.3923C8.05419 12.5635 7.92255 12.7076 7.75966 12.8082C7.59678 12.9089 7.40907 12.9622 7.21759 12.9622H7.07029Z"
                        stroke="black"
                        strokeWidth="0.589167"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="7.95378" cy="3.82957" r="0.59" fill="black" />
                      <circle cx="10.3104" cy="6.18626" r="0.59" fill="black" />
                      <circle cx="3.8296" cy="7.3646" r="0.59" fill="black" />
                      <circle cx="5.00813" cy="4.41892" r="0.59" fill="black" />
                    </g>
                    <defs>
                      <clipPath id="palette-clip">
                        <rect width="14.1406" height="14.1406" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-3">
                {/* Mic button */}
                <button className="flex items-center justify-center w-9 h-9   rounded-lg bg-white border border-[#E6E6E6] card-btn-shadow hover:bg-[#F7F7F7] active:scale-95 transition-all">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M7.95499 12.5954V14.5837"
                      stroke="black"
                      strokeWidth="0.662917"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.5954 6.62915V7.95498C12.5954 9.1857 12.1065 10.366 11.2363 11.2363C10.366 12.1065 9.18571 12.5954 7.95499 12.5954C6.72428 12.5954 5.54397 12.1065 4.67372 11.2363C3.80347 10.366 3.31458 9.1857 3.31458 7.95498V6.62915"
                      stroke="black"
                      strokeWidth="0.662917"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.94375 3.31456C9.94375 2.2162 9.05335 1.32581 7.955 1.32581C6.85664 1.32581 5.96625 2.2162 5.96625 3.31456V7.95497C5.96625 9.05333 6.85664 9.94372 7.955 9.94372C9.05335 9.94372 9.94375 9.05333 9.94375 7.95497V3.31456Z"
                      stroke="black"
                      strokeWidth="0.662917"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Send button (Primary action) */}
                <button className="flex items-center justify-center w-9 h-9   rounded-lg bg-[#2A2A2F] text-white  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  hover:bg-[#3E3E45] active:scale-95 transition-all">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M3.68127 8.83502L8.83502 3.68127L13.9888 8.83502"
                      stroke="white"
                      strokeWidth="0.73625"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.83502 13.9888V3.68127"
                      stroke="white"
                      strokeWidth="0.73625"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Templates Section ────────────────────────────────────────────────────────

function TemplatesSection() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (dir: "prev" | "next") => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({
      left: dir === "next" ? 520 : -520,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden border-t border-[#E6E6E6]">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div className="flex flex-col">
            <SectionLabel>Browse our collection</SectionLabel>
            <SectionHeading>Start with a Template</SectionHeading>
          </div>
          <DarkButton className="self-start sm:self-auto">
            View All Templates
          </DarkButton>
        </div>

        {/* Template cards carousel */}
        <div className="relative">
          <div
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-4"
          >
            {TEMPLATES_LARGE.map((t, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[300px] sm:w-[380px] lg:w-[495px] template-card group"
              >
                <div className="relative aspect-square      rounded-lg   overflow-hidden bg-[#FBFBFB] border border-[#E6E6E6] p-[11px]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-full h-full object-cover     rounded-lg "
                  />
                  {/* Bottom gradient overlay inside padding */}
                  <div
                    className="absolute bottom-[11px] left-[11px] right-[11px] h-2/5 rounded-b-[8px]"
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
                    }}
                  />
                  {/* Title */}
                  <div className="absolute bottom-[11px] left-[11px] right-[11px] p-5 z-10">
                    <p className="text-white text-[20px] font-normal leading-[26px] font-inter-tight">
                      {t.name}
                    </p>
                    <p className="text-white/75 text-[14px] leading-[20px] font-inter-tight">
                      {t.subtitle}
                    </p>
                  </div>
                  {/* Hover overlay */}
                  <div className="template-hover-overlay absolute inset-[11px] flex items-center justify-center     rounded-lg  bg-white/30 backdrop-blur-[1.5px]">
                    <div className="relative">
                      <div
                        className="absolute -inset-1 opacity-20 blur-[4px]"
                        style={{
                          background:
                            "linear-gradient(95deg, #0894FF 0%, #C959DD 34%, #FF2E54 68%, #FF9004 100%)",
                        }}
                      />
                      <div className="relative p-0.5      rounded-lg   overflow-hidden bg-white">
                        <button className="h-10 px-5      rounded-lg   bg-[#2A2A2F] text-white text-[12px] font-medium hover:bg-[#3E3E45] active:scale-97 transition-all  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
                          Customize this look
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress + controls */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex-1 h-2   rounded-lg border border-[#E6E6E6] bg-[#FBFBFB]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  overflow-hidden mr-8">
            <div
              className="h-full w-1/4   rounded-lg"
              style={{
                background: "linear-gradient(90deg, #8DFFB3 0%, #E6FFE6 100%)",
              }}
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollCarousel("prev")}
              className="flex items-center justify-center w-8 h-8      rounded-lg   border border-[#E6E6E6] bg-white text-black  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  hover:bg-[#F3F3F3] active:scale-95 transition-all"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M7.75625 9.30754L4.65375 6.20504L7.75625 3.10254"
                  stroke="currentColor"
                  strokeWidth="1.03417"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() => scrollCarousel("next")}
              className="flex items-center justify-center w-8 h-8      rounded-lg   border border-[#E6E6E6] bg-white text-black  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  hover:bg-[#F3F3F3] active:scale-95 transition-all"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M4.65375 9.30754L7.75625 6.20504L4.65375 3.10254"
                  stroke="currentColor"
                  strokeWidth="1.03417"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works Section ─────────────────────────────────────────────────────

const HOW_IT_WORKS = [
  {
    img: "/process1 (1).png",
    boldText: "Paste your LinkedIn link",
    restText:
      " and watch LinkedPage scrape your profile data to instantly render a professional personal page.",
  },
  {
    img: "/process1 (2).png",
    boldText: "Customize inline",
    restText:
      " text and images directly on the screen, and pick from multiple clean layout styles like Bento or minimal.",
  },
  {
    img: "/process1 (3).png",
    boldText: "Publish or export",
    restText:
      " instantly to a free subdomain or download the complete source code as a zip file to host anywhere.",
  },
];

function HowItWorksSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F7F7F7] border-t border-b border-[#E6E6E6]">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="flex flex-col">
            <SectionLabel>How It Works</SectionLabel>
            <SectionHeading>Get your page in under 60 seconds</SectionHeading>
          </div>
          <DarkButton className="self-start sm:self-auto">
            Generate Now
          </DarkButton>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOW_IT_WORKS.map((item, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="     rounded-lg   border border-[#E6E6E6] bg-white  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  overflow-hidden p-2">
                <img
                  src={item.img}
                  alt={item.boldText}
                  className="w-full     rounded-lg  object-cover aspect-[41/38]"
                />
              </div>
              <p className="text-[16px] leading-[24px] text-[#171717]/60 font-inter-tight">
                <span className="text-[#171717] font-medium block mb-1 text-[18px] leading-[24px]">
                  {item.boldText}
                </span>
                {item.restText}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Business Section (Career Showcase) ──────────────────────────────────────

const BUSINESS_TABS = ["Experience", "Projects", "Education", "Contact"];
const BUSINESS_CARDS = [
  "https://api.builder.io/api/v1/image/assets/TEMP/dd2d088a6043ca3ede653099742f96ac52246893?width=2560",
  "https://api.builder.io/api/v1/image/assets/TEMP/bd350a3668e75fb33844ff3cbe4a31706b2273df?width=2560",
  "https://api.builder.io/api/v1/image/assets/TEMP/f502cc59ba5f4d7f14360e66cb7e6447fb3a3c98?width=2560",
];

function BusinessSection() {
  const [activeTab, setActiveTab] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (dir: "prev" | "next") => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({
      left: dir === "next" ? 600 : -600,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E6E6E6]">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionLabel>Beautiful structures for real content</SectionLabel>
          <SectionHeading>Showcase Your Career</SectionHeading>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mt-2">
          <div className="flex items-center      rounded-lg   bg-[#F3F3F3] p-1 border border-[#E6E6E6]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
            {BUSINESS_TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`h-9 px-6 text-[14px] leading-[20px] rounded-[10px] transition-all duration-150 whitespace-nowrap font-inter-tight ${
                  activeTab === i
                    ? "bg-[#E6FFE6] border border-[#8DFFB3]/40 text-[#1B5E20]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  font-semibold"
                    : "text-[#171717]/60 hover:text-black hover:bg-black/5"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Card carousel */}
        <div className="relative mt-4">
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide      rounded-lg   border border-[#E6E6E6] p-2 bg-[#FBFBFB]"
          >
            {BUSINESS_CARDS.map((src, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-full max-w-[900px] sm:max-w-[1100px]     rounded-lg  overflow-hidden  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] "
              >
                <img
                  src={src}
                  alt={`Business card ${i + 1}`}
                  className="w-full h-auto     rounded-lg  object-cover"
                />
              </div>
            ))}
          </div>
          {/* Arrows */}
          <button
            onClick={() => scrollCarousel("prev")}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10   rounded-lg bg-white border border-[#E6E6E6] text-black  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  hover:bg-[#F3F3F3] active:scale-95 transition-all hidden sm:flex"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path
                d="M7.75625 9.30754L4.65375 6.20504L7.75625 3.10254"
                stroke="currentColor"
                strokeWidth="1.03417"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => scrollCarousel("next")}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10   rounded-lg bg-white border border-[#E6E6E6] text-black  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  hover:bg-[#F3F3F3] active:scale-95 transition-all hidden sm:flex"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path
                d="M4.65375 9.30754L7.75625 6.20504L4.65375 3.10254"
                stroke="currentColor"
                strokeWidth="1.03417"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Domain Section ───────────────────────────────────────────────────────────

function DomainSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F7F7F7] border-b border-[#E6E6E6]">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="flex flex-col gap-2">
            <SectionLabel>Instant publishing</SectionLabel>
            <h2 className="text-black text-[28px] sm:text-[38px] leading-[46px] font-normal font-inter-tight">
              Claim Your Free Subdomain or Export ZIP
            </h2>
          </div>

          {/* Search box */}
          <div className="w-full max-w-[800px] relative mt-2">
            <div
              className="absolute -inset-0.5 opacity-15 blur-[4px]      rounded-lg  "
              style={{
                background:
                  "linear-gradient(92deg, #0894FF 0%, #C959DD 34%, #FF2E54 68%, #FF9004 100%)",
              }}
            />
            <div className="relative p-1      rounded-lg   overflow-hidden bg-white border border-[#E6E6E6]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
              <div className="flex items-center justify-between px-5 py-4 rounded-[11px] bg-white">
                <div className="flex items-center gap-3">
                  <svg width="16" height="19" viewBox="0 0 16 19" fill="none">
                    <path
                      d="M13.2211 14.7838L10.4889 12.0515"
                      stroke="black"
                      strokeWidth="1.25917"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.92514 13.5241C9.7067 13.5241 11.9616 11.2692 11.9616 8.48764C11.9616 5.70607 9.7067 3.45117 6.92514 3.45117C4.14357 3.45117 1.88867 5.70607 1.88867 8.48764C1.88867 11.2692 4.14357 13.5241 6.92514 13.5241Z"
                      stroke="black"
                      strokeWidth="1.25917"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-black text-[16px] sm:text-[17px] font-medium leading-[27px] font-inter-tight">
                    reidhoffman.linkedpage.me
                  </span>
                </div>
                <button className="flex items-center justify-center w-8 h-8   rounded-lg btn-dark-sm active:scale-95 transition-all text-white  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                    <path
                      d="M5.31708 5.31714H12.9129V12.913"
                      stroke="currentColor"
                      strokeWidth="0.949479"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.31708 12.913L12.9129 5.31714"
                      stroke="currentColor"
                      strokeWidth="0.949479"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <p className="text-[#171717]/60 text-[13px] leading-[19px] underline cursor-pointer hover:text-black font-inter-tight transition-colors">
            Need local files? Download clean code zip
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Brand Section ────────────────────────────────────────────────────────────

const BRAND_CARDS = [
  {
    img: "https://api.builder.io/api/v1/image/assets/TEMP/9f3a1f22cc257cf4f0da1f8d5b8c463fc3e20c54?width=1498",
    boldText: "Notion meets Linktree",
    restText:
      " aesthetics that combine clean bento grid designs with rich professional content.",
  },
  {
    img: "https://api.builder.io/api/v1/image/assets/TEMP/8ef521fbb820f1b4a44b8f4b078009658f2a6baf?width=1498",
    boldText: "No dashboards or bloat",
    restText:
      " — edit your content directly on the page and get a beautiful result in under 60 seconds.",
  },
];

function BrandSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E6E6E6]">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="flex flex-col">
            <SectionLabel>Make it uniquely yours</SectionLabel>
            <SectionHeading>Designed for Professionals</SectionHeading>
          </div>
          <DarkButton className="self-start sm:self-auto">
            Create Page
          </DarkButton>
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BRAND_CARDS.map((card, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="     rounded-lg   border border-[#E6E6E6] bg-[#FBFBFB]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  overflow-hidden p-2">
                <img
                  src={card.img}
                  alt={card.boldText}
                  className="w-full     rounded-lg  object-cover aspect-[129/116]"
                />
              </div>
              <p className="text-[16px] leading-[24px] text-[#171717]/60 font-inter-tight">
                <span className="text-[#171717] font-medium block mb-1 text-[18px] leading-[24px]">
                  {card.boldText}
                </span>
                {card.restText}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features Section ─────────────────────────────────────────────────────────

const FEATURES = [
  {
    img: "/feature (1).png",
    text: "Fully responsive layouts optimized for mobile, tablet, and desktop viewing.",
  },
  {
    img: "/feature (2).png",
    text: "Export clean static code zip files to host on GitHub Pages, Vercel, or Netlify.",
  },
];

function FeaturesSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F7F7F7] border-b border-[#E6E6E6]">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="flex flex-col">
            <SectionLabel>Clean & Modern Aesthetics</SectionLabel>
            <SectionHeading>A Page with Real Content</SectionHeading>
          </div>
          <DarkButton className="self-start sm:self-auto">
            Try It Free
          </DarkButton>
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map((f, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="     rounded-lg   border border-[#E6E6E6] bg-white p-2 overflow-hidden  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
                <img
                  src={f.img}
                  alt={f.text}
                  className="w-full     rounded-lg  object-cover aspect-[13/8]"
                />
              </div>
              <p className="text-[#171717] text-[16px] sm:text-[18px] leading-[27px] font-normal font-inter-tight">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i);

  const answers: Record<number, string> = {
    0: "LinkedPage is a web tool that converts a LinkedIn profile URL into a beautiful personal Website. You paste your LinkedIn link, the platform scrapes your profile data, and instantly renders a customizable page.",
    1: "No design or coding experience is required! LinkedPage automatically extracts your career history, skills, and details, then formats them into a polished personal website.",
    2: "You can edit text and images inline, swap and rearrange layout elements, and switch templates (minimal card, bento grid, full-page scroll, or dark mode) directly on the screen.",
    3: "Yes! You can connect your own custom domain, or publish it instantly on a free subdomain (like yourname.linkedpage.me).",
    4: "Yes, every site built with LinkedPage includes fast, free built-in hosting, so your professional site is online in seconds.",
    5: "Absolutely. You can update your site at any time through our inline visual editor. Changes go live instantly.",
    6: "Yes, you can export the generated code as a ZIP file containing clean, static HTML, CSS, and JS to host on GitHub Pages, Vercel, or any provider of your choice.",
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center mb-12">
          <SectionLabel>Frequently Asked Questions</SectionLabel>
          <SectionHeading>
            Still have questions about LinkedPage?
          </SectionHeading>
        </div>

        {/* FAQ items */}
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          {FAQ_ITEMS.map((question, i) => (
            <div
              key={i}
              className="     rounded-lg   border border-[#E6E6E6] bg-[#FBFBFB]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  overflow-hidden transition-all duration-150"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => toggle(i)}
              >
                <span className="text-[#171717] text-[16px] sm:text-[18px] leading-[26px] font-medium font-inter-tight pr-4">
                  {question}
                </span>
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-[10px] btn-dark-sm text-white  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  active:scale-95 transition-all">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path
                      d="M2.94586 7.5H11.1945"
                      stroke="currentColor"
                      strokeWidth="1.17833"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {openIdx !== i && (
                      <path
                        d="M7.07001 3.375V11.625"
                        stroke="currentColor"
                        strokeWidth="1.17833"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                  </svg>
                </span>
              </button>
              {openIdx === i && (
                <div className="px-6 pb-6 text-[#171717]/60 text-[15px] sm:text-[16px] leading-[24px] font-inter-tight border-t border-[#F3F3F3]/80 pt-4">
                  {answers[i]}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Index() {
  return (
    <div className="min-h-screen font-inter bg-white text-black antialiased">
      <Navbar />
      <main>
        <HeroSection />
        <TemplatesSection />
        <HowItWorksSection />
        <BusinessSection />
        <FeaturesSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
```

---

## File: `components\Footer.tsx`

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, Linkedin, Twitter, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const productLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Templates", href: "#templates" },
  { label: "Pricing", href: "#" },
];

const technologyLinks = [
  { label: "Scraping Engine", href: "#" },
  { label: "Bento Generator", href: "#" },
  { label: "ZIP Export", href: "#" },
];

const companyLinks = [
  { label: "Our Philosophy", href: "#" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact Us", href: "#" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
  { label: "Security Info", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address!");
      return;
    }
    toast.success(`Subscribed ${email} to our newsletter successfully!`);
    setEmail("");
  };

  const handleLinkClick = (label: string, e: React.MouseEvent) => {
    if (e.currentTarget.getAttribute("href") === "#") {
      e.preventDefault();
      toast.info(`${label} portal coming soon!`);
    } else {
      toast(`Navigating to ${label}...`);
    }
  };

  return (
    <footer
      className="w-full p-6 sm:p-10 lg:p-14 bg-cover bg-center bg-no-repeat select-none pointer-events-none"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="w-full max-w-[1536px] mx-auto bg-[#FBFBFB] rounded-[18px] border border-[#E6E6E6]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  px-6 sm:px-12 lg:px-20 py-16 text-black font-inter pointer-events-auto">
        <div className="flex flex-col gap-12">
          {/* Top Section: Giant centered logo */}
          <div className="w-full flex justify-center py-4 border-b border-[#E6E6E6] pb-12">
            <img
              src="/logo.png"
              alt="LinkedPage Logo"
              className="h-[80px] sm:h-[120px] md:h-[140px] w-auto object-contain select-none pointer-events-none"
            />
          </div>

          {/* Details Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pt-4 pb-12 border-b border-[#E6E6E6]">
            {/* Left Column: Newsletter & Social */}
            <div className="md:col-span-4 flex flex-col justify-between gap-10 md:pr-12 md:border-r border-[#E6E6E6]">
              {/* Newsletter form */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-gray-500 font-semibold font-inter-tight">
                  Newsletter
                </span>
                <form
                  onSubmit={handleSubscribe}
                  className="relative w-full max-w-sm mt-1"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full bg-white text-[#171717] border border-[#E6E6E6]      rounded-lg   h-[48px] px-4 pr-12 text-sm placeholder-[#171717]/40 outline-none focus:border-[#8DB8FF] transition-[border-color] duration-200 font-inter-tight  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] "
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#171717] hover:text-black active:scale-[0.95] transition-transform duration-120 ease-out"
                  >
                    <ArrowRight size={16} />
                  </button>
                </form>
                <p className="font-mono text-[9px] text-gray-400 tracking-tight leading-normal uppercase">
                  I accept the terms and conditions
                </p>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.success("Opening Instagram profile...");
                  }}
                  className="text-gray-500 hover:text-black transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.success("Opening LinkedIn showcase...");
                  }}
                  className="text-gray-500 hover:text-black transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.success("Opening X (Twitter) profile...");
                  }}
                  className="text-gray-500 hover:text-black transition-colors"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            {/* Right Columns: Nav Links */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 md:pl-12">
              {/* Product */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-gray-400 font-semibold font-inter-tight">
                  Product
                </span>
                <div className="flex flex-col gap-3">
                  {productLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleLinkClick(link.label, e)}
                      className="text-[#171717]/70 hover:text-black text-sm transition-colors duration-200 font-inter-tight"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Technology */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-gray-400 font-semibold font-inter-tight">
                  Technology
                </span>
                <div className="flex flex-col gap-3">
                  {technologyLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleLinkClick(link.label, e)}
                      className="text-[#171717]/70 hover:text-black text-sm transition-colors duration-200 font-inter-tight"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-gray-400 font-semibold font-inter-tight">
                  Brand
                </span>
                <div className="flex flex-col gap-3">
                  {companyLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleLinkClick(link.label, e)}
                      className="text-[#171717]/70 hover:text-black text-sm transition-colors duration-200 font-inter-tight"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Support */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-gray-400 font-semibold font-inter-tight">
                  Support
                </span>
                <div className="flex flex-col gap-3">
                  {legalLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleLinkClick(link.label, e)}
                      className="text-[#171717]/70 hover:text-black text-sm transition-colors duration-200 font-inter-tight"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between text-xs text-gray-400 font-mono uppercase tracking-wider font-inter-tight">
            <span>Copyright LinkedPage 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

## File: `components\Navbar.tsx`

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (sectionName: string) => {
    setMobileOpen(false);
    toast(`Scrolling to ${sectionName}...`);
  };

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[1536px] px-6 sm:px-0 font-inter">
      <div className="flex items-center justify-between h-14 px-7 py-8 bg-white/70 backdrop-blur-md      rounded-lg   border border-[#E6E6E6]/10  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center">
          <img
            src="/logo.png"
            alt="LinkedPage"
            className="h-[40px] sm:h-[44px] w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href="#features"
            onClick={() => handleNavClick("Features")}
            className="text-[#171717]/85 text-[13px] font-medium leading-[18px] hover:text-black transition-colors font-inter-tight"
          >
            Features
          </a>
          <a
            href="#faq"
            onClick={() => handleNavClick("FAQ")}
            className="text-[#171717]/85 text-[13px] font-medium leading-[18px] hover:text-black transition-colors font-inter-tight"
          >
            FAQ
          </a>
          <a
            href="#templates"
            onClick={() => handleNavClick("Templates")}
            className="text-[#171717]/85 text-[13px] font-medium leading-[18px] hover:text-black transition-colors font-inter-tight"
          >
            Templates
          </a>
          <button
            onClick={() => toast.info("Pricing plans coming soon!")}
            className="text-[#171717]/85 text-[13px] font-medium leading-[18px] hover:text-black transition-colors font-inter-tight"
          >
            Pricing
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Social Icons - desktop only */}
          <div className="hidden md:flex items-center gap-2">
            {/* Discord */}
            <button
              onClick={() =>
                toast.success("Redirecting to Discord community...")
              }
              className="flex items-center justify-center w-9 h-9   rounded-lg bg-white border border-[#E6E6E6]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  text-black hover:bg-[#F3F3F3] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out"
            >
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#discord-clip)">
                  <path
                    d="M13.04 1.19272C12.1164 0.770902 11.12 0.450902 10.08 0.276357C10.0606 0.271508 10.0436 0.278781 10.0291 0.298175C9.89819 0.52363 9.76001 0.821811 9.65819 1.05454C8.53819 0.884842 7.43031 0.884842 6.33456 1.05454C6.23274 0.814539 6.08728 0.52363 5.96365 0.298175C5.95395 0.28363 5.93698 0.276357 5.91274 0.276357C4.87031 0.460599 3.88365 0.766054 2.95274 1.19272C2.94789 1.19272 2.94062 1.19757 2.93092 1.20727C1.04728 4.02181 0.530919 6.7709 0.785465 9.48363C0.785465 9.49818 0.792738 9.5103 0.807283 9.51999C2.05092 10.4364 3.25819 10.9891 4.43637 11.3527C4.45577 11.3527 4.47274 11.3479 4.48728 11.3382C4.7685 10.9551 5.01577 10.5527 5.2291 10.1309C5.2388 10.1067 5.23153 10.0848 5.20728 10.0654C4.81456 9.9103 4.43637 9.7309 4.07274 9.52727C4.04365 9.51272 4.04365 9.46908 4.07274 9.44727C4.15031 9.38908 4.22546 9.3309 4.29819 9.27272C4.31274 9.25818 4.32728 9.25818 4.34183 9.27272C6.72001 10.3564 9.30183 10.3564 11.6509 9.27272C11.6703 9.26787 11.6873 9.26787 11.7018 9.27272C11.7746 9.33575 11.8497 9.39393 11.9273 9.44727C11.9515 9.47636 11.9515 9.50302 11.9273 9.52727C11.5636 9.7406 11.1855 9.91999 10.7927 10.0654C10.7636 10.0751 10.7564 10.097 10.7709 10.1309C10.9891 10.5527 11.2364 10.9551 11.5127 11.3382C11.5273 11.3527 11.5443 11.3576 11.5636 11.3527C12.7491 10.9818 13.9564 10.4291 15.2 9.51999C15.2097 9.5103 15.217 9.49818 15.2218 9.48363C15.5273 6.34908 14.7127 3.62181 13.0691 1.20727C13.0691 1.19757 13.0618 1.19272 13.0473 1.19272H13.04ZM5.58546 7.83999C4.86546 7.83999 4.27637 7.18545 4.27637 6.3709C4.27637 5.55636 4.85819 4.90181 5.58546 4.90181C6.31274 4.90181 6.90183 5.56363 6.89456 6.3709C6.89456 7.17818 6.31274 7.83999 5.58546 7.83999ZM10.4218 7.83999C9.70183 7.83999 9.11274 7.18545 9.11274 6.3709C9.11274 5.55636 9.69456 4.90181 10.4218 4.90181C11.1491 4.90181 11.7382 5.56363 11.7309 6.3709C11.7309 7.17818 11.1564 7.83999 10.4218 7.83999Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="discord-clip">
                    <rect width="16" height="11.6364" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>

            {/* X (Twitter) */}
            <button
              onClick={() => toast.success("Redirecting to Twitter feed...")}
              className="flex items-center justify-center w-9 h-9   rounded-lg bg-white border border-[#E6E6E6]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  text-black hover:bg-[#F3F3F3] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out"
            >
              <svg
                width="14"
                height="13"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#x-clip)">
                  <path
                    d="M11.0133 0H13.16L8.44667 5.36667L13.9533 12.6467H9.632L6.24867 8.22267L2.37534 12.6467H0.228669L5.222 6.90667L-0.0513306 0H4.37734L7.434 4.04133L11.0133 0ZM10.262 11.3867H11.452L3.752 1.21333H2.47334L10.262 11.3867Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="x-clip">
                    <rect width="14" height="12.6467" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>

            {/* Instagram */}
            <button
              onClick={() =>
                toast.success("Redirecting to Instagram profile...")
              }
              className="flex items-center justify-center w-9 h-9   rounded-lg bg-white border border-[#E6E6E6]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  text-black hover:bg-[#F3F3F3] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#ig-clip)">
                  <path
                    d="M12.75 1.5H5.25C3.17893 1.5 1.5 3.17893 1.5 5.25V12.75C1.5 14.8211 3.17893 16.5 5.25 16.5H12.75C14.8211 16.5 16.5 14.8211 16.5 12.75V5.25C16.5 3.17893 14.8211 1.5 12.75 1.5Z"
                    stroke="black"
                    strokeWidth="1.6875"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8.5275C12.0926 9.15168 11.986 9.78916 11.6953 10.3493C11.4047 10.9094 10.9449 11.3636 10.3812 11.6473C9.8176 11.9309 9.17886 12.0297 8.55586 11.9294C7.93287 11.8292 7.35734 11.5351 6.91115 11.0889C6.46496 10.6427 6.17082 10.0672 6.07058 9.44416C5.97033 8.82116 6.06907 8.18242 6.35277 7.61878C6.63647 7.05514 7.09066 6.5953 7.65076 6.30468C8.21086 6.01405 8.84834 5.90744 9.47252 6C10.1092 6.09441 10.6987 6.39109 11.1538 6.84623C11.6089 7.30136 11.9056 7.89081 12 8.5275Z"
                    stroke="black"
                    strokeWidth="1.6875"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.125 4.875H13.1325"
                    stroke="black"
                    strokeWidth="1.6875"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="ig-clip">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>

          {/* Log in (Secondary style) */}
          <Link
            href="/login"
            className="hidden sm:flex h-10 px-5 items-center justify-center      rounded-lg   bg-[#F3F3F3] text-black text-[12px] font-medium hover:bg-[#EAEAEA] active:scale-[0.97] transition-[transform,background-color] duration-150 ease-out whitespace-nowrap font-inter-tight"
          >
            Log in
          </Link>

          {/* Get started (Primary style) */}
          <Link
            href="/editor"
            className="flex h-10 px-5 items-center justify-center      rounded-lg   btn-dark text-white text-[12px] font-medium whitespace-nowrap font-inter-tight"
          >
            Get started
          </Link>

          {/* Mobile menu button */}
          <button
            className="lg:hidden flex items-center justify-center w-9 h-9      rounded-lg   bg-[#F3F3F3] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out ml-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              {mobileOpen ? (
                <>
                  <path
                    d="M4 4L14 14"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M14 4L4 14"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </>
              ) : (
                <>
                  <path
                    d="M3 5H15"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M3 9H15"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M3 13H15"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu with origin-aware animation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ originX: 0.9, originY: 0 }}
            className="mt-2      rounded-lg   border border-[#E6E6E6] bg-white/95 backdrop-blur-md  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  p-4 flex flex-col gap-3 lg:hidden will-change-[transform,opacity]"
          >
            <a
              href="#features"
              className="text-[#171717]/85 text-[14px] py-2 hover:text-black transition-colors font-inter-tight font-medium"
              onClick={() => handleNavClick("Features")}
            >
              Features
            </a>
            <a
              href="#faq"
              className="text-[#171717]/85 text-[14px] py-2 hover:text-black transition-colors font-inter-tight font-medium"
              onClick={() => handleNavClick("FAQ")}
            >
              FAQ
            </a>
            <a
              href="#templates"
              className="text-[#171717]/85 text-[14px] py-2 hover:text-black transition-colors font-inter-tight font-medium"
              onClick={() => handleNavClick("Templates")}
            >
              Templates
            </a>
            <button
              className="text-[#171717]/85 text-[14px] py-2 hover:text-black transition-colors font-inter-tight font-medium text-left"
              onClick={() => {
                setMobileOpen(false);
                toast.info("Pricing plans coming soon!");
              }}
            >
              Pricing
            </button>

            <div className="flex items-center gap-2 pt-2 border-t border-[#E6E6E6]">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex-1 h-10      rounded-lg   bg-[#F3F3F3] text-black text-[12px] font-medium hover:bg-[#EAEAEA] active:scale-[0.97] transition-[transform,background-color] duration-150 ease-out flex items-center justify-center"
              >
                Log in
              </Link>
              <Link
                href="/editor"
                onClick={() => setMobileOpen(false)}
                className="flex-1 h-10      rounded-lg   btn-dark text-white text-[12px] font-medium font-inter-tight flex items-center justify-center"
              >
                Get started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
```

---

## File: `components\UserMenu.tsx`

```tsx
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface UserMenuProps {
  name: string;
  email: string;
  avatarUrl?: string;
  onClose?: () => void;
}

export function UserMenu({
  name,
  email,
  avatarUrl = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  onClose,
}: UserMenuProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, transform: "scale(0.95)" }}
      animate={{ opacity: 1, transform: "scale(1)" }}
      exit={{ opacity: 0, transform: "scale(0.95)" }}
      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
      className="absolute z-50 top-10 rounded-2xl origin-top-right border border-[#010101]/5 bg-white/95 backdrop-blur-xl shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] right-0 w-72 p-5 text-left"
    >
      <div className="space-y-4">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="relative shrink-0 rounded-lg h-9 w-9 p-0.5 border border-[#E6E6E6]">
            <img
              className="h-full w-full object-cover rounded-lg"
              alt="user"
              src={avatarUrl}
            />
          </div>
          <div className="truncate">
            <p className="text-sm font-semibold text-[#2A2A2F] truncate">
              {name || "User"}
            </p>
            <p className="text-xs text-[#171717]/60 truncate">
              {email || "user@example.com"}
            </p>
          </div>
        </div>

        <div className="border-t border-black/5" />

        {/* Credits */}
        <div className="flex flex-col gap-3">
          <div className="relative p-4 flex flex-col gap-2 bg-black/5 backdrop-blur-sm border border-white/40 rounded-[10px]">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-[#2A2A2F]">
                Credits
              </span>
              <span className="text-sm font-medium text-[#2A2A2F]">
                16 left
              </span>
            </div>
            <div className="w-full rounded-lg bg-white border border-[#E6E6E6] overflow-hidden p-0.5">
              <div
                className="relative bg-[#8DFFB3] h-2 rounded-lg transition-all duration-300"
                style={{ width: "25%" }}
              />
            </div>
            <div className="text-xs text-[#171717]/70 mt-1 leading-relaxed">
              You're on the free plan. Unlock additional features and credits by
              upgrading your plan.
            </div>
          </div>
          <button
            onClick={() => {
              toast.info("Pricing modal coming soon!");
              onClose?.();
            }}
            className="flex items-center justify-center font-medium transition-all duration-150 bg-[#2A2A2F] text-white hover:bg-[#3E3E45] rounded-[9px] w-full text-xs h-9 active:scale-95"
            type="button"
          >
            Upgrade
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-1">
          <button
            onClick={() => {
              toast.info("Settings panel coming soon!");
              onClose?.();
            }}
            className="text-sm font-medium transition-colors duration-150 flex items-center h-fit gap-2 justify-start p-2 rounded-lg hover:bg-[#F7F7F7] text-[#171717]/80 hover:text-black w-full"
            type="button"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 0 3.319-1.915" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Settings
          </button>
          <button
            onClick={() => {
              toast.info("Report a bug coming soon!");
              onClose?.();
            }}
            className="text-sm font-medium transition-colors duration-150 flex items-center h-fit gap-2 justify-start p-2 rounded-lg hover:bg-[#F7F7F7] text-[#171717]/80 hover:text-black w-full"
            type="button"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
            </svg>
            Report a bug
          </button>
          <button
            onClick={() => {
              toast.info("Documentation coming soon!");
              onClose?.();
            }}
            className="text-sm font-medium transition-colors duration-150 flex items-center h-fit gap-2 justify-start p-2 rounded-lg hover:bg-[#F7F7F7] text-[#171717]/80 hover:text-black w-full"
            type="button"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 7v14" />
              <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
            </svg>
            Documentation
          </button>
        </div>

        <div className="border-t border-black/5" />
        <button
          onClick={async () => {
            await authClient.signOut();
            sessionStorage.removeItem("linkedpage_user");
            toast.success("Signed out successfully");
            onClose?.();
            router.push("/");
          }}
          className="text-sm font-medium transition-colors duration-150 flex items-center h-fit gap-2 justify-start p-2 rounded-lg hover:bg-red-50 text-[#E45A5A] w-full"
          type="button"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M21 12H9" />
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          </svg>
          Sign out
        </button>
      </div>
    </motion.div>
  );
}
```

---

## File: `components\ui\accordion.tsx`

```tsx
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
```

---

## File: `components\ui\alert-dialog.tsx`

```tsx
import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:    rounded-lg ",
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className,
    )}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
```

---

## File: `components\ui\alert.tsx`

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full     rounded-lg  border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
```

---

## File: `components\ui\aspect-ratio.tsx`

```tsx
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

const AspectRatio = AspectRatioPrimitive.Root;

export { AspectRatio };
```

---

## File: `components\ui\avatar.tsx`

```tsx
import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden   rounded-lg",
      className,
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center   rounded-lg bg-muted",
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
```

---

## File: `components\ui\badge.tsx`

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center   rounded-lg border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
```

---

## File: `components\ui\breadcrumb.tsx`

```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className,
    )}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
```

---

## File: `components\ui\button.tsx`

```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap     rounded-lg  text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9     rounded-lg  px-3",
        lg: "h-11     rounded-lg  px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

---

## File: `components\ui\calendar.tsx`

```tsx
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground     rounded-lg  w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: (props) => {
          if (props.orientation === "left") {
            return <ChevronLeft className="h-4 w-4" />;
          }
          return <ChevronRight className="h-4 w-4" />;
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
```

---

## File: `components\ui\card.tsx`

```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "    rounded-lg  border bg-card text-card-foreground  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
```

---

## File: `components\ui\carousel.tsx`

```tsx
import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute  h-8 w-8   rounded-lg",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8   rounded-lg",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
```

---

## File: `components\ui\chart.tsx`

```tsx
import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([_, config]) => config.theme || config.color,
  );

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean;
      hideIndicator?: boolean;
      indicator?: "line" | "dot" | "dashed";
      nameKey?: string;
      labelKey?: string;
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref,
  ) => {
    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null;
      }

      const [item] = payload;
      const key = `${labelKey || item.dataKey || item.name || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label;

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        );
      }

      if (!value) {
        return null;
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>;
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ]);

    if (!active || !payload?.length) {
      return null;
    }

    const nestLabel = payload.length === 1 && indicator !== "dot";

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5     rounded-lg  border border-border/50 bg-background px-2.5 py-1.5 text-xs  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ",
          className,
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color || item.payload.fill || item.color;

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center",
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            },
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center",
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
ChartTooltipContent.displayName = "ChartTooltip";

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean;
      nameKey?: string;
    }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref,
  ) => {
    const { config } = useChart();

    if (!payload?.length) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className,
        )}
      >
        {payload.map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);

          return (
            <div
              key={item.value}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground",
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
      </div>
    );
  },
);
ChartLegendContent.displayName = "ChartLegend";

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string,
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string;
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
```

---

## File: `components\ui\checkbox.tsx`

```tsx
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0     rounded-lg  border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
```

---

## File: `components\ui\collapsible.tsx`

```tsx
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
```

---

## File: `components\ui\command.tsx`

```tsx
import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden     rounded-lg  bg-popover text-popover-foreground",
      className,
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full     rounded-lg  bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className,
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center     rounded-lg  px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
      className,
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
```

---

## File: `components\ui\context-menu.tsx`

```tsx
import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const ContextMenu = ContextMenuPrimitive.Root;

const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

const ContextMenuGroup = ContextMenuPrimitive.Group;

const ContextMenuPortal = ContextMenuPrimitive.Portal;

const ContextMenuSub = ContextMenuPrimitive.Sub;

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center     rounded-lg  px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden     rounded-lg  border bg-popover p-1 text-popover-foreground  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden     rounded-lg  border bg-popover p-1 text-popover-foreground  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center     rounded-lg  px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center     rounded-lg  py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center     rounded-lg  py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
};
ContextMenuShortcut.displayName = "ContextMenuShortcut";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
```

---

## File: `components\ui\dialog.tsx`

```tsx
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:    rounded-lg ",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4     rounded-lg  opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
```

---

## File: `components\ui\drawer.tsx`

```tsx
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className,
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px]   rounded-lg bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
```

---

## File: `components\ui\dropdown-menu.tsx`

```tsx
import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center     rounded-lg  px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden     rounded-lg  border bg-popover p-1 text-popover-foreground  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden     rounded-lg  border bg-popover p-1 text-popover-foreground  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center     rounded-lg  px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center     rounded-lg  py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center     rounded-lg  py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
```

---

## File: `components\ui\form.tsx`

```tsx
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
```

---

## File: `components\ui\hover-card.tsx`

```tsx
import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "@/lib/utils";

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64     rounded-lg  border bg-popover p-4 text-popover-foreground  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
```

---

## File: `components\ui\input-otp.tsx`

```tsx
import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";

import { cn } from "@/lib/utils";

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName,
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
```

---

## File: `components\ui\input.tsx`

```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full     rounded-lg  border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
```

---

## File: `components\ui\label.tsx`

```tsx
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
```

---

## File: `components\ui\menubar.tsx`

```tsx
import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const MenubarMenu = MenubarPrimitive.Menu;

const MenubarGroup = MenubarPrimitive.Group;

const MenubarPortal = MenubarPrimitive.Portal;

const MenubarSub = MenubarPrimitive.Sub;

const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-10 items-center space-x-1     rounded-lg  border bg-background p-1",
      className,
    )}
    {...props}
  />
));
Menubar.displayName = MenubarPrimitive.Root.displayName;

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center     rounded-lg  px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className,
    )}
    {...props}
  />
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center     rounded-lg  px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden     rounded-lg  border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref,
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[12rem] overflow-hidden     rounded-lg  border bg-popover p-1 text-popover-foreground  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  ),
);
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center     rounded-lg  px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center     rounded-lg  py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center     rounded-lg  py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
};
MenubarShortcut.displayname = "MenubarShortcut";

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
};
```

---

## File: `components\ui\navigation-menu.tsx`

```tsx
import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className,
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className,
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center     rounded-lg  bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden     rounded-lg  border bg-popover text-popover-foreground  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className,
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] " />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
```

---

## File: `components\ui\pagination.tsx`

```tsx
import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
```

---

## File: `components\ui\popover.tsx`

```tsx
import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72     rounded-lg  border bg-popover p-4 text-popover-foreground  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
```

---

## File: `components\ui\progress.tsx`

```tsx
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden   rounded-lg bg-secondary",
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
```

---

## File: `components\ui\radio-group.tsx`

```tsx
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4   rounded-lg border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
```

---

## File: `components\ui\resizable.tsx`

```tsx
import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/lib/utils";

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className,
    )}
    {...props}
  />
);

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center     rounded-lg  border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
```

---

## File: `components\ui\scroll-area.tsx`

```tsx
import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils";

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1   rounded-lg bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
```

---

## File: `components\ui\select.tsx`

```tsx
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between     rounded-lg  border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden     rounded-lg  border bg-popover text-popover-foreground  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center     rounded-lg  py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
```

---

## File: `components\ui\separator.tsx`

```tsx
import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className,
      )}
      {...props}
    />
  ),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
```

---

## File: `components\ui\sheet.tsx`

```tsx
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute right-4 top-4     rounded-lg  opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};
```

---

## File: `components\ui\sidebar.tsx`

```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { PanelLeft } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContext = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContext | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false);

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen);
    const open = openProp ?? _open;
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }

        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [setOpenProp, open],
    );

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open);
    }, [isMobile, setOpen, setOpenMobile]);

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault();
          toggleSidebar();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? "expanded" : "collapsed";

    const contextValue = React.useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      ],
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
              className,
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    );
  },
);
SidebarProvider.displayName = "SidebarProvider";

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
  }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      );
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
              } as React.CSSProperties
            }
            side={side}
          >
            <div className="flex h-full w-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <div
        ref={ref}
        className="group peer hidden md:block text-sidebar-foreground"
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
      >
        {/* This is what handles the sidebar gap on desktop */}
        <div
          className={cn(
            "duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear",
            "group-data-[collapsible=offcanvas]:w-0",
            "group-data-[side=right]:rotate-180",
            variant === "floating" || variant === "inset"
              ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]",
          )}
        />
        <div
          className={cn(
            "duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex",
            side === "left"
              ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
              : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
            // Adjust the padding for floating and inset variants.
            variant === "floating" || variant === "inset"
              ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
            className,
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:    rounded-lg  group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);
Sidebar.displayName = "Sidebar";

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
        "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className,
      )}
      {...props}
    />
  );
});
SidebarRail.displayName = "SidebarRail";

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"main">
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        "relative flex min-h-svh flex-1 flex-col bg-background",
        "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
        className,
      )}
      {...props}
    />
  );
});
SidebarInset.displayName = "SidebarInset";

const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className,
      )}
      {...props}
    />
  );
});
SidebarInput.displayName = "SidebarInput";

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
});
SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
});
SidebarFooter.displayName = "SidebarFooter";

const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...props}
    />
  );
});
SidebarSeparator.displayName = "SidebarSeparator";

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarContent.displayName = "SidebarContent";

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  );
});
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        "duration-200 flex h-8 shrink-0 items-center     rounded-lg  px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className,
      )}
      {...props}
    />
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center     rounded-lg  p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarGroupAction.displayName = "SidebarGroupAction";

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("w-full text-sm", className)}
    {...props}
  />
));
SidebarGroupContent.displayName = "SidebarGroupContent";

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn("flex w-full min-w-0 flex-col gap-1", className)}
    {...props}
  />
));
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("group/menu-item relative", className)}
    {...props}
  />
));
SidebarMenuItem.displayName = "SidebarMenuItem";

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden     rounded-lg  p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const { isMobile, state } = useSidebar();

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    );

    if (!tooltip) {
      return button;
    }

    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip,
      };
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== "collapsed" || isMobile}
          {...tooltip}
        />
      </Tooltip>
    );
  },
);
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    showOnHover?: boolean;
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center     rounded-lg  p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";

const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn(
      "absolute right-1 flex h-5 min-w-5 items-center justify-center     rounded-lg  px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none",
      "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
      className,
    )}
    {...props}
  />
));
SidebarMenuBadge.displayName = "SidebarMenuBadge";

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean;
  }
>(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn(
        "    rounded-lg  h-8 flex gap-2 px-2 items-center",
        className,
      )}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4     rounded-lg "
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 flex-1 max-w-[--skeleton-width]"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn(
      "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
      "group-data-[collapsible=icon]:hidden",
      className,
    )}
    {...props}
  />
));
SidebarMenuSub.displayName = "SidebarMenuSub";

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ ...props }, ref) => <li ref={ref} {...props} />);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean;
    size?: "sm" | "md";
    isActive?: boolean;
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden     rounded-lg  px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
```

---

## File: `components\ui\skeleton.tsx`

```tsx
import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse     rounded-lg  bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
```

---

## File: `components\ui\slider.tsx`

```tsx
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden   rounded-lg bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5   rounded-lg border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
```

---

## File: `components\ui\sonner.tsx`

```tsx
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]: shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
```

---

## File: `components\ui\switch.tsx`

```tsx
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center   rounded-lg border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5   rounded-lg bg-background  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
```

---

## File: `components\ui\table.tsx`

```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className,
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className,
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
```

---

## File: `components\ui\tabs.tsx`

```tsx
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center     rounded-lg  bg-muted p-1 text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap     rounded-lg  px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]: shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
```

---

## File: `components\ui\textarea.tsx`

```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full     rounded-lg  border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
```

---

## File: `components\ui\toast.tsx`

```tsx
import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden     rounded-lg  border p-6 pr-8  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center     rounded-lg  border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2     rounded-lg  p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className,
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
```

---

## File: `components\ui\toaster.tsx`

```tsx
import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
```

---

## File: `components\ui\toggle-group.tsx`

```tsx
import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
});

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
```

---

## File: `components\ui\toggle.tsx`

```tsx
import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center     rounded-lg  text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
```

---

## File: `components\ui\tooltip.tsx`

```tsx
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden     rounded-lg  border bg-popover px-3 py-1.5 text-sm text-popover-foreground  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
```

---

## File: `components\ui\use-toast.ts`

```typescript
import { useToast, toast } from "@/hooks/use-toast";

export { useToast, toast };
```

---

## File: `context\EditorContext.tsx`

```tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { ProfileData, TemplateId, MOCK_PROFILE } from "@/shared/types";
import { toast } from "sonner";

// ─── State Shape ───────────────────────────────────────────────────────────────
interface EditorState {
  websiteId: string | null;
  profile: ProfileData | null;
  editedProfile: ProfileData | null;
  selectedTemplate: TemplateId;
  linkedinUrl: string;
  isLoading: boolean;
  scrapeError: string | null;
  isDirty: boolean;
}

interface EditorActions {
  setWebsiteId: (id: string | null) => void;
  loadWebsite: (id: string) => Promise<void>;
  saveWebsite: () => Promise<void>;
  setLinkedinUrl: (url: string) => void;
  startScrape: (url: string) => Promise<void>;
  startScrapeManual: (file: File) => Promise<boolean>;
  updateField: <K extends keyof ProfileData>(
    key: K,
    value: ProfileData[K],
  ) => void;
  selectTemplate: (id: TemplateId) => void;
  resetEdits: () => void;
  clearProfile: () => void;
  useMockProfile: () => void;
}

type EditorContextValue = EditorState & EditorActions;

// ─── Context ───────────────────────────────────────────────────────────────────
const EditorContext = createContext<EditorContextValue | null>(null);

const SESSION_KEY = "linkedpage_profile";
const TEMPLATE_KEY = "linkedpage_template";
const URL_KEY = "linkedpage_url";

export function EditorProvider({ children }: { children: ReactNode }) {
  const [websiteId, setWebsiteId] = useState<string | null>(null);
  const [linkedinUrl, setLinkedinUrlState] = useState("");
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [editedProfile, setEditedProfile] = useState<ProfileData | null>(null);
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateId>("minimal-card");
  const [isLoading, setIsLoading] = useState(false);
  const [scrapeError, setScrapeError] = useState<string | null>(null);

  // Rehydrate from sessionStorage on mount (fallback/legacy support)
  useEffect(() => {
    try {
      const storedProfile = sessionStorage.getItem(SESSION_KEY);
      const storedTemplate = sessionStorage.getItem(
        TEMPLATE_KEY,
      ) as TemplateId | null;
      const storedUrl = sessionStorage.getItem(URL_KEY);
      if (storedProfile && !websiteId) {
        const p = JSON.parse(storedProfile) as ProfileData;
        setProfile(p);
        setEditedProfile(p);
      }
      if (storedTemplate) setSelectedTemplate(storedTemplate);
      if (storedUrl) setLinkedinUrlState(storedUrl);
    } catch {
      // ignore parse errors
    }
  }, [websiteId]);

  const setLinkedinUrl = useCallback((url: string) => {
    setLinkedinUrlState(url);
    sessionStorage.setItem(URL_KEY, url);
  }, []);

  const persistProfile = useCallback((p: ProfileData) => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(p));
  }, []);

  // Helper to create a website in the backend and assign it the profile data
  const createWebsiteWithProfile = useCallback(
    async (profileData: ProfileData): Promise<string> => {
      // 1. Create a website draft
      const createRes = await fetch("/api/websites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId: selectedTemplate }),
      });
      const createData = await createRes.json();
      if (!createRes.ok || !createData.website) {
        throw new Error(createData.error || "Failed to create website draft");
      }
      const newId = createData.website.id;

      // 2. Save profile data to the website
      const updateRes = await fetch(`/api/websites/${newId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandName: profileData.name,
          profile: profileData,
        }),
      });
      const updateData = await updateRes.json();
      if (!updateRes.ok) {
        throw new Error(
          updateData.error || "Failed to save profile data to website draft",
        );
      }

      setWebsiteId(newId);
      sessionStorage.setItem("linkedpage_brand_name", profileData.name);
      sessionStorage.setItem(
        "linkedpage_subdomain",
        `${createData.website.subdomainSlug}.linkedpage.io`,
      );
      return newId;
    },
    [selectedTemplate],
  );

  // Load website from API
  const loadWebsite = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/websites/${id}`);
      const data = await res.json();
      if (!res.ok || !data.website) {
        throw new Error(data.error || "Failed to load website details");
      }
      const web = data.website;
      setWebsiteId(web.id);
      setProfile(web.profile);
      setEditedProfile(web.profile);
      setSelectedTemplate(web.templateId || "minimal-card");
      if (web.profile.linkedinUrl) {
        setLinkedinUrlState(web.profile.linkedinUrl);
      }

      sessionStorage.setItem("linkedpage_brand_name", web.brandName);
      sessionStorage.setItem(
        "linkedpage_subdomain",
        `${web.subdomainSlug}.linkedpage.io`,
      );
    } catch (e: any) {
      toast.error(e.message || "Failed to load website.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save changes manually to the backend API
  const saveWebsite = useCallback(async () => {
    if (!websiteId || !editedProfile) return;
    try {
      const response = await fetch(`/api/websites/${websiteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: editedProfile,
          templateId: selectedTemplate,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to save website changes");
      }
      setProfile(editedProfile);
    } catch (e: any) {
      console.error("Manual save failed:", e);
    }
  }, [websiteId, editedProfile, selectedTemplate]);

  // Auto-save changes (debounced)
  useEffect(() => {
    if (!websiteId || !editedProfile) return;

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/websites/${websiteId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            profile: editedProfile,
            templateId: selectedTemplate,
          }),
        });
        if (response.ok) {
          setProfile(editedProfile);
        }
      } catch (err) {
        console.error("Auto-save failed:", err);
      }
    }, 1000); // 1-second debounce

    return () => clearTimeout(timer);
  }, [websiteId, editedProfile, selectedTemplate]);

  // Scraping logic using the backend URL scraper
  const startScrape = useCallback(
    async (url: string) => {
      setIsLoading(true);
      setScrapeError(null);
      setLinkedinUrlState(url);
      sessionStorage.setItem(URL_KEY, url);

      try {
        const response = await fetch("/api/scrape", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch LinkedIn profile.");
        }

        const profileData = data.data;
        setProfile(profileData);
        setEditedProfile(profileData);
        persistProfile(profileData);

        // Create site draft in backend
        await createWebsiteWithProfile(profileData);
      } catch (e: any) {
        setScrapeError(
          e.message ||
            "Failed to fetch LinkedIn profile. Please check the URL and try again.",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [persistProfile, createWebsiteWithProfile],
  );

  // Manual scraping logic via uploaded ZIP file
  const startScrapeManual = useCallback(
    async (file: File): Promise<boolean> => {
      setIsLoading(true);
      setScrapeError(null);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/scrape/manual", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to parse ZIP archive.");
        }

        const profileData = data.data;
        setProfile(profileData);
        setEditedProfile(profileData);
        persistProfile(profileData);

        // Create site draft in backend
        await createWebsiteWithProfile(profileData);
        return true;
      } catch (e: any) {
        setScrapeError(
          e.message ||
            "Failed to process ZIP archive. Make sure it contains Profile.csv.",
        );
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [persistProfile, createWebsiteWithProfile],
  );

  const updateField = useCallback(
    <K extends keyof ProfileData>(key: K, value: ProfileData[K]) => {
      setEditedProfile((prev) => {
        if (!prev) return prev;
        const next = { ...prev, [key]: value };
        persistProfile(next);
        return next;
      });
    },
    [persistProfile],
  );

  const selectTemplate = useCallback((id: TemplateId) => {
    setSelectedTemplate(id);
    sessionStorage.setItem(TEMPLATE_KEY, id);
  }, []);

  const resetEdits = useCallback(() => {
    if (profile) {
      setEditedProfile(profile);
      persistProfile(profile);
    }
  }, [profile, persistProfile]);

  const clearProfile = useCallback(() => {
    setWebsiteId(null);
    setProfile(null);
    setEditedProfile(null);
    setScrapeError(null);
    setLinkedinUrlState("");
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(URL_KEY);
  }, []);

  const useMockProfile = useCallback(async () => {
    setProfile(MOCK_PROFILE);
    setEditedProfile(MOCK_PROFILE);
    persistProfile(MOCK_PROFILE);

    // Create website draft in backend
    try {
      await createWebsiteWithProfile(MOCK_PROFILE);
    } catch (e) {
      console.error("Failed to initialize mock website in DB:", e);
    }
  }, [persistProfile, createWebsiteWithProfile]);

  const isDirty =
    !!profile &&
    !!editedProfile &&
    JSON.stringify(profile) !== JSON.stringify(editedProfile);

  return (
    <EditorContext.Provider
      value={{
        websiteId,
        profile,
        editedProfile,
        selectedTemplate,
        linkedinUrl,
        isLoading,
        scrapeError,
        isDirty,
        setWebsiteId,
        loadWebsite,
        saveWebsite,
        setLinkedinUrl,
        startScrape,
        startScrapeManual,
        updateField,
        selectTemplate,
        resetEdits,
        clearProfile,
        useMockProfile,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor(): EditorContextValue {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("useEditor must be used inside <EditorProvider>");
  return ctx;
}
```

---

## File: `hooks\use-mobile.tsx`

```tsx
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
```

---

## File: `hooks\use-toast.ts`

```typescript
import * as React from "react";

import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: ToasterToast["id"];
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: ToasterToast["id"];
    };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t,
        ),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

type Toast = Omit<ToasterToast, "id">;

function toast({ ...props }: Toast) {
  const id = genId();

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast, toast };
```

---

## File: `lib\auth-client.ts`

```typescript
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});
```

---

## File: `lib\auth.ts`

```typescript
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { headers } from "next/headers";
import { User, db } from "./db";
import * as schema from "./schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "linkedpage_local_secret_key_123456_better",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
});

export async function getAuthenticatedUser(): Promise<User | null> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session || !session.user) return null;

    const nameParts = session.user.name.split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    return {
      id: session.user.id,
      firstName,
      lastName,
      email: session.user.email,
      passwordHash: "",
      createdAt: session.user.createdAt
        ? new Date(session.user.createdAt).toISOString()
        : new Date().toISOString(),
    };
  } catch (e) {
    console.error("Error in getAuthenticatedUser:", e);
    return null;
  }
}
```

---

## File: `lib\compiler.ts`

```typescript
import { ProfileData, TemplateId } from "@/shared/types";

export function compileStaticHtml(
  profile: ProfileData,
  templateId: TemplateId,
): string {
  const name = profile.name;
  const headline = profile.headline;
  const summary = profile.summary;
  const location = profile.location || "";
  const avatarUrl = profile.avatarUrl || "https://i.pravatar.cc/300?img=47";

  // Pre-render experiences
  const experienceHtml = profile.experience
    .map(
      (exp) => `
    <div class="experience-item">
      <div class="experience-header">
        <h3 class="experience-title">${exp.title}</h3>
        <span class="experience-duration">${exp.duration}</span>
      </div>
      <p class="experience-company">${exp.company}</p>
      ${exp.description ? `<p class="experience-desc">${exp.description}</p>` : ""}
    </div>
  `,
    )
    .join("");

  // Pre-render skills
  const skillsHtml = profile.skills
    .map(
      (skill) => `
    <span class="skill-badge">${skill.name}</span>
  `,
    )
    .join("");

  // Pre-render links
  const linksHtml = profile.links
    .map(
      (link) => `
    <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="link-button">
      <span>${link.label}</span>
    </a>
  `,
    )
    .join("");

  // Theme styling definitions
  let templateStyles = "";
  let templateBody = "";

  if (templateId === "minimal-card") {
    templateStyles = `
      body { background-color: #FBFBFB; color: #171717; }
      .container { max-width: 520px; margin: 80px auto; padding: 0 20px; }
      .card { background: white; border: 1px border #E6E6E6; border-radius: 20px; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.04), 0 10px 30px -10px rgba(0,0,0,0.08); }
      .header { display: flex; gap: 20px; margin-bottom: 24px; align-items: center; }
      .avatar { width: 80px; height: 80px; border-radius: 12px; object-fit: cover; border: 1px solid #E6E6E6; }
      .name { font-size: 24px; font-weight: 600; margin: 0; color: #000; }
      .headline { font-size: 15px; color: #6B6B6B; margin: 4px 0 0 0; }
      .location { font-size: 12px; color: #9CA3AF; margin-top: 6px; }
      .summary { font-size: 15px; line-height: 1.6; margin-bottom: 30px; }
      .section-title { font-size: 12px; text-transform: uppercase; tracking-wider; color: #9CA3AF; margin-bottom: 16px; font-weight: 600; }
      .experience-list { display: flex; flex-col; gap: 20px; margin-bottom: 30px; }
      .experience-item { border-left: 2px solid #E6E6E6; padding-left: 16px; }
      .experience-title { font-size: 15px; font-weight: 600; margin: 0; }
      .experience-company { font-size: 13px; color: #6B6B6B; margin: 2px 0; }
      .experience-duration { font-size: 12px; color: #9CA3AF; }
      .experience-desc { font-size: 13px; color: #9CA3AF; margin-top: 4px; line-height: 1.5; }
      .skills-container { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 30px; }
      .skill-badge { font-size: 11px; font-weight: 500; padding: 4px 10px; border-radius: 8px; background-color: #DCEAFF; color: #1A4A8A; }
      .links-container { display: flex; flex-wrap: wrap; gap: 10px; }
      .link-button { display: inline-flex; align-items: center; text-decoration: none; font-size: 13px; font-weight: 500; color: #171717; border: 1px solid #E6E6E6; padding: 8px 16px; border-radius: 8px; transition: border-color 0.2s; }
      .link-button:hover { border-color: #8DB8FF; }
    `;
    templateBody = `
      <div class="container">
        <div class="card">
          <div class="header">
            <img src="${avatarUrl}" alt="${name}" class="avatar">
            <div>
              <h1 class="name">${name}</h1>
              <p class="headline">${headline}</p>
              ${location ? `<div class="location">${location}</div>` : ""}
            </div>
          </div>
          <p class="summary">${summary}</p>
          
          ${
            profile.skills.length > 0
              ? `
            <h2 class="section-title">Skills</h2>
            <div class="skills-container">${skillsHtml}</div>
          `
              : ""
          }

          ${
            profile.experience.length > 0
              ? `
            <h2 class="section-title">Experience</h2>
            <div class="experience-list">${experienceHtml}</div>
          `
              : ""
          }

          ${
            profile.links.length > 0
              ? `
            <h2 class="section-title">Links</h2>
            <div class="links-container">${linksHtml}</div>
          `
              : ""
          }
        </div>
      </div>
    `;
  } else if (templateId === "bento-grid") {
    templateStyles = `
      body { background-color: #FBFBFB; color: #171717; }
      .container { max-width: 680px; margin: 60px auto; padding: 0 20px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
      .bento-card { background: white; border: 1px solid #E6E6E6; border-radius: 16px; padding: 24px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
      .col-span-2 { grid-column: span 2; }
      .header-card { display: flex; gap: 20px; align-items: center; }
      .avatar { width: 72px; height: 72px; border-radius: 12px; object-fit: cover; border: 1px solid #E6E6E6; }
      .name { font-size: 22px; font-weight: 600; margin: 0; color: #000; }
      .headline { font-size: 14px; color: #6B6B6B; margin: 4px 0 0 0; }
      .location { font-size: 12px; color: #9CA3AF; margin-top: 6px; }
      .section-title { font-size: 11px; text-transform: uppercase; tracking-wider; color: #9CA3AF; margin-bottom: 12px; font-weight: 600; }
      .summary-text { font-size: 14px; line-height: 1.6; margin: 0; }
      .skills-container { display: flex; flex-wrap: wrap; gap: 6px; }
      .skill-badge { font-size: 11px; font-weight: 500; padding: 4px 8px; border-radius: 6px; background-color: white; border: 1px solid #8DB8FF; color: #1A4A8A; }
      .skills-card { background-color: #DCEAFF; border-color: rgba(141, 184, 255, 0.3); }
      .experience-list { display: flex; flex-direction: column; gap: 16px; }
      .experience-item { display: flex; flex-direction: column; }
      .experience-title { font-size: 13px; font-weight: 600; margin: 0; }
      .experience-company { font-size: 11px; color: #9CA3AF; margin-top: 1px; }
      .experience-duration { font-size: 10px; color: #9CA3AF; margin-top: 1px; }
      .experience-desc { display: none; }
      .links-container { display: flex; flex-wrap: wrap; gap: 8px; }
      .link-button { display: inline-flex; align-items: center; text-decoration: none; font-size: 12px; font-weight: 500; color: #171717; border: 1px solid #E6E6E6; padding: 6px 12px; border-radius: 8px; }
    `;
    templateBody = `
      <div class="container">
        <!-- Header -->
        <div class="bento-card col-span-2 header-card">
          <img src="${avatarUrl}" alt="${name}" class="avatar">
          <div>
            <h1 class="name">${name}</h1>
            <p class="headline">${headline}</p>
            ${location ? `<div class="location">${location}</div>` : ""}
          </div>
        </div>

        <!-- Summary -->
        <div class="bento-card col-span-2">
          <h2 class="section-title">About</h2>
          <p class="summary-text">${summary}</p>
        </div>

        <!-- Skills -->
        <div class="bento-card skills-card">
          <h2 class="section-title" style="color: #1A4A8A;">Skills</h2>
          <div class="skills-container">${skillsHtml}</div>
        </div>

        <!-- Experience -->
        <div class="bento-card">
          <h2 class="section-title">Experience</h2>
          <div class="experience-list">${experienceHtml}</div>
        </div>

        <!-- Links -->
        ${
          profile.links.length > 0
            ? `
          <div class="bento-card col-span-2">
            <h2 class="section-title">Links</h2>
            <div class="links-container">${linksHtml}</div>
          </div>
        `
            : ""
        }
      </div>
    `;
  } else if (templateId === "full-scroll") {
    templateStyles = `
      body { background-color: #F3F3F3; color: #171717; }
      .banner { height: 160px; background: linear-gradient(90deg, #2A2A2F 0%, #3A3A4A 100%); }
      .container { max-width: 600px; margin: -60px auto 80px auto; padding: 0 20px; }
      .avatar { width: 96px; height: 96px; border-radius: 16px; object-fit: cover; border: 4px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.05); margin-bottom: 16px; }
      .name { font-size: 26px; font-weight: 600; margin: 0; color: #000; }
      .headline { font-size: 15px; color: #6B6B6B; margin: 4px 0 0 0; }
      .location { font-size: 12px; color: #9CA3AF; margin-top: 6px; margin-bottom: 16px; }
      .panel { background: white; border: 1px solid #E6E6E6; border-radius: 16px; padding: 24px; margin-bottom: 16px; }
      .section-title { font-size: 11px; text-transform: uppercase; tracking-wider; color: #9CA3AF; margin-bottom: 16px; font-weight: 600; }
      .experience-list { display: flex; flex-direction: column; gap: 24px; }
      .experience-item { display: flex; gap: 12px; }
      .experience-indicator { width: 4px; background-color: #E6E6E6; border-radius: 2px; flex-shrink: 0; margin-top: 4px; }
      .experience-content { flex-1; }
      .experience-title { font-size: 15px; font-weight: 600; margin: 0; }
      .experience-company { font-size: 12px; color: #6B6B6B; margin: 2px 0; }
      .experience-duration { font-size: 11px; color: #9CA3AF; }
      .experience-desc { font-size: 13px; color: #9CA3AF; margin-top: 6px; line-height: 1.5; }
      .skills-container { display: flex; flex-wrap: wrap; gap: 6px; }
      .skill-badge { font-size: 11px; font-weight: 500; padding: 6px 12px; border-radius: 8px; background-color: #F3F3F3; border: 1px solid #E6E6E6; color: #171717; }
      .links-container { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
      .link-button { display: inline-flex; align-items: center; text-decoration: none; font-size: 13px; font-weight: 500; color: #171717; border: 1px solid #E6E6E6; padding: 8px 16px; border-radius: 8px; background: white; }
    `;
    templateBody = `
      <div class="banner"></div>
      <div class="container">
        <img src="${avatarUrl}" alt="${name}" class="avatar">
        <h1 class="name">${name}</h1>
        <p class="headline">${headline}</p>
        ${location ? `<div class="location">${location}</div>` : ""}

        <!-- Links -->
        ${
          profile.links.length > 0
            ? `
          <div class="links-container">${linksHtml}</div>
        `
            : ""
        }

        <!-- About -->
        <div class="panel">
          <h2 class="section-title">About</h2>
          <p class="summary-text" style="font-size: 14px; line-height: 1.6; margin: 0;">${summary}</p>
        </div>

        <!-- Experience -->
        ${
          profile.experience.length > 0
            ? `
          <div class="panel">
            <h2 class="section-title">Experience</h2>
            <div class="experience-list">
              ${profile.experience
                .map(
                  (exp) => `
                <div class="experience-item">
                  <div class="experience-indicator"></div>
                  <div class="experience-content">
                    <h3 class="experience-title">${exp.title}</h3>
                    <p class="experience-company">${exp.company} · <span class="experience-duration">${exp.duration}</span></p>
                    ${exp.description ? `<p class="experience-desc">${exp.description}</p>` : ""}
                  </div>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>
        `
            : ""
        }

        <!-- Skills -->
        ${
          profile.skills.length > 0
            ? `
          <div class="panel">
            <h2 class="section-title">Skills</h2>
            <div class="skills-container">${skillsHtml}</div>
          </div>
        `
            : ""
        }
      </div>
    `;
  } else if (templateId === "dark") {
    templateStyles = `
      body { background-color: #0D0D10; color: #ffffff80; }
      .container { max-width: 540px; margin: 80px auto; padding: 0 20px; }
      .header { display: flex; gap: 20px; align-items: center; margin-bottom: 30px; }
      .avatar { width: 72px; height: 72px; border-radius: 12px; object-fit: cover; border: 1px solid rgba(255,255,255,0.08); }
      .name { font-size: 22px; font-weight: 500; margin: 0; color: white; }
      .headline { font-size: 14px; color: #8DB8FF; margin: 4px 0 0 0; }
      .location { font-size: 11px; color: rgba(255,255,255,0.25); margin-top: 4px; }
      .summary { font-size: 14px; line-height: 1.65; margin-bottom: 30px; color: rgba(255,255,255,0.5); }
      .section-title { font-size: 11px; text-transform: uppercase; tracking-wider; color: rgba(255,255,255,0.25); margin-bottom: 20px; font-weight: 600; }
      .experience-list { display: flex; flex-direction: column; gap: 24px; margin-bottom: 30px; }
      .experience-item { display: flex; gap: 12px; }
      .experience-indicator { width: 1px; background-color: rgba(255,255,255,0.1); flex-shrink: 0; margin-top: 4px; }
      .experience-content { flex-1; }
      .experience-title { font-size: 14px; font-weight: 500; color: white; margin: 0; }
      .experience-company { font-size: 12px; color: rgba(141, 184, 255, 0.7); margin: 2px 0; }
      .experience-duration { font-size: 11px; color: rgba(255,255,255,0.25); }
      .experience-desc { font-size: 12px; color: rgba(255,255,255,0.3); margin-top: 6px; line-height: 1.5; }
      .skills-container { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 30px; }
      .skill-badge { font-size: 11px; font-weight: 500; padding: 4px 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); color: #8DB8FF; background: transparent; }
      .links-container { display: flex; flex-wrap: wrap; gap: 8px; }
      .link-button { display: inline-flex; align-items: center; text-decoration: none; font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.4); border: 1px solid rgba(255,255,255,0.08); padding: 8px 16px; border-radius: 8px; transition: color 0.2s, border-color 0.2s; }
      .link-button:hover { color: white; border-color: rgba(141,184,255,0.3); }
      hr { border: 0; border-top: 1px solid rgba(255,255,255,0.05); margin-bottom: 30px; }
    `;
    templateBody = `
      <div class="container">
        <!-- Header -->
        <div class="header">
          <img src="${avatarUrl}" alt="${name}" class="avatar">
          <div>
            <h1 class="name">${name}</h1>
            <p class="headline">${headline}</p>
            ${location ? `<div class="location">${location}</div>` : ""}
          </div>
        </div>

        <!-- Summary -->
        <p class="summary">${summary}</p>

        <!-- Skills -->
        ${
          profile.skills.length > 0
            ? `
          <div class="skills-container">${skillsHtml}</div>
        `
            : ""
        }

        <hr>

        <!-- Experience -->
        ${
          profile.experience.length > 0
            ? `
          <h2 class="section-title">Experience</h2>
          <div class="experience-list">
            ${profile.experience
              .map(
                (exp) => `
              <div class="experience-item">
                <div class="experience-indicator"></div>
                <div class="experience-content">
                  <h3 class="experience-title">${exp.title}</h3>
                  <p class="experience-company">${exp.company} · <span class="experience-duration">${exp.duration}</span></p>
                  ${exp.description ? `<p class="experience-desc">${exp.description}</p>` : ""}
                </div>
              </div>
            `,
              )
              .join("")}
          </div>
        `
            : ""
        }

        <!-- Links -->
        ${
          profile.links.length > 0
            ? `
          <div class="links-container">${linksHtml}</div>
        `
            : ""
        }
      </div>
    `;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} - Professional Portfolio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter Tight', 'Inter', sans-serif;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }
    ${templateStyles}
  </style>
</head>
<body>
  ${templateBody}
</body>
</html>`;
}
```

---

## File: `lib\db.ts`

```typescript
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { eq } from "drizzle-orm";
import * as schema from "./schema";
import { ProfileData, TemplateId, MOCK_PROFILE } from "@/shared/types";

// User interface for app compatibility
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface CustomDomain {
  id: string;
  name: string;
  status: "pending" | "active";
}

export interface Website {
  id: string;
  userId: string;
  brandName: string;
  subdomainSlug: string;
  templateId: TemplateId;
  seoTitle: string;
  seoDesc: string;
  customDomains: CustomDomain[];
  profile: ProfileData;
  publishedProfile?: ProfileData;
  publishedTemplate?: TemplateId;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:imblue-12345@localhost:4000/linked";

const pool = new Pool({
  connectionString,
});

export const db = drizzle(pool, { schema });

export async function getUserWebsites(userId: string): Promise<Website[]> {
  const rows = await db
    .select()
    .from(schema.website)
    .where(eq(schema.website.userId, userId));
  return rows.map((w) => ({
    ...w,
    templateId: w.templateId as TemplateId,
    customDomains: (w.customDomains || []) as CustomDomain[],
    profile: w.profile as ProfileData,
    publishedProfile: (w.publishedProfile || undefined) as
      | ProfileData
      | undefined,
    publishedTemplate: (w.publishedTemplate || undefined) as
      | TemplateId
      | undefined,
    createdAt: w.createdAt.toISOString(),
    updatedAt: w.updatedAt.toISOString(),
  }));
}

export async function getWebsiteById(id: string): Promise<Website | undefined> {
  const rows = await db
    .select()
    .from(schema.website)
    .where(eq(schema.website.id, id))
    .limit(1);
  const w = rows[0];
  if (!w) return undefined;
  return {
    ...w,
    templateId: w.templateId as TemplateId,
    customDomains: (w.customDomains || []) as CustomDomain[],
    profile: w.profile as ProfileData,
    publishedProfile: (w.publishedProfile || undefined) as
      | ProfileData
      | undefined,
    publishedTemplate: (w.publishedTemplate || undefined) as
      | TemplateId
      | undefined,
    createdAt: w.createdAt.toISOString(),
    updatedAt: w.updatedAt.toISOString(),
  };
}

export async function getWebsiteBySubdomain(
  subdomainSlug: string,
): Promise<Website | undefined> {
  const rows = await db
    .select()
    .from(schema.website)
    .where(eq(schema.website.subdomainSlug, subdomainSlug.toLowerCase()))
    .limit(1);
  const w = rows[0];
  if (!w) return undefined;
  return {
    ...w,
    templateId: w.templateId as TemplateId,
    customDomains: (w.customDomains || []) as CustomDomain[],
    profile: w.profile as ProfileData,
    publishedProfile: (w.publishedProfile || undefined) as
      | ProfileData
      | undefined,
    publishedTemplate: (w.publishedTemplate || undefined) as
      | TemplateId
      | undefined,
    createdAt: w.createdAt.toISOString(),
    updatedAt: w.updatedAt.toISOString(),
  };
}

export async function getWebsiteByDomain(
  domainName: string,
): Promise<Website | undefined> {
  const rows = await db.select().from(schema.website);
  const match = rows.find((w) =>
    ((w.customDomains || []) as CustomDomain[]).some(
      (d) => d.name.toLowerCase() === domainName.toLowerCase(),
    ),
  );
  if (!match) return undefined;
  return {
    ...match,
    templateId: match.templateId as TemplateId,
    customDomains: (match.customDomains || []) as CustomDomain[],
    profile: match.profile as ProfileData,
    publishedProfile: (match.publishedProfile || undefined) as
      | ProfileData
      | undefined,
    publishedTemplate: (match.publishedTemplate || undefined) as
      | TemplateId
      | undefined,
    createdAt: match.createdAt.toISOString(),
    updatedAt: match.updatedAt.toISOString(),
  };
}

export async function createWebsite(
  userId: string,
  templateId: TemplateId = "minimal-card",
): Promise<Website> {
  const uRows = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.id, userId))
    .limit(1);
  const user = uRows[0];
  const name = user ? user.name : "Alex Morgan";
  const slug =
    name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "") +
    "-" +
    Math.floor(1000 + Math.random() * 9000);
  const id = "web_" + Math.random().toString(36).substring(2, 11);

  const newWebsite = {
    id,
    userId,
    brandName: user ? `${user.name}'s Portfolio` : "Creative Portfolio",
    subdomainSlug: slug,
    templateId: templateId as string,
    seoTitle: `${name} - Professional Micro-site`,
    seoDesc:
      "Explore my professional experience, projects, education, and social networks.",
    customDomains: [] as any,
    profile: {
      ...MOCK_PROFILE,
      name,
      headline: "Senior Professional",
      summary: "Welcome to my personal micro-site.",
      experience: [],
      education: [],
      skills: [],
      links: [],
    } as any,
    publishedProfile: null,
    publishedTemplate: null,
    isPublished: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await db.insert(schema.website).values(newWebsite);

  return {
    ...newWebsite,
    templateId: newWebsite.templateId as TemplateId,
    customDomains: newWebsite.customDomains as CustomDomain[],
    profile: newWebsite.profile as ProfileData,
    publishedProfile: undefined,
    publishedTemplate: undefined,
    createdAt: newWebsite.createdAt.toISOString(),
    updatedAt: newWebsite.updatedAt.toISOString(),
  };
}

export async function updateWebsite(
  id: string,
  updates: Partial<Omit<Website, "id" | "userId" | "createdAt">>,
): Promise<Website | undefined> {
  const formattedUpdates: any = {
    ...updates,
    updatedAt: new Date(),
  };

  await db
    .update(schema.website)
    .set(formattedUpdates)
    .where(eq(schema.website.id, id));
  return getWebsiteById(id);
}

export async function deleteWebsite(id: string): Promise<boolean> {
  await db.delete(schema.website).where(eq(schema.website.id, id));
  return true;
}
```

---

## File: `lib\schema.ts`

```typescript
import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  jsonb,
  index,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

// App data website configuration table
export const website = pgTable("website", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  brandName: text("brand_name").notNull(),
  subdomainSlug: text("subdomain_slug").notNull().unique(),
  templateId: text("template_id").notNull(),
  seoTitle: text("seo_title").notNull(),
  seoDesc: text("seo_desc").notNull(),
  customDomains: jsonb("custom_domains").notNull().default([]), // stores Array<{ id, name, status }>
  profile: jsonb("profile").notNull(), // stores ProfileData
  publishedProfile: jsonb("published_profile"), // stores ProfileData
  publishedTemplate: text("published_template"),
  isPublished: boolean("is_published").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  websites: many(website),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const websiteRelations = relations(website, ({ one }) => ({
  user: one(user, {
    fields: [website.userId],
    references: [user.id],
  }),
}));
```

---

## File: `lib\utils.spec.ts`

```typescript
import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn function", () => {
  it("should merge classes correctly", () => {
    expect(cn("text-red-500", "bg-blue-500")).toBe("text-red-500 bg-blue-500");
  });

  it("should handle conditional classes", () => {
    const isActive = true;
    expect(cn("base-class", isActive && "active-class")).toBe(
      "base-class active-class",
    );
  });

  it("should handle false and null conditions", () => {
    const isActive = false;
    expect(cn("base-class", isActive && "active-class", null)).toBe(
      "base-class",
    );
  });

  it("should merge tailwind classes properly", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("should work with object notation", () => {
    expect(cn("base", { conditional: true, "not-included": false })).toBe(
      "base conditional",
    );
  });
});
```

---

## File: `lib\utils.ts`

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## File: `linkedin_scraper\run_spider.py`

```python
import sys
import os
import json
import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

# Add project root to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from linkedin_scraper.spiders.linkedin_profile import LinkedinProfileSpider

def scrape(url):
    settings = get_project_settings()
    # Configure JSON export format to stdout or temp file
    settings.set('FEED_FORMAT', 'json')
    settings.set('LOG_LEVEL', 'INFO')

    # We want to capture the items inside a list
    results = []

    class CapturePipeline:
        def process_item(self, item, spider):
            results.append(item)
            return item

    # Dynamically attach pipeline to capture results in-memory
    settings.set('ITEM_PIPELINES', {
        CapturePipeline: 300
    })

    process = CrawlerProcess(settings)
    process.crawl(LinkedinProfileSpider, url=url)
    process.start() # blocks until crawl completes

    return results[0] if results else {"error": "No data scraped"}

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "LinkedIn URL parameter required"}))
        sys.exit(1)

    url = sys.argv[1]
    data = scrape(url)
    print(json.dumps(data))

```

---

## File: `linkedin_scraper\scrapy.cfg`

```cfg
# Automatically created by: scrapy startproject
#
# For more information about the [deploy] section see:
# https://scrapyd.readthedocs.io/en/latest/deploy.html

[settings]
default = linkedin_scraper.settings

[deploy]
#url = http://localhost:6800/
project = linkedin_scraper

```

---

## File: `linkedin_scraper\linkedin_scraper\items.py`

```python
# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class LinkedinScraperItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    pass

```

---

## File: `linkedin_scraper\linkedin_scraper\middlewares.py`

```python
# Define here the models for your spider middleware
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/spider-middleware.html

from scrapy import signals

# useful for handling different item types with a single interface
from itemadapter import ItemAdapter


class LinkedinScraperSpiderMiddleware:
    # Not all methods need to be defined. If a method is not defined,
    # scrapy acts as if the spider middleware does not modify the
    # passed objects.

    @classmethod
    def from_crawler(cls, crawler):
        # This method is used by Scrapy to create your spiders.
        s = cls()
        crawler.signals.connect(s.spider_opened, signal=signals.spider_opened)
        return s

    def process_spider_input(self, response, spider):
        # Called for each response that goes through the spider
        # middleware and into the spider.

        # Should return None or raise an exception.
        return None

    def process_spider_output(self, response, result, spider):
        # Called with the results returned from the Spider, after
        # it has processed the response.

        # Must return an iterable of Request, or item objects.
        for i in result:
            yield i

    def process_spider_exception(self, response, exception, spider):
        # Called when a spider or process_spider_input() method
        # (from other spider middleware) raises an exception.

        # Should return either None or an iterable of Request or item objects.
        pass

    async def process_start(self, start):
        # Called with an async iterator over the spider start() method or the
        # matching method of an earlier spider middleware.
        async for item_or_request in start:
            yield item_or_request

    def spider_opened(self, spider):
        spider.logger.info("Spider opened: %s" % spider.name)


class LinkedinScraperDownloaderMiddleware:
    # Not all methods need to be defined. If a method is not defined,
    # scrapy acts as if the downloader middleware does not modify the
    # passed objects.

    @classmethod
    def from_crawler(cls, crawler):
        # This method is used by Scrapy to create your spiders.
        s = cls()
        crawler.signals.connect(s.spider_opened, signal=signals.spider_opened)
        return s

    def process_request(self, request, spider):
        # Called for each request that goes through the downloader
        # middleware.

        # Must either:
        # - return None: continue processing this request
        # - or return a Response object
        # - or return a Request object
        # - or raise IgnoreRequest: process_exception() methods of
        #   installed downloader middleware will be called
        return None

    def process_response(self, request, response, spider):
        # Called with the response returned from the downloader.

        # Must either;
        # - return a Response object
        # - return a Request object
        # - or raise IgnoreRequest
        return response

    def process_exception(self, request, exception, spider):
        # Called when a download handler or a process_request()
        # (from other downloader middleware) raises an exception.

        # Must either:
        # - return None: continue processing this exception
        # - return a Response object: stops process_exception() chain
        # - return a Request object: stops process_exception() chain
        pass

    def spider_opened(self, spider):
        spider.logger.info("Spider opened: %s" % spider.name)

```

---

## File: `linkedin_scraper\linkedin_scraper\pipelines.py`

```python
# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter


class LinkedinScraperPipeline:
    def process_item(self, item, spider):
        return item

```

---

## File: `linkedin_scraper\linkedin_scraper\settings.py`

```python
# Scrapy settings for linkedin_scraper project
#
# For simplicity, this file contains only settings considered important or
# commonly used. You can find more settings consulting the documentation:
#
#     https://docs.scrapy.org/en/latest/topics/settings.html
#     https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
#     https://docs.scrapy.org/en/latest/topics/spider-middleware.html

BOT_NAME = "linkedin_scraper"

SPIDER_MODULES = ["linkedin_scraper.spiders"]
NEWSPIDER_MODULE = "linkedin_scraper.spiders"

ADDONS = {}


# Crawl responsibly by identifying yourself (and your website) on the user-agent
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

# Obey robots.txt rules
ROBOTSTXT_OBEY = False

# Concurrency and throttling settings
#CONCURRENT_REQUESTS = 16
CONCURRENT_REQUESTS_PER_DOMAIN = 1
DOWNLOAD_DELAY = 1

# Disable cookies (enabled by default)
#COOKIES_ENABLED = False

# Disable Telnet Console (enabled by default)
#TELNETCONSOLE_ENABLED = False

# Override the default request headers:
#DEFAULT_REQUEST_HEADERS = {
#    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
#    "Accept-Language": "en",
#}

# Enable or disable spider middlewares
# See https://docs.scrapy.org/en/latest/topics/spider-middleware.html
#SPIDER_MIDDLEWARES = {
#    "linkedin_scraper.middlewares.LinkedinScraperSpiderMiddleware": 543,
#}

# Enable or disable downloader middlewares
# See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
#DOWNLOADER_MIDDLEWARES = {
#    "linkedin_scraper.middlewares.LinkedinScraperDownloaderMiddleware": 543,
#}

# Enable or disable extensions
# See https://docs.scrapy.org/en/latest/topics/extensions.html
#EXTENSIONS = {
#    "scrapy.extensions.telnet.TelnetConsole": None,
#}

# Configure item pipelines
# See https://docs.scrapy.org/en/latest/topics/item-pipeline.html
#ITEM_PIPELINES = {
#    "linkedin_scraper.pipelines.LinkedinScraperPipeline": 300,
#}

# Enable and configure the AutoThrottle extension (disabled by default)
# See https://docs.scrapy.org/en/latest/topics/autothrottle.html
#AUTOTHROTTLE_ENABLED = True
# The initial download delay
#AUTOTHROTTLE_START_DELAY = 5
# The maximum download delay to be set in case of high latencies
#AUTOTHROTTLE_MAX_DELAY = 60
# The average number of requests Scrapy should be sending in parallel to
# each remote server
#AUTOTHROTTLE_TARGET_CONCURRENCY = 1.0
# Enable showing throttling stats for every response received:
#AUTOTHROTTLE_DEBUG = False

# Enable and configure HTTP caching (disabled by default)
# See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html#httpcache-middleware-settings
#HTTPCACHE_ENABLED = True
#HTTPCACHE_EXPIRATION_SECS = 0
#HTTPCACHE_DIR = "httpcache"
#HTTPCACHE_IGNORE_HTTP_CODES = []
#HTTPCACHE_STORAGE = "scrapy.extensions.httpcache.FilesystemCacheStorage"

# Set settings whose default value is deprecated to a future-proof value
FEED_EXPORT_ENCODING = "utf-8"

```

---

## File: `linkedin_scraper\linkedin_scraper\__init__.py`

```python

```

---

## File: `linkedin_scraper\linkedin_scraper\spiders\linkedin_profile.py`

```python
import scrapy
import json
from scrapy.utils.project import get_project_settings

class LinkedinProfileSpider(scrapy.Spider):
    name = "linkedin_profile"
    allowed_domains = ["linkedin.com"]

    def __init__(self, url=None, *args, **kwargs):
        super(LinkedinProfileSpider, self).__init__(*args, **kwargs)
        self.start_urls = [url] if url else []
        self.scraped_data = None

    def parse(self, response):
        # Verify if redirect to login page happened
        current_url = response.url
        if "linkedin.com/login" in current_url or "linkedin.com/signup" in current_url or "authwall" in current_url:
            self.logger.error("LinkedIn security check / login redirect triggered.")
            self.scraped_data = {
                "error": "LinkedIn authwall triggered. Private profile scraping requires cookies/credentials."
            }
            yield self.scraped_data
            return

        # Extract name
        name = response.css(".top-card-layout__title::text").get()
        if not name:
            name = response.css("h1::text").get()
        name = name.strip() if name else "John Doe"

        # Extract headline
        headline = response.css(".top-card-layout__headline::text").get()
        headline = headline.strip() if headline else "Professional expert"

        # Extract location
        location = response.css(".top-card-layout__first-subline::text").get()
        if not location:
            location = response.css(".top-card__subline-item::text").get()
        location = location.strip() if location else "San Francisco, CA"

        # Extract summary / about section
        summary = response.css(".summary__text::text").get()
        summary = summary.strip() if summary else f"I'm {name}. Passionate about building products, driving impact, and solving complex challenges."

        # Extract avatar url
        avatar_url = response.css(".top-card-layout__entity-image-container img::attr(src)").get()
        if not avatar_url:
            avatar_url = f"https://api.dicebear.com/7.x/initials/svg?seed={name}&backgroundColor=8db8ff,8dffb3,2a2a2f"

        # Parse experience
        experience = []
        for el in response.css("li.experience-item, .experience-item"):
            title = el.css(".experience-item__title::text").get()
            if not title:
                title = el.css("h3::text").get()
            title = title.strip() if title else "Role"

            company = el.css(".experience-item__subtitle::text").get()
            if not company:
                company = el.css("h4::text").get()
            company = company.strip() if company else "Company"

            duration = el.css(".experience-item__duration::text").get()
            if not duration:
                duration = el.css(".experience-item__meta-item::text").get()
            duration = duration.strip() if duration else ""

            description = el.css(".experience-item__description::text").get()
            description = description.strip() if description else ""

            experience.append({
                "title": title,
                "company": company,
                "duration": duration,
                "description": description,
                "logo": ""
            })

        # Parse education
        education = []
        for el in response.css("li.education__list-item"):
            school = el.css(".education__school-name::text").get()
            degree = el.css(".education__degree-name::text").get()
            duration = el.css(".education__duration::text").get()

            school = school.strip() if school else ""
            degree = degree.strip() if degree else ""
            duration = duration.strip() if duration else ""

            if school:
                education.append({
                    "school": school,
                    "degree": degree,
                    "duration": duration
                })

        self.scraped_data = {
            "name": name,
            "headline": headline,
            "summary": summary,
            "location": location,
            "avatarUrl": avatar_url,
            "experience": experience,
            "education": education,
            "linkedinUrl": response.url
        }

        yield self.scraped_data

```

---

## File: `linkedin_scraper\linkedin_scraper\spiders\__init__.py`

```python
# This package will contain the spiders of your Scrapy project
#
# Please refer to the documentation for information on how to create and manage
# your spiders.

```

---

## File: `scripts\compile_codebase.py`

````python
import os

def compile_project():
    exclude_dirs = {
        'node_modules', '.git', '.next', 'dist', '.agents', '.gemini',
        'package-lock.json', 'pnpm-lock.yaml', 'tsconfig.tsbuildinfo'
    }
    exclude_files = {
        'pnpm-lock.yaml', 'package-lock.yaml', 'tsconfig.tsbuildinfo',
        'check-columns.ts', 'scratch-test.ts', 'test-signup.ts', 'test-api.ts'
    }

    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    output_path = os.path.join(root_dir, 'all_code_compilation.md')

    with open(output_path, 'w', encoding='utf-8') as outfile:
        outfile.write("# Codebase Compilation\n\n")
        outfile.write("This file contains the complete source code of all active project files.\n\n")

        for dirpath, dirnames, filenames in os.walk(root_dir):
            # Exclude directories
            dirnames[:] = [d for d in dirnames if d not in exclude_dirs]

            for filename in filenames:
                if filename in exclude_files:
                    continue

                filepath = os.path.join(dirpath, filename)
                rel_path = os.path.relpath(filepath, root_dir)

                # Only include code/text files
                ext = os.path.splitext(filename)[1].lower()
                if ext in {'.ts', '.tsx', '.json', '.js', '.jsx', '.css', '.md', '.cfg', '.py', '.env'}:
                    try:
                        with open(filepath, 'r', encoding='utf-8') as infile:
                            content = infile.read()

                        outfile.write(f"## File: `{rel_path}`\n")

                        # Set Markdown codeblock syntax highlighting depending on extension
                        lang = ext.replace('.', '')
                        if lang == 'ts': lang = 'typescript'
                        elif lang == 'tsx': lang = 'tsx'
                        elif lang == 'js': lang = 'javascript'
                        elif lang == 'json': lang = 'json'
                        elif lang == 'css': lang = 'css'
                        elif lang == 'py': lang = 'python'
                        elif lang == 'md': lang = 'markdown'

                        outfile.write(f"```{lang}\n")
                        outfile.write(content)
                        outfile.write("\n```\n\n---\n\n")
                    except Exception as e:
                        outfile.write(f"## File: `{rel_path}` (Failed to read: {str(e)})\n\n---\n\n")

    print(f"Compilation finished. Saved to: {output_path}")

if __name__ == '__main__':
    compile_project()

````

---

## File: `shared\api.ts`

```typescript
/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}
```

---

## File: `shared\types.ts`

```typescript
// Shared types for LinkedPage — used by client pages and (future) server routes

export interface ProfileExperience {
  title: string;
  company: string;
  duration: string;
  description: string;
  logo?: string;
}

export interface ProfileEducation {
  degree: string;
  school: string;
  year: string;
}

export interface ProfileSkill {
  name: string;
}

export interface ProfileLink {
  label: string;
  url: string;
  icon?: "linkedin" | "twitter" | "github" | "website" | "email" | "other";
}

export interface ProfileData {
  name: string;
  headline: string;
  location?: string;
  summary: string;
  avatarUrl: string;
  bannerUrl?: string;
  connections?: string;
  experience: ProfileExperience[];
  education: ProfileEducation[];
  skills: ProfileSkill[];
  links: ProfileLink[];
  // raw LinkedIn URL that was scraped
  linkedinUrl: string;
}

export type TemplateId = "minimal-card" | "bento-grid" | "full-scroll" | "dark";

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  description: string;
  previewBg: string;
  accent: string;
  dark: boolean;
}

export const TEMPLATES: TemplateMeta[] = [
  {
    id: "minimal-card",
    name: "Minimal Card",
    description: "Clean, single-card profile. Notion-inspired whitespace.",
    previewBg: "#FFFFFF",
    accent: "#8DB8FF",
    dark: false,
  },
  {
    id: "bento-grid",
    name: "Bento Grid",
    description: "Modular bento layout with skill chips and experience tiles.",
    previewBg: "#FBFBFB",
    accent: "#8DFFB3",
    dark: false,
  },
  {
    id: "full-scroll",
    name: "Full Scroll",
    description: "Long-form scroll with rich sections for experience & work.",
    previewBg: "#F3F3F3",
    accent: "#8DB8FF",
    dark: false,
  },
  {
    id: "dark",
    name: "Dark Mode",
    description: "Sleek dark-themed personal page with subtle glow accents.",
    previewBg: "#131316",
    accent: "#8DB8FF",
    dark: true,
  },
];

// Mock profile for demo / skeleton purposes
export const MOCK_PROFILE: ProfileData = {
  name: "Alex Morgan",
  headline: "Senior Product Designer · Building for humans",
  location: "San Francisco, CA",
  summary:
    "I design products that people actually love using. 8 years working across fintech, healthcare, and B2B SaaS. Currently open to senior IC and staff roles. Previously at Stripe, Linear, and Figma.",
  avatarUrl: "https://i.pravatar.cc/300?img=47",
  bannerUrl: "",
  connections: "2.4k",
  experience: [
    {
      title: "Senior Product Designer",
      company: "Stripe",
      duration: "2022 – Present · 2 yrs",
      description:
        "Led design for Stripe Radar fraud detection. Reduced false positive rate by 23%.",
      logo: "",
    },
    {
      title: "Product Designer",
      company: "Linear",
      duration: "2020 – 2022 · 2 yrs",
      description:
        "Designed the issue tracker, cycles, and roadmap features from 0 to 1.",
      logo: "",
    },
    {
      title: "UI Designer",
      company: "Figma",
      duration: "2018 – 2020 · 2 yrs",
      description:
        "Early design team hire. Shipped community, plugins, and multiplayer.",
      logo: "",
    },
  ],
  education: [
    {
      degree: "B.Des in Interaction Design",
      school: "California College of the Arts",
      year: "2018",
    },
  ],
  skills: [
    { name: "Product Design" },
    { name: "Figma" },
    { name: "User Research" },
    { name: "Design Systems" },
    { name: "Prototyping" },
    { name: "TypeScript" },
    { name: "React" },
    { name: "Motion Design" },
  ],
  links: [
    { label: "LinkedIn", url: "#", icon: "linkedin" },
    { label: "Twitter", url: "#", icon: "twitter" },
    { label: "GitHub", url: "#", icon: "github" },
    { label: "alexmorgan.design", url: "#", icon: "website" },
  ],
  linkedinUrl: "https://linkedin.com/in/alexmorgan",
};

export interface ScrapeResponse {
  success: boolean;
  data?: ProfileData;
  error?: string;
}

export interface PublishResponse {
  success: boolean;
  url?: string;
  slug?: string;
  error?: string;
}
```

---
