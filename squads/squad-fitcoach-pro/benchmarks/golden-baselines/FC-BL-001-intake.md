# FC-BL-001 — Golden Baseline: Anamnese Completa
# Agente: intake-analyst (Scout)
# Cenário: Mulher, 30 anos, sedentária, hipotireoidismo controlado, quer emagrecer

---

## Input do Cenário

```
Cliente: Fernanda Costa, 30 anos, feminino
Contexto inicial: sedentária, quer emagrecer, hipotireoidismo controlado
```

---

## Output Esperado: Anamnese Completa

### BLOCO 1: Dados Pessoais

| Campo | Valor |
|-------|-------|
| Nome | Fernanda Costa |
| Idade | 30 anos |
| Sexo biológico | Feminino |
| Altura | 1.64m |
| Peso atual | 72kg |
| Cidade | São Paulo — fuso Brasília |
| Profissão | Analista financeira |
| Atividade ocupacional | Sedentária (8h sentada/dia) |
| Disponibilidade | 3x por semana, período noturno |

---

### BLOCO 2: Histórico Médico

| Campo | Valor |
|-------|-------|
| Condição diagnosticada | Hipotireoidismo (Hashimoto) |
| Medicação | Levotiroxina 75mcg/dia, em uso há 2 anos |
| Status | Compensado — TSH 2.1, T4L normal (exame de 45 dias atrás) |
| Cirurgias | Nenhuma |
| Lesões ativas | Nenhuma |
| Alergias | Nenhuma |
| Intolerâncias | Lactose moderada |
| Histórico familiar | Mãe: diabetes tipo 2. Pai: hipertensão |
| Acompanhamento médico | Endocrinologista — consulta a cada 6 meses |

**Clearance médica: LIBERADA** — hipotireoidismo compensado, sem contraindicação para exercício.

---

### BLOCO 3: Histórico de Treino

| Campo | Valor |
|-------|-------|
| Experiência total | 6 meses (academia, há 3 anos) |
| Experiência recente | Nenhuma — pausa de 3 anos |
| Frequência anterior | 2-3x/semana |
| Modalidade | Musculação básica (full body com personal) |
| PRs conhecidos | Desconhece |
| Exercícios evitados | Agachamento (desconforto no joelho direito leve) |
| Técnicas avançadas | Nenhuma |
| Local de treino | Academia (próxima ao trabalho) |

---

### BLOCO 4: Histórico Nutricional

| Campo | Valor |
|-------|-------|
| Dietas anteriores | Low carb (3x, perda de 4-6kg, recuperação total), jejum 16:8 (2 meses) |
| Restrições | Sem lactose (preferência funcional) |
| Suplementos atuais | Nenhum |
| Refeições/dia | 3-4 (café, almoço delivery, jantar irregular) |
| Hidratação | ~1.2L/dia |
| Álcool | Socialmente — fim de semana, ~2x/mês |
| Relação com comida | Padrão emocional noturno — come por ansiedade |
| Preparo | Dependente de delivery (almoço) + cozinha jantar esporadicamente |

---

### BLOCO 5: Objetivos e Expectativas

| Campo | Valor |
|-------|-------|
| Objetivo principal | Emagrecimento — perder 10kg |
| Objetivo secundário | Disposição e saúde geral |
| Prazo declarado | "3 meses" |
| Prazo recalibrado | 20-24 semanas (ritmo de 0.5kg/semana — sustentável) |
| Motivação | Estética + saúde preventiva (histórico familiar) |
| Expectativa recalibrada | SIM — aplicado HEU-INTAKE-003 |
| Comprometimento | 8/10 |
| Experiência com assessoria | Sim (personal 2x na academia, há 3 anos) |

---

### BLOCO 6: Lifestyle

| Campo | Valor |
|-------|-------|
| Nível de estresse | 7/10 |
| Horas de sono | 6.5h |
| Qualidade do sono | Regular — dificuldade para dormir |
| Ergogênicos | Nenhum |
| Atividades além do treino | Caminhada esporádica |
| Viagens | 1x/mês, final de semana |
| Budget alimentação | Já comprometido (delivery) |
| Budget suplementação | R$100-150/mês |

---

## Classificação Automática

| Eixo | Classificação |
|------|---------------|
| Nível de experiência | Iniciante (6 meses, 3 anos de pausa) |
| Objetivo primário | Emagrecimento |
| Restrições | Nível 1 (intolerância lactose + hipotireoidismo compensado) |
| Red Flag detectado | Nenhum |

---

## Flags de Adaptação

```
[FLAG-MÉDICO] Hipotireoidismo compensado com levotiroxina — metabolismo basal
  levemente suprimido vs. eutireoidea. Diet-builder deve usar TDEE conservador
  e monitorar resposta ao déficit quinzenalmente.

[FLAG-NUTRICIONAL] Intolerância à lactose — excluir laticínios ou usar versão
  sem lactose. Proteína whey: testar tolerância. Alternativa: whey isolado ou
  proteína vegetal.

[FLAG-COMPORTAMENTAL] Comer emocional noturno ocasional — diet-builder deve
  alocar refeição noturna satisfatória (proteína + fibra) para reduzir gatilho
  de compulsão.

[FLAG-LIFESTYLE] Estresse 7/10 + sono 6.5h fragmentado — training-builder deve
  usar volume inicial conservador (MEV). Cortisol cronicamente elevado reduz
  recuperação e aumenta retenção de água.

[FLAG-HISTÓRICO] 3 ciclos de dieta restritiva com efeito rebote — diet-builder
  deve priorizar déficit moderado (-300 a -400kcal) sobre abordagem restritiva.
```

---

## Roteamento Recomendado

```
PRIORIDADE 1: diet-builder
  Deficit moderado (-300kcal) | Sem lactose | Refeição noturna estratégica
  Ajuste quinzenal baseado em progresso (hipotireoidismo = metabolismo variável)

PRIORIDADE 2: training-builder
  Programa iniciante 3x/semana | Volume MEV | Evitar agachamento profundo (joelho)
  Foco: preservação muscular durante cut

PRIORIDADE 3: progress-tracker
  Tracking semanal de peso (média de 3 dias) | Medidas quinzenais
  Alerta de sensibilidade: MÉDIA — não focar no número da balança diário

PRIORIDADE 4: automation-engineer
  Check-in semanal | Lembretes de hidratação (1.2L → 2.0L meta)
```

---

## Metadados do Output

```yaml
intake_date: "2026-03-11"
intake_by: intake-analyst
completude: 6/6 blocos preenchidos
red_flag_status: NENHUM
routing_status: APROVADO para Tier 3
quality_gate: FC-QG-001 PASSOU
frameworks_aplicados:
  - Anamnesis Protocol (6 blocos)
  - Client Classification Matrix (3 eixos)
  - Red Flag Detection Framework
  - HEU-INTAKE-003 (calibracao de expectativa)
```
