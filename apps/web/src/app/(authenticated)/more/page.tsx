'use client';

import Link from 'next/link';
import { Package, Forklift, Truck, BarChart2, Settings, LogOut, ChevronRight, ChevronsUpDown } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/providers/auth-provider';

const MENU_ITEMS = [
  { id: 'products', label: 'Produtos', icon: Package, href: '/products' },
  { id: 'loading', label: 'Carregamento', icon: Forklift, href: '/loading' },
  { id: 'deliveries', label: 'Entregas', icon: Truck, href: '/deliveries' },
  { id: 'stats', label: 'Estatísticas', icon: BarChart2, href: '/stats' },
  { id: 'settings', label: 'Configurações', icon: Settings, href: '/settings' },
];

function MenuRow({ icon: Icon, label, href, first }: { icon: React.ElementType; label: string; href: string; first?: boolean }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
      style={{ minHeight: 48, borderTop: first ? 'none' : '1px solid var(--border-subtle)' }}
    >
      <Icon className="size-[18px] shrink-0 text-muted-foreground" aria-hidden="true" />
      <span className="flex-1">{label}</span>
      <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
    </Link>
  );
}

export default function MorePage() {
  const { signOut } = useAuth();


  return (
    <div className="px-4 py-4 space-y-4">
      <PageHeader title="Mais" />

      {/* Account info — static / decorative */}
      <Card>
        <CardContent className="p-0">
          <div className="flex items-center gap-3 px-4 py-4">
            <span
              className="inline-flex items-center justify-center rounded-full shrink-0 text-sm font-semibold"
              style={{ width: 40, height: 40, background: 'var(--accent)', color: 'var(--accent-fg)' }}
              aria-hidden="true"
            >
              C
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-foreground">Conta Principal</div>
              <div className="text-xs text-muted-foreground">Trocar de conta</div>
            </div>
            <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          </div>
        </CardContent>
      </Card>

      {/* Navigation links */}
      <Card>
        <CardContent className="p-0">
          {MENU_ITEMS.map((item, i) => (
            <MenuRow key={item.id} icon={item.icon} label={item.label} href={item.href} first={i === 0} />
          ))}
        </CardContent>
      </Card>

      {/* Sign out */}
      <Card>
        <CardContent className="p-0">
          <button
            onClick={signOut}
            className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium hover:bg-muted/50 transition-colors"
            style={{ minHeight: 48, color: 'var(--danger-fg)' }}
          >
            <LogOut className="size-[18px] shrink-0" aria-hidden="true" />
            <span className="flex-1 text-left">Sair</span>
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
