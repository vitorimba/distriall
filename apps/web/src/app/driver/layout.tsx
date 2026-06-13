'use client';

import { useAuth } from '@/providers/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // Not authenticated — redirect to login
    if (!user) {
      router.replace('/login');
      return;
    }

    // Authenticated but not a driver — redirect to dashboard
    if (profile && profile.role !== 'entregador') {
      router.replace('/dashboard');
    }
  }, [user, profile, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-start gap-4 p-4 pt-16">
        <Skeleton variant="circle" className="size-16" />
        <Skeleton variant="line" className="h-6 w-32" />
        <Skeleton variant="rect" className="h-40 w-full max-w-sm" />
      </div>
    );
  }

  if (!user || (profile && profile.role !== 'entregador')) {
    return null;
  }

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace('/login');
  }

  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const driverName = profile?.name ?? 'Entregador';
  const initials = driverName
    .split(' ')
    .slice(0, 2)
    .map((n: string) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      {/* Header com grad-driver */}
      <header style={{ background: 'var(--grad-driver)' }} className="text-white px-4 py-4">
        <div className="mx-auto flex max-w-[560px] items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar com iniciais */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">
              {initials}
            </div>
            <div>
              <p className="font-semibold leading-tight">{driverName}</p>
              <p className="text-xs text-white/80 capitalize">{today}</p>
            </div>
          </div>

          {/* Botao Sair */}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/25 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </header>

      {/* Conteudo — SEM bottom nav, SEM sidebar */}
      <main className="mx-auto max-w-[560px] p-4 pb-8 space-y-4">
        {children}
      </main>
    </div>
  );
}
