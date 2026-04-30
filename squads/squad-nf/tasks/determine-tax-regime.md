# Task: Determinar Regime Tributário (Árvore Decisória Borges)

## Purpose
Identificar o regime tributário da empresa e as regras fiscais aplicáveis, utilizando a árvore decisória de Borges para classificação precisa.

## Inputs
- CNPJ da empresa
- Faturamento bruto dos últimos 12 meses
- Atividade econômica (CNAE principal e secundários)
- Forma jurídica (MEI, ME, EPP, demais)
- Opção pelo Simples Nacional (se houver)

## Steps

1. **Verificar enquadramento como MEI**
   - Faturamento anual <= R$ 81.000
   - Máximo 1 empregado
   - Atividades permitidas (lista CGSN)
   - Se MEI: regime simplificado com DAS fixo mensal

2. **Verificar elegibilidade ao Simples Nacional**
   - Faturamento anual <= R$ 4.800.000
   - Atividade permitida (não vedada pela LC 123/2006)
   - Sem débitos com fiscos federal/estadual/municipal
   - Sem sócios estrangeiros ou PJ no quadro societário
   - Se elegível e optante: determinar anexo (I a V)

3. **Classificar anexo do Simples Nacional**
   - **Anexo I**: Comércio
   - **Anexo II**: Indústria
   - **Anexo III**: Serviços (fator R >= 28%)
   - **Anexo IV**: Serviços com INSS patronal
   - **Anexo V**: Serviços (fator R < 28%)
   - Calcular fator R = folha 12 meses / receita bruta 12 meses

4. **Determinar Lucro Presumido**
   - Faturamento anual <= R$ 78.000.000
   - Não obrigado ao Lucro Real
   - Aplicar percentuais de presunção:
     - 8% comércio/indústria (IRPJ)
     - 32% serviços (IRPJ)
     - 12% comércio/indústria (CSLL)
     - 32% serviços (CSLL)

5. **Determinar Lucro Real**
   - Obrigatório para:
     - Faturamento > R$ 78.000.000
     - Instituições financeiras
     - Empresas com benefícios fiscais
     - Lucros do exterior
   - Apuração trimestral ou anual (com antecipações mensais)

6. **Mapear obrigações por regime**
   - Simples: DAS, DEFIS, PGDAS-D
   - Presumido: PIS/COFINS cumulativo, IRPJ/CSLL trimestral, SPED
   - Real: PIS/COFINS não-cumulativo, LALUR, SPED completo, ECF

## Outputs
- Regime tributário identificado (MEI/Simples/Presumido/Real)
- Anexo do Simples (quando aplicável)
- Fator R calculado (quando aplicável)
- Alíquotas efetivas aplicáveis
- Obrigações acessórias do regime
- Regras de PIS/COFINS (cumulativo/não-cumulativo)

## Acceptance Criteria
- [ ] Árvore decisória Borges seguida na ordem correta
- [ ] Limites de faturamento verificados com valores atualizados
- [ ] Fator R calculado para classificação Anexo III vs V
- [ ] Atividades vedadas ao Simples verificadas
- [ ] Obrigatoriedade de Lucro Real verificada
- [ ] Obrigações acessórias listadas para o regime identificado
