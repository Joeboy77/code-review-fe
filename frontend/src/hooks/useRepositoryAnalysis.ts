import { useState, useCallback } from 'react';
import { notification } from 'antd';
import { reviewService } from '../services/api';
import type { RepositoryAnalysisData } from '../types';

interface UseRepositoryAnalysisReturn {
  analysis: RepositoryAnalysisData | null;
  loading: boolean;
  getRepositoryAnalysis: (url: string) => Promise<void>;
  resetAnalysis: () => void;
}

export const useRepositoryAnalysis = (): UseRepositoryAnalysisReturn => {
  const [analysis, setAnalysis] = useState<RepositoryAnalysisData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const resetAnalysis = useCallback(() => {
    setAnalysis(null);
    setLoading(false);
  }, []);

  const getRepositoryAnalysis = useCallback(async (url: string): Promise<void> => {
    setLoading(true);
    setAnalysis(null);

    try {
      const data = await reviewService.getRepositoryAnalysis(url);
      setAnalysis(data);
      notification.success({ 
        message: 'Repository Analysis Complete', 
        description: `Analyzed ${data.overview.totalFiles} files successfully!` 
      });
    } catch (error) {
      console.error('Failed to get repository analysis:', error);
      notification.error({ 
        message: 'Error', 
        description: 'Failed to analyze repository. Please check your URL and try again.' 
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    analysis,
    loading,
    getRepositoryAnalysis,
    resetAnalysis
  };
}; 