import React from 'react';
import { smoothPath, ChartTip, fmtNum } from './chartUtils';

/* Gráfico de linha/área com pontos e tooltip no hover.
   data: [{ label, value }] — uma série. */
export function LineChart({ data = [], height = 160, area = true, color = 'var(--chart-1)', formatValue = fmtNum, showDots = true }) {
  const [hover, setHover] = React.useState(null);
  if (data.length < 2) return null;

  const max = Math.max(...data.map((d) => d.value)) * 1.08;
  const min = 0;
  const x = (i) => (i / (data.length - 1)) * 100;
  const y = (v) => 100 - ((v - min) / (max - min)) * 100;
  const pts = data.map((d, i) => [x(i), y(d.value)]);
  const line = smoothPath(pts);
  const areaPath = `${line} L 100,100 L 0,100 Z`;
  const gid = React.useId().replace(/[^a-zA-Z0-9]/g, '');

  return (
    <div className="da-chart">
      <div style={{ position: 'relative', height }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
          {[25, 50, 75].map((g) => (
            <line key={g} x1="0" x2="100" y1={g} y2={g} stroke="var(--chart-grid)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          ))}
          {area ? (
            <React.Fragment>
              <defs>
                <linearGradient id={`fill-${gid}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity="0.22" />
                  <stop offset="100%" stopColor={color} stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <path d={areaPath} fill={`url(#fill-${gid})`} />
            </React.Fragment>
          ) : null}
          <path d={line} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
        </svg>

        {/* pontos + zonas de hover */}
        {data.map((d, i) => (
          <div
            key={i}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            style={{
              position: 'absolute',
              left: `${x(i)}%`,
              top: 0,
              bottom: 0,
              width: `${100 / data.length}%`,
              transform: 'translateX(-50%)',
            }}
          >
            {showDots || hover === i ? (
              <span
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: `${y(d.value)}%`,
                  width: hover === i ? 9 : 6,
                  height: hover === i ? 9 : 6,
                  borderRadius: '50%',
                  background: hover === i ? color : 'var(--surface-card)',
                  border: `2px solid ${color}`,
                  transform: 'translate(-50%, -50%)',
                  transition: 'width 0.12s, height 0.12s',
                }}
              ></span>
            ) : null}
          </div>
        ))}
        {hover != null ? <ChartTip x={x(hover)} y={y(data[hover].value)} label={data[hover].label} value={formatValue(data[hover].value)} /> : null}
      </div>
      <div className="da-chart__xaxis">
        {data.map((d) => (
          <span key={d.label} className="da-chart__xlabel">{d.label}</span>
        ))}
      </div>
    </div>
  );
}
