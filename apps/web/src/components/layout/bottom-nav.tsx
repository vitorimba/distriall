'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Wallet,
  Package,
  Forklift,
  Truck,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/orders', label: 'Pedidos', icon: ClipboardList },
  { href: '/clients', label: 'Clientes', icon: Users },
  { href: '/financial', label: 'Financeiro', icon: Wallet },
  { href: '/products', label: 'Produtos', icon: Package },
  { href: '/loading', label: 'Carregamento', icon: Forklift },
  { href: '/deliveries', label: 'Entregas', icon: Truck },
  { href: '/settings', label: 'Config', icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 border-t bg-background pb-safe md:hidden overflow-x-auto scrollbar-none"
      style={{ height: 'var(--bottomnav-h)', zIndex: 'var(--z-nav)' }}
    >
      <div className="flex items-center min-w-max px-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-1.5 text-[10px] transition-colors shrink-0',
                isActive
                  ? 'text-muted-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              style={isActive ? { color: 'var(--accent-fg)' } : undefined}
            >
              <Icon className="size-5" />
              <span className="whitespace-nowrap">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
