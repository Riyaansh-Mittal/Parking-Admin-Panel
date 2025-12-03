import { useState, useCallback } from 'react';
import { post } from '@api/client';
import type { ApiResponse } from '@/types/api.types';
import type { ExecuteCronRequest, ExecuteCronResponse } from '../types';

interface UseExecuteCronReturn {
  executeCron: (request: ExecuteCronRequest) => Promise<ExecuteCronResponse>;
  loading: boolean;
  error: string | null;
  success: boolean;
  clearMessages: () => void;
}

export const useExecuteCron = (): UseExecuteCronReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const executeCron = useCallback(
    async (request: ExecuteCronRequest): Promise<ExecuteCronResponse> => {
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const response = await post<ApiResponse<ExecuteCronResponse['data']>>(
          '/platform-settings/operations/execute-cron-reset/',
          request
        );

        setSuccess(true);
        return {
          message: response.message,
          data: response.data,
        };
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to execute cron job';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return {
    executeCron,
    loading,
    error,
    success,
    clearMessages,
  };
};
