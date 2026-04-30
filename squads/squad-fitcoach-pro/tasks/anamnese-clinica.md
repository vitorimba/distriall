<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: anamnese-clinica
  task_name: Anamnese Clinica
  status: active
  responsible_executor: 'intake-analyst + elite-coach + human approval'
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
- **NAO RECOMENDADO** para anamnese clinica
- **Melhor para:** Nunca — triagem de saude requer supervisao completa

### 2. Interactive Mode - Balanceado, Educativo (5-10 prompts) **[DEFAULT]**
- Checkpoints explicitos em cada bloco de triagem
- Explicacoes ao coach sobre decisoes de risk-flagging
- **Melhor para:** Maioria dos novos clientes

### 3. Pre-Flight Planning - Planejamento Completo Antecipado **[RECOMENDADO para alto risco]**
- Analise completa de todos os dados antes de qualquer routing
- Zero ambiguidade em classificacao de risco
- **Melhor para:** Clientes com historico medico complexo, 40+ anos, retorno de lesao

**Parameter:** `mode` (optional, default: `interactive`)

---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: anamneseClinica()
id: FC-TASK-010
responsavel: intake-analyst + elite-coach + human approval
responsavel_type: Hybrid
squad: fitcoach
pattern_prefix: FC
atomic_layer: Organism
priority: P0
classification: CRITICAL_SAFETY

advisors:
  - intake-analyst (Scout) — Conducao da anamnese, classificacao, red flag detection
  - elite-coach (Matt Jansen) — Contextualizacao de historico de treino e recovery
  - nutrition-scientist (Layne Norton) — Avaliacao de habitos nutricionais e metabolic history

**Entrada:**
- campo: client_name
  tipo: string
  origem: User Input
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

- campo: parq_plus_responses
  tipo: object
  origem: User Input (PAR-Q+ questionnaire)
  obrigatorio: true
  validacao: |
    All 7 PAR-Q+ general questions must be answered (yes/no).
    If any YES: follow-up questions for that domain are MANDATORY.
    If 2+ YES in cardiovascular domain: auto-trigger medical clearance requirement.

- campo: medical_history
  tipo: object
  origem: User Input
  obrigatorio: true
  validacao: |
    Must include: cardiovascular (boolean + details), respiratory (boolean + details),
    metabolic (boolean + details), musculoskeletal (boolean + details),
    neurological (boolean + details), mental_health (boolean + details)

- campo: medication_inventory
  tipo: array[object]
  origem: User Input
  obrigatorio: false
  validacao: |
    Each entry must have: name, dosage, frequency, duration, prescribing_reason.
    Flag: betabloqueadores, insulina, corticoides, anticoagulantes,
    psicofarmacos, hormonio tireoidiano

- campo: supplement_inventory
  tipo: array[object]
  origem: User Input
  obrigatorio: false
  validacao: Each entry must have: name, dosage, frequency, brand (optional)

- campo: injury_surgery_history
  tipo: array[object]
  origem: User Input
  obrigatorio: false
  validacao: |
    Each entry must have: type (injury|surgery), body_region, description,
    date, rehab_status (active|in_progress|completed|none), medical_clearance (boolean)

- campo: sleep_assessment
  tipo: object
  origem: User Input (Pittsburgh PSQI adapted)
  obrigatorio: true
  validacao: |
    Must include: bedtime, wake_time, sleep_latency_minutes, wake_episodes_per_night,
    sleep_quality_subjective (1-10), daytime_dysfunction (1-5),
    sleep_medication_use (boolean), total_score (0-21)

- campo: mental_health_screening
  tipo: object
  origem: User Input (PHQ-4 adapted)
  obrigatorio: true
  validacao: |
    Must include: anxiety_score (0-6), depression_score (0-6), total_score (0-12).
    PHQ-4 items: nervousness, uncontrollable_worry, low_interest, hopelessness.
    Each item scored 0-3 (not_at_all, several_days, more_than_half, nearly_every_day)

- campo: lifestyle_factors
  tipo: object
  origem: User Input
  obrigatorio: true
  validacao: |
    Must include: occupation, work_hours_per_day, work_type (sedentary|light|moderate|active),
    schedule_regularity (regular|rotating|irregular), travel_frequency (none|monthly|weekly),
    commute_time_minutes, dependents (boolean)

- campo: training_history
  tipo: object
  origem: User Input
  obrigatorio: true
  validacao: |
    Must include: total_years, recent_months_active, modalities (array),
    current_frequency_per_week, current_duration_per_session,
    max_lifts_known (boolean), experience_level_self_assessed

- campo: nutritional_habits
  tipo: object
  origem: User Input
  obrigatorio: true
  validacao: |
    Must include: meals_per_day, meal_prep_method (self|family|delivery|restaurant|mixed),
    dietary_restrictions (array), allergies (array), intolerances (array),
    water_intake_liters, alcohol_frequency (none|occasional|weekly|daily),
    supplement_history (array), eating_disorders_history (boolean)

- campo: goals
  tipo: object
  origem: User Input
  obrigatorio: true
  validacao: |
    Must include: primary_goal (aesthetic|performance|health|competition|rehabilitation),
    secondary_goals (array), desired_timeline, motivation_factors (array),
    previous_attempts (array), commitment_level (1-10)

**Saida:**
- campo: anamnesis_report
  tipo: object (YAML structured)
  destino: Data Store (clients/{id}/anamnesis/)
  persistido: true

- campo: parq_plus_result
  tipo: object
  destino: Data Store (clients/{id}/anamnesis/parq-plus.yaml)
  persistido: true

- campo: risk_classification
  tipo: object
  destino: Data Store (clients/{id}/anamnesis/risk-classification.yaml)
  persistido: true

- campo: referral_triggers
  tipo: array[object]
  destino: Data Store (clients/{id}/anamnesis/referrals.yaml)
  persistido: true

- campo: clearance_requirements
  tipo: object
  destino: Data Store (clients/{id}/anamnesis/clearance-status.yaml)
  persistido: true

- campo: routing_decision
  tipo: object
  destino: Memory (para proxima task)
  persistido: false
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

  - [ ] Template PAR-Q+ carregado e disponivel no idioma do cliente
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que o questionario PAR-Q+ esta disponivel e atualizado (versao 2020+)
    error_message: "Pre-condition failed: Template PAR-Q+ nao encontrado ou desatualizado"

  - [ ] Termo de consentimento informado e LGPD configurados
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que documentos legais estao disponiveis, incluindo consentimento
      para coleta de dados sensiveis de saude (LGPD Art. 11)
    error_message: "Pre-condition failed: Termos legais para dados sensiveis nao configurados"

  - [ ] Canal de comunicacao seguro configurado
    tipo: pre-condition
    blocker: false
    validacao: |
      Verificar que canal de comunicacao suporta dados sensiveis de saude
    error_message: "Warning: Canal de comunicacao pode nao ser adequado para dados de saude"
```

---

## Post-Conditions

**Purpose:** Validar sucesso da execucao APOS task completar

**Checklist:**

```yaml
post-conditions:
  - [ ] PAR-Q+ completo com todas as 7 perguntas gerais respondidas
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que parq_plus_result contem respostas para todas as perguntas gerais
      e follow-ups para cada resposta YES
    error_message: "Post-condition failed: PAR-Q+ incompleto"

  - [ ] Historico medico documentado em todos os sistemas corporais
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que medical_history cobre: cardiovascular, respiratorio,
      metabolico, musculoesqueletico, neurologico, saude mental
    error_message: "Post-condition failed: Historico medico incompleto"

  - [ ] Classificacao de risco definida (RED, YELLOW, GREEN)
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que risk_classification existe com nivel definido e justificativa
    error_message: "Post-condition failed: Classificacao de risco nao definida"

  - [ ] Red flags processados com auto-referral triggers gerados
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que todos os red flags detectados tem referral associado
    error_message: "Post-condition failed: Red flags sem referral triggers"

  - [ ] Anamnesis report YAML estruturado gerado e persistido
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que anamnesis_report existe em formato YAML valido
    error_message: "Post-condition failed: Report YAML nao gerado"

  - [ ] Sleep e mental health scores calculados
    tipo: post-condition
    blocker: false
    validacao: |
      Verificar que PSQI score e PHQ-4 score estao presentes
    error_message: "Warning: Scores de sono e saude mental nao calculados"
```

---

## Acceptance Criteria

```yaml
acceptance-criteria:
  - [ ] AC-1: PAR-Q+ screening completo com follow-ups para todas as respostas positivas
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que parq_plus_result contem 7 respostas gerais e follow-ups
      para cada YES. Se qualquer pergunta cardiovascular = YES, medical clearance
      flag deve estar ativo.
    error_message: "AC-1 nao atendido: PAR-Q+ incompleto ou follow-ups ausentes"

  - [ ] AC-2: Inventario de medicacoes com classificacao de impacto no treino
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que cada medicacao tem impact_on_training classificado
      (none, low, moderate, high, contraindication)
    error_message: "AC-2 nao atendido: Medicacoes sem classificacao de impacto"

  - [ ] AC-3: Score PSQI calculado e interpretado com recomendacoes
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que sleep_assessment.total_score existe (0-21) e interpretacao
      presente (good: 0-5, poor: 6-10, clinical: 11+)
    error_message: "AC-3 nao atendido: PSQI score ausente ou sem interpretacao"

  - [ ] AC-4: PHQ-4 screening com auto-referral para scores elevados
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que mental_health_screening.total_score existe e que scores >= 6
      geram referral_trigger para profissional de saude mental
    error_message: "AC-4 nao atendido: PHQ-4 screening incompleto"

  - [ ] AC-5: Todos os red flags identificados com auto-referral triggers documentados
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que cada red flag tem: type, severity, referral_professional,
      action_required, blocking_status
    error_message: "AC-5 nao atendido: Red flags sem auto-referral triggers"

  - [ ] AC-6: Report YAML estruturado com todas as secoes preenchidas
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que anamnesis_report YAML contem todas as secoes obrigatorias
      e passa validacao de schema
    error_message: "AC-6 nao atendido: Report YAML incompleto ou invalido"
```

---

## Veto Conditions

| ID | Condicao | Acao | Severidade |
|----|----------|------|------------|
| FC_AC_V001 | Prosseguir para prescricao de treino/dieta sem PAR-Q+ completo | BLOCK + exigir conclusao do PAR-Q+ antes de qualquer routing para Tier 1/3 | NON-NEGOTIABLE |
| FC_AC_V002 | Ignorar red flag medico detectado (cardiovascular, metabolico, ortopedico grave) | BLOCK + gerar referral trigger automatico + notificar coach + HALT routing | NON-NEGOTIABLE |
| FC_AC_V003 | Ignorar necessidade de liberacao medica quando PAR-Q+ indica YES em dominio cardiovascular | BLOCK + exigir documentacao medica antes de prosseguir | NON-NEGOTIABLE |
| FC_AC_V004 | Pular avaliacao de saude mental (PHQ-4) | BLOCK + PHQ-4 e obrigatorio para todos os clientes sem excecao | MUST |
| FC_AC_V005 | Aceitar anamnese com menos de 80% dos campos obrigatorios preenchidos | BLOCK + listar campos faltantes e coletar antes de gerar report | MUST |
| FC_AC_V006 | Fazer diagnostico medico ou recomendar mudanca de medicacao | BLOCK + esta task e de triagem, nao de diagnostico — encaminhar sempre | NON-NEGOTIABLE |

---

## Tools

**Recursos externos/compartilhados usados por esta task:**

- **Tool:** quality-checker
  - **Purpose:** Validar completude e consistencia da anamnese contra schema
  - **Source:** squads/fitcoach/tools/quality-checker

- **Tool:** macro-calculator
  - **Purpose:** Calcular TDEE baseline a partir dos dados antropometricos coletados
  - **Source:** squads/fitcoach/tools/macro-calculator

---

## SEQUENTIAL Task Execution (Nao prosseguir ate a Task atual estar completa)

### Step 0: Consentimento e Preparacao

- Apresentar termo de consentimento informado (LGPD)
- Explicar que dados de saude serao coletados e como serao protegidos
- Obter aceite explicito do cliente antes de iniciar
- Carregar template PAR-Q+ no idioma do cliente
- Preparar formulario estruturado por blocos

```yaml
step_0:
  name: "Consentimento e Preparacao"
  executor: intake-analyst
  duration_expected: "3-5 min"
  outputs:
    - consent_status: "accepted | declined"
    - parq_template: "PAR-Q+ template loaded"
  validation:
    - "Consentimento obtido antes de coletar qualquer dado"
    - "Template PAR-Q+ carregado corretamente"
  blocker_if_declined: true
```

### Step 1: PAR-Q+ Screening (Physical Activity Readiness Questionnaire Plus)

#### 1.1 Perguntas Gerais (7 perguntas obrigatorias)

Aplicar as 7 perguntas gerais do PAR-Q+ 2020:

1. O seu medico alguma vez disse que voce tem um problema cardiaco E que so deve fazer atividade fisica recomendada por um medico?
2. Voce sente dor no peito quando faz atividade fisica?
3. No ultimo mes, voce sentiu dor no peito quando NAO estava fazendo atividade fisica?
4. Voce perde o equilibrio por causa de tontura ou alguma vez perdeu a consciencia?
5. Voce tem algum problema osseo ou articular que poderia ser piorado por uma mudanca na atividade fisica?
6. O seu medico esta prescrevendo medicamentos para sua pressao arterial ou condicao cardiaca?
7. Voce conhece alguma outra razao pela qual NAO deveria fazer atividade fisica?

```yaml
step_1_1:
  name: "PAR-Q+ Perguntas Gerais"
  executor: intake-analyst
  duration_expected: "5-8 min"
  scoring:
    all_no: "CLEARED — prosseguir com anamnese completa"
    any_yes: "FOLLOW-UP REQUIRED — ativar perguntas de follow-up por dominio"
    yes_q1_or_q6: "CARDIOVASCULAR FLAG — medical clearance obrigatoria"
  output: parq_general_responses
```

#### 1.2 Follow-Up por Dominio (se qualquer YES)

Para cada resposta YES, aplicar perguntas de follow-up especificas do dominio:

**Dominio Cardiovascular (Q1, Q2, Q3, Q6):**
- Tipo de condicao cardiaca diagnosticada
- Data do diagnostico
- Tratamento atual
- Ultimo exame cardiologico (data e resultado)
- Liberacao para exercicio fisico (sim/nao/condicional)

**Dominio Neurologico (Q4):**
- Frequencia dos episodios
- Diagnostico associado (VPPB, hipotensao ortostatica, epilepsia, etc.)
- Medicacao para controle
- Restricoes de atividade

**Dominio Musculoesqueletico (Q5):**
- Articulacao(oes) afetada(s)
- Diagnostico (artrite, hernia, tendinite, etc.)
- Status atual (agudo, cronico controlado, cronico nao controlado)
- Fisioterapia em andamento

**Dominio Medicamentoso (Q6):**
- Lista completa de medicamentos cardiovasculares
- Classe farmacologica (beta-bloqueador, IECA, BRA, diuretico, etc.)
- Efeitos no exercicio (bradicardia, hipotensao, desidratacao)

**Dominio Geral (Q7):**
- Descricao da razao
- Classificacao da gravidade
- Acompanhamento profissional

```yaml
step_1_2:
  name: "PAR-Q+ Follow-Up por Dominio"
  executor: intake-analyst
  duration_expected: "5-15 min (variavel por quantidade de YES)"
  trigger: "any_yes in step_1_1"
  decision_matrix:
    cardiovascular_yes:
      action: "REQUIRE medical clearance"
      blocker: true
      referral: "cardiologista"
    neurological_yes:
      action: "REQUIRE medical clearance if undiagnosed"
      blocker: "conditional"
      referral: "neurologista"
    musculoskeletal_yes:
      action: "FLAG for adapted protocol"
      blocker: false
      referral: "ortopedista (if acute)"
    medication_yes:
      action: "CLASSIFY impact on training"
      blocker: false
      referral: "medico prescritor (for exercise clearance)"
  output: parq_followup_responses
```

### Step 2: Historico Medico Completo

#### 2.1 Sistema Cardiovascular

- Hipertensao arterial (diagnosticada, controlada/nao controlada, medicacao)
- Doenca arterial coronariana, arritmias, insuficiencia cardiaca
- Historico de infarto, AVC, embolia pulmonar
- Sopro cardiaco, valvulopatias
- Historico familiar de morte subita ou doenca cardiovascular precoce (< 55 anos homens, < 65 mulheres)

```yaml
step_2_1:
  name: "Historico Cardiovascular"
  executor: intake-analyst
  duration_expected: "5-8 min"
  red_flags:
    - "Doenca cardiovascular nao controlada"
    - "Historico de infarto/AVC sem liberacao cardiologica"
    - "Arritmia nao investigada"
    - "PA > 160/100 sem tratamento"
  output: cardiovascular_history
```

#### 2.2 Sistema Respiratorio

- Asma (controlada/nao controlada, uso de bombinha, frequencia de crises)
- DPOC, bronquite cronica
- Apneia do sono (diagnosticada, CPAP, gravidade)
- Historico de pneumotorax
- Restricoes de exercicio por condicao respiratoria

```yaml
step_2_2:
  name: "Historico Respiratorio"
  executor: intake-analyst
  duration_expected: "3-5 min"
  red_flags:
    - "Asma nao controlada (crises frequentes)"
    - "Apneia do sono severa sem tratamento"
    - "DPOC moderada/grave"
  output: respiratory_history
```

#### 2.3 Sistema Metabolico

- Diabetes tipo 1 ou tipo 2 (HbA1c recente, medicacao, controle glicemico)
- Doencas da tireoide (hipo/hipertireoidismo, medicacao, ultimo TSH)
- Dislipidemia (colesterol, triglicerides, medicacao)
- Sindrome metabolica
- Doenca renal (estadio, restricoes)
- Doenca hepatica

```yaml
step_2_3:
  name: "Historico Metabolico"
  executor: intake-analyst
  duration_expected: "5-8 min"
  red_flags:
    - "Diabetes descompensado (HbA1c > 9%)"
    - "Hipotireoidismo nao tratado"
    - "Doenca renal estadio 3+"
  output: metabolic_history
```

#### 2.4 Sistema Musculoesqueletico

- Lesoes previas (entorse, distensao, ruptura, fratura)
- Cirurgias ortopedicas (tipo, data, reabilitacao, status atual)
- Doencas cronicas (artrite, artrose, espondilite, fibromialgia)
- Hernia discal (nivel, sintomas atuais, tratamento)
- Limitacoes de amplitude de movimento
- Dor cronica (localizacao, intensidade, trigger)

```yaml
step_2_4:
  name: "Historico Musculoesqueletico"
  executor: intake-analyst
  duration_expected: "5-10 min"
  per_injury:
    - body_region: ""
    - type: "lesao | cirurgia | condicao_cronica"
    - date: ""
    - rehab_status: "nao_iniciada | em_andamento | concluida | sem_reabilitacao"
    - current_symptoms: ""
    - medical_clearance_for_exercise: "sim | nao | condicional | nao_solicitada"
    - movement_restrictions: []
  red_flags:
    - "Lesao ativa nao tratada"
    - "Pos-operatorio < 3 meses sem liberacao"
    - "Hernia discal com sintomas neurologicos ativos"
    - "Fratura em consolidacao"
  output: musculoskeletal_history
```

### Step 3: Inventario de Medicamentos e Suplementos

#### 3.1 Medicamentos em Uso

Para cada medicamento registrar:
- Nome comercial e principio ativo
- Dosagem e posologia
- Duracao do uso
- Razao da prescricao
- Medico prescritor (especialidade)
- Classificacao de impacto no treino

**Classificacao de Impacto no Treino:**

| Classe Farmacologica | Impacto no Treino | Acoes Necessarias |
|----------------------|-------------------|-------------------|
| Beta-bloqueadores | ALTO — FC reduzida, resposta ao exercicio alterada | Nao usar FC como metrica de intensidade, usar RPE |
| Insulina | ALTO — risco de hipoglicemia durante exercicio | Monitorar glicemia pre/pos, snack pre-treino obrigatorio |
| Corticoides sistemicos | ALTO — catabolismo muscular, retencao hidrica | Volume reduzido, monitorar composicao corporal |
| Anticoagulantes | MODERADO — risco de sangramento em trauma | Evitar esportes de contato, cuidado com exercicios de alto risco |
| Hormonio tireoidiano | BAIXO — normalizado com dose correta | Monitorar se dose foi ajustada recentemente |
| Antidepressivos ISRS | BAIXO-MODERADO — possivel ganho de peso, fadiga | Monitorar energia e resposta ao treino |
| Estatinas | BAIXO-MODERADO — possivel mialgia | Monitorar dor muscular, diferenciar de DOMS |
| Anti-hipertensivos (IECA/BRA) | BAIXO — possivel hipotensao pos-exercicio | Hidratacao adequada, transicoes posturais lentas |

```yaml
step_3_1:
  name: "Inventario de Medicamentos"
  executor: intake-analyst
  duration_expected: "5-10 min"
  per_medication:
    - name: ""
    - active_ingredient: ""
    - dosage: ""
    - frequency: ""
    - duration_months: 0
    - reason: ""
    - prescriber_specialty: ""
    - training_impact: "none | low | moderate | high | contraindication"
    - required_adaptations: []
  output: medication_inventory
```

#### 3.2 Suplementos em Uso

- Nome e marca
- Dosagem e frequencia
- Objetivo declarado pelo cliente
- Avaliacao de evidencia (evidence-based, limited evidence, no evidence, potentially harmful)
- Interacoes com medicamentos (se aplicavel)

```yaml
step_3_2:
  name: "Inventario de Suplementos"
  executor: intake-analyst
  advisor: nutrition-scientist
  duration_expected: "3-5 min"
  evidence_classification:
    evidence_based: ["creatina", "whey protein", "cafeina", "vitamina D", "omega-3"]
    limited_evidence: ["BCAA", "glutamina", "HMB", "ZMA"]
    no_evidence: ["maioria dos 'boosters'"]
    potentially_harmful: ["pre-treinos com DMAA", "fat burners com efedrina"]
  output: supplement_inventory
```

### Step 4: Historico de Lesoes e Cirurgias (Timeline Detalhada)

- Construir timeline cronologica de todas as lesoes e cirurgias
- Para cada evento: data, descricao, tratamento, reabilitacao, status atual
- Identificar padroes (lesoes recorrentes no mesmo segmento)
- Avaliar status de reabilitacao de cada evento
- Gerar mapa de restricoes baseado na timeline

```yaml
step_4:
  name: "Timeline de Lesoes e Cirurgias"
  executor: intake-analyst
  advisor: elite-coach
  duration_expected: "5-10 min"
  timeline_format:
    - date: "YYYY-MM"
    - event_type: "lesao | cirurgia | recidiva"
    - body_region: ""
    - description: ""
    - treatment: "conservador | cirurgico | fisioterapia | nenhum"
    - rehab_completed: true/false
    - current_status: "resolvido | residual | ativo"
    - movement_restrictions_current: []
  pattern_analysis:
    recurrent_injury_threshold: 2
    action_on_recurrence: "FLAG for specialized assessment + referral"
  output: injury_surgery_timeline
```

### Step 5: Avaliacao de Qualidade do Sono (Pittsburgh PSQI Adaptado)

Aplicar versao adaptada do Pittsburgh Sleep Quality Index:

**Componentes avaliados (7 componentes, score 0-3 cada):**

1. **Qualidade subjetiva do sono:** Como voce classifica sua qualidade de sono no ultimo mes?
2. **Latencia do sono:** Quanto tempo leva para pegar no sono (minutos)?
3. **Duracao do sono:** Quantas horas de sono efetivo por noite?
4. **Eficiencia habitual do sono:** (horas dormidas / horas na cama) x 100
5. **Disturbios do sono:** Frequencia de despertar noturno, ronco, dor, etc.
6. **Uso de medicacao para dormir:** Frequencia no ultimo mes
7. **Disfuncao diurna:** Dificuldade de manter-se acordado durante o dia, motivacao

**Interpretacao do Score Total (0-21):**

| Score | Classificacao | Acao para o Squad |
|-------|---------------|-------------------|
| 0-5 | Boa qualidade de sono | Protocolo padrao |
| 6-10 | Qualidade de sono pobre | FLAG para training-builder: volume inicial conservador |
| 11-15 | Disturbio de sono moderado | FLAG + recomendacao de higiene do sono + considerar referral |
| 16-21 | Disturbio de sono severo | REFERRAL para especialista em sono ANTES de treino intenso |

```yaml
step_5:
  name: "Avaliacao de Sono — PSQI Adaptado"
  executor: intake-analyst
  duration_expected: "5-8 min"
  components: 7
  score_range: [0, 21]
  thresholds:
    good: [0, 5]
    poor: [6, 10]
    moderate_disorder: [11, 15]
    severe_disorder: [16, 21]
  auto_referral:
    trigger_score: 16
    referral_to: "medico do sono ou pneumologista"
  training_impact:
    score_6_plus: "Reduzir volume inicial 15-20%, priorizar recovery"
    score_11_plus: "Volume minimo (MEV), monitoramento semanal de fadiga"
  output: sleep_assessment_result
```

### Step 6: Screening de Saude Mental (PHQ-4 Adaptado)

Aplicar PHQ-4 (Patient Health Questionnaire-4) adaptado para contexto fitness:

**Nas ultimas 2 semanas, com que frequencia voce foi incomodado por:**

1. Sentir-se nervoso(a), ansioso(a) ou no limite (GAD-2 item 1)
2. Nao ser capaz de parar ou controlar preocupacoes (GAD-2 item 2)
3. Pouco interesse ou prazer em fazer as coisas (PHQ-2 item 1)
4. Sentir-se para baixo, deprimido(a) ou sem esperanca (PHQ-2 item 2)

**Escala:** 0 (nenhuma vez), 1 (varios dias), 2 (mais da metade dos dias), 3 (quase todos os dias)

**Interpretacao:**

| Subscore | Range | Classificacao | Acao |
|----------|-------|---------------|------|
| Ansiedade (Q1+Q2) | 0-2 | Normal | Prosseguir |
| Ansiedade (Q1+Q2) | 3-4 | Moderada | FLAG para adaptacao de protocolo |
| Ansiedade (Q1+Q2) | 5-6 | Severa | REFERRAL para profissional de saude mental |
| Depressao (Q3+Q4) | 0-2 | Normal | Prosseguir |
| Depressao (Q3+Q4) | 3-4 | Moderada | FLAG + monitorar aderencia |
| Depressao (Q3+Q4) | 5-6 | Severa | REFERRAL para profissional de saude mental |
| Total (Q1-Q4) | 0-5 | Normal | Prosseguir |
| Total (Q1-Q4) | 6-8 | Moderado | FLAG + protocolo adaptado |
| Total (Q1-Q4) | 9-12 | Severo | REFERRAL obrigatorio antes de prosseguir |

**Perguntas complementares (contexto fitness):**
- Voce ja teve ou tem diagnostico de transtorno alimentar?
- Voce usa exercicio como forma de compensar o que come?
- Como voce se sente em relacao ao seu corpo (imagem corporal)?
- Voce sente pressao para atingir um determinado fisico?

```yaml
step_6:
  name: "Screening de Saude Mental — PHQ-4"
  executor: intake-analyst
  duration_expected: "5-8 min"
  items: 4
  scale: [0, 3]
  subscores:
    anxiety: [q1, q2]
    depression: [q3, q4]
  auto_referral:
    anxiety_severe: { trigger: ">=5", referral: "psicologo ou psiquiatra" }
    depression_severe: { trigger: ">=5", referral: "psicologo ou psiquiatra" }
    total_severe: { trigger: ">=9", referral: "psicologo ou psiquiatra", blocker: true }
    eating_disorder_flag: { trigger: "positive_history", referral: "psicologo especialista em TCA" }
  training_impact:
    moderate: "Adaptar protocolo para enfatizar bem-estar, nao apenas performance"
    severe: "Priorizar saude mental sobre qualquer objetivo de treino"
  output: mental_health_screening_result
```

### Step 7: Fatores de Estilo de Vida

#### 7.1 Ocupacao e Rotina

- Tipo de trabalho (sedentario, leve, moderado, ativo, muito ativo)
- Horas de trabalho por dia
- Regularidade do horario (fixo, rotativo, plantao)
- Tempo de deslocamento diario
- Janelas de tempo para treino
- Dependentes (filhos, cuidadores)

#### 7.2 Viagens e Deslocamentos

- Frequencia de viagens (nenhuma, mensal, semanal)
- Duracao media das viagens
- Acesso a academia durante viagens
- Impacto na alimentacao durante viagens

#### 7.3 Fatores Sociais

- Suporte familiar para mudanca de habitos
- Compromissos sociais que impactam dieta/treino
- Ambiente de trabalho (cultura de alimentacao, happy hours)

```yaml
step_7:
  name: "Fatores de Estilo de Vida"
  executor: intake-analyst
  duration_expected: "5-8 min"
  output: lifestyle_assessment
  training_impact_flags:
    shift_work: "Periodizacao flexivel, horario de treino variavel"
    high_travel: "Protocolos de treino adaptaveis (hotel/bodyweight)"
    high_stress_occupation: "Volume conservador, enfase em recovery"
    long_commute: "Otimizar duracao de sessao, considerar home gym"
```

### Step 8: Historico de Treino Detalhado

- Anos totais de pratica (qualquer modalidade)
- Meses recentes de atividade consistente
- Modalidades praticadas (musculacao, crossfit, funcional, artes marciais, natacao, etc.)
- Frequencia atual (dias por semana)
- Duracao media por sessao
- Conhecimento tecnico auto-avaliado (1-10)
- PRs conhecidos (se aplicavel)
- Tecnicas avancadas utilizadas
- Experiencia com periodizacao

```yaml
step_8:
  name: "Historico de Treino Detalhado"
  executor: intake-analyst
  advisor: elite-coach
  duration_expected: "5-8 min"
  classification_output:
    beginner: "< 1 ano consistente"
    intermediate: "1-3 anos consistentes"
    advanced: "3-7 anos consistentes"
    elite: "7+ anos, experiencia competitiva"
  output: training_history_detailed
```

### Step 9: Habitos Nutricionais Baseline

- Numero de refeicoes por dia
- Metodo de preparo (proprio, familia, delivery, restaurante)
- Restricoes alimentares (escolha, religiao, condicao medica)
- Alergias alimentares documentadas
- Intolerancias (lactose, gluten, frutose, etc.)
- Ingestao de agua (litros/dia)
- Consumo de alcool (frequencia e quantidade)
- Historico de dietas restritivas (quais, duracao, resultado)
- Relacao com comida (equilibrada, restritiva, compulsiva, emocional)
- Historico de transtorno alimentar (TCA, anorexia, bulimia)

```yaml
step_9:
  name: "Habitos Nutricionais Baseline"
  executor: intake-analyst
  advisor: nutrition-scientist
  duration_expected: "5-10 min"
  red_flags:
    - "Transtorno alimentar ativo ou historico nao tratado"
    - "Dieta extremamente restritiva (< 1000 kcal/dia por escolha)"
    - "Relacao patologica com comida (compulsao severa, purgacao)"
    - "Desidratacao cronica (< 1L/dia consistentemente)"
  output: nutritional_habits_baseline
```

### Step 10: Elicitacao de Objetivos

#### 10.1 Objetivo Principal

Classificar em categorias:
- **Estetico:** Hipertrofia, emagrecimento, recomposicao, definicao
- **Performance:** Forca, resistencia, potencia, agilidade
- **Saude:** Longevidade, indicadores metabolicos, qualidade de vida, reabilitacao
- **Competicao:** Bodybuilding, powerlifting, crossfit, outro
- **Multiplo:** Combinacao com prioridade definida

#### 10.2 Objetivos Secundarios e Motivacao

- Listar ate 3 objetivos secundarios
- Identificar motivacao intrinseca vs. extrinseca
- Avaliar realismo do prazo desejado (usar HEU-INTAKE-003)
- Registrar tentativas anteriores e motivos de abandono

```yaml
step_10:
  name: "Elicitacao de Objetivos"
  executor: intake-analyst
  duration_expected: "5-10 min"
  requires_approval: true
  approver: coach
  goal_categories: [aesthetic, performance, health, competition, rehabilitation]
  smart_conversion: true
  calibration_check: true
  output: goals_definition
```

### Step 11: Identificacao de Red Flags e Auto-Referral Triggers

Consolidar todos os dados coletados e executar analise sistematica de red flags:

**RED FLAGS — BLOQUEIO IMEDIATO (auto-referral obrigatorio):**

| Red Flag | Referral | Acao |
|----------|----------|------|
| PAR-Q+ cardiovascular positivo sem clearance | Cardiologista | HALT total |
| Diabetes descompensado (HbA1c > 9%) | Endocrinologista | HALT total |
| PA > 160/100 sem tratamento | Cardiologista | HALT total |
| Transtorno alimentar ativo | Psicologo/Psiquiatra | HALT total |
| Lesao ativa nao tratada com sintomas neurologicos | Ortopedista/Neurocirurgiao | HALT para segmento |
| PHQ-4 total >= 9 (depressao/ansiedade severa) | Psicologo/Psiquiatra | HALT total |
| Gravidez sem liberacao obstetrica | Obstetra | HALT total |
| Pos-operatorio < 3 meses sem liberacao | Cirurgiao | HALT para segmento |
| PSQI >= 16 (disturbio de sono severo) | Medico do sono | HALT parcial |

**YELLOW FLAGS — ADAPTACAO DE PROTOCOLO (sem bloqueio):**

| Yellow Flag | Impacto | Adaptacao |
|-------------|---------|-----------|
| Hipertensao controlada com medicacao | Evitar Valsalva extrema | Controlar PA pre-treino |
| Hipotireoidismo compensado | Metabolismo levemente alterado | Monitorar resposta ao deficit |
| Artrose em articulacao de carga | Selecao de exercicios | Substituir movimentos de impacto |
| Medicacao que altera FC (beta-bloq) | Intensidade | Usar RPE em vez de FC |
| PHQ-4 moderado (6-8) | Aderencia e motivacao | Protocolo com enfase em bem-estar |
| PSQI 6-10 (sono pobre) | Recovery | Volume conservador inicial |
| Comer emocional frequente | Aderencia a dieta | Estrategia nutricional adaptada |

```yaml
step_11:
  name: "Identificacao de Red Flags e Auto-Referral"
  executor: intake-analyst
  duration_expected: "5-10 min"
  auto_referral_format:
    - flag_type: ""
    - severity: "red | yellow | green"
    - description: ""
    - referral_professional: ""
    - action: "halt | adapt | monitor | clear"
    - blocking: true/false
    - documentation_required: ""
    - deadline_for_clearance: ""
  output: risk_classification_and_referrals
```

### Step 12: Geracao do Report YAML Estruturado

Compilar todos os dados coletados em um report YAML estruturado e validado:

```yaml
step_12:
  name: "Geracao do Report YAML"
  executor: intake-analyst
  tool: quality-checker
  duration_expected: "5-8 min"
  report_schema:
    metadata:
      task_id: "FC-TASK-010"
      client_id: ""
      anamnesis_date: ""
      conducted_by: "intake-analyst"
      version: "1.0"
      status: "complete | pending_clearance | blocked"
    personal_data: "Step 7 + basics"
    parq_plus: "Step 1"
    medical_history:
      cardiovascular: "Step 2.1"
      respiratory: "Step 2.2"
      metabolic: "Step 2.3"
      musculoskeletal: "Step 2.4"
    medications: "Step 3.1"
    supplements: "Step 3.2"
    injury_surgery_timeline: "Step 4"
    sleep_assessment:
      psqi_score: 0
      classification: ""
      recommendations: []
    mental_health_screening:
      phq4_total: 0
      anxiety_subscore: 0
      depression_subscore: 0
      classification: ""
      referral_triggered: false
    lifestyle: "Step 7"
    training_history: "Step 8"
    nutritional_habits: "Step 9"
    goals: "Step 10"
    risk_classification:
      overall_risk: "low | moderate | high | critical"
      red_flags: []
      yellow_flags: []
      green_flags: []
      referral_triggers: []
      clearance_status:
        medical_clearance_required: false
        clearance_obtained: false
        clearance_documents: []
        blocking_referrals: []
    routing_recommendation:
      next_task: ""
      adaptations_required: []
      volume_modifier: 1.0
      priority_agents: []
  validation:
    - "Schema completo e valido"
    - "Todos os campos obrigatorios preenchidos"
    - "Red flags com referrals associados"
    - "Scores calculados corretamente"
  output: anamnesis_report_yaml
```

### Step 13: Aprovacao do Coach e Routing

- Apresentar resumo da anamnese ao coach
- Destacar red flags e yellow flags encontrados
- Apresentar referrals automaticos gerados
- Solicitar aprovacao para prosseguir ou ajustar
- Definir routing baseado na classificacao de risco

```yaml
step_13:
  name: "Aprovacao do Coach e Routing"
  executor: human (coach)
  duration_expected: "10-20 min"
  approval_options:
    - approve: "Prosseguir com routing recomendado"
    - adjust: "Ajustar classificacao de risco ou routing"
    - hold: "Aguardar clearance medico antes de prosseguir"
    - reject: "Refazer blocos especificos da anamnese"
  routing_matrix:
    low_risk:
      next_tasks: ["physical-assessment", "create-training-plan", "create-diet-plan"]
      execution: "sequential (physical-assessment first, then parallel)"
    moderate_risk:
      next_tasks: ["physical-assessment"]
      execution: "sequential, with adaptations"
      constraints: "{risk_classification.yellow_flags}"
    high_risk:
      action: "partial_hold"
      allowed: ["physical-assessment (adapted)"]
      blocked: ["create-training-plan", "create-diet-plan"]
      resume_when: "clearance_obtained"
    critical:
      action: "full_hold"
      reason: "{risk_classification.red_flags}"
      requirement: "medical_clearance for ALL blocking referrals"
  output: routing_decision
```

---

## Error Handling

**Strategy:** retry + escalate + never_skip_safety

**Common Errors:**

1. **Error:** Cliente recusa responder PAR-Q+
   - **Cause:** Privacidade, desconfianca, nao entende a necessidade
   - **Resolution:** Explicar obrigatoriedade legal e etica; oferecer preenchimento com coach presente
   - **Recovery:** Se recusa persistir: BLOCK — nao prosseguir sem PAR-Q+

2. **Error:** Dados medicos inconsistentes ou contraditorios
   - **Cause:** Cliente nao lembra detalhes, confunde medicamentos
   - **Resolution:** Flag para revisao com coach, solicitar documentacao medica
   - **Recovery:** Marcar campos como "unverified" e prosseguir com precaucao elevada

3. **Error:** Red flag detectado mas cliente minimiza
   - **Cause:** Cliente quer comecar logo, nao valoriza a triagem
   - **Resolution:** Manter o BLOCK independentemente — seguranca nao e negociavel
   - **Recovery:** Explicar riscos, gerar referral, notificar coach

4. **Error:** PHQ-4 indica risco mas cliente recusa referral
   - **Cause:** Estigma, nao acredita precisar de ajuda
   - **Resolution:** Registrar recusa no report, informar coach, prosseguir com FLAG elevado
   - **Recovery:** Monitorar aderencia e bem-estar nos check-ins

5. **Error:** Timeout na coleta (cliente nao completa todos os blocos)
   - **Cause:** Formulario extenso, falta de tempo
   - **Resolution:** Permitir preenchimento parcial com retomada agendada
   - **Recovery:** Salvar progresso, enviar lembrete, completar na proxima interacao

---

## Performance

**Expected Metrics:**

```yaml
duration_expected: "45-90 min (coleta completa com todos os blocos)"
cost_estimated: "$0.02-0.08"
token_usage: "~8,000-20,000 tokens"
client_response_time: "1-72h (se formulario assincrono)"
```

**Optimization Notes:**
- Formulario pode ser enviado de forma assincrona para coleta parcial
- PAR-Q+ pode ser feito online antes da primeira sessao
- Blocos 5-7 (sono, mental health, lifestyle) podem ser agrupados
- Cache de medicamentos comuns para agilizar classificacao de impacto
- Reports YAML gerados automaticamente a partir dos dados coletados

---

## Validation Criteria

```yaml
validation:
  safety:
    - "PAR-Q+ completo para 100% dos clientes"
    - "Red flags detectados e documentados"
    - "Auto-referral triggers gerados para todos os red flags"
    - "Nenhum cliente com red flag ativo roteado para treino sem clearance"

  completeness:
    - "Todos os blocos obrigatorios preenchidos (>= 80% dos campos)"
    - "Scores PSQI e PHQ-4 calculados"
    - "Inventario de medicacoes com classificacao de impacto"
    - "Timeline de lesoes e cirurgias construida"

  accuracy:
    - "Classificacao de risco consistente com dados coletados"
    - "Referrals para profissionais corretos por tipo de red flag"
    - "Scores de sono e saude mental dentro dos ranges validos"

  quality:
    - "Report YAML estruturado e validado contra schema"
    - "Linguagem acessivel para o cliente, tecnica nos outputs"
    - "Coach informado de todos os flags antes do routing"
```

---

## Metadata

```yaml
task_id: FC-TASK-010
name: anamnese-clinica
version: 1.0.0
squad: fitcoach
priority: P0
classification: CRITICAL_SAFETY
dependencies:
  - intake-analyst (executor principal)
  - elite-coach (advisor — historico de treino)
  - nutrition-scientist (advisor — habitos nutricionais)
  - quality-checker (tool)
  - macro-calculator (tool)
tags:
  - anamnese
  - safety
  - screening
  - parq-plus
  - risk-assessment
  - medical-history
  - mental-health
  - sleep
  - P0
updated_at: 2026-03-13
```

---

## Handoff

```yaml
next_task:
  low_risk:
    tasks: ["physical-assessment"]
    execution: sequential
    condition: "risk_classification.overall_risk == 'low' && coach_approval == 'approve'"
  moderate_risk:
    tasks: ["physical-assessment"]
    execution: sequential
    condition: "risk_classification.overall_risk == 'moderate' && coach_approval == 'approve'"
    constraints: "Pass yellow_flags to physical-assessment for protocol adaptation"
  high_risk:
    tasks: ["physical-assessment"]
    execution: sequential
    condition: "risk_classification.overall_risk == 'high' && partial_clearance == true"
    constraints: "Adapted assessment only, skip contraindicated tests"
  critical:
    action: halt
    condition: "risk_classification.overall_risk == 'critical'"
    resume_when: "all blocking referrals resolved with medical clearance"
```
