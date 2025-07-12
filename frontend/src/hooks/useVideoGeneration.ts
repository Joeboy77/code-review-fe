import { useState, useCallback } from 'react';
import { notification } from 'antd';
import { reviewService } from '../services/api';

interface UseVideoGenerationReturn {
  videoLoading: boolean;
  videoStatus: string;
  videoUrl: string;
  generateVideo: (url: string) => Promise<void>;
  resetVideo: () => void;
}

export const useVideoGeneration = (): UseVideoGenerationReturn => {
  const [videoLoading, setVideoLoading] = useState<boolean>(false);
  const [videoStatus, setVideoStatus] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string>('');

  const resetVideo = useCallback(() => {
    setVideoLoading(false);
    setVideoStatus('');
    setVideoUrl('');
  }, []);

  const pollVideoStatus = useCallback((jobId: string): void => {
    setVideoStatus('Processing video...');
    const interval = setInterval(async () => {
      try {
        const data = await reviewService.getVideoStatus(jobId);
        if (data.videoUrl) {
          setVideoUrl(data.videoUrl);
          setVideoStatus('Video is ready!');
          setVideoLoading(false);
          clearInterval(interval);
        } else if (data.status) {
          setVideoStatus(`Status: ${data.status}`);
        }
      } catch (error) {
        console.error('Error checking video status:', error);
        setVideoStatus('Error checking video status.');
        setVideoLoading(false);
        clearInterval(interval);
      }
    }, 5000);
  }, []);

  const generateVideo = useCallback(async (url: string): Promise<void> => {
    setVideoLoading(true);
    setVideoStatus('Starting video generation...');
    setVideoUrl('');

    try {
      const data = await reviewService.generateVideo(url);
      if (!data.jobId) {
        setVideoLoading(false);
        notification.error({ 
          message: 'Error', 
          description: 'Failed to start video generation.' 
        });
        return;
      }
      pollVideoStatus(data.jobId);
    } catch (error) {
      console.error('Failed to generate video:', error);
      setVideoLoading(false);
      notification.error({ 
        message: 'Error', 
        description: 'Failed to start video generation.' 
      });
    }
  }, [pollVideoStatus]);

  return {
    videoLoading,
    videoStatus,
    videoUrl,
    generateVideo,
    resetVideo
  };
};
