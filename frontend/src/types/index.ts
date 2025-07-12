// Types
export interface Issue {
  line: number;
  severity: 'high' | 'medium' | 'low';
  message: string;
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