# Monthly Evolution Report Template — FitCoach Squad

> **Template ID:** `monthly-evolution-tmpl`
> **Version:** 1.0
> **Ultima atualizacao:** 2026-03-13
> **Uso:** Relatorio mensal de evolucao do cliente com analise de progressao completa

---

## 1. Header — Informacoes do Relatorio

| Campo | Valor |
|-------|-------|
| **Nome do Cliente** | `{{client_name}}` |
| **ID Cliente** | `{{client_id}}` |
| **Coach Responsavel** | `{{coach_name}}` |
| **Periodo** | `{{period_start}}` a `{{period_end}}` |
| **Mes do Programa** | `{{current_month}}` / `{{total_months}}` |
| **Fase Atual** | `{{current_phase}}` (Bulking / Cutting / Manutencao / Recomposicao / Reverse Diet / Competition Prep) |
| **Mesociclo Atual** | `{{current_mesocycle}}` — `{{mesocycle_phase}}` (Acumulacao / Transmutacao / Realizacao / Deload) |
| **Objetivo Principal** | `{{primary_goal}}` |
| **Status Geral do Mes** | `{{monthly_status}}` (Excepcional / No Caminho / Atencao / Critico) |

---

## 2. Resumo do Periodo

### Contexto do Mes

```
{{monthly_context}}
```

> Breve descricao do que foi planejado para o mes, mudancas de fase, ajustes implementados, e eventos relevantes (viagem, doenca, mudanca de rotina).

### Destaques e Conquistas

- `{{highlight_1}}`
- `{{highlight_2}}`
- `{{highlight_3}}`

### Alertas e Preocupacoes

- `{{alert_1}}`
- `{{alert_2}}`

---

## 3. Composicao Corporal — Body Composition Changes

### Evolucao de Peso

| Metrica | Inicio do Programa | Mes Anterior | Mes Atual | Delta Mensal | Delta Total |
|---------|-------------------|-------------|----------|-------------|------------|
| Peso (kg) | `{{start_weight}}` | `{{prev_month_weight}}` | `{{curr_weight}}` | `{{delta_weight_month}}` | `{{delta_weight_total}}` |
| Gordura corporal (%) | `{{start_bf}}` | `{{prev_month_bf}}` | `{{curr_bf}}` | `{{delta_bf_month}}` | `{{delta_bf_total}}` |
| Massa magra (kg) | `{{start_lbm}}` | `{{prev_month_lbm}}` | `{{curr_lbm}}` | `{{delta_lbm_month}}` | `{{delta_lbm_total}}` |
| Massa gorda (kg) | `{{start_fm}}` | `{{prev_month_fm}}` | `{{curr_fm}}` | `{{delta_fm_month}}` | `{{delta_fm_total}}` |
| FFMI | `{{start_ffmi}}` | `{{prev_month_ffmi}}` | `{{curr_ffmi}}` | `{{delta_ffmi_month}}` | `{{delta_ffmi_total}}` |

### Circunferencias (cm)

| Medida | Mes Anterior | Mes Atual | Delta | Tendencia |
|--------|-------------|----------|-------|-----------|
| Peito | `{{prev_chest}}` | `{{curr_chest}}` | `{{delta_chest}}` | `{{trend_chest}}` |
| Cintura | `{{prev_waist}}` | `{{curr_waist}}` | `{{delta_waist}}` | `{{trend_waist}}` |
| Quadril | `{{prev_hip}}` | `{{curr_hip}}` | `{{delta_hip}}` | `{{trend_hip}}` |
| Braco D (contraido) | `{{prev_arm_r}}` | `{{curr_arm_r}}` | `{{delta_arm_r}}` | `{{trend_arm_r}}` |
| Braco E (contraido) | `{{prev_arm_l}}` | `{{curr_arm_l}}` | `{{delta_arm_l}}` | `{{trend_arm_l}}` |
| Coxa D (proximal) | `{{prev_thigh_r}}` | `{{curr_thigh_r}}` | `{{delta_thigh_r}}` | `{{trend_thigh_r}}` |
| Coxa E (proximal) | `{{prev_thigh_l}}` | `{{curr_thigh_l}}` | `{{delta_thigh_l}}` | `{{trend_thigh_l}}` |
| Panturrilha D | `{{prev_calf_r}}` | `{{curr_calf_r}}` | `{{delta_calf_r}}` | `{{trend_calf_r}}` |
| Ombro | `{{prev_shoulder}}` | `{{curr_shoulder}}` | `{{delta_shoulder}}` | `{{trend_shoulder}}` |

> **Tendencia:** Subindo / Estavel / Descendo — interpretado no contexto da fase (ex: cintura descendo em cutting = positivo)

### Comparacao Fotografica

| Angulo | Mes Anterior | Mes Atual | Observacoes |
|--------|-------------|----------|-------------|
| Frente (relaxado) | `{{photo_front_prev}}` | `{{photo_front_curr}}` | `{{obs_front}}` |
| Frente (contraido) | `{{photo_front_flex_prev}}` | `{{photo_front_flex_curr}}` | `{{obs_front_flex}}` |
| Lateral D | `{{photo_side_r_prev}}` | `{{photo_side_r_curr}}` | `{{obs_side_r}}` |
| Costas (contraido) | `{{photo_back_flex_prev}}` | `{{photo_back_flex_curr}}` | `{{obs_back_flex}}` |

> **Placeholder:** Fotos inseridas pelo sistema via upload ou URL

### Analise Visual do Coach

```
{{visual_analysis}}
```

---

## 4. Strength Progression — Progressao de Forca

### Key Lifts — Estimativa de 1RM ao Longo do Tempo

| Exercicio | 1RM Inicio | 1RM Mes 1 | 1RM Mes 2 | 1RM Mes 3 | 1RM Atual | Delta Total | Delta Mensal |
|-----------|----------|----------|----------|----------|----------|------------|-------------|
| Squat | `{{squat_1rm_start}}` | `{{squat_1rm_m1}}` | `{{squat_1rm_m2}}` | `{{squat_1rm_m3}}` | `{{squat_1rm_curr}}` | `{{squat_delta_total}}` | `{{squat_delta_month}}` |
| Bench Press | `{{bench_1rm_start}}` | `{{bench_1rm_m1}}` | `{{bench_1rm_m2}}` | `{{bench_1rm_m3}}` | `{{bench_1rm_curr}}` | `{{bench_delta_total}}` | `{{bench_delta_month}}` |
| Deadlift | `{{dead_1rm_start}}` | `{{dead_1rm_m1}}` | `{{dead_1rm_m2}}` | `{{dead_1rm_m3}}` | `{{dead_1rm_curr}}` | `{{dead_delta_total}}` | `{{dead_delta_month}}` |
| OHP | `{{ohp_1rm_start}}` | `{{ohp_1rm_m1}}` | `{{ohp_1rm_m2}}` | `{{ohp_1rm_m3}}` | `{{ohp_1rm_curr}}` | `{{ohp_delta_total}}` | `{{ohp_delta_month}}` |

> **Nota:** 1RM estimado via formula de Epley: 1RM = peso x (1 + reps/30)

### Wilks/DOTS Score (Forca Relativa)

| Metrica | Mes Anterior | Mes Atual | Delta |
|---------|-------------|----------|-------|
| Total (SBD) | `{{prev_total}}` kg | `{{curr_total}}` kg | `{{delta_total}}` kg |
| Wilks Score | `{{prev_wilks}}` | `{{curr_wilks}}` | `{{delta_wilks}}` |
| DOTS Score | `{{prev_dots}}` | `{{curr_dots}}` | `{{delta_dots}}` |

### Personal Records do Mes

| Exercicio | PR Anterior | Novo PR | Data | Tipo (1RM / Volume / Rep PR) |
|-----------|------------|---------|------|-----|
| `{{pr1_exercise}}` | `{{pr1_previous}}` | `{{pr1_new}}` | `{{pr1_date}}` | `{{pr1_type}}` |
| `{{pr2_exercise}}` | `{{pr2_previous}}` | `{{pr2_new}}` | `{{pr2_date}}` | `{{pr2_type}}` |
| `{{pr3_exercise}}` | `{{pr3_previous}}` | `{{pr3_new}}` | `{{pr3_date}}` | `{{pr3_type}}` |
| `{{pr4_exercise}}` | `{{pr4_previous}}` | `{{pr4_new}}` | `{{pr4_date}}` | `{{pr4_type}}` |
| `{{pr5_exercise}}` | `{{pr5_previous}}` | `{{pr5_new}}` | `{{pr5_date}}` | `{{pr5_type}}` |

---

## 5. Training Adherence — Aderencia ao Treino

### Sessoes Planejadas vs Realizadas

| Semana | Planejadas | Realizadas | Aderencia (%) | Motivo de Faltas |
|--------|-----------|-----------|--------------|-----------------|
| Semana 1 | `{{s1_planned}}` | `{{s1_actual}}` | `{{s1_adherence}}` % | `{{s1_reason}}` |
| Semana 2 | `{{s2_planned}}` | `{{s2_actual}}` | `{{s2_adherence}}` % | `{{s2_reason}}` |
| Semana 3 | `{{s3_planned}}` | `{{s3_actual}}` | `{{s3_adherence}}` % | `{{s3_reason}}` |
| Semana 4 | `{{s4_planned}}` | `{{s4_actual}}` | `{{s4_adherence}}` % | `{{s4_reason}}` |
| **Total Mes** | **`{{month_planned}}`** | **`{{month_actual}}`** | **`{{month_adherence}}`** % | — |

### Volume Progression (Tonelagem Semanal)

| Semana | Volume Total (kg) | Delta vs Semana Anterior | RPE Medio |
|--------|-------------------|-------------------------|-----------|
| Semana 1 | `{{vol_s1}}` | — | `{{rpe_s1}}` |
| Semana 2 | `{{vol_s2}}` | `{{vol_delta_s2}}` | `{{rpe_s2}}` |
| Semana 3 | `{{vol_s3}}` | `{{vol_delta_s3}}` | `{{rpe_s3}}` |
| Semana 4 | `{{vol_s4}}` | `{{vol_delta_s4}}` | `{{rpe_s4}}` |

### Volume por Grupo Muscular (Sets/Semana — Media do Mes)

| Grupo | Volume Prescrito | Volume Realizado | Aderencia (%) | Landmark |
|-------|-----------------|-----------------|--------------|----------|
| Peito | `{{chest_prescribed}}` | `{{chest_actual}}` | `{{chest_adh}}` % | MEV: `{{chest_mev}}` / MRV: `{{chest_mrv}}` |
| Costas | `{{back_prescribed}}` | `{{back_actual}}` | `{{back_adh}}` % | MEV: `{{back_mev}}` / MRV: `{{back_mrv}}` |
| Quadriceps | `{{quads_prescribed}}` | `{{quads_actual}}` | `{{quads_adh}}` % | MEV: `{{quads_mev}}` / MRV: `{{quads_mrv}}` |
| Posteriores | `{{hams_prescribed}}` | `{{hams_actual}}` | `{{hams_adh}}` % | MEV: `{{hams_mev}}` / MRV: `{{hams_mrv}}` |
| Deltoides | `{{delts_prescribed}}` | `{{delts_actual}}` | `{{delts_adh}}` % | MEV: `{{delts_mev}}` / MRV: `{{delts_mrv}}` |
| Biceps | `{{biceps_prescribed}}` | `{{biceps_actual}}` | `{{biceps_adh}}` % | MEV: `{{biceps_mev}}` / MRV: `{{biceps_mrv}}` |
| Triceps | `{{triceps_prescribed}}` | `{{triceps_actual}}` | `{{triceps_adh}}` % | MEV: `{{triceps_mev}}` / MRV: `{{triceps_mrv}}` |

---

## 6. Nutrition Compliance — Aderencia Nutricional

### Macro Targets vs Actuals (Media Diaria do Mes)

| Macro | Target | Media Realizada | Variacao | Aderencia (%) |
|-------|--------|----------------|----------|--------------|
| Calorias | `{{cal_target}}` kcal | `{{cal_actual}}` kcal | `{{cal_var}}` kcal | `{{cal_adh}}` % |
| Proteina | `{{prot_target}}` g | `{{prot_actual}}` g | `{{prot_var}}` g | `{{prot_adh}}` % |
| Carboidratos | `{{carb_target}}` g | `{{carb_actual}}` g | `{{carb_var}}` g | `{{carb_adh}}` % |
| Gorduras | `{{fat_target}}` g | `{{fat_actual}}` g | `{{fat_var}}` g | `{{fat_adh}}` % |
| Fibras | `{{fiber_target}}` g | `{{fiber_actual}}` g | `{{fiber_var}}` g | `{{fiber_adh}}` % |
| Agua | `{{water_target}}` ml | `{{water_actual}}` ml | `{{water_var}}` ml | `{{water_adh}}` % |

### Score de Aderencia Nutricional Semanal

| Semana | Score Calorico | Score Proteico | Score Geral | Classificacao |
|--------|---------------|---------------|------------|--------------|
| Semana 1 | `{{s1_cal_score}}` | `{{s1_prot_score}}` | `{{s1_diet_score}}` / 10 | `{{s1_class}}` |
| Semana 2 | `{{s2_cal_score}}` | `{{s2_prot_score}}` | `{{s2_diet_score}}` / 10 | `{{s2_class}}` |
| Semana 3 | `{{s3_cal_score}}` | `{{s3_prot_score}}` | `{{s3_diet_score}}` / 10 | `{{s3_class}}` |
| Semana 4 | `{{s4_cal_score}}` | `{{s4_prot_score}}` | `{{s4_diet_score}}` / 10 | `{{s4_class}}` |
| **Media Mes** | — | — | **`{{month_diet_score}}`** / 10 | **`{{month_diet_class}}`** |

### Dias Fora do Plano

| Data | Tipo (Refeed/Cheat/Evento/Falha) | Impacto Estimado | Notas |
|------|----------------------------------|-----------------|-------|
| `{{off_date_1}}` | `{{off_type_1}}` | `{{off_impact_1}}` | `{{off_notes_1}}` |
| `{{off_date_2}}` | `{{off_type_2}}` | `{{off_impact_2}}` | `{{off_notes_2}}` |
| `{{off_date_3}}` | `{{off_type_3}}` | `{{off_impact_3}}` | `{{off_notes_3}}` |

---

## 7. Recovery Metrics — Metricas de Recuperacao

### Sono (Media Semanal)

| Semana | Horas/Noite | Qualidade (1-10) | Consistencia Horario |
|--------|------------|-----------------|---------------------|
| Semana 1 | `{{sleep_h_s1}}` | `{{sleep_q_s1}}` | `{{sleep_cons_s1}}` |
| Semana 2 | `{{sleep_h_s2}}` | `{{sleep_q_s2}}` | `{{sleep_cons_s2}}` |
| Semana 3 | `{{sleep_h_s3}}` | `{{sleep_q_s3}}` | `{{sleep_cons_s3}}` |
| Semana 4 | `{{sleep_h_s4}}` | `{{sleep_q_s4}}` | `{{sleep_cons_s4}}` |
| **Media Mes** | **`{{sleep_h_avg}}`** | **`{{sleep_q_avg}}`** | **`{{sleep_cons_avg}}`** |

### Stress e Energia (Media Semanal)

| Semana | Stress (1-10) | Energia (1-10) | Humor (1-10) | Dor Muscular (1-10) |
|--------|-------------|---------------|-------------|-------------------|
| Semana 1 | `{{stress_s1}}` | `{{energy_s1}}` | `{{mood_s1}}` | `{{doms_s1}}` |
| Semana 2 | `{{stress_s2}}` | `{{energy_s2}}` | `{{mood_s2}}` | `{{doms_s2}}` |
| Semana 3 | `{{stress_s3}}` | `{{energy_s3}}` | `{{mood_s3}}` | `{{doms_s3}}` |
| Semana 4 | `{{stress_s4}}` | `{{energy_s4}}` | `{{mood_s4}}` | `{{doms_s4}}` |
| **Media Mes** | **`{{stress_avg}}`** | **`{{energy_avg}}`** | **`{{mood_avg}}`** | **`{{doms_avg}}`** |

### Sinais de Overtraining / Under-Recovery

| Indicador | Status | Notas |
|-----------|--------|-------|
| Performance em queda por 2+ semanas | `{{overtraining_performance}}` | `{{ot_perf_notes}}` |
| Fadiga cronica fora do treino | `{{overtraining_fatigue}}` | `{{ot_fatigue_notes}}` |
| Insonia apesar de cansaco | `{{overtraining_insomnia}}` | `{{ot_insomnia_notes}}` |
| Perda de motivacao para treinar | `{{overtraining_motivation}}` | `{{ot_motivation_notes}}` |
| Lesoes ou dores articulares recorrentes | `{{overtraining_injuries}}` | `{{ot_injuries_notes}}` |
| **Classificacao de Recovery** | **`{{recovery_classification}}`** | Otima / Boa / Atencao / Critica |

---

## 8. Highlights & Wins — Conquistas do Mes

### Personal Records (PRs)

- `{{win_pr_1}}`
- `{{win_pr_2}}`
- `{{win_pr_3}}`

### Mudancas Visuais

- `{{win_visual_1}}`
- `{{win_visual_2}}`

### Marcos de Habito (Habit Milestones)

- `{{win_habit_1}}`
- `{{win_habit_2}}`
- `{{win_habit_3}}`

### Gamification Achievements

| Badge/Conquista | Descricao | Data |
|----------------|-----------|------|
| `{{achievement_1}}` | `{{ach_desc_1}}` | `{{ach_date_1}}` |
| `{{achievement_2}}` | `{{ach_desc_2}}` | `{{ach_date_2}}` |

---

## 9. Areas for Improvement — Areas de Melhoria

### Targets Nao Atingidos

| Area | Target | Realizado | Gap | Acao Corretiva |
|------|--------|-----------|-----|---------------|
| `{{miss_area_1}}` | `{{miss_target_1}}` | `{{miss_actual_1}}` | `{{miss_gap_1}}` | `{{miss_action_1}}` |
| `{{miss_area_2}}` | `{{miss_target_2}}` | `{{miss_actual_2}}` | `{{miss_gap_2}}` | `{{miss_action_2}}` |
| `{{miss_area_3}}` | `{{miss_target_3}}` | `{{miss_actual_3}}` | `{{miss_gap_3}}` | `{{miss_action_3}}` |

### Issues Recorrentes

| Issue | Frequencia no Mes | Impacto | Estrategia Proposta |
|-------|------------------|---------|-------------------|
| `{{issue_1}}` | `{{issue_1_freq}}` | `{{issue_1_impact}}` | `{{issue_1_strategy}}` |
| `{{issue_2}}` | `{{issue_2_freq}}` | `{{issue_2_impact}}` | `{{issue_2_strategy}}` |

---

## 10. Next Month Plan — Plano para o Proximo Mes

### Ajustes de Treino

| Ajuste | Detalhe | Motivo | Impacto Esperado |
|--------|---------|--------|-----------------|
| `{{training_adj_1}}` | `{{train_detail_1}}` | `{{train_reason_1}}` | `{{train_impact_1}}` |
| `{{training_adj_2}}` | `{{train_detail_2}}` | `{{train_reason_2}}` | `{{train_impact_2}}` |

### Ajustes de Nutricao

| Ajuste | Detalhe | Motivo | Impacto Esperado |
|--------|---------|--------|-----------------|
| `{{nutrition_adj_1}}` | `{{nutr_detail_1}}` | `{{nutr_reason_1}}` | `{{nutr_impact_1}}` |
| `{{nutrition_adj_2}}` | `{{nutr_detail_2}}` | `{{nutr_reason_2}}` | `{{nutr_impact_2}}` |

### Ajustes de Suplementacao

| Ajuste | Detalhe | Motivo |
|--------|---------|--------|
| `{{suppl_adj_1}}` | `{{suppl_detail_1}}` | `{{suppl_reason_1}}` |

### Ajustes de Recovery/Lifestyle

| Ajuste | Detalhe | Motivo |
|--------|---------|--------|
| `{{recovery_adj_1}}` | `{{rec_detail_1}}` | `{{rec_reason_1}}` |
| `{{recovery_adj_2}}` | `{{rec_detail_2}}` | `{{rec_reason_2}}` |

### Metas do Proximo Mes

| Meta | Indicador | Target | Prazo |
|------|-----------|--------|-------|
| `{{next_goal_1}}` | `{{next_indicator_1}}` | `{{next_target_1}}` | `{{next_deadline_1}}` |
| `{{next_goal_2}}` | `{{next_indicator_2}}` | `{{next_target_2}}` | `{{next_deadline_2}}` |
| `{{next_goal_3}}` | `{{next_indicator_3}}` | `{{next_target_3}}` | `{{next_deadline_3}}` |

### Transicao de Fase (se aplicavel)

| Campo | Valor |
|-------|-------|
| Fase Atual | `{{current_phase}}` |
| Fase Planejada Proximo Mes | `{{next_phase}}` |
| Motivo da Transicao | `{{phase_transition_reason}}` |
| Ajustes Necessarios | `{{phase_transition_adjustments}}` |

---

## 11. Coach Notes & Recommendations

### Avaliacao Geral do Mes

```
{{coach_monthly_assessment}}
```

### Recomendacoes Especificas

```
{{coach_recommendations}}
```

### Mensagem ao Cliente

> `{{coach_message_to_client}}`

### Encaminhamentos (se necessario)

| Profissional | Motivo | Urgencia | Status |
|-------------|--------|----------|--------|
| `{{referral_1_professional}}` | `{{referral_1_reason}}` | `{{referral_1_urgency}}` | `{{referral_1_status}}` |

---

## 12. Historico de Versoes

| Versao | Data | Tipo | Coach |
|--------|------|------|-------|
| 1.0 | `{{report_date}}` | Relatorio Mensal — Mes `{{current_month}}` | `{{coach_name}}` |
| — | — | — | — |

---

> **Gerado pelo FitCoach Squad — Synkra AIOX**
> Template: `monthly-evolution-tmpl` v1.0
