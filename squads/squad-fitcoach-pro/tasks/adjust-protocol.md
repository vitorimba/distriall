<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: adjust-protocol
  task_name: Adjust Protocol
  status: active
  responsible_executor: 'AI + coach (Hybrid)'
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
- AI gera sugestoes de ajuste e aplica automaticamente apos aprovacao
- **Melhor para:** Ajustes menores (progressao de carga, micro-ajuste de macros)

### 2. Interactive Mode - Balanceado, Educativo (5-10 prompts) **[DEFAULT]**
- Checkpoints em cada decisao de ajuste
- Coach participa ativamente das decisoes
- **Melhor para:** Ajustes significativos, mudanca de fase, stagnacao prolongada

### 3. Pre-Flight Planning - Planejamento Completo Antecipado
- Analise profunda de todos os dados antes de sugerir
- Cross-reference com historico completo
- **Melhor para:** Mudanca de protocolo completa, transicao de fase (bulk→cut)

**Parameter:** `mode` (optional, default: `interactive`)

---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: adjustProtocol()
id: FC-TASK-005
responsavel: AI sugere, coach aprova
responsavel_type: Hybrid
squad: fitcoach
pattern_prefix: FC
atomic_layer: Organism

advisors:
  - hypertrophy-scientist (Mike Israetel) — Ajustes de volume e intensidade
  - nutrition-scientist (Layne Norton) — Ajustes de macros, reverse diet, refeeds
  - periodization-architect (Tudor Bompa) — Mudancas de periodizacao
  - biomechanics-coach (Charles Glass) — Substituicao de exercicios
  - elite-coach (Matt Jansen) — Ajustes de intensity techniques

**Entrada:**
- campo: client_id
  tipo: string
  origem: System / weekly-checkin trigger
  obrigatorio: true
  validacao: Must reference existing client profile

- campo: progress_data
  tipo: object
  origem: weekly-checkin trend_analysis
  obrigatorio: true
  validacao: |
    Must contain: weight_analysis, adherence_analysis, recovery_analysis,
    performance_analysis (if available)

- campo: alerts
  tipo: array[object]
  origem: weekly-checkin alerts
  obrigatorio: false
  validacao: Active alerts triggering this adjustment

- campo: current_training_plan
  tipo: object
  origem: Data Store (clients/{id}/plans/training/)
  obrigatorio: true
  validacao: Active training plan with current mesocycle data

- campo: current_diet_plan
  tipo: object
  origem: Data Store (clients/{id}/plans/nutrition/)
  obrigatorio: true
  validacao: Active diet plan with current macro targets

- campo: adjustment_type
  tipo: enum [auto_triggered, coach_requested, phase_transition]
  origem: System / Coach Input
  obrigatorio: true
  validacao: Must be valid enum

- campo: checkin_history
  tipo: array[object]
  origem: Data Store (all check-ins)
  obrigatorio: true
  validacao: Minimum 2 check-ins for trend analysis

**Saida:**
- campo: adjustment_report
  tipo: object
  destino: Data Store (clients/{id}/adjustments/{date}.json)
  persistido: true

- campo: updated_training_plan
  tipo: object
  destino: Data Store (clients/{id}/plans/training/)
  persistido: true (after approval)

- campo: updated_diet_plan
  tipo: object
  destino: Data Store (clients/{id}/plans/nutrition/)
  persistido: true (after approval)

- campo: adjustment_rationale
  tipo: markdown
  destino: Data Store (clients/{id}/adjustments/{date}-rationale.md)
  persistido: true

- campo: coach_approval
  tipo: object
  destino: Memory
  persistido: false
```

---

## Pre-Conditions

```yaml
pre-conditions:
  - [ ] Minimo 2 check-ins registrados para analise de tendencia
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que checkin_history tem pelo menos 2 entries
    error_message: "Pre-condition failed: Dados insuficientes para ajuste (minimo 2 check-ins)"

  - [ ] Plano atual ativo e documentado
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que current_training_plan e current_diet_plan existem
    error_message: "Pre-condition failed: Plano atual nao encontrado"

  - [ ] Motivo do ajuste documentado (trigger ou request)
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que adjustment_type esta definido com contexto
    error_message: "Pre-condition failed: Motivo do ajuste nao documentado"
```

---

## Post-Conditions

```yaml
post-conditions:
  - [ ] Sugestoes de ajuste geradas com justificativa cientifica
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que adjustment_report contem suggestions com rationale
    error_message: "Post-condition failed: Sugestoes sem justificativa"

  - [ ] Coach aprovou ou ajustou as sugestoes
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que coach_approval esta registrada
    error_message: "Post-condition failed: Aprovacao do coach ausente"

  - [ ] Plano atualizado e salvo
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que planos atualizados foram persistidos
    error_message: "Post-condition failed: Plano atualizado nao salvo"

  - [ ] Cliente notificado das mudancas
    tipo: post-condition
    blocker: false
    validacao: |
      Verificar que notificacao foi enviada ao cliente
    error_message: "Warning: Cliente nao notificado das mudancas"
```

---

## Acceptance Criteria

```yaml
acceptance-criteria:
  - [ ] AC-1: Analise de progressao completa com identificacao clara do problema/oportunidade
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que adjustment_report contem problem_identification com dados de suporte
    error_message: "AC-1 nao atendido: Problema nao identificado claramente"

  - [ ] AC-2: Sugestoes de ajuste baseadas em consultoria dos advisors relevantes
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que cada sugestao referencia advisor e principio cientifico
    error_message: "AC-2 nao atendido: Sugestoes sem base dos advisors"

  - [ ] AC-3: Coach revisou e aprovou as mudancas antes de aplicar
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que coach_approval existe com timestamp
    error_message: "AC-3 nao atendido: Mudancas aplicadas sem aprovacao"

  - [ ] AC-4: Plano atualizado entregue ao cliente com explicacao das mudancas
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que cliente recebeu plano atualizado com notas de mudanca
    error_message: "AC-4 nao atendido: Plano atualizado nao entregue"

  - [ ] AC-5: Historico de ajuste registrado para rastreabilidade
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que adjustment_report foi persistido com todos os dados
    error_message: "AC-5 nao atendido: Historico de ajuste nao registrado"
```

---

## Tools

- **Tool:** macro-calculator
  - **Purpose:** Recalcular macros e calorias para novos targets
  - **Source:** squads/fitcoach/tools/macro-calculator

- **Tool:** quality-checker
  - **Purpose:** Validar ajustes contra evidencia cientifica
  - **Source:** squads/fitcoach/tools/quality-checker

- **Tool:** training-plan-generator
  - **Purpose:** Gerar plano atualizado com mudancas aplicadas
  - **Source:** squads/fitcoach/tools/training-plan-generator

---

## SEQUENTIAL Task Execution (Nao prosseguir ate a Task atual estar completa)

### Step 0: Carregar Dados e Identificar Contexto

- Carregar todos os dados do cliente:
  - Perfil e classificacao
  - Plano de treino atual (completo)
  - Plano de dieta atual (completo)
  - Historico de check-ins (todos)
  - Alertas ativos
  - Ajustes anteriores (se houverem)
- Identificar tipo de ajuste necessario

```yaml
step_0:
  name: "Carregar Dados e Contexto"
  executor: training-builder + diet-builder
  duration_expected: "3-5 min"
  data_loading:
    - client_profile
    - classification_report
    - current_training_plan
    - current_diet_plan
    - checkin_history (all)
    - active_alerts
    - previous_adjustments
  output: adjustment_context
```

### Step 1: Analise de Progressao e Identificacao de Problemas

#### 1.1 Diagnostico de Estagnacao/Regressao

Analisar dados de tendencia para identificar tipo de problema:

**Tipo 1: Plateau de Peso (Estagnacao)**
- Peso estavel por 3+ semanas apesar de aderencia > 80%
- Possivel causa: adaptacao metabolica, volume insuficiente, calorias imprecisas
- Verificar: peso medio (nao pontual), tendencia de medidas, fotos

**Tipo 2: Perda de Forca**
- Regressao em cargas de exercicios compostos por 2+ semanas
- Possivel causa: overreaching, deficit muito agressivo, recovery insuficiente
- Verificar: recovery score, aderencia dieta, horas de sono

**Tipo 3: Aderencia em Queda**
- Aderencia caindo progressivamente (>10% em 3 semanas)
- Possivel causa: protocolo muito restritivo, fadiga psicologica, vida pessoal
- Verificar: feedback subjetivo, complexidade do plano, flexibilidade da dieta

**Tipo 4: Recovery Comprometido**
- Recovery score < 5 por 2+ semanas
- Possivel causa: volume excessivo, stress externo, sono inadequado
- Verificar: volume total, frequencia, indicadores de stress

**Tipo 5: Progressao Normal — Transicao de Fase**
- Objetivos do mesociclo/fase atual alcancados
- Necessidade de progredir para proxima fase do macrociclo
- Verificar: milestones atingidos, readiness para proxima fase

```yaml
step_1_1:
  name: "Diagnostico de Problema"
  executor: training-builder + diet-builder
  duration_expected: "8-12 min"
  diagnostic_matrix:
    weight_plateau:
      indicators: ["weight_stalled_3w", "adherence_above_80"]
      priority: HIGH
    strength_loss:
      indicators: ["compound_regression_2w", "recovery_low"]
      priority: CRITICAL
    adherence_decline:
      indicators: ["adherence_drop_10pct_3w"]
      priority: HIGH
    recovery_compromised:
      indicators: ["recovery_score_below_5_2w"]
      priority: CRITICAL
    phase_transition:
      indicators: ["milestones_achieved", "mesocycle_complete"]
      priority: MEDIUM
  output: problem_diagnosis
```

### Step 2: Consultar Advisors para Ajustes de Treino

#### 2.1 Ajustes de Volume (Israetel)

Consultar hypertrophy-scientist para ajustes de volume baseados no diagnostico:

**Se Plateau + Aderencia Alta:**
- Aumentar volume em 2-4 sets/semana para grupos alvo
- Manter se proximo ao MRV, considerar deload + reinicio
- Adicionar variacao de estimulo (exercicios diferentes)

**Se Overreaching/Forca Caindo:**
- Reduzir volume para proximo do MEV por 1-2 semanas
- Deload imediato se indicadores criticos
- Reavaliar MRV individual do cliente (pode estar mais baixo que o generico)

**Se Transicao de Fase:**
- Progredir volume conforme periodizacao planejada
- Ajustar MEV/MAV/MRV baseado na resposta do cliente ate agora

```yaml
step_2_1:
  name: "Ajustes de Volume (Israetel)"
  executor: training-builder
  advisor: hypertrophy-scientist
  duration_expected: "5-8 min"
  adjustments_by_scenario:
    plateau:
      action: "increase_volume"
      amount: "2-4 sets/week per lagging muscle"
      limit: "do not exceed MRV"
    overreaching:
      action: "reduce_volume"
      target: "near MEV for 1-2 weeks"
      then: "gradually rebuild"
    phase_transition:
      action: "follow_periodization"
      reference: "mesocycle_structure"
  output: volume_adjustments
```

#### 2.2 Ajustes de Exercicios (Glass)

Consultar biomechanics-coach para substituicoes de exercicios:

- Substituir exercicios que nao estao gerando progressao
- Ajustar angulacoes para novo estimulo
- Considerar exercicios com diferente curva de resistencia
- Adaptar para novas restricoes (se lesao surgiu)

```yaml
step_2_2:
  name: "Ajustes de Exercicios (Glass)"
  executor: training-builder
  advisor: biomechanics-coach
  duration_expected: "5-8 min"
  criteria:
    - "Exercicio estagnado por 3+ semanas: substituir"
    - "Novo desconforto articular: substituir por variacao segura"
    - "Grupo muscular nao respondendo: mudar angulacao/tipo"
  output: exercise_adjustments
```

#### 2.3 Ajustes de Periodizacao (Bompa)

Consultar periodization-architect para ajustes de macrociclo:

- Se mesociclo atual nao esta gerando adaptacao: mudar modelo
- Se deload nao esta sendo suficiente: estender ou intensificar
- Se cliente progrediu de nivel: atualizar periodizacao

```yaml
step_2_3:
  name: "Ajustes de Periodizacao (Bompa)"
  executor: training-builder
  advisor: periodization-architect
  duration_expected: "5-8 min"
  scenarios:
    model_change:
      from: "linear"
      to: "undulating"
      reason: "Plateaus frequentes em modelo linear"
    deload_adjustment:
      frequency: "Reduzir de 5 para 4 semanas"
      intensity: "Aumentar reducao de volume (60% → 50%)"
    level_upgrade:
      from: "intermediate"
      to: "advanced"
      changes: ["periodization model", "volume targets", "technique selection"]
  output: periodization_adjustments
```

### Step 3: Consultar Advisors para Ajustes Nutricionais

#### 3.1 Ajustes de Calorias e Macros (Norton)

Consultar nutrition-scientist para ajustes nutricionais:

**Se Plateau de Peso em Cut:**
- Verificar se adaptacao metabolica ocorreu
- Opcoes Norton:
  1. Reduzir calorias em 100-200 kcal (se ainda tem margem)
  2. Implementar diet break de 1-2 semanas em manutencao
  3. Adicionar refeed days (1-2x/semana)
  4. Aumentar NEAT (passos diarios, cardio leve)

**Se Plateau de Peso em Bulk:**
- Verificar se superavit e real (tracking preciso?)
- Opcoes:
  1. Aumentar calorias em 100-200 kcal
  2. Focar em timing de carboidratos peri-workout
  3. Avaliar qualidade das calorias vs quantidade

**Se Aderencia Baixa na Dieta:**
- Aumentar flexibilidade (mais IIFYM, menos alimentos rigidos)
- Incluir mais alimentos de prazer dentro dos macros
- Simplificar o plano (menos refeicoes, porcoes mais faceis)

**Se Recovery Comprometido:**
- Verificar proteina (pode precisar aumentar)
- Verificar carboidratos (pode estar muito baixo para volume de treino)
- Verificar hidratacao e micronutrientes

```yaml
step_3_1:
  name: "Ajustes Nutricionais (Norton)"
  executor: diet-builder
  advisor: nutrition-scientist
  duration_expected: "8-12 min"
  adjustments_by_scenario:
    cut_plateau:
      options:
        - "Reduce calories 100-200 kcal"
        - "Implement diet break 1-2 weeks"
        - "Add refeed days 1-2x/week"
        - "Increase NEAT (steps, low intensity cardio)"
      selection_criteria: "Duration of current diet, deficit severity, adherence level"
    bulk_plateau:
      options:
        - "Increase calories 100-200 kcal"
        - "Optimize peri-workout nutrition"
        - "Audit tracking accuracy"
    adherence_low:
      options:
        - "Increase diet flexibility (80/20 IIFYM)"
        - "Simplify meal plan"
        - "Include pleasure foods within macros"
    recovery_issue:
      options:
        - "Increase protein if below 2g/kg"
        - "Increase carbs if below 3g/kg"
        - "Review hydration and micronutrients"
  output: nutrition_adjustments
```

### Step 4: Compilar Sugestoes de Ajuste

#### 4.1 Gerar Adjustment Report

Compilar todas as sugestoes dos advisors em um report unico e coerente:

```
# Adjustment Report — {client_name} — {date}

## Diagnostico
- Problema identificado: {problem_type}
- Dados de suporte: {metrics}
- Duracao do problema: {weeks}

## Sugestoes de Ajuste

### Treino
1. {ajuste_volume} — Advisor: Israetel — Justificativa: {rationale}
2. {ajuste_exercicio} — Advisor: Glass — Justificativa: {rationale}
3. {ajuste_periodizacao} — Advisor: Bompa — Justificativa: {rationale}

### Nutricao
1. {ajuste_calorias} — Advisor: Norton — Justificativa: {rationale}
2. {ajuste_macros} — Advisor: Norton — Justificativa: {rationale}

### Timeline
- Implementar ajustes: imediatamente / proximo mesociclo
- Reavaliar: proximo check-in / em 2 semanas / em 4 semanas

## Impacto Esperado
- Resultado esperado em {weeks} semanas: {expected_outcome}
```

```yaml
step_4_1:
  name: "Compilar Adjustment Report"
  executor: training-builder + diet-builder
  duration_expected: "5-8 min"
  output: adjustment_report
```

### Step 5: Aprovacao do Coach

#### 5.1 Apresentar Sugestoes ao Coach

- Enviar adjustment report ao coach
- Coach pode:
  - **Aprovar tudo:** Aplicar todas as sugestoes como recomendado
  - **Aprovar parcial:** Selecionar quais ajustes implementar
  - **Modificar:** Ajustar valores especificos (ex: reduzir 100kcal ao inves de 200)
  - **Rejeitar:** Manter protocolo atual (com justificativa)
  - **Solicitar mais dados:** Pedir analise adicional antes de decidir

```yaml
step_5_1:
  name: "Aprovacao do Coach"
  executor: human (coach)
  duration_expected: "5-15 min"
  approval_options:
    approve_all:
      action: "Aplicar todas as sugestoes"
    approve_partial:
      action: "Selecionar sugestoes especificas"
      requires: "lista de sugestoes aprovadas"
    modify:
      action: "Ajustar valores especificos"
      requires: "valores modificados pelo coach"
    reject:
      action: "Manter protocolo atual"
      requires: "justificativa"
    request_more_data:
      action: "Solicitar analise adicional"
      requires: "especificar que dados"
  output: coach_approval
```

### Step 6: Aplicar Ajustes e Notificar

#### 6.1 Aplicar Mudancas nos Planos

- Atualizar plano de treino com ajustes aprovados
- Atualizar plano de dieta com ajustes aprovados
- Manter historico: salvar versao anterior como backup
- Documentar mudancas com rationale

```yaml
step_6_1:
  name: "Aplicar Mudancas"
  executor: training-builder + diet-builder
  duration_expected: "5-10 min"
  operations:
    - backup_current_plans
    - apply_training_adjustments
    - apply_nutrition_adjustments
    - recalculate_macros_if_changed
    - regenerate_weekly_plan
    - validate_updated_plan
  output: updated_plans
```

#### 6.2 Notificar Cliente

- Enviar plano atualizado ao cliente via canal preferido
- Incluir explicacao clara das mudancas:
  - O que mudou e por que
  - O que esperar nas proximas semanas
  - Novas instrucoes especificas (se houverem)
- Tom positivo e motivacional

```yaml
step_6_2:
  name: "Notificar Cliente"
  executor: automation-engineer
  channel: [whatsapp, email]
  duration_expected: "2-3 min"
  message_template:
    subject: "Atualizacao no seu protocolo"
    content:
      - "Resumo das mudancas"
      - "Motivo (simplificado)"
      - "O que esperar"
      - "Novo plano em anexo"
  output: client_notified
```

---

## Error Handling

**Strategy:** consult_advisor + coach_override

**Common Errors:**

1. **Error:** Dados Insuficientes para Analise
   - **Cause:** Menos de 2 check-ins ou dados incompletos
   - **Resolution:** Solicitar mais dados antes de ajustar
   - **Recovery:** Agendar re-avaliacao em 1-2 semanas

2. **Error:** Sugestoes Conflitantes entre Advisors
   - **Cause:** Advisor de treino sugere aumentar volume, advisor de nutricao sugere reduzir calorias
   - **Resolution:** Priorizar baseado no problema principal, coach decide
   - **Recovery:** Escalar para coach com opcoes claramente apresentadas

3. **Error:** Coach Rejeita Todas as Sugestoes
   - **Cause:** Coach discorda das recomendacoes
   - **Resolution:** Documentar decisao, continuar monitorando
   - **Recovery:** Manter protocolo, reavaliar no proximo check-in

4. **Error:** Falha ao Gerar Plano Atualizado
   - **Cause:** Ajustes criam inconsistencia no plano
   - **Resolution:** Reconstruir plano do zero com novos parametros
   - **Recovery:** Executar create-training-plan/create-diet-plan com parametros atualizados

---

## Performance

```yaml
duration_expected: "20-35 min (analise + sugestao + aprovacao)"
cost_estimated: "$0.02-0.06"
token_usage: "~8,000-18,000 tokens"
advisor_consultations: "2-5 (depende do tipo de ajuste)"
```

---

## Metadata

```yaml
task_id: FC-TASK-005
name: adjust-protocol
version: 1.0.0
squad: fitcoach
dependencies:
  - weekly-checkin (FC-TASK-004, trigger)
  - create-training-plan (FC-TASK-002, para rebuild se necessario)
  - create-diet-plan (FC-TASK-003, para rebuild se necessario)
  - hypertrophy-scientist (advisor)
  - nutrition-scientist (advisor)
  - periodization-architect (advisor)
  - biomechanics-coach (advisor)
  - macro-calculator (tool)
  - quality-checker (tool)
tags:
  - adjustment
  - optimization
  - periodization
  - adaptation
  - coaching
updated_at: 2026-03-11
```

---

## Handoff

```yaml
next_task:
  continue:
    task: "weekly-checkin"
    schedule: "next_week"
    condition: "Ajustes aplicados, continuar monitoramento"
  rebuild:
    task: "create-training-plan + create-diet-plan"
    condition: "Mudanca de fase completa requer novo plano do zero"
  escalate:
    action: "coach_review_session"
    condition: "Multiplos ajustes sem resultado em 4+ semanas"
```
