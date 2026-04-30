# Task: Auditoria Cruzada de NFs (Emitidas vs Recebidas)

## Purpose
Cruzar NFs emitidas com NFs recebidas para identificar divergências, notas não escrituradas e potenciais irregularidades fiscais.

## Inputs
- XMLs de NFs emitidas (período)
- XMLs de NFs recebidas via DF-e (período)
- Escrituração fiscal do período (SPED, livros)
- CNPJ da empresa

## Steps

1. **Coletar dados de NFs emitidas**
   - Listar todas NFs emitidas no período
   - Extrair: chave, destinatário, valor, ICMS, status (autorizada/cancelada)
   - Incluir NFC-e e NFS-e quando aplicável

2. **Coletar dados de NFs recebidas**
   - Baixar NFs via DF-e (task `download-xml.md`)
   - Extrair: chave, emitente, valor, ICMS, status
   - Incluir manifestações do destinatário realizadas

3. **Cruzar emitidas vs escrituradas**
   - Verificar se todas NFs emitidas estão escrituradas no SPED
   - Identificar NFs emitidas mas não escrituradas (omissão)
   - Identificar NFs escrituradas mas não encontradas nos XMLs (fantasma)
   - Comparar valores: XML vs escrituração

4. **Cruzar recebidas vs escrituradas**
   - Verificar se todas NFs recebidas estão escrituradas
   - Identificar NFs de entrada não escrituradas (crédito não aproveitado)
   - Identificar créditos escriturados sem NF correspondente (crédito indevido)
   - Comparar valores de crédito: XML vs escrituração

5. **Verificar consistência de cancelamentos**
   - NFs canceladas devem ter evento 110111
   - NFs canceladas não devem gerar crédito/débito
   - Verificar se cancelamento foi escriturado

6. **Gerar relatório de divergências**
   - Classificar por severidade: Crítica, Alta, Média, Baixa
   - **Crítica**: NF fantasma, crédito indevido
   - **Alta**: NF não escriturada, valor divergente > 5%
   - **Média**: Valor divergente < 5%, CFOP divergente
   - **Baixa**: Dados cadastrais divergentes
   - Incluir recomendações de correção

## Outputs
- Relatório de auditoria cruzada
- Lista de divergências classificadas por severidade
- NFs não escrituradas (emitidas e recebidas)
- Créditos indevidos identificados
- Recomendações de correção

## Acceptance Criteria
- [ ] Todas NFs emitidas cruzadas com escrituração
- [ ] Todas NFs recebidas cruzadas com escrituração
- [ ] Divergências classificadas por severidade
- [ ] Cancelamentos verificados e consistentes
- [ ] Relatório com recomendações de correção
- [ ] Créditos indevidos sinalizados
