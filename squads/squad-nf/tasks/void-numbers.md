# Task: Inutilizar Numeração de NF-e/NFC-e

## Purpose
Comunicar à SEFAZ faixas de numeração não utilizadas, evitando gaps na sequência numérica e irregularidades fiscais.

## Inputs
- CNPJ do emitente
- Modelo (55=NF-e, 65=NFC-e)
- Série da NF
- Número inicial da faixa
- Número final da faixa
- Ano de referência
- Justificativa
- Certificado digital A1

## Steps

1. **Identificar gaps na numeração**
   - Comparar sequência de NFs emitidas no período
   - Identificar números não utilizados (falhas de sistema, testes, etc.)
   - Confirmar que os números NÃO foram utilizados em NFs autorizadas

2. **Validar faixa de inutilização**
   - Número inicial <= número final
   - Números dentro do ano de referência
   - Faixa não inclui números já autorizados ou inutilizados
   - Ano de inutilização = ano corrente ou anterior

3. **Gerar pedido de inutilização**
   - Montar XML conforme schema NfeInutilizacao
   - Gerar ID: ID + UF + ano + CNPJ + modelo + série + nroInicial + nroFinal
   - Incluir justificativa (mín. 15 caracteres)

4. **Assinar XML**
   - Assinar com certificado A1

5. **Transmitir à SEFAZ**
   - Enviar via web service NfeInutilizacao
   - Aguardar retorno

6. **Tratar resposta**
   - cStat 102: Inutilização homologada — salvar protocolo
   - Rejeição: Mapear erro (ex: número já utilizado)
   - Armazenar XML protocolado

## Outputs
- XML de inutilização protocolado
- Protocolo de inutilização
- Faixa inutilizada (modelo, série, início, fim)
- Log de transmissão

## Acceptance Criteria
- [ ] Faixa de numeração validada (não inclui NFs autorizadas)
- [ ] XML conforme schema NfeInutilizacao
- [ ] ID gerado corretamente com 43 dígitos
- [ ] Inutilização homologada pela SEFAZ (cStat 102)
- [ ] Protocolo armazenado para fins fiscais
- [ ] Justificativa com mínimo 15 caracteres
