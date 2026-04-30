---
name: Zero Trust Maturity Assessment
description: Assess Zero Trust architecture maturity and create implementation roadmap
executor: security-chief → kindervag → ross
elicit: true
mode: interactive
---

# Task: Zero Trust Maturity Assessment

## Purpose

Avaliar o nivel de maturidade da arquitetura Zero Trust de uma organizacao ou sistema, baseado no modelo de 5 passos de John Kindervag e no NIST SP 800-207. Gera um roadmap de implementacao priorizado para avancar na jornada Zero Trust.

## Inputs

| Input | Obrigatorio | Descricao |
|-------|-------------|-----------|
| `organization_description` | SIM | Descricao da organizacao/sistema |
| `current_architecture` | SIM | Arquitetura atual (rede, apps, cloud) |
| `assets_inventory` | NAO | Inventario de ativos criticos |
| `current_controls` | NAO | Controles de seguranca existentes |
| `cloud_providers` | NAO | AWS, GCP, Azure, etc. |
| `remote_work` | NAO | Percentual de trabalho remoto |
| `compliance_requirements` | NAO | Frameworks regulatorios obrigatorios |

## Steps

### Phase 1: Define the Protect Surface

**Executor:** @kindervag (John Kindervag)

1. **Identificar o que proteger (DAAS)**
   - **Data:** Dados criticos e sensiveis
   - **Applications:** Aplicacoes de missao critica
   - **Assets:** Ativos de infraestrutura criticos
   - **Services:** Servicos essenciais (DNS, DHCP, AD)

2. **Classificar ativos por criticidade**
   - Tier 1: Perda causa impacto catastrofico
   - Tier 2: Perda causa impacto significativo
   - Tier 3: Perda causa impacto moderado

3. **Mapear fluxos de dados**
   - Quem acessa o que, de onde, como
   - Fluxos norte-sul (externo ↔ interno)
   - Fluxos leste-oeste (interno ↔ interno)

**Checkpoint:** Protect surface definida e classificada

### Phase 2: Map the Transaction Flows

**Executor:** @kindervag (John Kindervag)

4. **Documentar fluxos de transacao**
   - Como usuarios acessam aplicacoes
   - Como aplicacoes se comunicam entre si
   - Como dados fluem entre sistemas
   - Pontos de entrada e saida
   - Dependencias externas

5. **Identificar pontos de decisao**
   - Onde autenticacao acontece
   - Onde autorizacao e verificada
   - Onde dados sao criptografados/decriptados
   - Onde logging ocorre

**Checkpoint:** Transaction flows mapeados

### Phase 3: Architect a Zero Trust Environment

**Executor:** @kindervag (John Kindervag)

6. **Avaliar pilares de maturidade**

   | Pilar | Nivel 1 (Tradicional) | Nivel 2 (Avancado) | Nivel 3 (Otimizado) |
   |-------|----------------------|--------------------|--------------------|
   | **Identity** | Passwords, MFA basico | Risk-based auth, continuous verification | Adaptive auth, behavioral analytics |
   | **Devices** | Antivirus, basico | EDR, health attestation | Real-time risk scoring |
   | **Network** | Firewall perimetral | Microsegmentacao | Software-defined perimeter |
   | **Application** | WAF basico | RASP, runtime protection | Self-protecting apps |
   | **Data** | Encryption at rest | DLP, classification | Automated data governance |
   | **Visibility** | Logs basicos | SIEM, correlation | AI-driven analytics |
   | **Automation** | Manual response | Playbook-based | Full SOAR integration |

7. **Calcular score de maturidade**
   - Score por pilar (1-5)
   - Score geral ponderado
   - Gap analysis vs target state

**Checkpoint:** Score de maturidade calculado

### Phase 4: NIST 800-207 Alignment

**Executor:** @ross (Ron Ross)

8. **Verificar principios NIST ZTA**
   - Todos dados e servicos sao considerados recursos?
   - Comunicacao e segura independente de localizacao?
   - Acesso e concedido per-session?
   - Acesso determinado por politica dinamica?
   - Monitoramento continuo de integridade de ativos?
   - Autenticacao e autorizacao sao rigorosas antes do acesso?
   - Maximo de informacao coletada para melhorar postura?

9. **Avaliar deployment models**
   - Device Agent / Gateway-based?
   - Enclave-based?
   - Resource Portal-based?
   - Device Application Sandboxing?

10. **Compliance mapping**
    - NIST SP 800-207 requirements
    - NIST SP 800-53 controls aplicaveis
    - CISA Zero Trust Maturity Model

**Checkpoint:** NIST alignment avaliado

### Phase 5: Create Roadmap

**Executor:** security-chief + @kindervag

11. **Definir quick wins (0-3 meses)**
    - MFA em todos os acessos criticos
    - Inventario de ativos atualizado
    - Logging centralizado
    - Microsegmentacao basica

12. **Definir iniciativas de medio prazo (3-12 meses)**
    - Identity provider centralizado
    - Device posture assessment
    - Network microsegmentation
    - Data classification

13. **Definir visao de longo prazo (12+ meses)**
    - Continuous verification
    - Automated response (SOAR)
    - AI-driven risk scoring
    - Full software-defined perimeter

## Checkpoints

| # | Checkpoint | Criterio |
|---|-----------|----------|
| 1 | Protect surface | DAAS definido e classificado |
| 2 | Transaction flows | Fluxos documentados |
| 3 | Maturity score | Score por pilar calculado |
| 4 | NIST alignment | Principios verificados |
| 5 | Roadmap | Fases definidas com timeline |

## Veto Conditions

- **BLOCKED** se nao ha visibilidade da arquitetura atual
- **BLOCKED** se ativos criticos nao identificados
- **WARN** se sem sponsorship executivo (ZT requer investimento)
- **WARN** se sem equipe dedicada para implementacao

## Output

**Zero Trust Maturity Report + Roadmap** contendo:

1. Protect Surface Definition (DAAS)
2. Transaction Flow Maps
3. Maturity Assessment (7 pilares)
4. Overall Maturity Score
5. NIST 800-207 Alignment
6. Gap Analysis
7. Implementation Roadmap (Quick Wins → Long-term)
8. Budget Estimation
9. KPIs para medir progresso

## Output Example

```markdown
# Zero Trust Maturity Report — [Organization]

**Date:** 2026-03-29
**Overall Score:** 2.1/5 (INITIAL)

## Maturity by Pillar
| Pilar | Score | Target | Gap |
|-------|-------|--------|-----|
| Identity | 2.5 | 4.0 | 1.5 |
| Devices | 1.5 | 3.0 | 1.5 |
| Network | 2.0 | 4.0 | 2.0 |
| Application | 2.5 | 3.5 | 1.0 |
| Data | 2.0 | 4.0 | 2.0 |
| Visibility | 2.5 | 4.0 | 1.5 |
| Automation | 1.5 | 3.5 | 2.0 |

## Roadmap
### Phase 1: Quick Wins (0-3 meses)
- [ ] Implementar MFA universal — Custo: $2K/ano
- [ ] Centralizar logging (ELK/Datadog) — Custo: $500/mes
- [ ] Inventario de ativos completo — Custo: esforco interno

### Phase 2: Foundation (3-12 meses)
- [ ] Identity provider (Okta/Azure AD) — Custo: $5K/ano
- [ ] Microsegmentacao de rede — Custo: $10K setup
- [ ] EDR em todos endpoints — Custo: $8K/ano
```

## Outputs

- **protect-surface-inventory** — DAAS classificado por criticidade (Tier 1-3)
- **transaction-flow-map** — Fluxos norte-sul e leste-oeste com pontos de decisao
- **zero-trust-maturity-report** — Score por pilar com roadmap de implementacao
