import type { HeaderProps } from "../../types";

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-3">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Pip-son AI Code Review Assistant
        </h1>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          Paste a GitHub file URL to get an instant AI review.
        </p>

        <h2 className=" font-bold text-2xl text-gray-900 dark:text-white mt-2 " >100% Powered by Alle-AI</h2>
      </div>
    </div>
    {/* <button
      onClick={() => onToggleDarkMode(!darkMode)}
      className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 border border-gray-200 dark:border-gray-700"
    >
      <div className="w-5 h-5 relative">
        {darkMode ? (
          <svg
            className="w-5 h-5 text-slate-400 transition-colors"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-amber-500 transition-colors"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </button> */}

    {/* Premium Toggle with Subtle Animation */}
    {/* {/*  */}
    <button
      onClick={() => onToggleDarkMode(!darkMode)}
      className="group relative flex items-center gap-3 px-3 py-2 rounded-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 shadow-sm"
    >
      <div className="flex items-center gap-2">
        <div
          className={`w-8 h-4 rounded-full border transition-all duration-300 ${
            darkMode
              ? "bg-blue-600 border-blue-600"
              : "bg-gray-200 border-gray-300"
          }`}
        >
          <div
            className={`w-3 h-3 rounded-full bg-white shadow-sm transition-all duration-300 transform ${
              darkMode ? "translate-x-4" : "translate-x-0.5"
            }`}
          ></div>
        </div>

        <div className="flex items-center gap-1">
          {darkMode ? (
            <svg
              className="w-4 h-4 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 text-amber-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
    </button>
  </div>
);
