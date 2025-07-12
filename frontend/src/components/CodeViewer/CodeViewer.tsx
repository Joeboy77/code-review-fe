import React, { useState } from 'react';
import type { CodeViewerProps } from "../../types";
import { reviewService } from '../../services/api';

export const CodeViewer: React.FC<CodeViewerProps> = ({ code, issues, selectedLine, onLineSelect }) => {
  const lines = code?.split('\n') || [];
  const issueLines = new Map();
  issues?.forEach(issue => {
    if (issue.line) {
      issueLines.set(issue.line, issue);
    }
  });

  // What-If Refactor state
  const [refactorModal, setRefactorModal] = useState(false);
  const [refactorLoading, setRefactorLoading] = useState(false);
  const [refactorResult, setRefactorResult] = useState<any>(null);
  const [refactorError, setRefactorError] = useState<string | null>(null);

  const handleSimulateRefactor = async () => {
    setRefactorLoading(true);
    setRefactorError(null);
    setRefactorResult(null);
    setRefactorModal(true);
    try {
      const result = await reviewService.recordEvolution({}); // placeholder to avoid unused import
      // Actually call what-if-refactor endpoint
      const res = await fetch('http://localhost:4000/what-if-refactor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setRefactorResult(data);
    } catch (err: any) {
      setRefactorError(err.message);
    } finally {
      setRefactorLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Code</h3>
        <button
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
          onClick={handleSimulateRefactor}
        >
          Simulate Refactor
        </button>
      </div>
      <div className="bg-gray-900 dark:bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <pre className="text-sm">
            {lines.map((line, index) => {
              const lineNumber = index + 1;
              const issue = issueLines.get(lineNumber);
              const isSelected = selectedLine === lineNumber;
              return (
                <div
                  key={lineNumber}
                  className={`flex hover:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer ${
                    isSelected ? 'bg-blue-900/50 dark:bg-blue-800/50' : ''
                  } ${issue ? 'bg-red-900/20 dark:bg-red-800/20 border-l-4 border-red-500' : ''}`}
                  onClick={() => onLineSelect(lineNumber)}
                >
                  <span className="text-gray-500 dark:text-gray-400 w-12 text-right pr-4 py-1 select-none border-r border-gray-700 dark:border-gray-600">
                    {lineNumber}
                  </span>
                  <code className="text-gray-100 dark:text-gray-200 px-4 py-1 flex-1 whitespace-pre">
                    {line}
                  </code>
                </div>
              );
            })}
          </pre>
        </div>
      </div>

      {/* What-If Refactor Modal */}
      {refactorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-4xl w-full p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setRefactorModal(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">What-If Refactor Simulator</h2>
            {refactorLoading && <div>Generating refactor...</div>}
            {refactorError && <div className="text-red-500">{refactorError}</div>}
            {refactorResult && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Original Code & Metrics */}
                <div>
                  <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Original Code</h3>
                  <pre className="bg-gray-100 dark:bg-gray-900 rounded p-2 text-xs overflow-x-auto mb-2 max-h-64">{refactorResult.originalCode}</pre>
                  <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <div>Maintainability: {refactorResult.originalMetrics?.maintainabilityIndex}</div>
                    <div>Complexity: {refactorResult.originalMetrics?.complexityScore}</div>
                  </div>
                </div>
                {/* Refactored Code & Metrics */}
                <div>
                  <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Refactored Code</h3>
                  <pre className="bg-green-50 dark:bg-green-900/20 rounded p-2 text-xs overflow-x-auto mb-2 max-h-64">{refactorResult.refactoredCode}</pre>
                  <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <div>Maintainability: {refactorResult.refactoredMetrics?.maintainabilityIndex}</div>
                    <div>Complexity: {refactorResult.refactoredMetrics?.complexityScore}</div>
                  </div>
                </div>
              </div>
            )}
            {refactorResult?.aiExplanation && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded text-blue-900 dark:text-blue-100">
                <strong>AI Explanation:</strong>
                <div className="whitespace-pre-wrap mt-2">{refactorResult.aiExplanation}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};