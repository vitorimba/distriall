'use client';

import Image from 'next/image';
import { useAuth } from '@/providers/auth-provider';
import { useTheme } from '@/hooks/use-theme';
import { AccountSwitcher } from '@/components/layout/account-switcher';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import { LogOut, Moon, Sun } from 'lucide-react';

const ROLE_LABELS: Record<string, string> = {
  admin: 'Administrador',
  vendedor: 'Vendedor',
  entregador: 'Entregador',
};

export function Header() {
  const { profile, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center gap-2 border-b bg-background px-3 md:px-4">
      {/* Left — logo (mobile only) */}
      <div className="shrink-0 md:hidden">
        <Image
          src="/distriall-logo-on-dark.png"
          alt="Distriall"
          width={80}
          height={22}
          className="h-7 w-auto hidden dark:block"
          priority
        />
        <Image
          src="/distriall-logo-on-light.png"
          alt="Distriall"
          width={80}
          height={22}
          className="h-7 w-auto block dark:hidden"
          priority
        />
      </div>

      {/* Center — account switcher */}
      <div className="flex min-w-0 flex-1 justify-center md:justify-start">
        <AccountSwitcher />
      </div>

      {/* Right — theme, profile, logout */}
      <div className="flex shrink-0 items-center gap-1">
        <Tooltip label={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}>
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Alternar tema">
            {theme === 'dark' ? (
              <Sun className="size-4" aria-hidden="true" />
            ) : (
              <Moon className="size-4" aria-hidden="true" />
            )}
          </Button>
        </Tooltip>

        {profile && (
          <div className="ml-1 flex items-center gap-2 border-l pl-2">
            <Avatar name={profile.name} size="md" />
            <div className="hidden leading-tight md:block">
              <p className="text-sm font-semibold text-foreground">{profile.name}</p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {ROLE_LABELS[profile.role] ?? profile.role}
              </p>
            </div>
          </div>
        )}

        <Tooltip label="Sair">
          <Button variant="ghost" size="icon" onClick={signOut} aria-label="Sair" className="ml-1">
            <LogOut className="size-4" aria-hidden="true" />
          </Button>
        </Tooltip>
      </div>
    </header>
  );
}
