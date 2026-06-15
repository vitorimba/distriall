'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  Users,
  Truck,
  Wallet,
  ChartColumn,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';

const navItems = [
  { href: '/dashboard', label: 'Inicio', icon: LayoutDashboard },
  { href: '/orders', label: 'Pedidos', icon: ClipboardList },
  { href: '/products', label: 'Produtos', icon: Package },
  { href: '/clients', label: 'Clientes', icon: Users },
  { href: '/deliveries', label: 'Entregas', icon: Truck },
  { href: '/financial', label: 'Financeiro', icon: Wallet },
  { href: '/stats', label: 'Estatisticas', icon: ChartColumn },
];

export function Sidebar() {
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <aside className="hidden md:flex md:w-56 md:flex-col md:border-r md:bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Image
          src={theme === 'dark' ? '/distriall-logo-on-dark.png' : '/distriall-logo-on-light.png'}
          alt="DistriAll"
          width={120}
          height={32}
          className="h-7 w-auto"
          priority
        />
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? ''
                  : 'hover:bg-[var(--surface-hover)]'
              )}
              style={
                isActive
                  ? { background: 'var(--primary)', color: 'var(--primary-foreground)' }
                  : { color: 'var(--text-secondary)' }
              }
            >
              <Icon className="size-4" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
