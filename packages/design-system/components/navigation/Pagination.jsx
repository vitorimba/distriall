import React from 'react';
import { Icon } from '../core/Icon';

function pageList(page, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (page <= 4) return [1, 2, 3, 4, 5, '…', total];
  if (page >= total - 3) return [1, '…', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '…', page - 1, page, page + 1, '…', total];
}

/* Paginação para tabelas longas; renderizar logo abaixo da DataTable (dentro do Card). */
export function Pagination({ page = 1, totalPages, totalItems, pageSize = 25, onChange, label = 'itens' }) {
  const total = totalPages || Math.max(1, Math.ceil((totalItems || 0) / pageSize));
  const go = (p) => onChange && onChange(Math.min(total, Math.max(1, p)));
  const summary = totalItems
    ? `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, totalItems)} de ${totalItems.toLocaleString('pt-BR')} ${label}`
    : `Página ${page} de ${total}`;
  return (
    <div className="da-pagination">
      <span className="num">{summary}</span>
      <div className="da-pagination__pages">
        <button className="da-pagination__page" disabled={page === 1} onClick={() => go(page - 1)} aria-label="Página anterior">
          <Icon name="chevron-left" size={14} />
        </button>
        {pageList(page, total).map((p, i) =>
          p === '…' ? (
            <span key={`e${i}`} className="da-pagination__ellipsis">…</span>
          ) : (
            <button
              key={p}
              className={p === page ? 'da-pagination__page da-pagination__page--active num' : 'da-pagination__page num'}
              onClick={() => go(p)}
            >
              {p}
            </button>
          )
        )}
        <button className="da-pagination__page" disabled={page === total} onClick={() => go(page + 1)} aria-label="Próxima página">
          <Icon name="chevron-right" size={14} />
        </button>
      </div>
    </div>
  );
}
