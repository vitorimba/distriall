---
id: session-plan-tmpl
name: Plano de Sessao de Fonoterapia
purpose: Planejamento estruturado de sessao de reabilitacao vocal
executor: "@dev"
version: "1.0"
---

# Plano de Sessao — SpeechTherapy Squad

> **Template ID:** `session-plan-tmpl`
> **Version:** 1.0
> **Ultima atualizacao:** 2026-03-13
> **Uso:** Planejamento de sessao individual de fonoterapia vocal

---

## 1. Identificacao do Paciente

| Campo | Valor |
|-------|-------|
| **Nome do Paciente** | `{{patient_name}}` |
| **ID Paciente** | `{{patient_id}}` |
| **Fonoaudiologa Responsavel** | `{{therapist_name}}` |
| **CRFa** | `{{therapist_crfa}}` |
| **Data da Sessao** | `{{session_date}}` |
| **Numero da Sessao** | `{{session_number}}` / `{{total_planned_sessions}}` |
| **Fase do Tratamento** | `{{treatment_phase}}` (Inicial / Intermediaria / Avancada / Manutencao) |
| **Diagnostico** | `{{diagnosis}}` |
| **Status dos Nodulos** | `{{nodule_status}}` (Presente / Em regressao / Resolvido / N/A) |

---

## 2. Revisao da Sessao Anterior

### Resumo

- **Data anterior:** `{{previous_session_date}}`
- **Principais conquistas:** `{{previous_achievements}}`
- **Dificuldades reportadas:** `{{previous_difficulties}}`
- **Adesao ao programa domiciliar:** `{{homework_compliance}}` % (Auto-relato)

### Status dos Objetivos em Andamento

| Objetivo | Status | Observacao |
|----------|--------|------------|
| `{{ongoing_goal_1}}` | `{{goal_1_status}}` | `{{goal_1_note}}` |
| `{{ongoing_goal_2}}` | `{{goal_2_status}}` | `{{goal_2_note}}` |
| `{{ongoing_goal_3}}` | `{{goal_3_status}}` | `{{goal_3_note}}` |

---

## 3. Objetivos da Sessao

### Objetivo Principal

> `{{primary_objective}}`

### Objetivos Especificos

1. `{{specific_objective_1}}`
2. `{{specific_objective_2}}`
3. `{{specific_objective_3}}`

---

## 4. Protocolo de Exercicios

### 4.1 Aquecimento Vocal (5-10 min)

| Exercicio | Duracao | Instrucoes | Parametros |
|-----------|---------|------------|------------|
| Respiracao diafragmatica | `{{warmup_breathing_duration}}` min | Inspiracao nasal 4s, sustentacao 4s, expiracao oral 6s | `{{warmup_breathing_sets}}` series |
| Vibracao de labios (lip trill) | `{{warmup_trill_duration}}` min | Glissando ascendente-descendente | Faixa: `{{warmup_trill_range}}` |
| Bocejo-suspiro | `{{warmup_yawn_duration}}` min | Transicao suave de agudo para grave | `{{warmup_yawn_reps}}` repeticoes |

### 4.2 SOVT — Semi-Occluded Vocal Tract Exercises (`{{sovt_duration}}` min)

| Exercicio | Duracao | Intensidade | Series x Reps | Notas |
|-----------|---------|-------------|---------------|-------|
| Fonacao em canudo (straw phonation) | `{{sovt_straw_duration}}` min | `{{sovt_straw_intensity}}` | `{{sovt_straw_sets}}` x `{{sovt_straw_reps}}` | Diametro: `{{straw_diameter}}` mm |
| Fonacao em tubo de ressonancia | `{{sovt_tube_duration}}` min | `{{sovt_tube_intensity}}` | `{{sovt_tube_sets}}` x `{{sovt_tube_reps}}` | Profundidade agua: `{{water_depth}}` cm |
| Humming (zumbido) | `{{sovt_hum_duration}}` min | `{{sovt_hum_intensity}}` | `{{sovt_hum_sets}}` x `{{sovt_hum_reps}}` | Foco em ressonancia anterior |
| `{{sovt_extra_exercise}}` | `{{sovt_extra_duration}}` min | `{{sovt_extra_intensity}}` | `{{sovt_extra_sets}}` x `{{sovt_extra_reps}}` | `{{sovt_extra_notes}}` |

### 4.3 VFE — Vocal Function Exercises (`{{vfe_duration}}` min)

| Exercicio Stemple | Duracao | Nota Alvo | TMF Alvo | Notas |
|-------------------|---------|-----------|----------|-------|
| Aquecimento: /i/ sustentado | `{{vfe_warmup_duration}}` min | `{{vfe_warmup_note}}` | `{{vfe_warmup_tmf}}` s | Suave, sem esforco |
| Alongamento: glissando ascendente | `{{vfe_stretch_duration}}` min | Do grave ao agudo | N/A | Sem quebra de registro |
| Contracao: glissando descendente | `{{vfe_contract_duration}}` min | Do agudo ao grave | N/A | Manter qualidade |
| Potencia: escalas C-D-E-F-G | `{{vfe_power_duration}}` min | `{{vfe_power_range}}` | `{{vfe_power_tmf}}` s/nota | Projecao controlada |

### 4.4 LMRVT — Laryngeal Manual Reposturing Vocal Technique (`{{lmrvt_duration}}` min)

| Tecnica | Duracao | Pressao | Direcao | Observacao |
|---------|---------|---------|---------|------------|
| Palpacao laringea | `{{lmrvt_palp_duration}}` min | `{{lmrvt_palp_pressure}}` | N/A | Avaliar tensao musculoesqueletica |
| Massagem laringea descendente | `{{lmrvt_massage_duration}}` min | `{{lmrvt_massage_pressure}}` | Cranio-caudal | `{{lmrvt_massage_notes}}` |
| Reposicionamento laringeo | `{{lmrvt_repos_duration}}` min | `{{lmrvt_repos_pressure}}` | Lateral e inferior | `{{lmrvt_repos_notes}}` |
| Fonacao durante manipulacao | `{{lmrvt_phon_duration}}` min | `{{lmrvt_phon_pressure}}` | Conforme resposta | Vogal sustentada + fala encadeada |

### 4.5 Exercicios Complementares (`{{complementary_duration}}` min)

| Exercicio | Duracao | Objetivo | Parametros |
|-----------|---------|----------|------------|
| `{{comp_exercise_1}}` | `{{comp_1_duration}}` min | `{{comp_1_objective}}` | `{{comp_1_params}}` |
| `{{comp_exercise_2}}` | `{{comp_2_duration}}` min | `{{comp_2_objective}}` | `{{comp_2_params}}` |

### 4.6 Desaquecimento Vocal (3-5 min)

- Glissando descendente suave — 3 repeticoes
- Bocejo-suspiro — 3 repeticoes
- Respiracao diafragmatica de relaxamento — 1 minuto

---

## 5. Cronograma da Sessao

| Bloco | Atividade | Duracao | Horario Estimado |
|-------|-----------|---------|------------------|
| 1 | Acolhimento e revisao | `{{block_1_duration}}` min | `{{block_1_time}}` |
| 2 | Aquecimento vocal | `{{block_2_duration}}` min | `{{block_2_time}}` |
| 3 | SOVT | `{{block_3_duration}}` min | `{{block_3_time}}` |
| 4 | VFE | `{{block_4_duration}}` min | `{{block_4_time}}` |
| 5 | LMRVT | `{{block_5_duration}}` min | `{{block_5_time}}` |
| 6 | Exercicios complementares | `{{block_6_duration}}` min | `{{block_6_time}}` |
| 7 | Desaquecimento e orientacoes | `{{block_7_duration}}` min | `{{block_7_time}}` |
| **Total** | — | **`{{total_session_duration}}`** min | — |

---

## 6. Precaucoes e Contraindicacoes

- [ ] Paciente com quadro gripal/infeccioso — adiar exercicios de esforco
- [ ] Refluxo laringofaringeo ativo — evitar exercicios em decubito
- [ ] Pos-operatorio recente — respeitar restricao de `{{post_op_restriction}}`
- [ ] Fadiga vocal reportada — reduzir intensidade em 50%
- [ ] Dor laringea durante exercicio — INTERROMPER e reavaliar
- **Outras precaucoes:** `{{additional_precautions}}`

---

## 7. Prescricao de Exercicios Domiciliares (Homework)

### Programa Diario

| Exercicio | Frequencia | Duracao | Instrucoes Resumidas |
|-----------|-----------|---------|---------------------|
| `{{hw_exercise_1}}` | `{{hw_freq_1}}` x/dia | `{{hw_dur_1}}` min | `{{hw_instructions_1}}` |
| `{{hw_exercise_2}}` | `{{hw_freq_2}}` x/dia | `{{hw_dur_2}}` min | `{{hw_instructions_2}}` |
| `{{hw_exercise_3}}` | `{{hw_freq_3}}` x/dia | `{{hw_dur_3}}` min | `{{hw_instructions_3}}` |

### Orientacoes de Higiene Vocal

- Hidratacao: minimo `{{water_intake}}` L/dia
- Repouso vocal: `{{vocal_rest_minutes}}` min de silencio apos uso intenso
- Evitar: `{{avoid_behaviors}}`
- `{{additional_hygiene_notes}}`

---

## 8. Notas de Progressao

### Observacoes da Sessao

```
{{session_notes}}
```

### Resposta ao Tratamento

| Parametro | Inicio da Sessao | Fim da Sessao | Tendencia |
|-----------|-----------------|---------------|-----------|
| Qualidade vocal percebida | `{{quality_pre}}` | `{{quality_post}}` | `{{quality_trend}}` |
| Esforco fonatoro (0-10) | `{{effort_pre}}` | `{{effort_post}}` | `{{effort_trend}}` |
| Tensao cervical (0-10) | `{{tension_pre}}` | `{{tension_post}}` | `{{tension_trend}}` |

---

## 9. Validacao

### Criterios de Validacao

- [ ] Todos os campos de identificacao preenchidos
- [ ] Diagnostico e status dos nodulos atualizados
- [ ] Pelo menos 1 objetivo especifico definido
- [ ] Protocolo de exercicios com duracao e parametros
- [ ] Cronograma totaliza duracao da sessao
- [ ] Precaucoes revisadas
- [ ] Exercicios domiciliares prescritos
- [ ] Notas de progressao registradas

---

> **Gerado pelo SpeechTherapy Squad — Synkra AIOX**
> Template: `session-plan-tmpl` v1.0
