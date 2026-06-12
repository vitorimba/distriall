import React from 'react';
import { Card } from '../../components/data/Card';
import { DataTable } from '../../components/data/DataTable';
import { Money } from '../../components/data/Money';
import { Button } from '../../components/core/Button';
import { SearchField } from '../../components/forms/SearchField';
import { PageHeader } from '../../components/navigation/PageHeader';
import { EmptyState } from '../../components/data/EmptyState';

const PRODUTOS = [
  { id: 1, nome: 'Água mineral 510ml (cx 12)', categoria: 'Bebidas', unidade: 'Caixa', preco: 12.0 },
  { id: 2, nome: 'Refrigerante cola 2L', categoria: 'Bebidas', unidade: 'Unidade', preco: 9.0 },
  { id: 3, nome: 'Cerveja pilsen lata 350ml (fd 12)', categoria: 'Bebidas', unidade: 'Fardo', preco: 33.0 },
  { id: 4, nome: 'Suco de uva integral 1,5L', categoria: 'Bebidas', unidade: 'Unidade', preco: 13.0 },
  { id: 5, nome: 'Energético 473ml', categoria: 'Bebidas', unidade: 'Unidade', preco: 9.0 },
  { id: 6, nome: 'Carvão vegetal 3kg', categoria: 'Mercearia', unidade: 'Saco', preco: 14.5 },
  { id: 7, nome: 'Gelo em cubos 5kg', categoria: 'Congelados', unidade: 'Saco', preco: 11.0 },
  { id: 8, nome: 'Copo descartável 300ml (cx 100)', categoria: 'Descartáveis', unidade: 'Caixa', preco: 7.8 },
];

export function ProductsScreen({ onOpenProduct, onNewProduct }) {
  const [q, setQ] = React.useState('');
  const rows = PRODUTOS.filter(
    (p) => !q || p.nome.toLowerCase().includes(q.toLowerCase()) || p.categoria.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <PageHeader
        title="Produtos"
        subtitle={`${rows.length} produtos`}
        actions={<Button icon="plus" onClick={onNewProduct}>Novo produto</Button>}
      />
      <div style={{ width: 300 }}>
        <SearchField placeholder="Buscar produto..." value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} />
      </div>
      <Card padded={false}>
        {rows.length === 0 ? (
          <EmptyState icon="package" title="Nenhum produto encontrado" description="Ajuste o termo de busca." />
        ) : (
          <DataTable
            columns={[
              { key: 'nome', label: 'Nome' },
              { key: 'categoria', label: 'Categoria', width: 140 },
              { key: 'unidade', label: 'Unidade', width: 110 },
              { key: 'preco', label: 'Preço', align: 'right', width: 110, render: (r) => <Money value={r.preco} /> },
            ]}
            rows={rows}
            rowKey="id"
            onRowClick={(r) => onOpenProduct && onOpenProduct(r)}
          />
        )}
      </Card>
    </div>
  );
}
