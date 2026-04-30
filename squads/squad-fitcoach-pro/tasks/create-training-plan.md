<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: create-training-plan
  task_name: Create Training Plan
  status: active
  responsible_executor: 'training-builder'
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
- Gera protocolo completo sem intervencao
- Usa defaults baseados no perfil do cliente
- **Melhor para:** Clientes intermediarios com objetivo padrao (hipertrofia/cutting)

### 2. Interactive Mode - Balanceado, Educativo (5-10 prompts) **[DEFAULT]**
- Checkpoints em cada fase de construcao
- Explica decisoes de periodizacao e selecao de exercicios
- **Melhor para:** Clientes complexos, coach quer entender as decisoes

### 3. Pre-Flight Planning - Planejamento Completo Antecipado
- Analisa todas as variaveis antes de gerar
- Zero ambiguidade na prescricao
- **Melhor para:** Atletas avancados, competition prep, clientes com restricoes

**Parameter:** `mode` (optional, default: `interactive`)

---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: createTrainingPlan()
id: FC-TASK-002
responsavel: training-builder
responsavel_type: Agent
squad: fitcoach
pattern_prefix: FC
atomic_layer: Organism

advisors:
  - hypertrophy-scientist (Mike Israetel) — Volume landmarks, MEV/MRV/MAV
  - periodization-architect (Tudor Bompa) — Periodizacao classica e ondulatoria
  - biomechanics-coach (Charles Glass) — Selecao de exercicios e biomecanica
  - elite-coach (Matt Jansen) — Intensity techniques, offseason strategy

**Entrada:**
- campo: client_profile
  tipo: object
  origem: client-intake task output
  obrigatorio: true
  validacao: Must contain classification, anthropometric data, training history

- campo: classification_report
  tipo: object
  origem: client-intake task output
  obrigatorio: true
  validacao: Must contain level (beginner|intermediate|advanced|elite)

- campo: goal_definition
  tipo: object
  origem: client-intake task output
  obrigatorio: true
  validacao: Must contain primary_goal with SMART format

- campo: risk_assessment
  tipo: object
  origem: client-intake task output
  obrigatorio: true
  validacao: Must contain flags (red, yellow, green)

- campo: availability
  tipo: object
  origem: client-intake task output
  obrigatorio: true
  validacao: Must contain days_per_week, minutes_per_session, gym_equipment

- campo: coach_preferences
  tipo: object
  origem: Coach profile
  obrigatorio: false
  validacao: Optional overrides for exercise selection, periodization style

**Saida:**
- campo: training_plan
  tipo: object
  destino: Data Store (clients/{id}/plans/training/)
  persistido: true

- campo: mesocycle_structure
  tipo: object
  destino: Data Store (clients/{id}/plans/training/mesocycle.json)
  persistido: true

- campo: weekly_split
  tipo: object
  destino: Data Store (clients/{id}/plans/training/weekly-split.json)
  persistido: true

- campo: exercise_database
  tipo: array[object]
  destino: Data Store (clients/{id}/plans/training/exercises.json)
  persistido: true

- campo: progression_model
  tipo: object
  destino: Data Store (clients/{id}/plans/training/progression.json)
  persistido: true

- campo: training_plan_pdf
  tipo: file
  destino: Data Store (clients/{id}/plans/training/plan.pdf)
  persistido: true
```

---

## Pre-Conditions

**Purpose:** Validar pre-requisitos ANTES da execucao da task (blocking)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Client intake completo e aprovado pelo coach
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que client-intake task foi concluida com status approved
    error_message: "Pre-condition failed: Intake do cliente nao concluido ou nao aprovado"

  - [ ] Classificacao do cliente definida
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que classification_report existe com level e score
    error_message: "Pre-condition failed: Classificacao do cliente ausente"

  - [ ] Sem red flags de saude bloqueantes
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que risk_assessment nao contem red flags sem liberacao medica
    error_message: "Pre-condition failed: Red flags de saude nao resolvidos"

  - [ ] Disponibilidade e equipamentos definidos
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que availability contem days_per_week e gym_equipment
    error_message: "Pre-condition failed: Disponibilidade do cliente nao definida"
```

---

## Post-Conditions

**Purpose:** Validar sucesso da execucao APOS task completar

**Checklist:**

```yaml
post-conditions:
  - [ ] Plano de treino completo com todos os dias da semana preenchidos
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que weekly_split contem todos os dias de treino definidos
    error_message: "Post-condition failed: Plano de treino incompleto"

  - [ ] Volume dentro dos landmarks para o nivel do cliente
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que sets por grupo muscular estao entre MEV e MRV
    error_message: "Post-condition failed: Volume fora dos landmarks"

  - [ ] Progressao de carga definida para cada exercicio
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que progression_model existe para cada exercicio
    error_message: "Post-condition failed: Modelo de progressao ausente"

  - [ ] Exercicios adequados ao nivel e restricoes do cliente
    tipo: post-condition
    blocker: false
    validacao: |
      Verificar que nenhum exercicio viola restricoes do risk_assessment
    error_message: "Warning: Exercicio potencialmente inadequado detectado"
```

---

## Acceptance Criteria

```yaml
acceptance-criteria:
  - [ ] AC-1: Mesociclo completo estruturado com duracao, fases e deload
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que mesocycle_structure contem: duration_weeks, phases, deload_protocol
    error_message: "AC-1 nao atendido: Mesociclo incompleto"

  - [ ] AC-2: Weekly split otimizado para frequencia e recuperacao
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que weekly_split respeita: frequencia por grupo muscular,
      48-72h entre grupos similares, volume adequado ao split
    error_message: "AC-2 nao atendido: Weekly split nao otimizado"

  - [ ] AC-3: Cada exercicio tem sets, reps, RIR, tempo e video de referencia
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que cada exercicio contem: sets, reps, rir, tempo, rest_seconds, video_url
    error_message: "AC-3 nao atendido: Exercicios com dados incompletos"

  - [ ] AC-4: Volume total por grupo muscular validado contra landmarks Israetel
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que total sets por grupo esta dentro de MEV-MRV para o nivel do cliente
    error_message: "AC-4 nao atendido: Volume fora dos landmarks Israetel"

  - [ ] AC-5: Plano exportavel em formato PDF e planilha
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que training_plan_pdf foi gerado e esta legivel
    error_message: "AC-5 nao atendido: Export do plano falhou"
```

---

## Tools

**Recursos externos/compartilhados usados por esta task:**

- **Tool:** training-plan-generator
  - **Purpose:** Gerar planilhas de treino completas com periodizacao
  - **Source:** squads/fitcoach/tools/training-plan-generator

- **Tool:** quality-checker
  - **Purpose:** Validar protocolo contra evidencia cientifica e landmarks
  - **Source:** squads/fitcoach/tools/quality-checker

---

## SEQUENTIAL Task Execution (Nao prosseguir ate a Task atual estar completa)

### Step 0: Receber Classificacao e Contexto

- Carregar dados do client-intake: classification_report, goal_definition, risk_assessment, availability
- Identificar restricoes e yellow flags que afetam a prescricao
- Carregar preferencias do coach (se existirem)
- Definir parametros iniciais da prescricao

```yaml
step_0:
  name: "Receber Classificacao e Contexto"
  executor: training-builder
  duration_expected: "2-3 min"
  inputs:
    - client_profile
    - classification_report
    - goal_definition
    - risk_assessment
    - availability
    - coach_preferences
  outputs:
    - prescription_parameters
  validation:
    - "Todos os inputs carregados com sucesso"
    - "Restricoes identificadas e documentadas"
```

### Step 1: Consultar Advisors — Definicao de Volume (Israetel)

#### 1.1 Volume Landmarks por Grupo Muscular

Consultar hypertrophy-scientist (Mike Israetel) para definir volume por grupo muscular baseado no nivel do cliente:

**Volume Landmarks (sets por semana por grupo muscular):**

| Grupo Muscular | MEV (Beginner) | MEV (Intermediate) | MAV | MRV (Intermediate) | MRV (Advanced) |
|----------------|-----------------|---------------------|-----|---------------------|----------------|
| Peito | 6 | 8 | 12-20 | 18 | 22 |
| Costas (Largura) | 6 | 8 | 12-20 | 18 | 22 |
| Costas (Espessura) | 4 | 6 | 10-16 | 14 | 18 |
| Deltoides Laterais | 6 | 8 | 16-22 | 20 | 26 |
| Deltoides Anteriores | 0 | 0 | 6-8 | 8 | 12 |
| Deltoides Posteriores | 4 | 6 | 12-16 | 16 | 20 |
| Biceps | 4 | 6 | 10-16 | 14 | 20 |
| Triceps | 4 | 6 | 8-14 | 12 | 18 |
| Quadriceps | 6 | 8 | 12-18 | 16 | 20 |
| Posteriores | 4 | 6 | 10-16 | 14 | 20 |
| Gluteos | 0 | 4 | 8-12 | 12 | 16 |
| Panturrilhas | 6 | 8 | 12-16 | 14 | 20 |
| Abdominais | 0 | 0 | 8-16 | 14 | 20 |
| Trapezio | 0 | 4 | 8-12 | 12 | 16 |

**Regras de Volume por Nivel:**
- **Beginner:** Iniciar proximo ao MEV, progredir ~2 sets/semana por mesociclo
- **Intermediate:** Iniciar entre MEV e MAV, progredir ~1-2 sets/semana
- **Advanced:** Iniciar no MAV, micro-progressao ate MRV
- **Elite:** Periodizacao avancada com blocos de overreaching planejado

```yaml
step_1_1:
  name: "Volume Landmarks (Israetel)"
  executor: training-builder
  advisor: hypertrophy-scientist
  duration_expected: "5-10 min"
  output: volume_prescription
  validation:
    - "Cada grupo muscular tem volume definido entre MEV e MRV"
    - "Volume total semanal nao excede capacidade de recuperacao"
```

#### 1.2 Distribuicao de Volume por Sessao

- Calcular sets por sessao baseado em frequencia semanal
- Garantir que nenhuma sessao excede volume maximo por grupo
- Distribuir intensidade ao longo da semana (nao concentrar alto volume)

**Regras de Israetel para distribuicao:**
- Maximo ~10 sets por grupo muscular por sessao
- Frequencia 2-3x/semana por grupo e ideal para intermediarios
- Frequencia 1-2x/semana para grupos menores (biceps, triceps, panturrilha)

```yaml
step_1_2:
  name: "Distribuicao de Volume por Sessao"
  executor: training-builder
  advisor: hypertrophy-scientist
  duration_expected: "5-8 min"
  constraints:
    max_sets_per_muscle_per_session: 10
    min_frequency_per_muscle_per_week: 1
    max_frequency_per_muscle_per_week: 4
  output: volume_distribution
```

### Step 2: Consultar Advisors — Periodizacao (Bompa)

#### 2.1 Estrutura do Macrociclo

Consultar periodization-architect (Tudor Bompa) para definir estrutura de periodizacao:

**Modelos de Periodizacao por Objetivo:**

| Objetivo | Modelo | Duracao Tipica | Fases |
|----------|--------|----------------|-------|
| Hipertrofia (Beginner) | Linear | 12-16 semanas | Adaptacao → Volume → Intensidade |
| Hipertrofia (Intermediate) | Ondulatoria | 12-16 semanas | Acumulacao → Transmutacao → Realizacao |
| Hipertrofia (Advanced) | Block | 12-20 semanas | Volume → Strength → Peak |
| Cutting | DUP (Daily Undulating) | 8-16 semanas | Preservacao de forca com deficit |
| Recomp | Linear/DUP | 12-16 semanas | Volume moderado com progressao |
| Competition Prep | Conjugado | 16-24 semanas | Offseason → Prep → Peak Week |

```yaml
step_2_1:
  name: "Estrutura do Macrociclo (Bompa)"
  executor: training-builder
  advisor: periodization-architect
  duration_expected: "8-12 min"
  output: macrocycle_structure
  components:
    - total_duration_weeks
    - periodization_model
    - phases_with_durations
    - deload_schedule
    - progression_scheme
```

#### 2.2 Mesociclo Detalhado

- Definir cada mesociclo (tipicamente 3-6 semanas)
- Estruturar progressao de carga dentro do mesociclo
- Definir semana de deload (protocolo e timing)
- Estabelecer auto-regulacao via RIR (Reps In Reserve)

**Estrutura de Mesociclo (Exemplo 4 semanas):**
- Semana 1: Introducao — RIR 4-3, volume MEV+2
- Semana 2: Progressao — RIR 3-2, volume MEV+4
- Semana 3: Overreach — RIR 2-1, volume proximo MRV
- Semana 4: Deload — RIR 5+, volume 50% do pico

```yaml
step_2_2:
  name: "Mesociclo Detalhado (Bompa)"
  executor: training-builder
  advisor: periodization-architect
  duration_expected: "10-15 min"
  output: mesocycle_detail
  deload_protocol:
    frequency: "every_3-5_weeks"
    volume_reduction: "40-60%"
    intensity_reduction: "0-10%"
    duration: "1 week"
```

### Step 3: Consultar Advisors — Selecao de Exercicios (Glass)

#### 3.1 Exercicios por Grupo Muscular

Consultar biomechanics-coach (Charles Glass) para selecao de exercicios baseada em biomecanica:

**Criterios de Selecao Glass:**
- Curva de resistencia compativel com objetivo (stretch-mediated vs peak contraction)
- Angulacao que maximiza ativacao do alvo
- Adequacao ao nivel do cliente (complexidade tecnica)
- Seguranca articular (especialmente para yellow flags)

**Hierarquia de Exercicios por Tipo:**
1. **Compostos Primarios:** Squat, Deadlift, Bench Press, Row, OHP
2. **Compostos Secundarios:** Leg Press, Pull-up, Dip, Lunge
3. **Isolamento Multi-Articular:** Cable Crossover, Lat Pulldown variacao, Hack Squat
4. **Isolamento Puro:** Curl, Lateral Raise, Leg Extension, Leg Curl

**Regras por Nivel:**
- **Beginner:** 70% compostos, 30% isolamento. Foco em aprender padroes de movimento
- **Intermediate:** 60% compostos, 40% isolamento. Introducao de variacoes
- **Advanced:** 50% compostos, 50% isolamento. Exercicios especificos para pontos fracos
- **Elite:** Selecao totalmente personalizada baseada em pontos fracos e objetivo

```yaml
step_3_1:
  name: "Selecao de Exercicios (Glass)"
  executor: training-builder
  advisor: biomechanics-coach
  duration_expected: "10-15 min"
  per_exercise:
    - name: "Nome do exercicio"
    - primary_muscle: "Musculo alvo principal"
    - secondary_muscles: ["Musculos secundarios"]
    - equipment: "Equipamento necessario"
    - difficulty: "beginner|intermediate|advanced"
    - contraindications: ["Restricoes"]
    - video_reference: "URL do video de referencia"
    - cues: ["Dicas de execucao"]
    - tempo: "excentric-pause-concentric-pause (ex: 3-1-1-0)"
    - rest_seconds: 60-300
  output: exercise_selection
```

#### 3.2 Substituicoes e Alternativas

- Para cada exercicio primario, definir 2-3 alternativas
- Alternativas para equipamentos diferentes (home gym vs commercial)
- Alternativas para restricoes (ex: sem agachamento livre → leg press)
- Escala de progressao de exercicios (do mais simples ao mais complexo)

```yaml
step_3_2:
  name: "Substituicoes e Alternativas"
  executor: training-builder
  advisor: biomechanics-coach
  duration_expected: "8-10 min"
  per_exercise:
    substitutions:
      - same_equipment: ["alternativa 1", "alternativa 2"]
      - home_gym: ["alternativa home 1"]
      - restriction_based: {"restriction_type": "alternativa segura"}
  output: exercise_substitutions
```

### Step 4: Consultar Advisors — Intensity Techniques (Jansen)

#### 4.1 Tecnicas de Intensidade por Nivel

Consultar elite-coach (Matt Jansen) para selecao de tecnicas de intensidade:

**Tecnicas por Nivel de Cliente:**

| Tecnica | Beginner | Intermediate | Advanced | Elite |
|---------|----------|--------------|----------|-------|
| Straight Sets | SIM | SIM | SIM | SIM |
| Drop Sets | NAO | LIMITADO (1/treino) | SIM (2-3/treino) | SIM |
| Rest-Pause | NAO | LIMITADO | SIM | SIM |
| Myo-Reps | NAO | SIM | SIM | SIM |
| Giant Sets | NAO | NAO | LIMITADO | SIM |
| FST-7 | NAO | NAO | SIM | SIM |
| Forced Reps | NAO | NAO | LIMITADO | SIM |
| Negative Emphasis | NAO | NAO | LIMITADO | SIM |
| Cluster Sets | NAO | LIMITADO | SIM | SIM |
| Blood Flow Restriction | NAO | SIM (rehab) | SIM | SIM |

**Regras de Aplicacao Jansen:**
- Tecnicas de intensidade apenas nos ultimos 1-2 sets de um exercicio
- Nao usar mais de 2-3 tecnicas por sessao
- Reservar para exercicios de isolamento preferencialmente
- Progredir em tecnica antes de adicionar carga

```yaml
step_4_1:
  name: "Intensity Techniques (Jansen)"
  executor: training-builder
  advisor: elite-coach
  duration_expected: "5-8 min"
  output: intensity_techniques
  validation:
    - "Tecnicas adequadas ao nivel do cliente"
    - "Quantidade de tecnicas por sessao dentro do limite"
```

### Step 5: Build do Mesociclo Completo

#### 5.1 Montagem do Weekly Split

Compilar todas as decisoes dos advisors em um weekly split funcional:

**Splits por Frequencia:**

| Dias/Semana | Split Recomendado | Notas |
|-------------|-------------------|-------|
| 2 | Full Body A/B | Cada sessao treina todos os grupos |
| 3 | Full Body A/B/C ou Push/Pull/Legs | Alta frequencia por grupo |
| 4 | Upper/Lower A/B | 2x frequencia por grupo |
| 5 | PPL + Upper/Lower | Mix de frequencias |
| 6 | PPL x2 | Otimo para intermediarios+ |
| 7 | Bro Split ou PPL+especializado | Apenas avancados/elite |

```yaml
step_5_1:
  name: "Montagem do Weekly Split"
  executor: training-builder
  duration_expected: "15-20 min"
  structure_per_day:
    - day_name: "Monday - Push A"
    - warmup:
        - "5 min cardio leve"
        - "Rotacao de ombros, ativacao escapular"
    - exercises:
        - order: 1
          name: "Bench Press"
          sets: 4
          reps: "8-10"
          rir: 2
          tempo: "3-0-1-0"
          rest: 120
          notes: "Foco em retracao escapular"
    - cooldown:
        - "Alongamento peito/deltoides 2x30s"
  output: weekly_split
```

#### 5.2 Modelo de Progressao

- Definir progressao de carga para cada exercicio:
  - **Double Progression:** Atingir topo do range de reps → aumentar carga
  - **Linear Progression:** Adicionar peso a cada sessao (beginners)
  - **Periodized:** Variar volume/intensidade por semana (intermediate+)
  - **Auto-Regulated:** Baseado em RIR/RPE (advanced+)

- Definir incrementos de carga por tipo de exercicio:
  - Compostos pesados: 2.5-5kg por incremento
  - Compostos leves: 1-2.5kg por incremento
  - Isolamento: 1-2kg ou 1 rep adicional

```yaml
step_5_2:
  name: "Modelo de Progressao"
  executor: training-builder
  duration_expected: "8-10 min"
  progression_models:
    beginner:
      method: "linear"
      increment_compound: "2.5-5kg/session"
      increment_isolation: "1-2kg/session"
      deload_trigger: "2 sessions sem progressao"
    intermediate:
      method: "double_progression"
      rep_range: "8-12"
      increment_on_top: "2.5kg"
      deload_trigger: "fim do mesociclo"
    advanced:
      method: "auto_regulated_rir"
      target_rir: "2-3 (base) → 0-1 (peak)"
      increment: "based_on_rir_achieved"
      deload_trigger: "performance_drop ou planned"
  output: progression_model
```

### Step 6: Validacao e Quality Check

#### 6.1 Validacao com Quality Checker

- Executar quality-checker tool no plano completo
- Verificar:
  - Volume total semanal por grupo muscular vs landmarks
  - Equilibrio agonista/antagonista
  - Frequencia adequada por grupo
  - Recuperacao entre sessoes para mesmos grupos
  - Ausencia de exercicios contraindicados
  - Progressao logica e sustentavel

```yaml
step_6_1:
  name: "Validacao com Quality Checker"
  executor: training-builder
  tool: quality-checker
  duration_expected: "5-8 min"
  checks:
    volume_landmarks:
      rule: "MEV <= total_sets <= MRV per muscle group"
      severity: CRITICAL
    balance:
      rule: "push_volume ~= pull_volume (within 20%)"
      severity: HIGH
    recovery:
      rule: "min 48h between same muscle group sessions"
      severity: HIGH
    contraindications:
      rule: "no exercises matching client restrictions"
      severity: CRITICAL
    progression:
      rule: "progressive overload built into every mesocycle"
      severity: HIGH
  output: quality_report
```

#### 6.2 Revisao do Coach

- Apresentar plano completo ao coach para revisao
- Destacar decisoes-chave e justificativas dos advisors
- Permitir ajustes manuais (exercicios, volume, split)
- Registrar modificacoes do coach como overrides

```yaml
step_6_2:
  name: "Revisao do Coach"
  executor: human (coach)
  duration_expected: "10-20 min"
  approval_options:
    - approve: "Plano aprovado, prosseguir para entrega"
    - adjust: "Ajustar exercicios/volume/split especificos"
    - rebuild: "Reconstruir com parametros diferentes"
  output: coach_review
```

### Step 7: Geracao do Output Final

#### 7.1 Formatacao e Export

- Gerar planilha de treino em formato profissional
- Incluir para cada exercicio: video de referencia, dicas de execucao, substituicoes
- Gerar PDF para envio ao cliente
- Gerar versao para app (se integrado)
- Incluir guia de aquecimento e cooldown
- Incluir glossario de termos (RIR, RPE, tempo, etc.)

```yaml
step_7_1:
  name: "Formatacao e Export"
  executor: training-builder
  tool: training-plan-generator
  duration_expected: "5-10 min"
  formats:
    - pdf: "Planilha profissional para cliente"
    - json: "Dados estruturados para sistema"
    - markdown: "Versao legivel para coach"
  output: training_plan_final
```

---

## Error Handling

**Strategy:** retry + consult_advisor

**Common Errors:**

1. **Error:** Volume Excede MRV
   - **Cause:** Muitos exercicios ou sets para o nivel do cliente
   - **Resolution:** Reduzir volume do grupo excedente, priorizando compostos
   - **Recovery:** Re-executar Step 1 com parametros ajustados

2. **Error:** Equipamento Indisponivel
   - **Cause:** Exercicio selecionado requer equipamento que o cliente nao tem
   - **Resolution:** Substituir automaticamente pela alternativa disponivel
   - **Recovery:** Carregar exercise_substitutions e aplicar

3. **Error:** Conflito de Restricao
   - **Cause:** Exercicio viola restricao medica/lesao do cliente
   - **Resolution:** Substituir por alternativa segura, consultar Glass
   - **Recovery:** Aplicar substituicao restriction_based

4. **Error:** Split Incompativel com Disponibilidade
   - **Cause:** Split selecionado requer mais dias do que o cliente dispoe
   - **Resolution:** Recalcular split para a frequencia disponivel
   - **Recovery:** Re-executar Step 5.1 com frequencia correta

5. **Error:** Desequilibrio Muscular Detectado
   - **Cause:** Ratio push/pull ou anterior/posterior fora do range aceitavel
   - **Resolution:** Adicionar volume compensatorio ao grupo deficiente
   - **Recovery:** Ajustar volume e re-validar com quality-checker

---

## Performance

**Expected Metrics:**

```yaml
duration_expected: "30-45 min (geracao completa)"
cost_estimated: "$0.02-0.08"
token_usage: "~10,000-25,000 tokens"
advisor_consultations: 4 (Israetel, Bompa, Glass, Jansen)
```

**Optimization Notes:**
- Cache de volume landmarks por nivel de cliente
- Templates pre-construidos por split type para acelerar geracao
- Banco de exercicios indexado por equipamento e restricao
- Progressao de carga calculada em batch para todo o mesociclo

---

## Validation Criteria

```yaml
validation:
  scientific_basis:
    - "Volume landmarks baseados em Israetel et al."
    - "Periodizacao baseada em Bompa & Haff"
    - "Selecao de exercicios baseada em principios biomecanicos Glass"
    - "Tecnicas de intensidade adequadas ao nivel (Jansen)"

  functional:
    - "Plano executavel na disponibilidade do cliente"
    - "Exercicios compativeis com equipamentos disponíveis"
    - "Sem exercicios contraindicados por restricoes"
    - "Progressao clara e sustentavel"

  quality:
    - "PDF profissional e legivel"
    - "Videos de referencia para todos os exercicios"
    - "Dicas de execucao claras e praticas"
    - "Glossario de termos incluido"
```

---

## Metadata

```yaml
task_id: FC-TASK-002
name: create-training-plan
version: 1.0.0
squad: fitcoach
dependencies:
  - client-intake (FC-TASK-001)
  - hypertrophy-scientist (advisor)
  - periodization-architect (advisor)
  - biomechanics-coach (advisor)
  - elite-coach (advisor)
  - training-plan-generator (tool)
  - quality-checker (tool)
tags:
  - training
  - periodization
  - hypertrophy
  - programming
  - prescription
updated_at: 2026-03-11
```

---

## Handoff

```yaml
next_task:
  parallel:
    task: "create-diet-plan"
    condition: "Normalmente executada em paralelo com training plan"
  sequential:
    task: "weekly-checkin"
    condition: "Apos entrega do plano ao cliente"
  workflow:
    trigger: "full-client-journey Phase 3 (DELIVERY)"
    condition: "Plano aprovado pelo coach"
```
