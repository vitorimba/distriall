# Weekly Check-in Checklist — FitCoach Squad

> **Checklist ID:** `weekly-checkin-checklist`
> **Version:** 1.0
> **Última atualização:** 2026-03-11
> **Uso:** Quality gate para processamento do check-in semanal do cliente
> **Gate Type:** QUALITY — Garante que todos os dados do check-in foram coletados e analisados

---

## Critérios de Aprovação

| Score | Classificação | Ação |
|-------|-------------|------|
| 10/10 | CHECK-IN COMPLETO | Processar ajustes e feedback |
| 8-9/10 | QUASE COMPLETO | Processar com dados disponíveis, solicitar faltantes |
| 6-7/10 | INCOMPLETO | Solicitar dados faltantes antes de ajustar protocolo |
| <6/10 | INSUFICIENTE | Contatar cliente, reforçar importância do check-in |

---

## Seção 1: Dados de Peso e Composição

### 1.1 Peso

- [ ] **Peso semanal registrado** (média dos pesagens diárias ou peso do dia de check-in)
  - Critérios de coleta:
    - Pesagem diária: ao acordar, após banheiro, em jejum, mesma balança
    - Mínimo 5 de 7 dias registrados para média confiável
    - Se apenas 1 pesagem: registrar com nota de "pontual"
  - Dados a registrar:
    - Peso médio da semana: `{{avg_weight}}` kg
    - Menor peso da semana: `{{min_weight}}` kg
    - Maior peso da semana: `{{max_weight}}` kg
    - Delta vs. semana anterior: `{{weight_delta}}` kg
    - Delta vs. início do programa: `{{total_delta}}` kg
  - Análise de tendência:
    - Perda > 1.5% peso corporal/sem por 2+ semanas → FLAG: perda agressiva demais
    - Ganho inesperado > 1kg/sem sem refeed → FLAG: investigar aderência/retenção
    - Estagnação > 2 semanas → FLAG: avaliar ajuste
    - Variação > 2kg na semana → FLAG: provavelmente retenção hídrica
  - Peso: OBRIGATÓRIO
  - Pontuação: 1 ponto

### 1.2 Fotos

- [ ] **Fotos semanais submetidas** (mínimo: frente + lateral + costas)
  - Critérios de qualidade:
    - Mesma iluminação das fotos anteriores
    - Mesma roupa (ou mínima)
    - Mesma hora do dia (preferencialmente manhã em jejum)
    - Sem filtros ou edição
    - Corpo inteiro visível
  - Poses mínimas:
    - [ ] Frente relaxado
    - [ ] Lateral (direito ou esquerdo, consistente)
    - [ ] Costas relaxado
  - Poses adicionais (quando solicitado):
    - [ ] Frente contraído
    - [ ] Costas contraído
    - [ ] Lateral oposto
  - Peso: OBRIGATÓRIO
  - Pontuação: 1 ponto

### 1.3 Medidas

- [ ] **Medidas atualizadas** (se na semana de medição — geralmente quinzenal/mensal)
  - Frequência: a cada 2-4 semanas (conforme protocolo)
  - Se não é semana de medição: marcar N/A
  - Medidas mínimas:
    - [ ] Cintura
    - [ ] Quadril
    - [ ] Braço D
    - [ ] Coxa D
  - Validação: Mesmo protocolo de medição das anteriores (horário, lado, ponto)
  - Peso: CONDICIONAL (obrigatório na semana de medição)
  - Pontuação: 1 ponto (ou N/A se não é semana de medição — ganha o ponto)

---

## Seção 2: Aderência ao Treino

### 2.1 Sessões de Treino

- [ ] **Aderência ao treino reportada** (sessões completadas vs. prescritas)
  - Dados a registrar:
    - Sessões prescritas: `{{prescribed_sessions}}`
    - Sessões completadas: `{{completed_sessions}}`
    - Aderência: `{{training_adherence}}` %
    - Sessões perdidas: `{{missed_sessions}}` — Motivo: `{{missed_reason}}`
  - Análise:
    - >= 90% aderência: Excelente, manter
    - 75-89%: Bom, investigar motivo das faltas
    - 50-74%: Regular, reavaliar frequência do split
    - < 50%: Crítico, conversa urgente sobre comprometimento ou viabilidade do plano
  - Detalhamento por sessão (opcional):
    - [ ] Treino A completado: `{{session_a_status}}`
    - [ ] Treino B completado: `{{session_b_status}}`
    - [ ] Treino C completado: `{{session_c_status}}`
    - [ ] Treino D completado: `{{session_d_status}}`
  - Performance:
    - PRs atingidos: `{{prs_achieved}}`
    - Regressões notadas: `{{regressions}}`
    - Exercícios problemáticos: `{{problematic_exercises}}`
  - Peso: OBRIGATÓRIO
  - Pontuação: 1 ponto

---

## Seção 3: Aderência à Dieta

### 3.1 Adesão Nutricional

- [ ] **Aderência à dieta reportada** (score ou % de dias no plano)
  - Dados a registrar:
    - Dias 100% no plano: `{{on_plan_days}}` / 7
    - Dias com desvio menor (<200 kcal): `{{minor_deviation_days}}` / 7
    - Dias com desvio maior (>200 kcal ou refeição completamente fora): `{{major_deviation_days}}` / 7
    - Aderência geral: `{{diet_adherence}}` %
  - Análise:
    - >= 90% (6-7 dias on plan): Excelente
    - 75-89% (5-6 dias): Bom
    - 60-74% (4-5 dias): Regular — investigar dificuldades
    - < 60% (<4 dias): Insuficiente — simplificar plano ou reavaliar
  - Detalhes adicionais:
    - Refeições mais difíceis de seguir: `{{difficult_meals}}`
    - Alimentos que gostaria de trocar: `{{swap_requests}}`
    - Dificuldade em atingir proteína: `{{protein_difficulty}}`
    - Fome excessiva: `{{hunger_level}}` (1-10)
    - Compulsão alimentar: `{{binge_episodes}}` (sim/não — se sim, encaminhar)
  - Peso: OBRIGATÓRIO
  - Pontuação: 1 ponto

---

## Seção 4: Lifestyle Metrics

### 4.1 Sono

- [ ] **Qualidade e duração do sono reportadas**
  - Dados a registrar:
    - Horas médias de sono: `{{avg_sleep_hours}}`
    - Qualidade média (1-10): `{{sleep_quality}}`
    - Hora de dormir (média): `{{avg_bedtime}}`
    - Hora de acordar (média): `{{avg_waketime}}`
    - Noites com sono ruim: `{{bad_sleep_nights}}` / 7
  - Análise:
    - >= 7 horas + qualidade >= 7: Adequado
    - 6-7 horas ou qualidade 5-6: Atenção — pode impactar recuperação
    - < 6 horas ou qualidade < 5: Crítico — priorizar intervenção no sono
  - Red flags:
    - Insônia persistente → Avaliar overtraining, stress, cafeína noturna
    - Sono < 5h por 3+ noites → Risco de perda muscular e performance
  - Peso: OBRIGATÓRIO
  - Pontuação: 1 ponto

### 4.2 Stress e Energia

- [ ] **Níveis de stress e energia reportados**
  - Dados a registrar:
    - Nível de stress médio (1-10): `{{avg_stress}}`
    - Nível de energia médio (1-10): `{{avg_energy}}`
    - Humor/mood médio (1-10): `{{avg_mood}}`
    - Eventos estressantes: `{{stress_events}}`
  - Análise:
    - Stress > 8 por 2+ semanas: Considerar reduzir volume de treino/cardio
    - Energia < 4 por 2+ semanas: Avaliar déficit calórico, sono, overtraining
    - Mood < 4 persistente: Avaliar saúde mental, encaminhar se necessário
  - Peso: OBRIGATÓRIO
  - Pontuação: 1 ponto

---

## Seção 5: Saúde e Issues

### 5.1 Lesões e Dores

- [ ] **Presença de dores ou lesões reportada**
  - Dados a registrar:
    - Novas dores: `{{new_pain}}` (Sim/Não)
    - Local: `{{pain_location}}`
    - Intensidade (1-10): `{{pain_intensity}}`
    - Tipo: `{{pain_type}}` (Muscular / Articular / Tendinosa / Outra)
    - Piora durante exercício: `{{pain_during_exercise}}`
    - Exercícios afetados: `{{affected_exercises}}`
  - Ações:
    - Dor muscular pós-treino (DOMS): Normal, monitorar
    - Dor articular durante exercício: Substituir exercício, monitorar
    - Dor aguda/súbita: PARAR exercício, encaminhar fisioterapeuta
    - Dor persistente > 1 semana: Encaminhar para avaliação médica
  - Encaminhamentos realizados: `{{referrals}}`
  - Peso: OBRIGATÓRIO
  - Pontuação: 1 ponto

---

## Seção 6: Progresso vs. Target

### 6.1 Comparação com Metas

- [ ] **Progresso comparado com target definido**
  - Dados a registrar:

    | Métrica | Meta Semanal | Realizado | Status |
    |---------|-------------|-----------|--------|
    | Perda/ganho de peso | `{{target_weight_change}}` | `{{actual_weight_change}}` | `{{weight_status}}` |
    | Aderência treino | >= 90% | `{{training_adherence}}` % | `{{training_status}}` |
    | Aderência dieta | >= 85% | `{{diet_adherence}}` % | `{{diet_status}}` |
    | Sono | >= 7h | `{{avg_sleep}}` h | `{{sleep_status}}` |
    | Steps/cardio | `{{target_cardio}}` | `{{actual_cardio}}` | `{{cardio_status}}` |

  - Flag de estagnação:
    - [ ] Peso estagnado há 2+ semanas? → ATENÇÃO: avaliar ajuste
    - [ ] Performance estagnada há 3+ semanas? → ATENÇÃO: avaliar periodização
    - [ ] Cliente desmotivado? → ATENÇÃO: abordagem motivacional

  - Decisão de ajuste:
    - [ ] Nenhum ajuste necessário (progresso no caminho)
    - [ ] Ajuste menor (fine-tuning de calorias ou volume)
    - [ ] Ajuste significativo (mudar fase, split, ou abordagem)
    - [ ] Conversa necessária (aderência, motivação, ou expectativas)

  - Peso: OBRIGATÓRIO
  - Pontuação: 1 ponto

---

## Seção 7: Gamificação

### 7.1 Atualização de Streaks e Badges

- [ ] **Sistema de gamificação atualizado**
  - Dados a atualizar:
    - Streak de treino: `{{training_streak}}` dias consecutivos
    - Streak de dieta: `{{diet_streak}}` dias consecutivos
    - Streak de check-in: `{{checkin_streak}}` semanas consecutivas
    - XP ganho na semana: `{{weekly_xp}}`
    - Badges desbloqueados: `{{new_badges}}`
    - Progresso para próximo level: `{{level_progress}}`
  - Regras de XP:
    - Check-in completo no prazo: +50 XP
    - Aderência treino >= 90%: +30 XP
    - Aderência dieta >= 85%: +30 XP
    - PR atingido: +20 XP por PR
    - Foto submetida: +10 XP
    - Streak de 7 dias (treino ou dieta): +50 XP bonus
    - Streak de 30 dias: +200 XP bonus
  - Peso: RECOMENDADO
  - Pontuação: 1 ponto

---

## Seção 8: Resumo e Score

### Checklist Score

| # | Item | Status | Pontuação |
|---|------|--------|----------|
| 1 | Peso registrado | `{{status_1}}` | `{{score_1}}` / 1 |
| 2 | Fotos submetidas | `{{status_2}}` | `{{score_2}}` / 1 |
| 3 | Medidas atualizadas (se aplicável) | `{{status_3}}` | `{{score_3}}` / 1 |
| 4 | Aderência ao treino reportada | `{{status_4}}` | `{{score_4}}` / 1 |
| 5 | Aderência à dieta reportada | `{{status_5}}` | `{{score_5}}` / 1 |
| 6 | Sono reportado | `{{status_6}}` | `{{score_6}}` / 1 |
| 7 | Stress e energia reportados | `{{status_7}}` | `{{score_7}}` / 1 |
| 8 | Lesões/dores reportadas | `{{status_8}}` | `{{score_8}}` / 1 |
| 9 | Progresso vs target analisado | `{{status_9}}` | `{{score_9}}` / 1 |
| 10 | Gamificação atualizada | `{{status_10}}` | `{{score_10}}` / 1 |
| — | **TOTAL** | — | **`{{total_score}}`/10** |

### Decisão do Gate

| Resultado | Ação |
|----------|------|
| **COMPLETO** (10/10) | Processar feedback e ajustes |
| **QUASE COMPLETO** (8-9) | Processar com dados disponíveis |
| **INCOMPLETO** (6-7) | Solicitar dados faltantes: `{{missing_items}}` |
| **INSUFICIENTE** (<6) | Contatar cliente: `{{contact_reason}}` |

### Ajustes Decididos para Próxima Semana

| Área | Ajuste | Detalhe |
|------|--------|---------|
| Treino | `{{training_adjustment}}` | `{{training_detail}}` |
| Nutrição | `{{nutrition_adjustment}}` | `{{nutrition_detail}}` |
| Cardio | `{{cardio_adjustment}}` | `{{cardio_detail}}` |
| Suplementação | `{{suppl_adjustment}}` | `{{suppl_detail}}` |
| Lifestyle | `{{lifestyle_adjustment}}` | `{{lifestyle_detail}}` |

### Feedback Enviado ao Cliente

| Campo | Valor |
|-------|-------|
| **Canal** | `{{feedback_channel}}` |
| **Tipo** | `{{feedback_type}}` (Texto / Áudio / Vídeo / Call) |
| **Enviado em** | `{{feedback_date}}` `{{feedback_time}}` |
| **Tom** | `{{feedback_tone}}` (Motivacional / Técnico / Corretivo / Celebratório) |

---

> **Gerado pelo FitCoach Squad — Synkra AIOX**
> Checklist: `weekly-checkin-checklist` v1.0
