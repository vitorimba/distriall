---
id: clinical-case-summary-tmpl
name: Resumo de Caso Clinico
purpose: Sumario de caso clinico para prontuario e registros fonoaudiologicos
executor: "@dev"
version: "1.0"
---

# Resumo de Caso Clinico — SpeechTherapy Squad

> **Template ID:** `clinical-case-summary-tmpl`
> **Version:** 1.0
> **Ultima atualizacao:** 2026-03-13
> **Uso:** Registro clinico completo de caso fonoaudiologico vocal

---

## 1. Dados Demograficos

| Campo | Valor |
|-------|-------|
| **Nome** | `{{patient_name}}` |
| **ID Paciente** | `{{patient_id}}` |
| **Data de Nascimento** | `{{birth_date}}` |
| **Idade** | `{{age}}` anos |
| **Sexo** | `{{sex}}` |
| **Profissao** | `{{profession}}` |
| **Classificacao vocal profissional** | `{{vocal_classification}}` (Nivel I-IV Koufman) |
| **Cidade/UF** | `{{city_state}}` |
| **Telefone** | `{{phone}}` |
| **Email** | `{{email}}` |
| **Medico solicitante** | `{{referring_physician}}` |
| **Data da avaliacao** | `{{evaluation_date}}` |
| **Fonoaudiologa** | `{{therapist_name}}` |
| **CRFa** | `{{therapist_crfa}}` |

---

## 2. Queixa Principal

> `{{chief_complaint}}`

**Inicio dos sintomas:** `{{symptom_onset}}`
**Modo de instalacao:** `{{onset_mode}}` (Subito / Gradual / Intermitente)
**Fatores de piora:** `{{aggravating_factors}}`
**Fatores de melhora:** `{{relieving_factors}}`
**Impacto na vida diaria:** `{{daily_impact}}`
**Impacto profissional:** `{{professional_impact}}`

---

## 3. Historia Clinica

### 3.1 Historia do Uso Vocal

| Aspecto | Detalhes |
|---------|----------|
| **Demanda vocal profissional** | `{{professional_vocal_demand}}` h/dia |
| **Demanda vocal social** | `{{social_vocal_demand}}` |
| **Ambientes ruidosos** | `{{noisy_environments}}` |
| **Fala ao telefone** | `{{phone_use}}` h/dia |
| **Grita/fala alto** | `{{shouting_frequency}}` |
| **Pigarreia** | `{{throat_clearing}}` (Frequente / Ocasional / Raro / Nunca) |
| **Sussurra** | `{{whispering}}` |
| **Competicao sonora** | `{{sound_competition}}` |

### 3.2 Historia de Canto

| Aspecto | Detalhes |
|---------|----------|
| **Canta** | `{{sings}}` (Sim / Nao) |
| **Tipo** | `{{singing_type}}` (Profissional / Amador / Igreja / Coral / Solo) |
| **Genero musical** | `{{music_genre}}` |
| **Classificacao vocal** | `{{voice_type}}` (Soprano / Mezzo / Contralto / Tenor / Baritono / Baixo) |
| **Tempo de pratica** | `{{singing_experience}}` anos |
| **Estudo tecnico de canto** | `{{vocal_training}}` (Sim / Nao — duracao: `{{training_duration}}`) |
| **Frequencia de ensaios** | `{{rehearsal_frequency}}` h/semana |
| **Frequencia de shows/apresentacoes** | `{{performance_frequency}}` |
| **Amplificacao (retorno/PA)** | `{{amplification}}` |

### 3.3 Historia Medica

| Condicao | Status | Tratamento | Impacto na Voz |
|----------|--------|-----------|----------------|
| Refluxo (DRGE/RLF) | `{{reflux_status}}` | `{{reflux_treatment}}` | `{{reflux_impact}}` |
| Alergias/Rinite | `{{allergy_status}}` | `{{allergy_treatment}}` | `{{allergy_impact}}` |
| Asma/DPOC | `{{respiratory_status}}` | `{{respiratory_treatment}}` | `{{respiratory_impact}}` |
| Hipotireoidismo | `{{thyroid_status}}` | `{{thyroid_treatment}}` | `{{thyroid_impact}}` |
| Alteracoes hormonais | `{{hormonal_status}}` | `{{hormonal_treatment}}` | `{{hormonal_impact}}` |
| Cirurgias previas (laringeas) | `{{prior_surgeries}}` | — | `{{surgery_impact}}` |
| Intubacao previa | `{{intubation_history}}` | — | `{{intubation_impact}}` |
| Problemas auditivos | `{{hearing_status}}` | `{{hearing_treatment}}` | `{{hearing_impact}}` |
| Depressao/Ansiedade | `{{mental_health}}` | `{{mh_treatment}}` | `{{mh_impact}}` |

### 3.4 Habitos

| Habito | Detalhes |
|--------|----------|
| **Tabagismo** | `{{smoking}}` (Nunca / Ex — parou em: `{{quit_date}}` / Atual — `{{cigarettes_day}}` cig/dia) |
| **Etilismo** | `{{alcohol}}` (Nunca / Social / Frequente — `{{drinks_week}}` doses/sem) |
| **Hidratacao** | `{{water_intake}}` L/dia |
| **Cafeina** | `{{caffeine}}` xicaras/dia |
| **Sono** | `{{sleep_hours}}` h/noite; qualidade: `{{sleep_quality}}` |
| **Exercicio fisico** | `{{exercise}}` |
| **Ar condicionado** | `{{ac_exposure}}` h/dia |

---

## 4. Resultados da Avaliacao

### 4.1 Avaliacao Perceptivo-Auditiva

**GRBAS:**

| G | R | B | A | S |
|---|---|---|---|---|
| `{{eval_g}}` | `{{eval_r}}` | `{{eval_b}}` | `{{eval_a}}` | `{{eval_s}}` |

**CAPE-V:**

| Parametro | Score (0-100) | Consistencia |
|-----------|--------------|-------------|
| Severidade geral | `{{capev_severity}}` | `{{capev_sev_cons}}` |
| Rugosidade | `{{capev_rough}}` | `{{capev_rough_cons}}` |
| Soprosidade | `{{capev_breath}}` | `{{capev_breath_cons}}` |
| Tensao | `{{capev_strain}}` | `{{capev_strain_cons}}` |
| Pitch | `{{capev_pitch}}` | `{{capev_pitch_cons}}` |
| Loudness | `{{capev_loud}}` | `{{capev_loud_cons}}` |

**Tipo de voz predominante:** `{{voice_type_description}}`

### 4.2 Avaliacao Acustica

| Parametro | Valor | Referencia | Status |
|-----------|-------|-----------|--------|
| F0 media | `{{f0}}` Hz | `{{f0_ref}}` | `{{f0_status}}` |
| Jitter | `{{jitter}}` % | < 1.04% | `{{jitter_status}}` |
| Shimmer | `{{shimmer}}` % | < 3.81% | `{{shimmer_status}}` |
| HNR | `{{hnr}}` dB | > 20 dB | `{{hnr_status}}` |
| Extensao vocal | `{{pitch_range}}` | `{{range_ref}}` | `{{range_status}}` |
| Intensidade habitual | `{{habitual_intensity}}` dB | 65-75 dB | `{{intensity_status}}` |

### 4.3 Avaliacao Aerodinamica

| Parametro | Valor | Referencia | Status |
|-----------|-------|-----------|--------|
| TMF /a/ | `{{tmf_a}}` s | >= 15 s | `{{tmf_a_status}}` |
| TMF /s/ | `{{tmf_s}}` s | >= 15 s | `{{tmf_s_status}}` |
| TMF /z/ | `{{tmf_z}}` s | >= 15 s | `{{tmf_z_status}}` |
| Relacao s/z | `{{sz_ratio}}` | 0.8-1.2 | `{{sz_status}}` |
| Contagem maxima (numeros) | `{{counting_max}}` | `{{counting_ref}}` | `{{counting_status}}` |

### 4.4 Avaliacao Musculoesqueletica

| Estrutura | Tensao (0-3) | Dor | Observacao |
|-----------|-------------|-----|------------|
| Musculatura cervical | `{{tension_cervical}}` | `{{pain_cervical}}` | `{{note_cervical}}` |
| Musculatura suprahioidea | `{{tension_suprahyoid}}` | `{{pain_suprahyoid}}` | `{{note_suprahyoid}}` |
| Musculatura infrahioidea | `{{tension_infrahyoid}}` | `{{pain_infrahyoid}}` | `{{note_infrahyoid}}` |
| Laringe — posicao | `{{larynx_position}}` | — | `{{larynx_note}}` |
| Laringe — mobilidade | `{{larynx_mobility}}` | — | `{{mobility_note}}` |
| ATM | `{{tension_tmj}}` | `{{pain_tmj}}` | `{{note_tmj}}` |

### 4.5 VHI-10

**Score total:** `{{vhi_score}}` / 40
**Classificacao:** `{{vhi_classification}}`

### 4.6 Videolaringoscopia / Estroboscopia

**Data:** `{{vls_date}}`
**Examinador:** `{{vls_examiner}}`

**Achados:**
> `{{vls_findings}}`

---

## 5. Diagnostico Fonoaudiologico

> `{{speech_therapy_diagnosis}}`

**CID-10:** `{{icd_code}}`

**Resumo dos achados principais:**
1. `{{finding_1}}`
2. `{{finding_2}}`
3. `{{finding_3}}`

---

## 6. Plano Terapeutico

### Objetivos

| Prazo | Objetivo | Indicador | Meta |
|-------|----------|-----------|------|
| Curto (4 sem) | `{{plan_short_goal}}` | `{{plan_short_ind}}` | `{{plan_short_target}}` |
| Medio (8 sem) | `{{plan_mid_goal}}` | `{{plan_mid_ind}}` | `{{plan_mid_target}}` |
| Longo (12 sem) | `{{plan_long_goal}}` | `{{plan_long_ind}}` | `{{plan_long_target}}` |

### Abordagem Terapeutica

| Tecnica | Justificativa | Fase |
|---------|---------------|------|
| `{{technique_1}}` | `{{justification_1}}` | `{{technique_1_phase}}` |
| `{{technique_2}}` | `{{justification_2}}` | `{{technique_2_phase}}` |
| `{{technique_3}}` | `{{justification_3}}` | `{{technique_3_phase}}` |
| `{{technique_4}}` | `{{justification_4}}` | `{{technique_4_phase}}` |

### Frequencia e Duracao

- **Frequencia:** `{{session_frequency}}` sessoes/semana
- **Duracao da sessao:** `{{session_duration}}` minutos
- **Duracao estimada do tratamento:** `{{treatment_duration}}` semanas
- **Reavaliacao programada:** a cada `{{reassessment_interval}}` semanas

---

## 7. Prognostico

**Prognostico:** `{{prognosis}}` (Favoravel / Reservado / Desfavoravel)

**Fatores favoraveis:**
- `{{favorable_factor_1}}`
- `{{favorable_factor_2}}`

**Fatores desfavoraveis:**
- `{{unfavorable_factor_1}}`
- `{{unfavorable_factor_2}}`

---

## 8. Agenda de Acompanhamento

| Data | Tipo | Objetivo |
|------|------|----------|
| `{{followup_1_date}}` | `{{followup_1_type}}` | `{{followup_1_objective}}` |
| `{{followup_2_date}}` | `{{followup_2_type}}` | `{{followup_2_objective}}` |
| `{{followup_3_date}}` | `{{followup_3_type}}` | `{{followup_3_objective}}` |
| `{{followup_4_date}}` | VLS controle | Reavaliar lesao / fechamento glotico |

---

## 9. Validacao

### Criterios de Validacao

- [ ] Dados demograficos completos
- [ ] Queixa principal com historico temporal
- [ ] Historia vocal, de canto e medica documentadas
- [ ] Avaliacao perceptivo-auditiva (GRBAS e/ou CAPE-V) registrada
- [ ] Medidas acusticas e aerodinamicas coletadas
- [ ] VHI-10 aplicado
- [ ] Exame laringologico referenciado
- [ ] Diagnostico fonoaudiologico formulado com CID-10
- [ ] Plano terapeutico com objetivos SMART
- [ ] Prognostico justificado

---

> **Gerado pelo SpeechTherapy Squad — Synkra AIOX**
> Template: `clinical-case-summary-tmpl` v1.0
