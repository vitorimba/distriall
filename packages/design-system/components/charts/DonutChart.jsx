import React from 'react';
import { CHART_COLORS, fmtNum } from './chartUtils';

/* Donut em SVG com stat central e legenda interativa.
   data: [{ label, value, color? }] — hover na legenda destaca o segmento. */
export function DonutChart({ data = [], size = 130, thickness = 14, centerValue, centerLabel, formatValue = fmtNum, showPercent = true }) {
  const [active, setActive] = React.useState(null);
  const total = data.reduce((a, d) => a + d.value, 0);
  if (!total) return null;

  const r = 50 - thickness / 2;
  const C = 2 * Math.PI * r;
  let acc = 0;
  const segs = data.map((d, i) => {
    const frac = d.value / total;
    const seg = { ...d, i, frac, offset: acc, color: d.color || CHART_COLORS[i % CHART_COLORS.length] };
    acc += frac;
    return seg;
  });

  const current = active != null ? segs[active] : null;

  return (
    <div className="da-donut da-chart">
      <div className="da-donut__svg-wrap" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {segs.map((s) => (
            <circle
              key={s.i}
              className="da-donut__segment"
              cx="50" cy="50" r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={active === s.i ? thickness + 3 : thickness}
              strokeDasharray={`${Math.max(s.frac * C - 1.5, 0.5)} ${C}`}
              strokeDashoffset={-s.offset * C}
              opacity={active == null || active === s.i ? 1 : 0.3}
              onMouseEnter={() => setActive(s.i)}
              onMouseLeave={() => setActive(null)}
            />
          ))}
        </svg>
        <div className="da-donut__center">
          <span className="da-donut__center-value num">
            {current ? (showPercent ? `${Math.round(current.frac * 100)}%` : formatValue(current.value)) : centerValue}
          </span>
          <span className="da-donut__center-label">{current ? current.label : centerLabel}</span>
        </div>
      </div>
      <div className="da-donut__legend">
        {segs.map((s) => (
          <button
            key={s.i}
            className={active != null && active !== s.i ? 'da-donut__legend-row da-donut__legend-row--dim' : 'da-donut__legend-row'}
            onMouseEnter={() => setActive(s.i)}
            onMouseLeave={() => setActive(null)}
          >
            <span className="da-donut__swatch" style={{ background: s.color }}></span>
            <span className="da-donut__legend-label">{s.label}</span>
            <span className="num" style={{ fontWeight: 600 }}>
              {showPercent ? `${Math.round(s.frac * 100)}%` : formatValue(s.value)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
