# Resilience Checklist

> Checklist de padroes de estabilidade e resiliencia
> Baseado em "Release It!" — Michael Nygard

---

## 1. Timeouts

### CRITICAL
- [ ] Timeout explicito em TODAS as chamadas HTTP externas
- [ ] Timeout em conexoes de banco de dados
- [ ] Timeout em operacoes de cache (Redis)
- [ ] Timeout em message queue operations

### HIGH
- [ ] Connect timeout separado de read timeout
- [ ] Timeout total < SLA do endpoint
- [ ] Timeout documentado para cada dependencia
- [ ] Fallback definido para timeout

### MEDIUM
- [ ] Timeout ajustavel via configuracao (nao hardcoded)
- [ ] Metricas de timeout por dependencia
- [ ] Alertas para taxa de timeout > threshold

---

## 2. Circuit Breakers

### CRITICAL
- [ ] Circuit breaker em cada dependencia externa
- [ ] Fallback definido para estado "open"
- [ ] Metricas de estado do circuit breaker expostas
- [ ] Alertas para circuit breaker aberto

### HIGH
- [ ] Threshold de abertura configurado (failure rate ou count)
- [ ] Half-open state com probe automatico
- [ ] Success threshold para fechamento
- [ ] Timeout no estado aberto antes de half-open

### MEDIUM
- [ ] Dashboard com estado de todos os circuit breakers
- [ ] Circuit breaker por operacao (nao apenas por servico)
- [ ] Manual override (force open/close) disponivel

---

## 3. Retry Policies

### CRITICAL
- [ ] Exponential backoff em todos os retries
- [ ] Max retries definido (maximo 3)
- [ ] Retry apenas em erros transientes (5xx, timeout, network)
- [ ] NAO retry em erros de cliente (4xx)

### HIGH
- [ ] Jitter no backoff (evitar thundering herd)
- [ ] Retry budget total < timeout do endpoint
- [ ] Idempotency key para operacoes de escrita com retry
- [ ] Retry circuit breaker (parar retries apos muitas falhas)

### MEDIUM
- [ ] Metricas de retry rate por dependencia
- [ ] Alertas para retry rate > threshold
- [ ] Retry configuravel (nao hardcoded)

---

## 4. Bulkhead / Isolation

### CRITICAL
- [ ] Thread pools separados para dependencias criticas
- [ ] Connection pools independentes por servico
- [ ] Uma falha de dependencia NAO cascata para outras

### HIGH
- [ ] Rate limiting por tenant/cliente
- [ ] Resource quotas por servico
- [ ] Namespace/isolation em cache (Redis databases)
- [ ] Queue isolation por tipo de job

### MEDIUM
- [ ] Container resource limits (CPU, memory)
- [ ] Pod disruption budgets (Kubernetes)
- [ ] Noisy neighbor detection

---

## 5. Graceful Degradation

### CRITICAL
- [ ] Sistema funciona (degradado) quando cache esta down
- [ ] Sistema funciona (degradado) quando servico nao-critico falha
- [ ] Feature flags para desabilitar features pesadas sob carga

### HIGH
- [ ] Read-only mode quando database de escrita falha
- [ ] Cached responses quando API upstream falha
- [ ] Static fallback pages para erros criticos
- [ ] Load shedding configurado (rejeitar requests quando sobrecarregado)

### MEDIUM
- [ ] Graceful degradation testado para cada dependencia
- [ ] Comunicacao ao usuario quando em modo degradado
- [ ] Metricas de degradacao ativa

---

## 6. Health Checks

### CRITICAL
- [ ] /health endpoint implementado
- [ ] Liveness probe: processo esta vivo?
- [ ] Readiness probe: pronto para receber trafego?
- [ ] Health check NAO sobrecarrega o sistema

### HIGH
- [ ] Deep health check: testa dependencias (DB, Cache, APIs)
- [ ] Health check com timeout rapido (< 5s)
- [ ] Startup probe para aplicacoes com boot lento
- [ ] Health check expoe versao da aplicacao

### MEDIUM
- [ ] Health check retorna detalhes por dependencia
- [ ] Historico de health check disponivel
- [ ] Health check integrado com load balancer

---

## 7. Graceful Shutdown

### CRITICAL
- [ ] SIGTERM handler implementado
- [ ] Requisicoes em andamento sao completadas antes de shutdown
- [ ] Novas requisicoes sao rejeitadas durante shutdown
- [ ] Conexoes de banco sao encerradas corretamente

### HIGH
- [ ] Shutdown timeout configurado (30s padrao)
- [ ] Background jobs sao finalizados ou re-enfileirados
- [ ] WebSocket connections sao encerradas com aviso
- [ ] Logs de shutdown registrados

### MEDIUM
- [ ] Pre-stop hook para draining (Kubernetes)
- [ ] Deregistration de service discovery antes de shutdown

---

## 8. Observabilidade de Resiliencia

### CRITICAL
- [ ] Dashboard de resiliencia (circuit breakers, retries, timeouts)
- [ ] Alertas para degradacao de resiliencia
- [ ] Distributed tracing para acompanhar retries/fallbacks

### HIGH
- [ ] Metricas de fallback utilization
- [ ] Error budget tracking
- [ ] SLO/SLI definidos para disponibilidade

### MEDIUM
- [ ] Runbook de incidentes atualizado
- [ ] Chaos engineering schedule definido
- [ ] Post-mortem template disponivel

---

## Resultado

| Categoria | Critical | High | Medium | Status |
|-----------|----------|------|--------|--------|
| Timeouts | _/4 | _/4 | _/3 | |
| Circuit Breakers | _/4 | _/4 | _/3 | |
| Retry Policies | _/4 | _/4 | _/3 | |
| Bulkhead | _/3 | _/4 | _/3 | |
| Graceful Degradation | _/3 | _/4 | _/3 | |
| Health Checks | _/4 | _/4 | _/3 | |
| Graceful Shutdown | _/4 | _/4 | _/2 | |
| Observabilidade | _/3 | _/3 | _/3 | |

---

*Squad FastSystem — Resilience Checklist v1.0.0*
