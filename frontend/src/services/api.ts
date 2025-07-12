// import { API_ENDPOINTS } from '../constants/api';
import { API_ENDPOINTS } from '../constant/api';
import type { AlternativeSolutionData, ReviewData, VideoData } from '../types';
// import { ReviewData, VideoData, AlternativeSolutionData } from '../types';

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
  }
};
