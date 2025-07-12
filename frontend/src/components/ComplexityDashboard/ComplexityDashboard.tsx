import React from 'react';
import type { ComplexityAnalysisData } from '../../types';

interface ComplexityDashboardProps {
  analysis: ComplexityAnalysisData;
}

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-600 dark:text-green-400';
  if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-red-600 dark:text-red-400';
};

const getScoreBgColor = (score: number) => {
  if (score >= 80) return 'bg-green-100 dark:bg-green-900/30';
  if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900/30';
  return 'bg-red-100 dark:bg-red-900/30';
};

export const ComplexityDashboard: React.FC<ComplexityDashboardProps> = ({ analysis }) => {
  const { metrics, complexity, security, recommendations, insights } = analysis;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Code Complexity Dashboard</h3>
        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
          Score: {metrics.maintainabilityIndex}/100
        </span>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Maintainability</p>
              <p className={`text-2xl font-bold ${getScoreColor(metrics.maintainabilityIndex)}`}>
                {metrics.maintainabilityIndex}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-full ${getScoreBgColor(metrics.maintainabilityIndex)} flex items-center justify-center`}>
              <span className="text-lg font-semibold">M</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Performance</p>
              <p className={`text-2xl font-bold ${getScoreColor(metrics.performanceScore)}`}>
                {metrics.performanceScore}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-full ${getScoreBgColor(metrics.performanceScore)} flex items-center justify-center`}>
              <span className="text-lg font-semibold">P</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Security</p>
              <p className={`text-2xl font-bold ${getScoreColor(security.score)}`}>
                {security.score}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-full ${getScoreBgColor(security.score)} flex items-center justify-center`}>
              <span className="text-lg font-semibold">S</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Complexity</p>
              <p className={`text-2xl font-bold ${getScoreColor(100 - metrics.complexityScore)}`}>
                {metrics.complexityScore}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-full ${getScoreBgColor(100 - metrics.complexityScore)} flex items-center justify-center`}>
              <span className="text-lg font-semibold">C</span>
            </div>
          </div>
        </div>
      </div>

      {/* Code Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Code Statistics</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Lines:</span>
              <span className="font-medium">{metrics.totalLines}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Non-empty Lines:</span>
              <span className="font-medium">{metrics.nonEmptyLines}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Comment Lines:</span>
              <span className="font-medium">{metrics.commentLines}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Functions/Classes:</span>
              <span className="font-medium">{metrics.functionCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Code/Comment Ratio:</span>
              <span className="font-medium">{metrics.codeToCommentRatio}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Complexity Breakdown</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">If Statements:</span>
              <span className="font-medium">{complexity.ifStatements}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">For Loops:</span>
              <span className="font-medium">{complexity.forLoops}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">While Loops:</span>
              <span className="font-medium">{complexity.whileLoops}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Switch Statements:</span>
              <span className="font-medium">{complexity.switchStatements}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Try-Catch Blocks:</span>
              <span className="font-medium">{complexity.tryCatchBlocks}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Analysis */}
      {security.issues.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
          <h4 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-4">Security Issues</h4>
          <ul className="space-y-2">
            {security.issues.map((issue, index) => (
              <li key={index} className="flex items-center text-red-800 dark:text-red-200">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
        <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">Recommendations</h4>
        <ul className="space-y-2">
          {recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start text-blue-800 dark:text-blue-200">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
              {recommendation}
            </li>
          ))}
        </ul>
      </div>

      {/* AI Insights */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI Insights</h4>
        <div className="prose dark:prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
            {insights}
          </div>
        </div>
      </div>
    </div>
  );
}; 