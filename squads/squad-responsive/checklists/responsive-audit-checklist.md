# Responsive Audit Checklist

> Comprehensive checklist for auditing responsiveness across all device sizes.
> Used by **Scout** (responsive-auditor) during Phase 1 of the responsive pipeline.

## Scoring

- **Pass**: Item meets criteria across all relevant breakpoints
- **Fail**: Item fails at one or more breakpoints
- **N/A**: Item does not apply to the current project

## Severity Levels

| Level | Description | Action Required |
|-------|-------------|-----------------|
| CRITICAL | Content inaccessible or unusable | Must fix before release |
| HIGH | Significant UX degradation | Fix in current sprint |
| MEDIUM | Noticeable but functional | Fix in next sprint |
| LOW | Minor visual imperfection | Fix when convenient |

---

## 1. Layout (8 items)

- [ ] **L01** -- No horizontal overflow on any page at any breakpoint (320px-3440px)
  - Severity: **CRITICAL**
  - Breakpoints: ALL
  - Check: `document.documentElement.scrollWidth > document.documentElement.clientWidth`

- [ ] **L02** -- No content is cut off or hidden behind other elements at any breakpoint
  - Severity: **CRITICAL**
  - Breakpoints: ALL

- [ ] **L03** -- Container max-widths prevent content from stretching beyond readable limits on large screens (>1440px)
  - Severity: **HIGH**
  - Breakpoints: desktop-large, hd, qhd, ultrawide

- [ ] **L04** -- Flex/Grid layouts wrap correctly without overlapping content
  - Severity: **CRITICAL**
  - Breakpoints: mobile-small, mobile, tablet

- [ ] **L05** -- Sidebar layouts collapse to single-column on mobile/tablet
  - Severity: **HIGH**
  - Breakpoints: mobile-small, mobile, tablet

- [ ] **L06** -- No fixed-width elements that break layout at smaller viewports
  - Severity: **HIGH**
  - Breakpoints: mobile-small, mobile

- [ ] **L07** -- CSS Grid areas reconfigure appropriately per breakpoint (no empty gaps or misaligned tracks)
  - Severity: **MEDIUM**
  - Breakpoints: ALL

- [ ] **L08** -- Sticky/fixed elements do not obscure content and resize appropriately
  - Severity: **HIGH**
  - Breakpoints: mobile-small, mobile, tablet

---

## 2. Typography (5 items)

- [ ] **T01** -- Font sizes are fluid or use breakpoint-aware values (no fixed px that becomes unreadable)
  - Severity: **HIGH**
  - Breakpoints: ALL
  - Ideal: `clamp()` or responsive type scale

- [ ] **T02** -- Line length (measure) stays between 45-75 characters on all breakpoints
  - Severity: **MEDIUM**
  - Breakpoints: ALL
  - Check: `ch` unit or max-width on text containers

- [ ] **T03** -- Heading hierarchy maintains visual hierarchy at all sizes (h1 > h2 > h3 visually)
  - Severity: **MEDIUM**
  - Breakpoints: mobile-small, mobile, desktop-large, ultrawide

- [ ] **T04** -- Line height scales proportionally (not too tight on mobile, not too loose on desktop)
  - Severity: **MEDIUM**
  - Breakpoints: ALL

- [ ] **T05** -- Text does not overflow its container or get truncated unexpectedly
  - Severity: **CRITICAL**
  - Breakpoints: mobile-small, mobile

---

## 3. Images & Media (5 items)

- [ ] **I01** -- All images use responsive techniques (`srcset`, `sizes`, or CSS `object-fit`)
  - Severity: **HIGH**
  - Breakpoints: ALL

- [ ] **I02** -- Images maintain correct aspect ratios at all breakpoints (no stretching/squishing)
  - Severity: **HIGH**
  - Breakpoints: ALL
  - Check: `aspect-ratio` property or intrinsic sizing

- [ ] **I03** -- Art direction is applied where needed (different crops for different viewports)
  - Severity: **MEDIUM**
  - Breakpoints: mobile vs desktop

- [ ] **I04** -- Videos and iframes are responsive (16:9 or appropriate ratio maintained)
  - Severity: **HIGH**
  - Breakpoints: ALL

- [ ] **I05** -- Background images adapt to viewport (no pixelation on large screens, no oversized downloads on mobile)
  - Severity: **MEDIUM**
  - Breakpoints: mobile-small, hd, qhd, ultrawide

---

## 4. Navigation (4 items)

- [ ] **N01** -- Navigation collapses to hamburger/drawer pattern on mobile and tablet
  - Severity: **CRITICAL**
  - Breakpoints: mobile-small, mobile, tablet

- [ ] **N02** -- All touch targets are minimum 44x44px on touch devices
  - Severity: **CRITICAL**
  - Breakpoints: mobile-small, mobile, tablet, tablet-landscape

- [ ] **N03** -- Focus indicators are visible and properly styled at all breakpoints
  - Severity: **HIGH**
  - Breakpoints: ALL

- [ ] **N04** -- Dropdown/flyout menus adapt to available viewport space (no off-screen positioning)
  - Severity: **HIGH**
  - Breakpoints: mobile-small, mobile, tablet

---

## 5. Forms (4 items)

- [ ] **F01** -- Input fields are minimum 16px font size on iOS to prevent auto-zoom
  - Severity: **CRITICAL**
  - Breakpoints: mobile-small, mobile

- [ ] **F02** -- Form layouts stack vertically on mobile (no side-by-side inputs that become too narrow)
  - Severity: **HIGH**
  - Breakpoints: mobile-small, mobile

- [ ] **F03** -- Labels are always visible and associated with inputs (no placeholder-only labels)
  - Severity: **HIGH**
  - Breakpoints: ALL

- [ ] **F04** -- Submit buttons are full-width or adequately sized on mobile for easy tapping
  - Severity: **MEDIUM**
  - Breakpoints: mobile-small, mobile

---

## 6. Spacing (4 items)

- [ ] **S01** -- Margins and padding use fluid values (`clamp()`, `%`, `vw`) or scale per breakpoint
  - Severity: **MEDIUM**
  - Breakpoints: ALL

- [ ] **S02** -- No fixed pixel spacing that creates excessive whitespace on mobile or insufficient spacing on desktop
  - Severity: **MEDIUM**
  - Breakpoints: mobile-small, desktop-large, ultrawide

- [ ] **S03** -- Component spacing is consistent within each breakpoint range
  - Severity: **LOW**
  - Breakpoints: ALL

- [ ] **S04** -- Page-level padding prevents content from touching viewport edges on mobile
  - Severity: **HIGH**
  - Breakpoints: mobile-small, mobile

---

## 7. Interactive Elements (4 items)

- [ ] **X01** -- Hover-only interactions have touch-friendly alternatives (no hover-dependent functionality)
  - Severity: **CRITICAL**
  - Breakpoints: mobile-small, mobile, tablet

- [ ] **X02** -- Tooltips are accessible on touch devices (tap-to-show or alternative presentation)
  - Severity: **MEDIUM**
  - Breakpoints: mobile-small, mobile, tablet

- [ ] **X03** -- Modals/dialogs are appropriately sized and scrollable on small viewports
  - Severity: **HIGH**
  - Breakpoints: mobile-small, mobile

- [ ] **X04** -- Carousels/sliders support swipe gestures on touch and arrow keys on desktop
  - Severity: **MEDIUM**
  - Breakpoints: ALL

---

## 8. Performance (4 items)

- [ ] **P01** -- Mobile page weight is under 500KB for initial viewport (above the fold)
  - Severity: **HIGH**
  - Breakpoints: mobile-small, mobile

- [ ] **P02** -- Images served at appropriate resolution per device (no 4K images on mobile)
  - Severity: **HIGH**
  - Breakpoints: mobile-small, mobile, tablet

- [ ] **P03** -- Largest Contentful Paint (LCP) is under 2.5s on mobile (3G simulation)
  - Severity: **HIGH**
  - Breakpoints: mobile-small, mobile

- [ ] **P04** -- Cumulative Layout Shift (CLS) is under 0.1 across all breakpoints
  - Severity: **HIGH**
  - Breakpoints: ALL

---

## Summary

| Category | Items | Critical | High | Medium | Low |
|----------|-------|----------|------|--------|-----|
| Layout | 8 | 3 | 4 | 1 | 0 |
| Typography | 5 | 1 | 1 | 3 | 0 |
| Images & Media | 5 | 0 | 3 | 2 | 0 |
| Navigation | 4 | 2 | 2 | 0 | 0 |
| Forms | 4 | 1 | 2 | 1 | 0 |
| Spacing | 4 | 0 | 1 | 2 | 1 |
| Interactive | 4 | 1 | 1 | 2 | 0 |
| Performance | 4 | 0 | 3 | 0 | 0 |
| **TOTAL** | **38** | **8** | **17** | **11** | **1** |

## Audit Score Calculation

```
Score = (passed_items / total_applicable_items) * 100

Grades:
  95-100%  A+  Excellent responsive design
  85-94%   A   Strong responsive design
  70-84%   B   Good with notable issues
  50-69%   C   Significant responsive problems
  <50%     F   Major redesign needed
```

## Usage

1. Scout runs this checklist against each page/route
2. Each item is marked Pass/Fail/N-A with notes
3. Failed items are tagged with affected breakpoints
4. Results feed into the fix plan (Phase 2)
