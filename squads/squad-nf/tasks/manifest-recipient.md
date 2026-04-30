# Task: Manifestação do Destinatário

## Purpose
Registrar ciência, confirmação, desconhecimento ou não-realização de operação sobre NF-e recebidas, cumprindo obrigação fiscal.

## Inputs
- Chave de acesso da NF-e recebida (44 dígitos)
- CNPJ do destinatário
- Tipo de manifestação desejada
- Justificativa (para desconhecimento/não-realização)
- Certificado digital A1

## Steps

1. **Identificar NFs pendentes de manifestação**
   - Consultar DFe (Distribuição de DF-e) para NFs destinadas ao CNPJ
   - Listar NFs com manifestação pendente
   - Priorizar por prazo e relevância

2. **Selecionar tipo de evento**
   - **210200** — Confirmação da Operação: mercadoria recebida conforme
   - **210210** — Ciência da Operação: tomou conhecimento (provisório)
   - **210220** — Desconhecimento da Operação: não reconhece a NF
   - **210240** — Operação Não Realizada: operação não ocorreu

3. **Validar regras de manifestação**
   - Ciência: pode ser registrada a qualquer momento
   - Confirmação: após ciência ou diretamente
   - Desconhecimento: prazo de até 180 dias
   - Não Realizada: requer justificativa (mín. 15 caracteres)

4. **Gerar evento de manifestação**
   - Montar XML do evento conforme schema
   - Incluir tipo evento, chave, sequência
   - Incluir justificativa quando aplicável

5. **Assinar e transmitir**
   - Assinar XML com certificado A1
   - Enviar via web service RecepcaoEvento (AN - Ambiente Nacional)

6. **Tratar resposta**
   - cStat 135: Evento registrado
   - Rejeição: Mapear erro e sugerir correção
   - Atualizar status da NF recebida no sistema

## Outputs
- XML do evento de manifestação protocolado
- Protocolo do evento
- Status atualizado da NF recebida
- XML completo da NF-e (disponível após ciência/confirmação)

## Acceptance Criteria
- [ ] Tipo de evento correto para a situação
- [ ] Evento registrado com sucesso na SEFAZ (AN)
- [ ] Justificativa incluída para desconhecimento/não-realização
- [ ] XML completo da NF disponível para download após ciência
- [ ] Prazos de manifestação respeitados
- [ ] Status da NF atualizado no sistema local
