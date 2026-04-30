# Clinical Anamnesis Report Template — FitCoach Squad

> **Template ID:** `anamnese-clinica-tmpl`
> **Version:** 1.0
> **Ultima atualizacao:** 2026-03-13
> **Uso:** Relatorio estruturado de anamnese clinica (output processado da coleta de dados)

---

## 1. Identificacao do Cliente

| Campo | Valor |
|-------|-------|
| **Nome Completo** | `{{client_name}}` |
| **ID Cliente** | `{{client_id}}` |
| **Idade** | `{{age}}` anos |
| **Data de Nascimento** | `{{birth_date}}` |
| **Sexo Biologico** | `{{biological_sex}}` (Masculino / Feminino) |
| **Ocupacao** | `{{occupation}}` |
| **Tipo de Trabalho** | `{{work_type}}` (Sedentario / Ativo / Misto) |
| **Horario de Trabalho** | `{{work_hours}}` |
| **Coach Responsavel** | `{{coach_name}}` |
| **Data da Anamnese** | `{{anamnesis_date}}` |

---

## 2. PAR-Q+ (Physical Activity Readiness Questionnaire)

### 7 Perguntas Principais

| # | Pergunta | Resposta |
|---|---------|---------|
| 1 | O seu medico ja disse que voce possui alguma condicao cardiaca E que so deveria fazer atividade fisica recomendada por um medico? | `{{parq_1}}` (Sim/Nao) |
| 2 | Voce sente dor no peito quando faz atividade fisica? | `{{parq_2}}` (Sim/Nao) |
| 3 | No ultimo mes, voce sentiu dor no peito quando NAO estava fazendo atividade fisica? | `{{parq_3}}` (Sim/Nao) |
| 4 | Voce perde o equilibrio por causa de tontura ou ja perdeu a consciencia? | `{{parq_4}}` (Sim/Nao) |
| 5 | Voce tem algum problema osseo ou articular que pode ser agravado por uma mudanca na sua atividade fisica? | `{{parq_5}}` (Sim/Nao) |
| 6 | O seu medico esta prescrevendo medicamentos para a sua pressao arterial ou condicao cardiaca? | `{{parq_6}}` (Sim/Nao) |
| 7 | Voce conhece alguma outra razao pela qual voce nao deveria fazer atividade fisica? | `{{parq_7}}` (Sim/Nao) |

### Resultado PAR-Q+

| Campo | Valor |
|-------|-------|
| **Total de respostas "Sim"** | `{{parq_yes_count}}` / 7 |
| **Status** | `{{parq_status}}` (Aprovado / Necessita Follow-Up / Requer Liberacao Medica) |
| **Observacoes** | `{{parq_notes}}` |

### Follow-Up (se alguma resposta "Sim")

| Pergunta Positiva | Detalhamento | Acao Recomendada |
|-------------------|-------------|-----------------|
| `{{parq_followup_1_question}}` | `{{parq_followup_1_detail}}` | `{{parq_followup_1_action}}` |
| `{{parq_followup_2_question}}` | `{{parq_followup_2_detail}}` | `{{parq_followup_2_action}}` |

---

## 3. Historico Medico — Resumo Clinico

### Condicoes Ativas

| Condicao | Diagnostico (ano) | Severidade | Medicacao | Controlado? | Impacto no Treino |
|----------|-------------------|-----------|-----------|------------|------------------|
| `{{condition_1}}` | `{{cond_1_year}}` | `{{cond_1_severity}}` | `{{cond_1_meds}}` | `{{cond_1_controlled}}` | `{{cond_1_impact}}` |
| `{{condition_2}}` | `{{cond_2_year}}` | `{{cond_2_severity}}` | `{{cond_2_meds}}` | `{{cond_2_controlled}}` | `{{cond_2_impact}}` |
| `{{condition_3}}` | `{{cond_3_year}}` | `{{cond_3_severity}}` | `{{cond_3_meds}}` | `{{cond_3_controlled}}` | `{{cond_3_impact}}` |

> Se nenhuma condicao ativa: "Nenhuma condicao medica reportada"

### Cirurgias Relevantes

| Cirurgia | Data | Restricoes Residuais | Liberado para Exercicio? |
|----------|------|---------------------|------------------------|
| `{{surgery_1}}` | `{{surg_1_date}}` | `{{surg_1_restrictions}}` | `{{surg_1_cleared}}` |
| `{{surgery_2}}` | `{{surg_2_date}}` | `{{surg_2_restrictions}}` | `{{surg_2_cleared}}` |

### Medicacoes em Uso

| Medicamento | Classe | Dose | Frequencia | Interacao com Exercicio | Interacao com Suplementos |
|-----------|--------|------|-----------|------------------------|--------------------------|
| `{{med_1_name}}` | `{{med_1_class}}` | `{{med_1_dose}}` | `{{med_1_freq}}` | `{{med_1_exercise_interaction}}` | `{{med_1_supplement_interaction}}` |
| `{{med_2_name}}` | `{{med_2_class}}` | `{{med_2_dose}}` | `{{med_2_freq}}` | `{{med_2_exercise_interaction}}` | `{{med_2_supplement_interaction}}` |
| `{{med_3_name}}` | `{{med_3_class}}` | `{{med_3_dose}}` | `{{med_3_freq}}` | `{{med_3_exercise_interaction}}` | `{{med_3_supplement_interaction}}` |

> Nota: Coluna "Interacao com Exercicio" indica se o medicamento afeta FC, PA, termorregulacao, hidratacao, etc.

### Exames Recentes (Resumo)

| Exame | Data | Resultado | Dentro da Normalidade? | Relevancia para Treino |
|-------|------|----------|----------------------|----------------------|
| `{{exam_1}}` | `{{exam_1_date}}` | `{{exam_1_result}}` | `{{exam_1_normal}}` | `{{exam_1_relevance}}` |
| `{{exam_2}}` | `{{exam_2_date}}` | `{{exam_2_result}}` | `{{exam_2_normal}}` | `{{exam_2_relevance}}` |
| `{{exam_3}}` | `{{exam_3_date}}` | `{{exam_3_result}}` | `{{exam_3_normal}}` | `{{exam_3_relevance}}` |

### Uso de Substancias

| Substancia | Status | Detalhes |
|-----------|--------|----------|
| Tabagismo | `{{smoking_status}}` | `{{smoking_details}}` |
| Alcool | `{{alcohol_status}}` | `{{alcohol_details}}` |
| Ergogenicos (esteroides, SARMs) | `{{ergogenic_status}}` | `{{ergogenic_details}}` |

---

## 4. Historico de Treinamento

### Resumo de Experiencia

| Campo | Valor |
|-------|-------|
| **Anos de experiencia com musculacao** | `{{training_years}}` |
| **Treina atualmente?** | `{{currently_training}}` |
| **Frequencia atual** | `{{current_frequency}}` dias/semana |
| **Duracao media da sessao** | `{{session_duration}}` min |
| **Modalidades praticadas** | `{{modalities}}` |
| **Local de treino** | `{{training_location}}` |
| **Split atual** | `{{current_split}}` |
| **Periodizacao ja utilizada?** | `{{periodization_experience}}` |

### Historico de Lesoes Relacionadas ao Treino

| Lesao | Local | Data | Como Ocorreu | Status Atual | Restricao Residual |
|-------|-------|------|-------------|-------------|-------------------|
| `{{injury_1}}` | `{{inj_1_location}}` | `{{inj_1_date}}` | `{{inj_1_cause}}` | `{{inj_1_status}}` | `{{inj_1_restriction}}` |
| `{{injury_2}}` | `{{inj_2_location}}` | `{{inj_2_date}}` | `{{inj_2_cause}}` | `{{inj_2_status}}` | `{{inj_2_restriction}}` |

### Forca Atual (Estimativas)

| Exercicio | Carga Habitual | Reps | 1RM Estimado | Classificacao |
|-----------|---------------|------|-------------|--------------|
| Agachamento | `{{squat_load}}` kg | `{{squat_reps}}` | `{{squat_1rm}}` kg | `{{squat_class}}` |
| Supino | `{{bench_load}}` kg | `{{bench_reps}}` | `{{bench_1rm}}` kg | `{{bench_class}}` |
| Terra | `{{dead_load}}` kg | `{{dead_reps}}` | `{{dead_1rm}}` kg | `{{dead_class}}` |
| Desenvolvimento | `{{ohp_load}}` kg | `{{ohp_reps}}` | `{{ohp_1rm}}` kg | `{{ohp_class}}` |

---

## 5. Perfil Nutricional

### Habitos Alimentares Resumidos

| Campo | Valor |
|-------|-------|
| **Refeicoes por dia** | `{{meals_per_day}}` |
| **Cozinha em casa?** | `{{cooks_at_home}}` — Frequencia: `{{cooking_freq}}` |
| **Come fora com frequencia?** | `{{eats_out}}` — Frequencia: `{{eating_out_freq}}` |
| **Ja rastreou macros?** | `{{tracked_macros}}` |
| **Consumo de ultraprocessados** | `{{ultra_processed}}` — Frequencia: `{{ultra_processed_freq}}` |
| **Consumo de agua estimado** | `{{water_intake}}` ml/dia |

### Restricoes e Alergias

| Tipo | Item | Severidade | Reacao |
|------|------|-----------|--------|
| `{{restriction_1_type}}` | `{{restriction_1_item}}` | `{{restriction_1_severity}}` | `{{restriction_1_reaction}}` |
| `{{restriction_2_type}}` | `{{restriction_2_item}}` | `{{restriction_2_severity}}` | `{{restriction_2_reaction}}` |

### Restricao Dietetica

`{{dietary_restriction}}` (Nenhuma / Vegetariano / Vegano / Sem Gluten / Sem Lactose / Low Carb / Cetogenica / Outra)

### Suplementos em Uso

| Suplemento | Dose | Frequencia | Ha Quanto Tempo | Prescrito? |
|-----------|------|-----------|----------------|-----------|
| `{{suppl_1}}` | `{{suppl_1_dose}}` | `{{suppl_1_freq}}` | `{{suppl_1_duration}}` | `{{suppl_1_prescribed}}` |
| `{{suppl_2}}` | `{{suppl_2_dose}}` | `{{suppl_2_freq}}` | `{{suppl_2_duration}}` | `{{suppl_2_prescribed}}` |
| `{{suppl_3}}` | `{{suppl_3_dose}}` | `{{suppl_3_freq}}` | `{{suppl_3_duration}}` | `{{suppl_3_prescribed}}` |

### Historico de Dietas

| Dieta | Quando | Duracao | Resultado | Aderencia | Motivo de Parar |
|-------|--------|---------|----------|-----------|----------------|
| `{{diet_1}}` | `{{diet_1_when}}` | `{{diet_1_duration}}` | `{{diet_1_result}}` | `{{diet_1_adherence}}` | `{{diet_1_stop}}` |
| `{{diet_2}}` | `{{diet_2_when}}` | `{{diet_2_duration}}` | `{{diet_2_result}}` | `{{diet_2_adherence}}` | `{{diet_2_stop}}` |

---

## 6. Perfil de Sono e Stress

### Sono

| Campo | Valor | Classificacao |
|-------|-------|--------------|
| **Horas de sono/noite (media)** | `{{sleep_hours}}` h | `{{sleep_hours_class}}` (Insuficiente <6 / Adequado 6-8 / Otimo 8+) |
| **Qualidade do sono (1-10)** | `{{sleep_quality}}` | `{{sleep_quality_class}}` |
| **Hora de dormir** | `{{bedtime}}` | — |
| **Hora de acordar** | `{{wake_time}}` | — |
| **Dificuldade para dormir?** | `{{insomnia}}` | `{{insomnia_details}}` |
| **Acorda durante a noite?** | `{{night_waking}}` | `{{night_waking_details}}` |
| **Usa tela antes de dormir?** | `{{screen_before_bed}}` | — |
| **Suplemento para sono?** | `{{sleep_supplement}}` | `{{sleep_supplement_name}}` |

### Stress

| Campo | Valor | Classificacao |
|-------|-------|--------------|
| **Nivel de stress geral (1-10)** | `{{stress_level}}` | `{{stress_class}}` (Baixo 1-3 / Moderado 4-6 / Alto 7-8 / Critico 9-10) |
| **Fontes principais de stress** | `{{stress_sources}}` | — |
| **Meditacao/mindfulness?** | `{{meditation}}` | Frequencia: `{{meditation_freq}}` |
| **Acompanhamento psicologico?** | `{{therapy}}` | — |
| **Atividades de lazer** | `{{leisure_activities}}` | — |

### Avaliacao de Recovery Capacity

| Fator | Score (1-5) | Peso | Score Ponderado |
|-------|-----------|------|----------------|
| Qualidade do sono | `{{rc_sleep}}` | 30% | `{{rc_sleep_w}}` |
| Nivel de stress | `{{rc_stress}}` | 25% | `{{rc_stress_w}}` |
| Nutricao adequada | `{{rc_nutrition}}` | 20% | `{{rc_nutrition_w}}` |
| Idade/hormonal | `{{rc_age}}` | 15% | `{{rc_age_w}}` |
| Estilo de vida geral | `{{rc_lifestyle}}` | 10% | `{{rc_lifestyle_w}}` |
| **Total** | — | **100%** | **`{{rc_total}}`** / 5 |

> **Recovery Capacity:** `{{rc_classification}}` (Excelente >= 4.0 / Boa 3.0-3.9 / Moderada 2.0-2.9 / Baixa < 2.0)

---

## 7. Objetivos e Expectativas

### Objetivo Principal

| Campo | Valor |
|-------|-------|
| **Objetivo** | `{{primary_goal}}` |
| **Por que?** | `{{primary_goal_why}}` |
| **Timeline desejada** | `{{primary_goal_timeline}}` |
| **Metrica de sucesso** | `{{primary_goal_metric}}` |
| **SMART?** | `{{goal_smart_check}}` (Especifico / Mensuravel / Atingivel / Relevante / Temporal) |

### Objetivos Secundarios

| # | Objetivo | Prioridade | Timeline |
|---|---------|-----------|---------|
| 1 | `{{secondary_goal_1}}` | `{{priority_1}}` | `{{timeline_1}}` |
| 2 | `{{secondary_goal_2}}` | `{{priority_2}}` | `{{timeline_2}}` |
| 3 | `{{secondary_goal_3}}` | `{{priority_3}}` | `{{timeline_3}}` |

### Expectativas e Comprometimento

| Campo | Valor |
|-------|-------|
| **Nivel de comprometimento (1-10)** | `{{commitment_level}}` |
| **O que espera do coaching?** | `{{coaching_expectation}}` |
| **Ja alcancou esse objetivo antes?** | `{{previous_achievement}}` |
| **O que impediu no passado?** | `{{past_barriers}}` |
| **Canal de comunicacao preferido** | `{{preferred_channel}}` |
| **Frequencia de feedback desejada** | `{{feedback_frequency}}` |

---

## 8. Red Flags Identificados

### Red Flags (Bloqueantes — Requerem Acao Imediata)

| # | Red Flag | Detalhe | Acao Recomendada | Status |
|---|---------|---------|-----------------|--------|
| `{{rf_1_id}}` | `{{rf_1_description}}` | `{{rf_1_detail}}` | `{{rf_1_action}}` | `{{rf_1_status}}` |
| `{{rf_2_id}}` | `{{rf_2_description}}` | `{{rf_2_detail}}` | `{{rf_2_action}}` | `{{rf_2_status}}` |

> Se nenhum red flag: "Nenhum red flag identificado"

### Yellow Flags (Atencao — Monitorar)

| # | Yellow Flag | Detalhe | Acao Recomendada |
|---|-----------|---------|-----------------|
| `{{yf_1_id}}` | `{{yf_1_description}}` | `{{yf_1_detail}}` | `{{yf_1_action}}` |
| `{{yf_2_id}}` | `{{yf_2_description}}` | `{{yf_2_detail}}` | `{{yf_2_action}}` |

### Tipos de Red Flags Verificados

| Categoria | Verificado? | Encontrado? | Detalhe |
|-----------|-----------|------------|---------|
| Cardiovascular (dor no peito, dispneia, sincope) | `{{rf_cardio_checked}}` | `{{rf_cardio_found}}` | `{{rf_cardio_detail}}` |
| Metabolico (diabetes descontrolada, tireoide) | `{{rf_metabolic_checked}}` | `{{rf_metabolic_found}}` | `{{rf_metabolic_detail}}` |
| Musculoesqueletico (lesao aguda, dor cronica) | `{{rf_msk_checked}}` | `{{rf_msk_found}}` | `{{rf_msk_detail}}` |
| Psicologico (transtorno alimentar, depressao severa) | `{{rf_psych_checked}}` | `{{rf_psych_found}}` | `{{rf_psych_detail}}` |
| Farmacologico (interacao medicamentosa, ergogenicos) | `{{rf_pharma_checked}}` | `{{rf_pharma_found}}` | `{{rf_pharma_detail}}` |
| Nutricional (desnutricao, deficit extremo, purgacao) | `{{rf_nutrition_checked}}` | `{{rf_nutrition_found}}` | `{{rf_nutrition_detail}}` |

---

## 9. Classificacao de Risco

### Risk Score

| Fator de Risco | Peso | Score (0-5) | Score Ponderado |
|---------------|------|-----------|----------------|
| Red flags medicos | 30% | `{{risk_medical}}` | `{{risk_medical_w}}` |
| Idade (>45 H / >55 M sem atividade) | 15% | `{{risk_age}}` | `{{risk_age_w}}` |
| Medicacoes com interacao | 15% | `{{risk_meds}}` | `{{risk_meds_w}}` |
| Historico de lesoes | 15% | `{{risk_injuries}}` | `{{risk_injuries_w}}` |
| PAR-Q+ positivo | 15% | `{{risk_parq}}` | `{{risk_parq_w}}` |
| Uso de substancias ergogenicas | 10% | `{{risk_ergogenic}}` | `{{risk_ergogenic_w}}` |
| **Total** | **100%** | — | **`{{risk_total}}`** / 5 |

### Classificacao Final de Risco

| Score | Classificacao | Descricao | Acao |
|-------|-------------|-----------|------|
| 0.0 - 1.0 | **BAIXO** | Sem red flags, PAR-Q- negativo, sem medicacoes | Prosseguir normalmente |
| 1.1 - 2.5 | **MODERADO** | Yellow flags, PAR-Q+ com follow-up resolvido | Prosseguir com monitoramento |
| 2.6 - 3.5 | **ALTO** | Red flags presentes, medicacoes com interacao | Requer liberacao medica antes de iniciar |
| 3.6 - 5.0 | **MUITO ALTO** | Multiplos red flags, condicoes descontroladas | NAO iniciar sem liberacao medica completa |

### Resultado:

| Campo | Valor |
|-------|-------|
| **Risk Score** | `{{risk_total}}` / 5 |
| **Classificacao** | **`{{risk_classification}}`** (Baixo / Moderado / Alto / Muito Alto) |
| **Justificativa** | `{{risk_justification}}` |

---

## 10. Medical Clearance — Liberacao Medica

| Campo | Valor |
|-------|-------|
| **Liberacao medica necessaria?** | `{{clearance_needed}}` (Sim / Nao) |
| **Motivo** | `{{clearance_reason}}` |
| **Liberacao obtida?** | `{{clearance_obtained}}` (Sim / Nao / Pendente / Nao Aplicavel) |
| **Medico responsavel** | `{{clearance_doctor}}` |
| **Data da liberacao** | `{{clearance_date}}` |
| **Restricoes impostas pelo medico** | `{{clearance_restrictions}}` |
| **Documento anexado?** | `{{clearance_document}}` (Sim / Nao) |

### Status para Inicio do Programa

| Criterio | Status |
|----------|--------|
| Anamnese completa | `{{anamnesis_complete}}` |
| PAR-Q+ resolvido | `{{parq_resolved}}` |
| Red flags tratados | `{{red_flags_resolved}}` |
| Liberacao medica (se necessaria) | `{{clearance_resolved}}` |
| **APTO PARA INICIAR?** | **`{{ready_to_start}}`** (SIM / NAO — pendencia: `{{pending_items}}`) |

---

## 11. Avaliacao e Recomendacoes do Coach

### Classificacao do Cliente

| Campo | Valor |
|-------|-------|
| **Nivel de treinamento** | `{{classification_level}}` (Iniciante / Intermediario / Avancado / Elite) |
| **Score de classificacao** | `{{classification_score}}` / 25 |
| **Recovery capacity** | `{{rc_classification}}` |
| **Risco** | `{{risk_classification}}` |

### Recomendacoes Iniciais

#### Treino

```
{{coach_training_recommendations}}
```

#### Nutricao

```
{{coach_nutrition_recommendations}}
```

#### Suplementacao

```
{{coach_supplement_recommendations}}
```

#### Recovery / Lifestyle

```
{{coach_recovery_recommendations}}
```

### Encaminhamentos Necessarios

| Profissional | Motivo | Urgencia | Bloqueante? |
|-------------|--------|----------|------------|
| `{{referral_1}}` | `{{ref_1_reason}}` | `{{ref_1_urgency}}` | `{{ref_1_blocking}}` |
| `{{referral_2}}` | `{{ref_2_reason}}` | `{{ref_2_urgency}}` | `{{ref_2_blocking}}` |

### Proximos Passos

1. [ ] `{{next_step_1}}`
2. [ ] `{{next_step_2}}`
3. [ ] `{{next_step_3}}`
4. [ ] `{{next_step_4}}`
5. [ ] `{{next_step_5}}`

---

## 12. Historico de Versoes

| Versao | Data | Alteracao | Responsavel |
|--------|------|-----------|------------|
| 1.0 | `{{creation_date}}` | Anamnese clinica inicial | `{{coach_name}}` |
| — | — | — | — |

---

> **Gerado pelo FitCoach Squad — Synkra AIOX**
> Template: `anamnese-clinica-tmpl` v1.0
