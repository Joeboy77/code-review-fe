import { useCallback, useState } from "react";
import { notification } from "antd";
import { reviewService } from "../services/api";
import type { Issue, UseAlternativeSolutionReturn, UseCodeReviewReturn, UseVideoGenerationReturn } from "../types";

function extractRepoAndFile(url: string) {
  const match = url.match(/^https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/blob\/([^\/]+)\/(.+)$/);
  if (!match) return { repo: '', file: '' };
  const [, owner, repo, , file] = match;
  return { repo: `${owner}/${repo.replace(/\.git$/, '')}`, file };
}

export const useCodeReview = (): UseCodeReviewReturn => {
  const [review, setReview] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>('');

  const resetAnalysis = useCallback(() => {
    setReview('');
    setCode('');
    setIssues([]);
    setWarning('');
    setLoading(false);
  }, []);

  const getReview = useCallback(async (url: string) => {
    setLoading(true);
    setWarning('');
    setReview('');
    setCode('');
    setIssues([]);
    
    try {
      const data = await reviewService.getReview(url);
      
      if (data.review) {
        setReview(data.review);
      }
      
      if (data.code) {
        setCode(data.code);
      }
      
      if (data.issues && Array.isArray(data.issues)) {
        setIssues(data.issues);
      }
      
      if (data.warning) {
        setWarning(data.warning);
      }
      
      // Record evolution snapshot
      const { repo, file } = extractRepoAndFile(url);
      if (repo && data.code && data.review) {
        await reviewService.recordEvolution({
          repo,
          file,
          timestamp: Date.now(),
          metrics: {
            maintainabilityIndex: data.metrics?.maintainabilityIndex || 0,
            complexityScore: data.metrics?.complexityScore || 0,
            securityScore: data.metrics?.security?.score || 0,
          },
        });
      }
      
      notification.success({ 
        message: 'Code Review Complete', 
        description: 'Your code has been analyzed successfully!' 
      });
    } catch (error) {
      console.error('Failed to get code review:', error);
      notification.error({ 
        message: 'Error', 
        description: 'Failed to analyze code. Please check your URL and try again.' 
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return { review, code, issues, loading, warning, getReview, resetAnalysis };
};

export const useVideoGeneration = (): UseVideoGenerationReturn => {
  const [videoLoading, setVideoLoading] = useState<boolean>(false);
  const [videoStatus, setVideoStatus] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string>('');

  const generateVideo = useCallback((url: string) => {
    setVideoLoading(true);
    setTimeout(() => {
      setVideoUrl('https://example.com/video.mp4');
      setVideoLoading(false);
    }, 3000);
  }, []);

  return { videoLoading, videoStatus, videoUrl, generateVideo };
};

export const useAlternativeSolution = (): UseAlternativeSolutionReturn => {
  const [altLoading, setAltLoading] = useState<boolean>(false);
  const [altSolution, setAltSolution] = useState<string>('');

  const getAlternativeSolution = useCallback((url: string) => {
    setAltLoading(true);
    setTimeout(() => {
      setAltSolution('Here\'s an alternative approach using a more functional programming style with custom hooks for better code organization and reusability. This solution reduces component complexity and improves testability.');
      setAltLoading(false);
    }, 2000);
  }, []);

  return { altLoading, altSolution, getAlternativeSolution };
};
