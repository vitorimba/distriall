'use client';

import Image from 'next/image';
import { useAuth } from '@/providers/auth-provider';
import { useTheme } from '@/hooks/use-theme';
import { AccountSwitcher } from '@/components/layout/account-switcher';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import { LogOut, Moon, Sun } from 'lucide-react';

export function Header() {
  const { profile, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center border-b bg-background px-4">
      {/* Left — logo (mobile only) */}
      <div className="flex items-center md:hidden">
        <Image
          src={theme === 'dark' ? '/distriall-logo-on-dark.png' : '/distriall-logo-on-light.png'}
          alt="Distriall"
          width={100}
          height={28}
          className="h-6 w-auto"
          priority
        />
      </div>

      {/* Center — account switcher */}
      <div className="flex flex-1 justify-center md:justify-start">
        <AccountSwitcher />
      </div>

      {/* Right — user name, theme, logout */}
      <div className="flex items-center gap-2">
        {profile && (
          <span className="hidden text-sm text-muted-foreground sm:inline">
            {profile.name}
          </span>
        )}
        <Tooltip label={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}>
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Alternar tema">
            {theme === 'dark' ? (
              <Sun className="size-4" aria-hidden="true" />
            ) : (
              <Moon className="size-4" aria-hidden="true" />
            )}
          </Button>
        </Tooltip>
        <Tooltip label="Sair">
          <Button variant="ghost" size="icon" onClick={signOut} aria-label="Sair">
            <LogOut className="size-4" aria-hidden="true" />
          </Button>
        </Tooltip>
      </div>
    </header>
  );
}
