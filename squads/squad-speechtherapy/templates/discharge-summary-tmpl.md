---
id: discharge-summary-tmpl
name: Sumario de Alta Fonoaudiologica
purpose: Documento de alta com resultados, plano de manutencao e criterios de retorno
executor: "@dev"
version: "1.0"
---

# Sumario de Alta — SpeechTherapy Squad

> **Template ID:** `discharge-summary-tmpl`
> **Version:** 1.0
> **Ultima atualizacao:** 2026-03-13
> **Uso:** Relatorio de alta fonoaudiologica ao termino ou suspensao do tratamento

---

## 1. Identificacao

| Campo | Valor |
|-------|-------|
| **Paciente** | `{{patient_name}}` |
| **ID Paciente** | `{{patient_id}}` |
| **Data de Nascimento** | `{{birth_date}}` |
| **Profissao** | `{{profession}}` |
| **Fonoaudiologa** | `{{therapist_name}}` |
| **CRFa** | `{{therapist_crfa}}` |
| **Data da Alta** | `{{discharge_date}}` |
| **Tipo de Alta** | `{{discharge_type}}` (Terapeutica / A pedido / Por abandono / Encaminhamento) |

---

## 2. Diagnostico de Admissao

| Campo | Valor |
|-------|-------|
| **Data de admissao** | `{{admission_date}}` |
| **Diagnostico inicial** | `{{initial_diagnosis}}` |
| **CID-10** | `{{icd_code}}` |
| **Severidade na admissao** | `{{initial_severity}}` (Leve / Moderado / Severo / Grave) |
| **Queixa principal** | `{{chief_complaint}}` |
| **Achados VLS iniciais** | `{{initial_vls_findings}}` |

---

## 3. Tratamento Realizado

### Resumo do Tratamento

| Parametro | Valor |
|-----------|-------|
| **Duracao total** | `{{treatment_duration_weeks}}` semanas |
| **Total de sessoes realizadas** | `{{total_sessions}}` |
| **Total de sessoes programadas** | `{{planned_sessions}}` |
| **Taxa de comparecimento** | `{{attendance_rate}}` % |
| **Sessoes canceladas/faltadas** | `{{missed_sessions}}` |
| **Frequencia media** | `{{avg_frequency}}` sessoes/semana |

### Fases Completadas

| Fase | Periodo | Sessoes | Status | Observacao |
|------|---------|---------|--------|------------|
| 1 — Conscientizacao | `{{phase1_period}}` | `{{phase1_sessions}}` | `{{phase1_status}}` | `{{phase1_note}}` |
| 2 — Reequilibrio | `{{phase2_period}}` | `{{phase2_sessions}}` | `{{phase2_status}}` | `{{phase2_note}}` |
| 3 — Fortalecimento | `{{phase3_period}}` | `{{phase3_sessions}}` | `{{phase3_status}}` | `{{phase3_note}}` |
| 4 — Generalizacao | `{{phase4_period}}` | `{{phase4_sessions}}` | `{{phase4_status}}` | `{{phase4_note}}` |

### Tecnicas Utilizadas

| Tecnica | Fase(s) | Resposta do Paciente |
|---------|---------|---------------------|
| SOVT (fonacao em canudo/tubo) | `{{sovt_phases}}` | `{{sovt_response}}` |
| VFE (Vocal Function Exercises) | `{{vfe_phases}}` | `{{vfe_response}}` |
| LMRVT (Terapia Manual Laringea) | `{{lmrvt_phases}}` | `{{lmrvt_response}}` |
| Higiene vocal | Todas | `{{hygiene_response}}` |
| `{{technique_extra_1}}` | `{{tech1_phases}}` | `{{tech1_response}}` |
| `{{technique_extra_2}}` | `{{tech2_phases}}` | `{{tech2_response}}` |

---

## 4. Resultados — Comparacao Pre vs Pos

### 4.1 Medidas Acusticas e Aerodinamicas

| Parametro | Pre-tratamento | Pos-tratamento | Delta | Referencia | Meta Atingida? |
|-----------|---------------|---------------|-------|-----------|----------------|
| TMF /a/ | `{{pre_tmf_a}}` s | `{{post_tmf_a}}` s | `{{delta_tmf_a}}` | >= 15 s | `{{met_tmf_a}}` |
| TMF /s/ | `{{pre_tmf_s}}` s | `{{post_tmf_s}}` s | `{{delta_tmf_s}}` | >= 15 s | `{{met_tmf_s}}` |
| TMF /z/ | `{{pre_tmf_z}}` s | `{{post_tmf_z}}` s | `{{delta_tmf_z}}` | >= 15 s | `{{met_tmf_z}}` |
| Relacao s/z | `{{pre_sz}}` | `{{post_sz}}` | `{{delta_sz}}` | 0.8-1.2 | `{{met_sz}}` |
| Jitter | `{{pre_jitter}}` % | `{{post_jitter}}` % | `{{delta_jitter}}` | < 1.04% | `{{met_jitter}}` |
| Shimmer | `{{pre_shimmer}}` % | `{{post_shimmer}}` % | `{{delta_shimmer}}` | < 3.81% | `{{met_shimmer}}` |
| HNR | `{{pre_hnr}}` dB | `{{post_hnr}}` dB | `{{delta_hnr}}` | > 20 dB | `{{met_hnr}}` |
| F0 media | `{{pre_f0}}` Hz | `{{post_f0}}` Hz | `{{delta_f0}}` | `{{f0_ref}}` | `{{met_f0}}` |
| Extensao vocal | `{{pre_range}}` st | `{{post_range}}` st | `{{delta_range}}` | `{{range_ref}}` | `{{met_range}}` |

### 4.2 Avaliacao Perceptivo-Auditiva (GRBAS)

| Parametro | Pre | Pos | Delta | Status |
|-----------|-----|-----|-------|--------|
| G (Grau geral) | `{{pre_g}}` | `{{post_g}}` | `{{delta_g}}` | `{{status_g}}` |
| R (Rugosidade) | `{{pre_r}}` | `{{post_r}}` | `{{delta_r}}` | `{{status_r}}` |
| B (Soprosidade) | `{{pre_b}}` | `{{post_b}}` | `{{delta_b}}` | `{{status_b}}` |
| A (Astenia) | `{{pre_a}}` | `{{post_a}}` | `{{delta_a}}` | `{{status_a}}` |
| S (Tensao) | `{{pre_s}}` | `{{post_s}}` | `{{delta_s}}` | `{{status_s}}` |

### 4.3 Voice Handicap Index (VHI-10)

| Periodo | Score | Classificacao |
|---------|-------|---------------|
| Pre-tratamento | `{{pre_vhi}}` / 40 | `{{pre_vhi_class}}` |
| Pos-tratamento | `{{post_vhi}}` / 40 | `{{post_vhi_class}}` |
| Delta | `{{delta_vhi}}` pontos | Reducao de `{{vhi_reduction_pct}}` % |

### 4.4 Status da Lesao (se aplicavel)

| Parametro | Admissao | Alta | Observacao |
|-----------|----------|------|------------|
| Lesao | `{{initial_lesion}}` | `{{final_lesion}}` | `{{lesion_note}}` |
| Tamanho | `{{initial_lesion_size}}` | `{{final_lesion_size}}` | `{{size_note}}` |
| Fechamento glotico | `{{initial_closure}}` | `{{final_closure}}` | `{{closure_note}}` |
| Onda mucosa | `{{initial_wave}}` | `{{final_wave}}` | `{{wave_note}}` |
| Ultima VLS | `{{last_vls_date}}` | — | `{{vls_note}}` |

### 4.5 Relato do Paciente na Alta

| Parametro | Score (0-10) | Comentario |
|-----------|-------------|------------|
| Satisfacao com resultado | `{{satisfaction_score}}` | `{{satisfaction_comment}}` |
| Facilidade para falar | `{{ease_score}}` | `{{ease_comment}}` |
| Capacidade de cantar | `{{singing_score}}` | `{{singing_comment}}` |
| Cansaco vocal | `{{fatigue_score}}` | `{{fatigue_comment}}` |

---

## 5. Resumo dos Objetivos

| Objetivo | Status | Observacao |
|----------|--------|------------|
| `{{objective_1}}` | `{{obj_1_status}}` (Atingido / Parcial / Nao atingido) | `{{obj_1_note}}` |
| `{{objective_2}}` | `{{obj_2_status}}` | `{{obj_2_note}}` |
| `{{objective_3}}` | `{{obj_3_status}}` | `{{obj_3_note}}` |
| `{{objective_4}}` | `{{obj_4_status}}` | `{{obj_4_note}}` |

**Taxa de objetivos atingidos:** `{{objectives_met_pct}}` %

---

## 6. Plano de Manutencao

### Programa de Exercicios Domiciliares (PED)

> Orientacoes para manutencao pos-alta. O paciente deve manter esta rotina por no minimo `{{maintenance_duration}}` meses.

| Exercicio | Frequencia | Duracao | Instrucoes |
|-----------|-----------|---------|------------|
| Aquecimento vocal (lip trill + glissandos) | `{{maint_warmup_freq}}` | `{{maint_warmup_dur}}` min | Antes de uso vocal intenso |
| Desaquecimento vocal (glissandos desc.) | `{{maint_cooldown_freq}}` | `{{maint_cooldown_dur}}` min | Apos uso vocal intenso |
| `{{maint_exercise_1}}` | `{{maint_freq_1}}` | `{{maint_dur_1}}` min | `{{maint_inst_1}}` |
| `{{maint_exercise_2}}` | `{{maint_freq_2}}` | `{{maint_dur_2}}` min | `{{maint_inst_2}}` |
| SOVT de manutencao (canudo/tubo) | `{{maint_sovt_freq}}` | `{{maint_sovt_dur}}` min | Intensidade leve-moderada |

### Orientacoes de Higiene Vocal (Permanentes)

- Hidratacao: minimo `{{water_intake}}` L/dia
- Evitar pigarrear — substitua por degluticao ou tosse silenciosa
- Evitar fala em ambientes ruidosos sem amplificacao
- Evitar sussurro prolongado (tao prejudicial quanto gritar)
- Respeitar limites de uso vocal: pausas de `{{rest_interval}}` min a cada `{{use_interval}}` min de fala continua
- `{{additional_hygiene_1}}`
- `{{additional_hygiene_2}}`

### Para Cantores

- Aquecimento vocal OBRIGATORIO antes de canto: minimo `{{singing_warmup}}` min
- Desaquecimento OBRIGATORIO apos canto: minimo `{{singing_cooldown}}` min
- Retorno gradual ao repertorio (ver Singer Readiness Assessment se aplicavel)
- Monitorar cansaco vocal; interromper se fadiga > 6/10
- `{{singer_specific_note}}`

---

## 7. Recomendacoes de Follow-up

### Agenda de Retorno

| Data | Tipo | Objetivo |
|------|------|----------|
| `{{followup_1_date}}` | Retorno fonoaudiologico | Verificar manutencao dos ganhos |
| `{{followup_2_date}}` | VLS de controle | Avaliar lesao / mucosa |
| `{{followup_3_date}}` | Retorno fonoaudiologico | Reavaliacao 3 meses pos-alta |
| `{{followup_4_date}}` | Retorno fonoaudiologico | Reavaliacao 6 meses pos-alta |

### Encaminhamentos

- [ ] Otorrinolaringologista: `{{ent_referral_reason}}`
- [ ] Professor de canto: `{{vocal_coach_reason}}`
- [ ] Fonoaudiologo especialista em canto: `{{singing_slp_reason}}`
- [ ] Gastroenterologista: `{{gastro_reason}}`
- [ ] Outro: `{{other_referral}}`

---

## 8. Criterios de Retorno ao Tratamento

> Procurar reavaliacao fonoaudiologica se apresentar qualquer das seguintes situacoes:

- [ ] Rouquidao persistente por mais de 2 semanas
- [ ] Perda de extensao vocal (agudos ou graves)
- [ ] Fadiga vocal progressiva ao longo do dia
- [ ] Dor ou desconforto ao falar ou cantar
- [ ] Quebras vocais recorrentes
- [ ] Piora do VHI-10 (score > `{{vhi_return_threshold}}`)
- [ ] Sensacao de corpo estranho na garganta
- [ ] Mudanca subita na qualidade vocal
- [ ] Dificuldade em manter a rotina de exercicios
- **Outro:** `{{custom_return_criterion}}`

---

## 9. Observacoes Finais da Terapeuta

```
{{therapist_final_notes}}
```

---

## 10. Validacao

### Criterios de Validacao

- [ ] Identificacao e tipo de alta preenchidos
- [ ] Diagnostico de admissao documentado
- [ ] Tratamento realizado com fases, sessoes e tecnicas
- [ ] Comparacao pre vs pos com medidas objetivas
- [ ] VHI-10 pre e pos registrados
- [ ] Status dos objetivos documentado
- [ ] Plano de manutencao com exercicios domiciliares
- [ ] Agenda de follow-up definida
- [ ] Criterios de retorno claros para o paciente
- [ ] Assinatura/observacoes da terapeuta

---

## 11. Assinaturas

| Papel | Nome | Registro | Data |
|-------|------|----------|------|
| Fonoaudiologa | `{{therapist_name}}` | CRFa `{{therapist_crfa}}` | `{{discharge_date}}` |
| Paciente | `{{patient_name}}` | — | `{{discharge_date}}` |

---

> **Gerado pelo SpeechTherapy Squad — Synkra AIOX**
> Template: `discharge-summary-tmpl` v1.0
