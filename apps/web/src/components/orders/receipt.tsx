'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const COMPANY = {
  name: 'Industria e Comercio Temperos Boa Mesa',
  phone: '+5517932254908',
  address: 'Rua Cezar Pupin, Sao Jose do Rio Preto - SP, 15051-010',
  pixKey: '+5517997478319',
  pixInfo: 'Ag 0825 Cc 130037722',
};

interface ReceiptItem {
  produto: string;
  qtd: number;
  preco: number;
}

interface ReceiptProps {
  numero: string;
  cliente: string;
  data: string;
  itens: ReceiptItem[];
  subtotal?: number;
  desconto?: number;
  total: number;
  pagamento?: string;
  rodape?: string;
  largura?: '58mm' | '80mm';
  totalQtd?: number;
}

function fmt(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function Receipt({
  numero,
  cliente,
  data,
  itens = [],
  subtotal,
  desconto = 0,
  total,
  pagamento,
  rodape = 'Agradecemos a preferencia!',
  largura = '58mm',
  totalQtd,
}: ReceiptProps) {
  const cls = largura === '80mm' ? 'da-receipt da-receipt--80mm' : 'da-receipt';
  const itemCount = itens.length;
  const qtyCount = totalQtd ?? itens.reduce((sum, it) => sum + it.qtd, 0);

  return (
    <div className={cls}>
      {/* Company header */}
      <div className="da-receipt__center">
        <div className="da-receipt__brand" style={{ fontSize: '13px', lineHeight: 1.3 }}>{COMPANY.name}</div>
        <div className="da-receipt__soft">{COMPANY.phone}</div>
        <div className="da-receipt__soft" style={{ fontSize: '10px' }}>{COMPANY.address}</div>
      </div>
      <hr className="da-receipt__rule" />

      {/* Order info */}
      <div className="da-receipt__row">
        <span>Recibo</span>
        <span>{numero}</span>
      </div>
      <div className="da-receipt__row">
        <span>Cliente</span>
        <span>{cliente}</span>
      </div>
      <div className="da-receipt__row">
        <span>Data</span>
        <span>{data}</span>
      </div>

      <div className="da-receipt__center da-receipt__soft" style={{ marginTop: 4 }}>
        {itemCount} ite{itemCount !== 1 ? 'ns' : 'm'} (Qtd.: {qtyCount})
      </div>

      <hr className="da-receipt__rule" />

      {/* Items */}
      {itens.map((it, i) => (
        <div key={i} className="da-receipt__item">
          <div className="da-receipt__row">
            <span>{it.qtd} x {it.produto}</span>
            <span>{fmt(it.qtd * it.preco)}</span>
          </div>
          <div className="da-receipt__soft" style={{ paddingLeft: 8 }}>
            1 UN x {fmt(it.preco)}
          </div>
        </div>
      ))}
      <hr className="da-receipt__rule" />

      {/* Totals */}
      {typeof subtotal === 'number' ? (
        <div className="da-receipt__row">
          <span>Subtotal</span>
          <span>{fmt(subtotal)}</span>
        </div>
      ) : null}
      {desconto ? (
        <div className="da-receipt__row">
          <span>Desconto</span>
          <span>-{fmt(Math.abs(desconto))}</span>
        </div>
      ) : null}
      <div className="da-receipt__row da-receipt__total">
        <span>Total</span>
        <span>{fmt(total)}</span>
      </div>
      {pagamento ? (
        <>
          <div className="da-receipt__row">
            <span>Pagamento</span>
            <span></span>
          </div>
          <div className="da-receipt__row">
            <span>{pagamento}</span>
            <span>{fmt(total)}</span>
          </div>
        </>
      ) : null}

      <hr className="da-receipt__rule" />

      {/* Pix QR Code */}
      <div className="da-receipt__center" style={{ padding: '8px 0' }}>
        <div className="da-receipt__soft" style={{ marginBottom: 4, fontWeight: 600 }}>Pix</div>
        <QRCodeSVG
          value={COMPANY.pixKey}
          size={120}
          bgColor="var(--receipt-paper)"
          fgColor="var(--receipt-ink)"
        />
        <div className="da-receipt__soft" style={{ marginTop: 4, fontSize: '10px' }}>
          Chave: {COMPANY.pixKey}
        </div>
        <div className="da-receipt__soft" style={{ fontSize: '10px' }}>
          {COMPANY.pixInfo}
        </div>
      </div>

      <hr className="da-receipt__rule" />

      {/* Footer */}
      <div className="da-receipt__center da-receipt__soft">{rodape}</div>
      <div className="da-receipt__center da-receipt__soft" style={{ fontSize: '10px', marginTop: 2 }}>
        {data}
      </div>
    </div>
  );
}
