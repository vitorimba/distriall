# PRD — Squad NF (Notas Fiscais)

> Version: 1.0.0 | Status: Approved | Date: 2026-04-14
> Author: Felipe Oliveira + Squad Architect
> Pipeline: wf-squad-pro-pipeline (F0)

---

## 1. Visao Geral

**Nome:** squad-nf
**Dominio:** Notas Fiscais Eletronicas no Brasil
**Tipo:** hybrid (expert + pipeline)
**Depth:** standard (11 agents)
**Target:** Desenvolvedores e empresas que precisam emitir, calcular, conferir e integrar NFs em sistemas proprios ou de mercado.

**Proposta de valor:**
Um squad que transforma a complexidade tributaria brasileira em operacoes simples e automatizadas. Emite NFs com calculo automatico por regime, trata rejeicoes inteligentemente, audita compliance, e gera integracao real para qualquer sistema — incluindo ERPs custom.

---

## 2. Problema

- Legislacao tributaria brasileira e uma das mais complexas do mundo (27 legislacoes estaduais de ICMS + 5.000+ prefeituras para ISS)
- Cada regime tributario (MEI, Simples, Presumido, Real) tem regras completamente diferentes
- Rejeicoes da SEFAZ sao cripticas (codigos numericos sem contexto)
- Integracao com SEFAZ exige SOAP/XML, certificados digitais, contingencia
- Compliance SPED exige cruzamento preciso de dados
- ERPs custom nao tem modulo fiscal pronto

---

## 3. Escopo

### IN (o squad faz)

| Area | Descricao |
|------|-----------|
| Emissao | NF-e, NFS-e, NFC-e com calculo automatico |
| Calculo tributario | ICMS, IPI, PIS/COFINS, ISS, ICMS-ST, DIFAL |
| Classificacao fiscal | NCM, CFOP, CST/CSOSN, CEST automatico |
| Integracao SEFAZ | Web Services, XML, certificados, contingencia |
| Conferencia/Auditoria | Cruzamento NFs emitidas vs recebidas |
| Compliance SPED | Orientacao SPED Fiscal, EFD, ECD/ECF |
| Integracao ERPs mercado | TOTVS, Omie, Bling, Tiny, Shopify |
| Integracao ERPs custom | Gerar modulo NF para sistemas proprios |
| Monitoramento | Certificados, prazos, obrigacoes |
| Tratamento de rejeicoes | 600+ codigos mapeados com fix sugerido |

### OUT (o squad NAO faz)

- Emissao real via API (o squad orienta e gera codigo, nao executa a chamada SEFAZ)
- Contabilidade geral (fora do escopo fiscal)
- Folha de pagamento
- Gestao financeira (contas a pagar/receber)

---

## 4. Arquitetura de Agents (11)

### Orchestrator

| Agent | Nome | Papel |
|-------|------|-------|
| **nf-chief** | Chief | Roteia requests, gerencia pipeline de emissao, coordena agents |

### Tier 0 — Diagnostico

| Agent | Nome | Papel | Expertise |
|-------|------|-------|-----------|
| **regime-analyst** | Analyst | Analisa regime tributario, determina regras aplicaveis | MEI, Simples, Presumido, Real + transicoes |
| **fiscal-classifier** | Classifier | Classifica NCM, CFOP, CST/CSOSN, CEST | Tabelas TIPI, CFOP, legislacao |

### Tier 1 — Execucao

| Agent | Nome | Papel | Expertise |
|-------|------|-------|-----------|
| **nf-emitter** | Emitter | Emissao NF-e/NFS-e/NFC-e + cancelamento + CC-e | Schemas XML, eventos, prazos |
| **tax-calculator** | Calculator | Calcula todos os tributos aplicaveis | ICMS (27 UFs), IPI, PIS/COFINS, ISS, ST, DIFAL |
| **sefaz-integrator** | Integrator | Comunicacao com SEFAZ, XML, certificados | Web Services SOAP, contingencia, assinatura digital |

### Tier 2 — Sistematicos

| Agent | Nome | Papel | Expertise |
|-------|------|-------|-----------|
| **compliance-auditor** | Auditor | Conferencia, cruzamento, preparacao SPED | SPED Fiscal, EFD, malha fina |
| **integration-architect** | Architect | Projeta e gera integracoes NF para qualquer sistema | ERPs mercado + custom, APIs, schemas |
| **nf-monitor** | Monitor | Monitora certificados, prazos, obrigacoes | Alertas preventivos, calendario fiscal |

### Tools

| Agent | Nome | Papel |
|-------|------|-------|
| **rejection-resolver** | Resolver | Mapeia 600+ codigos de rejeicao com diagnostico e fix |
| **schema-generator** | Generator | Gera migrations, schemas, types para integracao custom |

---

## 5. Tasks (~38)

### Emissao (7)

| Task | Agent | Descricao |
|------|-------|-----------|
| emit-nfe | nf-emitter | Emitir NF-e (produtos) |
| emit-nfse | nf-emitter | Emitir NFS-e (servicos) |
| emit-nfce | nf-emitter | Emitir NFC-e (consumidor) |
| cancel-nf | nf-emitter | Cancelar NF dentro do prazo |
| correction-letter | nf-emitter | Emitir CC-e (carta de correcao) |
| void-numbers | nf-emitter | Inutilizar faixa de numeracao |
| manifest-recipient | nf-emitter | Manifestacao do destinatario |

### Calculo Tributario (6)

| Task | Agent | Descricao |
|------|-------|-----------|
| calculate-icms | tax-calculator | ICMS por UF/operacao |
| calculate-icms-st | tax-calculator | ICMS-ST com MVA por NCM/UF |
| calculate-pis-cofins | tax-calculator | PIS/COFINS cumulativo vs nao-cumulativo |
| calculate-iss | tax-calculator | ISS por municipio |
| calculate-difal | tax-calculator | DIFAL interestadual |
| determine-tax-regime | regime-analyst | Identificar regime e regras aplicaveis |

### Classificacao Fiscal (3)

| Task | Agent | Descricao |
|------|-------|-----------|
| classify-ncm | fiscal-classifier | Determinar NCM do produto |
| determine-cfop | fiscal-classifier | CFOP por natureza da operacao |
| determine-cst | fiscal-classifier | CST/CSOSN por regime e operacao |

### Integracao SEFAZ (5)

| Task | Agent | Descricao |
|------|-------|-----------|
| connect-sefaz | sefaz-integrator | Configurar conexao com Web Service SEFAZ |
| handle-rejection | rejection-resolver | Diagnosticar e resolver rejeicao |
| manage-certificate | sefaz-integrator | Gerenciar certificado digital A1/A3 |
| switch-contingency | sefaz-integrator | Alternar para modo contingencia |
| download-xml | sefaz-integrator | Baixar XMLs via distribuicao DFe |

### Compliance (4)

| Task | Agent | Descricao |
|------|-------|-----------|
| audit-cross-check | compliance-auditor | Cruzar NFs emitidas vs recebidas |
| prepare-sped-fiscal | compliance-auditor | Orientar geracao SPED Fiscal |
| prepare-efd | compliance-auditor | Orientar EFD-Contribuicoes |
| validate-obligations | compliance-auditor | Validar obrigacoes pendentes |

### Integracao Custom (8)

| Task | Agent | Descricao |
|------|-------|-----------|
| analyze-target-system | integration-architect | Analisar arquitetura do sistema destino |
| design-nf-module | integration-architect | Projetar modulo de NF para o sistema |
| generate-nf-schema | schema-generator | Gerar migrations/schema de banco |
| generate-nf-endpoints | schema-generator | Gerar API routes de NF |
| generate-nf-service | schema-generator | Gerar service layer de emissao |
| generate-nf-webhooks | schema-generator | Gerar handlers de webhook |
| generate-nf-ui | schema-generator | Gerar componentes de UI |
| connect-nf-provider | integration-architect | Integrar com Focus/Enotas/Webmania |

### Integracao ERPs Mercado (2)

| Task | Agent | Descricao |
|------|-------|-----------|
| setup-erp-integration | integration-architect | Configurar integracao com ERP de mercado |
| map-erp-fields | integration-architect | Mapear campos do ERP para XML NF |

### Monitoramento (3)

| Task | Agent | Descricao |
|------|-------|-----------|
| monitor-certificates | nf-monitor | Alertar certificados proximos do vencimento |
| monitor-deadlines | nf-monitor | Calendario de obrigacoes fiscais |
| regime-change-impact | nf-monitor | Simular impacto de mudanca de regime |

---

## 6. Workflows (4)

### wf-emit-complete.yaml
```
Pipeline completo de emissao:
classify (NCM/CFOP/CST) → calculate (tributos) → emit (SEFAZ) → validate (protocolo)
```

### wf-audit-monthly.yaml
```
Auditoria mensal:
download-xml → cross-check → report-divergences → prepare-sped
```

### wf-regime-migration.yaml
```
Migrar regime tributario:
analyze-impact → update-csts → recalculate-samples → validate → report
```

### wf-erp-integration.yaml
```
Integrar NF em sistema custom:
analyze-system → design-module → generate-schema → generate-endpoints →
generate-service → generate-webhooks → connect-provider → test
```

---

## 7. Data/KBs (8)

| Arquivo | Conteudo |
|---------|----------|
| nf-kb.md | Knowledge base geral do dominio |
| rejection-codes.yaml | 600+ codigos de rejeicao SEFAZ com diagnostico e fix |
| cfop-table.yaml | Tabela CFOP completa com descricao e uso |
| ncm-tax-rates.yaml | Aliquotas por NCM/UF (ICMS, IPI) |
| state-rules.yaml | Regras especificas por estado (beneficios, reducoes) |
| regime-rules.yaml | Regras por regime tributario (CST, aliquotas, obrigacoes) |
| sped-obligations.yaml | Calendario de obrigacoes acessorias |
| erp-integration-patterns.yaml | Padroes de integracao por ERP/stack |

---

## 8. Templates (5)

| Template | Uso |
|----------|-----|
| nf-xml-tmpl.xml | Template de XML NF-e |
| nf-report-tmpl.md | Relatorio de emissao/auditoria |
| integration-design-tmpl.md | Documento de design de integracao |
| nf-module-tmpl.ts | Template de service layer TypeScript |
| migration-tmpl.sql | Template de migration SQL |

---

## 9. Checklists (3)

| Checklist | Uso |
|-----------|-----|
| emission-quality.md | Pre/pos emissao de NF |
| integration-readiness.md | Validar integracao antes de go-live |
| compliance-audit.md | Auditoria mensal de compliance |

---

## 10. Metricas de Sucesso

| Metrica | Target |
|---------|--------|
| Taxa de rejeicao resolvida automaticamente | > 80% |
| Cobertura de regimes | 4/4 (MEI, Simples, Presumido, Real) |
| Cobertura de UFs para ICMS | 27/27 |
| Tempo para gerar integracao custom | < 2h |
| Score de qualidade do squad | >= 8.0/10 |

---

## 11. Dependencias

| Dependencia | Tipo | Descricao |
|-------------|------|-----------|
| API de emissao (Focus/Enotas/Webmania) | Externa | Provider para comunicar com SEFAZ |
| Certificado digital A1 | Infra | Para assinar XMLs |
| Tabelas NCM/CFOP atualizadas | Data | Manter atualizado periodicamente |

---

## 12. Roadmap de Construcao

| Fase | O que | Prioridade |
|------|-------|-----------|
| F1 | Core: nf-chief + regime-analyst + tax-calculator + nf-emitter | P0 |
| F2 | Classificacao: fiscal-classifier + sefaz-integrator | P0 |
| F3 | Integracao: integration-architect + schema-generator | P1 |
| F4 | Compliance: compliance-auditor + nf-monitor | P1 |
| F5 | Tool: rejection-resolver + data files | P1 |
| F6 | Validate + Lifecycle + Handoff | P0 |

---

## 13. Exemplo de Uso

### Emitir NF para ERP da BM
```
@squad-nf:nf-chief *emit-nfe
  → regime-analyst detecta: Simples Nacional
  → fiscal-classifier: NCM 6109.10.00, CFOP 5.102, CSOSN 102
  → tax-calculator: ICMS isento (Simples), PIS/COFINS incluso no DAS
  → nf-emitter: gera XML, assina, transmite via Focus API
  → rejeicao? rejection-resolver: "539 - duplicidade: ja existe NF com mesma chave. Acao: verificar numeracao."
```

### Integrar NF no ERP da BM
```
@squad-nf:integration-architect *design-nf-module --target bmpro
  → analisa: Next.js + Supabase + TypeScript
  → gera: migrations, API routes, NFService.ts, webhooks, UI components
  → conecta: Focus API como provider
  → resultado: modulo NF pronto para deploy no bmpro
```
