import React from 'react';

/* Barra de progresso determinada (0–100). */
export function ProgressBar({ value = 0, max = 100, tone = 'accent', label, className }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const cls = ['da-progress', tone === 'success' ? 'da-progress--success' : '', className || ''].filter(Boolean).join(' ');
  return (
    <div className={cls} role="progressbar" aria-valuenow={value} aria-valuemax={max} aria-label={label}>
      <div className="da-progress__fill" style={{ width: `${pct}%` }}></div>
    </div>
  );
}
