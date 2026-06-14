'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ClipboardList, Users, Wallet, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/orders', label: 'Pedidos', icon: ClipboardList },
  { href: '/clients', label: 'Clientes', icon: Users },
  { href: '/financial', label: 'Financeiro', icon: Wallet },
  { href: '/more', label: 'Mais', icon: Menu },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t bg-background pb-safe md:hidden"
      style={{ height: 'var(--bottomnav-h)', zIndex: 'var(--z-nav)' }}
    >
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center gap-0.5 px-3 py-1.5 text-xs transition-colors',
              isActive
                ? 'text-muted-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
            style={isActive ? { color: 'var(--accent-fg)' } : undefined}
          >
            <Icon className="size-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
