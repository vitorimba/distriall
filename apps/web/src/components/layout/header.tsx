'use client';

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
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold text-primary md:hidden">Distriall</span>
        <AccountSwitcher />
      </div>

      <div className="flex items-center gap-2">
        {profile && (
          <span className="text-sm text-muted-foreground">
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
