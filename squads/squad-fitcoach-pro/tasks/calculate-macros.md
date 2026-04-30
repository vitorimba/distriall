<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: calculate-macros
  task_name: Calculate Macros
  status: active
  responsible_executor: 'diet-builder'
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
- Calcula TDEE e macros automaticamente com defaults
- Usa Mifflin-St Jeor + multiplicador padrao
- **Melhor para:** Clientes com objetivo padrao, sem dados de body fat

### 2. Interactive Mode - Balanceado, Educativo (5-10 prompts) **[DEFAULT]**
- Checkpoints em cada formula e decisao de macro split
- Explica diferenca entre formulas e ajustes
- **Melhor para:** Primeiros calculos, clientes com duvidas sobre metabolismo

### 3. Pre-Flight Planning - Planejamento Completo Antecipado
- Calcula com todas as formulas disponiveis, compara resultados
- Analisa historico de dieta para ajuste de metabolic adaptation
- **Melhor para:** Clientes avancados, atletas, reverse diet, competition prep

**Parameter:** `mode` (optional, default: `interactive`)

---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: calculateMacros()
id: FC-TASK-010
responsavel: diet-builder
responsavel_type: Agent
squad: fitcoach
pattern_prefix: FC
atomic_layer: Molecule

advisors:
  - nutrition-scientist (Layne Norton) — Evidence-based macro distribution, metabolic adaptation
  - hypertrophy-scientist (Mike Israetel) — Nutrition timing para hipertrofia
  - prep-master (Hany Rambod) — Macro manipulation para competition prep

**Entrada:**
- campo: client_profile
  tipo: object
  origem: client-intake task output
  obrigatorio: true
  validacao: Must contain weight_kg, height_cm, age, biological_sex, activity_description

- campo: body_composition
  tipo: object
  origem: client-intake task output
  obrigatorio: false
  validacao: If present, must contain body_fat_percent (enables Katch-McArdle)

- campo: goal_definition
  tipo: object
  origem: client-intake task output
  obrigatorio: true
  validacao: Must contain primary_goal (bulk|cut|aggressive_cut|maintenance|recomp|reverse_diet|prep)

- campo: dietary_preferences
  tipo: object
  origem: User Input (anamnese)
  obrigatorio: true
  validacao: Must contain meals_per_day, macro_split_preference (optional)

- campo: training_schedule
  tipo: object
  origem: create-training-plan task output
  obrigatorio: false
  validacao: If available, used to calculate precise activity multiplier and peri-workout timing

- campo: metabolic_history
  tipo: object
  origem: User Input (optional)
  obrigatorio: false
  validacao: Previous diet data for metabolic adaptation adjustment

**Saida:**
- campo: tdee_report
  tipo: object
  destino: Data Store (clients/{id}/metabolic/tdee-report.json)
  persistido: true

- campo: macro_prescription
  tipo: object
  destino: Data Store (clients/{id}/metabolic/macro-prescription.json)
  persistido: true

- campo: meal_distribution
  tipo: object
  destino: Data Store (clients/{id}/metabolic/meal-distribution.json)
  persistido: true

- campo: micronutrient_minimums
  tipo: object
  destino: Data Store (clients/{id}/metabolic/micronutrient-minimums.json)
  persistido: true
```

---

## Pre-Conditions

```yaml
pre-conditions:
  - [ ] Dados antropometricos completos (peso, altura, idade, sexo biologico)
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que client_profile contem weight_kg, height_cm, age, biological_sex
    error_message: "Pre-condition failed: Dados antropometricos incompletos"

  - [ ] Objetivo definido com clareza (bulk, cut, maintenance, etc.)
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que goal_definition contem primary_goal valido
    error_message: "Pre-condition failed: Objetivo nao definido"

  - [ ] Nivel de atividade declarado ou estimavel
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que client_profile contem activity_description ou activity_level
    error_message: "Pre-condition failed: Nivel de atividade nao informado"

  - [ ] Numero de refeicoes por dia definido
    tipo: pre-condition
    blocker: false
    validacao: |
      Verificar que meals_per_day esta definido (default: 5)
    error_message: "Warning: Numero de refeicoes nao definido, usando default 5"
```

---

## Post-Conditions

```yaml
post-conditions:
  - [ ] TDEE calculado com pelo menos uma formula validada
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que tdee_report contem pelo menos um calculo de BMR e TDEE
    error_message: "Post-condition failed: TDEE nao calculado"

  - [ ] Macros somam corretamente para as calorias alvo
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que (protein_g * 4) + (carbs_g * 4) + (fat_g * 9) == target_calories (margem 2%)
    error_message: "Post-condition failed: Macros nao batem com calorias alvo"

  - [ ] Proteina dentro do range seguro (0.7-1.5 g/lb)
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que protein_g >= 0.7 * weight_lb AND protein_g <= 1.5 * weight_lb
    error_message: "Post-condition failed: Proteina fora do range seguro"

  - [ ] Distribuicao por refeicao gerada com leucine threshold
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que meal_distribution contem todas as refeicoes com protein >= 20g cada
    error_message: "Post-condition failed: Distribuicao por refeicao incompleta"

  - [ ] Deficit nao excede 1000 kcal sem flag de supervisao medica
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que deficit <= 1000 kcal OR medical_supervision == true
    error_message: "Post-condition failed: Deficit > 1000 kcal requer supervisao medica"
```

---

## Acceptance Criteria

```yaml
acceptance-criteria:
  - [ ] AC-1: BMR calculado com formula primaria (Mifflin-St Jeor) e pelo menos uma secundaria
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que tdee_report contem bmr_mifflin e pelo menos bmr_harris_benedict ou bmr_katch_mcardle
    error_message: "AC-1 nao atendido: BMR nao calculado com multiplas formulas"

  - [ ] AC-2: Activity multiplier justificado com base na rotina do cliente
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que tdee_report contem activity_multiplier com justificativa textual
    error_message: "AC-2 nao atendido: Multiplicador de atividade sem justificativa"

  - [ ] AC-3: Macro split alinhado com objetivo e estrategia escolhida
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que macro_prescription contem strategy_name e macros respeitam limites da estrategia
    error_message: "AC-3 nao atendido: Macro split inconsistente com estrategia"

  - [ ] AC-4: Distribuicao por refeicao respeita leucine threshold e peri-workout timing
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que meal_distribution respeita protein >= 20g por refeicao e carb timing peri-workout
    error_message: "AC-4 nao atendido: Distribuicao por refeicao inadequada"

  - [ ] AC-5: Micronutrientes minimos, fibra e agua calculados
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que micronutrient_minimums contem fiber_g, water_ml, e pelo menos 5 micronutrientes
    error_message: "AC-5 nao atendido: Micronutrientes minimos nao definidos"

  - [ ] AC-6: Nenhuma violacao de veto (deficit > 1000 sem supervisao, proteina < 0.7g/lb)
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que nenhum veto foi violado no calculo final
    error_message: "AC-6 nao atendido: Violacao de regra de veto detectada"
```

---

## Veto Rules (Bloqueios Absolutos)

```yaml
veto_rules:
  - id: VETO-MACRO-001
    rule: "Deficit calorico > 1000 kcal sem declaracao de supervisao medica"
    severity: CRITICAL
    action: BLOCK
    message: "Deficit superior a 1000 kcal requer acompanhamento medico. Reduza para max 1000 kcal ou obtenha liberacao."

  - id: VETO-MACRO-002
    rule: "Proteina < 0.7 g/lb (1.54 g/kg) de peso corporal"
    severity: CRITICAL
    action: BLOCK
    message: "Proteina abaixo de 0.7g/lb compromete preservacao de massa magra. Aumente proteina antes de prosseguir."

  - id: VETO-MACRO-003
    rule: "Gordura < 0.5 g/kg de peso corporal"
    severity: CRITICAL
    action: BLOCK
    message: "Gordura abaixo de 0.5g/kg compromete funcao hormonal. Minimo fisiologico nao pode ser violado."

  - id: VETO-MACRO-004
    rule: "Calorias alvo abaixo da BMR (taxa metabolica basal)"
    severity: CRITICAL
    action: BLOCK
    message: "Calorias abaixo da BMR sao inseguras e insustentaveis. Ajuste o deficit para ficar acima da BMR."

  - id: VETO-MACRO-005
    rule: "Carboidratos < 50g/dia sem estrategia cetogenica explicitamente escolhida"
    severity: HIGH
    action: WARN_AND_CONFIRM
    message: "Carboidratos muito baixos sem intencao cetogenica. Confirme se o cliente deseja abordagem cetogenica."
```

---

## Tools

- **Tool:** macro-calculator
  - **Purpose:** Calcular TDEE, BMR e distribuicao de macronutrientes
  - **Source:** squads/fitcoach/tools/macro-calculator

- **Tool:** quality-checker
  - **Purpose:** Validar prescricao de macros contra evidencia cientifica
  - **Source:** squads/fitcoach/tools/quality-checker

---

## SEQUENTIAL Task Execution (Nao prosseguir ate a Task atual estar completa)

### Step 0: Receber Dados e Contexto

- Carregar client_profile com dados antropometricos
- Carregar body_composition se disponivel (BF% para Katch-McArdle)
- Carregar goal_definition com objetivo primario
- Carregar training_schedule se disponivel (para activity multiplier preciso)
- Carregar metabolic_history se disponivel (para ajuste de adaptacao metabolica)
- Carregar dietary_preferences (meals_per_day, macro_split_preference)

```yaml
step_0:
  name: "Receber Dados e Contexto"
  executor: diet-builder
  duration_expected: "2-3 min"
  inputs:
    - client_profile
    - body_composition (optional)
    - goal_definition
    - training_schedule (optional)
    - metabolic_history (optional)
    - dietary_preferences
  outputs:
    - calculation_context
```

### Step 1: Calculo da Taxa Metabolica Basal (BMR)

#### 1.1 Mifflin-St Jeor (Formula Preferida)

Formula mais precisa para populacao geral (Frankenfield et al., 2005):

**Homens:**
BMR = (10 x peso_kg) + (6.25 x altura_cm) - (5 x idade) + 5

**Mulheres:**
BMR = (10 x peso_kg) + (6.25 x altura_cm) - (5 x idade) - 161

```yaml
step_1_1:
  name: "BMR — Mifflin-St Jeor (Preferida)"
  executor: diet-builder
  tool: macro-calculator
  duration_expected: "1-2 min"
  formula: "mifflin_st_jeor"
  inputs:
    - weight_kg
    - height_cm
    - age
    - biological_sex
  output: bmr_mifflin
```

#### 1.2 Harris-Benedict Revisada (Formula Secundaria)

Formula classica revisada por Roza & Shizgal (1984):

**Homens:**
BMR = (13.397 x peso_kg) + (4.799 x altura_cm) - (5.677 x idade) + 88.362

**Mulheres:**
BMR = (9.247 x peso_kg) + (3.098 x altura_cm) - (4.330 x idade) + 447.593

```yaml
step_1_2:
  name: "BMR — Harris-Benedict Revisada (Secundaria)"
  executor: diet-builder
  tool: macro-calculator
  duration_expected: "1-2 min"
  formula: "harris_benedict_revised"
  inputs:
    - weight_kg
    - height_cm
    - age
    - biological_sex
  output: bmr_harris_benedict
```

#### 1.3 Katch-McArdle (Se BF% Disponivel)

Formula mais precisa quando body fat % e conhecido:

BMR = 370 + (21.6 x massa_magra_kg)

Onde: massa_magra_kg = peso_kg x (1 - body_fat_percent / 100)

```yaml
step_1_3:
  name: "BMR — Katch-McArdle (Se BF% Disponivel)"
  executor: diet-builder
  tool: macro-calculator
  duration_expected: "1-2 min"
  formula: "katch_mcardle"
  condition: "body_composition.body_fat_percent is available"
  inputs:
    - weight_kg
    - body_fat_percent
  output: bmr_katch_mcardle
```

#### 1.4 Selecao de BMR Final

- Se BF% disponivel e confiavel (DEXA ou adipometro): usar Katch-McArdle
- Se BF% nao disponivel: usar Mifflin-St Jeor como primaria
- Apresentar todas as formulas calculadas para transparencia
- Diferenca > 15% entre formulas: flag para revisao do coach

```yaml
step_1_4:
  name: "Selecao de BMR Final"
  executor: diet-builder
  duration_expected: "1-2 min"
  selection_logic:
    primary: "katch_mcardle (if BF% available and reliable)"
    fallback: "mifflin_st_jeor"
    comparison: "flag if variance > 15% between formulas"
  output: bmr_selected
```

### Step 2: Calculo do TDEE (Total Daily Energy Expenditure)

#### 2.1 Multiplicadores de Atividade

Aplicar multiplicador ao BMR baseado no nivel de atividade detalhado:

| Nivel | Multiplicador | Descricao | Exemplos |
|-------|-------------|-----------|----------|
| Sedentario | 1.2 | Trabalho de escritorio, sem exercicio | Programador que nao treina |
| Levemente ativo | 1.375 | Exercicio leve 1-3 dias/semana | Caminhada, yoga casual |
| Moderadamente ativo | 1.55 | Exercicio moderado 3-5 dias/semana | Musculacao 3-4x/semana |
| Ativo | 1.725 | Exercicio intenso 6-7 dias/semana | Musculacao 5-6x + cardio |
| Muito ativo | 1.9 | Exercicio muito intenso + trabalho fisico | Atleta + trabalho braco |

**Sub-categorias para precisao:**

| Fator | Ajuste | Condicao |
|-------|--------|----------|
| NEAT alto (pessoa inquieta) | +0.05 | Cliente relata muita movimentacao no dia |
| NEAT baixo (muito sedentario fora do treino) | -0.05 | Cliente trabalha sentado e dirige para tudo |
| Trabalho fisico (construcao, garcom) | +0.1-0.2 | Gasto calorico ocupacional significativo |
| Cardio adicional (LISS 30-60min) | +0.05-0.1 | Sessoes de cardio alem da musculacao |
| TEF elevado (dieta alta em proteina) | +0.02-0.05 | Proteina > 30% das calorias |

```yaml
step_2_1:
  name: "Multiplicador de Atividade"
  executor: diet-builder
  duration_expected: "3-5 min"
  inputs:
    - activity_description
    - training_schedule (optional)
    - work_type
  sub_adjustments:
    - neat_adjustment
    - occupational_adjustment
    - cardio_adjustment
    - tef_adjustment
  output: activity_multiplier_justified
```

#### 2.2 Calculo do TDEE Final

TDEE = BMR_selecionado x multiplicador_atividade + sub_ajustes

```yaml
step_2_2:
  name: "Calculo do TDEE"
  executor: diet-builder
  tool: macro-calculator
  duration_expected: "1-2 min"
  formula: "bmr_selected * activity_multiplier"
  output: tdee_calculated
```

### Step 3: Ajuste Calorico Baseado no Objetivo

#### 3.1 Goal-Based Caloric Adjustment

| Objetivo | Ajuste | Range | Notas |
|----------|--------|-------|-------|
| **Bulk Lean** | +300-500 kcal | Surplus moderado | Minimizar ganho de gordura; target 0.25-0.5 kg/sem |
| **Bulk Agressivo** | +500-750 kcal | Surplus alto | Apenas beginners ou ectomorfos; target 0.5-1.0 kg/sem |
| **Cut Conservador** | -300-500 kcal | Deficit moderado | Preservar massa; target -0.5 kg/sem |
| **Cut Agressivo** | -750-1000 kcal | Deficit alto | Curto prazo MAX 8 semanas; target -0.75-1.0 kg/sem |
| **Manutencao** | +/- 0 kcal | Neutro | Estabilidade de peso |
| **Recomposicao** | +/- 100 kcal | Calorie cycling opcional | Para intermediarios com BF% moderado |
| **Reverse Diet** | +50-100 kcal/semana | Progressivo | Pos-competicao ou pos-deficit prolongado |
| **Competition Prep** | -500-1000 kcal (faseado) | Progressivo | 16-24 semanas, ajuste a cada 2-4 semanas |

**Regras de Seguranca:**
- NUNCA abaixo da BMR para qualquer objetivo
- Deficit > 750 kcal: alerta ao coach, recomendacao de monitoramento proximo
- Deficit > 1000 kcal: VETO — requer declaracao de supervisao medica

```yaml
step_3_1:
  name: "Ajuste Calorico por Objetivo"
  executor: diet-builder
  advisor: nutrition-scientist
  duration_expected: "3-5 min"
  inputs:
    - tdee_calculated
    - primary_goal
    - client_level (beginner|intermediate|advanced|elite)
    - body_fat_percent (optional)
  veto_checks:
    - "target_calories >= bmr_selected"
    - "deficit <= 1000 OR medical_supervision == true"
  output: target_calories
```

### Step 4: Distribuicao de Macronutrientes

#### 4.1 Estrategias de Macro Split

**Estrategia 1 — Bodybuilding (Default para hipertrofia):**
- Proteina: 1.0 g/lb (2.2 g/kg) — prioridade 1
- Gordura: 0.8-1.0 g/kg — prioridade 2
- Carboidrato: calorias restantes / 4 — prioridade 3

**Estrategia 2 — Performance (Atletas/Endurance):**
- Proteina: 1.6-2.0 g/kg — prioridade 1
- Carboidrato: 4-7 g/kg (baseado em volume de treino) — prioridade 2
- Gordura: calorias restantes / 9 — prioridade 3

**Estrategia 3 — Cetogenica (<50g carbs):**
- Gordura: 65-75% das calorias — prioridade 1
- Proteina: 1.6-2.2 g/kg — prioridade 2
- Carboidrato: max 50g (preferencialmente 20-30g net carbs) — residual

**Estrategia 4 — Balanced (40/30/30):**
- Proteina: 30% das calorias
- Carboidrato: 40% das calorias
- Gordura: 30% das calorias

**Estrategia 5 — Custom (User-Defined):**
- Ratios definidos pelo coach/cliente
- Validacao: proteina >= 0.7 g/lb, gordura >= 0.5 g/kg

```yaml
step_4_1:
  name: "Macro Split Strategy Selection"
  executor: diet-builder
  advisor: nutrition-scientist
  duration_expected: "5-8 min"
  strategies:
    bodybuilding:
      protein: "1.0 g/lb (2.2 g/kg)"
      fat: "0.8-1.0 g/kg"
      carbs: "remainder"
      priority_order: [protein, fat, carbs]
    performance:
      protein: "1.6-2.0 g/kg"
      carbs: "4-7 g/kg"
      fat: "remainder"
      priority_order: [protein, carbs, fat]
    ketogenic:
      fat: "65-75% of calories"
      protein: "1.6-2.2 g/kg"
      carbs: "max 50g"
      priority_order: [fat, protein, carbs]
    balanced:
      protein: "30%"
      carbs: "40%"
      fat: "30%"
      priority_order: [protein, carbs, fat]
    custom:
      ratios: "user_defined"
      validation: "protein >= 0.7g/lb, fat >= 0.5g/kg"
  output: macro_split
```

#### 4.2 Calculo Final dos Macros (Gramas e Calorias)

Aplicar a estrategia selecionada ao target calorico:

1. Calcular macro prioridade 1 em gramas
2. Converter para calorias (P: 4kcal/g, C: 4kcal/g, G: 9kcal/g)
3. Calcular macro prioridade 2 em gramas
4. Calorias restantes -> macro prioridade 3
5. Validar: soma == target_calories (margem 2%)

```yaml
step_4_2:
  name: "Calculo Final dos Macros"
  executor: diet-builder
  tool: macro-calculator
  duration_expected: "3-5 min"
  validation:
    - "protein_g >= 0.7 * weight_lb"
    - "fat_g >= 0.5 * weight_kg"
    - "sum_calories within 2% of target"
  output: macro_prescription_final
```

### Step 5: Distribuicao por Refeicao (Meal Timing)

#### 5.1 Distribuicao Baseada no Numero de Refeicoes

| Refeicoes/dia | Distribuicao Proteica | Distribuicao Carb | Distribuicao Gordura |
|---------------|----------------------|-------------------|---------------------|
| 3 refeicoes | 33/33/33% | 30/40/30% (mais carb no almoco/pre-treino) | 33/33/33% |
| 4 refeicoes | 25/25/25/25% | 20/30/30/20% (peri-workout concentrado) | 25/25/25/25% |
| 5 refeicoes | 20/20/20/20/20% | 15/20/25/25/15% (peri-workout concentrado) | 20/20/20/20/20% |
| 6 refeicoes | 17/17/17/17/17/15% | 10/15/20/25/20/10% (peri-workout concentrado) | 17/17/17/17/17/15% |

**Regras de Timing (Norton — evidence-based):**
- Proteina: distribuir uniformemente, minimo 20g por refeicao (leucine threshold ~2.5-3g)
- Carboidratos: concentrar 40-50% peri-workout (pre + pos treino)
- Gordura: evitar excesso peri-workout (retarda digestao), distribuir em demais refeicoes
- Pre-treino (2-3h antes): alto carb + proteina, baixo gordura e fibra
- Pos-treino (ate 2h apos): alto carb + proteina, moderado gordura

```yaml
step_5_1:
  name: "Distribuicao por Refeicao"
  executor: diet-builder
  advisor: nutrition-scientist
  duration_expected: "5-8 min"
  inputs:
    - meals_per_day
    - training_time (optional)
    - macro_prescription_final
  constraints:
    protein_per_meal: ">= 20g"
    leucine_per_meal: ">= 2.5g"
    peri_workout_carbs: "40-50% of daily carbs"
    peri_workout_fat: "< 15g combined pre+post"
  output: meal_distribution
```

### Step 6: Micronutrientes, Fibra e Agua

#### 6.1 Minimos de Fibra

- Target geral: 25-40g/dia (10-15g por 1000 kcal)
- Em deficit calorico: manter pelo menos 25g (saciedade + saude intestinal)
- Em surplus: 30-40g para saude geral
- Fontes: vegetais cruciferos, aveia, chia, linhaca, feijao, frutas com casca

#### 6.2 Minimos de Agua

- Base: peso_kg x 35 ml
- Adicional por treino: +500-750ml por hora de exercicio
- Adicional por clima quente: +500ml
- Adicional por alta proteina (>2g/kg): +250-500ml

#### 6.3 Micronutrientes Minimos

| Micronutriente | Minimo Diario | Fontes Principais | Notas |
|---------------|--------------|------------------|-------|
| Vitamina D | 600-2000 IU | Sol, peixes gordos, suplemento | Maioria das pessoas necessita suplemento |
| Calcio | 1000-1200 mg | Laticinios, brocolis, sardinha | Importante para saude ossea |
| Ferro | 8-18 mg | Carne vermelha, feijao, espinafre | Mulheres necessitam mais (menstruacao) |
| Zinco | 8-11 mg | Carne, frutos do mar, sementes | Importante para testosterona e imunidade |
| Magnesio | 310-420 mg | Castanhas, chocolate amargo, espinafre | Comum deficiencia em atletas |
| Potassio | 3500-4700 mg | Banana, batata, abacate, tomate | Equilibrio eletrolítico |
| Sodio | 2000-4000 mg | Sal de cozinha, alimentos processados | Atletas podem precisar de mais |
| Omega-3 (EPA+DHA) | 1-3 g | Peixes gordos, suplemento | Anti-inflamatorio, saude cardiovascular |

```yaml
step_6:
  name: "Micronutrientes, Fibra e Agua"
  executor: diet-builder
  duration_expected: "5-8 min"
  targets:
    fiber_g: "25-40g/day (10-15g per 1000kcal)"
    water_ml: "weight_kg * 35 + training_adjustment + climate_adjustment"
    micronutrients:
      vitamin_d: "600-2000 IU"
      calcium: "1000-1200 mg"
      iron: "8-18 mg"
      zinc: "8-11 mg"
      magnesium: "310-420 mg"
      potassium: "3500-4700 mg"
      sodium: "2000-4000 mg"
      omega_3: "1-3 g EPA+DHA"
  output: micronutrient_minimums
```

### Step 7: Validacao e Quality Check

#### 7.1 Validacao com Quality Checker

- Verificar macros somam corretamente
- Verificar proteina dentro do range seguro
- Verificar gordura acima do minimo fisiologico
- Verificar nenhum veto violado
- Verificar distribuicao por refeicao respeita leucine threshold
- Verificar calorias alvo acima da BMR

```yaml
step_7_1:
  name: "Validacao com Quality Checker"
  executor: diet-builder
  tool: quality-checker
  duration_expected: "3-5 min"
  checks:
    macro_math:
      rule: "(P*4 + C*4 + F*9) within 2% of target calories"
      severity: CRITICAL
    protein_range:
      rule: "protein >= 0.7g/lb AND protein <= 1.5g/lb"
      severity: CRITICAL
    fat_minimum:
      rule: "fat >= 0.5g/kg"
      severity: CRITICAL
    calorie_floor:
      rule: "target_calories >= BMR"
      severity: CRITICAL
    deficit_limit:
      rule: "deficit <= 1000 kcal OR medical_supervision"
      severity: CRITICAL
    leucine_threshold:
      rule: "protein per meal >= 20g"
      severity: HIGH
    fiber_target:
      rule: "fiber 25-40g/day"
      severity: MEDIUM
  output: quality_report
```

#### 7.2 Geracao do Relatorio Final

- Compilar TDEE report com todas as formulas e justificativas
- Compilar macro prescription com estrategia e gramas finais
- Compilar meal distribution com timing por refeicao
- Compilar micronutrient minimums com targets e fontes
- Apresentar ao coach para revisao

```yaml
step_7_2:
  name: "Geracao do Relatorio Final"
  executor: diet-builder
  duration_expected: "5-8 min"
  outputs:
    tdee_report:
      - bmr_all_formulas
      - bmr_selected
      - activity_multiplier_justified
      - tdee_final
      - caloric_adjustment
      - target_calories
    macro_prescription:
      - strategy_name
      - protein_g_and_cal
      - carbs_g_and_cal
      - fat_g_and_cal
      - total_calories
      - g_per_kg_ratios
    meal_distribution:
      - per_meal_macros
      - peri_workout_timing
      - leucine_per_meal
    micronutrient_minimums:
      - fiber_g
      - water_ml
      - micronutrient_targets
  approval_options:
    - approve: "Macros aprovados, prosseguir para plano alimentar"
    - adjust: "Ajustar estrategia ou valores especificos"
    - recalculate: "Recalcular com parametros diferentes"
  output: calculation_final
```

---

## Error Handling

**Strategy:** retry + recalculate

**Common Errors:**

1. **Error:** Formula Retorna Valor Irrealista
   - **Cause:** Dados antropometricos incorretos (ex: peso em libras ao inves de kg)
   - **Resolution:** Validar unidades de entrada, pedir confirmacao ao coach
   - **Recovery:** Converter unidades e recalcular

2. **Error:** Macros Nao Somam para Calorias Alvo
   - **Cause:** Erro de arredondamento ou conflito entre minimos de proteina/gordura e calorias
   - **Resolution:** Ajustar carboidratos (macro residual) para fechar a conta
   - **Recovery:** Recalcular com ajuste fino automatico

3. **Error:** Calorias Insuficientes para Minimos de Proteina e Gordura
   - **Cause:** Deficit muito agressivo em cliente leve, minimos de P+G excedem calorias alvo
   - **Resolution:** Aumentar calorias alvo para acomodar minimos, alertar coach
   - **Recovery:** Sugerir deficit menos agressivo

4. **Error:** BF% Nao Confiavel (Bioimpedancia com variacao alta)
   - **Cause:** Metodo de medicao pouco preciso
   - **Resolution:** Ignorar Katch-McArdle, usar Mifflin-St Jeor como primaria
   - **Recovery:** Alertar coach sobre limitacao do dado

5. **Error:** Discrepancia > 15% Entre Formulas de BMR
   - **Cause:** Cliente com composicao corporal atipica (muito muscular ou muito obeso)
   - **Resolution:** Flag para revisao manual do coach, sugerir media ponderada
   - **Recovery:** Usar media das formulas como BMR final

6. **Error:** Cliente em Metabolic Adaptation (historico de dieta cronica)
   - **Cause:** TDEE real menor que calculado por adaptacao metabolica
   - **Resolution:** Aplicar fator de correcao -5 a -15% no TDEE, monitorar peso por 2 semanas
   - **Recovery:** Ajustar TDEE baseado em dados reais de peso apos 2 semanas

---

## Performance

**Expected Metrics:**

```yaml
duration_expected: "15-25 min (calculo completo)"
cost_estimated: "$0.01-0.03"
token_usage: "~5,000-12,000 tokens"
advisor_consultations: 1-2 (Norton principal, Israetel se timing para hipertrofia)
```

**Optimization Notes:**
- Formulas de BMR podem ser calculadas em paralelo (batch)
- Cache de multiplicadores de atividade por perfil de cliente
- Templates de macro split por estrategia pre-definidos
- Validacao de veto rules em batch no final

---

## Validation Criteria

```yaml
validation:
  scientific_basis:
    - "Mifflin-St Jeor validada por Frankenfield et al. (2005)"
    - "Harris-Benedict revisada por Roza & Shizgal (1984)"
    - "Katch-McArdle para composicao corporal conhecida"
    - "Proteina baseada em meta-analise Morton et al. (2018): 1.6-2.2g/kg"
    - "Distribuicao por refeicao baseada em leucine threshold (Schoenfeld & Aragon, 2018)"
    - "Layne Norton evidence-based macro approach"

  functional:
    - "TDEE calculado com pelo menos 2 formulas para comparacao"
    - "Macros somam corretamente para calorias alvo"
    - "Distribuicao por refeicao respeita leucine threshold"
    - "Todos os veto rules verificados e respeitados"

  quality:
    - "Relatorio claro com justificativas para cada decisao"
    - "Multiplas formulas apresentadas para transparencia"
    - "Micronutrientes e agua calculados como parte do output"
    - "Estrategia de macro split nomeada e explicada"
```

---

## Metadata

```yaml
task_id: FC-TASK-010
name: calculate-macros
version: 1.0.0
squad: fitcoach
dependencies:
  - client-intake (FC-TASK-001)
  - create-training-plan (FC-TASK-002, optional — para activity multiplier preciso)
  - nutrition-scientist (advisor)
  - hypertrophy-scientist (advisor, para nutrition timing)
  - macro-calculator (tool)
  - quality-checker (tool)
tags:
  - nutrition
  - macros
  - tdee
  - bmr
  - metabolism
  - calculator
updated_at: 2026-03-13
```

---

## Handoff

```yaml
next_task:
  primary:
    task: "create-diet-plan"
    condition: "Macros calculados e aprovados pelo coach"
    data_passed: [tdee_report, macro_prescription, meal_distribution, micronutrient_minimums]
  secondary:
    task: "adjust-protocol"
    condition: "Quando check-in indica necessidade de recalcular macros"
  upstream:
    task: "client-intake"
    data_received: [client_profile, body_composition, goal_definition]
```
