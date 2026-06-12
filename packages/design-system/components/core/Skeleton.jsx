import React from 'react';

export function Skeleton({ variant = 'line', width, height, className, style }) {
  const cls = ['da-skeleton', `da-skeleton--${variant}`, className || ''].filter(Boolean).join(' ');
  return <span className={cls} style={{ width, height, ...style }} aria-hidden="true"></span>;
}
