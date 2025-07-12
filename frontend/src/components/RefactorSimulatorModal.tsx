import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface RefactorSimulatorModalProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  error: string | null;
  result: any;
}

export const RefactorSimulatorModal: React.FC<RefactorSimulatorModalProps> = ({ open, onClose, loading, error, result }) => {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (open) {
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
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen bg-black/70 backdrop-blur">
      <div className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-2 sm:mx-4 min-h-[60vh] max-h-[95vh] flex flex-col bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-blue-900/90 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="sticky top-0 z-10  flex items-center justify-between px-4 sm:px-8 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 rounded-t-2xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Let AI Refactor Simulator</h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Analyze and improve your code quality</p>
            </div>
          </div>
          <button
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-all duration-200"
            onClick={onClose}
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Modal Body */}
        <div className="flex-1 flex flex-col justify-center items-center overflow-y-auto p-4 sm:p-6 md:p-8 ">
          {/* Loading State - moved to top */}
          {loading && (
            <div className="flex flex-col items-center justify-center min-h-[40vh] w-full mb-8 mt20">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full animate-spin border-8 border-purple-400 border-t-transparent border-b-transparent shadow-xl" style={{boxShadow:'0 0 40px 8px #a78bfa55'}}></div>
                <div className="absolute inset-0 w-20 h-20 rounded-full border-8 border-purple-600/30 border-t-transparent border-b-transparent animate-pulse" style={{filter:'blur(2px)'}}></div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse mb-2 drop-shadow-lg">
                  Analyzing Your Code
                </h3>
                <p className="text-lg text-gray-300 dark:text-gray-400 animate-fade-in-slow">
                  Our AI is reviewing and optimizing your code structure...
                </p>
              </div>
            </div>
          )}
          {/* Error State */}
          {error && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Analysis Failed</h3>
                <p className="text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          )}
          {/* Results */}
          {!loading && result && (
            <div className="space-y-8 w-full mt-96 ">
              {/* Code Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full mt-96">
                {/* Original Code */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col mt-80">
                  <div className="bg-gray-100 dark:bg-gray-750 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-600">
                    <h3 className="font-bold text-base sm:text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                      Original Code
                    </h3>
                  </div>
                  <div className="p-3 sm:p-6 flex-1 flex flex-col">
                    <div className="text-xs sm:text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 rounded-lg p-2 sm:p-4 overflow-auto max-h-60 sm:max-h-80 border border-gray-200 dark:border-gray-600 font-mono leading-relaxed flex-1">
                      <ReactMarkdown>{result.originalCode}</ReactMarkdown>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-4">
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-2 sm:p-3 border border-gray-200 dark:border-gray-600">
                        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Maintainability</div>
                        <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                          {result.originalMetrics?.maintainabilityIndex}
                        </div>
                      </div>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-2 sm:p-3 border border-gray-200 dark:border-gray-600">
                        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Complexity</div>
                        <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                          {result.originalMetrics?.complexityScore}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Refactored Code */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700 overflow-hidden flex flex-col mt-80">
                  <div className="bg-green-100 dark:bg-green-800/30 px-4 sm:px-6 py-3 sm:py-4 border-b border-green-200 dark:border-green-600">
                    <h3 className="font-bold text-base sm:text-lg text-green-800 dark:text-green-200 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      Refactored Code
                    </h3>
                  </div>
                  <div className="p-3 sm:p-6 flex-1 flex flex-col">
                    <div className="text-xs sm:text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 rounded-lg p-2 sm:p-4 overflow-auto max-h-60 sm:max-h-80 border border-green-200 dark:border-green-600 font-mono leading-relaxed flex-1">
                      <ReactMarkdown>{result.refactoredCode}</ReactMarkdown>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-4">
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-2 sm:p-3 border border-green-200 dark:border-green-600">
                        <div className="text-xs text-green-600 dark:text-green-400 uppercase tracking-wide mb-1">Maintainability</div>
                        <div className="text-base sm:text-lg font-bold text-green-700 dark:text-green-300">
                          {result.refactoredMetrics?.maintainabilityIndex}
                        </div>
                      </div>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-2 sm:p-3 border border-green-200 dark:border-green-600">
                        <div className="text-xs text-green-600 dark:text-green-400 uppercase tracking-wide mb-1">Complexity</div>
                        <div className="text-base sm:text-lg font-bold text-green-700 dark:text-green-300">
                          {result.refactoredMetrics?.complexityScore}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* AI Explanation */}
              {result.aiExplanation && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-700 p-4 sm:p-8 w-full">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base sm:text-lg font-semibold text-blue-900 dark:text-blue-200 mb-2 sm:mb-3">AI Analysis & Recommendations</h4>
                      <div className="text-blue-800 dark:text-blue-300 whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
                        <ReactMarkdown>{result.aiExplanation}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
