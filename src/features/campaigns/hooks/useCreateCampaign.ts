import { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { createCampaign } from '@/redux/slices/campaignsSlice';
import type { CreateCampaignPayload } from '../types';

export const useCreateCampaign = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleCreateCampaign = async (payload: CreateCampaignPayload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await dispatch(createCampaign(payload)).unwrap();
      setSuccess(true);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create campaign';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  };

  return {
    createCampaign: handleCreateCampaign,
    loading,
    error,
    success,
    reset,
  };
};
