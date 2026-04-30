<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: competition-prep
  task_name: Competition Prep
  status: active
  responsible_executor: 'prep-master + nutrition-scientist + training-builder'
  execution_type: Worker
  estimated_time: 30m
  domain: Tactical
  output_persistence: transient_output
  accountable_id: Human:Squad_Operator
  accountability_scope: review_only
```
<!-- SINKRA_TASK_METADATA:END -->

<!-- SINKRA_CONTRACT:START -->
```yaml
sinkra_contract:
  Domain: Tactical
  atomic_layer: Atom
  executor: Worker
  pre_condition: "inputs e dependencias resolvidos antes de iniciar."
  post_condition: "output principal gerado e pronto para handoff."
  performance: "executar dentro do SLA, registrar erro e escalar sem falha silenciosa."
```
<!-- SINKRA_CONTRACT:END -->

---

## Execution Modes

**Escolha o modo de execucao:**

### 1. YOLO Mode - Rapido, Autonomo (0-1 prompts)
- **NAO RECOMENDADO** para competition prep
- **Melhor para:** Nunca — prep requer supervisao constante

### 2. Interactive Mode - Balanceado, Educativo (5-10 prompts) **[DEFAULT]**
- Checkpoints em cada fase da preparacao
- Coach participa ativamente de todas as decisoes criticas
- **Melhor para:** Maioria das preps

### 3. Pre-Flight Planning - Planejamento Completo Antecipado **[RECOMENDADO]**
- Planejamento completo de 16-24 semanas antes de iniciar
- Zero ambiguidade em cada fase
- **Melhor para:** Todas as competition preps — decisoes devem ser planejadas com antecedencia

**Parameter:** `mode` (optional, default: `pre-flight`)

---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: competitionPrep()
id: FC-TASK-008
responsavel: prep-master + nutrition-scientist + training-builder
responsavel_type: Agent (multi-advisor)
squad: fitcoach
pattern_prefix: FC
atomic_layer: Organism

advisors:
  - prep-master (Hany Rambod) — Contest prep, FST-7, peak week, water/sodium/carb manipulation
  - nutrition-scientist (Layne Norton) — Reverse dieting, metabolic adaptation, evidence-based nutrition
  - hypertrophy-scientist (Mike Israetel) — Volume management during prep, muscle retention
  - periodization-architect (Tudor Bompa) — Periodizacao para competicao
  - biomechanics-coach (Charles Glass) — Posing, weak points, exercise selection
  - elite-coach (Matt Jansen) — Elite prep strategies, intensity management

**Entrada:**
- campo: client_profile
  tipo: object
  origem: client-intake task output
  obrigatorio: true
  validacao: Must contain full profile with advanced/elite classification

- campo: competition_info
  tipo: object
  origem: Coach/Client Input
  obrigatorio: true
  validacao: |
    Must contain: competition_date, federation (IFBB, NPC, NABBA, etc.),
    category (bodybuilding, classic_physique, mens_physique, bikini, figure, wellness),
    first_time_competitor (boolean)

- campo: current_physique
  tipo: object
  origem: Assessment
  obrigatorio: true
  validacao: |
    Must contain: current_weight, estimated_bf_percent, stage_weight_target,
    weak_points, strong_points, front/side/back_photos

- campo: training_history
  tipo: object
  origem: client-intake
  obrigatorio: true
  validacao: Must show advanced/elite level training background

- campo: diet_history
  tipo: object
  origem: client-intake ou historical data
  obrigatorio: true
  validacao: |
    Must contain: current_calories, current_macros, previous_preps (if any),
    metabolic_adaptation_history, lowest_body_fat_achieved

- campo: timeline
  tipo: object
  origem: Calculated from competition_date
  obrigatorio: true
  validacao: |
    Must have minimum 16 weeks from start to competition
    Ideal: 20-24 weeks

**Saida:**
- campo: prep_plan
  tipo: object
  destino: Data Store (clients/{id}/competition/{comp_id}/)
  persistido: true

- campo: phase_breakdown
  tipo: object
  destino: Data Store (clients/{id}/competition/{comp_id}/phases.json)
  persistido: true

- campo: peak_week_protocol
  tipo: object
  destino: Data Store (clients/{id}/competition/{comp_id}/peak-week.json)
  persistido: true

- campo: posing_guide
  tipo: object
  destino: Data Store (clients/{id}/competition/{comp_id}/posing.md)
  persistido: true

- campo: reverse_diet_plan
  tipo: object
  destino: Data Store (clients/{id}/competition/{comp_id}/reverse-diet.json)
  persistido: true

- campo: show_day_checklist
  tipo: object
  destino: Data Store (clients/{id}/competition/{comp_id}/show-day.md)
  persistido: true
```

---

## Pre-Conditions

```yaml
pre-conditions:
  - [ ] Cliente classificado como advanced ou elite
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar classification_level >= advanced
    error_message: "Pre-condition failed: Competition prep requer nivel avancado ou elite"

  - [ ] Minimo 16 semanas ate a competicao
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que (competition_date - today) >= 16 weeks
    error_message: "Pre-condition failed: Tempo insuficiente para prep segura (<16 semanas)"

  - [ ] BF% atual viabiliza chegar em stage-ready no prazo
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que perda de gordura necessaria e viavel no timeline
      (max 0.5-1% BF loss per week)
    error_message: "Pre-condition failed: BF% muito alto para timeline disponivel"

  - [ ] Sem red flags medicos para dieta restritiva prolongada
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar exames recentes, saude hormonal, saude mental
    error_message: "Pre-condition failed: Contraindicacoes medicas para prep"

  - [ ] Coach experiente em competition prep (ou assistido pelo sistema)
    tipo: pre-condition
    blocker: false
    validacao: |
      Verificar experiencia do coach em preps anteriores
    error_message: "Warning: Coach sem experiencia previa em prep — sistema fornecera suporte extra"
```

---

## Post-Conditions

```yaml
post-conditions:
  - [ ] Plano de prep completo com todas as fases documentadas
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que prep_plan contem todas as fases do timeline
    error_message: "Post-condition failed: Plano de prep incompleto"

  - [ ] Peak week protocol definido com todos os detalhes
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que peak_week_protocol esta completo com cada dia detalhado
    error_message: "Post-condition failed: Peak week nao definida"

  - [ ] Reverse diet plan pos-competicao definido
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que reverse_diet_plan existe com timeline de 8-16 semanas
    error_message: "Post-condition failed: Reverse diet nao planejado"

  - [ ] Show day checklist completo
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que show_day_checklist cobre todas as necessidades
    error_message: "Post-condition failed: Checklist do show day incompleto"
```

---

## Acceptance Criteria

```yaml
acceptance-criteria:
  - [ ] AC-1: Timeline completo com fases, checkpoints e decision points
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que phase_breakdown cobre todas as semanas com metricas esperadas
    error_message: "AC-1 nao atendido: Timeline incompleto"

  - [ ] AC-2: Treino periodizado para preservar massa durante deficit
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que training plan preserva volume adequado e reduce inteligentemente
    error_message: "AC-2 nao atendido: Treino de prep nao periodizado"

  - [ ] AC-3: Nutricao com fases claras de reducao calorica progressiva
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que nutricao tem fases com deficit progressivo e nao abrupto
    error_message: "AC-3 nao atendido: Nutricao sem fases progressivas"

  - [ ] AC-4: Peak week com protocolo diario de agua/sodio/carb
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que peak_week tem cada dia com quantidades exatas de agua, sodio e carbs
    error_message: "AC-4 nao atendido: Peak week sem protocolo detalhado"

  - [ ] AC-5: Reverse diet planejado com timeline e progressao de calorias
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que reverse diet tem semanas com incrementos caloricos definidos
    error_message: "AC-5 nao atendido: Reverse diet sem progressao"

  - [ ] AC-6: Guia de posing incluido com poses da categoria
    tipo: acceptance-criterion
    blocker: false
    validacao: |
      Assert que posing_guide contem poses obrigatorias da categoria
    error_message: "AC-6 nao atendido: Guia de posing ausente"
```

---

## Tools

- **Tool:** training-plan-generator
  - **Purpose:** Gerar planos de treino especificos para prep
  - **Source:** squads/fitcoach/tools/training-plan-generator

- **Tool:** macro-calculator
  - **Purpose:** Calcular e ajustar macros progressivamente durante prep
  - **Source:** squads/fitcoach/tools/macro-calculator

- **Tool:** quality-checker
  - **Purpose:** Validar seguranca do protocolo de prep
  - **Source:** squads/fitcoach/tools/quality-checker

- **Tool:** progress-comparator
  - **Purpose:** Comparar physique em diferentes fases da prep
  - **Source:** squads/fitcoach/tools/progress-comparator

---

## SEQUENTIAL Task Execution (Nao prosseguir ate a Task atual estar completa)

### Step 0: Assessment Inicial e Viabilidade

- Avaliar physique atual do competidor:
  - Peso atual e estimativa de BF%
  - Pontos fortes e fracos do physique
  - Simetria e proporcoes
  - Fotos completas (todas as poses obrigatorias da categoria)
- Calcular viabilidade:
  - Peso estimado no palco (peso atual * (1 - BF_atual%) / (1 - BF_palco%))
  - Gordura a perder: peso_atual - peso_palco
  - Taxa de perda necessaria: gordura_a_perder / semanas_disponiveis
  - Viabilidade: taxa <= 0.7-1% do peso corporal/semana

```yaml
step_0:
  name: "Assessment e Viabilidade"
  executor: prep-master
  advisors: [prep-master, hypertrophy-scientist]
  duration_expected: "15-20 min"
  assessment:
    physique:
      front_relaxed: "Avaliacao"
      back_relaxed: "Avaliacao"
      side_relaxed: "Avaliacao"
      front_double_biceps: "Avaliacao"
      back_double_biceps: "Avaliacao"
      side_chest: "Avaliacao"
      side_triceps: "Avaliacao"
      abdominal_and_thigh: "Avaliacao"
    weak_points: ["Lista de pontos fracos"]
    strong_points: ["Lista de pontos fortes"]
    symmetry_assessment: "balanced|left_dominant|right_dominant"
  viability:
    stage_weight_estimate: "Calculo"
    fat_to_lose: "kg"
    weekly_loss_rate: "kg/week"
    is_viable: "boolean"
  output: assessment_report
```

### Step 1: Planejamento do Timeline (16-24 semanas)

#### 1.1 Estrutura de Fases

Consultar prep-master (Hany Rambod) e periodization-architect (Bompa) para definir fases:

**Prep Timeline (Exemplo 20 semanas):**

| Fase | Semanas | Objetivo | Deficit | Cardio |
|------|---------|----------|---------|--------|
| **Pre-Prep** | 20-17 | Transicao, estabelecer baseline | -200 a -300 kcal | 2-3x LISS 20min |
| **Prep Phase 1** | 16-13 | Iniciar deficit moderado | -300 a -500 kcal | 3-4x LISS 30min |
| **Prep Phase 2** | 12-9 | Aumentar deficit, refinar physique | -500 a -700 kcal | 4-5x LISS 35-40min |
| **Prep Phase 3** | 8-5 | Deficit agressivo, detalhamento | -700 a -900 kcal | 5-6x LISS 40-45min |
| **Final Push** | 4-2 | Chegar em condicao quase-pronta | -800 a -1000 kcal | 6x LISS 45-60min |
| **Peak Week** | 1 | Manipulacao agua/sodio/carb | Variavel | Reduzir/eliminar |
| **Show Day** | 0 | Dia da competicao | N/A | N/A |

**Regras Rambod:**
- Nunca cortar mais de 200-300 kcal de uma vez
- Aumentar cardio gradualmente (max 10-15min de incremento por fase)
- Preferir LISS (Low Intensity Steady State) sobre HIIT durante prep
- Refeeds a cada 7-14 dias (mais frequente conforme prep avanca)

```yaml
step_1_1:
  name: "Estrutura de Fases (Rambod + Bompa)"
  executor: prep-master
  advisors: [prep-master, periodization-architect]
  duration_expected: "15-20 min"
  per_phase:
    - phase_name: "Nome da fase"
    - weeks: "[start, end]"
    - caloric_deficit: "kcal abaixo da manutencao"
    - cardio_protocol: "tipo, frequencia, duracao"
    - training_adjustments: "mudancas no treino"
    - refeed_frequency: "a cada X dias"
    - expected_weight_loss: "kg/semana"
    - checkpoint_metrics: "o que avaliar no fim da fase"
  output: phase_breakdown
```

### Step 2: Periodizacao de Treino para Prep

#### 2.1 Treino durante Deficit (Israetel + Rambod)

Consultar hypertrophy-scientist e prep-master para treino de prep:

**Principios de Treino em Prep (Israetel):**
- Manter intensidade (carga) o maximo possivel — e o sinal principal para retencao muscular
- Reduzir volume gradualmente (nao de uma vez):
  - Fase 1: Volume de off-season (100%)
  - Fase 2: Volume -10-15%
  - Fase 3: Volume -20-30%
  - Final: Volume -30-40% do off-season
- Priorizar exercicios compostos pesados
- Reduzir tecnicas de intensidade (drop sets, etc.) conforme deficit aumenta
- Nao adicionar treino de forca maximal novo durante prep

**Especificidades Rambod (FST-7):**
- FST-7 no ultimo exercicio de cada grupo muscular
- 7 sets com 30-45s de rest
- Pump maximo para detalhamento e separacao
- Pode ser mantido durante toda a prep com volume ajustado

```yaml
step_2_1:
  name: "Treino de Prep (Israetel + Rambod)"
  executor: training-builder
  advisors: [hypertrophy-scientist, prep-master]
  duration_expected: "15-20 min"
  volume_taper:
    phase_1: "100% off-season volume"
    phase_2: "85-90% volume"
    phase_3: "70-80% volume"
    final_push: "60-70% volume"
  intensity:
    rule: "Maintain as long as possible"
    reduction: "Only if recovery severely compromised"
  fst7:
    applicable: true
    frequency: "Last exercise per muscle group"
    sets: 7
    rest: "30-45s"
  output: prep_training_plan
```

#### 2.2 Ajustes por Ponto Fraco (Glass)

Consultar biomechanics-coach para enfatizar pontos fracos:

- Identificar 2-3 pontos fracos do competidor
- Aumentar frequencia e variacao para pontos fracos
- Manter volume de pontos fortes estavel (nao reduzir prioritariamente)
- Selecionar exercicios com maxima ativacao do alvo para pontos fracos

```yaml
step_2_2:
  name: "Ajustes por Ponto Fraco (Glass)"
  executor: training-builder
  advisor: biomechanics-coach
  duration_expected: "8-10 min"
  weak_point_strategy:
    per_weak_point:
      - muscle_group: "Nome do grupo"
      - current_volume: "sets/semana"
      - adjusted_volume: "sets/semana (aumentado)"
      - priority_exercises: ["Exercicios com melhor ativacao"]
      - frequency: "Quantas vezes/semana"
  output: weak_point_adjustments
```

### Step 3: Nutricao de Prep

#### 3.1 Protocolo Nutricional por Fase (Norton + Rambod)

Consultar nutrition-scientist e prep-master para nutricao de prep:

**Protocolo Norton para Prep:**
- Proteina: Aumentar progressivamente (2.0 → 2.7 g/kg conforme deficit aumenta)
- Gordura: Nunca abaixo de 0.5 g/kg (saude hormonal)
- Carboidratos: Primeira variavel a reduzir
- Refeeds: Baseados em carboidratos (nao gordura)
- Diet breaks: A cada 8-12 semanas se prep longa

**Protocolo Rambod para Prep:**
- Carboidrato cycling: dias alto/medio/baixo
- High carb: dia de treino de grupos fracos
- Medium carb: dias de treino normais
- Low carb: dias de descanso
- Proteina constante em todos os dias
- Gordura constante (manter hormonios)

```yaml
step_3_1:
  name: "Nutricao de Prep (Norton + Rambod)"
  executor: diet-builder
  advisors: [nutrition-scientist, prep-master]
  duration_expected: "15-20 min"
  per_phase:
    calories: "Total calorico da fase"
    protein: "g/kg e total"
    carbs:
      high_day: "g e calorias"
      medium_day: "g e calorias"
      low_day: "g e calorias"
      schedule: "Qual dia e qual tipo"
    fat: "g/kg e total"
    refeed:
      frequency: "a cada X dias"
      protocol: "Aumentar carbs para X, manter proteina, reduzir gordura"
      duration: "1 dia ou 2 dias"
  output: prep_nutrition_plan
```

### Step 4: Peak Week Protocol (Rambod)

#### 4.1 Protocolo Diario de Peak Week

Consultar prep-master (Hany Rambod) para peak week detalhada:

**AVISO: Peak week e extremamente individual. Este e um template que DEVE ser ajustado pelo coach baseado em como o competidor responde.**

**Exemplo de Peak Week (7 dias antes do show):**

| Dia | Agua | Sodio | Carbs | Treino | Notas |
|-----|------|-------|-------|--------|-------|
| **D-7 (Domingo)** | 6-8L | Normal | Low (100g) | Full body depletion | Iniciar depletion de glicogenio |
| **D-6 (Segunda)** | 6-8L | Normal | Low (100g) | Upper body depletion | Continuar depletion |
| **D-5 (Terca)** | 6-8L | Normal-Alto | Low (100g) | Lower body depletion | Ultimo treino pesado |
| **D-4 (Quarta)** | 6-8L | Reduzir 50% | HIGH (400-600g) | Leve ou off | Iniciar carb load |
| **D-3 (Quinta)** | 4-5L | Reduzir 75% | HIGH (300-500g) | Off | Continuar carb load |
| **D-2 (Sexta)** | 2-3L | Minimo | Moderate (200-300g) | Pump leve | Afinar carb load |
| **D-1 (Sabado)** | Sips only | Minimo | Moderate (150-200g) | Off | Descanso total |
| **Show Day** | Sips only | Controlar | Small meals (carb+protein) | Pump backstage | Competir |

**Manipulacao de Agua Rambod:**
- Hidratar excessivamente D-7 a D-5 (aldosterone reset)
- Cortar gradualmente D-4 a D-1
- Show day: apenas pequenos goles
- NUNCA cortar agua completamente (risco de saude)

**Manipulacao de Sodio Rambod:**
- Manter ou aumentar sodio D-7 a D-5
- Reduzir progressivamente D-4 a show
- Sodio ajuda a puxar agua para fora da subcutanea
- Reduzir gradual, nunca abrupto

**Carb Loading Rambod:**
- Depletar glicogenio D-7 a D-5
- Carregar com carbs altos D-4 e D-3
- Fontes: arroz branco, batata, pao branco (baixa fibra)
- Monitorar diariamente — ajustar baseado em visual

```yaml
step_4_1:
  name: "Peak Week Protocol (Rambod)"
  executor: prep-master
  advisor: prep-master
  duration_expected: "20-25 min"
  per_day:
    - day: "D-7"
    - date: "Data"
    - water_liters: 8
    - sodium_mg: 3000
    - carbs_grams: 100
    - protein_grams: "manter constante"
    - fat_grams: "reduzir"
    - training: "Depletion workout"
    - supplements: ["Potassium", "Magnesium", "Dandelion root (if approved)"]
    - visual_check: "Foto + avaliacao ao acordar"
    - adjustment_notes: "Se X acontecer, fazer Y"
  emergency_protocols:
    spillover: "Se estiver retendo agua: reduzir carbs, aumentar sodio levemente"
    flat: "Se estiver muito seco/flat: adicionar 50-100g carbs extras"
    cramps: "Suplementar eletrolitos imediatamente"
  output: peak_week_protocol
```

### Step 5: Show Day Protocol

#### 5.1 Checklist do Dia da Competicao

**Pre-Show (Manha):**
- [ ] Acordar cedo (3-4h antes do check-in)
- [ ] Foto de condicao ao acordar (comparar com plano)
- [ ] Primeira refeicao pequena: arroz branco + frango + mel (30-45min apos acordar)
- [ ] Aplicar tanning (se nao aplicado na noite anterior)
- [ ] Preparar bag de competicao:
  - Tanning products (touch-up)
  - Pump band / resistance band
  - Rice cakes, mel, pasta de amendoim
  - Agua (goles pequenos)
  - Toalha, oleo de posing
  - Trunks/bikini (principal + reserva)
  - Flat iron (para aquecer musculos se necessario)
  - Music/headphones para aquecimento mental

**Backstage:**
- [ ] Chegar 30-60min antes do check-in
- [ ] Refeicao pre-pump: rice cakes + mel + pouca agua
- [ ] Pump sequence:
  - Push-ups: 3x15-20
  - Resistance band curls: 3x15-20
  - Resistance band lateral raises: 3x15-20
  - Shoulder press com banda: 3x15
  - Lunge leve: 2x10
- [ ] Touch-up de tanning
- [ ] Aplicar oleo de posing
- [ ] Praticar poses obrigatorias (2-3x cada)
- [ ] Foto final pre-palco

**No Palco:**
- [ ] Manter sorriso (juizes notam)
- [ ] Poses obrigatorias com confianca
- [ ] Transicoes suaves entre poses
- [ ] Manter tensao abdominal constante
- [ ] Ouvir instrucoes dos juizes

**Pos-Show:**
- [ ] Nao fazer binge eating (tentacao sera enorme)
- [ ] Primeira refeicao pos-show: controlada mas satisfatoria
- [ ] Tirar fotos de resultado
- [ ] Iniciar plano de reverse diet no dia seguinte

```yaml
step_5_1:
  name: "Show Day Checklist"
  executor: prep-master
  advisor: prep-master
  duration_expected: "10-15 min"
  output: show_day_checklist
```

### Step 6: Posing Guide (Glass)

#### 6.1 Poses por Categoria

Consultar biomechanics-coach (Charles Glass) para guia de posing:

**Poses Obrigatorias por Categoria:**

| Categoria | Poses Obrigatorias |
|-----------|-------------------|
| **Men's Bodybuilding** | Front double biceps, Front lat spread, Side chest, Side triceps, Back double biceps, Back lat spread, Abs & thigh, Most muscular |
| **Classic Physique** | Front double biceps, Side chest, Back double biceps, Abs & thigh, Favorite classic pose |
| **Men's Physique** | Front pose, Back pose, Side poses (quarter turns) |
| **Bikini** | Front pose, Back pose (model walk, quarter turns) |
| **Figure** | Front pose, Side poses, Back pose (quarter turns) |
| **Wellness** | Similar a Figure com enfase em lower body |

**Dicas Glass para Posing:**
- Praticar 15-30min/dia nas ultimas 8 semanas
- Filmar e analisar cada pose
- Focar em esconder pontos fracos e mostrar pontos fortes
- Transicoes sao tao importantes quanto as poses
- Manter compostura e confianca
- Vacuum abdominal praticado diariamente

```yaml
step_6_1:
  name: "Posing Guide (Glass)"
  executor: prep-master
  advisor: biomechanics-coach
  duration_expected: "10-15 min"
  per_pose:
    - pose_name: "Nome da pose"
    - category: "Categoria que usa esta pose"
    - setup_steps: ["Passo 1", "Passo 2", ...]
    - common_mistakes: ["Erro 1", "Erro 2"]
    - tips: ["Dica para esconder ponto fraco", "Dica para enfatizar ponto forte"]
    - practice_frequency: "daily last 8 weeks"
  output: posing_guide
```

### Step 7: Reverse Diet Pos-Competicao (Norton)

#### 7.1 Protocolo de Reverse Diet

Consultar nutrition-scientist (Layne Norton) para reverse diet:

**Principios Norton de Reverse Diet:**
- NUNCA fazer binge pos-competicao (risco de rebound severo)
- Aumentar calorias gradualmente: 50-150 kcal/semana
- Priorizar aumento de carboidratos (nao gordura)
- Manter proteina elevada (2.0-2.4 g/kg)
- Aceitar ganho de peso inicial (repleção de glicogenio + agua)
- Timeline: 8-16 semanas para chegar em calorias de manutencao

**Fases do Reverse Diet:**

| Fase | Semanas | Aumento Calorico | Notas |
|------|---------|------------------|-------|
| **Recovery** | 1-2 | +200-300 kcal | Recuperacao mental e fisica |
| **Early Reverse** | 3-6 | +100-150 kcal/semana | Monitorar peso e feedback |
| **Mid Reverse** | 7-10 | +75-100 kcal/semana | Ajustar baseado em resposta |
| **Late Reverse** | 11-16 | +50-75 kcal/semana | Aproximando manutencao |

**Monitoramento durante Reverse:**
- Pesagem diaria (media movel semanal)
- Fotos quinzenais (aceitar que condicao vai mudar)
- Feedback subjetivo (humor, energia, libido, sono)
- Marcadores hormonais se possivel (T3, testosterona, cortisol)
- Sinais de metabolic adaptation resolvendo

```yaml
step_7_1:
  name: "Reverse Diet (Norton)"
  executor: diet-builder
  advisor: nutrition-scientist
  duration_expected: "10-15 min"
  per_week:
    - week: 1
    - calories: "Show day + 200-300"
    - protein: "2.0-2.4 g/kg"
    - carbs: "Maioria do aumento"
    - fat: "Pequeno aumento"
    - cardio: "Reduzir 50% imediatamente"
    - training: "Retomar off-season volume gradualmente"
    - monitoring:
        - "Peso diario (media movel)"
        - "Fotos quinzenais"
        - "Feedback subjetivo"
  mental_health:
    - "Suporte psicologico pos-competicao e ESSENCIAL"
    - "Body dysmorphia pode intensificar pos-show"
    - "Normalizar ganho de peso gradual"
    - "Celebrar a jornada, nao apenas o resultado"
  output: reverse_diet_plan
```

---

## Error Handling

**Strategy:** halt_and_consult_coach

**Common Errors:**

1. **Error:** Perda de Peso Muito Rapida
   - **Cause:** Deficit muito agressivo ou metabolismo acelerado inesperado
   - **Resolution:** Aumentar calorias, adicionar refeed
   - **Recovery:** Consultar Israetel para preservacao muscular

2. **Error:** Perda de Peso Estagnada durante Prep
   - **Cause:** Adaptacao metabolica, retenção de agua, tracking impreciso
   - **Resolution:** Implementar diet break ou ajustar deficit/cardio
   - **Recovery:** Consultar Norton para estrategia anti-plateau

3. **Error:** Saude Comprometida durante Prep
   - **Cause:** Deficit prolongado afetando hormonios, sono, humor
   - **Resolution:** Avaliar gravidade, considerar pausar ou cancelar prep
   - **Recovery:** Saude SEMPRE acima de competicao — escalar para coach e medico

4. **Error:** Spillover durante Peak Week
   - **Cause:** Carb load excessivo, timing incorreto
   - **Resolution:** Reduzir carbs proxima refeicao, ajustar agua/sodio
   - **Recovery:** Protocolo de emergencia de Rambod

5. **Error:** Flat durante Peak Week
   - **Cause:** Depletion excessiva, carb load insuficiente
   - **Resolution:** Adicionar carbs rapidamente (rice cakes + mel)
   - **Recovery:** Small frequent carb meals ate encher

---

## Performance

```yaml
duration_expected: "90-120 min (planejamento completo)"
cost_estimated: "$0.05-0.15"
token_usage: "~20,000-40,000 tokens"
advisor_consultations: 6 (todos os Tier 1 bodybuilding)
prep_duration: "16-24 weeks"
weekly_monitoring: "via weekly-checkin task"
```

---

## Metadata

```yaml
task_id: FC-TASK-008
name: competition-prep
version: 1.0.0
squad: fitcoach
dependencies:
  - client-intake (FC-TASK-001)
  - create-training-plan (FC-TASK-002)
  - create-diet-plan (FC-TASK-003)
  - weekly-checkin (FC-TASK-004, para monitoramento)
  - adjust-protocol (FC-TASK-005, para ajustes durante prep)
  - prep-master (advisor — Rambod)
  - nutrition-scientist (advisor — Norton)
  - hypertrophy-scientist (advisor — Israetel)
  - periodization-architect (advisor — Bompa)
  - biomechanics-coach (advisor — Glass)
  - elite-coach (advisor — Jansen)
tags:
  - competition
  - bodybuilding
  - prep
  - peak-week
  - reverse-diet
  - posing
updated_at: 2026-03-11
```

---

## Handoff

```yaml
next_task:
  monitoring:
    task: "weekly-checkin"
    frequency: "weekly (pode ser 2x/semana nas ultimas 4 semanas)"
    condition: "Prep em andamento"
  adjust:
    task: "adjust-protocol"
    condition: "Check-in indica necessidade de ajuste"
  reverse:
    task: "create-diet-plan"
    mode: "reverse_diet"
    condition: "Pos-competicao, iniciar reverse"
  next_show:
    task: "competition-prep"
    condition: "Competidor quer fazer outra competicao"
```
