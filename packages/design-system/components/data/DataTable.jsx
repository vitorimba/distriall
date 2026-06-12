import React from 'react';
import { Icon } from '../core/Icon';

/* Tabela de dados com colunas ordenáveis (col.sortable) e linhas clicáveis. */
export function DataTable({ columns = [], rows = [], onRowClick, rowKey, dense = false, defaultSort = null, className }) {
  const [sort, setSort] = React.useState(defaultSort); // { key, dir: 'asc' | 'desc' }

  const sorted = React.useMemo(() => {
    if (!sort) return rows;
    const col = columns.find((c) => c.key === sort.key);
    const val = (row) => (col && col.sortValue ? col.sortValue(row) : row[sort.key]);
    const copy = [...rows];
    copy.sort((a, b) => {
      const va = val(a);
      const vb = val(b);
      let cmp;
      if (typeof va === 'number' && typeof vb === 'number') cmp = va - vb;
      else cmp = String(va ?? '').localeCompare(String(vb ?? ''), 'pt-BR', { numeric: true });
      return sort.dir === 'asc' ? cmp : -cmp;
    });
    return copy;
  }, [rows, sort, columns]);

  const toggleSort = (col) => {
    if (!col.sortable) return;
    setSort((s) => {
      if (!s || s.key !== col.key) return { key: col.key, dir: 'desc' };
      if (s.dir === 'desc') return { key: col.key, dir: 'asc' };
      return null; // terceiro clique limpa
    });
  };

  const cls = ['da-table-wrap', className || ''].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      <table className={dense ? 'da-table da-table--dense' : 'da-table'}>
        <thead>
          <tr>
            {columns.map((col) => {
              const isSorted = sort && sort.key === col.key;
              const thCls = [
                col.align === 'right' ? 'num da-table__right' : '',
                col.sortable ? 'da-table__th--sortable' : '',
                isSorted ? 'da-table__th--sorted' : '',
              ].filter(Boolean).join(' ') || undefined;
              return (
                <th
                  key={col.key}
                  className={thCls}
                  style={{ width: col.width }}
                  onClick={col.sortable ? () => toggleSort(col) : undefined}
                  aria-sort={isSorted ? (sort.dir === 'asc' ? 'ascending' : 'descending') : undefined}
                >
                  <span className="da-table__th-inner">
                    {col.label}
                    {col.sortable ? (
                      <Icon
                        name={isSorted ? (sort.dir === 'asc' ? 'chevron-up' : 'chevron-down') : 'chevrons-up-down'}
                        size={12}
                        style={{ opacity: isSorted ? 1 : 0.45, flex: 'none' }}
                      />
                    ) : null}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr
              key={rowKey ? row[rowKey] : i}
              className={onRowClick ? 'da-table__row--clickable' : undefined}
              onClick={onRowClick ? () => onRowClick(row, i) : undefined}
            >
              {columns.map((col) => (
                <td key={col.key} className={col.align === 'right' ? 'num da-table__right' : undefined}>
                  {col.render ? col.render(row, i) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
