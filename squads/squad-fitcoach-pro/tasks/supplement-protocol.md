<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: supplement-protocol
  task_name: Supplement Protocol
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
- Gera protocolo baseado em perfil padrao e objetivo
- Usa stack Tier 1 + essenciais do Tier 2
- **Melhor para:** Clientes sem condicoes especiais, objetivo padrao de hipertrofia

### 2. Interactive Mode - Balanceado, Educativo (5-10 prompts) **[DEFAULT]**
- Checkpoints em cada tier de suplementacao
- Explica evidencia, dosagem e interacoes
- **Melhor para:** Clientes com duvidas, primeiro protocolo, uso de medicamentos

### 3. Pre-Flight Planning - Planejamento Completo Antecipado
- Analisa interacoes medicamentosas completas
- Revisa todos os suplementos atuais do cliente
- **Melhor para:** Clientes com condicoes medicas, polifarmacia, competition prep

**Parameter:** `mode` (optional, default: `interactive`)

---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: supplementProtocol()
id: FC-TASK-011
responsavel: diet-builder
responsavel_type: Agent
squad: fitcoach
pattern_prefix: FC
atomic_layer: Molecule

advisors:
  - nutrition-scientist (Layne Norton) — Evidence-based supplementation, dose verification
  - prep-master (Hany Rambod) — Competition prep supplementation, peak week
  - hypertrophy-scientist (Mike Israetel) — Supplements for hypertrophy and recovery

**Entrada:**
- campo: client_profile
  tipo: object
  origem: client-intake task output
  obrigatorio: true
  validacao: Must contain weight_kg, biological_sex, age, medical_conditions

- campo: goal_definition
  tipo: object
  origem: client-intake task output
  obrigatorio: true
  validacao: Must contain primary_goal (hypertrophy|fat_loss|endurance|recovery|sleep|prep)

- campo: macro_prescription
  tipo: object
  origem: calculate-macros task output
  obrigatorio: true
  validacao: Must contain protein_g, caloric_target (to assess protein gap)

- campo: current_supplements
  tipo: array[object]
  origem: User Input (anamnese)
  obrigatorio: false
  validacao: Current supplements with doses and timing

- campo: medications
  tipo: array[object]
  origem: User Input (anamnese)
  obrigatorio: true
  validacao: All current medications for interaction check

- campo: budget_constraint
  tipo: enum [essential_only, moderate, optimal, unlimited]
  origem: User Input
  obrigatorio: false
  validacao: Affects tier recommendations (default: moderate)

- campo: training_schedule
  tipo: object
  origem: create-training-plan task output
  obrigatorio: false
  validacao: Training times for pre/post workout timing

**Saida:**
- campo: supplement_protocol
  tipo: object
  destino: Data Store (clients/{id}/protocols/supplements.json)
  persistido: true

- campo: interaction_report
  tipo: object
  destino: Data Store (clients/{id}/protocols/supplement-interactions.json)
  persistido: true

- campo: supplement_schedule
  tipo: object
  destino: Data Store (clients/{id}/protocols/supplement-schedule.json)
  persistido: true

- campo: budget_estimate
  tipo: object
  destino: Data Store (clients/{id}/protocols/supplement-budget.json)
  persistido: true
```

---

## Pre-Conditions

```yaml
pre-conditions:
  - [ ] Macros calculados com target proteico definido
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que macro_prescription contem protein_g para avaliar gap proteico
    error_message: "Pre-condition failed: Macros nao calculados, impossivel avaliar necessidade de whey"

  - [ ] Lista de medicamentos em uso documentada (pode ser vazia)
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que medications foi informado (array vazio aceito)
    error_message: "Pre-condition failed: Medicamentos nao documentados. Necessario para check de interacoes"

  - [ ] Objetivo definido para selecao de stack
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que goal_definition contem primary_goal
    error_message: "Pre-condition failed: Objetivo nao definido para selecao de suplementos"

  - [ ] Condicoes medicas documentadas (para contraindicacoes)
    tipo: pre-condition
    blocker: false
    validacao: |
      Verificar que client_profile contem medical_conditions (array vazio aceito)
    error_message: "Warning: Condicoes medicas nao informadas. Prosseguindo sem check de contraindicacoes"
```

---

## Post-Conditions

```yaml
post-conditions:
  - [ ] Protocolo contem pelo menos suplementos Tier 1 essenciais
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que supplement_protocol contem pelo menos creatina e whey (se gap proteico)
    error_message: "Post-condition failed: Tier 1 essenciais ausentes do protocolo"

  - [ ] Dosagens dentro dos ranges seguros e baseados em evidencia
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que cada suplemento tem dose dentro do range seguro definido
    error_message: "Post-condition failed: Dosagem fora do range seguro detectada"

  - [ ] Check de interacoes realizado (mesmo se nenhum medicamento)
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que interaction_report foi gerado
    error_message: "Post-condition failed: Check de interacoes nao realizado"

  - [ ] Timing de cada suplemento definido (horario relativo ao treino/refeicao)
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que supplement_schedule contem timing para cada suplemento
    error_message: "Post-condition failed: Timing de suplementos nao definido"
```

---

## Acceptance Criteria

```yaml
acceptance-criteria:
  - [ ] AC-1: Cada suplemento classificado por tier de evidencia (1, 2, 3, X)
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que cada suplemento no protocolo tem evidence_tier definido
    error_message: "AC-1 nao atendido: Suplemento sem classificacao de evidencia"

  - [ ] AC-2: Dosagem com referencia cientifica para cada suplemento
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que cada suplemento tem dose, referencia_cientifica e range_seguro
    error_message: "AC-2 nao atendido: Dosagem sem referencia cientifica"

  - [ ] AC-3: Stacks organizados por objetivo com justificativa
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que supplement_protocol contem goal_stack com justificativa
    error_message: "AC-3 nao atendido: Stacks sem organizacao por objetivo"

  - [ ] AC-4: Interacoes checadas e documentadas (safe/caution/avoid)
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que interaction_report classifica cada par suplemento-medicamento
    error_message: "AC-4 nao atendido: Interacoes nao documentadas"

  - [ ] AC-5: Estimativa de custo mensal por tier
    tipo: acceptance-criterion
    blocker: false
    validacao: |
      Assert que budget_estimate contem custo por tier (essential, moderate, optimal)
    error_message: "AC-5 nao atendido: Estimativa de custo ausente"

  - [ ] AC-6: Nenhum suplemento Tier X no protocolo final
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que zero suplementos com evidence_tier == X estao no protocolo
    error_message: "AC-6 nao atendido: Suplemento Tier X (avoid) encontrado no protocolo"
```

---

## Veto Rules (Bloqueios Absolutos)

```yaml
veto_rules:
  - id: VETO-SUPP-001
    rule: "Recomendar substancias banidas (WADA, ANVISA) ou controladas sem prescricao"
    severity: CRITICAL
    action: BLOCK
    message: "Substancias banidas ou controladas NAO podem ser recomendadas. Inclui: esteroides anabolizantes, SARMs, GH, EPO, e qualquer substancia da lista WADA."

  - id: VETO-SUPP-002
    rule: "Pular verificacao de dosagem contra evidencia cientifica"
    severity: CRITICAL
    action: BLOCK
    message: "Toda dosagem DEVE ser verificada contra literatura cientifica. Nenhum suplemento pode ser dosado 'por experiencia' sem referencia."

  - id: VETO-SUPP-003
    rule: "Ignorar interacoes medicamentosas conhecidas"
    severity: CRITICAL
    action: BLOCK
    message: "Interacoes medicamentosas DEVEM ser verificadas. Se medicamento desconhecido, recomendar consulta com farmaceutico/medico."

  - id: VETO-SUPP-004
    rule: "Recomendar suplementos para manipulacao de agua/sodio para competicao sem alertar riscos"
    severity: HIGH
    action: WARN_AND_CONFIRM
    message: "Manipulacao de agua/sodio para competicao carrega riscos graves. Deve ser acompanhada por profissional medico. Alertar riscos obrigatoriamente."

  - id: VETO-SUPP-005
    rule: "Incluir proprietary blends sem analise de ingredientes individuais"
    severity: HIGH
    action: BLOCK
    message: "Proprietary blends (formulas fechadas) nao podem ser recomendados sem analise individual de cada ingrediente e dosagem."
```

---

## Tools

- **Tool:** quality-checker
  - **Purpose:** Validar protocolo de suplementacao contra evidencia cientifica
  - **Source:** squads/fitcoach/tools/quality-checker

---

## SEQUENTIAL Task Execution (Nao prosseguir ate a Task atual estar completa)

### Step 0: Receber Dados e Contexto

- Carregar client_profile com condicoes medicas
- Carregar macro_prescription para avaliar gap proteico
- Carregar medications para check de interacoes
- Carregar current_supplements para avaliar o que ja usa
- Carregar goal_definition para selecao de stack
- Carregar training_schedule para timing
- Carregar budget_constraint para filtragem de recomendacoes

```yaml
step_0:
  name: "Receber Dados e Contexto"
  executor: diet-builder
  duration_expected: "2-3 min"
  inputs:
    - client_profile
    - macro_prescription
    - medications
    - current_supplements (optional)
    - goal_definition
    - training_schedule (optional)
    - budget_constraint (optional, default: moderate)
  outputs:
    - supplementation_context
```

### Step 1: Classificacao por Tier de Evidencia

#### 1.1 Tier 1 — Forte Evidencia (Recomendar com Confianca)

Suplementos com multiplos meta-analises e revisoes sistematicas suportando eficacia:

| Suplemento | Dose | Timing | Mecanismo | Evidencia-Chave |
|-----------|------|--------|-----------|----------------|
| **Creatina Monohidratada** | 3-5g/dia (sem necessidade de loading) | Qualquer horario, com refeicao | Aumenta PCr muscular, ATP resintese | Kreider et al. (2017), ISSN Position Stand |
| **Cafeina** | 3-6mg/kg | 30-60min pre-treino | Antagonista de adenosina, reducao RPE | Guest et al. (2021), Grgic et al. (2020) |
| **Whey Protein** | Conforme gap proteico (20-40g/dose) | Pos-treino ou conforme necessidade | Proteina de alta biodisponibilidade, rico em leucina | Morton et al. (2018) |
| **Vitamina D3** | 2000-5000 IU/dia | Com refeicao gordurosa | Funcao hormonal, imunidade, ossos | Pilz et al. (2018) |
| **Omega-3 (EPA+DHA)** | 2-3g EPA+DHA/dia | Com refeicoes | Anti-inflamatorio, saude cardiovascular | Philpott et al. (2019) |

```yaml
step_1_1:
  name: "Tier 1 — Forte Evidencia"
  executor: diet-builder
  advisor: nutrition-scientist
  duration_expected: "5-8 min"
  tier: 1
  recommendation: "Recomendar para todos os clientes, salvo contraindicacao"
  output: tier_1_supplements
```

#### 1.2 Tier 2 — Evidencia Moderada (Considerar Baseado em Contexto)

Suplementos com estudos positivos, mas nem sempre replicados ou com efeito menor:

| Suplemento | Dose | Timing | Mecanismo | Melhor Para |
|-----------|------|--------|-----------|------------|
| **Beta-Alanina** | 3.2-6.4g/dia (dividir em 2-4 doses para evitar parestesia) | Ao longo do dia | Buffer de H+, atrasa fadiga em esforcos 1-4min | Endurance, circuitos, alto volume |
| **Citrulina Malato** | 6-8g | 30-60min pre-treino | Precursor de NO, vasodilatacao, reducao de fadiga | Hipertrofia, pump, alto volume |
| **HMB (Beta-Hydroxy Beta-Methylbutyrate)** | 3g/dia (dividir em 3 doses) | Com refeicoes | Anti-catabolico, metabolito da leucina | Beginners, deficit calorico, idosos |
| **Ashwagandha (KSM-66)** | 300-600mg/dia | Manha ou antes de dormir | Adaptogeno, reducao de cortisol, melhora de VO2max | Stress alto, recuperacao, sono |
| **Magnesio (bisglicinato)** | 200-400mg | Antes de dormir | Relaxamento muscular, qualidade do sono, >300 reacoes enzimaticas | Sono, recuperacao, caimbras |
| **Multivitaminico** | 1 capsula/dia | Com refeicao | Seguro nutricional para micronutrientes | Dieta restritiva, deficit calorico prolongado |

```yaml
step_1_2:
  name: "Tier 2 — Evidencia Moderada"
  executor: diet-builder
  advisor: nutrition-scientist
  duration_expected: "5-8 min"
  tier: 2
  recommendation: "Considerar baseado em objetivo, condicao e budget"
  output: tier_2_supplements
```

#### 1.3 Tier 3 — Evidencia Limitada / Contexto-Dependente

Suplementos com evidencia fraca, mista, ou uteis apenas em cenarios muito especificos:

| Suplemento | Dose | Contexto de Uso | Nota |
|-----------|------|-----------------|------|
| **BCAA/EAA** | 5-10g | Treino em jejum (unico cenario justificavel) | Desnecessario se proteina total adequada (Norton) |
| **Glutamina** | 5-10g | Imunidade em periodos de overtraining | Pouca evidencia para atletas saudaveis com dieta adequada |
| **ZMA** | Conforme rotulo | Antes de dormir, sem calcio | Util se deficiencia de zinco/magnesio confirmada |
| **Melatonina** | 0.5-3mg | 30-60min antes de dormir | Para regulacao de ritmo circadiano (jet lag, shift work) |
| **Colágeno Hidrolisado** | 10-15g | Com vitamina C, 30-60min pre-treino | Saude articular, tendoes (Shaw et al., 2017) |
| **Probioticos** | >10 bilhoes UFC | Com refeicao | Saude intestinal, imunidade (cenarios de stress GI) |

```yaml
step_1_3:
  name: "Tier 3 — Evidencia Limitada"
  executor: diet-builder
  advisor: nutrition-scientist
  duration_expected: "3-5 min"
  tier: 3
  recommendation: "Opcional, apenas se cenario especifico justifica"
  output: tier_3_supplements
```

#### 1.4 Tier X — Evitar (Nao Recomendar)

Suplementos sem evidencia, com marketing enganoso, ou potencialmente perigosos:

| Categoria | Exemplos | Motivo de Exclusao |
|-----------|---------|-------------------|
| **Proprietary Blends** | Pre-treinos com formulas fechadas | Dosagem desconhecida, impossivel avaliar |
| **Fat Burners OTC** | Termogenicos comerciais, "queimadores de gordura" | Ineficazes ou perigosos; efedra banida |
| **Testosterone Boosters OTC** | Tribulus, fenugreek (dose comercial), D-AA (isolado) | Evidencia insuficiente para aumentar testosterone em niveis significativos |
| **Growth Hormone Secretagogues OTC** | "GH boosters", aminoacido-based | Sem evidencia de aumento clinicamente relevante |
| **Detox / Cleanse** | Sucos detox, cha de limpeza | Sem base cientifica, potencialmente danosos |
| **SARMs** | Ostarine, Ligandrol, RAD-140 | Nao aprovados para uso humano, riscos hepaticos e hormonais |

```yaml
step_1_4:
  name: "Tier X — Evitar"
  executor: diet-builder
  advisor: nutrition-scientist
  duration_expected: "2-3 min"
  tier: X
  recommendation: "NUNCA recomendar. Se cliente usa, educar sobre riscos."
  action: "Documentar se cliente usa algum Tier X, alertar coach"
  output: tier_x_flagged
```

### Step 2: Stacks por Objetivo

#### 2.1 Stack de Hipertrofia

| Prioridade | Suplemento | Dose | Timing |
|-----------|-----------|------|--------|
| Essencial | Creatina | 5g/dia | Com refeicao |
| Essencial | Whey Protein | 20-40g | Pos-treino e/ou entre refeicoes |
| Recomendado | Cafeina | 3-6mg/kg | Pre-treino |
| Recomendado | Citrulina Malato | 6-8g | Pre-treino |
| Opcional | Beta-Alanina | 3.2g | 2x/dia |

#### 2.2 Stack de Endurance/Performance

| Prioridade | Suplemento | Dose | Timing |
|-----------|-----------|------|--------|
| Essencial | Cafeina | 3-6mg/kg | Pre-treino |
| Essencial | Creatina | 5g/dia | Com refeicao |
| Recomendado | Beta-Alanina | 6.4g/dia | Dividir em 4 doses |
| Recomendado | Citrulina Malato | 6-8g | Pre-treino |
| Recomendado | Sodio/Eletrólitos | Conforme sudorese | Intra-treino |

#### 2.3 Stack de Fat Loss

| Prioridade | Suplemento | Dose | Timing |
|-----------|-----------|------|--------|
| Essencial | Whey Protein | 20-40g | Conforme gap proteico (saciedade + preservacao) |
| Essencial | Creatina | 5g/dia | Com refeicao (NAO interromper em cutting) |
| Essencial | Cafeina | 3-6mg/kg | Pre-treino (termogenese + performance) |
| Recomendado | Omega-3 | 2-3g EPA+DHA | Com refeicao |
| Recomendado | Vitamina D3 | 2000-5000 IU | Com refeicao gordurosa |
| Opcional | HMB | 3g/dia | Anti-catabolico em deficit agressivo |

#### 2.4 Stack de Recovery/Sleep

| Prioridade | Suplemento | Dose | Timing |
|-----------|-----------|------|--------|
| Essencial | Magnesio bisglicinato | 300-400mg | Antes de dormir |
| Recomendado | Ashwagandha KSM-66 | 300-600mg | Antes de dormir |
| Recomendado | Omega-3 | 2-3g EPA+DHA | Com refeicao |
| Opcional | Melatonina | 0.5-3mg | 30-60min antes de dormir (curto prazo) |
| Opcional | ZMA | Conforme rotulo | Antes de dormir |
| Opcional | Tart Cherry Extract | 480mg | Antes de dormir |

#### 2.5 Stack de Competition Prep

Consultar prep-master (Hany Rambod):

| Fase | Suplementos | Notas |
|------|-----------|-------|
| Offseason (12+ semanas out) | Stack Hipertrofia completo | Volume maximo |
| Pre-Prep (8-12 semanas out) | Adicionar Omega-3 dose alta, HMB | Inicio do deficit |
| Mid-Prep (4-8 semanas out) | Manter todos, adicionar Ashwagandha | Cortisol em alta |
| Peak Week (ultima semana) | APENAS: creatina (parar 3-5 dias antes), whey, multivitaminico | Minimalismo, sem risco |

**ALERTA Peak Week — Substancias a EVITAR:**
- Diureticos (PERIGO: desidratacao, aritmias cardiacas)
- Manipulacao extrema de sodio (PERIGO: hiponatremia)
- Laxantes em dose alta (PERIGO: desidratacao, desequilibrio eletrolitico)
- Qualquer substancia nova nao testada antes

```yaml
step_2:
  name: "Stacks por Objetivo"
  executor: diet-builder
  advisor: nutrition-scientist + prep-master (se prep)
  duration_expected: "8-12 min"
  inputs:
    - primary_goal
    - client_level
    - budget_constraint
  output: goal_specific_stack
```

### Step 3: Dosing Protocols e Timing Detalhado

#### 3.1 Protocolo de Dosagem por Suplemento

Para cada suplemento selecionado, definir:

| Campo | Descricao |
|-------|-----------|
| **Dose** | Gramas ou mg, baseado em peso do cliente quando aplicavel |
| **Frequencia** | Diario, dias de treino, ciclos |
| **Timing** | Horario relativo a treino e refeicoes |
| **Com o que tomar** | Com agua, com refeicao, com gordura, sem calcio |
| **Loading necessario?** | Se aplicavel (ex: beta-alanina loading) |
| **Ciclagem** | Se necessario (ex: cafeina 2 on / 1 off) |
| **Contraindicacoes** | Condicoes medicas que impedem uso |

**Timing Chart (Exemplo para cliente que treina as 17h):**

| Horario | Suplemento | Dose | Notas |
|---------|-----------|------|-------|
| 07:00 (cafe) | Vitamina D3 | 2000 IU | Com cafe da manha (gordura) |
| 07:00 (cafe) | Omega-3 | 1g EPA+DHA | Com cafe da manha |
| 07:00 (cafe) | Creatina | 5g | Com refeicao |
| 12:00 (almoco) | Omega-3 | 1g EPA+DHA | Com almoco |
| 16:00 (pre-treino) | Cafeina | 200-400mg | 30-60min antes do treino |
| 16:00 (pre-treino) | Citrulina Malato | 6-8g | 30-60min antes do treino |
| 16:00 (pre-treino) | Beta-Alanina | 3.2g | Pode parear com pre-treino |
| 18:30 (pos-treino) | Whey Protein | 30g | Com carb pos-treino |
| 22:00 (antes dormir) | Magnesio | 400mg | 30min antes de dormir |
| 22:00 (antes dormir) | Ashwagandha | 300mg | Se incluido no stack |

```yaml
step_3_1:
  name: "Dosing Protocols e Timing"
  executor: diet-builder
  advisor: nutrition-scientist
  duration_expected: "8-10 min"
  per_supplement:
    - name: "Nome"
    - dose: "Dose calculada"
    - frequency: "Diario / treino / ciclado"
    - timing: "Horario relativo"
    - take_with: "Agua / refeicao / gordura"
    - loading: "Se aplicavel"
    - cycling: "Se aplicavel"
    - contraindications: ["Lista"]
    - evidence_reference: "Citacao"
  output: dosing_protocol
```

### Step 4: Interaction Check (Suplemento-Medicamento e Suplemento-Suplemento)

#### 4.1 Interacoes Suplemento-Medicamento

Verificar cada suplemento contra lista de medicamentos do cliente:

**Interacoes Conhecidas (exemplos mais comuns):**

| Suplemento | Medicamento | Interacao | Severidade |
|-----------|------------|-----------|-----------|
| Omega-3 (alta dose) | Anticoagulantes (Warfarin) | Potencializa efeito anticoagulante | AVOID |
| Cafeina | Beta-bloqueadores | Antagoniza efeito do medicamento | CAUTION |
| Cafeina | Antidepressivos (ISRS) | Pode aumentar ansiedade/insonia | CAUTION |
| Vitamina D (alta dose) | Diureticos tiazidicos | Risco de hipercalcemia | CAUTION |
| Magnesio | Antibioticos (quinolonas, tetraciclinas) | Reduz absorcao do antibiotico | CAUTION — separar 2h |
| Creatina | Metformina | Ambos afetam funcao renal — monitorar | CAUTION |
| Ashwagandha | Imunossupressores | Pode estimular sistema imune | AVOID |
| Ashwagandha | Hormonios tireoidianos | Pode alterar niveis de T3/T4 | CAUTION |

**Classificacao de Interacoes:**
- **SAFE:** Sem interacao conhecida, pode usar livremente
- **CAUTION:** Interacao possivel, monitorar ou ajustar timing
- **AVOID:** Interacao significativa, nao combinar sem supervisao medica

#### 4.2 Interacoes Suplemento-Suplemento

| Combinacao | Interacao | Recomendacao |
|-----------|-----------|-------------|
| Cafeina + Pre-treino comercial | Dose dupla de cafeina | ALERTA: somar cafeina total, nao exceder 6mg/kg |
| Creatina + Cafeina | Mito: cafeina nao anula creatina (evidencia atual) | SAFE: podem ser combinados |
| Calcio + Magnesio (dose alta) | Competem por absorcao | CAUTION: separar em horarios diferentes |
| Calcio + Ferro | Calcio reduz absorcao de ferro | CAUTION: separar em horarios diferentes |
| Zinco + Cobre | Zinco em alta dose reduz absorcao de cobre | CAUTION: se ZMA longo prazo, monitorar cobre |

```yaml
step_4:
  name: "Interaction Check"
  executor: diet-builder
  duration_expected: "5-8 min"
  checks:
    supplement_medication:
      per_pair:
        - supplement: "Nome"
        - medication: "Nome"
        - interaction: "Descricao"
        - classification: "SAFE|CAUTION|AVOID"
        - recommendation: "Acao sugerida"
    supplement_supplement:
      per_pair:
        - supplement_a: "Nome"
        - supplement_b: "Nome"
        - interaction: "Descricao"
        - classification: "SAFE|CAUTION|AVOID"
        - recommendation: "Acao sugerida"
  output: interaction_report
```

### Step 5: Budget-Conscious Recommendations

#### 5.1 Custo por Tier

Estimar custo mensal para cada nivel de stack:

| Nivel | Suplementos Incluidos | Custo Estimado (R$/mes) |
|-------|----------------------|------------------------|
| **Essential Only** | Creatina + Whey (se gap proteico) | R$ 80-150 |
| **Moderate** | Essential + Vitamina D + Omega-3 | R$ 150-250 |
| **Optimal** | Moderate + Cafeina + Citrulina + Magnesio | R$ 250-400 |
| **Unlimited** | Optimal + Ashwagandha + Beta-Alanina + Colágeno | R$ 400-600+ |

**Regras de Priorizacao por Budget:**
- Sempre priorizar COMIDA sobre suplemento (suplemento complementa, nao substitui)
- Se budget limitado: creatina e proteina em po sao os unicos essenciais
- Vitamina D e altamente cost-effective (R$15-25/mes para 2000-5000 IU)
- Cafeina de cafe e mais barato que suplemento de cafeina
- Omega-3 pode ser substituido por 2-3 porcoes de peixe gordo por semana

```yaml
step_5:
  name: "Budget-Conscious Recommendations"
  executor: diet-builder
  duration_expected: "3-5 min"
  tiers:
    essential:
      supplements: ["creatina", "whey (se necessario)"]
      estimated_cost: "R$ 80-150/mes"
    moderate:
      supplements: ["essential + vitamina D + omega-3"]
      estimated_cost: "R$ 150-250/mes"
    optimal:
      supplements: ["moderate + cafeina + citrulina + magnesio"]
      estimated_cost: "R$ 250-400/mes"
    unlimited:
      supplements: ["optimal + ashwagandha + beta-alanina + colageno"]
      estimated_cost: "R$ 400-600+/mes"
  food_alternatives:
    omega_3: "2-3 porcoes de peixe gordo/semana (salmao, sardinha)"
    caffeine: "1-2 xicaras de cafe preto pre-treino"
    vitamin_d: "15-20min de exposicao solar diaria"
  output: budget_estimate
```

### Step 6: Layne Norton Integration — Evidence-Based Approach

#### 6.1 Principios Norton para Suplementacao

Consultar nutrition-scientist (Layne Norton) para validacao final:

**Principios Fundamentais:**
1. **Suplementos nao compensam dieta ruim** — Prioridade absoluta: comida real
2. **Evidencia > Anedota** — Apenas suplementos com meta-analises ou revisoes sistematicas robustas
3. **Dose-resposta** — Usar dose minima eficaz, nao a dose maxima "tolerada"
4. **Placebo e poderoso** — Se cliente sente beneficio de Tier 3, considerar efeito placebo como valido (sem dano)
5. **Timing importa menos que dose total** — Exceto para cafeina e timing peri-workout

**Norton sobre Mitos Comuns:**
- "Creatina nao causa queda de cabelo" — Estudo original (Vatani et al., 2011) foi mal interpretado
- "Creatina e segura para rins em individuos saudaveis" — Kreider et al. (2017)
- "BCAAs sao desnecessarios se proteina total e adequada" — Posicao Norton clara
- "Glutamina nao melhora recuperacao em atletas saudaveis" — Evidencia insuficiente

```yaml
step_6:
  name: "Norton Evidence-Based Validation"
  executor: diet-builder
  advisor: nutrition-scientist
  duration_expected: "5-8 min"
  validation:
    - "Cada suplemento do protocolo validado contra evidencia"
    - "Mitos desfeitos documentados para educacao do cliente"
    - "Dose-resposta otimizada (minima eficaz)"
  output: norton_validation
```

### Step 7: Validacao e Quality Check

#### 7.1 Validacao com Quality Checker

```yaml
step_7_1:
  name: "Validacao com Quality Checker"
  executor: diet-builder
  tool: quality-checker
  duration_expected: "3-5 min"
  checks:
    evidence_tier:
      rule: "Cada suplemento tem evidence_tier definido e valido"
      severity: CRITICAL
    no_tier_x:
      rule: "Zero suplementos Tier X no protocolo final"
      severity: CRITICAL
    dose_range:
      rule: "Cada dose dentro do range seguro baseado em evidencia"
      severity: CRITICAL
    interactions:
      rule: "Nenhuma interacao classificada como AVOID sem resolucao"
      severity: CRITICAL
    timing:
      rule: "Cada suplemento tem timing definido"
      severity: HIGH
    veto_compliance:
      rule: "Nenhum veto rule violado"
      severity: CRITICAL
  output: quality_report
```

#### 7.2 Revisao do Coach e Formatacao Final

- Apresentar protocolo completo ao coach
- Destacar interacoes encontradas (CAUTION e AVOID)
- Apresentar opcoes de budget
- Permitir ajustes (adicionar/remover/trocar suplementos)
- Gerar output final formatado

```yaml
step_7_2:
  name: "Revisao do Coach e Formatacao Final"
  executor: diet-builder + human (coach)
  duration_expected: "10-15 min"
  outputs:
    supplement_protocol:
      - per_supplement: [name, tier, dose, timing, evidence, notes]
      - goal_stack: "Stack organizado por objetivo"
      - total_supplements: "Contagem"
    interaction_report:
      - safe_pairs: "Lista de combinacoes seguras"
      - caution_pairs: "Lista de combinacoes com cautela"
      - avoid_pairs: "Lista de combinacoes a evitar"
    supplement_schedule:
      - daily_timeline: "Horarios com todos os suplementos"
      - training_day_vs_rest_day: "Variacoes"
    budget_estimate:
      - per_tier: "Custo por nivel de stack"
      - selected_tier: "Tier escolhido pelo coach/cliente"
  approval_options:
    - approve: "Protocolo aprovado, incluir no plano final"
    - adjust: "Ajustar suplementos ou doses especificas"
    - simplify: "Reduzir para essential only"
  output: supplement_protocol_final
```

---

## Error Handling

**Strategy:** retry + consult_advisor

**Common Errors:**

1. **Error:** Interacao Medicamentosa AVOID Detectada
   - **Cause:** Suplemento conflita com medicamento em uso
   - **Resolution:** Remover suplemento do protocolo, sugerir alternativa sem interacao
   - **Recovery:** Recomendar consulta com farmaceutico se alternativa nao disponivel

2. **Error:** Dose Excede Range Seguro
   - **Cause:** Calculo baseado em peso resulta em dose acima do recomendado
   - **Resolution:** Cap na dose maxima recomendada pela literatura
   - **Recovery:** Alertar coach sobre dose ajustada

3. **Error:** Suplemento Tier X Solicitado pelo Cliente
   - **Cause:** Cliente quer usar suplemento sem evidencia
   - **Resolution:** Educar sobre falta de evidencia, apresentar alternativa baseada em evidencia
   - **Recovery:** Documentar pedido e educacao fornecida

4. **Error:** Budget Insuficiente para Stack Recomendado
   - **Cause:** Custo do stack ideal excede budget do cliente
   - **Resolution:** Reduzir para tier anterior, priorizando Tier 1
   - **Recovery:** Apresentar alternativas alimentares para suplementos removidos

5. **Error:** Condicao Medica Contraindicando Suplemento Essencial
   - **Cause:** Ex: doenca renal contraindicando creatina em dose padrao
   - **Resolution:** Remover suplemento, documentar motivo, recomendar acompanhamento medico
   - **Recovery:** Nao substituir por alternativa sem validacao medica

---

## Performance

**Expected Metrics:**

```yaml
duration_expected: "20-35 min (protocolo completo)"
cost_estimated: "$0.01-0.04"
token_usage: "~6,000-15,000 tokens"
advisor_consultations: 1-2 (Norton principal, Rambod se competition prep)
```

**Optimization Notes:**
- Database de interacoes medicamentosas pre-indexada
- Templates de stacks por objetivo pre-construidos
- Pricing table atualizada mensalmente para estimativas de custo
- Cache de interacoes suplemento-suplemento (nao mudam)

---

## Validation Criteria

```yaml
validation:
  scientific_basis:
    - "Tier system baseado em ISSN Position Stands e meta-analises"
    - "Dosagens baseadas em Kreider et al. (2017), Guest et al. (2021), Morton et al. (2018)"
    - "Interacoes medicamentosas baseadas em farmacologia clinica"
    - "Layne Norton evidence-based approach integrado"

  functional:
    - "Protocolo executavel com timing claro"
    - "Interacoes verificadas e resolvidas"
    - "Budget estimado e acessivel ao cliente"
    - "Stacks organizados por objetivo"

  quality:
    - "Cada suplemento com referencia cientifica"
    - "Educacao sobre mitos incluida"
    - "Alternativas alimentares listadas"
    - "Schedule diario claro e pratico"
```

---

## Metadata

```yaml
task_id: FC-TASK-011
name: supplement-protocol
version: 1.0.0
squad: fitcoach
dependencies:
  - client-intake (FC-TASK-001)
  - calculate-macros (FC-TASK-010)
  - nutrition-scientist (advisor)
  - prep-master (advisor, se competition prep)
  - hypertrophy-scientist (advisor, para stack de hipertrofia)
  - quality-checker (tool)
tags:
  - nutrition
  - supplements
  - evidence-based
  - dosing
  - interactions
  - protocol
updated_at: 2026-03-13
```

---

## Handoff

```yaml
next_task:
  primary:
    task: "create-diet-plan"
    condition: "Protocolo de suplementacao aprovado pelo coach"
    data_passed: [supplement_protocol, supplement_schedule]
  secondary:
    task: "adjust-protocol"
    condition: "Quando check-in indica necessidade de ajustar suplementacao"
  competition:
    task: "competition-prep"
    condition: "Se objetivo e competition prep, integra com protocolo de prep"
  upstream:
    task: "calculate-macros"
    data_received: [macro_prescription]
```
