import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Account {
  id: string;
  name: string;
  slug: string;
  role: string;
  can_view_financial: boolean;
}

interface AccountStore {
  activeAccountId: string | null;
  accounts: Account[];
  setActiveAccount: (id: string) => void;
  setAccounts: (accounts: Account[]) => void;
  getActiveAccount: () => Account | undefined;
  clear: () => void;
}

export const useAccountStore = create<AccountStore>()(
  persist(
    (set, get) => ({
      activeAccountId: null,
      accounts: [],
      setActiveAccount: (id) => set({ activeAccountId: id }),
      setAccounts: (accounts) =>
        set((state) => ({
          accounts,
          activeAccountId:
            accounts.find((a) => a.id === state.activeAccountId)?.id ??
            accounts[0]?.id ??
            null,
        })),
      getActiveAccount: () =>
        get().accounts.find((a) => a.id === get().activeAccountId),
      clear: () => set({ activeAccountId: null, accounts: [] }),
    }),
    { name: 'distriall-account' }
  )
);
