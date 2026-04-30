# Task: Validar Obrigações Fiscais Pendentes

## Purpose
Verificar o cumprimento das obrigações fiscais acessórias, identificando pendências e prazos próximos para evitar multas e penalidades.

## Inputs
- CNPJ da empresa
- Regime tributário
- UF do estabelecimento
- Município (para obrigações municipais)
- Período de verificação

## Steps

1. **Listar obrigações federais**
   - SPED Fiscal (EFD-ICMS/IPI): mensal, até dia 20
   - EFD-Contribuições: mensal, até 10º dia útil do 2º mês
   - ECF (Escrituração Contábil Fiscal): anual, até último dia útil de julho
   - DCTF: mensal, até 15º dia útil do 2º mês
   - DIRF: anual (sendo substituída pela EFD-Reinf)
   - Simples Nacional: PGDAS-D mensal, DEFIS anual

2. **Listar obrigações estaduais**
   - GIA (Guia de Informação e Apuração): mensal (SP, outros)
   - DAPI (MG), DeSTDA (Simples Nacional)
   - SPED Fiscal: obrigatório conforme UF e regime
   - ICMS-ST: GIA-ST para operações interestaduais com ST
   - Verificar obrigações específicas da UF

3. **Listar obrigações municipais**
   - DES (Declaração Eletrônica de Serviços): mensal
   - ISS retido: guia de recolhimento mensal
   - Nota Carioca, NFS-e paulistana: declarações específicas
   - Verificar obrigações do município específico

4. **Verificar status de cada obrigação**
   - Entregue no prazo: OK
   - Entregue com atraso: verificar multa aplicável
   - Pendente: urgência conforme prazo
   - Retificação necessária: divergências identificadas

5. **Calcular multas por atraso**
   - SPED Fiscal: R$ 500 a R$ 1.500/mês (conforme regime)
   - EFD-Contribuições: R$ 500 a R$ 1.500/mês
   - DCTF: 2% ao mês sobre tributos (mín. R$ 500)
   - ECF: 0,25% do lucro líquido (mín. R$ 500)
   - Simples: PGDAS-D 2% ao mês (mín. R$ 50/R$ 200)

6. **Gerar calendário de próximos vencimentos**
   - Listar obrigações dos próximos 30, 60 e 90 dias
   - Classificar por prioridade e multa potencial
   - Incluir lembretes e responsáveis

## Outputs
- Lista de obrigações por esfera (federal, estadual, municipal)
- Status de cada obrigação (OK, pendente, atrasada)
- Multas potenciais para obrigações atrasadas
- Calendário de próximos vencimentos
- Recomendações de regularização

## Acceptance Criteria
- [ ] Obrigações federais, estaduais e municipais listadas
- [ ] Status verificado para cada obrigação
- [ ] Multas calculadas para obrigações em atraso
- [ ] Calendário de vencimentos gerado
- [ ] Obrigações do Simples Nacional diferenciadas
- [ ] Recomendações de regularização claras
