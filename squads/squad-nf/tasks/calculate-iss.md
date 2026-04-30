# Task: Calcular ISS

## Purpose
Calcular ISS (Imposto Sobre Serviços) conforme município, código de serviço e regras de retenção na fonte.

## Inputs
- Código do serviço (LC 116/2003, lista anexa)
- Valor do serviço prestado
- Município do prestador
- Município do tomador
- Local de prestação do serviço
- Regime tributário do prestador
- CNPJ/CPF do tomador

## Steps

1. **Determinar município competente**
   - Regra geral: ISS devido no local do estabelecimento do prestador
   - Exceções (Art. 3, LC 116/2003): ISS no local da prestação para:
     - Construção civil
     - Limpeza e manutenção
     - Vigilância e segurança
     - Eventos e diversões
     - Transporte intermunicipal (alguns casos)

2. **Identificar alíquota do município**
   - Mínima: 2% (Art. 8-A, LC 116)
   - Máxima: 5% (Art. 8, LC 116)
   - Consultar legislação municipal para alíquota específica do código de serviço
   - Verificar existência de alíquota reduzida (incentivos fiscais)

3. **Calcular ISS**
   - **ISS = Valor do Serviço × Alíquota**
   - Base de cálculo: preço do serviço (sem deduções, salvo exceções legais)
   - Construção civil: BC pode deduzir materiais (conforme município)

4. **Verificar retenção na fonte**
   - Tomador obrigado a reter quando:
     - Prestador de fora do município
     - Prestador sem cadastro no município do tomador
     - Serviços listados no Art. 6 da LC 116
   - Se retenção: tomador desconta ISS e recolhe ao município competente

5. **Tratar Simples Nacional**
   - ISS incluído no DAS
   - Alíquota efetiva conforme faixa de faturamento (Anexo III ou V)
   - Se retido: prestador não recolhe ISS no DAS
   - Alíquota mínima para SN com retenção

6. **Verificar isenção/imunidade**
   - Exportação de serviços: ISS não incide (Art. 2, LC 116)
   - Serviços imunes (CF, Art. 150, VI)
   - Incentivos fiscais municipais

## Outputs
- Valor do ISS calculado
- Alíquota aplicada
- Município competente para recolhimento
- Indicador de retenção (sim/não)
- Base de cálculo utilizada
- Código do serviço LC 116

## Acceptance Criteria
- [ ] Município competente identificado conforme LC 116/2003
- [ ] Alíquota entre 2% e 5% conforme legislação municipal
- [ ] Fórmula ISS = Valor × Alíquota aplicada corretamente
- [ ] Retenção na fonte identificada quando obrigatória
- [ ] Simples Nacional tratado com alíquota efetiva do DAS
- [ ] Exportação de serviços com ISS não incidente
