---
name: Incident Response
description: Structured incident response procedure covering triage, containment, eradication, recovery, and lessons learned
executor: security-chief → lee → strom → skoudis
elicit: true
mode: interactive
---

# Task: Incident Response

## Purpose

Responder a um incidente de seguranca de forma estruturada e eficaz, minimizando danos, preservando evidencias, e restaurando operacoes normais. Segue o framework NIST SP 800-61 e SANS Incident Handling.

## Inputs

| Input | Obrigatorio | Descricao |
|-------|-------------|-----------|
| `incident_description` | SIM | O que aconteceu, quando, como foi detectado |
| `affected_systems` | SIM | Sistemas/servicos afetados |
| `severity_estimate` | SIM | Estimativa inicial: P1 (critico), P2 (alto), P3 (medio), P4 (baixo) |
| `detection_source` | SIM | Como foi detectado (monitoramento, usuario, terceiro) |
| `current_status` | SIM | Status atual (em andamento, contido, resolvido) |
| `timeline` | NAO | Timeline conhecida dos eventos |
| `evidence` | NAO | Logs, screenshots, artefatos coletados |
| `stakeholders` | NAO | Quem precisa ser notificado |

## Steps

### Phase 1: Triage & Classification

**Executor:** @lee (Robert M. Lee)

1. **Avaliar severidade real**
   - Tipo de incidente (malware, breach, DDoS, insider, ransomware)
   - Dados comprometidos? Tipos e volume
   - Servicos impactados? SLA violado?
   - Atacante ainda ativo?
   - Clientes/usuarios afetados?

2. **Classificar o incidente**
   - **P1 Critical:** Dados pessoais expostos, ransomware ativo, sistema core down
   - **P2 High:** Vulnerabilidade explorada, acesso nao autorizado, servico degradado
   - **P3 Medium:** Tentativa de ataque detectada, phishing com click, malware contido
   - **P4 Low:** Scan detectado, tentativa de brute force, anomalia menor

3. **Ativar time de resposta**
   - Notificar stakeholders conforme severidade
   - Designar incident commander
   - Abrir canal de comunicacao dedicado
   - Iniciar timeline do incidente

**Checkpoint:** Incidente classificado, time ativado

### Phase 2: Threat Intelligence

**Executor:** @strom (Blake Strom)

4. **Coletar IOCs (Indicators of Compromise)**
   - IPs maliciosos envolvidos
   - Hashes de arquivos suspeitos
   - Dominios/URLs de C2
   - TTPs observados (MITRE ATT&CK mapping)
   - Assinaturas de malware

5. **Analisar contexto da ameaca**
   - Mapear TTPs no MITRE ATT&CK
   - Identificar grupo de ameaca (se possivel)
   - Buscar campanhas similares (threat feeds)
   - Prever proximos movimentos do atacante
   - Identificar ferramentas do atacante (tooling)

**Checkpoint:** IOCs coletados, ATT&CK mapping feito

### Phase 3: Containment

**Executor:** @lee (Robert M. Lee) + @skoudis (Ed Skoudis)

6. **Short-term Containment**
   - Isolar sistemas comprometidos (network segmentation)
   - Bloquear IPs/dominios maliciosos no firewall
   - Revogar credenciais comprometidas
   - Preservar evidencias ANTES de qualquer mudanca
   - Capturar memoria e disco dos sistemas afetados

7. **Long-term Containment**
   - Aplicar patches emergenciais
   - Implementar regras temporarias de deteccao
   - Fortalecer monitoramento nos pontos de entrada
   - Segmentar rede para limitar propagacao
   - Implementar blocklists nos endpoints

**Checkpoint:** Atacante contido, evidencias preservadas

### Phase 4: Eradication

**Executor:** @stuttard (Dafydd Stuttard) + @manico (Jim Manico)

8. **Remover a causa raiz**
   - Identificar e fechar o vetor de entrada
   - Remover malware/backdoors/webshells
   - Aplicar patches definitivos
   - Corrigir vulnerabilidades exploradas
   - Implementar controles de seguranca faltantes
   - Resetar todas credenciais potencialmente comprometidas

9. **Validar erradicacao**
   - Scan completo dos sistemas afetados
   - Verificar ausencia de persistencia (scheduled tasks, cron, startup)
   - Confirmar que IOCs nao sao mais detectados
   - Testar controles implementados

**Checkpoint:** Causa raiz removida, sistemas limpos

### Phase 5: Recovery

**Executor:** @kindervag (John Kindervag)

10. **Restaurar operacoes**
    - Restaurar sistemas a partir de backups verificados
    - Re-habilitar servicos de forma gradual
    - Monitorar intensivamente por 72h pos-restauracao
    - Validar integridade dos dados restaurados
    - Confirmar funcionamento normal de todos servicos

11. **Fortalecer defesas**
    - Implementar controles adicionais baseados no incidente
    - Aplicar principios Zero Trust nas areas afetadas
    - Atualizar regras de deteccao com novos IOCs
    - Revisar e melhorar segmentacao de rede

**Checkpoint:** Sistemas restaurados, monitoramento ativo

### Phase 6: Lessons Learned

**Executor:** @lee (Robert M. Lee) + security-chief

12. **Post-Mortem**
    - Documentar timeline completa do incidente
    - Analisar tempo de deteccao (MTTD) e resposta (MTTR)
    - Identificar o que funcionou bem
    - Identificar o que precisa melhorar
    - Atualizar playbooks de IR baseado no incidente

13. **Reporting**
    - Gerar incident report completo
    - Notificar reguladores (se necessario — LGPD Art. 48: 72h ANPD)
    - Notificar titulares afetados (se dados pessoais comprometidos)
    - Atualizar risk register
    - Agendar follow-up em 30/60/90 dias

## Checkpoints

| # | Checkpoint | Criterio |
|---|-----------|----------|
| 1 | Triage | Severidade classificada, time ativado |
| 2 | Intel | IOCs coletados, ATT&CK mapping |
| 3 | Containment | Atacante contido, evidencias preservadas |
| 4 | Eradication | Causa raiz removida, validado |
| 5 | Recovery | Sistemas restaurados, monitoramento ativo |
| 6 | Lessons learned | Post-mortem documentado |

## Veto Conditions

- **NEVER** destruir evidencias antes de preservar
- **NEVER** negociar com ransomware sem autorizacao executiva
- **BLOCKED** se nao ha incident commander designado
- **ESCALATE** se dados pessoais expostos (notificacao LGPD/GDPR obrigatoria)
- **ESCALATE** se atacante ainda ativo e contencao falhou
- **PAUSED** se acoes de contencao podem causar mais dano que o incidente

## Output

**Incident Report** contendo:

1. Executive Summary
2. Incident Classification & Severity
3. Timeline of Events
4. IOCs & ATT&CK Mapping
5. Containment Actions Taken
6. Root Cause Analysis
7. Recovery Steps
8. Lessons Learned
9. Recommendations
10. Regulatory Notifications (se aplicavel)

## Output Example

```markdown
# Incident Report — IR-2026-003

**Date:** 2026-03-29
**Severity:** P1 — Critical
**Type:** Data Breach via SQL Injection
**Status:** Resolved
**MTTD:** 4 hours | **MTTR:** 18 hours

## Executive Summary
Atacante explorou SQL injection em /api/search (CVE nao aplicavel,
business logic flaw) para extrair 12.000 registros de usuarios
incluindo email, nome e telefone. Incidente detectado via anomalia
nos logs de query do PostgreSQL.

## Timeline
| Hora | Evento |
|------|--------|
| 03:15 | Primeiro payload de SQLi detectado |
| 07:20 | Anomalia detectada pelo monitoramento |
| 07:45 | Incident response ativado |
| 08:00 | Endpoint vulneravel isolado |
| 10:30 | IOCs compartilhados, bloqueio de IP |
| 14:00 | Patch aplicado, endpoint restaurado |
| 21:00 | Monitoramento pos-incidente estabilizado |

## LGPD Notification
- ANPD notificada em 2026-03-30 (dentro de 72h)
- Titulares notificados por email em 2026-03-30
```

## Outputs

- **incident-classification** — Severidade definida (P1-P4), tipo de incidente e time ativado
- **ioc-report** — IOCs coletados com mapping no MITRE ATT&CK e contexto de ameaca
- **incident-timeline** — Registro cronologico de eventos, containment e eradicacao
- **post-incident-report** — Lessons learned e recomendacoes para prevencao futura
