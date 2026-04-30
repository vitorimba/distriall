---
name: Threat Modeling Session
description: Structured threat modeling using STRIDE and the 4 Questions Framework
executor: security-chief → shostack
elicit: true
mode: interactive
---

# Task: Threat Modeling Session

## Purpose

Conduzir uma sessao de threat modeling para identificar, categorizar e priorizar ameacas a um sistema antes ou durante o desenvolvimento. Usa o framework STRIDE de Adam Shostack e o modelo das 4 Perguntas para tornar o processo acessivel a todos os membros do time.

## Inputs

| Input | Obrigatorio | Descricao |
|-------|-------------|-----------|
| `system_description` | SIM | O que o sistema faz, arquitetura geral |
| `architecture_diagram` | NAO | Diagrama de arquitetura (DFD, C4, etc.) |
| `tech_stack` | SIM | Tecnologias e frameworks utilizados |
| `data_flows` | NAO | Fluxos de dados ja documentados |
| `trust_boundaries` | NAO | Limites de confianca ja identificados |
| `existing_controls` | NAO | Controles de seguranca ja implementados |
| `compliance_requirements` | NAO | Requisitos regulatorios (LGPD, PCI-DSS) |

## Steps

### Phase 1: What Are We Working On?

**Executor:** @shostack (Adam Shostack)

1. **Criar Data Flow Diagram (DFD)**
   - Identificar processos (retangulos)
   - Identificar data stores (cilindros)
   - Identificar external entities (retangulos duplos)
   - Mapear data flows (setas com label)
   - Definir trust boundaries (linhas tracejadas)

2. **Documentar componentes**
   - Frontend (tipo, framework, onde roda)
   - Backend/API (endpoints, servicos)
   - Banco de dados (tipo, onde hospedado)
   - Autenticacao (provedor, metodo)
   - Integracao com terceiros (APIs externas, SDKs)
   - Infraestrutura (cloud provider, CDN, DNS)

**Checkpoint:** DFD completo com trust boundaries

### Phase 2: What Can Go Wrong? (STRIDE)

**Executor:** @shostack (Adam Shostack)

3. **Aplicar STRIDE por componente**

   Para cada componente/fluxo no DFD, avaliar:

   | Categoria | Pergunta | Exemplos |
   |-----------|----------|----------|
   | **S**poofing | Alguem pode se passar por outro? | Roubo de sessao, credenciais falsas |
   | **T**ampering | Alguem pode alterar dados? | Man-in-the-middle, SQL injection |
   | **R**epudiation | Alguem pode negar uma acao? | Falta de logs, ausencia de audit trail |
   | **I**nformation Disclosure | Dados podem vazar? | Erro verboso, dados em logs, IDOR |
   | **D**enial of Service | O servico pode ficar indisponivel? | DDoS, resource exhaustion |
   | **E**levation of Privilege | Alguem pode ganhar mais permissoes? | Privilege escalation, BFLA |

4. **Enumerar ameacas**
   - Uma ameaca por combinacao componente x categoria STRIDE
   - Descrever cenario de ataque especifico
   - Identificar pre-condicoes necessarias
   - Avaliar probabilidade (Low, Medium, High)
   - Avaliar impacto (Low, Medium, High, Critical)

**Checkpoint:** Lista completa de ameacas STRIDE

### Phase 3: What Are We Going to Do About It?

**Executor:** @shostack (Adam Shostack)

5. **Decidir estrategia para cada ameaca**

   | Estrategia | Quando usar |
   |-----------|-------------|
   | **Mitigate** | Implementar controle tecnico |
   | **Transfer** | Terceirizar (seguro, provedor) |
   | **Accept** | Risco baixo, custo de mitigacao alto |
   | **Avoid** | Remover funcionalidade/componente |

6. **Definir controles de mitigacao**
   - Controle tecnico especifico para cada ameaca
   - Responsavel pela implementacao
   - Prazo de implementacao
   - Verificacao de eficacia

**Checkpoint:** Estrategia definida para cada ameaca

### Phase 4: Did We Do a Good Job?

**Executor:** @shostack (Adam Shostack)

7. **Validar o threat model**
   - Todos os componentes do DFD foram analisados?
   - Todas as 6 categorias STRIDE foram aplicadas?
   - Ameacas sao especificas (nao genericas)?
   - Mitigacoes sao acoes concretas (nao abstratas)?
   - O modelo reflete a arquitetura real?
   - Ameacas priorizadas por risco?

8. **Revisar e atualizar**
   - O threat model deve ser revisado quando:
     - Nova funcionalidade adicionada
     - Mudanca de arquitetura
     - Novo componente/integracao
     - Incidente de seguranca ocorrer
     - Pelo menos a cada 6 meses

## Checkpoints

| # | Checkpoint | Criterio |
|---|-----------|----------|
| 1 | DFD completo | Todos componentes, fluxos e trust boundaries |
| 2 | STRIDE completo | Todas categorias por componente |
| 3 | Estrategias definidas | Mitigate/Transfer/Accept/Avoid por ameaca |
| 4 | Validacao | Modelo completo e revisado |

## Veto Conditions

- **BLOCKED** se sistema nao descrito minimamente
- **BLOCKED** se nao ha informacao sobre dados processados
- **WARN** se DFD incompleto (componentes faltando)
- **WARN** se ameacas genericas ("pode ser hackeado") sem especificidade

## Output

**Threat Model Document** contendo:

1. System Description & DFD
2. Trust Boundaries
3. STRIDE Analysis Table
4. Threat Prioritization Matrix
5. Mitigation Plan
6. Residual Risk Summary
7. Review Schedule

## Output Example

```markdown
# Threat Model — E-commerce App

**Date:** 2026-03-29
**Version:** 1.0

## System DFD
[Browser] --HTTPS--> [Vercel Edge] --API--> [Supabase]
                                    |
                      [Stripe API] <--payment-->

## Trust Boundaries
- TB1: Browser ↔ Vercel (internet)
- TB2: Vercel ↔ Supabase (internal API)
- TB3: Vercel ↔ Stripe (external API)

## STRIDE Analysis

### Component: User Authentication (Supabase Auth)
| STRIDE | Ameaca | Prob. | Impacto | Estrategia | Mitigacao |
|--------|--------|-------|---------|-----------|-----------|
| S | Roubo de sessao via XSS | Med | High | Mitigate | CSP, HttpOnly cookies |
| T | Manipulacao de JWT | Low | Critical | Mitigate | Verificar assinatura server-side |
| R | Login sem registro | Med | Low | Mitigate | Implementar audit logging |
| I | Enumeracao de usuarios | High | Med | Mitigate | Mensagens de erro genericas |
| D | Brute force de login | High | Med | Mitigate | Rate limiting, CAPTCHA |
| E | JWT none algorithm | Low | Critical | Mitigate | Validar algorithm server-side |

## Priority Matrix
| Prioridade | Ameacas |
|-----------|---------|
| P1 (Imediato) | JWT manipulation, privilege escalation |
| P2 (1 semana) | XSS session hijack, brute force |
| P3 (1 mes) | User enumeration, audit logging |
| P4 (backlog) | DoS scenarios accepted |
```

## Outputs

- **data-flow-diagram** — DFD com processos, data stores, external entities e trust boundaries
- **stride-threat-list** — Ameacas enumeradas por componente x categoria STRIDE com probabilidade e impacto
- **mitigation-plan** — Estrategia de resposta para cada ameaca identificada
