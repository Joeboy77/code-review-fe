import type { IssuesListProps } from "../../types";

const getSeverityColor = (severity: string) => {
  const severityLower = severity.toLowerCase();
  if (severityLower === 'critical' || severityLower === 'high') {
    return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200';
  } else if (severityLower === 'warning' || severityLower === 'medium') {
    return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200';
  } else {
    return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200';
  }
};

export const IssuesList: React.FC<IssuesListProps> = ({ issues, onJumpToLine }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Issues</h3>
    <div className="space-y-3">
      {issues?.map((issue, index) => (
        <div
          key={index}
          className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
          onClick={() => issue.line && onJumpToLine(issue.line)}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                {issue.severity}
              </span>
              <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                {issue.category}
              </span>
            </div>
            {issue.line && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Line {issue.line}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {issue.explanation || issue.message}
          </p>
        </div>
      )) || (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No issues found in this code.
        </p>
      )}
    </div>
  </div>
);