# FS-T-007: Resilience Audit

> Avaliacao de padroes de estabilidade e resiliencia do sistema

---

## Task Anatomy

| Field | Value |
|-------|-------|
| **ID** | FS-T-007 |
| **Name** | resilience-audit |
| **Agent** | resilience-engineer (Shield) |
| **Execution Type** | Agent |
| **Responsible Executor** | resilience-engineer (Shield) |
| **Mind** | michael_nygard |
| **Priority** | High |
| **Estimated Duration** | 3-5 hours |
| **Dependencies** | FS-T-001 |
| **Output** | Resilience audit report |

---

## Descricao

Avalia a resiliencia do sistema contra falhas parciais, sobrecarga e degradacao. Verifica implementacao de circuit breakers, bulkheads, retry policies, timeouts, graceful degradation e fallback strategies. Baseado nos padroes de "Release It!" de Michael Nygard.

---

## Pre-Conditions

- [ ] Arquitetura do sistema documentada
- [ ] Dependencias externas mapeadas
- [ ] SLAs/SLOs definidos
- [ ] Acesso ao codigo fonte

---

## Steps

### Step 1: Mapear Dependencias e Modos de Falha

**Objetivo:** Identificar cada dependencia e como ela pode falhar

```
Para cada dependencia:
- Nome e tipo (DB, API, Cache, Queue, File system)
- SLA declarado
- Modo de falha: timeout, error, slow, unavailable
- Impacto no sistema: critical, degraded, cosmetic
- Fallback disponivel: sim/nao
```

**Heuristica aplicada:** MN_RE_001 — "Todo ponto de integracao e um ponto de falha — cada um precisa de timeout, retry e fallback"

### Step 2: Avaliar Circuit Breakers

**Objetivo:** Verificar implementacao de circuit breakers

```
Checklist por dependencia:
- [ ] Circuit breaker implementado
- [ ] Threshold de abertura definido (error rate ou count)
- [ ] Half-open state configurado
- [ ] Fallback definido para estado aberto
- [ ] Metricas de estado expostas
- [ ] Alertas configurados para estado aberto
```

**Configuracao recomendada:**
```yaml
circuit_breaker:
  failure_threshold: 5        # falhas para abrir
  success_threshold: 3        # sucessos para fechar
  timeout: 30s                # tempo em aberto antes de half-open
  monitoring: true
  fallback: "cached_response" # ou "default_value"
```

### Step 3: Avaliar Timeouts e Retries

**Objetivo:** Verificar politicas de timeout e retry

```
Regra de ouro:
- Timeout < SLA do endpoint
- Retry budget < 3 tentativas
- Exponential backoff com jitter
- Total time (retries inclusos) < user expectation

Anti-pattern: retry sem backoff = amplificacao de falha
Anti-pattern: retry em erros nao-transientes (400, 403, 404)
```

**Heuristica aplicada:** MN_RE_002 — "Timeouts devem ser explicitamente configurados em TODO ponto de integracao — nunca confie no default"

### Step 4: Avaliar Bulkhead Pattern

**Objetivo:** Verificar isolamento de recursos

```
Checklist:
- [ ] Thread pools separados por dependencia
- [ ] Connection pools independentes
- [ ] Rate limiting por tenant/cliente
- [ ] Resource quotas configurados
- [ ] Uma falha nao cascata para outros servicos
```

### Step 5: Avaliar Graceful Degradation

**Objetivo:** Verificar comportamento sob falha parcial

```
Cenarios de teste:
1. Database down → Sistema retorna cached data? Error page?
2. Cache down → Sistema funciona (mais lento)? Crash?
3. External API down → Fallback? Queue? Error?
4. Disk full → Graceful shutdown? Alerta?
5. Memory pressure → GC tuning? OOM protection?
```

### Step 6: Avaliar Health Checks

**Objetivo:** Verificar health check endpoints

```
Checklist:
- [ ] /health endpoint implementado
- [ ] Liveness probe (processo vivo?)
- [ ] Readiness probe (pronto para receber trafego?)
- [ ] Dependency health checks (DB, Cache, APIs)
- [ ] Health check nao sobrecarrega sistema
```

### Step 7: Chaos Engineering Readiness

**Objetivo:** Avaliar prontidao para chaos engineering

```
Niveis de maturidade:
1. Manual: pode simular falha manualmente
2. Scripted: scripts de falha prontos
3. Automated: chaos experiments em CI/CD
4. Continuous: chaos em producao com guardrails
```

### Step 8: Relatorio de Resiliencia

**Objetivo:** Documentar gaps e recomendacoes

---

## Post-Conditions

- [ ] Todas dependencias mapeadas com modos de falha
- [ ] Circuit breakers avaliados
- [ ] Timeout/retry policies verificadas
- [ ] Gaps de resiliencia classificados por severidade
- [ ] Recomendacoes priorizadas

---

## Veto Conditions

| ID | Condicao | Severidade |
|----|----------|------------|
| FS-V-060 | Dependencia sem timeout configurado | BLOCK |
| FS-V-061 | Retry sem exponential backoff | WARN |
| FS-V-062 | Servico critico sem circuit breaker | BLOCK |
| FS-V-063 | Health check que testa apenas liveness | WARN |
| FS-V-064 | Cascading failure possivel entre servicos | BLOCK |

---

## Quality Gates

- [ ] 100% das dependencias com timeout explicito
- [ ] Circuit breakers em todas as dependencias criticas
- [ ] Graceful degradation testado para top 3 falhas
- [ ] Health checks com liveness e readiness
- [ ] Retry policies com backoff e budget

---

## Ferramentas

| Ferramenta | Uso |
|------------|-----|
| `resilience4j` | Circuit breakers (Java) |
| `polly` | Resilience (.NET) |
| `opossum` | Circuit breakers (Node.js) |
| `litmus` | Chaos engineering (K8s) |
| `gremlin` | Chaos engineering platform |

---

## Referencia

- Michael Nygard, "Release It!", 2nd Edition, 2018
- Stability Patterns: Circuit Breaker, Bulkhead, Timeout, Retry

---

*Task FS-T-007 v1.0.0 — Squad FastSystem*
