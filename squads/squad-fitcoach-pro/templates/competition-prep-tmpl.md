# Competition Prep Template — FitCoach Squad

> **Template ID:** `competition-prep-tmpl`
> **Version:** 1.0
> **Última atualização:** 2026-03-11
> **Uso:** Planejamento completo de preparação para competição (bodybuilding, physique, bikini, classic, etc.)

---

## 1. Athlete Profile — Perfil do Atleta

### Dados Pessoais

| Campo | Valor |
|-------|-------|
| **Nome** | `{{athlete_name}}` |
| **ID Cliente** | `{{client_id}}` |
| **Prep Coach** | `{{coach_name}}` |
| **Posing Coach** | `{{posing_coach}}` |
| **Nutricionista** | `{{nutritionist}}` (se separado do coach) |
| **Idade** | `{{age}}` anos |
| **Sexo** | `{{sex}}` |
| **Altura** | `{{height}}` cm |
| **Experiência competitiva** | `{{comp_experience}}` (Primeira vez / Amador / Experiente / Pro) |
| **Competições anteriores** | `{{previous_competitions}}` |
| **Melhor resultado** | `{{best_result}}` |
| **Registro CREF** | `{{cref_number}}` (do coach) |

### Somatotipo e Genética

| Campo | Valor |
|-------|-------|
| **Somatotipo predominante** | `{{somatotype}}` (Ectomorfo / Mesomorfo / Endomorfo / Misto) |
| **Pontos fortes (muscle groups)** | `{{genetic_strengths}}` |
| **Pontos fracos (muscle groups)** | `{{genetic_weaknesses}}` |
| **Facilidade de secar** | `{{drying_ease}}` (Fácil / Moderado / Difícil) |
| **Tendência a retenção hídrica** | `{{water_retention}}` (Baixa / Média / Alta) |
| **Histórico de rebound pós-competição** | `{{rebound_history}}` |

---

## 2. Competition Details — Detalhes da Competição

### Competição Alvo

| Campo | Valor |
|-------|-------|
| **Nome da Competição** | `{{competition_name}}` |
| **Federação** | `{{federation}}` (IFBB / NABBA / WBFF / NPC / Outra) |
| **Categoria** | `{{category}}` (Bodybuilding / Classic Physique / Men's Physique / Bikini / Wellness / Figure / Women's Physique) |
| **Classe** | `{{class}}` (peso ou altura, conforme categoria) |
| **Data da Competição** | `{{competition_date}}` |
| **Local** | `{{competition_venue}}` |
| **Cidade/Estado** | `{{competition_location}}` |
| **Nível** | `{{competition_level}}` (Municipal / Estadual / Nacional / Internacional / Pro) |
| **Pesagem** | `{{weigh_in_details}}` (Data, horário, tipo: no dia / dia anterior) |
| **Horário do prejudging** | `{{prejudging_time}}` |
| **Horário do finals** | `{{finals_time}}` |

### Competições Secundárias (backup / warm-up)

| Competição | Data | Categoria | Objetivo |
|-----------|------|----------|---------|
| `{{backup_comp_1}}` | `{{backup_date_1}}` | `{{backup_cat_1}}` | `{{backup_goal_1}}` |
| `{{backup_comp_2}}` | `{{backup_date_2}}` | `{{backup_cat_2}}` | `{{backup_goal_2}}` |

---

## 3. Timeline Overview — Visão Geral do Timeline

### Contagem Regressiva

| Marco | Data | Semanas Out | Status |
|-------|------|-----------|--------|
| **Início da prep** | `{{prep_start}}` | `{{total_weeks}}` weeks out | `{{prep_start_status}}` |
| **Checkpoint 1** (midpoint) | `{{checkpoint_1}}` | `{{cp1_weeks}}` weeks out | `{{cp1_status}}` |
| **Checkpoint 2** (4 weeks out) | `{{checkpoint_2}}` | 4 weeks out | `{{cp2_status}}` |
| **Peak week start** | `{{peak_week_start}}` | 1 week out | `{{peak_status}}` |
| **Competição** | `{{competition_date}}` | 0 | `{{comp_status}}` |
| **Recovery phase** | `{{recovery_start}}` | +1 week | `{{recovery_status}}` |

### Fases da Prep

| Fase | Período | Duração | Foco Principal |
|------|---------|---------|---------------|
| **Off-season final** | `{{offseason_period}}` | `{{offseason_duration}}` sem | Maximizar massa, pontos fracos |
| **Transition** | `{{transition_period}}` | 2-3 sem | Adaptar ao déficit, ajustar cardio |
| **Prep fase 1** (moderate deficit) | `{{prep1_period}}` | `{{prep1_duration}}` sem | Perda de gordura com preservação de massa |
| **Prep fase 2** (aggressive deficit) | `{{prep2_period}}` | `{{prep2_duration}}` sem | Secar, cardio aumenta |
| **Prep fase 3** (final push) | `{{prep3_period}}` | `{{prep3_duration}}` sem | Detalhes, separação, estriações |
| **Peak week** | `{{peak_period}}` | 1 sem | Manipulação de carb/sodium/water |
| **Show day** | `{{competition_date}}` | 1 dia | Performance, posing, apresentação |
| **Reverse diet** | `{{reverse_period}}` | 8-16 sem | Recuperação metabólica |

---

## 4. Phase Breakdown — Detalhamento por Fase

### Métricas de Off-Season (Baseline)

| Métrica | Valor |
|---------|-------|
| **Peso** | `{{offseason_weight}}` kg |
| **Gordura corporal** | `{{offseason_bf}}` % |
| **Massa magra** | `{{offseason_lbm}}` kg |
| **Calorias diárias** | `{{offseason_calories}}` kcal |
| **Macros (P/C/F)** | `{{offseason_protein}}`g / `{{offseason_carbs}}`g / `{{offseason_fat}}`g |
| **Cardio** | `{{offseason_cardio}}` min/semana |
| **Steps** | `{{offseason_steps}}` /dia |
| **Volume de treino** | `{{offseason_volume}}` sets/semana |

### Métricas de Início da Prep

| Métrica | Valor |
|---------|-------|
| **Peso** | `{{prep_start_weight}}` kg |
| **Gordura corporal** | `{{prep_start_bf}}` % |
| **Massa magra** | `{{prep_start_lbm}}` kg |
| **Calorias iniciais** | `{{prep_start_calories}}` kcal |
| **Macros (P/C/F)** | `{{prep_start_protein}}`g / `{{prep_start_carbs}}`g / `{{prep_start_fat}}`g |
| **Cardio inicial** | `{{prep_start_cardio}}` min/semana |
| **Steps iniciais** | `{{prep_start_steps}}` /dia |

### Targets para Stage

| Métrica | Target | Range Aceitável |
|---------|--------|----------------|
| **Peso de palco** | `{{stage_weight}}` kg | ± `{{stage_weight_range}}` kg |
| **Gordura corporal** | `{{stage_bf}}` % | `{{stage_bf_range}}` % |
| **Perda total necessária** | `{{total_fat_loss}}` kg de gordura | — |
| **Taxa de perda semanal** | `{{weekly_loss_rate}}` kg/sem | 0.5-1.0% do peso corporal |
| **Semanas necessárias (mínimo)** | `{{min_weeks}}` semanas | — |
| **Semanas planejadas** | `{{planned_weeks}}` semanas | +2-4 de buffer |

### Progressão Semanal Planejada

| Semanas Out | Calorias | Proteína | Carbs | Gordura | Cardio (min/sem) | Steps/dia | Refeed |
|------------|----------|----------|-------|---------|-----------------|----------|--------|
| `{{weeks_out_1}}` | `{{cal_1}}` | `{{prot_1}}`g | `{{carb_1}}`g | `{{fat_1}}`g | `{{cardio_1}}` | `{{steps_1}}` | `{{refeed_1}}` |
| `{{weeks_out_2}}` | `{{cal_2}}` | `{{prot_2}}`g | `{{carb_2}}`g | `{{fat_2}}`g | `{{cardio_2}}` | `{{steps_2}}` | `{{refeed_2}}` |
| `{{weeks_out_3}}` | `{{cal_3}}` | `{{prot_3}}`g | `{{carb_3}}`g | `{{fat_3}}`g | `{{cardio_3}}` | `{{steps_3}}` | `{{refeed_3}}` |
| `{{weeks_out_4}}` | `{{cal_4}}` | `{{prot_4}}`g | `{{carb_4}}`g | `{{fat_4}}`g | `{{cardio_4}}` | `{{steps_4}}` | `{{refeed_4}}` |

> **Nota:** Esta tabela é um planejamento inicial. Ajustes semanais são feitos com base no check-in.

---

## 5. Weekly Check-in Protocol — Protocolo de Check-in Semanal

### Dados Obrigatórios do Check-in

| Item | Método | Frequência | Horário |
|------|--------|-----------|---------|
| **Peso** | Balança digital (mesmo modelo) | Diário (média semanal) | Manhã, jejum, pós-banheiro |
| **Fotos** | 6 poses padrão | Semanal | Manhã, jejum, mesma iluminação |
| **Circunferências** | Fita métrica | Quinzenal | Manhã, jejum |
| **Aderência ao treino** | Auto-relato | Semanal | No check-in |
| **Aderência à dieta (%)** | Auto-relato + log | Semanal | No check-in |
| **Cardio realizado** | Auto-relato | Semanal | No check-in |
| **Sono (média horas)** | Auto-relato ou wearable | Semanal | No check-in |
| **Stress (1-10)** | Auto-relato | Semanal | No check-in |
| **Energia no treino (1-10)** | Auto-relato | Semanal | No check-in |
| **Fome (1-10)** | Auto-relato | Semanal | No check-in |
| **Humor/Mood (1-10)** | Auto-relato | Semanal | No check-in |
| **Digestão** | Auto-relato | Semanal | No check-in |
| **Ciclo menstrual (mulheres)** | Auto-relato | Semanal | No check-in |

### Dia do Check-in: `{{checkin_day}}` (preferencialmente sexta ou sábado manhã)

### Template de Resposta do Check-in

```
SEMANA {{week_number}} — {{weeks_out}} weeks out

PESO:
- Média da semana: {{avg_weight}} kg
- Menor peso: {{min_weight}} kg
- Maior peso: {{max_weight}} kg
- Delta vs semana anterior: {{weight_delta}} kg

MEDIDAS (se semana de medição):
- Cintura: {{waist}} cm
- [demais medidas]

FOTOS: [anexar 6 fotos padrão]

TREINO:
- Sessões completadas: {{sessions_completed}}/{{sessions_planned}}
- Performance: {{performance_notes}}
- PRs ou regressões: {{pr_notes}}

DIETA:
- Aderência: {{diet_adherence}}%
- Dias fora do plano: {{off_plan_days}}
- Fome média (1-10): {{hunger_level}}

CARDIO:
- Total realizado: {{cardio_done}} min
- Prescrito: {{cardio_prescribed}} min
- Steps médio: {{avg_steps}}

LIFESTYLE:
- Sono médio: {{avg_sleep}} h
- Stress (1-10): {{stress}}
- Energia (1-10): {{energy}}
- Humor (1-10): {{mood}}
- Digestão: {{digestion}}

OBSERVAÇÕES:
{{athlete_notes}}
```

### Critérios de Ajuste

| Cenário | Ação | Prioridade |
|---------|------|-----------|
| Perda > 1.5% do peso/semana por 2+ semanas | Aumentar calorias (+100-200 via carbs) | ALTA |
| Sem perda por 2+ semanas | Reduzir calorias (-100-200) OU aumentar cardio (+60min/sem) | ALTA |
| Perda de força significativa (>10% em compostos) | Adicionar refeed, reavaliar déficit | ALTA |
| Fome extrema (9-10) por 2+ semanas | Ajustar timing de refeições, adicionar volume de comida | MÉDIA |
| Sono < 6h por 2+ semanas | Suplementação (magnésio, melatonina), higiene do sono | MÉDIA |
| Stress > 8 por 2+ semanas | Reduzir volume de cardio/treino, reavaliar timeline | MÉDIA |

---

## 6. Peak Week Day-by-Day Plan — Plano Dia a Dia da Peak Week

### Estratégia Geral de Peak Week

| Componente | Estratégia | Notas |
|-----------|-----------|-------|
| **Carboidratos** | `{{carb_strategy}}` (Depletion + Load / Front Load / Steady / Custom) |  |
| **Sódio** | `{{sodium_strategy}}` (Manter constante / Manipular / Não manipular) |  |
| **Água** | `{{water_strategy}}` (Water loading + cut / Constante / Gradual reduction) |  |
| **Treino** | `{{training_strategy}}` (Depletion workout + rest / Light pump / Custom) |  |
| **Suplementação** | `{{peak_suppl_strategy}}` |  |

### Dia a Dia (7 dias antes da competição)

#### Domingo (7 days out)

| Horário | Atividade | Alimentação | Água | Sódio | Suplementos |
|---------|-----------|------------|------|-------|------------|
| `{{sun_am}}` | `{{sun_am_activity}}` | `{{sun_am_food}}` | `{{sun_am_water}}` | `{{sun_am_sodium}}` | `{{sun_am_suppl}}` |
| `{{sun_mid}}` | `{{sun_mid_activity}}` | `{{sun_mid_food}}` | `{{sun_mid_water}}` | `{{sun_mid_sodium}}` | `{{sun_mid_suppl}}` |
| `{{sun_pm}}` | `{{sun_pm_activity}}` | `{{sun_pm_food}}` | `{{sun_pm_water}}` | `{{sun_pm_sodium}}` | `{{sun_pm_suppl}}` |

**Macros do dia:** P: `{{sun_protein}}`g / C: `{{sun_carbs}}`g / F: `{{sun_fat}}`g / Cal: `{{sun_calories}}` kcal
**Água total:** `{{sun_total_water}}` L

#### Segunda (6 days out)

| Horário | Atividade | Alimentação | Água | Sódio | Suplementos |
|---------|-----------|------------|------|-------|------------|
| Manhã | `{{mon_am_activity}}` | `{{mon_am_food}}` | `{{mon_am_water}}` | `{{mon_am_sodium}}` | `{{mon_am_suppl}}` |
| Tarde | `{{mon_mid_activity}}` | `{{mon_mid_food}}` | `{{mon_mid_water}}` | `{{mon_mid_sodium}}` | `{{mon_mid_suppl}}` |
| Noite | `{{mon_pm_activity}}` | `{{mon_pm_food}}` | `{{mon_pm_water}}` | `{{mon_pm_sodium}}` | `{{mon_pm_suppl}}` |

**Macros do dia:** P: `{{mon_protein}}`g / C: `{{mon_carbs}}`g / F: `{{mon_fat}}`g / Cal: `{{mon_calories}}` kcal
**Água total:** `{{mon_total_water}}` L

#### Terça (5 days out)

**Macros do dia:** P: `{{tue_protein}}`g / C: `{{tue_carbs}}`g / F: `{{tue_fat}}`g / Cal: `{{tue_calories}}` kcal
**Água total:** `{{tue_total_water}}` L
**Treino:** `{{tue_training}}`
**Notas:** `{{tue_notes}}`

#### Quarta (4 days out)

**Macros do dia:** P: `{{wed_protein}}`g / C: `{{wed_carbs}}`g / F: `{{wed_fat}}`g / Cal: `{{wed_calories}}` kcal
**Água total:** `{{wed_total_water}}` L
**Treino:** `{{wed_training}}`
**Notas:** `{{wed_notes}}`

#### Quinta (3 days out) — Início do Carb Load (se aplicável)

**Macros do dia:** P: `{{thu_protein}}`g / C: `{{thu_carbs}}`g / F: `{{thu_fat}}`g / Cal: `{{thu_calories}}` kcal
**Água total:** `{{thu_total_water}}` L
**Treino:** `{{thu_training}}`
**Notas:** `{{thu_notes}}`

#### Sexta (2 days out) — Carb Load Continuação

**Macros do dia:** P: `{{fri_protein}}`g / C: `{{fri_carbs}}`g / F: `{{fri_fat}}`g / Cal: `{{fri_calories}}` kcal
**Água total:** `{{fri_total_water}}` L
**Treino:** `{{fri_training}}`
**Notas:** `{{fri_notes}}`

#### Sábado (1 day out / eve of show)

**Macros do dia:** P: `{{sat_protein}}`g / C: `{{sat_carbs}}`g / F: `{{sat_fat}}`g / Cal: `{{sat_calories}}` kcal
**Água total:** `{{sat_total_water}}` L
**Treino:** `{{sat_training}}`
**Notas:** `{{sat_notes}}`

### Resumo Peak Week

| Dia | Carbs (g) | Água (L) | Sódio | Treino | Cardio |
|-----|----------|----------|-------|--------|--------|
| Dom (-7) | `{{pw_sun_carbs}}` | `{{pw_sun_water}}` | `{{pw_sun_sodium}}` | `{{pw_sun_training}}` | `{{pw_sun_cardio}}` |
| Seg (-6) | `{{pw_mon_carbs}}` | `{{pw_mon_water}}` | `{{pw_mon_sodium}}` | `{{pw_mon_training}}` | `{{pw_mon_cardio}}` |
| Ter (-5) | `{{pw_tue_carbs}}` | `{{pw_tue_water}}` | `{{pw_tue_sodium}}` | `{{pw_tue_training}}` | `{{pw_tue_cardio}}` |
| Qua (-4) | `{{pw_wed_carbs}}` | `{{pw_wed_water}}` | `{{pw_wed_sodium}}` | `{{pw_wed_training}}` | `{{pw_wed_cardio}}` |
| Qui (-3) | `{{pw_thu_carbs}}` | `{{pw_thu_water}}` | `{{pw_thu_sodium}}` | `{{pw_thu_training}}` | `{{pw_thu_cardio}}` |
| Sex (-2) | `{{pw_fri_carbs}}` | `{{pw_fri_water}}` | `{{pw_fri_sodium}}` | `{{pw_fri_training}}` | `{{pw_fri_cardio}}` |
| Sáb (-1) | `{{pw_sat_carbs}}` | `{{pw_sat_water}}` | `{{pw_sat_sodium}}` | `{{pw_sat_training}}` | `{{pw_sat_cardio}}` |

---

## 7. Show Day Schedule — Cronograma do Dia da Competição

### Preparação

| Horário | Atividade | Detalhes |
|---------|-----------|---------|
| `{{sd_wake}}` | Acordar | Verificar aparência, checkar fullness |
| `{{sd_meal1_time}}` | Refeição 1 | `{{sd_meal1}}` |
| `{{sd_tan_time}}` | Aplicar bronzeamento (última camada) | `{{sd_tan_details}}` |
| `{{sd_pump_time}}` | Pump up (backstage) | `{{sd_pump_exercises}}` |
| `{{sd_meal2_time}}` | Refeição 2 (leve) | `{{sd_meal2}}` |
| `{{sd_glaze_time}}` | Aplicar glaze/oil | `{{sd_glaze_details}}` |

### Competição

| Horário | Atividade | Detalhes |
|---------|-----------|---------|
| `{{sd_checkin_time}}` | Check-in / Pesagem | Documentos, número, pesagem (se aplicável) |
| `{{sd_prejudging_time}}` | Prejudging | Quarter turns, comparisons, individual routine |
| `{{sd_break_time}}` | Intervalo | Reidratação leve, snack, descanso |
| `{{sd_finals_time}}` | Finals | Individual routine, awards |
| `{{sd_awards_time}}` | Premiação | — |

### Backstage Kit (Checklist)

- [ ] Sunga/biquíni de competição (principal + backup)
- [ ] Bronzeador (Protan / Dream Tan / outro): `{{tanning_product}}`
- [ ] Glaze / oil
- [ ] Bomba (resistance bands para pump up)
- [ ] Toalha escura (para não manchar)
- [ ] Chinelo / sandália
- [ ] Espelho portátil
- [ ] Alimentos pré-preparados: `{{backstage_food}}`
- [ ] Honey / candy (para fullness rápido)
- [ ] Água (quantidade limitada)
- [ ] Música para posing (pen drive + celular)
- [ ] Documentos (RG, inscrição, atestado médico)
- [ ] Número de competidor
- [ ] Cola para sunga/biquíni
- [ ] Secador de cabelo (para secar o bronzeador)
- [ ] Roupão/camiseta larga para backstage

### Nutrição Show Day

| Momento | Alimento | Quantidade | Objetivo |
|---------|----------|-----------|---------|
| Ao acordar | `{{sd_food_wake}}` | `{{sd_qty_wake}}` | Fullness |
| 2h antes do palco | `{{sd_food_2h}}` | `{{sd_qty_2h}}` | Energia + fullness |
| 30 min antes do palco | `{{sd_food_30m}}` | `{{sd_qty_30m}}` | Pump + vascularity |
| Entre prejudging e finals | `{{sd_food_break}}` | `{{sd_qty_break}}` | Manter fullness |
| Pós-competição | `{{sd_food_post}}` | `{{sd_qty_post}}` | Celebração controlada |

---

## 8. Post-Competition Recovery Plan — Plano de Recuperação Pós-Competição

### Semana 1 (Recovery Imediata)

| Aspecto | Protocolo | Notas |
|---------|----------|-------|
| **Nutrição** | Reverse diet: +200-300 kcal (via carbs) | NÃO fazer binge — risco de rebound severo |
| **Proteína** | Manter 2.0-2.2 g/kg | Preservação de massa |
| **Cardio** | Reduzir 50% imediatamente | Corpo precisa de descanso |
| **Treino** | Deload week: -50% volume, -30% carga | Recuperação |
| **Sono** | Priorizar 8-9 horas | Restauração hormonal |
| **Mentalidade** | Aceitar ganho de peso (glycogen + água = 2-5kg) | NORMAL e esperado |
| **Suplementação** | Manter creatina, adicionar magnésio e vitamina D | Recovery |

### Semanas 2-4 (Transição)

| Semana | Calorias | Cardio | Volume Treino | Peso Esperado |
|--------|----------|--------|-------------|--------------|
| 2 | `{{rc_cal_w2}}` (+100-200 da semana 1) | `{{rc_cardio_w2}}` | 70% do normal | +1-2kg |
| 3 | `{{rc_cal_w3}}` (+100-200) | `{{rc_cardio_w3}}` | 80% do normal | Estabilizando |
| 4 | `{{rc_cal_w4}}` (+100-200) | `{{rc_cardio_w4}}` | 90% do normal | Estabilizando |

### Semanas 5-16 (Reverse Diet Completo)

| Fase | Duração | Meta | Ajuste Calórico | Observação |
|------|---------|------|----------------|-----------|
| Reverse agressivo | 4-6 sem | Retornar TDEE rapidamente | +100-200/sem | Se metabolismo responde bem |
| Reverse conservador | 8-12 sem | Minimizar ganho de gordura | +50-100/sem | Se tendência a rebound |
| Manutenção | 4+ sem | Estabilizar novo peso | Nenhum | Confirmar TDEE |
| Off-season | Indefinido | Crescimento muscular | +200-350 superávit | Quando estabilizado |

### Red Flags Pós-Competição

| Sinal | Ação |
|-------|------|
| Binge eating descontrolado | Encaminhar para psicólogo/nutricionista especializado |
| Dismorfismo corporal severo | Acompanhamento psicológico |
| Amenorreia prolongada (>3 meses pós-comp) | Encaminhar endocrinologista |
| Depressão pós-competição | Suporte emocional, normalizar o sentimento |
| Lesão durante recovery | Fisioterapeuta imediato |
| Ganho > 10% do peso de palco em 2 semanas | Reavaliar velocidade do reverse |

---

## 9. Posing Practice Log

### Sessões de Posing

| Semana | Sessões | Duração | Foco | Coach Feedback |
|--------|---------|---------|------|---------------|
| `{{posing_week_1}}` | `{{posing_sessions_1}}` | `{{posing_duration_1}}` min | `{{posing_focus_1}}` | `{{posing_feedback_1}}` |
| `{{posing_week_2}}` | `{{posing_sessions_2}}` | `{{posing_duration_2}}` min | `{{posing_focus_2}}` | `{{posing_feedback_2}}` |

### Poses Obrigatórias por Categoria

#### Men's Bodybuilding / Classic Physique
- [ ] Front double biceps
- [ ] Front lat spread
- [ ] Side chest
- [ ] Side triceps
- [ ] Rear double biceps
- [ ] Rear lat spread
- [ ] Abdominals and thighs
- [ ] Most muscular (favorite — bodybuilding only)

#### Men's Physique
- [ ] Front pose (hands on hips or relaxed)
- [ ] Back pose (hands on hips or relaxed)
- [ ] Quarter turns (4)

#### Bikini / Wellness
- [ ] Front pose
- [ ] Back pose
- [ ] Quarter turns (4)
- [ ] T-walk
- [ ] Model walk (if applicable)

---

## 10. Histórico de Versões

| Versão | Data | Alteração | Coach |
|--------|------|-----------|-------|
| 1.0 | `{{creation_date}}` | Plano de competição inicial | `{{coach_name}}` |
| — | — | — | — |

---

> **Gerado pelo FitCoach Squad — Synkra AIOX**
> Template: `competition-prep-tmpl` v1.0
