import { useState, useCallback } from 'react';
import { notification } from 'antd';
import { reviewService } from '../services/api';

interface UseAlternativeSolutionReturn {
  altLoading: boolean;
  altSolution: string;
  getAlternativeSolution: (url: string) => Promise<void>;
  resetAlternativeSolution: () => void;
}

export const useAlternativeSolution = (): UseAlternativeSolutionReturn => {
  const [altLoading, setAltLoading] = useState<boolean>(false);
  const [altSolution, setAltSolution] = useState<string>('');

  const resetAlternativeSolution = useCallback(() => {
    setAltLoading(false);
    setAltSolution('');
  }, []);

  const getAlternativeSolution = useCallback(async (url: string): Promise<void> => {
    setAltLoading(true);
    setAltSolution('');

    try {
      const data = await reviewService.getAlternativeSolution(url);
      if (data.suggestion) {
        setAltSolution(data.suggestion);
        notification.success({ 
          message: 'Alternative Solution Ready', 
          description: 'AI suggestion is ready!' 
        });
      } else {
        setAltSolution('No alternative solution available.');
      }
    } catch (error) {
      console.error('Failed to get alternative solution:', error);
      notification.error({ 
        message: 'Error', 
        description: 'Failed to get alternative solution.' 
      });
    } finally {
      setAltLoading(false);
    }
  }, []);

  return {
    altLoading,
    altSolution,
    getAlternativeSolution,
    resetAlternativeSolution
  };
};
