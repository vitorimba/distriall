import React from 'react';

/* Escolha única visível. options: strings ou { value, label, disabled? }. */
export function RadioGroup({ options = [], value, onChange, name, direction = 'column', className }) {
  const cls = ['da-radio-group', direction === 'row' ? 'da-radio-group--row' : '', className || ''].filter(Boolean).join(' ');
  return (
    <div className={cls} role="radiogroup">
      {options.map((opt) => {
        const o = typeof opt === 'string' ? { value: opt, label: opt } : opt;
        return (
          <label key={o.value} className={o.disabled ? 'da-radio da-radio--disabled' : 'da-radio'}>
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              disabled={o.disabled}
              onChange={() => onChange && onChange(o.value)}
            />
            <span className="da-radio__dot"></span>
            {o.label}
          </label>
        );
      })}
    </div>
  );
}
