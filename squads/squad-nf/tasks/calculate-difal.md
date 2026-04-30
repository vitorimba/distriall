# Task: Calcular DIFAL (Diferencial de Alíquotas)

## Purpose
Calcular DIFAL para operações interestaduais destinadas a consumidor final não contribuinte, conforme EC 87/2015.

## Inputs
- UF de origem e UF de destino
- Valor da mercadoria
- Alíquota interestadual aplicável (4%, 7% ou 12%)
- Alíquota interna da UF de destino
- Indicador de consumidor final (sim/não)
- Indicador de contribuinte do ICMS (sim/não)
- FCP da UF destino (quando aplicável)

## Steps

1. **Verificar aplicabilidade do DIFAL**
   - Operação interestadual: SIM
   - Destinatário consumidor final: SIM
   - Destinatário não contribuinte do ICMS: SIM (EC 87/2015)
   - Destinatário contribuinte: DIFAL por antecipação (regra diferente)

2. **Determinar alíquotas**
   - Alíquota interestadual:
     - 4%: produto importado (Resolução SF 13/2012)
     - 7%: Sul/Sudeste → Norte/Nordeste/Centro-Oeste/ES
     - 12%: demais combinações
   - Alíquota interna da UF destino: consultar legislação estadual

3. **Calcular base de cálculo**
   - BC DIFAL = valor da operação (produto + frete + seguro + despesas)
   - Algumas UFs exigem BC dupla (base com ICMS embutido):
     ```
     BC dupla = Valor / (1 - Alíquota interna UF destino)
     ```

4. **Calcular DIFAL**
   - **DIFAL = (BC × Alíquota interna destino) - (BC × Alíquota interestadual)**
   - Fórmula simplificada: DIFAL = BC × (Alíq interna - Alíq interestadual)
   - 100% do DIFAL recolhido à UF de destino (desde 2019)

5. **Calcular FCP (Fundo de Combate à Pobreza)**
   - FCP = BC × alíquota FCP da UF destino (0% a 2%)
   - FCP é adicional ao DIFAL, recolhido integralmente à UF destino
   - FCP informado em campo separado no XML

6. **Preencher campos do XML**
   - vBCUFDest: base de cálculo na UF destino
   - pICMSUFDest: alíquota interna UF destino
   - pICMSInter: alíquota interestadual
   - vICMSUFDest: valor DIFAL para UF destino
   - vICMSUFRemet: 0 (desde 2019)
   - vBCFCPUFDest / pFCPUFDest / vFCPUFDest

## Outputs
- Valor do DIFAL
- Base de cálculo do DIFAL
- Alíquota interestadual utilizada
- Alíquota interna da UF destino
- Valor do FCP
- Campos XML preenchidos (ICMSUFDest)

## Acceptance Criteria
- [ ] Aplicabilidade verificada (interestadual + consumidor final)
- [ ] Alíquota interestadual correta (4%, 7% ou 12%)
- [ ] DIFAL = BC × (Alíq interna - Alíq inter) calculado corretamente
- [ ] 100% do DIFAL destinado à UF destino (regra pós-2019)
- [ ] FCP calculado e informado em campo separado
- [ ] Campos do grupo ICMSUFDest do XML preenchidos
