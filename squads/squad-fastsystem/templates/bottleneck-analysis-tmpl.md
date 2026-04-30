# Bottleneck Analysis Report

> **Sistema:** {{system_name}}
> **Data:** {{date}}
> **Analista:** {{agent_name}}

---

## Contexto

**Sintoma reportado:** {{symptom}}
**Quando comecou:** {{start_time}}
**Impacto:** {{impact_description}}
**Usuarios afetados:** {{affected_users}}

---

## Critical Path Map

```
{{critical_path_diagram}}
```

### Latencia por Hop

| Hop | Componente | Latencia Media | p99 | % do Total |
|-----|-----------|---------------|-----|------------|
| 1 | {{hop_1}} | {{latency_1}} | {{p99_1}} | {{pct_1}} |
| 2 | {{hop_2}} | {{latency_2}} | {{p99_2}} | {{pct_2}} |
| 3 | {{hop_3}} | {{latency_3}} | {{p99_3}} | {{pct_3}} |
| 4 | {{hop_4}} | {{latency_4}} | {{p99_4}} | {{pct_4}} |
| 5 | {{hop_5}} | {{latency_5}} | {{p99_5}} | {{pct_5}} |

**Latencia total:** {{total_latency}}
**Bottleneck principal:** {{main_bottleneck}} ({{bottleneck_pct}}% do total)

---

## Bottlenecks Identificados

### Bottleneck #1: {{bottleneck_1_name}}

| Campo | Detalhes |
|-------|---------|
| **Componente** | {{component}} |
| **Tipo** | {{type}} (CPU/IO/Memory/Network/Contention) |
| **Severidade** | {{severity}} (P0/P1/P2/P3) |
| **Impacto** | {{impact}} |
| **Evidencia** | {{evidence}} |
| **Root Cause** | {{root_cause}} |

**Dados de suporte:**
```
{{supporting_data}}
```

**Solucao proposta:**
{{proposed_solution}}

**Impacto estimado da solucao:** {{estimated_improvement}}

---

### Bottleneck #2: {{bottleneck_2_name}}

| Campo | Detalhes |
|-------|---------|
| **Componente** | {{component}} |
| **Tipo** | {{type}} |
| **Severidade** | {{severity}} |
| **Impacto** | {{impact}} |
| **Evidencia** | {{evidence}} |
| **Root Cause** | {{root_cause}} |

**Solucao proposta:**
{{proposed_solution}}

---

### Bottleneck #3: {{bottleneck_3_name}}

| Campo | Detalhes |
|-------|---------|
| **Componente** | {{component}} |
| **Tipo** | {{type}} |
| **Severidade** | {{severity}} |
| **Impacto** | {{impact}} |
| **Evidencia** | {{evidence}} |
| **Root Cause** | {{root_cause}} |

**Solucao proposta:**
{{proposed_solution}}

---

## Correlacoes

| Evento | Timestamp | Correlacao |
|--------|-----------|-----------|
| {{event_1}} | {{timestamp_1}} | {{correlation_1}} |
| {{event_2}} | {{timestamp_2}} | {{correlation_2}} |

---

## Plano de Acao

### Imediato (hoje)

| # | Acao | Responsavel | Impacto | Status |
|---|------|------------|---------|--------|
| 1 | {{action_1}} | {{owner}} | {{impact}} | [ ] |

### Curto prazo (esta semana)

| # | Acao | Responsavel | Impacto | Status |
|---|------|------------|---------|--------|
| 1 | {{action_2}} | {{owner}} | {{impact}} | [ ] |

### Medio prazo (este mes)

| # | Acao | Responsavel | Impacto | Status |
|---|------|------------|---------|--------|
| 1 | {{action_3}} | {{owner}} | {{impact}} | [ ] |

---

## Metricas de Validacao

| Metrica | Antes | Target | Depois |
|---------|-------|--------|--------|
| {{metric_1}} | {{before}} | {{target}} | {{after}} |
| {{metric_2}} | {{before}} | {{target}} | {{after}} |

---

## Riscos

| Risco | Probabilidade | Impacto | Mitigacao |
|-------|--------------|---------|-----------|
| {{risk_1}} | {{prob}} | {{impact}} | {{mitigation}} |

---

*Gerado por Squad FastSystem — {{date}}*
