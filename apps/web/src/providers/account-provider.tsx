'use client';

import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useState,
  type ReactNode,
} from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/providers/auth-provider';
import { useAccountStore, type Account } from '@/stores/account-store';

interface AccountContextType {
  activeAccount: Account | undefined;
  accounts: Account[];
  switchAccount: (id: string) => void;
  isLoading: boolean;
  hasNoAccounts: boolean;
}

const AccountContext = createContext<AccountContextType>({
  activeAccount: undefined,
  accounts: [],
  switchAccount: () => {},
  isLoading: true,
  hasNoAccounts: false,
});

export function useAccount() {
  return useContext(AccountContext);
}

export function AccountProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [fetched, setFetched] = useState(false);
  const {
    accounts,
    setAccounts,
    setActiveAccount,
    getActiveAccount,
    clear,
  } = useAccountStore();

  const loadAccounts = useCallback(async () => {
    if (!user) {
      clear();
      setFetched(false);
      return;
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from('account_users')
      .select('account_id, role, can_view_financial, accounts(id, name, slug)')
      .eq('user_id', user.id)
      .eq('is_active', true);

    if (error || !data) {
      setFetched(true);
      return;
    }

    const mapped: Account[] = data
      .filter((row: Record<string, unknown>) => row.accounts)
      .map((row: Record<string, unknown>) => {
        const acc = row.accounts as unknown as {
          id: string;
          name: string;
          slug: string;
        };
        return {
          id: acc.id,
          name: acc.name,
          slug: acc.slug,
          role: row.role,
          can_view_financial: row.can_view_financial,
        };
      });

    setAccounts(mapped);
    setFetched(true);
  }, [user, setAccounts, clear]);

  useEffect(() => {
    loadAccounts();
  }, [loadAccounts]);

  const switchAccount = useCallback(
    (id: string) => {
      setActiveAccount(id);
    },
    [setActiveAccount]
  );

  const isLoading = user !== null && !fetched;
  const hasNoAccounts = fetched && accounts.length === 0;

  return (
    <AccountContext.Provider
      value={{
        activeAccount: getActiveAccount(),
        accounts,
        switchAccount,
        isLoading,
        hasNoAccounts,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}
