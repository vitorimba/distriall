'use client';

import Link from 'next/link';
import { Scale, Receipt, Ticket, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';

const SECOES = [
  {
    href: '/financial/settlements',
    icon: Scale,
    titulo: 'Acertos',
    desc: 'Fechamento por período: faturamento, custos, despesas e lucro líquido.',
  },
  {
    href: '/financial/expenses',
    icon: Receipt,
    titulo: 'Despesas',
    desc: 'Lançamento e acompanhamento de despesas operacionais.',
  },
  {
    href: '/financial/vouchers',
    icon: Ticket,
    titulo: 'Vales',
    desc: 'Vales de clientes: pendentes, pagos e vencidos.',
  },
  {
    href: '/financial/receivables',
    icon: Users,
    titulo: 'Contas a Receber',
    desc: 'Clientes com saldo devedor: vales pendentes por cliente.',
  },
];

export default function FinancialPage() {
  return (
    <div className="px-4 py-4 space-y-4">
      <PageHeader title="Financeiro" />
      <div className="da-grid da-grid--cols3">
        {SECOES.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.href} href={s.href}>
              <Card className="hover:bg-muted/50 transition-colors h-full">
                <CardContent className="flex flex-col items-start gap-3 pt-4">
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--accent-soft)',
                      color: 'var(--accent-fg)',
                    }}
                  >
                    <Icon size={20} />
                  </span>
                  <span
                    style={{
                      fontSize: 'var(--text-md)',
                      fontWeight: 'var(--weight-bold)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {s.titulo}
                  </span>
                  <span
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-secondary)',
                      lineHeight: 'var(--leading-normal)',
                    }}
                  >
                    {s.desc}
                  </span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--weight-semibold)',
                      color: 'var(--accent-fg)',
                    }}
                  >
                    Abrir <ArrowRight size={14} />
                  </span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
