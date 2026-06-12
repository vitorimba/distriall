import React from 'react';
import { fmtNum } from './chartUtils';

/* Ranking horizontal: rótulo + barra proporcional + valor.
   data: [{ label, value }] — bom para top produtos, cidades, clientes. */
export function HBarList({ data = [], color = 'var(--chart-1)', formatValue = fmtNum, maxValue }) {
  const [hover, setHover] = React.useState(null);
  const max = maxValue || Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="da-hbars da-chart">
      {data.map((d, i) => (
        <div key={d.label} className="da-hbars__row" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
          <span className="da-hbars__label" style={{ color: hover === i ? 'var(--text-primary)' : undefined }}>{d.label}</span>
          <div className="da-hbars__track">
            <div
              className="da-hbars__fill"
              style={{ width: `${(d.value / max) * 100}%`, background: color, opacity: hover == null || hover === i ? 1 : 0.45 }}
            ></div>
          </div>
          <span className="da-hbars__value num">{formatValue(d.value)}</span>
        </div>
      ))}
    </div>
  );
}
