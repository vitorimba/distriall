# Gamification Quality Gate Checklist

> **ID:** CL-GM-001
> **Applies To:** All gamification implementations before launch
> **Pass Threshold:** All Critical items + 80% of Standard items
> **Squad:** squad-gamification

## Critical (Must Pass — Blockers)

### Strategy Alignment
- [ ] Gamification serves defined business objectives (not gamification for its own sake)
- [ ] Target behaviors are measurable and within user control
- [ ] Mechanics are aligned with player personas (HEXAD validated)
- [ ] Octalysis assessment completed for all 8 Core Drives
- [ ] White Hat / Black Hat balance ratio is 1.5-2.5

### Ethical Compliance
- [ ] No dark patterns detected (anti-pattern audit passed)
- [ ] Users can opt-out of gamification elements
- [ ] No exploitation of psychological vulnerabilities
- [ ] All algorithms are transparent (users can understand scoring)
- [ ] Privacy requirements met (GDPR/LGPD compliant)

### User Safety
- [ ] Natural stopping points exist (not infinite loops)
- [ ] No mechanics that harm user wellbeing (sleep, health, finances)
- [ ] Failure is safe and non-punitive (especially in learning contexts)
- [ ] Social mechanics do not enable bullying or harassment
- [ ] Loss/scarcity mechanics have ethical bounds

## Standard (80% Required)

### Design Quality
- [ ] Progression system has no dead zones (> 3 levels without unlock)
- [ ] XP curve tested via simulation (100+ sessions)
- [ ] Engagement loops close properly (investment loads next trigger)
- [ ] Onboarding achieves first-value in < 60 seconds
- [ ] Emotional journey mapped with 4 Keys to Fun
- [ ] Endgame strategy defined (no abrupt ending)
- [ ] Variable rewards include 2+ types (Tribe/Hunt/Self)
- [ ] Scaffolding progressive (Guided → Supported → Independent)

### Technical Readiness
- [ ] Data models defined and reviewed
- [ ] Event tracking covers all mechanics
- [ ] Performance targets specified (leaderboard < 200ms)
- [ ] Feature flags configured for safe rollout
- [ ] Rollback plan documented

### Validation
- [ ] A/B test plan defined with hypotheses
- [ ] Guardrail metrics identified (must not degrade)
- [ ] Per-persona impact analysis planned
- [ ] Baseline metrics recorded pre-launch
- [ ] Success criteria quantified (not vague)

### Accessibility
- [ ] Screen reader compatible
- [ ] Color-blind safe (not color-dependent)
- [ ] Keyboard navigable
- [ ] Animations can be disabled
- [ ] Text alternatives for visual gamification elements

## Advisory (Recommended)

- [ ] Competitive analysis of 3+ competitors completed
- [ ] Cross-framework validation (mechanic tested against Octalysis + HEXAD + B=MAP)
- [ ] Seasonal content calendar planned
- [ ] Monitoring dashboard configured
- [ ] Post-launch optimization cadence defined
- [ ] ROI measurement framework established
