'use client';

import { useAccount } from '@/providers/account-provider';
import { cn } from '@/lib/utils';
import { ChevronDown, Building2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function AccountSwitcher() {
  const { activeAccount, accounts, switchAccount } = useAccount();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Don't show switcher if user has only 1 account
  if (accounts.length <= 1) {
    return activeAccount ? (
      <span className="text-sm font-medium">{activeAccount.name}</span>
    ) : null;
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
      >
        <Building2 className="size-4 text-muted-foreground" />
        <span className="max-w-[140px] truncate">
          {activeAccount?.name ?? 'Selecionar conta'}
        </span>
        <ChevronDown
          className={cn(
            'size-3.5 text-muted-foreground transition-transform',
            open && 'rotate-180'
          )}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-56 rounded-md border bg-popover p-1 shadow-md">
          {accounts.map((account) => (
            <button
              key={account.id}
              onClick={() => {
                switchAccount(account.id);
                setOpen(false);
              }}
              className={cn(
                'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent',
                account.id === activeAccount?.id &&
                  'bg-accent font-medium'
              )}
            >
              <Building2 className="size-3.5 text-muted-foreground" />
              <span className="truncate">{account.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
