---

# Workflow: Competition Prep Cycle — Preparacao para Competicao

## Workflow Definition

```yaml
workflow:
  id: FC-WF-003
  name: "Competition Prep Cycle"
  squad: fitcoach
  version: 1.0.0
  description: >-
    Ciclo completo de preparacao para competicao de fisiculturismo, desde a
    avaliacao inicial ate a reverse diet pos-competicao. 7 fases cobrindo
    off-season, pre-prep, prep de 16-20 semanas, peak week, show day e
    recuperacao pos-competicao. Usa expertise de Rambod (prep/peak week),
    Norton (nutrition/reverse), Israetel (volume/retention), Bompa
    (periodizacao), Glass (posing/biomecanica) e Jansen (intensity/elite).
  type: competition-lifecycle
  pattern_prefix: FC
  updated_at: 2026-03-11

  metadata:
    elicit: true
    confirmation_required: true
    estimated_duration: "24-52 weeks (off-season to reverse)"
    phases: 7
    tasks_involved: 5
    sequential: true
    high_risk: true

  entry_conditions:
    - "Cliente classificado como advanced ou elite"
    - "Competicao registrada com data definida"
    - "Minimo 16 semanas ate o show (ideal 20-24)"
    - "Exames medicos recentes sem contraindicacoes"
    - "Coach com experiencia em prep (ou assistido pelo sistema)"

  exit_conditions:
    - "Competicao realizada"
    - "Reverse diet completado (8-16 semanas pos-show)"
    - "Cliente em calorias de manutencao saudaveis"
    - "Saude fisica e mental restaurada"

  safety_first:
    - "SAUDE SEMPRE ACIMA DE RESULTADO ESTETICO"
    - "Qualquer sinal de comprometimento grave = pausa ou cancelamento"
    - "Monitoramento de saude mental durante toda a prep"
    - "Exames periodicos recomendados"
```

---

## Overview do Ciclo

```
┌────────────────────────────────────────────────────────────────────────────┐
│                    COMPETITION PREP CYCLE                                 │
│                                                                            │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐              │
│  │ PHASE 1  │──→│ PHASE 2  │──→│ PHASE 3  │──→│ PHASE 4  │              │
│  │ASSESSMENT│   │OFF-SEASON│   │ PRE-PREP │   │   PREP   │              │
│  │(1-2 wks) │   │(12-24wks)│   │ (4-6wks) │   │(16-20wks)│              │
│  └──────────┘   └──────────┘   └──────────┘   └──────────┘              │
│                                                     │                     │
│                 ┌──────────┐   ┌──────────┐   ┌─────▼────┐              │
│                 │ PHASE 7  │←──│ PHASE 6  │←──│ PHASE 5  │              │
│                 │ REVERSE  │   │ SHOW DAY │   │PEAK WEEK │              │
│                 │(8-16 wks)│   │ (1 day)  │   │ (1 week) │              │
│                 └──────────┘   └──────────┘   └──────────┘              │
│                                                                            │
│  Total: 24-52 semanas (off-season completo ao reverse)                    │
│  Minimo: 16 semanas (direto para prep sem off-season)                     │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: ASSESSMENT — Avaliacao Inicial

### Objetivo
Avaliar o physique atual do competidor, determinar viabilidade, definir timeline e planejar toda a preparacao.

### Tasks Executadas
- `tasks/client-intake.md` (FC-TASK-001) — se novo cliente
- `tasks/competition-prep.md` (FC-TASK-008) — Step 0: Assessment

### Executor
- **Primary:** prep-master (Rambod)
- **Support:** hypertrophy-scientist (Israetel), biomechanics-coach (Glass)
- **Approval:** coach

### Steps Detalhados

#### 1.1 Avaliacao de Physique

**Avaliacao Completa por Grupo Muscular:**

| Grupo | Avaliacao | Classificacao |
|-------|-----------|---------------|
| Peito | Espessura, forma, proporcao upper/lower | Forte/Adequado/Fraco |
| Costas | Largura, espessura, detalhamento | Forte/Adequado/Fraco |
| Deltoides | Roundness, separacao, proporcao 3 cabecas | Forte/Adequado/Fraco |
| Bracos | Tamanho, pico, proporcao biceps/triceps | Forte/Adequado/Fraco |
| Quadriceps | Sweep, separacao, vastus medialis | Forte/Adequado/Fraco |
| Posteriores | Tamanho, separacao, tie-in com gluteos | Forte/Adequado/Fraco |
| Gluteos | Roundness, striations, tie-in | Forte/Adequado/Fraco |
| Panturrilhas | Tamanho, forma, simetria | Forte/Adequado/Fraco |
| Abdominais | Simetria, espessura, vacuum | Forte/Adequado/Fraco |
| Simetria Geral | Balanco L/R, proporcoes, flow | Boa/Adequada/Precisa Trabalho |

**Fotos de Assessment:**
- Front relaxed + Front double biceps + Front lat spread
- Side chest (L+R) + Side triceps (L+R)
- Back relaxed + Back double biceps + Back lat spread
- Abs & thigh + Most muscular
- Glutes (para Bikini/Wellness)

```yaml
step_1_1:
  name: "Avaliacao de Physique"
  executor: prep-master
  advisors: [prep-master, biomechanics-coach]
  duration: "20-30 min"
  assessment:
    per_muscle_group:
      - group: "Nome"
      - rating: "strong|adequate|weak"
      - notes: "Observacoes especificas"
      - priority_in_prep: "maintain|improve|emphasize"
    overall:
      symmetry: "[1-10]"
      conditioning_potential: "[1-10]"
      stage_readiness: "weeks_needed"
      weak_points: ["Top 3 pontos fracos"]
      strong_points: ["Top 3 pontos fortes"]
  output: physique_assessment
```

#### 1.2 Calculo de Viabilidade

```yaml
step_1_2:
  name: "Calculo de Viabilidade"
  executor: prep-master
  duration: "5-10 min"
  calculations:
    current_weight: "{kg}"
    current_bf_percent: "{%}"
    lean_mass: "weight * (1 - bf/100)"
    target_bf_percent:
      mens_bodybuilding: "4-6%"
      classic_physique: "5-7%"
      mens_physique: "6-8%"
      bikini: "12-15%"
      figure: "10-13%"
      wellness: "12-15%"
    stage_weight: "lean_mass / (1 - target_bf/100)"
    fat_to_lose: "current_weight - stage_weight"
    weeks_available: "(competition_date - today) / 7"
    required_rate: "fat_to_lose / weeks_available"
    is_viable: "required_rate <= 0.7% bodyweight/week"
    recommendation:
      viable: "Prosseguir com prep"
      borderline: "Possivel, mas sem margem de erro"
      not_viable: "Considerar competicao posterior"
  output: viability_report
```

#### 1.3 Timeline Planning

- Definir data de inicio de cada fase
- Definir checkpoints semanais com metricas esperadas
- Definir decision points (pontos onde ajustes sao necessarios)
- Definir plan B (se progresso for mais lento que esperado)

### Outputs
- `physique_assessment` — Avaliacao completa
- `viability_report` — Calculo de viabilidade
- `prep_timeline` — Timeline com todas as fases e datas

### Checkpoint 1 → Phase 2 ou Phase 3/4

```yaml
checkpoint_1:
  name: "Assessment Complete Gate"
  conditions:
    - "Physique assessment completo com fotos e avaliacoes"
    - "Viabilidade calculada e positiva"
    - "Timeline definido com checkpoints"
    - "Coach e cliente alinhados no plano"
    - "Exames medicos recentes OK"
  routing:
    with_offseason: "Phase 2 (if > 24 weeks to show)"
    direct_prep: "Phase 3 or 4 (if <= 24 weeks to show)"
  blocker: true
```

---

## Phase 2: OFF-SEASON — Foco em Hipertrofia

### Objetivo
Maximizar ganho de massa muscular de qualidade, corrigir pontos fracos e preparar o physique para a prep.

### Tasks Executadas
- `tasks/create-training-plan.md` (FC-TASK-002) — Volume otimizado para hypertrophy
- `tasks/create-diet-plan.md` (FC-TASK-003) — Surplus calorico controlado
- `tasks/weekly-checkin.md` (FC-TASK-004) — Monitoramento

### Executor
- **Training:** hypertrophy-scientist (Israetel) + periodization-architect (Bompa)
- **Nutrition:** nutrition-scientist (Norton)
- **Execution:** training-builder + diet-builder

### Off-Season Strategy

#### 2.1 Treino de Off-Season (Israetel + Bompa)

**Periodizacao de Off-Season (Bompa):**
- Mesociclos de 4-6 semanas
- Modelo: Block Periodization ou DUP (Daily Undulating)
- Foco: Volume progressivo para pontos fracos

**Volume de Off-Season (Israetel):**
- Volume proximo ao MAV para todos os grupos
- Volume proximo ao MRV para pontos fracos
- Progressao de volume ao longo de cada mesociclo
- Deload a cada 4-5 semanas

**Enfase em Pontos Fracos (Glass):**
- Frequencia 2-3x/semana para pontos fracos
- Exercicios com melhor ativacao muscular para cada ponto fraco
- Variacoes para atingir diferentes porcoes do musculo

```yaml
step_2_1:
  name: "Treino Off-Season"
  executor: training-builder
  advisors: [hypertrophy-scientist, periodization-architect, biomechanics-coach]
  duration: "12-24 semanas"
  focus:
    primary: "Hipertrofia em pontos fracos"
    secondary: "Manutencao de pontos fortes"
    volume: "Near MAV (all) / Near MRV (weak points)"
    periodization: "Block or DUP"
    intensity_techniques: "Full arsenal (Jansen)"
  monitoring:
    frequency: "weekly check-in"
    metrics: ["weight", "measurements", "strength", "photos_monthly"]
    adjustment_triggers: ["BF% gaining too fast", "strength stalling"]
```

#### 2.2 Nutricao de Off-Season (Norton)

**Surplus Controlado:**
- Lean bulk: TDEE + 200-300 kcal
- Monitorar BF%: nao exceder 15-17% (homens) ou 22-25% (mulheres)
- Proteina: 1.6-2.2 g/kg
- Mini-cuts de 2-4 semanas se BF% subir demais

```yaml
step_2_2:
  name: "Nutricao Off-Season"
  executor: diet-builder
  advisor: nutrition-scientist
  surplus: "+200-300 kcal"
  protein: "1.6-2.2 g/kg"
  bf_ceiling:
    male: "15-17%"
    female: "22-25%"
  mini_cut:
    trigger: "BF% ceiling reached"
    duration: "2-4 weeks"
    deficit: "-500 kcal"
```

### Checkpoint 2 → Phase 3

```yaml
checkpoint_2:
  name: "Off-Season Complete Gate"
  conditions:
    - "Pontos fracos mostraram melhoria visivel"
    - "Massa muscular ganha dentro do esperado"
    - "BF% dentro do range aceitavel para iniciar pre-prep"
    - "Saude geral boa (exames, energia, humor)"
    - "Minimo 20-24 semanas ate a competicao"
  on_pass: "Proceed to Phase 3"
  on_fail: "Extend off-season or reconsider competition date"
  blocker: true
```

---

## Phase 3: PRE-PREP — Fase de Transicao

### Objetivo
Transicao suave do off-season para a prep, estabelecer baseline metabolico e preparar corpo e mente para o deficit.

### Executor
- **Primary:** prep-master (Rambod)
- **Nutrition:** nutrition-scientist (Norton)

### Duracao: 4-6 semanas

### Steps Detalhados

#### 3.1 Transicao Nutricional

- Reduzir surplus para manutencao (TDEE exato)
- Estabilizar peso por 2-3 semanas
- Identificar TDEE real de manutencao (peso estavel = manutencao verdadeira)
- Este numero sera a base para calcular deficit na prep

```yaml
step_3_1:
  name: "Transicao Nutricional"
  executor: diet-builder
  advisor: nutrition-scientist
  duration: "4-6 weeks"
  protocol:
    week_1_2: "Reduzir surplus para maintenance"
    week_3_4: "Estabilizar e confirmar TDEE real"
    week_5_6: "Preparar para inicio do deficit"
  metrics:
    daily_weight: "Pesagem diaria"
    weekly_average: "Media semanal deve estabilizar"
    confirmed_tdee: "TDEE confirmado quando peso estavel por 2+ semanas"
```

#### 3.2 Transicao de Treino

- Manter volume de off-season (nao reduzir ainda)
- Ajustar split se necessario para frequencia de prep
- Estabelecer PRs de referencia (baseline de forca)
- Ultimas semanas com intensity techniques agressivas

#### 3.3 Preparacao Mental

- Alinhar expectativas com o cliente
- Discutir sacrificios necessarios durante a prep
- Estabelecer sistema de suporte (familia, amigos, comunidade)
- Definir "abort criteria" (quando parar a prep por saude)

### Checkpoint 3 → Phase 4

```yaml
checkpoint_3:
  name: "Pre-Prep Complete Gate"
  conditions:
    - "TDEE de manutencao confirmado (peso estavel 2+ semanas)"
    - "Baseline de forca registrado (PRs de referencia)"
    - "Cliente mentalmente preparado para prep"
    - "Abort criteria definidos e acordados"
    - "16-20 semanas ate a competicao"
  on_pass: "Proceed to Phase 4 (PREP)"
  on_fail: "Extend pre-prep or reconsider timeline"
  blocker: true
```

---

## Phase 4: PREP — Preparacao de 16-20 Semanas

### Objetivo
Reduzir gordura corporal progressivamente ate stage-ready preservando o maximo de massa muscular.

### Task Executada
`tasks/competition-prep.md` (FC-TASK-008) — Steps 1-3

### Executor
- **Primary:** prep-master (Rambod)
- **Nutrition:** nutrition-scientist (Norton)
- **Training:** hypertrophy-scientist (Israetel) + periodization-architect (Bompa)
- **Weekly Monitoring:** progress-tracker

### Fases da Prep

#### 4.1 Prep Phase 1: Deficit Leve (Semanas 20-17)

```yaml
prep_phase_1:
  name: "Deficit Leve"
  weeks: "20-17 from show"
  calories: "TDEE - 200 to -300 kcal"
  protein: "2.0-2.2 g/kg"
  training_volume: "100% of off-season"
  cardio: "2-3x LISS 20min"
  refeed: "Every 10-14 days"
  expected_loss: "0.3-0.5 kg/week"
  monitoring: "Weekly check-in, biweekly photos"
  decision_points:
    on_track: "Continue to Phase 2"
    too_slow: "Increase deficit by 100-200 kcal"
    too_fast: "Reduce deficit, check muscle loss"
```

#### 4.2 Prep Phase 2: Deficit Moderado (Semanas 16-9)

```yaml
prep_phase_2:
  name: "Deficit Moderado"
  weeks: "16-9 from show"
  calories: "TDEE - 400 to -600 kcal"
  protein: "2.2-2.5 g/kg"
  training_volume: "85-90% of off-season"
  cardio: "3-5x LISS 30-40min"
  refeed: "Every 7-10 days"
  expected_loss: "0.5-0.8 kg/week"
  monitoring: "Weekly check-in, weekly photos"
  training_adjustments:
    - "Reduzir 1-2 sets por grupo muscular"
    - "Manter intensidade (carga) o maximo possivel"
    - "Reduzir intensity techniques (Jansen recommendation)"
  nutrition_adjustments:
    - "Reducao vem primariamente de carboidratos"
    - "Proteina mantida ou aumentada"
    - "Gordura nunca abaixo de 0.5 g/kg"
  decision_points:
    on_track: "Continue to Phase 3"
    plateau: "Implement diet break (Norton) or increase cardio"
    muscle_loss: "Reduce deficit, increase protein"
    mental_health: "Check in with client, consider adjustments"
```

#### 4.3 Prep Phase 3: Deficit Agressivo (Semanas 8-2)

```yaml
prep_phase_3:
  name: "Deficit Agressivo"
  weeks: "8-2 from show"
  calories: "TDEE - 600 to -900 kcal"
  protein: "2.5-2.7 g/kg"
  training_volume: "70-80% of off-season"
  cardio: "5-6x LISS 40-50min"
  refeed: "Every 5-7 days"
  expected_loss: "0.5-1.0 kg/week"
  monitoring: "Weekly check-in, weekly photos, daily weight"
  critical_monitoring:
    - "Sinais de overtraining/overreaching"
    - "Saude hormonal (humor, libido, energia)"
    - "Qualidade do sono"
    - "Relacao com comida (disturbio alimentar?)"
    - "Forca no treino (queda aceitavel ate 10-15%)"
  abort_criteria:
    - "Perda de mais de 15% de forca em compostos"
    - "Sinais graves de disturbio alimentar"
    - "Lesao significativa"
    - "Saude mental severamente comprometida"
    - "Indicacao medica para parar"
  decision_points:
    on_track: "Proceed to Peak Week"
    behind: "Assess if show is still viable"
    ahead: "Reduce deficit, coast into peak week"
    health_concern: "Evaluate abort vs continue"
```

#### 4.4 Posing Practice (Ultimas 8 semanas)

```yaml
posing:
  name: "Posing Practice"
  advisor: biomechanics-coach
  frequency: "15-30min daily for last 8 weeks"
  protocol:
    weeks_8_5:
      focus: "Individual poses, learn each position"
      duration: "15 min/day"
      feedback: "Video review weekly"
    weeks_4_2:
      focus: "Full routine, transitions, stage presence"
      duration: "20-30 min/day"
      feedback: "Video review 2x/week"
    week_1:
      focus: "Polish, confidence, automatic"
      duration: "15 min/day (dont overtire)"
      feedback: "Final video review"
  mandatory_poses:
    bodybuilding: 8
    classic_physique: 5
    mens_physique: 4
    bikini: 2
    figure: 4
    wellness: 4
```

### Weekly Monitoring durante Prep

```yaml
weekly_monitoring:
  task: "weekly-checkin (FC-TASK-004)"
  frequency: "Weekly (2x/week in final 4 weeks)"
  enhanced_metrics:
    - "Daily weight (7-day rolling average)"
    - "Circumference measurements (weekly)"
    - "Progress photos (weekly, same lighting/time)"
    - "Training log (all sessions)"
    - "Adherence (training + diet)"
    - "Recovery score (wellbeing + sleep + stress)"
    - "Mood journal (mental health tracking)"
    - "Strength tracking (compound lifts)"
  alerts:
    red:
      - "Weight loss > 1.5 kg/week for 2 consecutive weeks"
      - "Strength loss > 15% on any compound"
      - "Recovery score < 3 for 2 consecutive weeks"
      - "Client reports severe distress/disordered eating"
    yellow:
      - "Weight stalled for 3+ weeks"
      - "Adherence below 80%"
      - "Recovery score 3-5"
      - "Strength trending down consistently"
```

### Checkpoint 4 → Phase 5

```yaml
checkpoint_4:
  name: "Prep Complete Gate"
  conditions:
    - "BF% at or near target (within 1-2%)"
    - "Visual conditioning appropriate for peak week"
    - "Client healthy enough to proceed"
    - "Coach confirms readiness for peak week"
    - "1 week before competition"
  on_ready: "Proceed to Phase 5 (Peak Week)"
  on_not_ready: "Extend prep 1-2 weeks if show allows"
  on_abort: "Cancel show, begin Phase 7 (Reverse)"
  blocker: true
```

---

## Phase 5: PEAK WEEK — Manipulacao Final (Rambod)

### Objetivo
Otimizar visual do physique para o palco usando manipulacao de agua, sodio e carboidratos.

### Task Executada
`tasks/competition-prep.md` (FC-TASK-008) — Step 4

### Executor
- **Primary:** prep-master (Hany Rambod)
- **Support:** nutrition-scientist (Norton)
- **Monitoring:** DIARIO (nao semanal)

### AVISO CRITICO

```
╔══════════════════════════════════════════════════════════════╗
║  PEAK WEEK E EXTREMAMENTE INDIVIDUAL                       ║
║                                                              ║
║  Este protocolo e um TEMPLATE. Cada corpo responde          ║
║  diferente. O coach DEVE monitorar diariamente e ajustar.   ║
║                                                              ║
║  NUNCA cortar agua completamente — RISCO DE SAUDE.          ║
║  NUNCA manipular sodio sem supervisao — RISCO DE SAUDE.     ║
║                                                              ║
║  Se em duvida: NAO MANIPULE. E melhor subir ao palco       ║
║  um pouco "soft" do que arriscar spillover ou desidratacao. ║
╚══════════════════════════════════════════════════════════════╝
```

### Protocolo Diario

#### D-7 a D-5: Depletion + Hidratacao Alta

```yaml
depletion_phase:
  days: "D-7, D-6, D-5"
  water: "6-8L/day (super hydration)"
  sodium: "Normal to slightly high (3000-4000mg)"
  carbs: "Low (50-100g/day from vegetables)"
  protein: "Maintain (2.0-2.5 g/kg)"
  fat: "Low (0.5-0.7 g/kg)"
  training:
    D-7: "Full body depletion workout (high rep, moderate weight, short rest)"
    D-6: "Upper body depletion (same protocol)"
    D-5: "Lower body depletion (last heavy workout of prep)"
  purpose: "Deplete glycogen stores, prime body for super-compensation"
  visual_check: "Morning assessment — should look flat/depleted"
```

#### D-4 a D-3: Carb Load + Reducao de Agua

```yaml
carb_load_phase:
  days: "D-4, D-3"
  water:
    D-4: "4-6L (start reducing)"
    D-3: "3-4L (continue reducing)"
  sodium:
    D-4: "Reduce 50% (1500-2000mg)"
    D-3: "Reduce 75% (750-1000mg)"
  carbs:
    D-4: "HIGH — 400-600g (clean sources: white rice, potato, bread)"
    D-3: "HIGH — 300-500g (same sources, may reduce if filling well)"
  protein: "Moderate (1.5-2.0 g/kg)"
  fat: "Minimal (0.3-0.5 g/kg)"
  training:
    D-4: "Light pump workout or rest"
    D-3: "Rest"
  purpose: "Super-compensate glycogen, create full/round look"
  visual_check:
    D-4_morning: "Starting to fill up — muscles should look rounder"
    D-4_evening: "Evaluate — adjust D-3 carbs based on response"
    D-3_morning: "Should look significantly fuller than depletion"
    D-3_evening: "Final assessment — adjust D-2 based on visual"
  adjustment_rules:
    filling_too_fast: "Reduce D-3 carbs by 100-200g"
    not_filling_enough: "Increase D-3 carbs by 50-100g"
    spillover_signs: "Reduce carbs, slight increase in sodium, wait"
```

#### D-2 a D-1: Fine Tuning

```yaml
fine_tuning_phase:
  days: "D-2, D-1"
  water:
    D-2: "2-3L (limited)"
    D-1: "Sips only (500ml-1L max)"
  sodium:
    D-2: "Minimal (500mg)"
    D-1: "Minimal (300-500mg)"
  carbs:
    D-2: "Moderate (200-300g — smaller meals, same sources)"
    D-1: "Moderate (150-200g — grazing throughout day)"
  protein: "Low-moderate (1.5 g/kg)"
  fat: "Minimal"
  training:
    D-2: "Brief pump workout if needed (10-15 min)"
    D-1: "Complete rest, posing practice only"
  purpose: "Fine-tune look, shed subcutaneous water, maintain fullness"
  visual_check:
    D-2_morning: "Should look dry and full"
    D-1_morning: "Stage-ready assessment"
    D-1_evening: "Final visual — last chance to adjust show day plan"
  emergency_protocols:
    too_watery:
      action: "Small amount of natural diuretic (dandelion root if approved)"
      carbs: "Reduce slightly"
      sodium: "Small pinch can sometimes help pull water out"
    too_flat:
      action: "Small carb meal (rice cakes + honey)"
      wait: "1-2 hours, reassess"
    cramps:
      action: "Electrolyte supplement immediately (potassium, magnesium)"
      water: "Small sips as needed"
```

### Checkpoint 5 → Phase 6

```yaml
checkpoint_5:
  name: "Peak Week Complete Gate"
  conditions:
    - "Visual assessment: dry, full, conditioned"
    - "Client healthy and able to compete"
    - "Show day supplies packed and ready"
    - "Tanning applied"
    - "Posing practiced and confident"
  on_ready: "Proceed to Phase 6 (Show Day)"
  on_not_ideal: "Make final adjustments morning of show"
  on_health_concern: "Evaluate safety, consider withdrawal"
  blocker: true
```

---

## Phase 6: SHOW DAY — Dia da Competicao

### Objetivo
Executar todos os protocolos do dia da competicao para maximizar apresentacao no palco.

### Task Executada
`tasks/competition-prep.md` (FC-TASK-008) — Step 5

### Executor
- **Primary:** prep-master (Rambod)
- **Coach:** presente fisicamente (ideal) ou remoto

### Timeline do Show Day

```yaml
show_day:
  wake_up:
    time: "3-4h before check-in"
    visual_check: "Foto imediata — avaliar condicao"
    first_meal:
      timing: "30-45 min after waking"
      content: "White rice (100-150g) + chicken breast (100-150g) + honey (1 tbsp)"
      purpose: "Top off glycogen, start the day"

  pre_show_meals:
    meal_2:
      timing: "2h before stage"
      content: "Rice cakes (4-6) + honey + small protein"
      purpose: "Maintain fullness"
    meal_3:
      timing: "30-60 min before stage"
      content: "Rice cakes (2-3) + honey or candy"
      purpose: "Final pump fuel"

  water:
    strategy: "Small sips only throughout the day"
    avoid: "Large amounts at once"
    wine_trick: "Small sip of red wine 15-20min before stage (vasodilation) — OPTIONAL and controversial"

  backstage:
    arrival: "30-60 min before number called"
    pump_protocol:
      duration: "10-15 min"
      exercises:
        - "Push-ups: 3x15-20 (chest pump)"
        - "Band curls: 3x15 (arm pump)"
        - "Band lateral raises: 3x15 (shoulder pump)"
        - "Band press: 2x15 (chest/triceps)"
        - "Light lunges: 2x10 (legs)"
      intensity: "Moderate — enough for pump, not for fatigue"
      timing: "Start 15-20 min before stage"
    tanning: "Touch up as needed"
    oil: "Apply posing oil/spray"
    final_check: "Full pose run-through in mirror"

  on_stage:
    mindset: "Confidence, smile, enjoy the moment"
    poses: "Execute as practiced — smooth transitions"
    judges: "Follow instructions, present best angles"
    abs: "Keep tight throughout — dont relax"

  post_show:
    immediate: "Hydrate (water + electrolytes)"
    first_meal: "Controlled celebration meal (not a binge)"
    photos: "Capture stage photos and trophy shots"
    mindset: "Regardless of result, celebrate the journey"
```

### Checkpoint 6 → Phase 7

```yaml
checkpoint_6:
  name: "Show Day Complete"
  conditions:
    - "Competition completed"
    - "Client safe and healthy"
    - "Results documented (placement, photos)"
    - "Post-show meal controlled"
  on_pass: "Proceed to Phase 7 (Reverse Diet) — starts NEXT DAY"
  blocker: false
```

---

## Phase 7: REVERSE — Recuperacao Pos-Competicao

### Objetivo
Restaurar metabolismo, saude hormonal, saude mental e peso corporal de forma gradual e controlada.

### Task Executada
`tasks/competition-prep.md` (FC-TASK-008) — Step 7

### Executor
- **Primary:** nutrition-scientist (Layne Norton)
- **Support:** prep-master (Rambod)
- **Monitoring:** progress-tracker

### AVISO CRITICO

```
╔══════════════════════════════════════════════════════════════╗
║  O POS-COMPETICAO E TÃO IMPORTANTE QUANTO A PREP           ║
║                                                              ║
║  Risco de rebound severo se nao controlado.                 ║
║  Risco de disturbio alimentar pos-show.                     ║
║  Risco de depressao pos-show (perda de identidade/objetivo).║
║                                                              ║
║  SUPORTE PSICOLOGICO e essencial nesta fase.                ║
║  Normalizar ganho de peso gradual.                          ║
║  Celebrar o processo, nao apenas o resultado.               ║
╚══════════════════════════════════════════════════════════════╝
```

### Protocolo de Reverse Diet (Norton)

#### Semanas 1-2: Recovery

```yaml
recovery_phase:
  weeks: "1-2 post-show"
  calories: "Show day calories + 200-300 kcal"
  protein: "2.0-2.4 g/kg (maintain high)"
  carbs: "Majority of increase"
  fat: "Small increase"
  cardio: "Reduce 50% immediately"
  training: "Maintenance volume, lower intensity"
  weight_expectation: "+2-4 kg (glycogen + water + food volume — NOT fat)"
  mental_health:
    - "It's NORMAL to gain weight rapidly in first 1-2 weeks"
    - "This is glycogen + water, not fat"
    - "Avoid the scale if it causes distress"
    - "Focus on how you FEEL, not how you LOOK"
```

#### Semanas 3-6: Early Reverse

```yaml
early_reverse:
  weeks: "3-6 post-show"
  caloric_increase: "+100-150 kcal/week"
  protein: "2.0-2.2 g/kg"
  carbs: "Increase primarily"
  fat: "Gradual increase toward 1.0 g/kg"
  cardio: "Reduce to 2-3x/week LISS 20-30min"
  training: "Gradually increase volume back toward off-season levels"
  weight_gain_expected: "+0.3-0.5 kg/week"
  monitoring:
    - "Weekly weight (7-day average)"
    - "Biweekly photos"
    - "Mood/energy journal"
    - "Hunger levels"
    - "Sleep quality"
    - "Hormonal signs (libido, body temperature)"
```

#### Semanas 7-10: Mid Reverse

```yaml
mid_reverse:
  weeks: "7-10 post-show"
  caloric_increase: "+75-100 kcal/week"
  focus: "Approaching maintenance calories"
  training: "Full off-season volume"
  cardio: "2x/week optional"
  adjustment:
    too_fast_gain: "Slow caloric increase"
    no_gain: "Increase more aggressively"
    hormonal_recovery: "Monitor signs of hormonal normalization"
```

#### Semanas 11-16: Late Reverse

```yaml
late_reverse:
  weeks: "11-16 post-show"
  caloric_increase: "+50-75 kcal/week"
  target: "Reach new maintenance calories"
  note: "New maintenance may be higher than pre-prep if metabolism recovered well"
  training: "Full off-season — ready to start new improvement phase"
  cardio: "Optional for health (2-3x, enjoyable activity)"
  signs_of_completion:
    - "Weight stable at new maintenance"
    - "Energy levels normalized"
    - "Libido normalized"
    - "Sleep quality good"
    - "Mood stable"
    - "Hunger levels manageable"
    - "Body temperature normal"
    - "Relationship with food healthy"
```

### Checkpoint 7 (Final)

```yaml
checkpoint_7:
  name: "Reverse Complete Gate"
  conditions:
    - "Calories at healthy maintenance level"
    - "Weight stable for 2+ weeks"
    - "All hormonal signs normalized"
    - "Mental health stable"
    - "Relationship with food healthy"
    - "Client ready for next phase (off-season, maintenance, or another show)"
  outcomes:
    next_show: "Return to Phase 1 (Assessment for next competition)"
    off_season: "Return to Phase 2 (Off-Season improvement)"
    maintenance: "Exit workflow, transition to full-client-journey"
  blocker: true
```

---

## Workflow Configuration

```yaml
configuration:
  monitoring:
    phase_1: "1x assessment"
    phase_2: "Weekly check-in + monthly photos"
    phase_3: "Weekly check-in + biweekly photos"
    phase_4: "Weekly check-in + weekly photos (2x/week last 4 weeks)"
    phase_5: "DAILY monitoring"
    phase_6: "Real-time on show day"
    phase_7: "Weekly check-in + biweekly photos"

  communication:
    coach_availability: "High throughout, CRITICAL during peak week and show day"
    client_channel: [whatsapp, email]
    emergency_contact: "Coach phone for peak week emergencies"

  safety:
    medical_exams:
      pre_prep: "Blood work (hormones, thyroid, metabolic panel)"
      mid_prep: "Blood work if symptoms arise"
      post_show: "Blood work 4-6 weeks after show"
    abort_criteria:
      - "Severe metabolic adaptation not responding to diet breaks"
      - "Disordered eating behavior"
      - "Severe depression or anxiety"
      - "Injury preventing training"
      - "Medical professional recommends stopping"
    mental_health:
      - "Regular check-ins on psychological state"
      - "Referral to sports psychologist if needed"
      - "Post-show depression awareness"
      - "Body dysmorphia monitoring"
```

---

## Metadata

```yaml
workflow_id: FC-WF-003
name: competition-prep-cycle
version: 1.0.0
squad: fitcoach
tasks:
  - client-intake (FC-TASK-001)
  - create-training-plan (FC-TASK-002)
  - create-diet-plan (FC-TASK-003)
  - weekly-checkin (FC-TASK-004)
  - adjust-protocol (FC-TASK-005)
  - competition-prep (FC-TASK-008)
agents:
  - prep-master
  - training-builder
  - diet-builder
  - progress-tracker
  - automation-engineer
advisors:
  - prep-master (Hany Rambod)
  - nutrition-scientist (Layne Norton)
  - hypertrophy-scientist (Mike Israetel)
  - periodization-architect (Tudor Bompa)
  - biomechanics-coach (Charles Glass)
  - elite-coach (Matt Jansen)
tools:
  - training-plan-generator
  - macro-calculator
  - progress-comparator
  - quality-checker
tags:
  - competition
  - bodybuilding
  - prep
  - peak-week
  - reverse-diet
  - lifecycle
updated_at: 2026-03-11
```
