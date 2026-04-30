# Playbook: Migracao de Sistema Sem Perda de Performance

> **Trigger:** Migracao planejada de infraestrutura, banco ou framework
> **Urgencia:** Planejada — preparacao e necessaria
> **Tempo estimado:** 1-4 semanas dependendo do escopo
> **Agentes envolvidos:** Blaze (lead), Query, Mesh, Shield, Surge

---

## Visao Geral

Este playbook cobre migracoes que podem impactar performance:
- Migracao de banco de dados (versao, provider, schema)
- Migracao de infraestrutura (cloud, region, Kubernetes)
- Migracao de framework/runtime (Node version, library major)
- Migracao de cache (Redis version, provider)

---

## Fase 1: Preparacao (1-3 dias)

### 1.1 Baseline de Performance

**Obrigatorio antes de qualquer migracao:**

```
Capturar para TODOS os hot paths:
- Response time: p50, p95, p99
- Throughput: req/s
- Error rate
- Database: query time, connection count
- Cache: hit rate, latency
- Web Vitals: LCP, INP, CLS (se frontend afetado)
```

- [ ] Baseline capturado e documentado
- [ ] Load test baseline executado
- [ ] Metricas salvas em local permanente

### 1.2 Inventario de Dependencias

```
Mapear:
- Queries que serao afetadas
- Connection strings que mudam
- Cache keys que podem ser invalidados
- APIs que dependem do componente migrado
- Jobs/crons que acessam o componente
```

- [ ] Inventario completo documentado
- [ ] Todos os consumers identificados
- [ ] Plano de notificacao para consumers

### 1.3 Plano de Rollback

```
Para cada fase da migracao:
- Como reverter?
- Quanto tempo leva?
- Quem executa?
- Quais dados podem ser perdidos?
```

- [ ] Rollback plan documentado
- [ ] Rollback testado em staging
- [ ] Time treinado no procedimento

---

## Fase 2: Ambiente Paralelo (2-5 dias)

### 2.1 Setup do Novo Ambiente

- [ ] Novo ambiente provisionado
- [ ] Configuracao identica ao atual (ajustada para novo provider)
- [ ] Acesso de todos os agentes ao novo ambiente
- [ ] Monitoring configurado no novo ambiente

### 2.2 Migracao de Dados (se database)

```
Estrategias por cenario:

1. Logical Replication (zero downtime)
   - Configurar replication do antigo para o novo
   - Validar que dados estao sincronizados
   - Cutover: apontar app para novo DB

2. pg_dump/pg_restore (com downtime aceito)
   - Calcular tempo de dump/restore
   - Planejar maintenance window
   - Validar integridade pos-restore

3. Dual-write (complexo, zero downtime)
   - App escreve em ambos os bancos
   - Validar consistencia continuamente
   - Cutover: parar writes no antigo
```

- [ ] Estrategia de migracao de dados definida
- [ ] Migracao testada em staging
- [ ] Tempo estimado documentado
- [ ] Validacao de integridade automatizada

### 2.3 Performance Test no Novo Ambiente

```
Executar ANTES do cutover:
1. Mesmo load test do baseline
2. Comparar metricas:
   - Response time deve ser <= baseline
   - Throughput deve ser >= baseline
   - Error rate deve ser <= baseline
3. Se pior em > 10%, investigar antes de prosseguir
```

- [ ] Load test executado no novo ambiente
- [ ] Comparacao com baseline documentada
- [ ] Performance aceitavel (delta < 10%)

---

## Fase 3: Migracao Gradual (1-5 dias)

### 3.1 Canary (5% do trafego)

- [ ] 5% do trafego direcionado ao novo ambiente
- [ ] Monitoring ativo comparando metricas old vs new
- [ ] Zero erros no novo ambiente por 2 horas
- [ ] Performance dentro de 10% do baseline

### 3.2 Ramp-up Gradual

```
Cronograma recomendado:
- Hora 0-2: 5% no novo
- Hora 2-6: 25% no novo
- Hora 6-12: 50% no novo
- Hora 12-24: 75% no novo
- Hora 24+: 100% no novo

Em cada incremento verificar:
- Error rate estavel
- Latencia estavel
- Resources (CPU, memory) dentro do esperado
- Cache hit rate recuperando
```

- [ ] Ramp-up executado conforme cronograma
- [ ] Nenhuma regressao detectada em cada fase
- [ ] Cache warm-up completado

### 3.3 Cutover Completo

- [ ] 100% do trafego no novo ambiente
- [ ] Estavel por 24 horas
- [ ] Antigo ambiente em standby (nao desligar ainda)

---

## Fase 4: Validacao Pos-Migracao (1-2 dias)

### 4.1 Validacao de Performance

```
Comparar com baseline:
| Metrica | Baseline | Pos-Migracao | Delta | Status |
|---------|----------|-------------|-------|--------|
| p95     | X ms     | Y ms        | Z%    | OK/NOK |
```

- [ ] Todas as metricas dentro de 10% do baseline
- [ ] Load test completo executado
- [ ] Soak test (4h) sem degradacao

### 4.2 Validacao de Dados (se database)

- [ ] Contagem de registros consistente
- [ ] Checksums de tabelas criticas validos
- [ ] Queries de validacao executadas
- [ ] Nenhum dado perdido ou corrompido

### 4.3 Cleanup

- [ ] Ambiente antigo desligado (apos periodo de seguranca)
- [ ] DNS/config antigos removidos
- [ ] Documentacao atualizada
- [ ] Runbooks atualizados

---

## Fase 5: Postmortem da Migracao

```markdown
## Migracao Postmortem — [Data]

### Resumo
- O que foi migrado
- Duracao total
- Impacto em usuarios

### Metricas
- Performance antes vs depois
- Downtime (se houve)
- Dados migrados com sucesso

### Problemas Encontrados
- [Problema 1] — [Como foi resolvido]

### Licoes Aprendidas
- [Licao 1]
- [Licao 2]
```

---

## Checklist Final

- [ ] Baseline capturado antes da migracao
- [ ] Novo ambiente testado com load test
- [ ] Migracao gradual executada (canary → ramp-up)
- [ ] Performance validada pos-migracao
- [ ] Dados validados (se database)
- [ ] Rollback plan testado
- [ ] Ambiente antigo descomissionado
- [ ] Documentacao atualizada
- [ ] Postmortem compartilhado

---

*Squad FastSystem — Playbook: Migracao sem Downtime v1.0.0*
