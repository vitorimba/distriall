---
id: singer-readiness-assessment-tmpl
name: Avaliacao de Prontidao para Retorno ao Canto
purpose: Avaliacao estruturada para liberacao gradual do paciente cantor ao canto
executor: "@dev"
version: "1.0"
---

# Avaliacao de Prontidao para Retorno ao Canto — SpeechTherapy Squad

> **Template ID:** `singer-readiness-assessment-tmpl`
> **Version:** 1.0
> **Ultima atualizacao:** 2026-03-13
> **Uso:** Avaliacao clinica para determinar se o paciente cantor esta apto a retornar ao canto

---

## 1. Identificacao

| Campo | Valor |
|-------|-------|
| **Paciente** | `{{patient_name}}` |
| **ID Paciente** | `{{patient_id}}` |
| **Fonoaudiologa** | `{{therapist_name}}` |
| **CRFa** | `{{therapist_crfa}}` |
| **Data da Avaliacao** | `{{assessment_date}}` |
| **Diagnostico Original** | `{{original_diagnosis}}` |
| **Data de Inicio do Tratamento** | `{{treatment_start}}` |
| **Sessao Atual** | `{{current_session}}` / `{{total_sessions}}` |
| **Fase do Tratamento** | `{{treatment_phase}}` |

---

## 2. Perfil do Cantor

| Campo | Valor |
|-------|-------|
| **Classificacao vocal** | `{{voice_classification}}` (Soprano / Mezzo / Contralto / Tenor / Baritono / Baixo) |
| **Genero musical principal** | `{{primary_genre}}` |
| **Generos secundarios** | `{{secondary_genres}}` |
| **Nivel** | `{{singer_level}}` (Profissional / Semi-profissional / Amador avancado / Amador) |
| **Tempo de carreira** | `{{career_years}}` anos |
| **Formacao tecnica** | `{{vocal_training}}` |
| **Professor de canto** | `{{vocal_coach}}` |
| **Demanda de performance** | `{{performance_demand}}` shows/mes |
| **Ultimo show/apresentacao** | `{{last_performance_date}}` |
| **Tempo afastado do canto** | `{{time_away}}` semanas |

---

## 3. Status Vocal Atual

### 3.1 Medidas Objetivas Atuais

| Parametro | Valor Atual | Referencia Normal | Status |
|-----------|------------|-------------------|--------|
| TMF /a/ | `{{curr_tmf_a}}` s | >= 15 s | `{{tmf_a_status}}` |
| TMF /i/ | `{{curr_tmf_i}}` s | >= 15 s | `{{tmf_i_status}}` |
| Relacao s/z | `{{curr_sz}}` | 0.8-1.2 | `{{sz_status}}` |
| Jitter | `{{curr_jitter}}` % | < 1.04% | `{{jitter_status}}` |
| Shimmer | `{{curr_shimmer}}` % | < 3.81% | `{{shimmer_status}}` |
| HNR | `{{curr_hnr}}` dB | > 20 dB | `{{hnr_status}}` |
| F0 media (fala) | `{{curr_f0_speech}}` Hz | `{{f0_ref}}` | `{{f0_status}}` |
| VHI-10 | `{{curr_vhi}}` / 40 | 0-7 | `{{vhi_status}}` |

### 3.2 GRBAS Atual

| G | R | B | A | S |
|---|---|---|---|---|
| `{{curr_g}}` | `{{curr_r}}` | `{{curr_b}}` | `{{curr_a}}` | `{{curr_s}}` |

### 3.3 Status da Lesao

| Parametro | Valor |
|-----------|-------|
| Lesao | `{{lesion_status}}` (Resolvida / Em regressao / Presente / N/A) |
| Fechamento glotico | `{{glottic_closure}}` |
| Onda mucosa | `{{mucosal_wave}}` |
| Ultima VLS | `{{last_vls_date}}` |
| Liberacao do ORL | `{{orl_clearance}}` (Sim / Nao / Pendente) |

---

## 4. Limiar de Pressao de Fonacao (PTP)

> Phonation Threshold Pressure — pressao subglotica minima necessaria para iniciar a fonacao.

| Frequencia | PTP Medido (cmH2O) | Referencia | Status |
|------------|-------------------|-----------|--------|
| Grave (F0 - 1 oitava) | `{{ptp_low}}` | `{{ptp_low_ref}}` | `{{ptp_low_status}}` |
| Habitual (F0) | `{{ptp_mid}}` | `{{ptp_mid_ref}}` | `{{ptp_mid_status}}` |
| Agudo (F0 + 1 oitava) | `{{ptp_high}}` | `{{ptp_high_ref}}` | `{{ptp_high_status}}` |
| Passagem de registro | `{{ptp_passaggio}}` | `{{ptp_pass_ref}}` | `{{ptp_pass_status}}` |

**Interpretacao:**
> `{{ptp_interpretation}}`

> **PTP elevado** sugere que as pregas vocais necessitam de mais esforco para vibrar — indicativo de rigidez, edema residual ou massa. PTP normalizado e pre-requisito para retorno ao canto.

---

## 5. Avaliacao de Extensao Vocal (Pitch Range)

### Extensao em Fala

| Parametro | Valor | Referencia |
|-----------|-------|-----------|
| Nota mais grave (fala) | `{{speech_low}}` (`{{speech_low_hz}}` Hz) | `{{speech_low_ref}}` |
| Nota mais aguda (fala) | `{{speech_high}}` (`{{speech_high_hz}}` Hz) | `{{speech_high_ref}}` |
| Extensao total (fala) | `{{speech_range_st}}` semitons | `{{speech_range_ref}}` st |

### Extensao em Canto

| Parametro | Pre-tratamento | Atual | Delta | Meta |
|-----------|---------------|-------|-------|------|
| Nota mais grave (canto) | `{{pre_singing_low}}` | `{{curr_singing_low}}` | `{{delta_low}}` | `{{target_low}}` |
| Nota mais aguda (canto) | `{{pre_singing_high}}` | `{{curr_singing_high}}` | `{{delta_high}}` | `{{target_high}}` |
| Extensao total (semitons) | `{{pre_singing_range}}` st | `{{curr_singing_range}}` st | `{{delta_range}}` st | `{{target_range}}` st |
| Registro de peito (limite sup.) | `{{pre_chest_limit}}` | `{{curr_chest_limit}}` | `{{delta_chest}}` | — |
| Passaggio | `{{pre_passaggio}}` | `{{curr_passaggio}}` | `{{delta_passaggio}}` | — |
| Registro de cabeca (limite inf.) | `{{pre_head_limit}}` | `{{curr_head_limit}}` | `{{delta_head}}` | — |

### Qualidade por Registro

| Registro | Qualidade (1-5) | Estabilidade (1-5) | Observacao |
|----------|----------------|-------------------|------------|
| Peito (voz plena) | `{{chest_quality}}` | `{{chest_stability}}` | `{{chest_note}}` |
| Misto / Mix | `{{mix_quality}}` | `{{mix_stability}}` | `{{mix_note}}` |
| Cabeca | `{{head_quality}}` | `{{head_stability}}` | `{{head_note}}` |
| Falsete | `{{falsetto_quality}}` | `{{falsetto_stability}}` | `{{falsetto_note}}` |
| Passaggio | `{{passaggio_quality}}` | `{{passaggio_stability}}` | `{{passaggio_note}}` |

---

## 6. Avaliacao de Dinamica (Loudness Range)

| Parametro | Valor (dB SPL) | Referencia | Status |
|-----------|---------------|-----------|--------|
| Intensidade minima (piano) na F0 | `{{min_intensity_f0}}` dB | `{{min_int_ref}}` | `{{min_int_status}}` |
| Intensidade maxima (forte) na F0 | `{{max_intensity_f0}}` dB | `{{max_int_ref}}` | `{{max_int_status}}` |
| Range dinamico na F0 | `{{dynamic_range_f0}}` dB | >= 30 dB | `{{dyn_range_status}}` |
| Messa di voce (crescendo-decrescendo) | `{{messa_di_voce}}` / 5 | >= 4 | `{{messa_status}}` |
| Controle de piano nos agudos | `{{piano_high}}` / 5 | >= 3 | `{{piano_high_status}}` |
| Projecao sem esforco excessivo | `{{projection}}` / 5 | >= 4 | `{{projection_status}}` |

---

## 7. Teste de Resistencia Vocal (Endurance)

### Protocolo

> Leitura em voz alta por `{{endurance_test_duration}}` minutos com intensidade de fala habitual, seguida de avaliacao.

| Parametro | Pre-teste | Pos-teste (apos `{{endurance_test_duration}}` min) | Delta | Limiar |
|-----------|----------|-----------------------------------------------------|-------|--------|
| Qualidade vocal percebida (1-10) | `{{endurance_quality_pre}}` | `{{endurance_quality_post}}` | `{{endurance_quality_delta}}` | Queda < 2 pts |
| Esforco fonatoro (0-10) | `{{endurance_effort_pre}}` | `{{endurance_effort_post}}` | `{{endurance_effort_delta}}` | Aumento < 2 pts |
| F0 media | `{{endurance_f0_pre}}` Hz | `{{endurance_f0_post}}` Hz | `{{endurance_f0_delta}}` | Delta < 5 Hz |
| Jitter | `{{endurance_jitter_pre}}` % | `{{endurance_jitter_post}}` % | `{{endurance_jitter_delta}}` | Sem aumento significativo |
| TMF /a/ | `{{endurance_tmf_pre}}` s | `{{endurance_tmf_post}}` s | `{{endurance_tmf_delta}}` | Queda < 20% |

**Resultado do teste de resistencia:** `{{endurance_result}}` (Aprovado / Aprovado com ressalvas / Reprovado)

**Observacoes:**
> `{{endurance_notes}}`

---

## 8. Classificacao de Dificuldade do Repertorio

### Niveis de Dificuldade

| Nivel | Descricao | Exemplos | Requisitos Vocais |
|-------|-----------|----------|-------------------|
| 1 — Facil | Extensao limitada, tessitura confortavel, dinamica moderada | `{{level_1_examples}}` | TMF >= 12s, G <= 1, PTP normal na F0 |
| 2 — Moderado | Extensao media, passagens de registro, variacoes dinamicas | `{{level_2_examples}}` | TMF >= 15s, G = 0, range dinamico >= 25dB |
| 3 — Dificil | Extensao ampla, agudos sustentados, dinamicas extremas | `{{level_3_examples}}` | TMF >= 18s, PTP normal em toda extensao |
| 4 — Virtuosistico | Demanda maxima de agilidade, potencia e extensao | `{{level_4_examples}}` | Todos parametros otimizados, endurance aprovado |

### Repertorio do Paciente — Classificacao

| Musica/Peca | Genero | Nivel | Liberada? | Observacao |
|-------------|--------|-------|-----------|------------|
| `{{song_1}}` | `{{genre_1}}` | `{{level_1}}` | `{{cleared_1}}` | `{{song_1_note}}` |
| `{{song_2}}` | `{{genre_2}}` | `{{level_2}}` | `{{cleared_2}}` | `{{song_2_note}}` |
| `{{song_3}}` | `{{genre_3}}` | `{{level_3}}` | `{{cleared_3}}` | `{{song_3_note}}` |
| `{{song_4}}` | `{{genre_4}}` | `{{level_4}}` | `{{cleared_4}}` | `{{song_4_note}}` |
| `{{song_5}}` | `{{genre_5}}` | `{{level_5}}` | `{{cleared_5}}` | `{{song_5_note}}` |

---

## 9. Cronograma de Retorno Gradual ao Canto

### Fase A — Retorno Inicial (Semanas `{{phase_a_weeks}}`)

| Atividade | Frequencia | Duracao Max | Restricoes |
|-----------|-----------|-------------|------------|
| Aquecimento vocal obrigatorio | Antes de cada sessao | `{{warmup_dur_a}}` min | — |
| Vocalize leve (escalas, arpejos) | `{{vocalize_freq_a}}` x/semana | `{{vocalize_dur_a}}` min | Extensao: `{{range_limit_a}}` |
| Canto suave (repertorio nivel 1) | `{{singing_freq_a}}` x/semana | `{{singing_dur_a}}` min | Intensidade: piano a mezzo-piano |
| Desaquecimento obrigatorio | Apos cada sessao | `{{cooldown_dur_a}}` min | — |
| **Pausa obrigatoria entre sessoes** | — | — | Minimo `{{rest_between_a}}` horas |

### Fase B — Progressao (Semanas `{{phase_b_weeks}}`)

| Atividade | Frequencia | Duracao Max | Restricoes |
|-----------|-----------|-------------|------------|
| Vocalize com extensao expandida | `{{vocalize_freq_b}}` x/semana | `{{vocalize_dur_b}}` min | Extensao: `{{range_limit_b}}` |
| Canto moderado (repertorio nivel 1-2) | `{{singing_freq_b}}` x/semana | `{{singing_dur_b}}` min | Intensidade: ate mezzo-forte |
| Ensaio com banda/coral | `{{rehearsal_freq_b}}` x/semana | `{{rehearsal_dur_b}}` min | Com retorno/monitor |
| Tecnicas de belting/mix (se aplicavel) | `{{belt_freq_b}}` x/semana | `{{belt_dur_b}}` min | Supervisionado |

### Fase C — Retorno Completo (Semanas `{{phase_c_weeks}}`)

| Atividade | Frequencia | Duracao Max | Restricoes |
|-----------|-----------|-------------|------------|
| Repertorio completo (todos os niveis) | `{{singing_freq_c}}` x/semana | `{{singing_dur_c}}` min | Monitorar fadiga |
| Ensaios completos | `{{rehearsal_freq_c}}` x/semana | `{{rehearsal_dur_c}}` min | — |
| Performances ao vivo | `{{performance_freq_c}}` x/mes | `{{performance_dur_c}}` min | `{{performance_notes_c}}` |
| Manutencao vocal | Diaria | 10 min | Aquecimento + desaquecimento |

---

## 10. Diretrizes de Performance

### Antes do Show

- [ ] Aquecimento vocal: minimo `{{pre_show_warmup}}` min
- [ ] Hidratacao: `{{pre_show_hydration}}` mL nas 2 horas anteriores
- [ ] Evitar alimentos irritantes: `{{avoid_foods}}`
- [ ] Verificar retorno/monitor de palco
- [ ] Repouso vocal: `{{pre_show_rest}}` min de silencio antes

### Durante o Show

- [ ] Monitorar esforco fonatoro (escala 0-10): manter <= `{{max_effort}}`
- [ ] Intervalos: `{{show_break_interval}}` min de pausa a cada `{{show_block_duration}}` min
- [ ] Hidratacao entre musicas: goles frequentes de agua em temperatura ambiente
- [ ] Se fadiga > `{{fatigue_threshold}}`/10: reduzir intensidade ou pular musica de alta demanda

### Apos o Show

- [ ] Desaquecimento vocal: minimo `{{post_show_cooldown}}` min
- [ ] Repouso vocal relativo: `{{post_show_rest}}` horas
- [ ] Hidratacao intensificada
- [ ] Autoavaliacao (registrar fadiga, dor, qualidade percebida)

### Sinais de Alerta (Interromper e Consultar)

- Dor ao cantar que persiste apos desaquecimento
- Perda subita de notas agudas
- Quebras vocais repetidas durante performance
- Rouquidao que nao resolve em `{{recovery_hours}}` horas

---

## 11. Score de Prontidao — Decisao Final

### Checklist de Criterios

| Criterio | Peso | Atingido? | Score |
|----------|------|-----------|-------|
| TMF >= 15s | 15% | `{{crit_tmf}}` | `{{score_tmf}}` |
| GRBAS G <= 1 | 10% | `{{crit_grbas}}` | `{{score_grbas}}` |
| VHI < 8 | 10% | `{{crit_vhi}}` | `{{score_vhi}}` |
| PTP normalizado | 15% | `{{crit_ptp}}` | `{{score_ptp}}` |
| Extensao >= 80% do pre-lesao | 15% | `{{crit_range}}` | `{{score_range}}` |
| Range dinamico >= 25dB | 10% | `{{crit_dynamic}}` | `{{score_dynamic}}` |
| Endurance test aprovado | 15% | `{{crit_endurance}}` | `{{score_endurance}}` |
| Liberacao ORL | 10% | `{{crit_orl}}` | `{{score_orl}}` |
| **TOTAL** | **100%** | — | **`{{total_readiness_score}}`** % |

### Classificacao de Prontidao

| Score | Classificacao | Recomendacao |
|-------|---------------|-------------|
| >= 90% | Pronto para retorno completo | Iniciar na Fase B ou C |
| 75-89% | Pronto com restricoes | Iniciar na Fase A, progressao monitorada |
| 60-74% | Parcialmente pronto | Apenas vocalize e repertorio nivel 1 |
| < 60% | Nao pronto | Continuar tratamento, reavaliar em `{{reassess_weeks}}` semanas |

**Score do paciente:** `{{total_readiness_score}}` %
**Classificacao:** `{{readiness_classification}}`
**Recomendacao:** `{{readiness_recommendation}}`

---

## 12. Validacao

### Criterios de Validacao

- [ ] Perfil do cantor completo (classificacao, genero, nivel)
- [ ] Medidas objetivas atuais documentadas
- [ ] PTP avaliado em pelo menos 3 frequencias
- [ ] Extensao vocal mapeada (fala e canto)
- [ ] Range dinamico testado
- [ ] Teste de endurance realizado
- [ ] Repertorio classificado por nivel de dificuldade
- [ ] Cronograma de retorno gradual em 3 fases
- [ ] Diretrizes de performance documentadas
- [ ] Score de prontidao calculado com decisao final
- [ ] Liberacao ORL obtida ou pendencia registrada

---

> **Gerado pelo SpeechTherapy Squad — Synkra AIOX**
> Template: `singer-readiness-assessment-tmpl` v1.0
