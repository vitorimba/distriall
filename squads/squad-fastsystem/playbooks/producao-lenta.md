# Playbook: Sistema em Producao Ficou Lento

> **Trigger:** Sistema em producao apresenta degradacao de performance
> **Urgencia:** Alta — impacto direto em usuarios
> **Tempo estimado:** 1-4 horas (mitigacao) + 1 dia (correcao definitiva)
> **Agentes envolvidos:** Blaze (lead), Probe, Lens + especialistas conforme necessidade

---

## Passo 0: Nao Entre em Panico

Antes de qualquer acao tecnica:

1. **Confirme o problema** — E real ou falso positivo?
2. **Avalie o impacto** — Quantos usuarios afetados? Qual a revenue impact?
3. **Comunique** — Informe stakeholders que o time esta investigando
4. **Nao faca mudancas precipitadas** — Cada mudanca pode piorar a situacao

---

## Passo 1: Triage Inicial (5-10 min)

### O que verificar IMEDIATAMENTE:

```
1. Dashboards de monitoring:
   - Response time (p50, p95, p99) — subiu quanto?
   - Error rate — aumentou?
   - Request rate — trafego normal ou spike?
   - CPU/Memory dos servidores — algum saturado?

2. Correlacao temporal:
   - Quando comecou? (timestamp exato)
   - Houve deploy recente? (ultimas 2 horas)
   - Houve mudanca de configuracao?
   - Evento externo? (pico de trafego, DDoS, dependencia fora)

3. Escopo:
   - Todos os endpoints ou especificos?
   - Todos os usuarios ou segmento?
   - Todas as regioes ou especifica?
```

### Decisao rapida:

| Cenario | Acao Imediata |
|---------|--------------|
| Deploy recente correlacionado | Rollback do deploy |
| Trafego 10x do normal | Ativar rate limiting, scale out |
| Dependencia externa down | Ativar circuit breaker, usar fallback |
| CPU/Memory saturado | Scale out, investigar root cause |
| Nenhuma correlacao obvia | Ir para Passo 2 |

---

## Passo 2: Mitigacao Imediata (5-30 min)

**Objetivo:** Reduzir impacto ANTES de encontrar root cause.

### Acoes de mitigacao (em ordem de preferencia):

**A) Rollback de deploy (se aplicavel)**
```bash
# Verificar ultimo deploy
git log --oneline -5

# Rollback via pipeline
# Ou deploy da versao anterior manualmente
```

**B) Scale out (se recursos saturados)**
```bash
# Verificar auto-scaling
# Se nao tem auto-scaling, adicionar instancias manualmente
# AWS: aws autoscaling set-desired-capacity --auto-scaling-group-name X --desired-capacity N
```

**C) Ativar circuit breakers (se dependencia lenta)**
```
- Verificar se circuit breakers estao configurados
- Se nao, considerar bloquear chamadas para dependencia lenta
- Habilitar cached responses como fallback
```

**D) Rate limiting (se trafego excessivo)**
```
- Ativar rate limiting mais agressivo
- Bloquear IPs suspeitos se DDoS
- Habilitar queue para requests
```

**E) Feature flags (se feature especifica)**
```
- Desabilitar feature pesada via feature flag
- Redirecionar para versao simplificada
```

### Apos mitigacao:
- [ ] Confirmar que impacto foi reduzido
- [ ] Comunicar status aos stakeholders
- [ ] Continuar investigacao para correcao definitiva

---

## Passo 3: Diagnostico Detalhado (30-120 min)

### 3.1 USE Method — Infraestrutura

```bash
# CPU
top -b -n 1 | head -20
mpstat -P ALL 1 5
uptime  # load average

# Memoria
free -h
vmstat 1 10  # check si/so (swap in/out)

# Disco
iostat -xz 1 10  # await, %util
df -h

# Rede
ss -s  # socket summary
netstat -s | grep -i "retrans"
```

**Procure por:**
- CPU > 80% sustentado
- Swap ativo (memoria insuficiente)
- IO await > 10ms (disco lento)
- Retransmissions > 1% (rede)

### 3.2 Aplicacao

```bash
# Flame graph (se CPU alto)
perf record -g -p <PID> -- sleep 30
perf script | stackcollapse-perf.pl | flamegraph.pl > flame.svg

# Thread dump (Java)
jstack <PID>

# Node.js profiling
node --prof-process isolate-*.log

# Verificar logs de erro
grep -c "ERROR\|FATAL\|TIMEOUT" /var/log/app/*.log
grep "slow\|timeout" /var/log/app/*.log | tail -20
```

### 3.3 Database

```sql
-- Queries ativas agora
SELECT pid, age(clock_timestamp(), query_start), usename, query, state
FROM pg_stat_activity
WHERE state != 'idle'
ORDER BY query_start;

-- Locks
SELECT pid, pg_blocking_pids(pid), query
FROM pg_stat_activity
WHERE cardinality(pg_blocking_pids(pid)) > 0;

-- Top queries recentes
SELECT query, calls, mean_exec_time, total_exec_time
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 10;

-- Connection count
SELECT count(*), state FROM pg_stat_activity GROUP BY state;
```

### 3.4 Cache

```bash
# Redis info
redis-cli INFO stats | grep -E "hit|miss|evict|mem"
redis-cli INFO clients | grep connected

# Hit rate
# hit_rate = keyspace_hits / (keyspace_hits + keyspace_misses)

# Slow log
redis-cli SLOWLOG GET 10
```

### 3.5 Dependencias Externas

```
- Verificar status pages de servicos externos
- Verificar latencia de chamadas externas no APM
- Verificar circuit breaker status
- Verificar DNS resolution time
```

---

## Passo 4: Identificar Root Cause (15-30 min)

### Arvore de decisao:

```
Latencia subiu?
├── CPU alto? → Profile da aplicacao (flame graph)
│   ├── Hot path em codigo nosso → Otimizar codigo
│   └── Hot path em library → Atualizar/substituir
├── IO wait alto? → Disco ou database
│   ├── Database queries lentas → EXPLAIN ANALYZE, index
│   └── Disk IO → Verificar logs, storage
├── Memory alto / swap? → Memory leak ou under-provisioned
│   ├── Crescendo ao longo do tempo → Memory leak
│   └── Subita → Carga acima do esperado
├── Network? → Retransmissions, latencia alta
│   ├── Dependencia externa lenta → Circuit breaker
│   └── Rede interna → Verificar load balancer, DNS
└── Nenhum recurso saturado? → Contention ou lock
    ├── Database locks → Investigar transactions
    └── Application locks → Profile de concorrencia
```

---

## Passo 5: Correcao Definitiva

### Antes de corrigir:
- [ ] Root cause documentado com evidencia
- [ ] Baseline capturado (antes)
- [ ] Fix planejado com rollback
- [ ] Time de plantao informado

### Aplicar fix:
1. Implementar correcao em ambiente de staging
2. Validar com load test se possivel
3. Deploy com canary (5% → 25% → 50% → 100%)
4. Monitorar metricas por 30 min apos cada incremento

### Apos correcao:
- [ ] Metricas voltaram ao baseline
- [ ] Nenhuma regressao em outros endpoints
- [ ] Fix estavel por >= 30 minutos

---

## Passo 6: Postmortem

### Documento de postmortem (obrigatorio para P0/P1):

```markdown
## Postmortem — [Data] — [Titulo]

### Timeline
- HH:MM — Alerta disparado
- HH:MM — Time iniciou investigacao
- HH:MM — Mitigacao aplicada
- HH:MM — Root cause identificado
- HH:MM — Fix deployado
- HH:MM — Sistema normalizado

### Root Cause
[Descricao tecnica]

### Impacto
- Usuarios afetados: X
- Duracao: Y min
- Revenue impact: $Z (estimado)

### 5 Whys
1. Por que o sistema ficou lento? → [Resposta]
2. Por que [resposta 1]? → [Resposta]
3. Por que [resposta 2]? → [Resposta]
4. Por que [resposta 3]? → [Resposta]
5. Por que [resposta 4]? → [Root cause]

### Action Items
- [ ] [Acao preventiva 1] — Owner: X — Deadline: Y
- [ ] [Acao preventiva 2] — Owner: X — Deadline: Y
- [ ] [Teste de regressao] — Owner: X — Deadline: Y
- [ ] [Alerta novo] — Owner: X — Deadline: Y

### Licoes Aprendidas
- [O que funcionou bem]
- [O que pode melhorar]
```

---

## Checklist de Encerramento

- [ ] Sistema em performance normal
- [ ] Stakeholders informados do resultado
- [ ] Postmortem escrito e compartilhado
- [ ] Action items criados e atribuidos
- [ ] Alertas adicionais configurados
- [ ] Teste de regressao adicionado
- [ ] Runbook atualizado (se necessario)
- [ ] Baseline atualizado no registro

---

## Ferramentas Rapidas

| Necessidade | Ferramenta | Comando |
|-------------|-----------|---------|
| CPU profiling | perf + flamegraph | `perf record -g -p PID -- sleep 30` |
| Memoria | free + vmstat | `free -h && vmstat 1 10` |
| Disco | iostat | `iostat -xz 1 10` |
| Queries lentas | pg_stat_activity | Ver SQL acima |
| Cache status | redis-cli | `redis-cli INFO stats` |
| Logs de erro | grep | `grep "ERROR\|TIMEOUT" logs` |
| Deploy recente | git log | `git log --oneline -5` |

---

## Contatos de Escalacao

| Nivel | Quem | Quando |
|-------|------|--------|
| L1 | Time de plantao | Primeiro contato |
| L2 | Performance Lead (Blaze) | Se L1 nao resolve em 30 min |
| L3 | Architect / Infra Lead | Se problema arquitetural |
| External | Vendor support | Se problema em servico externo |

---

*Squad FastSystem — Playbook: Producao Lenta v1.0.0*
