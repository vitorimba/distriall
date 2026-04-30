# Squad Responsive -- Responsive Design & Multi-Device Optimization

> Elite squad that audits, optimizes, and validates responsiveness across all device sizes -- from 320px mobile to 3440px ultrawide.

## Overview

The **squad-responsive** is a specialized team of 7 AI agents that work together to ensure every pixel of your application adapts flawlessly across the full spectrum of devices. The squad follows a systematic 8-phase pipeline: audit existing responsiveness, plan fixes, design mobile-first architecture, generate fluid tokens, implement layout corrections, optimize media, run cross-device QA, and produce a comprehensive report.

Every agent is informed by the mental models of real-world CSS and responsive design experts, ensuring decisions are grounded in battle-tested methodologies rather than generic best practices.

## Architecture

```
                    +------------------+
                    |   Rex (Chief)    |
                    |   Orchestrator   |
                    +--------+---------+
                             |
              +--------------+--------------+
              |                             |
     +--------v--------+          +--------v--------+
     |  Scout (Auditor) |          |  Pixel (QA)     |
     |  Tier 0 - Audit  |          |  Tier 3 - Test  |
     +--------+---------+          +--------+--------+
              |                             ^
     +--------v---------+                   |
     |                   |                  |
+----v-----+  +----v-----+                 |
| Flux      |  | Grid      |                |
| Mobile    |  | CSS Layout|                |
| Tier 1    |  | Tier 1    |                |
+----+------+  +----+------+                |
     |              |                       |
     +------+-------+                      |
            |                              |
   +--------v--------+  +--------v--------+
   | Token (Fluid)    |  | Media (Images)  |
   | Tier 2           |  | Tier 2          |
   +---------+--------+  +--------+--------+
             |                     |
             +----------+----------+
                        |
                        v
                  Pixel (QA) validates
```

## Agent Roster

| Agent | Persona | Tier | Based On | Role |
|-------|---------|------|----------|------|
| Rex | responsive-chief | Orchestrator | -- | Orchestrates the full responsive pipeline, delegates tasks, manages workflow |
| Scout | responsive-auditor | 0 (Audit) | Ahmad Shadeed, Brad Frost | Audits existing CSS/HTML for responsive issues, generates issue reports |
| Flux | mobile-first-architect | 1 (Architecture) | Andy Bell, Luke Wroblewski | Designs mobile-first layout strategy, restructures component architecture |
| Grid | css-layout-engineer | 1 (Implementation) | Rachel Andrew, Stephanie Eckles | Implements CSS Grid, Flexbox, Container Queries, and modern layout patterns |
| Token | fluid-design-tokenizer | 2 (Optimization) | Adam Argyle, Utopia | Creates fluid type scales, spacing tokens, and clamp()-based design tokens |
| Media | responsive-media-specialist | 2 (Optimization) | Jason Grigsby, Addy Osmani | Optimizes responsive images, art direction, lazy loading, and media performance |
| Pixel | cross-device-qa | 3 (Validation) | Ahmad Shadeed, Harry Roberts | Validates responsiveness across all breakpoints, runs visual regression tests |

## Breakpoint Targets

| Name | Width | Typical Devices |
|------|-------|-----------------|
| mobile-small | 320px | iPhone SE, small Android phones |
| mobile | 480px | Standard smartphones (portrait) |
| tablet | 768px | iPad Mini, standard tablets (portrait) |
| tablet-landscape | 1024px | Tablets (landscape), small laptops |
| desktop | 1280px | Standard laptops, small desktops |
| desktop-large | 1440px | Large laptops, standard desktop monitors |
| hd | 1920px | Full HD monitors |
| qhd | 2560px | QHD / 2K monitors |
| ultrawide | 3440px | Ultrawide monitors |

## Quick Start

### 1. Activate the squad chief
```
@responsive-chief
```

### 2. Run a full responsive audit
```
*audit {project-path}
```

### 3. Generate a fix plan
```
*fix-plan
```

### 4. Execute the complete pipeline
```
*run-workflow wf-responsive-complete
```

## Workflow: wf-responsive-complete

The primary workflow executes 8 phases (some run in parallel):

```
AUDIT --> PLAN --> ARCHITECTURE --|
                  TOKENS ---------|-> IMPLEMENTATION --|
                                     MEDIA ------------|-> QA --> REPORT
```

### Phase 1: AUDIT (Scout)
- Scans all pages/components for responsive issues
- Checks every breakpoint from 320px to 3440px
- Identifies overflow, layout breaks, unreadable text, broken images
- Produces a scored audit report with severity levels
- Uses `responsive-audit-checklist.md` as the validation backbone

### Phase 2: PLAN (Rex)
- Prioritizes issues by severity and user impact
- Groups fixes into logical phases (critical, structural, tokens, media, polish)
- Estimates effort per phase
- Identifies dependencies between fixes
- Produces `fix-plan.md` using `fix-plan-tmpl.md`

### Phase 3: ARCHITECTURE (Flux + Grid) -- parallel with Phase 4
- Defines mobile-first responsive architecture and layout structure
- Implements foundation and structural layout fixes
- Establishes CSS Grid/Flexbox layout patterns

### Phase 4: TOKENS (Token) -- parallel with Phase 3
- Creates fluid type scale and spacing tokens with clamp()
- Generates CSS custom properties for all design tokens
- Validates tokens at viewport extremes and accessibility

### Phase 5: IMPLEMENTATION (Grid + Flux) -- parallel with Phase 6
- Implements all component-level responsive fixes
- Applies fluid tokens and architecture foundation
- Converts fixed values to fluid values
- Fixes navigation, forms, and interactive components per breakpoint

### Phase 6: MEDIA (Media) -- parallel with Phase 5
- Optimizes responsive images (srcset, sizes, art direction)
- Implements lazy loading and performance-aware media delivery
- Validates CLS and performance budgets per breakpoint

### Phase 7: QA (Pixel)
- Validates all fixes across every breakpoint
- Runs visual regression against baseline
- Tests touch interactions, orientation changes, zoom behavior
- Validates accessibility (font scaling, high contrast, reduced motion)
- Uses `cross-device-test-checklist.md`
- Rework loop: max 3 iterations back to Phase 5 if gate fails

### Phase 8: REPORT (Rex)
- Compiles final audit report using `audit-report-tmpl.md`
- Includes before/after comparisons
- Documents breakpoint coverage matrix
- Lists remaining known issues and recommendations

## Commands Reference

| Command | Agent | Description |
|---------|-------|-------------|
| `*audit {path}` | Scout | Run responsive audit on target path |
| `*fix-plan` | Rex | Generate prioritized fix plan from audit results |
| `*implement` | Grid/Flux | Execute fix plan implementation |
| `*setup-tokens` | Token | Create fluid design token system |
| `*optimize-media` | Media | Optimize all responsive images and media |
| `*test` | Pixel | Run cross-device test suite |
| `*report` | Rex | Generate final responsive report |
| `*run-workflow wf-responsive-complete` | Rex | Execute full 8-phase pipeline |
| `*status` | Rex | Show current workflow status |
| `*help` | Any | Show available commands for active agent |

## Mind Sources

| Expert | Framework | Applied To |
|--------|-----------|------------|
| Ahmad Shadeed | Defensive CSS | Scout (auditor), Pixel (QA) -- proactive prevention of layout bugs |
| Brad Frost | Atomic Design | Scout -- component-level responsive audit methodology |
| Andy Bell | CUBE CSS + Every Layout | Flux -- composition-based, intrinsic layout architecture |
| Luke Wroblewski | Mobile First | Flux -- mobile-first progressive enhancement strategy |
| Rachel Andrew | CSS Grid / Subgrid | Grid -- advanced grid layouts, subgrid patterns |
| Stephanie Eckles | ModernCSS + SmolCSS | Grid -- modern CSS solutions, minimal layout patterns |
| Adam Argyle | Open Props + GUI Challenges | Token -- design token architecture, CSS custom properties |
| Utopia (James Gilyead & Trys Mudford) | Fluid Type & Space | Token -- fluid type scales, space scales with clamp() |
| Jason Grigsby | Responsive Images | Media -- srcset, sizes, art direction, image strategy |
| Addy Osmani | Performance per Device | Media -- device-aware performance optimization |
| Harry Roberts | ITCSS + CSS Guidelines | Pixel -- CSS architecture quality, specificity management |

## File Structure

```
squads/squad-responsive/
+-- config.yaml                              # Squad configuration
+-- README.md                                # This file
+-- agents/
|   +-- responsive-chief.md                  # Rex - Orchestrator
|   +-- responsive-auditor.md                # Scout - Tier 0
|   +-- mobile-first-architect.md            # Flux - Tier 1
|   +-- css-layout-engineer.md               # Grid - Tier 1
|   +-- fluid-design-tokenizer.md            # Token - Tier 2
|   +-- responsive-media-specialist.md       # Media - Tier 2
|   +-- cross-device-qa.md                   # Pixel - Tier 3
+-- checklists/
|   +-- responsive-audit-checklist.md        # 30+ item audit checklist
|   +-- breakpoint-coverage-checklist.md     # Per-breakpoint validation
|   +-- cross-device-test-checklist.md       # QA testing checklist
+-- data/
|   +-- responsive-kb.md                     # Knowledge base
+-- minds/
|   +-- (mind definitions per expert)
+-- tasks/
|   +-- responsive-audit.md
|   +-- create-fix-plan.md
|   +-- implement-fixes.md
|   +-- fluid-tokens-setup.md
|   +-- optimize-media.md
|   +-- cross-device-test.md
+-- templates/
|   +-- audit-report-tmpl.md                 # Audit report template
|   +-- fix-plan-tmpl.md                     # Fix plan template
+-- workflows/
|   +-- wf-responsive-complete.yaml          # Full pipeline workflow
```
