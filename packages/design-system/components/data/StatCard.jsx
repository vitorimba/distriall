import React from 'react';
import { Icon } from '../core/Icon';
import { Sparkline } from '../charts/Sparkline';

export function StatCard({ icon, label, value, delta, deltaLabel, spark, accent = false, loading = false, className }) {
  const cls = ['da-stat', accent ? 'da-stat--accent' : '', className || ''].filter(Boolean).join(' ');
  if (loading) {
    return (
      <div className={cls}>
        <span className="da-skeleton da-skeleton--circle" style={{ width: 34, height: 34 }}></span>
        <span className="da-skeleton da-skeleton--line" style={{ width: '70%', height: 20, marginTop: 12 }}></span>
        <span className="da-skeleton da-skeleton--line" style={{ width: '45%', marginTop: 8 }}></span>
      </div>
    );
  }
  const deltaTone = typeof delta === 'number' ? (delta >= 0 ? 'da-stat__delta--pos' : 'da-stat__delta--neg') : '';
  return (
    <div className={cls}>
      {icon ? (
        <span className="da-stat__icon">
          <Icon name={icon} size={17} />
        </span>
      ) : null}
      <span className="da-stat__value num">{value}</span>
      <span className="da-stat__row">
        <span className="da-stat__label">{label}</span>
        {typeof delta === 'number' ? (
          <span className={`da-stat__delta ${deltaTone} num`}>
            <Icon name={delta >= 0 ? 'trending-up' : 'trending-down'} size={12} />
            {Math.abs(delta).toLocaleString('pt-BR')}%{deltaLabel ? ` ${deltaLabel}` : ''}
          </span>
        ) : null}
      </span>
      {Array.isArray(spark) && spark.length > 1 ? (
        <div className="da-stat__spark">
          <Sparkline values={spark} width="100%" height={26} color={accent ? 'rgba(255, 255, 255, 0.85)' : 'var(--chart-1)'} />
        </div>
      ) : null}
    </div>
  );
}
