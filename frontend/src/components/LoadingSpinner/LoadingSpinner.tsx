import type { LoadingSpinnerProps } from "../../types";

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => (
  <div className="flex flex-col items-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
    <p className="text-gray-600 dark:text-gray-400 mt-2">{message}</p>
  </div>
);