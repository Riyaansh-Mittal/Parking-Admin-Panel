import { useState, useCallback } from 'react';
import { post } from '@api/client';
import type { ApiResponse } from '@/types/api.types';
import type { InitializeSettingsResponse } from '../types';

interface UseInitializeSettingsReturn {
  initializeSettings: (
    force?: boolean
  ) => Promise<InitializeSettingsResponse>;
  loading: boolean;
  error: string | null;
  success: boolean;
  clearMessages: () => void;
}

export const useInitializeSettings = (): UseInitializeSettingsReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const initializeSettings = useCallback(
    async (force = false): Promise<InitializeSettingsResponse> => {
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const params = new URLSearchParams();
        if (force) params.append('force', 'true');

        const response = await post<ApiResponse<InitializeSettingsResponse['data']>>(
          `/platform-settings/operations/initialize-settings/?${params.toString()}`,
          {}
        );

        setSuccess(true);
        return {
          message: response.message,
          data: response.data,
        };
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to initialize settings';
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
    initializeSettings,
    loading,
    error,
    success,
    clearMessages,
  };
};
