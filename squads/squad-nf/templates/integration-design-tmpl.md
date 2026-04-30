# NF Module Integration Design — {{SYSTEM_NAME}}

> Version: {{VERSION}}
> Data: {{DATA}}
> Sistema Alvo: {{SYSTEM_TYPE}}
> Provider NF-e: {{NF_PROVIDER}}

---

## 1. Visao Geral

### Objetivo
Integrar emissao, cancelamento e consulta de NF-e no sistema {{SYSTEM_NAME}}
utilizando o provider {{NF_PROVIDER}}.

### Escopo
| Feature | Incluido | Notas |
|---------|----------|-------|
| Emissao NF-e (modelo 55) | {{EMIT_55}} | — |
| Emissao NFC-e (modelo 65) | {{EMIT_65}} | — |
| Cancelamento | {{CANCEL}} | Ate 24h apos autorizacao |
| Carta de Correcao (CC-e) | {{CCE}} | Ate 30 dias |
| Consulta status | {{CONSULT}} | — |
| Inutilizacao | {{INUT}} | — |
| Manifestacao destinatario | {{MANIFEST}} | — |
| Webhooks SEFAZ | {{WEBHOOK}} | — |
| DANFE PDF | {{DANFE}} | — |

---

## 2. Arquitetura

### Diagrama de Componentes

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Frontend   │────▶│   API Layer  │────▶│  NF Service  │
│  ({{FRONTEND}}) │     │  (REST/tRPC) │     │  (Business)  │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
                          ┌───────────────────────┼───────────────┐
                          ▼                       ▼               ▼
                   ┌──────────┐          ┌──────────────┐  ┌──────────┐
                   │ Database │          │ NF Provider  │  │ Storage  │
                   │({{DATABASE}})│          │({{NF_PROVIDER}})│  │ (XML/PDF)│
                   └──────────┘          └──────────────┘  └──────────┘
```

### Stack Tecnologico
| Camada | Tecnologia |
|--------|-----------|
| Frontend | {{FRONTEND}} |
| API | {{API_FRAMEWORK}} |
| Database | {{DATABASE}} |
| Provider NF-e | {{NF_PROVIDER}} |
| Storage | {{STORAGE}} |
| Queue (webhooks) | {{QUEUE}} |

---

## 3. Modelo de Dados

### Tabelas Principais

#### `invoices`
| Campo | Tipo | Descricao |
|-------|------|-----------|
| id | uuid | PK |
| organization_id | uuid | FK tenant |
| number | integer | Numero sequencial |
| series | smallint | Serie |
| access_key | char(44) | Chave de acesso |
| status | enum | draft/processing/authorized/cancelled/rejected |
| provider_ref | text | ID no provider |
| xml_url | text | URL do XML autorizado |
| danfe_url | text | URL do DANFE PDF |
| total_amount | numeric(15,2) | Valor total NF |
| created_at | timestamptz | — |
| authorized_at | timestamptz | — |

#### `invoice_items`
| Campo | Tipo | Descricao |
|-------|------|-----------|
| id | uuid | PK |
| invoice_id | uuid | FK invoices |
| product_code | text | Codigo do produto |
| description | text | Descricao |
| ncm | char(8) | NCM |
| cfop | char(4) | CFOP |
| quantity | numeric(15,4) | Quantidade |
| unit_price | numeric(15,4) | Preco unitario |
| total | numeric(15,2) | Total do item |
| icms_cst | char(3) | CST ICMS |
| icms_rate | numeric(5,2) | Aliquota ICMS |
| icms_amount | numeric(15,2) | Valor ICMS |

#### `invoice_events`
| Campo | Tipo | Descricao |
|-------|------|-----------|
| id | uuid | PK |
| invoice_id | uuid | FK invoices |
| event_type | enum | authorized/cancelled/corrected/rejected |
| protocol | text | Protocolo SEFAZ |
| payload | jsonb | Resposta completa |
| created_at | timestamptz | — |

---

## 4. Endpoints

| Metodo | Path | Descricao |
|--------|------|-----------|
| POST | `/api/nf/emit` | Emitir NF-e |
| POST | `/api/nf/:id/cancel` | Cancelar NF-e |
| POST | `/api/nf/:id/correct` | Carta de correcao |
| GET | `/api/nf/:id` | Consultar NF-e |
| GET | `/api/nf/:id/xml` | Download XML |
| GET | `/api/nf/:id/danfe` | Download DANFE |
| POST | `/api/nf/webhook` | Receber eventos SEFAZ |
| GET | `/api/nf/status` | Status do servico |

---

## 5. Fluxo de Emissao

```
1. Client POST /api/nf/emit {order_id, items, ...}
2. Validate input + business rules
3. Classify fiscal operation (CFOP, CST, NCM)
4. Calculate taxes (ICMS, IPI, PIS, COFINS)
5. Build XML from template
6. Send to provider API
7. Store response (protocol, access_key)
8. Generate DANFE
9. Return {invoice_id, access_key, danfe_url}
```

---

## 6. Tratamento de Erros

| Cenario | Acao |
|---------|------|
| Provider timeout | Retry com backoff (3x) |
| Rejeicao SEFAZ | Consultar rejection-codes.yaml, auto-fix se possivel |
| Certificado expirado | Bloquear emissao, notificar admin |
| Contingencia SEFAZ | Ativar modo contingencia (EPEC/SVC) |
| Duplicidade | Consultar chave antes de re-emitir |

---

## 7. Seguranca

- [ ] Certificado digital A1 armazenado com criptografia
- [ ] API keys do provider em variavel de ambiente
- [ ] RLS por organization_id em todas as tabelas NF
- [ ] Rate limiting nos endpoints de emissao
- [ ] Logs de auditoria para todas as operacoes

---

## 8. Checklist Go-Live

Veja: `checklists/integration-readiness.md`

---

## 9. Observacoes

{{OBSERVACOES}}

---

*Documento gerado pelo squad-nf — wf-erp-integration*
