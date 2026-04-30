# Responsive Audit Report

> **Project:** {{project_name}}
> **Date:** {{audit_date}}
> **Auditor:** Scout (responsive-auditor)
> **Version:** {{version}}

---

## Executive Summary

**Overall Score:** {{score}}/100 (Grade: {{grade}})

{{executive_summary}}

| Metric | Value |
|--------|-------|
| Pages/Routes Audited | {{pages_audited}} |
| Total Issues Found | {{total_issues}} |
| Critical Issues | {{critical_count}} |
| High Issues | {{high_count}} |
| Medium Issues | {{medium_count}} |
| Low Issues | {{low_count}} |
| Breakpoints Tested | {{breakpoints_tested}} |
| Estimated Fix Effort | {{total_effort_hours}}h |

---

## Breakpoint Coverage Matrix

| Page/Route | 320px | 480px | 768px | 1024px | 1280px | 1440px | 1920px | 2560px | 3440px |
|------------|-------|-------|-------|--------|--------|--------|--------|--------|--------|
{{#each pages}}
| {{this.name}} | {{this.bp_320}} | {{this.bp_480}} | {{this.bp_768}} | {{this.bp_1024}} | {{this.bp_1280}} | {{this.bp_1440}} | {{this.bp_1920}} | {{this.bp_2560}} | {{this.bp_3440}} |
{{/each}}

**Legend:** PASS / WARN (non-critical issues) / FAIL (critical/high issues) / N-T (not tested)

---

## Critical Issues

> Issues that make content inaccessible or unusable. Must be fixed before release.

{{#each critical_issues}}
### {{this.id}}: {{this.title}}

- **Severity:** CRITICAL
- **Affected Breakpoints:** {{this.breakpoints}}
- **Affected Pages:** {{this.pages}}
- **Category:** {{this.category}}
- **Description:** {{this.description}}
- **Expected Behavior:** {{this.expected}}
- **Actual Behavior:** {{this.actual}}
- **Screenshot:** {{this.screenshot_path}}
- **Suggested Fix:** {{this.suggested_fix}}
- **Estimated Effort:** {{this.effort_hours}}h

{{/each}}

---

## High Priority Issues

> Issues causing significant UX degradation. Fix in current sprint.

{{#each high_issues}}
### {{this.id}}: {{this.title}}

- **Severity:** HIGH
- **Affected Breakpoints:** {{this.breakpoints}}
- **Affected Pages:** {{this.pages}}
- **Category:** {{this.category}}
- **Description:** {{this.description}}
- **Suggested Fix:** {{this.suggested_fix}}
- **Estimated Effort:** {{this.effort_hours}}h

{{/each}}

---

## Medium & Low Priority Issues

{{#each medium_low_issues}}
| ID | Title | Severity | Breakpoints | Category | Effort |
|----|-------|----------|-------------|----------|--------|
| {{this.id}} | {{this.title}} | {{this.severity}} | {{this.breakpoints}} | {{this.category}} | {{this.effort_hours}}h |
{{/each}}

---

## Component-by-Component Analysis

{{#each components}}
### {{this.name}}

| Aspect | Score | Notes |
|--------|-------|-------|
| Layout Responsiveness | {{this.layout_score}}/10 | {{this.layout_notes}} |
| Typography | {{this.typography_score}}/10 | {{this.typography_notes}} |
| Images & Media | {{this.media_score}}/10 | {{this.media_notes}} |
| Interactions | {{this.interaction_score}}/10 | {{this.interaction_notes}} |
| **Component Total** | **{{this.total_score}}/40** | |

{{/each}}

---

## Performance per Device

| Metric | Mobile (3G) | Mobile (4G) | Tablet (WiFi) | Desktop (Broadband) |
|--------|-------------|-------------|----------------|---------------------|
| Page Weight (initial viewport) | {{perf.mobile_3g_weight}} | {{perf.mobile_4g_weight}} | {{perf.tablet_weight}} | {{perf.desktop_weight}} |
| LCP | {{perf.mobile_3g_lcp}} | {{perf.mobile_4g_lcp}} | {{perf.tablet_lcp}} | {{perf.desktop_lcp}} |
| FID / INP | {{perf.mobile_3g_fid}} | {{perf.mobile_4g_fid}} | {{perf.tablet_fid}} | {{perf.desktop_fid}} |
| CLS | {{perf.mobile_3g_cls}} | {{perf.mobile_4g_cls}} | {{perf.tablet_cls}} | {{perf.desktop_cls}} |
| TTFB | {{perf.mobile_3g_ttfb}} | {{perf.mobile_4g_ttfb}} | {{perf.tablet_ttfb}} | {{perf.desktop_ttfb}} |

### Performance Budgets

| Budget | Target | Actual | Status |
|--------|--------|--------|--------|
| Mobile page weight (above fold) | <500KB | {{perf.mobile_actual_weight}} | {{perf.mobile_weight_status}} |
| LCP (mobile) | <2.5s | {{perf.mobile_lcp_actual}} | {{perf.mobile_lcp_status}} |
| CLS (all devices) | <0.1 | {{perf.cls_worst}} | {{perf.cls_status}} |
| INP (all devices) | <200ms | {{perf.inp_worst}} | {{perf.inp_status}} |

---

## Recommendations (Prioritized)

### Immediate (Week 1) -- Critical Fixes
{{#each recommendations.immediate}}
1. **{{this.title}}** -- {{this.description}} (Effort: {{this.effort}}h)
{{/each}}

### Short-term (Week 2-3) -- Structural Improvements
{{#each recommendations.short_term}}
1. **{{this.title}}** -- {{this.description}} (Effort: {{this.effort}}h)
{{/each}}

### Medium-term (Week 4-6) -- Optimization
{{#each recommendations.medium_term}}
1. **{{this.title}}** -- {{this.description}} (Effort: {{this.effort}}h)
{{/each}}

### Long-term (Ongoing) -- Prevention
{{#each recommendations.long_term}}
1. **{{this.title}}** -- {{this.description}}
{{/each}}

---

## Fix Effort Estimation

| Phase | Description | Effort (hours) | Dependencies |
|-------|-------------|----------------|--------------|
| Phase 1 | Critical Fixes | {{effort.phase1}} | None |
| Phase 2 | Layout Restructuring | {{effort.phase2}} | Phase 1 |
| Phase 3 | Token System | {{effort.phase3}} | Phase 2 |
| Phase 4 | Media Optimization | {{effort.phase4}} | Phase 1 |
| Phase 5 | Polish & Edge Cases | {{effort.phase5}} | Phase 2, 3, 4 |
| **Total** | | **{{effort.total}}** | |

---

## Checklist Results

### Responsive Audit Checklist
- Passed: {{checklist.audit_passed}}/{{checklist.audit_total}}
- Failed: {{checklist.audit_failed}}/{{checklist.audit_total}}
- N/A: {{checklist.audit_na}}/{{checklist.audit_total}}

### Breakpoint Coverage Checklist
- Passed: {{checklist.breakpoint_passed}}/{{checklist.breakpoint_total}}
- Failed: {{checklist.breakpoint_failed}}/{{checklist.breakpoint_total}}

---

## Appendix

### A. Tools Used
- Viewport testing: {{tools.viewport}}
- Visual regression: {{tools.visual_regression}}
- Performance: {{tools.performance}}
- Accessibility: {{tools.accessibility}}

### B. Test Environment
- Browser versions: {{env.browsers}}
- Device/emulation list: {{env.devices}}
- Network conditions simulated: {{env.networks}}

### C. Raw Data
- Full checklist results: `{{paths.checklist_results}}`
- Screenshots: `{{paths.screenshots_dir}}`
- Performance traces: `{{paths.perf_traces}}`

---

*Generated by squad-responsive v{{squad_version}} | Auditor: Scout | Date: {{audit_date}}*
