# Progress Report Template — FitCoach Squad

> **Template ID:** `progress-report-tmpl`
> **Version:** 1.0
> **Última atualização:** 2026-03-11
> **Uso:** Relatório de progresso semanal/mensal do cliente

---

## 1. Header — Informações do Relatório

| Campo | Valor |
|-------|-------|
| **Nome do Cliente** | `{{client_name}}` |
| **ID Cliente** | `{{client_id}}` |
| **Coach Responsável** | `{{coach_name}}` |
| **Tipo de Relatório** | `{{report_type}}` (Semanal / Quinzenal / Mensal / Trimestral) |
| **Período** | `{{period_start}}` a `{{period_end}}` |
| **Semana do Programa** | `{{current_week}}` / `{{total_weeks}}` |
| **Fase Atual** | `{{current_phase}}` |
| **Objetivo Principal** | `{{primary_goal}}` |
| **Status Geral** | `{{overall_status}}` (No Caminho / Atenção / Crítico / Excepcional) |

---

## 2. Resumo Executivo do Período

### Destaques

- `{{highlight_1}}`
- `{{highlight_2}}`
- `{{highlight_3}}`

### Alertas

- `{{alert_1}}`
- `{{alert_2}}`

### Recomendação Principal

> `{{main_recommendation}}`

---

## 3. Weight Trend — Tendência de Peso

### Dados Semanais

| Data | Peso (kg) | Delta Semanal | Delta Total | Meta | Gap |
|------|----------|--------------|------------|------|-----|
| `{{date_1}}` | `{{weight_1}}` | — | — | `{{target_weight}}` | `{{gap_1}}` |
| `{{date_2}}` | `{{weight_2}}` | `{{delta_w2}}` | `{{total_d2}}` | `{{target_weight}}` | `{{gap_2}}` |
| `{{date_3}}` | `{{weight_3}}` | `{{delta_w3}}` | `{{total_d3}}` | `{{target_weight}}` | `{{gap_3}}` |
| `{{date_4}}` | `{{weight_4}}` | `{{delta_w4}}` | `{{total_d4}}` | `{{target_weight}}` | `{{gap_4}}` |

### Gráfico de Tendência

```
Peso (kg)
  {{max_weight}} |
                 |    *
                 |  *   *
                 | *      *
  {{min_weight}} |*         *
                 |____________
                  S1  S2  S3  S4
                    Semanas

  * = Peso real
  - = Tendência (média móvel 7 dias)
  . = Meta linear
```

> **Placeholder:** Substituir por gráfico gerado pelo sistema (Chart.js / Recharts)

### Análise de Tendência

| Métrica | Valor |
|---------|-------|
| **Média do período** | `{{avg_weight}}` kg |
| **Menor peso** | `{{min_weight}}` kg (em `{{min_weight_date}}`) |
| **Maior peso** | `{{max_weight}}` kg (em `{{max_weight_date}}`) |
| **Variação total** | `{{total_variation}}` kg |
| **Taxa média semanal** | `{{weekly_rate}}` kg/sem |
| **Taxa esperada** | `{{expected_rate}}` kg/sem |
| **Status da taxa** | `{{rate_status}}` (Dentro / Acima / Abaixo do esperado) |

---

## 4. Measurements Comparison — Comparação de Medidas

### Tabela de Medidas Corporais

| Medida | Início do Programa | Período Anterior | Período Atual | Delta Período | Delta Total |
|--------|-------------------|-----------------|---------------|--------------|------------|
| Peso (kg) | `{{start_weight}}` | `{{prev_weight}}` | `{{curr_weight}}` | `{{delta_weight}}` | `{{total_weight}}` |
| Gordura corporal (%) | `{{start_bf}}` | `{{prev_bf}}` | `{{curr_bf}}` | `{{delta_bf}}` | `{{total_bf}}` |
| Massa magra (kg) | `{{start_lbm}}` | `{{prev_lbm}}` | `{{curr_lbm}}` | `{{delta_lbm}}` | `{{total_lbm}}` |
| Peito (cm) | `{{start_chest}}` | `{{prev_chest}}` | `{{curr_chest}}` | `{{delta_chest}}` | `{{total_chest}}` |
| Cintura (cm) | `{{start_waist}}` | `{{prev_waist}}` | `{{curr_waist}}` | `{{delta_waist}}` | `{{total_waist}}` |
| Quadril (cm) | `{{start_hip}}` | `{{prev_hip}}` | `{{curr_hip}}` | `{{delta_hip}}` | `{{total_hip}}` |
| Braço D (cm) | `{{start_arm_r}}` | `{{prev_arm_r}}` | `{{curr_arm_r}}` | `{{delta_arm_r}}` | `{{total_arm_r}}` |
| Braço E (cm) | `{{start_arm_l}}` | `{{prev_arm_l}}` | `{{curr_arm_l}}` | `{{delta_arm_l}}` | `{{total_arm_l}}` |
| Coxa D (cm) | `{{start_thigh_r}}` | `{{prev_thigh_r}}` | `{{curr_thigh_r}}` | `{{delta_thigh_r}}` | `{{total_thigh_r}}` |
| Coxa E (cm) | `{{start_thigh_l}}` | `{{prev_thigh_l}}` | `{{curr_thigh_l}}` | `{{delta_thigh_l}}` | `{{total_thigh_l}}` |
| Panturrilha D (cm) | `{{start_calf_r}}` | `{{prev_calf_r}}` | `{{curr_calf_r}}` | `{{delta_calf_r}}` | `{{total_calf_r}}` |
| Panturrilha E (cm) | `{{start_calf_l}}` | `{{prev_calf_l}}` | `{{curr_calf_l}}` | `{{delta_calf_l}}` | `{{total_calf_l}}` |
| Ombro (cm) | `{{start_shoulder}}` | `{{prev_shoulder}}` | `{{curr_shoulder}}` | `{{delta_shoulder}}` | `{{total_shoulder}}` |
| Antebraço D (cm) | `{{start_forearm_r}}` | `{{prev_forearm_r}}` | `{{curr_forearm_r}}` | `{{delta_forearm_r}}` | `{{total_forearm_r}}` |

### Indicadores Derivados

| Indicador | Valor Atual | Referência | Status |
|-----------|------------|-----------|--------|
| IMC | `{{bmi}}` | 18.5-24.9 (normal) | `{{bmi_status}}` |
| Relação Cintura-Quadril | `{{whr}}` | <0.90 (H) / <0.85 (M) | `{{whr_status}}` |
| FFMI (Fat-Free Mass Index) | `{{ffmi}}` | 18-25 (natural range) | `{{ffmi_status}}` |
| Razão Ombro-Cintura | `{{swr}}` | >1.6 (H) / >1.4 (M) — shape ideal | `{{swr_status}}` |

---

## 5. Photo Comparison — Comparação Fotográfica

### Layout de Fotos

| Ângulo | Início do Programa | Período Anterior | Período Atual |
|--------|-------------------|-----------------|---------------|
| **Frente (relaxado)** | `{{photo_front_start}}` | `{{photo_front_prev}}` | `{{photo_front_curr}}` |
| **Frente (contraído)** | `{{photo_front_flex_start}}` | `{{photo_front_flex_prev}}` | `{{photo_front_flex_curr}}` |
| **Lateral D** | `{{photo_side_r_start}}` | `{{photo_side_r_prev}}` | `{{photo_side_r_curr}}` |
| **Lateral E** | `{{photo_side_l_start}}` | `{{photo_side_l_prev}}` | `{{photo_side_l_curr}}` |
| **Costas (relaxado)** | `{{photo_back_start}}` | `{{photo_back_prev}}` | `{{photo_back_curr}}` |
| **Costas (contraído)** | `{{photo_back_flex_start}}` | `{{photo_back_flex_prev}}` | `{{photo_back_flex_curr}}` |

> **Placeholder:** Fotos inseridas pelo sistema via upload ou URL de storage

### Observações Visuais do Coach

- **Mudanças positivas observadas:** `{{visual_improvements}}`
- **Áreas que precisam de atenção:** `{{visual_concerns}}`
- **Comparação geral com início:** `{{overall_visual_comparison}}`

---

## 6. Training Performance — Desempenho no Treino

### Personal Records (PRs) do Período

| Exercício | PR Anterior | Novo PR | Data | Melhoria |
|-----------|------------|---------|------|---------|
| `{{pr1_exercise}}` | `{{pr1_previous}}` | `{{pr1_new}}` | `{{pr1_date}}` | `{{pr1_improvement}}` |
| `{{pr2_exercise}}` | `{{pr2_previous}}` | `{{pr2_new}}` | `{{pr2_date}}` | `{{pr2_improvement}}` |
| `{{pr3_exercise}}` | `{{pr3_previous}}` | `{{pr3_new}}` | `{{pr3_date}}` | `{{pr3_improvement}}` |

### Volume Progression (tonelagem semanal)

| Semana | Volume Total (kg) | Delta | Intensidade Média (RPE) |
|--------|-------------------|-------|------------------------|
| `{{week_1}}` | `{{vol_1}}` | — | `{{rpe_1}}` |
| `{{week_2}}` | `{{vol_2}}` | `{{vol_delta_2}}` | `{{rpe_2}}` |
| `{{week_3}}` | `{{vol_3}}` | `{{vol_delta_3}}` | `{{rpe_3}}` |
| `{{week_4}}` | `{{vol_4}}` | `{{vol_delta_4}}` | `{{rpe_4}}` |

### Aderência ao Treino

| Métrica | Meta | Realizado | Aderência (%) |
|---------|------|-----------|--------------|
| Sessões na semana | `{{target_sessions}}` | `{{actual_sessions}}` | `{{session_adherence}}` % |
| Exercícios completados | `{{target_exercises}}` | `{{actual_exercises}}` | `{{exercise_adherence}}` % |
| Sets totais | `{{target_sets}}` | `{{actual_sets}}` | `{{set_adherence}}` % |

### Consistência por Grupo Muscular

| Grupo | Volume Prescrito (sets) | Volume Realizado (sets) | Aderência |
|-------|------------------------|------------------------|-----------|
| Peito | `{{chest_prescribed}}` | `{{chest_actual}}` | `{{chest_adherence}}` % |
| Costas | `{{back_prescribed}}` | `{{back_actual}}` | `{{back_adherence}}` % |
| Pernas | `{{legs_prescribed}}` | `{{legs_actual}}` | `{{legs_adherence}}` % |
| Ombros | `{{shoulders_prescribed}}` | `{{shoulders_actual}}` | `{{shoulders_adherence}}` % |
| Braços | `{{arms_prescribed}}` | `{{arms_actual}}` | `{{arms_adherence}}` % |

---

## 7. Diet Adherence Score — Score de Aderência Nutricional

### Aderência Diária

| Dia | Calorias Meta | Calorias Real | Proteína Meta | Proteína Real | Score |
|-----|-------------|--------------|--------------|--------------|-------|
| Seg | `{{cal_target}}` | `{{mon_cal}}` | `{{prot_target}}` | `{{mon_prot}}` | `{{mon_score}}` |
| Ter | `{{cal_target}}` | `{{tue_cal}}` | `{{prot_target}}` | `{{tue_prot}}` | `{{tue_score}}` |
| Qua | `{{cal_target}}` | `{{wed_cal}}` | `{{prot_target}}` | `{{wed_prot}}` | `{{wed_score}}` |
| Qui | `{{cal_target}}` | `{{thu_cal}}` | `{{prot_target}}` | `{{thu_prot}}` | `{{thu_score}}` |
| Sex | `{{cal_target}}` | `{{fri_cal}}` | `{{prot_target}}` | `{{fri_prot}}` | `{{fri_score}}` |
| Sáb | `{{cal_target}}` | `{{sat_cal}}` | `{{prot_target}}` | `{{sat_prot}}` | `{{sat_score}}` |
| Dom | `{{cal_target}}` | `{{sun_cal}}` | `{{prot_target}}` | `{{sun_prot}}` | `{{sun_score}}` |

### Score de Aderência Semanal

| Critério | Peso | Score (0-10) | Score Ponderado |
|----------|------|-------------|----------------|
| Calorias dentro de ±10% | 30% | `{{cal_score}}` | `{{cal_weighted}}` |
| Proteína atingida (±5%) | 30% | `{{prot_score}}` | `{{prot_weighted}}` |
| Refeições no horário | 15% | `{{timing_score}}` | `{{timing_weighted}}` |
| Hidratação adequada | 10% | `{{hydration_score}}` | `{{hydration_weighted}}` |
| Suplementação completa | 10% | `{{suppl_score}}` | `{{suppl_weighted}}` |
| Sem desvios não planejados | 5% | `{{deviation_score}}` | `{{deviation_weighted}}` |
| **TOTAL** | **100%** | — | **`{{total_diet_score}}`/10** |

### Classificação de Aderência

| Score | Classificação | Ação |
|-------|-------------|------|
| 9.0-10.0 | Excelente | Manter protocolo |
| 7.0-8.9 | Bom | Ajustes menores |
| 5.0-6.9 | Regular | Revisar refeições problemáticas |
| 3.0-4.9 | Fraco | Reunião com coach, simplificar plano |
| 0.0-2.9 | Crítico | Intervenção urgente, reavaliar viabilidade do plano |

---

## 8. Gamification Stats — Estatísticas de Gamificação

### Streaks (Sequências)

| Tipo de Streak | Sequência Atual | Recorde | Status |
|---------------|----------------|---------|--------|
| Treino consecutivo (dias) | `{{training_streak}}` | `{{training_streak_record}}` | `{{streak_status_1}}` |
| Dieta aderente (dias) | `{{diet_streak}}` | `{{diet_streak_record}}` | `{{streak_status_2}}` |
| Check-in semanal | `{{checkin_streak}}` | `{{checkin_streak_record}}` | `{{streak_status_3}}` |
| Hidratação adequada | `{{hydration_streak}}` | `{{hydration_streak_record}}` | `{{streak_status_4}}` |
| Sono 7+ horas | `{{sleep_streak}}` | `{{sleep_streak_record}}` | `{{streak_status_5}}` |

### Badges Conquistados no Período

| Badge | Descrição | Data | Raridade |
|-------|-----------|------|---------|
| `{{badge_1_name}}` | `{{badge_1_desc}}` | `{{badge_1_date}}` | `{{badge_1_rarity}}` |
| `{{badge_2_name}}` | `{{badge_2_desc}}` | `{{badge_2_date}}` | `{{badge_2_rarity}}` |
| `{{badge_3_name}}` | `{{badge_3_desc}}` | `{{badge_3_date}}` | `{{badge_3_rarity}}` |

### Badges Disponíveis (próximos)

| Badge | Requisito | Progresso | Faltam |
|-------|-----------|----------|-------|
| `{{next_badge_1}}` | `{{req_1}}` | `{{prog_1}}` | `{{remain_1}}` |
| `{{next_badge_2}}` | `{{req_2}}` | `{{prog_2}}` | `{{remain_2}}` |

### Ranking

| Categoria | Posição | Total Participantes | Percentil |
|-----------|---------|-------------------|----------|
| Geral | `{{rank_overall}}` | `{{total_clients}}` | `{{percentile_overall}}` % |
| Aderência | `{{rank_adherence}}` | `{{total_clients}}` | `{{percentile_adherence}}` % |
| Performance | `{{rank_performance}}` | `{{total_clients}}` | `{{percentile_performance}}` % |
| Consistência | `{{rank_consistency}}` | `{{total_clients}}` | `{{percentile_consistency}}` % |

### XP e Level

| Métrica | Valor |
|---------|-------|
| **XP Total** | `{{total_xp}}` |
| **Level Atual** | `{{current_level}}` — `{{level_name}}` |
| **XP para Próximo Level** | `{{xp_to_next_level}}` |
| **XP Ganho no Período** | `{{period_xp}}` |

### Sistema de Levels

| Level | Nome | XP Necessário | Benefícios |
|-------|------|--------------|-----------|
| 1 | Novato | 0 | Acesso básico |
| 5 | Dedicado | 500 | Badge exclusiva |
| 10 | Consistente | 1500 | Desconto 5% renovação |
| 20 | Guerreiro | 5000 | Acesso a grupo VIP |
| 30 | Elite | 12000 | 1 sessão extra grátis/mês |
| 50 | Lenda | 30000 | Mentoria para novatos + desconto 15% |

---

## 9. Lifestyle Metrics — Métricas de Estilo de Vida

### Sono

| Dia | Horas | Qualidade (1-10) | Hora de Dormir | Hora de Acordar |
|-----|-------|-----------------|----------------|----------------|
| Seg | `{{mon_sleep_h}}` | `{{mon_sleep_q}}` | `{{mon_bed}}` | `{{mon_wake}}` |
| Ter | `{{tue_sleep_h}}` | `{{tue_sleep_q}}` | `{{tue_bed}}` | `{{tue_wake}}` |
| Qua | `{{wed_sleep_h}}` | `{{wed_sleep_q}}` | `{{wed_bed}}` | `{{wed_wake}}` |
| Qui | `{{thu_sleep_h}}` | `{{thu_sleep_q}}` | `{{thu_bed}}` | `{{thu_wake}}` |
| Sex | `{{fri_sleep_h}}` | `{{fri_sleep_q}}` | `{{fri_bed}}` | `{{fri_wake}}` |
| Sáb | `{{sat_sleep_h}}` | `{{sat_sleep_q}}` | `{{sat_bed}}` | `{{sat_wake}}` |
| Dom | `{{sun_sleep_h}}` | `{{sun_sleep_q}}` | `{{sun_bed}}` | `{{sun_wake}}` |
| **Média** | **`{{avg_sleep}}`** | **`{{avg_sleep_quality}}`** | — | — |

### Stress e Energia

| Dia | Nível de Stress (1-10) | Nível de Energia (1-10) | Humor (1-10) |
|-----|----------------------|------------------------|-------------|
| Seg | `{{mon_stress}}` | `{{mon_energy}}` | `{{mon_mood}}` |
| Ter | `{{tue_stress}}` | `{{tue_energy}}` | `{{tue_mood}}` |
| Qua | `{{wed_stress}}` | `{{wed_energy}}` | `{{wed_mood}}` |
| Qui | `{{thu_stress}}` | `{{thu_energy}}` | `{{thu_mood}}` |
| Sex | `{{fri_stress}}` | `{{fri_energy}}` | `{{fri_mood}}` |
| Sáb | `{{sat_stress}}` | `{{sat_energy}}` | `{{sat_mood}}` |
| Dom | `{{sun_stress}}` | `{{sun_energy}}` | `{{sun_mood}}` |
| **Média** | **`{{avg_stress}}`** | **`{{avg_energy}}`** | **`{{avg_mood}}`** |

---

## 10. Coach Recommendations — Recomendações do Coach

### Ajustes para o Próximo Período

#### Treino

| Ajuste | Detalhe | Motivo |
|--------|---------|--------|
| `{{training_adj_1}}` | `{{training_detail_1}}` | `{{training_reason_1}}` |
| `{{training_adj_2}}` | `{{training_detail_2}}` | `{{training_reason_2}}` |

#### Nutrição

| Ajuste | Detalhe | Motivo |
|--------|---------|--------|
| `{{nutrition_adj_1}}` | `{{nutrition_detail_1}}` | `{{nutrition_reason_1}}` |
| `{{nutrition_adj_2}}` | `{{nutrition_detail_2}}` | `{{nutrition_reason_2}}` |

#### Suplementação

| Ajuste | Detalhe | Motivo |
|--------|---------|--------|
| `{{suppl_adj_1}}` | `{{suppl_detail_1}}` | `{{suppl_reason_1}}` |

#### Lifestyle

| Ajuste | Detalhe | Motivo |
|--------|---------|--------|
| `{{life_adj_1}}` | `{{life_detail_1}}` | `{{life_reason_1}}` |

### Metas para o Próximo Período

| Meta | Indicador | Target | Prazo |
|------|-----------|--------|-------|
| `{{goal_1}}` | `{{indicator_1}}` | `{{target_1}}` | `{{deadline_1}}` |
| `{{goal_2}}` | `{{indicator_2}}` | `{{target_2}}` | `{{deadline_2}}` |
| `{{goal_3}}` | `{{indicator_3}}` | `{{target_3}}` | `{{deadline_3}}` |

### Mensagem Motivacional do Coach

> `{{motivational_message}}`

---

## 11. Histórico de Versões

| Versão | Data | Tipo | Coach |
|--------|------|------|-------|
| 1.0 | `{{report_date}}` | `{{report_type}}` | `{{coach_name}}` |

---

> **Gerado pelo FitCoach Squad — Synkra AIOX**
> Template: `progress-report-tmpl` v1.0
