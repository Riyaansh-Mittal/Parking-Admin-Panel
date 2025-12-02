import { useState } from 'react';
import { relationshipsService } from '@/api/services/relationships.service';
import type { ReverseReferralPayload, ReverseReferralResponse } from '../types';

export const useReverseReferral = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const reverse = async (
    relationshipId: string,
    payload: ReverseReferralPayload
  ): Promise<ReverseReferralResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await relationshipsService.reverseReferral(relationshipId, payload);
      setSuccess(true);
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reverse referral';
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
    reverse,
    loading,
    error,
    success,
    reset,
  };
};
