# Task: Calcular PIS/COFINS

## Purpose
Calcular PIS e COFINS conforme regime tributário (cumulativo ou não-cumulativo), aplicando alíquotas e regras de crédito.

## Inputs
- Regime tributário da empresa (Simples, Lucro Presumido, Lucro Real)
- Valor da operação (venda/serviço)
- CST PIS/COFINS
- NCM do produto (para monofásico/ST)
- Tipo de operação (receita bruta, importação, folha)

## Steps

1. **Identificar regime de apuração**
   - **Cumulativo** (Lucro Presumido): sem direito a crédito
     - PIS: 0,65%
     - COFINS: 3,00%
   - **Não-Cumulativo** (Lucro Real): com direito a crédito
     - PIS: 1,65%
     - COFINS: 7,60%
   - **Simples Nacional**: PIS/COFINS incluídos no DAS

2. **Verificar regime especial do produto**
   - **Monofásico**: tributação concentrada no fabricante/importador
     - Alíquotas majoradas na primeira etapa
     - Etapas seguintes: alíquota zero (CST 04, 05, 06)
   - **Substituição Tributária**: recolhimento antecipado
   - **Alíquota zero**: produtos da cesta básica (Lei 10.925)
   - **Isenção/Suspensão**: exportação, ZFM, etc.

3. **Calcular PIS**
   - **Cumulativo**: PIS = Receita Bruta × 0,65%
   - **Não-Cumulativo**: PIS = Receita Bruta × 1,65%
   - **Crédito PIS** (não-cumulativo): insumos, depreciação, energia, aluguel

4. **Calcular COFINS**
   - **Cumulativo**: COFINS = Receita Bruta × 3,00%
   - **Não-Cumulativo**: COFINS = Receita Bruta × 7,60%
   - **Crédito COFINS** (não-cumulativo): mesmas regras do PIS

5. **Determinar CST PIS/COFINS**
   - 01: Operação tributável (BC = receita bruta)
   - 02: Operação tributável (BC = receita - devoluções)
   - 04: Operação tributável monofásica (revenda alíquota zero)
   - 06: Operação tributável alíquota zero
   - 07: Operação isenta
   - 08: Operação sem incidência
   - 49: Outras operações de saída
   - 50-66: Operações de crédito (entrada)
   - 70-75: Operações de crédito presumido

6. **Validar resultado**
   - Confrontar CST com tipo de operação
   - Verificar se produto monofásico está com alíquota zero nas revendas
   - Confirmar direito a crédito no regime não-cumulativo

## Outputs
- Valor do PIS calculado
- Valor da COFINS calculado
- CST PIS e CST COFINS
- Base de cálculo utilizada
- Alíquotas aplicadas
- Créditos apurados (não-cumulativo)

## Acceptance Criteria
- [ ] Regime cumulativo/não-cumulativo identificado corretamente
- [ ] Alíquotas corretas para o regime (0,65%/3% ou 1,65%/7,60%)
- [ ] Produtos monofásicos com alíquota zero na revenda
- [ ] CST PIS/COFINS adequado à operação
- [ ] Créditos calculados quando regime não-cumulativo
- [ ] Simples Nacional tratado (PIS/COFINS no DAS)
