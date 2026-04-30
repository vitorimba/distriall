---
name: Privacy Impact Assessment (PIA)
description: Comprehensive Privacy Impact Assessment using Privacy by Design principles and NIST privacy controls
executor: security-chief → cavoukian → ross
elicit: true
mode: interactive
---

# Task: Privacy Impact Assessment (PIA)

## Purpose

Conduzir uma Avaliacao de Impacto a Privacidade (PIA/RIPD) para identificar e mitigar riscos de privacidade em sistemas que processam dados pessoais. Obrigatorio pela LGPD (Art. 38) e GDPR (Art. 35) em cenarios de alto risco. Segue os 7 Principios Fundamentais de Privacy by Design de Ann Cavoukian.

## Inputs

| Input | Obrigatorio | Descricao |
|-------|-------------|-----------|
| `system_description` | SIM | O que o sistema faz e para quem |
| `data_processing_activities` | SIM | Que dados pessoais sao processados e como |
| `legal_basis` | SIM | Base legal para cada processamento (LGPD Art. 7) |
| `data_subjects` | SIM | Quem sao os titulares dos dados |
| `data_recipients` | NAO | Quem recebe/acessa os dados (terceiros) |
| `international_transfers` | NAO | Dados transferidos para outros paises? |
| `previous_pia` | NAO | PIA anterior para comparacao |
| `dpo_contact` | NAO | Contato do DPO/Encarregado |

## Steps

### Phase 1: Data Processing Inventory

**Executor:** security-chief

1. **Mapear atividades de processamento**
   - Quais dados pessoais sao coletados?
   - Qual a finalidade de cada coleta?
   - Qual a base legal? (consentimento, interesse legitimo, contrato, etc.)
   - Onde os dados sao armazenados?
   - Por quanto tempo os dados sao retidos?
   - Quem tem acesso aos dados?

2. **Classificar dados por sensibilidade**
   - Dados pessoais basicos (nome, email)
   - Dados sensiveis (saude, biometria, religiao, orientacao sexual)
   - Dados financeiros (cartao, conta bancaria)
   - Dados de menores
   - Dados de localizacao

3. **Mapear fluxo de dados**
   - Coleta → Processamento → Armazenamento → Compartilhamento → Descarte
   - Identificar cada ponto de toque com dados pessoais
   - Documentar transferencias entre sistemas

**Checkpoint:** Inventario de dados completo

### Phase 2: Privacy by Design Assessment

**Executor:** @cavoukian (Ann Cavoukian)

4. **Avaliar os 7 Principios Fundamentais**

   | Principio | Pergunta-chave | Score (1-5) |
   |-----------|---------------|-------------|
   | **1. Proativo, nao reativo** | Privacidade foi considerada desde o design? | |
   | **2. Privacidade como padrao** | Configuracoes default protegem privacidade? | |
   | **3. Privacidade incorporada ao design** | Privacidade e parte da arquitetura, nao add-on? | |
   | **4. Funcionalidade total** | Privacidade nao sacrifica funcionalidade? | |
   | **5. Seguranca fim-a-fim** | Dados protegidos em todo o ciclo de vida? | |
   | **6. Visibilidade e transparencia** | Praticas de privacidade sao transparentes? | |
   | **7. Respeito pela privacidade do usuario** | Interesses do usuario sao priorizados? | |

5. **Avaliar minimizacao de dados**
   - Cada dado coletado e realmente necessario?
   - Existe alternativa que colete menos dados?
   - Pseudonimizacao/anonimizacao e viavel?
   - Dados sao descartados quando nao mais necessarios?

6. **Avaliar consentimento e controle**
   - Consentimento e livre, informado, inequivoco?
   - Facil de revogar consentimento?
   - Titular pode acessar, corrigir, deletar seus dados?
   - Portabilidade de dados implementada?

**Checkpoint:** Privacy by Design score calculado

### Phase 3: Risk Assessment

**Executor:** @cavoukian (Ann Cavoukian) + @ross (Ron Ross)

7. **Identificar riscos de privacidade**
   - Vazamento de dados pessoais
   - Acesso nao autorizado a dados
   - Uso de dados para finalidade diferente da declarada
   - Retencao de dados alem do necessario
   - Falta de controle do titular sobre seus dados
   - Perfilamento sem consentimento
   - Discriminacao baseada em dados pessoais
   - Re-identificacao de dados anonimizados

8. **Classificar riscos**

   | Risco | Probabilidade | Impacto | Nivel |
   |-------|--------------|---------|-------|
   | Vazamento de dados | | | |
   | Acesso indevido | | | |
   | Desvio de finalidade | | | |
   | Over-retention | | | |

   - Probabilidade: Baixa (1), Media (2), Alta (3)
   - Impacto: Baixo (1), Medio (2), Alto (3), Critico (4)
   - Nivel = Probabilidade x Impacto

9. **Avaliar controles NIST privacy**
   - NIST Privacy Framework Core Functions
   - Identify-P: Inventario, mapeamento, avaliacao de risco
   - Govern-P: Politicas, papeis, responsabilidades
   - Control-P: Gerenciamento de dados, controle de disseminacao
   - Communicate-P: Transparencia, consentimento
   - Protect-P: Medidas de seguranca de dados

**Checkpoint:** Riscos identificados e classificados

### Phase 4: Mitigation Plan

**Executor:** security-chief

10. **Definir medidas de mitigacao**
    - Para cada risco identificado, definir:
      - Controle tecnico ou organizacional
      - Responsavel pela implementacao
      - Prazo
      - Metrica de eficacia

11. **Medidas tecnicas comuns**
    - Criptografia em transito (TLS 1.3)
    - Criptografia em repouso (AES-256)
    - Pseudonimizacao de dados sensiveis
    - Controle de acesso baseado em funcao (RBAC)
    - Audit logging de acesso a dados pessoais
    - Retencao automatizada com descarte
    - Backup com criptografia
    - DLP (Data Loss Prevention)

12. **Medidas organizacionais**
    - Politica de privacidade atualizada
    - Treinamento de colaboradores
    - Procedimento de resposta a incidentes de dados
    - Acordo de processamento de dados com terceiros (DPA)
    - Designacao de DPO/Encarregado
    - Revisao periodica do PIA (anual)

**Checkpoint:** Plano de mitigacao definido

### Phase 5: Report & Documentation

**Executor:** security-chief

13. **Gerar Relatorio de Impacto (RIPD)**
    - Documento formal exigido pela LGPD Art. 38
    - Deve estar disponivel para ANPD sob demanda
    - Inclui todas as fases anteriores

14. **Recomendacoes finais**
    - Residual risk assessment (apos mitigacoes)
    - Cronograma de revisao
    - KPIs de privacidade

## Checkpoints

| # | Checkpoint | Criterio |
|---|-----------|----------|
| 1 | Inventario | Todos dados pessoais mapeados |
| 2 | PbD Assessment | 7 principios avaliados |
| 3 | Risk Assessment | Riscos classificados |
| 4 | Mitigation Plan | Controles definidos |
| 5 | RIPD | Documento formal gerado |

## Veto Conditions

- **BLOCKED** se atividades de processamento nao mapeadas
- **BLOCKED** se base legal nao identificada para processamento
- **ESCALATE** se dados sensiveis sem protecao alguma
- **ESCALATE** se processamento de dados de menores sem salvaguardas
- **ESCALATE** se transferencia internacional sem mecanismo legal
- **WARN** se sem DPO designado

## Output

**PIA Report (RIPD)** contendo:

1. Descricao do Sistema e Processamento
2. Inventario de Dados Pessoais
3. Base Legal por Processamento
4. Fluxo de Dados
5. Privacy by Design Assessment (7 principios)
6. Analise de Riscos
7. Plano de Mitigacao
8. Risco Residual
9. Recomendacoes
10. Cronograma de Revisao

## Output Example

```markdown
# Relatorio de Impacto a Protecao de Dados (RIPD)
## Sistema: App de Agendamento Medico

**Data:** 2026-03-29
**DPO:** Maria Silva (dpo@clinica.com)
**Privacy Score:** 3.2/5 (ADEQUATE com gaps)

## Dados Processados
| Dado | Categoria | Base Legal | Retencao |
|------|----------|-----------|----------|
| Nome, email | Pessoal basico | Contrato | Duracao do contrato + 5 anos |
| CPF | Pessoal identificador | Obrigacao legal | 5 anos |
| Historico medico | Sensivel (saude) | Consentimento especifico | 20 anos (CFM) |

## Privacy by Design Score
| Principio | Score | Status |
|-----------|-------|--------|
| 1. Proativo | 3/5 | PARTIAL |
| 2. Padrao | 2/5 | NEEDS WORK |
| 3. Incorporado | 3/5 | PARTIAL |
| 4. Funcionalidade | 4/5 | GOOD |
| 5. Seguranca E2E | 3/5 | PARTIAL |
| 6. Transparencia | 4/5 | GOOD |
| 7. Respeito | 3/5 | PARTIAL |

## Top Risks
1. **Historico medico sem criptografia em repouso** — Risco: ALTO
   Mitigacao: Implementar column-level encryption

2. **Sem procedimento de descarte** — Risco: MEDIO
   Mitigacao: Implementar retention policy automatizada
```

## Outputs

- **data-processing-inventory** — Mapeamento completo de atividades de processamento com base legal
- **privacy-by-design-scorecard** — Score 1-5 nos 7 principios de Cavoukian com gaps identificados
- **pia-report** — Avaliacao de impacto a privacidade com riscos e medidas mitigadoras
