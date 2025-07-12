import React, { useEffect, useRef, useState } from 'react';
import { useCodebaseEvolution } from '../../hooks/useCodebaseEvolution';

// If you have Ant Design Charts, you can use Line or Area chart from '@ant-design/charts'
// Otherwise, use a simple SVG/JSX chart for demo purposes

interface CodebaseEvolutionDashboardProps {
  repo: string;
}

export const CodebaseEvolutionDashboard: React.FC<CodebaseEvolutionDashboardProps> = ({ repo }) => {
  const { timeline, hotspots, loading, error, fetchTimeline, fetchHotspots } = useCodebaseEvolution();
  const [hovered, setHovered] = useState<{i: number, type: string} | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (repo) {
      fetchTimeline(repo);
      fetchHotspots(repo);
    }
  }, [repo, fetchTimeline, fetchHotspots]);

  // Prepare data for chart
  const chartData = timeline.map((snap: any) => ({
    timestamp: new Date(snap.timestamp).toLocaleString(),
    maintainability: snap.metrics.maintainabilityIndex,
    complexity: snap.metrics.complexityScore,
    security: snap.metrics.securityScore || (snap.metrics.security ? snap.metrics.security.score : 0),
  }));

  // Animation: fade-in
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => { setFadeIn(true); }, [timeline]);

  // Chart dimensions
  const pointGap = 100;
  const margin = { top: 60, right: 40, bottom: 70, left: 60 };
  const chartW = Math.max(500, chartData.length * pointGap + margin.left + margin.right);
  const chartH = 380;
  const yMax = 100;
  const yMin = 0;
  const yScale = (v: number) => chartH - margin.bottom - ((v - yMin) / (yMax - yMin)) * (chartH - margin.top - margin.bottom);
  const xScale = (i: number) => margin.left + i * pointGap;

  // Tooltip
  const tooltip = hovered && chartData[hovered.i] ? (
    <div
      style={{
        position: 'absolute',
        left: xScale(hovered.i) + 20,
        top: yScale(chartData[hovered.i][hovered.type as keyof typeof chartData[0]]) + 20,
        background: 'rgba(30,30,40,0.98)',
        color: '#fff',
        padding: '10px 16px',
        borderRadius: 8,
        fontSize: 14,
        pointerEvents: 'none',
        zIndex: 10,
        boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
        minWidth: 160,
        maxWidth: 260,
        whiteSpace: 'pre-line',
      }}
    >
      <div style={{fontWeight: 700, marginBottom: 4}}>{hovered.type.charAt(0).toUpperCase() + hovered.type.slice(1)}</div>
      <div>Value: <b>{chartData[hovered.i][hovered.type as keyof typeof chartData[0]]}</b></div>
      <div style={{marginTop: 2, fontSize: 12, color: '#b3b3b3'}}>{chartData[hovered.i].timestamp}</div>
    </div>
  ) : null;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Codebase Evolution & Risk Radar</h2>
      {loading && <div>Loading timeline...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {/* Timeline Chart */}
      <div
        className="bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-2xl relative overflow-x-auto"
        style={{ minHeight: 480, transition: 'box-shadow 0.3s', boxShadow: fadeIn ? '0 8px 32px rgba(80,80,180,0.10)' : 'none' }}
        ref={chartRef}
      >
        <div className="mb-6 text-center">
          <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-1">Codebase Evolution Timeline</h3>
          <div className="text-base text-gray-500 dark:text-gray-300 font-medium">Track maintainability, complexity, and security trends over time</div>
        </div>
        {chartData.length > 1 ? (
          <>
            <div style={{ width: '100%', minHeight: 360, position: 'relative' }}>
              <svg width={chartW} height={chartH} style={{ display: 'block', margin: '0 auto', background: 'url("data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Crect x=\"0\" y=\"0\" width=\"20\" height=\"20\" fill=\"%23f3f4f6\"/%3E%3Cpath d=\"M0 20H20V0\" stroke=\"%23e5e7eb\" stroke-width=\"1\"/%3E%3C/svg%3E")', borderRadius: 18, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                {/* Y axis grid and labels */}
                {[0, 25, 50, 75, 100].map((v) => (
                  <g key={v}>
                    <line x1={margin.left} y1={yScale(v)} x2={chartW - margin.right} y2={yScale(v)} stroke="#e5e7eb" strokeDasharray="6 4" />
                    <text x={margin.left - 10} y={yScale(v) + 5} fontSize="14" fill="#fff" fontWeight="bold" textAnchor="end" style={{fontFamily:'Inter, sans-serif'}}>{v}</text>
                  </g>
                ))}
                {/* Y axis title */}
                <text x={margin.left - 40} y={margin.top + 40} fontSize="16" fill="#fff" fontWeight="bold" textAnchor="middle" transform={`rotate(-90,${margin.left - 40},${margin.top + 40})`} style={{fontFamily:'Inter, sans-serif'}}>Score</text>
                {/* X axis labels */}
                {chartData.map((d, i) => (
                  <text key={i} x={xScale(i)} y={chartH - margin.bottom + 32} fontSize="14" fontWeight="bold" fill="#fff" textAnchor="middle" style={{ pointerEvents: 'none', fontFamily:'Inter, sans-serif' }}>{d.timestamp.split(',')[0]}</text>
                ))}
                {/* X axis title */}
                <text x={chartW / 2} y={chartH - margin.bottom + 60} fontSize="16" fill="#fff" fontWeight="bold" textAnchor="middle" style={{fontFamily:'Inter, sans-serif'}}>Snapshot</text>
                {/* Animated lines and dots for each metric */}
                {['maintainability', 'complexity', 'security'].map((type, idx) => {
                  const color = type === 'maintainability' ? '#2563eb' : type === 'complexity' ? '#f59e42' : '#e24d4d';
                  const points = chartData.map((d, i) => `${xScale(i)},${yScale(d[type as keyof typeof d])}`).join(' ');
                  return (
                    <g key={type}>
                      <polyline
                        fill="none"
                        stroke={color}
                        strokeWidth="5"
                        points={points}
                        style={{
                          opacity: fadeIn ? 1 : 0,
                          transition: 'opacity 1s cubic-bezier(.4,2,.6,1)',
                          filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.07))',
                        }}
                      />
                      {chartData.map((d, i) => (
                        <circle
                          key={i + type}
                          cx={xScale(i)}
                          cy={yScale(d[type as keyof typeof d])}
                          r={hovered && hovered.i === i && hovered.type === type ? 11 : 8}
                          fill={color}
                          stroke="#fff"
                          strokeWidth={hovered && hovered.i === i && hovered.type === type ? 4 : 2}
                          style={{ cursor: 'pointer', filter: hovered && hovered.i === i && hovered.type === type ? 'drop-shadow(0 0 8px #6366f1)' : 'none', transition: 'all 0.2s' }}
                          onMouseEnter={() => setHovered({ i, type })}
                          onMouseLeave={() => setHovered(null)}
                        />
                      ))}
                    </g>
                  );
                })}
                {/* Y axis line */}
                <line x1={margin.left} y1={margin.top - 10} x2={margin.left} y2={chartH - margin.bottom + 10} stroke="#6366f1" strokeWidth="3" />
                {/* X axis line */}
                <line x1={margin.left - 10} y1={chartH - margin.bottom} x2={chartW - margin.right + 10} y2={chartH - margin.bottom} stroke="#6366f1" strokeWidth="3" />
              </svg>
              {/* Tooltip overlay */}
              {tooltip}
            </div>
            {/* Professional Legend below chart */}
            <div className="flex justify-center mt-8">
              <div className="flex gap-8 px-8 py-4 rounded-full shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/80" style={{fontFamily:'Inter, sans-serif', fontWeight:600, fontSize:18, color:'#fff', background:'#222'}}>
                <span className="flex items-center gap-2"><span className="inline-block w-7 h-3 rounded-full" style={{background:'#2563eb'}}></span><span style={{color:'#fff'}}>Maintainability</span></span>
                <span className="flex items-center gap-2"><span className="inline-block w-7 h-3 rounded-full" style={{background:'#f59e42'}}></span><span style={{color:'#fff'}}>Complexity</span></span>
                <span className="flex items-center gap-2"><span className="inline-block w-7 h-3 rounded-full" style={{background:'#e24d4d'}}></span><span style={{color:'#fff'}}>Security</span></span>
              </div>
            </div>
          </>
        ) : (
          <div className="text-gray-500">Not enough data for timeline chart.</div>
        )}
      </div>

      {/* Hotspots */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mt-8" style={{background:'#222'}}>
        <h3 className="text-lg font-semibold mb-4" style={{color:'#fff'}}>Hotspot Files (Rising Risk/Complexity)</h3>
        {hotspots.length > 0 ? (
          <ul className="space-y-2">
            {hotspots.map((h, i) => (
              <li key={i} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg" style={{color:'#fff', borderColor:'#444'}}>
                <span className="font-mono text-blue-300" style={{color:'#fff'}}>{h.file}</span>
                <span className="text-sm" style={{color:'#fff'}}>
                  <span className="mr-4">Δ Maintainability: <span className={h.maintainabilityTrend < 0 ? 'text-red-400' : 'text-green-300'} style={{color:'#fff'}}>{h.maintainabilityTrend}</span></span>
                  <span className="mr-4">Δ Complexity: <span className={h.complexityTrend > 0 ? 'text-red-400' : 'text-green-300'} style={{color:'#fff'}}>{h.complexityTrend}</span></span>
                  <span>Δ Security: <span className={h.securityTrend > 0 ? 'text-red-400' : 'text-green-300'} style={{color:'#fff'}}>{h.securityTrend}</span></span>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500" style={{color:'#fff'}}>No hotspots detected yet.</div>
        )}
      </div>
    </div>
  );
}; 