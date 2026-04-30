# Task: Gerar Migrations SQL para Tabelas de NF

## Purpose
Gerar migrations SQL para criar as tabelas necessárias ao módulo de notas fiscais no banco de dados do sistema-alvo.

## Inputs
- Design do módulo NF (task `design-nf-module.md`)
- ORM/migration tool do sistema-alvo (Prisma, Knex, TypeORM, etc.)
- Banco de dados (PostgreSQL, MySQL, etc.)
- Padrão de IDs e timestamps do projeto

## Steps

1. **Gerar tabela `invoices`**
   - id, tenant_id (se multi-tenant)
   - type: enum (NFE, NFSE, NFCE)
   - status: enum (DRAFT, PROCESSING, AUTHORIZED, REJECTED, CANCELLED)
   - number, series, access_key (chave 44 dígitos)
   - nature_operation, cfop
   - issuer_id (FK), recipient_id (FK)
   - total_value, total_tax, discount
   - tax_regime, environment (PRODUCTION, HOMOLOGATION)
   - authorization_date, protocol_number
   - provider_id (referência no provider externo)
   - created_at, updated_at, deleted_at

2. **Gerar tabela `invoice_items`**
   - id, invoice_id (FK)
   - product_id (FK para tabela de produtos existente)
   - description, ncm, cfop, cst_icms, cst_pis, cst_cofins
   - quantity, unit_price, total_price
   - icms_base, icms_rate, icms_value
   - pis_base, pis_rate, pis_value
   - cofins_base, cofins_rate, cofins_value
   - ipi_value, icms_st_value
   - created_at, updated_at

3. **Gerar tabela `invoice_events`**
   - id, invoice_id (FK)
   - event_type: enum (CANCELLATION, CORRECTION, MANIFEST)
   - event_code (110111, 110110, 210200, etc.)
   - sequence_number
   - justification
   - protocol_number
   - xml_content (ou referência)
   - created_at

4. **Gerar tabela `invoice_xmls`**
   - id, invoice_id (FK)
   - xml_type: enum (AUTHORIZED, CANCELLED, CORRECTION, DANFE)
   - content (text/blob ou path S3)
   - created_at

5. **Gerar tabela `fiscal_config`**
   - id, tenant_id
   - tax_regime, state (UF), municipality_code
   - certificate_data (encrypted), certificate_expiry
   - provider_type, provider_api_key (encrypted)
   - environment, csc_token, csc_id
   - created_at, updated_at

6. **Gerar índices e constraints**
   - Unique: access_key, (number + series + issuer)
   - Index: status, type, created_at, recipient_id
   - FK constraints com ON DELETE appropriate
   - RLS policies (se Supabase/PostgreSQL com multi-tenant)

## Outputs
- Arquivo(s) de migration conforme ORM do projeto
- SQL raw como fallback
- Índices e constraints definidos
- Seed data para enums e configurações iniciais

## Acceptance Criteria
- [ ] Tabelas cobrem invoices, items, events, xmls, config
- [ ] Padrão de IDs e timestamps conforme projeto-alvo
- [ ] Enums definidos para type, status, event_type
- [ ] Índices criados para queries frequentes
- [ ] FK constraints definidas corretamente
- [ ] Migration compatível com ORM do projeto
