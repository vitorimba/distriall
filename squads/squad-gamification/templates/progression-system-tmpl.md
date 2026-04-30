# Progression System Specification — {{PROJECT_NAME}}

> **Date:** {{DATE}}
> **Version:** {{VERSION}}
> **Status:** Draft | Approved | Live

## 1. Progression Philosophy

**Type:** {{linear | exponential | asymptotic | prestige | branching | milestone}}
**Design Principle:** {{e.g., "Mastery-based: players advance by demonstrating skill, not just time spent"}}
**Max Level:** {{number}}
**Endgame Strategy:** {{prestige | mastery_tracks | mentorship | seasonal_reset}}

## 2. XP System

### 2.1 XP Curve
**Formula:** `XP(n) = {{formula}}`

| Level | XP Required | Cumulative XP | Estimated Time | Unlock |
|-------|-------------|---------------|----------------|--------|
| 1 | 0 | 0 | Start | {{unlock}} |
| 2 | {{xp}} | {{cumulative}} | {{time}} | {{unlock}} |
| 3 | {{xp}} | {{cumulative}} | {{time}} | {{unlock}} |
| 5 | {{xp}} | {{cumulative}} | {{time}} | {{unlock}} |
| 10 | {{xp}} | {{cumulative}} | {{time}} | {{unlock}} |
| 15 | {{xp}} | {{cumulative}} | {{time}} | {{unlock}} |
| 20 | {{xp}} | {{cumulative}} | {{time}} | {{unlock}} |
| 25 | {{xp}} | {{cumulative}} | {{time}} | {{unlock}} |
| 30 | {{xp}} | {{cumulative}} | {{time}} | {{unlock}} |
| 40 | {{xp}} | {{cumulative}} | {{time}} | {{unlock}} |
| 50 | {{xp}} | {{cumulative}} | {{time}} | {{unlock}} |

### 2.2 XP Sources
| Action | XP Earned | Cooldown | Daily Cap | Notes |
|--------|-----------|----------|-----------|-------|
| {{action}} | {{xp}} | {{cooldown}} | {{cap}} | {{notes}} |

### 2.3 XP Modifiers
| Modifier | Condition | Multiplier | Duration |
|----------|-----------|-----------|----------|
| Streak Bonus | 3+ day streak | 1.5x | Per action |
| First Action of Day | First daily action | 2x | Single action |
| Weekly Challenge | Complete weekly | 3x | Bonus XP |
| Returning User | Back after 3+ days away | 2x | First session |
| Quality Bonus | High-quality contribution | 1.5-2x | Per action |

## 3. Level Tiers

| Tier | Levels | Name | Color | Privileges |
|------|--------|------|-------|-----------|
| Tier 1 | 1-5 | {{Novice}} | {{color}} | {{basic features}} |
| Tier 2 | 6-10 | {{Apprentice}} | {{color}} | {{+feature_unlock}} |
| Tier 3 | 11-20 | {{Adept}} | {{color}} | {{+customization}} |
| Tier 4 | 21-30 | {{Expert}} | {{color}} | {{+social_features}} |
| Tier 5 | 31-40 | {{Master}} | {{color}} | {{+creation_tools}} |
| Tier 6 | 41-50 | {{Legend}} | {{color}} | {{+governance}} |

## 4. Unlock System

### 4.1 Functional Unlocks
| Level | Unlock | Category | Core Drive |
|-------|--------|----------|-----------|
| {{level}} | {{feature}} | Functional | CD{{n}} |

### 4.2 Cosmetic Unlocks
| Level | Unlock | Category | Core Drive |
|-------|--------|----------|-----------|
| {{level}} | {{item}} | Cosmetic | CD3/CD4 |

### 4.3 Social Unlocks
| Level | Unlock | Category | Core Drive |
|-------|--------|----------|-----------|
| {{level}} | {{privilege}} | Social | CD5 |

### 4.4 Content Unlocks
| Level | Unlock | Category | Core Drive |
|-------|--------|----------|-----------|
| {{level}} | {{content}} | Content | CD7 |

## 5. Badge/Achievement System

### 5.1 Badge Categories
| Category | Count | Theme | Rarity Distribution |
|----------|-------|-------|---------------------|
| {{category}} | {{count}} | {{theme}} | Common:% / Rare:% / Epic:% / Legendary:% |

### 5.2 Badge Catalog
| Badge | Category | Criteria | Rarity | XP Bonus |
|-------|----------|----------|--------|----------|
| {{name}} | {{cat}} | {{how_to_earn}} | {{rarity}} | {{xp}} |

## 6. Streak System

```yaml
streak:
  unit: "{{days | sessions | weeks}}"
  start_condition: "{{what counts as maintaining streak}}"
  break_condition: "{{what breaks the streak}}"
  grace_period: {{hours}}  # buffer before streak breaks
  freeze_available: {{true/false}}
  freeze_count: {{per_month}}
  milestones:
    3: {reward: "{{reward}}", multiplier: 1.2}
    7: {reward: "{{reward}}", multiplier: 1.5}
    14: {reward: "{{reward}}", multiplier: 1.8}
    30: {reward: "{{reward}}", multiplier: 2.0}
    60: {reward: "{{reward}}", multiplier: 2.5}
    100: {reward: "{{reward}}", multiplier: 3.0}
  recovery:
    message: "Welcome back! Here's a boost to restart your streak."
    bonus: "2x XP for first session back"
```

## 7. Anti-Stagnation Measures

| Mechanism | When Active | Purpose |
|-----------|------------|---------|
| Micro-progress bars | Always | Show sub-level progress |
| Daily challenges | Daily | Fresh goals regardless of level |
| Weekly events | Weekly | Time-limited variety |
| Seasonal content | Quarterly | New themed content |
| Surprise milestones | Hidden | Unexpected achievements |
| Social comparison | On demand | Friendly rivalry fuel |

## 8. Endgame Design

**Strategy:** {{description of what happens after max level}}

| Endgame Activity | Description | Reward |
|-----------------|-------------|--------|
| {{activity}} | {{description}} | {{reward}} |

## 9. Flow Channel Verification

| Level Range | Intended Difficulty | Success Rate Target | Actual (post-launch) |
|------------|--------------------|--------------------|---------------------|
| 1-5 | Easy | 80-90% | {{TBD}} |
| 6-15 | Medium | 60-75% | {{TBD}} |
| 16-30 | Hard | 50-65% | {{TBD}} |
| 31-50 | Expert | 40-55% | {{TBD}} |

## 10. Data Model

```yaml
user_progression:
  user_id: string
  current_level: integer
  current_xp: integer
  xp_to_next_level: integer
  total_xp_earned: integer
  current_streak: integer
  longest_streak: integer
  streak_freeze_remaining: integer
  tier: string
  badges: [badge_id]
  unlocks: [unlock_id]
  prestige_count: integer  # if prestige system
  created_at: datetime
  last_xp_earned_at: datetime
```
