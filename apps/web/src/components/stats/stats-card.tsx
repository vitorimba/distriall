'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkline } from '@/components/ui/charts/sparkline';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: ReactNode;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;
  delta?: number;
  deltaLabel?: string;
  spark?: number[];
  accent?: boolean;
  loading?: boolean;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon,
  className,
  delta,
  deltaLabel,
  spark,
  accent,
  loading,
}: StatsCardProps) {
  const hasDelta = delta !== undefined && delta !== null;
  const isPositive = hasDelta && delta >= 0;

  return (
    <Card
      className={cn('relative overflow-hidden', className)}
      style={accent ? { background: 'var(--primary)', color: 'var(--primary-foreground)' } : undefined}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle
            className="text-sm font-medium"
            style={accent ? { color: 'var(--primary-foreground)' } : { color: 'var(--text-secondary)' }}
          >
            {title}
          </CardTitle>
          {icon && <span style={accent ? { color: 'var(--primary-foreground)' } : { color: 'var(--text-secondary)' }}>{icon}</span>}
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton variant="rect" className="h-8 w-24" />
        ) : (
          <p className={cn('text-lg sm:text-2xl font-bold truncate', accent ? '' : 'text-foreground')} title={typeof value === 'string' ? value : undefined}>{value}</p>
        )}

        {hasDelta && !loading && (
          <div className="mt-1 flex items-center gap-1">
            {isPositive ? (
              <TrendingUp className="size-3" style={{ color: accent ? 'var(--primary-foreground)' : 'var(--text-positive)' }} />
            ) : (
              <TrendingDown className="size-3" style={{ color: accent ? 'var(--primary-foreground)' : 'var(--status-vencido)' }} />
            )}
            <span
              className="text-xs font-semibold"
              style={{
                color: accent
                  ? 'var(--primary-foreground)'
                  : isPositive
                    ? 'var(--text-positive)'
                    : 'var(--status-vencido)',
              }}
            >
              {isPositive ? '+' : ''}{delta.toFixed(1)}%
            </span>
            {deltaLabel && (
              <span
                className="text-xs"
                style={{ color: accent ? 'rgba(255,255,255,0.7)' : 'var(--text-secondary)' }}
              >
                {deltaLabel}
              </span>
            )}
          </div>
        )}

        {subtitle && !loading && (
          <p className="mt-1 text-xs" style={{ color: accent ? 'rgba(255,255,255,0.7)' : 'var(--text-secondary)' }}>
            {subtitle}
          </p>
        )}
      </CardContent>

      {spark && spark.length >= 2 && !loading && (
        <div className="absolute bottom-0 right-0 opacity-60">
          <Sparkline
            values={spark}
            width={80}
            height={28}
            color={accent ? 'rgba(255,255,255,0.8)' : 'var(--chart-1)'}
            area
          />
        </div>
      )}
    </Card>
  );
}
