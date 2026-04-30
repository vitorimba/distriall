# Security Checklist — Banking API Integration

Checklist de seguranca especifico para integracoes com APIs bancarias brasileiras.

## Credenciais e Segredos

- [ ] Client secrets armazenados em vault (HashiCorp Vault, AWS Secrets Manager, etc)
- [ ] Certificados (.crt, .key, .pfx) NAO estao no repositorio git
- [ ] `.gitignore` inclui: `*.crt`, `*.key`, `*.pfx`, `*.pem`, `.env`
- [ ] Variaveis de ambiente para credenciais (nao hardcoded)
- [ ] Credenciais de sandbox separadas de producao
- [ ] Rotacao de credenciais programada (a cada 90 dias)

## Comunicacao

- [ ] TLS 1.2+ em todas as conexoes com APIs bancarias
- [ ] Verificacao de certificado SSL habilitada (nao `rejectUnauthorized: false`)
- [ ] mTLS configurado onde exigido (Inter, Sicoob)
- [ ] Certificate pinning implementado (opcional, recomendado)

## Dados Financeiros

- [ ] Dados sensiveis encriptados em repouso (AES-256 ou similar)
- [ ] CPF/CNPJ mascarados em logs (ex: `***.***.789-00`)
- [ ] Dados de transacao com audit trail completo
- [ ] Backup encriptado de dados financeiros
- [ ] Retencao de dados conforme LGPD

## Logs e Monitoramento

- [ ] Logs NAO contem: tokens, senhas, certificados, dados de cartao
- [ ] Logs NAO contem: CPF/CNPJ completo, valores de transacao (opcional)
- [ ] Request ID em todas as chamadas para rastreabilidade
- [ ] Alertas para acessos suspeitos (muitos 401/403)
- [ ] Monitoramento de exfiltracao de dados

## Open Finance / Consentimento

- [ ] Consentimento do usuario obtido antes de acessar dados (FAPI)
- [ ] Consentimento com escopo minimo necessario
- [ ] Revogacao de consentimento implementada
- [ ] Auditoria de consentimentos ativos

## Compliance

- [ ] LGPD: base legal para tratamento de dados financeiros
- [ ] PCI-DSS awareness (se dados de cartao envolvidos)
- [ ] BACEN: regulamentacao Open Finance seguida
- [ ] Politica de privacidade atualizada
