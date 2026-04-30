# Breakpoint Coverage Checklist

> Ensures all 5 breakpoint ranges are thoroughly tested and validated.
> Used by **Pixel** (cross-device-qa) and **Scout** (responsive-auditor).

## Instructions

For each breakpoint range, test at the **minimum width**, **midpoint**, and **maximum width** of the range. Mark items as Pass/Fail with specific notes for any failures.

---

## 1. Mobile (320px - 480px)

Test at: 320px, 375px, 414px, 480px

- [ ] **M01** -- Single-column layout is enforced; no multi-column content
- [ ] **M02** -- Navigation is collapsed into hamburger/drawer menu
- [ ] **M03** -- All text is readable without horizontal scrolling or zooming
- [ ] **M04** -- Touch targets are minimum 44x44px with adequate spacing between them
- [ ] **M05** -- Images scale to container width (max-width: 100%)
- [ ] **M06** -- Forms stack vertically; inputs are full-width
- [ ] **M07** -- Modals/overlays fit within the viewport without requiring scroll to dismiss
- [ ] **M08** -- Tables use horizontal scroll wrapper, card layout, or column hiding strategy
- [ ] **M09** -- Font sizes are legible (minimum 16px body text)
- [ ] **M10** -- Page padding prevents content from touching screen edges (minimum 16px)
- [ ] **M11** -- No horizontal overflow at 320px (the strictest constraint)
- [ ] **M12** -- Bottom navigation or FABs do not overlap critical content

---

## 2. Tablet (768px - 1024px)

Test at: 768px (portrait), 834px, 1024px (landscape)

- [ ] **TB01** -- Two-column layouts activate where appropriate
- [ ] **TB02** -- Navigation transitions from hamburger to expanded (or remains hamburger with adequate sizing)
- [ ] **TB03** -- Card grids show 2-3 columns with balanced sizing
- [ ] **TB04** -- Sidebar content is either visible or accessible via toggle
- [ ] **TB05** -- Images are appropriately sized (not mobile-small, not desktop-large)
- [ ] **TB06** -- Form layouts can use 2-column where label+input pairs fit comfortably
- [ ] **TB07** -- Tables are readable without horizontal scroll (or scroll is smooth and intuitive)
- [ ] **TB08** -- Touch targets remain 44x44px minimum
- [ ] **TB09** -- Portrait-to-landscape orientation change does not break layout
- [ ] **TB10** -- Spacing scales up from mobile values (not still using mobile padding)
- [ ] **TB11** -- Hero sections and banners resize proportionally

---

## 3. Desktop (1280px - 1440px)

Test at: 1280px, 1366px, 1440px

- [ ] **D01** -- Full multi-column layouts are active (sidebar + main + optional aside)
- [ ] **D02** -- Navigation is fully expanded with all items visible
- [ ] **D03** -- Content has a max-width to maintain readable line lengths (45-75 characters)
- [ ] **D04** -- Card grids show 3-4 columns with consistent spacing
- [ ] **D05** -- Hover states are functional and provide clear feedback
- [ ] **D06** -- Tables display all columns without horizontal scroll
- [ ] **D07** -- White space is balanced (not too cramped, not too sparse)
- [ ] **D08** -- Images are sharp and appropriately sized for the viewport

---

## 4. Large Desktop (1920px - 2560px)

Test at: 1920px, 2560px

- [ ] **LD01** -- Content area has a max-width cap (prevents ultra-wide text lines)
- [ ] **LD02** -- Layout does not have excessive empty space on sides
- [ ] **LD03** -- Images serve high-resolution variants (2x or appropriate for pixel density)
- [ ] **LD04** -- Grid layouts expand gracefully (more columns or larger cards, not just more whitespace)
- [ ] **LD05** -- Typography scales up proportionally (headings are impactful, body remains readable)
- [ ] **LD06** -- Dashboards and data-dense pages utilize the extra space effectively
- [ ] **LD07** -- Background images/patterns remain sharp and properly positioned
- [ ] **LD08** -- Sticky elements do not occupy disproportionate screen space

---

## 5. Ultrawide (3440px+)

Test at: 3440px, 3840px (4K)

- [ ] **UW01** -- Content is centered with defined max-width (not stretched edge-to-edge)
- [ ] **UW02** -- Background/decorative elements fill the extra space gracefully
- [ ] **UW03** -- No layout breakage or unexpected element repositioning
- [ ] **UW04** -- Grid layouts either cap column count or expand to use space meaningfully
- [ ] **UW05** -- Text containers cap at readable width (max ~80ch for body text)
- [ ] **UW06** -- Navigation bar content is centered or left-aligned with max-width (not spread across full width)
- [ ] **UW07** -- Images do not pixelate at extreme widths
- [ ] **UW08** -- No performance degradation from excessive DOM rendering at large viewport

---

## Coverage Matrix

Fill this matrix per page/route to track coverage:

| Page/Route | Mobile (320-480) | Tablet (768-1024) | Desktop (1280-1440) | Large (1920-2560) | Ultrawide (3440+) |
|------------|-------------------|--------------------|---------------------|--------------------|--------------------|
| Homepage | [ ] | [ ] | [ ] | [ ] | [ ] |
| Dashboard | [ ] | [ ] | [ ] | [ ] | [ ] |
| List view | [ ] | [ ] | [ ] | [ ] | [ ] |
| Detail view | [ ] | [ ] | [ ] | [ ] | [ ] |
| Form page | [ ] | [ ] | [ ] | [ ] | [ ] |
| Settings | [ ] | [ ] | [ ] | [ ] | [ ] |

## Summary

| Range | Items | Min Width | Max Width |
|-------|-------|-----------|-----------|
| Mobile | 12 | 320px | 480px |
| Tablet | 11 | 768px | 1024px |
| Desktop | 8 | 1280px | 1440px |
| Large Desktop | 8 | 1920px | 2560px |
| Ultrawide | 8 | 3440px | 3840px+ |
| **TOTAL** | **47** | -- | -- |

## Pass Criteria

- **Full Coverage**: All items pass across all 5 ranges
- **Minimum Viable**: All Mobile + Desktop items pass; Tablet/Large/Ultrawide have no CRITICAL failures
- **Blocked**: Any CRITICAL failure on Mobile or Desktop range blocks release
