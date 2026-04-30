<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: deload-protocol
  task_name: Deload Protocol
  status: active
  responsible_executor: 'hypertrophy-scientist + periodization-architect'
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
- AI avalia indicadores e gera protocolo de deload automaticamente
- **Melhor para:** Deloads programados (schedule-based) em clientes com historico no sistema

### 2. Interactive Mode - Balanceado, Educativo (5-10 prompts) **[DEFAULT]**
- Checkpoints na avaliacao de indicadores e escolha do tipo de deload
- Coach participa da decisao de quando e como deloadar
- **Melhor para:** Deloads reativos (baseados em indicadores), clientes novos

### 3. Pre-Flight Planning - Planejamento Completo Antecipado
- Deloads pre-planejados para todo o macrociclo
- Integrado com periodizacao de treino e nutricao
- **Melhor para:** Atletas avancados, competition prep, periodizacao formal

**Parameter:** `mode` (optional, default: `interactive`)

---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: deloadProtocol()
id: FC-TASK-011
responsavel: hypertrophy-scientist + periodization-architect
responsavel_type: Agent (multi-advisor)
squad: fitcoach
pattern_prefix: FC
atomic_layer: Organism

advisors:
  - hypertrophy-scientist (Mike Israetel) — Volume landmarks, fadiga acumulada, deload timing e magnitude
  - periodization-architect (Tudor Bompa) — Integracao com macrociclo, deload como componente de periodizacao
  - elite-coach (Matt Jansen) — Deload pratico com atletas de elite, auto-regulacao
  - nutrition-scientist (Layne Norton) — Ajuste nutricional durante deload (nao cortar calorias drasticamente)
  - injury-manager (Doc Rehab) — Quando deload e insuficiente e indicadores apontam para lesao

**Entrada:**
- campo: client_profile
  tipo: object
  origem: client-intake task output
  obrigatorio: true
  validacao: Must contain training_level, training_age, current_split

- campo: current_training_plan
  tipo: object
  origem: Data Store (clients/{id}/plans/training/)
  obrigatorio: true
  validacao: |
    Must contain: current_mesocycle, week_number, volume_per_group,
    intensity_level (RIR/RPE), exercise_list

- campo: performance_data
  tipo: object
  origem: weekly-checkin ou training logs
  obrigatorio: true
  validacao: |
    Must contain: compound_lift_trends (last 4 weeks),
    rpe_trends, pump_quality, soreness_levels

- campo: recovery_indicators
  tipo: object
  origem: weekly-checkin
  obrigatorio: true
  validacao: |
    Must contain: sleep_quality, sleep_hours, motivation_level,
    stress_level, joint_discomfort, overall_fatigue

- campo: deload_trigger
  tipo: enum [scheduled, reactive_performance, reactive_fatigue, reactive_injury, coach_decision]
  origem: System / Coach
  obrigatorio: true

- campo: sport_context
  tipo: enum [bodybuilding, powerlifting, general_fitness, athletic, competition_prep]
  origem: client_profile
  obrigatorio: true

- campo: nutrition_context
  tipo: object
  origem: current diet plan
  obrigatorio: false
  validacao: |
    Current phase (bulk/cut/maintenance), calories, deficit magnitude

**Saida:**
- campo: deload_protocol
  tipo: object
  destino: Data Store (clients/{id}/deloads/{date}.json)
  persistido: true

- campo: deload_training_plan
  tipo: object
  destino: Data Store (clients/{id}/plans/training/deload/)
  persistido: true

- campo: nutrition_during_deload
  tipo: object
  destino: Data Store (clients/{id}/nutrition/deload-adjustment.json)
  persistido: true

- campo: post_deload_plan
  tipo: object
  destino: Data Store (clients/{id}/plans/training/post-deload/)
  persistido: true
```

---

## Pre-Conditions

```yaml
pre-conditions:
  - [ ] Dados de performance das ultimas 4 semanas disponiveis
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que performance_data tem minimo 4 semanas de dados
    error_message: "Pre-condition failed: Dados de performance insuficientes (minimo 4 semanas)"

  - [ ] Plano de treino atual documentado com volume e intensidade
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que current_training_plan existe com volume e RIR/RPE
    error_message: "Pre-condition failed: Plano de treino atual nao documentado"

  - [ ] Indicadores de recovery registrados
    tipo: pre-condition
    blocker: false
    validacao: |
      Verificar que recovery_indicators tem dados recentes
    error_message: "Warning: Indicadores de recovery nao registrados — deload baseado apenas em performance"

  - [ ] Trigger de deload documentado
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que deload_trigger esta definido com contexto
    error_message: "Pre-condition failed: Motivo do deload nao documentado"
```

---

## Post-Conditions

```yaml
post-conditions:
  - [ ] Protocolo de deload completo com duracao, volume e intensidade definidos
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que deload_protocol contem type, duration, volume_target, intensity_target
    error_message: "Post-condition failed: Protocolo de deload incompleto"

  - [ ] Plano de treino da semana de deload gerado
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que deload_training_plan existe com exercicios, sets e reps
    error_message: "Post-condition failed: Plano de treino do deload nao gerado"

  - [ ] Ajuste nutricional durante deload documentado
    tipo: post-condition
    blocker: false
    validacao: |
      Verificar que nutrition_during_deload tem recomendacoes
    error_message: "Warning: Ajuste nutricional durante deload nao documentado"

  - [ ] Plano pos-deload definido (como retomar)
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que post_deload_plan define como reiniciar progressao
    error_message: "Post-condition failed: Plano pos-deload nao definido"
```

---

## Acceptance Criteria

```yaml
acceptance-criteria:
  - [ ] AC-1: Tipo de deload selecionado com justificativa baseada nos indicadores
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que deload_protocol.type e justificado por dados de performance/recovery
    error_message: "AC-1 nao atendido: Tipo de deload sem justificativa"

  - [ ] AC-2: Volume de deload adequado ao tipo (volume deload, intensity deload, full rest)
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que volume/intensidade do deload corresponde ao tipo selecionado
    error_message: "AC-2 nao atendido: Parametros de deload inconsistentes com tipo"

  - [ ] AC-3: Duracao do deload entre 3-10 dias conforme necessidade
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que duracao esta entre 3-10 dias
    error_message: "AC-3 nao atendido: Duracao fora do range adequado"

  - [ ] AC-4: Nutricao durante deload nao em deficit agressivo
    tipo: acceptance-criterion
    blocker: false
    validacao: |
      Assert que calorias durante deload nao sao reduzidas vs fase normal (exceto se em cut moderado)
    error_message: "AC-4 nao atendido: Calorias reduzidas demais durante deload"

  - [ ] AC-5: Plano pos-deload define como retomar volume e intensidade
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que post_deload_plan tem volume inicial (MEV) e progressao definida
    error_message: "AC-5 nao atendido: Retomada pos-deload nao planejada"

  - [ ] AC-6: Sport-specific considerations aplicadas
    tipo: acceptance-criterion
    blocker: false
    validacao: |
      Assert que protocolo considera contexto esportivo (bodybuilding vs powerlifting vs general)
    error_message: "AC-6 nao atendido: Contexto esportivo nao considerado"
```

---

## Tools

- **Tool:** training-plan-generator
  - **Purpose:** Gerar plano de treino reduzido para semana de deload
  - **Source:** squads/fitcoach/tools/training-plan-generator

- **Tool:** quality-checker
  - **Purpose:** Validar que deload atinge reducao adequada de estimulo
  - **Source:** squads/fitcoach/tools/quality-checker

---

## Veto Conditions

| ID | Condicao | Acao | Severidade |
|----|----------|------|------------|
| FC_DL_V001 | Performance declinando por 2+ semanas consecutivas E nenhum deload planejado | BLOCK continuacao do programa + implementar deload imediatamente. Treinar em overreaching cronico sem deload leva a overtraining e lesao. | NON-NEGOTIABLE |
| FC_DL_V002 | Deload planejado durante peak week de competicao | BLOCK — Peak week tem protocolo proprio. Deload tradicional nao se aplica a ultima semana pre-competicao. Redirecionar para competition-prep task. | NON-NEGOTIABLE |
| FC_DL_V003 | Pular deload para "nao perder ganhos" quando indicadores estao todos negativos | BLOCK + educar: "Deload nao e perda de tempo. E investimento em recuperacao. Treinar em overreaching destrutivo perde mais ganhos do que uma semana leve." | MUST |
| FC_DL_V004 | Cortar calorias drasticamente durante deload ("ja que nao to treinando pesado, como menos") | WARN + manter calorias de manutencao ou leve deficit moderado. Deload e fase de RECUPERACAO — o corpo precisa de nutrientes para reparar. | MUST |
| FC_DL_V005 | Deload com duracao > 14 dias sem justificativa medica | WARN + avaliar se o problema requer avaliacao medica em vez de deload prolongado. Deload de 7-10 dias e suficiente para overreaching funcional. | SHOULD |

---

## SEQUENTIAL Task Execution (Nao prosseguir ate a Task atual estar completa)

### Step 0: Avaliar Indicadores — Precisa de Deload?

Avaliar se o deload e necessario e qual a urgencia:

**Indicadores de Performance (Israetel):**

| Indicador | Sinal Verde | Sinal Amarelo | Sinal Vermelho |
|-----------|------------|---------------|----------------|
| **Compound lifts** | Estavel ou subindo | Estagnado 1 semana | Regressao 2+ semanas |
| **RPE/RIR accuracy** | RPE consistente com carga | RPE subindo para mesma carga | RPE 9-10 para cargas normais |
| **Pump quality** | Pump chegando nos primeiros sets | Pump demorando | Pump fraco ou ausente |
| **Soreness** | DOMS normal (1-2 dias) | DOMS prolongado (3+ dias) | Soreness constante entre sessoes |
| **Set quality** | Ultimos sets com boa forma | Forma deteriorando no fim | Forma ruim desde o inicio |

**Indicadores de Recovery:**

| Indicador | Sinal Verde | Sinal Amarelo | Sinal Vermelho |
|-----------|------------|---------------|----------------|
| **Sono** | 7+ horas, qualidade boa | 6-7h ou qualidade media | < 6h ou insonia |
| **Motivacao** | Quer treinar | Indiferente | Evitando academia |
| **Stress** | Normal | Elevado | Muito alto |
| **Joint pain** | Nenhum | Desconforto leve | Dor persistente |
| **Fatigue geral** | Energia normal | Cansado acima do normal | Exausto constantemente |

**Decision Matrix:**

| Sinais Vermelhos | Acao |
|------------------|------|
| 0-1 | Continuar, monitorar |
| 2-3 | Considerar deload na proxima semana (proativo) |
| 4+ | Deload AGORA (reativo) |
| Performance + Recovery ambos vermelho | Deload imediato, avaliar se precisa mais que 1 semana |

```yaml
step_0:
  name: "Avaliar Indicadores de Deload"
  executor: hypertrophy-scientist
  advisors: [hypertrophy-scientist, elite-coach]
  duration_expected: "8-12 min"
  assessment:
    performance_indicators:
      compound_trends: "4-week trend analysis"
      rpe_drift: "RPE subindo para mesma carga?"
      pump_quality: "Subjetivo 1-10"
      soreness_pattern: "Normal/Prolongado/Constante"
    recovery_indicators:
      sleep: "Horas + qualidade"
      motivation: "1-10"
      stress: "1-10"
      joints: "Nenhum/Leve/Persistente"
      fatigue: "1-10"
    auto_regulation_check:
      rpe_trend_4w: "Subindo, estavel ou caindo?"
      hrv_trend: "Se disponivel"
    decision: "CONTINUE | DELOAD_NEXT_WEEK | DELOAD_NOW"
  output: deload_assessment
```

### Step 1: Selecionar Tipo de Deload

#### 1.1 Tipos de Deload (Israetel + Bompa)

Consultar hypertrophy-scientist e periodization-architect para selecionar tipo:

**Tipo 1: Volume Deload (mais comum)**
- Reduzir volume em 40-60% (ex: de 16 sets/semana para 6-10)
- Manter intensidade (mesma carga ou leve reducao de 5-10%)
- Manter todos os exercicios (apenas menos sets)
- **Quando usar:** Fadiga acumulada predominantemente por volume alto, sem issues de intensidade
- **Duracao:** 5-7 dias

**Tipo 2: Intensity Deload**
- Manter volume igual ou leve reducao (20-30%)
- Reduzir carga em 40-50%
- Aumentar RIR para 4-5 (longe da falha)
- **Quando usar:** Fadiga neural alta (powerlifters, treino pesado prolongado), joints reclamando
- **Duracao:** 5-7 dias

**Tipo 3: Full Rest Week**
- Zero treinamento formal
- Atividade leve permitida (caminhada, stretching, yoga)
- **Quando usar:** Overreaching severo, sinais de overtraining, lesao leve, burnout mental completo
- **Duracao:** 5-10 dias

**Tipo 4: Active Recovery**
- Trocar musculacao por atividades leves (natacao, caminhada, mobility work)
- Volume e intensidade minimos
- Foco em movimento sem stress mecanico
- **Quando usar:** Articulacoes reclamando, necessidade de variacao, transicao entre mesociclos
- **Duracao:** 5-7 dias

**Tipo 5: Strategic Deload (Mini-Deload)**
- Reducao moderada de volume (30%) E intensidade (20%)
- Apenas 3-4 dias, nao semana completa
- **Quando usar:** Indicadores amarelos (preventivo), mid-mesociclo para estender antes do overreach
- **Duracao:** 3-4 dias

**Selecao por Contexto Esportivo:**

| Contexto | Tipo Primario | Racional |
|----------|--------------|----------|
| **Bodybuilding** | Volume Deload | Fadiga principal e por volume acumulado |
| **Powerlifting** | Intensity Deload | Fadiga principal e neural/articular por carga alta |
| **General Fitness** | Full Rest ou Active Recovery | Recuperacao geral, prevencao de burnout |
| **Competition Prep** | Volume Deload + calorias mantidas | Preservar musculo, reduzir fadiga sem perder conditioning |
| **Athletic** | Active Recovery | Manter padroes de movimento esportivo em baixa intensidade |

```yaml
step_1_1:
  name: "Selecionar Tipo de Deload"
  executor: hypertrophy-scientist
  advisors: [hypertrophy-scientist, periodization-architect, elite-coach]
  duration_expected: "5-8 min"
  decision:
    deload_type: "volume|intensity|full_rest|active_recovery|strategic_mini"
    justification: "Baseado em indicadores + contexto esportivo"
    duration_days: "3-10 dias"
    volume_reduction: "%"
    intensity_reduction: "%"
  output: deload_type_selection
```

### Step 2: Gerar Plano de Treino do Deload

#### 2.1 Volume Deload (exemplo)

Gerar plano especifico para a semana de deload:

**Regras para Volume Deload (Israetel):**
- Manter 40-60% do volume normal (MV — Maintenance Volume)
- Manter carga igual ou 5-10% abaixo do ultimo treino produtivo
- RIR 3-5 (LONGE da falha)
- Manter todos os exercicios compostos principais (eliminar isolacoes desnecessarias)
- Manter frequencia de treino (mas sessoes mais curtas)
- Nao adicionar exercicios novos, tecnicas de intensidade ou PR attempts

**Exemplo — Volume Deload para Bodybuilder Intermediario:**

| Grupo | Volume Normal | Volume Deload | Exercicios | Sets/Reps | RIR |
|-------|-------------|--------------|------------|-----------|-----|
| Peito | 14 sets/sem | 6 sets/sem | Bench + Incline DB | 3x8-12 cada | 4+ |
| Costas | 16 sets/sem | 8 sets/sem | Barbell Row + Lat Pull | 4x8-12 cada | 4+ |
| Ombros | 12 sets/sem | 6 sets/sem | OHP + Lateral Raise | 3x10-15 cada | 4+ |
| Quadriceps | 14 sets/sem | 6 sets/sem | Squat + Leg Press | 3x8-12 cada | 4+ |
| Posterior | 12 sets/sem | 6 sets/sem | RDL + Leg Curl | 3x10-12 cada | 4+ |
| Biceps | 10 sets/sem | 4 sets/sem | Barbell Curl | 2x10-15 | 4+ |
| Triceps | 10 sets/sem | 4 sets/sem | Cable Pushdown | 2x10-15 | 4+ |

```yaml
step_2_1:
  name: "Gerar Plano de Deload"
  executor: training-builder
  advisor: hypertrophy-scientist
  duration_expected: "10-15 min"
  per_muscle_group:
    - group: "Nome"
    - normal_volume: "sets/semana"
    - deload_volume: "sets/semana"
    - volume_reduction: "%"
    - exercises: ["Manter compostos principais"]
    - sets_reps: "Protocolo"
    - rir: "3-5"
    - load: "Igual ou -5-10%"
  session_structure:
    frequency: "Manter normal"
    duration: "Reduzir para 30-45 min"
    warmup: "Manter normal"
    cooldown: "Adicionar 5-10 min mobility/stretching"
  output: deload_training_plan
```

### Step 3: Ajuste Nutricional durante Deload

#### 3.1 Nutricao no Deload (Norton)

Consultar nutrition-scientist para ajuste nutricional:

**Regra Norton para Nutricao no Deload:**

"NAO corte calorias durante o deload. O corpo esta se RECUPERANDO. Ele precisa de nutrientes para reparar tecido, restaurar glicogenio e resolver inflamacao acumulada."

| Fase Nutricional Atual | Ajuste durante Deload |
|------------------------|----------------------|
| **Bulk** | Manter calorias iguais ou leve reducao para manutencao (NEAT cai no deload) |
| **Manutencao** | Manter calorias iguais |
| **Cutting moderado** | Manter deficit moderado OU subir para manutencao (preferivel) |
| **Cutting agressivo** | SUBIR para deficit moderado ou manutencao. Deload em deficit agressivo nao recupera. |
| **Reverse diet** | Continuar reverse normalmente (nao pausar incremento) |

**Macros durante Deload:**
- Proteina: Manter (1.6-2.2g/kg) — recovery precisa de aminoacidos
- Carbs: Manter ou leve reducao (menos gasto energetico no treino)
- Gordura: Manter — nao e o momento de reduzir

**Suplementacao especifica para deload:**
- Creatina: Manter 5g/dia (sempre)
- Omega-3: Manter ou aumentar (anti-inflamatorio)
- Vitamina D: Manter
- Magnesio: Considerar suplementar se sono esta ruim (auxiliar em recovery)

```yaml
step_3_1:
  name: "Nutricao durante Deload (Norton)"
  executor: diet-builder
  advisor: nutrition-scientist
  duration_expected: "5-8 min"
  nutrition_adjustment:
    calories: "Manutencao ou leve reducao (max -10%)"
    protein: "Manter target normal"
    carbs: "Manter ou leve reducao"
    fat: "Manter"
    hydration: "Manter ou aumentar"
    supplements: "Creatina, Omega-3, Vit D — manter"
  rationale: "Deload e fase de RECUPERACAO — corpo precisa de nutrientes"
  output: deload_nutrition
```

### Step 4: Definir Protocolo Pos-Deload

#### 4.1 Retomada Pos-Deload (Israetel)

Consultar hypertrophy-scientist para protocolo de retomada:

**Como Retomar Apos Deload:**

O deload serve como "reset" da fadiga acumulada. O novo mesociclo comeca com fadiga baixa e capacidade de resposta alta — essa e a janela de MAIOR potencial de crescimento.

**Protocolo de Retomada:**

| Semana | Volume | Intensidade (RIR) | Notas |
|--------|--------|-------------------|-------|
| **Deload** | MV (40-60% normal) | RIR 4-5 | Recuperacao |
| **Semana 1 pos** | MEV (volume minimo efetivo) | RIR 3-4 | Reintroducao — baseline nova |
| **Semana 2** | MEV + 2-4 sets/grupo | RIR 2-3 | Progressao gradual |
| **Semana 3** | Proximo ao MAV | RIR 1-2 | Acumulacao produtiva |
| **Semana 4** | MAV-MRV | RIR 0-1 | Overreaching funcional |
| **Semana 5** | Novo deload (se necessario) | — | Reiniciar ciclo |

**Regras de Retomada:**
- NUNCA retomar no volume que estava antes do deload — comecar pelo MEV
- Se o deload foi reativo (overreaching real), comecar ABAIXO do MEV anterior (o MRV pode ter mudado)
- Monitorar performance no primeiro treino pos-deload — deve estar MELHOR que o ultimo treino pre-deload
- Se performance pos-deload NAO melhorou: deload foi insuficiente OU problema e mais profundo (avaliar com @injury-manager)

**Ajuste de Volume Landmarks Pos-Deload:**
O deload e uma oportunidade de recalibrar os volume landmarks:
- Se performance melhorou significativamente → MRV anterior era provavelmente correto, manter
- Se performance melhorou apenas levemente → MRV anterior pode estar alto demais, reduzir 10%
- Se performance NAO melhorou → Problema alem de fadiga, investigar (sono, nutricao, estresse, lesao)

```yaml
step_4_1:
  name: "Protocolo Pos-Deload (Israetel)"
  executor: training-builder
  advisor: hypertrophy-scientist
  duration_expected: "8-12 min"
  post_deload:
    week_1:
      volume: "MEV (minimo efetivo)"
      rir: "3-4"
      goal: "Reintroducao, baseline nova"
    week_2:
      volume: "MEV + 2-4 sets/grupo"
      rir: "2-3"
      goal: "Progressao gradual"
    progression:
      rule: "Adicionar 1-3 sets/semana por grupo ate atingir MAV"
      limit: "Nao ultrapassar volume pre-deload ate semana 3+"
    landmark_recalibration:
      check: "Performance semana 1 pos-deload vs pre-deload"
      if_improved: "Landmarks corretos, manter"
      if_marginal: "Reduzir MRV estimado em 10%"
      if_not_improved: "Investigar causa mais profunda"
  output: post_deload_plan
```

### Step 5: Auto-Regulacao e Indicadores Continuos

#### 5.1 Sistema de Auto-Regulacao para Deload

Implementar indicadores continuos para decisao de deload em tempo real:

**Marcadores Diarios (RPE-based):**
- Registrar RPE do primeiro set de trabalho de cada exercicio composto
- Se RPE para mesma carga sobe 1+ ponto por 2 sessoes consecutivas → sinal amarelo
- Se RPE para mesma carga sobe 2+ pontos em 1 sessao → sinal vermelho

**Marcadores Semanais:**
- Sleep quality score (1-10) — media semanal
- Motivation score (1-10) — media semanal
- Joint discomfort score (0-10) — soma semanal
- Performance delta vs semana anterior (% de mudanca em lifts compostos)

**HRV (se disponivel):**
- Baseline: media de 14 dias
- Alerta: queda > 10% da baseline por 3+ dias
- Acao: considerar deload se HRV baixo + outros indicadores negativos

**Deload Scheduling Heuristico:**

| Training Level | Deload Frequency (default) | Pode Estender Se |
|---------------|---------------------------|------------------|
| **Iniciante** | A cada 8-10 semanas | Indicadores todos verdes |
| **Intermediario** | A cada 4-6 semanas | Performance subindo, recovery OK |
| **Avancado** | A cada 3-5 semanas | Raramente — avancados geram mais fadiga |
| **Em deficit (cut)** | A cada 3-4 semanas | Deficit reduz capacidade de recovery |
| **Em surplus (bulk)** | A cada 5-6 semanas | Surplus melhora recovery |

```yaml
step_5_1:
  name: "Sistema de Auto-Regulacao"
  executor: training-builder
  advisor: hypertrophy-scientist
  duration_expected: "5-8 min"
  monitoring:
    daily:
      - "RPE primeiro set composto"
      - "Soreness residual (0-10)"
    weekly:
      - "Sleep quality (1-10)"
      - "Motivation (1-10)"
      - "Joint discomfort (0-10)"
      - "Performance delta (%)"
    optional:
      - "HRV (if available)"
      - "Steps/NEAT tracking"
  decision_rules:
    green: "0-1 sinais vermelho → continuar"
    yellow: "2-3 sinais → deload proxima semana"
    red: "4+ sinais → deload AGORA"
  output: auto_regulation_protocol
```

---

## Error Handling

**Strategy:** consult_advisor + adjust_protocol

**Common Errors:**

1. **Error:** Performance Nao Melhora Apos Deload
   - **Cause:** Deload insuficiente, problema mais profundo (sono, nutricao, estresse, lesao)
   - **Resolution:** Estender deload + investigar causa raiz. Consultar @injury-manager se desconforto articular persiste.
   - **Recovery:** Se 2 deloads consecutivos nao resolvem, avaliar com profissional de saude

2. **Error:** Cliente Resiste ao Deload ("Nao quero perder ganhos")
   - **Cause:** Mentalidade "mais e melhor", medo de regressao
   - **Resolution:** Educar: "Deload nao perde ganhos em 1 semana. O corpo MANTEM massa muscular por semanas com volume de manutencao (MV). O que voce PERDE treinando em overreaching e a capacidade de crescer."
   - **Recovery:** Consultar @mindset-coach se resistencia persistir

3. **Error:** Deload Muito Agressivo (Quase Zero Estimulo)
   - **Cause:** Confundir deload com descanso total sem necessidade
   - **Resolution:** Deload e reducao estrategica, nao eliminacao total. Manter estimulo minimo (MV) para preservar adaptacoes.
   - **Recovery:** Ajustar para manter 40-60% do volume normal

4. **Error:** Retomada Pos-Deload Muito Agressiva
   - **Cause:** Voltar ao volume pre-deload imediatamente
   - **Resolution:** SEMPRE retomar pelo MEV e progredir gradualmente. O corpo respondeu ao deload — capitalize com progressao inteligente.
   - **Recovery:** Se dor ou fadiga retornam rapido pos-deload, reducao de volume foi insuficiente

5. **Error:** Cortar Calorias durante Deload
   - **Cause:** Logica errada: "To treinando menos, devo comer menos"
   - **Resolution:** Deload e fase de RECUPERACAO. O corpo precisa de nutrientes para reparar. Manter calorias ou leve ajuste apenas.
   - **Recovery:** Restaurar calorias para manutencao durante deload

---

## Performance

```yaml
duration_expected: "25-40 min (avaliacao + protocolo + plano)"
cost_estimated: "$0.02-0.06"
token_usage: "~8,000-16,000 tokens"
advisor_consultations: "2-4 (Israetel primario, Bompa para integracao, Norton para nutricao)"
deload_duration: "3-10 dias"
monitoring: "via weekly-checkin + auto-regulation protocol"
```

---

## Metadata

```yaml
task_id: FC-TASK-011
name: deload-protocol
version: 1.0.0
squad: fitcoach
dependencies:
  - client-intake (FC-TASK-001)
  - create-training-plan (FC-TASK-002)
  - weekly-checkin (FC-TASK-004, trigger e monitoramento)
  - adjust-protocol (FC-TASK-005, integração)
  - hypertrophy-scientist (advisor — Israetel)
  - periodization-architect (advisor — Bompa)
  - elite-coach (advisor — Jansen)
  - nutrition-scientist (advisor — Norton, ajuste nutricional)
  - injury-manager (advisor — se indicadores apontam lesao)
  - training-plan-generator (tool)
  - quality-checker (tool)
tags:
  - deload
  - recovery
  - fatigue-management
  - periodization
  - auto-regulation
  - overreaching
  - performance-markers
updated_at: 2026-03-13
```

---

## Handoff

```yaml
next_task:
  resume:
    task: "create-training-plan"
    mode: "new_mesocycle"
    condition: "Deload completo, iniciar novo mesociclo"
  monitor:
    task: "weekly-checkin"
    schedule: "next_week"
    condition: "Monitorar performance pos-deload"
  adjust:
    task: "adjust-protocol"
    condition: "Performance pos-deload nao melhora — investigar"
  injury:
    task: "injury-manager *assess"
    condition: "Indicadores apontam para lesao, nao apenas fadiga"
  nutrition:
    task: "diet-periodization"
    condition: "Deload coincide com transicao de fase nutricional"
```
