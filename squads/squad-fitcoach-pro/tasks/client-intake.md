<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: client-intake
  task_name: Client Intake
  status: active
  responsible_executor: 'intake-analyst + human approval'
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
- Decisao autonoma com logging
- Interacao minima do usuario
- **Melhor para:** Intake de clientes com perfil padrao

### 2. Interactive Mode - Balanceado, Educativo (5-10 prompts) **[DEFAULT]**
- Checkpoints explicitos de decisao
- Explicacoes educativas ao coach
- **Melhor para:** Primeiro intake, clientes complexos

### 3. Pre-Flight Planning - Planejamento Completo Antecipado
- Fase de analise de task (identifica ambiguidades)
- Execucao com zero ambiguidade
- **Melhor para:** Clientes com historico medico complexo, atletas de competicao

**Parameter:** `mode` (optional, default: `interactive`)

---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: clientIntake()
id: FC-TASK-001
responsavel: intake-analyst + human approval
responsavel_type: Hybrid
squad: fitcoach
pattern_prefix: FC
atomic_layer: Organism

**Entrada:**
- campo: client_name
  tipo: string
  origem: User Input (formulario de anamnese)
  obrigatorio: true
  validacao: Must be non-empty

- campo: client_age
  tipo: number
  origem: User Input
  obrigatorio: true
  validacao: Must be between 14 and 80

- campo: client_gender
  tipo: enum [male, female, other]
  origem: User Input
  obrigatorio: true
  validacao: Must be valid enum value

- campo: anthropometric_data
  tipo: object
  origem: User Input
  obrigatorio: true
  validacao: |
    Must include: weight (kg), height (cm), body_fat_percentage (optional),
    waist_circumference (cm), hip_circumference (cm)

- campo: training_history
  tipo: object
  origem: User Input
  obrigatorio: true
  validacao: |
    Must include: years_training (number), frequency_per_week (number),
    current_split (string), experience_level (beginner|intermediate|advanced|elite)

- campo: injury_history
  tipo: array[object]
  origem: User Input
  obrigatorio: false
  validacao: Each entry must have body_part, type, status (active|recovered), year

- campo: dietary_restrictions
  tipo: array[string]
  origem: User Input
  obrigatorio: false
  validacao: Valid restriction types (lactose, gluten, vegan, etc.)

- campo: medical_conditions
  tipo: array[string]
  origem: User Input
  obrigatorio: false
  validacao: Free text, flagged for review if critical conditions detected

- campo: goal
  tipo: enum [hypertrophy, cutting, recomp, competition_prep, health, performance]
  origem: User Input
  obrigatorio: true
  validacao: Must be valid enum value

- campo: availability
  tipo: object
  origem: User Input
  obrigatorio: true
  validacao: |
    Must include: days_per_week (number 1-7), minutes_per_session (number),
    preferred_time (morning|afternoon|evening), gym_equipment (home|commercial|both)

- campo: supplements_current
  tipo: array[string]
  origem: User Input
  obrigatorio: false
  validacao: Free text

- campo: photos
  tipo: array[image]
  origem: User Input
  obrigatorio: false
  validacao: Front, side, back poses recommended

**Saida:**
- campo: client_profile
  tipo: object
  destino: Data Store (clients/)
  persistido: true

- campo: classification_report
  tipo: object
  destino: Data Store (clients/{id}/classification.json)
  persistido: true

- campo: goal_definition
  tipo: object
  destino: Data Store (clients/{id}/goals.json)
  persistido: true

- campo: routing_decision
  tipo: object
  destino: Memory (para proxima task)
  persistido: false

- campo: intake_summary
  tipo: markdown
  destino: Data Store (clients/{id}/intake-summary.md)
  persistido: true
```

---

## Pre-Conditions

**Purpose:** Validar pre-requisitos ANTES da execucao da task (blocking)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Coach autenticado e com perfil configurado no sistema
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que o coach possui perfil ativo com plano valido
    error_message: "Pre-condition failed: Coach sem perfil ativo no sistema"

  - [ ] Formulario de anamnese disponivel e funcional
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que o template de anamnese esta carregado e acessivel
    error_message: "Pre-condition failed: Formulario de anamnese nao encontrado"

  - [ ] Canal de comunicacao configurado (WhatsApp/email)
    tipo: pre-condition
    blocker: false
    validacao: |
      Verificar que pelo menos um canal de comunicacao esta configurado
    error_message: "Warning: Nenhum canal de comunicacao configurado, intake sera manual"

  - [ ] Termo de responsabilidade e politica de privacidade disponiveis
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que os documentos legais estao configurados
    error_message: "Pre-condition failed: Documentos legais nao configurados"
```

---

## Post-Conditions

**Purpose:** Validar sucesso da execucao APOS task completar

**Checklist:**

```yaml
post-conditions:
  - [ ] Perfil do cliente criado e salvo com todos os campos obrigatorios
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que client_profile existe e todos os campos obrigatorios estao preenchidos
    error_message: "Post-condition failed: Perfil do cliente incompleto"

  - [ ] Classificacao do cliente definida (iniciante/intermediario/avancado/elite)
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que classification_report existe com level definido
    error_message: "Post-condition failed: Classificacao do cliente nao definida"

  - [ ] Objetivos SMART definidos com metricas e timeline
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que goal_definition possui metricas mensuraveis e prazo
    error_message: "Post-condition failed: Objetivos nao seguem formato SMART"

  - [ ] Routing decision definido para proxima task
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que routing_decision indica qual protocolo seguir
    error_message: "Post-condition failed: Decisao de routing nao definida"

  - [ ] Flags de saude/risco processados e documentados
    tipo: post-condition
    blocker: false
    validacao: |
      Verificar que alertas medicos foram identificados e registrados
    error_message: "Warning: Flags de saude nao processados"
```

---

## Acceptance Criteria

**Purpose:** Criterios definitivos de pass/fail para conclusao da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] AC-1: Anamnese completa coletada com todos os dados antropometricos
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que peso, altura, circunferencias e historico estao presentes
    error_message: "AC-1 nao atendido: Dados antropometricos incompletos"

  - [ ] AC-2: Cliente classificado corretamente pelo algoritmo de classificacao
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que classificacao (beginner/intermediate/advanced/elite) esta correta
      baseada em anos de treino, forca relativa e composicao corporal
    error_message: "AC-2 nao atendido: Classificacao incorreta ou ausente"

  - [ ] AC-3: Objetivos definidos no formato SMART com timeline
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que cada objetivo e Specific, Measurable, Achievable, Relevant, Time-bound
    error_message: "AC-3 nao atendido: Objetivos nao sao SMART"

  - [ ] AC-4: Routing correto para protocolo adequado
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que routing decision aponta para o workflow correto
      (training-plan, diet-plan, competition-prep, etc.)
    error_message: "AC-4 nao atendido: Routing incorreto"

  - [ ] AC-5: Resumo do intake gerado e enviado ao coach para aprovacao
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que intake-summary.md foi gerado e esta acessivel ao coach
    error_message: "AC-5 nao atendido: Resumo de intake nao gerado"
```

---

## Tools

**Recursos externos/compartilhados usados por esta task:**

- **Tool:** macro-calculator
  - **Purpose:** Calcular TDEE e macros iniciais baseados nos dados antropometricos
  - **Source:** squads/fitcoach/tools/macro-calculator

- **Tool:** quality-checker
  - **Purpose:** Validar consistencia dos dados coletados
  - **Source:** squads/fitcoach/tools/quality-checker

- **Tool:** progress-comparator
  - **Purpose:** Registrar baseline de fotos e medidas para comparacao futura
  - **Source:** squads/fitcoach/tools/progress-comparator

---

## SEQUENTIAL Task Execution (Nao prosseguir ate a Task atual estar completa)

### Step 0: Preparacao e Configuracao

- Carregar template de anamnese do coach
- Verificar configuracoes de canal de comunicacao (WhatsApp Business API / email)
- Preparar termo de responsabilidade e consentimento LGPD
- Gerar link unico de formulario para o cliente

```yaml
step_0:
  name: "Preparacao e Configuracao"
  executor: automation-engineer
  duration_expected: "2-5 min"
  outputs:
    - form_link: "URL unica do formulario de anamnese"
    - consent_form: "Link do termo de consentimento"
  validation:
    - "Form link acessivel e funcional"
    - "Termo de consentimento carregado"
```

### Step 1: Envio e Coleta da Anamnese

#### 1.1 Envio do Formulario

- Enviar formulario de anamnese via canal preferido do coach
- Formulario deve conter secoes:
  - **Dados Pessoais:** nome, idade, genero, profissao
  - **Dados Antropometricos:** peso, altura, BF% (estimativa ou medida), circunferencias
  - **Historico de Treino:** anos treinando, frequencia, split atual, PRs principais
  - **Historico de Lesoes:** lesoes previas, status, limitacoes
  - **Saude:** condicoes medicas, medicamentos, exames recentes
  - **Alimentacao:** restricoes, alergias, preferencias, refeicoes por dia
  - **Rotina:** horarios disponiveis, local de treino, equipamentos
  - **Objetivos:** objetivo principal, objetivos secundarios, prazo desejado
  - **Motivacao:** por que busca coaching, tentativas anteriores, expectativas
  - **Fotos:** frente relaxado, lado relaxado, costas relaxado (opcional: poses double biceps)

```yaml
step_1_1:
  name: "Envio do Formulario de Anamnese"
  executor: automation-engineer
  channel: [whatsapp, email]
  duration_expected: "1-2 min (envio)"
  wait_for_response: true
  timeout: "72h"
  reminder_schedule:
    - after: "24h"
      message: "Lembrete: seu formulario de anamnese esta pendente"
    - after: "48h"
      message: "Ultimo lembrete: precisamos do formulario para iniciar"
```

#### 1.2 Validacao dos Dados Recebidos

- Verificar completude dos campos obrigatorios
- Validar ranges dos dados numericos:
  - Peso: 30-250 kg
  - Altura: 100-230 cm
  - BF%: 3-60%
  - Idade: 14-80 anos
- Identificar campos inconsistentes ou suspeitos
- Se dados incompletos: solicitar complemento automaticamente
- Se dados completos: prosseguir para classificacao

```yaml
step_1_2:
  name: "Validacao dos Dados"
  executor: intake-analyst
  duration_expected: "3-5 min"
  validation_rules:
    required_fields:
      - client_name
      - client_age
      - client_gender
      - weight
      - height
      - training_history
      - goal
      - availability
    range_checks:
      weight: [30, 250]
      height: [100, 230]
      body_fat: [3, 60]
      age: [14, 80]
      days_per_week: [1, 7]
  on_incomplete: "request_complement"
  on_invalid: "flag_for_review"
```

### Step 2: Classificacao do Cliente

#### 2.1 Algoritmo de Classificacao por Nivel de Experiencia

Classificar o cliente em um dos 4 niveis baseado em criterios compostos:

**Nivel BEGINNER (Iniciante):**
- Menos de 1 ano de treino consistente
- Nao conhece exercicios compostos basicos
- Sem historico de periodizacao
- Score de classificacao: 0-25

**Nivel INTERMEDIATE (Intermediario):**
- 1-3 anos de treino consistente
- Conhece exercicios compostos, execucao razoavel
- Ja fez alguma forma de progressao de carga
- Score de classificacao: 26-50

**Nivel ADVANCED (Avancado):**
- 3-7 anos de treino consistente
- Boa execucao tecnica, conhece periodizacao
- Historico de progressao documentado
- Score de classificacao: 51-75

**Nivel ELITE (Elite):**
- 7+ anos de treino consistente
- Experiencia em competicao ou nivel equivalente
- Conhecimento tecnico aprofundado
- Score de classificacao: 76-100

```yaml
step_2_1:
  name: "Classificacao por Nivel"
  executor: intake-analyst
  duration_expected: "5-10 min"
  algorithm:
    dimensions:
      - training_years: weight_0.25
      - frequency_consistency: weight_0.15
      - exercise_knowledge: weight_0.20
      - strength_relative: weight_0.20
      - body_composition: weight_0.10
      - periodization_experience: weight_0.10
    scoring:
      method: "weighted_composite"
      scale: [0, 100]
    output: classification_level
```

#### 2.2 Classificacao por Somatotipo e Composicao Corporal

- Avaliar tendencia de somatotipo (ectomorfo, mesomorfo, endomorfo)
- Calcular FFMI (Fat-Free Mass Index) quando BF% disponivel:
  - FFMI = (peso * (1 - BF%/100)) / (altura/100)^2
  - FFMI < 18: abaixo da media
  - FFMI 18-20: media
  - FFMI 20-22: acima da media
  - FFMI 22-25: avancado
  - FFMI > 25: elite/suspeita de PED
- Registrar baseline de composicao corporal

```yaml
step_2_2:
  name: "Classificacao por Composicao Corporal"
  executor: intake-analyst
  tool: macro-calculator
  duration_expected: "3-5 min"
  calculations:
    - ffmi: "(weight * (1 - bf/100)) / (height/100)^2"
    - bmi: "weight / (height/100)^2"
    - waist_to_hip: "waist / hip"
  output: body_composition_profile
```

#### 2.3 Avaliacao de Risco e Flags de Saude

- **RED FLAGS (Bloqueio - requer liberacao medica):**
  - Doenca cardiovascular diagnosticada
  - Diabetes descompensada
  - Lesao ativa nao tratada
  - Disturbio alimentar ativo
  - Idade < 16 sem consentimento dos pais
  - Gravidez (routing para protocolo especifico)

- **YELLOW FLAGS (Atencao - adaptar protocolo):**
  - Hipertensao controlada
  - Problema articular cronico
  - Medicamento que afeta metabolismo (corticoides, tireoide)
  - Historico de lesao recorrente
  - BF% muito baixo (< 8% homens, < 15% mulheres) sem ser competidor

- **GREEN FLAGS (Liberado - protocolo padrao):**
  - Sem condicoes medicas relevantes
  - Sem lesoes ativas
  - Exames recentes normais

```yaml
step_2_3:
  name: "Avaliacao de Risco"
  executor: intake-analyst
  duration_expected: "5-8 min"
  flags:
    red:
      action: "HALT - Solicitar liberacao medica antes de prosseguir"
      notification: coach + client
      blocker: true
    yellow:
      action: "ADAPTAR - Registrar restricoes para protocol builders"
      notification: coach
      blocker: false
    green:
      action: "PROSSEGUIR - Protocolo padrao"
      notification: none
      blocker: false
  output: risk_assessment
```

### Step 3: Definicao de Objetivos SMART

#### 3.1 Objetivo Principal

Transformar o objetivo declarado pelo cliente em formato SMART:

- **S (Specific):** Detalhar o que exatamente o cliente quer alcançar
- **M (Measurable):** Definir metricas mensuraveis (peso, BF%, medidas, PRs)
- **A (Achievable):** Validar se o objetivo e realista dado o perfil do cliente
- **R (Relevant):** Alinhar com motivacao e estilo de vida
- **T (Time-bound):** Definir timeline realista

**Exemplos de conversao:**
- "Quero ficar grande" → "Ganhar 4-6kg de massa magra em 16 semanas mantendo BF% < 15%"
- "Quero emagrecer" → "Perder 8kg de gordura em 12 semanas preservando massa muscular (< 1kg perda)"
- "Quero competir" → "Atingir stage-ready (BF% 5-7%) em 20 semanas a partir de 15% BF atual"

```yaml
step_3_1:
  name: "Definicao de Objetivo Principal"
  executor: intake-analyst
  requires_approval: true
  approver: coach
  duration_expected: "5-10 min"
  smart_template:
    specific: "{detail_what}"
    measurable: "{metric} de {current} para {target}"
    achievable: "Baseado em {classification} e {body_composition}"
    relevant: "Alinhado com {motivation}"
    time_bound: "{weeks} semanas"
  output: primary_goal
```

#### 3.2 Objetivos Secundarios e Milestones

- Definir 2-3 objetivos secundarios complementares
- Criar milestones intermediarios (a cada 4 semanas)
- Definir metricas de acompanhamento para cada milestone
- Estabelecer criterios de ajuste (quando o protocolo precisa mudar)

```yaml
step_3_2:
  name: "Objetivos Secundarios e Milestones"
  executor: intake-analyst
  duration_expected: "5-8 min"
  milestones:
    frequency: "every_4_weeks"
    metrics:
      - weight_change
      - body_fat_change
      - strength_progress
      - adherence_rate
      - subjective_wellbeing
  adjustment_triggers:
    - "Peso estagnado por 2+ semanas"
    - "Adherencia < 70% por 2+ semanas"
    - "Fadiga cronica reportada"
    - "Lesao ou dor nova"
  output: secondary_goals_and_milestones
```

### Step 4: Calculo de Baseline Metabolico

#### 4.1 Estimativa de TDEE (Total Daily Energy Expenditure)

- Calcular BMR usando formula de Mifflin-St Jeor:
  - Homens: BMR = 10 * peso(kg) + 6.25 * altura(cm) - 5 * idade - 161 + 5
  - Mulheres: BMR = 10 * peso(kg) + 6.25 * altura(cm) - 5 * idade - 161
- Aplicar fator de atividade (NEAT + EAT + TEF):
  - Sedentario (1.2): escritorio, sem exercicio
  - Levemente ativo (1.375): 1-3x treino/semana
  - Moderadamente ativo (1.55): 3-5x treino/semana
  - Muito ativo (1.725): 6-7x treino/semana
  - Extremamente ativo (1.9): 2x/dia ou trabalho fisico + treino

```yaml
step_4_1:
  name: "Calculo de TDEE"
  executor: intake-analyst
  tool: macro-calculator
  duration_expected: "2-3 min"
  formulas:
    bmr_male: "10 * weight + 6.25 * height - 5 * age + 5"
    bmr_female: "10 * weight + 6.25 * height - 5 * age - 161"
    tdee: "bmr * activity_factor"
  output: metabolic_baseline
```

#### 4.2 Estimativa de Macros Iniciais

- Baseado no objetivo e TDEE, calcular distribuicao inicial:
  - **Hipertrofia:** TDEE + 200-500kcal | Proteina 1.6-2.2g/kg | Gordura 0.8-1.2g/kg | Carb restante
  - **Cutting:** TDEE - 300-750kcal | Proteina 2.0-2.7g/kg | Gordura 0.7-1.0g/kg | Carb restante
  - **Recomp:** TDEE +/- 100kcal | Proteina 2.0-2.4g/kg | Gordura 0.8-1.1g/kg | Carb restante
  - **Manutencao:** TDEE | Proteina 1.6-2.0g/kg | Gordura 0.8-1.2g/kg | Carb restante

```yaml
step_4_2:
  name: "Estimativa de Macros Iniciais"
  executor: intake-analyst
  tool: macro-calculator
  duration_expected: "2-3 min"
  output: initial_macros
```

### Step 5: Routing para Protocolo

#### 5.1 Decisao de Routing

Baseado na classificacao, objetivo e flags, determinar proxima task:

| Perfil | Objetivo | Routing |
|--------|----------|---------|
| Qualquer | Hipertrofia/Cutting/Recomp | create-training-plan + create-diet-plan (paralelo) |
| Qualquer | Competition Prep | competition-prep (workflow dedicado) |
| Qualquer | Saude/Performance | create-training-plan + create-diet-plan (adaptado) |
| Yellow Flag | Qualquer | Protocolo adaptado com restricoes documentadas |
| Red Flag | Qualquer | HALT - Aguardar liberacao medica |

```yaml
step_5_1:
  name: "Decisao de Routing"
  executor: intake-analyst
  requires_approval: true
  approver: coach
  duration_expected: "2-3 min"
  routing_matrix:
    standard:
      next_tasks: ["create-training-plan", "create-diet-plan"]
      execution: "parallel"
    competition:
      next_workflow: "competition-prep-cycle"
      execution: "sequential"
    restricted:
      next_tasks: ["create-training-plan", "create-diet-plan"]
      execution: "parallel"
      constraints: "{risk_assessment.yellow_flags}"
    blocked:
      action: "halt"
      reason: "{risk_assessment.red_flags}"
      requirement: "medical_clearance"
  output: routing_decision
```

#### 5.2 Aprovacao do Coach

- Gerar resumo completo do intake para o coach:
  - Dados do cliente (resumo)
  - Classificacao e justificativa
  - Objetivos SMART definidos
  - Baseline metabolico calculado
  - Flags de risco identificados
  - Routing recomendado
- Coach deve aprovar ou solicitar ajustes
- Se aprovado: prosseguir para proxima task
- Se ajustes necessarios: retornar ao step relevante

```yaml
step_5_2:
  name: "Aprovacao do Coach"
  executor: human (coach)
  duration_expected: "5-15 min"
  approval_options:
    - approve: "Prosseguir com protocolo recomendado"
    - adjust_goals: "Ajustar objetivos e recalcular"
    - adjust_routing: "Mudar routing (ex: adicionar competition prep)"
    - reject: "Recoletar dados (voltar ao Step 1)"
  output: coach_approval
```

### Step 6: Finalizacao e Registro

#### 6.1 Persistencia dos Dados

- Salvar todos os artefatos gerados:
  - `clients/{id}/profile.json` — Perfil completo do cliente
  - `clients/{id}/classification.json` — Report de classificacao
  - `clients/{id}/goals.json` — Objetivos SMART com milestones
  - `clients/{id}/metabolic-baseline.json` — TDEE, macros, composicao corporal
  - `clients/{id}/risk-assessment.json` — Flags de saude e restricoes
  - `clients/{id}/intake-summary.md` — Resumo legivel para o coach

```yaml
step_6_1:
  name: "Persistencia dos Dados"
  executor: intake-analyst
  duration_expected: "2-3 min"
  storage:
    location: "clients/{client_id}/"
    format: json + markdown
    retention: "indefinite"
  output: stored_artifacts
```

#### 6.2 Notificacao e Onboarding

- Enviar mensagem de boas-vindas ao cliente com:
  - Confirmacao de recebimento dos dados
  - Resumo dos objetivos acordados
  - Timeline estimada para receber o protocolo
  - Instrucoes de proximo passo (aguardar treino/dieta)
- Notificar coach que intake foi finalizado com sucesso

```yaml
step_6_2:
  name: "Notificacao e Onboarding"
  executor: automation-engineer
  channel: [whatsapp, email]
  duration_expected: "1-2 min"
  templates:
    client: "welcome_after_intake"
    coach: "intake_complete_summary"
  output: notifications_sent
```

---

## Error Handling

**Strategy:** retry + escalate

**Common Errors:**

1. **Error:** Dados Incompletos do Formulario
   - **Cause:** Cliente nao preencheu todos os campos obrigatorios
   - **Resolution:** Enviar lembrete automatico solicitando campos faltantes
   - **Recovery:** Re-processar quando dados completos recebidos

2. **Error:** Dados Inconsistentes
   - **Cause:** Valores fora do range ou contraditorios (ex: BF% 5% com IMC 35)
   - **Resolution:** Flaggar para revisao manual do coach
   - **Recovery:** Coach corrige manualmente e resubmete

3. **Error:** Red Flag Medico Detectado
   - **Cause:** Condicao medica que requer liberacao profissional
   - **Resolution:** Pausar intake, notificar coach e cliente
   - **Recovery:** Retomar quando liberacao medica apresentada

4. **Error:** Timeout de Resposta do Cliente
   - **Cause:** Cliente nao respondeu dentro de 72h
   - **Resolution:** Enviar lembretes programados (24h, 48h)
   - **Recovery:** Apos 72h sem resposta, notificar coach para follow-up manual

5. **Error:** Falha no Canal de Comunicacao
   - **Cause:** WhatsApp API indisponivel ou email bounce
   - **Resolution:** Tentar canal alternativo
   - **Recovery:** Se ambos falharem, alertar coach para contato direto

---

## Performance

**Expected Metrics:**

```yaml
duration_expected: "30-60 min (coleta) + 15-20 min (processamento)"
cost_estimated: "$0.01-0.05"
token_usage: "~5,000-15,000 tokens"
client_response_time: "1-72h (variavel)"
```

**Optimization Notes:**
- Formulario pre-preenchido quando cliente retornante
- Cache de templates de anamnese por tipo de coach
- Processamento paralelo de classificacao e calculo metabolico
- Batch processing quando multiplos intakes na fila

---

## Validation Criteria

```yaml
validation:
  completeness:
    - "Todos os campos obrigatorios preenchidos"
    - "Classificacao definida com score numerico"
    - "Objetivos no formato SMART"
    - "Routing decision definido"

  accuracy:
    - "TDEE calculado com formula correta"
    - "FFMI calculado corretamente quando BF% disponivel"
    - "Classificacao consistente com dados do cliente"
    - "Flags de risco corretamente identificados"

  quality:
    - "Resumo de intake claro e profissional"
    - "Dados persistidos em formato correto"
    - "Notificacoes enviadas com sucesso"
    - "Aprovacao do coach registrada"
```

---

## Metadata

```yaml
task_id: FC-TASK-001
name: client-intake
version: 1.0.0
squad: fitcoach
dependencies:
  - automation-engineer (envio de formularios)
  - macro-calculator (tool)
  - quality-checker (tool)
tags:
  - intake
  - onboarding
  - classification
  - client-management
updated_at: 2026-03-11
```

---

## Handoff

```yaml
next_task:
  standard:
    tasks: ["create-training-plan", "create-diet-plan"]
    execution: parallel
    condition: "routing_decision.type == 'standard' && coach_approval == 'approve'"
  competition:
    workflow: "competition-prep-cycle"
    condition: "routing_decision.type == 'competition' && coach_approval == 'approve'"
  blocked:
    action: halt
    condition: "risk_assessment.has_red_flags == true"
    resume_when: "medical_clearance_received"
```
