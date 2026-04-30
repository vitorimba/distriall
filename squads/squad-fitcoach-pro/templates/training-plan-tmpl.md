# Training Plan Template — FitCoach Squad

> **Template ID:** `training-plan-tmpl`
> **Version:** 1.0
> **Última atualização:** 2026-03-11
> **Uso:** Geração de protocolo de treino completo para clientes

---

## 1. Header — Informações do Cliente

| Campo | Valor |
|-------|-------|
| **Nome** | `{{client_name}}` |
| **ID Cliente** | `{{client_id}}` |
| **Coach Responsável** | `{{coach_name}}` |
| **Data de Início** | `{{start_date}}` |
| **Data de Término** | `{{end_date}}` |
| **Fase Atual** | `{{phase_name}}` (ex: Hipertrofia, Força, Cutting, Deload) |
| **Semana do Programa** | `{{current_week}}` / `{{total_weeks}}` |
| **Nível de Experiência** | `{{experience_level}}` (Iniciante / Intermediário / Avançado / Elite) |
| **Objetivo Principal** | `{{primary_goal}}` |
| **Frequência Semanal** | `{{training_frequency}}` dias |
| **Equipamentos Disponíveis** | `{{available_equipment}}` |
| **Restrições / Lesões** | `{{restrictions}}` |

---

## 2. Training Split Overview

### Divisão Semanal

| Dia | Grupo Muscular | Foco | Duração Estimada |
|-----|---------------|------|-----------------|
| Segunda | `{{day1_muscles}}` | `{{day1_focus}}` | `{{day1_duration}}` min |
| Terça | `{{day2_muscles}}` | `{{day2_focus}}` | `{{day2_duration}}` min |
| Quarta | `{{day3_muscles}}` | `{{day3_focus}}` | `{{day3_duration}}` min |
| Quinta | `{{day4_muscles}}` | `{{day4_focus}}` | `{{day4_duration}}` min |
| Sexta | `{{day5_muscles}}` | `{{day5_focus}}` | `{{day5_duration}}` min |
| Sábado | `{{day6_muscles}}` | `{{day6_focus}}` | `{{day6_duration}}` min |
| Domingo | REST | Recuperação Ativa / Off | — |

### Tipo de Split

- [ ] Full Body (2-3x/sem)
- [ ] Upper/Lower (4x/sem)
- [ ] Push/Pull/Legs (6x/sem)
- [ ] Bro Split (5-6x/sem)
- [ ] Arnold Split (6x/sem)
- [ ] Hybrid / Personalizado

### Volume Semanal por Grupo (sets diretos)

| Grupo Muscular | Sets/Semana | MEV | MAV | MRV | Status |
|---------------|------------|-----|-----|-----|--------|
| Peito | `{{chest_sets}}` | 10 | 14-18 | 22 | `{{chest_status}}` |
| Costas | `{{back_sets}}` | 10 | 14-20 | 24 | `{{back_status}}` |
| Ombros (delts laterais) | `{{side_delt_sets}}` | 8 | 12-16 | 20 | `{{side_delt_status}}` |
| Bíceps | `{{biceps_sets}}` | 6 | 10-14 | 18 | `{{biceps_status}}` |
| Tríceps | `{{triceps_sets}}` | 6 | 10-14 | 18 | `{{triceps_status}}` |
| Quadríceps | `{{quads_sets}}` | 8 | 12-18 | 22 | `{{quads_status}}` |
| Posteriores | `{{hams_sets}}` | 6 | 10-14 | 18 | `{{hams_status}}` |
| Glúteos | `{{glutes_sets}}` | 4 | 8-12 | 16 | `{{glutes_status}}` |
| Panturrilha | `{{calves_sets}}` | 6 | 10-14 | 18 | `{{calves_status}}` |
| Abdômen | `{{abs_sets}}` | 0 | 6-10 | 14 | `{{abs_status}}` |

> **Legenda Status:** ABAIXO_MEV | DENTRO_MAV | ACIMA_MRV | NECESSITA_AJUSTE

---

## 3. Daily Workout Detail

### Treino A — `{{day1_name}}`

**Aquecimento (5-10 min):**
1. Mobilidade articular — 2 min
2. Cardio leve (esteira/bike) — 3 min
3. Ativação específica — `{{day1_activation}}`

**Treino Principal:**

| # | Exercício | Sets | Reps | Carga (kg) | Rest (s) | RIR | RPE | Tempo | Notas |
|---|-----------|------|------|------------|----------|-----|-----|-------|-------|
| A1 | `{{a1_exercise}}` | `{{a1_sets}}` | `{{a1_reps}}` | `{{a1_load}}` | `{{a1_rest}}` | `{{a1_rir}}` | `{{a1_rpe}}` | `{{a1_tempo}}` | `{{a1_notes}}` |
| A2 | `{{a2_exercise}}` | `{{a2_sets}}` | `{{a2_reps}}` | `{{a2_load}}` | `{{a2_rest}}` | `{{a2_rir}}` | `{{a2_rpe}}` | `{{a2_tempo}}` | `{{a2_notes}}` |
| B1 | `{{b1_exercise}}` | `{{b1_sets}}` | `{{b1_reps}}` | `{{b1_load}}` | `{{b1_rest}}` | `{{b1_rir}}` | `{{b1_rpe}}` | `{{b1_tempo}}` | `{{b1_notes}}` |
| B2 | `{{b2_exercise}}` | `{{b2_sets}}` | `{{b2_reps}}` | `{{b2_load}}` | `{{b2_rest}}` | `{{b2_rir}}` | `{{b2_rpe}}` | `{{b2_tempo}}` | `{{b2_notes}}` |
| C1 | `{{c1_exercise}}` | `{{c1_sets}}` | `{{c1_reps}}` | `{{c1_load}}` | `{{c1_rest}}` | `{{c1_rir}}` | `{{c1_rpe}}` | `{{c1_tempo}}` | `{{c1_notes}}` |
| C2 | `{{c2_exercise}}` | `{{c2_sets}}` | `{{c2_reps}}` | `{{c2_load}}` | `{{c2_rest}}` | `{{c2_rir}}` | `{{c2_rpe}}` | `{{c2_tempo}}` | `{{c2_notes}}` |

**Finalizadores (opcional):**
- `{{day1_finisher}}` — `{{day1_finisher_protocol}}`

**Cool Down:**
- Alongamento estático — 5 min (grupos trabalhados)
- Foam rolling — `{{day1_foam_rolling}}`

---

### Treino B — `{{day2_name}}`

**Aquecimento (5-10 min):**
1. Mobilidade articular — 2 min
2. Cardio leve — 3 min
3. Ativação específica — `{{day2_activation}}`

**Treino Principal:**

| # | Exercício | Sets | Reps | Carga (kg) | Rest (s) | RIR | RPE | Tempo | Notas |
|---|-----------|------|------|------------|----------|-----|-----|-------|-------|
| A1 | `{{exercicio}}` | — | — | — | — | — | — | — | — |
| A2 | `{{exercicio}}` | — | — | — | — | — | — | — | — |
| B1 | `{{exercicio}}` | — | — | — | — | — | — | — | — |
| B2 | `{{exercicio}}` | — | — | — | — | — | — | — | — |
| C1 | `{{exercicio}}` | — | — | — | — | — | — | — | — |
| C2 | `{{exercicio}}` | — | — | — | — | — | — | — | — |

> **Repetir estrutura para Treinos C, D, E, F conforme frequência semanal.**

---

## 4. Progressive Overload Plan

### Estratégia de Progressão — `{{overload_strategy}}`

| Semana | Método de Progressão | Aplicação |
|--------|---------------------|-----------|
| 1 | Baseline — Estabelecer cargas de trabalho | Todas as séries com RIR 3-4 |
| 2 | Aumento de carga (+2.5-5kg compostos, +1-2kg isolados) | Manter reps |
| 3 | Aumento de volume (+1 set em exercícios prioritários) | Manter carga |
| 4 | Double progression (carga + reps) | Exercícios que estabilizaram |
| 5 | DELOAD (reduzir 40-50% volume) | Recuperação programada |
| 6 | Novo baseline com cargas atualizadas | Reset de progressão |

### Regras de Progressão

1. **Compostos (Supino, Agachamento, Terra, Desenvolvimento):**
   - Progressão de carga: +2.5kg quando completar todas as reps com RIR >= 2
   - Se falhar 2 sessões consecutivas, manter carga e adicionar 1 rep
   - Se falhar 3 sessões, reduzir 10% e reconstruir

2. **Isolados (Rosca, Extensão, Elevação Lateral):**
   - Progressão de carga: +1-2kg quando completar range superior de reps
   - Double progression: faixa de reps (ex: 10-15), progredir carga quando atingir 15

3. **Máquinas:**
   - Seguir incrementos da máquina (geralmente 5kg)
   - Usar tempo como variável de progressão quando carga limita

### Tracking de PRs

| Exercício | PR Anterior | PR Atual | Data | Delta |
|-----------|------------|----------|------|-------|
| `{{exercise_name}}` | `{{previous_pr}}` | `{{current_pr}}` | `{{pr_date}}` | `{{pr_delta}}` |

---

## 5. Deload Week Protocol

### Quando Aplicar Deload

- [ ] Programado (a cada 4-6 semanas de mesociclo)
- [ ] Reativo (sinais de overreaching: performance caindo, fadiga acumulada, sono ruim)
- [ ] Profilático (pré-competição, pré-teste de 1RM)

### Protocolo de Deload — `{{deload_type}}`

| Tipo | Volume | Intensidade | Frequência | Duração |
|------|--------|------------|------------|---------|
| **Volume Deload** | -40 a -50% sets | Manter carga | Manter | 1 semana |
| **Intensity Deload** | Manter sets | -30 a -40% carga | Manter | 1 semana |
| **Frequency Deload** | Manter | Manter | -50% dias | 1 semana |
| **Full Deload** | -50% sets | -30% carga | -50% dias | 1 semana |

### Atividades Recomendadas na Deload Week

- Mobilidade e alongamento (20-30 min/dia)
- Caminhada leve (30-45 min/dia)
- Foam rolling / recovery tools
- Sono: priorizar 8+ horas
- Nutrição: manter proteína, reduzir carboidrato se em cutting

---

## 6. Exercise Substitution Guide

### Exercícios Compostos — Substituições

| Exercício Principal | Substituição 1 | Substituição 2 | Substituição 3 |
|--------------------|----------------|----------------|----------------|
| Supino Reto Barra | Supino Halteres | Chest Press Máquina | Floor Press |
| Agachamento Livre | Leg Press | Agachamento Hack | Belt Squat |
| Levantamento Terra | Romanian Deadlift | Hip Thrust Barra | Good Morning |
| Desenvolvimento Militar | Arnold Press | Shoulder Press Máquina | Landmine Press |
| Barra Fixa | Pulldown | Remada Invertida | Lat Pulldown Unilateral |
| Remada Curvada | Remada Unilateral Halter | Remada Cavalinho | Cable Row |

### Exercícios Isolados — Substituições

| Exercício Principal | Substituição 1 | Substituição 2 | Substituição 3 |
|--------------------|----------------|----------------|----------------|
| Rosca Direta | Rosca Scott | Rosca Martelo | Rosca Cabo |
| Tríceps Pulley | Tríceps Francês | Tríceps Testa | Dip Máquina |
| Elevação Lateral | Elevação Lateral Cabo | Lateral Raise Máquina | Y-Raise |
| Leg Extension | Sissy Squat | Spanish Squat | — |
| Mesa Flexora | Nordic Curl | Stiff Unilateral | Slider Curl |
| Panturrilha em Pé | Panturrilha Sentado | Panturrilha Leg Press | Panturrilha Smith |

### Critérios para Substituição

1. **Mesmo padrão de movimento** (empurrar, puxar, agachar, articular)
2. **Mesmo grupo muscular primário** atingido
3. **Range of motion comparável** (ou superior)
4. **Curva de resistência similar** quando possível
5. **Disponibilidade de equipamento** do cliente

---

## 7. Form Cues — Dicas de Execução

### Agachamento (Squat)

**Setup:**
- Pés na largura dos ombros ou ligeiramente mais abertos
- Pontas dos pés levemente apontadas para fora (15-30°)
- Barra posicionada no trapézio superior (high bar) ou médio (low bar)

**Execução:**
- "Empurre o chão para longe de você" (foco na subida)
- "Mantenha o peito alto e olhar à frente"
- "Joelhos na direção dos pés" — nunca colapsar para dentro
- Descer até pelo menos paralelo (crease do quadril na linha do joelho)
- Respiração: inspirar no topo, segurar na descida (Valsalva), expirar na subida

**Erros comuns:**
- Joelho valgo (caving in) — cue: "empurre os joelhos para fora"
- Butt wink excessivo — cue: "contraia o abdômen, não desça além do seu range"
- Inclinação excessiva do tronco — cue: "peito alto, cotovelos embaixo da barra"

### Supino (Bench Press)

**Setup:**
- Escápulas retraídas e deprimidas ("guarde as escápulas no bolso de trás")
- Arco torácico natural (não lombar excessivo)
- Pés firmes no chão, leg drive ativo
- Pegada 1.5x largura dos ombros

**Execução:**
- "Puxe a barra até o peito" (controle a excêntrica)
- Tocar na linha do mamilo (baixo peito)
- "Empurre a barra ligeiramente para trás" (path em J invertido)
- Cotovelos a ~45-75° do tronco

**Erros comuns:**
- Escápulas soltas — cue: "aperte uma moeda entre as escápulas"
- Bouncing no peito — cue: "1 segundo de pausa no peito"
- Flaring excessivo de cotovelos — cue: "cotovelos a 45 graus"

### Levantamento Terra (Deadlift)

**Setup:**
- Pés na largura do quadril (convencional) ou mais abertos (sumo)
- Barra sobre o meio do pé (vista lateral)
- Quadril mais alto que joelhos, ombros mais altos que quadril
- Costas neutras, peito para cima

**Execução:**
- "Empurre o chão com os pés" (não puxe com as costas)
- "Arraste a barra nas canelas/coxas" (manter próxima do corpo)
- Lockout: extensão completa de quadril e joelhos, glúteos contraídos
- Descida controlada, dobradiça no quadril

**Erros comuns:**
- Arredondamento lombar — cue: "peito para cima, lat engagement"
- Barra distante do corpo — cue: "rale as canelas"
- Hiperextensão no lockout — cue: "apenas fique em pé, não incline para trás"

### Desenvolvimento Militar (Overhead Press)

**Setup:**
- Pés na largura dos ombros
- Barra na posição de rack (clavículas/delts anteriores)
- Pegada ligeiramente mais larga que ombros
- Core braced

**Execução:**
- "Mova a cabeça para trás da barra" (não a barra ao redor da cabeça)
- Path reto da barra (vista lateral)
- Lockout total: braços estendidos, orelhas entre os bíceps
- "Empurre-se para debaixo da barra" no lockout

**Erros comuns:**
- Inclinação lombar excessiva — cue: "aperte os glúteos e abdômen"
- Path em arco — cue: "barra reta para cima"
- Press parcial — cue: "braços totalmente estendidos no topo"

---

## 8. Observações do Coach

### Notas para este Protocolo

```
{{coach_notes}}
```

### Ajustes Planejados

| Semana | Ajuste | Motivo |
|--------|--------|--------|
| `{{week}}` | `{{adjustment}}` | `{{reason}}` |

### Sinais de Atenção (Red Flags)

- Dor articular persistente (>3 dias) → Encaminhar para fisioterapeuta
- Fadiga excessiva + queda de performance → Avaliar overreaching
- Perda de motivação → Revisar periodização, variar estímulos
- Estagnação > 3 semanas → Trocar estratégia de progressão

---

## 9. Histórico de Versões

| Versão | Data | Alteração | Coach |
|--------|------|-----------|-------|
| 1.0 | `{{creation_date}}` | Protocolo inicial | `{{coach_name}}` |
| — | — | — | — |

---

> **Gerado pelo FitCoach Squad — Synkra AIOX**
> Template: `training-plan-tmpl` v1.0
