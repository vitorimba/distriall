# Capacity Planning Document

> **Sistema:** {{system_name}}
> **Data:** {{date}}
> **Horizonte:** {{planning_horizon}} (6/12/24 meses)
> **Autor:** {{agent_name}}

---

## Executive Summary

{{executive_summary}}

**Capacidade atual:** {{current_capacity_pct}}% utilizada
**Projecao de saturacao:** {{saturation_date}} sem intervencao
**Investimento necessario:** {{investment_required}}

---

## Inventario de Recursos Atuais

### Compute

| Componente | Tipo/Specs | Quantidade | Utilizacao Atual | Capacidade Max |
|------------|-----------|-----------|------------------|----------------|
| {{comp_1}} | {{specs}} | {{qty}} | {{util}}% | {{max_capacity}} |

### Database

| Componente | Tipo/Specs | Utilizacao Atual | Capacidade Max | Headroom |
|------------|-----------|------------------|----------------|----------|
| {{db_1}} | {{specs}} | {{util}}% | {{max}} | {{headroom}}% |

### Cache

| Componente | Tipo/Specs | Utilizacao Atual | Capacidade Max | Headroom |
|------------|-----------|------------------|----------------|----------|
| {{cache_1}} | {{specs}} | {{util}}% | {{max}} | {{headroom}}% |

### Storage

| Componente | Tipo | Usado | Total | Growth Rate |
|------------|------|-------|-------|-------------|
| {{storage_1}} | {{type}} | {{used}} | {{total}} | {{growth}}/month |

### Network

| Componente | Bandwidth | Utilizacao | Peak | Headroom |
|------------|-----------|-----------|------|----------|
| {{net_1}} | {{bw}} | {{util}}% | {{peak}}% | {{headroom}}% |

---

## Projecao de Demanda

### Metricas de Negocio

| Metrica | Atual | 3 meses | 6 meses | 12 meses |
|---------|-------|---------|---------|----------|
| MAU | {{mau_current}} | {{mau_3m}} | {{mau_6m}} | {{mau_12m}} |
| DAU | {{dau_current}} | {{dau_3m}} | {{dau_6m}} | {{dau_12m}} |
| Transactions/day | {{txn_current}} | {{txn_3m}} | {{txn_6m}} | {{txn_12m}} |
| Data volume | {{data_current}} | {{data_3m}} | {{data_6m}} | {{data_12m}} |

**Growth rate:** {{growth_rate}}% MoM
**Spike factor:** {{spike_factor}}x (eventos/promos)
**Sazonalidade:** {{seasonality_pattern}}

### Projecao de Recursos

| Recurso | Atual | 6 meses | 12 meses | Acao Necessaria |
|---------|-------|---------|----------|-----------------|
| App servers | {{current}} | {{proj_6m}} | {{proj_12m}} | {{action}} |
| DB capacity | {{current}} | {{proj_6m}} | {{proj_12m}} | {{action}} |
| Cache memory | {{current}} | {{proj_6m}} | {{proj_12m}} | {{action}} |
| Storage | {{current}} | {{proj_6m}} | {{proj_12m}} | {{action}} |
| Bandwidth | {{current}} | {{proj_6m}} | {{proj_12m}} | {{action}} |

---

## Scaling Strategy

### Compute

| Estrategia | Trigger | Acao | Tempo de Resposta |
|-----------|---------|------|-------------------|
| Auto-scale out | CPU > 70% for 5 min | Add instance | ~3 min |
| Auto-scale in | CPU < 30% for 15 min | Remove instance | ~5 min |
| Vertical scale | Consistent > 80% | Upgrade instance type | Maintenance window |

**Min/Max instances:** {{min}} / {{max}}
**Scaling increment:** {{increment}} instances

### Database

| Marco | Trigger | Acao |
|-------|---------|------|
| Phase 1 | Connection pool > 60% | Add read replicas |
| Phase 2 | Write throughput > 70% | Vertical scaling |
| Phase 3 | Data > {{threshold}} | Sharding / Partitioning |

### Cache

| Marco | Trigger | Acao |
|-------|---------|------|
| Phase 1 | Memory > 70% | Increase memory |
| Phase 2 | Single node limits | Enable cluster mode |
| Phase 3 | Hot key issues | Sharding strategy |

---

## Projecao de Custos

### Mensal

| Componente | Atual | 6 meses | 12 meses | Delta |
|------------|-------|---------|----------|-------|
| Compute | {{cost_compute}} | {{cost_6m}} | {{cost_12m}} | {{delta}} |
| Database | {{cost_db}} | {{cost_6m}} | {{cost_12m}} | {{delta}} |
| Cache | {{cost_cache}} | {{cost_6m}} | {{cost_12m}} | {{delta}} |
| Storage | {{cost_storage}} | {{cost_6m}} | {{cost_12m}} | {{delta}} |
| Network/CDN | {{cost_net}} | {{cost_6m}} | {{cost_12m}} | {{delta}} |
| Monitoring | {{cost_mon}} | {{cost_6m}} | {{cost_12m}} | {{delta}} |
| **Total** | **{{total_current}}** | **{{total_6m}}** | **{{total_12m}}** | **{{total_delta}}** |

### Custo por Usuario

| Metrica | Atual | 6 meses | 12 meses |
|---------|-------|---------|----------|
| Cost/MAU | {{cpu_mau}} | {{cpu_6m}} | {{cpu_12m}} |
| Cost/Transaction | {{cpu_txn}} | {{cpu_6m}} | {{cpu_12m}} |

---

## Alertas e Thresholds

| Alerta | Condicao | Severidade | Acao |
|--------|----------|-----------|------|
| CPU High | > 70% sustained 10min | Warning | Auto-scale |
| CPU Critical | > 90% sustained 5min | Critical | Page on-call |
| Memory High | > 80% | Warning | Investigate |
| DB Connections | > 80% of max | Warning | Scale pool |
| Disk Space | > 80% | Warning | Cleanup/expand |
| Capacity Threshold | Any resource > 70% | Info | Create ticket |

---

## Riscos

| Risco | Probabilidade | Impacto | Mitigacao | Owner |
|-------|--------------|---------|-----------|-------|
| {{risk_1}} | {{prob}} | {{impact}} | {{mitigation}} | {{owner}} |

---

## Timeline de Acoes

| Quando | Acao | Custo | Impacto |
|--------|------|-------|---------|
| Imediato | {{action_1}} | {{cost}} | {{impact}} |
| 3 meses | {{action_2}} | {{cost}} | {{impact}} |
| 6 meses | {{action_3}} | {{cost}} | {{impact}} |
| 12 meses | {{action_4}} | {{cost}} | {{impact}} |

---

## Aprovacoes

| Stakeholder | Status | Data |
|-------------|--------|------|
| Engineering Lead | [ ] Aprovado | |
| Finance | [ ] Aprovado | |
| Product | [ ] Aprovado | |

---

*Gerado por Squad FastSystem — {{date}}*
