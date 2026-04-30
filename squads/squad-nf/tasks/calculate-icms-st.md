# Task: Calcular ICMS-ST (Substituição Tributária)

## Purpose
Calcular ICMS-ST com MVA (Margem de Valor Agregado), recolhendo antecipadamente o imposto das etapas subsequentes da cadeia.

## Inputs
- Valor da mercadoria (operação própria)
- NCM do produto
- UF de origem e UF de destino
- MVA original e MVA ajustada (quando interestadual)
- Alíquota interna da UF destino
- Alíquota interestadual (quando aplicável)
- ICMS próprio já calculado
- Protocolo/Convênio ICMS aplicável

## Steps

1. **Verificar aplicabilidade do ICMS-ST**
   - Consultar NCM na tabela CEST (Código Especificador da Substituição Tributária)
   - Verificar protocolo/convênio entre UF origem e UF destino
   - Confirmar que o produto está no regime de ST para a operação

2. **Determinar MVA aplicável**
   - MVA Original: definida por protocolo/convênio
   - MVA Ajustada (operação interestadual):
     ```
     MVA Ajustada = [(1 + MVA Original) × (1 - ALQ inter) / (1 - ALQ intra)] - 1
     ```
   - Utilizar MVA ajustada quando alíquota interestadual < alíquota interna

3. **Calcular base de cálculo do ICMS-ST**
   - **BC ST = (Valor mercadoria + frete + seguro + despesas + IPI) × (1 + MVA%)**
   - Ou: BC ST por pauta fiscal (valor fixo definido pela UF), quando aplicável
   - Ou: BC ST por preço tabelado (PMC para medicamentos)

4. **Calcular ICMS-ST**
   - **ICMS-ST = (BC ST × Alíquota interna UF destino) - ICMS próprio**
   - Se resultado negativo: ICMS-ST = 0 (não há complemento)
   - Incluir FCP-ST quando exigido pela UF destino

5. **Calcular FCP-ST (quando aplicável)**
   - FCP-ST = BC ST × alíquota FCP da UF destino
   - Geralmente 2% sobre a mesma base

6. **Validar resultado**
   - Confrontar com convênio/protocolo vigente
   - Verificar CEST correto
   - Confirmar MVA atualizada (MVA muda periodicamente)

## Outputs
- Valor do ICMS-ST
- Base de cálculo do ICMS-ST
- MVA aplicada (original ou ajustada)
- CEST do produto
- FCP-ST (quando aplicável)
- Protocolo/Convênio de referência

## Acceptance Criteria
- [ ] CEST correto para o NCM/produto
- [ ] MVA ajustada calculada corretamente para operações interestaduais
- [ ] Fórmula: ICMS-ST = (BC ST × Aliq interna) - ICMS próprio
- [ ] BC ST inclui IPI quando aplicável
- [ ] FCP-ST calculado quando exigido
- [ ] Protocolo/Convênio vigente identificado
