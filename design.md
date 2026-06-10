---
version: alpha
name: Webild Cloud Editorial - Forest Green Edition
description: A soft, structured landing-page system with Plus Jakarta Sans headers, frosted panels, and organic Forest Green accents.
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
  accent: "#0A705F"
  accent-soft: "#E6FFE6"
  accent-green: "#8DFFB3"
  accent-green-dark: "#0A705F"
  success: "#BFE7A9"
  error: "#E45A5A"
typography:
  headline-display:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "51px"
    fontWeight: 700
    lineHeight: "51.2px"
    letterSpacing: "-0.02em"
  headline-lg:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "38px"
    fontWeight: 600
    lineHeight: "46px"
    letterSpacing: "-0.015em"
  headline-md:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "29px"
    fontWeight: 600
    lineHeight: "35px"
    letterSpacing: "-0.01em"
  headline-sm:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "21px"
    fontWeight: 600
    lineHeight: "25px"
    letterSpacing: "-0.01em"
  body-lg:
    fontFamily: "Inter"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: "27px"
    letterSpacing: "0px"
  body-md:
    fontFamily: "Inter"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
    letterSpacing: "0px"
  body-sm:
    fontFamily: "Inter"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
    letterSpacing: "0px"
  label-lg:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: "18px"
    letterSpacing: "0px"
  label-md:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: "16px"
    letterSpacing: "0px"
  label-sm:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: "14px"
    letterSpacing: "0px"
  caption:
    fontFamily: "Inter"
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

# Webild Cloud Editorial - Forest Green Edition

## Overview

Webild feels airy, structured, and premium-editorial, with a polished landing-page aesthetic built to inspire quick creation and conversion. The experience balances playful cloudscape imagery with a high-end, product-led asymmetric structure, making it suitable for founders, marketers, and teams wanting a fast way to launch page products.

## Branding & Logos

- **logo.png (Full Logo):** Displays the brand icon and the brand name text. Used in standard headers, navbars, and footers.
- **logoicon.png (Icon Logo):** Displays only the minimalist brand icon. Used in space-constrained slots such as sidebar selectors and small avatar tags.

## Colors

- **Primary (#2A2A2F):** A deep charcoal used for the strongest call-to-action buttons, prominent UI contrast, and dark text accents.
- **Secondary (#F3F3F3):** A soft off-white used for neutral buttons and subtle control surfaces.
- **Tertiary (#FBFBFB):** The lightest elevated surface tone, ideal for cards and panels.
- **Neutral / Surface (#FFFFFF):** Pure white is used for the base canvas, input areas, and high-clarity containers.
- **On-surface (#000000):** Crisp black text for headlines, navigation, and essential labels.
- **On-surface-muted (#171717):** A near-black supporting text tone for card content and body copy.
- **Border (#E6E6E6):** A faint divider color for structural separation and soft edges.
- **Accent (#0A705F):** A muted, organic forest green used for active states, link hover states, and primary status indicators.
- **Accent-soft (#E6FFE6):** A pale minty green highlight for low-emphasis background panels and highlighted tabs.
- **Accent-green (#8DFFB3):** A soft mint green highlight matching the luminance of the primary accent-soft tone.
- **Success (#BFE7A9):** A fresh green used sparingly for positive signals and subtle warmth.
- **Error (#E45A5A):** A restrained red reserved for destructive states.

## Typography

The system uses Plus Jakarta Sans for headlines and display text, which gives the brand a wide, modern, geometric, and high-end agency voice. Body text uses Inter for comfortable reading. Headlines rely on tight letter-spacing (`tracking-tight` or `-0.02em`) and heavier weights (Medium/SemiBold/Bold).

## Layout & Spacing

- **Landing Page Hero Layout (Asymmetric Split):** The hero section is structured as a 50/50 split on desktop viewports. The left side holds a bold display headline (constrained to a maximum of 2 lines to fit neatly in the initial viewport), a concise paragraph description, and pill-shaped CTAs. The right side showcases the interactive website preview image (`heroimage.png`) inside a premium squircle-bezel container, floating with hardware-accelerated transitions.
- **Section Order & Padding:** The landing page has a clear AIDA flow:
  1. Navbar (floating glass pill)
  2. Hero Section (asymmetric split)
  3. How It Works Section (3-column parse steps)
  4. Templates Carousel Section (slider showing template aesthetics)
  5. Career Showcase Section (tabs for Experience, Projects, Education with mockup blocks)
  6. Features Section (2-column details)
  7. FAQ Section (smooth spring toggled cards)
  8. Footer Section (large centered logo with clean links and newsletter)

  Sections use massive vertical padding (`py-24 md:py-32`) to create a spacious, breathable editorial feel.

## Elevation & Depth

Depth is achieved via the Doppelrand (Double-Bezel) card layout technique:

- **Outer Shell:** Light background padding wrapper with a thin neutral border (`border border-black/5` or `border border-white/10`) and large rounded radius (`rounded-[2rem]`).
- **Inner Core:** Nested content container with a calculated concentric radius (`rounded-[calc(2rem-0.5rem)]`) and soft inner highlight shadow to create a physical bezel appearance.

## Motion & Animation Guidelines

- **UI Interactions:** Strong ease-out curves (`cubic-bezier(0.23, 1, 0.32, 1)`) with durations between `150ms` and `250ms`.
- **Spring Physics:** Active states for buttons and tabs use spring curves (`stiffness: 380`, `damping: 30`) to simulate high physical momentum without bouncy overshoot.
- **Tactile Active Press:** Clickable cards and buttons scale down to `scale(0.97)` on active press.
- **Hardware Acceleration:** Only translate `transform` and `opacity` to avoid layout reflow repaints on GPU.
