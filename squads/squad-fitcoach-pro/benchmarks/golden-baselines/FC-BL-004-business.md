# FC-BL-004 — Golden Baseline: Diagnóstico de Negócio
# Agente: business-diagnostician (Pulse)
# Cenário: Academia com 50 alunos, ticket R$150, churn 15%

---

## Input do Cenário

```
Coach: André Lopes, personal trainer e dono de box fitness
Modelo: Presencial (turmas coletivas) + 10 alunos de assessoria online
Alunos ativos: 50
Ticket médio: R$150/mês
Churn mensal: 15%
Tempo operando: 2 anos
Equipe: André + 1 instrutor CLT
```

---

## Diagnóstico Completo — Two-Brain Framework

### Métricas-Chave Calculadas

| Métrica | Valor Atual | Benchmark Saudável | Status |
|---------|-------------|-------------------|--------|
| ARM (Average Revenue per Member) | R$150 | R$250-350 | ABAIXO |
| Churn mensal | 15% | < 5% | CRITICO |
| LTV estimado | 6.7 meses | 18-24 meses | CRITICO |
| Faturamento bruto | R$7.500/mês | — | — |
| Alunos retidos/mês | ~42 | — | — |
| Novos alunos necessários/mês (repor churn) | ~7.5 | 2-3 | ALTO CUSTO |

```
ARM = R$150
LTV = ARM / churn = R$150 / 0.15 = R$1.000 por aluno
Custo para adquirir 1 aluno: estimado R$200-400 (sem funil estruturado)
ROI de aquisição: negativo ou marginal
```

**Diagnóstico central: O negócio está em modo de esteira — ganha novos alunos para repor os que saem, sem crescimento real.**

---

## Value Equation — Alex Hormozi

```
Valor Percebido = (Resultado Sonhado x Probabilidade Percebida) /
                  (Tempo até o Resultado x Esforço/Sacrifício)

Análise atual do negócio de André:

Resultado Sonhado: MÉDIO — alunos vêm "malhar", não têm objetivo claro
Probabilidade Percebida: BAIXA — sem tracking, sem proof of concept visível
Tempo: LONGO percebido — sem marco intermediário, sem vitória rápida
Esforço: ALTO percebido — sem onboarding, sem progressão visível

DIAGNÓSTICO: Baixo valor percebido → churn alto → preço baixo como compensação
```

---

## Revenue Leaks Identificados

### Leak 1: Ticket Abaixo do Mercado (CRÍTICO)

```
R$150/mês = plano básico commodity
Academias de referência em SP: R$200-400/mês para serviço similar
Impacto: +R$50 de ticket com 50 alunos = +R$2.500/mês adicionais
Ação: Repricing com âncora de valor
```

### Leak 2: Sem Oferta de On-Ramp (CRÍTICO)

```
Sem processo de entrada estruturado = aluno não sabe o que esperar
Chris Cooper: On-Ramp de 5 sessões 1:1 antes de turma é standard
Impacto: Churn nos primeiros 60 dias cai 40-60% com on-ramp
Ação: Criar pacote On-Ramp R$400-600 (separado da mensalidade)
```

### Leak 3: Sem E-Commerce ou Produto Digital (ALTO)

```
50 alunos sem oferta de suplementos = R$1.500-2.500/mês na mesa
Produtos digitais (treinos, e-books): receita escalável sem overhead
Ação: Configurar ecommerce-manager para catálogo básico
```

### Leak 4: Sem Acompanhamento Estruturado (ALTO)

```
Aluno sem tracking = aluno que não vê resultado = churn
Sem check-in semanal = coach descobre abandono depois que o aluno sumiu
Ação: automation-engineer para check-in semanal obrigatório
```

---

## Análise de Churn — Hook Model (Nir Eyal)

```
15% churn/mês indica: alunos não formaram hábito de treino

Causa raiz (5 Whys aplicado):
  Por que os alunos saem? → "Não estão vendo resultado"
  Por que não veem resultado? → "Não estão acompanhando progresso"
  Por que não acompanham? → "Não há sistema de tracking"
  Por que não há sistema? → "Coach não estruturou acompanhamento"
  Por que não estruturou? → "Operando no modo reativo, apagando incêndio"

Solução: Instalar habit loop de acompanhamento quinzenal
  Trigger → Check-in fotos + peso (quinzenal)
  Action → Comparar com baseline
  Variable Reward → Ver progresso = dopamina = continuar
  Investment → Dados acumulados = custo de sair (perder histórico)
```

---

## Roadmap de Crescimento — 90 Dias

### Fase 1 — Estancar o Churn (Semanas 1-4)

```
Ação 1: Implementar On-Ramp estruturado
  - 3 sessões 1:1 com novos alunos (avaliação + objetivos + primeiro treino)
  - Custo: 3h de André/aluno | Ganho: redução de 50% no churn dos primeiros 60 dias

Ação 2: Check-in quinzenal obrigatório
  - automation-engineer configura reminder automático
  - progress-tracker gera relatório de evolução
  - Custo: setup 1x | Ganho: visibilidade + retenção

META FASE 1: Churn 15% → 8% em 90 dias
```

### Fase 2 — Aumentar o ARM (Semanas 5-8)

```
Ação 3: Repricing — Modelo em Camadas
  Plano Base:    R$180/mês (ajuste conservador)
  Plano Plus:    R$280/mês (+ assessoria nutricional básica)
  Plano Premium: R$450/mês (+ assessoria individual + suplementos)

  Estratégia: 30% plano premium, 50% plus, 20% base
  ARM projetado: R$295/mês
  Receita projetada com 50 alunos: R$14.750/mês (vs. R$7.500 atual)

Ação 4: Lançar e-commerce de suplementos
  ecommerce-manager configura catálogo de 8-10 itens
  Margem estimada: R$30-50/aluno/mês
  Receita incremental projetada: R$1.500-2.500/mês
```

### Fase 3 — Escalar (Semanas 9-12)

```
Ação 5: Funil de indicação
  Programa "Traga um amigo": desconto R$30/mês para quem indica
  Meta: 30% dos novos alunos via indicação (reduz CAC)

Ação 6: Assessoria online escalável
  10 alunos online atuais → meta 30
  Sem custo de espaço físico
  ARM online: R$200-350/mês
```

---

## Business Health Score

| Dimensão | Peso | Score | Ponderado |
|----------|------|-------|-----------|
| Retenção (churn) | 30% | 2/10 | 0.6 |
| ARM / Precificação | 25% | 3/10 | 0.75 |
| Aquisição de alunos | 20% | 5/10 | 1.0 |
| Operações / Processos | 15% | 4/10 | 0.6 |
| Produto / Experiência | 10% | 5/10 | 0.5 |
| **Total** | 100% | — | **3.45/10** |

**Business Health Score: 34.5/100 — CRÍTICO. Ação imediata necessária em retenção.**

---

## Metadados do Output

```yaml
created_by: business-diagnostician
coach: André Lopes
frameworks_aplicados:
  - Two-Brain Business Framework (Chris Cooper) — ARM, LTV, churn
  - Value Equation (Alex Hormozi) — diagnóstico de percepção de valor
  - Hook Model (Nir Eyal) — análise de causa raiz do churn
  - HEU-BIZ-001 (Metric Gap Detection)
  - HEU-BIZ-002 (Concentration Risk Alert)
  - HEU-BIZ-003 (Quick Win Identification)
quality_gate: FC-QG-004 PASSOU
veto_checks:
  - FC_BD_V001: Métricas reais coletadas antes da recomendação — APROVADO
  - FC_BD_V002: Coach forneceu ARM, alunos e churn — APROVADO
```
