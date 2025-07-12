// Types
export interface Issue {
  line?: number;
  snippet?: string;
  explanation: string;
  severity: 'Critical' | 'Warning' | 'Info' | 'high' | 'medium' | 'low';
  category: string;
  message?: string; // For backward compatibility
}

// Alias for backward compatibility
export type CodeIssue = Issue;

export type SeverityColor = 'red' | 'orange' | 'blue' | 'gray';

export interface SeverityBreakdown {
  Critical: number;
  Warning: number;
  Info: number;
}

// Complexity Analysis Types
export interface ComplexityMetrics {
  totalLines: number;
  nonEmptyLines: number;
  commentLines: number;
  functionCount: number;
  complexityScore: number;
  maintainabilityIndex: number;
  performanceScore: number;
  codeToCommentRatio: number;
}

export interface ComplexityBreakdown {
  ifStatements: number;
  forLoops: number;
  whileLoops: number;
  switchStatements: number;
  tryCatchBlocks: number;
}

export interface SecurityAnalysis {
  issues: string[];
  score: number;
}

export interface ComplexityAnalysisData {
  metrics: ComplexityMetrics;
  complexity: ComplexityBreakdown;
  security: SecurityAnalysis;
  recommendations: string[];
  insights: string;
  code: string;
}

// Repository Analysis Types
export interface RepositoryInfo {
  owner: string;
  name: string;
  branch: string;
  url: string;
}

export interface RepositoryOverview {
  totalFiles: number;
  totalLines: number;
  totalFunctions: number;
  averageMaintainability: number;
  averagePerformance: number;
  securityIssues: string[];
  fileTypes: Record<string, number>;
}

export interface FileAnalysis {
  path: string;
  size: number;
  analysis: ComplexityAnalysisData;
}

export interface RepositoryAnalysisData {
  repository: RepositoryInfo;
  overview: RepositoryOverview;
  files: FileAnalysis[];
  insights: string;
  recommendations: string[];
}

// API Response Types
export interface ReviewData {
  review: string;
  code: string;
  issues: Issue[];
  warning?: string;
}

export interface AlternativeSolutionData {
  suggestion: string;
}

export interface VideoData {
  jobId?: string;
  videoUrl?: string;
  status?: string;
  raw?: any;
}

export interface CodeInputProps {
  url: string;
  onChange: (url: string) => void;
  onSubmit: () => void;
  loading: boolean;
  disabled: boolean;
}

export interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: (darkMode: boolean) => void;
}

export interface WarningAlertProps {
  warning: string;
}

export interface ReviewSummaryProps {
  review: string;
  issues: Issue[];
}

export interface CodeViewerProps {
  code: string;
  issues: Issue[];
  selectedLine: number | null;
  onLineSelect: (line: number) => void;
}

export interface IssuesListProps {
  issues: Issue[];
  onJumpToLine: (line: number) => void;
}

export interface AlternativeSolutionProps {
  solution: string;
}

export interface LoadingSpinnerProps {
  message: string;
}

export interface UseCodeReviewReturn {
  review: string;
  code: string;
  issues: Issue[];
  loading: boolean;
  warning: string;
  getReview: (url: string) => void;
}

export interface UseVideoGenerationReturn {
  videoLoading: boolean;
  videoStatus: string;
  videoUrl: string;
  generateVideo: (url: string) => void;
}

export interface UseAlternativeSolutionReturn {
  altLoading: boolean;
  altSolution: string;
  getAlternativeSolution: (url: string) => void;
}