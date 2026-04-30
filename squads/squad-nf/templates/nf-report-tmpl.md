# {{REPORT_TYPE}} — {{COMPETENCIA}}

> Gerado em: {{DATA_GERACAO}}
> CNPJ: {{CNPJ}}
> Regime: {{REGIME}}

---

## Resumo Executivo

| Metrica | Valor |
|---------|-------|
| Total NF-e emitidas | {{TOTAL_EMITIDAS}} |
| Total NF-e recebidas | {{TOTAL_RECEBIDAS}} |
| Valor total saidas | R$ {{VALOR_SAIDAS}} |
| Valor total entradas | R$ {{VALOR_ENTRADAS}} |
| NF-e canceladas | {{TOTAL_CANCELADAS}} |
| NF-e rejeitadas | {{TOTAL_REJEITADAS}} |
| Taxa de sucesso | {{TAXA_SUCESSO}}% |

---

## Impostos Apurados

| Imposto | Base de Calculo | Aliquota Media | Valor |
|---------|----------------|----------------|-------|
| ICMS | R$ {{BC_ICMS}} | {{ALQ_ICMS}}% | R$ {{VALOR_ICMS}} |
| ICMS-ST | R$ {{BC_ICMS_ST}} | — | R$ {{VALOR_ICMS_ST}} |
| IPI | R$ {{BC_IPI}} | {{ALQ_IPI}}% | R$ {{VALOR_IPI}} |
| PIS | R$ {{BC_PIS}} | {{ALQ_PIS}}% | R$ {{VALOR_PIS}} |
| COFINS | R$ {{BC_COFINS}} | {{ALQ_COFINS}}% | R$ {{VALOR_COFINS}} |
| **Total Impostos** | — | — | **R$ {{TOTAL_IMPOSTOS}}** |

---

## Divergencias Encontradas

{{#IF DIVERGENCIAS}}
| # | Tipo | NF-e | Descricao | Severidade | Acao |
|---|------|------|-----------|------------|------|
{{#EACH DIVERGENCIA}}
| {{INDEX}} | {{TIPO}} | {{CHAVE_NF}} | {{DESCRICAO}} | {{SEVERIDADE}} | {{ACAO_CORRETIVA}} |
{{/EACH}}
{{/IF}}

{{#IF NO_DIVERGENCIAS}}
Nenhuma divergencia encontrada neste periodo.
{{/IF}}

---

## CFOP mais utilizados

| CFOP | Descricao | Quantidade | Valor Total |
|------|-----------|------------|-------------|
{{#EACH CFOP_TOP}}
| {{CFOP}} | {{DESCRICAO}} | {{QTD}} | R$ {{VALOR}} |
{{/EACH}}

---

## Rejeicoes no Periodo

{{#IF REJEICOES}}
| Codigo | Descricao | Ocorrencias | Resolvidas |
|--------|-----------|-------------|------------|
{{#EACH REJEICAO}}
| {{CODIGO}} | {{DESCRICAO}} | {{COUNT}} | {{RESOLVIDAS}}/{{COUNT}} |
{{/EACH}}
{{/IF}}

---

## Obrigacoes Acessorias

| Obrigacao | Prazo | Status |
|-----------|-------|--------|
| SPED Fiscal (EFD ICMS/IPI) | {{PRAZO_SPED_FISCAL}} | {{STATUS_SPED_FISCAL}} |
| EFD Contribuicoes (PIS/COFINS) | {{PRAZO_EFD_CONTRIB}} | {{STATUS_EFD_CONTRIB}} |
| DCTF | {{PRAZO_DCTF}} | {{STATUS_DCTF}} |
| DAS (Simples Nacional) | {{PRAZO_DAS}} | {{STATUS_DAS}} |
| GIA | {{PRAZO_GIA}} | {{STATUS_GIA}} |

---

## Acoes Recomendadas

{{#EACH ACAO}}
- [ ] {{DESCRICAO}} — Prioridade: {{PRIORIDADE}}
{{/EACH}}

---

## Observacoes

{{OBSERVACOES}}

---

*Relatorio gerado automaticamente pelo squad-nf v{{VERSION}}*
