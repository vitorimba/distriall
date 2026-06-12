import React from 'react';
import { ChartTip, fmtNum } from './chartUtils';

/* Barras verticais arredondadas; a maior ganha destaque, hover mostra tooltip.
   data: [{ label, value }] */
export function BarChart({ data = [], height = 160, color = 'var(--chart-1)', formatValue = fmtNum, showValues = false, highlightMax = true }) {
  const [hover, setHover] = React.useState(null);
  if (data.length === 0) return null;
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="da-chart">
      <div style={{ position: 'relative', height }}>
        <div className="da-barchart__bars">
          {data.map((d, i) => {
            const isMax = highlightMax && d.value === max;
            const active = hover === i;
            return (
              <div key={d.label} className="da-barchart__col" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
                {showValues ? <span className="da-barchart__value num">{formatValue(d.value)}</span> : null}
                <div
                  className="da-barchart__bar"
                  style={{
                    height: `${(d.value / max) * (showValues ? 82 : 96)}%`,
                    background: color,
                    opacity: isMax || active ? 1 : 0.5,
                  }}
                ></div>
              </div>
            );
          })}
        </div>
        {hover != null ? (
          <ChartTip
            x={((hover + 0.5) / data.length) * 100}
            y={100 - (data[hover].value / max) * (showValues ? 82 : 96)}
            label={data[hover].label}
            value={formatValue(data[hover].value)}
          />
        ) : null}
      </div>
      <div className="da-chart__xaxis">
        {data.map((d) => (
          <span key={d.label} className="da-chart__xlabel">{d.label}</span>
        ))}
      </div>
    </div>
  );
}
