import { useState, useCallback } from 'react';
import { reviewService } from '../services/api';

export const useCodebaseEvolution = () => {
  const [timeline, setTimeline] = useState<any[]>([]);
  const [hotspots, setHotspots] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTimeline = useCallback(async (repo: string, file?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await reviewService.getEvolutionTimeline(repo, file);
      setTimeline(data.timeline || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchHotspots = useCallback(async (repo: string, window: number = 5) => {
    setLoading(true);
    setError(null);
    try {
      const data = await reviewService.getEvolutionHotspots(repo, window);
      setHotspots(data.hotspots || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    timeline,
    hotspots,
    loading,
    error,
    fetchTimeline,
    fetchHotspots,
  };
}; 