# Cross-Device Test Checklist

> QA testing checklist for cross-device validation beyond layout correctness.
> Used by **Pixel** (cross-device-qa) during Phase 5 of the responsive pipeline.

## Instructions

Each section targets a specific behavioral dimension of cross-device compatibility. Test across representative devices for each category. Mark items Pass/Fail with device-specific notes.

---

## 1. Visual Regression Tests (7 items)

- [ ] **VR01** -- Baseline screenshots captured for all key pages at each breakpoint (320, 480, 768, 1024, 1280, 1440, 1920)
- [ ] **VR02** -- Current build compared against baseline with pixel-diff tool (acceptable threshold: <0.1% difference)
- [ ] **VR03** -- No unintended layout shifts between baseline and current across any breakpoint
- [ ] **VR04** -- Color and contrast remain consistent across breakpoints (no theme bleeding)
- [ ] **VR05** -- Icon sizes and SVG rendering are crisp at all resolutions (1x, 2x, 3x pixel density)
- [ ] **VR06** -- Shadow, border-radius, and decorative elements render consistently
- [ ] **VR07** -- Animations and transitions play correctly without visual glitches at all viewport sizes

---

## 2. Touch Interaction Tests (6 items)

- [ ] **TI01** -- All interactive elements respond to tap with appropriate feedback (press state visible)
- [ ] **TI02** -- Swipe gestures work on carousels, drawers, and dismissible elements
- [ ] **TI03** -- Long-press does not trigger unintended context menus on interactive elements
- [ ] **TI04** -- Pinch-to-zoom is enabled globally (unless explicitly disabled with valid reason)
- [ ] **TI05** -- Drag-and-drop interactions have touch equivalents or graceful fallbacks
- [ ] **TI06** -- No 300ms tap delay (touch-action: manipulation applied or meta viewport set)

---

## 3. Orientation Changes (5 items)

- [ ] **OC01** -- Portrait to landscape transition does not break layout or cause content loss
- [ ] **OC02** -- Landscape to portrait transition preserves scroll position and form state
- [ ] **OC03** -- Full-screen elements (modals, video players) adapt correctly to orientation change
- [ ] **OC04** -- Sticky headers/footers recalculate height on orientation change
- [ ] **OC05** -- No JavaScript errors triggered by orientation change events

---

## 4. Zoom Behavior (5 items)

- [ ] **ZM01** -- Page is usable at 200% browser zoom (WCAG 1.4.4 requirement)
- [ ] **ZM02** -- Page is usable at 400% browser zoom (WCAG 1.4.10 reflow requirement -- no horizontal scroll at 1280px/400%)
- [ ] **ZM03** -- Text-only zoom (browser text scaling) does not cause overflow or overlapping
- [ ] **ZM04** -- Pinch-to-zoom on mobile does not break fixed/sticky positioned elements
- [ ] **ZM05** -- Zoom level persists correctly when navigating between pages

---

## 5. Font Scaling / Accessibility (6 items)

- [ ] **FS01** -- System font size set to "Large" (iOS/Android) does not break layout
- [ ] **FS02** -- System font size set to "Extra Large" / "Largest" still renders usably
- [ ] **FS03** -- All text uses relative units (rem/em) that respond to root font-size changes
- [ ] **FS04** -- No text is clipped or hidden when font size is increased by 200%
- [ ] **FS05** -- Reading order remains logical when font size changes cause reflow
- [ ] **FS06** -- Minimum contrast ratio of 4.5:1 (AA) is maintained at all sizes

---

## 6. Dark Mode Responsiveness (5 items)

- [ ] **DM01** -- Dark mode toggle/system preference is respected at all breakpoints
- [ ] **DM02** -- All colors switch correctly (no light-mode remnants in dark mode)
- [ ] **DM03** -- Images with transparency adapt (no invisible-on-dark-background issues)
- [ ] **DM04** -- Shadows and borders are visible and appropriate in dark mode
- [ ] **DM05** -- Charts, graphs, and data visualizations remain readable in dark mode

---

## 7. Print Styles (5 items)

- [ ] **PR01** -- Print stylesheet is defined (`@media print`)
- [ ] **PR02** -- Navigation, footer, ads, and non-essential UI are hidden in print
- [ ] **PR03** -- Content flows in single column with appropriate margins for print
- [ ] **PR04** -- Links show their URLs in print (either inline or as footnotes)
- [ ] **PR05** -- Page breaks are controlled (no orphaned headings, no broken images)

---

## 8. Reduced Motion (4 items)

- [ ] **RM01** -- `prefers-reduced-motion: reduce` is respected (animations disabled or minimized)
- [ ] **RM02** -- Transitions are replaced with instant state changes when reduced motion is active
- [ ] **RM03** -- Auto-playing carousels/videos pause when reduced motion is active
- [ ] **RM04** -- Parallax and scroll-triggered animations are disabled when reduced motion is active

---

## 9. High Contrast Mode (4 items)

- [ ] **HC01** -- Windows High Contrast Mode renders all text legibly
- [ ] **HC02** -- Custom focus indicators remain visible in high contrast mode
- [ ] **HC03** -- Icon-only buttons remain distinguishable (not invisible due to color removal)
- [ ] **HC04** -- Form field boundaries are visible in high contrast mode (borders, not just background color)

---

## Summary

| Category | Items | Priority |
|----------|-------|----------|
| Visual Regression | 7 | HIGH |
| Touch Interaction | 6 | HIGH |
| Orientation Changes | 5 | MEDIUM |
| Zoom Behavior | 5 | HIGH (WCAG) |
| Font Scaling | 6 | HIGH (WCAG) |
| Dark Mode | 5 | MEDIUM |
| Print Styles | 5 | LOW |
| Reduced Motion | 4 | MEDIUM (WCAG) |
| High Contrast | 4 | MEDIUM (WCAG) |
| **TOTAL** | **47** | -- |

## Test Environments

### Minimum Required Devices/Emulations
| Device Type | Examples | Required |
|-------------|----------|----------|
| Small mobile | iPhone SE (375px), Galaxy S8 (360px) | YES |
| Standard mobile | iPhone 14 (390px), Pixel 7 (412px) | YES |
| Tablet portrait | iPad (810px), Galaxy Tab (800px) | YES |
| Tablet landscape | iPad (1080px) | YES |
| Laptop | 1366px, 1440px | YES |
| Full HD | 1920px | YES |
| 4K / Ultrawide | 2560px, 3440px | RECOMMENDED |

### Browser Coverage
| Browser | Required |
|---------|----------|
| Chrome (latest) | YES |
| Safari (latest) | YES |
| Firefox (latest) | YES |
| Edge (latest) | RECOMMENDED |
| Samsung Internet | RECOMMENDED (mobile) |

## Pass Criteria

- **Release Ready**: All HIGH priority categories pass; no CRITICAL failures in any category
- **Accessibility Compliant**: Zoom, Font Scaling, Reduced Motion, and High Contrast all pass
- **Full Coverage**: All 47 items pass across all test environments
