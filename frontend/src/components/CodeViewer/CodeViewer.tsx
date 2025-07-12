import React, { useState, useEffect } from 'react';
import type { CodeViewerProps } from "../../types";
import { reviewService } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const CodeViewer: React.FC<CodeViewerProps> = ({ code, issues, selectedLine, onLineSelect }) => {
  const lines = code?.split('\n') || [];
  const issueLines = new Map();
  issues?.forEach(issue => {
    if (issue.line) {
      issueLines.set(issue.line, issue);
    }
  });

  const navigate = useNavigate();

  const handleSimulateRefactor = () => {
    navigate('/refactor-simulation', { state: { code } });
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (false) { // No longer needed as modal is removed
      document.body.classList.add('overflow-hidden');
      document.documentElement.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
      document.documentElement.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
      document.documentElement.classList.remove('overflow-hidden');
    };
  }, [false]); // No longer needed as modal is removed

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Code Review</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {lines.length} lines • {issues?.length || 0} issues found
          </p>
        </div>
        <button
          className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg hover:shadow-xl"
          onClick={handleSimulateRefactor}
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Let AI Refactor Simulator
          </span>
        </button>
      </div>

      {/* Code Display */}
      <div className="bg-gray-900 dark:bg-gray-850 rounded-xl overflow-hidden shadow-2xl border border-gray-700 dark:border-gray-600 min-h-[60vh] flex flex-col">
        <div className="bg-gray-800 dark:bg-gray-800 px-6 py-3 border-b border-gray-700 dark:border-gray-600">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-sm font-medium text-gray-300">code.tsx</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-x-auto overflow-y-auto">
          <pre className="text-sm leading-relaxed min-h-[50vh]">
            {lines.map((line, index) => {
              const lineNumber = index + 1;
              const issue = issueLines.get(lineNumber);
              const isSelected = selectedLine === lineNumber;
              return (
                <div
                  key={lineNumber}
                  className={`group flex hover:bg-gray-800 dark:hover:bg-gray-750 cursor-pointer transition-all duration-150 ${
                    isSelected ? 'bg-blue-900/50 dark:bg-blue-800/50 border-l-4 border-blue-400' : ''
                  } ${issue ? 'bg-red-900/30 dark:bg-red-800/30 border-l-4 border-red-400' : ''}`}
                  onClick={() => onLineSelect(lineNumber)}
                >
                  <span className="text-gray-500 dark:text-gray-400 w-16 text-right pr-4 py-2 select-none border-r border-gray-700 dark:border-gray-600 font-mono text-xs bg-gray-850 dark:bg-gray-800 group-hover:bg-gray-800 dark:group-hover:bg-gray-750 transition-colors">
                    {lineNumber}
                  </span>
                  <code className="text-gray-100 dark:text-gray-200 px-6 py-2 flex-1 whitespace-pre font-mono text-sm">
                    {line || ' '}
                  </code>
                  {issue && (
                    <div className="flex items-center pr-4">
                      <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </pre>
        </div>
      </div>

    </div>
  );
};

export { CodeViewer };