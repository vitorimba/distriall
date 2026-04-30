# Task: compliance-audit

```yaml
task: compliance-audit
id: FA-TASK-010
responsavel: "@franchise-legal"
responsavel_type: agent
atomic_layer: L4-Runtime
status: active
version: "1.0.0"
execution_type: Agent
elicit: true

Entrada:
  - cof_path: string - Path para COF vigente
  - contracts_path: string - Path para contratos de franquia
  - legal_docs_path: string - Path para documentos legais (INPI, processos, licencas)
  - operations_data_path: string - Path para dados operacionais (auditorias, compliance)
  - regulatory_path: string - Path para licencas e documentos regulatorios (ANVISA, etc.)

Saida:
  - compliance-audit-report.md: Relatorio completo de auditoria de compliance
  - non-conformities.md: Lista de nao-conformidades com severidade
  - remediation-plan.md: Plano de remediacao para nao-conformidades

Checklist:
  - COF auditada contra Lei 13.966/2019 (19 itens)
  - Contratos de franquia revisados
  - Registro de marca INPI verificado
  - Pendencias judiciais levantadas
  - Compliance tributaria verificada
  - Compliance trabalhista verificada
  - Compliance sanitaria (ANVISA/RDC 216) verificada
  - LGPD (Lei Geral de Protecao de Dados) avaliada
  - Compliance ABF (codigo de etica) verificada
  - Nao-conformidades classificadas por severidade
  - Plano de remediacao com prazos

veto_conditions:
  - Auditoria sem acesso aos documentos legais originais
  - Analise baseada apenas em declaracoes verbais
  - Omissao deliberada de areas de non-compliance
  - Auditoria sem checklist estruturado
  - Ausencia de classificacao de severidade das nao-conformidades

output_examples:
  - |
    ## Compliance Audit Summary — Avend Franquias
    | Area | Itens Auditados | Conforme | Nao Conforme | Score |
    |------|----------------|---------|-------------|-------|
    | Lei 13.966 (COF) | 19 | 17 | 2 | 89% |
    | Contratos | 12 | 11 | 1 | 92% |
    | INPI | 5 | 5 | 0 | 100% |
    | ANVISA | 8 | 6 | 2 | 75% |
    | LGPD | 6 | 4 | 2 | 67% |
    **Score Global: 84% — BOM (com pontos de atencao)**
```

---

## Purpose

Realizar **auditoria completa de compliance** legal e operacional da Avend Franquias, cobrindo todas as dimensoes regulatorias relevantes: Lei de Franquias, contratos, propriedade intelectual, regulamentacao sanitaria, tributaria, trabalhista, LGPD e codigo de etica ABF.

A auditoria de compliance identifica riscos legais ANTES que se materializem em processos, multas ou perda de contratos. Para franquias, o risco legal e especialmente alto porque envolve relacao com terceiros (franqueados) protegidos por legislacao especifica.

**Principio fundamental:** Compliance nao e custo — e seguro. O custo de uma nao-conformidade descoberta (multa, processo, anulacao de contrato) e sempre muito maior que o custo de prevencao. Uma franquia em compliance dorme tranquila.

**Contexto Avend:** Com 90 contratos de franquia, a Avend tem exposicao legal significativa. Cada contrato e uma relacao juridica bilateral com obrigacoes reciprocas. A Lei 13.966/2019 protege o franqueado e pune o franqueador que nao cumpre seus deveres de transparencia (COF). Adicionalmente, a operacao de vending machines envolve alimentos, o que traz regulamentacao sanitaria especifica (ANVISA/RDC 216).

---

## Inputs

| Input | Tipo | Obrigatorio | Descricao |
|-------|------|-------------|-----------|
| `cof_path` | string | Sim | COF vigente para auditoria contra Lei 13.966 |
| `contracts_path` | string | Sim | Contratos de franquia (modelo + assinados) |
| `legal_docs_path` | string | Sim | INPI, processos, licencas, alvaras |
| `operations_data_path` | string | Nao | Dados de auditorias operacionais, compliance de franqueados |
| `regulatory_path` | string | Sim | Licencas sanitarias, alvaras, documentos ANVISA |
| `hr_data_path` | string | Nao | Dados de compliance trabalhista |
| `data_processing_records` | string | Nao | Registros de tratamento de dados (LGPD) |

---

## Preconditions

1. **Acesso a documentos**: Todos os documentos legais devem estar acessiveis.
2. **COF vigente**: Deve existir COF emitida nos ultimos 12 meses.
3. **Contratos acessiveis**: Modelo padrao e contratos assinados.
4. **Cooperacao do franqueador**: Disponibilidade para esclarecer duvidas.
5. **Informacoes atualizadas**: Dados devem refletir situacao atual.

---

## Key Activities & Instructions

### Dimension 1: Compliance com Lei 13.966/2019 (COF)

**Auditoria dos 19 itens obrigatorios da COF:**

| Item | Art. 2o | Descricao | Presente | Completo | Atualizado | Score |
|------|---------|-----------|---------|---------|-----------|-------|
| I | Historico e forma societaria | [ ] | [ ] | [ ] | /3 |
| II | Balanco e demonstracoes (2 exercicios) | [ ] | [ ] | [ ] | /3 |
| III | Pendencias judiciais | [ ] | [ ] | [ ] | /3 |
| IV | Descricao detalhada da franquia | [ ] | [ ] | [ ] | /3 |
| V | Perfil do franqueado ideal | [ ] | [ ] | [ ] | /3 |
| VI | Envolvimento do franqueado | [ ] | [ ] | [ ] | /3 |
| VII | Investimento inicial e taxas | [ ] | [ ] | [ ] | /3 |
| VIII | Taxas periodicas detalhadas | [ ] | [ ] | [ ] | /3 |
| IX | Relacao de franqueados e desligados | [ ] | [ ] | [ ] | /3 |
| X | Territorio e exclusividade | [ ] | [ ] | [ ] | /3 |
| XI | Fornecedores obrigatorios | [ ] | [ ] | [ ] | /3 |
| XII | Suporte e servicos oferecidos | [ ] | [ ] | [ ] | /3 |
| XIII | Situacao perante INPI | [ ] | [ ] | [ ] | /3 |
| XIV | Situacao apos termino | [ ] | [ ] | [ ] | /3 |
| XV | Modelo de contrato anexado | [ ] | [ ] | [ ] | /3 |
| XVI | Desligados (24 meses) | [ ] | [ ] | [ ] | /3 |
| XVII | Demonstracoes financeiras | [ ] | [ ] | [ ] | /3 |
| XVIII | Conselho/associacao de franqueados | [ ] | [ ] | [ ] | /3 |
| XIX | Sublocacao | [ ] | [ ] | [ ] | /3 |

**Score COF: ___/57 = ____%**

**Verificacoes adicionais da COF:**
- [ ] COF emitida ha menos de 12 meses
- [ ] Prazo de 10 dias de entrega sendo cumprido
- [ ] Termo de recebimento sendo assinado pelo candidato
- [ ] COF sem informacoes falsas ou enganosas
- [ ] Valores da COF conferem com pratica real
- [ ] Lista de franqueados esta completa e atualizada

**Classificacao de nao-conformidades COF:**

| Severidade | Descricao | Exemplo |
|-----------|-----------|---------|
| CRITICA | Item obrigatorio ausente ou informacao falsa | Balanco ausente, omissao de processos |
| ALTA | Item incompleto ou desatualizado | Lista de franqueados desatualizada |
| MEDIA | Informacao vaga ou imprecisa | Valores sem clareza |
| BAIXA | Formatacao ou organizacao | Estrutura confusa |

---

### Dimension 2: Compliance Contratual

**2.1 — Auditoria do Contrato de Franquia**

| Clausula | Presente | Legal | Equilibrada | Observacao |
|----------|---------|-------|-------------|-----------|
| Objeto e escopo | [ ] | [ ] | [ ] | |
| Prazo e renovacao | [ ] | [ ] | [ ] | |
| Territorio | [ ] | [ ] | [ ] | |
| Taxas e pagamentos | [ ] | [ ] | [ ] | |
| Obrigacoes do franqueador | [ ] | [ ] | [ ] | |
| Obrigacoes do franqueado | [ ] | [ ] | [ ] | |
| Propriedade intelectual | [ ] | [ ] | [ ] | |
| Confidencialidade | [ ] | [ ] | [ ] | |
| Nao-concorrencia | [ ] | [ ] | [ ] | |
| Rescisao e penalidades | [ ] | [ ] | [ ] | |
| Foro e arbitragem | [ ] | [ ] | [ ] | |
| Sucessao | [ ] | [ ] | [ ] | |

**2.2 — Verificacao de Clausulas Especificas**

- [ ] Clausula de nao-concorrencia proporcional (prazo e geografia razoaveis)
- [ ] Clausulas de rescisao equilibradas (nao leoninas)
- [ ] Clausula de arbitragem (permitida pela Lei 13.966)
- [ ] Clausula de sublocacao (se aplicavel, conforme Art. 3o)
- [ ] Clausula de transferencia do contrato
- [ ] Clausula de direito de preferencia na renovacao
- [ ] Penalidades proporcionais e razoaveis

**2.3 — Compliance dos Franqueados**

| Obrigacao Contratual | % Franqueados em Compliance | Observacao |
|---------------------|---------------------------|-----------|
| Pagamento de royalties em dia | ___% | |
| Uso correto da marca | ___% | |
| Fornecedores homologados | ___% | |
| Reporting mensal | ___% | |
| Participacao em treinamentos | ___% | |
| Padroes operacionais | ___% | |
| Horario de operacao | ___% | |

---

### Dimension 3: Propriedade Intelectual (INPI)

| Item | Status | Detalhe |
|------|--------|---------|
| Marca nominativa registrada | [ ] | No: ___, Status: ___ |
| Marca figurativa registrada | [ ] | No: ___, Status: ___ |
| Marca mista registrada | [ ] | No: ___, Status: ___ |
| Classes NCL corretas | [ ] | Classes: ___ |
| Renovacao em dia | [ ] | Validade: ___ |
| Oposicoes pendentes | [ ] | |
| Processos de nulidade | [ ] | |
| Monitoramento de infringentes | [ ] | |
| Patentes (se aplicavel) | [ ] | |
| Software registrado | [ ] | |

---

### Dimension 4: Compliance Sanitaria (ANVISA)

**Aplicavel especificamente a vending machines com alimentos:**

| Requisito | Base Legal | Status | Observacao |
|-----------|-----------|--------|-----------|
| RDC 216/2004 — Boas Praticas | ANVISA | [ ] | |
| Alvara sanitario (por ponto) | Vigilancia local | [ ] | |
| Controle de temperatura documentado | RDC 216 | [ ] | |
| Rastreabilidade de produtos | RDC 216 | [ ] | |
| Procedimento para recall | ANVISA | [ ] | |
| Rotulagem adequada | ANVISA | [ ] | |
| Manual de boas praticas | RDC 216 | [ ] | |
| Treinamento em manipulacao | RDC 216 | [ ] | |
| Registro de higienizacao | RDC 216 | [ ] | |
| Controle de pragas | RDC 216 | [ ] | |

**Risco sanitario: Uma nao-conformidade sanitaria pode resultar em interdicao de maquinas, multas e dano reputacional irreversivel.**

---

### Dimension 5: Compliance LGPD

**A LGPD (Lei 13.709/2018) se aplica ao tratamento de dados de candidatos, franqueados e consumidores:**

| Requisito | Status | Observacao |
|-----------|--------|-----------|
| Base legal definida para cada tratamento | [ ] | |
| Consentimento obtido de candidatos (screening) | [ ] | |
| Politica de privacidade publicada | [ ] | |
| DPO (Encarregado) nomeado | [ ] | |
| Registro de atividades de tratamento (ROPA) | [ ] | |
| Contratos com operadores (fornecedores de TI) | [ ] | |
| Plano de resposta a incidentes | [ ] | |
| Treinamento da equipe em LGPD | [ ] | |
| Dados de telemetria: base legal definida | [ ] | |
| Dados de consumidores (se coletados): base legal | [ ] | |

---

### Dimension 6: Compliance Tributaria

| Requisito | Status | Observacao |
|-----------|--------|-----------|
| Regime tributario adequado (franqueador) | [ ] | |
| Obrigacoes acessorias em dia | [ ] | |
| Notas fiscais emitidas corretamente | [ ] | |
| ISS/ICMS recolhidos (conforme aplicavel) | [ ] | |
| Retencao de impostos (se aplicavel) | [ ] | |
| Orientacao tributaria aos franqueados | [ ] | |
| CND Federal vigente | [ ] | |
| CND Estadual vigente | [ ] | |
| CND Municipal vigente | [ ] | |
| FGTS regular | [ ] | |

---

### Dimension 7: Compliance Trabalhista

| Requisito | Status | Observacao |
|-----------|--------|-----------|
| Funcionarios registrados (CLT) | [ ] | |
| Encargos trabalhistas em dia | [ ] | |
| Normas de seguranca do trabalho | [ ] | |
| Sem relacao de emprego com franqueados | [ ] | |
| Sem subordinacao direta (Art. 1o, Lei 13.966) | [ ] | |
| Contratos de trabalho adequados | [ ] | |
| Conformidade com convencao coletiva | [ ] | |

**ATENCAO — Art. 1o, paragrafo 1o, Lei 13.966:** "Nao cria vinculo empregaticio entre franqueador e franqueado ou seus empregados." O franqueador deve cuidar para que o nivel de controle sobre o franqueado nao configure subordinacao.

---

### Dimension 8: Compliance ABF

| Requisito | Status | Observacao |
|-----------|--------|-----------|
| Associado ABF | [ ] | |
| Codigo de etica ABF cumprido | [ ] | |
| Selo de excelencia ABF | [ ] | |
| Participacao em pesquisas ABF | [ ] | |
| Dados de desempenho reportados | [ ] | |
| Praticas de disclosure adequadas | [ ] | |

---

### Phase 2: Consolidacao e Classificacao

**Score de Compliance por Area**

```
COMPLIANCE SCORECARD — AVEND FRANQUIAS
============================================================
| Area | Itens | Conforme | Non-Conf. | Score |
|------|-------|---------|-----------|-------|
| Lei 13.966 (COF) | 19 | | | ___% |
| Contratos | 12 | | | ___% |
| INPI | 10 | | | ___% |
| ANVISA | 10 | | | ___% |
| LGPD | 10 | | | ___% |
| Tributaria | 10 | | | ___% |
| Trabalhista | 7 | | | ___% |
| ABF | 6 | | | ___% |
|------|-------|---------|-----------|-------|
| **TOTAL** | **84** | | | **___/%** |

CLASSIFICACAO:
| Score | Status | Acao |
|-------|--------|------|
| >= 90% | EXCELENTE | Manter e monitorar |
| 80-89% | BOM | Corrigir pontos de atencao |
| 70-79% | ATENCAO | Plano de remediacao prioritario |
| 60-69% | RISCO | Intervencao imediata |
| < 60% | CRITICO | Risco legal iminente |
============================================================
```

**Lista de Nao-Conformidades**

```
NAO-CONFORMIDADES IDENTIFICADAS
============================================================
| ID | Area | Descricao | Severidade | Risco | Prazo |
|----|------|-----------|-----------|-------|-------|
| NC-001 | | | CRITICA | | Imediato |
| NC-002 | | | ALTA | | 30 dias |
| NC-003 | | | MEDIA | | 90 dias |
| NC-004 | | | BAIXA | | 180 dias |
============================================================
```

---

### Phase 3: Plano de Remediacao

```
PLANO DE REMEDIACAO
============================================================
PRIORIDADE 0 — IMEDIATO (0-15 dias)
| NC-ID | Acao Corretiva | Responsavel | Prazo | Custo |
|-------|---------------|-------------|-------|-------|
| | | | | |

PRIORIDADE 1 — URGENTE (15-30 dias)
| NC-ID | Acao Corretiva | Responsavel | Prazo | Custo |
|-------|---------------|-------------|-------|-------|
| | | | | |

PRIORIDADE 2 — IMPORTANTE (30-90 dias)
| NC-ID | Acao Corretiva | Responsavel | Prazo | Custo |
|-------|---------------|-------------|-------|-------|
| | | | | |

PRIORIDADE 3 — MELHORIA (90-180 dias)
| NC-ID | Acao Corretiva | Responsavel | Prazo | Custo |
|-------|---------------|-------------|-------|-------|
| | | | | |

INVESTIMENTO TOTAL EM REMEDIACAO: R$ ___
============================================================
```

---

## Validation

### Criterios de Qualidade da Auditoria

| Criterio | Requisito | Verificacao |
|----------|-----------|-------------|
| Cobertura | Todas as 8 dimensoes auditadas | [ ] |
| Evidencias | Cada achado suportado por evidencia | [ ] |
| Classificacao | Nao-conformidades classificadas por severidade | [ ] |
| Remediacao | Plano de acao para cada nao-conformidade | [ ] |
| Prazos | Prazos realistas para correcao | [ ] |
| Base legal | Referencia legal para cada requisito | [ ] |
| Imparcialidade | Auditoria objetiva, sem vies | [ ] |
| Atualizacao | Baseada em legislacao vigente | [ ] |
| Actionable | Recomendacoes concretas e executaveis | [ ] |
| Reauditoria | Data de reauditoria agendada | [ ] |

### Checklist de Entrega

- [ ] `compliance-audit-report.md` gerado
- [ ] `non-conformities.md` gerado
- [ ] `remediation-plan.md` gerado
- [ ] COF auditada (19 itens)
- [ ] Contratos revisados
- [ ] INPI verificado
- [ ] ANVISA verificada
- [ ] LGPD avaliada
- [ ] Tributaria verificada
- [ ] Trabalhista verificada
- [ ] Score de compliance calculado
- [ ] Plano de remediacao com prazos

---

## References

- **Lei 13.966/2019** — Lei de Franquias Empresariais.
- **Lei 13.709/2018 (LGPD)** — Lei Geral de Protecao de Dados.
- **ANVISA — RDC 216/2004** — Boas Praticas para Servicos de Alimentacao.
- **CLT e legislacao trabalhista** — Compliance trabalhista.
- **Codigo Tributario Nacional** — Obrigacoes tributarias.
- **INPI** — Procedimentos de registro e protecao de marcas.
- **ABF** — Codigo de Etica da Associacao Brasileira de Franchising.
- **Ribas, Filomena.** "Direito das Franquias." Thomson Reuters.
- **Simao Filho, Adalberto.** "Franchising: Aspectos Juridicos."

---

*Task version 1.0.0 — Squad Franchising Avend — FA-TASK-010*
