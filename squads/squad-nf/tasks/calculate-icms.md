# Task: Calcular ICMS

## Purpose
Calcular ICMS (Imposto sobre Circulação de Mercadorias e Serviços) conforme UF de origem/destino, tipo de operação e regime tributário.

## Inputs
- UF de origem e UF de destino
- Valor da mercadoria
- NCM do produto
- CFOP da operação
- Regime tributário (Simples Nacional, Lucro Presumido, Lucro Real)
- CST/CSOSN do ICMS
- Existência de benefício fiscal (redução BC, isenção, diferimento)

## Steps

1. **Identificar alíquota aplicável**
   - Operação interna: alíquota interna da UF (7%, 12%, 17%, 18%, 20%, 25%)
   - Operação interestadual: 4% (importados), 7% (Sul/Sudeste→N/NE/CO), 12% (demais)
   - Consultar tabela de alíquotas por NCM/UF (CEST quando aplicável)

2. **Determinar base de cálculo**
   - BC padrão: valor do produto + frete + seguro + outras despesas - desconto
   - Verificar redução de base de cálculo (ex: cesta básica, medicamentos)
   - BC reduzida: BC × (percentual de redução)

3. **Aplicar cálculo**
   - **ICMS = BC × Alíquota**
   - Se redução: ICMS = (BC × % redução) × Alíquota
   - Se diferimento parcial: ICMS = BC × Alíquota × % não diferido
   - Se isenção/não-tributação: ICMS = 0, informar CST adequado

4. **Tratar Simples Nacional**
   - CSOSN em vez de CST
   - ICMS embutido na alíquota do DAS
   - Verificar sublimite estadual
   - Calcular crédito permitido ao destinatário (quando aplicável)

5. **Calcular FCP (Fundo de Combate à Pobreza)**
   - Verificar se UF cobra FCP (geralmente 2%)
   - FCP = BC × alíquota FCP
   - Informar em campo próprio do XML

6. **Validar resultado**
   - Confrontar com tabela de alíquotas vigente
   - Verificar consistência CST × tributação aplicada
   - Confirmar tratamento de benefícios fiscais

## Outputs
- Valor do ICMS calculado
- Base de cálculo utilizada
- Alíquota aplicada
- CST/CSOSN determinado
- Valor do FCP (quando aplicável)
- Detalhamento da redução (quando aplicável)

## Acceptance Criteria
- [ ] Alíquota correta para UF origem/destino e NCM
- [ ] Base de cálculo conforme legislação (com/sem redução)
- [ ] Fórmula: ICMS = BC × Alíquota aplicada corretamente
- [ ] Simples Nacional tratado com CSOSN
- [ ] FCP calculado quando exigido pela UF
- [ ] Benefícios fiscais aplicados quando existentes
