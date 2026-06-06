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
The layout uses centered compositions throughout, maintaining a wide, fixed structure with generous negative space and a soft full-bleed background.
- **Landing Page Hero Layout (Website Image Showcase):** To align with premium SaaS product design, the hero section spans exactly `100vh` with overflow hidden. The layout is centered and consists of a bold display headline, description, and pill-shaped CTAs (with the previous badge removed). At the bottom of the section, the website preview image (`heroimage.png`) is rendered at `80%` width and translated vertically downward by `20%` to hide the lower portion of the screen mockup, with a viewport-bottom absolute white gradient overlay fading upward to blend the visual elements into the white page background.
- **Onboarding Page Layout:** The onboarding page specifically uses a lightweight CSS-based animated mesh gradient instead of image assets to ensure instant page loads. Major content sits inside layered floating panels, while the top navigation uses a rounded, inset container that spans most of the viewport width with even internal spacing.

The spacing rhythm is simple and airy, using a compact base of 2px for micro-adjustments and then jumping to 12px, 18px, 40px, and 90px for component padding, section separation, and dramatic hero breathing room. Cards and controls prefer consistent internal padding over dense alignment, reinforcing the polished, easygoing feel.

## Elevation & Depth
Depth is achieved more through translucency, soft borders, and gentle shadows than through dramatic stacking. Panels use pale surfaces with subtle gray edges and light shadowing to appear lifted from the cloud background without feeling heavy. The interface leans flat overall, but the contrast between white controls, frosted containers, and dark CTA buttons creates enough hierarchy for navigation and action. Inner shadow treatment on primary buttons adds a tactile, slightly embossed quality.

## Shapes
The shape language is soft and rounded, with a notable 13px corner radius on major buttons and cards. Full pills appear on chips, icon buttons, and compact controls, while larger panels keep a moderate rounded rectangle profile. Overall, the system feels approachable and polished rather than angular or architectural.

## Components
Buttons are the most expressive component family. `button-primary` uses the charcoal `#2A2A2F` background with white text, medium label typography, 14px vertical padding, and a 40px minimum height for a confident CTA. `button-secondary` uses `#F3F3F3` with black text and the same sizing, making it ideal for less dominant actions like “Decline” or “Log in.” `button-tertiary` is text-only and should remain visually quiet for low-emphasis navigation or inline actions.

Cards use `card` styling: pale `#FBFBFB` surfaces, 13px radii, modest 11px padding, and a soft shadow. They should feel like display containers rather than hard modules, especially when paired with imagery or template previews. Inputs should stay bright, minimally bordered, and comfortably padded, with clear text contrast and no heavy outline treatment. Chips and icon buttons should remain pill-shaped, compact, and lightly elevated, with icon buttons sized around 36px to preserve the airy control cluster seen in the header and prompt composer. Navigation links should be simple, medium-gray text with minimal chrome, and should not compete with action

### Editor Dashboard Layout & Wizard Integration
The editor `/editor` displays the full dashboard layout shell integrated with the conversational wizard and sub-panels:
- **Left Sidebar (Collapsible Drawer):**
  - Hovering expands the panel from `60px` to `250px`.
  - Hosts navigation items: Home (dashboard redirect), Design (active workspace), Domains (custom domain panel), and Site Settings (site details).
  - Houses the pricing promo card and shortcut links for help, settings, and adding new websites.
- **Left Column Panels (Navigation Switcher):**
  - **Design Tab (Conversational AI Wizard):** Chat-like timeline guiding the user step-by-step with inline widgets for Projects, Interests, Skills, and Experience forms (Steps 2-5). The step forms utilize a minimal, flat, Notion-like UI system redesigned under the `/ui-ux-pro-max` guidelines: structural emojis are replaced with premium Lucide SVG vector icons, inputs and buttons are expanded to standard touch-friendly height (`h-11` or 44px), grey text colors have been upgraded to WCAG AA-compliant high-contrast shades (Tailwind standard colors like `text-neutral-500` / `text-neutral-600`), and buttons/cards feature targeted fluid scale transitions (`active:scale-[0.97] transition-transform duration-100 ease-out`). Step 6 triggers automatic AI copy refinement. Step 7 features the template picker to select theme styles with card-based layouts. After confirming a theme style, the wizard moves directly to **Step 9 (Free-form Chat Editor Mode)**, which activates the bottom text composer with a row of quick suggestion pills on top, letting the user converse freely with the assistant to update copy/styles in real-time.
  - **Domains Tab:** Displays the `DomainsPane` to connect custom domains and verify DNS settings.
  - **Site Settings Tab:** Displays the `SettingsPane` with fields to configure brand details, SEO tags, and delete websites.
- **Top Navbar:**
  - Renders saving indicators ("Unsaved edits" / "All changes saved") with a Reset trigger.
  - Hosts Share (link copier) and Publish actions alongside the User profile menu dropdown.
- **Main Canvas Workspace:**
  - **Canvas Header:** Customize/page dropdowns, subdomain availability ticker, and device size switches (Desktop vs. Mobile).
  - **Preview Area:** Renders step-specific `WizardAnimations` (steps <= 6) in the Design tab, and transitions to the live scalable `ProfilePreview` once the user reaches step >= 7 (where template selection and free-form chat modifications occur) or switches to the Domains/Settings panels.

### Template Style System (4 Premium Framer-Inspired Layouts)
The templates utilize generic system font stacks (sans-serif, serif, mono) for simplicity and fast loads:
- **Daniel Cross:** stark, high-contrast, editorial style. Uses bold display headlines (`font-sans font-black uppercase`), thick black dividers, border-2 outlines, and a clean white background.
- **Julian Mercer:** elegant, warm paper style. Uses a warm background `#FAF8F5`, italic serif typography (`font-serif font-light italic`), monospace metadata tags, and soft dividers.
- **Link Hunt:** links-in-bio style. Features a centered layout (`max-w-md mx-auto text-center`), large avatar, pill buttons for social accounts with icons, and card containers.
- **Biobricks:** grid bento style. Organizes details into modular bricks/cards (`bg-white border border-[#E6E6E6] rounded-2xl p-5`) structured with a clean grid system.

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