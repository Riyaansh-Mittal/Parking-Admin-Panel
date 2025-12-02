import { useState } from 'react';
import { relationshipsService } from '@/api/services/relationships.service';
import type { FixPartialRewardPayload, FixPartialRewardResponse } from '../types';

export const useFixPartialReward = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const fixReward = async (
    relationshipId: string,
    payload: FixPartialRewardPayload
  ): Promise<FixPartialRewardResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await relationshipsService.fixPartialReward(relationshipId, payload);
      setSuccess(true);
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fix partial reward';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    fixReward,
    loading,
    error,
    success,
    reset,
  };
};
