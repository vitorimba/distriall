---
id: rehabilitation-protocol-tmpl
name: Protocolo de Reabilitacao Vocal
purpose: Documento completo do protocolo de reabilitacao vocal com plano de fases
executor: "@dev"
version: "1.0"
---

# Protocolo de Reabilitacao Vocal — SpeechTherapy Squad

> **Template ID:** `rehabilitation-protocol-tmpl`
> **Version:** 1.0
> **Ultima atualizacao:** 2026-03-13
> **Uso:** Protocolo completo de reabilitacao vocal para planejamento de tratamento

---

## 1. Identificacao

| Campo | Valor |
|-------|-------|
| **Paciente** | `{{patient_name}}` |
| **ID Paciente** | `{{patient_id}}` |
| **Data de Nascimento** | `{{birth_date}}` |
| **Fonoaudiologa** | `{{therapist_name}}` |
| **CRFa** | `{{therapist_crfa}}` |
| **Data de Inicio** | `{{protocol_start_date}}` |
| **Previsao de Termino** | `{{protocol_end_date}}` |
| **Duracao Total** | `{{total_weeks}}` semanas |
| **Frequencia** | `{{session_frequency}}` sessoes/semana |

---

## 2. Resumo Diagnostico

### Diagnostico Laringologico

| Campo | Valor |
|-------|-------|
| **CID-10** | `{{icd_code}}` |
| **Diagnostico** | `{{diagnosis}}` |
| **Etiologia** | `{{etiology}}` (Funcional / Organica / Organico-funcional) |
| **Lateralidade da lesao** | `{{lesion_laterality}}` (Unilateral D / Unilateral E / Bilateral) |
| **Tipo de lesao** | `{{lesion_type}}` (Nodulo / Polipo / Edema de Reinke / Cisto / Sulco / Outro) |
| **Tamanho da lesao** | `{{lesion_size}}` |
| **Fechamento glotico** | `{{glottic_closure}}` |
| **Onda mucosa** | `{{mucosal_wave}}` |
| **Medico solicitante** | `{{referring_physician}}` |
| **Data do exame** | `{{exam_date}}` |

### Classificacao de Severidade

| Dimensao | Score (1-4) | Descricao |
|----------|-------------|-----------|
| Impacto funcional | `{{severity_functional}}` | `{{severity_func_desc}}` |
| Grau da disfonia (GRBAS-G) | `{{severity_dysphonia}}` | `{{severity_dysp_desc}}` |
| Comprometimento aerodinamico | `{{severity_aero}}` | `{{severity_aero_desc}}` |
| Impacto profissional | `{{severity_professional}}` | `{{severity_prof_desc}}` |
| **Score Total** | **`{{severity_total}}`** / 16 | **`{{severity_classification}}`** |

> **Classificacao:** 4-6 (Leve), 7-10 (Moderado), 11-13 (Severo), 14-16 (Grave)

---

## 3. Fatores Contribuintes

### Uso Vocal

| Fator | Status | Detalhes |
|-------|--------|----------|
| Demanda vocal profissional | `{{vocal_demand}}` (Alta / Media / Baixa) | `{{vocal_demand_detail}}` |
| Cantor(a) | `{{is_singer}}` (Sim / Nao) | Genero: `{{singing_genre}}`, Freq: `{{singing_frequency}}` |
| Professor(a) | `{{is_teacher}}` (Sim / Nao) | Carga: `{{teaching_hours}}` h/sem |
| Abuso/mau uso vocal | `{{vocal_abuse}}` | `{{abuse_behaviors}}` |

### Fatores Medicos

| Fator | Status | Tratamento |
|-------|--------|-----------|
| Refluxo laringofaringeo (RLF) | `{{rlf_status}}` | `{{rlf_treatment}}` |
| Alergias respiratorias | `{{allergy_status}}` | `{{allergy_treatment}}` |
| Medicacoes em uso | `{{medications}}` | `{{med_impact_voice}}` |
| Hidratacao diaria | `{{hydration_level}}` | — |
| Tabagismo | `{{smoking_status}}` | `{{smoking_detail}}` |
| Etilismo | `{{alcohol_status}}` | `{{alcohol_detail}}` |

---

## 4. Medidas Basais (Baseline)

### Medidas Acusticas e Aerodinamicas

| Parametro | Valor Basal | Referencia Normal | Gap |
|-----------|------------|-------------------|-----|
| TMF /a/ | `{{baseline_tmf_a}}` s | >= 15 s | `{{gap_tmf_a}}` |
| TMF /s/ | `{{baseline_tmf_s}}` s | >= 15 s | `{{gap_tmf_s}}` |
| TMF /z/ | `{{baseline_tmf_z}}` s | >= 15 s | `{{gap_tmf_z}}` |
| Relacao s/z | `{{baseline_sz}}` | 0.8-1.2 | `{{gap_sz}}` |
| Jitter | `{{baseline_jitter}}` % | < 1.04% | `{{gap_jitter}}` |
| Shimmer | `{{baseline_shimmer}}` % | < 3.81% | `{{gap_shimmer}}` |
| HNR | `{{baseline_hnr}}` dB | > 20 dB | `{{gap_hnr}}` |
| F0 media | `{{baseline_f0}}` Hz | `{{f0_reference}}` Hz | `{{gap_f0}}` |
| VHI-10 | `{{baseline_vhi}}` / 40 | 0-7 | `{{gap_vhi}}` |

### GRBAS Basal

| G | R | B | A | S |
|---|---|---|---|---|
| `{{baseline_g}}` | `{{baseline_r}}` | `{{baseline_b}}` | `{{baseline_a}}` | `{{baseline_s}}` |

---

## 5. Objetivos Terapeuticos

### Curto Prazo (Semanas 1-4)

| # | Objetivo | Indicador | Meta | Prioridade |
|---|----------|-----------|------|------------|
| 1 | `{{short_goal_1}}` | `{{short_ind_1}}` | `{{short_target_1}}` | `{{short_priority_1}}` |
| 2 | `{{short_goal_2}}` | `{{short_ind_2}}` | `{{short_target_2}}` | `{{short_priority_2}}` |
| 3 | `{{short_goal_3}}` | `{{short_ind_3}}` | `{{short_target_3}}` | `{{short_priority_3}}` |

### Medio Prazo (Semanas 5-8)

| # | Objetivo | Indicador | Meta | Prioridade |
|---|----------|-----------|------|------------|
| 1 | `{{mid_goal_1}}` | `{{mid_ind_1}}` | `{{mid_target_1}}` | `{{mid_priority_1}}` |
| 2 | `{{mid_goal_2}}` | `{{mid_ind_2}}` | `{{mid_target_2}}` | `{{mid_priority_2}}` |
| 3 | `{{mid_goal_3}}` | `{{mid_ind_3}}` | `{{mid_target_3}}` | `{{mid_priority_3}}` |

### Longo Prazo (Semanas 9-12)

| # | Objetivo | Indicador | Meta | Prioridade |
|---|----------|-----------|------|------------|
| 1 | `{{long_goal_1}}` | `{{long_ind_1}}` | `{{long_target_1}}` | `{{long_priority_1}}` |
| 2 | `{{long_goal_2}}` | `{{long_ind_2}}` | `{{long_target_2}}` | `{{long_priority_2}}` |
| 3 | `{{long_goal_3}}` | `{{long_ind_3}}` | `{{long_target_3}}` | `{{long_priority_3}}` |

---

## 6. Plano de Fases (12 Semanas)

### Fase 1 — Conscientizacao e Reducao de Comportamentos Abusivos (Semanas 1-3)

**Foco:** Higiene vocal, propriocepcao, reducao de tensao

| Componente | Exercicio | Frequencia | Duracao | Intensidade |
|------------|-----------|-----------|---------|-------------|
| Higiene vocal | Orientacao e automonitoramento | Continuo | — | — |
| SOVT basico | Fonacao em canudo (5mm) | 3x/dia | 5 min | Confortavel |
| Respiracao | Respiracao costodiafragmatica | 3x/dia | 5 min | Leve |
| LMRVT | Massagem laringea descend. | Em sessao | 10 min | Leve-moderada |
| Hidratacao | `{{phase1_hydration}}` L/dia | Continuo | — | — |

**Marco esperado:** Reducao de comportamentos abusivos; paciente identifica tensoes

### Fase 2 — Reequilibrio Fonatoro (Semanas 4-6)

**Foco:** Coordenacao pneumofonoarticulatoria, flexibilidade vocal

| Componente | Exercicio | Frequencia | Duracao | Intensidade |
|------------|-----------|-----------|---------|-------------|
| SOVT intermediario | Fonacao em tubo (3cm agua) | 3x/dia | 5 min | Moderada |
| VFE | Protocolo Stemple completo | 2x/dia | 7 min | Moderada |
| Coordenacao | Fala encadeada com SOVT | Em sessao | 10 min | Moderada |
| LMRVT | Reposicionamento + fonacao | Em sessao | 10 min | Moderada |
| Transferencia | Exercicios em contexto de fala | 1x/dia | 5 min | Moderada |

**Marco esperado:** TMF >= 12s; reducao de 1 ponto no GRBAS-G; s/z aproximando-se de 1.0

### Fase 3 — Fortalecimento e Resistencia (Semanas 7-9)

**Foco:** Resistencia vocal, projecao, generalizacao

| Componente | Exercicio | Frequencia | Duracao | Intensidade |
|------------|-----------|-----------|---------|-------------|
| SOVT avancado | Fonacao em tubo (5cm agua) + glissandos | 2x/dia | 5 min | Moderada-alta |
| VFE | Protocolo completo + variacao de pitch | 2x/dia | 7 min | Moderada-alta |
| Resistencia | Leitura em voz alta (progressiva) | 1x/dia | 10-15 min | Moderada |
| Projecao | Exercicios de projecao controlada | Em sessao | 10 min | Moderada-alta |
| `{{phase3_specific}}` | `{{phase3_specific_detail}}` | `{{phase3_freq}}` | `{{phase3_dur}}` | `{{phase3_int}}` |

**Marco esperado:** TMF >= 15s; VHI reduzido >= 50% do baseline; voz funcional para demanda

### Fase 4 — Generalizacao e Alta (Semanas 10-12)

**Foco:** Autonomia, manutencao, retorno a atividades vocais plenas

| Componente | Exercicio | Frequencia | Duracao | Intensidade |
|------------|-----------|-----------|---------|-------------|
| Manutencao | Rotina de aquecimento/desaquecimento | 1x/dia | 5 min | Leve-moderada |
| Generalizacao | Atividades vocais reais (aula, canto, etc.) | Conforme demanda | Progressivo | Variavel |
| Automonitoramento | Diario vocal + checklist | Diario | 2 min | — |
| `{{phase4_singing}}` | `{{phase4_singing_detail}}` | `{{phase4_sing_freq}}` | `{{phase4_sing_dur}}` | Progressiva |

**Marco esperado:** Medidas dentro da normalidade; VHI < 8; GRBAS-G <= 1; paciente autonomo

---

## 7. Marcos e Gates de Decisao

| Semana | Avaliacao | Criterio de Progressao | Acao se Nao Atingido |
|--------|-----------|----------------------|---------------------|
| 3 | Reavaliacao 1 | Adesao >= 70%; reduc. comportamentos abusivos | Reforcar orientacoes; considerar 1 semana extra |
| 6 | Reavaliacao 2 | TMF >= 12s; melhora perceptiva | Ajustar protocolo; solicitar VLS de controle |
| 9 | Reavaliacao 3 | TMF >= 15s; VHI reducao >= 50% | Estender fase 3; reavaliar diagnostico |
| 12 | Avaliacao final | Metas de longo prazo atingidas | Estender tratamento ou encaminhar |

---

## 8. Contraindicacoes e Red Flags

### Contraindicacoes para Exercicios

| Condicao | Exercicios Contraindicados | Alternativa |
|----------|---------------------------|-------------|
| Pos-operatorio (< 2 sem) | Todos os exercicios vocais | Repouso vocal absoluto/relativo |
| Hemorragia de prega vocal | SOVT alta intensidade, VFE potencia | SOVT leve apenas (se liberado) |
| Infeccao respiratoria aguda | Exercicios de esforco | Respiracao e hidratacao apenas |
| Refluxo ativo nao tratado | Exercicios em decubito | Posicao sentada/em pe apenas |
| `{{contraindication_custom}}` | `{{contra_exercises}}` | `{{contra_alternative}}` |

### Red Flags — Interromper e Encaminhar

- **Dor laringea persistente** durante ou apos exercicios (> 2 sessoes)
- **Piora da disfonia** progressiva apos inicio do tratamento
- **Hemoptise** (sangue ao tossir/expectorar)
- **Dispneia** (falta de ar) nova ou progressiva
- **Disfagia** (dificuldade de degluticao) nova
- **Perda de peso involuntaria** inexplicada
- **Mudanca subita de voz** sem causa aparente

---

## 9. Prescricao de Exercicios Domiciliares por Fase

### Fase 1

| Exercicio | Instrucao Resumida | Freq | Dur |
|-----------|--------------------|------|-----|
| `{{hw_phase1_ex1}}` | `{{hw_phase1_inst1}}` | `{{hw_phase1_freq1}}` | `{{hw_phase1_dur1}}` |
| `{{hw_phase1_ex2}}` | `{{hw_phase1_inst2}}` | `{{hw_phase1_freq2}}` | `{{hw_phase1_dur2}}` |

### Fase 2

| Exercicio | Instrucao Resumida | Freq | Dur |
|-----------|--------------------|------|-----|
| `{{hw_phase2_ex1}}` | `{{hw_phase2_inst1}}` | `{{hw_phase2_freq1}}` | `{{hw_phase2_dur1}}` |
| `{{hw_phase2_ex2}}` | `{{hw_phase2_inst2}}` | `{{hw_phase2_freq2}}` | `{{hw_phase2_dur2}}` |

### Fase 3

| Exercicio | Instrucao Resumida | Freq | Dur |
|-----------|--------------------|------|-----|
| `{{hw_phase3_ex1}}` | `{{hw_phase3_inst1}}` | `{{hw_phase3_freq1}}` | `{{hw_phase3_dur1}}` |
| `{{hw_phase3_ex2}}` | `{{hw_phase3_inst2}}` | `{{hw_phase3_freq2}}` | `{{hw_phase3_dur2}}` |

### Fase 4

| Exercicio | Instrucao Resumida | Freq | Dur |
|-----------|--------------------|------|-----|
| `{{hw_phase4_ex1}}` | `{{hw_phase4_inst1}}` | `{{hw_phase4_freq1}}` | `{{hw_phase4_dur1}}` |
| `{{hw_phase4_ex2}}` | `{{hw_phase4_inst2}}` | `{{hw_phase4_freq2}}` | `{{hw_phase4_dur2}}` |

---

## 10. Validacao

### Criterios de Validacao

- [ ] Diagnostico laringologico completo com CID-10
- [ ] Classificacao de severidade pontuada
- [ ] Medidas basais registradas (minimo: TMF, s/z, GRBAS, VHI)
- [ ] Objetivos SMART definidos para curto, medio e longo prazo
- [ ] 4 fases com exercicios, frequencia, duracao e intensidade
- [ ] Marcos de decisao definidos nas semanas 3, 6, 9 e 12
- [ ] Contraindicacoes e red flags listados
- [ ] Exercicios domiciliares prescritos por fase

---

> **Gerado pelo SpeechTherapy Squad — Synkra AIOX**
> Template: `rehabilitation-protocol-tmpl` v1.0
