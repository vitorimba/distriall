# Task: Emitir NFS-e (Nota Fiscal de Serviços Eletrônica)

## Purpose
Emitir NFS-e para prestação de serviços, calculando ISS e transmitindo à prefeitura municipal via API.

## Inputs
- Dados do prestador (CNPJ, IM - Inscrição Municipal, endereço)
- Dados do tomador (CNPJ/CPF, endereço)
- Descrição do serviço prestado
- Código do serviço (Lei Complementar 116/2003)
- Valor do serviço
- Município de prestação
- Certificado digital A1 ou credenciais da prefeitura

## Steps

1. **Validar campos obrigatórios**
   - Verificar CNPJ do prestador e Inscrição Municipal
   - Validar dados do tomador
   - Confirmar código de serviço conforme LC 116/2003

2. **Determinar município competente**
   - Identificar local de prestação vs. local do estabelecimento
   - Aplicar regras de competência tributária (Art. 3, LC 116)
   - Verificar se há convênio ABRASF no município

3. **Calcular ISS**
   - Executar task `calculate-iss.md`
   - Verificar alíquota do município (2% a 5%)
   - Aplicar retenção na fonte quando aplicável
   - Verificar isenção/imunidade

4. **Calcular PIS/COFINS sobre serviço**
   - Executar task `calculate-pis-cofins.md`
   - Aplicar regime cumulativo ou não-cumulativo

5. **Gerar RPS (Recibo Provisório de Serviços)**
   - Montar XML/JSON conforme padrão da prefeitura (ABRASF/GINFES/ISS.NET)
   - Numerar RPS sequencialmente
   - Incluir discriminação detalhada do serviço

6. **Transmitir à prefeitura**
   - Identificar API da prefeitura (ABRASF v2.04, GINFES, ISS.NET, próprio)
   - Autenticar (certificado A1 ou token)
   - Enviar lote de RPS para conversão em NFS-e

7. **Tratar resposta**
   - Sucesso: Salvar número da NFS-e, código verificação, link
   - Erro: Mapear código de erro → sugestão de correção
   - Pendente: Consultar situação do lote

## Outputs
- NFS-e emitida com número e código de verificação
- XML/PDF da NFS-e
- Link de verificação da prefeitura
- Log de transmissão

## Acceptance Criteria
- [ ] RPS gerado conforme padrão da prefeitura do município
- [ ] ISS calculado com alíquota correta do município
- [ ] Retenção de ISS aplicada quando obrigatória
- [ ] NFS-e autorizada com número e código de verificação
- [ ] PIS/COFINS calculados conforme regime tributário
- [ ] Discriminação do serviço clara e completa
