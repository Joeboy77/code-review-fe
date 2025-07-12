import type { WarningAlertProps } from "../../types";

export const WarningAlert: React.FC<WarningAlertProps> = ({ warning }) => {
  if (!warning) return null;
  
  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
      <div className="flex items-center">
        <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span className="text-yellow-800 dark:text-yellow-200 font-medium">Warning</span>
      </div>
      <p className="text-yellow-700 dark:text-yellow-300 mt-1">{warning}</p>
    </div>
  );
};