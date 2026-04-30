# UX Gamification Integration Checklist

> **ID:** CL-GM-003
> **Applies To:** All gamified interfaces before user testing
> **Pass Threshold:** All Critical + 80% Standard
> **Squad:** squad-gamification

## Critical — Visual Design

- [ ] Gamification elements are visually integrated (not bolted-on or jarring)
- [ ] Information hierarchy maintained (core functionality > gamification)
- [ ] Progress indicators are clear and unambiguous
- [ ] Achievement notifications are non-intrusive (don't block workflow)
- [ ] Colors follow accessibility guidelines (WCAG 2.1 AA minimum)
- [ ] Animations have reduced-motion fallbacks

## Critical — Interaction Design

- [ ] Gamification does not add clicks to core user tasks
- [ ] Gamification state is persistent (no lost progress on refresh/crash)
- [ ] Loading states for gamification data don't block core functionality
- [ ] Gamification gracefully degrades if service is unavailable
- [ ] Touch targets meet minimum size (44x44px iOS, 48x48dp Android)

## Standard — Information Architecture

- [ ] Gamification has dedicated section (profile/dashboard) for deep exploration
- [ ] Summary indicators available in main interface (non-intrusive)
- [ ] Achievement/badge details accessible without leaving current context
- [ ] Leaderboard is findable but not forced into view
- [ ] Progress is visible at a glance (no more than 2 seconds to understand)
- [ ] Gamification settings accessible in 3 taps/clicks or fewer

## Standard — Feedback Design

- [ ] Immediate feedback for XP-earning actions (< 300ms visual response)
- [ ] Level-up celebration is noticeable but brief (< 3 seconds)
- [ ] Badge/achievement unlock has distinct visual + optional audio
- [ ] Streak continuation is acknowledged subtly (not disruptive)
- [ ] Progress toward next milestone always visible
- [ ] Negative events (streak break) are gentle, not alarming

## Standard — Onboarding UX

- [ ] Gamification concepts introduced progressively (not all at once)
- [ ] First gamified interaction occurs within 60 seconds
- [ ] Tutorial/explanation is skippable for experienced users
- [ ] Gamification terminology is user-friendly (not developer jargon)
- [ ] Empty states are encouraging ("Earn your first badge by...")

## Standard — Social Features UX

- [ ] Leaderboard shows relative position (not just absolute)
- [ ] Friend comparison is opt-in
- [ ] Team/group features have clear entry/exit paths
- [ ] Social notifications are batched (not individual spam)
- [ ] Gifting/sharing flows are simple (< 3 steps)

## Standard — Responsive & Cross-Platform

- [ ] Gamification displays correctly on mobile (320px minimum)
- [ ] Gamification displays correctly on tablet
- [ ] Gamification displays correctly on desktop
- [ ] Gamification syncs across devices in real-time (or near-real-time)
- [ ] Offline state handles gamification gracefully (queue, then sync)

## Advisory — Polish

- [ ] Micro-interactions add delight without distraction
- [ ] Sound design is optional and controllable
- [ ] Haptic feedback used appropriately on mobile (subtle)
- [ ] Dark mode compatible
- [ ] Localization-ready (text in gamification is translatable)
- [ ] Performance: gamification components render < 100ms
- [ ] No layout shift when gamification elements load

## Verdict

| Category | Items Passed | Total | Status |
|----------|-------------|-------|--------|
| Critical — Visual | /6 | 6 | |
| Critical — Interaction | /5 | 5 | |
| Standard — IA | /6 | 6 | |
| Standard — Feedback | /6 | 6 | |
| Standard — Onboarding | /5 | 5 | |
| Standard — Social | /5 | 5 | |
| Standard — Responsive | /5 | 5 | |
| **Total** | **/38** | **38** | |

**Overall:** PASS / FAIL (requires all Critical + 80% Standard = 25+/27 Standard)
