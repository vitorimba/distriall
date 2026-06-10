'use client';

import { useAuth } from '@/providers/auth-provider';
import { AccountProvider } from '@/providers/account-provider';
import { Header } from '@/components/layout/header';
import { BottomNav } from '@/components/layout/bottom-nav';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  return (
    <AccountProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 pb-16">{children}</main>
        <BottomNav />
      </div>
    </AccountProvider>
  );
}
