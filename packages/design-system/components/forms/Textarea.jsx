import React from 'react';

export function Textarea({ invalid = false, className, ...rest }) {
  const cls = ['da-input-wrap', invalid ? 'da-input-wrap--invalid' : '', className || ''].filter(Boolean).join(' ');
  return (
    <span className={cls}>
      <textarea className="da-input da-textarea" rows={3} {...rest}></textarea>
    </span>
  );
}
