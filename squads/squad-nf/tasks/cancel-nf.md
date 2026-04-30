# Task: Cancelar Nota Fiscal

## Purpose
Cancelar NF-e/NFC-e já autorizada dentro do prazo legal, gerando evento de cancelamento 110111 junto à SEFAZ.

## Inputs
- Chave de acesso da NF (44 dígitos)
- Justificativa do cancelamento (mín. 15 caracteres)
- Certificado digital A1
- Ambiente (produção/homologação)

## Steps

1. **Verificar elegibilidade para cancelamento**
   - Confirmar que a NF está autorizada (cStat 100)
   - Verificar prazo de cancelamento:
     - NF-e: até 24 horas da autorização (varia por UF)
     - NFC-e: até 30 minutos (varia por UF)
   - Confirmar que não existe CC-e registrada (bloqueia cancelamento em alguns estados)
   - Verificar que não há manifestação do destinatário

2. **Validar justificativa**
   - Mínimo 15 caracteres
   - Máximo 255 caracteres
   - Sem caracteres especiais inválidos

3. **Gerar evento de cancelamento**
   - Tipo evento: 110111
   - Sequência evento: 1
   - Montar XML do evento conforme schema
   - Incluir protocolo de autorização original (nProt)
   - Incluir justificativa

4. **Assinar evento**
   - Assinar XML do evento com certificado A1
   - Validar assinatura

5. **Transmitir evento à SEFAZ**
   - Enviar via web service RecepcaoEvento
   - Aguardar retorno

6. **Tratar resposta**
   - cStat 135: Cancelamento homologado — salvar protocolo
   - cStat 501: Rejeição — prazo expirado
   - cStat 218: NF já cancelada anteriormente
   - Outros: Mapear erro e sugerir ação corretiva

7. **Atualizar registros**
   - Marcar NF como cancelada no sistema
   - Armazenar XML do evento de cancelamento
   - Vincular protocolo de cancelamento à NF original

## Outputs
- XML do evento de cancelamento protocolado
- Protocolo de cancelamento (nProt)
- Status atualizado da NF
- Log de transmissão com cStat e xMotivo

## Acceptance Criteria
- [ ] Prazo de cancelamento verificado antes do envio
- [ ] Evento 110111 gerado conforme schema
- [ ] Justificativa com mínimo 15 caracteres incluída
- [ ] Cancelamento homologado pela SEFAZ (cStat 135)
- [ ] XML do evento armazenado junto à NF original
- [ ] Status da NF atualizado para "Cancelada"
