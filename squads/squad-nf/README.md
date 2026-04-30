# Squad NF — Nota Fiscal Eletronica

Squad especializado em operacoes com Nota Fiscal Eletronica (NF-e/NFC-e) no Brasil: emissao, cancelamento, auditoria fiscal, integracao com ERPs e conformidade tributaria.

---

## Quick Start

```bash
# Ativar um agente do squad
@nf-fiscal       # Classificacao fiscal (CFOP, CST, NCM)
@nf-tax          # Calculo de impostos
@nf-emitter      # Emissao e cancelamento de NF-e
@nf-auditor      # Auditoria mensal e SPED
@nf-integrator   # Integracao com ERPs e sistemas
@nf-chief        # Orquestrador do squad
```

---

## Agentes

| Agente | Persona | Escopo |
|--------|---------|--------|
| `@nf-chief` | Orquestrador | Coordena agentes, seleciona workflow, resolve conflitos |
| `@nf-fiscal` | Classificador Fiscal | CFOP, CST/CSOSN, NCM, CEST, natureza da operacao |
| `@nf-tax` | Calculista Tributario | ICMS, ICMS-ST, IPI, PIS, COFINS, DIFAL, totais |
| `@nf-emitter` | Emissor | Geracao XML, assinatura, transmissao SEFAZ, DANFE |
| `@nf-auditor` | Auditor Fiscal | Cruzamento XML vs ERP, SPED, obrigacoes acessorias |
| `@nf-integrator` | Integrador | Modulo NF em ERPs/sistemas, API design, webhooks |

---

## Comandos

| Comando | Descricao |
|---------|-----------|
| `*emit {order_id}` | Emitir NF-e para um pedido |
| `*cancel {access_key}` | Cancelar NF-e autorizada |
| `*consult {access_key}` | Consultar status da NF-e |
| `*correct {access_key}` | Emitir Carta de Correcao |
| `*audit {MM/YYYY}` | Executar auditoria mensal |
| `*classify {operation}` | Classificar operacao fiscal |
| `*calculate {items}` | Calcular impostos |
| `*migrate-regime {from} {to}` | Simular migracao de regime |
| `*integrate {system}` | Iniciar integracao com ERP/sistema |
| `*help` | Listar comandos disponiveis |

---

## Pipeline de Emissao

```
┌─────────┐    ┌───────────┐    ┌───────────┐    ┌──────────┐    ┌──────────┐
│  INIT   │───▶│ CLASSIFY  │───▶│ CALCULATE │───▶│   EMIT   │───▶│ VALIDATE │
│         │    │ CFOP/CST  │    │  Impostos │    │ XML+Sign │    │  SEFAZ   │
└─────────┘    └───────────┘    └───────────┘    └────┬─────┘    └────┬─────┘
                                                      │               │
                                                      ▼               ▼
                                                ┌──────────┐    ┌──────────┐
                                                │ REJECTION│    │ COMPLETE │
                                                │ HANDLER  │───▶│ XML+DANFE│
                                                └──────────┘    └──────────┘
```

---

## Workflows

| Workflow | Arquivo | Descricao |
|----------|---------|-----------|
| Emissao Completa | `workflows/wf-emit-complete.yaml` | Pipeline completo de emissao NF-e |
| Auditoria Mensal | `workflows/wf-audit-monthly.yaml` | Auditoria 7 fases + SPED |
| Migracao de Regime | `workflows/wf-regime-migration.yaml` | Mudanca entre regimes tributarios |
| Integracao ERP | `workflows/wf-erp-integration.yaml` | Integrar modulo NF em sistema existente |

---

## Estrutura

```
squad-nf/
├── agents/              # Definicoes de agentes
├── workflows/           # 4 workflows
│   ├── wf-emit-complete.yaml
│   ├── wf-audit-monthly.yaml
│   ├── wf-regime-migration.yaml
│   └── wf-erp-integration.yaml
├── templates/           # 5 templates
│   ├── nf-xml-tmpl.xml
│   ├── nf-report-tmpl.md
│   ├── integration-design-tmpl.md
│   ├── nf-module-tmpl.ts
│   └── migration-tmpl.sql
├── checklists/          # 3 checklists
│   ├── emission-quality.md
│   ├── integration-readiness.md
│   └── compliance-audit.md
├── data/                # 8 data files
│   ├── nf-kb.md
│   ├── rejection-codes.yaml
│   ├── cfop-table.yaml
│   ├── ncm-tax-rates.yaml
│   ├── state-rules.yaml
│   ├── regime-rules.yaml
│   ├── sped-obligations.yaml
│   └── erp-integration-patterns.yaml
├── tasks/               # Task definitions
├── config/              # Squad configuration
├── docs/                # Documentation
└── README.md
```

---

## Data Files (Referencia Rapida)

| Arquivo | Conteudo | Qtd Items |
|---------|---------|-----------|
| `nf-kb.md` | Knowledge base: tipos NF, regimes, operacoes, FAQ | — |
| `rejection-codes.yaml` | Codigos de rejeicao SEFAZ mais comuns | ~50 |
| `cfop-table.yaml` | CFOPs mais utilizados | ~38 |
| `ncm-tax-rates.yaml` | NCMs com aliquotas IPI e tratamento ICMS | ~25 |
| `state-rules.yaml` | Regras por estado (SP, MG, RJ, RS, BA, PR) | 6 |
| `regime-rules.yaml` | Regras por regime (MEI, Simples, Presumido, Real) | 4 |
| `sped-obligations.yaml` | Calendario de obrigacoes fiscais | ~20 |
| `erp-integration-patterns.yaml` | Patterns para TOTVS, Omie, Bling, Shopify, Custom | 6 |

---

## Requisitos

### Obrigatorios
- Certificado digital A1 (.pfx) valido
- CNPJ com Inscricao Estadual ativa
- Credenciamento na SEFAZ para emissao de NF-e
- Provider NF-e (Focus NFe, NFe.io, eNotas, ou WebmaniaBR)

### Recomendados
- Node.js 18+
- PostgreSQL / Supabase (para persistencia)
- Ambiente de homologacao configurado no provider

---

## Referencias

- [Portal Nacional NF-e](https://www.nfe.fazenda.gov.br)
- [Manual de Integracao v4.0](https://www.nfe.fazenda.gov.br/portal/listaConteudo.aspx?tipoConteudo=33ol5hhSYZk=)
- [BrasilAPI](https://brasilapi.com.br) — NCM, CNPJ, IBGE
- [Focus NFe Docs](https://focusnfe.com.br/doc/)
- [NFe.io Docs](https://nfe.io/docs/)

---

*Squad NF v1.0 — Synkra AIOX*
