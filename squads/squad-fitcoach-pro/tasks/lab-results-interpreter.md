<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: lab-results-interpreter
  task_name: Lab Results Interpreter
  status: active
  responsible_executor: 'intake-analyst + nutrition-scientist'
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
- Interpreta painel basico e gera report automatico
- **Melhor para:** Paineis simples (hemograma + lipidios) em clientes saudaveis

### 2. Interactive Mode - Balanceado, Educativo (5-10 prompts) **[DEFAULT]**
- Checkpoints em cada painel interpretado
- Explica ao coach o significado de cada marcador e implicacao para treino
- **Melhor para:** Maioria dos clientes, primeiro set de exames

### 3. Pre-Flight Planning - Planejamento Completo Antecipado
- Analisa todos os paineis antes de emitir qualquer recomendacao
- Correlaciona marcadores entre si para visao sistemica
- **Melhor para:** Atletas avancados, clientes com multiplas alteracoes, pre-competicao

**Parameter:** `mode` (optional, default: `interactive`)

---

## DISCLAIMER — OBRIGATORIO

```
╔══════════════════════════════════════════════════════════════════════════╗
║                        DISCLAIMER IMPORTANTE                            ║
║                                                                          ║
║  Esta task fornece CONTEXTO EDUCATIVO para coaches e personal trainers   ║
║  sobre como resultados laboratoriais podem influenciar decisoes de       ║
║  programacao de treino e nutricao.                                       ║
║                                                                          ║
║  Esta task NAO substitui avaliacao medica profissional.                  ║
║  Esta task NAO realiza diagnosticos medicos.                             ║
║  Esta task NAO recomenda medicamentos ou mudancas de medicacao.          ║
║                                                                          ║
║  Qualquer resultado fora dos ranges de referencia deve ser discutido     ║
║  com o medico do cliente antes de ajustes significativos no protocolo.   ║
║                                                                          ║
║  Valores CRITICOS (marcados com RED FLAG) requerem encaminhamento        ║
║  medico IMEDIATO e suspensao de modificacoes no protocolo ate            ║
║  liberacao profissional.                                                 ║
╚══════════════════════════════════════════════════════════════════════════╝
```

Este disclaimer deve ser apresentado no inicio de CADA execucao da task e incluido no report final.

---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: labResultsInterpreter()
id: FC-TASK-012
responsavel: intake-analyst + nutrition-scientist
responsavel_type: Agent (multi-advisor)
squad: fitcoach
pattern_prefix: FC
atomic_layer: Organism
priority: P0
classification: CRITICAL_SAFETY

advisors:
  - intake-analyst (Scout) — Conducao da interpretacao, correlacao com anamnese
  - nutrition-scientist (Layne Norton) — Implicacoes nutricionais, metabolic adaptation
  - elite-coach (Matt Jansen) — Implicacoes para programacao de treino e recovery
  - hypertrophy-scientist (Mike Israetel) — Contexto de volume e recovery baseado em marcadores

**Entrada:**
- campo: lab_results
  tipo: object
  origem: External Lab / Client Upload
  obrigatorio: true
  validacao: |
    Must contain at least 1 panel with values and reference ranges.
    Lab name, date, and client identification must be present.
    Results must be in numerical format (not just "normal/abnormal").

- campo: anamnesis_report
  tipo: object
  origem: anamnese-clinica task output
  obrigatorio: true
  validacao: |
    Must contain medical_history and medication_inventory for context.
    Required for correlating lab values with known conditions.

- campo: client_profile
  tipo: object
  origem: client-intake task output
  obrigatorio: true
  validacao: Must contain demographics, training history, goals

- campo: current_protocol
  tipo: object
  origem: Active training/diet plan (if exists)
  obrigatorio: false
  validacao: Current macros, training volume, supplements in use

**Saida:**
- campo: lab_interpretation_report
  tipo: object
  destino: Data Store (clients/{id}/labs/)
  persistido: true

- campo: training_implications
  tipo: object
  destino: Data Store (clients/{id}/labs/training-implications.yaml)
  persistido: true

- campo: nutrition_implications
  tipo: object
  destino: Data Store (clients/{id}/labs/nutrition-implications.yaml)
  persistido: true

- campo: referral_triggers
  tipo: array[object]
  destino: Data Store (clients/{id}/labs/referrals.yaml)
  persistido: true

- campo: protocol_adjustments
  tipo: object
  destino: Memory (para proxima task ou adjust-protocol)
  persistido: false
```

---

## Pre-Conditions

**Purpose:** Validar pre-requisitos ANTES da execucao da task (blocking)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Anamnese clinica (FC-TASK-010) completa
    tipo: pre-condition
    blocker: true
    validacao: |
      Necessario para correlacionar resultados com historico medico,
      medicacoes e condicoes pre-existentes
    error_message: "Pre-condition failed: Anamnese clinica necessaria para contexto"

  - [ ] Resultados laboratoriais em formato legivel com valores numericos
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que resultados contem valores numericos (nao apenas "normal/alterado")
      e ranges de referencia do laboratorio
    error_message: "Pre-condition failed: Resultados laboratoriais incompletos ou ilegíveis"

  - [ ] Data do exame identificada (exames com mais de 6 meses sao flag)
    tipo: pre-condition
    blocker: false
    validacao: |
      Verificar data do exame. Se > 6 meses: FLAG de exame antigo.
      Se > 12 meses: recomendar novos exames antes de decisoes.
    error_message: "Warning: Exames com mais de 6 meses — considerar atualizacao"

  - [ ] Disclaimer apresentado ao coach
    tipo: pre-condition
    blocker: true
    validacao: |
      Disclaimer deve ser mostrado e reconhecido antes de iniciar interpretacao
    error_message: "Pre-condition failed: Disclaimer nao apresentado"
```

---

## Post-Conditions

**Purpose:** Validar sucesso da execucao APOS task completar

**Checklist:**

```yaml
post-conditions:
  - [ ] Todos os marcadores interpretados com classificacao (normal, atencao, critico)
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que cada marcador tem: valor, range de referencia,
      range otimo para atleta, classificacao, e notas
    error_message: "Post-condition failed: Marcadores sem interpretacao completa"

  - [ ] Red flags criticos geraram referral triggers
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que valores criticos tem referral associado
    error_message: "Post-condition failed: Valores criticos sem referral"

  - [ ] Disclaimer incluido no report final
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que disclaimer aparece no report gerado
    error_message: "Post-condition failed: Disclaimer ausente no report"

  - [ ] Implicacoes para treino e nutricao documentadas
    tipo: post-condition
    blocker: false
    validacao: |
      Verificar que training_implications e nutrition_implications existem
    error_message: "Warning: Implicacoes para protocolo nao documentadas"
```

---

## Acceptance Criteria

```yaml
acceptance-criteria:
  - [ ] AC-1: Cada marcador interpretado com range clinico E range otimo para atletas
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que cada marcador tem: clinical_range (do laboratorio),
      athlete_optimal_range (contexto esportivo), e classificacao
    error_message: "AC-1 nao atendido: Marcadores sem duplo range"

  - [ ] AC-2: Correlacao entre marcadores identificada (ex: ferritina + hemoglobina)
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que marcadores relacionados foram analisados em conjunto,
      nao isoladamente
    error_message: "AC-2 nao atendido: Marcadores analisados isoladamente"

  - [ ] AC-3: Implicacoes para programacao de treino documentadas para cada alteracao
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que cada valor fora do otimo tem training_implication documentada
    error_message: "AC-3 nao atendido: Alteracoes sem implicacao para treino"

  - [ ] AC-4: Nenhum diagnostico medico realizado — apenas contextualizacao
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que linguagem do report usa "sugere", "consistente com",
      "pode indicar" — NUNCA "diagnostico", "voce tem", "confirma"
    error_message: "AC-4 nao atendido: Linguagem de diagnostico detectada"

  - [ ] AC-5: Valores criticos bloqueiam modificacoes de protocolo ate clearance medico
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que valores criticos geram bloqueio de adjust-protocol
      ate referral resolvido
    error_message: "AC-5 nao atendido: Valores criticos nao bloqueiam protocolo"
```

---

## Veto Conditions

| ID | Condicao | Acao | Severidade |
|----|----------|------|------------|
| FC_LR_V001 | Fazer diagnostico medico baseado em resultados laboratoriais | BLOCK + esta task e de contextualizacao educativa, NAO de diagnostico — usar linguagem de triagem | NON-NEGOTIABLE |
| FC_LR_V002 | Recomendar mudanca de medicacao baseada em resultados | BLOCK + mudancas de medicacao sao EXCLUSIVIDADE do medico prescritor — encaminhar sempre | NON-NEGOTIABLE |
| FC_LR_V003 | Ignorar valores criticamente anormais e prosseguir com ajustes de protocolo | BLOCK + valores criticos requerem referral medico ANTES de qualquer modificacao de treino/dieta | NON-NEGOTIABLE |
| FC_LR_V004 | Interpretar resultados sem disclaimer visivel | BLOCK + disclaimer e obrigatorio em toda execucao e em todo report gerado | MUST |
| FC_LR_V005 | Interpretar exames com mais de 12 meses como base para decisoes | WARN + recomendar novos exames antes de ajustes significativos | SHOULD |
| FC_LR_V006 | Prescrever suplementacao terapeutica (ex: doses farmacologicas de vitamina D) | BLOCK + suplementacao terapeutica requer prescricao medica — coach pode sugerir doses fisiologicas apenas | MUST |

---

## Tools

**Recursos externos/compartilhados usados por esta task:**

- **Tool:** quality-checker
  - **Purpose:** Validar que interpretacao nao contem linguagem diagnostica
  - **Source:** squads/fitcoach/tools/quality-checker

---

## SEQUENTIAL Task Execution (Nao prosseguir ate a Task atual estar completa)

### Step 0: Receber Exames e Apresentar Disclaimer

- Receber resultados laboratoriais do cliente/coach
- Identificar paineis presentes
- Verificar data dos exames
- Apresentar disclaimer obrigatorio
- Carregar anamnese para contexto (medicacoes, condicoes)

```yaml
step_0:
  name: "Receber Exames e Disclaimer"
  executor: intake-analyst
  duration_expected: "3-5 min"
  checklist:
    - "Disclaimer apresentado e reconhecido"
    - "Paineis identificados"
    - "Data dos exames verificada"
    - "Anamnese carregada para contexto"
  panels_supported:
    - cbc (hemograma completo)
    - metabolic_panel (glicose, HbA1c, creatinina, ureia, TGO, TGP)
    - lipid_panel (colesterol total, LDL, HDL, triglicerides)
    - thyroid (TSH, T3, T4 livre)
    - hormonal (testosterona total e livre, cortisol, DHEA-S, estradiol)
    - vitamins_minerals (vitamina D, B12, ferro, ferritina, acido folico)
    - inflammation (PCR, VHS)
    - other (insulina jejum, HOMA-IR, acido urico, homocisteina)
  output: panels_identified
```

### Step 1: Hemograma Completo (CBC)

**Marcadores e Interpretacao:**

| Marcador | Range Clinico | Range Otimo Atleta | Red Flag |
|----------|--------------|-------------------|----------|
| Hemoglobina (M) | 13.0-17.5 g/dL | 14.5-17.0 g/dL | < 12.0 ou > 19.0 |
| Hemoglobina (F) | 12.0-16.0 g/dL | 13.0-15.5 g/dL | < 11.0 ou > 17.0 |
| Hematocrito (M) | 38.3-48.6% | 42-48% | < 36% ou > 52% |
| Hematocrito (F) | 35.5-44.9% | 38-45% | < 33% ou > 48% |
| Leucocitos | 4,500-11,000/uL | 5,000-8,000/uL | < 3,500 ou > 13,000 |
| Plaquetas | 150,000-400,000/uL | 200,000-350,000/uL | < 100,000 ou > 500,000 |
| VCM | 80-100 fL | 82-96 fL | < 75 ou > 105 |
| HCM | 27-33 pg | 28-32 pg | < 25 ou > 35 |

**Implicacoes para Treino:**
- Hemoglobina baixa: Capacidade aerobica reduzida, fadiga precoce, reduzir volume de condicionamento
- Hematocrito elevado: Risco trombotico em atletas (investigar eritrocitose), hidratacao critica
- Leucocitos baixos: Sistema imune comprometido, reduzir volume total, priorizar recovery
- Leucocitos elevados cronicamente: Overtraining, inflamacao sistemica, avaliar volume

```yaml
step_1:
  name: "Hemograma Completo"
  executor: intake-analyst
  duration_expected: "5-8 min"
  per_marker:
    - name: ""
    - value: 0
    - unit: ""
    - clinical_range: ""
    - athlete_optimal_range: ""
    - classification: "optimal | normal | attention | critical"
    - training_implication: ""
    - nutrition_implication: ""
    - referral_needed: false
  correlations:
    - "Hemoglobina + Ferritina → anemia ferropriva?"
    - "VCM + B12 → anemia megaloblastica?"
    - "Leucocitos + PCR → inflamacao sistemica?"
  output: cbc_interpretation
```

### Step 2: Painel Metabolico

**Marcadores e Interpretacao:**

| Marcador | Range Clinico | Range Otimo Atleta | Red Flag | Implicacao |
|----------|--------------|-------------------|----------|------------|
| Glicose jejum | 70-100 mg/dL | 75-90 mg/dL | > 126 (diabetes) | > 100: avaliar resistencia insulinica |
| HbA1c | < 5.7% | < 5.3% | > 6.5% (diabetes) | 5.7-6.4%: pre-diabetes, ajustar carbs |
| Insulina jejum | 2.6-24.9 uUI/mL | 3-8 uUI/mL | > 25 | > 12: resistencia insulinica, timing de carbs |
| HOMA-IR | < 2.5 | < 1.5 | > 4.0 | > 2.5: nutrient timing, carb cycling |
| Creatinina (M) | 0.7-1.3 mg/dL | 0.8-1.2 mg/dL | > 1.5 | Elevada em atletas musculosos (normal) |
| Creatinina (F) | 0.6-1.1 mg/dL | 0.6-1.0 mg/dL | > 1.3 | Contextualizar com massa muscular |
| TGO (AST) | 10-40 U/L | 15-35 U/L | > 80 | Elevada pos-treino e normal — verificar se colheu em repouso |
| TGP (ALT) | 7-56 U/L | 10-40 U/L | > 80 | Mais especifica hepatica que TGO |
| Ureia | 15-40 mg/dL | 20-35 mg/dL | > 50 | Elevada com alta proteina — normal em contexto |
| Acido urico (M) | 3.4-7.0 mg/dL | 4.0-6.5 mg/dL | > 8.0 | Hidratacao, revisar proteina animal |

**Contexto para atletas:**
- Creatinina tende a ser mais alta em atletas musculosos — isso NAO indica disfuncao renal necessariamente
- TGO pode subir apos treino intenso (dano muscular) — verificar se exame foi colhido 48h+ apos treino
- Ureia pode ser mais alta com dietas hiperproteicas — contextualizar com intake proteico

```yaml
step_2:
  name: "Painel Metabolico"
  executor: intake-analyst
  advisor: nutrition-scientist
  duration_expected: "8-12 min"
  athlete_context_notes:
    creatinine: "Pode ser elevada em atletas musculosos sem indicar disfuncao renal"
    ast: "Pode subir pos-treino intenso — verificar janela de coleta"
    urea: "Pode ser elevada com dieta hiperproteica — contextualizar"
    glucose: "Atletas com alta aderencia a low carb podem ter glicose elevada matinal (dawn phenomenon)"
  correlations:
    - "Glicose + HbA1c + Insulina + HOMA-IR → perfil glicemico completo"
    - "TGO + TGP → se ambos elevados: investigar hepatico vs. muscular"
    - "Creatinina + Ureia → funcao renal no contexto de massa muscular e proteina"
  output: metabolic_panel_interpretation
```

### Step 3: Painel Lipidico

**Marcadores e Interpretacao:**

| Marcador | Range Clinico | Range Otimo | Red Flag | Implicacao |
|----------|--------------|-------------|----------|------------|
| Colesterol Total | < 200 mg/dL | 150-200 mg/dL | > 240 | Avaliar dieta, gordura saturada |
| LDL | < 100 mg/dL | 70-100 mg/dL | > 160 | Risco CV, avaliar dieta |
| HDL (M) | > 40 mg/dL | > 50 mg/dL | < 35 | Exercicio aerobico, gordura mono/poli |
| HDL (F) | > 50 mg/dL | > 60 mg/dL | < 40 | Exercicio aerobico, gordura mono/poli |
| Triglicerides | < 150 mg/dL | < 100 mg/dL | > 200 | Reducao de carboidrato refinado, alcool |
| CT/HDL ratio | < 5.0 | < 3.5 | > 6.0 | Indicador de risco cardiovascular |

**Implicacoes para Nutricao:**
- LDL elevado: Revisar gordura saturada, aumentar fibra, considerar esterois vegetais
- HDL baixo: Incentivar exercicio aerobico (150+ min/semana), gorduras insaturadas
- Triglicerides elevados: Reduzir acucar adicionado e alcool, aumentar omega-3
- Ratio CT/HDL: Melhor preditor de risco que colesterol total isolado

```yaml
step_3:
  name: "Painel Lipidico"
  executor: intake-analyst
  advisor: nutrition-scientist
  duration_expected: "5-8 min"
  training_implications:
    low_hdl: "Adicionar 150+ min/semana de atividade aerobica moderada"
    high_triglycerides: "Priorizar cardio regular, reducao de carbs refinados"
    high_ldl: "Nao contraindica treino — ajuste nutricional prioritario"
  output: lipid_panel_interpretation
```

### Step 4: Painel Tireoidiano

**Marcadores e Interpretacao:**

| Marcador | Range Clinico | Range Otimo | Red Flag | Implicacao |
|----------|--------------|-------------|----------|------------|
| TSH | 0.4-4.0 mUI/L | 1.0-2.5 mUI/L | < 0.1 ou > 10 | Tireoide disfuncional |
| T4 Livre | 0.8-1.8 ng/dL | 1.0-1.5 ng/dL | < 0.6 ou > 2.5 | Metabolismo alterado |
| T3 Livre | 2.3-4.2 pg/mL | 2.8-3.8 pg/mL | < 2.0 ou > 5.0 | T3 pode cair em deficit calorico prolongado |

**Contexto para atletas:**
- T3 livre cai naturalmente durante deficit calorico prolongado (adaptacao metabolica)
- Isso NAO necessariamente indica hipotireoidismo — pode ser resposta adaptativa
- TSH levemente elevado (4-6) em contexto de deficit: monitorar, nao medicar automaticamente
- Atletas em prep prolongada: monitorar tireoide a cada 6-8 semanas

**Implicacoes para Treino:**
- TSH elevado + T4 baixo: Metabolismo reduzido, recovery comprometido, reduzir deficit
- T3 baixo isolado em deficit: Considerar refeed strategies, diet break programado
- Hipertireoidismo (TSH suprimido + T4 elevado): Referral imediato, risco cardiaco durante exercicio

```yaml
step_4:
  name: "Painel Tireoidiano"
  executor: intake-analyst
  advisor: nutrition-scientist
  duration_expected: "5-8 min"
  deficit_context:
    t3_drop_expected: true
    t3_threshold_for_concern: "< 2.3 pg/mL em deficit > 12 semanas"
    action: "Considerar diet break de 1-2 semanas na manutencao"
  referral_triggers:
    hypothyroid_uncontrolled: "TSH > 10 ou T4 < 0.6"
    hyperthyroid: "TSH < 0.1 com T4 > 2.5"
  output: thyroid_interpretation
```

### Step 5: Painel Hormonal

**Marcadores e Interpretacao:**

| Marcador | Range Clinico (M) | Range Otimo Atleta (M) | Red Flag |
|----------|-------------------|----------------------|----------|
| Testosterona Total | 264-916 ng/dL | 500-900 ng/dL | < 200 |
| Testosterona Livre | 5.0-21.0 ng/dL | 10-20 ng/dL | < 5.0 |
| SHBG | 10-57 nmol/L | 20-40 nmol/L | > 70 |
| Cortisol (8h) | 6.2-19.4 ug/dL | 8-15 ug/dL | > 25 ou < 3 |
| DHEA-S (M) | 80-560 ug/dL | 200-400 ug/dL | < 50 |
| Estradiol (M) | 7.6-42.6 pg/mL | 15-30 pg/mL | > 60 |

| Marcador | Range Clinico (F) | Range Otimo Atleta (F) | Red Flag |
|----------|-------------------|----------------------|----------|
| Testosterona Total | 15-70 ng/dL | 30-60 ng/dL | < 10 |
| Cortisol (8h) | 6.2-19.4 ug/dL | 8-15 ug/dL | > 25 ou < 3 |
| Estradiol (F) | Varia por fase ciclo | Varia por fase ciclo | Amenorreia |
| Progesterona (F) | Varia por fase ciclo | Varia por fase ciclo | — |

**Contexto para atletas naturais:**
- Testosterona tende a cair durante deficit calorico prolongado e overtraining
- Testosterona baixa + cortisol alto: Classico sinal de overreaching/overtraining
- SHBG elevado: Reduz testosterona livre biodisponivel — pode ocorrer com deficit ou estresse
- Cortisol matinal elevado cronicamente: Investigar estresse, sono, volume de treino

**Implicacoes para Programacao:**
- Testosterona baixa-normal (300-500): Priorizar recovery, reduzir volume, avaliar sono/estresse
- Cortisol cronicamente alto: Reduzir volume 20%, mais descanso, avaliar estresse externo
- Ratio Testosterona/Cortisol baixo: Indicador de overtraining, deload imediato
- Estradiol elevado em homens: Referral endocrinologista, possivel aromatizacao excessiva

```yaml
step_5:
  name: "Painel Hormonal"
  executor: intake-analyst
  advisor: elite-coach
  duration_expected: "8-12 min"
  training_implications:
    low_testosterone:
      action: "Priorizar recovery, sono 8h+, reduzir volume para MAV ou abaixo"
      nutrition: "Garantir gordura > 0.8g/kg, nao sub-calorico agressivo"
      referral: "Endocrinologista se < 264 ng/dL (M) persistente"
    high_cortisol:
      action: "Deload 1 semana, reduzir volume 20% no proximo mesociclo"
      nutrition: "Nao estar em deficit agressivo, considerar diet break"
      lifestyle: "Avaliar estresse, sono, mindfulness"
    overtraining_markers:
      pattern: "Testo baixa + Cortisol alto + Performance caindo"
      action: "Deload 2 semanas, volume minimo, sono como prioridade #1"
  output: hormonal_interpretation
```

### Step 6: Vitaminas e Minerais

**Marcadores e Interpretacao:**

| Marcador | Range Clinico | Range Otimo Atleta | Red Flag | Implicacao para Treino |
|----------|--------------|-------------------|----------|----------------------|
| Vitamina D (25-OH) | 30-100 ng/mL | 50-80 ng/mL | < 20 | Performance muscular reduzida, risco de lesao |
| Vitamina B12 | 200-900 pg/mL | 400-800 pg/mL | < 150 | Fadiga, neuropatia, especialmente vegetarianos |
| Ferro serico | 60-170 ug/dL | 80-150 ug/dL | < 40 | Fadiga, performance reduzida |
| Ferritina (M) | 12-300 ng/mL | 50-150 ng/mL | < 12 ou > 400 | Reserva de ferro — critica para atletas |
| Ferritina (F) | 12-150 ng/mL | 30-100 ng/mL | < 12 ou > 300 | Mulheres atletas: deplecao muito comum |
| Acido Folico | 2.7-17.0 ng/mL | 5-15 ng/mL | < 2.0 | Anemia megaloblastica |
| Magnesio | 1.7-2.2 mg/dL | 1.9-2.2 mg/dL | < 1.5 | Caibras, recovery comprometido |

**Contexto para atletas — FERRITINA:**
- Ferritina clinicamente "normal" (ex: 20 ng/mL) pode ser SUB-OTIMA para atletas
- Atletas com alta demanda de oxigenio precisam de ferritina > 50 ng/mL (homens) e > 30 ng/mL (mulheres)
- Ferritina < 30 em mulheres atletas: Considerar suplementacao de ferro (com orientacao medica)
- Ferritina muito alta (> 300): Investigar hemocromatose, inflamacao, ou suplementacao excessiva

**Contexto para atletas — VITAMINA D:**
- Niveis < 30 associados a: performance muscular reduzida, risco aumentado de lesao, imunidade comprometida
- Atletas indoor (academia) tendem a ter niveis mais baixos
- Suplementacao segura (fisiologica): 1000-4000 UI/dia (verificar com medico para doses maiores)

```yaml
step_6:
  name: "Vitaminas e Minerais"
  executor: intake-analyst
  advisor: nutrition-scientist
  duration_expected: "8-12 min"
  athlete_specific_ranges:
    ferritin:
      male_optimal: [50, 150]
      female_optimal: [30, 100]
      note: "Clinical 'normal' may be sub-optimal for athletes"
    vitamin_d:
      optimal: [50, 80]
      note: "Most gym athletes are below 50 — indoor training"
    b12:
      optimal: [400, 800]
      note: "Vegetarians/vegans at higher risk of deficiency"
  supplementation_guidance:
    vitamin_d_physiological: "1000-4000 UI/dia — dose fisiologica segura"
    vitamin_d_therapeutic: "REQUER prescricao medica para doses > 4000 UI/dia"
    iron: "REQUER orientacao medica — suplementacao inadequada pode ser toxica"
    b12_sublingual: "1000 mcg/dia se deficiente — seguro como suplemento"
    magnesium: "200-400 mg/dia (glicinato ou bisglicinato) — seguro"
  output: vitamins_minerals_interpretation
```

### Step 7: Marcadores Inflamatorios

**Marcadores e Interpretacao:**

| Marcador | Range Clinico | Range Otimo | Red Flag | Implicacao |
|----------|--------------|-------------|----------|------------|
| PCR (Proteina C-Reativa) | < 1.0 mg/L | < 0.5 mg/L | > 3.0 | Inflamacao sistemica |
| PCR ultra-sensivel | < 1.0 mg/L | < 0.5 mg/L | > 3.0 | Risco cardiovascular |
| VHS (Velocidade Hemossedimentacao) | 0-20 mm/h (M) / 0-30 mm/h (F) | < 10 mm/h | > 40 | Inflamacao cronica |

**Contexto para atletas:**
- PCR pode subir temporariamente apos treino intenso (24-72h) — verificar janela de coleta
- PCR cronicamente > 1.0 mg/L sem treino recente: Investigar inflamacao sistemica
- PCR + ferritina elevados: Ferritina pode estar falsamente alta (proteina de fase aguda)
- VHS cronicamente elevado: Pode indicar overtraining, infeccao cronica, ou condicao autoimune

**Implicacoes para Treino:**
- PCR > 1.0 cronico: Reduzir volume, priorizar anti-inflamatorios naturais (omega-3, curcumina)
- PCR > 3.0: Referral medico, avaliar causa antes de modificar treino
- VHS elevado + performance caindo: Investigar overtraining ou infeccao

```yaml
step_7:
  name: "Marcadores Inflamatorios"
  executor: intake-analyst
  duration_expected: "5-8 min"
  training_context:
    post_training_elevation: "PCR pode subir 24-72h pos-treino — normal"
    chronic_elevation: "PCR > 1.0 por 2+ coletas: inflamacao cronica"
  training_implications:
    chronic_inflammation:
      volume: "Reduzir 15-20%"
      nutrition: "Omega-3 (2-3g EPA+DHA/dia), aumentar vegetais, reduzir processados"
      recovery: "Sono 8h+, gerenciamento de estresse"
    acute_high_pcr:
      action: "Referral medico, nao modificar treino ate investigacao"
  output: inflammation_interpretation
```

### Step 8: Correlacao Sistemica e Sintese

Analisar todos os paineis em conjunto, identificando padroes:

**Padroes Comuns em Atletas:**

| Padrao | Marcadores | Interpretacao | Acao |
|--------|-----------|---------------|------|
| Overtraining | Testo baixa + Cortisol alto + PCR elevada + Leucocitos alterados | Excesso de volume/frequencia sem recovery adequado | Deload 2 semanas, reduzir volume 30%, sono e nutricao |
| Deficiencia Ferrica | Ferritina baixa + Hemoglobina no limite baixo + Fadiga reportada | Comum em mulheres atletas e vegetarianos | Referral para suplementacao de ferro, ajustar condicionamento |
| Adaptacao Metabolica | T3 baixo + TSH normal-alto + Testosterona em queda | Deficit calorico prolongado | Diet break 2 semanas, refeeds programados |
| Resistencia Insulinica | Glicose > 100 + Insulina > 12 + HOMA-IR > 2.5 + Triglicerides > 150 | Metabolismo de carboidratos comprometido | Carb cycling, timing de carbs no peri-treino, cardio |
| Inflamacao Cronica | PCR > 1.0 + VHS elevado + Ferritina alta + Leucocitos normais | Inflamacao sistemica nao-infecciosa | Nutricao anti-inflamatoria, avaliar gut health |
| Red Cell Athlete | Hematocrito alto-normal + Hemoglobina alta + Ferritina boa | Adaptacao ao treino aerobico (normal) | Manter hidratacao, monitorar |

```yaml
step_8:
  name: "Correlacao Sistemica e Sintese"
  executor: intake-analyst
  advisor: nutrition-scientist
  advisor: elite-coach
  duration_expected: "10-15 min"
  pattern_matching:
    - overtraining_syndrome
    - iron_deficiency_athlete
    - metabolic_adaptation
    - insulin_resistance
    - chronic_inflammation
    - red_cell_adaptation
  correlation_rules:
    - "Nao interpretar marcadores isoladamente"
    - "Contextualizar com anamnese e protocolo atual"
    - "Verificar janela de coleta (pos-treino, jejum, horario)"
    - "Comparar com exames anteriores se disponiveis (trend > ponto isolado)"
  output: systemic_correlation
```

### Step 9: Geracao do Report e Recomendacoes

Compilar interpretacao completa em report estruturado:

```yaml
step_9:
  name: "Geracao do Report"
  executor: intake-analyst
  tool: quality-checker
  duration_expected: "8-12 min"
  report_structure:
    disclaimer: "OBRIGATORIO — texto completo do disclaimer"
    metadata:
      task_id: "FC-TASK-012"
      client_id: ""
      lab_date: ""
      interpretation_date: ""
      interpreter: "intake-analyst + nutrition-scientist"
    panels_interpreted: []
    per_marker:
      - name: ""
      - value: 0
      - unit: ""
      - clinical_range: ""
      - athlete_optimal_range: ""
      - classification: "optimal | normal | attention | critical"
      - context_note: ""
    correlations_identified: []
    patterns_detected: []
    red_flags:
      - marker: ""
      - value: ""
      - action: "referral | block | monitor"
      - referral_to: ""
    training_implications:
      volume_modifier: 1.0
      conditioning_modifier: 1.0
      recovery_priority: false
      specific_adjustments: []
    nutrition_implications:
      macro_adjustments: []
      supplement_recommendations: []
      timing_adjustments: []
    referral_triggers: []
    protocol_adjustments_recommended: []
    follow_up:
      retest_recommended: true/false
      retest_panels: []
      retest_timeline: ""
  language_validation:
    forbidden_terms: ["diagnostico", "voce tem", "confirma que", "doenca comprovada"]
    required_terms: ["sugere", "consistente com", "pode indicar", "recomenda-se avaliar com medico"]
  output: lab_interpretation_report
```

### Step 10: Aprovacao do Coach e Routing

- Apresentar report completo com destaque para achados principais
- Listar implicacoes para treino e nutricao
- Apresentar referrals gerados
- Definir proximo passo (ajustar protocolo ou aguardar referral)

```yaml
step_10:
  name: "Aprovacao do Coach e Routing"
  executor: human (coach)
  duration_expected: "10-15 min"
  approval_options:
    - approve: "Aplicar ajustes recomendados ao protocolo"
    - refer_first: "Aguardar retorno medico antes de ajustar"
    - adjust: "Modificar recomendacoes"
    - retest: "Solicitar novos exames antes de decidir"
  routing:
    adjustments_approved:
      next_task: "adjust-protocol"
      data_passed: ["training_implications", "nutrition_implications"]
    referral_pending:
      action: "hold protocol changes"
      monitor: "Continue current protocol, flag for review"
    retest_needed:
      action: "schedule new labs"
      timeline: "4-8 weeks"
  output: coach_decision
```

---

## Error Handling

**Strategy:** conservative_interpretation + referral_when_in_doubt

**Common Errors:**

1. **Error:** Resultados sem ranges de referencia do laboratorio
   - **Cause:** Laboratorio nao incluiu ranges, ou resultado parcial
   - **Resolution:** Usar ranges de referencia padrao com nota de que sao genericos
   - **Recovery:** Recomendar ao coach solicitar resultado completo ao laboratorio

2. **Error:** Exames antigos (> 6 meses)
   - **Cause:** Cliente nao faz exames regulares
   - **Resolution:** Interpretar com ressalva de que valores podem ter mudado
   - **Recovery:** Recomendar novos exames antes de decisoes significativas

3. **Error:** Marcador criticamente anormal
   - **Cause:** Condicao medica nao diagnosticada ou descompensada
   - **Resolution:** HALT imediato, gerar referral, notificar coach
   - **Recovery:** Aguardar retorno medico antes de qualquer ajuste de protocolo

4. **Error:** Conflito entre resultado e anamnese (ex: "sem medicacao" mas TSH suprimido)
   - **Cause:** Cliente omitiu informacao ou erro laboratorial
   - **Resolution:** Flag inconsistencia, solicitar esclarecimento
   - **Recovery:** Nao interpretar ate inconsistencia resolvida

5. **Error:** Multiplos valores criticos simultaneos
   - **Cause:** Condicao sistemica, erro de coleta, ou cliente doente
   - **Resolution:** Referral medico urgente para TODOS os valores, nao tentar interpretar individualmente
   - **Recovery:** Suspender qualquer recomendacao de treino ate avaliacao medica completa

---

## Performance

**Expected Metrics:**

```yaml
duration_expected: "30-60 min (interpretacao completa multi-painel)"
cost_estimated: "$0.02-0.06"
token_usage: "~10,000-20,000 tokens"
panels_per_session: "1-6 (dependendo dos exames apresentados)"
```

**Optimization Notes:**
- Paineis podem ser interpretados em paralelo quando independentes
- Cache de ranges de referencia por genero/idade
- Templates pre-construidos para paineis comuns
- Correlacao sistemica automatizada para padroes conhecidos

---

## Validation Criteria

```yaml
validation:
  safety:
    - "Disclaimer presente em TODA execucao e em TODO report"
    - "Nenhum diagnostico medico realizado"
    - "Nenhuma recomendacao de medicacao feita"
    - "Valores criticos geram referral automatico"
    - "Linguagem de triagem, nao de diagnostico"

  completeness:
    - "Todos os marcadores presentes interpretados"
    - "Duplo range (clinico + atleta) para cada marcador"
    - "Implicacoes para treino e nutricao documentadas"
    - "Correlacoes entre paineis identificadas"

  accuracy:
    - "Ranges de referencia corretos por genero e contexto"
    - "Contexto de atleta aplicado (nao apenas ranges clinicos)"
    - "Padroes sistemicos identificados (nao apenas marcadores isolados)"
    - "Janela de coleta considerada na interpretacao"

  quality:
    - "Report estruturado e profissional"
    - "Linguagem acessivel ao coach"
    - "Acoes praticas e especificas para cada achado"
    - "Follow-up e reteste recomendados quando apropriado"
```

---

## Metadata

```yaml
task_id: FC-TASK-012
name: lab-results-interpreter
version: 1.0.0
squad: fitcoach
priority: P0
classification: CRITICAL_SAFETY
dependencies:
  - anamnese-clinica (FC-TASK-010) — contexto medico
  - intake-analyst (executor principal)
  - nutrition-scientist (advisor — implicacoes nutricionais)
  - elite-coach (advisor — implicacoes para treino)
  - hypertrophy-scientist (advisor — volume e recovery)
  - quality-checker (tool — validacao de linguagem)
tags:
  - lab-results
  - blood-work
  - safety
  - hormonal
  - metabolic
  - education
  - referral
  - P0
updated_at: 2026-03-13
```

---

## Handoff

```yaml
next_task:
  adjustments_approved:
    task: "adjust-protocol"
    condition: "coach_decision == 'approve' && no_critical_referrals"
    data_passed:
      - training_implications
      - nutrition_implications
      - protocol_adjustments_recommended
  referral_pending:
    action: "hold"
    condition: "referral_triggers.any(r => r.blocking == true)"
    resume_when: "medical_response_received"
    allowed: ["weekly-checkin (monitoring only)"]
  retest:
    action: "schedule"
    condition: "coach_decision == 'retest'"
    timeline: "4-8 weeks"
    panels: "{report.follow_up.retest_panels}"
  no_changes:
    action: "continue"
    condition: "all_markers_optimal"
    note: "Registrar baseline, usar para comparacao futura"
```
