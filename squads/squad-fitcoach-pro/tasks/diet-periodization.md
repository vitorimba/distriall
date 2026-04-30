<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: diet-periodization
  task_name: Diet Periodization
  status: active
  responsible_executor: 'nutrition-scientist + diet-builder'
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
- AI gera protocolo de periodizacao com valores padrao e aplica
- **Melhor para:** Transicoes simples (manutencao → lean bulk), clientes intermediarios com historico

### 2. Interactive Mode - Balanceado, Educativo (5-10 prompts) **[DEFAULT]**
- Checkpoints em cada fase de transicao e decisao de calorie cycling
- Coach participa de todas as decisoes criticas
- **Melhor para:** Maioria dos clientes, especialmente primeira periodizacao

### 3. Pre-Flight Planning - Planejamento Completo Antecipado **[RECOMENDADO para prep]**
- Planejamento completo de todas as fases nutricionais antes de iniciar
- Zero ambiguidade em transicoes de fase
- **Melhor para:** Competition prep nutrition, clientes avancados, ciclos longos

**Parameter:** `mode` (optional, default: `interactive`)

---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: dietPeriodization()
id: FC-TASK-010
responsavel: nutrition-scientist + diet-builder
responsavel_type: Agent (multi-advisor)
squad: fitcoach
pattern_prefix: FC
atomic_layer: Organism

advisors:
  - nutrition-scientist (Layne Norton) — Reverse dieting, metabolic adaptation, calorie cycling, evidence-based nutrition
  - periodization-architect (Tudor Bompa) — Alinhamento de periodizacao nutricional com periodizacao de treino
  - hypertrophy-scientist (Mike Israetel) — Necessidade calorica baseada em volume de treino
  - prep-master (Hany Rambod) — Nutrition phases para competition prep
  - elite-coach (Matt Jansen) — Validacao pratica com atletas de alto nivel

**Entrada:**
- campo: client_profile
  tipo: object
  origem: client-intake task output
  obrigatorio: true
  validacao: Must contain weight, height, BF%, training level, goal

- campo: current_nutrition
  tipo: object
  origem: Data Store ou client input
  obrigatorio: true
  validacao: |
    Must contain: current_calories, current_macros (P/C/F),
    current_phase (bulk/cut/maintenance), duration_in_current_phase,
    metabolic_adaptation_signs (if any)

- campo: training_periodization
  tipo: object
  origem: periodization-architect ou training plan
  obrigatorio: true
  validacao: |
    Must contain: current_mesocycle, volume_landmarks,
    training_phase (accumulation/intensification/deload),
    sessions_per_week

- campo: goal_phase
  tipo: enum [lean_bulk, aggressive_bulk, cutting, maintenance, reverse_diet, competition_prep, recomp]
  origem: Coach/Client decision
  obrigatorio: true

- campo: timeline
  tipo: object
  origem: Coach/Client decision
  obrigatorio: true
  validacao: |
    Must contain: target_duration_weeks, deadline (if competition),
    flexibility (rigid/flexible)

- campo: diet_history
  tipo: object
  origem: client-intake ou historical data
  obrigatorio: false
  validacao: |
    Previous phases, metabolic adaptation history,
    lowest_calories_sustained, highest_calories_sustained,
    reverse_diet_history

**Saida:**
- campo: periodization_plan
  tipo: object
  destino: Data Store (clients/{id}/nutrition/periodization.json)
  persistido: true

- campo: phase_calendar
  tipo: object
  destino: Data Store (clients/{id}/nutrition/phase-calendar.json)
  persistido: true

- campo: calorie_cycling_protocol
  tipo: object
  destino: Data Store (clients/{id}/nutrition/calorie-cycling.json)
  persistido: true

- campo: transition_protocols
  tipo: object
  destino: Data Store (clients/{id}/nutrition/transitions.json)
  persistido: true
```

---

## Pre-Conditions

```yaml
pre-conditions:
  - [ ] Perfil do cliente completo com dados antropometricos e objetivo
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar weight, height, BF%, goal, training_level
    error_message: "Pre-condition failed: Dados antropometricos incompletos"

  - [ ] Nutricao atual documentada (calorias e macros atuais)
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que current_calories e current_macros existem
    error_message: "Pre-condition failed: Nutricao atual nao documentada"

  - [ ] Periodizacao de treino definida ou em andamento
    tipo: pre-condition
    blocker: false
    validacao: |
      Verificar que training_periodization esta disponivel
    error_message: "Warning: Periodizacao de treino nao definida — nutricao sera generica"

  - [ ] Historico de dieta disponivel para clientes em reverse diet ou pos-prep
    tipo: pre-condition
    blocker: true
    condicional: goal_phase IN [reverse_diet, competition_prep]
    validacao: |
      Verificar que diet_history contem fases anteriores e calorias mais baixas
    error_message: "Pre-condition failed: Historico de dieta necessario para reverse/prep"
```

---

## Post-Conditions

```yaml
post-conditions:
  - [ ] Plano de periodizacao completo com todas as fases documentadas
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que periodization_plan cobre todo o timeline
    error_message: "Post-condition failed: Plano de periodizacao incompleto"

  - [ ] Protocolos de transicao entre fases definidos
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que transition_protocols cobre todas as transicoes
    error_message: "Post-condition failed: Transicoes entre fases nao definidas"

  - [ ] Calorie cycling protocol definido (se aplicavel)
    tipo: post-condition
    blocker: false
    validacao: |
      Se goal_phase inclui cycling, verificar que protocolo existe
    error_message: "Warning: Calorie cycling nao definido"

  - [ ] Veto conditions verificadas em cada fase
    tipo: post-condition
    blocker: true
    validacao: |
      Nenhuma fase viola veto conditions (proteina minima, deficit maximo, etc.)
    error_message: "Post-condition failed: Fase viola veto condition"
```

---

## Acceptance Criteria

```yaml
acceptance-criteria:
  - [ ] AC-1: Todas as fases da periodizacao definidas com calorias, macros e duracao
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que cada fase tem: calories_target, macro_split, duration_weeks, transition_rule
    error_message: "AC-1 nao atendido: Fases incompletas"

  - [ ] AC-2: Transicoes entre fases sao graduais (sem saltos caloricos > 300kcal)
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que nenhuma transicao tem delta calorico > 300kcal/semana
    error_message: "AC-2 nao atendido: Transicao muito agressiva"

  - [ ] AC-3: Proteina nunca abaixo de 1.6g/kg em nenhuma fase
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que proteina >= 1.6g/kg em todas as fases (2.0g/kg em deficit)
    error_message: "AC-3 nao atendido: Proteina abaixo do minimo"

  - [ ] AC-4: Gordura nunca abaixo de 0.5g/kg em nenhuma fase
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que gordura >= 0.5g/kg em todas as fases
    error_message: "AC-4 nao atendido: Gordura abaixo do minimo para saude hormonal"

  - [ ] AC-5: Diet breaks planejados a cada 8-12 semanas em deficit
    tipo: acceptance-criterion
    blocker: false
    validacao: |
      Assert que fases de deficit > 8 semanas incluem diet break planejado
    error_message: "AC-5 nao atendido: Deficit prolongado sem diet break"

  - [ ] AC-6: Reverse diet inclui timeline de 8-16 semanas com incrementos definidos
    tipo: acceptance-criterion
    condicional: goal_phase == reverse_diet
    blocker: true
    validacao: |
      Assert que reverse diet tem semana-a-semana com incrementos caloricos
    error_message: "AC-6 nao atendido: Reverse diet sem progressao detalhada"

  - [ ] AC-7: Periodizacao nutricional alinhada com periodizacao de treino
    tipo: acceptance-criterion
    blocker: false
    validacao: |
      Assert que fases nutricionais consideram volume de treino (mais volume = mais calorias)
    error_message: "AC-7 nao atendido: Nutricao desalinhada com treino"
```

---

## Tools

- **Tool:** macro-calculator
  - **Purpose:** Calcular macros para cada fase e transicao
  - **Source:** squads/fitcoach/tools/macro-calculator

- **Tool:** quality-checker
  - **Purpose:** Validar que nenhuma fase viola limites de seguranca
  - **Source:** squads/fitcoach/tools/quality-checker

---

## Veto Conditions

| ID | Condicao | Acao | Severidade |
|----|----------|------|------------|
| FC_DP_V001 | Fase de cutting com proteina abaixo de 2.0g/kg | BLOCK + aumentar proteina para minimo 2.0g/kg (Helms et al.). Em deficit, proteina preserva massa magra. | NON-NEGOTIABLE |
| FC_DP_V002 | Reverse diet com incremento > 300kcal/semana | BLOCK + reduzir incremento para 100-200 kcal/semana. Reverse agressivo causa ganho de gordura desproporcional. (Norton) | NON-NEGOTIABLE |
| FC_DP_V003 | Deficit calorico > 25% do TDEE sem supervisao medica | BLOCK + limitar deficit a 15-20% com reavaliacao quinzenal. Deficits agressivos aceleram perda muscular e adaptacao metabolica. | MUST |
| FC_DP_V004 | Gordura abaixo de 0.5g/kg por mais de 4 semanas (exceto peak week) | BLOCK + aumentar gordura. Abaixo de 0.5g/kg compromete producao hormonal significativamente. | MUST |
| FC_DP_V005 | Cutting direto apos bulking sem fase de manutencao de transicao | WARN + recomendar 2-4 semanas de manutencao entre fases para estabilizar metabolismo. | SHOULD |

---

## SEQUENTIAL Task Execution (Nao prosseguir ate a Task atual estar completa)

### Step 0: Assessment Nutricional e Metabolico

- Avaliar estado metabolico atual do cliente:
  - TDEE estimado (Harris-Benedict ou Mifflin-St Jeor + fator de atividade)
  - Calorias atuais vs TDEE estimado (superavit, deficit ou manutencao real?)
  - Sinais de adaptacao metabolica (NEAT reduzido, performance caindo, sono pior)
  - Historico de dietas anteriores (severidade, duracao, rebotes)
  - Fase atual de treino e volume (impacta necessidade calorica)

```yaml
step_0:
  name: "Assessment Nutricional e Metabolico"
  executor: nutrition-scientist
  advisors: [nutrition-scientist, hypertrophy-scientist]
  duration_expected: "10-15 min"
  assessment:
    tdee_estimate: "kcal/dia (formula + fator de atividade)"
    current_intake_vs_tdee: "surplus/deficit/maintenance + magnitude"
    metabolic_adaptation_signs:
      - "NEAT reducao (steps caindo?)"
      - "Performance (cargas caindo?)"
      - "Recovery (sono, humor, libido)"
      - "Temperature (mãos/pes frios?)"
    diet_history_summary:
      - "Fases anteriores: tipo, duracao, calorias mais baixas"
      - "Rebotes: magnitude e velocidade"
      - "Tempo na fase atual"
    training_volume_impact:
      - "Volume semanal total (sets)"
      - "Fase do mesociclo (accumulation vs deload)"
  output: metabolic_assessment
```

### Step 1: Definir Fases da Periodizacao Nutricional

#### 1.1 Bulk/Cut/Maintenance Phase Design

Consultar nutrition-scientist (Norton) e periodization-architect (Bompa) para desenhar fases:

**Regras de Periodizacao Nutricional (Norton):**

| Fase | Superavit/Deficit | Duracao Ideal | Proteina | Prioridade de Macro |
|------|-------------------|---------------|----------|-------------------|
| **Lean Bulk** | +200 a +350 kcal | 12-20 semanas | 1.6-2.2 g/kg | Carbs > Fat (suportar treino) |
| **Aggressive Bulk** | +400 a +600 kcal | 8-12 semanas | 1.6-2.0 g/kg | Carbs alto (performance) |
| **Moderate Cut** | -300 a -500 kcal | 8-16 semanas | 2.0-2.4 g/kg | Proteina alta (preservar massa) |
| **Aggressive Cut** | -500 a -750 kcal | 4-8 semanas max | 2.2-2.7 g/kg | Proteina maxima |
| **Maintenance** | +/- 100 kcal | 2-8 semanas | 1.6-2.0 g/kg | Equilibrio P/C/F |
| **Reverse Diet** | +100-200 kcal/sem | 8-16 semanas | Manter do cut | Carbs primeiro, fat depois |
| **Recomp** | Manutencao ou leve surplus | 12-24 semanas | 2.0-2.2 g/kg | Calorie cycling (high on training) |

**Principio Bompa — Alinhamento Treino-Nutricao:**
- Fase de acumulacao (volume alto) → calorias mais altas (necessidade energetica maior)
- Fase de intensificacao (carga alta) → carboidratos adequados (performance neural)
- Deload → reduzir levemente calorias (NEAT e gasto reduzem)
- Especializacao/prep → deficit progressivo alinhado com reducao de volume

```yaml
step_1_1:
  name: "Phase Design (Norton + Bompa)"
  executor: nutrition-scientist
  advisors: [nutrition-scientist, periodization-architect]
  duration_expected: "15-20 min"
  per_phase:
    - phase_name: "Nome da fase"
    - type: "bulk|cut|maintenance|reverse|recomp"
    - duration_weeks: "Duracao planejada"
    - caloric_target: "kcal/dia (ou range)"
    - surplus_deficit: "kcal acima/abaixo TDEE"
    - macros:
        protein: "g/kg e total"
        carbs: "g e calorias"
        fat: "g/kg e total"
    - training_phase_alignment: "Qual fase de treino roda em paralelo"
    - exit_criteria: "Quando sair desta fase"
    - transition_to: "Proxima fase"
  output: phase_design
```

### Step 2: Calorie Cycling Protocol

#### 2.1 High/Low Day Design

Consultar nutrition-scientist para protocolo de calorie cycling:

**Calorie Cycling (Norton methodology):**

O calorie cycling distribui calorias de forma desigual ao longo da semana para:
1. Alinhar intake com demanda energetica (mais calorias nos dias de treino pesado)
2. Melhorar performance nos treinos-chave
3. Reduzir impacto psicologico de deficit constante
4. Potencialmente mitigar adaptacao metabolica

**Exemplo — Cliente em Cutting (2000 kcal media):**

| Dia | Tipo | Calorias | Carbs | Proteina | Gordura | Treino |
|-----|------|----------|-------|----------|---------|--------|
| Segunda | HIGH | 2300 | 280g | 180g | 55g | Pernas (volume alto) |
| Terca | LOW | 1700 | 130g | 180g | 65g | Descanso |
| Quarta | MEDIUM | 2000 | 200g | 180g | 60g | Upper body |
| Quinta | LOW | 1700 | 130g | 180g | 65g | Descanso |
| Sexta | HIGH | 2300 | 280g | 180g | 55g | Costas (volume alto) |
| Sabado | MEDIUM | 2000 | 200g | 180g | 60g | Arms/Shoulders |
| Domingo | LOW | 1700 | 130g | 180g | 65g | Descanso |
| **Media** | — | **~2000** | **~193g** | **180g** | **~61g** | — |

**Regras de Cycling:**
- Proteina FIXA em todos os dias (nao ciclar proteina)
- Variar primariamente carboidratos
- Gordura inversamente proporcional aos carbs (compensar calorias)
- Dias HIGH nos treinos de maior volume/grupos prioritarios
- Dias LOW nos descansos ou treinos leves
- Media semanal DEVE bater o target calorico

```yaml
step_2_1:
  name: "Calorie Cycling Protocol"
  executor: diet-builder
  advisor: nutrition-scientist
  duration_expected: "10-15 min"
  cycling:
    high_day:
      calories: "kcal"
      when: "Dias de treino pesado (volume alto)"
      macro_split: {protein: "g", carbs: "g", fat: "g"}
    medium_day:
      calories: "kcal"
      when: "Dias de treino moderado"
      macro_split: {protein: "g", carbs: "g", fat: "g"}
    low_day:
      calories: "kcal"
      when: "Dias de descanso ou treino leve"
      macro_split: {protein: "g", carbs: "g", fat: "g"}
    weekly_average: "kcal/dia (deve bater target)"
    schedule: "Mapa semanal dia-a-dia"
  output: calorie_cycling_protocol
```

### Step 3: Reverse Dieting Protocol (Norton)

#### 3.1 Protocolo Completo de Reverse Diet

Consultar nutrition-scientist (Norton) para reverse dieting:

**Quando usar reverse diet:**
- Pos-competicao (OBRIGATORIO)
- Pos-cutting prolongado (> 12 semanas em deficit)
- Cliente com historico de yoyo dieting (metabolismo adaptado)
- Calorias de manutencao estimadas muito abaixo do esperado

**Protocolo Norton — Reverse Diet Standard:**

| Semana | Delta Calorico | Fonte do Aumento | Monitoramento |
|--------|---------------|------------------|---------------|
| 1-2 | +100-150 kcal/sem | 70% carbs, 30% fat | Peso diario (media semanal) |
| 3-6 | +100-150 kcal/sem | 80% carbs, 20% fat | Peso + medidas quinzenais |
| 7-10 | +75-100 kcal/sem | 80% carbs, 20% fat | Peso + fotos + feedback |
| 11-16 | +50-75 kcal/sem | Distribuir P/C/F | Peso + manutencao body fat |

**Regras inegociaveis do Reverse:**
- Proteina NUNCA reduzir durante reverse — manter do final do cut (2.0-2.4g/kg)
- Se peso subir > 0.5% do BW/semana → reduzir incremento pela metade
- Se peso subir < 0.2% BW/semana → aumentar incremento em 25%
- Aceitar 1-3kg de ganho inicial (agua, glicogenio, conteudo intestinal — NAO e gordura)
- Nao entrar em panico com o numero da balanca — usar media movel de 7 dias
- Cardio: reduzir gradualmente (nao cortar de uma vez)

**Red flags durante reverse:**
- Ganho > 1kg/semana por 2+ semanas consecutivas → reverse muito rapido
- Cliente com comportamento de binge → suporte psicologico + manter estrutura
- Peso nao subindo apesar de aumento calorico → NEAT subiu, metabolismo respondendo (BOM sinal)

```yaml
step_3_1:
  name: "Reverse Diet Protocol (Norton)"
  executor: diet-builder
  advisor: nutrition-scientist
  duration_expected: "15-20 min"
  per_week:
    - week: "Numero"
    - calories: "Total"
    - delta: "Aumento vs semana anterior"
    - protein: "g"
    - carbs: "g"
    - fat: "g"
    - cardio: "Ajuste (reducao gradual)"
    - monitoring: "O que checar"
    - adjustment_rule: "Se X, fazer Y"
  guardrails:
    max_weight_gain_per_week: "0.5% BW"
    min_protein: "2.0 g/kg"
    min_fat: "0.5 g/kg"
    max_calorie_increment: "200 kcal/semana"
  output: reverse_diet_protocol
```

### Step 4: Diet Breaks e Refeeds

#### 4.1 Protocolo de Diet Breaks

Consultar nutrition-scientist para diet breaks estrategicos:

**Diet Break (Norton):**
Pausa planejada de 1-2 semanas em calorias de manutencao durante fase de deficit.

**Quando implementar:**
- A cada 8-12 semanas de deficit continuo (preventivo)
- Quando multiplos sinais de adaptacao metabolica estao presentes (reativo)
- Quando aderencia esta caindo significativamente
- Antes de fase mais agressiva de cutting

**Protocolo:**
- Aumentar calorias para manutencao estimada (nao para pre-dieta)
- Aumento via carboidratos primariamente
- Manter proteina elevada (sem reduzir)
- Manter treino normal (volume pode ate aumentar — mais calorias disponíveis)
- Reduzir cardio se estava elevado
- Duracao: 1 semana (minimo) a 2 semanas (ideal)

**O que esperar:**
- Peso sobe 1-3kg imediatamente (agua, glicogenio) — NÃO E GORDURA
- Performance no treino melhora
- Sono, humor e libido melhoram
- NEAT sobe naturalmente (mais energia disponivel)
- Apos retorno ao deficit, peso volta ao pre-break em 1 semana e continua caindo

#### 4.2 Protocolo de Refeeds

**Refeed Day:**
Dia unico com calorias em manutencao, aumento primariamente via carboidratos.

| Parametro | Refeed Standard | Refeed Agressivo |
|-----------|----------------|-----------------|
| **Frequencia** | 1x por semana | 2x por semana (deficit agressivo) |
| **Calorias** | Manutencao | Manutencao + 10% |
| **Carbs** | +50-100% do dia normal de cut | +100-150% |
| **Proteina** | Manter | Manter |
| **Gordura** | Reduzir para compensar | Reduzir para compensar |
| **Timing** | Dia de treino mais pesado | Dias de treino pesado |

```yaml
step_4:
  name: "Diet Breaks e Refeeds"
  executor: diet-builder
  advisor: nutrition-scientist
  duration_expected: "8-12 min"
  diet_break:
    frequency: "A cada 8-12 semanas de deficit"
    duration: "1-2 semanas"
    calories: "Manutencao estimada"
    macro_adjustment: "Aumentar carbs, manter proteina"
    training: "Manter ou aumentar levemente volume"
    expected_weight_change: "+1-3kg (agua/glicogenio)"
  refeed:
    frequency: "1-2x por semana durante deficit"
    calories: "Manutencao"
    macro_focus: "Carbs altos, gordura reduzida"
    timing: "Dia de treino mais pesado"
  output: break_refeed_protocol
```

### Step 5: Competition Prep Nutrition Phases

#### 5.1 Periodizacao Nutricional para Competicao (16-24 semanas)

Consultar nutrition-scientist (Norton) + prep-master (Rambod) para prep nutrition:

**Fases Nutricionais de Prep (Norton + Rambod):**

| Fase | Semanas | Deficit | Carb Cycling | Refeeds | Proteina |
|------|---------|---------|-------------|---------|----------|
| **Pre-Prep** | 20-17 | -200 a -300 | Opcional (high/low) | 1x/semana | 2.0 g/kg |
| **Early Prep** | 16-13 | -300 a -500 | Sim (H/M/L) | 1x/semana | 2.2 g/kg |
| **Mid Prep** | 12-9 | -500 a -700 | Sim (H/M/L) | 1x/10 dias | 2.4 g/kg |
| **Hard Prep** | 8-5 | -700 a -900 | Sim (obrigatorio) | 1x/7 dias | 2.5 g/kg |
| **Final Push** | 4-2 | -800 a -1000 | Sim (obrigatorio) | 2x/7 dias | 2.7 g/kg |
| **Peak Week** | 1 | Variavel | Depletion → Load | N/A | Manter |
| **Reverse** | Pos-show | +100-200/sem | Nao | N/A | Manter 2.0+ |

**Regras Norton para Prep Nutrition:**
- Nunca cortar mais de 200-300 kcal de uma vez
- Proteina sobe conforme deficit aumenta (preservar massa magra)
- Gordura NUNCA abaixo de 0.5g/kg por mais de 4 semanas
- Refeeds mais frequentes conforme prep avanca (hormonio, sanidade)
- Diet break de 5-7 dias se prep > 16 semanas (na semana 8-10)

```yaml
step_5_1:
  name: "Prep Nutrition Phases (Norton + Rambod)"
  executor: nutrition-scientist
  advisors: [nutrition-scientist, prep-master]
  duration_expected: "15-20 min"
  condicional: goal_phase == competition_prep
  per_phase:
    - phase_name: "Nome"
    - weeks: "Range"
    - caloric_deficit: "kcal"
    - protein: "g/kg"
    - carb_cycling: {high: "g", medium: "g", low: "g", schedule: "mapa"}
    - fat: "g/kg (minimo 0.5)"
    - refeed_frequency: "a cada X dias"
    - diet_break: "planejado? quando?"
    - monitoring: "peso, medidas, fotos, performance"
  output: prep_nutrition_phases
```

### Step 6: Compilar Plano de Periodizacao Completo

#### 6.1 Gerar Phase Calendar

Compilar todas as fases em um calendario visual e estruturado:

```
# Diet Periodization Calendar — {client_name}
# Duration: {total_weeks} semanas

Fase 1: {nome} — Semanas 1-{n}
  Calorias: {target} kcal/dia
  Macros: P{x}g / C{y}g / F{z}g
  Cycling: {high/medium/low schedule}
  Refeeds: {frequencia}
  Exit criteria: {quando sair}

Fase 2: {nome} — Semanas {n+1}-{m}
  [Transicao: {protocolo de transicao}]
  ...

Diet Break: Semana {x} — 1-2 semanas em manutencao
  ...
```

```yaml
step_6_1:
  name: "Compilar Phase Calendar"
  executor: diet-builder
  advisor: nutrition-scientist
  duration_expected: "8-12 min"
  deliverables:
    - phase_calendar (visual, semana a semana)
    - transition_protocols (como mudar entre fases)
    - monitoring_checkpoints (quando reavaliar)
    - veto_validation (nenhuma fase viola limites)
  output: complete_periodization_plan
```

---

## Error Handling

**Strategy:** consult_advisor + gradual_adjustment

**Common Errors:**

1. **Error:** Ganho de Peso Excessivo durante Reverse Diet
   - **Cause:** Incremento calorico muito rapido ou composicao de macros inadequada
   - **Resolution:** Reduzir incremento pela metade, verificar aderencia ao plano
   - **Recovery:** Consultar Norton — provavelmente reverse muito agressivo

2. **Error:** Perda de Performance durante Cutting
   - **Cause:** Deficit muito agressivo, carboidratos insuficientes, ou overtraining em deficit
   - **Resolution:** Implementar refeed day, avaliar volume de treino, considerar diet break
   - **Recovery:** Consultar Israetel para ajuste de volume em deficit

3. **Error:** Peso Estagnado apesar de Aderencia Confirmada
   - **Cause:** Adaptacao metabolica, NEAT reduzido, retencao de agua
   - **Resolution:** Diet break de 1-2 semanas ou ajuste de 100-200 kcal no deficit
   - **Recovery:** Consultar Norton para estrategia anti-plateau

4. **Error:** Transicao Abrupta entre Fases
   - **Cause:** Sem periodo de estabilizacao entre bulk e cut
   - **Resolution:** Inserir 2-4 semanas de manutencao entre fases
   - **Recovery:** Nunca fazer bulk → cut direto sem transicao

5. **Error:** Cliente Nao Segue Calorie Cycling
   - **Cause:** Complexidade alta, dificuldade de tracking por dia
   - **Resolution:** Simplificar para 2 tipos de dia (treino/descanso) ou calorias fixas
   - **Recovery:** Melhor ter aderencia em plano simples que zero aderencia em plano otimo

---

## Performance

```yaml
duration_expected: "40-60 min (planejamento completo)"
cost_estimated: "$0.03-0.10"
token_usage: "~12,000-25,000 tokens"
advisor_consultations: "3-5 (Norton primario, Bompa para alinhamento, Israetel para volume)"
periodization_duration: "8-52 semanas dependendo do objetivo"
monitoring: "via weekly-checkin task + adjust-protocol"
```

---

## Metadata

```yaml
task_id: FC-TASK-010
name: diet-periodization
version: 1.0.0
squad: fitcoach
dependencies:
  - client-intake (FC-TASK-001)
  - create-diet-plan (FC-TASK-003)
  - weekly-checkin (FC-TASK-004, monitoramento)
  - adjust-protocol (FC-TASK-005, ajustes durante ciclo)
  - nutrition-scientist (advisor — Norton)
  - periodization-architect (advisor — Bompa)
  - hypertrophy-scientist (advisor — Israetel)
  - prep-master (advisor — Rambod, se prep)
  - macro-calculator (tool)
  - quality-checker (tool)
tags:
  - nutrition
  - periodization
  - calorie-cycling
  - reverse-diet
  - diet-breaks
  - refeeds
  - competition-prep-nutrition
  - bulk-cut-cycles
updated_at: 2026-03-13
```

---

## Handoff

```yaml
next_task:
  monitoring:
    task: "weekly-checkin"
    frequency: "weekly"
    condition: "Periodizacao em andamento"
  adjust:
    task: "adjust-protocol"
    condition: "Check-in indica necessidade de ajuste nutricional"
  training_alignment:
    task: "create-training-plan"
    condition: "Mudanca de fase nutricional requer ajuste de treino"
  competition:
    task: "competition-prep"
    condition: "Periodizacao inclui prep — integrar com protocolo completo de prep"
  diet_plan:
    task: "create-diet-plan"
    condition: "Apos periodizacao definida, gerar planos alimentares por fase"
```
