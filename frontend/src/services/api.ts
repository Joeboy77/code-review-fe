// import { API_ENDPOINTS } from '../constants/api';
import { API_ENDPOINTS } from '../constant/api';
import type { AlternativeSolutionData, ReviewData, VideoData, ComplexityAnalysisData, RepositoryAnalysisData } from '../types';

export const reviewService = {
  async getReview(url: string): Promise<ReviewData> {
    const response = await fetch(API_ENDPOINTS.REVIEW, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  },

  async generateVideo(url: string): Promise<VideoData> {
    const response = await fetch(API_ENDPOINTS.VIDEO_EXPLANATION, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  },

  async getVideoStatus(jobId: string): Promise<VideoData> {
    const response = await fetch(`${API_ENDPOINTS.VIDEO_STATUS}?jobId=${jobId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  },

  async getAlternativeSolution(url: string): Promise<AlternativeSolutionData> {
    const response = await fetch(API_ENDPOINTS.ALTERNATIVE_SOLUTION, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  },

  async getComplexityAnalysis(url: string): Promise<ComplexityAnalysisData> {
    const response = await fetch(API_ENDPOINTS.COMPLEXITY_ANALYSIS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  },

  async getRepositoryAnalysis(url: string): Promise<RepositoryAnalysisData> {
    const response = await fetch(API_ENDPOINTS.REPOSITORY_ANALYSIS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  },

  async recordEvolution(payload: any): Promise<{ success: boolean }> {
    const response = await fetch('http://localhost:4000/evolution/record', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  },

  async getEvolutionTimeline(repo: string, file?: string): Promise<any> {
    const url = `http://localhost:4000/evolution/timeline?repo=${encodeURIComponent(repo)}${file ? `&file=${encodeURIComponent(file)}` : ''}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  },

  async getEvolutionHotspots(repo: string, window: number = 5): Promise<any> {
    const url = `http://localhost:4000/evolution/hotspots?repo=${encodeURIComponent(repo)}&window=${window}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  },
};
