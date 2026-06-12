import React from 'react';

const PALETTE = ['#F97A1E', '#3B82F6', '#8B5CF6', '#22C55E', '#EAB308', '#EF4444'];

export function Avatar({ name = '', size = 'md', tone, className }) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
  const idx = tone != null ? tone : (name.length + (name.charCodeAt(0) || 0)) % PALETTE.length;
  const color = PALETTE[idx % PALETTE.length];
  const cls = ['da-avatar', `da-avatar--${size}`, className || ''].filter(Boolean).join(' ');
  return (
    <span className={cls} style={{ background: color + '26', color: color }} title={name}>
      {initials || '?'}
    </span>
  );
}
