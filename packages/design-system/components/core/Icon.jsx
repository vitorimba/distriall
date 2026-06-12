import React from 'react';

/* Renders a Lucide icon from the lucide UMD global (load
   https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js in the page).
   Falls back to an empty 24x24 box if the library or icon is missing. */
export function Icon({ name, size = 18, strokeWidth = 2, className, style }) {
  const lib = typeof window !== 'undefined' && window.lucide && window.lucide.icons;
  const pascal = String(name || '')
    .split('-')
    .map((s) => (s ? s[0].toUpperCase() + s.slice(1) : s))
    .join('');
  const node = lib ? lib[pascal] || lib[name] : null;
  /* lucide@0.460 IconNodes are nested [tag, attrs, children] tuples; the top
     level may be the full ["svg", attrs, children] tuple or a bare child list. */
  const renderNode = (child, i) => {
    if (!Array.isArray(child) || typeof child[0] !== 'string') return null;
    const tag = child[0];
    const attrs = child[1] || {};
    const kids = Array.isArray(child[2]) ? child[2].map(renderNode) : null;
    return React.createElement(tag, { key: i, ...attrs }, kids);
  };
  const childList = Array.isArray(node)
    ? node[0] === 'svg' && Array.isArray(node[2])
      ? node[2]
      : node
    : [];
  const children = childList.map(renderNode);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {children}
    </svg>
  );
}
