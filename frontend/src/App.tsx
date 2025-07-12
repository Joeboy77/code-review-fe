import { useCallback, useEffect, useState, useRef } from "react";
import { AlternativeSolution } from "./components/AlternativeSolution/AlternativeSolution";
import { CodeViewer } from "./components/CodeViewer/CodeViewer";
import { ComplexityDashboard } from "./components/ComplexityDashboard/ComplexityDashboard";
import { LoadingSkeleton } from "./components/global/LoadingSkeleton";
import { IssuesList } from "./components/IssuesList/IssuesList";
import { LoadingSpinner } from "./components/LoadingSpinner/LoadingSpinner";
import { RepositoryDashboard } from "./components/RepositoryDashboard/RepositoryDashboard";
import { ReviewSummary } from "./components/ReviewSummary/ReviewSummary";
import { WarningAlert } from "./components/WarningAlert/WarningAlert";
import { useAlternativeSolution } from "./hooks/useAlternativeSolution";
import { useComplexityAnalysis } from "./hooks/useComplexityAnalysis";
import { useCodeReview } from "./hooks/useCodeReview";
import { useRepositoryAnalysis } from "./hooks/useRepositoryAnalysis";
import CodeInput from "./components/CodeInput/CodeInput";
import { Header } from "./components/Header/Header";
import { CodebaseEvolutionDashboard } from './components/CodebaseEvolutionDashboard/CodebaseEvolutionDashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RefactorSimulationPage from './components/RefactorSimulationPage';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isRepositoryMode, setIsRepositoryMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'review' | 'timeline'>('review');

  // Ref for the alternative solution section
  const alternativeSolutionRef = useRef<HTMLDivElement>(null);

  // Custom hooks
  const { review, code, issues, loading, warning, getReview, resetAnalysis } = useCodeReview();
  const { analysis, loading: analysisLoading, getComplexityAnalysis, resetAnalysis: resetComplexityAnalysis } = useComplexityAnalysis();
  const { analysis: repoAnalysis, loading: repoLoading, getRepositoryAnalysis, resetAnalysis: resetRepositoryAnalysis } = useRepositoryAnalysis();
  const { altLoading, altSolution, getAlternativeSolution } =
    useAlternativeSolution();

  // Clear state when switching modes
  useEffect(() => {
    setUrl("");
    setSelectedLine(null);
    resetAnalysis && resetAnalysis();
    resetComplexityAnalysis && resetComplexityAnalysis();
    resetRepositoryAnalysis && resetRepositoryAnalysis();
  }, [isRepositoryMode]);

  // Apply dark mode to document root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Scroll to alternative solution when it becomes available
  useEffect(() => {
    if (altSolution && !altLoading && alternativeSolutionRef.current) {
      alternativeSolutionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [altSolution, altLoading]);

  const handleSubmit = useCallback(() => {
    if (!url.trim()) return;
    if (isRepositoryMode) {
      getRepositoryAnalysis(url);
    } else {
      getReview(url);
    }
  }, [url, isRepositoryMode, getReview, getRepositoryAnalysis]);

  const handleCopyReview = useCallback((): void => {
    navigator.clipboard.writeText(review);
    // Simple toast notification
    const toast = document.createElement("div");
    toast.className =
      "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50";
    toast.textContent = "Review copied to clipboard!";
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 3000);
  }, [review]);

  const handleComplexityAnalysis = useCallback((): void => {
    if (!url.trim()) return;
    getComplexityAnalysis(url);
  }, [url, getComplexityAnalysis]);

  const handleGetAlternativeSolution = useCallback((): void => {
    if (!url.trim()) return;
    getAlternativeSolution(url);
    
    // Scroll to the alternative solution section immediately when loading starts
    setTimeout(() => {
      if (alternativeSolutionRef.current) {
        alternativeSolutionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100); // Small delay to ensure the loading state is rendered
  }, [url, getAlternativeSolution]);

  // Extract repo name from URL for evolution dashboard
  const getRepoName = (url: string) => {
    const match = url.match(/^https:\/\/github\.com\/([^\/]+)\/([^\/]+)/);
    return match ? `${match[1]}/${match[2].replace(/\.git$/, '')}` : '';
  };
  const repoName = getRepoName(url);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/refactor-simulation" element={<RefactorSimulationPage />} />
        <Route path="/*" element={
          <div className={darkMode ? "dark" : ""}>
            <div className="min-h-screen flex items-center justify-center p-4 transition-all duration-300 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800">
              <div className="w-full max-w-6xl mx-auto rounded-2xl shadow-2xl transition-all duration-300 min-h-[400px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                {/* Header */}
                <div className="p-6 border-b border-gray-200/20 dark:border-gray-700/20">
                  <Header darkMode={darkMode} onToggleDarkMode={setDarkMode} />
                </div>

                {/* Tabs */}
                <div className="flex space-x-4 px-6 pt-6">
                  <button
                    className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${activeTab === 'review' ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-300 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-blue-600'}`}
                    onClick={() => setActiveTab('review')}
                  >
                    Review
                  </button>
                  <button
                    className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${activeTab === 'timeline' ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-300 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-blue-600'}`}
                    onClick={() => setActiveTab('timeline')}
                  >
                    Timeline
                  </button>
                </div>

                {/* Main Content */}
                <div className="p-6 space-y-6">
                  {activeTab === 'review' && (
                    <>
                      {/* Mode Toggle */}
                      <div className="flex justify-center">
                        <div className=" flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                          <button
                            onClick={() => setIsRepositoryMode(false)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                              !isRepositoryMode
                                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                            }`}
                          >
                            Single File
                          </button>
                          <button
                            onClick={() => setIsRepositoryMode(true)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                              isRepositoryMode
                                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                            }`}
                          >
                            Repository
                          </button>
                        </div>
                      </div>

                      {/* Code Input Section */}
                      <div className="space-y-4">
                        <CodeInput
                          url={url}
                          onChange={setUrl}
                          onSubmit={handleSubmit}
                          loading={loading || repoLoading}
                          disabled={analysisLoading}
                          isRepositoryMode={isRepositoryMode}
                        />
                      </div>

                      {/* Loading State */}
                      {(loading || repoLoading) && (
                        <div className="rounded-xl p-6 bg-gray-50/50 dark:bg-gray-700/50">
                          <LoadingSkeleton />
                        </div>
                      )}

                      {/* Repository Analysis Results */}
                      {isRepositoryMode && !repoLoading && repoAnalysis && (
                        <div className="space-y-6">
                          <div className="rounded-xl p-6 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50">
                            <RepositoryDashboard analysis={repoAnalysis} />
                          </div>
                        </div>
                      )}

                      {/* Single File Review Results */}
                      {!isRepositoryMode && !loading && review && (
                        <div className="space-y-6">
                          {/* Warning Alert */}
                          <WarningAlert warning={warning} />

                          {/* Review Summary */}
                          <div className="rounded-xl p-6 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50">
                            <ReviewSummary review={review} issues={issues} />
                            <div className="mt-4 flex space-x-3">
                              <button
                                onClick={handleCopyReview}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                              >
                                Copy Review
                              </button>
                              <button
                                onClick={handleComplexityAnalysis}
                                disabled={analysisLoading}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                              >
                                {analysisLoading ? "Analyzing..." : "Analyze Complexity"}
                              </button>
                            </div>
                          </div>

                          {/* Code Viewer and Issues Grid */}
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Code Viewer - Takes up 2/3 of the space */}
                            <div className="lg:col-span-2 rounded-xl p-6 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 ">
                              <CodeViewer
                                code={code}
                                issues={issues}
                                selectedLine={selectedLine}
                                onLineSelect={setSelectedLine}
                              />
                            </div>

                            {/* Issues List - Takes up 1/3 of the space */}
                            <div className="lg:col-span-1 rounded-xl p-6 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50">
                              <IssuesList
                                issues={issues}
                                onJumpToLine={setSelectedLine}
                              />
                            </div>
                          </div>

                          {/* Alternative Solution Button */}
                          <div className="flex justify-center">
                            <button
                              onClick={handleGetAlternativeSolution}
                              disabled={altLoading}
                              className="px-8 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {altLoading ? (
                                <div className="flex items-center">
                                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
                                  Loading...
                                </div>
                              ) : (
                                <>
                                  <svg
                                    className="w-5 h-5 mr-2 inline"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                    />
                                  </svg>
                                  Suggest Alternative Solution
                                </>
                              )}
                            </button>
                          </div>

                          {/* Alternative Solution Section with ref */}
                          <div ref={alternativeSolutionRef}>
                            {/* Alternative Solution Loading */}
                            {altLoading && (
                              <div className="flex justify-center py-8">
                                <LoadingSpinner message="Generating alternative solution..." />
                              </div>
                            )}

                            {/* Alternative Solution Display */}
                            {altSolution && !altLoading && (
                              <div className="rounded-xl p-6 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50">
                                <AlternativeSolution solution={altSolution} />
                              </div>
                            )}
                          </div>

                          {/* Complexity Analysis Section */}
                          {analysis && (
                            <div className="rounded-xl p-6 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50">
                              <ComplexityDashboard analysis={analysis} />
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                  {activeTab === 'timeline' && repoName && (
                    <CodebaseEvolutionDashboard repo={repoName} />
                  )}
                </div>
              </div>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;