# Smoke Test Suite — Squad FastSystem

> 33 smoke tests (3 por agente) para validacao rapida de funcionalidade
> Executar apos mudancas estruturais no squad

---

## Performance Lead (Blaze)

| # | Test | Input | Expected Output | Status |
|---|------|-------|----------------|--------|
| 1 | Bottleneck analysis initiation | Sistema com latencia alta | Critical path mapeado com latencia por hop | [ ] |
| 2 | Performance budget definition | Baseline de metricas | Budgets quantitativos por camada | [ ] |
| 3 | Capacity planning assessment | Metricas de utilizacao + growth rate | Projecao 6/12 meses com custos | [ ] |

---

## System Profiler (Probe)

| # | Test | Input | Expected Output | Status |
|---|------|-------|----------------|--------|
| 4 | USE method diagnostic | Sistema com problema de CPU | USE method completo para 4 recursos | [ ] |
| 5 | Flame graph generation | PID de processo com CPU alto | Flame graph SVG com hot paths | [ ] |
| 6 | Baseline capture | Sistema em estado normal | Metricas p50/p95/p99 documentadas | [ ] |

---

## Observability Engineer (Lens)

| # | Test | Input | Expected Output | Status |
|---|------|-------|----------------|--------|
| 7 | Instrumentation assessment | App sem tracing | Plano de instrumentacao com OTel | [ ] |
| 8 | SLO/SLI definition | Requisitos de disponibilidade | SLOs e SLIs quantitativos definidos | [ ] |
| 9 | Alert configuration | Metricas criticas | Alertas com thresholds e routing | [ ] |

---

## Frontend Performance (Pixel)

| # | Test | Input | Expected Output | Status |
|---|------|-------|----------------|--------|
| 10 | Lighthouse audit | URL de producao | Lighthouse report com score e recomendacoes | [ ] |
| 11 | Core Web Vitals analysis | Pagina com LCP > 4s | Root cause do LCP alto com fix proposto | [ ] |
| 12 | Bundle analysis | Build de producao | Bundle composition com dependencias grandes | [ ] |

---

## Database Optimizer (Query)

| # | Test | Input | Expected Output | Status |
|---|------|-------|----------------|--------|
| 13 | Query optimization | Query com Seq Scan | Query otimizada com index, EXPLAIN antes/depois | [ ] |
| 14 | Index strategy design | Workload de top 10 queries | Indices compostos justificados | [ ] |
| 15 | Unused index cleanup | pg_stat_user_indexes data | Lista de indices para remocao com justificativa | [ ] |

---

## API Performance (Flux)

| # | Test | Input | Expected Output | Status |
|---|------|-------|----------------|--------|
| 16 | N+1 detection | Endpoint com N+1 | Fix com JOIN/batch, antes/depois documentado | [ ] |
| 17 | Pagination implementation | Lista retornando 10K items | Cursor-based pagination implementada | [ ] |
| 18 | Latency decomposition | Endpoint com p95 > 1s | Breakdown de latencia por camada | [ ] |

---

## Resilience Engineer (Shield)

| # | Test | Input | Expected Output | Status |
|---|------|-------|----------------|--------|
| 19 | Circuit breaker assessment | Servico com dependencia instavel | Circuit breaker config com fallback | [ ] |
| 20 | Timeout audit | API sem timeouts explicitos | Timeouts definidos para todas as dependencias | [ ] |
| 21 | Graceful degradation test | Cenario: cache down | Comportamento documentado: degrada vs crash | [ ] |

---

## Load Tester (Surge)

| # | Test | Input | Expected Output | Status |
|---|------|-------|----------------|--------|
| 22 | Load test script creation | User journey descrito | k6 script funcional com thresholds | [ ] |
| 23 | Stress test execution | Sistema em staging | Ponto de ruptura identificado | [ ] |
| 24 | Soak test analysis | 4h de load test | Analise de memory leaks e degradacao | [ ] |

---

## DevOps Performance (Pipe)

| # | Test | Input | Expected Output | Status |
|---|------|-------|----------------|--------|
| 25 | DORA metrics baseline | Pipeline CI/CD ativo | 4 DORA metrics com classificacao | [ ] |
| 26 | Pipeline optimization | Pipeline > 30 min | Plano de reducao com caching e paralelismo | [ ] |
| 27 | Deployment strategy review | Deploy manual | Recomendacao: blue-green/canary com config | [ ] |

---

## Distributed Systems (Mesh)

| # | Test | Input | Expected Output | Status |
|---|------|-------|----------------|--------|
| 28 | Architecture scalability review | Monolito com 100K users | Gaps de escalabilidade identificados | [ ] |
| 29 | Consistency model selection | Servico com cache + DB | Trade-offs AP/CP documentados por operacao | [ ] |
| 30 | Partition strategy | Tabela com 1B rows | Estrategia de particionamento (range/hash) | [ ] |

---

## Caching Specialist (Cache)

| # | Test | Input | Expected Output | Status |
|---|------|-------|----------------|--------|
| 31 | Multi-layer cache design | API com read-heavy workload | Cache strategy com browser/CDN/Redis/DB layers | [ ] |
| 32 | Invalidation strategy | Cache com stale data reports | Invalidation patterns por tipo de dado | [ ] |
| 33 | Cache warming plan | Deploy com cold cache | Warming script com top N hot keys | [ ] |

---

## Execucao

### Como executar

```bash
# Executar todos os smoke tests
@fastsystem *smoke-test

# Executar smoke tests de um agente especifico
@fastsystem *smoke-test --agent=database-optimizer
```

### Criterios de sucesso

- **Pass:** Todas as 33 smoke tests produzem output esperado
- **Partial:** >= 27/33 (> 80%) tests passam
- **Fail:** < 27/33 tests passam

### Frequencia

- Apos mudancas estruturais no squad
- Apos adicao/modificacao de minds
- Apos atualizacao de heuristics
- Mensalmente como validacao de rotina

---

*Squad FastSystem — Smoke Test Suite v1.0.0*
