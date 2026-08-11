'use client';

import { useAuth } from '@/providers/auth-provider';
import { AccountProvider, useAccount } from '@/providers/account-provider';
import { Header } from '@/components/layout/header';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Sidebar } from '@/components/layout/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

function AccountGate({ children }: { children: React.ReactNode }) {
  const { isLoading, hasNoAccounts } = useAccount();
  const { signOut } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-sm text-muted-foreground">Carregando contas...</p>
        </div>
      </div>
    );
  }

  if (hasNoAccounts) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-sm space-y-4 text-center">
          <h2 className="text-lg font-semibold">Sem acesso</h2>
          <p className="text-sm text-muted-foreground">
            Sua conta não está vinculada a nenhuma empresa ativa. Entre em contato com o administrador.
          </p>
          <Button variant="outline" onClick={signOut}>
            Sair
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen overflow-x-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-x-hidden pb-16 md:pb-0">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen">
        <div className="hidden md:flex md:w-56 md:flex-col md:border-r">
          <div className="flex h-14 items-center border-b px-4">
            <Skeleton variant="rect" className="h-7 w-28" />
          </div>
          <div className="flex-1 space-y-1 p-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} variant="rect" className="h-9" />
            ))}
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="h-14 border-b px-4 flex items-center">
            <Skeleton variant="rect" className="h-8 w-32" />
          </div>
          <main className="flex-1 p-4 space-y-4">
            <Skeleton variant="line" className="h-7 w-48" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} variant="rect" className="h-24" />
              ))}
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <AccountProvider>
      <AccountGate>{children}</AccountGate>
    </AccountProvider>
  );
}
