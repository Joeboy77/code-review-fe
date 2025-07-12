import React, { useState } from 'react';
import type { RepositoryAnalysisData, FileAnalysis } from '../../types';

interface RepositoryDashboardProps {
  analysis: RepositoryAnalysisData;
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

export const RepositoryDashboard: React.FC<RepositoryDashboardProps> = ({ analysis }) => {
  const [selectedFile, setSelectedFile] = useState<FileAnalysis | null>(null);
  const { repository, overview, files, insights, recommendations } = analysis;

  // Sort files by complexity score (highest first)
  const sortedFiles = [...files].sort((a, b) => b.analysis.metrics.complexityScore - a.analysis.metrics.complexityScore);

  return (
    <div className="space-y-6">
      {/* Repository Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {repository.owner}/{repository.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Branch: {repository.branch} • {overview.totalFiles} files analyzed
            </p>
          </div>
          <a
            href={repository.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Lines</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {overview.totalLines.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">L</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Functions</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {overview.totalFunctions.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <span className="text-lg font-semibold text-purple-600 dark:text-purple-400">F</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Maintainability</p>
              <p className={`text-2xl font-bold ${getScoreColor(overview.averageMaintainability)}`}>
                {overview.averageMaintainability}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-full ${getScoreBgColor(overview.averageMaintainability)} flex items-center justify-center`}>
              <span className="text-lg font-semibold">M</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Performance</p>
              <p className={`text-2xl font-bold ${getScoreColor(overview.averagePerformance)}`}>
                {overview.averagePerformance}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-full ${getScoreBgColor(overview.averagePerformance)} flex items-center justify-center`}>
              <span className="text-lg font-semibold">P</span>
            </div>
          </div>
        </div>
      </div>

      {/* File Types Distribution */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">File Types</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Object.entries(overview.fileTypes).map(([ext, count]) => (
            <div key={ext} className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{count}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">.{ext}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Issues */}
      {overview.securityIssues.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
          <h4 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-4">Security Issues Found</h4>
          <ul className="space-y-2">
            {overview.securityIssues.map((issue, index) => (
              <li key={index} className="flex items-center text-red-800 dark:text-red-200">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Top Complex Files */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Most Complex Files</h4>
        <div className="space-y-3">
          {sortedFiles.slice(0, 10).map((file, index) => (
            <div
              key={file.path}
              className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
              onClick={() => setSelectedFile(selectedFile?.path === file.path ? null : file)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500 dark:text-gray-400">#{index + 1}</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{file.path}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {file.analysis.metrics.totalLines} lines • {file.analysis.metrics.functionCount} functions
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  file.analysis.metrics.complexityScore > 20 ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200' :
                  file.analysis.metrics.complexityScore > 10 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200' :
                  'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                }`}>
                  {file.analysis.metrics.complexityScore} complexity
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected File Details */}
      {selectedFile && (
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            File Analysis: {selectedFile.path}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Maintainability</p>
              <p className={`text-xl font-bold ${getScoreColor(selectedFile.analysis.metrics.maintainabilityIndex)}`}>
                {selectedFile.analysis.metrics.maintainabilityIndex}/100
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Performance</p>
              <p className={`text-xl font-bold ${getScoreColor(selectedFile.analysis.metrics.performanceScore)}`}>
                {selectedFile.analysis.metrics.performanceScore}/100
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Security</p>
              <p className={`text-xl font-bold ${getScoreColor(selectedFile.analysis.security.score)}`}>
                {selectedFile.analysis.security.score}/100
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
        <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">Repository Recommendations</h4>
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
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI Repository Insights</h4>
        <div className="prose dark:prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
            {insights}
          </div>
        </div>
      </div>
    </div>
  );
}; 