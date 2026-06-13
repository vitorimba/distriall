'use client';

import React from 'react';

interface ReceiptItem {
  produto: string;
  qtd: number;
  preco: number;
}

interface ReceiptProps {
  /** Número do pedido (ex.: "#1042") */
  numero: string;
  cliente: string;
  /** Data formatada (ex.: "12/06/2026 08:14") */
  data: string;
  itens: ReceiptItem[];
  subtotal?: number;
  /** Valor absoluto do desconto */
  desconto?: number;
  total: number;
  /** Forma de pagamento (ex.: "Pix") */
  pagamento?: string;
  /** Mensagem final. Padrão: "Obrigado pela preferência!" */
  rodape?: string;
  /** Largura do papel. Padrão: '58mm' */
  largura?: '58mm' | '80mm';
}

function fmt(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/**
 * Recibo térmico P&B (58mm) — preview em tela e base para impressão Bluetooth.
 * Sempre papel branco + tinta preta nos dois temas; hierarquia por peso, nunca cor.
 * Baseado no DS canônico: packages/design-system/components/print/Receipt.jsx
 */
export function Receipt({
  numero,
  cliente,
  data,
  itens = [],
  subtotal,
  desconto = 0,
  total,
  pagamento,
  rodape = 'Obrigado pela preferência!',
  largura = '58mm',
}: ReceiptProps) {
  const cls = largura === '80mm' ? 'da-receipt da-receipt--80mm' : 'da-receipt';

  return (
    <div className={cls}>
      <div className="da-receipt__center">
        <div className="da-receipt__brand">DISTRIALL</div>
        <div className="da-receipt__soft">Distribuidora · CNPJ 00.000.000/0001-00</div>
      </div>
      <hr className="da-receipt__rule" />
      <div className="da-receipt__row">
        <span>Pedido</span>
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
      <hr className="da-receipt__rule" />
      {itens.map((it, i) => (
        <div key={i} className="da-receipt__item">
          <span>{it.produto}</span>
          <div className="da-receipt__row da-receipt__soft">
            <span>
              {it.qtd} × {fmt(it.preco)}
            </span>
            <span style={{ color: 'var(--receipt-ink)' }}>{fmt(it.qtd * it.preco)}</span>
          </div>
        </div>
      ))}
      <hr className="da-receipt__rule" />
      {typeof subtotal === 'number' ? (
        <div className="da-receipt__row">
          <span>Subtotal</span>
          <span>{fmt(subtotal)}</span>
        </div>
      ) : null}
      {desconto ? (
        <div className="da-receipt__row">
          <span>Desconto</span>
          <span>−{fmt(Math.abs(desconto))}</span>
        </div>
      ) : null}
      <div className="da-receipt__row da-receipt__total">
        <span>TOTAL</span>
        <span>{fmt(total)}</span>
      </div>
      {pagamento ? (
        <div className="da-receipt__row">
          <span>Pagamento</span>
          <span>{pagamento}</span>
        </div>
      ) : null}
      <hr className="da-receipt__rule" />
      <div className="da-receipt__center da-receipt__soft">{rodape}</div>
    </div>
  );
}
