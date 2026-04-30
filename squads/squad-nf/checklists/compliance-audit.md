# Checklist: Compliance Audit (Auditoria Mensal)

> Baseado na metodologia de 7 fases do Sandro Rodrigues para SPED.
> Executar mensalmente apos o fechamento do periodo.

---

## Fase 1: Coleta de Documentos

- [ ] Download de todos os XMLs de NF-e emitidas no periodo (portal SEFAZ)
- [ ] Download de todos os XMLs de NF-e recebidas (Manifestacao Destinatario)
- [ ] Download de NFS-e emitidas (portal da prefeitura, se aplicavel)
- [ ] Download de CT-e (se aplicavel)
- [ ] Extracao dos registros do ERP/sistema interno
- [ ] Organizacao dos XMLs por tipo (entrada/saida) e CFOP

## Fase 2: Cruzamento NF-e Emitidas

- [ ] Todas as NF-e emitidas no sistema constam no portal SEFAZ
- [ ] Nenhuma NF-e no SEFAZ sem correspondente no sistema (emissao fora do sistema?)
- [ ] Valores totais conferem (sistema vs. XML)
- [ ] Chaves de acesso corretas e sem duplicidade
- [ ] NF-e canceladas registradas corretamente em ambos os lados
- [ ] Numeracao sequencial sem lacunas (ou inutilizacoes registradas)

## Fase 3: Cruzamento NF-e Recebidas

- [ ] Todas as NF-e recebidas (manifestacao) registradas no sistema
- [ ] Nenhuma NF-e no sistema sem XML correspondente
- [ ] Fornecedores com situacao cadastral regular
- [ ] CFOP de entrada compativel com CFOP de saida do fornecedor
- [ ] Creditos de ICMS somente para NF-e com CST que permite creditamento
- [ ] NF-e de devolucao registradas corretamente

## Fase 4: Validacao Fiscal

### ICMS
- [ ] Aliquotas internas corretas para o estado
- [ ] Aliquotas interestaduais corretas (4%, 7%, 12%)
- [ ] DIFAL calculado corretamente (venda interestadual a consumidor final)
- [ ] ICMS-ST com MVA atualizada (conferir Protocolo/Convenio vigente)
- [ ] Base de calculo ICMS inclui frete, seguro, outras despesas
- [ ] Reducao de base de calculo aplicada corretamente (se beneficio)

### PIS/COFINS
- [ ] CST de PIS/COFINS correto para o regime
- [ ] Aliquotas corretas: Cumulativo (0,65%/3%) ou Nao-cumulativo (1,65%/7,6%)
- [ ] Creditos de PIS/COFINS somente para itens com direito
- [ ] Receitas isentas/nao-tributadas segregadas corretamente

### IPI (se industria)
- [ ] NCM com classificacao correta na TIPI
- [ ] Aliquota IPI conforme TIPI vigente
- [ ] Creditos de IPI registrados corretamente
- [ ] Isentos/NT identificados corretamente

## Fase 5: Apuracao de Impostos

- [ ] Apuracao de ICMS: debitos - creditos = saldo
- [ ] Apuracao de ICMS-ST (se aplicavel)
- [ ] Apuracao de IPI (se industria)
- [ ] Apuracao de PIS: debitos - creditos = saldo
- [ ] Apuracao de COFINS: debitos - creditos = saldo
- [ ] Conferencia DAS (se Simples Nacional): faturamento x aliquota efetiva
- [ ] ISS apurado corretamente (se servicos)

## Fase 6: Obrigacoes Acessorias

### SPED Fiscal (EFD ICMS/IPI)
- [ ] Arquivo gerado no layout vigente
- [ ] Todos os registros obrigatorios preenchidos
- [ ] Validacao no PVA sem erros
- [ ] Advertencias analisadas e justificadas
- [ ] Inventario (Bloco H) preenchido (fevereiro ou mudanca de regime)

### EFD Contribuicoes (PIS/COFINS)
- [ ] Arquivo gerado no layout vigente
- [ ] Receitas segregadas por CST
- [ ] Creditos detalhados por item
- [ ] Validacao no PVA sem erros

### DCTF / DCTFWeb
- [ ] Debitos declarados conferem com apuracao
- [ ] Pagamentos/compensacoes informados
- [ ] Prazo de entrega respeitado

### DAS (Simples Nacional)
- [ ] Faturamento do mes correto
- [ ] Faturamento acumulado 12 meses correto
- [ ] Anexo correto (I a V)
- [ ] Fator R calculado (se Anexo V com possibilidade de III)
- [ ] DAS gerado e pago no prazo

### GIA (se obrigatorio no estado)
- [ ] Valores conferem com SPED Fiscal
- [ ] Entrega no prazo

## Fase 7: Relatorio Final

- [ ] Relatorio de divergencias gerado (usar `templates/nf-report-tmpl.md`)
- [ ] Cada divergencia com acao corretiva definida
- [ ] Score de risco calculado
- [ ] Divergencias criticas resolvidas antes do envio do SPED
- [ ] Relatorio revisado pelo contador responsavel
- [ ] Acoes corretivas com prazo e responsavel definido
- [ ] Relatorio arquivado para referencia futura

---

## Calendario de Referencia

| Obrigacao | Prazo Tipico | Regime |
|-----------|-------------|--------|
| DAS | Dia 20 | Simples |
| SPED Fiscal | Dia 20 | Presumido/Real |
| EFD Contribuicoes | Dia 15 (10o dia util) | Presumido/Real |
| DCTF | Dia 15 (15o dia util) | Presumido/Real |
| GIA-SP | Dia 15-20 (conforme CNAE) | SP |

> Prazos podem variar. Consultar `data/sped-obligations.yaml` para calendario completo.

---

*Checklist baseado na metodologia Sandro Rodrigues — mantido pelo squad-nf*
