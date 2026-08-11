'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  Users,
  Forklift,
  Truck,
  Wallet,
  ChartColumn,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navSections = [
  {
    label: 'Principal',
    items: [
      { href: '/dashboard', label: 'Início', icon: LayoutDashboard },
      { href: '/orders', label: 'Pedidos', icon: ClipboardList },
      { href: '/products', label: 'Produtos', icon: Package },
      { href: '/clients', label: 'Clientes', icon: Users },
    ],
  },
  {
    label: 'Operacional',
    items: [
      { href: '/loading', label: 'Carregamento', icon: Forklift },
      { href: '/deliveries', label: 'Entregas', icon: Truck },
    ],
  },
  {
    label: 'Financeiro',
    items: [
      { href: '/financial', label: 'Financeiro', icon: Wallet },
      { href: '/stats', label: 'Estatísticas', icon: ChartColumn },
    ],
  },
  {
    label: 'Sistema',
    items: [{ href: '/settings', label: 'Configurações', icon: Settings }],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-60 md:flex-col md:border-r md:bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Image
          src="/distriall-logo-on-dark.png"
          alt="Distriall"
          width={120}
          height={32}
          className="h-7 w-auto hidden dark:block"
          priority
        />
        <Image
          src="/distriall-logo-on-light.png"
          alt="Distriall"
          width={120}
          height={32}
          className="h-7 w-auto block dark:hidden"
          priority
        />
      </div>
      <nav className="flex-1 space-y-5 overflow-y-auto p-3">
        {navSections.map((section) => (
          <div key={section.label} className="space-y-1">
            <p
              className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'var(--text-secondary)', opacity: 0.7 }}
            >
              {section.label}
            </p>
            {section.items.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + '/');
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium transition-colors',
                    isActive ? '' : 'hover:bg-[var(--surface-hover)]'
                  )}
                  style={
                    isActive
                      ? { background: 'var(--primary)', color: 'var(--primary-foreground)' }
                      : { color: 'var(--text-secondary)' }
                  }
                >
                  <Icon className="size-[18px]" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
