# Responsive Design Knowledge Base

> Reference knowledge base for the squad-responsive agents.
> Contains principles, techniques, patterns, anti-patterns, and decision trees.

---

## 1. Key Responsive Design Principles

### Mobile-First (Luke Wroblewski)
Design and code for the smallest screen first, then progressively enhance for larger viewports. This forces prioritization of content and features, ensures the core experience works everywhere, and results in smaller CSS (adding rules for larger screens instead of overriding for smaller ones).

**Rule:** Always start with `min-width` media queries, never `max-width` as the primary direction.

### Intrinsic Design (Jen Simmons)
Move beyond fixed breakpoints. Let components define their own sizing behavior based on available space rather than viewport width. Use CSS Grid, Flexbox, `min()`, `max()`, `clamp()`, and Container Queries to create layouts that are inherently responsive without needing media queries for every adjustment.

**Rule:** If a layout requires more than 3 media queries to work at all sizes, it should be redesigned using intrinsic techniques.

### Fluid Everything (Utopia)
Typography, spacing, and layout should scale fluidly between a minimum and maximum value using `clamp()`. This eliminates the "jump" between breakpoints and creates a smooth, continuous responsive experience.

**Formula:** `clamp(min, preferred, max)` where preferred is typically a viewport-relative calculation.

### Defensive CSS (Ahmad Shadeed)
Write CSS that anticipates edge cases: unexpected content length, missing images, dynamic content injection. Every layout decision should have a fallback behavior when content does not match expectations.

**Rule:** Always ask "what happens when this content is longer/shorter/missing?"

### Content-Out, Not Canvas-In (Mark Boulton)
Let the content dictate breakpoints, not device dimensions. Add a breakpoint when the content breaks, not because a popular device has that width.

---

## 2. Breakpoint Strategy Reference

### Recommended Breakpoint Architecture

```css
/* Fluid base (no media query) -- mobile-first */
/* Applies to all viewports */

@media (min-width: 30em)  { /* 480px  -- mobile landscape / large mobile */ }
@media (min-width: 48em)  { /* 768px  -- tablet portrait */ }
@media (min-width: 64em)  { /* 1024px -- tablet landscape / small desktop */ }
@media (min-width: 80em)  { /* 1280px -- desktop */ }
@media (min-width: 90em)  { /* 1440px -- large desktop */ }
@media (min-width: 120em) { /* 1920px -- HD */ }
```

### When to Use Container Queries Instead

Use Container Queries (`@container`) when:
- A component appears in different layout contexts (sidebar vs main content)
- The component's responsive behavior depends on its container, not the viewport
- Building a component library that must work in any layout

```css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card { flex-direction: row; }
}
```

### Breakpoint Naming Convention

Prefer semantic names over device names:
- Use: `--bp-sm`, `--bp-md`, `--bp-lg`, `--bp-xl`
- Avoid: `--bp-iphone`, `--bp-ipad`, `--bp-macbook`

Device names become obsolete; semantic names stay relevant.

---

## 3. CSS Technique Reference

### CSS Grid -- Key Patterns

**Auto-fill responsive grid (no media queries needed):**
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(250px, 100%), 1fr));
  gap: var(--gap, 1rem);
}
```

**Named areas reconfiguration:**
```css
.layout {
  display: grid;
  grid-template-areas: "header" "main" "sidebar" "footer";
}
@media (min-width: 48em) {
  .layout {
    grid-template-columns: 1fr 300px;
    grid-template-areas:
      "header  header"
      "main    sidebar"
      "footer  footer";
  }
}
```

**Subgrid (for alignment across nested components):**
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3; /* header, body, footer align across cards */
}
```

### Flexbox -- Key Patterns

**Responsive navigation:**
```css
.nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--nav-gap, 0.5rem);
}
```

**Responsive card row (wrap to stack):**
```css
.card-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.card {
  flex: 1 1 300px; /* grow, shrink, min 300px */
}
```

### clamp() -- Fluid Values

**Fluid typography:**
```css
/* Scale from 16px at 320px viewport to 20px at 1440px viewport */
--fs-body: clamp(1rem, 0.357vw + 0.929rem, 1.25rem);

/* Formula: clamp(min, vw-coefficient + rem-offset, max) */
/* Calculator: https://utopia.fyi/type/calculator */
```

**Fluid spacing:**
```css
--space-s: clamp(0.75rem, 0.536vw + 0.643rem, 1rem);
--space-m: clamp(1.5rem, 1.071vw + 1.286rem, 2rem);
--space-l: clamp(2rem, 1.786vw + 1.643rem, 3rem);
```

### Container Queries

```css
.component-wrapper {
  container-type: inline-size;
}

@container (min-width: 300px) {
  .component { /* small container layout */ }
}

@container (min-width: 600px) {
  .component { /* medium container layout */ }
}
```

**Browser Support:** Chrome 105+, Safari 16+, Firefox 110+. Use `@supports (container-type: inline-size)` for progressive enhancement.

### Logical Properties

Use logical properties for internationalization support:
```css
/* Instead of */
margin-left: 1rem;
padding-right: 1rem;

/* Use */
margin-inline-start: 1rem;
padding-inline-end: 1rem;
```

---

## 4. Common Responsive Anti-Patterns

### Anti-Pattern 1: Device-Specific Breakpoints
**Bad:** `@media (width: 375px)` targeting specific devices.
**Good:** Let content dictate breakpoints; use ranges, not exact widths.

### Anti-Pattern 2: Hiding Content on Mobile
**Bad:** `display: none` on mobile for content that exists on desktop.
**Good:** Prioritize and restructure. If content is not needed on mobile, question if it is needed at all.

### Anti-Pattern 3: Fixed Pixel Widths
**Bad:** `width: 960px` or `width: 1200px` on containers.
**Good:** `max-width: 90rem; width: 100%; margin-inline: auto;`

### Anti-Pattern 4: Viewport Units for Typography Without Limits
**Bad:** `font-size: 5vw` (becomes unreadable on small screens, enormous on large screens).
**Good:** `font-size: clamp(1rem, 2vw + 0.5rem, 2.5rem)` (bounded).

### Anti-Pattern 5: Horizontal Scroll for Tables
**Bad:** Tables that require horizontal scroll with no alternative.
**Good:** Responsive table strategy: card layout on mobile, horizontal scroll as last resort with visual scroll indicator.

### Anti-Pattern 6: Position Fixed Overuse
**Bad:** Multiple fixed elements stacking on mobile (header + banner + cookie bar + FAB).
**Good:** Audit fixed elements per breakpoint; limit to 1-2 on mobile.

### Anti-Pattern 7: Images Without Intrinsic Sizing
**Bad:** `<img>` without `width` and `height` attributes (causes CLS).
**Good:** Always include `width` and `height`; use `aspect-ratio` in CSS as backup.

### Anti-Pattern 8: Media Queries Inside Components
**Bad:** Every component has its own media queries based on viewport.
**Good:** Use Container Queries for component-level responsiveness.

### Anti-Pattern 9: Disabling Zoom
**Bad:** `<meta name="viewport" content="maximum-scale=1, user-scalable=no">`
**Good:** Never disable zoom. It is an accessibility requirement.

### Anti-Pattern 10: Using px for Everything
**Bad:** All font sizes, margins, padding in `px`.
**Good:** `rem` for font sizes, `rem`/`em` for spacing, `%`/`vw` for widths, `clamp()` for fluid values.

---

## 5. Performance Budgets by Device Tier

| Metric | Low-End Mobile (3G) | Mid-Range Mobile (4G) | Tablet (WiFi) | Desktop (Broadband) |
|--------|---------------------|----------------------|----------------|---------------------|
| Total page weight | <500KB | <1MB | <2MB | <3MB |
| JavaScript | <150KB (parsed) | <300KB | <500KB | <700KB |
| Images (initial viewport) | <200KB | <400KB | <600KB | <1MB |
| CSS | <50KB | <75KB | <100KB | <150KB |
| Fonts | <50KB (2 weights max) | <100KB | <150KB | <200KB |
| LCP | <2.5s | <2.0s | <1.5s | <1.0s |
| FID / INP | <300ms | <200ms | <150ms | <100ms |
| CLS | <0.1 | <0.1 | <0.1 | <0.1 |
| TTFB | <800ms | <500ms | <400ms | <200ms |

### Image Size Targets per Breakpoint

| Breakpoint | Max Image Width | Format Priority |
|------------|----------------|-----------------|
| 320-480px | 480px (1x), 960px (2x) | AVIF > WebP > JPEG |
| 768-1024px | 1024px (1x), 2048px (2x) | AVIF > WebP > JPEG |
| 1280-1440px | 1440px (1x), 2880px (2x) | AVIF > WebP > JPEG |
| 1920px+ | 1920px (1x), 3840px (2x) | AVIF > WebP > JPEG |

---

## 6. Browser Support Reference for Modern CSS

| Feature | Chrome | Safari | Firefox | Edge | Polyfill/Fallback |
|---------|--------|--------|---------|------|-------------------|
| CSS Grid | 57+ | 10.1+ | 52+ | 16+ | Flexbox fallback |
| Subgrid | 117+ | 16+ | 71+ | 117+ | Nested grid workaround |
| Container Queries | 105+ | 16+ | 110+ | 105+ | `@supports` + media query fallback |
| `clamp()` | 79+ | 13.1+ | 75+ | 79+ | CSS custom properties with fallback values |
| `aspect-ratio` | 88+ | 15+ | 89+ | 88+ | Padding-bottom hack |
| `:has()` selector | 105+ | 15.4+ | 121+ | 105+ | JavaScript fallback |
| `dvh` / `svh` / `lvh` | 108+ | 15.4+ | 101+ | 108+ | `vh` fallback + JS |
| `@layer` (Cascade Layers) | 99+ | 15.4+ | 97+ | 99+ | Specificity management |
| `color-mix()` | 111+ | 16.2+ | 113+ | 111+ | Pre-calculated values |
| View Transitions | 111+ | 18+ | N/A | 111+ | Progressive enhancement only |
| Scroll-driven Animations | 115+ | N/A | N/A | 115+ | JavaScript fallback |
| `@starting-style` | 117+ | 17.5+ | N/A | 117+ | Progressive enhancement |

### Support Tiers

| Tier | Browsers | Strategy |
|------|----------|----------|
| Tier 1 (must work) | Chrome, Safari, Firefox (latest 2 versions) | Full feature support |
| Tier 2 (should work) | Edge, Samsung Internet | Core functionality, minor visual differences ok |
| Tier 3 (best effort) | Older versions (2+ years old) | Content accessible, layout may be simpler |

---

## 7. Responsive Images Decision Tree

```
Is the image decorative?
  YES --> Use CSS background-image or pseudo-element; lazy-load
  NO  --> Continue

Does the image need different crops per viewport? (Art Direction)
  YES --> Use <picture> with <source> elements per breakpoint
  NO  --> Continue

Is it a simple content image?
  YES --> Use <img> with srcset (width descriptors) + sizes attribute
  NO  --> Continue

Is it an icon or logo?
  YES --> Use inline SVG or SVG sprite
  NO  --> Continue

Is it a hero/banner image?
  YES --> Use <picture> with:
          - AVIF source (best compression)
          - WebP source (wide support)
          - JPEG/PNG fallback
          - srcset for resolution switching
  NO  --> Use <img> with srcset
```

### srcset + sizes Example

```html
<img
  src="image-800.jpg"
  srcset="
    image-400.jpg   400w,
    image-800.jpg   800w,
    image-1200.jpg 1200w,
    image-1600.jpg 1600w
  "
  sizes="
    (min-width: 1280px) 33vw,
    (min-width: 768px)  50vw,
    100vw
  "
  alt="Descriptive alt text"
  width="800"
  height="600"
  loading="lazy"
  decoding="async"
>
```

### Art Direction Example

```html
<picture>
  <source
    media="(min-width: 1280px)"
    srcset="hero-desktop.avif"
    type="image/avif"
  >
  <source
    media="(min-width: 1280px)"
    srcset="hero-desktop.webp"
    type="image/webp"
  >
  <source
    media="(min-width: 768px)"
    srcset="hero-tablet.webp"
    type="image/webp"
  >
  <img
    src="hero-mobile.jpg"
    alt="Hero image"
    width="1440"
    height="600"
  >
</picture>
```

---

## 8. Accessibility Considerations for Responsive Design

### WCAG Requirements Related to Responsiveness

| WCAG Criterion | Requirement | Responsive Implication |
|----------------|-------------|----------------------|
| 1.4.4 Resize Text | Text resizable to 200% without loss | Use relative units (rem/em); test at 200% zoom |
| 1.4.10 Reflow | Content reflows at 320px CSS width (400% zoom at 1280px) | Single-column at 320px; no horizontal scroll |
| 1.4.12 Text Spacing | Content must tolerate increased text spacing | No overflow when letter-spacing, word-spacing, line-height are increased |
| 2.4.7 Focus Visible | Focus indicators must be visible | Ensure focus styles work at all breakpoints |
| 2.5.5 Target Size | Minimum 44x44px for touch targets | Enforce on mobile/tablet breakpoints |
| 2.5.8 Target Size (Minimum) | Minimum 24x24px target size (Level AA) | Enforce across all breakpoints |

### Responsive Accessibility Checklist

1. **Never disable zoom** -- Remove any `user-scalable=no` or `maximum-scale=1`
2. **Test with system font scaling** -- Increase OS font size to 200%; verify no content loss
3. **Test with screen readers** -- Verify reading order matches visual order at each breakpoint
4. **Focus management** -- When hamburger menu opens, focus moves into it; when closed, returns
5. **Skip navigation** -- Works at all breakpoints
6. **Landmark regions** -- Present and correctly nested at all breakpoints
7. **Reduced motion** -- `prefers-reduced-motion` query disables animations
8. **High contrast** -- Content readable in Windows High Contrast Mode
9. **Dark mode** -- `prefers-color-scheme` handled; no contrast failures in dark mode
10. **Touch vs pointer** -- `@media (hover: hover)` for hover-only interactions; touch fallbacks provided

### Testing Tools

| Tool | Purpose |
|------|---------|
| axe DevTools | Automated accessibility testing per viewport |
| NVDA + Chrome | Screen reader testing (Windows) |
| VoiceOver + Safari | Screen reader testing (macOS/iOS) |
| Lighthouse | Automated audit including accessibility |
| WAVE | Visual accessibility evaluation |
| Contrast Checker | WCAG contrast ratio validation |

---

## References

- Ahmad Shadeed, *Defensive CSS* (https://defensivecss.dev/)
- Andy Bell, *Every Layout* (https://every-layout.dev/)
- Utopia, *Fluid Type & Space Calculator* (https://utopia.fyi/)
- Brad Frost, *Atomic Design* (https://atomicdesign.bradfrost.com/)
- Rachel Andrew, *CSS Grid Layout* (https://gridbyexample.com/)
- Stephanie Eckles, *ModernCSS* (https://moderncss.dev/)
- Adam Argyle, *Open Props* (https://open-props.style/)
- Jason Grigsby, *Responsive Images* (https://responsiveimages.org/)
- Addy Osmani, *Image Optimization* (https://web.dev/fast/)
- Harry Roberts, *CSS Guidelines* (https://cssguidelin.es/)
- Luke Wroblewski, *Mobile First* (https://www.lukew.com/ff/entry.asp?933)
- WCAG 2.2 (https://www.w3.org/TR/WCAG22/)
