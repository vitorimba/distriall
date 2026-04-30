---
id: progress-report-tmpl
name: Relatorio de Progresso Vocal
purpose: Relatorio semanal/quinzenal de evolucao do tratamento fonoaudiologico
executor: "@dev"
version: "1.0"
---

# Relatorio de Progresso — SpeechTherapy Squad

> **Template ID:** `progress-report-tmpl`
> **Version:** 1.0
> **Ultima atualizacao:** 2026-03-13
> **Uso:** Relatorio periodico de evolucao do paciente em reabilitacao vocal

---

## 1. Header — Informacoes do Relatorio

| Campo | Valor |
|-------|-------|
| **Nome do Paciente** | `{{patient_name}}` |
| **ID Paciente** | `{{patient_id}}` |
| **Fonoaudiologa Responsavel** | `{{therapist_name}}` |
| **CRFa** | `{{therapist_crfa}}` |
| **Tipo de Relatorio** | `{{report_type}}` (Semanal / Quinzenal / Mensal) |
| **Periodo** | `{{period_start}}` a `{{period_end}}` |
| **Sessao Atual** | `{{current_session}}` / `{{total_planned_sessions}}` |
| **Fase do Tratamento** | `{{treatment_phase}}` |
| **Diagnostico** | `{{diagnosis}}` |
| **Status Geral** | `{{overall_status}}` (Evoluindo / Estavel / Atencao / Critico) |

---

## 2. Resumo Executivo

### Destaques do Periodo

- `{{highlight_1}}`
- `{{highlight_2}}`
- `{{highlight_3}}`

### Alertas

- `{{alert_1}}`
- `{{alert_2}}`

### Recomendacao Principal

> `{{main_recommendation}}`

---

## 3. Medidas Objetivas — Avaliacao Acustica e Aerodinamica

### 3.1 Tempo Maximo de Fonacao (TMF)

| Vogal/Consoante | Baseline | Periodo Anterior | Periodo Atual | Delta | Meta | Status |
|-----------------|----------|-----------------|---------------|-------|------|--------|
| /a/ sustentado | `{{tmf_a_baseline}}` s | `{{tmf_a_prev}}` s | `{{tmf_a_curr}}` s | `{{tmf_a_delta}}` | >= 15s | `{{tmf_a_status}}` |
| /i/ sustentado | `{{tmf_i_baseline}}` s | `{{tmf_i_prev}}` s | `{{tmf_i_curr}}` s | `{{tmf_i_delta}}` | >= 15s | `{{tmf_i_status}}` |
| /s/ sustentado | `{{tmf_s_baseline}}` s | `{{tmf_s_prev}}` s | `{{tmf_s_curr}}` s | `{{tmf_s_delta}}` | >= 15s | `{{tmf_s_status}}` |
| /z/ sustentado | `{{tmf_z_baseline}}` s | `{{tmf_z_prev}}` s | `{{tmf_z_curr}}` s | `{{tmf_z_delta}}` | >= 15s | `{{tmf_z_status}}` |

### 3.2 Relacao s/z

| Periodo | Valor | Interpretacao |
|---------|-------|---------------|
| Baseline | `{{sz_baseline}}` | `{{sz_baseline_interp}}` |
| Anterior | `{{sz_prev}}` | `{{sz_prev_interp}}` |
| Atual | `{{sz_curr}}` | `{{sz_curr_interp}}` |

> **Referencia:** s/z = 0.8-1.2 (normal); > 1.2 (sugestivo de lesao de massa); < 0.8 (hipercinesia)

### 3.3 Analise Acustica (Medidas de Perturbacao)

| Parametro | Baseline | Anterior | Atual | Referencia Normal | Status |
|-----------|----------|----------|-------|-------------------|--------|
| Jitter (%) | `{{jitter_baseline}}` | `{{jitter_prev}}` | `{{jitter_curr}}` | < 1.04% | `{{jitter_status}}` |
| Shimmer (%) | `{{shimmer_baseline}}` | `{{shimmer_prev}}` | `{{shimmer_curr}}` | < 3.81% | `{{shimmer_status}}` |
| HNR (dB) | `{{hnr_baseline}}` | `{{hnr_prev}}` | `{{hnr_curr}}` | > 20 dB | `{{hnr_status}}` |
| F0 media (Hz) | `{{f0_baseline}}` | `{{f0_prev}}` | `{{f0_curr}}` | `{{f0_reference}}` | `{{f0_status}}` |
| F0 range (semitons) | `{{f0_range_baseline}}` | `{{f0_range_prev}}` | `{{f0_range_curr}}` | `{{f0_range_ref}}` | `{{f0_range_status}}` |

### 3.4 Voice Handicap Index (VHI-10)

| Periodo | Score Total | Classificacao |
|---------|------------ |---------------|
| Baseline | `{{vhi_baseline}}` / 40 | `{{vhi_baseline_class}}` |
| Anterior | `{{vhi_prev}}` / 40 | `{{vhi_prev_class}}` |
| Atual | `{{vhi_curr}}` / 40 | `{{vhi_curr_class}}` |
| Delta total | `{{vhi_delta}}` pontos | `{{vhi_trend}}` |

> **Classificacao VHI-10:** 0-7 (Sem handicap), 8-14 (Leve), 15-22 (Moderado), 23-30 (Severo), 31-40 (Grave)

---

## 4. Avaliacao Perceptivo-Auditiva

### 4.1 Escala GRBAS

| Parametro | Baseline | Anterior | Atual | Tendencia |
|-----------|----------|----------|-------|-----------|
| **G** (Grade/Grau geral) | `{{g_baseline}}` | `{{g_prev}}` | `{{g_curr}}` | `{{g_trend}}` |
| **R** (Roughness/Rugosidade) | `{{r_baseline}}` | `{{r_prev}}` | `{{r_curr}}` | `{{r_trend}}` |
| **B** (Breathiness/Soprosidade) | `{{b_baseline}}` | `{{b_prev}}` | `{{b_curr}}` | `{{b_trend}}` |
| **A** (Asthenicity/Astenia) | `{{a_baseline}}` | `{{a_prev}}` | `{{a_curr}}` | `{{a_trend}}` |
| **S** (Strain/Tensao) | `{{s_baseline}}` | `{{s_prev}}` | `{{s_curr}}` | `{{s_trend}}` |

> **Escala GRBAS:** 0 (Normal), 1 (Leve), 2 (Moderado), 3 (Severo)

### 4.2 CAPE-V (Consensus Auditory-Perceptual Evaluation of Voice)

| Parametro | Score (0-100mm) | Consistencia | Observacao |
|-----------|----------------|-------------|------------|
| Severidade geral | `{{capev_severity}}` | `{{capev_sev_consistency}}` | `{{capev_sev_note}}` |
| Rugosidade | `{{capev_roughness}}` | `{{capev_rough_consistency}}` | `{{capev_rough_note}}` |
| Soprosidade | `{{capev_breathiness}}` | `{{capev_breath_consistency}}` | `{{capev_breath_note}}` |
| Tensao | `{{capev_strain}}` | `{{capev_strain_consistency}}` | `{{capev_strain_note}}` |
| Pitch | `{{capev_pitch}}` | `{{capev_pitch_consistency}}` | `{{capev_pitch_note}}` |
| Loudness | `{{capev_loudness}}` | `{{capev_loud_consistency}}` | `{{capev_loud_note}}` |

---

## 5. Status dos Nodulos / Lesao

| Parametro | Valor Atual | Anterior | Observacao |
|-----------|------------|----------|------------|
| **Localizacao** | `{{nodule_location}}` | — | `{{nodule_loc_note}}` |
| **Tamanho estimado** | `{{nodule_size_curr}}` | `{{nodule_size_prev}}` | `{{nodule_size_note}}` |
| **Vascularizacao** | `{{nodule_vasc_curr}}` | `{{nodule_vasc_prev}}` | `{{nodule_vasc_note}}` |
| **Fechamento glotico** | `{{glottic_closure_curr}}` | `{{glottic_closure_prev}}` | `{{glottic_closure_note}}` |
| **Onda mucosa** | `{{mucosal_wave_curr}}` | `{{mucosal_wave_prev}}` | `{{mucosal_wave_note}}` |
| **Ultima videolaringoscopia** | `{{last_vls_date}}` | — | `{{vls_note}}` |

---

## 6. Relato Subjetivo do Paciente

### Autoavaliacao

| Parametro | Score (0-10) | Comentario |
|-----------|-------------|------------|
| Facilidade para falar | `{{subj_ease}}` | `{{subj_ease_comment}}` |
| Cansaco vocal no fim do dia | `{{subj_fatigue}}` | `{{subj_fatigue_comment}}` |
| Dor/desconforto ao falar | `{{subj_pain}}` | `{{subj_pain_comment}}` |
| Satisfacao com a voz | `{{subj_satisfaction}}` | `{{subj_satisfaction_comment}}` |
| Capacidade de cantar | `{{subj_singing}}` | `{{subj_singing_comment}}` |

### Queixas Atuais

> `{{current_complaints}}`

---

## 7. Adesao ao Tratamento

### Compliance de Exercicios

| Exercicio Domiciliar | Prescrito | Realizado | Adesao (%) |
|---------------------|----------|-----------|------------|
| `{{hw_exercise_1}}` | `{{hw_1_prescribed}}` x/dia | `{{hw_1_actual}}` x/dia | `{{hw_1_compliance}}` % |
| `{{hw_exercise_2}}` | `{{hw_2_prescribed}}` x/dia | `{{hw_2_actual}}` x/dia | `{{hw_2_compliance}}` % |
| `{{hw_exercise_3}}` | `{{hw_3_prescribed}}` x/dia | `{{hw_3_actual}}` x/dia | `{{hw_3_compliance}}` % |
| **Media geral** | — | — | **`{{overall_compliance}}`** % |

### Adesao a Higiene Vocal

| Habito | Meta | Auto-relato | Status |
|--------|------|-------------|--------|
| Hidratacao (L/dia) | `{{water_target}}` | `{{water_actual}}` | `{{water_status}}` |
| Repouso vocal pos-uso | `{{rest_target}}` min | `{{rest_actual}}` min | `{{rest_status}}` |
| Evitar pigarrear | Sempre | `{{throat_clear_status}}` | `{{throat_clear_eval}}` |
| Evitar falar em ambiente ruidoso | Sempre | `{{noise_status}}` | `{{noise_eval}}` |

---

## 8. Modificacoes no Tratamento

### Ajustes Realizados

| Ajuste | Detalhe | Motivo | Data |
|--------|---------|--------|------|
| `{{adjustment_1}}` | `{{adj_1_detail}}` | `{{adj_1_reason}}` | `{{adj_1_date}}` |
| `{{adjustment_2}}` | `{{adj_2_detail}}` | `{{adj_2_reason}}` | `{{adj_2_date}}` |

### Ajustes Planejados

| Ajuste | Detalhe | Condicao para Ativacao |
|--------|---------|----------------------|
| `{{planned_adj_1}}` | `{{planned_detail_1}}` | `{{planned_condition_1}}` |
| `{{planned_adj_2}}` | `{{planned_detail_2}}` | `{{planned_condition_2}}` |

---

## 9. Proximos Passos

### Metas para o Proximo Periodo

| Meta | Indicador | Target | Prazo |
|------|-----------|--------|-------|
| `{{next_goal_1}}` | `{{next_indicator_1}}` | `{{next_target_1}}` | `{{next_deadline_1}}` |
| `{{next_goal_2}}` | `{{next_indicator_2}}` | `{{next_target_2}}` | `{{next_deadline_2}}` |
| `{{next_goal_3}}` | `{{next_indicator_3}}` | `{{next_target_3}}` | `{{next_deadline_3}}` |

### Encaminhamentos Necessarios

- [ ] Otorrinolaringologista — `{{ent_reason}}`
- [ ] Videolaringoscopia de controle — `{{vls_reason}}`
- [ ] Avaliacao de canto — `{{singing_eval_reason}}`
- [ ] Outro: `{{other_referral}}`

---

## 10. Validacao

### Criterios de Validacao

- [ ] Dados de identificacao completos
- [ ] Pelo menos 1 medida objetiva atualizada (TMF, acustica ou VHI)
- [ ] Avaliacao perceptivo-auditiva registrada (GRBAS ou CAPE-V)
- [ ] Relato subjetivo do paciente documentado
- [ ] Adesao ao tratamento avaliada
- [ ] Proximos passos definidos com metas mensuráveis
- [ ] Status dos nodulos atualizado (quando aplicavel)
- [ ] Encaminhamentos registrados se necessarios

---

## 11. Historico de Versoes

| Versao | Data | Tipo | Terapeuta |
|--------|------|------|-----------|
| 1.0 | `{{report_date}}` | `{{report_type}}` | `{{therapist_name}}` |

---

> **Gerado pelo SpeechTherapy Squad — Synkra AIOX**
> Template: `progress-report-tmpl` v1.0
