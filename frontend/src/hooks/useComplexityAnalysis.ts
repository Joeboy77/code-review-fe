import { useState, useCallback } from 'react';
import { notification } from 'antd';
import { reviewService } from '../services/api';
import type { ComplexityAnalysisData } from '../types';

interface UseComplexityAnalysisReturn {
  analysis: ComplexityAnalysisData | null;
  loading: boolean;
  getComplexityAnalysis: (url: string) => Promise<void>;
  resetAnalysis: () => void;
}

export const useComplexityAnalysis = (): UseComplexityAnalysisReturn => {
  const [analysis, setAnalysis] = useState<ComplexityAnalysisData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const resetAnalysis = useCallback(() => {
    setAnalysis(null);
    setLoading(false);
  }, []);

  const getComplexityAnalysis = useCallback(async (url: string): Promise<void> => {
    setLoading(true);
    setAnalysis(null);

    try {
      const data = await reviewService.getComplexityAnalysis(url);
      setAnalysis(data);
      notification.success({ 
        message: 'Complexity Analysis Complete', 
        description: 'Code metrics and insights are ready!' 
      });
    } catch (error) {
      console.error('Failed to get complexity analysis:', error);
      notification.error({ 
        message: 'Error', 
        description: 'Failed to analyze code complexity. Please check your URL and try again.' 
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    analysis,
    loading,
    getComplexityAnalysis,
    resetAnalysis
  };
}; 