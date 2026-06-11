'use client';

import { useAuth } from '@/providers/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-xl text-gray-600">Carregando...</div>
      </div>
    );
  }

  if (!user || (profile && profile.role !== 'entregador')) {
    return null;
  }

  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const driverName = profile?.name ?? 'Entregador';

  return (
    <div className="min-h-screen bg-white">
      {/* Header ultra-simples */}
      <header className="bg-green-700 text-white px-4 py-4 text-center">
        <h1 className="text-2xl font-bold">Distriall</h1>
        <p className="text-lg mt-1">
          {driverName} — {today}
        </p>
      </header>

      {/* Conteudo — SEM bottom nav, SEM sidebar */}
      <main className="p-4 space-y-4 pb-8">{children}</main>
    </div>
  );
}
