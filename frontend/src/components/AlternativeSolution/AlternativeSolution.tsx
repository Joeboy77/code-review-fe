import React, { useState } from "react";
import type { AlternativeSolutionProps } from "../../types";

export const AlternativeSolution: React.FC<AlternativeSolutionProps> = ({ solution }) => {
    const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(solution);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
    {/* Header */}
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex justify-between items-center space-x-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Alternative Solution</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Optimized implementation with best practices</p>
        </div>

        <button
            onClick={copyToClipboard}
            className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md transition-colors duration-200"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>
      </div>

    </div>

    {/* Content */}
    <div className="p-6">
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
            Refactored Code
          </span>
        </div>
        <div className="p-4">
          <pre className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto">
            <code>{solution}</code>
          </pre>
        </div>
      </div>

      {/* Key Improvements Section */}
      <div className="mt-6">
        <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
          <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Key Improvements
        </h4>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Performance Optimization</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Implemented memoization to prevent unnecessary re-renders</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Code Readability</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Streamlined comments and improved naming conventions</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Best Practices</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Follows React conventions and DRY principles</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span className="text-sm font-semibold text-green-800 dark:text-green-300">Enhanced Maintainability</span>
        </div>
        <p className="text-sm text-green-700 dark:text-green-400">
          This refactored solution provides better performance, cleaner code structure, 
          and improved developer experience while maintaining the same functionality.
        </p>
      </div>
    </div>
  </div>
  )
}

// import React, { useState } from "react";
// import type { AlternativeSolutionProps } from "../../types";

// export const AlternativeSolution: React.FC<AlternativeSolutionProps> = ({ solution }) => {
//   const [copied, setCopied] = useState(false);

//   const copyToClipboard = async () => {
//     try {
//       await navigator.clipboard.writeText(solution);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.error('Failed to copy text: ', err);
//     }
//   };

//   return (
//     <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
//       {/* Header */}
//       <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <div className="flex items-center space-x-2">
//               <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Alternative Solution</span>
//             </div>
//           </div>
//           <button
//             onClick={copyToClipboard}
//             className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md transition-colors duration-200"
//           >
//             {copied ? (
//               <>
//                 <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//                 <span>Copied!</span>
//               </>
//             ) : (
//               <>
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                 </svg>
//                 <span>Copy</span>
//               </>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Code Content */}
//       <div className="relative flex">
//         {/* Line numbers */}
//         <div className="bg-gray-800 dark:bg-gray-900 border-r border-gray-700 dark:border-gray-600 px-3 py-4 text-xs text-gray-500 dark:text-gray-400 font-mono select-none">
//           {solution.split('\n').map((_, index) => (
//             <div key={index} className="leading-6 text-right">
//               {index + 1}
//             </div>
//           ))}
//         </div>
        
//         {/* Code area */}
//         <div className="flex-1 bg-gray-900 dark:bg-black text-gray-100 p-4 overflow-x-auto">
//           <pre className="text-sm leading-6 whitespace-pre font-mono">
//             <code className="language-typescript">{solution}</code>
//           </pre>
//         </div>
//       </div>

//       {/* Footer with improvements */}
//       <div className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2">
//               <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//               <span className="text-xs text-gray-600 dark:text-gray-400">Performance Optimized</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//               <span className="text-xs text-gray-600 dark:text-gray-400">Best Practices</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//               <span className="text-xs text-gray-600 dark:text-gray-400">Clean Code</span>
//             </div>
//           </div>
//           <div className="text-xs text-gray-500 dark:text-gray-400">
//             TypeScript • React
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };