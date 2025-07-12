import type { CodeViewerProps } from "../../types";

export const CodeViewer: React.FC<CodeViewerProps> = ({ code, issues, selectedLine, onLineSelect }) => {
  const lines = code?.split('\n') || [];
  const issueLines = new Set(issues?.map(issue => issue.line) || []);
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Code</h3>
      <div className="bg-gray-900 dark:bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <pre className="text-sm">
            {lines.map((line, index) => {
              const lineNumber = index + 1;
              const hasIssue = issueLines.has(lineNumber);
              const isSelected = selectedLine === lineNumber;
              
              return (
                <div
                  key={lineNumber}
                  className={`flex hover:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer ${
                    isSelected ? 'bg-blue-900/50 dark:bg-blue-800/50' : ''
                  } ${hasIssue ? 'bg-red-900/20 dark:bg-red-800/20' : ''}`}
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
    </div>
  );
};