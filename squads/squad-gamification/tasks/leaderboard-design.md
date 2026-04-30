# Task: Leaderboard Design

> **ID:** T-GM-006
> **Type:** Design
> **Squad:** squad-gamification
> **Agents:** experience-designer (lead), player-profiler
> **Estimated Duration:** 1-2 hours
> **Inputs:** Player personas, HEXAD distribution, engagement goals
> **Outputs:** `leaderboard-spec.md`, `ranking-algorithm.yaml`

## Purpose

Projetar mecanicas de competicao social que motivem sem desmotivar. Leaderboards mal projetados sao o anti-pattern mais comum em gamificacao — 90% dos usuarios ficam no fundo e desistem. Este task projeta rankings inclusivos e socialmente saudaveis.

O leaderboard e uma das mecanicas mais poderosas e mais perigosas da gamificacao. Quando bem feito, ativa Social Influence (CD5), Accomplishment (CD2) e Scarcity (CD6). Quando mal feito, gera desmotivacao, toxicidade e churn.

## Pre-Conditions

- [ ] Player personas definidas (T-GM-002)
- [ ] Distribuicao HEXAD conhecida (% Achievers, Players, Socialisers)
- [ ] Metricas que serao ranqueadas definidas
- [ ] Contexto do produto e publico-alvo documentados

## Execution Steps

### Step 1: Context Assessment
**Agent:** experience-designer

Antes de selecionar o tipo de leaderboard, avaliar o contexto:

**Perguntas-chave:**
1. Qual o objetivo primario do leaderboard? (Competicao? Motivacao? Social proof?)
2. Qual o tamanho da base de usuarios? (<100, 100-10K, 10K-100K, 100K+)
3. Qual a distribuicao HEXAD? (Alto % de Players/Achievers = leaderboard safe. Alto % de Free Spirits = leaderboard arriscado)
4. O produto ja tem mecanicas sociais? (Grafo social existente?)
5. Qual a frequencia de interacao? (Diaria, semanal, mensal)
6. Existe risco de toxicidade? (Contexto corporativo vs. consumer)

**Matriz de decisao:**

| Fator | Favorece Leaderboard | Desfavorece Leaderboard |
|-------|---------------------|------------------------|
| HEXAD distribution | >40% Achievers+Players | >40% Free Spirits+Philanthropists |
| Base size | 100-10K (sweet spot) | <50 (sem massa critica) |
| Interaction frequency | Diaria/semanal | Mensal ou menor |
| Social graph | Existente e ativo | Inexistente |
| Context | Consumer, fitness, learning | Healthcare, mental health, sensitive |
| Risk tolerance | Alto | Baixo (enterprise, education) |

### Step 2: Leaderboard Type Selection
**Agent:** experience-designer

| Type | Description | Pros | Cons | Best For |
|------|-------------|------|------|----------|
| **Global** | All users, single ranking | Clear hierarchy | Demoralizing for 99% | Highly competitive audiences |
| **Relative** | Show +/-5 positions around user | Always competitive | Less visibility of top | Mass market products |
| **Friends** | Only friends/connections | Social, attainable | Requires social graph | Social products |
| **Cohort** | Users of similar level/time | Fair, motivating | Complex to implement | Learning platforms |
| **Team** | Group aggregate scores | Collaborative | Free-rider problem | Enterprise, education |
| **Seasonal** | Reset periodically | Fresh starts | Lost progress feeling | High-engagement products |
| **Multi-dimensional** | Separate boards per skill | Niche recognition | Fragmented attention | Skill-diverse platforms |
| **Dynamic** | AI-grouped by similar performance | Always competitive | Opaque grouping | Products with wide skill range |

**Recomendacao por cenario:**

| Cenario | Tipo Recomendado | Justificativa |
|---------|-----------------|---------------|
| SaaS B2B (<1K usuarios) | Friends + Team | Alavanca relacionamentos existentes |
| App consumer (10K+ usuarios) | Relative + Seasonal | Mantem competitividade sem desmotivar |
| E-learning | Cohort + Multi-dimensional | Justo para diferentes niveis |
| Enterprise training | Team | Colaboracao > competicao individual |
| Fitness app | Relative + Friends | Social motivation sem toxicidade |
| E-commerce loyalty | Seasonal + Multi-dimensional | Fresh starts, multiplas formas de reconhecimento |

### Step 3: Anti-Toxicity Design
**Agent:** experience-designer

**The 90-9-1 Problem:**
- 1% elite dominates the top
- 9% compete actively
- 90% see themselves at bottom -> demotivation -> churn

**Solutions:**
- **Relative Positioning:** Show rank +/-5 positions, not absolute position
- **Percentile Framing:** "You're in the top 30%" instead of "Position #3,847"
- **Progress Framing:** "You moved up 12 positions this week"
- **Multi-Board:** Boards for different skills (everyone can be #1 at something)
- **Opt-in:** Let users choose if they appear on boards
- **Cohort Matching:** Group users by join date, activity level, or skill
- **Team Boards:** Shift from individual to collective competition
- **Celebration, Not Shame:** Highlight improvements, not just absolute positions

**Anti-toxicity checklist:**

- [ ] Usuarios podem opt-out do leaderboard
- [ ] Nenhuma mensagem negativa para posicoes baixas
- [ ] Progress framing usado ao inves de absolute framing
- [ ] Usuarios novos protegidos (periodo de graca ou board separado)
- [ ] Nenhum dado sensivel exposto no ranking (salario, saude, etc.)
- [ ] Anti-gaming measures implementadas
- [ ] Mecanismo de report para comportamento toxico

**Sinais de toxicidade a monitorar:**

| Sinal | Indicador | Acao |
|-------|-----------|------|
| Churn apos queda no ranking | D7 retention cai >10% para usuarios que caem >5 posicoes | Ajustar framing para progress-based |
| Engagement only at top | >70% das interacoes do board vem dos top 10% | Introduzir relative positioning |
| Gaming the system | Acoes repetitivas de baixa qualidade para acumular pontos | Implementar quality threshold |
| Social harassment | Reports de usuarios sobre competicao agressiva | Adicionar anonimizacao opcional |

### Step 4: Ranking Algorithm
**Agent:** experience-designer

```yaml
ranking_algorithm:
  primary_metric: "xp_earned_this_period"
  secondary_metric: "streak_length"
  tiebreaker: "completion_quality"

  scoring:
    base_points_per_action: 10
    quality_multiplier: [1.0, 1.2, 1.5, 2.0]  # based on quality rating
    streak_multiplier:
      enabled: true
      formula: "min(1 + (streak_days * 0.1), 2.0)"  # cap at 2x
    decay:
      enabled: true
      half_life_days: 14  # older activity worth less
      minimum_weight: 0.1

  fairness:
    new_user_protection:
      enabled: true
      duration_days: 7
      separate_board: true
    skill_matching:
      enabled: true
      algorithm: "elo_based"
      recalibration_frequency: "weekly"
    anti_gaming:
      min_quality_threshold: 0.5
      suspicious_activity_detection: true
      max_actions_per_hour: 50
```

**Variantes de algoritmo por contexto:**

| Contexto | Metrica Primaria | Decay | Fairness Focus |
|----------|-----------------|-------|----------------|
| SaaS engagement | Acoes de valor (nao login) | 14 dias | Skill matching |
| E-learning | Competencias adquiridas | 30 dias | Cohort matching |
| Enterprise training | Modulos concluidos | 7 dias | Team balancing |
| Fitness | Atividades completadas | 7 dias | New user protection |
| Loyalty | Interacoes diversificadas | 30 dias | Spending fairness |

**Detalhamento do calculo de score:**

```
score = sum(action_score * quality_multiplier * streak_multiplier * decay_weight)

where:
  action_score = base_points * action_type_weight
  quality_multiplier = f(quality_rating)  # 1.0 to 2.0
  streak_multiplier = min(1 + streak_days * 0.1, 2.0)
  decay_weight = max(0.5 ^ (days_since_action / half_life), minimum_weight)
```

### Step 5: Visual Design Principles
**Agent:** experience-designer

**Leaderboard UX:**
- Show user's position prominently (even if low, frame positively)
- Animate rank changes (moving up feels rewarding)
- Use progress indicators (how far to next rank)
- Color code tiers (gold, silver, bronze, no negative colors)
- Show avatars/names for social connection
- Include "personal best" alongside ranking
- Display trend arrows (up/down/stable)

**Information Hierarchy:**
1. User's own position (always visible)
2. Nearby competitors (+/-3-5 positions)
3. Friends on the board
4. Top 3 (aspiration, not intimidation)
5. Board metadata (total participants, time remaining)

**Mobile-specific guidelines:**
- Position do usuario sticky no bottom da tela
- Swipe para alternar entre boards (global, friends, team)
- Pull-to-refresh para atualizar ranking
- Haptic feedback ao subir de posicao
- Card expandivel para ver detalhes de cada competidor

**Accessibility:**
- Nao depender apenas de cores para comunicar posicao
- Screen reader compatible (aria-labels para posicoes)
- Texto legivel em todos os tamanhos de tela
- Contraste suficiente para badges e indicadores

### Step 6: Persona-Specific Board Strategy
**Agent:** player-profiler

| HEXAD Type | Board Preference | Mechanic | Implementation Detail |
|-----------|-----------------|----------|----------------------|
| **Achiever** | Skill-based boards, personal bests | Mastery leaderboards, difficulty rankings | Boards separados por competencia, "personal record" highlight |
| **Player** | Global/relative boards, rewards | Points boards, prize leaderboards | Top 3 ganham recompensas tangiveis, percentile badges |
| **Socialiser** | Team boards, friend comparisons | Guild rankings, social contribution boards | "Help others" board, team challenges semanais |
| **Philanthropist** | Contribution boards | Helpfulness rankings, mentoring stats | Board de impacto social, reconhecimento de contribuicoes |
| **Free Spirit** | Exploration boards | Discovery rankings, creativity scores | Board de exploracoes unicas, criatividade, builds customizados |
| **Disruptor** | Innovation boards | Unique contributions, system improvements | Board de sugestoes implementadas, bugs reportados |

**Multi-board strategy recommendation:**

Para bases com distribuicao diversa, implementar sistema de boards multiplos:

```yaml
multi_board:
  primary: "Weekly Activity"  # Universal, Relative positioning
  secondary:
    - name: "Mastery Hall"
      target: [achiever]
      metric: "skills_mastered"
    - name: "Community Impact"
      target: [philanthropist, socialiser]
      metric: "help_score + team_contribution"
    - name: "Explorer's Path"
      target: [free_spirit]
      metric: "features_discovered + content_created"
    - name: "Innovation Lab"
      target: [disruptor]
      metric: "suggestions_implemented + bugs_found"
  visibility: "opt-in per board"
```

### Step 7: Reset and Lifecycle Strategy
**Agent:** experience-designer

**Seasonal Resets:**
```yaml
reset_strategy:
  frequency: "monthly"  # or weekly, quarterly
  preservation:
    all_time_best: true
    total_accumulated: true
    tier_badge: true  # earned tier badge stays
  fresh_start:
    current_score: 0
    streak_maintained: true
    bonus_for_returning: true
  end_of_season:
    top_10_percent: "gold_badge"
    top_25_percent: "silver_badge"
    top_50_percent: "bronze_badge"
    participated: "participation_badge"
```

**Lifecycle completo do leaderboard:**

| Fase | Duracao | Evento | Comunicacao |
|------|---------|--------|-------------|
| Pre-season | 3 dias | Anuncio + preview | "Nova temporada comeca em 3 dias!" |
| Early season | 7 dias | New user protection ativa | "Explore e acumule pontos!" |
| Mid-season | 14 dias | Competicao plena | "Voce subiu 5 posicoes esta semana!" |
| Late season | 7 dias | Sprint final | "Ultimos dias para garantir seu badge!" |
| End of season | 1 dia | Premiacao + reset | "Parabens! Voce terminou no top 25%!" |
| Off-season | 0-3 dias | Reflexao + retrospectiva | "Sua jornada nesta temporada..." |

## Output Examples

### leaderboard-spec.md (excerpt)

```markdown
## Leaderboard Specification

### Type: Relative + Seasonal

**Primary Board:** Weekly Activity (relative positioning, +/-5)
**Secondary Boards:** Mastery Hall, Community Impact, Explorer's Path
**Reset:** Monthly
**Anti-toxicity:** Percentile framing, opt-in, new user protection (7 days)

### Ranking Algorithm
- Primary: XP earned this period
- Quality multiplier: 1.0-2.0
- Streak bonus: up to 2x
- Decay: 14-day half-life
- Anti-gaming: min quality 0.5, max 50 actions/hour
```

### ranking-algorithm.yaml (excerpt)

```yaml
algorithm:
  version: "1.0"
  type: "weighted_composite"
  primary_metric: "xp_earned"
  fairness_model: "elo_based_cohort"
  anti_gaming:
    enabled: true
    rules:
      - max_actions_per_hour: 50
      - min_quality_threshold: 0.5
      - duplicate_action_cooldown: 60s
```

## Post-Conditions

- [ ] Tipo de leaderboard selecionado e justificado
- [ ] Anti-toxicity measures implementadas
- [ ] Ranking algorithm especificado
- [ ] Visual design principles documentados
- [ ] Persona-specific strategies definidas
- [ ] Reset strategy definida
- [ ] Multi-board strategy documentada (se aplicavel)
- [ ] Output files gerados nos formatos especificados

## Veto Conditions

| ID | Condition | Severity | Action |
|----|-----------|----------|--------|
| V-GM-006-01 | Leaderboard global sem anti-toxicity measures | Critical | BLOCK — 90-9-1 problem nao endereçado |
| V-GM-006-02 | Sem opcao de opt-out | Critical | BLOCK — Viola autonomia do usuario |
| V-GM-006-03 | Ranking expoe dados sensiveis | Critical | BLOCK — Violacao de privacidade |
| V-GM-006-04 | Sem protecao para novos usuarios | High | BLOCK — Desmotivacao imediata |
| V-GM-006-05 | Mecanica de shame para posicoes baixas | Critical | BLOCK — Dark pattern |
| V-GM-006-06 | Sem anti-gaming measures | High | BLOCK — Sistema manipulavel |
| V-GM-006-07 | Board unico para base diversa (>3 HEXAD types) | Medium | WARN — Considerar multi-board |
| V-GM-006-08 | Sem reset strategy para engagement sustained | Medium | WARN — Estagnacao provavel |

## Troubleshooting

### Problema: Base muito pequena para leaderboard efetivo

**Sintoma:** Menos de 50 usuarios ativos, board fica vazio ou estatico.

**Solucao:**
1. Usar team boards em vez de individual (grupos de 5-10)
2. Implementar "ghost competitors" (benchmarks, nao bots)
3. Focar em personal bests ate a base crescer
4. Considerar remover leaderboard e usar apenas badges/streaks

### Problema: Top users dominam e demotivam o resto

**Sintoma:** Top 5 usuarios tem >50% dos pontos, demais desistem.

**Solucao:**
1. Mudar para relative positioning imediatamente
2. Implementar seasonal resets (mensal ou semanal)
3. Adicionar decay ao algoritmo (atividade recente vale mais)
4. Criar boards separados por skill/nivel
5. Introduzir team boards para diluir dominancia individual

### Problema: Gaming the system (acoes de baixa qualidade)

**Sintoma:** Usuarios repetem acoes minimas para acumular pontos.

**Solucao:**
1. Implementar quality threshold (min quality 0.5)
2. Adicionar cooldown entre acoes repetidas
3. Ponderar acoes por qualidade (quality_multiplier)
4. Limitar acoes por hora (max_actions_per_hour)
5. Detectar padroes suspeitos automaticamente

### Problema: Leaderboard ignorado pela maioria dos usuarios

**Sintoma:** <10% da base interage com o leaderboard.

**Solucao:**
1. Verificar se HEXAD distribution favorece leaderboards (Achievers+Players >30%)
2. Melhorar visibilidade (posicao na home, notificacoes de rank change)
3. Adicionar recompensas tangiveis para posicoes altas
4. Testar friends board (social relevance)
5. Considerar substituir por mecanicas alternativas (streaks, challenges)

## Framework References

- **Kim, A.J.** — *Game Thinking* (Player journey, social engagement design)
- **Marczewski, A.** — *Even Ninja Monkeys Like to Play* (HEXAD-based board design)
- **Chou, Y.** — *Actionable Gamification* (CD5 Social Influence, CD2 Accomplishment)
- **Schell, J.** — *The Art of Game Design* (Lens of Competition, Lens of Fairness)
- **Eyal, N.** — *Hooked* (Variable rewards in competitive contexts)
- **Deterding, S.** — Research on competitive vs. cooperative gamification mechanics

## Quality Gate

Applies: `GM-QG-006` (Social Mechanics Quality Gate)

- [ ] 90-9-1 problem addressed
- [ ] Opt-in/opt-out available
- [ ] Anti-gaming measures in place
- [ ] Positive framing (no shame mechanics)
- [ ] Fairness for new users
- [ ] Aligned with HEXAD distribution

## Next Tasks

- `emotion-mapping` — Emocoes durante competicao
- `ab-test-gamification` — Test leaderboard variants
- `anti-pattern-audit` — Verify no toxic mechanics
