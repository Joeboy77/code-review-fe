import React, { useEffect } from 'react';
import { useCodebaseEvolution } from '../../hooks/useCodebaseEvolution';

// If you have Ant Design Charts, you can use Line or Area chart from '@ant-design/charts'
// Otherwise, use a simple SVG/JSX chart for demo purposes

interface CodebaseEvolutionDashboardProps {
  repo: string;
}

export const CodebaseEvolutionDashboard: React.FC<CodebaseEvolutionDashboardProps> = ({ repo }) => {
  const { timeline, hotspots, loading, error, fetchTimeline, fetchHotspots } = useCodebaseEvolution();

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

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Codebase Evolution & Risk Radar</h2>
      {loading && <div>Loading timeline...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {/* Timeline Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Evolution Timeline</h3>
        {chartData.length > 1 ? (
          <div style={{ width: '100%', height: 300 }}>
            {/* Simple SVG chart for demo; replace with Ant Design Chart if available */}
            <svg width="100%" height="300">
              {/* X axis labels */}
              {chartData.map((d, i) => (
                <text key={i} x={40 + i * 60} y={290} fontSize="10" fill="#888" transform={`rotate(45,${40 + i * 60},290)`}>{d.timestamp.split(',')[0]}</text>
              ))}
              {/* Maintainability line */}
              <polyline
                fill="none"
                stroke="#4F8EF7"
                strokeWidth="2"
                points={chartData.map((d, i) => `${40 + i * 60},${300 - d.maintainability * 2}`).join(' ')}
              />
              {/* Complexity line */}
              <polyline
                fill="none"
                stroke="#F59E42"
                strokeWidth="2"
                points={chartData.map((d, i) => `${40 + i * 60},${300 - d.complexity * 2}`).join(' ')}
              />
              {/* Security line */}
              <polyline
                fill="none"
                stroke="#E24D4D"
                strokeWidth="2"
                points={chartData.map((d, i) => `${40 + i * 60},${300 - d.security * 2}`).join(' ')}
              />
              {/* Legend */}
              <rect x={20} y={10} width={12} height={12} fill="#4F8EF7" /><text x={36} y={20} fontSize="12">Maintainability</text>
              <rect x={160} y={10} width={12} height={12} fill="#F59E42" /><text x={176} y={20} fontSize="12">Complexity</text>
              <rect x={260} y={10} width={12} height={12} fill="#E24D4D" /><text x={276} y={20} fontSize="12">Security</text>
            </svg>
          </div>
        ) : (
          <div className="text-gray-500">Not enough data for timeline chart.</div>
        )}
      </div>

      {/* Hotspots */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Hotspot Files (Rising Risk/Complexity)</h3>
        {hotspots.length > 0 ? (
          <ul className="space-y-2">
            {hotspots.map((h, i) => (
              <li key={i} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                <span className="font-mono text-blue-700 dark:text-blue-300">{h.file}</span>
                <span className="text-sm">
                  <span className="mr-4">Δ Maintainability: <span className={h.maintainabilityTrend < 0 ? 'text-red-500' : 'text-green-600'}>{h.maintainabilityTrend}</span></span>
                  <span className="mr-4">Δ Complexity: <span className={h.complexityTrend > 0 ? 'text-red-500' : 'text-green-600'}>{h.complexityTrend}</span></span>
                  <span>Δ Security: <span className={h.securityTrend > 0 ? 'text-red-500' : 'text-green-600'}>{h.securityTrend}</span></span>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500">No hotspots detected yet.</div>
        )}
      </div>
    </div>
  );
}; 