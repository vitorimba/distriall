# Task: Simular Impacto de Mudança de Regime Tributário

## Purpose
Simular o impacto financeiro e operacional da mudança de regime tributário (Simples → Presumido, Presumido → Real, etc.), comparando carga tributária e obrigações.

## Inputs
- Regime tributário atual
- Regime tributário simulado (destino)
- Faturamento dos últimos 12 meses (por mês)
- Folha de pagamento dos últimos 12 meses
- Mix de produtos/serviços (% por tipo)
- Custos e despesas dedutíveis (para Lucro Real)

## Steps

1. **Calcular carga tributária no regime atual**
   - **Simples Nacional**:
     - Calcular alíquota efetiva por faixa (Anexo I-V)
     - Fator R = folha 12 meses / receita 12 meses
     - DAS mensal = receita × alíquota efetiva
     - Total anual de tributos no Simples
   - **Lucro Presumido**:
     - IRPJ: receita × presunção × 15% (+ adicional 10%)
     - CSLL: receita × presunção × 9%
     - PIS: receita × 0,65% (cumulativo)
     - COFINS: receita × 3,00% (cumulativo)
     - ICMS, ISS apurados separadamente
   - **Lucro Real**:
     - IRPJ: lucro real × 15% (+ adicional 10%)
     - CSLL: lucro real × 9%
     - PIS: receita × 1,65% - créditos
     - COFINS: receita × 7,60% - créditos
     - ICMS, ISS apurados separadamente

2. **Calcular carga tributária no regime simulado**
   - Aplicar mesmos dados financeiros ao novo regime
   - Considerar créditos disponíveis (PIS/COFINS não-cumulativo)
   - Considerar ICMS próprio vs ICMS no DAS
   - Considerar CPP (Contribuição Patronal Previdenciária)

3. **Comparar cargas tributárias**
   - Diferença absoluta (R$) mensal e anual
   - Diferença percentual sobre faturamento
   - Economia ou aumento de carga
   - Break-even point (faturamento onde regimes se equivalem)

4. **Avaliar impacto em obrigações acessórias**
   - Simples: PGDAS-D, DEFIS (simplificado)
   - Presumido: SPED, DCTF, EFD-Contribuições (intermediário)
   - Real: SPED completo, LALUR, ECF, EFD-Contribuições (complexo)
   - Custo estimado de contabilidade/compliance

5. **Avaliar impacto operacional**
   - Crédito de ICMS para clientes (Simples tem limitação)
   - Competitividade de preço (carga tributária no produto)
   - Necessidade de controle mais rigoroso (Lucro Real)
   - Impacto na precificação

6. **Gerar recomendação**
   - Comparativo lado a lado (tabela)
   - Recomendação fundamentada (economia, complexidade, risco)
   - Cenários: otimista, realista, pessimista
   - Momento ideal para mudança (janeiro do ano seguinte)
   - Prazo para opção: até último dia útil de janeiro

## Outputs
- Comparativo de carga tributária (atual vs simulado)
- Economia/aumento estimado (R$ mensal e anual)
- Impacto em obrigações acessórias
- Impacto operacional e em precificação
- Recomendação fundamentada
- Cenários (otimista, realista, pessimista)

## Acceptance Criteria
- [ ] Carga tributária calculada para ambos os regimes
- [ ] Comparativo com diferença absoluta e percentual
- [ ] Créditos de PIS/COFINS considerados (não-cumulativo)
- [ ] Obrigações acessórias comparadas
- [ ] Recomendação com fundamentação clara
- [ ] Prazo de opção e momento ideal informados
