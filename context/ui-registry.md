# UI Registry

Living document. Updated after every component is built. Read this before building any new component — match existing patterns exactly before inventing new ones.

---

## How to Use

Before building any component:

1. Check if a similar component already exists here
2. If yes — match its exact classes
3. If no — build it following ui-rules.md and ui-tokens.md, then add it here

After building any component — run `/imprint` to update this file.

---

## Responsive Breakpoint System

These conventions are used across every component. Never deviate from them.

| Breakpoint | Tailwind prefix | Viewport  | Role                              |
| ---------- | --------------- | --------- | --------------------------------- |
| Mobile     | (none)          | < 640px   | Base styles — always defined first |
| Small      | `sm:`           | ≥ 640px   | Tablets, large phones             |
| Medium     | `md:`           | ≥ 768px   | Standard tablet / small laptop    |
| Large      | `lg:`           | ≥ 1024px  | Desktop — two-column layouts kick in |

### Padding scale
```
px-4 sm:px-6 md:px-8   — horizontal page padding (all sections)
py-16 md:py-24          — vertical section padding
pt-12 md:pt-20          — hero top padding
```

### Typography scale
```
text-3xl sm:text-4xl md:text-5xl   — hero / page heading
text-2xl md:text-3xl               — section heading
text-lg md:text-xl                 — large body (testimonial quote)
text-base                          — body text (stays fixed)
text-sm                            — labels, feature text (stays fixed)
text-xs                            — captions, footer (stays fixed)
```

### Button layout
```
Mobile:  flex-col items-stretch  — buttons stack full-width
sm+:     flex-row items-center   — buttons side by side, natural width
```

### Grid layout
```
Single-column default:  grid-cols-1
Two-column at lg+:      lg:grid-cols-2 gap-10 lg:gap-16
Gap between blocks:     gap-16 md:gap-24
```

### Block ordering (two-column sections)
When desktop layout is image-left / text-right, mobile always shows text first:
```
Text div:  order-1 lg:order-2
Image div: order-2 lg:order-1
```

---

## Cross-Component Patterns

### Buttons

**Primary** — accent background, white text
```
bg-accent text-accent-foreground text-sm font-medium px-6 py-3 rounded-lg
hover: hover:opacity-90 transition-opacity
```

**Secondary** — white background, border
```
bg-surface border border-border text-text-primary text-sm font-medium px-6 py-3 rounded-lg
hover: hover:bg-surface-secondary transition-colors
```

**Navbar pill** — pill shape only, not page-level
```
bg-accent text-accent-foreground text-sm font-medium px-4 sm:px-5 py-2 rounded-full
hover: hover:opacity-90 transition-opacity
```

**CTA on gradient** — inverted
```
Primary: bg-white text-accent text-sm font-medium px-6 py-3 rounded-lg
         hover: hover:bg-surface-secondary transition-colors
Ghost:   bg-white/10 border border-white/25 text-white text-sm font-medium px-6 py-3 rounded-lg
         hover: hover:bg-white/20 transition-colors
```

### Section Backgrounds

| Context              | Class             |
| -------------------- | ----------------- |
| White sections       | `bg-surface`      |
| Gray/page sections   | `bg-background`   |
| Gradient CTA section | `bg-cta-gradient` |

### Link Hover

All nav and footer links: `hover:text-accent transition-colors`

### Images / Screenshots

| Context        | Classes                    |
| -------------- | -------------------------- |
| Hero preview   | `rounded-xl md:rounded-2xl shadow-2xl` |
| Feature images | `rounded-xl md:rounded-2xl shadow-xl`  |
| User avatars   | `rounded-full object-cover`            |

### Feature Icon Container

```
w-10 h-10 bg-accent-muted rounded-lg flex items-center justify-center shrink-0
icon: w-5 h-5 text-accent
```

---

## Components

### Navbar

File: `components/layout/Navbar.tsx`
Last updated: 2026-06-16

| Property       | Class                                                                        |
| -------------- | ---------------------------------------------------------------------------- |
| Background     | `bg-surface`                                                                 |
| Border         | `border-b border-border`                                                     |
| Border radius  | none (full-width header)                                                     |
| Height         | `h-16 sticky top-0 z-50`                                                    |
| Logo           | `next/image` — `h-8 w-auto`                                                 |
| Nav links      | `text-sm font-medium text-text-dark` — `hidden md:flex` on mobile           |
| Nav hover      | `hover:text-accent transition-colors`                                        |
| CTA button     | `bg-accent text-accent-foreground text-sm font-medium px-4 sm:px-5 py-2 rounded-full` |
| CTA hover      | `hover:opacity-90 transition-opacity`                                        |
| Shadow         | none                                                                         |
| Mobile label   | "Get Started" (sm:hidden) / "Start for Free" (hidden sm:inline)              |

**Pattern notes:**
Nav links are `hidden md:flex` — invisible below 768px. CTA always visible with `shrink-0 whitespace-nowrap`. Pill shape (`rounded-full`) is exclusive to Navbar — all page-level buttons use `rounded-lg`.

---

### Footer

File: `components/layout/Footer.tsx`
Last updated: 2026-06-16

| Property      | Class                                                          |
| ------------- | -------------------------------------------------------------- |
| Background    | `bg-surface`                                                   |
| Border        | `border-t border-border`                                       |
| Layout        | `flex flex-col sm:flex-row` — stacks on mobile, row on sm+    |
| Gap           | `gap-4`                                                        |
| Padding       | `py-6 px-4 sm:px-6 md:px-8`                                  |
| Logo          | `next/image` — `h-7 w-auto`                                   |
| Copyright     | `text-xs text-text-muted text-center`                         |
| Link text     | `text-xs text-text-secondary`                                  |
| Link hover    | `hover:text-accent transition-colors`                          |
| Shadow        | none                                                           |

---

### Hero

File: `components/homepage/Hero.tsx`
Last updated: 2026-06-16

| Property         | Class                                                                          |
| ---------------- | ------------------------------------------------------------------------------ |
| Background       | `bg-surface`                                                                   |
| Padding          | `pt-12 md:pt-20 pb-0`                                                         |
| Border radius    | none (full-width section)                                                      |
| Heading          | `text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-tight`  |
| Subtitle         | `text-sm md:text-base text-text-secondary leading-relaxed`                     |
| Button layout    | `flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4`      |
| Primary button   | `bg-accent text-accent-foreground text-sm font-medium px-6 py-3 rounded-lg`   |
| Primary hover    | `hover:opacity-90 transition-opacity`                                          |
| Secondary button | `bg-surface border border-border text-text-primary text-sm font-medium px-6 py-3 rounded-lg` |
| Secondary hover  | `hover:bg-surface-secondary transition-colors`                                 |
| Preview image    | `rounded-xl md:rounded-2xl shadow-2xl`                                        |
| Shadow           | `shadow-2xl` on dashboard preview                                              |

**Pattern notes:**
`bg-surface` (white) contrasts with `bg-background` (gray) of the Features section below. Buttons stack full-width on mobile, go side-by-side at sm+. Image radius scales: `rounded-xl` on mobile, `rounded-2xl` on md+.

---

### Features

File: `components/homepage/Features.tsx`
Last updated: 2026-06-16

| Property            | Class                                                         |
| ------------------- | ------------------------------------------------------------- |
| Background          | `bg-background`                                               |
| Padding             | `py-16 md:py-24 px-4 sm:px-6 md:px-8`                       |
| Grid                | `grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16`                |
| Between blocks      | `gap-16 md:gap-24`                                            |
| Section heading     | `text-2xl md:text-3xl font-bold text-text-primary leading-snug` |
| Feature icon box    | `w-10 h-10 bg-accent-muted rounded-lg`                        |
| Icon color          | `w-5 h-5 text-accent`                                        |
| Feature title       | `text-sm font-semibold text-text-primary`                     |
| Feature description | `text-sm text-text-secondary leading-relaxed`                 |
| Feature row gap     | `gap-6 md:gap-7`                                             |
| Feature item gap    | `gap-4`                                                       |
| Image               | `rounded-xl md:rounded-2xl shadow-xl w-full`                 |

**Pattern notes:**
Single column on mobile/tablet, two-column at lg+. For the block where desktop shows image-left/text-right, text uses `order-1 lg:order-2` and image uses `order-2 lg:order-1` so mobile always reads text → image top-to-bottom. Icon boxes always `bg-accent-muted`, never solid `bg-accent`.

---

### HowItWorks (Testimonial + CTA)

File: `components/homepage/HowItWorks.tsx`
Last updated: 2026-06-16

| Property             | Class                                                           |
| -------------------- | --------------------------------------------------------------- |
| Testimonial bg       | `bg-surface`                                                    |
| Testimonial padding  | `py-16 md:py-24 px-4 sm:px-6 md:px-8`                         |
| Quote text           | `text-lg md:text-xl font-medium text-text-primary leading-relaxed` |
| Quote icon           | `text-accent opacity-40`                                        |
| Avatar               | `w-11 h-11 md:w-12 md:h-12 rounded-full object-cover`          |
| Author name          | `text-sm font-semibold text-text-primary`                       |
| Author role          | `text-xs text-text-muted`                                       |
| CTA background       | `bg-cta-gradient` (globals.css — accent → accent-dark → info-medium, 135deg) |
| CTA padding          | `py-16 md:py-24 px-4 sm:px-6 md:px-8`                         |
| CTA heading          | `text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight` |
| CTA subtitle         | `text-sm md:text-base text-white/75 leading-relaxed`            |
| CTA button layout    | `flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4` |
| CTA primary button   | `bg-white text-accent text-sm font-medium px-6 py-3 rounded-lg` |
| CTA ghost button     | `bg-white/10 border border-white/25 text-white text-sm font-medium px-6 py-3 rounded-lg` |
| Decorative orbs      | `w-64 md:w-[480px] bg-white/10` and `bg-info-medium/20` with `blur-3xl pointer-events-none` |

**Pattern notes:**
CTA gradient is always `bg-cta-gradient` (never inline). On gradient sections, primary button inverts to `bg-white text-accent`. Decorative orbs shrink at mobile (`w-64`) to avoid visual noise. CTA buttons follow the same stacking pattern as Hero buttons: `flex-col sm:flex-row`.
