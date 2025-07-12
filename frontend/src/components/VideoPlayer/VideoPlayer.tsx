import React from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  status: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, status }) => {
  if (!videoUrl) {
    return (
      <div className="rounded-xl p-6 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">{status || 'Processing video...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl p-6 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Video Explanation</h3>
      <div className="aspect-video bg-black rounded-lg overflow-hidden">
        <video 
          controls 
          className="w-full h-full"
          src={videoUrl}
        >
          Your browser does not support the video tag.
        </video>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        AI-generated explanation of your code
      </p>
    </div>
  );
}; 