# Responsive Fix Plan

> **Project:** {{project_name}}
> **Date:** {{plan_date}}
> **Based on Audit:** {{audit_report_path}}
> **Planned by:** Rex (responsive-chief), Flux (mobile-first-architect)

---

## Priority Matrix

| | High Impact | Low Impact |
|---|-------------|-----------|
| **Low Effort** | QUICK WINS -- Do first | FILL-INS -- Do if time allows |
| **High Effort** | STRATEGIC -- Plan carefully | DEFER -- Backlog for later |

### Issue Distribution

| Quadrant | Issues | IDs |
|----------|--------|-----|
| Quick Wins | {{matrix.quick_wins_count}} | {{matrix.quick_wins_ids}} |
| Strategic | {{matrix.strategic_count}} | {{matrix.strategic_ids}} |
| Fill-ins | {{matrix.fillins_count}} | {{matrix.fillins_ids}} |
| Deferred | {{matrix.deferred_count}} | {{matrix.deferred_ids}} |

---

## Phase 1: Critical Fixes

> **Agent:** Grid (css-layout-engineer)
> **Effort:** {{phase1.effort_hours}}h
> **Dependencies:** None
> **Goal:** Eliminate all CRITICAL issues -- content must be accessible at every breakpoint

### Tasks

{{#each phase1.tasks}}
#### {{this.id}}: {{this.title}}

- **Issue(s):** {{this.issue_ids}}
- **Breakpoints:** {{this.breakpoints}}
- **Description:** {{this.description}}
- **Approach:**
  {{this.approach}}
- **Files to Modify:**
  {{#each this.files}}
  - `{{this}}`
  {{/each}}
- **Effort:** {{this.effort_hours}}h
- **Acceptance Criteria:**
  {{#each this.acceptance_criteria}}
  - [ ] {{this}}
  {{/each}}

{{/each}}

### Phase 1 Summary
| Metric | Value |
|--------|-------|
| Tasks | {{phase1.task_count}} |
| Issues Resolved | {{phase1.issues_resolved}} |
| Files Modified | {{phase1.files_count}} |
| Total Effort | {{phase1.effort_hours}}h |

---

## Phase 2: Layout Restructuring

> **Agents:** Flux (mobile-first-architect), Grid (css-layout-engineer)
> **Effort:** {{phase2.effort_hours}}h
> **Dependencies:** Phase 1 complete
> **Goal:** Establish mobile-first layout architecture with proper Grid/Flexbox structure

### Tasks

{{#each phase2.tasks}}
#### {{this.id}}: {{this.title}}

- **Issue(s):** {{this.issue_ids}}
- **Breakpoints:** {{this.breakpoints}}
- **Description:** {{this.description}}
- **Approach:**
  {{this.approach}}
- **Files to Modify:**
  {{#each this.files}}
  - `{{this}}`
  {{/each}}
- **Effort:** {{this.effort_hours}}h
- **Acceptance Criteria:**
  {{#each this.acceptance_criteria}}
  - [ ] {{this}}
  {{/each}}

{{/each}}

### Layout Strategy Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Primary layout system | {{phase2.layout_system}} | {{phase2.layout_rationale}} |
| Container query usage | {{phase2.container_queries}} | {{phase2.cq_rationale}} |
| Breakpoint approach | {{phase2.bp_approach}} | {{phase2.bp_rationale}} |
| Column strategy | {{phase2.column_strategy}} | {{phase2.column_rationale}} |

### Phase 2 Summary
| Metric | Value |
|--------|-------|
| Tasks | {{phase2.task_count}} |
| Issues Resolved | {{phase2.issues_resolved}} |
| Files Modified | {{phase2.files_count}} |
| Total Effort | {{phase2.effort_hours}}h |

---

## Phase 3: Token System

> **Agent:** Token (fluid-design-tokenizer)
> **Effort:** {{phase3.effort_hours}}h
> **Dependencies:** Phase 2 complete (layout structure must be finalized)
> **Goal:** Replace hardcoded values with fluid design tokens

### Tasks

{{#each phase3.tasks}}
#### {{this.id}}: {{this.title}}

- **Description:** {{this.description}}
- **Token Category:** {{this.token_category}}
- **Approach:**
  {{this.approach}}
- **Files to Modify:**
  {{#each this.files}}
  - `{{this}}`
  {{/each}}
- **Effort:** {{this.effort_hours}}h
- **Acceptance Criteria:**
  {{#each this.acceptance_criteria}}
  - [ ] {{this}}
  {{/each}}

{{/each}}

### Token Architecture

| Token Category | Technique | Example |
|----------------|-----------|---------|
| Font sizes | `clamp()` fluid scale | `--fs-body: clamp(1rem, 0.5vw + 0.875rem, 1.125rem)` |
| Spacing | `clamp()` fluid scale | `--space-m: clamp(1rem, 2vw + 0.5rem, 2rem)` |
| Line heights | Relative units | `--lh-body: 1.5` |
| Container widths | `min()` / `max()` | `--container-max: min(90rem, 95vw)` |
| Grid gaps | Fluid | `--gap-grid: clamp(0.75rem, 1.5vw, 1.5rem)` |

### Phase 3 Summary
| Metric | Value |
|--------|-------|
| Tasks | {{phase3.task_count}} |
| Tokens Created | {{phase3.tokens_created}} |
| Hardcoded Values Replaced | {{phase3.values_replaced}} |
| Total Effort | {{phase3.effort_hours}}h |

---

## Phase 4: Media Optimization

> **Agent:** Media (responsive-media-specialist)
> **Effort:** {{phase4.effort_hours}}h
> **Dependencies:** Phase 1 complete (critical fixes may affect image containers)
> **Goal:** Optimize all images and media for responsive delivery

### Tasks

{{#each phase4.tasks}}
#### {{this.id}}: {{this.title}}

- **Description:** {{this.description}}
- **Media Type:** {{this.media_type}}
- **Approach:**
  {{this.approach}}
- **Files to Modify:**
  {{#each this.files}}
  - `{{this}}`
  {{/each}}
- **Effort:** {{this.effort_hours}}h
- **Acceptance Criteria:**
  {{#each this.acceptance_criteria}}
  - [ ] {{this}}
  {{/each}}

{{/each}}

### Image Strategy

| Image Type | Format | Responsive Technique | Lazy Load |
|------------|--------|---------------------|-----------|
| Hero/Banner | WebP + AVIF fallback | `<picture>` + art direction | No (above fold) |
| Content images | WebP | `srcset` + `sizes` | Yes |
| Thumbnails | WebP | Fixed sizes per breakpoint | Yes |
| Icons | SVG | Inline or sprite | No |
| Background | WebP | `image-set()` in CSS | N/A |

### Phase 4 Summary
| Metric | Value |
|--------|-------|
| Tasks | {{phase4.task_count}} |
| Images Optimized | {{phase4.images_optimized}} |
| Estimated Size Reduction | {{phase4.size_reduction}} |
| Total Effort | {{phase4.effort_hours}}h |

---

## Phase 5: Polish & Edge Cases

> **Agents:** Grid (css-layout-engineer), Flux (mobile-first-architect)
> **Effort:** {{phase5.effort_hours}}h
> **Dependencies:** Phase 2, 3, and 4 complete
> **Goal:** Handle edge cases, fine-tune transitions between breakpoints, polish details

### Tasks

{{#each phase5.tasks}}
#### {{this.id}}: {{this.title}}

- **Description:** {{this.description}}
- **Breakpoints:** {{this.breakpoints}}
- **Effort:** {{this.effort_hours}}h
- **Acceptance Criteria:**
  {{#each this.acceptance_criteria}}
  - [ ] {{this}}
  {{/each}}

{{/each}}

### Phase 5 Summary
| Metric | Value |
|--------|-------|
| Tasks | {{phase5.task_count}} |
| Issues Resolved | {{phase5.issues_resolved}} |
| Total Effort | {{phase5.effort_hours}}h |

---

## Effort Estimation Summary

| Phase | Description | Effort (h) | Dependencies | Agent(s) |
|-------|-------------|------------|--------------|----------|
| 1 | Critical Fixes | {{phase1.effort_hours}} | None | Grid |
| 2 | Layout Restructuring | {{phase2.effort_hours}} | Phase 1 | Flux, Grid |
| 3 | Token System | {{phase3.effort_hours}} | Phase 2 | Token |
| 4 | Media Optimization | {{phase4.effort_hours}} | Phase 1 | Media |
| 5 | Polish & Edge Cases | {{phase5.effort_hours}} | Phases 2, 3, 4 | Grid, Flux |
| **Total** | | **{{total_effort_hours}}** | | |

### Dependency Graph

```
Phase 1 (Critical)
  |
  +---> Phase 2 (Layout)
  |       |
  |       +---> Phase 3 (Tokens)
  |       |       |
  |       +-------+---> Phase 5 (Polish)
  |                       ^
  +---> Phase 4 (Media) --+
```

### Execution Timeline

| Week | Phase(s) | Deliverables |
|------|----------|-------------|
| Week 1 | Phase 1 | All critical issues resolved |
| Week 2 | Phase 2 + Phase 4 (parallel) | Layout restructured, media optimized |
| Week 3 | Phase 3 | Fluid token system in place |
| Week 4 | Phase 5 | Edge cases handled, full polish |
| Week 4+ | QA validation | Pixel runs cross-device-test-checklist |

---

## Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| {{#each risks}}
| {{this.risk}} | {{this.probability}} | {{this.impact}} | {{this.mitigation}} |
{{/each}}

---

## Success Criteria

- [ ] Audit score improves from {{current_score}} to {{target_score}}+
- [ ] Zero CRITICAL issues remaining
- [ ] All breakpoints in coverage matrix marked PASS
- [ ] Performance budgets met (LCP <2.5s mobile, CLS <0.1)
- [ ] Cross-device test checklist passes at 90%+

---

*Generated by squad-responsive v{{squad_version}} | Planner: Rex + Flux | Date: {{plan_date}}*
