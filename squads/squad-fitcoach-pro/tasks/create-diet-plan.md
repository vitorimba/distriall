<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: create-diet-plan
  task_name: Create Diet Plan
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
- Gera plano alimentar completo sem intervencao
- Usa defaults baseados no perfil e macros calculados
- **Melhor para:** Clientes com objetivo padrao e sem restricoes complexas

### 2. Interactive Mode - Balanceado, Educativo (5-10 prompts) **[DEFAULT]**
- Checkpoints em cada fase da construcao nutricional
- Explica decisoes de macro distribuicao e timing
- **Melhor para:** Clientes com restricoes alimentares, primeiros planos

### 3. Pre-Flight Planning - Planejamento Completo Antecipado
- Analisa todas as variaveis nutricionais antes de gerar
- Zero ambiguidade na prescricao
- **Melhor para:** Competition prep nutrition, clientes com condicoes medicas

**Parameter:** `mode` (optional, default: `interactive`)

---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: createDietPlan()
id: FC-TASK-003
responsavel: diet-builder
responsavel_type: Agent
squad: fitcoach
pattern_prefix: FC
atomic_layer: Organism

advisors:
  - nutrition-scientist (Layne Norton) — Reverse dieting, IIFYM, metabolic adaptation
  - hypertrophy-scientist (Mike Israetel) — Nutrition for hypertrophy, carb timing
  - prep-master (Hany Rambod) — Contest prep nutrition, peak week

**Entrada:**
- campo: client_profile
  tipo: object
  origem: client-intake task output
  obrigatorio: true
  validacao: Must contain anthropometric data, dietary restrictions

- campo: goal_definition
  tipo: object
  origem: client-intake task output
  obrigatorio: true
  validacao: Must contain primary_goal with SMART format and caloric target

- campo: metabolic_baseline
  tipo: object
  origem: client-intake task output (macro-calculator)
  obrigatorio: true
  validacao: Must contain TDEE, BMR, initial macros

- campo: training_plan
  tipo: object
  origem: create-training-plan task output
  obrigatorio: false
  validacao: If available, used to sync nutrition timing with training

- campo: dietary_preferences
  tipo: object
  origem: User Input (anamnese)
  obrigatorio: true
  validacao: Must contain restrictions, allergies, meals_per_day, food_preferences

- campo: budget_constraint
  tipo: enum [low, medium, high, unlimited]
  origem: User Input
  obrigatorio: false
  validacao: Affects food selection and supplement recommendations

**Saida:**
- campo: diet_plan
  tipo: object
  destino: Data Store (clients/{id}/plans/nutrition/)
  persistido: true

- campo: macro_targets
  tipo: object
  destino: Data Store (clients/{id}/plans/nutrition/macros.json)
  persistido: true

- campo: meal_plan
  tipo: object
  destino: Data Store (clients/{id}/plans/nutrition/meals.json)
  persistido: true

- campo: substitution_matrix
  tipo: object
  destino: Data Store (clients/{id}/plans/nutrition/substitutions.json)
  persistido: true

- campo: supplement_protocol
  tipo: object
  destino: Data Store (clients/{id}/plans/nutrition/supplements.json)
  persistido: true

- campo: shopping_list
  tipo: object
  destino: Data Store (clients/{id}/plans/nutrition/shopping-list.json)
  persistido: true

- campo: diet_plan_pdf
  tipo: file
  destino: Data Store (clients/{id}/plans/nutrition/plan.pdf)
  persistido: true
```

---

## Pre-Conditions

```yaml
pre-conditions:
  - [ ] Client intake completo com dados antropometricos e metabolicos
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que metabolic_baseline existe com TDEE calculado
    error_message: "Pre-condition failed: Baseline metabolico nao calculado"

  - [ ] Restricoes alimentares e alergias documentadas
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que dietary_preferences contem campo de restricoes
    error_message: "Pre-condition failed: Restricoes alimentares nao documentadas"

  - [ ] Objetivo calorico definido (surplus, deficit ou manutencao)
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que goal_definition contem caloric_target ou caloric_strategy
    error_message: "Pre-condition failed: Estrategia calorica nao definida"

  - [ ] Numero de refeicoes por dia definido
    tipo: pre-condition
    blocker: false
    validacao: |
      Verificar que meals_per_day esta definido (default: 4-5)
    error_message: "Warning: Numero de refeicoes nao definido, usando default 5"
```

---

## Post-Conditions

```yaml
post-conditions:
  - [ ] Plano alimentar completo com todas as refeicoes do dia
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que meal_plan contem todas as refeicoes definidas
    error_message: "Post-condition failed: Plano alimentar incompleto"

  - [ ] Macros totais do dia batem com targets calculados (margem 5%)
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que soma dos macros de todas as refeicoes esta dentro de 5% do target
    error_message: "Post-condition failed: Macros totais fora do target"

  - [ ] Substituicoes disponiveis para cada alimento
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que substitution_matrix cobre todos os alimentos do plano
    error_message: "Post-condition failed: Substituicoes nao definidas"

  - [ ] Nenhum alimento viola restricoes/alergias do cliente
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que nenhum alimento do plano esta na lista de restricoes
    error_message: "Post-condition failed: Alimento proibido detectado no plano"
```

---

## Acceptance Criteria

```yaml
acceptance-criteria:
  - [ ] AC-1: Calorias totais alinhadas com objetivo (surplus/deficit/manutencao)
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que total_calories esta dentro de 5% do target calculado
    error_message: "AC-1 nao atendido: Calorias fora do target"

  - [ ] AC-2: Distribuicao de macros otimizada para o objetivo
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que proteina >= 1.6g/kg, gordura >= 0.7g/kg, carbs completam calorias
    error_message: "AC-2 nao atendido: Macros nao otimizados"

  - [ ] AC-3: Meal timing sincronizado com treino (pre/intra/pos)
    tipo: acceptance-criterion
    blocker: false
    validacao: |
      Assert que refeicoes peri-workout estao configuradas corretamente
    error_message: "AC-3 nao atendido: Timing peri-workout nao configurado"

  - [ ] AC-4: Plano respeita restricoes e preferencias alimentares
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que zero alimentos violam restricoes do cliente
    error_message: "AC-4 nao atendido: Violacao de restricao alimentar"

  - [ ] AC-5: Lista de compras e substituicoes geradas
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que shopping_list e substitution_matrix foram gerados
    error_message: "AC-5 nao atendido: Lista de compras ou substituicoes ausentes"
```

---

## Tools

- **Tool:** macro-calculator
  - **Purpose:** Calcular e ajustar macronutrientes com precisao
  - **Source:** squads/fitcoach/tools/macro-calculator

- **Tool:** quality-checker
  - **Purpose:** Validar plano nutricional contra evidencia cientifica
  - **Source:** squads/fitcoach/tools/quality-checker

---

## SEQUENTIAL Task Execution (Nao prosseguir ate a Task atual estar completa)

### Step 0: Receber Dados e Contexto

- Carregar metabolic_baseline do client-intake
- Carregar training_plan se disponivel (para sync de timing)
- Carregar dietary_preferences e restricoes
- Carregar goal_definition com target calorico

```yaml
step_0:
  name: "Receber Dados e Contexto"
  executor: diet-builder
  duration_expected: "2-3 min"
  inputs:
    - metabolic_baseline
    - training_plan (optional)
    - dietary_preferences
    - goal_definition
    - client_profile
  outputs:
    - nutrition_context
```

### Step 1: Calculo de Macros Detalhado

#### 1.1 Ajuste Fino de Calorias

- Usar TDEE calculado no intake como ponto de partida
- Aplicar ajuste baseado no objetivo:
  - **Bulk Lean:** TDEE + 200-300 kcal (minimizar ganho de gordura)
  - **Bulk Moderado:** TDEE + 300-500 kcal (equilíbrio)
  - **Bulk Agressivo:** TDEE + 500-750 kcal (apenas para ectomorfos/beginners)
  - **Cut Conservador:** TDEE - 300-500 kcal (preservar massa)
  - **Cut Moderado:** TDEE - 500-750 kcal (equilíbrio)
  - **Cut Agressivo:** TDEE - 750-1000 kcal (apenas curto prazo, com supervisao)
  - **Recomp:** TDEE +/- 100 kcal (cycling calórico opcional)
  - **Manutencao:** TDEE exato

```yaml
step_1_1:
  name: "Ajuste Fino de Calorias"
  executor: diet-builder
  tool: macro-calculator
  duration_expected: "3-5 min"
  output: caloric_target
```

#### 1.2 Distribuicao de Macronutrientes

Consultar nutrition-scientist (Layne Norton) para metodologia de distribuicao:

**Protocolo Norton para Macros:**

**Proteina (prioridade 1 — definir primeiro):**
- Bulk: 1.6-2.2 g/kg de peso corporal
- Cut: 2.0-2.7 g/kg (maior para preservar massa em deficit)
- Recomp: 2.0-2.4 g/kg
- Competition Prep: 2.3-3.1 g/kg (ultimo estagio)
- Distribuir em 4-6 doses de 30-50g ao longo do dia
- Leucine threshold: minimo 2.5-3g de leucina por refeicao

**Gordura (prioridade 2 — definir segundo):**
- Minimo fisiologico: 0.5 g/kg (NUNCA abaixo disso)
- Recomendado: 0.7-1.2 g/kg
- Preferencia por fontes insaturadas (70%) vs saturadas (30%)
- Em deficit: manter pelo menos 0.7 g/kg para funcao hormonal

**Carboidrato (prioridade 3 — preenche o restante):**
- Calorias restantes apos proteina e gordura
- Minimo recomendado: 2-3 g/kg (para performance no treino)
- Timing: concentrar ao redor do treino (pre, intra, pos)
- Preferencia por fontes complexas (70%) vs simples (30%)

```yaml
step_1_2:
  name: "Distribuicao de Macros (Norton)"
  executor: diet-builder
  advisor: nutrition-scientist
  duration_expected: "5-8 min"
  macro_priority_order:
    1: protein
    2: fat
    3: carbs
  output: macro_distribution
```

#### 1.3 Micronutrientes e Fibras

- Definir targets de fibra: 25-40g/dia (10-15g por 1000kcal)
- Garantir diversidade de fontes para micronutrientes
- Identificar potenciais deficiencias baseadas no padrao alimentar
- Recomendar fontes alimentares ricas em micronutrientes especificos

```yaml
step_1_3:
  name: "Micronutrientes e Fibras"
  executor: diet-builder
  duration_expected: "3-5 min"
  targets:
    fiber: "25-40g/day"
    sodium: "2000-4000mg/day"
    potassium: "3500-4700mg/day"
    calcium: "1000-1200mg/day"
    iron: "8-18mg/day"
    vitamin_d: "600-2000 IU/day"
  output: micronutrient_targets
```

### Step 2: Consultar Norton — Metodologia IIFYM e Meal Structure

#### 2.1 Filosofia IIFYM (If It Fits Your Macros)

Aplicar principios de Norton para flexibilidade nutricional:

**Regra 80/20 Norton:**
- 80% das calorias de alimentos integrais/minimamente processados
- 20% de alimentos de livre escolha (desde que batam nos macros)
- Isso aumenta aderencia sem comprometer resultados

**Distribuicao por Refeicao:**
- Proteina: distribuir uniformemente em 4-6 refeicoes (leucine threshold cada)
- Carboidratos: concentrar 40-50% peri-workout (pre + pos treino)
- Gordura: distribuir ao longo do dia, evitar excesso peri-workout
- Refeicao pre-treino: 2-3h antes, alta em carb + proteina, baixa em gordura e fibra
- Refeicao pos-treino: ate 2h apos, alta em carb + proteina, moderada em gordura

```yaml
step_2_1:
  name: "Metodologia IIFYM (Norton)"
  executor: diet-builder
  advisor: nutrition-scientist
  duration_expected: "5-8 min"
  meal_structure:
    meals_per_day: "{dietary_preferences.meals_per_day}"
    protein_per_meal: "total_protein / meals_per_day"
    carb_distribution:
      pre_workout: "20-25% of daily carbs"
      post_workout: "20-25% of daily carbs"
      other_meals: "evenly distributed"
    fat_distribution:
      peri_workout: "minimal (<15g)"
      other_meals: "evenly distributed"
  output: meal_structure
```

#### 2.2 Metabolic Adaptation e Diet Breaks

Norton sobre adaptacao metabolica e estrategias de quebra:

**Para clientes em deficit calorico:**
- Diet breaks a cada 8-12 semanas de deficit continuo
- Diet break: 1-2 semanas em calorias de manutencao
- Refeed days: 1-2x/semana com calorias elevadas (foco em carbs)
- Refeed protocol: aumentar carbs 50-100%, manter proteina, reduzir gordura

**Para clientes em surplus:**
- Mini-cuts de 2-4 semanas quando BF% subir demais
- Manutencao de sensibilidade a insulina com periodos em calorias normais

```yaml
step_2_2:
  name: "Metabolic Adaptation Strategy (Norton)"
  executor: diet-builder
  advisor: nutrition-scientist
  duration_expected: "5-8 min"
  strategies:
    deficit:
      diet_break:
        frequency: "every_8-12_weeks"
        duration: "1-2 weeks"
        calories: "maintenance TDEE"
      refeed:
        frequency: "1-2x/week"
        carb_increase: "50-100%"
        fat_reduction: "proportional"
    surplus:
      mini_cut:
        trigger: "BF% increase > 3-4% from baseline"
        duration: "2-4 weeks"
        deficit: "moderate (500kcal)"
  output: adaptation_strategy
```

### Step 3: Build do Plano de Refeicoes

#### 3.1 Selecao de Alimentos Base

- Construir base de alimentos por categoria:
  - **Proteinas:** frango, carne, peixe, ovos, whey, caseina, iogurte grego
  - **Carboidratos complexos:** arroz, batata doce, aveia, macarrao integral, mandioca
  - **Carboidratos simples:** frutas, mel, dextrose (peri-workout)
  - **Gorduras saudaveis:** azeite, abacate, castanhas, pasta de amendoim, omega-3
  - **Vegetais:** brocolis, espinafre, couve, tomate, cebola, abobrinha
  - **Fibras:** aveia, chia, linhaca, vegetais cruciferos

- Respeitar restricoes:
  - Lactose-free: substituir laticinios por alternativas vegetais
  - Gluten-free: substituir trigo por arroz, milho, mandioca
  - Vegan: proteina de soja, ervilha, tofu, tempeh, seitan
  - Budget-friendly: priorizar frango, ovos, arroz, feijao, batata

```yaml
step_3_1:
  name: "Selecao de Alimentos"
  executor: diet-builder
  duration_expected: "8-10 min"
  food_database:
    per_food:
      - name: "Nome do alimento"
      - portion_grams: 100
      - calories: number
      - protein: number
      - carbs: number
      - fat: number
      - fiber: number
      - category: "protein|carb|fat|vegetable|fruit"
      - restrictions: ["lactose", "gluten", "vegan"]
      - cost_tier: "low|medium|high"
  output: food_selection
```

#### 3.2 Montagem das Refeicoes

- Para cada refeicao, montar combinacao que atinge macros da refeicao
- Incluir porcoes em gramas e medidas caseiras
- Incluir modo de preparo simplificado
- Marcar refeicoes peri-workout

**Template de Refeicao:**
```
Refeicao 3 — Almoco (Pre-Treino -3h)
├── Arroz branco: 150g (1 xicara cheia)
├── Frango grelhado: 200g (1 peito medio)
├── Brocolis: 100g (4-5 floretes)
├── Azeite de oliva: 10ml (1 colher de sopa)
└── Totais: 580kcal | P: 48g | C: 55g | G: 15g | F: 5g
```

```yaml
step_3_2:
  name: "Montagem das Refeicoes"
  executor: diet-builder
  duration_expected: "15-20 min"
  per_meal:
    - meal_number: 1
    - meal_name: "Cafe da Manha"
    - time_suggestion: "07:00"
    - relation_to_training: "none|pre|post|intra"
    - foods:
        - name: "Aveia"
          grams: 80
          home_measure: "4 colheres de sopa"
          preparation: "Cozinhar com agua ou leite"
    - totals:
        calories: number
        protein: number
        carbs: number
        fat: number
        fiber: number
  output: meal_plan
```

#### 3.3 Dia de Treino vs Dia de Descanso

- Criar duas versoes do plano:
  - **Training Day:** Mais carboidratos, foco peri-workout
  - **Rest Day:** Menos carboidratos, mais gordura, calorias ligeiramente menores
- Diferenca tipica: 200-400 kcal entre dias de treino e descanso
- Proteina permanece igual em ambos os dias

```yaml
step_3_3:
  name: "Training Day vs Rest Day"
  executor: diet-builder
  duration_expected: "8-10 min"
  variations:
    training_day:
      carb_adjustment: "+10-20%"
      fat_adjustment: "-10-15%"
      total_calories: "target + 100-200 kcal"
    rest_day:
      carb_adjustment: "-10-20%"
      fat_adjustment: "+10-15%"
      total_calories: "target - 100-200 kcal"
  output: day_variations
```

### Step 4: Matriz de Substituicoes

#### 4.1 Substituicoes Equivalentes

Para cada alimento do plano, definir 3-5 substituicoes com macros equivalentes:

**Categorias de Substituicao:**
- **Proteinas:** frango ↔ tilapia ↔ patinho ↔ peito de peru ↔ atum
- **Carbs complexos:** arroz ↔ batata doce ↔ macarrao ↔ mandioca ↔ inhame
- **Carbs simples:** banana ↔ maca ↔ mamao ↔ uva ↔ mel
- **Gorduras:** azeite ↔ abacate ↔ castanhas ↔ pasta de amendoim ↔ chia
- **Vegetais:** brocolis ↔ couve-flor ↔ espinafre ↔ abobrinha ↔ aspargos

**Regra:** Substituicao deve estar dentro de 10% de diferenca nos macros

```yaml
step_4_1:
  name: "Matriz de Substituicoes"
  executor: diet-builder
  duration_expected: "10-12 min"
  per_food:
    substitutions:
      - name: "Alimento substituto"
        grams_equivalent: "Gramas para macros equivalentes"
        macro_diff_percent: "<10%"
        taste_profile: "similar|different"
        preparation: "Modo de preparo"
  output: substitution_matrix
```

### Step 5: Protocolo de Suplementacao

#### 5.1 Suplementos Baseados em Evidencia

Consultar Norton para recomendacao de suplementos com forte evidencia cientifica:

**Tier 1 — Forte Evidencia (Recomendar):**
- **Creatina Monohidratada:** 3-5g/dia, todo dia (treino e descanso)
- **Whey Protein:** Para atingir meta proteica quando alimentacao insuficiente
- **Vitamina D3:** 2000-5000 IU/dia (se nao toma sol regularmente)
- **Omega-3 (Fish Oil):** 2-3g EPA+DHA/dia

**Tier 2 — Evidencia Moderada (Considerar):**
- **Cafeina:** 3-6mg/kg, 30-60min pre-treino
- **Citrulina Malato:** 6-8g pre-treino
- **Beta-Alanina:** 3-6g/dia (loading)
- **Multivitaminico:** Se dieta variada insuficiente

**Tier 3 — Evidencia Fraca (Opcional):**
- **BCAA/EAA:** Desnecessario se proteina total adequada
- **Glutamina:** Pouca evidencia para atletas saudaveis
- **Pre-treino comercial:** Avaliar ingredientes individualmente

```yaml
step_5_1:
  name: "Protocolo de Suplementacao (Norton)"
  executor: diet-builder
  advisor: nutrition-scientist
  duration_expected: "5-8 min"
  per_supplement:
    - name: "Nome do suplemento"
    - dose: "Dosagem recomendada"
    - timing: "Quando tomar"
    - evidence_tier: "1|2|3"
    - notes: "Observacoes especificas"
    - contraindications: ["Se aplicavel"]
  output: supplement_protocol
```

### Step 6: Geracao de Outputs

#### 6.1 Lista de Compras Semanal

- Agregar todos os alimentos do plano semanal
- Calcular quantidades totais por alimento
- Organizar por secao do mercado (proteinas, graos, vegetais, etc.)
- Estimar custo semanal baseado no budget do cliente

```yaml
step_6_1:
  name: "Lista de Compras"
  executor: diet-builder
  duration_expected: "5-8 min"
  sections:
    - "Carnes e proteinas"
    - "Graos e cereais"
    - "Frutas e vegetais"
    - "Laticinios"
    - "Oleos e gorduras"
    - "Suplementos"
  per_item:
    - name: "Nome do alimento"
    - quantity_weekly: "Quantidade para a semana"
    - unit: "kg|g|L|un"
    - estimated_cost: "R$ (se disponivel)"
  output: shopping_list
```

#### 6.2 Validacao com Quality Checker

- Verificar macros totais vs targets
- Verificar diversidade nutricional
- Verificar que restricoes sao respeitadas
- Verificar que refeicoes peri-workout estao adequadas
- Verificar que fibra esta no range adequado

```yaml
step_6_2:
  name: "Validacao com Quality Checker"
  executor: diet-builder
  tool: quality-checker
  duration_expected: "3-5 min"
  checks:
    macro_accuracy:
      rule: "total macros within 5% of targets"
      severity: CRITICAL
    restriction_compliance:
      rule: "zero restricted foods in plan"
      severity: CRITICAL
    fiber_target:
      rule: "25-40g fiber per day"
      severity: HIGH
    meal_balance:
      rule: "protein distributed across all meals"
      severity: HIGH
    peri_workout:
      rule: "carb-rich meals around training"
      severity: MEDIUM
  output: quality_report
```

#### 6.3 Revisao do Coach e Formatacao Final

- Apresentar plano completo ao coach
- Permitir ajustes manuais
- Gerar PDF profissional com:
  - Plano alimentar completo (dia de treino + descanso)
  - Tabela de macros por refeicao
  - Lista de substituicoes
  - Lista de compras
  - Protocolo de suplementacao
  - Guia de preparo de refeicoes (meal prep)

```yaml
step_6_3:
  name: "Revisao e Formatacao Final"
  executor: diet-builder + human (coach)
  duration_expected: "10-15 min"
  formats:
    - pdf: "Plano alimentar profissional"
    - json: "Dados estruturados para sistema"
    - markdown: "Versao legivel para coach"
  approval_options:
    - approve: "Prosseguir para entrega"
    - adjust: "Ajustar alimentos/porcoes especificas"
    - rebuild: "Reconstruir com preferencias diferentes"
  output: diet_plan_final
```

---

## Error Handling

**Strategy:** retry + substitute

**Common Errors:**

1. **Error:** Macros Nao Batem com Target
   - **Cause:** Combinacao de alimentos nao atinge target exato
   - **Resolution:** Ajustar porcoes ou substituir alimento com macro mais adequado
   - **Recovery:** Re-calcular porcoes automaticamente

2. **Error:** Alimento Restrito Incluido
   - **Cause:** Alimento da lista de restricoes apareceu no plano
   - **Resolution:** Substituir automaticamente pela alternativa da matriz
   - **Recovery:** Aplicar substituicao e recalcular macros

3. **Error:** Calorias Insuficientes para Macros Minimos
   - **Cause:** Em deficit muito agressivo, nao e possivel atingir minimos de proteina + gordura
   - **Resolution:** Aumentar calorias para o minimo seguro
   - **Recovery:** Alertar coach e sugerir deficit menos agressivo

4. **Error:** Cliente Vegano com Proteina Insuficiente
   - **Cause:** Fontes vegetais de proteina tem menor biodisponibilidade
   - **Resolution:** Aumentar proteina total em 10-15% e adicionar fontes complementares
   - **Recovery:** Incluir combinacoes de aminoacidos complementares (arroz+feijao, etc.)

5. **Error:** Budget Insuficiente para Plano Ideal
   - **Cause:** Alimentos recomendados excedem budget do cliente
   - **Resolution:** Substituir por alternativas mais acessiveis mantendo macros
   - **Recovery:** Priorizar frango, ovos, arroz, feijao, batata como base

---

## Performance

**Expected Metrics:**

```yaml
duration_expected: "25-40 min (geracao completa)"
cost_estimated: "$0.02-0.06"
token_usage: "~8,000-20,000 tokens"
advisor_consultations: 2-3 (Norton principal, Israetel e Rambod se necessario)
```

**Optimization Notes:**
- Database de alimentos pre-indexada por macro e restricao
- Templates de refeicao por perfil (bulk, cut, vegan, etc.)
- Calculo de substituicoes em batch
- Cache de precos de alimentos por regiao

---

## Validation Criteria

```yaml
validation:
  scientific_basis:
    - "Macros baseados em Norton et al. (protein meta-analysis)"
    - "Distribuicao por refeicao respeitando leucine threshold"
    - "Suplementacao baseada em evidencia (Tier system)"
    - "Metabolic adaptation strategies baseadas em pesquisa Norton"

  functional:
    - "Plano executavel com alimentos acessiveis ao cliente"
    - "Restricoes e alergias 100% respeitadas"
    - "Lista de compras geravel e pratica"
    - "Substituicoes dentro de 10% de diferenca nos macros"

  quality:
    - "PDF profissional com visual limpo"
    - "Porcoes em gramas e medidas caseiras"
    - "Modo de preparo simplificado para cada refeicao"
    - "Guia de meal prep incluido"
```

---

## Metadata

```yaml
task_id: FC-TASK-003
name: create-diet-plan
version: 1.0.0
squad: fitcoach
dependencies:
  - client-intake (FC-TASK-001)
  - create-training-plan (FC-TASK-002, optional — para sync timing)
  - nutrition-scientist (advisor)
  - hypertrophy-scientist (advisor, para nutrition timing)
  - macro-calculator (tool)
  - quality-checker (tool)
tags:
  - nutrition
  - diet
  - macros
  - meal-planning
  - iifym
updated_at: 2026-03-11
```

---

## Handoff

```yaml
next_task:
  delivery:
    trigger: "full-client-journey Phase 3 (DELIVERY)"
    executor: automation-engineer
    condition: "Plano aprovado pelo coach"
  tracking:
    task: "weekly-checkin"
    condition: "Apos entrega do plano ao cliente"
  adjustment:
    task: "adjust-protocol"
    condition: "Quando dados de check-in indicam necessidade"
```
