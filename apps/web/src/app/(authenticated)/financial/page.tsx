'use client';

import Link from 'next/link';
import { FileText, DollarSign, BarChart2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';

const financialLinks = [
  {
    href: '/financial/settlements',
    label: 'Acerto Semanal',
    description: 'Calcular e fechar acertos por periodo',
    icon: BarChart2,
  },
  {
    href: '/financial/expenses',
    label: 'Gastos',
    description: 'Registrar e gerenciar gastos operacionais',
    icon: DollarSign,
  },
  {
    href: '/financial/vouchers',
    label: 'Vales',
    description: 'Controle de vales e fiado de clientes',
    icon: FileText,
  },
];

export default function FinancialPage() {
  return (
    <div className="px-4 py-4 space-y-4">
      <PageHeader title="Financeiro" />
      <div className="space-y-2">
        {financialLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <Card className="hover:bg-muted/50 transition-colors">
                <CardContent className="flex items-center gap-3 pt-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
