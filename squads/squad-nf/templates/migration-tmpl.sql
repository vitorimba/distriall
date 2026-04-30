-- =============================================================================
-- Migration: NF-e Module Tables
-- Squad: squad-nf
-- Description: Creates invoices, invoice_items, and invoice_events tables
-- Replace {{SCHEMA}} with target schema (e.g., public, nf)
-- =============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- ENUM Types
-- =============================================================================

CREATE TYPE {{SCHEMA}}.invoice_status AS ENUM (
  'draft',
  'processing',
  'authorized',
  'cancelled',
  'rejected',
  'corrected',
  'inutilized'
);

CREATE TYPE {{SCHEMA}}.invoice_event_type AS ENUM (
  'created',
  'submitted',
  'authorized',
  'rejected',
  'cancelled',
  'corrected',
  'inutilized',
  'contingency',
  'webhook_received'
);

CREATE TYPE {{SCHEMA}}.nf_model AS ENUM (
  '55',  -- NF-e
  '65'   -- NFC-e
);

-- =============================================================================
-- Table: invoices
-- =============================================================================

CREATE TABLE {{SCHEMA}}.invoices (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL,  -- FK to your org/tenant table
  order_id        UUID,           -- FK to orders (optional)

  -- NF identification
  model           {{SCHEMA}}.nf_model NOT NULL DEFAULT '55',
  series          SMALLINT NOT NULL DEFAULT 1,
  number          INTEGER,        -- assigned on authorization
  access_key      CHAR(44),       -- chave de acesso (44 digits)
  status          {{SCHEMA}}.invoice_status NOT NULL DEFAULT 'draft',

  -- Participants
  emitter_cnpj    CHAR(14) NOT NULL,
  emitter_name    TEXT NOT NULL,
  emitter_state   CHAR(2) NOT NULL,
  emitter_crt     SMALLINT NOT NULL, -- 1=Simples, 2=Excesso, 3=Normal
  recipient_doc   VARCHAR(14) NOT NULL, -- CNPJ or CPF
  recipient_name  TEXT NOT NULL,
  recipient_state CHAR(2),

  -- Fiscal classification
  nature_of_operation TEXT NOT NULL, -- natOp
  destination     SMALLINT NOT NULL DEFAULT 1, -- 1=Interna, 2=Interestadual, 3=Exterior
  final_consumer  BOOLEAN NOT NULL DEFAULT false,

  -- Totals
  total_products  NUMERIC(15,2) NOT NULL DEFAULT 0,
  total_icms      NUMERIC(15,2) NOT NULL DEFAULT 0,
  total_icms_st   NUMERIC(15,2) NOT NULL DEFAULT 0,
  total_ipi       NUMERIC(15,2) NOT NULL DEFAULT 0,
  total_pis       NUMERIC(15,2) NOT NULL DEFAULT 0,
  total_cofins    NUMERIC(15,2) NOT NULL DEFAULT 0,
  total_shipping  NUMERIC(15,2) NOT NULL DEFAULT 0,
  total_discount  NUMERIC(15,2) NOT NULL DEFAULT 0,
  total_other     NUMERIC(15,2) NOT NULL DEFAULT 0,
  total_amount    NUMERIC(15,2) NOT NULL DEFAULT 0,

  -- Provider
  provider_name   TEXT,            -- focus_nfe, nfe_io, etc.
  provider_ref    TEXT,            -- provider internal ID
  environment     SMALLINT NOT NULL DEFAULT 2, -- 1=Production, 2=Homologation

  -- Protocol
  protocol_number TEXT,
  protocol_date   TIMESTAMPTZ,

  -- Files
  xml_url         TEXT,
  danfe_url       TEXT,

  -- Payment
  payment_method  VARCHAR(2) DEFAULT '99',
  payment_amount  NUMERIC(15,2),

  -- Additional info
  additional_info TEXT,
  fiscal_info     TEXT,

  -- Timestamps
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  authorized_at   TIMESTAMPTZ,
  cancelled_at    TIMESTAMPTZ,

  -- Constraints
  CONSTRAINT invoices_access_key_unique UNIQUE (access_key),
  CONSTRAINT invoices_number_series_unique UNIQUE (organization_id, model, series, number)
);

-- Indexes
CREATE INDEX idx_invoices_org ON {{SCHEMA}}.invoices (organization_id);
CREATE INDEX idx_invoices_status ON {{SCHEMA}}.invoices (status);
CREATE INDEX idx_invoices_access_key ON {{SCHEMA}}.invoices (access_key);
CREATE INDEX idx_invoices_emitter_cnpj ON {{SCHEMA}}.invoices (emitter_cnpj);
CREATE INDEX idx_invoices_recipient_doc ON {{SCHEMA}}.invoices (recipient_doc);
CREATE INDEX idx_invoices_created_at ON {{SCHEMA}}.invoices (created_at DESC);

-- =============================================================================
-- Table: invoice_items
-- =============================================================================

CREATE TABLE {{SCHEMA}}.invoice_items (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id      UUID NOT NULL REFERENCES {{SCHEMA}}.invoices(id) ON DELETE CASCADE,
  item_number     SMALLINT NOT NULL, -- nItem (sequential)

  -- Product
  product_code    TEXT NOT NULL,
  ean             VARCHAR(14),
  description     TEXT NOT NULL,
  ncm             CHAR(8) NOT NULL,
  cest            CHAR(7),         -- CEST (if applicable)
  cfop            CHAR(4) NOT NULL,
  unit            VARCHAR(6) NOT NULL,
  quantity        NUMERIC(15,4) NOT NULL,
  unit_price      NUMERIC(15,4) NOT NULL,
  total_price     NUMERIC(15,2) NOT NULL,
  discount        NUMERIC(15,2) DEFAULT 0,

  -- ICMS
  icms_origin     SMALLINT NOT NULL DEFAULT 0, -- 0=Nacional
  icms_cst        VARCHAR(3) NOT NULL,  -- CST or CSOSN
  icms_base       NUMERIC(15,2) DEFAULT 0,
  icms_rate       NUMERIC(5,2) DEFAULT 0,
  icms_amount     NUMERIC(15,2) DEFAULT 0,

  -- ICMS-ST
  icms_st_base    NUMERIC(15,2) DEFAULT 0,
  icms_st_rate    NUMERIC(5,2) DEFAULT 0,
  icms_st_amount  NUMERIC(15,2) DEFAULT 0,
  icms_st_mva     NUMERIC(5,2) DEFAULT 0,

  -- IPI
  ipi_cst         VARCHAR(2),
  ipi_base        NUMERIC(15,2) DEFAULT 0,
  ipi_rate        NUMERIC(5,2) DEFAULT 0,
  ipi_amount      NUMERIC(15,2) DEFAULT 0,

  -- PIS
  pis_cst         VARCHAR(2) NOT NULL,
  pis_base        NUMERIC(15,2) DEFAULT 0,
  pis_rate        NUMERIC(5,4) DEFAULT 0,
  pis_amount      NUMERIC(15,2) DEFAULT 0,

  -- COFINS
  cofins_cst      VARCHAR(2) NOT NULL,
  cofins_base     NUMERIC(15,2) DEFAULT 0,
  cofins_rate     NUMERIC(5,4) DEFAULT 0,
  cofins_amount   NUMERIC(15,2) DEFAULT 0,

  -- Timestamps
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT invoice_items_number_unique UNIQUE (invoice_id, item_number)
);

CREATE INDEX idx_invoice_items_invoice ON {{SCHEMA}}.invoice_items (invoice_id);
CREATE INDEX idx_invoice_items_ncm ON {{SCHEMA}}.invoice_items (ncm);
CREATE INDEX idx_invoice_items_cfop ON {{SCHEMA}}.invoice_items (cfop);

-- =============================================================================
-- Table: invoice_events
-- =============================================================================

CREATE TABLE {{SCHEMA}}.invoice_events (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id      UUID NOT NULL REFERENCES {{SCHEMA}}.invoices(id) ON DELETE CASCADE,

  event_type      {{SCHEMA}}.invoice_event_type NOT NULL,
  protocol        TEXT,
  rejection_code  VARCHAR(10),
  rejection_msg   TEXT,

  -- Full response payload
  payload         JSONB,

  -- Source
  source          TEXT DEFAULT 'system', -- system, webhook, manual
  user_id         UUID,

  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_invoice_events_invoice ON {{SCHEMA}}.invoice_events (invoice_id);
CREATE INDEX idx_invoice_events_type ON {{SCHEMA}}.invoice_events (event_type);
CREATE INDEX idx_invoice_events_created ON {{SCHEMA}}.invoice_events (created_at DESC);

-- =============================================================================
-- RLS Policies (Supabase / multi-tenant)
-- =============================================================================

ALTER TABLE {{SCHEMA}}.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE {{SCHEMA}}.invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE {{SCHEMA}}.invoice_events ENABLE ROW LEVEL SECURITY;

-- Invoices: users can only see their organization's invoices
CREATE POLICY "invoices_org_isolation" ON {{SCHEMA}}.invoices
  FOR ALL USING (organization_id = auth.uid());

-- Items: inherit from parent invoice
CREATE POLICY "invoice_items_org_isolation" ON {{SCHEMA}}.invoice_items
  FOR ALL USING (
    invoice_id IN (
      SELECT id FROM {{SCHEMA}}.invoices WHERE organization_id = auth.uid()
    )
  );

-- Events: inherit from parent invoice
CREATE POLICY "invoice_events_org_isolation" ON {{SCHEMA}}.invoice_events
  FOR ALL USING (
    invoice_id IN (
      SELECT id FROM {{SCHEMA}}.invoices WHERE organization_id = auth.uid()
    )
  );

-- =============================================================================
-- Updated_at trigger
-- =============================================================================

CREATE OR REPLACE FUNCTION {{SCHEMA}}.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER invoices_updated_at
  BEFORE UPDATE ON {{SCHEMA}}.invoices
  FOR EACH ROW EXECUTE FUNCTION {{SCHEMA}}.update_updated_at();
