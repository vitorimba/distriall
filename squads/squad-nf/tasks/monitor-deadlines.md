# Task: Calendário de Obrigações Fiscais

## Purpose
Manter calendário atualizado de prazos de obrigações fiscais, gerando alertas automáticos para evitar atrasos e multas.

## Inputs
- Regime tributário da empresa
- UF do estabelecimento
- Município (para obrigações municipais)
- Atividades sujeitas a obrigações específicas
- Calendário fiscal federal/estadual/municipal

## Steps

1. **Mapear obrigações federais recorrentes**
   - **Dia 10**: DARF PIS/COFINS (regime cumulativo)
   - **Dia 15**: EFD-Contribuições (2º mês subsequente)
   - **Dia 20**: SPED Fiscal (EFD-ICMS/IPI), PGDAS-D (Simples)
   - **Dia 25**: DARF PIS/COFINS (não-cumulativo), DARF IRPJ/CSLL
   - **Último dia útil**: DCTF mensal
   - **Anual**: ECF (julho), DEFIS (março), DIRF (fevereiro)

2. **Mapear obrigações estaduais**
   - ICMS próprio: prazo varia por UF e CNAE (consultar legislação)
   - ICMS-ST: prazo específico por convênio/protocolo
   - GIA: mensal conforme calendário da UF
   - DeSTDA (Simples Nacional): até dia 28
   - DIFAL: prazo da UF de destino
   - Verificar prazos específicos da UF do cliente

3. **Mapear obrigações municipais**
   - ISS próprio: prazo do município (geralmente dia 10 ou 15)
   - ISS retido: prazo do município do tomador
   - DES: mensal conforme prefeitura
   - Verificar calendário municipal específico

4. **Gerar calendário mensal**
   - Listar todas obrigações do mês corrente
   - Ordenar por data de vencimento
   - Indicar status: pendente, concluída, atrasada
   - Considerar feriados e dias não úteis
   - Antecipar vencimento quando cai em fim de semana

5. **Configurar alertas**
   - 5 dias antes: lembrete informativo
   - 3 dias antes: alerta de preparação
   - 1 dia antes: alerta urgente
   - No dia: último aviso
   - Após vencimento: alerta de atraso + multa estimada
   - Canais: email, push notification, Slack/Teams

6. **Rastrear cumprimento**
   - Marcar obrigação como cumprida (com recibo/comprovante)
   - Registrar data de entrega
   - Identificar padrão de atrasos
   - Relatório mensal de compliance fiscal

## Outputs
- Calendário fiscal mensal/anual personalizado
- Alertas automáticos configurados
- Dashboard de obrigações (pendentes, concluídas, atrasadas)
- Relatório de compliance fiscal
- Histórico de cumprimento

## Acceptance Criteria
- [ ] Obrigações federais, estaduais e municipais mapeadas
- [ ] Calendário considera feriados e dias não úteis
- [ ] Alertas em 4 níveis de antecedência
- [ ] Status de cada obrigação rastreado
- [ ] Prazos corretos para o regime tributário da empresa
- [ ] Relatório de compliance gerado mensalmente
