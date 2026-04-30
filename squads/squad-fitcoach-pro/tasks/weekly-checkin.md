<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: weekly-checkin
  task_name: Weekly Checkin
  status: active
  responsible_executor: 'automation-engineer + progress-tracker'
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
- Executa check-in completo automatizado sem intervencao
- Processa dados e gera report automaticamente
- **Melhor para:** Clientes estabilizados com rotina consistente

### 2. Interactive Mode - Balanceado, Educativo (5-10 prompts) **[DEFAULT]**
- Checkpoints ao analisar tendencias e alertas
- Explica interpretacao dos dados ao coach
- **Melhor para:** Primeiras semanas, clientes com oscilacoes

### 3. Pre-Flight Planning - Planejamento Completo Antecipado
- Analisa historico completo antes de gerar report
- Cross-reference com todos os dados anteriores
- **Melhor para:** Clientes em competition prep, casos de estagnacao

**Parameter:** `mode` (optional, default: `interactive`)

---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: weeklyCheckin()
id: FC-TASK-004
responsavel: automation-engineer (trigger) + progress-tracker (processamento)
responsavel_type: Worker
squad: fitcoach
pattern_prefix: FC
atomic_layer: Organism
recurring: true
frequency: weekly

**Entrada:**
- campo: client_id
  tipo: string
  origem: System (scheduler)
  obrigatorio: true
  validacao: Must reference existing client profile

- campo: checkin_data
  tipo: object
  origem: Client Input (formulario de check-in)
  obrigatorio: true
  validacao: |
    Must contain: current_weight, adherence_training (%), adherence_diet (%),
    subjective_wellbeing (1-10), sleep_quality (1-10), stress_level (1-10)

- campo: photos
  tipo: array[image]
  origem: Client Input
  obrigatorio: false
  validacao: Front, side, back — same lighting and poses as baseline

- campo: body_measurements
  tipo: object
  origem: Client Input
  obrigatorio: false
  validacao: |
    Optional but recommended: waist, hip, chest, arm, thigh (cm)

- campo: training_log
  tipo: array[object]
  origem: Client Input ou App
  obrigatorio: false
  validacao: |
    Exercises performed, weights used, RPE/RIR reported

- campo: mood_journal
  tipo: string
  origem: Client Input
  obrigatorio: false
  validacao: Free text — como se sentiu na semana

- campo: previous_checkins
  tipo: array[object]
  origem: Data Store (historico)
  obrigatorio: false
  validacao: All previous check-in data for trend analysis

**Saida:**
- campo: checkin_record
  tipo: object
  destino: Data Store (clients/{id}/checkins/{date}.json)
  persistido: true

- campo: trend_analysis
  tipo: object
  destino: Data Store (clients/{id}/checkins/trends.json)
  persistido: true

- campo: coach_report
  tipo: markdown
  destino: Data Store (clients/{id}/checkins/{date}-report.md)
  persistido: true

- campo: alerts
  tipo: array[object]
  destino: Notification System
  persistido: true

- campo: comparison_images
  tipo: object
  destino: Data Store (clients/{id}/checkins/{date}-comparison.png)
  persistido: true
```

---

## Pre-Conditions

```yaml
pre-conditions:
  - [ ] Cliente possui plano ativo (treino e/ou dieta)
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que existe pelo menos um plano ativo para o cliente
    error_message: "Pre-condition failed: Cliente sem plano ativo"

  - [ ] Canal de comunicacao configurado para envio do formulario
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que WhatsApp ou email esta configurado
    error_message: "Pre-condition failed: Canal de comunicacao nao configurado"

  - [ ] Baseline de dados existe (pelo menos intake ou check-in anterior)
    tipo: pre-condition
    blocker: false
    validacao: |
      Se primeiro check-in, usar dados do intake como baseline
    error_message: "Warning: Sem baseline anterior, usando dados do intake"

  - [ ] Scheduler configurado para disparo semanal
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que automation-engineer tem trigger semanal ativo
    error_message: "Pre-condition failed: Scheduler nao configurado"
```

---

## Post-Conditions

```yaml
post-conditions:
  - [ ] Check-in registrado com timestamp e todos os dados recebidos
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que checkin_record foi salvo com data e dados completos
    error_message: "Post-condition failed: Check-in nao registrado"

  - [ ] Analise de tendencia atualizada com novo datapoint
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que trend_analysis foi recalculado incluindo check-in atual
    error_message: "Post-condition failed: Tendencia nao atualizada"

  - [ ] Report do coach gerado e entregue
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que coach_report foi gerado e notificacao enviada
    error_message: "Post-condition failed: Report do coach nao gerado"

  - [ ] Alertas processados e enviados (se aplicavel)
    tipo: post-condition
    blocker: false
    validacao: |
      Se alertas detectados, verificar que notificacoes foram enviadas
    error_message: "Warning: Alertas detectados mas notificacao falhou"
```

---

## Acceptance Criteria

```yaml
acceptance-criteria:
  - [ ] AC-1: Formulario de check-in enviado e dados coletados com sucesso
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que checkin_data foi recebido com campos obrigatorios preenchidos
    error_message: "AC-1 nao atendido: Dados de check-in nao coletados"

  - [ ] AC-2: Comparacao de peso com media movel de 7 dias calculada
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que trend_analysis contem rolling_average_7d para peso
    error_message: "AC-2 nao atendido: Media movel nao calculada"

  - [ ] AC-3: Alertas disparados para anomalias detectadas
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que sistema de alertas processou os dados e gerou notificacoes quando necessario
    error_message: "AC-3 nao atendido: Sistema de alertas nao processou dados"

  - [ ] AC-4: Fotos comparativas geradas (side-by-side com baseline)
    tipo: acceptance-criterion
    blocker: false
    validacao: |
      Assert que comparison_images foi gerado quando fotos fornecidas
    error_message: "AC-4 nao atendido: Comparativo de fotos nao gerado"

  - [ ] AC-5: Report do coach inclui recomendacao de acao (manter/ajustar)
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que coach_report contem recommendation field
    error_message: "AC-5 nao atendido: Recomendacao de acao ausente no report"
```

---

## Tools

- **Tool:** progress-comparator
  - **Purpose:** Comparar fotos, medidas e metricas entre check-ins
  - **Source:** squads/fitcoach/tools/progress-comparator

- **Tool:** gamification-engine
  - **Purpose:** Atualizar pontos, streaks e achievements baseado no check-in
  - **Source:** squads/fitcoach/tools/gamification-engine

---

## SEQUENTIAL Task Execution (Nao prosseguir ate a Task atual estar completa)

### Step 0: Trigger e Envio do Formulario

- Scheduler dispara check-in no dia/horario configurado
- Enviar formulario de check-in via canal preferido do cliente
- Formulario contem:
  - Peso atual (obrigatorio)
  - Aderencia ao treino: % de sessoes completadas (obrigatorio)
  - Aderencia a dieta: escala 1-10 ou % (obrigatorio)
  - Bem-estar subjetivo: escala 1-10 (obrigatorio)
  - Qualidade do sono: escala 1-10 (obrigatorio)
  - Nivel de stress: escala 1-10 (obrigatorio)
  - Fotos de progresso (opcional)
  - Medidas corporais (opcional)
  - Log de treino da semana (opcional)
  - Diario: como se sentiu, dificuldades, vitorias (opcional)

```yaml
step_0:
  name: "Trigger e Envio do Formulario"
  executor: automation-engineer
  channel: [whatsapp, email]
  duration_expected: "1-2 min (envio)"
  schedule:
    frequency: weekly
    day: "{config.checkin_day || 'sunday'}"
    time: "{config.checkin_time || '08:00'}"
  wait_for_response: true
  timeout: "48h"
  reminder_schedule:
    - after: "12h"
      message: "Lembrete: seu check-in semanal esta pendente"
    - after: "24h"
      message: "Ultimo lembrete: precisamos do seu check-in para acompanhar seu progresso"
```

### Step 1: Coleta e Validacao dos Dados

#### 1.1 Receber e Validar Dados

- Receber resposta do formulario
- Validar campos obrigatorios
- Normalizar dados (converter unidades se necessario)
- Se dados incompletos: solicitar complemento automaticamente
- Registrar timestamp do check-in

```yaml
step_1_1:
  name: "Validacao dos Dados"
  executor: progress-tracker
  duration_expected: "2-3 min"
  validation_rules:
    required:
      - current_weight: "range [30-250] kg"
      - adherence_training: "range [0-100] %"
      - adherence_diet: "range [1-10] or [0-100] %"
      - wellbeing: "range [1-10]"
      - sleep_quality: "range [1-10]"
      - stress_level: "range [1-10]"
    optional:
      - photos: "image format valid"
      - measurements: "positive numbers in cm"
      - training_log: "array of exercises"
      - mood_journal: "text"
  on_incomplete: "request_missing_fields"
  on_valid: "proceed_to_analysis"
```

#### 1.2 Processar Fotos (se fornecidas)

- Receber fotos de progresso
- Gerar comparativo side-by-side com:
  - Baseline (intake)
  - Ultimo check-in
  - 4 semanas atras
  - 12 semanas atras (se disponivel)
- Padronizar iluminacao/contraste para comparacao justa
- Salvar com timestamp e metadata

```yaml
step_1_2:
  name: "Processar Fotos"
  executor: progress-tracker
  tool: progress-comparator
  duration_expected: "3-5 min"
  comparisons:
    - type: "side_by_side"
      left: "current"
      right: "baseline"
      label: "Progresso Total"
    - type: "side_by_side"
      left: "current"
      right: "last_checkin"
      label: "Progresso Semanal"
    - type: "timeline"
      images: "all_checkins"
      label: "Evolucao Completa"
  output: comparison_images
  condition: "photos provided"
```

### Step 2: Analise de Tendencias

#### 2.1 Analise de Peso

- Calcular media movel de 7 dias (se pesagens diarias disponiveis)
- Calcular variacao semanal: (peso_atual - peso_semana_anterior)
- Calcular variacao total: (peso_atual - peso_baseline)
- Calcular taxa de variacao: kg/semana
- Comparar com taxa esperada baseada no objetivo:
  - **Bulk:** +0.2 a +0.5 kg/semana (intermediarios)
  - **Cut:** -0.5 a -1.0 kg/semana (dependendo do deficit)
  - **Recomp:** +/- 0.2 kg/semana (peso relativamente estavel)

```yaml
step_2_1:
  name: "Analise de Peso"
  executor: progress-tracker
  duration_expected: "3-5 min"
  metrics:
    current_weight: "Peso atual"
    rolling_average_7d: "Media movel 7 dias"
    weekly_change: "Variacao semanal (kg)"
    total_change: "Variacao total desde baseline (kg)"
    rate_of_change: "Taxa de variacao (kg/semana)"
    expected_rate: "Taxa esperada para o objetivo"
    rate_deviation: "Desvio da taxa esperada (%)"
  thresholds:
    bulk_too_fast: "> 0.7 kg/semana"
    bulk_too_slow: "< 0.1 kg/semana por 2+ semanas"
    cut_too_fast: "> 1.2 kg/semana por 2+ semanas"
    cut_stalled: "< 0.2 kg/semana por 3+ semanas"
  output: weight_analysis
```

#### 2.2 Analise de Aderencia

- Calcular media de aderencia (treino + dieta) da semana
- Comparar com semanas anteriores (tendencia)
- Identificar padroes:
  - Queda gradual de aderencia (fadiga, desmotivacao)
  - Aderencia alta mas sem resultados (protocolo inadequado)
  - Aderencia oscilante (problemas de rotina/disciplina)

```yaml
step_2_2:
  name: "Analise de Aderencia"
  executor: progress-tracker
  duration_expected: "3-5 min"
  metrics:
    training_adherence_current: "Aderencia treino esta semana (%)"
    diet_adherence_current: "Aderencia dieta esta semana (%)"
    training_adherence_trend: "Tendencia ultimas 4 semanas"
    diet_adherence_trend: "Tendencia ultimas 4 semanas"
    combined_adherence: "Media ponderada treino (60%) + dieta (40%)"
  patterns:
    declining: "Aderencia caindo > 10% em 2+ semanas"
    inconsistent: "Variacao > 20% entre semanas"
    high_no_results: "Aderencia > 90% mas sem progresso por 3+ semanas"
  output: adherence_analysis
```

#### 2.3 Analise de Bem-Estar e Recovery

- Compilar scores de bem-estar, sono e stress
- Calcular indice de recovery composto:
  - Recovery Score = (wellbeing * 0.3 + sleep * 0.4 + (10 - stress) * 0.3) / 10
  - Score < 5: ALERTA — recovery comprometido
  - Score 5-7: ATENCAO — monitorar
  - Score > 7: OK — recovery adequado
- Correlacionar com performance no treino

```yaml
step_2_3:
  name: "Analise de Recovery"
  executor: progress-tracker
  duration_expected: "3-5 min"
  recovery_score:
    formula: "(wellbeing * 0.3 + sleep * 0.4 + (10 - stress) * 0.3)"
    scale: "0-10"
    thresholds:
      critical: "<4 — Parar e avaliar"
      warning: "4-5 — Reduzir volume/intensidade"
      attention: "5-7 — Monitorar proxima semana"
      good: "7-10 — Progresso normal"
  output: recovery_analysis
```

#### 2.4 Analise de Performance (Training Log)

- Se training log fornecido:
  - Comparar cargas com semana anterior
  - Calcular volume total (sets * reps * weight)
  - Identificar PRs (personal records)
  - Identificar regressao de forca (alerta)
- Correlacionar com recovery score e aderencia

```yaml
step_2_4:
  name: "Analise de Performance"
  executor: progress-tracker
  duration_expected: "5-8 min"
  condition: "training_log provided"
  metrics:
    total_volume: "Sum(sets * reps * weight) por sessao"
    volume_change: "Variacao vs semana anterior (%)"
    personal_records: "Novos PRs esta semana"
    strength_regression: "Exercicios com queda de carga > 5%"
    estimated_1rm: "1RM estimado para compostos principais"
  output: performance_analysis
```

### Step 3: Geracao de Alertas

#### 3.1 Sistema de Alertas Automaticos

Processar dados analisados e gerar alertas quando thresholds sao atingidos:

**ALERTAS VERMELHOS (Acao imediata):**
- Perda de peso > 1.5kg/semana por 2+ semanas (risco de perda muscular)
- Recovery score < 4 por 2+ semanas consecutivas
- Aderencia < 50% por 2+ semanas
- Relato de dor/lesao nova
- Sinais de disturbio alimentar (score de relacao com comida < 3)

**ALERTAS AMARELOS (Atencao):**
- Peso estagnado por 3+ semanas (plateau)
- Aderencia caindo gradualmente (> 10% queda em 3 semanas)
- Recovery score 4-5 por 2+ semanas
- Forca regredindo em compostos principais
- Cliente relata insatisfacao ou desmotivacao

**ALERTAS VERDES (Informativo):**
- Novo PR atingido (celebrar!)
- Meta intermediaria atingida (milestone)
- Streak de aderencia (4+ semanas > 90%)
- Melhoria consistente em composicao corporal

```yaml
step_3_1:
  name: "Sistema de Alertas"
  executor: progress-tracker
  duration_expected: "3-5 min"
  alert_levels:
    red:
      severity: CRITICAL
      notification: [coach_immediate, client_if_configured]
      action_required: true
      triggers:
        - "weight_loss_rate > 1.5 kg/week for 2+ weeks"
        - "recovery_score < 4 for 2+ weeks"
        - "adherence < 50% for 2+ weeks"
        - "injury_reported == true"
    yellow:
      severity: WARNING
      notification: [coach_report]
      action_required: false
      triggers:
        - "weight_stalled for 3+ weeks"
        - "adherence_declining > 10% over 3 weeks"
        - "recovery_score 4-5 for 2+ weeks"
        - "strength_regression detected"
    green:
      severity: INFO
      notification: [coach_report, client_celebration]
      action_required: false
      triggers:
        - "personal_record achieved"
        - "milestone_reached"
        - "adherence_streak >= 4 weeks at > 90%"
  output: alerts
```

### Step 4: Geracao do Report para o Coach

#### 4.1 Compilacao do Report

Gerar report estruturado com todos os dados e analises:

**Estrutura do Report:**
```
# Check-in Semanal — {client_name} — {date}

## Resumo Executivo
- Status Geral: {GREEN|YELLOW|RED}
- Peso: {current} kg ({change} vs semana anterior)
- Aderencia: Treino {training_adherence}% | Dieta {diet_adherence}%
- Recovery Score: {score}/10

## Alertas
{lista de alertas por prioridade}

## Metricas Detalhadas
### Peso e Composicao
{graficos de tendencia}

### Aderencia
{historico de aderencia}

### Performance
{PRs, volume, progressao}

### Bem-Estar
{scores de recovery, sono, stress}

## Comparativo de Fotos
{side-by-side images}

## Recomendacao
- [ ] Manter protocolo atual
- [ ] Ajustar {especificar area}
- [ ] Trigger adjust-protocol task
```

```yaml
step_4_1:
  name: "Compilacao do Report"
  executor: progress-tracker
  duration_expected: "5-10 min"
  sections:
    - executive_summary
    - alerts
    - weight_metrics
    - adherence_metrics
    - performance_metrics
    - wellbeing_metrics
    - photo_comparison
    - recommendation
  output: coach_report
```

#### 4.2 Envio do Report ao Coach

- Enviar report via canal preferido do coach (email, WhatsApp, dashboard)
- Se alertas vermelhos: enviar notificacao push imediata
- Se alertas amarelos: incluir destaque no report
- Se tudo verde: envio normal no horario configurado

```yaml
step_4_2:
  name: "Envio do Report"
  executor: automation-engineer
  duration_expected: "1-2 min"
  delivery:
    red_alerts: "immediate push notification + report"
    yellow_alerts: "report with highlighted warnings"
    green: "standard report delivery"
  channels:
    - email: "Report completo com graficos"
    - whatsapp: "Resumo executivo + link para report completo"
    - dashboard: "Report integrado ao painel do coach"
  output: report_delivered
```

### Step 5: Atualizar Gamificacao

#### 5.1 Processar Pontos e Achievements

- Atualizar pontos baseado no check-in:
  - Check-in completado: +50 pontos
  - Fotos incluidas: +20 pontos bonus
  - Aderencia > 90%: +30 pontos bonus
  - Novo PR: +100 pontos
  - Milestone atingido: +200 pontos
- Atualizar streaks:
  - Check-in streak: +1 (reset se miss)
  - Aderencia streak: +1 se > 80%
- Verificar achievements desbloqueados
- Atualizar leaderboard

```yaml
step_5_1:
  name: "Atualizar Gamificacao"
  executor: progress-tracker
  tool: gamification-engine
  duration_expected: "2-3 min"
  points:
    checkin_completed: 50
    photos_included: 20
    adherence_above_90: 30
    personal_record: 100
    milestone_reached: 200
  streaks:
    checkin: "consecutive weeks with check-in"
    adherence: "consecutive weeks with adherence > 80%"
  output: gamification_update
```

### Step 6: Decisao de Routing pos-Check-in

- Baseado na analise, decidir proximo passo:
  - **Manter:** Tudo dentro do esperado, continuar protocolo atual
  - **Ajustar:** Triggers de ajuste detectados, iniciar adjust-protocol task
  - **Escalar:** Alertas criticos, escalar para coach imediatamente
  - **Celebrar:** Milestone atingido, enviar mensagem de celebracao

```yaml
step_6:
  name: "Decisao de Routing"
  executor: progress-tracker
  duration_expected: "1-2 min"
  routing_matrix:
    maintain:
      condition: "no alerts OR only green alerts"
      action: "schedule next weekly check-in"
    adjust:
      condition: "yellow alerts OR stagnation detected"
      action: "trigger adjust-protocol task"
    escalate:
      condition: "red alerts detected"
      action: "immediate coach notification + pause automation"
    celebrate:
      condition: "milestone OR PR achieved"
      action: "send celebration message + gamification reward"
  output: routing_decision
```

---

## Error Handling

**Strategy:** retry + graceful_degradation

**Common Errors:**

1. **Error:** Cliente Nao Respondeu ao Check-in
   - **Cause:** Timeout de 48h atingido sem resposta
   - **Resolution:** Enviar reminders, notificar coach para follow-up
   - **Recovery:** Registrar check-in como "missed", atualizar streak

2. **Error:** Dados Parciais Recebidos
   - **Cause:** Cliente preencheu apenas campos parciais
   - **Resolution:** Processar dados disponiveis, solicitar complemento
   - **Recovery:** Gerar report parcial com nota de dados incompletos

3. **Error:** Fotos em Formato Invalido
   - **Cause:** Imagem corrompida ou formato nao suportado
   - **Resolution:** Solicitar re-envio com instrucoes de formato
   - **Recovery:** Gerar report sem comparativo de fotos

4. **Error:** Falha na Entrega do Report
   - **Cause:** Canal de comunicacao indisponivel
   - **Resolution:** Tentar canal alternativo
   - **Recovery:** Salvar report localmente, retry na proxima hora

5. **Error:** Calculo de Tendencia Insuficiente
   - **Cause:** Menos de 3 check-ins para calcular tendencia
   - **Resolution:** Usar dados disponiveis, marcar como "insufficient data"
   - **Recovery:** Report com nota de que tendencia sera mais confiavel apos mais dados

---

## Performance

**Expected Metrics:**

```yaml
duration_expected: "10-20 min (processamento apos receber dados)"
cost_estimated: "$0.005-0.02"
token_usage: "~3,000-8,000 tokens"
client_response_time: "1-48h (variavel)"
recurring: "weekly"
```

---

## Metadata

```yaml
task_id: FC-TASK-004
name: weekly-checkin
version: 1.0.0
squad: fitcoach
dependencies:
  - client-intake (FC-TASK-001, para baseline)
  - automation-engineer (trigger semanal)
  - progress-tracker (processamento)
  - progress-comparator (tool)
  - gamification-engine (tool)
tags:
  - tracking
  - monitoring
  - recurring
  - automation
  - progress
updated_at: 2026-03-11
```

---

## Handoff

```yaml
next_task:
  maintain:
    task: "weekly-checkin"
    schedule: "next_week"
    condition: "Sem alertas ou apenas alertas verdes"
  adjust:
    task: "adjust-protocol"
    condition: "Alertas amarelos ou estagnacao detectada"
  escalate:
    action: "notify_coach_immediately"
    condition: "Alertas vermelhos detectados"
```
