# Checklist: Integration Readiness (Go-Live)

> Verificacao completa antes de colocar integracao NF-e em producao.
> Todos os itens devem estar marcados antes do go-live.

---

## 1. Credenciais e Certificados

- [ ] Certificado digital A1 valido (formato .pfx)
- [ ] Certificado com validade minima de 3 meses
- [ ] Senha do certificado armazenada em variavel de ambiente segura
- [ ] API key do provider NF-e configurada (producao)
- [ ] API key de homologacao separada da producao
- [ ] CNPJ do emitente cadastrado no provider
- [ ] Inscricao Estadual validada no provider

## 2. Ambiente de Homologacao

- [ ] Emissao de NF-e teste concluida com sucesso
- [ ] Cancelamento de NF-e teste concluido com sucesso
- [ ] Consulta de NF-e teste concluida com sucesso
- [ ] Carta de Correcao (CC-e) teste concluida com sucesso
- [ ] Inutilizacao de numeracao teste (se aplicavel)
- [ ] Retorno SEFAZ parseado corretamente
- [ ] Tratamento de rejeicao testado (simular erro proposital)

## 3. Webhooks e Eventos

- [ ] URL do webhook configurada no provider
- [ ] Webhook acessivel publicamente (HTTPS)
- [ ] Autenticacao do webhook implementada (signature/token)
- [ ] Evento de autorizacao recebido e processado
- [ ] Evento de cancelamento recebido e processado
- [ ] Retry automatico configurado (falha no webhook)
- [ ] Dead letter queue para webhooks falhos
- [ ] Idempotencia: mesmo evento processado 2x nao duplica

## 4. Tratamento de Erros

- [ ] Timeout do provider tratado (retry com backoff)
- [ ] Rejeicao SEFAZ tratada (log + notificacao)
- [ ] Certificado expirado: bloqueio de emissao + alerta
- [ ] Provider indisponivel: fila de retry ou contingencia
- [ ] Erro de rede: retry transparente (max 3x)
- [ ] Validacao de input retorna erros claros ao usuario
- [ ] Erros nao expoe dados sensiveis (certificado, API key)

## 5. Banco de Dados

- [ ] Migration aplicada em producao
- [ ] Tabelas invoices, invoice_items, invoice_events criadas
- [ ] Indexes otimizados para queries frequentes
- [ ] RLS ativado (multi-tenant isolation)
- [ ] Backup automatico configurado
- [ ] Plano de rollback da migration documentado

## 6. Armazenamento

- [ ] Storage para XMLs autorizados configurado
- [ ] Storage para DANFEs (PDF) configurado
- [ ] Politica de retencao: 5 anos minimo (obrigacao legal)
- [ ] Acesso ao storage via URL segura (signed URLs ou ACL)

## 7. Monitoramento

- [ ] Logs de emissao com nivel INFO
- [ ] Logs de erro com nivel ERROR + stack trace
- [ ] Alerta para taxa de rejeicao > 5%
- [ ] Alerta para certificado expirando em < 30 dias
- [ ] Dashboard com metricas: emitidas/dia, rejeitadas, canceladas
- [ ] Health check endpoint para o modulo NF

## 8. Contingencia

- [ ] Plano de contingencia SEFAZ documentado (EPEC, SVC-AN, SVC-RS)
- [ ] Modo offline: enfileirar e transmitir quando voltar
- [ ] Rollback: como reverter integracao sem perda de dados

## 9. Documentacao

- [ ] Documentacao da API (OpenAPI/Swagger) atualizada
- [ ] Guia de operacao para equipe de suporte
- [ ] Procedimento de renovacao de certificado documentado
- [ ] Contatos de suporte do provider NF-e registrados

## 10. Validacao Final

- [ ] Emissao em producao (1 NF-e real) com valor minimo
- [ ] DANFE gerado e conferido visualmente
- [ ] XML armazenado e acessivel
- [ ] Destinatario recebeu email com XML/DANFE
- [ ] Registro correto no ERP/sistema
- [ ] Contabilidade confirmou recebimento dos dados fiscais

---

## Assinatura Go-Live

| Papel | Nome | Data | Aprovacao |
|-------|------|------|-----------|
| Dev Lead | | | [ ] |
| Contador | | | [ ] |
| Product Owner | | | [ ] |

---

*Checklist mantido pelo squad-nf*
