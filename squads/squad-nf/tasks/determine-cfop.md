# Task: Determinar CFOP

## Purpose
Determinar o CFOP (Código Fiscal de Operações e Prestações) correto de 4 dígitos conforme a natureza da operação.

## Inputs
- Natureza da operação (venda, devolução, remessa, transferência, etc.)
- Origem/destino (dentro do estado, interestadual, exterior)
- Tipo de mercadoria (produção própria, revenda, ativo, uso/consumo)
- Finalidade (comercialização, industrialização, consumidor final)

## Steps

1. **Determinar o primeiro dígito (grupo)**
   - **1.XXX**: Entrada dentro do estado
   - **2.XXX**: Entrada interestadual
   - **3.XXX**: Entrada do exterior (importação)
   - **5.XXX**: Saída dentro do estado
   - **6.XXX**: Saída interestadual
   - **7.XXX**: Saída para exterior (exportação)

2. **Determinar o segundo dígito (subgrupo — centena)**
   - X.**1**XX: Compra/Venda de mercadoria
   - X.**2**XX: Transferência
   - X.**3**XX: Devolução
   - X.**4**XX: Remessa (industrialização, demonstração, conserto)
   - X.**5**XX: Retorno/Entrada (de mercadoria remetida)
   - X.**6**XX: Comunicação/Energia/Transporte
   - X.**9**XX: Outras operações

3. **Determinar os dois últimos dígitos (operação específica)**
   - Consultar tabela CFOP para a operação exata
   - Exemplos comuns:
     - 5102/6102: Venda de mercadoria adquirida
     - 5101/6101: Venda de produção própria
     - 5202/6202: Devolução de compra
     - 5405: Venda de mercadoria com ST (contribuinte substituído)
     - 5949/6949: Outra saída não especificada

4. **Validar consistência com CST/CSOSN**
   - CFOP de venda → CST de tributação correspondente
   - CFOP de devolução → CST compatível
   - CFOP de remessa → CST de não-tributação ou suspensão
   - Verificar coerência CFOP × CST × natureza da operação

5. **Verificar regras especiais**
   - Venda com ST: usar CFOP específico (5403, 5405)
   - Bonificação: 5910/6910
   - Amostra grátis: 5911/6911
   - Consignação: 5917/6917 (remessa), 5919/6919 (devolução)
   - Zona Franca de Manaus: CFOPs específicos

## Outputs
- Código CFOP (4 dígitos)
- Descrição oficial do CFOP
- Natureza da operação por extenso
- CST/CSOSN compatível sugerido

## Acceptance Criteria
- [ ] Primeiro dígito correto para direção da operação (entrada/saída/estado/interestadual)
- [ ] CFOP de 4 dígitos válido e existente na tabela oficial
- [ ] Descrição do CFOP corresponde à operação real
- [ ] Consistência entre CFOP e CST/CSOSN verificada
- [ ] Operações especiais (ST, bonificação, ZFM) com CFOP específico
