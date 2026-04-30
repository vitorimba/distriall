# Task: Determinar CST/CSOSN

## Purpose
Determinar o CST (Código de Situação Tributária) ou CSOSN (Código de Situação da Operação no Simples Nacional) conforme regime tributário e operação.

## Inputs
- Regime tributário (Simples Nacional, Lucro Presumido, Lucro Real)
- Tipo de operação (venda, devolução, remessa, transferência)
- Origem da mercadoria (nacional, importada, com conteúdo de importação)
- Existência de substituição tributária
- Benefícios fiscais (isenção, redução, diferimento)

## Steps

1. **Determinar origem da mercadoria (primeiro dígito)**
   - **0**: Nacional (exceto 3, 4, 5)
   - **1**: Estrangeira (importação direta)
   - **2**: Estrangeira (adquirida no mercado interno)
   - **3**: Nacional, conteúdo importação > 40%
   - **4**: Nacional, produção conforme processos produtivos básicos
   - **5**: Nacional, conteúdo importação <= 40%
   - **6**: Estrangeira, importação direta, sem similar nacional (CAMEX)
   - **7**: Estrangeira, mercado interno, sem similar nacional (CAMEX)
   - **8**: Nacional, conteúdo importação > 70%

2. **Determinar CST ICMS (regime normal — 2 dígitos)**
   - **00**: Tributada integralmente
   - **10**: Tributada com cobrança de ICMS por ST
   - **20**: Com redução de base de cálculo
   - **30**: Isenta/não tributada com cobrança de ICMS por ST
   - **40**: Isenta
   - **41**: Não tributada
   - **50**: Suspensão
   - **51**: Diferimento
   - **60**: ICMS cobrado anteriormente por ST
   - **70**: Com redução de BC e cobrança de ICMS por ST
   - **90**: Outros

3. **Determinar CSOSN (Simples Nacional — 3 dígitos)**
   - **101**: Tributada com permissão de crédito
   - **102**: Tributada sem permissão de crédito
   - **103**: Isenção do ICMS para faixa de receita bruta
   - **201**: Tributada com permissão de crédito e com ST
   - **202**: Tributada sem permissão de crédito e com ST
   - **203**: Isenção para faixa de receita bruta e com ST
   - **300**: Imune
   - **400**: Não tributada
   - **500**: ICMS cobrado anteriormente por ST
   - **900**: Outros

4. **Determinar CST PIS/COFINS**
   - Saída: 01-49 (conforme task `calculate-pis-cofins.md`)
   - Entrada: 50-66 (créditos)
   - Crédito presumido: 70-75

5. **Determinar CST IPI (quando aplicável)**
   - 00-05: Entrada
   - 50-55: Saída
   - 99: Outras

6. **Validar consistência**
   - CST × CFOP compatíveis
   - CST × regime tributário coerentes
   - Origem da mercadoria × documentação de importação

## Outputs
- CST ICMS completo (origem + tributação): ex: 0-00, 1-60
- CSOSN (se Simples Nacional): ex: 101, 500
- CST PIS e CST COFINS
- CST IPI (quando aplicável)
- Justificativa da classificação

## Acceptance Criteria
- [ ] Origem da mercadoria determinada corretamente (0-8)
- [ ] CST ou CSOSN adequado ao regime tributário
- [ ] Consistência CST × CFOP × operação validada
- [ ] CST PIS/COFINS determinados conforme regime
- [ ] Simples Nacional usa CSOSN (não CST)
- [ ] Operações com ST usam CST 10, 30, 60 ou 70
