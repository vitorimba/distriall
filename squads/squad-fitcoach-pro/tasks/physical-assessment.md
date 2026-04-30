<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: physical-assessment
  task_name: Physical Assessment
  status: active
  responsible_executor: 'intake-analyst + progress-tracker + human (coach)'
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
- Coleta dados minimos e gera report basico
- **Melhor para:** Reavaliacao de cliente ja conhecido, sem mudancas significativas

### 2. Interactive Mode - Balanceado, Educativo (5-10 prompts) **[DEFAULT]**
- Checkpoints em cada fase da avaliacao
- Explica ao coach o significado de cada metrica
- **Melhor para:** Primeiro assessment, clientes intermediarios

### 3. Pre-Flight Planning - Planejamento Completo Antecipado
- Planejamento de todos os testes antes de iniciar
- Define protocolo especifico baseado no perfil do cliente
- **Melhor para:** Atletas avancados, clientes com restricoes, pre-competicao

**Parameter:** `mode` (optional, default: `interactive`)

---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: physicalAssessment()
id: FC-TASK-011
responsavel: intake-analyst + progress-tracker + human (coach)
responsavel_type: Hybrid
squad: fitcoach
pattern_prefix: FC
atomic_layer: Organism
priority: P0
classification: CRITICAL_SAFETY

advisors:
  - intake-analyst (Scout) — Conducao da avaliacao, registro de dados
  - biomechanics-coach (Charles Glass) — Avaliacao postural e de movimento
  - elite-coach (Matt Jansen) — Contextualizacao de testes de forca e baselines
  - hypertrophy-scientist (Mike Israetel) — Interpretacao de composicao corporal

**Entrada:**
- campo: anamnesis_report
  tipo: object
  origem: anamnese-clinica task output
  obrigatorio: true
  validacao: |
    Must contain completed anamnesis with risk_classification.
    If risk_classification.overall_risk == 'critical': BLOCK this task.

- campo: client_profile
  tipo: object
  origem: client-intake task output
  obrigatorio: true
  validacao: Must contain basic demographics, training history, goals

- campo: risk_classification
  tipo: object
  origem: anamnese-clinica task output
  obrigatorio: true
  validacao: |
    Must contain overall_risk level and any movement restrictions
    from musculoskeletal history

- campo: available_equipment
  tipo: array[string]
  origem: Coach Input
  obrigatorio: true
  validacao: |
    Must specify: scale (boolean), stadiometer (boolean), tape_measure (boolean),
    skinfold_caliper (boolean), blood_pressure_cuff (boolean),
    goniometer (boolean), barbell_and_weights (boolean)

- campo: dexa_scan
  tipo: object
  origem: External Lab (optional)
  obrigatorio: false
  validacao: |
    If provided: must contain total_body_fat_percent, lean_mass_kg,
    bone_mineral_density, regional_composition

**Saida:**
- campo: assessment_report
  tipo: object
  destino: Data Store (clients/{id}/assessments/)
  persistido: true

- campo: anthropometry_data
  tipo: object
  destino: Data Store (clients/{id}/assessments/anthropometry.yaml)
  persistido: true

- campo: body_composition
  tipo: object
  destino: Data Store (clients/{id}/assessments/body-composition.yaml)
  persistido: true

- campo: postural_assessment
  tipo: object
  destino: Data Store (clients/{id}/assessments/postural.yaml)
  persistido: true

- campo: movement_screening
  tipo: object
  destino: Data Store (clients/{id}/assessments/movement-screening.yaml)
  persistido: true

- campo: flexibility_tests
  tipo: object
  destino: Data Store (clients/{id}/assessments/flexibility.yaml)
  persistido: true

- campo: strength_baselines
  tipo: object
  destino: Data Store (clients/{id}/assessments/strength-baselines.yaml)
  persistido: true

- campo: cardiovascular_baseline
  tipo: object
  destino: Data Store (clients/{id}/assessments/cardiovascular.yaml)
  persistido: true

- campo: photo_documentation
  tipo: array[image]
  destino: Data Store (clients/{id}/assessments/photos/)
  persistido: true
```

---

## Pre-Conditions

**Purpose:** Validar pre-requisitos ANTES da execucao da task (blocking)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Anamnese clinica (FC-TASK-010) completa e aprovada
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que anamnese-clinica foi concluida com status 'complete' ou 'pending_clearance'
      (pending_clearance permite assessment adaptado)
    error_message: "Pre-condition failed: Anamnese clinica nao concluida"

  - [ ] Sem red flags criticos bloqueantes nao resolvidos
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que risk_classification nao contem red flags com blocking=true
      sem clearance obtido. Exception: partial_clearance permite assessment adaptado.
    error_message: "Pre-condition failed: Red flags criticos nao resolvidos"

  - [ ] Equipamentos minimos disponiveis
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que pelo menos: balanca, fita metrica e esfigmomanometro
      estao disponiveis (skinfold caliper desejavel mas nao obrigatorio)
    error_message: "Pre-condition failed: Equipamentos minimos nao disponiveis"

  - [ ] Cliente em jejum de pelo menos 2h para medidas antropometricas
    tipo: pre-condition
    blocker: false
    validacao: |
      Idealmente em jejum ou pelo menos 2h apos ultima refeicao para
      consistencia das medicoes. Se nao, registrar condicao no report.
    error_message: "Warning: Cliente nao esta em condicao ideal para medidas"

  - [ ] Pressao arterial deve ser verificada ANTES de qualquer teste de esforco
    tipo: pre-condition
    blocker: true
    validacao: |
      PA deve ser aferida em repouso antes de testes de forca ou cardiovasculares.
      Se PA > 140/90: adaptar protocolo. Se PA > 160/100: BLOCK testes de esforco.
    error_message: "Pre-condition failed: PA nao verificada antes de testes de esforco"
```

---

## Post-Conditions

**Purpose:** Validar sucesso da execucao APOS task completar

**Checklist:**

```yaml
post-conditions:
  - [ ] Dados antropometricos completos registrados
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que peso, altura, BMI e pelo menos 6 circunferencias estao registrados
    error_message: "Post-condition failed: Dados antropometricos incompletos"

  - [ ] Avaliacao postural realizada em 3 vistas
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que postural_assessment contem anterior, lateral e posterior views
    error_message: "Post-condition failed: Avaliacao postural incompleta"

  - [ ] Movement screening com pelo menos 3 testes realizados
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que movement_screening contem overhead_squat, single_leg_squat,
      e pelo menos 1 teste adicional
    error_message: "Post-condition failed: Movement screening incompleto"

  - [ ] Baseline cardiovascular registrado (FC repouso + PA)
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que cardiovascular_baseline contem resting_hr e blood_pressure
    error_message: "Post-condition failed: Baseline cardiovascular ausente"

  - [ ] Report de assessment gerado com baseline values
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que assessment_report contem todas as secoes com valores baseline
    error_message: "Post-condition failed: Report de assessment incompleto"
```

---

## Acceptance Criteria

```yaml
acceptance-criteria:
  - [ ] AC-1: Antropometria completa com 12 pontos de circunferencia medidos
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que anthropometry_data contem peso, altura, BMI e circunferencias:
      pescoco, ombros, peito, braco_D, braco_E, antebraco, cintura, quadril,
      coxa_D, coxa_E, panturrilha_D, panturrilha_E
    error_message: "AC-1 nao atendido: Circunferencias incompletas"

  - [ ] AC-2: Composicao corporal estimada por pelo menos 1 metodo
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que body_composition contem estimativa de BF% por pelo menos
      1 metodo (skinfold, bioimpedancia ou DEXA) com formula identificada
    error_message: "AC-2 nao atendido: Composicao corporal nao estimada"

  - [ ] AC-3: Avaliacao postural documentada com desvios identificados
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que postural_assessment contem 3 vistas com desvios
      classificados por severidade (normal, leve, moderado, severo)
    error_message: "AC-3 nao atendido: Avaliacao postural sem desvios classificados"

  - [ ] AC-4: Movement screening com scoring padronizado
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que cada teste de movimento tem score (0-3 ou pass/fail)
      com observacoes de compensacoes identificadas
    error_message: "AC-4 nao atendido: Movement screening sem scoring"

  - [ ] AC-5: Strength baselines registrados para compostos principais
    tipo: acceptance-criterion
    blocker: false
    validacao: |
      Assert que strength_baselines contem estimativa ou teste real de 1RM
      para pelo menos 2 dos 4 lifts principais (squat, bench, deadlift, OHP)
    error_message: "AC-5 nao atendido: Strength baselines ausentes"

  - [ ] AC-6: Fotos padronizadas documentadas (frente, lado, costas)
    tipo: acceptance-criterion
    blocker: false
    validacao: |
      Assert que photo_documentation contem pelo menos 3 fotos (frente, lado, costas)
      com metadata de lighting, hora e pose
    error_message: "AC-6 nao atendido: Fotos padronizadas ausentes"
```

---

## Veto Conditions

| ID | Condicao | Acao | Severidade |
|----|----------|------|------------|
| FC_PA_V001 | Pular avaliacao postural para clientes novos (primeiro assessment) | BLOCK + avaliacao postural e obrigatoria no primeiro assessment para identificar desvios que afetam prescricao | NON-NEGOTIABLE |
| FC_PA_V002 | Ignorar PA > 140/90 e prosseguir com testes de esforco maximo | BLOCK + adaptar protocolo: sem testes de 1RM, sem testes cardiovasculares maximos, referral para cardiologista se PA > 160/100 | NON-NEGOTIABLE |
| FC_PA_V003 | Realizar testes de 1RM real em clientes iniciantes (< 6 meses de treino) | BLOCK + usar estimativa de 1RM via formula de Epley/Brzycki com carga submaxima | MUST |
| FC_PA_V004 | Pular verificacao de PA pre-teste de esforco | BLOCK + PA deve ser aferida em repouso antes de qualquer teste de esforco | MUST |
| FC_PA_V005 | Aplicar protocolo de skinfold 7 dobras em cliente com obesidade severa (IMC > 40) | REDIRECT + usar circunferencias e bioimpedancia como alternativa — skinfold impreciso em BF% muito alto | SHOULD |

---

## Tools

**Recursos externos/compartilhados usados por esta task:**

- **Tool:** progress-comparator
  - **Purpose:** Registrar baseline de fotos e medidas para comparacao futura
  - **Source:** squads/fitcoach/tools/progress-comparator

- **Tool:** macro-calculator
  - **Purpose:** Calcular FFMI, BMI e estimativas de composicao corporal
  - **Source:** squads/fitcoach/tools/macro-calculator

- **Tool:** quality-checker
  - **Purpose:** Validar consistencia dos dados coletados
  - **Source:** squads/fitcoach/tools/quality-checker

---

## SEQUENTIAL Task Execution (Nao prosseguir ate a Task atual estar completa)

### Step 0: Preparacao e Verificacao de Seguranca

- Carregar anamnesis_report e risk_classification do FC-TASK-010
- Verificar restricoes de movimento da anamnese
- Verificar equipamentos disponiveis
- Definir protocolo adaptado baseado no risco e restricoes
- Aferir PA em repouso (5 min sentado, braco apoiado)

```yaml
step_0:
  name: "Preparacao e Verificacao de Seguranca"
  executor: intake-analyst
  duration_expected: "5-8 min"
  safety_checks:
    blood_pressure:
      method: "Auscultatorio ou digital, braco dominante, 5 min repouso"
      normal: "< 120/80"
      elevated: "120-129 / < 80"
      stage_1_hypertension: "130-139 / 80-89"
      stage_2_hypertension: "140-159 / 90-99"
      hypertensive_crisis: ">= 160/100"
      action_stage_2: "Adaptar protocolo: sem testes maximos, referenciar"
      action_crisis: "BLOCK todos os testes de esforco, referral imediato"
    resting_heart_rate:
      method: "Palpacao radial ou oximetro, 60 segundos"
      bradycardia: "< 50 bpm (verificar se atleta treinado)"
      normal: "50-100 bpm"
      tachycardia: "> 100 bpm (flag para investigacao)"
  outputs:
    - blood_pressure_reading
    - resting_heart_rate
    - protocol_adaptations
  validation:
    - "PA aferida antes de qualquer teste"
    - "Restricoes identificadas e protocolo adaptado"
```

### Step 1: Antropometria

#### 1.1 Medidas Basicas

- **Peso:** Balanca calibrada, roupa minima, mesmo horario (ideal: manha, jejum, pos-banheiro)
- **Altura:** Estadiometro, posicao ereta, inspiracao maxima
- **BMI:** peso(kg) / altura(m)^2

```yaml
step_1_1:
  name: "Medidas Basicas"
  executor: intake-analyst
  duration_expected: "3-5 min"
  measurements:
    weight:
      unit: kg
      precision: 0.1
      conditions: "Roupa minima, horario consistente"
    height:
      unit: cm
      precision: 0.5
      conditions: "Descalco, posicao ereta, olhar horizontal"
    bmi:
      formula: "weight / (height/100)^2"
      interpretation:
        underweight: "< 18.5"
        normal: "18.5-24.9"
        overweight: "25.0-29.9"
        obese_1: "30.0-34.9"
        obese_2: "35.0-39.9"
        obese_3: ">= 40.0"
      note: "BMI limitado para atletas — usar com FFMI e BF%"
  output: basic_measurements
```

#### 1.2 Circunferencias (12 pontos)

Protocolo de medicao com fita metrica flexivel inextensivel:

| Ponto | Referencia Anatomica | Posicao do Cliente | Notas |
|-------|---------------------|--------------------|-------|
| Pescoco | Abaixo da proeminencia laringea | Em pe, relaxado | Ponto mais estreito |
| Ombros | Perimetro maximo na linha dos deltoides | Em pe, bracos ao lado | Ponto mais largo |
| Peito | Linha dos mamilos (homens) / axilar (mulheres) | Em pe, final da expiracao | Fita horizontal |
| Braco D | Ponto medio entre acromio e olecrano | Relaxado + contraido | Medir ambos |
| Braco E | Ponto medio entre acromio e olecrano | Relaxado + contraido | Medir ambos |
| Antebraco | Perimetro maximo do antebraco | Relaxado | Ponto mais largo |
| Cintura | Ponto mais estreito entre costela e crista iliaca | Em pe, final da expiracao | Se nao visivel: nivel umbilical |
| Quadril | Perimetro maximo na linha dos gluteos | Em pe, pes juntos | Ponto mais largo |
| Coxa D | 15 cm acima da borda superior da patela | Em pe, peso distribuido | Medir ambos |
| Coxa E | 15 cm acima da borda superior da patela | Em pe, peso distribuido | Medir ambos |
| Panturrilha D | Perimetro maximo | Em pe, peso distribuido | Ponto mais largo |
| Panturrilha E | Perimetro maximo | Em pe, peso distribuido | Ponto mais largo |

**Regras de medicao:**
- 3 medidas por ponto, registrar media
- Fita em contato firme mas sem comprimir tecido
- Lado dominante e nao-dominante separados (bracos, coxas, panturrilhas)
- Registrar condicao: jejum, hidratado, pos-treino, etc.

```yaml
step_1_2:
  name: "Circunferencias — 12 Pontos"
  executor: intake-analyst
  duration_expected: "10-15 min"
  measurements_per_point: 3
  record: "media das 3 medidas"
  unit: cm
  precision: 0.5
  derived_metrics:
    waist_to_hip_ratio:
      formula: "cintura / quadril"
      risk_male: "> 0.90 (risco cardiovascular elevado)"
      risk_female: "> 0.85 (risco cardiovascular elevado)"
    waist_to_height_ratio:
      formula: "cintura / altura"
      risk: "> 0.50 (risco metabolico elevado)"
  output: circumference_measurements
```

### Step 2: Composicao Corporal

#### 2.1 Protocolo de Dobras Cutaneas (Skinfold)

**Protocolo de 7 dobras — Jackson & Pollock (1978):**

| Dobra | Localizacao | Direcao |
|-------|------------|---------|
| Peitoral | Linha media entre axila anterior e mamilo (H) / 1/3 distal (M) | Diagonal |
| Abdominal | 2 cm lateral ao umbigo | Vertical |
| Coxa | Ponto medio entre prega inguinal e patela | Vertical |
| Triceps | Ponto medio posterior entre acromio e olecrano | Vertical |
| Subescapular | 1-2 cm abaixo do angulo inferior da escapula | Diagonal (45 graus) |
| Suprailiac | Linha axilar anterior, acima da crista iliaca | Diagonal |
| Axilar Media | Linha axilar media, na altura do apendice xifoide | Horizontal |

**Protocolo alternativo de 3 dobras (para rapidez ou inexperiencia do avaliador):**

| Genero | Dobras | Formula |
|--------|--------|---------|
| Masculino | Peitoral + Abdominal + Coxa | Jackson & Pollock 3-site (1978) |
| Feminino | Triceps + Suprailiac + Coxa | Jackson & Pollock 3-site (1978) |

**Regras de medicao:**
- Compasso (caliper) Lange ou Harpenden
- Pincar com indicador e polegar, 1 cm acima do ponto de medicao
- Ler apos 2-3 segundos de estabilizacao
- 3 medidas por ponto, registrar media (se variacao > 2mm: repetir)
- Sempre medir lado direito do corpo
- Nao medir apos exercicio (edema altera valores)

```yaml
step_2_1:
  name: "Dobras Cutaneas — Skinfold"
  executor: intake-analyst
  duration_expected: "10-15 min (7 dobras) | 5-8 min (3 dobras)"
  protocol: "Jackson & Pollock"
  sites_7fold: [peitoral, abdominal, coxa, triceps, subescapular, suprailiac, axilar_media]
  sites_3fold_male: [peitoral, abdominal, coxa]
  sites_3fold_female: [triceps, suprailiac, coxa]
  measurements_per_site: 3
  unit: mm
  precision: 0.5
  formulas:
    density_male_7: "1.112 - 0.00043499(sum7) + 0.00000055(sum7)^2 - 0.00028826(age)"
    density_female_7: "1.097 - 0.00046971(sum7) + 0.00000056(sum7)^2 - 0.00012828(age)"
    bf_percent: "(4.95/density - 4.50) * 100"
  output: skinfold_measurements
```

#### 2.2 Estimativa de Composicao Corporal

Calcular e interpretar:

- **BF% (Body Fat Percentage):** Via formula de Jackson & Pollock
- **Massa Magra (kg):** Peso * (1 - BF%/100)
- **Massa Gorda (kg):** Peso * (BF%/100)
- **FFMI (Fat-Free Mass Index):** Massa Magra / (Altura/100)^2
- **Comparacao com DEXA (se disponivel):** Registrar diferenca entre metodos

**Interpretacao de FFMI:**

| FFMI | Classificacao Masculina | Classificacao Feminina |
|------|------------------------|----------------------|
| < 18 | Abaixo da media | N/A |
| 18-20 | Media | Acima da media |
| 20-22 | Acima da media | Muito acima |
| 22-25 | Avancado/Atleta | Excepcional |
| > 25 | Elite (verificar PED) | N/A |
| < 14 | N/A | Abaixo da media |
| 14-16 | N/A | Media |
| 16-18 | N/A | Acima da media |

**Interpretacao de BF% por Objetivo:**

| BF% Masculino | BF% Feminino | Classificacao | Nota |
|---------------|-------------|---------------|------|
| 3-6% | 10-13% | Competicao | Insustentavel longo prazo |
| 6-10% | 13-17% | Atletico | Definicao visivel |
| 10-15% | 17-22% | Fitness | Saudavel e estetico |
| 15-20% | 22-27% | Media | Saudavel |
| 20-25% | 27-32% | Acima da media | Considerar reducao |
| > 25% | > 32% | Elevado | Risco metabolico |

```yaml
step_2_2:
  name: "Estimativa de Composicao Corporal"
  executor: intake-analyst
  tool: macro-calculator
  duration_expected: "5-8 min"
  calculations:
    - bf_percent: "Via Jackson & Pollock formula"
    - lean_mass_kg: "weight * (1 - bf/100)"
    - fat_mass_kg: "weight * (bf/100)"
    - ffmi: "lean_mass / (height/100)^2"
    - adjusted_ffmi: "ffmi + 6.1 * (1.8 - height/100)"
  dexa_comparison:
    if_available: "Registrar BF% DEXA e diferenca com skinfold"
    expected_variance: "+/- 3-5% entre skinfold e DEXA"
  output: body_composition_estimate
```

### Step 3: Avaliacao Postural

#### 3.1 Vista Anterior

Observar e registrar:
- Alinhamento da cabeca (inclinacao lateral)
- Nivel dos ombros (elevacao unilateral)
- Posicao das claviculas (simetria)
- Alinhamento dos mamilos/peito (simetria)
- Triangulo de Tales (simetria cintura-braco)
- Alinhamento das cristas iliacas (nivelamento pelvico)
- Posicao dos joelhos (valgo, varo, neutro)
- Arco plantar (normal, plano, cavo)

#### 3.2 Vista Lateral

Observar e registrar:
- Projecao anterior da cabeca (forward head posture)
- Cifose toracica (acentuada, normal, retificada)
- Lordose lombar (acentuada, normal, retificada)
- Anteversao/retroversao pelvica
- Recurvatum de joelhos (hiperextensao)
- Posicao dos ombros (protraidos, neutros, retraidos)

#### 3.3 Vista Posterior

Observar e registrar:
- Alinhamento da coluna (escoliose funcional ou estrutural)
- Simetria escapular (alada, elevada, deprimida)
- Simetria dos gluteos
- Alinhamento do tendao de Aquiles (valgismo calcaneo)
- Simetria de pregas gluteas

**Classificacao de Desvios:**

| Severidade | Definicao | Acao |
|-----------|----------|------|
| Normal | Alinhamento adequado | Nenhuma adaptacao |
| Leve | Desvio minimo, assintomatico | Exercicios corretivos como warm-up |
| Moderado | Desvio visivel, pode causar compensacoes | Protocolo corretivo integrado ao treino |
| Severo | Desvio significativo, sintomatico ou funcional | REFERRAL para fisioterapeuta antes de prescrever carga |

```yaml
step_3:
  name: "Avaliacao Postural — 3 Vistas"
  executor: intake-analyst
  advisor: biomechanics-coach
  duration_expected: "10-15 min"
  views: [anterior, lateral, posterior]
  per_deviation:
    - region: ""
    - view: ""
    - deviation_type: ""
    - severity: "normal | leve | moderado | severo"
    - symptomatic: true/false
    - training_implications: ""
    - corrective_action: ""
  common_patterns:
    upper_cross_syndrome:
      signs: ["forward head", "rounded shoulders", "cifose acentuada", "fraqueza mid-trapezio"]
      implications: "Exercicios corretivos pre-treino, evitar overhead pressing pesado inicialmente"
    lower_cross_syndrome:
      signs: ["anteversao pelvica", "lordose acentuada", "fraqueza gluteos", "encurtamento flexores quadril"]
      implications: "Ativacao glutea pre-treino, stretching de hip flexors, cuidado com extensao lombar"
    lateral_imbalance:
      signs: ["ombro elevado", "crista iliaca desnivelada", "escoliose funcional"]
      implications: "Trabalho unilateral para corrigir, investigar diferenca de comprimento de pernas"
  referral_trigger: "severity == 'severo' em qualquer ponto"
  output: postural_assessment
```

### Step 4: Movement Screening

#### 4.1 Overhead Squat Assessment (OHS)

Cliente realiza 5 agachamentos com bracos estendidos acima da cabeca:

**Observar — Vista Anterior:**
- Pes viram para fora (duck feet)
- Joelhos colapsam para dentro (valgus)

**Observar — Vista Lateral:**
- Bracos caem para frente
- Tronco inclina excessivamente
- Lordose lombar excessiva (butt wink)
- Calcanhares saem do chao

**Scoring:**

| Score | Criterio |
|-------|---------|
| 3 | Execucao perfeita, sem compensacoes |
| 2 | Compensacoes leves, completou o movimento |
| 1 | Compensacoes significativas, padroes disfuncionais claros |
| 0 | Dor durante o movimento — PARAR, registrar, investigar |

#### 4.2 Single-Leg Squat (SLS)

Cliente realiza 5 agachamentos em cada perna:

**Observar:**
- Queda pelvica contralateral (Trendelenburg)
- Joelho colapsa para dentro (valgus)
- Tronco inclina lateralmente
- Perda de equilibrio
- Assimetria significativa entre lados

#### 4.3 Push-Up Assessment

Cliente realiza push-ups ate fadiga (max 25 para avaliacao):

**Observar:**
- Capacidade de manter plank position
- Escapulas: aladas, protraidas, estabilizadas
- Lordose lombar: extensao excessiva
- Amplitude: peito ao chao ou parcial
- Reps completados com boa forma

**Benchmarks por nivel:**

| Genero | Iniciante | Intermediario | Avancado |
|--------|-----------|---------------|----------|
| Masculino | 1-10 | 11-20 | 21-25+ |
| Feminino | 1-5 (modificado ok) | 6-15 | 16-25+ |

```yaml
step_4:
  name: "Movement Screening"
  executor: intake-analyst
  advisor: biomechanics-coach
  duration_expected: "10-15 min"
  tests:
    overhead_squat:
      reps: 5
      views: [anterior, lateral]
      score: [0, 3]
      compensations_to_observe:
        - feet_turn_out
        - knee_valgus
        - arms_fall_forward
        - excessive_trunk_lean
        - lumbar_hyperextension
        - heels_rise
    single_leg_squat:
      reps: 5 per side
      score: [0, 3]
      compensations_to_observe:
        - trendelenburg_sign
        - knee_valgus
        - lateral_trunk_lean
        - balance_loss
      asymmetry_flag: "score_difference >= 2 between sides"
    push_up:
      reps: "max (cap 25)"
      score: "reps_with_good_form"
      form_checks:
        - scapular_stability
        - plank_maintenance
        - lumbar_control
        - full_rom
  score_0_action: "STOP test immediately, document pain location, do NOT retest"
  output: movement_screening_results
```

### Step 5: Testes de Flexibilidade

#### 5.1 Sit-and-Reach (Banco de Wells)

- Posicao sentada, pernas estendidas, pes contra a caixa
- Alcancar o mais longe possivel sem flexionar os joelhos
- 3 tentativas, registrar a melhor

**Classificacao (cm):**

| Classificacao | Masculino | Feminino |
|--------------|-----------|----------|
| Excelente | > 34 | > 37 |
| Acima da media | 24-34 | 29-37 |
| Media | 14-23 | 20-28 |
| Abaixo da media | 4-13 | 10-19 |
| Pobre | < 4 | < 10 |

#### 5.2 Shoulder Mobility Test

- Uma mao por cima do ombro, outra por baixo, tentar tocar os dedos
- Medir distancia entre os dedos medios (positivo = sobreposicao, negativo = gap)
- Testar ambos os lados

#### 5.3 Thomas Test (Comprimento dos Flexores do Quadril)

- Decubito dorsal na borda da maca
- Flexionar um joelho ao peito, observar perna contralateral
- Avaliar: coxa sobe da maca (iliopsoas encurtado), joelho nao flexiona 90 graus (reto femoral encurtado)
- Testar ambos os lados

```yaml
step_5:
  name: "Testes de Flexibilidade"
  executor: intake-analyst
  duration_expected: "8-10 min"
  tests:
    sit_and_reach:
      attempts: 3
      record: "best of 3"
      unit: cm
    shoulder_mobility:
      sides: [left_over_right_under, right_over_left_under]
      unit: cm
      positive: "fingers overlap"
      negative: "fingers gap"
      asymmetry_flag: "difference > 5cm between sides"
    thomas_test:
      sides: [left, right]
      observations:
        - iliopsoas_length: "thigh_stays_on_table | thigh_rises"
        - rectus_femoris_length: "knee_flexes_90 | knee_extends"
        - it_band: "thigh_abducts | stays_neutral"
      asymmetry_flag: "significant difference between sides"
  output: flexibility_results
```

### Step 6: Strength Baselines

#### 6.1 Protocolo de Estimativa de 1RM (Submaxima)

**Para iniciantes (< 6 meses) — OBRIGATORIO usar estimativa:**
- Encontrar carga para 5-10 reps com boa forma
- Aplicar formula de Epley: 1RM = peso * (1 + reps/30)
- Ou formula de Brzycki: 1RM = peso * (36 / (37 - reps))

**Para intermediarios/avancados — 1RM real ou estimativa:**
- Aquecimento progressivo: barra vazia → 50% → 70% → 85% → 95% → tentativa
- Descanso 3-5 min entre tentativas pesadas
- Maximo 3 tentativas de 1RM real
- Se forma deteriora: parar e usar ultima carga boa para estimar

**Lifts avaliados:**

| Lift | Grupo Principal | Alternativa (se contraindicado) |
|------|----------------|-------------------------------|
| Back Squat | Quadriceps, gluteos, core | Leg Press (converter com fator 0.7) |
| Bench Press | Peito, triceps, deltoides anterior | DB Bench Press (converter com fator 0.85) |
| Conventional Deadlift | Posterior chain completa | Trap Bar Deadlift (converter com fator 0.9) |
| Overhead Press | Deltoides, triceps, core | Seated DB Press (converter com fator 0.80) |

**Strength Standards (1RM / Peso Corporal):**

| Lift | Iniciante | Intermediario | Avancado | Elite |
|------|-----------|---------------|----------|-------|
| Squat (M) | 0.75x | 1.25x | 1.75x | 2.5x |
| Squat (F) | 0.5x | 0.75x | 1.25x | 1.75x |
| Bench (M) | 0.5x | 1.0x | 1.5x | 2.0x |
| Bench (F) | 0.25x | 0.5x | 0.85x | 1.25x |
| Deadlift (M) | 1.0x | 1.5x | 2.0x | 2.75x |
| Deadlift (F) | 0.75x | 1.0x | 1.5x | 2.0x |
| OHP (M) | 0.35x | 0.65x | 1.0x | 1.35x |
| OHP (F) | 0.2x | 0.4x | 0.65x | 0.9x |

```yaml
step_6:
  name: "Strength Baselines"
  executor: intake-analyst
  advisor: elite-coach
  duration_expected: "15-25 min"
  protocol:
    beginners:
      method: "submaximal_estimation"
      rep_range: [5, 10]
      formulas:
        epley: "weight * (1 + reps/30)"
        brzycki: "weight * (36 / (37 - reps))"
    intermediate_plus:
      method: "actual_1rm_or_estimation"
      warmup_protocol: [50, 70, 85, 95, 100]
      max_attempts: 3
      rest_between: "3-5 min"
  safety_rules:
    - "NEVER test actual 1RM in beginners"
    - "STOP if form deteriorates significantly"
    - "Spotter required for bench press and squat"
    - "Skip lift if contraindicated by anamnesis"
    - "PA must be verified before testing (Step 0)"
  output: strength_baselines
```

### Step 7: Baseline Cardiovascular

#### 7.1 FC Repouso e PA (ja coletados no Step 0)

Registrar valores formalmente no report.

#### 7.2 Step Test de 3 Minutos (YMCA — Opcional)

**Protocolo:**
- Step de 30.5 cm (12 polegadas)
- Cadencia: 96 beats/min (metronomo)
- Duracao: 3 minutos
- Imediatamente apos: medir FC de recuperacao (15s * 4)

**Contraindicacoes do step test:**
- PA > 140/90 no dia
- Lesao em joelho ou tornozelo
- Problemas de equilibrio reportados na anamnese
- Red flag cardiovascular ativo

#### 7.3 Estimativa de VO2max (Opcional)

Se step test realizado, estimar VO2max usando equacao de regressao do YMCA:
- VO2max (ml/kg/min) estimado a partir da FC de recuperacao

**Classificacao de VO2max (ml/kg/min):**

| Classificacao | Masculino (20-29) | Feminino (20-29) |
|--------------|-------------------|------------------|
| Excelente | > 51 | > 44 |
| Bom | 43-51 | 38-44 |
| Media | 37-42 | 31-37 |
| Abaixo da media | 30-36 | 25-30 |
| Pobre | < 30 | < 25 |

```yaml
step_7:
  name: "Baseline Cardiovascular"
  executor: intake-analyst
  duration_expected: "5-10 min"
  tests:
    resting_hr_bp: "From Step 0 — register formally"
    step_test:
      optional: true
      contraindications: ["PA > 140/90", "knee_injury", "balance_issues", "cardiovascular_red_flag"]
      protocol: "YMCA 3-minute step test"
      equipment: "30.5cm step, metronome (96 bpm)"
      measurement: "Recovery HR at 1 min post-test"
    vo2max_estimate:
      optional: true
      requires: "step_test completed"
      method: "YMCA regression equation"
  output: cardiovascular_baseline
```

### Step 8: Protocolo de Documentacao Fotografica

**3 fotos padronizadas obrigatorias:**

| Pose | Descricao | Instrucoes |
|------|----------|-----------|
| Frente Relaxado | Em pe, bracos ao lado, olhando para camera | Pes na largura dos ombros, postura natural |
| Lado (Direito) | Em pe, bracos ao lado, perfil | Mesmo alinhamento, nao inflar peito |
| Costas Relaxado | Em pe, bracos ao lado, costas para camera | Mesma postura da frente |

**5 fotos opcionais (para atletas avancados/competidores):**

| Pose | Descricao |
|------|----------|
| Front Double Biceps | Classica de bodybuilding |
| Back Double Biceps | Classica de bodybuilding |
| Side Chest | Lado com peito expandido |
| Front Lat Spread | Expansao de dorsais |
| Abs and Thighs | Abdominal e coxas |

**Protocolo de padronizacao:**
- Iluminacao consistente (mesma fonte de luz, mesma posicao)
- Fundo neutro (parede branca ou cinza)
- Distancia da camera: 2-3 metros
- Altura da camera: nivel do umbigo
- Horario: preferencialmente manha (menor retencao hidrica)
- Roupa: roupa intima ou biquini/sunga (consistente entre avaliacoes)
- Nao usar filtros ou editar fotos

```yaml
step_8:
  name: "Documentacao Fotografica"
  executor: intake-analyst
  tool: progress-comparator
  duration_expected: "5-10 min"
  required_photos: [front_relaxed, side_relaxed, back_relaxed]
  optional_photos: [front_double_biceps, back_double_biceps, side_chest, front_lat_spread, abs_and_thighs]
  standardization:
    lighting: "consistent, natural or studio"
    background: "neutral (white/gray wall)"
    distance: "2-3 meters"
    camera_height: "navel level"
    time_of_day: "morning preferred"
    clothing: "minimal, consistent between assessments"
    filters: "NONE"
  metadata_per_photo:
    - date
    - time
    - pose_type
    - lighting_condition
    - photographer
  output: photo_documentation
```

### Step 9: Compilacao do Report de Assessment

Compilar todos os dados em report estruturado com baseline values:

```yaml
step_9:
  name: "Compilacao do Report"
  executor: intake-analyst
  tool: quality-checker
  duration_expected: "5-10 min"
  report_structure:
    metadata:
      task_id: "FC-TASK-011"
      client_id: ""
      assessment_date: ""
      conducted_by: ""
      protocol_adaptations: []
    safety_screen:
      blood_pressure: ""
      resting_hr: ""
      clearance_status: ""
    anthropometry:
      basic: "weight, height, bmi"
      circumferences: "12 points"
      derived: "waist_to_hip, waist_to_height"
    body_composition:
      method: ""
      bf_percent: 0
      lean_mass_kg: 0
      fat_mass_kg: 0
      ffmi: 0
      dexa_comparison: null
    postural_assessment:
      anterior: []
      lateral: []
      posterior: []
      pattern_identified: ""
      severity_max: ""
    movement_screening:
      overhead_squat: { score: 0, compensations: [] }
      single_leg_squat: { left: 0, right: 0, asymmetry: false }
      push_up: { reps: 0, form_notes: "" }
    flexibility:
      sit_and_reach: 0
      shoulder_mobility: { left: 0, right: 0 }
      thomas_test: { left: "", right: "" }
    strength_baselines:
      squat: { estimated_1rm: 0, method: "", ratio: 0 }
      bench: { estimated_1rm: 0, method: "", ratio: 0 }
      deadlift: { estimated_1rm: 0, method: "", ratio: 0 }
      ohp: { estimated_1rm: 0, method: "", ratio: 0 }
    cardiovascular:
      resting_hr: 0
      blood_pressure: ""
      step_test: null
      vo2max_estimate: null
    photos:
      count: 0
      types: []
      standardized: true
    summary:
      key_findings: []
      training_implications: []
      priority_corrections: []
      referrals_generated: []
  output: assessment_report_complete
```

### Step 10: Aprovacao do Coach

- Apresentar report completo com destaque para achados principais
- Listar implicacoes para prescricao de treino/dieta
- Identificar prioridades de correcao (postural, mobilidade, desequilibrios)
- Solicitar aprovacao para routing

```yaml
step_10:
  name: "Aprovacao do Coach"
  executor: human (coach)
  duration_expected: "10-15 min"
  approval_options:
    - approve: "Prosseguir para prescricao de treino/dieta"
    - reassess: "Repetir testes especificos"
    - refer: "Encaminhar para profissional antes de prosseguir"
    - adjust: "Ajustar classificacao ou prioridades"
  output: coach_approval
```

---

## Error Handling

**Strategy:** retry + adapt + never_force

**Common Errors:**

1. **Error:** PA elevada no dia do assessment (> 140/90)
   - **Cause:** Estresse, cafeina, sono ruim, hipertensao nao diagnosticada
   - **Resolution:** Adaptar protocolo: sem testes maximos, sem step test
   - **Recovery:** Agendar reavaliacao de PA em outro dia; se persistir, referral

2. **Error:** Dor durante movement screening (score 0)
   - **Cause:** Lesao nao identificada na anamnese, condicao aguda
   - **Resolution:** PARAR teste imediatamente, documentar localizacao e tipo de dor
   - **Recovery:** Pular testes que envolvem a regiao, referral se necessario

3. **Error:** Skinfold inconsistente (variacao > 2mm entre medidas)
   - **Cause:** Inexperiencia do avaliador, tecido adiposo abundante, edema
   - **Resolution:** Repetir medidas; se persistir, usar metodo alternativo (circunferencia)
   - **Recovery:** Registrar limitacao no report, usar metodo mais confiavel disponivel

4. **Error:** Cliente nao consegue executar overhead squat
   - **Cause:** Limitacao de mobilidade, medo, falta de experiencia
   - **Resolution:** Tentar com calcanhares elevados; se ainda falhar, usar wall squat como alternativa
   - **Recovery:** Registrar como score 1 com nota explicativa

5. **Error:** Equipamento indisponivel (caliper, step, etc.)
   - **Cause:** Ambiente sem equipamento completo
   - **Resolution:** Usar metodos alternativos (circunferencia para BF%, estimativa visual)
   - **Recovery:** Registrar metodo utilizado, agendar reavaliacao com equipamento completo

---

## Performance

**Expected Metrics:**

```yaml
duration_expected: "60-90 min (assessment completo)"
cost_estimated: "$0.01-0.05"
token_usage: "~5,000-15,000 tokens"
equipment_required: "balanca, fita metrica, esfigmomanometro (minimo)"
equipment_ideal: "balanca, estadiometro, fita, caliper, esfigmomanometro, step, goniometro"
```

**Optimization Notes:**
- Agrupar medidas por posicao do cliente (tudo em pe primeiro, depois sentado, etc.)
- Fotos e circunferencias podem ser feitas em sequencia rapida
- Step test e strength baselines podem ser feitos em dias separados se necessario
- Report YAML gerado automaticamente a partir dos dados

---

## Validation Criteria

```yaml
validation:
  safety:
    - "PA verificada antes de qualquer teste de esforco"
    - "Nenhum teste de 1RM real em iniciantes"
    - "Score 0 em movement screening resulta em parada imediata"
    - "Restricoes da anamnese respeitadas em todos os testes"

  completeness:
    - "12 pontos de circunferencia medidos"
    - "Avaliacao postural em 3 vistas"
    - "Pelo menos 3 testes de movement screening"
    - "Fotos padronizadas (minimo 3)"
    - "Baseline cardiovascular registrado"

  accuracy:
    - "3 medidas por ponto de circunferencia/skinfold"
    - "Formulas de estimativa identificadas e aplicadas corretamente"
    - "Scores de movement screening consistentes com observacoes"

  quality:
    - "Report completo com baseline values"
    - "Implicacoes para treino documentadas"
    - "Prioridades de correcao identificadas"
    - "Fotos padronizadas e comparaveis"
```

---

## Metadata

```yaml
task_id: FC-TASK-011
name: physical-assessment
version: 1.0.0
squad: fitcoach
priority: P0
classification: CRITICAL_SAFETY
dependencies:
  - anamnese-clinica (FC-TASK-010) — prerequisite
  - intake-analyst (executor principal)
  - biomechanics-coach (advisor — postural e movement)
  - elite-coach (advisor — strength baselines)
  - hypertrophy-scientist (advisor — composicao corporal)
  - progress-comparator (tool)
  - macro-calculator (tool)
  - quality-checker (tool)
tags:
  - assessment
  - anthropometry
  - body-composition
  - postural
  - movement-screening
  - strength
  - cardiovascular
  - baseline
  - P0
updated_at: 2026-03-13
```

---

## Handoff

```yaml
next_task:
  standard:
    tasks: ["create-training-plan", "create-diet-plan"]
    execution: parallel
    condition: "coach_approval == 'approve' && no_referrals_blocking"
    data_passed:
      - assessment_report (baseline values for programming)
      - postural_assessment (exercise selection constraints)
      - strength_baselines (starting loads)
      - body_composition (macro calculation input)
      - movement_screening (exercise regression/progression decisions)
  with_corrections:
    tasks: ["create-training-plan"]
    execution: sequential
    condition: "postural deviations moderate+ detected"
    data_passed:
      - assessment_report
      - corrective_exercise_priorities
    note: "Training plan must include corrective warm-up protocol"
  referral_needed:
    action: partial_hold
    condition: "referral generated from assessment findings"
    allowed: ["create-diet-plan"]
    blocked: ["create-training-plan (for affected segments)"]
    resume_when: "clearance from referred professional"
```
