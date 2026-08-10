---
name: SurveyAdmin Intelligence
colors:
  surface: '#ffffff'
  surface-dim: '#d9dadc'
  surface-bright: '#f9f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f5'
  surface-container: '#eeeef0'
  surface-container-high: '#e8e8ea'
  surface-container-highest: '#e2e2e4'
  on-surface: '#1a1c1d'
  on-surface-variant: '#424752'
  inverse-surface: '#2f3132'
  inverse-on-surface: '#f0f0f2'
  outline: '#727783'
  outline-variant: '#c2c6d4'
  surface-tint: '#0b5cb8'
  primary: '#004289'
  on-primary: '#ffffff'
  primary-container: '#0059b5'
  on-primary-container: '#c0d4ff'
  inverse-primary: '#abc7ff'
  secondary: '#5f5e60'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfe1'
  on-secondary-container: '#636264'
  tertiary: '#762e00'
  on-tertiary: '#ffffff'
  tertiary-container: '#9b3f01'
  on-tertiary-container: '#ffc8af'
  error: '#d70015'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e3ff'
  primary-fixed-dim: '#abc7ff'
  on-primary-fixed: '#001b3f'
  on-primary-fixed-variant: '#00458f'
  secondary-fixed: '#e4e2e4'
  secondary-fixed-dim: '#c8c6c8'
  on-secondary-fixed: '#1b1b1d'
  on-secondary-fixed-variant: '#474649'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb693'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7a3000'
  background: '#f9f9fb'
  on-background: '#1a1c1d'
  surface-variant: '#e2e2e4'
  success: '#248a3d'
  warning: '#b25000'
  separator: '#f0f0f2'
  text-secondary: '#6e6e73'
  text-muted: '#86868b'
  border: '#e5e5ea'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
The brand identity for SurveyAdmin is rooted in **Corporate Modernism** with a heavy influence from **Glassmorphism**. It is designed for enterprise data intelligence, prioritizing precision, reliability, and visual clarity. 

The aesthetic is professional and "high-fidelity," utilizing a "Clean Apple-esque" palette of soft grays and deep blues. It balances functional utility with premium touches like backdrop blurs and subtle interactive shadows. The tone is authoritative yet approachable, suitable for government and large-scale enterprise field operations where data integrity and user focus are paramount.

## Colors
The palette is built on a foundation of neutral whites and soft off-whites (`#f5f5f7`) to create a sense of vast space and cleanliness. 

- **Primary:** A refined, deep corporate blue (`#0059b5`) used for critical actions, active states, and brand recognition.
- **Surface Strategy:** Employs a layered approach. The base background is light gray, while interactive cards and containers use pure white (`#ffffff`) to pop against the substrate.
- **Functional Colors:** High-contrast semantic colors (Success Green, Warning Amber, Error Red) are used sparingly for status indicators and data visualization, ensuring clear communication of system health.
- **Separators:** Extremely subtle borders (`#f0f0f2`) are used to define regions without adding visual noise.

## Typography
The system uses **Inter** exclusively to achieve a neutral, systematic, and utilitarian feel. 

- **Hierarchy:** Strong contrast is created through weight (600 for headings, 400 for body) rather than excessive size differences.
- **Tight Kerning:** Headlines use negative letter spacing (-0.01em to -0.02em) to appear more cohesive and premium at larger scales.
- **Micro-copy:** Labels and secondary metadata utilize uppercase styling with increased tracking (0.02em) at very small sizes (11px) to maintain legibility.
- **Functional Body:** The default reading size is set to 15px/22px, providing a balance between density and comfort.

## Layout & Spacing
The layout follows a **Fixed-Fluid Hybrid** model.
- **Sidebar:** A fixed 256px (64 units) sidebar on desktop provides persistent navigation.
- **Main Canvas:** A fluid content area with a maximum width of 1400px to prevent excessive line lengths on ultra-wide monitors.
- **Grid & Gutters:** Uses a 24px gutter (`lg`) for primary spacing between cards and sections. 
- **Internal Padding:** Cards and containers use a standard 24px (`lg`) internal padding to create a breathable, "premium" feel.
- **Responsive Behavior:** Sidebars collapse to a bottom-sheet or hamburger menu on mobile, and margins tighten from 40px to 16px.

## Elevation & Depth
The system uses **Tonal Layering** combined with **Ambient Shadows** to establish hierarchy.

- **The Ground:** The background is a flat neutral (`#f5f5f7`).
- **Surface Level:** Cards and panels are elevated slightly using a multi-layered shadow (`0 4px 6px -1px rgba(0,0,0,0.05)`).
- **Glass Effects:** Top bars and floating headers use 80% opacity surfaces with a heavy backdrop blur (20px+) and a thin bottom border (`#f0f0f2/50`).
- **Interactive Depth:** On hover, cards transition to a slightly deeper shadow to provide tactile feedback.

## Shapes
The shape language is consistently **Rounded**, communicating modern friendliness without losing professional structure.

- **Primary Containers:** Cards and large panels use a 16px (`rounded-2xl`) corner radius.
- **Buttons & Search:** Secondary actions like search bars and primary call-to-action buttons use a "Full" pill-shaped radius to distinguish them as highly interactive.
- **Small Elements:** Tooltips and status badges use a 4px to 8px radius.
- **Icon Enclosures:** Icons are often housed in soft-radius squares (8px) with low-opacity background tints.

## Components
### Buttons
- **Primary:** Pill-shaped, solid `#0059b5` background with white text. High-density padding (10px vertical, 24px horizontal).
- **Secondary/Ghost:** Transparent background with `#6e6e73` text, transitioning to solid background on hover.

### Cards
- **Premium Card:** White background, 1px border (`#e5e5ea`), 16px radius, and "Premium" shadow. Used for KPI stats and list containers.

### Input Fields
- **Search:** Full-round radius, `#f5f5f7` background, inset search icon. Focus state adds a subtle primary-colored ring and shifts background to white.

### Progress Indicators
- **Linear:** 6px height, rounded-full. Uses a track color of `#eeeef0` and a primary or semantic fill color.

### Navigation
- **Active State:** Navigation links use a subtle primary tint background (`primary/5`) and a 4px vertical "indicator bar" on the leading edge to clearly mark the current location.

### Status Badges
- **Live Sync:** Pill-shaped, low-opacity semantic background (e.g., Green 10%) with a pulsing dot indicator and 11px bold uppercase text.