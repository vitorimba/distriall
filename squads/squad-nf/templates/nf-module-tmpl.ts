/**
 * NF-e Service Layer Template
 * Squad: squad-nf
 *
 * Replace {{PLACEHOLDERS}} with actual implementation.
 * This template covers the core operations: emit, cancel, consult, correct.
 */

// =============================================================================
// Types
// =============================================================================

export interface NfConfig {
  provider: '{{NF_PROVIDER}}'; // focus_nfe | nfe_io | enotas | webmania
  environment: 'production' | 'homologation';
  apiKey: string;
  certificatePath: string;
  certificatePassword: string;
  webhookUrl: string;
}

export interface NfEmitInput {
  organizationId: string;
  orderId?: string;
  emitter: NfParticipant;
  recipient: NfParticipant;
  items: NfItem[];
  shipping?: NfShipping;
  payment: NfPayment;
  additionalInfo?: string;
}

export interface NfParticipant {
  cnpj?: string;
  cpf?: string;
  name: string;
  tradeName?: string;
  stateRegistration?: string;
  address: NfAddress;
  taxRegime: 'simples' | 'presumido' | 'real' | 'mei';
}

export interface NfItem {
  productCode: string;
  description: string;
  ncm: string;
  cfop: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  taxes?: NfItemTaxes;
}

export interface NfItemTaxes {
  icmsCst: string;
  icmsRate: number;
  icmsAmount: number;
  ipiCst?: string;
  ipiRate?: number;
  ipiAmount?: number;
  pisCst: string;
  pisRate: number;
  pisAmount: number;
  cofinsCst: string;
  cofinsRate: number;
  cofinsAmount: number;
}

export interface NfAddress {
  street: string;
  number: string;
  complement?: string;
  district: string;
  cityCode: string;
  cityName: string;
  state: string;
  zipCode: string;
}

export interface NfShipping {
  mode: 0 | 1 | 2 | 9; // 0=Emitter, 1=Recipient, 2=Third, 9=None
  carrier?: NfParticipant;
  volumes?: number;
  grossWeight?: number;
  netWeight?: number;
}

export interface NfPayment {
  method: string; // 01=Cash, 03=Credit, 04=Debit, 15=Boleto, 99=Other
  amount: number;
}

export interface NfResult {
  invoiceId: string;
  accessKey: string;
  protocol: string;
  status: 'authorized' | 'rejected' | 'processing';
  xmlUrl?: string;
  danfeUrl?: string;
  rejectionCode?: string;
  rejectionMessage?: string;
}

export interface NfCancelInput {
  invoiceId: string;
  accessKey: string;
  justification: string; // min 15 chars
}

export interface NfCorrectInput {
  invoiceId: string;
  accessKey: string;
  correction: string; // min 15 chars
  sequenceNumber: number; // 1-20
}

// =============================================================================
// Service
// =============================================================================

export class NfService {
  private config: NfConfig;
  private db: any; // {{DATABASE_CLIENT}}
  private provider: any; // {{PROVIDER_CLIENT}}

  constructor(config: NfConfig, db: any) {
    this.config = config;
    this.db = db;
    this.provider = this.initProvider(config);
  }

  // ---------------------------------------------------------------------------
  // Emit NF-e
  // ---------------------------------------------------------------------------
  async emit(input: NfEmitInput): Promise<NfResult> {
    // 1. Validate input
    this.validateEmitInput(input);

    // 2. Classify fiscal operation
    const classified = await this.classifyOperation(input);

    // 3. Calculate taxes
    const withTaxes = await this.calculateTaxes(classified);

    // 4. Create invoice record (status: draft)
    const invoice = await this.createInvoiceRecord(withTaxes);

    try {
      // 5. Build XML
      const xml = this.buildXml(withTaxes);

      // 6. Send to provider
      const providerResponse = await this.provider.emit(xml);

      // 7. Update invoice record
      await this.updateInvoiceStatus(invoice.id, {
        status: providerResponse.authorized ? 'authorized' : 'rejected',
        accessKey: providerResponse.accessKey,
        protocol: providerResponse.protocol,
        xmlUrl: providerResponse.xmlUrl,
      });

      // 8. Store event
      await this.createEvent(invoice.id, 'authorized', providerResponse);

      // 9. Generate DANFE
      const danfeUrl = await this.generateDanfe(providerResponse.xmlUrl);

      return {
        invoiceId: invoice.id,
        accessKey: providerResponse.accessKey,
        protocol: providerResponse.protocol,
        status: 'authorized',
        xmlUrl: providerResponse.xmlUrl,
        danfeUrl,
      };
    } catch (error) {
      await this.updateInvoiceStatus(invoice.id, { status: 'rejected' });
      await this.createEvent(invoice.id, 'rejected', { error });
      throw new NfEmissionError(`Falha na emissao: ${error}`, invoice.id);
    }
  }

  // ---------------------------------------------------------------------------
  // Cancel NF-e
  // ---------------------------------------------------------------------------
  async cancel(input: NfCancelInput): Promise<NfResult> {
    // 1. Validate: must be authorized, within 24h
    const invoice = await this.getInvoice(input.invoiceId);
    this.validateCancelEligibility(invoice);

    if (input.justification.length < 15) {
      throw new NfValidationError('Justificativa deve ter no minimo 15 caracteres');
    }

    try {
      // 2. Send cancellation to provider
      const response = await this.provider.cancel({
        accessKey: input.accessKey,
        justification: input.justification,
      });

      // 3. Update invoice status
      await this.updateInvoiceStatus(input.invoiceId, {
        status: 'cancelled',
        protocol: response.protocol,
      });

      // 4. Store event
      await this.createEvent(input.invoiceId, 'cancelled', response);

      return {
        invoiceId: input.invoiceId,
        accessKey: input.accessKey,
        protocol: response.protocol,
        status: 'authorized',
      };
    } catch (error) {
      throw new NfCancelError(`Falha no cancelamento: ${error}`, input.invoiceId);
    }
  }

  // ---------------------------------------------------------------------------
  // Consult NF-e
  // ---------------------------------------------------------------------------
  async consult(accessKey: string): Promise<NfResult> {
    try {
      const response = await this.provider.consult(accessKey);

      return {
        invoiceId: response.invoiceId,
        accessKey,
        protocol: response.protocol,
        status: response.status,
        xmlUrl: response.xmlUrl,
        danfeUrl: response.danfeUrl,
      };
    } catch (error) {
      throw new NfConsultError(`Falha na consulta: ${error}`, accessKey);
    }
  }

  // ---------------------------------------------------------------------------
  // Correction Letter (CC-e)
  // ---------------------------------------------------------------------------
  async correct(input: NfCorrectInput): Promise<NfResult> {
    const invoice = await this.getInvoice(input.invoiceId);
    this.validateCorrectionEligibility(invoice);

    if (input.correction.length < 15) {
      throw new NfValidationError('Correcao deve ter no minimo 15 caracteres');
    }

    try {
      const response = await this.provider.correct({
        accessKey: input.accessKey,
        correction: input.correction,
        sequenceNumber: input.sequenceNumber,
      });

      await this.createEvent(input.invoiceId, 'corrected', response);

      return {
        invoiceId: input.invoiceId,
        accessKey: input.accessKey,
        protocol: response.protocol,
        status: 'authorized',
      };
    } catch (error) {
      throw new NfCorrectionError(`Falha na correcao: ${error}`, input.invoiceId);
    }
  }

  // ---------------------------------------------------------------------------
  // Private Methods
  // ---------------------------------------------------------------------------

  private initProvider(config: NfConfig): any {
    // {{PROVIDER_INITIALIZATION}}
    throw new Error('Not implemented: replace with provider SDK init');
  }

  private validateEmitInput(input: NfEmitInput): void {
    // {{VALIDATION_LOGIC}}
    if (!input.emitter.cnpj) throw new NfValidationError('CNPJ do emitente obrigatorio');
    if (!input.items.length) throw new NfValidationError('NF deve ter pelo menos 1 item');
  }

  private async classifyOperation(input: NfEmitInput): Promise<NfEmitInput> {
    // Determine CFOP, CST based on operation type, origin/destination states
    // {{CLASSIFICATION_LOGIC}}
    return input;
  }

  private async calculateTaxes(input: NfEmitInput): Promise<NfEmitInput> {
    // Calculate ICMS, IPI, PIS, COFINS based on regime, CST, NCM
    // {{TAX_CALCULATION_LOGIC}}
    return input;
  }

  private buildXml(input: NfEmitInput): string {
    // Build XML from nf-xml-tmpl.xml template
    // {{XML_BUILD_LOGIC}}
    return '<NFe>...</NFe>';
  }

  private async createInvoiceRecord(input: NfEmitInput): Promise<{ id: string }> {
    // INSERT into invoices table
    // {{DB_INSERT}}
    return { id: 'uuid' };
  }

  private async getInvoice(id: string): Promise<any> {
    // SELECT from invoices
    // {{DB_SELECT}}
    return {};
  }

  private async updateInvoiceStatus(id: string, data: any): Promise<void> {
    // UPDATE invoices SET status = ...
    // {{DB_UPDATE}}
  }

  private async createEvent(invoiceId: string, type: string, payload: any): Promise<void> {
    // INSERT into invoice_events
    // {{DB_INSERT_EVENT}}
  }

  private async generateDanfe(xmlUrl: string): Promise<string> {
    // Generate DANFE PDF from authorized XML
    // {{DANFE_GENERATION}}
    return 'https://storage/danfe.pdf';
  }

  private validateCancelEligibility(invoice: any): void {
    if (invoice.status !== 'authorized') {
      throw new NfValidationError('Somente NF-e autorizadas podem ser canceladas');
    }
    const hoursElapsed = (Date.now() - new Date(invoice.authorizedAt).getTime()) / 3600000;
    if (hoursElapsed > 24) {
      throw new NfValidationError('Prazo de cancelamento excedido (24h)');
    }
  }

  private validateCorrectionEligibility(invoice: any): void {
    if (invoice.status !== 'authorized') {
      throw new NfValidationError('Somente NF-e autorizadas podem receber CC-e');
    }
  }
}

// =============================================================================
// Custom Errors
// =============================================================================

export class NfValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NfValidationError';
  }
}

export class NfEmissionError extends Error {
  invoiceId: string;
  constructor(message: string, invoiceId: string) {
    super(message);
    this.name = 'NfEmissionError';
    this.invoiceId = invoiceId;
  }
}

export class NfCancelError extends Error {
  invoiceId: string;
  constructor(message: string, invoiceId: string) {
    super(message);
    this.name = 'NfCancelError';
    this.invoiceId = invoiceId;
  }
}

export class NfConsultError extends Error {
  accessKey: string;
  constructor(message: string, accessKey: string) {
    super(message);
    this.name = 'NfConsultError';
    this.accessKey = accessKey;
  }
}

export class NfCorrectionError extends Error {
  invoiceId: string;
  constructor(message: string, invoiceId: string) {
    super(message);
    this.name = 'NfCorrectionError';
    this.invoiceId = invoiceId;
  }
}
