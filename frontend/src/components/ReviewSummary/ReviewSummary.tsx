import type { ReviewSummaryProps } from "../../types";

export const ReviewSummary: React.FC<ReviewSummaryProps> = ({ review, issues }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Review Summary</h3>
      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
        {issues?.length || 0} Issues Found
      </span>
    </div>
    <div className="prose dark:prose-invert max-w-none">
      <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
        {review}
      </div>
    </div>
  </div>
);