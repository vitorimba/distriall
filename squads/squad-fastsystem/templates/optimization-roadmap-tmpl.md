# Optimization Roadmap

> **Sistema:** {{system_name}}
> **Data:** {{date}}
> **Autor:** {{agent_name}}
> **Horizonte:** {{horizon}}

---

## Resumo

**Objetivo:** {{objective}}
**Melhoria total projetada:** {{total_improvement}}%
**Investimento estimado:** {{total_investment}} (horas)
**ROI projetado:** {{roi}}

---

## Priorizacao Matrix

### Impact vs Effort

```
High Impact │ Quick Wins    │ Major Projects
            │ (DO FIRST)    │ (PLAN & DO)
            │               │
            ├───────────────┼───────────────
            │ Fill-ins      │ Thankless Tasks
Low Impact  │ (DO IF TIME)  │ (AVOID)
            │               │
            └───────────────┴───────────────
              Low Effort      High Effort
```

---

## Phase 1: Quick Wins (Semana 1)

**Meta:** Ganhos rapidos com minimo esforco

| # | Otimizacao | Camada | Impacto Est. | Esforco | Responsavel | Status |
|---|-----------|--------|-------------|---------|------------|--------|
| 1 | {{opt_1}} | {{layer}} | {{impact}} | {{effort}} | {{owner}} | [ ] |
| 2 | {{opt_2}} | {{layer}} | {{impact}} | {{effort}} | {{owner}} | [ ] |
| 3 | {{opt_3}} | {{layer}} | {{impact}} | {{effort}} | {{owner}} | [ ] |

**Metricas de validacao:**
- {{metric_1}}: {{before}} → {{target}}
- {{metric_2}}: {{before}} → {{target}}

---

## Phase 2: Core Optimizations (Semanas 2-3)

**Meta:** Atacar os maiores gargalos identificados

| # | Otimizacao | Camada | Impacto Est. | Esforco | Responsavel | Status |
|---|-----------|--------|-------------|---------|------------|--------|
| 1 | {{opt_4}} | {{layer}} | {{impact}} | {{effort}} | {{owner}} | [ ] |
| 2 | {{opt_5}} | {{layer}} | {{impact}} | {{effort}} | {{owner}} | [ ] |
| 3 | {{opt_6}} | {{layer}} | {{impact}} | {{effort}} | {{owner}} | [ ] |

**Dependencias:**
- {{dependency_1}}
- {{dependency_2}}

**Metricas de validacao:**
- {{metric_3}}: {{before}} → {{target}}

---

## Phase 3: Architecture Improvements (Semanas 4-6)

**Meta:** Mudancas arquiteturais para ganhos de longo prazo

| # | Otimizacao | Camada | Impacto Est. | Esforco | Responsavel | Status |
|---|-----------|--------|-------------|---------|------------|--------|
| 1 | {{opt_7}} | {{layer}} | {{impact}} | {{effort}} | {{owner}} | [ ] |
| 2 | {{opt_8}} | {{layer}} | {{impact}} | {{effort}} | {{owner}} | [ ] |

**Riscos:**
- {{risk_1}}: {{mitigation}}

---

## Phase 4: Validation & Hardening (Semana 7)

**Meta:** Validar todas as otimizacoes e garantir resiliencia

| # | Acao | Responsavel | Status |
|---|------|------------|--------|
| 1 | Load test completo | load-tester | [ ] |
| 2 | Soak test (4h) | load-tester | [ ] |
| 3 | Resilience test | resilience-engineer | [ ] |
| 4 | Performance budget enforcement | performance-lead | [ ] |
| 5 | Documentacao final | performance-lead | [ ] |

---

## Tracking Dashboard

### Progresso Geral

| Phase | Status | Otimizacoes | Completas | Melhoria Acumulada |
|-------|--------|------------|-----------|-------------------|
| Quick Wins | {{status}} | {{total}} | {{done}} | {{improvement}} |
| Core | {{status}} | {{total}} | {{done}} | {{improvement}} |
| Architecture | {{status}} | {{total}} | {{done}} | {{improvement}} |
| Validation | {{status}} | {{total}} | {{done}} | {{improvement}} |

### Metricas Chave

| Metrica | Baseline | Atual | Target | Delta |
|---------|----------|-------|--------|-------|
| p95 response time | {{baseline}} | {{current}} | {{target}} | {{delta}} |
| Throughput (req/s) | {{baseline}} | {{current}} | {{target}} | {{delta}} |
| Error rate | {{baseline}} | {{current}} | {{target}} | {{delta}} |
| LCP | {{baseline}} | {{current}} | {{target}} | {{delta}} |

---

## Riscos do Roadmap

| Risco | Prob | Impacto | Mitigacao |
|-------|------|---------|-----------|
| {{risk_1}} | {{prob}} | {{impact}} | {{mitigation}} |
| {{risk_2}} | {{prob}} | {{impact}} | {{mitigation}} |

---

## Criterios de Sucesso

- [ ] p95 response time reduzido em >= {{target_reduction}}%
- [ ] Throughput aumentado em >= {{target_throughput}}%
- [ ] Error rate < {{target_error_rate}}%
- [ ] Web Vitals dentro dos targets
- [ ] Load test 10x passando
- [ ] Zero regressoes introduzidas

---

*Gerado por Squad FastSystem — {{date}}*
