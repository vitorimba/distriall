# FC-BL-003 — Golden Baseline: Plano Nutricional para Cutting
# Agente: diet-builder (Nourish)
# Cenário: Homem, 85kg, 18% BF, objetivo atingir 12% BF

---

## Input do Cenário

```
Aluno: Marcelo Tavares, 28 anos, masculino
Peso atual: 85kg | BF%: 18% | Massa magra: ~69.7kg
Objetivo: Cutting — atingir 12% BF (meta: ~78-79kg)
Experiência: Intermediário (2.5 anos)
Treino: PPL 4x/semana
Restrições: Nenhuma alimentar
Suplementação atual: Creatina 5g/dia
TDEE estimado: 2.800kcal/dia (moderadamente ativo)
```

---

## Cálculo de Macros

### Passo 1 — Proteína (prioridade absoluta)

```
Protocolo: 2.2g/kg de massa magra (Layne Norton — evidência base)
Massa magra: 69.7kg
Proteína: 69.7 x 2.2 = 153g (~155g arredondado)
Calorias da proteína: 155 x 4 = 620kcal
```

### Passo 2 — Déficit Calórico

```
TDEE: 2.800kcal
Déficit alvo: -500kcal/dia (meta: ~0.5kg/semana)
  Justificativa: 18% BF → 12% = ~6kg de gordura a perder
  Tempo estimado com -500kcal: 16-18 semanas (ritmo sustentável)
  Máximo seguro sem perda muscular para intermediário: -500kcal
Meta calórica: 2.300kcal/dia
```

### Passo 3 — Gordura (mínimo hormonal)

```
Protocolo: 25-30% das calorias totais
Gordura: 2.300 x 0.27 = 621kcal / 9 = 69g de gordura
```

### Passo 4 — Carboidratos (saldo)

```
Calorias totais: 2.300kcal
Proteína: 620kcal
Gordura: 621kcal
Carboidratos: 2.300 - 620 - 621 = 1.059kcal / 4 = 265g de carboidrato
```

### Resumo de Macros

| Macro | Gramas | Kcal | % Total |
|-------|--------|------|---------|
| Proteína | 155g | 620 | 27% |
| Carboidrato | 265g | 1.060 | 46% |
| Gordura | 69g | 621 | 27% |
| **Total** | — | **2.301** | 100% |

---

## Plano Alimentar — Dia de Treino

### Refeição 1 — Café da Manhã (07h)

| Alimento | Quantidade |
|----------|------------|
| Ovos inteiros | 3 unidades |
| Claras | 3 unidades |
| Aveia em flocos | 60g |
| Banana prata | 1 unidade média (80g) |

*Macros: P: 37g | C: 68g | G: 14g | ~550kcal*

---

### Refeição 2 — Pré-Treino (12h ou 30-60min antes)

| Alimento | Quantidade |
|----------|------------|
| Arroz branco cozido | 150g |
| Frango grelhado (peito) | 150g |
| Brócolis ou abobrinha | 100g |
| Azeite | 5ml |

*Macros: P: 42g | C: 55g | G: 8g | ~460kcal*

---

### Refeição 3 — Pós-Treino (imediato, até 1h)

| Alimento | Quantidade |
|----------|------------|
| Whey protein (isolado) | 40g (1.5 scoops) |
| Mel | 10g |
| Maçã | 1 unidade (150g) |

*Macros: P: 34g | C: 48g | G: 2g | ~346kcal*

---

### Refeição 4 — Almoço/Jantar (18h)

| Alimento | Quantidade |
|----------|------------|
| Patinho moído (95% magro) | 150g |
| Batata doce cozida | 200g |
| Salada verde | à vontade |
| Azeite | 10ml |

*Macros: P: 38g | C: 64g | G: 17g | ~557kcal*

---

### Refeição 5 — Ceia (21h)

| Alimento | Quantidade |
|----------|------------|
| Queijo cottage | 200g |
| Amendoim (sem sal) | 20g |

*Macros: P: 29g | C: 8g | G: 14g | ~274kcal*

---

### Ajuste Dia de Descanso

```
Protocolo HEU-DIET-002 (Training Load Alignment):
  Dia de descanso: -50g carboidrato (-200kcal)
  Total: 2.100kcal | C: 215g | P: 155g | G: 69g
  Redistribuir: reduzir arroz do almoço e batata doce
```

---

## Protocolo de Suplementação

| Suplemento | Dose | Timing | Evidência |
|------------|------|--------|-----------|
| Creatina monohidratada | 5g/dia | Qualquer horário | Tier A — máxima evidência |
| Whey protein isolado | 40g | Pós-treino | Tier A — praticidade |
| Vitamina D3 + K2 | 5.000UI + 100mcg | Manhã com gordura | Tier B — deficiência comum |
| Ômega-3 | 2g EPA+DHA | Refeição | Tier B — anti-inflamatório |
| Cafeína (pré-treino) | 200mg | 30min pré-treino | Tier A — performance |

*Nenhum suplemento termogênico ou fat burner — sem evidência suficiente.*

---

## Gatilhos de Ajuste

```
GATILHO DE AJUSTE SEMANAL:
  Avaliar média de peso (3 medições em dias consecutivos = média)

  SE perda < 0.3kg/semana por 2 semanas consecutivas:
    → Reduzir 150kcal (30g carboidrato)
    → Verificar aderência antes de reduzir

  SE perda > 0.8kg/semana por 2 semanas consecutivas:
    → Adicionar 100-150kcal (proteína ou carboidrato)
    → Proteção muscular é prioridade

  GATILHO DE REVERSE DIET (ao atingir 12% BF):
    → Semana 1: +100kcal/dia
    → A cada 2 semanas: +100kcal se peso estável
    → Meta: retornar ao TDEE em 8-12 semanas
    → NÃO fazer bulk agressivo pós-cutting
```

---

## Metadados do Output

```yaml
created_by: diet-builder
aluno: Marcelo Tavares
frameworks_aplicados:
  - Layne Norton — Protein-First Prescription (2.2g/kg LBM)
  - IIFYM com ajuste de cycling (treino vs. descanso)
  - Supplement Hierarchy Tier A-D
  - HEU-DIET-001 (Adherence Over Perfection — alimentos reais e acessíveis)
  - HEU-DIET-002 (Training Load Alignment — carb cycling)
  - HEU-DIET-003 (Phase Transition Safety — reverse diet planejada)
quality_gate: FC-QG-003 PASSOU
veto_checks:
  - FC_DB_V001: 2.300kcal acima de 1.500kcal mínimo para homens — APROVADO
  - FC_DB_V002: Sem alergias no perfil — APROVADO
  - FC_DB_V003: Intake completo referenciado — APROVADO
```
