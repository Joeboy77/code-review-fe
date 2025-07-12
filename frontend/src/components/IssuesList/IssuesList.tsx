import type { IssuesListProps } from "../../types";

export const IssuesList: React.FC<IssuesListProps> = ({ issues, onJumpToLine }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Issues</h3>
    <div className="space-y-3">
      {issues?.map((issue, index) => (
        <div
          key={index}
          className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
          onClick={() => onJumpToLine(issue.line)}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              issue.severity === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200' :
              issue.severity === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200' :
              'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
            }`}>
              {issue.severity}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Line {issue.line}
            </span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {issue.message}
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