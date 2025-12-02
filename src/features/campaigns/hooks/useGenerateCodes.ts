import { useState } from 'react';
import { generateCampaignCodes } from '@/api/services/campaigns.service';
import type { GenerateCodesResponse } from '../types';

export const useGenerateCodes = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateCodesResponse | null>(null);

  const generateCodes = async (campaignId: string, count: number) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await generateCampaignCodes(campaignId, { count });
      setResult(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate codes';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setResult(null);
  };

  return {
    generateCodes,
    loading,
    error,
    result,
    reset,
  };
};
