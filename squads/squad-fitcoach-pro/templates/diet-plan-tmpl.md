# Diet Plan Template — FitCoach Squad

> **Template ID:** `diet-plan-tmpl`
> **Version:** 1.0
> **Última atualização:** 2026-03-11
> **Uso:** Geração de protocolo nutricional completo para clientes

---

## 1. Header — Informações do Cliente

| Campo | Valor |
|-------|-------|
| **Nome** | `{{client_name}}` |
| **ID Cliente** | `{{client_id}}` |
| **Coach/Nutricionista** | `{{coach_name}}` |
| **Data de Início** | `{{start_date}}` |
| **Data de Término** | `{{end_date}}` |
| **Fase Atual** | `{{phase_name}}` (Bulking / Cutting / Manutenção / Recomposição / Reverse Diet) |
| **Semana do Protocolo** | `{{current_week}}` / `{{total_weeks}}` |
| **Objetivo Principal** | `{{primary_goal}}` |
| **Peso Atual** | `{{current_weight}}` kg |
| **Peso Meta** | `{{target_weight}}` kg |
| **Altura** | `{{height}}` cm |
| **Idade** | `{{age}}` anos |
| **Nível de Atividade** | `{{activity_level}}` (Sedentário / Leve / Moderado / Ativo / Muito Ativo) |
| **Alergias / Intolerâncias** | `{{allergies}}` |
| **Preferências Alimentares** | `{{food_preferences}}` |
| **Restrições Dietéticas** | `{{dietary_restrictions}}` (Vegetariano / Vegano / Sem Glúten / Sem Lactose / Nenhuma) |

---

## 2. Cálculo Calórico

### Dados Base

| Parâmetro | Valor | Fórmula/Método |
|-----------|-------|---------------|
| **TMB (Taxa Metabólica Basal)** | `{{bmr}}` kcal | `{{bmr_formula}}` (Mifflin-St Jeor / Harris-Benedict / Katch-McArdle) |
| **Fator de Atividade** | `{{activity_factor}}` | NEAT + EAT + TEF |
| **TDEE (Gasto Energético Total)** | `{{tdee}}` kcal | TMB × Fator de Atividade |
| **Ajuste Calórico** | `{{caloric_adjustment}}` kcal | `{{adjustment_type}}` (déficit / superávit / manutenção) |
| **Meta Calórica Diária** | `{{daily_calories}}` kcal | TDEE + Ajuste |

### Ajuste por Fase

| Fase | Ajuste Calórico | Duração Típica | Taxa de Mudança |
|------|-----------------|----------------|----------------|
| Bulking (Lean) | +200 a +350 kcal | 12-20 semanas | +0.25-0.5 kg/sem |
| Bulking (Agressivo) | +500 a +700 kcal | 8-16 semanas | +0.5-1.0 kg/sem |
| Cutting (Moderado) | -300 a -500 kcal | 8-16 semanas | -0.5-0.75 kg/sem |
| Cutting (Agressivo) | -700 a -1000 kcal | 4-8 semanas | -0.75-1.0 kg/sem |
| Manutenção | ±100 kcal | Indefinida | ±0.1 kg/sem |
| Reverse Diet | +50-100 kcal/sem | 8-16 semanas | Progressivo |

---

## 3. Macro Targets — Metas de Macronutrientes

### Distribuição Diária

| Macronutriente | Gramas | Calorias | % do Total | g/kg Peso Corporal |
|---------------|--------|----------|-----------|-------------------|
| **Proteína** | `{{protein_g}}` g | `{{protein_cal}}` kcal | `{{protein_pct}}` % | `{{protein_per_kg}}` g/kg |
| **Carboidratos** | `{{carbs_g}}` g | `{{carbs_cal}}` kcal | `{{carbs_pct}}` % | `{{carbs_per_kg}}` g/kg |
| **Gorduras** | `{{fat_g}}` g | `{{fat_cal}}` kcal | `{{fat_pct}}` % | `{{fat_per_kg}}` g/kg |
| **Fibras** | `{{fiber_g}}` g | — | — | `{{fiber_per_kg}}` g/kg |
| **TOTAL** | — | `{{total_cal}}` kcal | 100% | — |

### Guidelines por Macronutriente

**Proteína (target: 1.6-2.2 g/kg):**
- Fontes prioritárias: frango, peixe, ovos, whey, carne magra
- Distribuir em 4-6 refeições (mínimo 20g por refeição para MPS)
- Leucina threshold: ~2.5-3g por refeição para maximizar síntese proteica

**Carboidratos:**
- Peri-workout: 40-60% dos carboidratos ao redor do treino
- Fontes complexas: arroz, batata, aveia, mandioca, inhame
- Frutas: 2-3 porções/dia (preferencialmente low GI fora do peri-treino)

**Gorduras (mínimo: 0.5 g/kg, ideal: 0.8-1.2 g/kg):**
- Fontes: azeite, castanhas, abacate, peixes gordos, ovos
- Ômega-3: priorizar salmão, sardinha, ou suplementação
- Evitar gordura trans e minimizar gordura saturada

### Ciclagem de Macros (se aplicável)

| Dia | Tipo | Calorias | Proteína | Carboidratos | Gorduras |
|-----|------|----------|----------|-------------|---------|
| Treino (intenso) | High Carb | `{{high_carb_cal}}` | `{{hc_protein}}` g | `{{hc_carbs}}` g | `{{hc_fat}}` g |
| Treino (moderado) | Moderate Carb | `{{mod_carb_cal}}` | `{{mc_protein}}` g | `{{mc_carbs}}` g | `{{mc_fat}}` g |
| Descanso | Low Carb | `{{low_carb_cal}}` | `{{lc_protein}}` g | `{{lc_carbs}}` g | `{{lc_fat}}` g |

---

## 4. Meal Plan — Plano Alimentar

### Refeição 1 — Café da Manhã (`{{meal1_time}}`)

| Alimento | Quantidade | Proteína | Carboidratos | Gorduras | Calorias |
|----------|-----------|----------|-------------|---------|---------|
| `{{m1_food1}}` | `{{m1_qty1}}` | `{{m1_p1}}` g | `{{m1_c1}}` g | `{{m1_f1}}` g | `{{m1_cal1}}` |
| `{{m1_food2}}` | `{{m1_qty2}}` | `{{m1_p2}}` g | `{{m1_c2}}` g | `{{m1_f2}}` g | `{{m1_cal2}}` |
| `{{m1_food3}}` | `{{m1_qty3}}` | `{{m1_p3}}` g | `{{m1_c3}}` g | `{{m1_f3}}` g | `{{m1_cal3}}` |
| **TOTAL** | — | **`{{m1_total_p}}`** g | **`{{m1_total_c}}`** g | **`{{m1_total_f}}`** g | **`{{m1_total_cal}}`** |

### Refeição 2 — Lanche da Manhã (`{{meal2_time}}`)

| Alimento | Quantidade | Proteína | Carboidratos | Gorduras | Calorias |
|----------|-----------|----------|-------------|---------|---------|
| `{{m2_food1}}` | `{{m2_qty1}}` | `{{m2_p1}}` g | `{{m2_c1}}` g | `{{m2_f1}}` g | `{{m2_cal1}}` |
| `{{m2_food2}}` | `{{m2_qty2}}` | `{{m2_p2}}` g | `{{m2_c2}}` g | `{{m2_f2}}` g | `{{m2_cal2}}` |
| **TOTAL** | — | **`{{m2_total_p}}`** g | **`{{m2_total_c}}`** g | **`{{m2_total_f}}`** g | **`{{m2_total_cal}}`** |

### Refeição 3 — Almoço (`{{meal3_time}}`)

| Alimento | Quantidade | Proteína | Carboidratos | Gorduras | Calorias |
|----------|-----------|----------|-------------|---------|---------|
| `{{m3_food1}}` | `{{m3_qty1}}` | `{{m3_p1}}` g | `{{m3_c1}}` g | `{{m3_f1}}` g | `{{m3_cal1}}` |
| `{{m3_food2}}` | `{{m3_qty2}}` | `{{m3_p2}}` g | `{{m3_c2}}` g | `{{m3_f2}}` g | `{{m3_cal2}}` |
| `{{m3_food3}}` | `{{m3_qty3}}` | `{{m3_p3}}` g | `{{m3_c3}}` g | `{{m3_f3}}` g | `{{m3_cal3}}` |
| `{{m3_food4}}` | `{{m3_qty4}}` | `{{m3_p4}}` g | `{{m3_c4}}` g | `{{m3_f4}}` g | `{{m3_cal4}}` |
| **TOTAL** | — | **`{{m3_total_p}}`** g | **`{{m3_total_c}}`** g | **`{{m3_total_f}}`** g | **`{{m3_total_cal}}`** |

### Refeição 4 — Pré-Treino (`{{meal4_time}}`)

| Alimento | Quantidade | Proteína | Carboidratos | Gorduras | Calorias |
|----------|-----------|----------|-------------|---------|---------|
| `{{m4_food1}}` | `{{m4_qty1}}` | `{{m4_p1}}` g | `{{m4_c1}}` g | `{{m4_f1}}` g | `{{m4_cal1}}` |
| `{{m4_food2}}` | `{{m4_qty2}}` | `{{m4_p2}}` g | `{{m4_c2}}` g | `{{m4_f2}}` g | `{{m4_cal2}}` |
| **TOTAL** | — | **`{{m4_total_p}}`** g | **`{{m4_total_c}}`** g | **`{{m4_total_f}}`** g | **`{{m4_total_cal}}`** |

### Refeição 5 — Pós-Treino (`{{meal5_time}}`)

| Alimento | Quantidade | Proteína | Carboidratos | Gorduras | Calorias |
|----------|-----------|----------|-------------|---------|---------|
| `{{m5_food1}}` | `{{m5_qty1}}` | `{{m5_p1}}` g | `{{m5_c1}}` g | `{{m5_f1}}` g | `{{m5_cal1}}` |
| `{{m5_food2}}` | `{{m5_qty2}}` | `{{m5_p2}}` g | `{{m5_c2}}` g | `{{m5_f2}}` g | `{{m5_cal2}}` |
| `{{m5_food3}}` | `{{m5_qty3}}` | `{{m5_p3}}` g | `{{m5_c3}}` g | `{{m5_f3}}` g | `{{m5_cal3}}` |
| **TOTAL** | — | **`{{m5_total_p}}`** g | **`{{m5_total_c}}`** g | **`{{m5_total_f}}`** g | **`{{m5_total_cal}}`** |

### Refeição 6 — Jantar/Ceia (`{{meal6_time}}`)

| Alimento | Quantidade | Proteína | Carboidratos | Gorduras | Calorias |
|----------|-----------|----------|-------------|---------|---------|
| `{{m6_food1}}` | `{{m6_qty1}}` | `{{m6_p1}}` g | `{{m6_c1}}` g | `{{m6_f1}}` g | `{{m6_cal1}}` |
| `{{m6_food2}}` | `{{m6_qty2}}` | `{{m6_p2}}` g | `{{m6_c2}}` g | `{{m6_f2}}` g | `{{m6_cal2}}` |
| **TOTAL** | — | **`{{m6_total_p}}`** g | **`{{m6_total_c}}`** g | **`{{m6_total_f}}`** g | **`{{m6_total_cal}}`** |

### Resumo Diário

| Macro | Meta | Plano | Diferença |
|-------|------|-------|-----------|
| Calorias | `{{daily_calories}}` | `{{plan_calories}}` | `{{cal_diff}}` |
| Proteína | `{{protein_g}}` g | `{{plan_protein}}` g | `{{protein_diff}}` g |
| Carboidratos | `{{carbs_g}}` g | `{{plan_carbs}}` g | `{{carbs_diff}}` g |
| Gorduras | `{{fat_g}}` g | `{{plan_fat}}` g | `{{fat_diff}}` g |

---

## 5. Food Substitution Matrix

### Fontes de Proteína (porção = ~30g proteína)

| Alimento Base | Substituição 1 | Substituição 2 | Substituição 3 | Substituição 4 |
|--------------|----------------|----------------|----------------|----------------|
| Frango (150g) | Peru (150g) | Peixe branco (180g) | Tofu firme (300g) | Patinho moído (150g) |
| Ovos inteiros (5 un) | Claras (10 un) | Cottage (250g) | Whey (1 scoop) | Queijo minas (150g) |
| Salmão (150g) | Tilápia (180g) | Atum em água (1 lata) | Sardinha (2 latas) | Camarão (200g) |
| Carne vermelha (130g) | Carne de porco magra (150g) | Fraldinha (150g) | Músculo (150g) | Alcatra (130g) |
| Whey Protein (1 scoop) | Caseína (1 scoop) | Proteína vegetal (1.5 scoop) | Albumina (30g) | Iogurte grego (300g) |

### Fontes de Carboidrato (porção = ~50g carboidratos)

| Alimento Base | Substituição 1 | Substituição 2 | Substituição 3 | Substituição 4 |
|--------------|----------------|----------------|----------------|----------------|
| Arroz branco (165g cozido) | Arroz integral (175g) | Macarrão integral (170g) | Quinoa (180g) | Cuscuz (160g) |
| Batata inglesa (250g) | Batata doce (220g) | Mandioca (200g) | Inhame (220g) | Cará (220g) |
| Aveia (65g) | Granola (60g) | Tapioca (70g) | Pão integral (100g) | Banana (2 un médias) |
| Pão integral (100g) | Wrap integral (2 un) | Torrada integral (5 un) | Crepioca (tapioca+ovo) | Pão de fermentação natural (80g) |

### Fontes de Gordura (porção = ~15g gorduras)

| Alimento Base | Substituição 1 | Substituição 2 | Substituição 3 | Substituição 4 |
|--------------|----------------|----------------|----------------|----------------|
| Azeite (1 colher sopa) | Óleo de coco (1 colher sopa) | Manteiga (15g) | Ghee (15g) | Óleo de abacate (1 colher sopa) |
| Castanha do Pará (3 un) | Nozes (5 un) | Amêndoas (15 un) | Macadâmia (6 un) | Mix de nuts (25g) |
| Abacate (80g) | Pasta de amendoim (1 colher sopa) | Tahine (1 colher sopa) | Creme de castanha (1 colher sopa) | Azeitonas (10 un) |

---

## 6. Supplement Protocol — Protocolo de Suplementação

### Suplementos Recomendados

| Suplemento | Dose | Horário | Fundamentação | Prioridade |
|-----------|------|---------|--------------|-----------|
| Whey Protein | `{{whey_dose}}` | Pós-treino / conforme necessidade | Completar meta proteica | ESSENCIAL |
| Creatina Monohidratada | 3-5g/dia | Qualquer horário (com refeição) | Força, hipertrofia, cognição | ESSENCIAL |
| Vitamina D3 | 2000-5000 UI/dia | Com refeição gordurosa | Saúde hormonal, imunidade | RECOMENDADO |
| Ômega-3 (EPA+DHA) | 2-3g/dia | Com refeições | Anti-inflamatório, saúde cardiovascular | RECOMENDADO |
| Magnésio (bisglicinato) | 200-400mg | Antes de dormir | Sono, recuperação, câimbras | RECOMENDADO |
| Cafeína | 3-6 mg/kg | 30-60 min pré-treino | Performance, foco | OPCIONAL |
| Beta-Alanina | 3.2-6.4g/dia | Dividir em 2 doses | Endurance em séries >60s | OPCIONAL |
| Citrulina Malato | 6-8g | 30-60 min pré-treino | Vasodilatação, performance | OPCIONAL |
| ZMA | Conforme rótulo | Antes de dormir (sem cálcio) | Zinco + Magnésio + B6 | OPCIONAL |
| Multivitamínico | 1 cápsula/dia | Com refeição | Seguro nutricional | CONDICIONAL |

### Notas sobre Suplementação

- Todos os suplementos devem ter registro na ANVISA
- Suplementos NÃO substituem alimentação de qualidade
- Prioridade: ESSENCIAL > RECOMENDADO > OPCIONAL > CONDICIONAL
- Avaliar necessidade individual antes de incluir opcionais
- Ciclagem de cafeína: 2 semanas on / 1 semana off (prevenir tolerância)

---

## 7. Hydration Guidelines — Protocolo de Hidratação

### Meta Diária de Água

| Fator | Cálculo | Valor |
|-------|---------|-------|
| **Base** | Peso corporal × 35ml | `{{base_water}}` ml |
| **Treino** | +500-750ml por hora de treino | `{{training_water}}` ml |
| **Clima quente** | +500ml em dias quentes | `{{climate_water}}` ml |
| **Meta Total** | Base + Treino + Clima | **`{{total_water}}`** ml |

### Distribuição

| Momento | Volume Recomendado |
|---------|-------------------|
| Ao acordar | 500ml (com limão opcional) |
| Entre refeições | 250-500ml |
| Pré-treino (30 min antes) | 500ml |
| Intra-treino | 500-750ml (com eletrólitos se >60min) |
| Pós-treino | 500ml |
| Antes de dormir | 250ml (máximo, para não atrapalhar sono) |

### Sinais de Desidratação

- Urina escura (meta: amarelo claro)
- Sede constante
- Dor de cabeça
- Fadiga no treino
- Câimbras

---

## 8. Cheat Meal / Refeed Guidelines

### Refeed Day (planejado, estratégico)

| Parâmetro | Protocolo |
|-----------|----------|
| **Frequência** | `{{refeed_frequency}}` (1x/sem em cutting, conforme necessidade em bulk) |
| **Ajuste calórico** | Elevar calorias para manutenção ou +10-20% acima TDEE |
| **Macros** | Aumentar CARBOIDRATOS (não gordura); manter proteína |
| **Timing** | Preferencialmente em dia de treino de pernas ou costas (maior gasto) |
| **Objetivo** | Restabelecer leptina, glycogen refill, saúde mental |

### Cheat Meal (flexível, não planejado)

| Regra | Orientação |
|-------|-----------|
| **Frequência máxima** | 1x por semana (se aderência >90% na semana) |
| **Escopo** | UMA refeição, não um dia inteiro |
| **Consciência** | Comer com prazer, sem culpa, mas com consciência |
| **Compensação** | NÃO compensar no dia seguinte (não pular refeições) |
| **Impacto esperado** | +0.5-1.5kg na balança (retenção hídrica, normaliza em 48-72h) |

### Quando Suspender Cheat/Refeed

- Últimas 4 semanas de cutting agressivo
- Peak week (competição)
- Se aderência semanal <80%
- Se houver relação disfuncional com comida (encaminhar psicólogo)

---

## 9. Phase Transition Rules — Regras de Transição

### De Cutting para Manutenção (Reverse Diet)

| Semana | Ajuste | Calorias | Observação |
|--------|--------|----------|-----------|
| 1-2 | +100 kcal (via carboidratos) | `{{rd_week1}}` | Monitorar peso |
| 3-4 | +100 kcal (via carboidratos) | `{{rd_week3}}` | Peso pode subir 0.5-1kg (glycogen) |
| 5-6 | +50-100 kcal (via gordura) | `{{rd_week5}}` | Estabilização |
| 7-8 | Avaliar: manter ou continuar subindo | `{{rd_week7}}` | TDEE atualizado |

### De Manutenção para Bulking

| Etapa | Protocolo |
|-------|----------|
| 1 | Confirmar peso estável por 2+ semanas em manutenção |
| 2 | Adicionar +200-300 kcal (via carboidratos primariamente) |
| 3 | Monitorar ganho de peso semanal (target: 0.25-0.5 kg/sem) |
| 4 | Ajustar a cada 2-3 semanas conforme resposta |

### De Bulking para Cutting

| Etapa | Protocolo |
|-------|----------|
| 1 | Período de manutenção de 2-4 semanas (estabilização metabólica) |
| 2 | Reduzir 300-500 kcal (via carboidratos e gordura, manter proteína) |
| 3 | Monitorar perda de peso semanal (target: 0.5-0.75 kg/sem) |
| 4 | Adicionar cardio gradualmente se necessário (não de uma vez) |
| 5 | Refeed days: 1x/sem quando bodyfat <15% (homens) ou <22% (mulheres) |

---

## 10. Observações do Coach

### Notas para este Protocolo

```
{{coach_notes}}
```

### Ajustes Planejados

| Semana | Ajuste | Motivo |
|--------|--------|--------|
| `{{week}}` | `{{adjustment}}` | `{{reason}}` |

### Red Flags Nutricionais

- Aderência <70% por 2+ semanas → Simplificar plano, reavaliar preferências
- Perda de peso >1.5% do peso corporal/semana → Reduzir déficit
- Ganho de peso >1kg/semana (sem refeed) → Reduzir superávit
- Sintomas de deficiência (queda de cabelo, unhas fracas, fadiga extrema) → Encaminhar médico
- Comportamento alimentar disfuncional → Encaminhar psicólogo/nutricionista clínico

---

## 11. Histórico de Versões

| Versão | Data | Alteração | Coach |
|--------|------|-----------|-------|
| 1.0 | `{{creation_date}}` | Protocolo nutricional inicial | `{{coach_name}}` |
| — | — | — | — |

---

> **Gerado pelo FitCoach Squad — Synkra AIOX**
> Template: `diet-plan-tmpl` v1.0
