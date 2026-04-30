# Performance Audit Report

> **Sistema:** {{system_name}}
> **Data:** {{date}}
> **Auditor:** {{agent_name}}
> **Versao:** {{version}}

---

## Executive Summary

{{executive_summary}}

**Status geral:** {{status}} (Critico | Atencao | Saudavel)

**Melhoria estimada com otimizacoes:** {{estimated_improvement}}%

---

## Metodologia

| Item | Detalhes |
|------|---------|
| Metodologia | USE Method (Utilization, Saturation, Errors) |
| Periodo de analise | {{analysis_period}} |
| Ferramentas utilizadas | {{tools_list}} |
| Ambiente | {{environment}} (producao/staging) |
| Carga durante analise | {{load_during_analysis}} |

---

## Metricas Baseline

### Response Times

| Metrica | Valor Atual | Target | Status |
|---------|-------------|--------|--------|
| p50 response time | {{p50_current}} | {{p50_target}} | {{status}} |
| p95 response time | {{p95_current}} | {{p95_target}} | {{status}} |
| p99 response time | {{p99_current}} | {{p99_target}} | {{status}} |
| TTFB | {{ttfb_current}} | {{ttfb_target}} | {{status}} |

### Throughput

| Metrica | Valor Atual | Target | Status |
|---------|-------------|--------|--------|
| Requests/second | {{rps_current}} | {{rps_target}} | {{status}} |
| Error rate | {{error_rate}} | < 0.1% | {{status}} |
| Concurrent users | {{concurrent_users}} | {{concurrent_target}} | {{status}} |

### Web Vitals (se aplicavel)

| Metrica | Valor Atual | Target | Status |
|---------|-------------|--------|--------|
| LCP | {{lcp_current}} | < 2.5s | {{status}} |
| FID/INP | {{inp_current}} | < 200ms | {{status}} |
| CLS | {{cls_current}} | < 0.1 | {{status}} |
| FCP | {{fcp_current}} | < 1.8s | {{status}} |

---

## USE Method Results

### CPU

| Aspecto | Valor | Avaliacao |
|---------|-------|-----------|
| Utilization | {{cpu_util}}% | {{cpu_util_eval}} |
| Saturation | Load avg: {{load_avg}} | {{cpu_sat_eval}} |
| Errors | {{cpu_errors}} | {{cpu_err_eval}} |

**Diagnostico:** {{cpu_diagnosis}}

### Memoria

| Aspecto | Valor | Avaliacao |
|---------|-------|-----------|
| Utilization | {{mem_util}}% ({{mem_used}}/{{mem_total}}) | {{mem_util_eval}} |
| Saturation | Swap: {{swap_usage}} | {{mem_sat_eval}} |
| Errors | {{mem_errors}} | {{mem_err_eval}} |

**Diagnostico:** {{memory_diagnosis}}

### Disco/IO

| Aspecto | Valor | Avaliacao |
|---------|-------|-----------|
| Utilization | {{disk_util}}% | {{disk_util_eval}} |
| Saturation | IO wait: {{io_wait}}%, Queue: {{io_queue}} | {{disk_sat_eval}} |
| Errors | {{disk_errors}} | {{disk_err_eval}} |

**Diagnostico:** {{disk_diagnosis}}

### Rede

| Aspecto | Valor | Avaliacao |
|---------|-------|-----------|
| Utilization | {{net_util}} | {{net_util_eval}} |
| Saturation | Retransmissions: {{retrans}}% | {{net_sat_eval}} |
| Errors | Drops: {{drops}}, Overflows: {{overflows}} | {{net_err_eval}} |

**Diagnostico:** {{network_diagnosis}}

---

## Gargalos Identificados

### P0 — Criticos

| # | Gargalo | Componente | Impacto | Evidencia |
|---|---------|-----------|---------|-----------|
| 1 | {{bottleneck_1}} | {{component}} | {{impact}} | {{evidence}} |

### P1 — Altos

| # | Gargalo | Componente | Impacto | Evidencia |
|---|---------|-----------|---------|-----------|
| 1 | {{bottleneck_2}} | {{component}} | {{impact}} | {{evidence}} |

### P2 — Medios

| # | Gargalo | Componente | Impacto | Evidencia |
|---|---------|-----------|---------|-----------|
| 1 | {{bottleneck_3}} | {{component}} | {{impact}} | {{evidence}} |

### P3 — Baixos

| # | Gargalo | Componente | Impacto | Evidencia |
|---|---------|-----------|---------|-----------|
| 1 | {{bottleneck_4}} | {{component}} | {{impact}} | {{evidence}} |

---

## Recomendacoes

### Quick Wins (< 1 dia)

| # | Acao | Impacto Estimado | Esforco | Prioridade |
|---|------|-----------------|---------|------------|
| 1 | {{action}} | {{impact}} | {{effort}} | {{priority}} |

### Medium Term (1-5 dias)

| # | Acao | Impacto Estimado | Esforco | Prioridade |
|---|------|-----------------|---------|------------|
| 1 | {{action}} | {{impact}} | {{effort}} | {{priority}} |

### Long Term (> 5 dias)

| # | Acao | Impacto Estimado | Esforco | Prioridade |
|---|------|-----------------|---------|------------|
| 1 | {{action}} | {{impact}} | {{effort}} | {{priority}} |

---

## Flame Graph

{{flame_graph_path}}

**Observacoes:**
- {{flame_graph_observations}}

---

## Proximos Passos

1. [ ] {{next_step_1}}
2. [ ] {{next_step_2}}
3. [ ] {{next_step_3}}
4. [ ] {{next_step_4}}
5. [ ] {{next_step_5}}

---

## Anexos

- [ ] Flame graph SVG
- [ ] Raw metrics data
- [ ] EXPLAIN ANALYZE outputs
- [ ] Lighthouse reports
- [ ] Load test results

---

*Gerado por Squad FastSystem — {{date}}*
