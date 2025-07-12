import type { CodeInputProps } from "../../types";

interface ExtendedCodeInputProps extends CodeInputProps {
  isRepositoryMode?: boolean;
}

const CodeInput: React.FC<ExtendedCodeInputProps> = ({ url, onChange, onSubmit, loading, disabled, isRepositoryMode = false }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {isRepositoryMode ? 'GitHub Repository URL' : 'GitHub File URL'}
      </label>
      <input
        type="text"
        value={url}
        onChange={(e) => onChange(e.target.value)}
        placeholder={isRepositoryMode 
          ? "https://github.com/user/repo" 
          : "https://github.com/user/repo/blob/branch/path/to/file.js"
        }
        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        disabled={disabled}
      />
    </div>
    <button
      onClick={onSubmit}
      disabled={loading || disabled || !url.trim()}
      className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          {isRepositoryMode ? 'Analyzing Repository...' : 'Analyzing Code...'}
        </div>
      ) : (
        isRepositoryMode ? 'Analyze Repository' : 'Review Code'
      )}
    </button>
  </div>
);

export default CodeInput