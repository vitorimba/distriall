# Task: Mapear Campos ERP para XML NF

## Purpose
Criar mapeamento detalhado entre campos do ERP e campos do XML da NF-e/NFS-e, garantindo que todos os dados obrigatórios sejam preenchidos.

## Inputs
- Schema/modelo de dados do ERP
- Layout XML NF-e v4.00 (MOC)
- Layout NFS-e (ABRASF quando aplicável)
- Campos obrigatórios por tipo de operação
- Regras de validação SEFAZ

## Steps

1. **Mapear dados do emitente**
   - ERP: empresa/filial → XML: emit
   - CNPJ, xNome, xFant, IE, IEST, IM, CRT
   - Endereço: xLgr, nro, xBairro, cMun, xMun, UF, CEP, cPais
   - Verificar campos que o ERP pode não ter (IM, IEST)

2. **Mapear dados do destinatário**
   - ERP: cliente/fornecedor → XML: dest
   - CNPJ/CPF, xNome, IE, ISUF, email
   - Endereço completo com código IBGE do município
   - indIEDest: 1 (contribuinte), 2 (isento), 9 (não contribuinte)

3. **Mapear itens/produtos**
   - ERP: item_pedido/produto → XML: det/prod
   - cProd, cEAN, xProd, NCM, CEST, CFOP
   - uCom, qCom, vUnCom, vProd
   - Campos frequentemente faltantes no ERP:
     - NCM (deve ser 8 dígitos)
     - CFOP (determinado pela operação)
     - CEST (quando ST)
     - cEAN/cEANTrib (código de barras)

4. **Mapear tributos**
   - ERP pode ter cálculo próprio ou necessitar cálculo externo
   - ICMS: orig, CST/CSOSN, modBC, vBC, pICMS, vICMS
   - PIS: CST, vBC, pPIS, vPIS
   - COFINS: CST, vBC, pCOFINS, vCOFINS
   - IPI: CST, vBC, pIPI, vIPI (quando aplicável)
   - Mapear de/para conforme formato do ERP

5. **Mapear totais e pagamento**
   - ERP: totais_pedido → XML: total/ICMSTot
   - vBC, vICMS, vICMSST, vProd, vFrete, vSeg, vDesc, vOutro, vNF
   - ERP: forma_pagamento → XML: pag/detPag
   - tPag (01=dinheiro, 03=cartão crédito, 17=PIX, etc.)

6. **Tratar lacunas e transformações**
   - Campos obrigatórios sem correspondência no ERP:
     - Criar campo customizado no ERP, ou
     - Definir valor padrão, ou
     - Calcular automaticamente
   - Transformações necessárias:
     - Código município → código IBGE (7 dígitos)
     - Unidade de medida → código SEFAZ
     - Data/hora → formato ISO 8601 com timezone

7. **Documentar mapeamento**
   - Tabela: campo ERP | campo XML | transformação | obrigatório
   - Campos com valor padrão
   - Campos que requerem intervenção manual
   - Regras de validação aplicáveis

## Outputs
- Tabela de mapeamento ERP ↔ XML NF completa
- Lista de campos faltantes no ERP
- Regras de transformação documentadas
- Valores padrão definidos para campos ausentes
- Script/configuração de mapeamento implementável

## Acceptance Criteria
- [ ] Todos os campos obrigatórios do XML mapeados
- [ ] Lacunas identificadas com solução (padrão/customizado/cálculo)
- [ ] Transformações documentadas (IBGE, unidade, data)
- [ ] Mapeamento cobre emitente, destinatário, itens, tributos, totais
- [ ] Formato de documentação permite implementação direta
- [ ] Regras de validação SEFAZ consideradas
