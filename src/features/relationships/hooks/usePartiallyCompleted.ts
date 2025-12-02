import { useState, useEffect, useCallback } from 'react';
import { relationshipsService } from '@/api/services/relationships.service';
import type { PartiallyCompletedRelationship } from '../types';

export const usePartiallyCompleted = () => {
  const [relationships, setRelationships] = useState<PartiallyCompletedRelationship[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPartiallyCompleted = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await relationshipsService.getPartiallyCompleted();
      setRelationships(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch partially completed');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPartiallyCompleted();
  }, [fetchPartiallyCompleted]);

  const refresh = () => {
    fetchPartiallyCompleted();
  };

  return {
    relationships,
    loading,
    error,
    refresh,
  };
};
